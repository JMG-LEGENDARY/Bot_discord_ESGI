import * as THREE from 'three';

// =========================================================================
// PLANÈTES RÉALISTES
// - Texture de géante gazeuse générée par code : bandes turbulentes,
//   filaments et tempêtes (raccord parfait autour de la sphère)
// - Éclairage par un soleil lointain : face nuit, terminateur doux,
//   assombrissement du bord (limbe)
// - Halo d'atmosphère côté éclairé
// - Anneaux à fines bandes, division sombre et ombre de la planète
// =========================================================================

// Bruit de valeur périodique en x (pour que la texture se raccorde)
function makeNoise() {
  const N = 256;
  const r = new Float32Array(N * N).map(() => Math.random());
  const smooth = (t) => t * t * (3 - 2 * t);
  function noise(x, y, period) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const x0 = ((xi % period) + period) % period;
    const x1 = (x0 + 1) % period;
    const y0 = ((yi % N) + N) % N;
    const y1 = (y0 + 1) % N;
    const a = r[y0 * N + x0];
    const b = r[y0 * N + x1];
    const c = r[y1 * N + x0];
    const d = r[y1 * N + x1];
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  }
  // fbm : u dans [0,1[ fait le tour de la planète, v en « unités de bruit »
  return function fbm(u, v, baseFreq, octaves = 4) {
    let sum = 0;
    let amp = 0.5;
    let f = baseFreq;
    for (let o = 0; o < octaves; o++) {
      sum += amp * noise(u * f, v * (f / baseFreq), f);
      f *= 2;
      v = v * 2 + 3.1;
      amp *= 0.5;
    }
    return sum;
  };
}

// Dégradé de couleurs -> table de 256 teintes
function makeLut(stops) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 1;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 256, 0);
  stops.forEach(([p, col]) => g.addColorStop(p, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 1);
  return ctx.getImageData(0, 0, 256, 1).data;
}

/**
 * Texture de géante gazeuse.
 * stops : dégradé parcouru par les bandes ; bands : nombre de bandes ;
 * storms : [{ u, v, ru, rv, color: [r,g,b], swirl }] (u, v dans [0,1])
 */
export function createGasGiantTexture({ stops, bands = 9, turbulence = 0.06, storms = [], width = 1024, height = 512 }) {
  const fbm = makeNoise();
  const lut = makeLut(stops);
  const cvs = document.createElement('canvas');
  cvs.width = width;
  cvs.height = height;
  const ctx = cvs.getContext('2d');
  const img = ctx.createImageData(width, height);
  const d = img.data;

  // Chaque bande a sa propre teinte (pseudo-aléatoire mais stable)
  const bandShift = Array.from({ length: 64 }, () => Math.random());

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      let u = x / width;
      let lat = v;

      // Tempêtes : tourbillon qui déforme les bandes autour
      let stormMix = 0;
      let stormCol = null;
      for (const s of storms) {
        let du = u - s.u;
        du -= Math.round(du);
        const dv = lat - s.v;
        const e = Math.sqrt((du / s.ru) ** 2 + (dv / s.rv) ** 2);
        if (e < 2.2) {
          const ang = (s.swirl || 2.5) * Math.max(0, 1 - e / 2.2) ** 2;
          const ca = Math.cos(ang);
          const sa = Math.sin(ang);
          const ru = du * ca - (dv * s.ru) / s.rv * sa;
          const rv = (du * sa * s.rv) / s.ru + dv * ca;
          u = s.u + ru;
          lat = s.v + rv;
          const m = 1 - THREE.MathUtils.smoothstep(e, 0.55, 1.05);
          if (m > stormMix) {
            stormMix = m;
            stormCol = s.color;
          }
        }
      }
      u -= Math.floor(u);

      // Turbulence : les bandes ondulent et s'effilochent
      const warp = (fbm(u, lat * 6, 6) - 0.5) * turbulence + (fbm(u, lat * 22 + 40, 14, 3) - 0.5) * turbulence * 0.35;
      const bl = (lat + warp) * bands;
      const bi = Math.floor(bl);
      const frac = bl - bi;
      // Position dans le dégradé : suit la latitude + teinte propre à la bande
      const base = THREE.MathUtils.clamp(lat + warp * 0.6, 0, 1);
      const shift = (bandShift[((bi % 64) + 64) % 64] - 0.5) * 0.22;
      const t = THREE.MathUtils.clamp(base + shift * Math.sin(frac * Math.PI), 0, 0.999);
      const li = Math.floor(t * 255) * 4;

      // Filaments étirés dans le sens des vents
      const streak = fbm(u, lat * 90 + 7, 24, 3);
      const shade = 0.78 + streak * 0.42 + Math.sin(frac * Math.PI) * 0.06;

      let rr = lut[li] * shade;
      let gg = lut[li + 1] * shade;
      let bb = lut[li + 2] * shade;
      if (stormMix > 0) {
        const inner = 0.85 + fbm(u, lat * 40, 30, 3) * 0.3;
        rr += (stormCol[0] * inner - rr) * stormMix;
        gg += (stormCol[1] * inner - gg) * stormMix;
        bb += (stormCol[2] * inner - bb) * stormMix;
      }
      // Pôles un peu plus sombres et brumeux
      const pole = THREE.MathUtils.smoothstep(Math.abs(v - 0.5), 0.36, 0.5);
      const i = (y * width + x) * 4;
      d[i] = Math.min(255, rr * (1 - pole * 0.45));
      d[i + 1] = Math.min(255, gg * (1 - pole * 0.45));
      d[i + 2] = Math.min(255, bb * (1 - pole * 0.4));
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

const planetVertex = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const planetFragment = `
  uniform sampler2D map;
  uniform vec3 uLightDir;
  uniform vec3 uAtmo;
  uniform float uOpacity;
  uniform vec3 uRingNormal;
  uniform vec3 uCenter;
  uniform vec2 uRing; // rayons intérieur / extérieur des anneaux (monde)
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uLightDir);
    vec3 albedo = texture2D(map, vUv).rgb;

    float ndl = dot(N, L);
    // Terminateur doux (diffusion dans l'atmosphère)
    float diff = smoothstep(-0.18, 0.55, ndl);
    float ndv = max(dot(N, V), 0.0);
    float limb = mix(0.55, 1.0, pow(ndv, 0.45));

    // Ombre des anneaux sur la planète
    float ringShadow = 1.0;
    float denom = dot(L, uRingNormal);
    if (abs(denom) > 0.001) {
      float t = dot(uCenter - vWorldPos, uRingNormal) / denom;
      if (t > 0.0) {
        float r = length(vWorldPos + L * t - uCenter);
        float inRing = smoothstep(uRing.x, uRing.x + 3.0, r) * (1.0 - smoothstep(uRing.y - 3.0, uRing.y, r));
        ringShadow = 1.0 - inRing * 0.55;
      }
    }

    vec3 col = albedo * (0.018 + diff * 1.25 * ringShadow) * limb;
    // Diffusion de l'atmosphère sur le bord éclairé + liseré au terminateur
    float fres = pow(1.0 - ndv, 3.0);
    col += uAtmo * fres * smoothstep(-0.25, 0.6, ndl) * 1.1;
    col += uAtmo * 0.12 * (1.0 - smoothstep(0.0, 0.25, abs(ndl))) * smoothstep(-0.1, 0.0, ndl);

    gl_FragColor = vec4(col, uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const haloVertex = `
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const haloFragment = `
  uniform vec3 uLightDir;
  uniform vec3 uAtmo;
  uniform float uOpacity;
  uniform float uEdge;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vWorldPos);
    // Faces arrière de la coque : maximum contre la planète, nul au bord extérieur
    float d = clamp(-dot(N, V) / uEdge, 0.0, 1.0);
    float glow = pow(d, 2.2);
    float lit = smoothstep(-0.45, 0.6, dot(N, normalize(uLightDir)));
    vec3 col = uAtmo * glow * lit * 1.4;
    gl_FragColor = vec4(col, uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const ringVertex = `
  varying vec3 vWorldPos;
  varying float vR;
  void main() {
    vR = length(position.xy);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const ringFragment = `
  uniform vec3 uLightDir;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform vec2 uRadii;  // intérieur / extérieur (local)
  uniform vec3 uCenter; // centre de la planète (monde)
  uniform float uPlanetR; // rayon de la planète (monde)
  uniform vec3 uNormal;
  varying vec3 vWorldPos;
  varying float vR;

  float h1(float n) { return fract(sin(n) * 43758.5453); }
  float n1(float x) {
    float i = floor(x);
    float f = fract(x);
    return mix(h1(i), h1(i + 1.0), f * f * (3.0 - 2.0 * f));
  }

  void main() {
    float t = (vR - uRadii.x) / (uRadii.y - uRadii.x);
    // Fines bandes concentriques
    float b = n1(t * 38.0) * 0.55 + n1(t * 130.0) * 0.3 + n1(t * 420.0) * 0.15;
    float density = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.9, 1.0, t));
    density *= 0.35 + b * 0.9;
    // Division sombre (comme celle de Cassini) et un petit vide
    density *= 1.0 - 0.88 * (1.0 - smoothstep(0.0, 0.025, abs(t - 0.64)));
    density *= 1.0 - 0.6 * (1.0 - smoothstep(0.0, 0.01, abs(t - 0.86)));
    // Zone intérieure plus ténue
    density *= mix(0.35, 1.0, smoothstep(0.05, 0.3, t));

    vec3 col = mix(uColorA, uColorB, smoothstep(0.2, 0.9, b + t * 0.3));

    // Éclairage : les anneaux sont plus brillants face au soleil
    vec3 L = normalize(uLightDir);
    float lit = 0.32 + 0.5 * abs(dot(normalize(uNormal), L));

    // Ombre de la planète projetée sur les anneaux
    vec3 oc = vWorldPos - uCenter;
    float bb = dot(oc, L);
    float c = dot(oc, oc) - uPlanetR * uPlanetR;
    float shadow = 1.0;
    if (bb < 0.0) {
      float disc = bb * bb - c;
      shadow = 1.0 - 0.9 * smoothstep(0.0, uPlanetR * uPlanetR * 0.08, disc);
    }

    gl_FragColor = vec4(col * lit * shadow, density * uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/**
 * Crée une planète réaliste avec halo et anneaux.
 * Renvoie { group, mesh, setOpacity(v), update() }
 * mesh.material.uniforms.map.value : texture de surface (échangeable)
 */
export function createRealisticPlanet({
  radius,
  texture,
  atmo,
  lightDir,
  ring // { inner, outer, colorA, colorB, tiltX, tiltY }
}) {
  const group = new THREE.Group();
  const atmoColor = new THREE.Color(atmo);

  const center = new THREE.Vector3();
  const ringNormal = new THREE.Vector3(0, 0, 1);

  const planetUniforms = {
    map: { value: texture },
    uLightDir: { value: lightDir },
    uAtmo: { value: atmoColor },
    uOpacity: { value: 0 },
    uRingNormal: { value: ringNormal },
    uCenter: { value: center },
    uRing: { value: new THREE.Vector2(ring.inner, ring.outer) }
  };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 96, 64),
    new THREE.ShaderMaterial({
      uniforms: planetUniforms,
      vertexShader: planetVertex,
      fragmentShader: planetFragment,
      transparent: true
    })
  );
  // Axe un peu incliné, comme une vraie planète
  const tilt = new THREE.Group();
  tilt.rotation.z = ring.tiltZ || 0.25;
  tilt.add(mesh);
  group.add(tilt);

  const haloScale = 1.12;
  const haloUniforms = {
    uLightDir: { value: lightDir },
    uAtmo: { value: atmoColor },
    uOpacity: { value: 0 },
    uEdge: { value: Math.sqrt(1 - 1 / (haloScale * haloScale)) }
  };
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(radius * haloScale, 64, 48),
    new THREE.ShaderMaterial({
      uniforms: haloUniforms,
      vertexShader: haloVertex,
      fragmentShader: haloFragment,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  group.add(halo);

  const ringUniforms = {
    uLightDir: { value: lightDir },
    uColorA: { value: new THREE.Color(ring.colorA) },
    uColorB: { value: new THREE.Color(ring.colorB) },
    uOpacity: { value: 0 },
    uRadii: { value: new THREE.Vector2(ring.inner, ring.outer) },
    uCenter: { value: center },
    uPlanetR: { value: radius },
    uNormal: { value: ringNormal }
  };
  const ringMesh = new THREE.Mesh(
    new THREE.RingGeometry(ring.inner, ring.outer, 160, 1),
    new THREE.ShaderMaterial({
      uniforms: ringUniforms,
      vertexShader: ringVertex,
      fragmentShader: ringFragment,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false
    })
  );
  ringMesh.rotation.x = ring.tiltX;
  ringMesh.rotation.y = ring.tiltY;
  group.add(ringMesh);

  const tmpQ = new THREE.Quaternion();
  const tmpS = new THREE.Vector3();
  function update() {
    // Centre, taille et orientation en coordonnées monde (ombres)
    group.updateMatrixWorld();
    ringMesh.matrixWorld.decompose(center, tmpQ, tmpS);
    ringNormal.set(0, 0, 1).applyQuaternion(tmpQ);
    const s = tmpS.x;
    ringUniforms.uPlanetR.value = radius * s;
    planetUniforms.uRing.value.set(ring.inner * s, ring.outer * s);
  }

  function setOpacity(v) {
    planetUniforms.uOpacity.value = v;
    haloUniforms.uOpacity.value = v;
    ringUniforms.uOpacity.value = v;
    group.visible = v > 0.001;
  }

  return {
    group,
    mesh,
    update,
    setOpacity,
    get opacity() {
      return planetUniforms.uOpacity.value;
    }
  };
}

// Géante de glace bleue (planète de nuit), façon Neptune
export function createIceGiantTexture() {
  return createGasGiantTexture({
    stops: [
      [0, '#0b1a3a'],
      [0.18, '#1d4f9a'],
      [0.35, '#3d86d6'],
      [0.48, '#7cc4ec'],
      [0.56, '#5aa6e0'],
      [0.7, '#2a68b8'],
      [0.85, '#173e85'],
      [1, '#0a1733']
    ],
    bands: 11,
    turbulence: 0.05,
    storms: [
      { u: 0.3, v: 0.62, ru: 0.045, rv: 0.035, color: [18, 36, 92], swirl: 3 },
      { u: 0.72, v: 0.38, ru: 0.02, rv: 0.015, color: [210, 235, 255], swirl: 2 }
    ]
  });
}

// Géante rouge-orangée (planète de jour), façon Jupiter
export function createRedGiantTexture() {
  return createGasGiantTexture({
    stops: [
      [0, '#3a1408'],
      [0.12, '#7a3218'],
      [0.25, '#c8784a'],
      [0.36, '#e8c49a'],
      [0.45, '#b44a24'],
      [0.52, '#f0d2a8'],
      [0.6, '#c0582c'],
      [0.72, '#e2b07c'],
      [0.84, '#8a3a1a'],
      [1, '#2e1006']
    ],
    bands: 14,
    turbulence: 0.07,
    storms: [{ u: 0.62, v: 0.6, ru: 0.06, rv: 0.035, color: [176, 58, 30], swirl: 3.2 }]
  });
}
