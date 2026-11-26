import * as THREE from 'three';
import gsap from 'gsap';
import { createNightEnvironment } from '../environment.js';
import { createGlowSystem } from '../glows.js';
import { createCompanion } from '../companion.js';
import { createSpaceBackdrop } from './space.js';
import { IS_TOUCH, REDUCED_MOTION } from './util.js';

// =========================================================================
// SALLE RONDE DU VAISSEAU (base commune du QG et du laboratoire)
// Sol sombre et brillant gravé de cercles lumineux, piliers métalliques,
// grandes baies sur l'espace, plafond à anneaux de lumière. Chaque
// destination ajoute sa pièce maîtresse au centre et son interface.
// =========================================================================

const hdr = (r, g, b) => new THREE.Color(r, g, b);

function floorTextures(accent) {
  const s = 1024;
  const base = document.createElement('canvas');
  const glow = document.createElement('canvas');
  base.width = glow.width = s;
  base.height = glow.height = s;
  const b = base.getContext('2d');
  const g = glow.getContext('2d');
  const grad = b.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, '#1e2740');
  grad.addColorStop(1, '#090c16');
  b.fillStyle = grad;
  b.fillRect(0, 0, s, s);
  g.fillStyle = '#000';
  g.fillRect(0, 0, s, s);
  // Dalles en rayons et anneaux
  b.strokeStyle = 'rgba(0,0,0,0.6)';
  b.lineWidth = 3;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
    b.beginPath();
    b.moveTo(s / 2 + Math.cos(a) * 150, s / 2 + Math.sin(a) * 150);
    b.lineTo(s / 2 + Math.cos(a) * s, s / 2 + Math.sin(a) * s);
    b.stroke();
  }
  [150, 260, 380, 470].forEach((r, i) => {
    b.beginPath();
    b.arc(s / 2, s / 2, r, 0, Math.PI * 2);
    b.stroke();
    g.strokeStyle = i % 2 ? '#8b5cf6' : accent;
    g.lineWidth = i === 0 ? 5 : 2;
    g.globalAlpha = i === 0 ? 1 : 0.55;
    g.beginPath();
    g.arc(s / 2, s / 2, r + 4, 0, Math.PI * 2);
    g.stroke();
  });
  // Tirets lumineux sur l'anneau extérieur
  g.globalAlpha = 0.9;
  g.strokeStyle = accent;
  g.lineWidth = 6;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 36) {
    g.beginPath();
    g.arc(s / 2, s / 2, 420, a, a + 0.04);
    g.stroke();
  }
  const map = new THREE.CanvasTexture(base);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const emissive = new THREE.CanvasTexture(glow);
  emissive.colorSpace = THREE.SRGBColorSpace;
  return { map, emissive };
}

/**
 * options : { renderer, accent ('#22e4ff'), accentHdr [r,g,b], layout (décor
 * spatial), camPos, camTarget, nova (ancre de NOVA) }
 */
export function createRoom({ renderer, accent, accentHdr, layout, camPos, camTarget, novaAnchor }) {
  const scene = new THREE.Scene();
  scene.environment = createNightEnvironment(renderer);
  scene.environmentIntensity = 0.45;
  scene.fog = new THREE.FogExp2(0x05060f, 0.012);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.05, 2500);
  scene.add(camera);

  const space = createSpaceBackdrop({ seed: layout.length * 13, layout });
  // Le décor spatial n'est pas dans le brouillard de la pièce
  space.group.traverse((o) => {
    if (o.material) o.material.fog = false;
  });
  scene.add(space.group);

  const glows = createGlowSystem(scene, 200);
  const R = 9;
  const H = 6.2;
  const metal = new THREE.MeshStandardMaterial({ color: 0x1c2233, metalness: 0.8, roughness: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x0c101b, metalness: 0.7, roughness: 0.42 });
  const led = new THREE.MeshBasicMaterial({ color: hdr(...accentHdr).multiplyScalar(0.55), toneMapped: false });
  const ledViolet = new THREE.MeshBasicMaterial({ color: hdr(0.5, 0.16, 1.0), toneMapped: false });

  const group = new THREE.Group();
  scene.add(group);

  // Sol gravé et brillant
  const ft = floorTextures(accent);
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(R, 96),
    new THREE.MeshStandardMaterial({ map: ft.map, emissiveMap: ft.emissive, emissive: 0xffffff, emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.45 })
  );
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  // Murs bas et haut, baies vitrées entre les piliers
  const lowWall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 1.1, 96, 1, true), new THREE.MeshStandardMaterial({ color: 0x151b2b, metalness: 0.75, roughness: 0.35, side: THREE.BackSide }));
  lowWall.position.y = 0.55;
  group.add(lowWall);
  const highWall = new THREE.Mesh(new THREE.CylinderGeometry(R - 1.2, R, 1.4, 96, 1, true), new THREE.MeshStandardMaterial({ color: 0x111625, metalness: 0.7, roughness: 0.4, side: THREE.BackSide }));
  highWall.position.y = H - 0.7;
  group.add(highWall);
  const ceiling = new THREE.Mesh(new THREE.CircleGeometry(R - 1.2, 64), new THREE.MeshStandardMaterial({ color: 0x0b0f1a, metalness: 0.6, roughness: 0.5 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  group.add(ceiling);
  [2.5, 4.6, 6.6].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 6, 160), i === 1 ? ledViolet : led);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = H - 0.02;
    group.add(ring);
  });
  // Bandeaux lumineux en haut et en bas des baies
  [1.12, H - 1.42].forEach((y) => {
    const strip = new THREE.Mesh(new THREE.TorusGeometry(R - 0.12, 0.012, 4, 192), led);
    strip.rotation.x = Math.PI / 2;
    strip.position.y = y;
    group.add(strip);
  });
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(R - 0.05, R - 0.05, H - 2.5, 96, 1, true),
    new THREE.MeshPhysicalMaterial({ color: 0xa8d8ff, roughness: 0.05, transparent: true, opacity: 0.04, envMapIntensity: 0.5, side: THREE.BackSide, depthWrite: false })
  );
  glass.position.y = 1.1 + (H - 2.5) / 2;
  group.add(glass);
  // Piliers : section en trapèze, néon vertical
  const PILLARS = 16;
  for (let i = 0; i < PILLARS; i++) {
    const a = (i / PILLARS) * Math.PI * 2;
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.55, H, 0.6), metal);
    p.position.set(Math.sin(a) * (R - 0.25), H / 2, Math.cos(a) * (R - 0.25));
    p.lookAt(0, H / 2, 0);
    group.add(p);
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.03, H - 2.6, 0.02), i % 2 ? ledViolet : led);
    l.position.set(Math.sin(a) * (R - 0.56), H / 2, Math.cos(a) * (R - 0.56));
    l.lookAt(0, H / 2, 0);
    group.add(l);
  }

  // Éclairage
  scene.add(new THREE.AmbientLight(0x1b2444, 0.8));
  scene.add(new THREE.HemisphereLight(0x5a78c8, 0x0a0614, 0.5));
  const keyLight = new THREE.PointLight(new THREE.Color(accent), 30, 16, 1.6);
  keyLight.position.set(0, 4.2, 0);
  scene.add(keyLight);
  const fill = new THREE.PointLight(0x8b5cf6, 14, 14, 1.6);
  fill.position.set(-4, 2.5, 4);
  scene.add(fill);

  // NOVA nous accompagne
  const nova = createCompanion(scene, camera, glows);

  // Caméra : glisse lentement, suit un peu la souris
  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  const entry = { k: 0 };
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    look.tx = (e.clientX / window.innerWidth) * 2 - 1;
    look.ty = (e.clientY / window.innerHeight) * 2 - 1;
  });
  const target = new THREE.Vector3();
  // Départ de l'entrée : plus haut et un peu en arrière, mais toujours dans la pièce
  const startPos = camPos.clone().add(new THREE.Vector3(0, 2.2, Math.max(0, 8.0 - camPos.z)));

  function fitCamera() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = camera.aspect < 1 ? 72 : 55;
    camera.updateProjectionMatrix();
    const h = window.innerHeight * Math.min(window.devicePixelRatio, 1.5);
    glows.resize(h, camera.fov);
    nova.resize(h, camera.fov);
  }
  fitCamera();

  function update(delta, t) {
    const k = 1 - Math.exp(-delta * 3);
    look.x += (look.tx - look.x) * k;
    look.y += (look.ty - look.y) * k;
    const sway = REDUCED_MOTION ? 0 : Math.sin(t * 0.12) * 0.35;
    const p = camPos.clone();
    p.x += sway + look.x * (IS_TOUCH ? 0 : 0.8);
    p.y += -look.y * 0.3;
    camera.position.lerpVectors(startPos, p, entry.k);
    target.copy(camTarget);
    target.x += look.x * 0.4;
    camera.lookAt(target);
    space.update(t, camera);
    nova.update(delta, t, { anchor: novaAnchor, portrait: camera.aspect < 1, progress: 0, idle: 0, verticalSpeed: 0 });
    scene.updateMatrixWorld();
    glows.update(t);
  }

  /** Entrée dans la pièce : la caméra arrive du fond en freinant */
  function playEntry() {
    entry.k = 0;
    return gsap.to(entry, { k: 1, duration: REDUCED_MOTION ? 0.3 : 2.2, ease: 'power3.out' });
  }

  return { scene, camera, group, glows, nova, metal, dark, led, ledViolet, update, fitCamera, playEntry, R, H };
}
