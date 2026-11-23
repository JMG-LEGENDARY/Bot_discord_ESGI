import * as THREE from 'three';
import './style.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. INITIALISATION SCÈNE, RENDU HDR & BLOOM
// ==========================================
const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03060e);
scene.fog = new THREE.FogExp2(0x03060e, 0.0068);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.96;

const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  type: THREE.HalfFloatType,
  samples: 4
});
const composer = new EffectComposer(renderer, renderTarget);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.32, // Halo néon maîtrisé
  0.25,
  1.25  // Seuil HDR
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

// Éclairage général
const hemiLight = new THREE.HemisphereLight(0x6ea8ff, 0x090d1a, 0.65);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xdbeafe, 0.95);
dirLight.position.set(35, 95, 45);
scene.add(dirLight);

const rimLight = new THREE.DirectionalLight(0xff007f, 0.35);
rimLight.position.set(-45, 35, -40);
scene.add(rimLight);

// ==========================================
// 2. MÉTROPOLE & SOL CYBERPUNK (PLUS DE VIDE)
// ==========================================
function buildCyberpunkMetropolis() {
  const cityGroup = new THREE.Group();

  // A. SOL URBAIN RÉFLÉCHISSANT AVEC AVENUES LUMINEUSES (y = -0.05)
  const groundCvs = document.createElement('canvas');
  groundCvs.width = 512;
  groundCvs.height = 512;
  const gCtx = groundCvs.getContext('2d');
  gCtx.fillStyle = '#050914';
  gCtx.fillRect(0, 0, 512, 512);

  // Quadrillage de blocs urbains
  gCtx.strokeStyle = '#0f1c33';
  gCtx.lineWidth = 18;
  gCtx.strokeRect(0, 0, 512, 512);
  gCtx.strokeRect(128, 0, 256, 512);
  gCtx.strokeRect(0, 128, 512, 256);

  // Lignes de circulation néon cyan & magenta
  gCtx.strokeStyle = '#00f3ff';
  gCtx.lineWidth = 2;
  gCtx.setLineDash([16, 14]);
  gCtx.beginPath();
  gCtx.moveTo(128, 0);
  gCtx.lineTo(128, 512);
  gCtx.moveTo(0, 384);
  gCtx.lineTo(512, 384);
  gCtx.stroke();

  gCtx.strokeStyle = '#ff007f';
  gCtx.beginPath();
  gCtx.moveTo(384, 0);
  gCtx.lineTo(384, 512);
  gCtx.moveTo(0, 128);
  gCtx.lineTo(512, 128);
  gCtx.stroke();

  const groundTex = new THREE.CanvasTexture(groundCvs);
  groundTex.wrapS = THREE.RepeatWrapping;
  groundTex.wrapT = THREE.RepeatWrapping;
  groundTex.repeat.set(16, 16);
  groundTex.colorSpace = THREE.SRGBColorSpace;

  const groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(460, 460),
    new THREE.MeshStandardMaterial({
      map: groundTex,
      color: 0x111827,
      metalness: 0.75,
      roughness: 0.3
    })
  );
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.position.y = -0.05;
  cityGroup.add(groundPlane);

  // B. PARVIS MONUMENTAL AUTOUR DE LA TOUR ESGI
  const plazaSize = 44;
  const plaza = new THREE.Mesh(
    new THREE.BoxGeometry(plazaSize, 0.3, plazaSize),
    new THREE.MeshStandardMaterial({ color: 0x0d1424, metalness: 0.8, roughness: 0.25 })
  );
  plaza.position.y = 0.05;
  cityGroup.add(plaza);

  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 2.4, 3.0), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 0.1, 1.5), toneMapped: false });

  // Bordures lumineuses du parvis + 4 pylônes d'angle avec faisceaux verticaux
  const halfP = plazaSize / 2;
  [
    [0, 0.22, halfP, plazaSize, 0.1, 0.2],
    [0, 0.22, -halfP, plazaSize, 0.1, 0.2],
    [halfP, 0.22, 0, 0.2, 0.1, plazaSize],
    [-halfP, 0.22, 0, 0.2, 0.1, plazaSize]
  ].forEach(([bx, by, bz, bw, bh, bd]) => {
    const border = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), cyanHdr);
    border.position.set(bx, by, bz);
    cityGroup.add(border);
  });

  [
    [halfP, halfP],
    [-halfP, halfP],
    [halfP, -halfP],
    [-halfP, -halfP]
  ].forEach(([cx, cz]) => {
    const pylon = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 4.5, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 })
    );
    pylon.position.set(cx, 2.25, cz);
    cityGroup.add(pylon);

    const lightBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.45, 55, 12, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.07,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    lightBeam.position.set(cx, 29, cz);
    cityGroup.add(lightBeam);
  });

  // C. 36 GRATTE-CIELS CYBERPUNK DÉTAILLÉS (AVEC FENÊTRES ÉMISSIVES & COURONNES NÉONS)
  const winCvs = document.createElement('canvas');
  winCvs.width = 256;
  winCvs.height = 512;
  const wCtx = winCvs.getContext('2d');
  wCtx.fillStyle = '#060a14';
  wCtx.fillRect(0, 0, 256, 512);

  for (let y = 10; y < 500; y += 14) {
    const rowLit = Math.random() > 0.25;
    for (let x = 10; x < 246; x += 16) {
      if (rowLit && Math.random() > 0.35) {
        const rnd = Math.random();
        wCtx.fillStyle = rnd > 0.88 ? '#00f3ff' : rnd > 0.80 ? '#ff007f' : '#38bdf8';
        wCtx.fillRect(x, y, 10, 6);
      } else {
        wCtx.fillStyle = '#0f172a';
        wCtx.fillRect(x, y, 10, 6);
      }
    }
  }
  const winTex = new THREE.CanvasTexture(winCvs);
  winTex.wrapS = THREE.RepeatWrapping;
  winTex.wrapT = THREE.RepeatWrapping;
  winTex.repeat.set(2, 4);
  winTex.colorSpace = THREE.SRGBColorSpace;

  const towerBodyMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    map: winTex,
    emissiveMap: winTex,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.85,
    metalness: 0.6,
    roughness: 0.35
  });

  const beaconMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(3.0, 0.1, 0.35),
    toneMapped: false
  });

  const towerPositions = [];
  for (let i = 0; i < 36; i++) {
    const ring = i < 14 ? 0 : 1; // 2 couronnes de buildings
    const countInRing = ring === 0 ? 14 : 22;
    const idxInRing = ring === 0 ? i : i - 14;
    const angle = (idxInRing / countInRing) * Math.PI * 2 + ring * 0.2;
    const dist = ring === 0 ? 56 + Math.random() * 18 : 92 + Math.random() * 45;

    const h = ring === 0 ? 34 + Math.random() * 42 : 48 + Math.random() * 65;
    const w = 9 + Math.random() * 8;
    const d = 9 + Math.random() * 8;

    const tx = Math.cos(angle) * dist;
    const tz = Math.sin(angle) * dist;

    // Corps principal
    const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), towerBodyMat);
    mainBlock.position.set(tx, h / 2, tz);
    cityGroup.add(mainBlock);

    // Couronne néon au sommet du corps principal
    const crownMat = i % 3 === 0 ? pinkHdr : cyanHdr;
    const crown = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.35, d + 0.3), crownMat);
    crown.position.set(tx, h - 1.2, tz);
    cityGroup.add(crown);

    // Étage supérieur en retrait (silhouette architecturale)
    const upperH = 6 + Math.random() * 10;
    const upperBlock = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.62, upperH, d * 0.62),
      towerBodyMat
    );
    upperBlock.position.set(tx, h + upperH / 2, tz);
    cityGroup.add(upperBlock);

    // Antenne + balise anti-collision
    const spireH = 4 + Math.random() * 7;
    const spire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.15, spireH, 6),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 })
    );
    spire.position.set(tx, h + upperH + spireH / 2, tz);
    cityGroup.add(spire);

    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), beaconMat);
    beacon.position.set(tx, h + upperH + spireH, tz);
    cityGroup.add(beacon);

    if (ring === 0) {
      towerPositions.push({ x: tx, z: tz, h });
    }
  }

  // Passerelles aériennes lumineuses entre quelques tours proches
  for (let i = 0; i < towerPositions.length - 1; i += 2) {
    const a = towerPositions[i];
    const b = towerPositions[i + 1];
    const bridgeY = Math.min(a.h, b.h) * 0.65;
    const start = new THREE.Vector3(a.x, bridgeY, a.z);
    const end = new THREE.Vector3(b.x, bridgeY, b.z);
    const length = start.distanceTo(end);

    if (length < 42) {
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 1.2, length),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 })
      );
      bridge.position.copy(start).lerp(end, 0.5);
      bridge.lookAt(end);
      cityGroup.add(bridge);

      const bridgeNeon = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, length), cyanHdr);
      bridgeNeon.position.copy(bridge.position);
      bridgeNeon.position.y -= 0.6;
      bridgeNeon.lookAt(end);
      cityGroup.add(bridgeNeon);
    }
  }

  // D. TRAFIC AÉRIEN & PARTICULES
  const drones = [];
  for (let i = 0; i < 40; i++) {
    const isCyan = i % 2 === 0;
    const drone = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.12, 2.0),
      isCyan ? cyanHdr : pinkHdr
    );
    const orbitR = 26 + Math.random() * 44;
    const orbitY = 4 + Math.random() * 82;
    const speed = (0.12 + Math.random() * 0.22) * (isCyan ? 1 : -1);
    const phase = Math.random() * Math.PI * 2;
    cityGroup.add(drone);
    drones.push({ mesh: drone, orbitR, orbitY, speed, phase });
  }

  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 150;
    positions[i * 3 + 1] = -46 + Math.random() * 150;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.22, transparent: true, opacity: 0.55 })
  );
  cityGroup.add(particles);

  scene.add(cityGroup);
  return { drones, particles };
}

// ==========================================
// 3. GÉNÉRATEUR DE PANNEAUX HOLOGRAPHIQUES 3D
// ==========================================
function createNeonPanel(tag, title, lines, accentColor = '#00f3ff', width = 9.0, height = 4.5, withMountArms = true) {
  const group = new THREE.Group();

  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = 'rgba(4, 10, 22, 0.94)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < cvs.width; gx += 32) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, cvs.height);
    ctx.stroke();
  }
  for (let gy = 0; gy < cvs.height; gy += 32) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(cvs.width, gy);
    ctx.stroke();
  }

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, cvs.width - 28, cvs.height - 28);

  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.textAlign = 'right';
  ctx.fillText(tag, cvs.width - 44, 58);

  ctx.textAlign = 'left';
  ctx.font = 'bold 48px "Segoe UI", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title.toUpperCase(), 52, 112);

  ctx.fillStyle = accentColor;
  ctx.fillRect(52, 134, 180, 4);

  ctx.font = '32px "Segoe UI", sans-serif';
  ctx.fillStyle = '#eef8ff';
  lines.forEach((line, i) => {
    ctx.fillText(`▸ ${line}`, 54, 202 + i * 64);
  });

  const texture = new THREE.CanvasTexture(cvs);
  texture.colorSpace = THREE.SRGBColorSpace;

  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  );
  group.add(screenMesh);

  const hexColor = new THREE.Color(accentColor);
  const hdrNeonMat = new THREE.MeshBasicMaterial({
    color: hexColor.clone().multiplyScalar(2.4),
    toneMapped: false
  });
  const barGeo = new THREE.BoxGeometry(width + 0.3, 0.1, 0.16);
  const topBar = new THREE.Mesh(barGeo, hdrNeonMat);
  topBar.position.y = height / 2 + 0.06;
  const botBar = new THREE.Mesh(barGeo, hdrNeonMat);
  botBar.position.y = -height / 2 - 0.06;
  group.add(topBar, botBar);

  // Bras métalliques d'ancrage vers la façade (vers -Z local après rotation)
  if (withMountArms) {
    const armMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.25 });
    [-width * 0.35, width * 0.35].forEach((ax) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), armMat);
      arm.rotation.x = Math.PI / 2;
      arm.position.set(ax, 0, -1.6);
      group.add(arm);
    });
  }

  return group;
}

// ==========================================
// 4. ACTE 1 : PLATEFORME DE LÉVITATION (SOMMET)
// ==========================================
function buildSkyPlatform(topY) {
  const group = new THREE.Group();
  group.position.set(0, topY + 6.5, 0);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(6.8, 4.4, 1.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x131a29, metalness: 0.9, roughness: 0.25 })
  );
  group.add(base);

  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 2.5, 3.0), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 0.1, 1.5), toneMapped: false });

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(7.1, 0.08, 16, 64), cyanHdr);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.06, 16, 64), pinkHdr);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -1.1;
  group.add(ring2);

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 1.8, 45, 16, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  beam.position.y = 22;
  group.add(beam);

  const signCvs = document.createElement('canvas');
  signCvs.width = 1024;
  signCvs.height = 256;
  const ctx = signCvs.getContext('2d');
  ctx.clearRect(0, 0, 1024, 256);
  ctx.font = '900 138px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00f3ff';
  ctx.shadowColor = 'rgba(0, 243, 255, 0.7)';
  ctx.shadowBlur = 16;
  ctx.fillText('ESGI BOT', 512, 175);

  const signTex = new THREE.CanvasTexture(signCvs);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(13.5, 3.4),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
  );
  signMesh.position.y = 3.1;
  group.add(signMesh);

  scene.add(group);
  return { group, ring1, ring2 };
}

// ==========================================
// 5. ACTES 3 & 4 : CAVERNE SOUTERRAINE & PILIERS EN TRIANGLE
// ==========================================
function buildUndergroundMasterclass() {
  const underGroup = new THREE.Group();
  const floorY = -44;
  const ceilY = -16; // Plafond de fondation juste sous le gratte-ciel

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x0b101d,
    metalness: 0.55,
    roughness: 0.65
  });
  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x161f30,
    metalness: 0.85,
    roughness: 0.28
  });
  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 2.5, 3.0), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 0.1, 1.5), toneMapped: false });

  // 1. SOL, MURS LATERAUX ET DALLE DE FONDATION SUPÉRIEURE (VRAI ESPACE CLOS)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(90, 110), concreteMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, floorY, -4);
  underGroup.add(floor);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(90, 110), concreteMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, ceilY, -4);
  underGroup.add(ceiling);

  // Mur du fond & parois latérales de la chambre souterraine
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(90, 32, 2), concreteMat);
  backWall.position.set(0, floorY + 15, -34);
  underGroup.add(backWall);

  [-28, 28].forEach((wx) => {
    const sideWall = new THREE.Mesh(new THREE.BoxGeometry(2, 32, 110), concreteMat);
    sideWall.position.set(wx, floorY + 15, -4);
    underGroup.add(sideWall);
  });

  // 2. ARCHES STRUCTURELLES EN ACIER & CONDUITS SOUTERRAINS (STYLE ÉGOUT MÉGASTRUCTURE)
  for (let zArch = -28; zArch <= 26; zArch += 9) {
    const arch = new THREE.Mesh(
      new THREE.TorusGeometry(26, 0.75, 10, 32, Math.PI),
      darkSteelMat
    );
    arch.position.set(0, floorY + 2, zArch);
    underGroup.add(arch);

    // Bande néon encastrée sous chaque arche
    const archNeon = new THREE.Mesh(
      new THREE.TorusGeometry(25.1, 0.07, 8, 32, Math.PI),
      zArch % 18 === 0 ? pinkHdr : cyanHdr
    );
    archNeon.position.set(0, floorY + 2, zArch);
    underGroup.add(archNeon);
  }

  // Tuyaux industriels massifs le long des parois + passerelles de maintenance
  [-23, 23].forEach((px) => {
    // Passerelle métallique supérieure
    const catwalk = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.4, 90), darkSteelMat);
    catwalk.position.set(px, floorY + 11, -4);
    underGroup.add(catwalk);

    // 3 gros collecteurs d'eau/énergie superposés
    [3.5, 6.5, 15.0].forEach((py, pIdx) => {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 90, 16), darkSteelMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(px + (px > 0 ? 1.5 : -1.5), floorY + py, -4);
      underGroup.add(pipe);

      // Bague lumineuse tous les 14 mètres
      for (let rz = -26; rz <= 22; rz += 14) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.95, 0.06, 8, 24),
          pIdx === 1 ? pinkHdr : cyanHdr
        );
        ring.position.set(pipe.position.x, pipe.position.y, rz);
        underGroup.add(ring);
      }
    });
  });

  // 3. CANAL CENTRAL D'EAU REFLECHISSANTE & FLUX D'ÉNERGIE ANIMÉ
  const canalWater = new THREE.Mesh(
    new THREE.PlaneGeometry(8.5, 95),
    new THREE.MeshStandardMaterial({
      color: 0x041322,
      emissive: 0x003344,
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.08
    })
  );
  canalWater.rotation.x = -Math.PI / 2;
  canalWater.position.set(0, floorY + 0.06, -4);
  underGroup.add(canalWater);

  // Bordures métalliques du canal
  [-4.4, 4.4].forEach((cx) => {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 95), darkSteelMat);
    curb.position.set(cx, floorY + 0.22, -4);
    underGroup.add(curb);

    const curbNeon = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 95), cyanHdr);
    curbNeon.position.set(cx > 0 ? cx - 0.22 : cx + 0.22, floorY + 0.46, -4);
    underGroup.add(curbNeon);
  });

  // Onde lumineuse qui circule dans le canal (animée dans animate())
  const waterPulse = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 18),
    new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide
    })
  );
  waterPulse.rotation.x = -Math.PI / 2;
  waterPulse.position.set(0, floorY + 0.09, -15);
  underGroup.add(waterPulse);

  // 4. SOCLE D'ANCRAGE DE LA TOUR AU PLAFOND (RELIE LE GRATTE-CIEL AUX PILIERS)
  const megastructureCap = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 22, 3.2, 6),
    darkSteelMat
  );
  megastructureCap.position.set(0, ceilY - 1.4, -3);
  underGroup.add(megastructureCap);

  const capRing = new THREE.Mesh(new THREE.TorusGeometry(20, 0.12, 12, 6), cyanHdr);
  capRing.rotation.x = Math.PI / 2;
  capRing.position.set(0, ceilY - 3.0, -3);
  underGroup.add(capRing);

  // Éclairages souterrains dramatiques
  const mainUnderLight = new THREE.PointLight(0x38bdf8, 35, 70);
  mainUnderLight.position.set(0, floorY + 16, 12);
  underGroup.add(mainUnderLight);

  const rearUnderLight = new THREE.PointLight(0xff007f, 28, 65);
  rearUnderLight.position.set(0, floorY + 14, -18);
  underGroup.add(rearUnderLight);

  // ==========================================
  // 5. DISPOSITION EN TRIANGLE DES 5 PILIERS FONDATEURS
  // ==========================================
  // Parcours en arc autour du triangle : Pointe avant -> Flanc gauche -> Arrière gauche -> Arrière droit -> Flanc droit
  const pillarsData = [
    {
      id: 0,
      label: 'pillar-0',
      name: 'BRYAN (JMG)',
      role: 'Architecture & Core Dev',
      tag: 'APEX // PILIER 01',
      color: '#00f3ff',
      pos: new THREE.Vector3(0, floorY, 6.5),        // Pointe avant du triangle
      camPos: new THREE.Vector3(0, floorY + 5.2, 16.5)
    },
    {
      id: 1,
      label: 'pillar-1',
      name: 'COLLABORATEUR 2',
      role: 'Systèmes & Base de données',
      tag: 'FLANC G // PILIER 02',
      color: '#ff007f',
      pos: new THREE.Vector3(-8.0, floorY, -2.5),    // Milieu gauche du triangle
      camPos: new THREE.Vector3(-14.2, floorY + 5.2, 6.5)
    },
    {
      id: 2,
      label: 'pillar-2',
      name: 'COLLABORATEUR 3',
      role: 'Modules & Commandes',
      tag: 'BASE G // PILIER 03',
      color: '#00f3ff',
      pos: new THREE.Vector3(-15.0, floorY, -12.0),  // Angle arrière gauche du triangle
      camPos: new THREE.Vector3(-19.5, floorY + 5.2, -1.5)
    },
    {
      id: 3,
      label: 'pillar-3',
      name: 'PROMO ESGI REIMS',
      role: 'Tests, Idées & Communauté',
      tag: 'BASE D // PILIER 04',
      color: '#ff007f',
      pos: new THREE.Vector3(15.0, floorY, -12.0),   // Angle arrière droit du triangle
      camPos: new THREE.Vector3(19.5, floorY + 5.2, -1.5)
    },
    {
      id: 4,
      label: 'pillar-4',
      name: 'GEMINI AI',
      role: 'Co-Pilote WebGL & Shaders',
      tag: 'FLANC D // PILIER 05',
      color: '#00f3ff',
      pos: new THREE.Vector3(8.0, floorY, -2.5),     // Milieu droit du triangle
      camPos: new THREE.Vector3(14.2, floorY + 5.2, 6.5)
    }
  ];

  // Lignes néons au sol reliant les sommets du triangle
  const triPoints = [
    new THREE.Vector3(0, floorY + 0.12, 6.5),
    new THREE.Vector3(-15.0, floorY + 0.12, -12.0),
    new THREE.Vector3(15.0, floorY + 0.12, -12.0),
    new THREE.Vector3(0, floorY + 0.12, 6.5)
  ];
  const triGeo = new THREE.BufferGeometry().setFromPoints(triPoints);
  const triLine = new THREE.Line(
    triGeo,
    new THREE.LineBasicMaterial({ color: 0x00f3ff })
  );
  underGroup.add(triLine);

  const interactivePillarObjects = [];
  const pillarAnimItems = [];

  pillarsData.forEach((p) => {
    const pGroup = new THREE.Group();
    pGroup.position.copy(p.pos);

    const isCyan = p.color === '#00f3ff';
    const ringMat = isCyan ? cyanHdr : pinkHdr;

    // Socle octogonal massif au sol
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.5, 1.8, 8), darkSteelMat);
    pedestal.position.y = 0.9;
    pGroup.add(pedestal);

    // Colonne structurelle montant jusqu'au plafond de fondation (hauteur = 28)
    const column = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.55, 28, 8), darkSteelMat);
    column.position.y = 14;
    pGroup.add(column);

    // 4 vérins hydrauliques autour de la colonne
    for (let k = 0; k < 4; k++) {
      const ka = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const piston = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.24, 27, 8),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 })
      );
      piston.position.set(Math.cos(ka) * 1.65, 13.5, Math.sin(ka) * 1.65);
      pGroup.add(piston);
    }

    // Anneaux énergétiques rotatifs autour du pilier
    const ringLower = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.07, 12, 32), ringMat);
    ringLower.rotation.x = Math.PI / 2;
    ringLower.position.y = 2.4;
    pGroup.add(ringLower);

    const ringUpper = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.07, 12, 32), ringMat);
    ringUpper.rotation.x = Math.PI / 2;
    ringUpper.position.y = 8.2;
    pGroup.add(ringUpper);

    // Plaque holographique fixée sur le pilier, orientée vers sa caméra dédiée
    const plaque = createNeonPanel(
      p.tag,
      p.name,
      [p.role, 'Cliquer ou scroller pour explorer'],
      p.color,
      5.4,
      2.7,
      false
    );
    plaque.position.set(0, 5.2, 0);

    // Calcul de la direction vers la caméra de ce pilier pour décaler et orienter la plaque devant lui
    const toCam = new THREE.Vector3().subVectors(p.camPos, new THREE.Vector3(p.pos.x, p.pos.y + 5.2, p.pos.z)).normalize();
    plaque.position.addScaledVector(toCam, 1.85);
    plaque.lookAt(p.camPos);
    pGroup.add(plaque);

    // Zone cliquable invisible englobant tout le pilier + plaque
    const hitBox = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 14, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.y = 7;
    hitBox.userData = { label: p.label, ringLower, ringUpper };
    pGroup.add(hitBox);
    interactivePillarObjects.push(hitBox);

    // Ajout des éléments de la plaque aussi dans le raycast
    plaque.traverse((child) => {
      if (child.isMesh) {
        child.userData = { label: p.label, ringLower, ringUpper };
        interactivePillarObjects.push(child);
      }
    });

    pillarAnimItems.push({ ringLower, ringUpper, offset: p.id * 1.3 });
    underGroup.add(pGroup);
  });

  scene.add(underGroup);
  return { floorY, pillarsData, interactivePillarObjects, pillarAnimItems, waterPulse };
}

// ==========================================
// HELPER : RAYON EXACT DE LA FAÇADE À UNE HAUTEUR Y
// ==========================================
function getFacadeRadiusAtY(tower, y, fallbackRadius) {
  tower.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster();
  const directions = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0, 0, 1)
  ];

  let maxR = 0;
  directions.forEach((dir) => {
    const origin = dir.clone().multiplyScalar(-100).setY(y);
    raycaster.set(origin, dir);
    const hits = raycaster.intersectObject(tower, true);
    if (hits.length > 0) {
      const r = 100 - hits[0].distance;
      if (r > maxR) maxR = r;
    }
  });

  return maxR > 1 ? maxR : fallbackRadius;
}

// ==========================================
// 6. CHARGEMENT DU GRATTE-CIEL & TIMELINE COMPLETE
// ==========================================
const loader = new GLTFLoader();
let skyPlatform = null;
const panelMeshes = [];
const cyberCity = buildCyberpunkMetropolis();
const underground = buildUndergroundMasterclass();

loader.load('/skyscraper.glb', (gltf) => {
  const tower = gltf.scene;

  const box = new THREE.Box3().setFromObject(tower);
  const size = box.getSize(new THREE.Vector3());

  const targetHeight = 80;
  const scaleFactor = targetHeight / size.y;
  tower.scale.setScalar(scaleFactor);

  const scaledBox = new THREE.Box3().setFromObject(tower);
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
  tower.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

  const maxHalfWidth = Math.max(
    scaledBox.max.x - scaledBox.min.x,
    scaledBox.max.z - scaledBox.min.z
  ) / 2;

  tower.traverse((child) => {
    if (child.isMesh && child.material) {
      if (child.material.color) {
        child.material.color.multiplyScalar(0.32);
      }
      child.material.emissiveIntensity = 0;
      child.material.envMapIntensity = 0.35;
      child.material.roughness = Math.max(child.material.roughness ?? 0.5, 0.45);
      child.material.needsUpdate = true;
    }
  });

  scene.add(tower);
  skyPlatform = buildSkyPlatform(targetHeight);

  // 4 panneaux alignés sur les 4 faces cardinales du gratte-ciel (centrage parfait)
  const panelsData = [
    {
      y: 64,
      angle: Math.PI * 0.5, // Face droite (+X)
      color: '#00f3ff',
      tag: 'SYS.01 // FEATURES',
      title: 'Fonctionnalités Clés',
      zoneName: 'NIVEAU 01 — FONCTIONNALITÉS',
      lines: [
        'Rappels automatiques devoirs & examens',
        'Gestion dynamique des rôles par classe',
        'Boutique virtuelle & économie serveur'
      ]
    },
    {
      y: 46,
      angle: Math.PI * 1.0, // Face arrière (-Z)
      color: '#ff007f',
      tag: 'SYS.02 // INTERFACE',
      title: 'Expérience Étudiante',
      zoneName: 'NIVEAU 02 — EXPÉRIENCE',
      lines: [
        'Modales interactives Discord',
        'Notifications ciblées par filière',
        'Commandes slash ultra-rapides'
      ]
    },
    {
      y: 28,
      angle: Math.PI * 1.5, // Face gauche (-X)
      color: '#00f3ff',
      tag: 'SYS.03 // ARCHITECTURE',
      title: 'Architecture & Code',
      zoneName: 'NIVEAU 03 — STACK TECHNIQUE',
      lines: [
        'Développé en Python & portage Rust',
        'Base de données SQLite optimisée',
        'Hébergement autonome 24/7 sur Raspberry Pi'
      ]
    },
    {
      y: 12,
      angle: Math.PI * 2.0, // Face avant (+Z)
      color: '#a855f7',
      tag: 'SYS.04 // DEPLOYMENT',
      title: 'Open-Source ESGI',
      zoneName: 'NIVEAU 04 — OPEN-SOURCE',
      lines: [
        'Code modulaire & maintenable',
        'Déploiement continu via systemd',
        'Conçu par et pour les étudiants ESGI'
      ]
    }
  ];

  panelsData.forEach((p) => {
    const surfaceR = getFacadeRadiusAtY(tower, p.y, maxHalfWidth * 0.65);
    p.panelRadius = surfaceR + 2.6;
    p.camRadius = p.panelRadius + 13.5;

    const panel = createNeonPanel(p.tag, p.title, p.lines, p.color, 9.0, 4.5, true);
    panel.position.set(
      Math.sin(p.angle) * p.panelRadius,
      p.y,
      Math.cos(p.angle) * p.panelRadius
    );
    panel.lookAt(0, p.y, 0);
    panel.rotateY(Math.PI);

    scene.add(panel);
    panelMeshes.push(panel);
  });

  // ==========================================
  // 7. CHORÉGRAPHIE HYBRIDE (TOUR ORBITALE + TRIANGLE SOUTERRAIN)
  // ==========================================
  const lastPanel = panelsData[panelsData.length - 1];
  const lastPanelCamX = Math.sin(lastPanel.angle) * lastPanel.camRadius;
  const lastPanelCamZ = Math.cos(lastPanel.angle) * lastPanel.camRadius;

  // mode = 0 : caméra en orbite cylindrique autour de la tour
  // mode = 1 : caméra libre 3D dans la chambre souterraine
  const camState = {
    mode: 0,
    angle: 0,
    radius: 30,
    camY: targetHeight + 8.5,
    targetY: targetHeight + 4.5,
    ux: lastPanelCamX,
    uy: lastPanel.y,
    uz: lastPanelCamZ,
    utx: 0,
    uty: lastPanel.y,
    utz: 0
  };

  const pillarButtons = document.querySelectorAll('.pillar-btn');

  function updateActivePillarButton(activeLabel) {
    pillarButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.label === activeLabel);
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.45,
      snap: {
        snapTo: 'labelsDirectional',
        duration: { min: 0.35, max: 0.8 },
        delay: 0.1,
        ease: 'power2.inOut'
      },
      onUpdate: (self) => {
        const hud = document.getElementById('hud');
        const hudAlt = document.getElementById('hud-alt');
        const hudZone = document.getElementById('hud-zone');
        const hudFill = document.getElementById('hud-fill');
        const hint = document.getElementById('scroll-hint');
        const pillarNav = document.getElementById('pillar-nav');

        if (hint) hint.style.opacity = self.progress > 0.02 ? '0' : '1';
        if (hudFill) hudFill.style.width = `${Math.round(self.progress * 100)}%`;

        const currentY = THREE.MathUtils.lerp(camState.camY, camState.uy, camState.mode);
        const meters = Math.round(currentY * 5);
        if (hudAlt) hudAlt.textContent = `ALT ${meters}M`;

        // Affichage HUD vs Barre interactive des piliers
        const isUnderground = camState.mode > 0.65;
        if (hud) hud.classList.toggle('hidden', currentY < 4);
        if (pillarNav) pillarNav.classList.toggle('visible', isUnderground);

        if (hudZone && !isUnderground) {
          if (currentY > 72) hudZone.textContent = 'PLATEFORME ORBITALE';
          else if (currentY > 54) hudZone.textContent = panelsData[0].zoneName;
          else if (currentY > 36) hudZone.textContent = panelsData[1].zoneName;
          else if (currentY > 19) hudZone.textContent = panelsData[2].zoneName;
          else hudZone.textContent = panelsData[3].zoneName;
        }

        // Met en surbrillance le bouton du pilier le plus proche de la timeline
        if (isUnderground) {
          const currentTime = tl.time();
          let closestLabel = 'underground-overview';
          let minDiff = Infinity;
          ['underground-overview', 'pillar-0', 'pillar-1', 'pillar-2', 'pillar-3', 'pillar-4'].forEach((lbl) => {
            const diff = Math.abs(tl.labels[lbl] - currentTime);
            if (diff < minDiff) {
              minDiff = diff;
              closestLabel = lbl;
            }
          });
          updateActivePillarButton(closestLabel);
        }
      }
    }
  });

  tl.addLabel('top');

  // Descente avec palier symétrique autour de chaque panneau (centrage garanti)
  panelsData.forEach((p, idx) => {
    tl.to(camState, {
      angle: p.angle,
      radius: p.camRadius,
      camY: p.y,
      targetY: p.y,
      duration: 1.8,
      ease: 'power1.inOut'
    })
    // Début du palier de stabilisation
    .to(camState, {
      angle: p.angle,
      camY: p.y,
      targetY: p.y,
      duration: 0.45,
      ease: 'none'
    })
    .addLabel(`panel-${idx}`)
    // Fin du palier de stabilisation
    .to(camState, {
      angle: p.angle,
      camY: p.y,
      targetY: p.y,
      duration: 0.45,
      ease: 'none'
    });
  });

  // Plongée dans le sous-terrain : vue globale sur la formation en triangle des 5 piliers
  const overviewCam = new THREE.Vector3(0, underground.floorY + 11.5, 25.5);
  const overviewTarget = new THREE.Vector3(0, underground.floorY + 5.0, -3.5);

  tl.to(camState, {
    mode: 1,
    ux: overviewCam.x,
    uy: overviewCam.y,
    uz: overviewCam.z,
    utx: overviewTarget.x,
    uty: overviewTarget.y,
    utz: overviewTarget.z,
    duration: 2.6,
    ease: 'power2.inOut'
  })
  .to(camState, { duration: 0.4 })
  .addLabel('underground-overview')
  .to(camState, { duration: 0.4 });

  // Tour panoramique autour des 5 piliers du triangle
  underground.pillarsData.forEach((p) => {
    tl.to(camState, {
      ux: p.camPos.x,
      uy: p.camPos.y,
      uz: p.camPos.z,
      utx: p.pos.x,
      uty: p.pos.y + 5.2,
      utz: p.pos.z,
      duration: 1.7,
      ease: 'power2.inOut'
    })
    .to(camState, { duration: 0.35 })
    .addLabel(p.label)
    .to(camState, { duration: 0.35 });
  });

  // ==========================================
  // 8. NAVIGATION INTERACTIVE AU CLIC (3D + BOUTONS)
  // ==========================================
  function navigateToLabel(labelName) {
    const st = tl.scrollTrigger;
    if (!st || tl.labels[labelName] === undefined) return;
    const progress = tl.labels[labelName] / tl.duration();
    const targetScroll = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  pillarButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      navigateToLabel(btn.dataset.label);
    });
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerDownPos = { x: 0, y: 0 };

  window.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (camState.mode < 0.65) {
      document.body.style.cursor = 'default';
      return;
    }
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(underground.interactivePillarObjects, false);
    document.body.style.cursor = hits.length > 0 ? 'pointer' : 'default';
  });

  window.addEventListener('pointerup', (e) => {
    const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (moveDist > 6 || camState.mode < 0.65) return;

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(underground.interactivePillarObjects, false);

    if (hits.length > 0 && hits[0].object.userData.label) {
      navigateToLabel(hits[0].object.userData.label);
    }
  });

  // ==========================================
  // 9. BOUCLE DE RENDU
  // ==========================================
  const clock = new THREE.Clock();
  const orbitalCamVec = new THREE.Vector3();
  const orbitalTargetVec = new THREE.Vector3();
  const underCamVec = new THREE.Vector3();
  const underTargetVec = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (skyPlatform) {
      skyPlatform.group.position.y = targetHeight + 6.5 + Math.sin(elapsed * 2) * 0.3;
      skyPlatform.ring1.rotation.z = elapsed * 0.45;
      skyPlatform.ring2.rotation.z = -elapsed * 0.7;
    }

    // Trafic aérien & particules
    cyberCity.drones.forEach((d) => {
      const a = d.phase + elapsed * d.speed;
      d.mesh.position.set(Math.cos(a) * d.orbitR, d.orbitY, Math.sin(a) * d.orbitR);
      d.mesh.rotation.y = -a;
    });
    cyberCity.particles.rotation.y = elapsed * 0.015;

    // Animation des piliers et du courant d'eau souterrain
    underground.pillarAnimItems.forEach((item) => {
      item.ringLower.position.y = 2.4 + Math.sin(elapsed * 2.2 + item.offset) * 0.35;
      item.ringUpper.position.y = 8.2 - Math.sin(elapsed * 2.2 + item.offset) * 0.35;
    });
    underground.waterPulse.position.z = -35 + ((elapsed * 14) % 70);

    // Interpolation fluide entre la caméra orbitale (tour) et la caméra 3D (sous-terrain)
    orbitalCamVec.set(
      Math.sin(camState.angle) * camState.radius,
      camState.camY,
      Math.cos(camState.angle) * camState.radius
    );
    orbitalTargetVec.set(0, camState.targetY, 0);

    underCamVec.set(camState.ux, camState.uy, camState.uz);
    underTargetVec.set(camState.utx, camState.uty, camState.utz);

    camera.position.lerpVectors(orbitalCamVec, underCamVec, camState.mode);
    const finalTarget = orbitalTargetVec.lerp(underTargetVec, camState.mode);
    camera.lookAt(finalTarget);

    // Zoom tactile sur les panneaux de la tour
    panelMeshes.forEach((mesh) => {
      const dist = camera.position.distanceTo(mesh.position);
      const targetScale = dist < 15.5 ? 1.05 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.12);
    });

    composer.render();
  }
  animate();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});