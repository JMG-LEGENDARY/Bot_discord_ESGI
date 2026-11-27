import * as THREE from 'three';
import { seeded } from './util.js';

// =========================================================================
// EFFETS DU VOYAGE SPATIAL
// - Champ d'étoiles qui s'étirent en traînées lumineuses avec la vitesse ;
// - Trou de ver : tunnel tourbillonnant cyan et violet.
// Les deux sont accrochés à la caméra : ils défilent autour du vaisseau.
// =========================================================================

/** Étoiles de vitesse : des segments qui foncent vers la caméra */
function createStreaks(count) {
  const rand = seeded(42);
  const base = new THREE.PlaneGeometry(1, 1);
  base.translate(0, 0.5, 0); // y : 0 = queue, 1 = tête
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute('position', base.attributes.position);
  const aPos = new Float32Array(count * 2);
  const aSeed = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    // Couronne autour de l'axe du vaisseau (rien pile au centre)
    const a = rand() * Math.PI * 2;
    const r = 2.5 + Math.pow(rand(), 0.7) * 60;
    aPos.set([Math.cos(a) * r, Math.sin(a) * r], i * 2);
    aSeed.set([rand(), rand()], i * 2);
  }
  geo.setAttribute('aPos', new THREE.InstancedBufferAttribute(aPos, 2));
  geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(aSeed, 2));
  geo.instanceCount = count;

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTravel: { value: 0 },
      uStretch: { value: 0 },
      uOpacity: { value: 0 },
      uDepth: { value: 420 },
      uPxToNdc: { value: new THREE.Vector2(1 / 800, 1 / 600) }
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute vec2 aPos;
      attribute vec2 aSeed;
      uniform float uTravel;
      uniform float uStretch;
      uniform float uDepth;
      uniform vec2 uPxToNdc;
      varying float vAlong;
      varying float vAcross;
      varying float vFade;
      varying float vHue;
      void main() {
        float z = -2.0 - mod(aSeed.x * uDepth - uTravel, uDepth);
        vec3 head = vec3(aPos, z);
        vec3 tail = vec3(aPos, z - 0.05 - uStretch * (0.6 + aSeed.y * 0.8));
        vec4 ch = projectionMatrix * modelViewMatrix * vec4(head, 1.0);
        vec4 ct = projectionMatrix * modelViewMatrix * vec4(tail, 1.0);
        vec2 sh = ch.xy / ch.w;
        vec2 st = ct.xy / ct.w;
        vec2 dir = sh - st;
        float len = length(dir);
        dir = len > 1e-5 ? dir / len : vec2(0.0, 1.0);
        vec2 n = vec2(-dir.y, dir.x);
        vec4 c = mix(ct, ch, position.y);
        float width = (1.2 + aSeed.y * 1.6);
        c.xy += n * position.x * width * uPxToNdc * c.w;
        gl_Position = c;
        vAlong = position.y;
        vAcross = position.x * 2.0;
        // Fondu au loin et tout près
        vFade = smoothstep(uDepth, uDepth * 0.55, -z) * smoothstep(2.0, 12.0, -z);
        vHue = aSeed.y;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying float vAlong;
      varying float vAcross;
      varying float vFade;
      varying float vHue;
      void main() {
        float core = 1.0 - abs(vAcross);
        vec3 col = mix(vec3(0.55, 0.9, 1.4), vec3(1.1, 0.55, 1.5), step(0.78, vHue));
        col = mix(col, vec3(1.6), 0.35);
        float a = core * core * pow(vAlong, 1.5) * vFade * uOpacity;
        gl_FragColor = vec4(col * a * 1.8, 1.0);
      }
    `
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 50;
  return mesh;
}

/** Trou de ver : grand tube tourbillonnant, vu de l'intérieur */
function createTunnel() {
  const geo = new THREE.CylinderGeometry(9, 9, 520, 72, 40, true);
  geo.rotateX(Math.PI / 2);
  // Le tube ondule et se resserre au loin (l'espace se tord)
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const t = (z + 260) / 520; // 0 au fond, 1 côté caméra
    const squeeze = 0.35 + 0.65 * Math.pow(t, 0.6);
    p.setXYZ(i, x * squeeze, y * squeeze, z);
  }
  geo.translate(0, 0, -255);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTravel: { value: 0 },
      uTime: { value: 0 },
      uOpacity: { value: 0 }
    },
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vDepth;
      void main() {
        vUv = uv;
        vec3 pos = position;
        // Spirale : le tube se tord un peu, comme un vortex
        float a = pos.z * 0.012 + uTime * 0.6;
        pos.xy += vec2(sin(a), cos(a * 1.3)) * (-pos.z) * 0.012;
        vDepth = -pos.z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTravel;
      uniform float uTime;
      uniform float uOpacity;
      varying vec2 vUv;
      varying float vDepth;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
        return v;
      }
      void main() {
        // u autour du tube (raccord sans couture), v le long
        float ang = vUv.x * 6.2831;
        float along = vUv.y * 26.0 + uTravel * 0.05;
        vec2 q = vec2(ang * 1.6 + along * 0.9 + uTime * 0.4, along);
        float swirl = fbm(vec2(cos(ang), sin(ang)) * 1.4 + vec2(q.y * 0.35, uTime * 0.2) + fbm(q * 0.5));
        float streak = pow(fbm(vec2(ang * 6.0, along * 0.4)), 3.0) * 3.0;
        // Anneaux de lumière qui passent
        float rings = pow(0.5 + 0.5 * sin(along * 1.7 - uTime * 2.0), 18.0);
        vec3 cyan = vec3(0.15, 1.1, 1.6);
        vec3 violet = vec3(0.75, 0.25, 1.5);
        vec3 pink = vec3(1.4, 0.3, 0.9);
        vec3 col = mix(violet, cyan, smoothstep(0.35, 0.7, swirl));
        col = mix(col, pink, smoothstep(0.72, 0.9, swirl) * 0.6);
        float intensity = 0.18 + swirl * 0.7 + streak + rings * 0.9;
        // Lumière au bout du tunnel
        float far = smoothstep(380.0, 500.0, vDepth);
        float near = smoothstep(0.0, 30.0, vDepth);
        vec3 c = col * intensity * near + vec3(1.6, 1.8, 2.0) * far * 1.5;
        gl_FragColor = vec4(c * uOpacity, 1.0);
      }
    `
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 40;
  return mesh;
}

/**
 * Effets de saut accrochés à une caméra.
 * state : { speed (0-1), tunnel (0-1) }, modifié par l'animation du saut.
 */
export function createWarpEffects(camera) {
  const holder = new THREE.Group();
  camera.add(holder);
  const streaks = createStreaks(window.matchMedia('(hover: none)').matches ? 700 : 1300);
  const tunnel = createTunnel();
  holder.add(tunnel, streaks);
  streaks.visible = false;
  tunnel.visible = false;

  const state = { speed: 0, tunnel: 0 };
  let travel = 0;

  function resize(width, height) {
    streaks.material.uniforms.uPxToNdc.value.set(2 / width, 2 / height);
  }
  resize(window.innerWidth, window.innerHeight);

  function update(delta, t) {
    const s = state.speed;
    // Vitesse : lente au début, très rapide au maximum
    travel += delta * (4 + s * s * 520);
    const su = streaks.material.uniforms;
    su.uTravel.value = travel;
    su.uStretch.value = s * s * 60;
    su.uOpacity.value = Math.min(1, s * 2.2) * (1 - state.tunnel * 0.6);
    streaks.visible = su.uOpacity.value > 0.005;
    const tu = tunnel.material.uniforms;
    tu.uTravel.value = travel;
    tu.uTime.value = t;
    tu.uOpacity.value = state.tunnel;
    tunnel.visible = state.tunnel > 0.005;
  }

  return { state, update, resize };
}
