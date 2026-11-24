import * as THREE from 'three';
import { DAY_UNIFORM } from './theme.js';

// =========================================================================
// HALOS LUMINEUX (phares, feux arrière, réacteurs, feux de navigation)
// Tous les halos sont dessinés en UN SEUL appel GPU (un nuage de points),
// au lieu d'un objet par lumière : réaliste et léger.
// =========================================================================
export function createGlowSystem(scene, maxGlows = 512) {
  const positions = new Float32Array(maxGlows * 3);
  const colors = new Float32Array(maxGlows * 3);
  const sizes = new Float32Array(maxGlows);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
  geometry.setDrawRange(0, 0);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uScale: { value: window.innerHeight },
      uDay: DAY_UNIFORM
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      uniform float uScale;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        // Taille en unités du monde : le halo rétrécit avec la distance
        gl_PointSize = clamp(size * uScale / -mv.z, 0.0, 256.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      uniform float uDay;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0) discard;
        // Cœur net + halo doux, comme une vraie source lumineuse dans l'air
        float core = exp(-d * 18.0);
        float halo = exp(-d * 3.5) * 0.35;
        // En plein jour, les lumières se voient beaucoup moins
        gl_FragColor = vec4(vColor * (core + halo * (1.0 - uDay * 0.8)) * mix(1.0, 0.45, uDay), 1.0);
      }
    `
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 10;
  scene.add(points);

  const glows = [];
  const tmp = new THREE.Vector3();

  // object : l'objet 3D qui porte la lumière (elle suit ses mouvements)
  // offset : position locale de la lumière sur l'objet
  // blink  : { speed, phase, duty } pour les feux clignotants
  function add(object, offset, color, size, blink = null) {
    if (glows.length >= maxGlows) return;
    glows.push({
      object,
      offset: offset.clone(),
      color: new THREE.Color(...color),
      size,
      blink
    });
  }

  function update(elapsed) {
    let n = 0;
    for (let i = 0; i < glows.length; i++) {
      const g = glows[i];
      if (!g.object.visible) continue;
      let intensity = 1;
      if (g.blink) {
        const t = (elapsed * g.blink.speed + g.blink.phase) % 1;
        intensity = t < g.blink.duty ? 1 : 0;
        if (intensity === 0) continue;
      }
      tmp.copy(g.offset);
      g.object.localToWorld(tmp);
      positions[n * 3] = tmp.x;
      positions[n * 3 + 1] = tmp.y;
      positions[n * 3 + 2] = tmp.z;
      colors[n * 3] = g.color.r * intensity;
      colors[n * 3 + 1] = g.color.g * intensity;
      colors[n * 3 + 2] = g.color.b * intensity;
      // Objets qui changent de taille (NOVA dans l'ascenseur) : halo à l'échelle
      if (g.object.userData.glowScale) {
        const e = g.object.matrixWorld.elements;
        sizes[n] = g.size * Math.hypot(e[0], e[1], e[2]);
      } else {
        sizes[n] = g.size;
      }
      n++;
    }
    geometry.setDrawRange(0, n);
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  }

  // bufferHeight : hauteur réelle de l'image en pixels (résolution incluse)
  function resize(bufferHeight, fovDeg = 50) {
    material.uniforms.uScale.value = bufferHeight / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
  }

  return { add, update, resize, points };
}

// Couleurs HDR des lumières (valeurs > 1 : elles déclenchent le halo bloom)
export const GLOW = {
  headlight: [2.2, 2.3, 2.6],
  taillight: [2.6, 0.12, 0.25],
  navRed: [3.0, 0.15, 0.15],
  navGreen: [0.2, 2.6, 0.6],
  strobe: [3.2, 3.2, 3.4],
  engineCyan: [0.35, 2.2, 3.0],
  engineMagenta: [2.6, 0.35, 1.8],
  aviation: [3.2, 0.2, 0.1]
};
