import * as THREE from 'three';
import { SKY, SKY_DAY, DAY_UNIFORM } from './theme.js';
import { createCloudPuffs } from './cloud-puffs.js';
import { createRealisticPlanet, createIceGiantTexture, createRedGiantTexture } from './planets.js';

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
    uTime: { value: 0.0 },
    uDay: DAY_UNIFORM
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
      uniform float uDay;
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
        // Nuit : lune froide (halo discret + disque net)
        vec3 moon = vec3(0.55, 0.65, 1.0) * pow(sunAmt, 24.0) * 0.18
                  + vec3(0.92, 0.95, 1.0) * pow(sunAmt, 900.0) * 1.4;
        // Jour : soleil chaud (large halo + disque éblouissant)
        vec3 sun = vec3(1.0, 0.95, 0.88) * pow(sunAmt, 16.0) * 0.25
                 + vec3(1.0, 0.98, 0.92) * pow(sunAmt, 180.0) * 0.65;
        col += mix(moon, sun, uDay) * uSunIntensity;

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
  const hemiLight = new THREE.HemisphereLight(0x7d86b0, 0x2a2433, 0.9);
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
    uOpacity: { value: 0.86 },
    uDay: DAY_UNIFORM
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
      uniform float uDay;
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
        // Trouées : la ville éclaire la brume par en dessous près de la tour
        col += vec3(0.18, 0.04, 0.16) * (1.0 - billow) * (1.0 - innerMask * 0.7);

        // Jour : nuages blancs ensoleillés
        vec3 dayCol = mix(vec3(0.62, 0.72, 0.88), vec3(0.95, 0.96, 0.99), billow);
        col = mix(col, dayCol, uDay);

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

  // 4. NUAGES EN BOUFFÉES DE VAPEUR (SPRITES INSTANCIÉS, 1 SEUL APPEL DE DESSIN)
  // Des milliers de carrés texturés face à la caméra forment des cumulus
  // vaporeux bien plus réalistes que des sphères.
  const clusters = [];
  const cloudCount = 300; // nuages jusqu'à ~1370m
  for (let i = 0; i < cloudCount; i++) {
    // Répartition homogène de 40m jusqu'à l'horizon 1370m
    const ratio = (i + Math.random()) / cloudCount;
    const dist = 40 + Math.pow(ratio, 0.62) * 1330;
    const angle = i * 2.399963 + (Math.random() - 0.5) * 0.35; // Angle d'or
    // Certains cumulus éloignés montent un peu plus haut pour donner du relief à l'horizon
    const horizonBoost = THREE.MathUtils.smoothstep(dist, 300, 1200) * (Math.random() * 11);
    clusters.push({
      x: Math.cos(angle) * dist,
      y: cloudBandY - 3 + (Math.random() - 0.45) * 7 + horizonBoost,
      z: Math.sin(angle) * dist,
      scale: (1.05 + Math.random() * 1.45) * (1 + dist / 460)
    });
  }
  const cloudPuffs = createCloudPuffs({ clusters, dayUniform: DAY_UNIFORM, puffsPerCloud: 11 });
  // Les nuages tournent tous ensemble : une seule rotation de groupe par image
  const cloudSpin = new THREE.Group();
  cloudSpin.add(cloudPuffs.mesh);
  atmoGroup.add(cloudSpin);

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
    points.userData.thinnable = true; // mode léger : moins d'étoiles
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
  // Position de base : au fond à droite sur PC (changée pour le téléphone, voir setPlanetLayout)
  const planetBasePos = new THREE.Vector3(320, 340, -620);
  planetGroup.position.copy(planetBasePos);

  // Soleil lointain (en haut à droite, un peu devant) : face nuit et terminateur visibles
  const planetSunDir = new THREE.Vector3(0.75, 0.35, 0.55).normalize();

  // Planète de NUIT : géante de glace bleue, anneaux glacés
  const nightPlanet = createRealisticPlanet({
    radius: 54,
    texture: createIceGiantTexture(),
    atmo: 0x4fb4ff,
    lightDir: planetSunDir,
    ring: { inner: 70, outer: 112, colorA: 0x8fb4d8, colorB: 0xe6f2ff, tiltX: Math.PI / 2.6, tiltY: 0.35, tiltZ: 0.2 }
  });
  const planetMesh = nightPlanet.mesh;
  planetGroup.add(nightPlanet.group);
  atmoGroup.add(planetGroup);

  // Planète du JOUR : géante rouge-orangée, anneaux inclinés dans l'autre sens
  const dayPlanetGroup = new THREE.Group();
  const dayPlanet = createRealisticPlanet({
    radius: 48,
    texture: createRedGiantTexture(),
    atmo: 0xffa060,
    lightDir: planetSunDir,
    ring: { inner: 64, outer: 104, colorA: 0xa08670, colorB: 0xf2e2c8, tiltX: Math.PI / 2.4, tiltY: -0.5, tiltZ: -0.3 }
  });
  const dayPlanetMesh = dayPlanet.mesh;
  dayPlanetGroup.add(dayPlanet.group);
  dayPlanetGroup.position.copy(planetBasePos);
  atmoGroup.add(dayPlanetGroup);

  // Téléphone en portrait : planètes plus centrées pour rester visibles
  function setPlanetLayout(isPortrait) {
    if (isPortrait) planetBasePos.set(150, 330, -640);
    else planetBasePos.set(320, 340, -620);
  }
  scene.add(atmoGroup);

  const nightTop = new THREE.Color(SKY.cityTop);
  const nightMid = new THREE.Color(SKY.cityMid);
  const nightHor = new THREE.Color(SKY.cityHorizon);
  const sunTop = new THREE.Color(SKY_DAY.cityTop);
  const sunMid = new THREE.Color(SKY_DAY.cityMid);
  const sunHor = new THREE.Color(SKY_DAY.cityHorizon);
  const dayTop = new THREE.Color();
  const dayMid = new THREE.Color();
  const dayHor = new THREE.Color();
  const nightHemiSky = new THREE.Color(0x7d86b0);
  const nightHemiGnd = new THREE.Color(0x2a2433);
  const sunHemiSky = new THREE.Color(0xbae6fd);
  const sunHemiGnd = new THREE.Color(0x4a5a62);
  const moonColor = new THREE.Color(0xaab8ff);
  const sunColor = new THREE.Color(0xffffff);
  const nightRim = new THREE.Color(0xff3dbb);
  const dayRim = new THREE.Color(0x38bdf8);

  const spaceTop = new THREE.Color(SKY.spaceTop);
  const spaceMid = new THREE.Color(SKY.spaceMid);
  const spaceHor = new THREE.Color(SKY.spaceHorizon);
  const cavernFog = new THREE.Color(SKY.cavernFog);

  const dayHemiSky = new THREE.Color();
  const dayHemiGnd = new THREE.Color();
  const spaceHemiSky = new THREE.Color(0x6d7fd8);
  const spaceHemiGnd = new THREE.Color(0x090d1a);

  const swapOut = new THREE.Vector3();
  const swapIn = new THREE.Vector3();

  function update(delta, elapsed, camY, undergroundMode) {
    const spaceFactor = THREE.MathUtils.smoothstep(camY, 34, 114);
    skyUniforms.uSpaceFactor.value = spaceFactor;
    skyUniforms.uTime.value = elapsed;

    // Mélange nuit/jour, puis passage vers l'espace en altitude
    const day = DAY_UNIFORM.value;
    dayTop.copy(nightTop).lerp(sunTop, day);
    dayMid.copy(nightMid).lerp(sunMid, day);
    dayHor.copy(nightHor).lerp(sunHor, day);
    dayHemiSky.copy(nightHemiSky).lerp(sunHemiSky, day);
    dayHemiGnd.copy(nightHemiGnd).lerp(sunHemiGnd, day);
    sunLight.color.copy(moonColor).lerp(sunColor, day);
    rimLight.color.copy(nightRim).lerp(dayRim, day);
    rimLight.intensity = THREE.MathUtils.lerp(0.45, 0.5, day);

    skyUniforms.uTopColor.value.copy(dayTop).lerp(spaceTop, spaceFactor);
    skyUniforms.uMidColor.value.copy(dayMid).lerp(spaceMid, spaceFactor);
    skyUniforms.uHorizonColor.value.copy(dayHor).lerp(spaceHor, spaceFactor);
    skyUniforms.uSunIntensity.value = 1.0 - spaceFactor * THREE.MathUtils.lerp(0.4, 0.85, day);

    if (scene.fog) {
      scene.fog.color.copy(skyUniforms.uHorizonColor.value).lerp(cavernFog, undergroundMode);
      // Brouillard léger pour laisser voir les méga-tours et nuages jusqu'à 1300m
      scene.fog.density = THREE.MathUtils.lerp(0.00055, 0.00072, spaceFactor);
    }

    hemiLight.color.copy(dayHemiSky).lerp(spaceHemiSky, spaceFactor);
    hemiLight.groundColor.copy(dayHemiGnd).lerp(spaceHemiGnd, spaceFactor);
    hemiLight.intensity = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.95, 1.4, day), 0.75, spaceFactor);
    sunLight.intensity = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.9, 1.75, day), 1.1, spaceFactor);

    // De nuit, quelques étoiles restent visibles même au niveau de la ville
    const highSky = THREE.MathUtils.smoothstep(camY, 76, 108);
    // Le jour, les étoiles n'apparaissent qu'en altitude (dans l'espace)
    const starVis = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.35, 0.0, day), 1.0, highSky) * (1 - undergroundMode);
    const planetVis = highSky * (1 - undergroundMode);
    fineStars.mat.opacity = starVis * fineStars.baseOpacity;
    brightStars.mat.opacity = starVis * brightStars.baseOpacity;
    fineStars.points.rotation.y = elapsed * 0.003;
    brightStars.points.rotation.y = elapsed * 0.0045;

    // Échange des planètes : la bleue (nuit) s'en va vers le bas à droite,
    // la rouge (jour) arrive d'en haut à gauche et prend sa place.
    const leave = THREE.MathUtils.smoothstep(day, 0.0, 0.55);
    const arrive = THREE.MathUtils.smoothstep(day, 0.45, 1.0);
    planetGroup.position.copy(planetBasePos).add(swapOut.set(leave * 260, -leave * 220, 0));
    planetGroup.scale.setScalar(1 - leave * 0.35);
    dayPlanetGroup.position.copy(planetBasePos).add(swapIn.set(-(1 - arrive) * 300, (1 - arrive) * 240, 0));
    dayPlanetGroup.scale.setScalar(0.65 + arrive * 0.35);

    nightPlanet.setOpacity(planetVis * (1 - leave));
    dayPlanet.setOpacity(planetVis * arrive);
    nightPlanet.update();
    dayPlanet.update();
    planetGroup.visible = leave < 0.999;
    dayPlanetGroup.visible = arrive > 0.001;
    planetMesh.rotation.y = elapsed * 0.04;
    dayPlanetMesh.rotation.y = -elapsed * 0.05;

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
    cloudPuffs.uniforms.uOpacity.value = visFactor;

    cloudSpin.visible = visFactor > 0.01;
    cloudSpin.rotation.y = elapsed * 0.0025;
  }

  return {
    update,
    setPlanetLayout,
    // Mode léger : 35 % des bouffées de nuages seulement
    setLite: (on) => {
      cloudPuffs.uniforms.uKeep.value = on ? 0.35 : 1;
    },
    // La planète cliquable est celle du mode affiché
    getActivePlanet: () => (DAY_UNIFORM.value > 0.5 ? dayPlanetMesh : planetMesh),
    isPlanetVisible: () => Math.max(nightPlanet.opacity, dayPlanet.opacity) > 0.3
  };
}