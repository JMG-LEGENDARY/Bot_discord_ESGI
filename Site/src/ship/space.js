import * as THREE from 'three';
import { createRealisticPlanet, createIceGiantTexture, createRedGiantTexture, createGasGiantTexture } from '../planets.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
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
        // Voie lactée : bande de lumière laiteuse, coeur plus chaud, poussières sombres
        float mwAxis = dot(d, normalize(vec3(0.35, 0.82, -0.45)));
        float mw = exp(-mwAxis * mwAxis * 60.0);
        float core = exp(-pow(length(d - normalize(vec3(-0.55, 0.12, -0.83))), 2.0) * 3.0);
        float dust = smoothstep(0.45, 0.75, fbm(d * 9.0 + vec3(2.0, 7.0, 1.0)));
        float grain = fbm(d * 26.0);
        vec3 milky = mix(vec3(0.1, 0.13, 0.26), vec3(0.22, 0.18, 0.2), core);
        col += milky * mw * pow(grain, 1.6) * 1.2 * (1.0 - dust * 0.8) * (0.45 + core * 0.25);
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

// Galaxie spirale calculée par la carte graphique (façon M81) : coeur doré
// très lumineux, disque laiteux, bras bleu-violet en spirale logarithmique,
// amas roses de jeunes étoiles, bandes de poussière sombres le long des bras.
function createGalaxyMaterial({ arms = 2, twist = 3.0, seed = 1, core = [1.0, 0.8, 0.55], arm = [0.42, 0.45, 1.0], knot = [1.0, 0.32, 0.72], bright = 1 }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uArms: { value: arms },
      uTwist: { value: twist },
      uSeed: { value: seed },
      uCore: { value: new THREE.Color(...core) },
      uArm: { value: new THREE.Color(...arm) },
      uKnot: { value: new THREE.Color(...knot) },
      uBright: { value: bright },
      uOpacity: { value: 1 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uArms;
      uniform float uTwist;
      uniform float uSeed;
      uniform vec3 uCore;
      uniform vec3 uArm;
      uniform vec3 uKnot;
      uniform float uBright;
      uniform float uOpacity;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7)) + uSeed * 17.3) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.07 + 3.1; a *= 0.5; }
        return v;
      }
      void main() {
        vec2 p = (vUv - 0.5) * 2.0;
        float r = length(p);
        if (r > 1.0) discard;
        float a = atan(p.y, p.x);
        // Spirale logarithmique serrée (bras enroulés comme M81)
        float phase = uArms * a - uTwist * uArms * log(r + 0.03);
        phase += (fbm(p * 2.6) - 0.5) * 1.6;
        float armMask = pow(0.5 + 0.5 * cos(phase), 4.0);
        // Bras secondaires plus fins (aspect floconneux)
        float fineArms = pow(0.5 + 0.5 * cos(phase * 2.0 + fbm(p * 5.0) * 3.0), 7.0) * 0.45;
        float radial = smoothstep(0.1, 0.3, r) * (1.0 - smoothstep(0.6, 1.0, r));
        float arms = (armMask + fineArms) * radial;
        // Poussières sombres sur le bord intérieur des bras
        float dust = pow(0.5 + 0.5 * cos(phase + 0.75), 10.0) * smoothstep(0.14, 0.32, r) * (1.0 - smoothstep(0.7, 0.95, r));
        dust *= 0.5 + 0.8 * fbm(p * 20.0);
        // Nuages d'étoiles en grains, amas roses, taches bleues lointaines
        float speck = smoothstep(0.45, 0.8, fbm(p * 26.0 + uSeed));
        float clumps = fbm(p * 12.0 + uSeed);
        float knots = smoothstep(0.66, 0.86, fbm(p * 24.0 + 7.0)) * armMask * radial;
        float outer = smoothstep(0.5, 0.85, fbm(p * 9.0 - 3.0)) * smoothstep(0.55, 0.85, r) * (1.0 - smoothstep(0.8, 1.0, r));
        // Bulbe doré, disque intérieur jaunâtre
        // Détails fins atténués quand la galaxie est petite à l'écran (pas de scintillement)
        float detail = clamp(1.0 - fwidth(r) * 55.0, 0.0, 1.0);
        speck *= detail;
        knots *= 0.4 + 0.6 * detail;
        float bulge = exp(-r * r * 14.0);
        float nucleus = exp(-r * r * 400.0);
        float innerDisk = exp(-r * 4.5) * (1.0 - smoothstep(0.3, 0.6, r));
        vec3 col = vec3(0.0);
        // Dégradé : coeur blanc doré, disque pêche, bras bleu-violet, bord bleu nuit
        vec3 armCol = mix(mix(uArm, vec3(0.85, 0.7, 0.95), 0.35), uArm * vec3(0.8, 0.85, 1.15), smoothstep(0.3, 0.85, r));
        col += mix(vec3(1.0, 0.95, 0.88), uCore, 0.45) * bulge * 0.8;
        col += vec3(1.0, 0.93, 0.8) * nucleus * 2.4; // halo de lumière (bloom)
        col += mix(uCore, vec3(0.8, 0.66, 0.6), 0.5) * innerDisk * 0.3;
        col += armCol * arms * (0.25 + clumps * 0.55 + speck * 0.65) * 0.85;
        col += uArm * outer * 0.16;
        col += uKnot * knots * 1.9;
        col *= 1.0 - dust * 0.82;
        // Halo bleuté diffus autour du disque
        col += uArm * 0.07 * exp(-r * 2.2);
        // Étoiles brillantes isolées dans les bras
        vec2 cell = floor(p * 70.0);
        float h = hash(cell + uSeed);
        float dStar = length(fract(p * 70.0) - 0.5);
        col += vec3(0.85, 0.9, 1.0) * step(0.982, h) * smoothstep(0.32, 0.0, dStar) * (0.3 + arms * 1.4) * detail;
        col *= 1.0 - smoothstep(0.86, 1.0, r);
        gl_FragColor = vec4(col * uBright * uOpacity, 1.0);
      }
    `
  });
}

// Étoile brillante avec rayons de diffraction
function createFlareTexture() {
  const S = 128;
  const c = document.createElement('canvas');
  c.width = S;
  c.height = S;
  const g = c.getContext('2d');
  const h = S / 2;
  const glow = g.createRadialGradient(h, h, 0, h, h, h);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.08, 'rgba(220,235,255,0.8)');
  glow.addColorStop(0.3, 'rgba(140,180,255,0.12)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, S, S);
  g.globalCompositeOperation = 'lighter';
  [[S, 2], [2, S]].forEach(([w, ht]) => {
    const lg = w > ht ? g.createLinearGradient(0, h, S, h) : g.createLinearGradient(h, 0, h, S);
    lg.addColorStop(0, 'rgba(180,210,255,0)');
    lg.addColorStop(0.5, 'rgba(230,240,255,0.9)');
    lg.addColorStop(1, 'rgba(180,210,255,0)');
    g.fillStyle = lg;
    g.fillRect(h - w / 2, h - ht / 2, w, ht);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Lointains : galaxies, étoiles brillantes (accrochés au ciel)
function createDeepSky(rand) {
  const group = new THREE.Group();
  const mats = [];
  const galaxies = [
    // Devant la baie vitrée (là où le pilote regarde)
    { dir: [0.24, 0.3, -0.92], size: 260, tilt: 0.95, spin: 0.5, opts: { arms: 2, twist: 3.1, seed: 1, bright: 1.2 } },
    { dir: [-0.44, 0.24, -0.86], size: 170, tilt: 0.6, spin: 2.1, opts: { arms: 2, twist: 3.4, seed: 2, arm: [0.62, 0.5, 1.0], knot: [1.0, 0.4, 0.85] } },
    { dir: [0.55, 0.12, -0.82], size: 110, tilt: 1.1, spin: 1.2, opts: { arms: 3, twist: 2.6, seed: 3, arm: [0.45, 0.75, 1.0], knot: [1.0, 0.45, 0.7] } },
    // Près de l'horizon : visibles aussi par les baies du QG et du labo
    { dir: [-0.5, 0.05, -0.86], size: 150, tilt: 1.0, spin: 0.9, opts: { arms: 2, twist: 3.2, seed: 21, bright: 1.1 } },
    { dir: [0.97, 0.12, -0.15], size: 110, tilt: 0.55, spin: 1.4, opts: { arms: 2, twist: 3.4, seed: 24 } },
    // Autour, pour le QG et le laboratoire
    { dir: [0.9, 0.14, 0.4], size: 180, tilt: 0.8, spin: 0.2, opts: { arms: 2, twist: 3.0, seed: 5 } },
    { dir: [-0.85, 0.3, 0.42], size: 140, tilt: 0.5, spin: 1.6, opts: { arms: 2, twist: 2.8, seed: 6, arm: [0.55, 0.6, 1.0] } },
  ];
  // Plus loin : quelques petites galaxies dans tout le ciel
  // (plus nombreuses devant la baie vitrée)
  const palette = [
    [0.42, 0.45, 1.0],
    [0.6, 0.5, 1.0],
    [0.45, 0.72, 1.0],
    [0.75, 0.55, 1.0],
    [0.5, 0.6, 0.95]
  ];
  for (let i = 0; i < 2; i++) {
    const front = i < 1;
    const yaw = front ? (rand() - 0.5) * 1.6 : rand() * Math.PI * 2;
    const pitch = front ? -0.1 + rand() * 0.75 : (rand() - 0.3) * 1.2;
    galaxies.push({
      dir: [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)],
      size: 26 + rand() * 46,
      tilt: 0.2 + rand() * 1.15,
      spin: rand() * Math.PI * 2,
      opts: {
        arms: rand() < 0.75 ? 2 : 3,
        twist: 2.5 + rand() * 1.3,
        seed: 10 + i,
        arm: palette[Math.floor(rand() * palette.length)],
        bright: 0.75 + rand() * 0.4
      }
    });
  }
  galaxies.forEach((gx) => {
    const mat = createGalaxyMaterial(gx.opts);
    mats.push(mat);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(gx.size, gx.size), mat);
    m.position.set(...gx.dir).normalize().multiplyScalar(860);
    m.lookAt(0, 0, 0);
    m.rotateX(gx.tilt);
    m.rotateZ(gx.spin);
    m.userData.spin = (rand() - 0.5) * 0.004;
    group.add(m);
  });
  const flareTex = createFlareTexture();
  for (let i = 0; i < 14; i++) {
    const u = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(1 - u * u);
    const mat = new THREE.SpriteMaterial({
      map: flareTex,
      color: new THREE.Color().setHSL(0.55 + rand() * 0.15, 0.6, 0.75 + rand() * 0.2),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false
    });
    mats.push(mat);
    const sp = new THREE.Sprite(mat);
    sp.position.set(Math.cos(a) * r, u, Math.sin(a) * r).multiplyScalar(870);
    sp.scale.setScalar(14 + rand() * 22);
    sp.userData.tw = rand() * 10;
    group.add(sp);
  }
  return { group, mats };
}

// Ceinture d'astéroïdes autour du vaisseau
// Trois formes de rochers modelées une fois (bosses, cratères à rebord),
// ombrage lisse et texture de roche calculée par la carte graphique
// (veines claires, taches, creux sombres). Un appel GPU par forme.
function rockGeometry(rand) {
  let geo = new THREE.IcosahedronGeometry(1, 4);
  geo.deleteAttribute('normal');
  geo.deleteAttribute('uv');
  geo = mergeVertices(geo);
  // Bosses : somme de vagues dans des directions au hasard
  const waves = [];
  for (let k = 0; k < 9; k++) {
    const d = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    waves.push({ d, f: 1.2 + rand() * (k < 3 ? 1.5 : 7), a: (k < 3 ? 0.16 : 0.055) * (0.5 + rand()), ph: rand() * 6.28 });
  }
  const craters = [];
  for (let k = 0; k < 11; k++) {
    craters.push({ c: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(), r: 0.12 + rand() * 0.32, depth: 0.07 + rand() * 0.12 });
  }
  const stretch = new THREE.Vector3(1 + rand() * 0.5, 0.65 + rand() * 0.3, 0.85 + rand() * 0.3);
  const pos = geo.attributes.position;
  const p = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i).normalize();
    let h = 1;
    waves.forEach((w) => (h += Math.sin(p.dot(w.d) * w.f * 3 + w.ph) * w.a));
    craters.forEach((cr) => {
      const d = p.angleTo(cr.c) / cr.r;
      if (d < 1) h -= cr.depth * (1 - d * d); // cuvette
      else if (d < 1.35) h += cr.depth * 0.35 * Math.sin(((d - 1) / 0.35) * Math.PI); // rebord
    });
    p.multiplyScalar(h).multiply(stretch);
    pos.setXYZ(i, p.x, p.y, p.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function rockMaterial() {
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0.02, fog: false });
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vRockPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRockPos = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vRockPos;
        float rh(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
        float rn(vec3 p) {
          vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(rh(i), rh(i + vec3(1,0,0)), f.x), mix(rh(i + vec3(0,1,0)), rh(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(rh(i + vec3(0,0,1)), rh(i + vec3(1,0,1)), f.x), mix(rh(i + vec3(0,1,1)), rh(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        float rf(vec3 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * rn(p); p *= 2.1; a *= 0.5; } return v; }`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float rock = rf(vRockPos * 3.0);
        float grain = rf(vRockPos * 18.0);
        float speck = rn(vRockPos * 55.0);
        float vein = 1.0 - smoothstep(0.0, 0.05, abs(rf(vRockPos * 1.6 + 4.0) - 0.5));
        diffuseColor.rgb *= 0.62 + rock * 0.7;
        diffuseColor.rgb *= 0.82 + grain * 0.38;
        diffuseColor.rgb *= 0.85 + step(0.82, speck) * 0.4;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.5 + 0.03, vein * 0.35);
        // Creux et fonds de cratères plus sombres, bosses plus claires
        diffuseColor.rgb *= 0.68 + 0.5 * smoothstep(0.8, 1.12, length(vRockPos / vec3(1.2, 0.85, 1.0)));`
      );
  };
  mat.customProgramCacheKey = () => 'asteroid-rock-v3';
  return mat;
}

function createAsteroidBelt(rand, count) {
  const group = new THREE.Group();
  const mat = rockMaterial();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const sc = new THREE.Vector3();
  const tones = [
    [0.08, 0.12, 0.42],
    [0.06, 0.18, 0.36],
    [0.62, 0.06, 0.4],
    [0.75, 0.08, 0.45],
    [0.1, 0.05, 0.5]
  ];
  const per = Math.ceil(count / 3);
  for (let shape = 0; shape < 3; shape++) {
    const rocks = new THREE.InstancedMesh(rockGeometry(rand), mat, per);
    for (let i = 0; i < per; i++) {
      const a = rand() * Math.PI * 2;
      const r = 70 + rand() * 90;
      v.set(Math.cos(a) * r, -18 + rand() * 40 + Math.sin(a * 3) * 8, Math.sin(a) * r);
      e.set(rand() * 6, rand() * 6, rand() * 6);
      q.setFromEuler(e);
      const s = 0.6 + Math.pow(rand(), 3) * 5;
      sc.set(s, s, s);
      m.compose(v, q, sc);
      rocks.setMatrixAt(i, m);
      const t = tones[Math.floor(rand() * tones.length)];
      rocks.setColorAt(i, new THREE.Color().setHSL(t[0] + (rand() - 0.5) * 0.03, t[1], t[2] + rand() * 0.12));
    }
    rocks.frustumCulled = false;
    group.add(rocks);
  }
  return group;
}

// Trafic : petits vaisseaux qui traversent le ciel, réacteurs allumés
function createTraffic(rand) {
  const group = new THREE.Group();
  const hullMat = new THREE.MeshStandardMaterial({ color: 0x9aa3bd, metalness: 0.7, roughness: 0.35, fog: false });
  const ships = [];
  const colors = [[0.3, 1.4, 2.2], [2.2, 0.4, 1.5], [1.4, 0.8, 2.2], [2.0, 1.3, 0.4]];
  for (let i = 0; i < 6; i++) {
    const ship = new THREE.Group();
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.9, 4.2, 6), hullMat);
    body.rotation.z = -Math.PI / 2;
    ship.add(body);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 3.4), hullMat);
    wing.position.x = -0.6;
    ship.add(wing);
    const c = colors[i % colors.length];
    const engine = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(...c), toneMapped: false, fog: false }));
    engine.position.x = -2.2;
    engine.scale.set(1.6, 0.8, 0.8);
    ship.add(engine);
    const trail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.45, 9, 8, 1, true),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(...c).multiplyScalar(0.35), transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    trail.rotation.z = Math.PI / 2;
    trail.position.x = -6.8;
    ship.add(trail);
    group.add(ship);
    // Trajet : une ligne droite loin des baies, parcourue en boucle
    const yaw = rand() * Math.PI * 2;
    const dist = 90 + rand() * 120;
    ships.push({ ship, yaw, dist, y: -10 + rand() * 50, speed: 10 + rand() * 16, phase: rand() * 400, span: 420, scale: 1 + rand() * 1.5 });
  }
  function update(t) {
    ships.forEach((s) => {
      const u = ((t * s.speed + s.phase) % s.span) - s.span / 2;
      const cx = Math.sin(s.yaw) * s.dist;
      const cz = -Math.cos(s.yaw) * s.dist;
      // Direction perpendiculaire au regard : ils passent devant les baies
      const dx = Math.cos(s.yaw);
      const dz = Math.sin(s.yaw);
      s.ship.position.set(cx + dx * u, s.y, cz + dz * u);
      s.ship.rotation.y = -s.yaw;
      s.ship.scale.setScalar(s.scale);
    });
  }
  return { group, update };
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
  const deep = createDeepSky(rand);
  sky.add(deep.group);
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

  // Deux planètes lointaines de plus : une violette, une verte d'eau
  const noRing = { inner: 0.001, outer: 0.002, colorA: 0x000000, colorB: 0x000000, tiltX: 0, tiltY: 0 };
  const violet = createRealisticPlanet({
    radius: 22,
    texture: createGasGiantTexture({
      width: 512,
      height: 256,
      stops: [[0, '#1a0b3a'], [0.25, '#4b2a8f'], [0.45, '#9a6fe0'], [0.55, '#c9b0ff'], [0.7, '#6a3fbf'], [1, '#160830']],
      bands: 10,
      turbulence: 0.06
    }),
    atmo: 0xb08cff,
    lightDir: sunDir,
    ring: { inner: 30, outer: 46, colorA: 0x8f7fd8, colorB: 0xe6dcff, tiltX: Math.PI / 2.2, tiltY: 0.6, tiltZ: 0.1 }
  });
  violet.setOpacity(1);
  const teal = createRealisticPlanet({
    radius: 14,
    texture: createGasGiantTexture({
      width: 512,
      height: 256,
      stops: [[0, '#06262a'], [0.3, '#1d7a78'], [0.5, '#7fe0d0'], [0.62, '#3fb0a8'], [1, '#05201f']],
      bands: 7,
      turbulence: 0.08
    }),
    atmo: 0x7ff0e0,
    lightDir: sunDir,
    ring: noRing
  });
  teal.setOpacity(1);

  const station = createStation();
  const belt = createAsteroidBelt(rand, layout === 'cockpit' ? 90 : 160);
  const traffic = createTraffic(rand);

  const layouts = {
    cockpit: { planet: [-330, -70, -640], moon: [260, 120, -760], station: [70, -6, -150], stationScale: 0.6, violet: [520, 260, -560], teal: [-120, 150, -720] },
    hq: { planet: [380, -40, -620], moon: [-300, 160, -700], station: [-120, 20, -260], stationScale: 0.8, violet: [-520, 220, -420], teal: [140, 190, -760] },
    lab: { planet: [-420, 30, -560], moon: [380, 110, -520], station: [160, 40, -240], stationScale: 0.7, violet: [-150, 230, -620], teal: [300, 260, -560] }
  };
  const L = layouts[layout] || layouts.cockpit;
  bigPlanet.group.position.set(...L.planet);
  moon.group.position.set(...L.moon);
  station.group.position.set(...L.station);
  station.group.scale.setScalar(L.stationScale);
  station.group.rotation.set(0.5, 0.2, 0.35);
  violet.group.position.set(...L.violet);
  teal.group.position.set(...L.teal);
  group.add(bigPlanet.group, moon.group, station.group, violet.group, teal.group, belt, traffic.group);

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
    violet.setOpacity(v);
    teal.setOpacity(v);
    deep.mats.forEach((m) => {
      if (m.uniforms) m.uniforms.uOpacity.value = v;
      else m.opacity = v;
    });
    station.group.visible = v > 0.02;
    belt.visible = v > 0.02;
    traffic.group.visible = v > 0.02;
  }

  function update(t, camera) {
    if (camera) sky.position.copy(camera.position);
    starField.material.uniforms.uTime.value = t;
    station.group.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.0012);
    station.beacon.visible = Math.sin(t * 3) > 0.2;
    bigPlanet.group.rotation.y = t * 0.004;
    bigPlanet.update();
    moon.update();
    violet.update();
    teal.update();
    belt.rotation.y = t * 0.006;
    traffic.update(t);
    // Les galaxies tournent à peine, les grosses étoiles scintillent
    deep.group.children.forEach((o) => {
      if (o.isSprite) o.material.opacity = (0.75 + 0.25 * Math.sin(t * 1.7 + o.userData.tw)) * opacity;
      else o.rotateZ(o.userData.spin * 0.016);
    });
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
