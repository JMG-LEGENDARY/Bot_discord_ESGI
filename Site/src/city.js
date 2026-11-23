import * as THREE from 'three';

export function getTerrainHeight(x, z) {
  const r = Math.hypot(x, z);
  if (r < 28) return 0;

  const distRoadX = Math.abs(Math.abs(x) - 98);
  const distRoadZ = Math.abs(Math.abs(z) - 98);
  const roadMask = Math.min(
    THREE.MathUtils.smoothstep(distRoadX, 5, 16),
    THREE.MathUtils.smoothstep(distRoadZ, 5, 16)
  );

  const plazaMask = THREE.MathUtils.smoothstep(r, 28, 44);

  const h1 = Math.sin(x * 0.028) * Math.cos(z * 0.028);
  const h2 = Math.sin(x * 0.065 + z * 0.045) * 0.5;
  const h3 = Math.cos(x * 0.012 - z * 0.015);

  const localParkRelief = (h1 * 2.2 + h2 * 1.1 + 1.2) * plazaMask * roadMask;
  const outerHills = THREE.MathUtils.smoothstep(r, 125, 420) * (h3 * 7.5 + h1 * 4.5 + 6.0) * roadMask;

  return Math.max(-0.4, localParkRelief + outerHills);
}

function createHighDetailGroundTextures() {
  const size = 2048;
  const diffCvs = document.createElement('canvas');
  diffCvs.width = size;
  diffCvs.height = size;
  const ctx = diffCvs.getContext('2d');

  const bumpCvs = document.createElement('canvas');
  bumpCvs.width = 1024;
  bumpCvs.height = 1024;
  const bCtx = bumpCvs.getContext('2d');

  ctx.fillStyle = '#155e33';
  ctx.fillRect(0, 0, size, size);

  bCtx.fillStyle = '#707070';
  bCtx.fillRect(0, 0, 1024, 1024);

  const patches = [
    { x: 420, y: 420, r: 380, c: '#166534' },
    { x: 1620, y: 440, r: 400, c: '#15803d' },
    { x: 440, y: 1620, r: 390, c: '#14532d' },
    { x: 1600, y: 1600, r: 410, c: '#166534' },
    { x: 1024, y: 1024, r: 500, c: '#16a34a' },
    { x: 750, y: 1320, r: 220, c: '#3f6212' },
    { x: 1320, y: 740, r: 240, c: '#15803d' }
  ];
  patches.forEach((p) => {
    const g = ctx.createRadialGradient(p.x, p.y, 30, p.x, p.y, p.r);
    g.addColorStop(0, p.c);
    g.addColorStop(1, 'rgba(21, 94, 51, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < 110000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random();
    ctx.fillStyle = r > 0.68 ? '#22c55e' : r > 0.35 ? '#15803d' : r > 0.12 ? '#0f3d22' : '#4d7c0f';
    ctx.fillRect(x, y, 2, 4);

    if (i % 2 === 0) {
      bCtx.fillStyle = r > 0.5 ? '#969696' : '#525252';
      bCtx.fillRect(x * 0.5, y * 0.5, 2, 2);
    }
  }

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, size, 96);
  ctx.fillRect(0, 1952, size, 96);
  ctx.fillRect(0, 0, 96, size);
  ctx.fillRect(1952, 0, 96, size);

  bCtx.fillStyle = '#383838';
  bCtx.fillRect(0, 0, 1024, 48);
  bCtx.fillRect(0, 976, 1024, 48);
  bCtx.fillRect(0, 0, 48, 1024);
  bCtx.fillRect(976, 0, 48, 1024);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.setLineDash([42, 28]);
  ctx.beginPath();
  ctx.moveTo(0, 48);
  ctx.lineTo(size, 48);
  ctx.moveTo(0, 2000);
  ctx.lineTo(size, 2000);
  ctx.moveTo(48, 0);
  ctx.lineTo(48, size);
  ctx.moveTo(2000, 0);
  ctx.lineTo(2000, size);
  ctx.stroke();
  ctx.setLineDash([]);

  function drawStonePath(pts, w) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = w + 10;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i][0] + pts[i + 1][0]) / 2;
      const yc = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc);
    }
    ctx.stroke();

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = w;
    ctx.stroke();

    bCtx.save();
    bCtx.lineCap = 'round';
    bCtx.lineJoin = 'round';
    bCtx.strokeStyle = '#b8b8b8';
    bCtx.lineWidth = w * 0.5;
    bCtx.beginPath();
    bCtx.moveTo(pts[0][0] * 0.5, pts[0][1] * 0.5);
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i][0] + pts[i + 1][0]) * 0.25;
      const yc = (pts[i][1] + pts[i + 1][1]) * 0.25;
      bCtx.quadraticCurveTo(pts[i][0] * 0.5, pts[i][1] * 0.5, xc, yc);
    }
    bCtx.stroke();
    bCtx.restore();
    ctx.restore();
  }

  drawStonePath([[96, 1024], [520, 780], [1024, 1180], [1520, 820], [1952, 1024]], 40);
  drawStonePath([[1024, 96], [780, 520], [1180, 1024], [820, 1520], [1024, 1952]], 40);

  [
    [520, 520],
    [1528, 520],
    [520, 1528],
    [1528, 1528],
    [1024, 1024]
  ].forEach(([px, py], idx) => {
    const rad = idx === 4 ? 195 : 112;
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = idx === 4 ? '#0ea5e9' : '#10b981';
    ctx.lineWidth = 6;
    ctx.stroke();
  });

  const diffTex = new THREE.CanvasTexture(diffCvs);
  diffTex.wrapS = THREE.RepeatWrapping;
  diffTex.wrapT = THREE.RepeatWrapping;
  diffTex.repeat.set(14, 14);
  diffTex.anisotropy = 8;
  diffTex.colorSpace = THREE.SRGBColorSpace;

  const bumpTex = new THREE.CanvasTexture(bumpCvs);
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.RepeatWrapping;
  bumpTex.repeat.set(14, 14);
  bumpTex.anisotropy = 4;

  return { diffTex, bumpTex };
}

function createBuildingFacadeTexture(paletteIndex) {
  const cvs = document.createElement('canvas');
  cvs.width = 256;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  const palettes = [
    { wall: '#0f172a', win1: '#38bdf8', win2: '#00f3ff', style: 'grid' },
    { wall: '#132238', win1: '#bae6fd', win2: '#34d399', style: 'stripes' },
    { wall: '#172033', win1: '#7dd3fc', win2: '#ff007f', style: 'grid' },
    { wall: '#0c192c', win1: '#e0f2fe', win2: '#38bdf8', style: 'tall' },
    { wall: '#1e293b', win1: '#93c5fd', win2: '#10b981', style: 'diagrid' }
  ];
  const p = palettes[paletteIndex % palettes.length];

  ctx.fillStyle = p.wall;
  ctx.fillRect(0, 0, 256, 512);

  if (p.style === 'stripes') {
    for (let y = 12; y < 500; y += 18) {
      ctx.fillStyle = Math.random() > 0.2 ? p.win1 : '#1e293b';
      ctx.fillRect(10, y, 236, 8);
      if (Math.random() > 0.85) {
        ctx.fillStyle = p.win2;
        ctx.fillRect(10, y, 236, 4);
      }
    }
  } else if (p.style === 'tall') {
    for (let x = 14; x < 240; x += 26) {
      ctx.fillStyle = p.win1;
      ctx.fillRect(x, 12, 12, 488);
      ctx.fillStyle = p.wall;
      for (let y = 40; y < 490; y += 48) {
        ctx.fillRect(x, y, 12, 6);
      }
    }
  } else if (p.style === 'diagrid') {
    ctx.fillStyle = p.win1;
    ctx.fillRect(12, 12, 232, 488);
    ctx.strokeStyle = p.wall;
    ctx.lineWidth = 6;
    for (let i = -512; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i + 256);
      ctx.moveTo(256, i);
      ctx.lineTo(0, i + 256);
      ctx.stroke();
    }
  } else {
    for (let y = 10; y < 500; y += 14) {
      const rowLit = Math.random() > 0.2;
      for (let x = 10; x < 246; x += 16) {
        if (rowLit && Math.random() > 0.3) {
          ctx.fillStyle = Math.random() > 0.86 ? p.win2 : p.win1;
          ctx.fillRect(x, y, 10, 6);
        } else {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(x, y, 10, 6);
        }
      }
    }
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 5);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildEcoCyberCity(scene, mainTowerHeight) {
  const cityGroup = new THREE.Group();

  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 2.2, 2.8), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 0.1, 1.4), toneMapped: false });
  const amberHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 1.2, 0.1), toneMapped: false });

  const softEmeraldMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.32,
    roughness: 0.45
  });
  const softTealMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    emissive: 0x0284c7,
    emissiveIntensity: 0.32,
    roughness: 0.45
  });

  const whiteBridgeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.35,
    roughness: 0.28
  });
  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x162033,
    metalness: 0.82,
    roughness: 0.28
  });
  const woodBarkMat = new THREE.MeshStandardMaterial({
    color: 0x2d241e,
    roughness: 0.85,
    metalness: 0.1
  });

  // 1. SOL 3D AVEC RELIEF NATUREL & TEXTURES HD
  const { diffTex, bumpTex } = createHighDetailGroundTextures();
  const groundGeo = new THREE.PlaneGeometry(2800, 2800, 220, 220);
  groundGeo.rotateX(-Math.PI / 2);

  const posAttr = groundGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vz = posAttr.getZ(i);
    posAttr.setY(i, getTerrainHeight(vx, vz));
  }
  groundGeo.computeVertexNormals();

  const terrainMesh = new THREE.Mesh(
    groundGeo,
    new THREE.MeshStandardMaterial({
      map: diffTex,
      bumpMap: bumpTex,
      bumpScale: 0.35,
      roughness: 0.78,
      metalness: 0.08,
      side: THREE.DoubleSide
    })
  );
  cityGroup.add(terrainMesh);

  // Bassins d'eau réfléchissants dans le parc
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.25,
    metalness: 0.9,
    roughness: 0.12
  });
  [
    { x: -46, z: -42, r: 12 },
    { x: 48, z: 44, r: 11 }
  ].forEach((pond) => {
    const py = getTerrainHeight(pond.x, pond.z) + 0.12;
    const waterDisc = new THREE.Mesh(new THREE.CircleGeometry(pond.r, 32), waterMat);
    waterDisc.rotation.x = -Math.PI / 2;
    waterDisc.position.set(pond.x, py, pond.z);
    cityGroup.add(waterDisc);
  });

  // Parvis central sous la tour ESGI
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(23, 24.5, 0.4, 32), darkSteelMat);
  plaza.position.y = 0.2;
  cityGroup.add(plaza);

  const plazaRing = new THREE.Mesh(new THREE.TorusGeometry(23.2, 0.12, 12, 64), cyanHdr);
  plazaRing.rotation.x = Math.PI / 2;
  plazaRing.position.y = 0.42;
  cityGroup.add(plazaRing);

  // 2. PASSERELLES AÉRIENNES SINUEUSES
  function buildSweepingSkybridge(points) {
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 80, 1.35, 8, false);
    tubeGeo.scale(1, 0.26, 1);

    const bridge = new THREE.Mesh(tubeGeo, whiteBridgeMat);
    cityGroup.add(bridge);

    const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.09, 6, false), softTealMat);
    rail.position.y = -0.34;
    cityGroup.add(rail);

    for (let t = 0.1; t <= 0.9; t += 0.2) {
      const pt = curve.getPoint(t);
      const gndY = getTerrainHeight(pt.x, pt.z);
      const h = pt.y - gndY;
      if (h > 0.5) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, h, 8), whiteBridgeMat);
        pillar.position.set(pt.x, gndY + h / 2, pt.z);
        cityGroup.add(pillar);
      }
    }
  }

  buildSweepingSkybridge([
    new THREE.Vector3(-72, 2.2, 44),
    new THREE.Vector3(-35, 8.2, 36),
    new THREE.Vector3(0, 11.5, 32),
    new THREE.Vector3(36, 8.2, 26),
    new THREE.Vector3(74, 2.5, -12)
  ]);

  buildSweepingSkybridge([
    new THREE.Vector3(70, 2.5, -46),
    new THREE.Vector3(34, 10.0, -38),
    new THREE.Vector3(-4, 14.0, -34),
    new THREE.Vector3(-40, 8.5, -26),
    new THREE.Vector3(-75, 2.5, 10)
  ]);

  // 3. MONORAIL MAGLEV SURÉLEVÉ EN BOUCLE
  const monorailRadius = 86;
  const monorailY = 17.5;
  const trackRing = new THREE.Mesh(new THREE.TorusGeometry(monorailRadius, 0.45, 8, 96), darkSteelMat);
  trackRing.rotation.x = Math.PI / 2;
  trackRing.position.y = monorailY;
  cityGroup.add(trackRing);

  const trackNeon = new THREE.Mesh(new THREE.TorusGeometry(monorailRadius, 0.09, 6, 96), softTealMat);
  trackNeon.rotation.x = Math.PI / 2;
  trackNeon.position.y = monorailY - 0.45;
  cityGroup.add(trackNeon);

  for (let p = 0; p < 16; p++) {
    const pa = (p / 16) * Math.PI * 2;
    const px = Math.cos(pa) * monorailRadius;
    const pz = Math.sin(pa) * monorailRadius;
    const gndY = getTerrainHeight(px, pz);
    const h = monorailY - gndY;
    const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.7, h, 8), whiteBridgeMat);
    pylon.position.set(px, gndY + h / 2, pz);
    cityGroup.add(pylon);
  }

  const maglevCars = [];
  for (let w = 0; w < 5; w++) {
    const wagon = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.3, 4.4), whiteBridgeMat);
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(1.66, 0.18, 4.45),
      w === 0 ? pinkHdr : cyanHdr
    );
    wagon.add(body, stripe);
    cityGroup.add(wagon);
    maglevCars.push({ mesh: wagon, offset: w * 0.062 });
  }

  // 4. ARBRES HOLOGRAPHIQUES DOUX & ORGANIQUES
  const holoTreeCanopies = [];
  const holoWireGreen = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const holoWireTeal = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const holoLeafShellGreen = new THREE.MeshStandardMaterial({
    color: 0x16a34a,
    emissive: 0x065f46,
    emissiveIntensity: 0.22,
    roughness: 0.65,
    transparent: true,
    opacity: 0.6
  });
  const holoLeafShellTeal = new THREE.MeshStandardMaterial({
    color: 0x0d9488,
    emissive: 0x115e59,
    emissiveIntensity: 0.22,
    roughness: 0.65,
    transparent: true,
    opacity: 0.56
  });

  function createHoloTree(x, z, scale = 1, isTeal = false) {
    const gndY = getTerrainHeight(x, z);
    const tree = new THREE.Group();
    tree.position.set(x, gndY, z);
    tree.scale.setScalar(scale);

    const emitter = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.04, 8, 24),
      isTeal ? softTealMat : softEmeraldMat
    );
    emitter.rotation.x = Math.PI / 2;
    emitter.position.y = 0.06;
    tree.add(emitter);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.42, 3.8, 8), woodBarkMat);
    trunk.position.y = 1.9;
    tree.add(trunk);

    const canopyGroup = new THREE.Group();
    canopyGroup.position.y = 4.6;

    const mainShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.05, 1),
      isTeal ? holoLeafShellTeal : holoLeafShellGreen
    );
    const mainWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.14, 1),
      isTeal ? holoWireTeal : holoWireGreen
    );
    const subShell = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.3, 0),
      isTeal ? holoLeafShellTeal : holoLeafShellGreen
    );
    subShell.position.set(1.15, -0.45, 0.75);

    canopyGroup.add(mainShell, mainWire, subShell);
    tree.add(canopyGroup);

    cityGroup.add(tree);
    holoTreeCanopies.push({ mesh: canopyGroup, phase: Math.random() * Math.PI * 2 });
  }

  for (let i = 0; i < 68; i++) {
    const angle = (i / 68) * Math.PI * 2 + (Math.random() - 0.5) * 0.14;
    const dist = 30 + Math.random() * 54;
    createHoloTree(
      Math.cos(angle) * dist,
      Math.sin(angle) * dist,
      0.85 + Math.random() * 0.85,
      i % 4 === 0
    );
  }

  // Lampadaires autour du parvis
  for (let l = 0; l < 16; l++) {
    const la = (l / 16) * Math.PI * 2;
    const lx = Math.cos(la) * 26.5;
    const lz = Math.sin(la) * 26.5;
    const ly = getTerrainHeight(lx, lz);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 3.6, 8), darkSteelMat);
    pole.position.set(lx, ly + 1.8, lz);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), softTealMat);
    bulb.position.set(lx, ly + 3.65, lz);
    cityGroup.add(pole, bulb);
  }

  // 5. VOITURES FUTURISTES SUR LES AVENUES
  const hoverCars = [];
  const carBodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });

  function createCyberCar(isCyan) {
    const car = new THREE.Group();
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.42, 3.4), carBodyMat);
    chassis.position.y = 0.45;
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.1, 0.12), isCyan ? cyanHdr : amberHdr);
    head.position.set(0, 0.46, 1.72);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.1, 0.12), pinkHdr);
    tail.position.set(0, 0.48, -1.72);
    car.add(chassis, head, tail);
    return car;
  }

  [-98, 98].forEach((roadCoord, rIdx) => {
    for (let c = 0; c < 7; c++) {
      const carZ = createCyberCar((rIdx + c) % 2 === 0);
      const dirZ = rIdx === 0 ? 1 : -1;
      carZ.position.set(roadCoord, 0.1, -260 + c * 85);
      carZ.rotation.y = dirZ > 0 ? 0 : Math.PI;
      cityGroup.add(carZ);
      hoverCars.push({ mesh: carZ, axis: 'z', speed: (24 + Math.random() * 14) * dirZ, limit: 290 });

      const carX = createCyberCar((rIdx + c) % 2 !== 0);
      const dirX = rIdx === 0 ? -1 : 1;
      carX.position.set(-260 + c * 85, 0.1, roadCoord);
      carX.rotation.y = dirX > 0 ? Math.PI / 2 : -Math.PI / 2;
      cityGroup.add(carX);
      hoverCars.push({ mesh: carX, axis: 'x', speed: (24 + Math.random() * 14) * dirX, limit: 290 });
    }
  });

  // 6. 180 GRATTE-CIELS VARIÉS + PROJECTEURS CÉLESTES
  const facadeMats = [0, 1, 2, 3, 4].map((idx) => {
    const tex = createBuildingFacadeTexture(idx);
    return new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      map: tex,
      emissiveMap: tex,
      emissive: new THREE.Color(0xe0f2fe),
      emissiveIntensity: 0.65,
      metalness: 0.65,
      roughness: 0.3
    });
  });

  const glassCylinderMat = new THREE.MeshStandardMaterial({
    color: 0x0c4a6e,
    metalness: 0.92,
    roughness: 0.12
  });

  const beaconMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.8, 0.1, 0.35),
    toneMapped: false
  });

  const searchlightMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.07,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const searchlights = [];

  const maxOtherH = mainTowerHeight * 0.64;
  const rings = [
    { count: 22, minR: 108, maxR: 142, minH: 34, maxH: 72 },
    { count: 30, minR: 150, maxR: 205, minH: 42, maxH: maxOtherH },
    { count: 38, minR: 215, maxR: 290, minH: 44, maxH: maxOtherH },
    { count: 44, minR: 300, maxR: 400, minH: 38, maxH: maxOtherH * 0.92 },
    { count: 46, minR: 410, maxR: 540, minH: 32, maxH: maxOtherH * 0.85 }
  ];

  rings.forEach((rc, rIdx) => {
    for (let i = 0; i < rc.count; i++) {
      const angle = (i / rc.count) * Math.PI * 2 + rIdx * 0.27 + (Math.random() - 0.5) * 0.11;
      const dist = rc.minR + Math.random() * (rc.maxR - rc.minR);
      const tx = Math.cos(angle) * dist;
      const tz = Math.sin(angle) * dist;
      const baseGndY = getTerrainHeight(tx, tz);

      // Flèches emblématiques qui percent la couche de nuages (y ~ 96-104m)
      const isCloudPiercer = rIdx <= 2 && i % 13 === 0;
      const h = isCloudPiercer
        ? 96 + Math.random() * 8
        : rc.minH + Math.random() * (rc.maxH - rc.minH);

      const w = 11 + Math.random() * 11;
      const d = 11 + Math.random() * 11;
      const archetype = (i + rIdx) % 6;
      const mat = facadeMats[(i + rIdx) % facadeMats.length];
      const neonTrim = i % 3 === 0 ? pinkHdr : i % 2 === 0 ? cyanHdr : softEmeraldMat;

      if (archetype === 0) {
        const rad = w * 0.52;
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(rad * 0.85, rad, h, 20), glassCylinderMat);
        cyl.position.set(tx, baseGndY + h / 2, tz);
        cityGroup.add(cyl);

        [0.45, 0.82, 0.99].forEach((ratio) => {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(rad * 0.92, 0.14, 8, 24), neonTrim);
          ring.rotation.x = Math.PI / 2;
          ring.position.set(tx, baseGndY + h * ratio, tz);
          cityGroup.add(ring);
        });
      } else if (archetype === 1) {
        const h1 = h * 0.55;
        const h2 = h * 0.3;
        const h3 = h * 0.15;
        const b1 = new THREE.Mesh(new THREE.BoxGeometry(w * 1.15, h1, d * 1.15), mat);
        b1.position.set(tx, baseGndY + h1 / 2, tz);
        const b2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.82, h2, d * 0.82), mat);
        b2.position.set(tx, baseGndY + h1 + h2 / 2, tz);
        const b3 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.48, h3, d * 0.48), mat);
        b3.position.set(tx, baseGndY + h1 + h2 + h3 / 2, tz);
        cityGroup.add(b1, b2, b3);
      } else if (archetype === 2) {
        const offset = w * 0.36;
        const t1 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.45, h, d * 0.8), mat);
        t1.position.set(tx - offset, baseGndY + h / 2, tz);
        const t2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.45, h * 0.92, d * 0.8), mat);
        t2.position.set(tx + offset, baseGndY + (h * 0.92) / 2, tz);
        const link = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 1.8, d * 0.4), neonTrim);
        link.position.set(tx, baseGndY + h * 0.65, tz);
        cityGroup.add(t1, t2, link);
      } else if (archetype === 3) {
        const hex = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.46, w * 0.62, h, 6), mat);
        hex.position.set(tx, baseGndY + h / 2, tz);
        cityGroup.add(hex);

        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.4, w * 0.46, 9, 6), darkSteelMat);
        cap.position.set(tx, baseGndY + h + 4.5, tz);
        cityGroup.add(cap);
      } else {
        const block = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        block.position.set(tx, baseGndY + h / 2, tz);
        cityGroup.add(block);

        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.24, h * 0.9, 0.24), neonTrim);
        fin.position.set(tx + w / 2 + 0.1, baseGndY + h * 0.45, tz + d / 2 + 0.1);
        cityGroup.add(fin);

        const crown = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.35, d + 0.3), neonTrim);
        crown.position.set(tx, baseGndY + h - 1.0, tz);
        cityGroup.add(crown);
      }

      const spireH = isCloudPiercer ? 10 : 4 + Math.random() * 6;
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, spireH, 6), darkSteelMat);
      spire.position.set(tx, baseGndY + h + spireH / 2, tz);
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.32, 6, 6), beaconMat);
      beacon.position.set(tx, baseGndY + h + spireH, tz);
      cityGroup.add(spire, beacon);

      // Faisceau projecteur céleste depuis certains toits
      if (rIdx === 0 && i % 5 === 0) {
        const beamGeo = new THREE.CylinderGeometry(2.6, 0.25, 52, 12, 1, true);
        beamGeo.translate(0, 26, 0);
        const beam = new THREE.Mesh(beamGeo, searchlightMat);
        beam.position.set(tx, baseGndY + h, tz);
        cityGroup.add(beam);
        searchlights.push({ mesh: beam, phase: i * 1.4 });
      }
    }
  });

  scene.add(cityGroup);

  function update(delta, elapsed) {
    holoTreeCanopies.forEach((t) => {
      t.mesh.rotation.y = elapsed * 0.28 + t.phase;
      t.mesh.position.y = 4.6 + Math.sin(elapsed * 1.6 + t.phase) * 0.1;
    });

    searchlights.forEach((sl) => {
      sl.mesh.rotation.x = Math.sin(elapsed * 0.45 + sl.phase) * 0.22;
      sl.mesh.rotation.z = Math.cos(elapsed * 0.38 + sl.phase) * 0.22;
    });

    const baseAngle = elapsed * 0.24;
    maglevCars.forEach((car) => {
      const a = baseAngle - car.offset;
      car.mesh.position.set(
        Math.cos(a) * monorailRadius,
        monorailY + 0.85,
        Math.sin(a) * monorailRadius
      );
      car.mesh.rotation.y = -a;
    });

    hoverCars.forEach((car) => {
      if (car.axis === 'z') {
        car.mesh.position.z += car.speed * delta;
        if (car.mesh.position.z > car.limit) car.mesh.position.z = -car.limit;
        if (car.mesh.position.z < -car.limit) car.mesh.position.z = car.limit;
      } else {
        car.mesh.position.x += car.speed * delta;
        if (car.mesh.position.x > car.limit) car.mesh.position.x = -car.limit;
        if (car.mesh.position.x < -car.limit) car.mesh.position.x = car.limit;
      }
    });
  }

  return { update };
}