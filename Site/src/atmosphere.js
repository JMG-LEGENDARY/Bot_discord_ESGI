import * as THREE from 'three';

function buildSculptedCloudGeometry(lobes) {
  const sunDir = new THREE.Vector3(0.45, 0.78, 0.42).normalize();
  // Teintes calibrées pour éviter toute surexposition avec le Bloom
  const topColor = new THREE.Color(0xcbd9ea);
  const midColor = new THREE.Color(0x92abc9);
  const bellyColor = new THREE.Color(0x526c90);

  let minY = Infinity;
  let maxY = -Infinity;
  lobes.forEach((l) => {
    minY = Math.min(minY, l.y - l.ry);
    maxY = Math.max(maxY, l.y + l.ry);
  });
  const spanY = Math.max(maxY - minY, 0.01);

  const geos = lobes.map((l) => {
    const g = new THREE.SphereGeometry(1, 16, 12);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const organic =
        1 +
        0.13 * Math.sin(v.x * 3.0 + l.x) * Math.cos(v.z * 2.8 + l.z) +
        0.09 * Math.cos(v.y * 3.6);
      v.x *= l.rx * organic;
      v.z *= l.rz * organic;
      v.y *= l.ry * (v.y < 0 ? 0.72 : organic);
      v.x += l.x;
      v.y += l.y;
      v.z += l.z;
      pos.setXYZ(i, v.x, v.y, v.z);
    }

    g.computeVertexNormals();
    const norm = g.attributes.normal;
    const colors = new Float32Array(pos.count * 3);
    const nVec = new THREE.Vector3();
    const c = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const py = pos.getY(i);
      nVec.fromBufferAttribute(norm, i);

      const heightRatio = THREE.MathUtils.clamp((py - minY) / spanY, 0, 1);
      const sunDot = THREE.MathUtils.clamp(nVec.dot(sunDir) * 0.5 + 0.5, 0, 1);
      const shade = THREE.MathUtils.clamp(heightRatio * 0.68 + sunDot * 0.36, 0, 1);

      if (shade < 0.5) {
        c.copy(bellyColor).lerp(midColor, shade * 2);
      } else {
        c.copy(midColor).lerp(topColor, (shade - 0.5) * 2);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
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
  const mergedCol = new Float32Array(totalVerts * 3);
  const mergedIdx = new Uint32Array(totalIndices);

  let vOffset = 0;
  let iOffset = 0;
  geos.forEach((g) => {
    const count = g.attributes.position.count;
    mergedPos.set(g.attributes.position.array, vOffset * 3);
    mergedNorm.set(g.attributes.normal.array, vOffset * 3);
    mergedCol.set(g.attributes.color.array, vOffset * 3);

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
  merged.setAttribute('color', new THREE.BufferAttribute(mergedCol, 3));
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

  // 1. DÔME DU CIEL DYNAMIQUE (BLEU JOUR -> ESPACE ÉTOILÉ + NÉBULEUSE)
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(0x0284c7) },
    uMidColor: { value: new THREE.Color(0x38bdf8) },
    uHorizonColor: { value: new THREE.Color(0xbae6fd) },
    uSunDir: { value: new THREE.Vector3(0.45, 0.72, 0.52).normalize() },
    uSunIntensity: { value: 1.0 },
    uSpaceFactor: { value: 0.0 }
  };

  const skyGeo = new THREE.SphereGeometry(1450, 48, 32);
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
      varying vec3 vWorldPos;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
        );
      }

      void main() {
        vec3 dir = normalize(vWorldPos);
        float h = dir.y;

        vec3 col;
        if (h >= 0.0) {
          float t1 = smoothstep(0.0, 0.26, h);
          float t2 = smoothstep(0.20, 0.85, h);
          col = mix(uHorizonColor, uMidColor, t1);
          col = mix(col, uTopColor, t2);
        } else {
          col = uHorizonColor;
        }

        float sunAmt = max(dot(dir, uSunDir), 0.0);
        col += vec3(1.0, 0.95, 0.85) * pow(sunAmt, 16.0) * 0.25 * uSunIntensity;
        col += vec3(1.0, 0.98, 0.92) * pow(sunAmt, 180.0) * 0.65 * uSunIntensity;

        if (uSpaceFactor > 0.05 && h > -0.1) {
          float band = exp(-pow((dir.x * 0.6 + dir.y * 0.5 - dir.z * 0.4) * 3.2, 2.0));
          float n = noise(dir * 5.0) * 0.6 + noise(dir * 12.0) * 0.4;
          vec3 nebCol = mix(vec3(0.04, 0.14, 0.34), vec3(0.24, 0.05, 0.30), n);
          col += nebCol * band * n * uSpaceFactor * 0.9;
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `
  });

  atmoGroup.add(new THREE.Mesh(skyGeo, skyMat));

  // 2. ÉCLAIRAGE DYNAMIQUE
  const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x166534, 1.35);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.85);
  sunLight.position.set(110, 230, 120);
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
  rimLight.position.set(-80, 70, -70);
  scene.add(rimLight);

  // 3. NUAGES 3D VOLUMINEUX & ÉPAIS (4 ARCHETYPES SANS FORME PLATE + BORDS DOUX)
  const cloudTemplates = [
    // Archetype 0 : Cumulus majestueux à dôme épais
    buildSculptedCloudGeometry([
      { x: 0, y: 0, z: 0, rx: 11.5, ry: 6.4, rz: 9.8 },
      { x: -8.2, y: -0.6, z: 2.2, rx: 8.8, ry: 5.0, rz: 7.8 },
      { x: 8.8, y: -0.5, z: -1.8, rx: 9.2, ry: 5.2, rz: 8.2 },
      { x: -2.2, y: 4.2, z: -1.0, rx: 7.8, ry: 5.8, rz: 7.2 },
      { x: 3.8, y: 3.4, z: 2.6, rx: 6.8, ry: 5.0, rz: 6.4 },
      { x: -13.2, y: -1.2, z: -2.0, rx: 6.4, ry: 3.8, rz: 5.8 },
      { x: 14.0, y: -1.1, z: 2.5, rx: 6.6, ry: 3.9, rz: 6.0 }
    ]),
    // Archetype 1 : Gros amas Stratocumulus vallonné et épais
    buildSculptedCloudGeometry([
      { x: -13.5, y: -0.4, z: 1.2, rx: 9.8, ry: 4.6, rz: 7.5 },
      { x: -4.8, y: 1.0, z: -1.6, rx: 10.8, ry: 5.4, rz: 8.2 },
      { x: 5.2, y: 1.4, z: 1.4, rx: 11.2, ry: 5.8, rz: 8.5 },
      { x: 14.5, y: -0.2, z: -1.0, rx: 9.2, ry: 4.4, rz: 7.0 },
      { x: 0, y: 3.2, z: 0.2, rx: 8.0, ry: 4.8, rz: 6.5 }
    ]),
    // Archetype 2 : Cumulus compact à 3 tourelles rebondies
    buildSculptedCloudGeometry([
      { x: 0, y: 0.8, z: 0, rx: 8.6, ry: 5.6, rz: 8.2 },
      { x: -6.0, y: -0.5, z: 2.4, rx: 6.8, ry: 4.4, rz: 6.4 },
      { x: 5.8, y: -0.4, z: -2.2, rx: 7.2, ry: 4.6, rz: 6.6 },
      { x: 1.2, y: 3.8, z: 1.0, rx: 5.8, ry: 4.6, rz: 5.6 }
    ]),
    // Archetype 3 : Banc nuageux double-dôme volumineux
    buildSculptedCloudGeometry([
      { x: -7.5, y: 0.4, z: -1.2, rx: 9.4, ry: 5.2, rz: 8.0 },
      { x: 7.2, y: 0.8, z: 1.4, rx: 9.8, ry: 5.6, rz: 8.4 },
      { x: 0, y: -0.6, z: 0, rx: 11.0, ry: 4.5, rz: 9.0 },
      { x: -5.5, y: 3.6, z: -0.5, rx: 6.2, ry: 4.2, rz: 5.8 },
      { x: 6.0, y: 4.0, z: 0.8, rx: 6.5, ry: 4.5, rz: 6.0 }
    ])
  ];

  const cloudMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 1.0,
    metalness: 0.0,
    transparent: true,
    opacity: 0.94
  });

  // Shader custom : plafond anti-éblouissement + légère transparence douce sur les bords (Fresnel)
  cloudMat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      float edgeFresnel = abs(dot(normalize(vViewPosition), normal));
      float softRim = smoothstep(0.06, 0.56, edgeFresnel);
      gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(0.90, 0.94, 0.99));
      gl_FragColor.a *= mix(0.20, 1.0, softRim);
      #include <dithering_fragment>
      `
    );
  };

  const clouds = [];
  const cloudBandY = mainTowerHeight * 0.66; // ~85.8m

  for (let i = 0; i < 150; i++) {
    const templateIdx = i % cloudTemplates.length;
    const mesh = new THREE.Mesh(cloudTemplates[templateIdx], cloudMat);

    const angle = (i / 150) * Math.PI * 2 + (Math.random() - 0.5) * 0.22;
    const dist = 34 + Math.pow(Math.random(), 0.82) * 520;
    const cy = cloudBandY + (Math.random() - 0.42) * 14;

    const scaleXZ = (0.85 + Math.random() * 1.35) * (1 + dist / 480);
    // Épaisseur verticale généreuse garantie (jamais de nuage fin)
    const scaleY = 1.0 + Math.random() * 0.65;

    mesh.position.set(Math.cos(angle) * dist, cy, Math.sin(angle) * dist);
    mesh.rotation.y = Math.random() * Math.PI * 2;
    mesh.scale.set(scaleXZ, scaleY, scaleXZ * (0.82 + Math.random() * 0.36));

    atmoGroup.add(mesh);
    clouds.push({
      mesh,
      angle,
      dist,
      baseY: cy,
      rotSpeed: (Math.random() - 0.5) * 0.014,
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
  const spaceMid = new THREE.Color(0x040916);
  const spaceHor = new THREE.Color(0x091326);
  const cavernFog = new THREE.Color(0x03060e);

  const dayHemiSky = new THREE.Color(0xbae6fd);
  const dayHemiGnd = new THREE.Color(0x166534);
  const spaceHemiSky = new THREE.Color(0x60a5fa);
  const spaceHemiGnd = new THREE.Color(0x090d1a);

  function update(delta, elapsed, camY, undergroundMode) {
    const spaceFactor = THREE.MathUtils.smoothstep(camY, 34, 114);
    skyUniforms.uSpaceFactor.value = spaceFactor;

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
    sunLight.intensity = THREE.MathUtils.lerp(1.85, 1.2, spaceFactor);

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

    cloudMat.opacity = 0.94 * (1 - undergroundMode);
    clouds.forEach((c) => {
      const a = c.angle + elapsed * c.orbitSpeed;
      c.mesh.position.x = Math.cos(a) * c.dist;
      c.mesh.position.z = Math.sin(a) * c.dist;
      c.mesh.rotation.y += c.rotSpeed * delta;
    });
  }

  return { update };
}