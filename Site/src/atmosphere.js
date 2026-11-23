import * as THREE from 'three';

function createVolumetricCloudTexture(variant = 0) {
  const cvs = document.createElement('canvas');
  cvs.width = 512;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  // Grappe dense de cumulus avec sommet éclairé et base bleutée réaliste
  const puffs = [
    { x: 256, y: 260, r: 175, top: 'rgba(255,255,255,0.92)', mid: 'rgba(226,238,252,0.68)' },
    { x: 165, y: 280, r: 145, top: 'rgba(248,252,255,0.88)', mid: 'rgba(203,222,245,0.62)' },
    { x: 350, y: 275, r: 150, top: 'rgba(250,253,255,0.88)', mid: 'rgba(208,226,248,0.62)' },
    { x: 215, y: 205, r: 135, top: 'rgba(255,255,255,0.95)', mid: 'rgba(232,242,255,0.65)' },
    { x: 305, y: 210, r: 130, top: 'rgba(255,255,255,0.94)', mid: 'rgba(228,240,255,0.65)' },
    { x: 120, y: 310, r: 105, top: 'rgba(235,244,255,0.75)', mid: 'rgba(186,208,236,0.45)' },
    { x: 395, y: 305, r: 110, top: 'rgba(235,244,255,0.75)', mid: 'rgba(186,208,236,0.45)' }
  ];

  if (variant === 1) {
    puffs.reverse();
  }

  puffs.forEach((p) => {
    const grad = ctx.createRadialGradient(p.x, p.y - p.r * 0.15, p.r * 0.08, p.x, p.y, p.r);
    grad.addColorStop(0, p.top);
    grad.addColorStop(0.55, p.mid);
    grad.addColorStop(1, 'rgba(200, 222, 248, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCloudSeaSheetTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 1024;
  const ctx = cvs.getContext('2d');

  // Couche continue dense empêchant de voir le sol depuis l'espace
  ctx.fillStyle = '#dcebfa';
  ctx.fillRect(0, 0, 1024, 1024);

  for (let i = 0; i < 650; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = 45 + Math.random() * 110;
    const bright = Math.random() > 0.35;

    const grad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    if (bright) {
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.6, 'rgba(235, 245, 255, 0.45)');
      grad.addColorStop(1, 'rgba(215, 232, 250, 0)');
    } else {
      grad.addColorStop(0, 'rgba(176, 202, 232, 0.65)');
      grad.addColorStop(0.65, 'rgba(195, 218, 244, 0.32)');
      grad.addColorStop(1, 'rgba(215, 232, 250, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
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
    ctx.fillStyle = y % 20 === 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.28)';
    ctx.fillRect(0, y, 512, 5);
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createAtmosphere(scene, mainTowerHeight) {
  const atmoGroup = new THREE.Group();

  // 1. DÔME DU CIEL DYNAMIQUE + NÉBULEUSE SPATIALE
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

        // Halo solaire en basse altitude
        float sunAmt = max(dot(dir, uSunDir), 0.0);
        col += vec3(1.0, 0.95, 0.85) * pow(sunAmt, 16.0) * 0.25 * uSunIntensity;
        col += vec3(1.0, 0.98, 0.92) * pow(sunAmt, 180.0) * 0.65 * uSunIntensity;

        // Voie Lactée / Nébuleuse subtile dans l'espace
        if (uSpaceFactor > 0.05 && h > -0.1) {
          float band = exp(-pow((dir.x * 0.6 + dir.y * 0.5 - dir.z * 0.4) * 3.2, 2.0));
          float n = noise(dir * 5.0) * 0.6 + noise(dir * 12.0) * 0.4;
          vec3 nebCol = mix(vec3(0.04, 0.14, 0.32), vec3(0.22, 0.05, 0.28), n);
          col += nebCol * band * n * uSpaceFactor * 0.85;
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `
  });

  const skyDome = new THREE.Mesh(skyGeo, skyMat);
  atmoGroup.add(skyDome);

  // 2. ÉCLAIRAGE DYNAMIQUE
  const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x166534, 1.35);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
  sunLight.position.set(110, 230, 120);
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
  rimLight.position.set(-80, 70, -70);
  scene.add(rimLight);

  // 3. MER DE NUAGES MASSIVE & RÉALISTE (y = 83 -> 91)
  // Anneau central dégagé (r < 27) autour de la tour ESGI pour lire les panneaux sans gêne,
  // et couverture nuageuse totale au-delà jusqu'à l'horizon !
  const cloudSeaY = mainTowerHeight * 0.66; // ~85.8m
  const cloudSheetTex = createCloudSeaSheetTexture();

  const cloudSeaMat = new THREE.MeshStandardMaterial({
    map: cloudSheetTex,
    roughness: 0.92,
    metalness: 0.02,
    transparent: true,
    opacity: 0.96,
    side: THREE.DoubleSide
  });

  const cloudSeaMesh = new THREE.Mesh(
    new THREE.RingGeometry(27, 1350, 96, 12),
    cloudSeaMat
  );
  cloudSeaMesh.rotation.x = -Math.PI / 2;
  cloudSeaMesh.position.y = cloudSeaY;
  atmoGroup.add(cloudSeaMesh);

  // 340 amas de cumulus volumétriques 3D au-dessus et au travers de la mer de nuages
  const cloudTexA = createVolumetricCloudTexture(0);
  const cloudTexB = createVolumetricCloudTexture(1);
  const cloudSprites = [];

  for (let i = 0; i < 340; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Concentration forte entre 29m et 480m pour un relief massif vu de l'espace
    const dist = 29 + Math.pow(Math.random(), 0.85) * 460;
    const cy = cloudSeaY + (Math.random() - 0.35) * 9.5;
    const scale = 38 + Math.random() * 68;

    const mat = new THREE.SpriteMaterial({
      map: i % 2 === 0 ? cloudTexA : cloudTexB,
      transparent: true,
      opacity: 0.92,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(Math.cos(angle) * dist, cy, Math.sin(angle) * dist);
    sprite.scale.set(scale * 1.55, scale * 0.68, 1);

    atmoGroup.add(sprite);
    cloudSprites.push({
      sprite,
      angle,
      dist,
      speed: (0.004 + Math.random() * 0.009) * (i % 2 === 0 ? 1 : -1)
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

  const fineStars = buildStarLayer(14500, 820, 1250, 1.5, 0.88);
  const brightStars = buildStarLayer(3500, 740, 1100, 3.1, 1.0);

  // Étoiles filantes occasionnelles dans l'espace
  const shootingStars = [];
  for (let s = 0; s < 4; s++) {
    const streak = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.35, 26),
      new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0 })
    );
    atmoGroup.add(streak);
    shootingStars.push({
      mesh: streak,
      timer: s * 3.2,
      interval: 7 + s * 2.5
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

  // Palettes ciel jour -> espace
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
      scene.fog.density = THREE.MathUtils.lerp(0.0017, 0.0026, spaceFactor);
    }

    hemiLight.color.copy(dayHemiSky).lerp(spaceHemiSky, spaceFactor);
    hemiLight.groundColor.copy(dayHemiGnd).lerp(spaceHemiGnd, spaceFactor);
    hemiLight.intensity = THREE.MathUtils.lerp(1.4, 0.72, spaceFactor);
    sunLight.intensity = THREE.MathUtils.lerp(1.85, 1.1, spaceFactor);

    // Visibilité des étoiles et de la planète au-dessus des nuages
    const starVis = THREE.MathUtils.smoothstep(camY, 76, 108) * (1 - undergroundMode);
    fineStars.mat.opacity = starVis * fineStars.baseOpacity;
    brightStars.mat.opacity = starVis * brightStars.baseOpacity;
    fineStars.points.rotation.y = elapsed * 0.003;
    brightStars.points.rotation.y = elapsed * 0.0045;

    planetMat.opacity = starVis * 0.94;
    planetRingMat.opacity = starVis * 0.38;
    planetMesh.rotation.y = elapsed * 0.04;

    // Étoiles filantes
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

    // Mer de nuages : opaque vue de l'espace (camY > 82), plus légère vue d'en bas
    const aboveClouds = THREE.MathUtils.smoothstep(camY, 70, 90);
    const visibleFactor = 1 - undergroundMode;
    cloudSeaMat.opacity = THREE.MathUtils.lerp(0.42, 0.98, aboveClouds) * visibleFactor;
    cloudSheetTex.offset.x = (elapsed * 0.003) % 1;
    cloudSheetTex.offset.y = (elapsed * 0.002) % 1;

    const spriteOpacity = THREE.MathUtils.lerp(0.55, 0.94, aboveClouds) * visibleFactor;
    cloudSprites.forEach((c) => {
      const a = c.angle + elapsed * c.speed;
      c.sprite.position.x = Math.cos(a) * c.dist;
      c.sprite.position.z = Math.sin(a) * c.dist;
      c.sprite.material.opacity = spriteOpacity;
    });
  }

  return { update };
}