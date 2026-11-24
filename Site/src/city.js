import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { NEON_HDR, DAY_UNIFORM } from './theme.js';
import { GLOW } from './glows.js';

// Fusionne tous les objets fixes qui partagent le même matériau en un seul mesh.
// Des centaines d'appels de dessin deviennent une vingtaine : gros gain de fluidité.
function mergeStaticMeshes(group) {
  group.updateMatrixWorld(true);
  const buckets = new Map();
  const merged = [];

  group.traverse((obj) => {
    if (!obj.isMesh) return;
    for (let p = obj; p && p !== group; p = p.parent) {
      if (p.userData.dynamic) return;
    }
    const key = obj.material.uuid + (obj.geometry.index ? '|i' : '|n');
    if (!buckets.has(key)) buckets.set(key, { material: obj.material, meshes: [] });
    buckets.get(key).meshes.push(obj);
  });

  buckets.forEach(({ material, meshes }) => {
    if (meshes.length < 2) return;
    const geos = meshes.map((m) => {
      const g = m.geometry.clone();
      g.applyMatrix4(m.matrixWorld);
      // Ne garder que les attributs communs à toutes les formes
      Object.keys(g.attributes).forEach((name) => {
        if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
      });
      return g;
    });
    const mergedGeo = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    if (!mergedGeo) return;
    meshes.forEach((m) => m.parent.remove(m));
    merged.push(new THREE.Mesh(mergedGeo, material));
  });

  merged.forEach((m) => group.add(m));
}

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

const GROUND_NIGHT = {
  base: '#0a0f1f',
  patches: ['#0e1630', '#120f2e', '#0b1228', '#101a36', '#121a3a', '#170f33', '#0e1a30'],
  fade: 'rgba(10, 15, 31, 0)',
  specks: ['#1a2647', '#121b36', '#070b18', '#1b1440'],
  road: '#05070f',
  roadLine: '#22e4ff',
  pathOuter: '#8b2a7a',
  pathInner: '#1c2344',
  plaza: '#141b33',
  plazaRings: ['#22e4ff', '#ff3dbb']
};

// Jour : parc urbain sobre (pelouse, allées claires, asphalte)
const GROUND_DAY = {
  base: '#3f5a45',
  patches: ['#46684c', '#3e5f45', '#4a6b4f', '#40624a', '#527456', '#5b6b45', '#456a4e'],
  fade: 'rgba(63, 90, 69, 0)',
  specks: ['#5f8a5f', '#3f6a48', '#2f4a36', '#6b7a4a'],
  road: '#2b3038',
  roadLine: '#e2e8f0',
  pathOuter: '#94a3b8',
  pathInner: '#e2e8f0',
  plaza: '#64748b',
  plazaRings: ['#38bdf8', '#22c55e']
};

function createHighDetailGroundTextures(pal = GROUND_NIGHT) {
  const size = 2048;
  const diffCvs = document.createElement('canvas');
  diffCvs.width = size;
  diffCvs.height = size;
  const ctx = diffCvs.getContext('2d');

  const bumpCvs = document.createElement('canvas');
  bumpCvs.width = 1024;
  bumpCvs.height = 1024;
  const bCtx = bumpCvs.getContext('2d');

  ctx.fillStyle = pal.base;
  ctx.fillRect(0, 0, size, size);

  bCtx.fillStyle = '#707070';
  bCtx.fillRect(0, 0, 1024, 1024);

  const patches = [
    { x: 420, y: 420, r: 380, c: pal.patches[0] },
    { x: 1620, y: 440, r: 400, c: pal.patches[1] },
    { x: 440, y: 1620, r: 390, c: pal.patches[2] },
    { x: 1600, y: 1600, r: 410, c: pal.patches[3] },
    { x: 1024, y: 1024, r: 500, c: pal.patches[4] },
    { x: 750, y: 1320, r: 220, c: pal.patches[5] },
    { x: 1320, y: 740, r: 240, c: pal.patches[6] }
  ];
  patches.forEach((p) => {
    const g = ctx.createRadialGradient(p.x, p.y, 30, p.x, p.y, p.r);
    g.addColorStop(0, p.c);
    g.addColorStop(1, pal.fade);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < 110000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random();
    ctx.fillStyle = r > 0.68 ? pal.specks[0] : r > 0.35 ? pal.specks[1] : r > 0.12 ? pal.specks[2] : pal.specks[3];
    ctx.fillRect(x, y, 2, 4);

    if (i % 2 === 0) {
      bCtx.fillStyle = r > 0.5 ? '#969696' : '#525252';
      bCtx.fillRect(x * 0.5, y * 0.5, 2, 2);
    }
  }

  ctx.fillStyle = pal.road;
  ctx.fillRect(0, 0, size, 96);
  ctx.fillRect(0, 1952, size, 96);
  ctx.fillRect(0, 0, 96, size);
  ctx.fillRect(1952, 0, 96, size);

  bCtx.fillStyle = '#383838';
  bCtx.fillRect(0, 0, 1024, 48);
  bCtx.fillRect(0, 976, 1024, 48);
  bCtx.fillRect(0, 0, 48, 1024);
  bCtx.fillRect(976, 0, 48, 1024);

  ctx.strokeStyle = pal.roadLine;
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

    ctx.strokeStyle = pal.pathOuter;
    ctx.lineWidth = w + 10;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i][0] + pts[i + 1][0]) / 2;
      const yc = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc);
    }
    ctx.stroke();

    ctx.strokeStyle = pal.pathInner;
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
    ctx.fillStyle = pal.plaza;
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = idx === 4 ? pal.plazaRings[0] : pal.plazaRings[1];
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
    { wall: '#0a0e1f', win1: '#9ad8ff', win2: '#22e4ff', style: 'grid' },
    { wall: '#0d1022', win1: '#ffd9a8', win2: '#ff3dbb', style: 'stripes' },
    { wall: '#0c0f24', win1: '#c4b5fd', win2: '#ff3dbb', style: 'grid' },
    { wall: '#0a1020', win1: '#a5f3fc', win2: '#22e4ff', style: 'tall' },
    { wall: '#111430', win1: '#4b4f8f', win2: '#22e4ff', style: 'diagrid' }
  ];
  const p = palettes[paletteIndex % palettes.length];

  ctx.fillStyle = p.wall;
  ctx.fillRect(0, 0, 256, 512);

  if (p.style === 'stripes') {
    for (let y = 12; y < 500; y += 18) {
      ctx.fillStyle = Math.random() > 0.2 ? p.win1 : '#0e1328';
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
          ctx.fillStyle = '#0e1328';
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

export function buildEcoCyberCity(scene, mainTowerHeight, glows) {
  const cityGroup = new THREE.Group();

  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(...NEON_HDR.cyan), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(...NEON_HDR.magenta), toneMapped: false });
  const amberHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(...NEON_HDR.violet), toneMapped: false });

  // Néons doux (s'allument la nuit sans éblouir)
  const softEmeraldMat = new THREE.MeshStandardMaterial({
    color: 0xff3dbb,
    emissive: 0xb0127a,
    emissiveIntensity: 0.9,
    roughness: 0.45
  });
  const softTealMat = new THREE.MeshStandardMaterial({
    color: 0x22e4ff,
    emissive: 0x0a8fb0,
    emissiveIntensity: 0.9,
    roughness: 0.45
  });

  const whiteBridgeMat = new THREE.MeshStandardMaterial({
    color: 0x3a4468,
    metalness: 0.6,
    roughness: 0.3
  });
  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x162033,
    metalness: 0.82,
    roughness: 0.28
  });
  const woodBarkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1426,
    roughness: 0.85,
    metalness: 0.1
  });

  // 1. SOL 3D AVEC RELIEF NATUREL & TEXTURES HD
  const { diffTex, bumpTex } = createHighDetailGroundTextures(GROUND_NIGHT);
  const { diffTex: dayDiffTex } = createHighDetailGroundTextures(GROUND_DAY);
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
  terrainMesh.material.onBeforeCompile = (shader) => {
    shader.uniforms.uDayMap = { value: dayDiffTex };
    shader.uniforms.uDay = DAY_UNIFORM;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D uDayMap;\nuniform float uDay;')
      .replace(
        '#include <map_fragment>',
        `#ifdef USE_MAP
          vec4 sampledDiffuseColor = mix(texture2D(map, vMapUv), texture2D(uDayMap, vMapUv), uDay);
          diffuseColor *= sampledDiffuseColor;
        #endif`
      );
  };
  terrainMesh.material.customProgramCacheKey = () => 'terrain-day-night';

  // Bassins d'eau réfléchissants dans le parc
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0a1a3a,
    emissive: 0x0b2a55,
    emissiveIntensity: 0.6,
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
  const maglevWindowMat = new THREE.MeshStandardMaterial({
    color: 0x05070f,
    emissive: 0xffc98a,
    emissiveIntensity: 1.1,
    roughness: 0.2,
    metalness: 0.5
  });
  for (let w = 0; w < 5; w++) {
    const wagon = new THREE.Group();
    wagon.userData.dynamic = true;
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.3, 4.4), whiteBridgeMat);
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(1.66, 0.18, 4.45),
      w === 0 ? pinkHdr : cyanHdr
    );
    // Rangée de fenêtres éclairées de chaque côté
    const windows = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.38, 3.6), maglevWindowMat);
    windows.position.y = 0.2;
    wagon.add(body, stripe, windows);
    cityGroup.add(wagon);
    maglevCars.push({ mesh: wagon, offset: w * 0.062 });
    if (glows) {
      if (w === 0) {
        glows.add(wagon, new THREE.Vector3(-0.5, -0.2, -2.3), GLOW.headlight, 0.9);
        glows.add(wagon, new THREE.Vector3(0.5, -0.2, -2.3), GLOW.headlight, 0.9);
      }
      if (w === 4) {
        glows.add(wagon, new THREE.Vector3(-0.5, -0.2, 2.3), GLOW.taillight, 0.6);
        glows.add(wagon, new THREE.Vector3(0.5, -0.2, 2.3), GLOW.taillight, 0.6);
      }
    }
  }

  // 4. ARBRES HOLOGRAPHIQUES DOUX & ORGANIQUES
  const holoWireGreen = new THREE.MeshBasicMaterial({
    color: 0xff3dbb,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const holoWireTeal = new THREE.MeshBasicMaterial({
    color: 0x22e4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const holoLeafShellGreen = new THREE.MeshStandardMaterial({
    color: 0x3b1a6b,
    emissive: 0x5b21b6,
    emissiveIntensity: 0.5,
    roughness: 0.65,
    transparent: true,
    opacity: 0.6
  });
  const holoLeafShellTeal = new THREE.MeshStandardMaterial({
    color: 0x0e3a5a,
    emissive: 0x0a6c8c,
    emissiveIntensity: 0.5,
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
    canopyGroup.rotation.y = Math.random() * Math.PI * 2; // arbres fixes (fusionnés) mais orientés au hasard
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

  // 5. VOITURES VOLANTES SUR LES AVENUES
  // Silhouette dessinée de profil puis extrudée (capot, pare-brise, toit, coffre),
  // vitres teintées, peinture métallisée. Les 28 voitures sont « instanciées » :
  // 4 appels GPU au total au lieu d'un par pièce de chaque voiture.
  const hoverCars = [];

  function extrudeProfile(points, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const pt = points[i];
      if (pt.length === 4) shape.quadraticCurveTo(pt[0], pt[1], pt[2], pt[3]);
      else shape.lineTo(pt[0], pt[1]);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelSegments: 2,
      curveSegments: 6
    });
    geo.translate(0, 0, -depth / 2);
    geo.rotateY(-Math.PI / 2); // la longueur du profil (x) devient l'axe avant (z)
    return geo;
  }

  const carBodyGeo = extrudeProfile([
    [-1.8, 0.22],
    [1.65, 0.2],
    [1.92, 0.24, 1.88, 0.42],
    [1.2, 0.58],
    [0.35, 0.95],
    [-0.7, 0.98],
    [-1.55, 0.88, -1.82, 0.6]
  ], 1.42);
  const carGlassGeo = extrudeProfile([
    [1.12, 0.6],
    [0.36, 0.93],
    [-0.68, 0.96],
    [-1.38, 0.74],
    [-1.3, 0.6]
  ], 1.5);
  const headStripGeo = new THREE.BoxGeometry(1.2, 0.07, 0.06).translate(0, 0.42, 1.93);
  const tailStripGeo = new THREE.BoxGeometry(1.36, 0.08, 0.06).translate(0, 0.6, -1.9);

  const carPaintMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.75,
    roughness: 0.26,
    envMapIntensity: 1.1
  });
  const carGlassMat = new THREE.MeshStandardMaterial({
    color: 0x03050c,
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 1.4
  });
  const headLightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(...GLOW.headlight), toneMapped: false });
  const tailLightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(...GLOW.taillight), toneMapped: false });

  const paintColors = [0x0c0e14, 0x1c2a4a, 0xb9bfcc, 0x3a0d2e, 0x161a22, 0x5a6070];
  const CAR_COUNT = 28;
  const carBodies = new THREE.InstancedMesh(carBodyGeo, carPaintMat, CAR_COUNT);
  const carGlass = new THREE.InstancedMesh(carGlassGeo, carGlassMat, CAR_COUNT);
  const carHeads = new THREE.InstancedMesh(headStripGeo, headLightMat, CAR_COUNT);
  const carTails = new THREE.InstancedMesh(tailStripGeo, tailLightMat, CAR_COUNT);
  [carBodies, carGlass, carHeads, carTails].forEach((m) => {
    m.frustumCulled = false;
    m.userData.dynamic = true;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    cityGroup.add(m);
  });

  function createCyberCar(index) {
    // Repère invisible : il porte la position, les instances et les halos le suivent
    const car = new THREE.Object3D();
    car.userData.dynamic = true;
    carBodies.setColorAt(index, new THREE.Color(paintColors[index % paintColors.length]));
    if (glows) {
      glows.add(car, new THREE.Vector3(-0.52, 0.42, 1.98), GLOW.headlight, 0.75);
      glows.add(car, new THREE.Vector3(0.52, 0.42, 1.98), GLOW.headlight, 0.75);
      glows.add(car, new THREE.Vector3(-0.6, 0.6, -1.95), GLOW.taillight, 0.5);
      glows.add(car, new THREE.Vector3(0.6, 0.6, -1.95), GLOW.taillight, 0.5);
      // Lueur du coussin de sustentation sous la voiture
      glows.add(car, new THREE.Vector3(0, 0.05, 0), index % 2 ? [0.12, 0.7, 0.9] : [0.8, 0.1, 0.55], 2.2);
    }
    return car;
  }

  let carIndex = 0;
  [-98, 98].forEach((roadCoord, rIdx) => {
    for (let c = 0; c < 7; c++) {
      const carZ = createCyberCar(carIndex++);
      const dirZ = rIdx === 0 ? 1 : -1;
      carZ.position.set(roadCoord + dirZ * 2.2, 0.35, -260 + c * 85);
      carZ.rotation.y = dirZ > 0 ? 0 : Math.PI;
      cityGroup.add(carZ);
      hoverCars.push({ mesh: carZ, axis: 'z', speed: (24 + Math.random() * 14) * dirZ, limit: 290, phase: Math.random() * 6 });

      const carX = createCyberCar(carIndex++);
      const dirX = rIdx === 0 ? -1 : 1;
      carX.position.set(-260 + c * 85, 0.35, roadCoord - dirX * 2.2);
      carX.rotation.y = dirX > 0 ? Math.PI / 2 : -Math.PI / 2;
      cityGroup.add(carX);
      hoverCars.push({ mesh: carX, axis: 'x', speed: (24 + Math.random() * 14) * dirX, limit: 290, phase: Math.random() * 6 });
    }
  });
  if (carBodies.instanceColor) carBodies.instanceColor.needsUpdate = true;

  // 6. 180 GRATTE-CIELS VARIÉS + PROJECTEURS CÉLESTES
  const facadeMats = [0, 1, 2, 3, 4].map((idx) => {
    const tex = createBuildingFacadeTexture(idx);
    return new THREE.MeshStandardMaterial({
      color: 0x0d1124,
      map: tex,
      emissiveMap: tex,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.75,
      metalness: 0.65,
      roughness: 0.3
    });
  });

  const glassCylinderMat = new THREE.MeshStandardMaterial({
    color: 0x0b1430,
    metalness: 0.92,
    roughness: 0.12
  });

  const beaconMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.8, 0.1, 0.35),
    toneMapped: false
  });

  const searchlightMat = new THREE.MeshBasicMaterial({
    color: 0x22e4ff,
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
        beam.userData.dynamic = true;
        beam.position.set(tx, baseGndY + h, tz);
        cityGroup.add(beam);
        searchlights.push({ mesh: beam, phase: i * 1.4 });
      }
    }
  });

  terrainMesh.userData.dynamic = true; // déjà un seul mesh, inutile de le copier
  mergeStaticMeshes(cityGroup);
  scene.add(cityGroup);

  const C = (hex) => new THREE.Color(hex);
  const dayNightLooks = [
    ...facadeMats.map((m) => ({ m, color: [C(0x0d1124), C(0x8a96ac)], emissive: [0.75, 0.12] })),
    { m: whiteBridgeMat, color: [C(0x3a4468), C(0xe2e8f0)] },
    { m: glassCylinderMat, color: [C(0x0b1430), C(0x2a5a8a)] },
    { m: softEmeraldMat, emissive: [0.9, 0.3] },
    { m: softTealMat, emissive: [0.9, 0.3] },
    { m: maglevWindowMat, emissive: [1.1, 0.15] },
    { m: searchlightMat, opacity: [0.07, 0.0] }
  ];
  let lastDay = -1;
  function applyDayNight(day) {
    if (Math.abs(day - lastDay) < 0.002) return;
    lastDay = day;
    dayNightLooks.forEach((look) => {
      if (look.color) look.m.color.copy(look.color[0]).lerp(look.color[1], day);
      if (look.emissive) look.m.emissiveIntensity = THREE.MathUtils.lerp(look.emissive[0], look.emissive[1], day);
      if (look.opacity) look.m.opacity = THREE.MathUtils.lerp(look.opacity[0], look.opacity[1], day);
    });
  }

  function update(delta, elapsed) {
    applyDayNight(DAY_UNIFORM.value);
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

    hoverCars.forEach((car, i) => {
      if (car.axis === 'z') {
        car.mesh.position.z += car.speed * delta;
        if (car.mesh.position.z > car.limit) car.mesh.position.z = -car.limit;
        if (car.mesh.position.z < -car.limit) car.mesh.position.z = car.limit;
      } else {
        car.mesh.position.x += car.speed * delta;
        if (car.mesh.position.x > car.limit) car.mesh.position.x = -car.limit;
        if (car.mesh.position.x < -car.limit) car.mesh.position.x = car.limit;
      }
      // Flottement du coussin d'air
      car.mesh.position.y = 0.35 + Math.sin(elapsed * 2.1 + car.phase) * 0.05;
      car.mesh.updateMatrix();
      carBodies.setMatrixAt(i, car.mesh.matrix);
      carGlass.setMatrixAt(i, car.mesh.matrix);
      carHeads.setMatrixAt(i, car.mesh.matrix);
      carTails.setMatrixAt(i, car.mesh.matrix);
    });
    carBodies.instanceMatrix.needsUpdate = true;
    carGlass.instanceMatrix.needsUpdate = true;
    carHeads.instanceMatrix.needsUpdate = true;
    carTails.instanceMatrix.needsUpdate = true;
  }

  return { update };
}