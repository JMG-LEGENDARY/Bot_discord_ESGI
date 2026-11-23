import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. INITIALISATION SCÈNE, RENDU & BLOOM
// ==========================================
const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040711);
scene.fog = new THREE.FogExp2(0x040711, 0.012);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

// Indispensable pour que les matériaux métalliques du .glb affichent leurs reflets/couleurs
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// Post-processing : Effet Néon (Bloom)
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.85, // Intensité du halo néon
  0.4,  // Rayon
  0.85  // Seuil de luminosité (seuls les objets très lumineux brillent)
);
composer.addPass(bloomPass);

// Éclairage Cyberpunk (Cyan en haut, Magenta sur les flancs)
const hemiLight = new THREE.HemisphereLight(0x88ccff, 0x111122, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
dirLight.position.set(30, 80, 40);
scene.add(dirLight);

const neonRimLight = new THREE.PointLight(0xff007f, 15, 120);
neonRimLight.position.set(-25, 30, -25);
scene.add(neonRimLight);

// ==========================================
// 2. GÉNÉRATEUR DE PANNEAUX HOLOGRAPHIQUES
// ==========================================
function createNeonPanel(title, lines, accentColor = '#00f3ff', width = 9, height = 4.5) {
  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  // Fond semi-transparent sombre
  ctx.fillStyle = 'rgba(5, 12, 26, 0.88)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  // Bordure néon
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 10;
  ctx.strokeRect(16, 16, cvs.width - 32, cvs.height - 32);

  // Barre d'accentuation supérieure
  ctx.fillStyle = accentColor;
  ctx.fillRect(16, 16, cvs.width - 32, 18);

  // Titre
  ctx.font = 'bold 54px "Segoe UI", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title.toUpperCase(), 55, 115);

  // Lignes de contenu
  ctx.font = '34px "Segoe UI", sans-serif';
  ctx.fillStyle = '#e6f7ff';
  lines.forEach((line, i) => {
    ctx.fillText(`▸ ${line}`, 60, 195 + i * 62);
  });

  const texture = new THREE.CanvasTexture(cvs);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  return mesh;
}

// ==========================================
// 3. ACTE 1 : PLATEFORME DE LÉVITATION (SOMMET)
// ==========================================
function buildSkyPlatform(topY) {
  const group = new THREE.Group();
  group.position.set(0, topY + 6, 0);

  // Socle métallique futuriste
  const baseGeo = new THREE.CylinderGeometry(7, 5, 1.2, 8);
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x1a2234,
    metalness: 0.9,
    roughness: 0.25
  });
  const base = new THREE.Mesh(baseGeo, metalMat);
  group.add(base);

  // Anneaux de lévitation néon
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x00f3ff,
    emissive: 0x00f3ff,
    emissiveIntensity: 2.5
  });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(7.3, 0.12, 16, 64), ringMat);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.08, 16, 64), ringMat);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -1.2;
  group.add(ring2);

  // Enseigne géante "ESGI BOT"
  const signCvs = document.createElement('canvas');
  signCvs.width = 1024;
  signCvs.height = 256;
  const ctx = signCvs.getContext('2d');
  ctx.clearRect(0, 0, 1024, 256);
  ctx.font = '900 140px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00f3ff';
  ctx.shadowColor = '#00f3ff';
  ctx.shadowBlur = 25;
  ctx.fillText('ESGI BOT', 512, 175);

  const signTex = new THREE.CanvasTexture(signCvs);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 3.5),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
  );
  signMesh.position.y = 3.2;
  group.add(signMesh);

  scene.add(group);
  return { group, ring1, ring2 };
}

// ==========================================
// 4. ACTES 3 & 4 : ÉGOUTS FUTURISTES & PILIERS
// ==========================================
function buildUndergroundFoundations() {
  const underGroup = new THREE.Group();
  const floorY = -38;

  // Sol sombre réfléchissant (style eau/métal humide propre)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(140, 140),
    new THREE.MeshStandardMaterial({
      color: 0x050912,
      metalness: 0.85,
      roughness: 0.15
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = floorY;
  underGroup.add(floor);

  // Conduits néons au sol menant aux piliers
  const lineMat = new THREE.MeshStandardMaterial({
    color: 0x00f3ff,
    emissive: 0x00f3ff,
    emissiveIntensity: 2.0
  });
  [-6, 6].forEach((xPos) => {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 80), lineMat);
    strip.position.set(xPos, floorY + 0.05, 0);
    underGroup.add(strip);
  });

  // Lumière d'ambiance souterraine
  const underLight = new THREE.PointLight(0x00d9ff, 40, 65);
  underLight.position.set(0, floorY + 12, 12);
  underGroup.add(underLight);

  // LES 4 PILIERS STRUCTURELS + NOMS DES CRÉATEURS
  const creators = [
    { name: 'BRYAN (JMG)', role: 'Architecture & Core Dev' },
    { name: 'COLLABORATEUR 2', role: 'Systèmes & Base de données' },
    { name: 'COLLABORATEUR 3', role: 'Modules & Commandes' },
    { name: 'PROMO ESGI REIMS', role: 'Tests & Idées' }
  ];

  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x161c28,
    metalness: 0.7,
    roughness: 0.4
  });

  creators.forEach((person, index) => {
    const x = (index - 1.5) * 8.5;
    const z = -4;

    // Pilier massif allant du sous-sol jusqu'à la base de la tour (y = 0)
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 40, 8), pillarMat);
    pillar.position.set(x, floorY + 20, z);
    underGroup.add(pillar);

    // Anneau néon autour du pilier
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.08, 12, 32),
      new THREE.MeshStandardMaterial({ color: 0xff007f, emissive: 0xff007f, emissiveIntensity: 2.2 })
    );
    collar.rotation.x = Math.PI / 2;
    collar.position.set(x, floorY + 6.5, z);
    underGroup.add(collar);

    // Plaque néon fixée sur le pilier avec le nom du créateur
    const plaque = createNeonPanel(
      person.name,
      [person.role, 'Pilier fondateur ESGI BOT'],
      index % 2 === 0 ? '#00f3ff' : '#ff007f',
      6.8,
      3.4
    );
    plaque.position.set(x, floorY + 4.2, z + 2.1);
    underGroup.add(plaque);
  });

  scene.add(underGroup);
  return floorY;
}

// ==========================================
// 5. CHARGEMENT DU GRATTE-CIEL & TIMELINE
// ==========================================
const loader = new GLTFLoader();
let skyPlatform = null;

loader.load('/skyscraper.glb', (gltf) => {
  const tower = gltf.scene;

  // Normalisation : on cale la base exacte du bâtiment à y = 0 et on le centre en X/Z
  const box = new THREE.Box3().setFromObject(tower);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // On redimensionne la tour pour qu'elle fasse exactement 80 unités de haut (repère stable)
  const targetHeight = 80;
  const scaleFactor = targetHeight / size.y;
  tower.scale.setScalar(scaleFactor);

  // Recalcul après mise à l'échelle
  const scaledBox = new THREE.Box3().setFromObject(tower);
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
  tower.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

  // Vérification des matériaux du modèle d'origine
  tower.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.envMapIntensity = 1.5;
      child.material.needsUpdate = true;
    }
  });

  scene.add(tower);

  // Construction des éléments autour de la tour calibrée (0 -> 80)
  skyPlatform = buildSkyPlatform(targetHeight);
  const undergroundY = buildUndergroundFoundations();

  // Panneaux néons placés en spirale le long de la descente
  const panelsData = [
    {
      y: 66,
      angle: 0.4,
      color: '#00f3ff',
      title: 'Fonctionnalités Clés',
      lines: ['Rappels automatiques devoirs & examens', 'Gestion dynamique des rôles par classe', 'Boutique virtuelle & économie serveur']
    },
    {
      y: 46,
      angle: 2.3,
      color: '#ff007f',
      title: 'Expérience Étudiante',
      lines: ['Modales interactives Discord', 'Notifications ciblées par filière', 'Commandes slash ultra-rapides']
    },
    {
      y: 26,
      angle: 4.2,
      color: '#00f3ff',
      title: 'Architecture & Code',
      lines: ['Développé en Python & portage Rust', 'Base de données SQLite optimisée', 'Hébergement autonome 24/7 sur Raspberry Pi']
    },
    {
      y: 10,
      angle: 5.8,
      color: '#a855f7',
      title: 'Open-Source ESGI',
      lines: ['Code modulaire & maintenable', 'Déploiement continu via systemd', 'Conçu par et pour les étudiants']
    }
  ];

  const radius = 16;
  panelsData.forEach((p) => {
    const panel = createNeonPanel(p.title, p.lines, p.color);
    panel.position.set(Math.sin(p.angle) * radius, p.y, Math.cos(p.angle) * radius);
    panel.lookAt(0, p.y, 0);
    panel.rotateY(Math.PI); // Oriente le texte vers l'extérieur (vers la caméra)
    scene.add(panel);
  });

  // ==========================================
  // 6. CHORÉGRAPHIE DE CAMÉRA AU SCROLL
  // ==========================================
  const camState = {
    angle: 0,
    radius: 26,
    camY: targetHeight + 11,
    targetY: targetHeight + 7,
    targetZ: 0
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2
    }
  });

  // Phase 1 & 2 : Descente en spirale du sommet (y=80) jusqu'à la base (y=4)
  tl.to(camState, {
    angle: Math.PI * 2.2, // Plus d'un tour complet autour de la tour
    radius: 28,
    camY: 6,
    targetY: 5,
    duration: 6,
    ease: 'none'
  })
  // Phase 3 : Plongée rapide (sans texte) dans les égouts futuristes
  .to(camState, {
    angle: Math.PI * 2, // Aligne la caméra pile face aux 4 piliers
    radius: 22,
    camY: undergroundY + 6,
    targetY: undergroundY + 5,
    targetZ: -4,
    duration: 2.5,
    ease: 'power2.inOut'
  })
  // Phase 4 : Pause contemplative devant les piliers des créateurs
  .to(camState, {
    radius: 19,
    duration: 1.5,
    ease: 'power1.out'
  });

  // Boucle de rendu
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Animation de flottement de la plateforme céleste
    if (skyPlatform) {
      skyPlatform.group.position.y = targetHeight + 6 + Math.sin(elapsed * 2) * 0.35;
      skyPlatform.ring1.rotation.z = elapsed * 0.5;
      skyPlatform.ring2.rotation.z = -elapsed * 0.8;
    }

    // Mise à jour position caméra depuis GSAP
    camera.position.x = Math.sin(camState.angle) * camState.radius;
    camera.position.z = Math.cos(camState.angle) * camState.radius;
    camera.position.y = camState.camY;
    camera.lookAt(0, camState.targetY, camState.targetZ);

    composer.render();
  }
  animate();
});

// Gestion du redimensionnement fenêtre
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});