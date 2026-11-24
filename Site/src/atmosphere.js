import * as THREE from 'three';

// Construit une grappe haute définition de boules cotonneuses lisses
function buildCottonCandyCloudGeometry(lobes) {
  const geos = lobes.map((l) => {
    const g = new THREE.SphereGeometry(1, 24, 18);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Déformation très douce pour un aspect arrondi et moelleux
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

  // 1. SHADER DU CIEL & DE L'ESPACE PROFOND (VOIE LACTÉE FBM + LIMBE ATMOSPHÉRIQUE)
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(0x0284c7) },
    uMidColor: { value: new THREE.Color(0x38bdf8) },
    uHorizonColor: { value: new THREE.Color(0xbae6fd) },
    uSunDir: { value: new THREE.Vector3(0.45, 0.72, 0.52).normalize() },
    uSunIntensity: { value: 1.0 },
    uSpaceFactor: { value: 0.0 },
    uTime: { value: 0.0 }
  };

  const skyGeo = new THREE.SphereGeometry(1450, 64, 48);
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

        // Dégradé ciel jour -> espace profond
        vec3 col;
        if (h >= 0.0) {
          float t1 = smoothstep(0.0, 0.25, h);
          float t2 = smoothstep(0.18, 0.85, h);
          col = mix(uHorizonColor, uMidColor, t1);
          col = mix(col, uTopColor, t2);
        } else {
          col = uHorizonColor;
        }

        // Halo solaire en basse altitude
        float sunAmt = max(dot(dir, uSunDir), 0.0);
        col += vec3(1.0, 0.95, 0.88) * pow(sunAmt, 16.0) * 0.25 * uSunIntensity;
        col += vec3(1.0, 0.98, 0.92) * pow(sunAmt, 180.0) * 0.65 * uSunIntensity;

        // Rendu spatial haute définition : Voie Lactée, nébuleuses colorées et limbe atmosphérique
        if (uSpaceFactor > 0.02) {
          // Limbe bleu turquoise subtil à l'horizon vu de l'orbite
          float limb = exp(-abs(h + 0.02) * 14.0) * smoothstep(-0.25, 0.15, h);
          col += vec3(0.06, 0.34, 0.68) * limb * uSpaceFactor * 0.65;

          if (h > -0.15) {
            // Coordonnées inclinées pour la bande galactique
            vec3 galCoord = vec3(
              dir.x * 0.72 + dir.y * 0.45 - dir.z * 0.52,
              dir.y * 0.82 - dir.x * 0.38,
              dir.z * 0.78 + dir.x * 0.42
            );

            float galacticPlane = exp(-pow(galCoord.x * 3.1, 2.0));
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

            // Creusement des sillons de poussière sombre au centre de la Voie Lactée
            float intensity = galacticPlane * neb1 * (1.0 - dustLane * 0.72);
            col += galaxyColor * intensity * uSpaceFactor * 1.15;

            // Poussière d'étoiles lointaines scintillantes dans le shader
            float microStar = hash(floor(dir * 520.0));
            if (microStar > 0.9965) {
              float twinkle = 0.65 + 0.35 * sin(uTime * 2.5 + microStar * 100.0);
              col += vec3(0.75, 0.88, 1.0) * twinkle * uSpaceFactor * 0.75;
            }
          }
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `
  });

  atmoGroup.add(new THREE.Mesh(skyGeo, skyMat));

  // 2. ÉCLAIRAGE DYNAMIQUE
  const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x166534, 1.35);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.75);
  sunLight.position.set(110, 230, 120);
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
  rimLight.position.set(-80, 70, -70);
  scene.add(rimLight);

  // 3. NUAGES « BARBE À PAPA » (PUFFS RONDS, MOELLEUX, TEINTES PASTEL & BORDS COTONNEUX)
  const cottonCloudTemplates = [
    // Grappe 0 : Gros nuage barbe à papa dodu et symétrique
    buildCottonCandyCloudGeometry([
      { x: 0, y: 0.4, z: 0, rx: 7.5, ry: 6.2, rz: 7.2 },
      { x: -5.8, y: -0.6, z: 1.5, rx: 5.8, ry: 4.8, rz: 5.6 },
      { x: 6.0, y: -0.5, z: -1.2, rx: 6.0, ry: 5.0, rz: 5.8 },
      { x: -2.2, y: 3.4, z: -1.4, rx: 5.2, ry: 4.6, rz: 5.0 },
      { x: 2.8, y: 3.0, z: 1.8, rx: 4.8, ry: 4.3, rz: 4.6 },
      { x: 0, y: -1.4, z: 4.5, rx: 4.6, ry: 3.8, rz: 4.4 },
      { x: -0.5, y: -1.4, z: -4.5, rx: 4.6, ry: 3.8, rz: 4.4 }
    ]),
    // Grappe 1 : Duo de pompons cotonneux
    buildCottonCandyCloudGeometry([
      { x: -4.2, y: 0.2, z: 0.5, rx: 6.6, ry: 5.6, rz: 6.4 },
      { x: 4.6, y: 0.8, z: -0.6, rx: 7.2, ry: 6.0, rz: 6.8 },
      { x: 0.2, y: -0.9, z: 2.2, rx: 5.4, ry: 4.4, rz: 5.2 },
      { x: -8.5, y: -1.1, z: -0.8, rx: 4.4, ry: 3.7, rz: 4.2 },
      { x: 9.2, y: -0.9, z: 1.0, rx: 4.6, ry: 3.9, rz: 4.4 }
    ]),
    // Grappe 2 : Petit nuage kawaii tout rond
    buildCottonCandyCloudGeometry([
      { x: 0, y: 0.5, z: 0, rx: 6.2, ry: 5.4, rz: 6.0 },
      { x: -4.4, y: -0.6, z: 1.0, rx: 4.6, ry: 4.0, rz: 4.5 },
      { x: 4.4, y: -0.5, z: -0.8, rx: 4.8, ry: 4.1, rz: 4.6 },
      { x: 0.4, y: 3.0, z: 0.6, rx: 4.0, ry: 3.6, rz: 3.9 }
    ])
  ];

  const cottonCloudUniforms = {
    uSunDir: { value: new THREE.Vector3(0.45, 0.78, 0.42).normalize() },
    uOpacity: { value: 0.82 }
  };

  // Shader Barbe à Papa :
  // - Sommet crème sucré (#fff6fa)
  // - Diffusion interne (Subsurface Scattering) rose pastel doux (#ffd2e6)
  // - Base ombragée lavande / bleu ciel tendre (#9db8e6)
  // - Bords doux translucides sans contour dur (Fresnel)
  const cottonCloudMat = new THREE.ShaderMaterial({
    uniforms: cottonCloudUniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vNormalWorld;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;
      void main() {
        vLocalPos = position;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
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

      void main() {
        vec3 N = normalize(vNormalWorld);
        vec3 V = normalize(vViewDir);

        // Éclairage enveloppant (wrap lighting) très doux
        float wrapLight = clamp(dot(N, uSunDir) * 0.5 + 0.55, 0.0, 1.0);
        float heightGrad = clamp(vLocalPos.y * 0.1 + 0.55, 0.0, 1.0);
        float shade = clamp(wrapLight * 0.6 + heightGrad * 0.4, 0.0, 1.0);

        vec3 bellyColor = vec3(0.60, 0.73, 0.92);   // Ombre bleu-lavande douce
        vec3 cottonPink = vec3(0.95, 0.80, 0.89);   // Teinte barbe à papa pastel
        vec3 creamTop   = vec3(0.93, 0.94, 0.97);   // Blanc crème calibré (sans bloom excessif)

        vec3 col = mix(bellyColor, cottonPink, smoothstep(0.15, 0.62, shade));
        col = mix(col, creamTop, smoothstep(0.55, 0.95, shade));

        // Halo sucre filé sur les contours (Fresnel)
        float ndotv = abs(dot(N, V));
        float rimGlow = pow(1.0 - ndotv, 1.8);
        col += vec3(0.12, 0.07, 0.11) * rimGlow;

        // Fondu alpha progressif sur les bords pour un aspect cotonneux aérien
        float edgeAlpha = smoothstep(0.08, 0.68, ndotv);
        gl_FragColor = vec4(col, edgeAlpha * uOpacity);
      }
    `
  });

  const clouds = [];
  const cloudBandY = mainTowerHeight * 0.66; // ~85.8m

  for (let i = 0; i < 140; i++) {
    const templateIdx = i % cottonCloudTemplates.length;
    const mesh = new THREE.Mesh(cottonCloudTemplates[templateIdx], cottonCloudMat);

    const angle = (i / 140) * Math.PI * 2 + (Math.random() - 0.5) * 0.24;
    const dist = 36 + Math.pow(Math.random(), 0.82) * 510;
    const cy = cloudBandY + (Math.random() - 0.45) * 14;

    const scale = (0.95 + Math.random() * 1.35) * (1 + dist / 520);
    mesh.position.set(Math.cos(angle) * dist, cy, Math.sin(angle) * dist);
    mesh.rotation.y = Math.random() * Math.PI * 2;
    mesh.scale.set(scale, scale * (0.92 + Math.random() * 0.22), scale);

    atmoGroup.add(mesh);
    clouds.push({
      mesh,
      angle,
      dist,
      baseY: cy,
      bobPhase: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      orbitSpeed: (0.0025 + Math.random() * 0.005) * (i % 2 === 0 ? 1 : -1)
    });
  }

  // 4. CHAMP D'ÉTOILES ULTRA-DENSE (18 000 ÉTOILES EN 2 COUCHES)
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

  const fineStars = buildStarLayer(14500, 820, 1250, 1.5, 0.9);
  const brightStars = buildStarLayer(3500, 740, 1100, 3.1, 1.0);

  // Étoiles filantes
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

  // 5. PLANÈTE AUX ANNEAUX DANS L'ESPACE
  const planetGroup = new THREE.Group();
  planetGroup.position.set(290, 320, -540);

  const planetMat = new THREE.MeshStandardMaterial({
    map: createPlanetTexture(),
    roughness: 0.7,
    metalness: 0.2,
    transparent: true,
    opacity: 0
  });
  const planetMesh = new THREE.Mesh(new THREE.SphereGeometry(48, 36, 36), planetMat);
  planetGroup.add(planetMesh);

  const planetRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const planetRing = new THREE.Mesh(new THREE.RingGeometry(62, 92, 64), planetRingMat);
  planetRing.rotation.x = Math.PI / 2.6;
  planetRing.rotation.y = 0.35;
  planetGroup.add(planetRing);

  atmoGroup.add(planetGroup);
  scene.add(atmoGroup);

  const dayTop = new THREE.Color(0x0284c7);
  const dayMid = new THREE.Color(0x38bdf8);
  const dayHor = new THREE.Color(0xbae6fd);

  const spaceTop = new THREE.Color(0x010207);
  const spaceMid = new THREE.Color(0x030712);
  const spaceHor = new THREE.Color(0x071022);
  const cavernFog = new THREE.Color(0x03060e);

  const dayHemiSky = new THREE.Color(0xbae6fd);
  const dayHemiGnd = new THREE.Color(0x166534);
  const spaceHemiSky = new THREE.Color(0x60a5fa);
  const spaceHemiGnd = new THREE.Color(0x090d1a);

  function update(delta, elapsed, camY, undergroundMode) {
    const spaceFactor = THREE.MathUtils.smoothstep(camY, 34, 114);
    skyUniforms.uSpaceFactor.value = spaceFactor;
    skyUniforms.uTime.value = elapsed;

    skyUniforms.uTopColor.value.copy(dayTop).lerp(spaceTop, spaceFactor);
    skyUniforms.uMidColor.value.copy(dayMid).lerp(spaceMid, spaceFactor);
    skyUniforms.uHorizonColor.value.copy(dayHor).lerp(spaceHor, spaceFactor);
    skyUniforms.uSunIntensity.value = 1.0 - spaceFactor * 0.85;

    if (scene.fog) {
      scene.fog.color.copy(skyUniforms.uHorizonColor.value).lerp(cavernFog, undergroundMode);
      scene.fog.density = THREE.MathUtils.lerp(0.0012, 0.0018, spaceFactor);
    }

    hemiLight.color.copy(dayHemiSky).lerp(spaceHemiSky, spaceFactor);
    hemiLight.groundColor.copy(dayHemiGnd).lerp(spaceHemiGnd, spaceFactor);
    hemiLight.intensity = THREE.MathUtils.lerp(1.4, 0.78, spaceFactor);
    sunLight.intensity = THREE.MathUtils.lerp(1.75, 1.15, spaceFactor);

    const starVis = THREE.MathUtils.smoothstep(camY, 76, 108) * (1 - undergroundMode);
    fineStars.mat.opacity = starVis * fineStars.baseOpacity;
    brightStars.mat.opacity = starVis * brightStars.baseOpacity;
    fineStars.points.rotation.y = elapsed * 0.003;
    brightStars.points.rotation.y = elapsed * 0.0045;

    planetMat.opacity = starVis * 0.94;
    planetRingMat.opacity = starVis * 0.38;
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
      if (st.timer < 1.1 && starVis > 0.3) {
        st.mesh.translateZ(260 * delta);
        st.mesh.material.opacity = Math.sin((st.timer / 1.1) * Math.PI) * starVis * 0.9;
      } else {
        st.mesh.material.opacity = 0;
      }
    });

    cottonCloudUniforms.uOpacity.value = 0.82 * (1 - undergroundMode);
    clouds.forEach((c) => {
      const a = c.angle + elapsed * c.orbitSpeed;
      c.mesh.position.x = Math.cos(a) * c.dist;
      c.mesh.position.z = Math.sin(a) * c.dist;
      c.mesh.position.y = c.baseY + Math.sin(elapsed * 0.5 + c.bobPhase) * 0.45;
      c.mesh.rotation.y += c.rotSpeed * delta;
    });
  }

  return { update };
}