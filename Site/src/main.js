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
scene.fog = new THREE.FogExp2(0x03060e, 0.0085);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;

// Environnement subtil pour les reflets métalliques
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// RenderTarget HDR + OutputPass : empêche la tour de saturer en blanc
const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  type: THREE.HalfFloatType,
  samples: 4
});
const composer = new EffectComposer(renderer, renderTarget);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.30, // Halo néon fin et maîtrisé
  0.25, // Rayon court
  1.25  // Seuil HDR : seuls les matériaux émissifs (> 1.25) brillent
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

// Éclairage architectural cyberpunk
const hemiLight = new THREE.HemisphereLight(0x6ea8ff, 0x090d1a, 0.65);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xdbeafe, 0.95);
dirLight.position.set(35, 95, 45);
scene.add(dirLight);

const rimLight = new THREE.DirectionalLight(0xff007f, 0.35);
rimLight.position.set(-45, 35, -40);
scene.add(rimLight);

// ==========================================
// 2. DÉCORS CYBERPUNK (SKYLINE, DRONES, PARTICULES)
// ==========================================
function buildCyberpunkEnvironment() {
  const envGroup = new THREE.Group();

  // Texture procédurale de fenêtres pour les tours voisines
  const winCvs = document.createElement('canvas');
  winCvs.width = 128;
  winCvs.height = 256;
  const wCtx = winCvs.getContext('2d');
  wCtx.fillStyle = '#070b14';
  wCtx.fillRect(0, 0, 128, 256);
  for (let y = 8; y < 250; y += 16) {
    for (let x = 8; x < 120; x += 16) {
      if (Math.random() > 0.45) {
        wCtx.fillStyle = Math.random() > 0.85 ? '#00f3ff' : '#1e3a5f';
        wCtx.fillRect(x, y, 8, 8);
      }
    }
  }
  const winTex = new THREE.CanvasTexture(winCvs);
  winTex.wrapS = THREE.RepeatWrapping;
  winTex.wrapT = THREE.RepeatWrapping;
  winTex.repeat.set(2, 6);
  winTex.colorSpace = THREE.SRGBColorSpace;

  const bgTowerMat = new THREE.MeshStandardMaterial({
    color: 0x0c1322,
    map: winTex,
    roughness: 0.6,
    metalness: 0.4
  });

  const beaconMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(3.0, 0.1, 0.4), // Rouge HDR qui déclenche un léger bloom
    toneMapped: false
  });

  // 28 tours voisines disposées en cercle éloigné
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
    const dist = 68 + Math.random() * 75;
    const h = 35 + Math.random() * 75;
    const w = 8 + Math.random() * 10;

    const bMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), bgTowerMat);
    bMesh.position.set(Math.cos(angle) * dist, h / 2 - 15, Math.sin(angle) * dist);
    envGroup.add(bMesh);

    // Balise lumineuse au sommet
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), beaconMat);
    beacon.position.set(bMesh.position.x, h - 14.5, bMesh.position.z);
    envGroup.add(beacon);
  }

  // Trafic aérien futuriste (véhicules/drones en orbite)
  const drones = [];
  const cyanDroneMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.1, 2.8, 3.2),
    toneMapped: false
  });
  const pinkDroneMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(3.2, 0.1, 1.8),
    toneMapped: false
  });

  for (let i = 0; i < 36; i++) {
    const isCyan = i % 2 === 0;
    const drone = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.12, 1.8),
      isCyan ? cyanDroneMat : pinkDroneMat
    );
    const orbitR = 24 + Math.random() * 38;
    const orbitY = 2 + Math.random() * 82;
    const speed = (0.12 + Math.random() * 0.22) * (isCyan ? 1 : -1);
    const phase = Math.random() * Math.PI * 2;

    envGroup.add(drone);
    drones.push({ mesh: drone, orbitR, orbitY, speed, phase });
  }

  // Particules atmosphériques (flux de données en suspension)
  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 140;
    positions[i * 3 + 1] = -40 + Math.random() * 145;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 140;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.22,
    transparent: true,
    opacity: 0.55
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  envGroup.add(particles);

  scene.add(envGroup);
  return { drones, particles };
}

// ==========================================
// 3. GÉNÉRATEUR DE PANNEAUX HOLOGRAPHIQUES 3D
// ==========================================
function createNeonPanel(tag, title, lines, accentColor = '#00f3ff', width = 9.2, height = 4.6) {
  const group = new THREE.Group();

  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  // Fond sombre haute lisibilité
  ctx.fillStyle = 'rgba(4, 10, 22, 0.93)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  // Grille technique subtile en fond
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

  // Bordure principale
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, cvs.width - 28, cvs.height - 28);

  // Tag système en haut à droite
  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.textAlign = 'right';
  ctx.fillText(tag, cvs.width - 44, 58);

  // Titre principal
  ctx.textAlign = 'left';
  ctx.font = 'bold 50px "Segoe UI", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title.toUpperCase(), 52, 112);

  // Ligne de séparation
  ctx.fillStyle = accentColor;
  ctx.fillRect(52, 134, 180, 4);

  // Lignes de contenu
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

  // Barres métalliques émettrices haut & bas pour donner du volume 3D au panneau
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

  return group;
}

// ==========================================
// 4. ACTE 1 : PLATEFORME DE LÉVITATION (SOMMET)
// ==========================================
function buildSkyPlatform(topY) {
  const group = new THREE.Group();
  group.position.set(0, topY + 6.5, 0);

  // Socle métallique octogonal
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(6.8, 4.4, 1.2, 8),
    new THREE.MeshStandardMaterial({
      color: 0x131a29,
      metalness: 0.9,
      roughness: 0.25
    })
  );
  group.add(base);

  // Anneaux néons HDR
  const cyanHdrMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.0, 2.5, 3.0),
    toneMapped: false
  });
  const pinkHdrMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.8, 0.1, 1.5),
    toneMapped: false
  });

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(7.1, 0.08, 16, 64), cyanHdrMat);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.06, 16, 64), pinkHdrMat);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -1.1;
  group.add(ring2);

  // Faisceau vertical subtil vers le ciel
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

  // Enseigne "ESGI BOT"
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
// 5. ACTES 3 & 4 : ÉGOUTS FUTURISTES & PILIERS FONDATEURS
// ==========================================
function buildUndergroundFoundations() {
  const underGroup = new THREE.Group();
  const floorY = -38;

  // Sol sombre réfléchissant (eau calme & métal sombre)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(140, 140),
    new THREE.MeshStandardMaterial({
      color: 0x050912,
      metalness: 0.88,
      roughness: 0.14
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = floorY;
  underGroup.add(floor);

  // Plafond technique / dalle de fondation de la tour
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(140, 140),
    new THREE.MeshStandardMaterial({
      color: 0x080d18,
      metalness: 0.7,
      roughness: 0.5
    })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = floorY + 24;
  underGroup.add(ceiling);

  // Passerelles métalliques latérales & conduits néons au sol
  const cyanStripMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.0, 2.4, 3.0),
    toneMapped: false
  });
  const walkwayMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    metalness: 0.8,
    roughness: 0.35
  });

  [-9, 9].forEach((xPos) => {
    const walkway = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.35, 90), walkwayMat);
    walkway.position.set(xPos, floorY + 0.18, 0);
    underGroup.add(walkway);

    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 90), cyanStripMat);
    strip.position.set(xPos > 0 ? xPos - 1.5 : xPos + 1.5, floorY + 0.38, 0);
    underGroup.add(strip);
  });

  // Tuyaux industriels monumentaux sur les flancs des égouts
  const pipeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25
  });
  [-17, 17].forEach((xSide) => {
    [4, 9].forEach((yPipe) => {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 90, 16), pipeMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(xSide, floorY + yPipe, 0);
      underGroup.add(pipe);
    });
  });

  // Éclairage souterrain ciblé
  const underLight = new THREE.PointLight(0x38bdf8, 22, 65);
  underLight.position.set(0, floorY + 13, 14);
  underGroup.add(underLight);

  // LES 5 PILIERS FONDATEURS (incluant Gemini AI)
  const creators = [
    { name: 'BRYAN (JMG)', role: 'Architecture & Core Dev', tag: 'PILIER // 01' },
    { name: 'COLLABORATEUR 2', role: 'Systèmes & Base de données', tag: 'PILIER // 02' },
    { name: 'GEMINI AI', role: 'Co-Pilote WebGL & Shaders', tag: 'PILIER // 03' },
    { name: 'COLLABORATEUR 3', role: 'Modules & Commandes', tag: 'PILIER // 04' },
    { name: 'PROMO ESGI REIMS', role: 'Tests, Idées & Communauté', tag: 'PILIER // 05' }
  ];

  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x131926,
    metalness: 0.75,
    roughness: 0.35
  });

  const pinkCollarMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.6, 0.1, 1.5),
    toneMapped: false
  });
  const cyanCollarMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.0, 2.4, 2.8),
    toneMapped: false
  });

  creators.forEach((person, index) => {
    // Disposition en léger arc de cercle pour une lisibilité parfaite
    const offset = index - 2; // -2, -1, 0, +1, +2
    const x = offset * 6.4;
    const z = -4.5 - Math.abs(offset) * 0.9;

    // Pilier massif reliant le sol au plafond de fondation
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.6, 26, 8), pillarMat);
    pillar.position.set(x, floorY + 13, z);
    underGroup.add(pillar);

    // Anneaux lumineux autour du pilier
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(1.52, 0.06, 12, 32),
      index % 2 === 0 ? cyanCollarMat : pinkCollarMat
    );
    collar.rotation.x = Math.PI / 2;
    collar.position.set(x, floorY + 7.2, z);
    underGroup.add(collar);

    // Plaque holographique fixée sur le pilier
    const plaque = createNeonPanel(
      person.tag,
      person.name,
      [person.role, 'Soutien structurel ESGI BOT'],
      index % 2 === 0 ? '#00f3ff' : '#ff007f',
      5.5,
      2.8
    );
    plaque.position.set(x, floorY + 4.4, z + 1.75);
    plaque.lookAt(0, floorY + 4.4, 21); // Oriente légèrement chaque plaque vers la caméra
    underGroup.add(plaque);
  });

  scene.add(underGroup);
  return floorY;
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
// 6. CHARGEMENT DU GRATTE-CIEL & TIMELINE
// ==========================================
const loader = new GLTFLoader();
let skyPlatform = null;
const panelMeshes = [];
const cyberEnv = buildCyberpunkEnvironment();

loader.load('/skyscraper.glb', (gltf) => {
  const tower = gltf.scene;

  // Normalisation de la tour : base à y = 0, hauteur = 80
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

  // Conversion des murs clairs en titane sombre cyberpunk (zéro saturation blanche)
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
  const undergroundY = buildUndergroundFoundations();

  // Définition des 4 panneaux néons
  const panelsData = [
    {
      y: 64,
      angle: Math.PI * 0.45,
      color: '#00f3ff',
      tag: 'SYS.01 // FEATURES',
      zoneName: 'NIVEAU 01 — FONCTIONNALITÉS',
      lines: [
        'Rappels automatiques devoirs & examens',
        'Gestion dynamique des rôles par classe',
        'Boutique virtuelle & économie serveur'
      ]
    },
    {
      y: 46,
      angle: Math.PI * 0.95,
      color: '#ff007f',
      tag: 'SYS.02 // INTERFACE',
      zoneName: 'NIVEAU 02 — EXPÉRIENCE',
      lines: [
        'Modales interactives Discord',
        'Notifications ciblées par filière',
        'Commandes slash ultra-rapides'
      ]
    },
    {
      y: 28,
      angle: Math.PI * 1.45,
      color: '#00f3ff',
      tag: 'SYS.03 // ARCHITECTURE',
      zoneName: 'NIVEAU 03 — STACK TECHNIQUE',
      lines: [
        'Développé en Python & portage Rust',
        'Base de données SQLite optimisée',
        'Hébergement autonome 24/7 sur Raspberry Pi'
      ]
    },
    {
      y: 12,
      angle: Math.PI * 1.9,
      color: '#a855f7',
      tag: 'SYS.04 // DEPLOYMENT',
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
    p.panelRadius = surfaceR + 2.5;
    p.camRadius = p.panelRadius + 13.5;

    const panel = createNeonPanel(p.tag, p.title || p.zoneName.split('— ')[1], p.lines, p.color);
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
  // 7. CHORÉGRAPHIE & AIMANT FLUIDE AU SCROLL
  // ==========================================
  const camState = {
    angle: 0,
    radius: 30,
    camY: targetHeight + 8.5,
    targetY: targetHeight + 4.5,
    targetZ: 0
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.9,
      snap: {
        snapTo: 'labelsDirectional',
        duration: { min: 0.45, max: 0.95 },
        delay: 0.12,
        ease: 'power2.inOut'
      },
      onUpdate: (self) => {
        const hud = document.getElementById('hud');
        const hudAlt = document.getElementById('hud-alt');
        const hudZone = document.getElementById('hud-zone');
        const hudFill = document.getElementById('hud-fill');
        const hint = document.getElementById('scroll-hint');

        if (hint) hint.style.opacity = self.progress > 0.03 ? '0' : '1';
        if (hudFill) hudFill.style.width = `${Math.round(self.progress * 100)}%`;

        // Altitude calculée selon la hauteur caméra
        const meters = Math.round(camState.camY * 5);
        if (hudAlt) hudAlt.textContent = `ALT ${meters}M`;

        // Masque le HUD pendant la plongée silencieuse (camY < 4)
        if (hud) {
          if (camState.camY < 4) {
            hud.classList.add('hidden');
          } else {
            hud.classList.remove('hidden');
          }
        }

        // Mise à jour du nom de zone
        if (hudZone) {
          if (camState.camY > 72) hudZone.textContent = 'PLATEFORME ORBITALE';
          else if (camState.camY > 54) hudZone.textContent = panelsData[0].zoneName;
          else if (camState.camY > 36) hudZone.textContent = panelsData[1].zoneName;
          else if (camState.camY > 19) hudZone.textContent = panelsData[2].zoneName;
          else hudZone.textContent = panelsData[3].zoneName;
        }
      }
    }
  });

  tl.addLabel('top');

  panelsData.forEach((p, idx) => {
    tl.to(camState, {
      angle: p.angle,
      radius: p.camRadius,
      camY: p.y,
      targetY: p.y,
      targetZ: 0,
      duration: 2.0,
      ease: 'power1.inOut'
    })
    .addLabel(`panel-${idx}`)
    .to(camState, {
      camY: p.y - 0.12,
      targetY: p.y - 0.12,
      duration: 0.55,
      ease: 'none'
    });
  });

  // Plongée rapide sans texte ni HUD vers les fondations souterraines
  tl.to(camState, {
    angle: Math.PI * 2,
    radius: 21.5,
    camY: undergroundY + 5.2,
    targetY: undergroundY + 4.4,
    targetZ: -4.5,
    duration: 2.6,
    ease: 'power2.inOut'
  })
  .addLabel('underground');

  // Boucle de rendu
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Animation plateforme céleste
    if (skyPlatform) {
      skyPlatform.group.position.y = targetHeight + 6.5 + Math.sin(elapsed * 2) * 0.3;
      skyPlatform.ring1.rotation.z = elapsed * 0.45;
      skyPlatform.ring2.rotation.z = -elapsed * 0.7;
    }

    // Animation trafic aérien & particules
    cyberEnv.drones.forEach((d) => {
      const a = d.phase + elapsed * d.speed;
      d.mesh.position.set(Math.cos(a) * d.orbitR, d.orbitY, Math.sin(a) * d.orbitR);
      d.mesh.rotation.y = -a;
    });
    cyberEnv.particles.rotation.y = elapsed * 0.015;

    // Position caméra
    camera.position.x = Math.sin(camState.angle) * camState.radius;
    camera.position.z = Math.cos(camState.angle) * camState.radius;
    camera.position.y = camState.camY;
    camera.lookAt(0, camState.targetY, camState.targetZ);

    // Zoom tactile subtil sur le panneau aimanté
    panelMeshes.forEach((mesh) => {
      const dist = camera.position.distanceTo(mesh.position);
      const targetScale = dist < 16.0 ? 1.05 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    });

    composer.render();
  }
  animate();
});

// Redimensionnement fenêtre
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});