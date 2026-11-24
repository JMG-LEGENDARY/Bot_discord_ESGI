import * as THREE from 'three';
import { SKY } from './theme.js';

function buildCottonCandyCloudGeometry(lobes) {
  const geos = lobes.map((l) => {
    const g = new THREE.SphereGeometry(1, 10, 8); // faible densité : nuages lointains, gros gain GPU
    const pos = g.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const fluff =
        1 +
        0.06 * Math.sin(v.x * 2.6 + l.x) * Math.cos(v.z * 2.4 + l.z) +
        0.04 * Math.cos(v.y * 2.8);
      v.x *= l.rx * fluff;
      v.y *= l.ry * fluff;
      v.z *= l.rz * fluff;
      v.x += l.x;
      v.y += l.y;
      v.z += l.z;
      pos.setXYZ(i, v.x, v.y, v.z);
    }

    g.computeVertexNormals();
    return g;
  });

  let totalVerts = 0;
  let totalIndices = 0;
  geos.forEach((g) => {
    totalVerts += g.attributes.position.count;
    totalIndices += g.index.count;
  });

  const mergedPos = new Float32Array(totalVerts * 3);
  const mergedNorm = new Float32Array(totalVerts * 3);
  const mergedIdx = new Uint32Array(totalIndices);

  let vOffset = 0;
  let iOffset = 0;
  geos.forEach((g) => {
    const count = g.attributes.position.count;
    mergedPos.set(g.attributes.position.array, vOffset * 3);
    mergedNorm.set(g.attributes.normal.array, vOffset * 3);

    const idxArr = g.index.array;
    for (let k = 0; k < idxArr.length; k++) {
      mergedIdx[iOffset + k] = idxArr[k] + vOffset;
    }

    vOffset += count;
    iOffset += idxArr.length;
    g.dispose();
  });

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(mergedPos, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(mergedNorm, 3));
  merged.setIndex(new THREE.BufferAttribute(mergedIdx, 1));
  merged.computeBoundingSphere();
  return merged;
}

function createPlanetTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 512;
  cvs.height = 256;
  const ctx = cvs.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.25, '#0284c7');
  grad.addColorStop(0.5, '#06b6d4');
  grad.addColorStop(0.75, '#1e3a8a');
  grad.addColorStop(1, '#090d16');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  for (let y = 12; y < 245; y += 10) {
    ctx.fillStyle = y % 20 === 0 ? 'rgba(56, 189, 248, 0.22)' : 'rgba(15, 23, 42, 0.28)';
    ctx.fillRect(0, y, 512, 5);
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createAtmosphere(scene, mainTowerHeight) {
  const atmoGroup = new THREE.Group();

  // 1. SHADER DU CIEL & DE L'ESPACE PROFOND (VOIE LACTÉE FBM + LIMBE HORIZON)
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(SKY.cityTop) },
    uMidColor: { value: new THREE.Color(SKY.cityMid) },
    uHorizonColor: { value: new THREE.Color(SKY.cityHorizon) },
    uSunDir: { value: new THREE.Vector3(0.45, 0.72, 0.52).normalize() },
    uSunIntensity: { value: 1.0 },
    uSpaceFactor: { value: 0.0 },
    uTime: { value: 0.0 }
  };

  const skyGeo = new THREE.SphereGeometry(1480, 64, 48);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 uTopColor;
      uniform vec3 uMidColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uSunDir;
      uniform float uSunIntensity;
      uniform float uSpaceFactor;
      uniform float uTime;
      varying vec3 vWorldPos;

      float hash(vec3 p) {
        p = fract(p * vec3(443.897, 441.423, 437.195));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
        );
      }

      float fbm(vec3 p) {
        float val = 0.0;
        float amp = 0.52;
        for (int i = 0; i < 5; i++) {
          val += amp * noise(p);
          p = p * 2.04 + vec3(13.1, 7.4, 5.2);
          amp *= 0.5;
        }
        return val;
      }

      void main() {
        vec3 dir = normalize(vWorldPos);
        float h = dir.y;

        vec3 col;
        if (h >= 0.0) {
          float t1 = smoothstep(0.0, 0.25, h);
          float t2 = smoothstep(0.18, 0.85, h);
          col = mix(uHorizonColor, uMidColor, t1);
          col = mix(col, uTopColor, t2);
        } else {
          col = uHorizonColor;
        }

        float sunAmt = max(dot(dir, uSunDir), 0.0);
        // Lune froide : halo large discret + disque net
        col += vec3(0.55, 0.65, 1.0) * pow(sunAmt, 24.0) * 0.18 * uSunIntensity;
        col += vec3(0.92, 0.95, 1.0) * pow(sunAmt, 900.0) * 1.4 * uSunIntensity;

        if (uSpaceFactor > 0.02) {
          // Limbe lumineux bleu-violet à l'horizon vu depuis le sommet
          float limb = exp(-abs(h + 0.015) * 15.0) * smoothstep(-0.22, 0.16, h);
          col += vec3(0.08, 0.36, 0.72) * limb * uSpaceFactor * 0.75;

          if (h > -0.15) {
            vec3 galCoord = vec3(
              dir.x * 0.72 + dir.y * 0.45 - dir.z * 0.52,
              dir.y * 0.82 - dir.x * 0.38,
              dir.z * 0.78 + dir.x * 0.42
            );

            float gx = galCoord.x * 3.1;
            float galacticPlane = exp(-(gx * gx));

            vec3 warp = vec3(
              fbm(galCoord * 3.2 + uTime * 0.004),
              fbm(galCoord * 3.2 + vec3(4.2)),
              fbm(galCoord * 3.2 + vec3(8.7))
            );
            float neb1 = fbm(galCoord * 4.5 + warp * 1.4);
            float neb2 = fbm(galCoord * 9.0 - warp * 1.1);
            float dustLane = smoothstep(0.44, 0.68, fbm(galCoord * 7.5 + vec3(2.1)));

            vec3 cyanNeb = vec3(0.04, 0.26, 0.48);
            vec3 violetNeb = vec3(0.28, 0.08, 0.42);
            vec3 coreGlow = vec3(0.55, 0.38, 0.62);

            vec3 galaxyColor = mix(cyanNeb, violetNeb, neb2);
            galaxyColor = mix(galaxyColor, coreGlow, smoothstep(0.55, 0.85, neb1) * galacticPlane);

            float intensity = galacticPlane * neb1 * (1.0 - dustLane * 0.72);
            col += galaxyColor * intensity * uSpaceFactor * 1.15;

            float microStar = hash(floor(dir * 520.0));
            if (microStar > 0.9965) {
              float twinkle = 0.65 + 0.35 * sin(uTime * 2.5 + microStar * 100.0);
              col += vec3(0.75, 0.88, 1.0) * twinkle * uSpaceFactor * 0.75;
            }
          }
        }

        gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
      }
    `
  });

  atmoGroup.add(new THREE.Mesh(skyGeo, skyMat));

  // 2. ÉCLAIRAGE DYNAMIQUE
  const hemiLight = new THREE.HemisphereLight(0x5a64b8, 0x140a24, 0.9);
  scene.add(hemiLight);

  // Lumière lunaire froide (même direction que la lune du ciel)
  const sunLight = new THREE.DirectionalLight(0xaab8ff, 0.9);
  sunLight.position.set(110, 230, 120);
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0xff3dbb, 0.45);
  rimLight.position.set(-80, 90, -70);
  scene.add(rimLight);

  // 3. MER DE NUAGES CONTINUE JUSQU'À L'HORIZON (SHADER FBM VELOUTÉ)
  const cloudBandY = mainTowerHeight * 0.52; // ~67.6m
  const cloudSeaUniforms = {
    uTime: { value: 0.0 },
    uOpacity: { value: 0.86 }
  };

  const cloudSeaGeo = new THREE.RingGeometry(34, 1440, 96, 1);
  cloudSeaGeo.rotateX(-Math.PI / 2);

  const cloudSeaMat = new THREE.ShaderMaterial({
    uniforms: cloudSeaUniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      varying vec3 vWorldPos;

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise2D(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash21(i);
        float b = hash21(i + vec2(1.0, 0.0));
        float c = hash21(i + vec2(0.0, 1.0));
        float d = hash21(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm2D(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise2D(p);
          p = p * 2.05 + vec2(7.3, 11.1);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        float r = length(vWorldPos.xz);
        // Transparent près de la tour centrale pour voir la ville en contrebas, dense vers l'horizon
        float innerMask = smoothstep(34.0, 210.0, r);
        float outerFade = 1.0 - smoothstep(1150.0, 1435.0, r);

        vec2 uv = vWorldPos.xz * 0.0085 + vec2(uTime * 0.006, -uTime * 0.004);
        float n1 = fbm2D(uv);
        float n2 = fbm2D(uv * 2.3 - vec2(uTime * 0.008, 0.0));
        float billow = smoothstep(0.28, 0.78, n1 * 0.65 + n2 * 0.35);

        // Nuages de nuit : ventre éclairé par les néons de la ville, sommet lunaire
        vec3 shadowBlue = vec3(0.035, 0.04, 0.11);
        vec3 cottonPink = vec3(0.16, 0.05, 0.20);
        vec3 creamTop   = vec3(0.17, 0.20, 0.36);

        vec3 col = mix(shadowBlue, cottonPink, smoothstep(0.2, 0.65, n2));
        col = mix(col, creamTop, billow);

        // Densité progressive : trouées nuageuses proches, mer coton continue au loin
        float density = mix(billow * 0.55, 0.45 + billow * 0.55, innerMask);
        float alpha = clamp(density * innerMask * outerFade * uOpacity, 0.0, 1.0);

        gl_FragColor = vec4(max(col, vec3(0.0)), alpha);
      }
    `
  });

  const cloudSeaMesh = new THREE.Mesh(cloudSeaGeo, cloudSeaMat);
  cloudSeaMesh.position.y = cloudBandY - 1.5;
  atmoGroup.add(cloudSeaMesh);

  // 4. 540 NUAGES « BARBE À PAPA » 3D INSTANCIÉS JUSQU'À L'HORIZON (3 DRAW CALLS)
  const cottonCloudTemplates = [
    buildCottonCandyCloudGeometry([
      { x: 0, y: 0.4, z: 0, rx: 7.5, ry: 6.2, rz: 7.2 },
      { x: -5.8, y: -0.6, z: 1.5, rx: 5.8, ry: 4.8, rz: 5.6 },
      { x: 6.0, y: -0.5, z: -1.2, rx: 6.0, ry: 5.0, rz: 5.8 },
      { x: -2.2, y: 3.4, z: -1.4, rx: 5.2, ry: 4.6, rz: 5.0 },
      { x: 2.8, y: 3.0, z: 1.8, rx: 4.8, ry: 4.3, rz: 4.6 },
      { x: 0, y: -1.4, z: 4.5, rx: 4.6, ry: 3.8, rz: 4.4 },
      { x: -0.5, y: -1.4, z: -4.5, rx: 4.6, ry: 3.8, rz: 4.4 }
    ]),
    buildCottonCandyCloudGeometry([
      { x: -4.2, y: 0.2, z: 0.5, rx: 6.6, ry: 5.6, rz: 6.4 },
      { x: 4.6, y: 0.8, z: -0.6, rx: 7.2, ry: 6.0, rz: 6.8 },
      { x: 0.2, y: -0.9, z: 2.2, rx: 5.4, ry: 4.4, rz: 5.2 },
      { x: -8.5, y: -1.1, z: -0.8, rx: 4.4, ry: 3.7, rz: 4.2 },
      { x: 9.2, y: -0.9, z: 1.0, rx: 4.6, ry: 3.9, rz: 4.4 }
    ]),
    buildCottonCandyCloudGeometry([
      { x: 0, y: 0.5, z: 0, rx: 6.2, ry: 5.4, rz: 6.0 },
      { x: -4.4, y: -0.6, z: 1.0, rx: 4.6, ry: 4.0, rz: 4.5 },
      { x: 4.4, y: -0.5, z: -0.8, rx: 4.8, ry: 4.1, rz: 4.6 },
      { x: 0.4, y: 3.0, z: 0.6, rx: 4.0, ry: 3.6, rz: 3.9 }
    ])
  ];

  const cottonCloudUniforms = {
    uSunDir: { value: new THREE.Vector3(0.45, 0.78, 0.42).normalize() },
    uOpacity: { value: 0.85 }
  };

  const cottonCloudMat = new THREE.ShaderMaterial({
    uniforms: cottonCloudUniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vNormalWorld;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;
      varying vec3 vTint;

      void main() {
        vLocalPos = position;
        vec4 localPosition = vec4(position, 1.0);
        vec3 localNormal = normal;

        #ifdef USE_INSTANCING
          localPosition = instanceMatrix * localPosition;
          localNormal = mat3(instanceMatrix) * localNormal;
        #endif

        #ifdef USE_INSTANCING_COLOR
          vTint = instanceColor;
        #else
          vTint = vec3(1.0);
        #endif

        vec4 worldPos = modelMatrix * localPosition;
        vNormalWorld = normalize(mat3(modelMatrix) * localNormal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uSunDir;
      uniform float uOpacity;
      varying vec3 vNormalWorld;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;
      varying vec3 vTint;

      void main() {
        vec3 N = normalize(vNormalWorld);
        vec3 V = normalize(vViewDir);

        float wrapLight = clamp(dot(N, uSunDir) * 0.5 + 0.55, 0.0, 1.0);
        float heightGrad = clamp(vLocalPos.y * 0.1 + 0.55, 0.0, 1.0);
        float shade = clamp(wrapLight * 0.6 + heightGrad * 0.4, 0.0, 1.0);

        vec3 bellyColor = vec3(0.17, 0.05, 0.21);
        vec3 cottonPink = vec3(0.09, 0.09, 0.23);
        vec3 creamTop   = vec3(0.24, 0.28, 0.46);

        vec3 col = mix(bellyColor, cottonPink, smoothstep(0.15, 0.62, shade));
        col = mix(col, creamTop, smoothstep(0.55, 0.95, shade));
        col *= vTint;

        float ndotv = clamp(abs(dot(N, V)), 0.0, 1.0);
        float rimBase = max(1.0 - ndotv, 0.0);
        float rimGlow = pow(rimBase, 1.8);
        col += vec3(0.04, 0.20, 0.28) * rimGlow;

        float edgeAlpha = smoothstep(0.08, 0.68, ndotv);
        gl_FragColor = vec4(max(col, vec3(0.0)), clamp(edgeAlpha * uOpacity, 0.0, 1.0));
      }
    `
  });

  const cloudsPerTemplate = 100; // 3 * 100 = 300 nuages 3D jusqu'à 1380m
  const dummy = new THREE.Object3D();
  // Les nuages tournent tous ensemble : une seule rotation de groupe par image
  // au lieu de recalculer 300 matrices sur le processeur.
  const cloudSpin = new THREE.Group();
  atmoGroup.add(cloudSpin);
  const pastelPalette = [
    new THREE.Color(1.0, 1.0, 1.0),
    new THREE.Color(1.05, 0.92, 1.05),
    new THREE.Color(0.9, 0.98, 1.08),
    new THREE.Color(0.95, 0.95, 1.0)
  ];

  cottonCloudTemplates.forEach((geo, tIdx) => {
    const instMesh = new THREE.InstancedMesh(geo, cottonCloudMat, cloudsPerTemplate);
    instMesh.frustumCulled = false;

    for (let i = 0; i < cloudsPerTemplate; i++) {
      const globalIdx = tIdx * cloudsPerTemplate + i;
      const total = cloudsPerTemplate * cottonCloudTemplates.length;

      // Répartition homogène de 40m jusqu'à l'horizon 1370m
      const ratio = (globalIdx + Math.random()) / total;
      const dist = 40 + Math.pow(ratio, 0.62) * 1330;
      const angle = globalIdx * 2.399963 + (Math.random() - 0.5) * 0.35; // Angle d'or

      // Certains cumulus éloignés montent un peu plus haut pour donner du relief à l'horizon
      const horizonBoost = THREE.MathUtils.smoothstep(dist, 300, 1200) * (Math.random() * 11);
      const cy = cloudBandY + (Math.random() - 0.45) * 9 + horizonBoost;

      const scale = (1.05 + Math.random() * 1.45) * (1 + dist / 460);
      const rotY = Math.random() * Math.PI * 2;
      const sy = scale * (0.88 + Math.random() * 0.24);

      dummy.position.set(Math.cos(angle) * dist, cy, Math.sin(angle) * dist);
      dummy.rotation.set(0, rotY, 0);
      dummy.scale.set(scale, sy, scale);
      dummy.updateMatrix();
      instMesh.setMatrixAt(i, dummy.matrix);

      instMesh.setColorAt(i, pastelPalette[globalIdx % pastelPalette.length]);

    }

    instMesh.instanceMatrix.needsUpdate = true;
    if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;
    cloudSpin.add(instMesh);
  });

  // 5. CHAMP D'ÉTOILES
  function buildStarLayer(count, minR, maxR, size, baseOpacity) {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.96 + 0.02);
      const r = minR + Math.random() * (maxR - minR);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) + 30;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const tint = Math.random();
      if (tint > 0.78) {
        cols[i * 3] = 0.62;
        cols[i * 3 + 1] = 0.88;
        cols[i * 3 + 2] = 1.0;
      } else if (tint > 0.62) {
        cols[i * 3] = 1.0;
        cols[i * 3 + 1] = 0.82;
        cols[i * 3 + 2] = 0.95;
      } else if (tint > 0.52) {
        cols[i * 3] = 1.0;
        cols[i * 3 + 1] = 0.95;
        cols[i * 3 + 2] = 0.75;
      } else {
        cols[i * 3] = 1.0;
        cols[i * 3 + 1] = 1.0;
        cols[i * 3 + 2] = 1.0;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    const mat = new THREE.PointsMaterial({
      size,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const points = new THREE.Points(geo, mat);
    atmoGroup.add(points);
    return { points, mat, baseOpacity };
  }

  const fineStars = buildStarLayer(14500, 820, 1280, 1.5, 0.9);
  const brightStars = buildStarLayer(3500, 740, 1140, 3.1, 1.0);

  const shootingStars = [];
  for (let s = 0; s < 5; s++) {
    const streak = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.35, 28),
      new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0 })
    );
    atmoGroup.add(streak);
    shootingStars.push({
      mesh: streak,
      timer: s * 2.8,
      interval: 6.5 + s * 2.2
    });
  }

  // 6. PLANÈTE AUX ANNEAUX DANS L'ESPACE
  const planetGroup = new THREE.Group();
  planetGroup.position.set(320, 340, -620);

  const planetMat = new THREE.MeshStandardMaterial({
    map: createPlanetTexture(),
    roughness: 0.7,
    metalness: 0.2,
    transparent: true,
    opacity: 0
  });
  const planetMesh = new THREE.Mesh(new THREE.SphereGeometry(54, 36, 36), planetMat);
  planetGroup.add(planetMesh);

  const planetRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const planetRing = new THREE.Mesh(new THREE.RingGeometry(68, 102, 64), planetRingMat);
  planetRing.rotation.x = Math.PI / 2.6;
  planetRing.rotation.y = 0.35;
  planetGroup.add(planetRing);

  atmoGroup.add(planetGroup);
  scene.add(atmoGroup);

  const dayTop = new THREE.Color(SKY.cityTop);
  const dayMid = new THREE.Color(SKY.cityMid);
  const dayHor = new THREE.Color(SKY.cityHorizon);

  const spaceTop = new THREE.Color(SKY.spaceTop);
  const spaceMid = new THREE.Color(SKY.spaceMid);
  const spaceHor = new THREE.Color(SKY.spaceHorizon);
  const cavernFog = new THREE.Color(SKY.cavernFog);

  const dayHemiSky = new THREE.Color(0x5a64b8);
  const dayHemiGnd = new THREE.Color(0x140a24);
  const spaceHemiSky = new THREE.Color(0x6d7fd8);
  const spaceHemiGnd = new THREE.Color(0x090d1a);

  function update(delta, elapsed, camY, undergroundMode) {
    const spaceFactor = THREE.MathUtils.smoothstep(camY, 34, 114);
    skyUniforms.uSpaceFactor.value = spaceFactor;
    skyUniforms.uTime.value = elapsed;

    skyUniforms.uTopColor.value.copy(dayTop).lerp(spaceTop, spaceFactor);
    skyUniforms.uMidColor.value.copy(dayMid).lerp(spaceMid, spaceFactor);
    skyUniforms.uHorizonColor.value.copy(dayHor).lerp(spaceHor, spaceFactor);
    skyUniforms.uSunIntensity.value = 1.0 - spaceFactor * 0.4;

    if (scene.fog) {
      scene.fog.color.copy(skyUniforms.uHorizonColor.value).lerp(cavernFog, undergroundMode);
      // Brouillard léger pour laisser voir les méga-tours et nuages jusqu'à 1300m
      scene.fog.density = THREE.MathUtils.lerp(0.00055, 0.00072, spaceFactor);
    }

    hemiLight.color.copy(dayHemiSky).lerp(spaceHemiSky, spaceFactor);
    hemiLight.groundColor.copy(dayHemiGnd).lerp(spaceHemiGnd, spaceFactor);
    hemiLight.intensity = THREE.MathUtils.lerp(0.95, 0.75, spaceFactor);
    sunLight.intensity = THREE.MathUtils.lerp(0.9, 1.1, spaceFactor);

    // De nuit, quelques étoiles restent visibles même au niveau de la ville
    const highSky = THREE.MathUtils.smoothstep(camY, 76, 108);
    const starVis = THREE.MathUtils.lerp(0.35, 1.0, highSky) * (1 - undergroundMode);
    const planetVis = highSky * (1 - undergroundMode);
    fineStars.mat.opacity = starVis * fineStars.baseOpacity;
    brightStars.mat.opacity = starVis * brightStars.baseOpacity;
    fineStars.points.rotation.y = elapsed * 0.003;
    brightStars.points.rotation.y = elapsed * 0.0045;

    planetMat.opacity = planetVis * 0.94;
    planetRingMat.opacity = planetVis * 0.38;
    planetMesh.rotation.y = elapsed * 0.04;

    shootingStars.forEach((st) => {
      st.timer += delta;
      if (st.timer > st.interval) {
        st.timer = 0;
        const startX = (Math.random() - 0.5) * 600;
        const startY = 260 + Math.random() * 180;
        const startZ = -350 - Math.random() * 250;
        st.mesh.position.set(startX, startY, startZ);
        st.mesh.lookAt(startX + 120, startY - 70, startZ + 80);
      }
      if (st.timer < 1.1 && planetVis > 0.3) {
        st.mesh.translateZ(260 * delta);
        st.mesh.material.opacity = Math.sin((st.timer / 1.1) * Math.PI) * planetVis * 0.9;
      } else {
        st.mesh.material.opacity = 0;
      }
    });

    const visFactor = 1 - undergroundMode;
    cloudSeaUniforms.uTime.value = elapsed;
    cloudSeaUniforms.uOpacity.value = 0.86 * visFactor;
    cottonCloudUniforms.uOpacity.value = 0.85 * visFactor;

    cloudSpin.visible = visFactor > 0.01;
    cloudSpin.rotation.y = elapsed * 0.0025;
  }

  return { update };
}