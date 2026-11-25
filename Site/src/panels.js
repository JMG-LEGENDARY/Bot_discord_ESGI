import * as THREE from 'three';

export function createHoloPanel(tag, title, lines, accentColor = '#22e4ff', width = 9.2, height = 4.6) {
  const group = new THREE.Group();

  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = 'rgba(8, 10, 28, 0.9)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < cvs.width; gx += 32) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, cvs.height);
    ctx.stroke();
  }
  for (let gy = 0; gy < cvs.height; gy += 8) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(cvs.width, gy);
    ctx.stroke();
  }

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, cvs.width - 36, cvs.height - 36);

  ctx.lineWidth = 10;
  const cLen = 46;
  ctx.beginPath();
  ctx.moveTo(14, 14 + cLen);
  ctx.lineTo(14, 14);
  ctx.lineTo(14 + cLen, 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cvs.width - 14 - cLen, 14);
  ctx.lineTo(cvs.width - 14, 14);
  ctx.lineTo(cvs.width - 14, 14 + cLen);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(14, cvs.height - 14 - cLen);
  ctx.lineTo(14, cvs.height - 14);
  ctx.lineTo(14 + cLen, cvs.height - 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cvs.width - 14 - cLen, cvs.height - 14);
  ctx.lineTo(cvs.width - 14, cvs.height - 14);
  ctx.lineTo(cvs.width - 14, cvs.height - 14 - cLen);
  ctx.stroke();

  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
  ctx.textAlign = 'right';
  ctx.fillText(tag, cvs.width - 46, 62);

  ctx.textAlign = 'left';
  ctx.font = 'bold 48px "Space Grotesk", "Segoe UI", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title.toUpperCase(), 54, 114);

  ctx.fillStyle = accentColor;
  ctx.fillRect(54, 136, 190, 4);

  ctx.font = '32px "Space Grotesk", "Segoe UI", sans-serif';
  ctx.fillStyle = '#eef8ff';
  lines.forEach((line, i) => {
    ctx.fillText(`▸ ${line}`, 56, 206 + i * 62);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(54, 408, cvs.width - 108, 54);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 408, cvs.width - 108, 54);

  ctx.font = 'bold 23px "JetBrains Mono", monospace';
  ctx.fillStyle = accentColor;
  ctx.textAlign = 'center';
  ctx.fillText('[ APPUYEZ SUR ENTRÉE OU CLIQUEZ POUR EXPLORER LE DOSSIER ↗ ]', cvs.width / 2, 443);

  const texture = new THREE.CanvasTexture(cvs);
  texture.colorSpace = THREE.SRGBColorSpace;

  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  );
  group.add(screenMesh);
  group.screenMesh = screenMesh;

  const hexColor = new THREE.Color(accentColor);
  const hdrNeonMat = new THREE.MeshBasicMaterial({
    color: hexColor.clone().multiplyScalar(2.0),
    toneMapped: false
  });
  const barGeo = new THREE.BoxGeometry(width * 0.85, 0.06, 0.08);
  const topBar = new THREE.Mesh(barGeo, hdrNeonMat);
  topBar.position.y = height / 2 + 0.14;
  const botBar = new THREE.Mesh(barGeo, hdrNeonMat);
  botBar.position.y = -height / 2 - 0.14;
  group.add(topBar, botBar);

  return group;
}

// =========================================================================
// PLATEFORME DU SOMMET : enseigne ESGI BOT
// Une soucoupe en verre noir laqué qui lévite au-dessus de la tour,
// gravée de cercles lumineux, avec un faisceau d'énergie sous elle, des
// anneaux en arc de comète qui tournent, des particules qui montent, et le
// nom ESGI BOT en hologramme (sans fond opaque, il flotte dans le ciel).
// =========================================================================

// Gravure lumineuse du dessus de la plateforme
function createDeckTexture() {
  const S = 1024;
  const cvs = document.createElement('canvas');
  cvs.width = S;
  cvs.height = S;
  const ctx = cvs.getContext('2d');
  const c = S / 2;
  ctx.clearRect(0, 0, S, S);
  ctx.lineCap = 'round';
  // Cercles concentriques fins
  [0.94, 0.86, 0.62, 0.42, 0.24].forEach((r, i) => {
    ctx.strokeStyle = i % 2 ? 'rgba(255, 90, 200, 0.75)' : 'rgba(80, 235, 255, 0.85)';
    ctx.lineWidth = i === 0 ? 6 : 3;
    ctx.beginPath();
    ctx.arc(c, c, r * c, 0, Math.PI * 2);
    ctx.stroke();
  });
  // Graduations entre les deux cercles extérieurs
  ctx.strokeStyle = 'rgba(80, 235, 255, 0.6)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2;
    const r0 = 0.87 * c;
    const r1 = (i % 10 === 0 ? 0.8 : 0.84) * c;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
    ctx.lineTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
    ctx.stroke();
  }
  // Six rayons et arcs de circuit
  ctx.strokeStyle = 'rgba(80, 235, 255, 0.45)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * 0.26 * c, c + Math.sin(a) * 0.26 * c);
    ctx.lineTo(c + Math.cos(a) * 0.6 * c, c + Math.sin(a) * 0.6 * c);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(c, c, 0.52 * c, a - 0.25, a + 0.25);
    ctx.stroke();
  }
  // Halo doux au centre
  const g = ctx.createRadialGradient(c, c, 0, c, c, 0.24 * c);
  g.addColorStop(0, 'rgba(120, 240, 255, 0.55)');
  g.addColorStop(1, 'rgba(120, 240, 255, 0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(c, c, 0.24 * c, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Le nom en hologramme : lettres blanches à cœur bleuté, halo, léger
// décalage cyan / rose (effet prisme), sans aucun fond
function createTitleTexture() {
  const W = 2048;
  const H = 640;
  const cvs = document.createElement('canvas');
  cvs.width = W;
  cvs.height = H;
  const ctx = cvs.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const font = '800 300px "Space Grotesk", "Segoe UI", sans-serif';
  ctx.font = font;
  const title = 'ESGI BOT';
  const ty = 380;
  // Halo large
  ctx.shadowColor = 'rgba(60, 220, 255, 0.9)';
  ctx.shadowBlur = 60;
  ctx.fillStyle = 'rgba(60, 220, 255, 0.35)';
  ctx.fillText(title, W / 2, ty);
  // Prisme : rose à gauche, cyan à droite
  ctx.shadowBlur = 18;
  ctx.shadowColor = 'rgba(255, 60, 190, 0.8)';
  ctx.fillStyle = 'rgba(255, 70, 200, 0.85)';
  ctx.fillText(title, W / 2 - 7, ty);
  ctx.shadowColor = 'rgba(40, 230, 255, 0.8)';
  ctx.fillStyle = 'rgba(40, 230, 255, 0.85)';
  ctx.fillText(title, W / 2 + 7, ty);
  // Lettres : dégradé blanc vers bleu glacier
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
  const grad = ctx.createLinearGradient(0, ty - 230, 0, ty + 10);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.6, '#e8fbff');
  grad.addColorStop(1, '#9fe9ff');
  ctx.fillStyle = grad;
  ctx.fillText(title, W / 2, ty);
  ctx.shadowBlur = 0;
  // Filet lumineux et sous-titre espacé
  const lg = ctx.createLinearGradient(W / 2 - 520, 0, W / 2 + 520, 0);
  lg.addColorStop(0, 'rgba(255, 70, 200, 0)');
  lg.addColorStop(0.3, 'rgba(255, 70, 200, 0.95)');
  lg.addColorStop(0.7, 'rgba(40, 230, 255, 0.95)');
  lg.addColorStop(1, 'rgba(40, 230, 255, 0)');
  ctx.fillStyle = lg;
  ctx.fillRect(W / 2 - 520, ty + 48, 1040, 5);
  ctx.font = '700 66px "JetBrains Mono", monospace';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '16px';
  // Contour sombre : le sous-titre reste lisible devant les nuages clairs
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(6, 10, 30, 0.85)';
  ctx.lineWidth = 14;
  ctx.strokeText('BOT DISCORD · ESGI REIMS', W / 2, ty + 150);
  ctx.fillStyle = 'rgba(225, 245, 255, 0.98)';
  ctx.shadowColor = 'rgba(60, 220, 255, 0.9)';
  ctx.shadowBlur = 16;
  ctx.fillText('BOT DISCORD · ESGI REIMS', W / 2, ty + 150);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function buildSkyPlatform(scene, topY) {
  const group = new THREE.Group();
  const baseY = topY + 7.5;
  group.position.set(0, baseY, 0);
  const time = { value: 0 };

  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x131a29,
    metalness: 0.65,
    roughness: 0.35,
    envMapIntensity: 0.35
  });
  const solarMat = new THREE.MeshStandardMaterial({
    color: 0x0c4a6e,
    emissive: 0x0284c7,
    emissiveIntensity: 0.2,
    metalness: 0.6,
    roughness: 0.3,
    envMapIntensity: 0.35
  });
  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 1.5, 1.9), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.7, 0.12, 1.0), toneMapped: false });

  // ---- Soucoupe en verre noir laqué (profil tourné, bord biseauté) ----
  const profile = [
    [0.0, 0.0], [6.9, 0.0], [7.25, -0.12], [7.3, -0.32], [7.0, -0.55],
    [5.2, -1.3], [3.0, -2.2], [1.4, -2.75], [0.6, -3.0], [0.0, -3.05]
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const hullMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a0f1e,
    metalness: 0.75,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    iridescence: 0.35,
    iridescenceIOR: 1.5,
    envMapIntensity: 1.4
  });
  const hull = new THREE.Mesh(new THREE.LatheGeometry(profile, 96), hullMat);
  group.add(hull);

  // Gravure lumineuse du dessus (tourne lentement)
  const deck = new THREE.Mesh(
    new THREE.CircleGeometry(6.85, 96),
    new THREE.MeshBasicMaterial({
      map: createDeckTexture(),
      color: new THREE.Color(1.6, 1.6, 1.6),
      transparent: true,
      depthWrite: false,
      toneMapped: false
    })
  );
  deck.rotation.x = -Math.PI / 2;
  deck.position.y = 0.012;
  group.add(deck);

  // Liseré lumineux du bord et anneau rose sous la coque
  const rim = new THREE.Mesh(new THREE.TorusGeometry(7.28, 0.055, 12, 160), cyanHdr);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.3;
  group.add(rim);
  const underRing = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.045, 10, 128), pinkHdr);
  underRing.rotation.x = Math.PI / 2;
  underRing.position.y = -1.7;
  group.add(underRing);

  // Cœur d'énergie sous la soucoupe + faisceau qui la relie à la tour
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 16),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(1.2, 2.2, 2.8), toneMapped: false })
  );
  core.position.y = -3.05;
  group.add(core);
  const beamMat = new THREE.ShaderMaterial({
    uniforms: { uTime: time },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        // Ondes d'énergie qui descendent vers la tour, fondu en bas
        float waves = 0.55 + 0.45 * sin((vUv.y * 9.0 + uTime * 3.0) * 6.2831);
        float fade = smoothstep(0.0, 0.7, vUv.y);
        float edge = 0.6 + 0.4 * sin(vUv.x * 6.2831 * 12.0 + uTime);
        vec3 col = mix(vec3(1.0, 0.3, 0.85), vec3(0.3, 0.9, 1.0), vUv.y);
        gl_FragColor = vec4(col * waves * edge * fade * 0.55, 1.0);
      }
    `
  });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 1.9, 6.5, 48, 1, true), beamMat);
  beam.position.y = -3.05 - 3.25;
  group.add(beam);

  // ---- Anneaux en arc de comète (une traînée lumineuse qui tourne) ----
  function cometRing(radius, color, speed, tilt) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: time, uColor: { value: new THREE.Color(...color) }, uSpeed: { value: speed } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uSpeed;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float t = fract(vUv.x - uTime * uSpeed);
          float tail = pow(t, 6.0);           // traînée qui s'estompe
          float base = 0.12;                  // anneau à peine visible
          gl_FragColor = vec4(uColor * (base + tail * 1.6), 1.0);
        }
      `
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.035, 8, 220), mat);
    ring.rotation.x = Math.PI / 2 + tilt;
    group.add(ring);
    return ring;
  }
  const orbitA = cometRing(8.6, [0.2, 1.6, 2.0], 0.12, 0.18);
  const orbitB = cometRing(9.8, [1.8, 0.3, 1.3], -0.08, -0.26);

  // ---- Particules lumineuses qui montent autour de la plateforme ----
  const N = 220;
  const pPos = new Float32Array(N * 3);
  const pData = new Float32Array(N * 2);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3.5 + Math.random() * 6.5;
    pPos.set([Math.cos(a) * r, Math.random(), Math.sin(a) * r], i * 3);
    pData.set([Math.random(), 0.06 + Math.random() * 0.1], i * 2);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('aData', new THREE.BufferAttribute(pData, 2));
  const motes = new THREE.Points(
    pGeo,
    new THREE.ShaderMaterial({
      uniforms: { uTime: time },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec2 aData;
        uniform float uTime;
        varying float vAlpha;
        varying float vHue;
        void main() {
          // Montée en boucle de -3 m à +9 m, avec un fondu en haut et en bas
          float t = fract(position.y + uTime * 0.05 * (0.6 + aData.x));
          vec3 p = vec3(position.x, -3.0 + t * 12.0, position.z);
          vAlpha = smoothstep(0.0, 0.15, t) * (1.0 - smoothstep(0.7, 1.0, t)) * (0.6 + 0.4 * sin(uTime * 3.0 + aData.x * 40.0));
          vHue = aData.x;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = min(aData.y * projectionMatrix[1][1] * 600.0 / -mv.z, 24.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vHue;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          vec3 col = mix(vec3(0.3, 0.9, 1.0), vec3(1.0, 0.35, 0.85), step(0.7, vHue));
          gl_FragColor = vec4(col * pow(1.0 - d, 2.0) * vAlpha * 1.4, 1.0);
        }
      `
    })
  );
  motes.frustumCulled = false;
  group.add(motes);

  // ---- Le nom ESGI BOT en hologramme ----
  const titleMat = new THREE.ShaderMaterial({
    uniforms: { uTime: time, map: { value: createTitleTexture() } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(map, vUv);
        // Balayage lumineux qui traverse le titre toutes les quelques secondes
        float sweep = smoothstep(0.06, 0.0, abs(vUv.x - fract(uTime * 0.18) * 1.6 + 0.3));
        // Fines lignes d'hologramme et léger scintillement
        float lines = 0.9 + 0.1 * sin(vUv.y * 420.0 + uTime * 4.0);
        float flicker = 0.96 + 0.04 * sin(uTime * 23.0) * sin(uTime * 7.0);
        vec3 col = tex.rgb * lines * flicker + vec3(0.6, 0.95, 1.0) * sweep * tex.a * 0.8;
        gl_FragColor = vec4(col * 1.25, tex.a);
        #include <colorspace_fragment>
      }
    `
  });
  const title = new THREE.Mesh(new THREE.PlaneGeometry(16.4, 5.125), titleMat);
  // Au niveau des yeux de la caméra, dessiné après les nuages (sinon la
  // brume transparente passe par-dessus le sous-titre)
  title.position.y = 3.6;
  title.renderOrder = 10;
  group.add(title);

  scene.add(group);

  // Satellites en orbite
  const satellites = [];
  for (let s = 0; s < 3; s++) {
    const sat = new THREE.Group();
    const satCore = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.8, 8), darkSteelMat);
    satCore.rotation.z = Math.PI / 2;
    const panelL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.9), solarMat);
    panelL.position.x = -2.0;
    const panelR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.9), solarMat);
    panelR.position.x = 2.0;
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), s === 0 ? pinkHdr : cyanHdr);
    beacon.position.y = 0.55;

    sat.add(satCore, panelL, panelR, beacon);
    scene.add(sat);
    satellites.push({
      mesh: sat,
      angle: (s / 3) * Math.PI * 2,
      radius: 26 + s * 6,
      yOffset: 11 + s * 3.5,
      speed: 0.16 - s * 0.02
    });
  }

  function update(elapsed) {
    time.value = elapsed;
    group.position.y = baseY + Math.sin(elapsed * 1.8) * 0.16;
    deck.rotation.z = elapsed * 0.06;
    hull.rotation.y = elapsed * 0.06;
    orbitA.rotation.z = elapsed * 0.05;
    orbitB.rotation.z = -elapsed * 0.04;
    core.scale.setScalar(1 + Math.sin(elapsed * 2.6) * 0.08);
    // Le titre flotte doucement, indépendamment de la plateforme
    title.position.y = 3.6 + Math.sin(elapsed * 1.1) * 0.12;

    satellites.forEach((sat) => {
      const a = sat.angle + elapsed * sat.speed;
      sat.mesh.position.set(
        Math.cos(a) * sat.radius,
        baseY + sat.yOffset,
        Math.sin(a) * sat.radius
      );
      sat.mesh.rotation.y = -a;
    });
  }

  return { group, update };
}
