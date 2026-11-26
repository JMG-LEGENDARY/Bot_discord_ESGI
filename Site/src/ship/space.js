import * as THREE from 'three';
import { createRealisticPlanet, createIceGiantTexture, createRedGiantTexture } from '../planets.js';
import { seeded } from './util.js';

// =========================================================================
// L'ESPACE AUTOUR DU VAISSEAU
// Ciel étoilé, nébuleuse, planètes (les mêmes que celles du site) et une
// station spatiale. Utilisé derrière la baie vitrée du cockpit, du QG et
// du laboratoire.
// =========================================================================

// Étoiles qui scintillent (un seul appel GPU pour des milliers d'étoiles)
function createStars(count, radius, rand) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const data = new Float32Array(count * 2);
  const tint = [
    [0.75, 0.85, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 0.86, 0.72],
    [0.7, 0.95, 1.0],
    [0.95, 0.78, 1.0]
  ];
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    pos.set([Math.cos(a) * s * radius, u * radius, Math.sin(a) * s * radius], i * 3);
    const c = tint[Math.floor(rand() * tint.length)];
    col.set(c, i * 3);
    // Taille (quelques grosses étoiles rares) et phase du scintillement
    data.set([0.6 + Math.pow(rand(), 6) * 3.2, rand() * 100], i * 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aData', new THREE.BufferAttribute(data, 2));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 }, uPx: { value: window.devicePixelRatio } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute vec3 color;
      attribute vec2 aData;
      uniform float uTime;
      uniform float uPx;
      varying vec3 vColor;
      void main() {
        float tw = 0.7 + 0.3 * sin(uTime * (1.2 + fract(aData.y) * 2.5) + aData.y);
        vColor = color * tw * (0.55 + aData.x * 0.45);
        gl_PointSize = aData.x * 1.6 * uPx;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vColor;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0) discard;
        gl_FragColor = vec4(vColor * exp(-d * 3.5) * 1.6 * uOpacity, 1.0);
      }
    `
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  return points;
}

// Nébuleuse violette et bleue peinte sur une grande sphère
function createNebula(radius) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: 1 } },
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vDir;
      float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      float noise(vec3 p) {
        vec3 i = floor(p); vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }
      float fbm(vec3 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
        return v;
      }
      void main() {
        vec3 d = normalize(vDir);
        float n = fbm(d * 2.6 + vec3(1.7, 0.3, 4.1));
        float m = fbm(d * 5.5 - vec3(3.1, 1.2, 0.4));
        // Grand nuage violet en diagonale, filaments bleus, coeur rose
        float band = exp(-pow((d.y + d.x * 0.45 - 0.1) * 2.6, 2.0));
        vec3 col = vec3(0.012, 0.014, 0.04);
        col += vec3(0.24, 0.08, 0.42) * smoothstep(0.42, 0.85, n) * (0.35 + band);
        col += vec3(0.05, 0.2, 0.42) * smoothstep(0.5, 0.95, m) * band;
        col += vec3(0.5, 0.12, 0.38) * pow(smoothstep(0.62, 0.95, n * m * 1.9), 2.0) * band;
        gl_FragColor = vec4(col * uOpacity, 1.0);
      }
    `
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 24), mat);
  mesh.frustumCulled = false;
  return mesh;
}

// Station spatiale : moyeu, anneau d'habitation, rayons, panneaux solaires
function createStation() {
  const group = new THREE.Group();
  const hull = new THREE.MeshStandardMaterial({ color: 0x8f9bb5, metalness: 0.8, roughness: 0.35 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b2236, metalness: 0.7, roughness: 0.4 });
  const glow = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.4, 1.6, 2.2), toneMapped: false });
  const warm = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.4, 0.6), toneMapped: false });
  const solar = new THREE.MeshStandardMaterial({ color: 0x14306a, metalness: 0.6, roughness: 0.25, emissive: 0x071a3d, emissiveIntensity: 0.6 });

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 16, 24), hull);
  group.add(hub);
  const hubCap = new THREE.Mesh(new THREE.SphereGeometry(3, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), hull);
  hubCap.position.y = 8;
  group.add(hubCap);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(22, 2.2, 12, 96), hull);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  // Hublots éclairés sur l'anneau
  const windows = new THREE.Mesh(new THREE.TorusGeometry(22, 2.25, 4, 96, Math.PI * 2), warm);
  windows.rotation.x = Math.PI / 2;
  windows.scale.set(1, 1, 0.18);
  group.add(windows);
  for (let i = 0; i < 4; i++) {
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 19, 8), dark);
    spoke.rotation.z = Math.PI / 2;
    spoke.rotation.y = (i / 4) * Math.PI * 2;
    spoke.position.set(Math.cos((i / 4) * Math.PI * 2) * 11.5, 0, -Math.sin((i / 4) * Math.PI * 2) * 11.5);
    group.add(spoke);
  }
  // Panneaux solaires en croix sur le mât
  for (const s of [-1, 1]) {
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 30), dark);
    mast.position.set(0, s * 5, 0);
    group.add(mast);
    for (const z of [-11, -5, 5, 11]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(9, 0.15, 4.5), solar);
      panel.position.set(0, s * 5, z);
      group.add(panel);
    }
  }
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 8), glow);
  beacon.position.y = 11;
  group.add(beacon);
  const ringLights = new THREE.Mesh(new THREE.TorusGeometry(24.3, 0.18, 6, 96), glow);
  ringLights.rotation.x = Math.PI / 2;
  group.add(ringLights);
  return { group, ring, windows, ringLights, beacon };
}

/**
 * Décor spatial complet.
 * layout : où placer les planètes et la station (selon la pièce).
 */
export function createSpaceBackdrop({ seed = 7, stars = 5000, layout = 'cockpit' } = {}) {
  const rand = seeded(seed);
  const group = new THREE.Group();
  const sky = new THREE.Group(); // suit la caméra (ciel à l'infini)
  group.add(sky);

  const nebula = createNebula(950);
  sky.add(nebula);
  const starField = createStars(stars, 900, rand);
  sky.add(starField);

  const sunDir = new THREE.Vector3(0.8, 0.35, 0.45).normalize();
  const bigPlanet = createRealisticPlanet({
    radius: 130,
    texture: createIceGiantTexture(),
    atmo: 0x4fb4ff,
    lightDir: sunDir,
    ring: { inner: 170, outer: 270, colorA: 0x8fb4d8, colorB: 0xe6f2ff, tiltX: Math.PI / 2.5, tiltY: 0.3, tiltZ: 0.25 }
  });
  bigPlanet.setOpacity(1);
  const moon = createRealisticPlanet({
    radius: 34,
    texture: createRedGiantTexture(),
    atmo: 0xffa060,
    lightDir: sunDir,
    ring: { inner: 44, outer: 70, colorA: 0xa08670, colorB: 0xf2e2c8, tiltX: Math.PI / 2.3, tiltY: -0.4, tiltZ: -0.2 }
  });
  moon.setOpacity(1);

  const station = createStation();

  const layouts = {
    cockpit: { planet: [-330, -70, -640], moon: [260, 120, -760], station: [70, -6, -150], stationScale: 0.6 },
    hq: { planet: [380, -40, -620], moon: [-300, 160, -700], station: [-120, 20, -260], stationScale: 0.8 },
    lab: { planet: [-60, -220, -620], moon: [320, 60, -560], station: [160, 30, -240], stationScale: 0.7 }
  };
  const L = layouts[layout] || layouts.cockpit;
  bigPlanet.group.position.set(...L.planet);
  moon.group.position.set(...L.moon);
  station.group.position.set(...L.station);
  station.group.scale.setScalar(L.stationScale);
  station.group.rotation.set(0.5, 0.2, 0.35);
  group.add(bigPlanet.group, moon.group, station.group);

  // Soleil lointain (lumière principale des pièces)
  const sun = new THREE.DirectionalLight(0xcfe2ff, 1.6);
  sun.position.copy(sunDir).multiplyScalar(100);
  group.add(sun);

  let opacity = 1;
  function setOpacity(v) {
    opacity = v;
    starField.material.uniforms.uOpacity.value = v;
    nebula.material.uniforms.uOpacity.value = 0.25 + v * 0.75;
    bigPlanet.setOpacity(v);
    moon.setOpacity(v);
    station.group.visible = v > 0.02;
  }

  function update(t, camera) {
    if (camera) sky.position.copy(camera.position);
    starField.material.uniforms.uTime.value = t;
    station.group.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.0012);
    station.beacon.visible = Math.sin(t * 3) > 0.2;
    bigPlanet.group.rotation.y = t * 0.004;
    bigPlanet.update();
    moon.update();
  }

  return {
    group,
    sun,
    update,
    setOpacity,
    get opacity() {
      return opacity;
    }
  };
}
