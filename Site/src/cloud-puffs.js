import * as THREE from 'three';

// =========================================================================
// NUAGES « VOLUMÉTRIQUES » EN SPRITES
// Chaque nuage est un amas de petites « bouffées » : des carrés toujours
// tournés vers la caméra, qui portent une texture de vapeur douce générée
// par code. Des milliers de bouffées superposées et semi-transparentes
// donnent l'illusion d'un vrai volume, pour un seul appel de dessin.
// =========================================================================

// Texture de bouffée de vapeur : bruit fractal dans un disque aux bords doux
function createPuffTexture(size = 256) {
  const grid = 64;
  const rand = new Float32Array(grid * grid).map(() => Math.random());
  const at = (x, y) => rand[(((y % grid) + grid) % grid) * grid + (((x % grid) + grid) % grid)];
  const smooth = (t) => t * t * (3 - 2 * t);
  function noise(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = at(xi, yi);
    const b = at(xi + 1, yi);
    const c = at(xi, yi + 1);
    const d = at(xi + 1, yi + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  }
  function fbm(x, y) {
    let v = 0;
    let amp = 0.5;
    for (let o = 0; o < 5; o++) {
      v += amp * noise(x, y);
      x = x * 2.03 + 17.1;
      y = y * 2.03 + 9.7;
      amp *= 0.5;
    }
    return v;
  }

  const cvs = document.createElement('canvas');
  cvs.width = size;
  cvs.height = size;
  const ctx = cvs.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size - 0.5;
      const v = y / size - 0.5;
      const d = Math.sqrt(u * u + v * v) * 2; // 0 au centre, 1 au bord
      const n = fbm(x / size * 5, y / size * 5);
      // Disque doux, rongé par le bruit sur les bords : contours vaporeux
      const disc = 1 - THREE.MathUtils.smoothstep(d, 0.2, 0.98);
      let a = disc * (0.35 + n * 1.1) - 0.18;
      a = Math.max(0, Math.min(1, a * 1.5));
      const i = (y * size + x) * 4;
      const lum = 200 + n * 55; // détail interne (canal R = relief)
      img.data[i] = lum;
      img.data[i + 1] = lum;
      img.data[i + 2] = lum;
      img.data[i + 3] = a * a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.NoColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

/**
 * Crée les nuages en bouffées.
 * clusters : liste de { x, y, z, scale } (centre et taille de chaque nuage)
 * dayUniform : uniform partagé 0 (nuit) -> 1 (jour)
 */
export function createCloudPuffs({ clusters, dayUniform, puffsPerCloud = 12 }) {
  const puffs = [];
  clusters.forEach((c) => {
    const w = 9 * c.scale; // demi-largeur du nuage
    const h = 6 * c.scale; // hauteur du dôme
    const count = puffsPerCloud + Math.floor(Math.random() * 5);
    const stretch = 0.55 + Math.random() * 0.35; // nuages un peu allongés
    const yaw = Math.random() * Math.PI * 2;
    for (let i = 0; i < count; i++) {
      // Point au hasard dans une ellipse, avec plus de bouffées au centre
      const r = Math.sqrt(Math.random()) * 0.95;
      const t = Math.random() * Math.PI * 2;
      const lx = Math.cos(t) * r * w;
      const lz = Math.sin(t) * r * w * stretch;
      // Cumulus : base plate, sommet en dôme
      const dome = Math.max(0, 1 - r * r);
      const ly = dome * h * (0.35 + Math.random() * 0.65);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      puffs.push({
        x: c.x + lx * cosY - lz * sinY,
        y: c.y + ly,
        z: c.z + lx * sinY + lz * cosY,
        size: c.scale * (6.5 + Math.random() * 5.5) * (1.15 - r * 0.45),
        shade: ly / h, // 0 = ventre, 1 = sommet
        rot: Math.random() * Math.PI * 2,
        alpha: 0.55 + Math.random() * 0.45
      });
    }
  });
  // Bouffées du bas dessinées d'abord : vus d'en haut, les sommets clairs
  // recouvrent les ventres sombres sans tri coûteux à chaque image.
  puffs.sort((a, b) => a.y - b.y);

  const uniforms = {
    map: { value: createPuffTexture() },
    uOpacity: { value: 1 },
    // Part des bouffées dessinées (mode léger : on en garde moins, plus grosses)
    uKeep: { value: 1 },
    uDay: dayUniform
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      attribute vec4 aPuff; // x : hauteur dans le nuage, y : rotation, z : opacité, w : tirage au sort
      uniform float uKeep;
      varying vec2 vUv;
      varying vec2 vCorner;
      varying float vShade;
      varying float vAlpha;
      varying float vDepth;
      void main() {
        // Mode léger : bouffée écartée, envoyée hors de l'écran (rien à dessiner)
        if (aPuff.w > uKeep) {
          gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
          return;
        }
        vec3 center = instanceMatrix[3].xyz;
        // Moins de bouffées : celles qui restent grossissent pour garder le volume
        float size = length(instanceMatrix[0].xyz) * mix(1.3, 1.0, uKeep);
        vec4 mv = modelViewMatrix * vec4(center, 1.0);
        // Carré toujours face à la caméra, tourné sur lui-même au hasard
        float c = cos(aPuff.y);
        float s = sin(aPuff.y);
        vec2 corner = position.xy;
        mv.xy += vec2(corner.x * c - corner.y * s, corner.x * s + corner.y * c) * size;
        vUv = uv;
        vCorner = corner;
        vShade = aPuff.x;
        vAlpha = aPuff.z;
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float uOpacity;
      uniform float uDay;
      varying vec2 vUv;
      varying vec2 vCorner;
      varying float vShade;
      varying float vAlpha;
      varying float vDepth;
      void main() {
        vec4 tex = texture2D(map, vUv);
        if (tex.a < 0.01) discard;
        // Éclairage : sommet du nuage et haut de chaque bouffée plus clairs,
        // relief interne donné par la texture
        float light = clamp(vShade * 0.7 + (vCorner.y + 0.5) * 0.35, 0.0, 1.0);
        light *= 0.72 + 0.28 * tex.r;

        // Nuit : ventre violet, sommet bleu lunaire, lueur des néons par-dessous
        vec3 night = mix(vec3(0.06, 0.05, 0.13), vec3(0.36, 0.40, 0.58), smoothstep(0.15, 0.95, light));
        night += vec3(0.15, 0.03, 0.13) * (1.0 - light) * (1.0 - vShade);
        // Jour : ventre gris-bleu, sommet blanc éclatant
        vec3 day = mix(vec3(0.56, 0.63, 0.76), vec3(1.0, 0.99, 0.97), smoothstep(0.1, 0.9, light));
        vec3 col = mix(night, day, uDay);

        // Disparaît près de la caméra (on traverse la brume) et à l'horizon
        float closeFade = smoothstep(4.0, 40.0, vDepth);
        float farFade = 1.0 - smoothstep(1150.0, 1450.0, vDepth);
        float a = tex.a * vAlpha * uOpacity * closeFade * farFade;
        gl_FragColor = vec4(col, a);
      }
    `
  });

  const geo = new THREE.PlaneGeometry(1, 1);
  const extra = new Float32Array(puffs.length * 4);
  const mesh = new THREE.InstancedMesh(geo, material, puffs.length);
  mesh.frustumCulled = false;
  const dummy = new THREE.Object3D();
  puffs.forEach((p, i) => {
    dummy.position.set(p.x, p.y, p.z);
    dummy.scale.setScalar(p.size);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    extra.set([p.shade, p.rot, p.alpha, Math.random()], i * 4);
  });
  geo.setAttribute('aPuff', new THREE.InstancedBufferAttribute(extra, 4));
  mesh.instanceMatrix.needsUpdate = true;

  return { mesh, uniforms };
}
