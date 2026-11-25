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
    // Couleurs par sommet gardées seulement si toutes les formes en ont (feuillages)
    const keep = ['position', 'normal', 'uv'];
    if (meshes.every((m) => m.geometry.attributes.color)) keep.push('color');
    const geos = meshes.map((m) => {
      const g = m.geometry.clone();
      g.applyMatrix4(m.matrixWorld);
      // Ne garder que les attributs communs à toutes les formes
      Object.keys(g.attributes).forEach((name) => {
        if (!keep.includes(name)) g.deleteAttribute(name);
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
  base: '#111b36',
  patches: ['#16224a', '#1a1844', '#13203f', '#182650', '#1b2756', '#21184a', '#152447'],
  fade: 'rgba(17, 27, 54, 0)',
  specks: ['#18244a', '#131e3e', '#0f1833', '#1a1a46'],
  road: '#05070f',
  roadLine: '#22e4ff',
  pathOuter: '#8b2a7a',
  pathInner: '#1c2344',
  plaza: '#141b33',
  plazaRings: ['#22e4ff', '#ff3dbb']
};

// Jour : parc urbain sobre (pelouse, allées claires, asphalte)
const GROUND_DAY = {
  base: '#4b6c3b',
  patches: ['#587b41', '#486a38', '#628846', '#53773e', '#6b8e4a', '#7b8a49', '#50733d'],
  fade: 'rgba(75, 108, 59, 0)',
  specks: ['#5d8246', '#4a6c3b', '#43633a', '#66894b'],
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
  // Pelouse : la texture de base est enrichie dans le shader par un bruit
  // à plusieurs échelles (taches d'herbe plus ou moins drue, brins fins).
  // La nuit, l'herbe devient bleu nuit et de petites spores lumineuses
  // (cyan et roses) scintillent près de la caméra, comme les lucioles des arbres.
  const terrainTime = { value: 0 };
  terrainMesh.material.onBeforeCompile = (shader) => {
    shader.uniforms.uDayMap = { value: dayDiffTex };
    shader.uniforms.uDay = DAY_UNIFORM;
    shader.uniforms.uTime = terrainTime;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTerrPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvTerrPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform sampler2D uDayMap;
        uniform float uDay;
        uniform float uTime;
        varying vec3 vTerrPos;
        float gxHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float gxNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(gxHash(i), gxHash(i + vec2(1.0, 0.0)), f.x), mix(gxHash(i + vec2(0.0, 1.0)), gxHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }`
      )
      .replace(
        '#include <map_fragment>',
        `#ifdef USE_MAP
          vec4 sampledDiffuseColor = mix(texture2D(map, vMapUv), texture2D(uDayMap, vMapUv), uDay);
          diffuseColor *= sampledDiffuseColor;
        #endif
        float grassBig = gxNoise(vTerrPos.xz * 0.06) * 0.55 + gxNoise(vTerrPos.xz * 0.23) * 0.45;
        float grassFine = gxNoise(vTerrPos.xz * 3.1) * 0.6 + gxNoise(vTerrPos.xz * 11.0) * 0.4;
        diffuseColor.rgb *= 0.74 + grassBig * 0.42 + (grassFine - 0.5) * 0.16;
        // Herbe un peu plus jaune sur les zones claires, plus bleue dans les creux (jour)
        diffuseColor.rgb *= mix(vec3(1.0), mix(vec3(0.92, 0.98, 1.08), vec3(1.08, 1.04, 0.9), grassBig), uDay);`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        vec2 sporeCell = floor(vTerrPos.xz / 0.8);
        float sporeH = gxHash(sporeCell);
        vec2 sporeF = fract(vTerrPos.xz / 0.8) - 0.5;
        float spore = step(0.985, sporeH) * (1.0 - smoothstep(0.0, 0.22, length(sporeF)));
        spore *= 0.55 + 0.45 * sin(uTime * (1.0 + sporeH * 3.0) + sporeH * 60.0);
        spore *= 1.0 - smoothstep(35.0, 80.0, distance(vTerrPos, cameraPosition));
        vec3 sporeCol = mix(vec3(0.13, 0.89, 1.0), vec3(1.0, 0.3, 0.8), step(0.993, sporeH));
        totalEmissiveRadiance += sporeCol * spore * 0.9 * (1.0 - uDay);`
      );
  };
  terrainMesh.material.customProgramCacheKey = () => 'terrain-day-night-v2';

  // Bassins d'eau réfléchissants dans le parc
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b2440,
    emissive: 0x0b2a55,
    emissiveIntensity: 0.45,
    metalness: 0.1,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.6
  });
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x8d9099, roughness: 0.9, metalness: 0.0 });
  [
    { x: -46, z: -42, r: 12 },
    { x: 48, z: 44, r: 11 }
  ].forEach((pond) => {
    const py = getTerrainHeight(pond.x, pond.z) + 0.12;
    const waterDisc = new THREE.Mesh(new THREE.CircleGeometry(pond.r, 32), waterMat);
    waterDisc.rotation.x = -Math.PI / 2;
    waterDisc.position.set(pond.x, py, pond.z);
    cityGroup.add(waterDisc);
    // Margelle en pierre arrondie
    const rimStone = new THREE.Mesh(new THREE.TorusGeometry(pond.r + 0.35, 0.5, 10, 64), stoneMat);
    rimStone.rotation.x = Math.PI / 2;
    rimStone.scale.set(1, 1, 0.45);
    rimStone.position.set(pond.x, py + 0.05, pond.z);
    cityGroup.add(rimStone);
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
  // Tablier en composite laqué : panneaux avec joints, bandes lumineuses sur
  // les deux bords et pointillés roses au centre (s'allument la nuit).
  const bridgeDeckMat = new THREE.MeshStandardMaterial({
    color: 0x3a4468,
    metalness: 0.55,
    roughness: 0.28
  });
  bridgeDeckMat.defines = { USE_UV: '' };
  bridgeDeckMat.onBeforeCompile = (shader) => {
    shader.uniforms.uDay = DAY_UNIFORM;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vDeckN;')
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nvDeckN = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vDeckN;\nuniform float uDay;')
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float panel = fract(vUv.x * 70.0);
        float seam = smoothstep(0.0, 0.04, panel) * smoothstep(1.0, 0.96, panel);
        float top = smoothstep(0.55, 0.8, vDeckN.y);
        diffuseColor.rgb *= mix(1.0, mix(0.55, 1.0, seam), top);
        diffuseColor.rgb *= 0.92 + 0.08 * fract(sin(floor(vUv.x * 70.0) * 91.7) * 4375.5);`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float edgeLine = 1.0 - smoothstep(0.0, 0.07, abs(vDeckN.y - 0.38));
        float centre = step(0.996, vDeckN.y) * step(0.5, fract(vUv.x * 35.0));
        float glowOn = mix(1.1, 0.15, uDay);
        totalEmissiveRadiance += (vec3(0.13, 0.89, 1.0) * edgeLine + vec3(1.0, 0.24, 0.73) * centre) * glowOn;`
      );
  };
  bridgeDeckMat.customProgramCacheKey = () => 'bridge-deck';

  function buildSweepingSkybridge(points) {
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 80, 1.35, 8, false);
    tubeGeo.scale(1, 0.26, 1);

    const bridge = new THREE.Mesh(tubeGeo, bridgeDeckMat);
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

  // 4. ARBRES NÉON DU PARC
  // Une vraie silhouette d'arbre (branches générées par code, qui se divisent
  // et s'affinent) mais en lumière : branches en néon dégradé du pied vers la
  // pointe, feuillage fait de milliers de lucioles qui scintillent et ondulent
  // au vent. Tout le parc tient en 2 appels de dessin.
  const TREE_STYLES = {
    cyan: { base: [0.05, 0.25, 0.4], tip: [0.35, 1.7, 2.3], leaves: [[0.3, 1.9, 2.6], [0.55, 1.4, 2.6], [1.0, 2.2, 2.4]] },
    pink: { base: [0.35, 0.06, 0.3], tip: [2.2, 0.45, 1.6], leaves: [[2.6, 0.5, 1.7], [2.4, 0.9, 2.0], [2.6, 1.6, 2.2]] },
    violet: { base: [0.18, 0.08, 0.4], tip: [1.2, 0.6, 2.6], leaves: [[1.3, 0.55, 2.8], [0.8, 0.9, 2.8], [2.0, 0.7, 2.4]] }
  };

  const branchGeos = [];
  const leafPos = [];
  const leafCol = [];
  const leafData = []; // phase, taille, balancement
  const up = new THREE.Vector3(0, 1, 0);
  const tmpQ = new THREE.Quaternion();
  const segColor = new THREE.Color();

  function addSegment(a, b, r0, r1, c0, c1) {
    const len = a.distanceTo(b);
    const g = new THREE.CylinderGeometry(r1, r0, len, 6, 1, true);
    const cols = new Float32Array(g.attributes.position.count * 3);
    for (let i = 0; i < g.attributes.position.count; i++) {
      const t = g.attributes.position.getY(i) / len + 0.5;
      segColor.setRGB(...c0).lerp(new THREE.Color(...c1), t);
      cols.set([segColor.r, segColor.g, segColor.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    g.deleteAttribute('uv');
    tmpQ.setFromUnitVectors(up, b.clone().sub(a).normalize());
    g.applyQuaternion(tmpQ);
    g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
    branchGeos.push(g);
  }

  function mixRGB(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  // Grappe de lucioles au bout d'une branche
  function addLeaves(center, radius, count, style, sway) {
    for (let i = 0; i < count; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const rr = radius * Math.cbrt(Math.random());
      const s = Math.sqrt(1 - u * u);
      leafPos.push(center.x + s * Math.cos(th) * rr, center.y + u * rr * 0.75, center.z + s * Math.sin(th) * rr);
      const c = style.leaves[Math.floor(Math.random() * style.leaves.length)];
      const k = 0.55 + Math.random() * 0.45;
      leafCol.push(c[0] * k, c[1] * k, c[2] * k);
      leafData.push(Math.random(), 0.08 + Math.random() * 0.13, sway);
    }
  }

  function growBranch(start, dir, length, radius, depth, maxDepth, style, shape, groundY) {
    const end = start.clone().addScaledVector(dir, length);
    const t0 = 1 - depth / maxDepth;
    const t1 = 1 - (depth - 1) / maxDepth;
    addSegment(start, end, radius, radius * 0.66, mixRGB(style.base, style.tip, t0 * t0), mixRGB(style.base, style.tip, t1 * t1));
    if (depth >= maxDepth) {
      addLeaves(end, 1.0 + Math.random() * 0.4, 26, style, end.y - groundY);
      return;
    }
    // Quelques lucioles aussi le long des branches hautes
    if (depth >= maxDepth - 1) addLeaves(end, 0.8, 12, style, end.y - groundY);
    else if (depth >= maxDepth - 2) addLeaves(end, 0.6, 5, style, end.y - groundY);
    const children = depth === 0 ? 3 : 2 + (Math.random() < 0.45 ? 1 : 0);
    for (let i = 0; i < children; i++) {
      const spread = shape === 'tall' ? 0.32 : 0.62;
      const azimuth = (i / children) * Math.PI * 2 + Math.random() * 1.2;
      // Direction : écart par rapport à la branche mère, légère poussée vers le haut
      const side = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth));
      const nd = dir.clone().multiplyScalar(Math.cos(spread)).addScaledVector(side, Math.sin(spread) * (0.8 + Math.random() * 0.4));
      nd.y += shape === 'tall' ? 0.35 : 0.18;
      nd.normalize();
      growBranch(end, nd, length * (shape === 'tall' ? 0.68 : 0.74), radius * 0.55, depth + 1, maxDepth, style, shape, groundY);
    }
  }

  function createNeonTree(x, z, scale, styleName, shape) {
    const gndY = getTerrainHeight(x, z);
    const style = TREE_STYLES[styleName];
    const base = new THREE.Vector3(x, gndY, z);
    const lean = new THREE.Vector3((Math.random() - 0.5) * 0.12, 1, (Math.random() - 0.5) * 0.12).normalize();
    const trunkLen = (shape === 'tall' ? 2.4 : 2.1) * scale;
    // Tronc en deux morceaux un peu tordus
    const mid = base.clone().addScaledVector(lean, trunkLen * 0.55);
    mid.x += (Math.random() - 0.5) * 0.15 * scale;
    mid.z += (Math.random() - 0.5) * 0.15 * scale;
    addSegment(base, mid, 0.26 * scale, 0.2 * scale, style.base, mixRGB(style.base, style.tip, 0.12));
    growBranch(mid, lean, trunkLen * 0.6, 0.2 * scale, 0, 4, style, shape, gndY);

    // Bague néon au pied (s'allume la nuit)
    const emitter = new THREE.Mesh(
      new THREE.TorusGeometry(0.8 * scale, 0.035, 8, 28),
      styleName === 'pink' ? softEmeraldMat : softTealMat
    );
    emitter.rotation.x = Math.PI / 2;
    emitter.position.set(x, gndY + 0.06, z);
    cityGroup.add(emitter);
  }

  // Le pied des escaliers de la tour reste dégagé (passage de la caméra)
  const keepClear = (x, z) => Math.abs(x) < 9 && z > 10 && z < 42;

  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2 + (Math.random() - 0.5) * 0.14;
    const dist = 31 + Math.random() * 52;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    if (keepClear(x, z)) continue;
    const styleName = i % 3 === 0 ? 'pink' : i % 3 === 1 ? 'cyan' : 'violet';
    createNeonTree(x, z, 0.9 + Math.random() * 0.6, styleName, i % 4 === 2 ? 'tall' : 'round');
  }

  // Petits buissons de lucioles autour des bassins
  [
    { x: -46, z: -42, r: 12 },
    { x: 48, z: 44, r: 11 }
  ].forEach((pond, p) => {
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2 + Math.random() * 0.2;
      const d = pond.r + 2 + Math.random() * 1.2;
      const x = pond.x + Math.cos(a) * d;
      const z = pond.z + Math.sin(a) * d;
      const c = new THREE.Vector3(x, getTerrainHeight(x, z) + 0.45, z);
      addLeaves(c, 0.55, 14, TREE_STYLES[(k + p) % 2 ? 'cyan' : 'pink'], 0.3);
    }
  });

  // Branches : un seul mesh, couleurs HDR (le bloom les fait briller)
  const branchMat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  const branchMesh = new THREE.Mesh(mergeGeometries(branchGeos, false), branchMat);
  branchGeos.forEach((g) => g.dispose());
  branchMesh.userData.dynamic = true; // déjà fusionné
  cityGroup.add(branchMesh);

  // Feuillage : lucioles lumineuses qui scintillent et ondulent au vent
  const leafGeo = new THREE.BufferGeometry();
  leafGeo.setAttribute('position', new THREE.Float32BufferAttribute(leafPos, 3));
  leafGeo.setAttribute('aColor', new THREE.Float32BufferAttribute(leafCol, 3));
  leafGeo.setAttribute('aData', new THREE.Float32BufferAttribute(leafData, 3));
  const neonLeafUniforms = {
    uTime: { value: 0 },
    uDay: DAY_UNIFORM,
    uViewportH: { value: 800 }
  };
  const neonLeaves = new THREE.Points(
    leafGeo,
    new THREE.ShaderMaterial({
      uniforms: neonLeafUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aColor;
        attribute vec3 aData; // phase, taille, hauteur (balancement)
        uniform float uTime;
        uniform float uViewportH;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          vec3 p = position;
          // Vent : les grappes hautes ondulent davantage
          float sway = aData.z * 0.035;
          p.x += sin(uTime * 1.1 + position.z * 0.15 + aData.x * 0.6) * sway;
          p.z += cos(uTime * 0.9 + position.x * 0.15) * sway * 0.6;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = min(aData.y * projectionMatrix[1][1] * uViewportH * 0.5 / -mv.z, 48.0);
          vTwinkle = 0.6 + 0.4 * sin(uTime * (1.5 + aData.x * 2.5) + aData.x * 40.0);
          vColor = aColor;
        }
      `,
      fragmentShader: `
        uniform float uDay;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float core = pow(1.0 - d, 2.5);
          float halo = (1.0 - d) * 0.35;
          vec3 col = vColor * (core * 1.3 + halo) * vTwinkle * mix(0.42, 0.75, uDay);
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })
  );
  neonLeaves.frustumCulled = false;
  neonLeaves.userData.dynamic = true;
  neonLeaves.userData.thinnable = true; // mode léger : moins de feuilles
  cityGroup.add(neonLeaves);

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
    { m: bridgeDeckMat, color: [C(0x2c3454), C(0xd6dde8)] },
    { m: glassCylinderMat, color: [C(0x0b1430), C(0x2a5a8a)] },
    { m: softEmeraldMat, emissive: [0.9, 0.3] },
    // Branches néon : discrètes la nuit (le feuillage prend le relais), normales le jour
    { m: branchMat, color: [C(0x4d4d4d), C(0xffffff)] },
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
    terrainTime.value = elapsed;
    neonLeafUniforms.uTime.value = elapsed;
    neonLeafUniforms.uViewportH.value = window.innerHeight * Math.min(window.devicePixelRatio || 1, 2);
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