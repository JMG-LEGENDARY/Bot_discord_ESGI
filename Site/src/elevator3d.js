import * as THREE from 'three';
import { api } from './api.js';
import { createElevatorMusic } from './elevator-music.js';
import { createDashboard } from './dashboard.js';

// =========================================================================
// L'ASCENSEUR EN 3D
// Cabine art déco (bois, laiton, plafond à coupole, sol en marbre), portes
// dorées à motif d'éventails, et à droite un tableau de commande en acier
// brossé avec écran vert qui fait défiler les noms des étages.
// Étages = comptes Discord liés au bot, par ordre alphabétique ; on ne peut
// aller qu'à SON étage (connexion avec Discord).
// =========================================================================

// La cabine est construite à l'écart de la ville (sous le sol, invisible d'en haut)
const ORIGIN = new THREE.Vector3(0, -300, 0);
const ROOM = { w: 2.5, h: 2.7, front: -1.15, back: 1.7 };
const DOOR = { x: -0.32, w: 1.12, h: 2.15 };
const PANEL = { x: 0.8, y: 1.33, w: 0.66, h: 1.254 };
const HALL = { id: 'hall', nom: 'HALL' };
const ROWS_PER_PAGE = 7;

// ---------------------------------------------------------------------------
// Textures dessinées
// ---------------------------------------------------------------------------
function canvasTexture(w, h, draw, repeat) {
  const cvs = document.createElement('canvas');
  cvs.width = w;
  cvs.height = h;
  draw(cvs.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  return tex;
}

// Placage de bois chaud, veinage vertical
function woodTexture() {
  return canvasTexture(256, 512, (ctx, w, h) => {
    const bg = ctx.createLinearGradient(0, 0, w, 0);
    bg.addColorStop(0, '#5a3820');
    bg.addColorStop(0.5, '#7a4e2c');
    bg.addColorStop(1, '#5d3a21');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * w;
      ctx.strokeStyle = `rgba(${Math.random() < 0.5 ? '40,22,10' : '150,100,60'},${0.08 + Math.random() * 0.12})`;
      ctx.lineWidth = 0.5 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      for (let y = 0; y <= h; y += 32) ctx.lineTo(x + Math.sin(y * 0.02 + i) * 3, y);
      ctx.stroke();
    }
  });
}

// Battant de porte : laiton bruni et éventails dorés superposés (art déco)
function doorLeafTexture(mirror) {
  return canvasTexture(256, 512, (ctx, w, h) => {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#4a3520');
    bg.addColorStop(0.5, '#6b4c2c');
    bg.addColorStop(1, '#3e2c1a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    if (mirror) {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.strokeStyle = '#e8c27a';
    ctx.fillStyle = 'rgba(232, 194, 122, 0.16)';
    ctx.lineWidth = 3;
    // Cadre doré
    ctx.strokeRect(18, 18, w - 18, h - 36);
    // Trois éventails, ancrés sur le bord intérieur (là où les battants se touchent)
    for (let k = 0; k < 3; k++) {
      const cx = w;
      const cy = 150 + k * 150;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 118, Math.PI, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      for (let r = 1; r <= 5; r++) {
        const a = Math.PI + (r / 6) * (Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * 118, cy + Math.sin(a) * 118);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 60, Math.PI, Math.PI * 1.5);
      ctx.stroke();
      // Petite queue de l'éventail
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy);
      ctx.lineTo(cx - 6, cy + 40);
      ctx.stroke();
    }
    ctx.restore();
  });
}

// Sol en marbre clair avec rose des vents au centre
function marbleTexture() {
  return canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#d9cdb8';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = `rgba(120, 100, 80, ${0.05 + Math.random() * 0.1})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      let x = Math.random() * w;
      let y = Math.random() * h;
      ctx.moveTo(x, y);
      for (let s = 0; s < 8; s++) {
        x += (Math.random() - 0.5) * 160;
        y += (Math.random() - 0.3) * 120;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    const c = w / 2;
    ctx.fillStyle = '#3a2f28';
    ctx.beginPath();
    ctx.arc(c, c, 330, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c9b48f';
    ctx.beginPath();
    ctx.arc(c, c, 300, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2c2420';
    ctx.beginPath();
    ctx.arc(c, c, 270, 0, Math.PI * 2);
    ctx.fill();
    // Branches de la rose des vents
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const len = k % 2 === 0 ? 250 : 150;
      ctx.fillStyle = k % 2 === 0 ? '#d8c39b' : '#8a7458';
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * len, c + Math.sin(a) * len);
      ctx.lineTo(c + Math.cos(a + 0.35) * 40, c + Math.sin(a + 0.35) * 40);
      ctx.lineTo(c, c);
      ctx.lineTo(c + Math.cos(a - 0.35) * 40, c + Math.sin(a - 0.35) * 40);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = '#e8c27a';
    ctx.beginPath();
    ctx.arc(c, c, 22, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Ce qu'on voit derrière les portes ouvertes : le hall, ou la lumière de l'étage
function landingTexture(kind) {
  return canvasTexture(256, 512, (ctx, w, h) => {
    if (kind === 'floor') {
      const g = ctx.createRadialGradient(w / 2, h * 0.45, 10, w / 2, h * 0.45, h * 0.7);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(1, '#dfe9ff');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      return;
    }
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#f6e3c0');
    g.addColorStop(0.6, '#b98d5c');
    g.addColorStop(1, '#5b432c');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(w * 0.15, h * 0.12, w * 0.7, h * 0.02);
    ctx.font = '700 22px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(60, 40, 20, 0.7)';
    ctx.fillText('HALL · ESGI-BOT', w / 2, h * 0.3);
  });
}

// Plafond crème avec coupole
function ceilingTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#e9dcc4';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#c9a25e';
    ctx.lineWidth = 6;
    ctx.strokeRect(14, 14, w - 28, h - 28);
  });
}

// ---------------------------------------------------------------------------
// Tableau de commande (dessiné sur un canvas, cliquable)
// ---------------------------------------------------------------------------
const CW = 500;
const CH = 950;
const SCALE = 2;

function fitText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
  return `${t}…`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Fond acier brossé (calculé une fois)
function steelBackground() {
  const cvs = document.createElement('canvas');
  cvs.width = CW * SCALE;
  cvs.height = CH * SCALE;
  const ctx = cvs.getContext('2d');
  ctx.scale(SCALE, SCALE);
  const g = ctx.createLinearGradient(0, 0, 0, CH);
  g.addColorStop(0, '#e4e7ec');
  g.addColorStop(0.45, '#aeb4bd');
  g.addColorStop(0.55, '#c3c8cf');
  g.addColorStop(1, '#9aa0aa');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CW, CH);
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = `rgba(${Math.random() < 0.5 ? '255,255,255' : '70,75,85'},${Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * CW, Math.random() * CH, 20 + Math.random() * 120, 0.6);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 3;
  roundRect(ctx, 4, 4, CW - 8, CH - 8, 16);
  ctx.stroke();
  // Vis aux coins
  [[22, 22], [CW - 22, 22], [22, CH - 22], [CW - 22, CH - 22]].forEach(([x, y]) => {
    ctx.fillStyle = '#7d838d';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  return cvs;
}

// ---------------------------------------------------------------------------
export function createElevator3D(scene, { say, onExit }) {
  const music = createElevatorMusic();
  const group = new THREE.Group();
  group.position.copy(ORIGIN);
  group.visible = false;
  scene.add(group);

  // ---------- Matières ----------
  const woodMat = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.42, metalness: 0.05, envMapIntensity: 0.6 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xd8b26e, metalness: 1, roughness: 0.28, envMapIntensity: 0.7 });
  const darkBrass = new THREE.MeshStandardMaterial({ color: 0x6e5232, metalness: 0.9, roughness: 0.35, envMapIntensity: 1 });
  const floorMat = new THREE.MeshStandardMaterial({ map: marbleTexture(), roughness: 0.18, metalness: 0.05, envMapIntensity: 0.8 });
  const ceilMat = new THREE.MeshStandardMaterial({ map: ceilingTexture(), roughness: 0.8 });
  const lampMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.93, 0.8).multiplyScalar(0.98), toneMapped: false });
  const { w: RW, h: RH, front: FZ, back: BZ } = ROOM;
  const depth = BZ - FZ;
  const midZ = (BZ + FZ) / 2;

  // ---------- Sol, plafond, murs ----------
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(RW, depth), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, midZ);
  group.add(floor);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(RW, depth), ceilMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, RH, midZ);
  group.add(ceiling);

  // Coupole dorée et lustre
  const dome = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.03, 12, 48), brass);
  dome.rotation.x = Math.PI / 2;
  dome.position.set(0, RH - 0.03, midZ - 0.1);
  group.add(dome);
  const domeInner = new THREE.Mesh(new THREE.CircleGeometry(0.4, 40), new THREE.MeshStandardMaterial({ color: 0xc9a25e, metalness: 0.8, roughness: 0.3 }));
  domeInner.rotation.x = Math.PI / 2;
  domeInner.position.set(0, RH - 0.005, midZ - 0.1);
  group.add(domeInner);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lampMat);
  lamp.rotation.x = Math.PI;
  lamp.position.set(0, RH - 0.01, midZ - 0.1);
  group.add(lamp);
  // Spots encastrés
  [[-0.85, -0.55], [0.85, -0.55], [-0.85, 1.2], [0.85, 1.2]].forEach(([x, z]) => {
    const spot = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), lampMat);
    spot.rotation.x = Math.PI / 2;
    spot.position.set(x, RH - 0.004, z);
    group.add(spot);
  });

  const cabinLight = new THREE.PointLight(0xffe2b8, 3.5, 7, 1.4);
  cabinLight.position.set(0, RH - 0.35, midZ);
  group.add(cabinLight);
  const doorLight = new THREE.PointLight(0xfff0d8, 2.2, 5, 1.2);
  doorLight.position.set(0.1, 1.6, BZ - 0.6);
  group.add(doorLight);

  // Murs latéraux et mur du fond en bois, avec baguettes dorées
  function wall(width, x, z, rotY) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(width, RH), woodMat);
    m.position.set(x, RH / 2, z);
    m.rotation.y = rotY;
    group.add(m);
  }
  wall(depth, -RW / 2, midZ, Math.PI / 2);
  wall(depth, RW / 2, midZ, -Math.PI / 2);
  wall(RW, 0, BZ, Math.PI);
  [-1, 1].forEach((s) => {
    // Baguettes verticales
    [FZ + 0.6, midZ + 0.4, BZ - 0.3].forEach((z) => {
      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.015, RH - 0.2, 0.03), brass);
      trim.position.set(s * (RW / 2 - 0.008), RH / 2, z);
      group.add(trim);
    });
    // Main courante dorée
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, depth - 0.5, 14), brass);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(s * (RW / 2 - 0.07), 0.95, midZ);
    group.add(rail);
    [FZ + 0.4, BZ - 0.35].forEach((z) => {
      const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.07, 8), brass);
      bracket.rotation.z = Math.PI / 2;
      bracket.position.set(s * (RW / 2 - 0.035), 0.95, z);
      group.add(bracket);
    });
  });
  // Plinthe et corniche dorées
  [0.04, RH - 0.04].forEach((y) => {
    [-1, 1].forEach((s) => {
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, depth), darkBrass);
      band.position.set(s * (RW / 2 - 0.01), y, midZ);
      group.add(band);
    });
  });

  // ---------- Mur de la porte (avec ouverture) ----------
  const wallT = 0.12;
  const doorL = DOOR.x - DOOR.w / 2;
  const doorR = DOOR.x + DOOR.w / 2;
  function frontPiece(x0, x1, y0, y1) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, wallT), woodMat);
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, FZ - wallT / 2);
    group.add(m);
  }
  frontPiece(-RW / 2, doorL, 0, RH);
  frontPiece(doorR, RW / 2, 0, RH);
  frontPiece(doorL, doorR, DOOR.h, RH);

  // Encadrement doré de la porte
  const jambGeo = new THREE.BoxGeometry(0.06, DOOR.h + 0.06, 0.05);
  [doorL - 0.03, doorR + 0.03].forEach((x) => {
    const j = new THREE.Mesh(jambGeo, brass);
    j.position.set(x, DOOR.h / 2, FZ + 0.02);
    group.add(j);
  });
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(DOOR.w + 0.12, 0.06, 0.05), brass);
  lintel.position.set(DOOR.x, DOOR.h + 0.03, FZ + 0.02);
  group.add(lintel);
  // Petit voyant au-dessus de la porte (flèche de direction)
  const arrowCvs = document.createElement('canvas');
  arrowCvs.width = 128;
  arrowCvs.height = 64;
  const arrowTex = new THREE.CanvasTexture(arrowCvs);
  arrowTex.colorSpace = THREE.SRGBColorSpace;
  const arrowSign = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.13), new THREE.MeshBasicMaterial({ map: arrowTex, toneMapped: false }));
  arrowSign.position.set(DOOR.x, DOOR.h + 0.22, FZ + 0.005);
  group.add(arrowSign);
  function drawArrowSign(dir) {
    const ctx = arrowCvs.getContext('2d');
    ctx.fillStyle = '#120d08';
    ctx.fillRect(0, 0, 128, 64);
    ctx.strokeStyle = '#d8b26e';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 124, 60);
    [[-1, 'down'], [1, 'up']].forEach(([d, , ], i) => {
      const lit = dir === d;
      ctx.fillStyle = lit ? '#ffd27a' : '#3a2c1c';
      const cx = 40 + i * 48;
      ctx.beginPath();
      if (d > 0) {
        ctx.moveTo(cx, 16); ctx.lineTo(cx + 14, 46); ctx.lineTo(cx - 14, 46);
      } else {
        ctx.moveTo(cx, 48); ctx.lineTo(cx + 14, 18); ctx.lineTo(cx - 14, 18);
      }
      ctx.closePath();
      ctx.fill();
    });
    arrowTex.needsUpdate = true;
  }
  drawArrowSign(0);

  // Ce qu'il y a derrière la porte
  const hallTex = landingTexture('hall');
  const floorTex = landingTexture('floor');
  const landingMat = new THREE.MeshBasicMaterial({ map: hallTex, toneMapped: false });
  const landing = new THREE.Mesh(new THREE.PlaneGeometry(DOOR.w + 0.2, DOOR.h + 0.1), landingMat);
  landing.position.set(DOOR.x, DOOR.h / 2, FZ - wallT - 0.35);
  group.add(landing);
  const shaftSide = new THREE.MeshStandardMaterial({ color: 0x1a1410, roughness: 0.9 });
  [doorL, doorR].forEach((x) => {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(0.4, DOOR.h), shaftSide);
    s.rotation.y = x < DOOR.x ? Math.PI / 2 : -Math.PI / 2;
    s.position.set(x, DOOR.h / 2, FZ - wallT - 0.18);
    group.add(s);
  });

  // Battants dorés (coulissent dans le mur)
  const leafW = DOOR.w / 2;
  const leaves = [-1, 1].map((s) => {
    const mat = new THREE.MeshStandardMaterial({
      map: doorLeafTexture(s > 0), metalness: 0.75, roughness: 0.3, envMapIntensity: 1.3,
      emissive: 0x3a2410, emissiveIntensity: 0.25
    });
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(leafW, DOOR.h, 0.035), mat);
    leaf.userData.closedX = DOOR.x + s * leafW / 2;
    leaf.userData.side = s;
    leaf.position.set(leaf.userData.closedX, DOOR.h / 2, FZ - wallT / 2);
    group.add(leaf);
    return leaf;
  });

  // ---------- Tableau de commande ----------
  const bg = steelBackground();
  const panelCvs = document.createElement('canvas');
  panelCvs.width = CW * SCALE;
  panelCvs.height = CH * SCALE;
  const pctx = panelCvs.getContext('2d');
  const panelTex = new THREE.CanvasTexture(panelCvs);
  panelTex.colorSpace = THREE.SRGBColorSpace;
  panelTex.anisotropy = 8;
  const panelMat = new THREE.MeshStandardMaterial({
    map: panelTex, emissiveMap: panelTex, emissive: 0xffffff, emissiveIntensity: 0.28,
    metalness: 0.35, roughness: 0.4, envMapIntensity: 0.6
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(PANEL.w, PANEL.h), panelMat);
  panel.position.set(PANEL.x, PANEL.y, FZ + 0.012);
  group.add(panel);
  const panelFrame = new THREE.Mesh(new THREE.BoxGeometry(PANEL.w + 0.04, PANEL.h + 0.04, 0.02), brass);
  panelFrame.position.set(PANEL.x, PANEL.y, FZ + 0.0);
  group.add(panelFrame);

  // ---------- État ----------
  let active = false;
  let mode = 'loading'; // loading | login | offline | floors
  let offlineText = '';
  let floors = [HALL];
  let me = null;
  let myIndex = -1;
  let current = 0;
  let page = 0;
  let travelling = false;
  let doorTarget = 0;
  let doorOpen = 0;
  let travelDir = 0;
  let screenPrev = null;
  let screenText = 'HALL';
  let screenAnim = 1;
  let hoverKey = null;
  let regions = [];
  let dirty = true;
  let onFloor = false;

  // ---------- Dessin du tableau ----------
  function region(x, y, w, h, act, arg) {
    regions.push({ x, y, w, h, act, arg, key: `${act}:${arg ?? ''}` });
    return hoverKey === `${act}:${arg ?? ''}`;
  }

  function roundButton(cx, cy, r, label, { lit = false, hover = false, font = 26, color = '#2fe36b' } = {}) {
    const ring = pctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    ring.addColorStop(0, '#f2f4f7');
    ring.addColorStop(1, '#7b818b');
    pctx.fillStyle = ring;
    pctx.beginPath();
    pctx.arc(cx, cy, r, 0, Math.PI * 2);
    pctx.fill();
    pctx.lineWidth = 4;
    pctx.strokeStyle = lit ? color : '#2d5a3b';
    if (lit) {
      pctx.shadowColor = color;
      pctx.shadowBlur = 14;
    }
    pctx.beginPath();
    pctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
    pctx.stroke();
    pctx.shadowBlur = 0;
    const face = pctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 2, cx, cy, r);
    face.addColorStop(0, hover ? '#ffffff' : '#f5f6f8');
    face.addColorStop(1, hover ? '#c9ced6' : '#b4bac3');
    pctx.fillStyle = face;
    pctx.beginPath();
    pctx.arc(cx, cy, r - 7, 0, Math.PI * 2);
    pctx.fill();
    pctx.fillStyle = lit ? color : '#2d5a3b';
    pctx.font = `700 ${font}px "JetBrains Mono", monospace`;
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText(label, cx, cy + 1);
  }

  function drawDisplay() {
    const x = 30;
    const y = 30;
    const w = CW - 60;
    const h = 120;
    pctx.fillStyle = '#2c2f35';
    roundRect(pctx, x, y, w, h, 10);
    pctx.fill();
    pctx.fillStyle = '#0a0d0a';
    roundRect(pctx, x + 10, y + 10, w - 20, h - 20, 6);
    pctx.fill();
    pctx.save();
    roundRect(pctx, x + 10, y + 10, w - 20, h - 20, 6);
    pctx.clip();
    // Flèche de direction
    pctx.font = '700 40px "JetBrains Mono", monospace';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    const blink = travelling && Math.floor(performance.now() / 350) % 2 === 0;
    pctx.fillStyle = travelDir !== 0 && !blink ? '#36ff7a' : '#123a1f';
    pctx.fillText(travelDir < 0 ? '▼' : '▲', x + 50, y + h / 2);
    // Nom de l'étage, qui défile verticalement pendant le trajet
    pctx.shadowColor = '#2fe36b';
    pctx.shadowBlur = 16;
    pctx.fillStyle = '#4dff8c';
    pctx.font = '700 44px "JetBrains Mono", monospace';
    pctx.textAlign = 'left';
    const textX = x + 90;
    const maxW = w - 120;
    const shift = (1 - screenAnim) * (h - 20);
    const sign = travelDir < 0 ? -1 : 1;
    if (screenPrev && screenAnim < 1) {
      pctx.fillText(fitText(pctx, screenPrev.toUpperCase(), maxW), textX, y + h / 2 - sign * (h - 20 - shift));
    }
    pctx.fillText(fitText(pctx, screenText.toUpperCase(), maxW), textX, y + h / 2 + sign * shift);
    pctx.restore();
    pctx.shadowBlur = 0;
  }

  function label(text, x, y, { size = 18, color = '#2a2f38', align = 'center', weight = 700 } = {}) {
    pctx.font = `${weight} ${size}px "Space Grotesk", sans-serif`;
    pctx.fillStyle = color;
    pctx.textAlign = align;
    pctx.textBaseline = 'middle';
    pctx.fillText(text, x, y);
  }

  function drawLogin() {
    label('LECTEUR DE BADGE', CW / 2, 200, { size: 20, color: '#3a3f48' });
    // Lecteur
    pctx.fillStyle = '#23262c';
    roundRect(pctx, CW / 2 - 70, 230, 140, 180, 14);
    pctx.fill();
    pctx.fillStyle = '#2fe36b';
    pctx.shadowColor = '#2fe36b';
    pctx.shadowBlur = 18;
    pctx.beginPath();
    pctx.arc(CW / 2, 280, 10, 0, Math.PI * 2);
    pctx.fill();
    pctx.shadowBlur = 0;
    pctx.strokeStyle = '#5b616b';
    pctx.lineWidth = 3;
    pctx.strokeRect(CW / 2 - 40, 320, 80, 60);
    // Bouton Discord
    const hover = region(50, 450, CW - 100, 130, 'login');
    pctx.fillStyle = hover ? '#6f7bff' : '#5865f2';
    pctx.shadowColor = 'rgba(88,101,242,0.6)';
    pctx.shadowBlur = 20;
    roundRect(pctx, 50, 450, CW - 100, 130, 18);
    pctx.fill();
    pctx.shadowBlur = 0;
    label('SE CONNECTER', CW / 2, 495, { size: 30, color: '#ffffff' });
    label('AVEC DISCORD', CW / 2, 538, { size: 30, color: '#ffffff' });
    label('Pour aller à ton étage,', CW / 2, 640, { size: 20, color: '#3a3f48', weight: 500 });
    label('montre ton badge Discord.', CW / 2, 668, { size: 20, color: '#3a3f48', weight: 500 });
  }

  function drawOffline() {
    label('HORS SERVICE', CW / 2, 250, { size: 40, color: '#c0262d' });
    label(fitText(pctx, offlineText, CW - 60), CW / 2, 320, { size: 18, color: '#3a3f48', weight: 500 });
    label('Lance le serveur du tableau', CW / 2, 380, { size: 18, color: '#3a3f48', weight: 500 });
    label('de bord (dossier dashboard/).', CW / 2, 406, { size: 18, color: '#3a3f48', weight: 500 });
    const hover = region(110, 470, CW - 220, 80, 'retry');
    pctx.fillStyle = hover ? '#4b525e' : '#353a43';
    roundRect(pctx, 110, 470, CW - 220, 80, 14);
    pctx.fill();
    label('RÉESSAYER', CW / 2, 510, { size: 24, color: '#ffffff' });
  }

  function drawFloors() {
    // Ton étage, à part : plus facile que de le chercher dans la liste
    if (me) {
      const hover = region(30, 172, CW - 60, 110, 'mine');
      pctx.fillStyle = hover ? 'rgba(47,227,107,0.22)' : 'rgba(47,227,107,0.12)';
      pctx.strokeStyle = '#2fe36b';
      pctx.lineWidth = 3;
      roundRect(pctx, 30, 172, CW - 60, 110, 16);
      pctx.fill();
      pctx.stroke();
      roundButton(90, 227, 38, String(myIndex), { lit: true, hover, font: 30 });
      label('TON ÉTAGE', 145, 205, { size: 17, color: '#1f6b3a', align: 'left' });
      pctx.font = '700 34px "Space Grotesk", sans-serif';
      label(fitText(pctx, me.nom, CW - 230), 145, 245, { size: 34, color: '#1b1f26', align: 'left' });
      label('▲', CW - 60, 227, { size: 28, color: '#1f6b3a' });
    } else {
      label('Aucun étage pour ton compte', CW / 2, 215, { size: 20, color: '#3a3f48', weight: 500 });
      label('(rejoins le serveur de ta classe)', CW / 2, 245, { size: 18, color: '#3a3f48', weight: 500 });
    }

    label('TOUS LES ÉTAGES', 34, 308, { size: 15, color: '#3a3f48', align: 'left' });
    const pages = Math.max(1, Math.ceil(floors.length / ROWS_PER_PAGE));
    page = Math.min(page, pages - 1);
    const start = page * ROWS_PER_PAGE;
    floors.slice(start, start + ROWS_PER_PAGE).forEach((f, k) => {
      const i = start + k;
      const y = 330 + k * 62;
      const mine = i === myIndex;
      const isHall = f.id === 'hall';
      const hover = region(30, y, CW - 60, 58, 'floor', i);
      if (hover) {
        pctx.fillStyle = 'rgba(255,255,255,0.35)';
        roundRect(pctx, 30, y, CW - 60, 58, 10);
        pctx.fill();
      }
      roundButton(64, y + 29, 25, isHall ? 'H' : String(i), { lit: i === current || mine, font: 19, color: i === current ? '#ffb347' : '#2fe36b' });
      pctx.font = `${mine ? 700 : 500} 25px "Space Grotesk", sans-serif`;
      const name = fitText(pctx, f.nom, CW - 200);
      label(name, 104, y + 30, { size: 25, color: mine ? '#145c2f' : isHall ? '#2a2f38' : '#4a505b', align: 'left', weight: mine ? 700 : 500 });
      if (!mine && !isHall) label('🔒', CW - 58, y + 30, { size: 20 });
    });

    // Pages
    if (pages > 1) {
      const upHover = region(CW / 2 - 110, 772, 60, 50, 'pageUp');
      roundButton(CW / 2 - 80, 797, 24, '▲', { font: 18, lit: page > 0, hover: upHover });
      label(`${page + 1} / ${pages}`, CW / 2, 798, { size: 18, color: '#3a3f48' });
      const downHover = region(CW / 2 + 50, 772, 60, 50, 'pageDown');
      roundButton(CW / 2 + 80, 797, 24, '▼', { font: 18, lit: page < pages - 1, hover: downHover });
    }
  }

  function drawBottomButtons() {
    const y = 878;
    const items = [
      { act: 'open', x: 110, text: '◀▶', caption: 'PORTES' },
      { act: 'mute', x: 250, text: music.muted ? '✕' : '♪', caption: 'MUSIQUE' },
      { act: 'exit', x: 390, text: '⇱', caption: 'SORTIR' }
    ];
    items.forEach((b) => {
      const hover = region(b.x - 42, y - 42, 84, 84, b.act);
      roundButton(b.x, y - 6, 36, b.text, { font: 24, hover, lit: b.act === 'open' && doorTarget > 0.5 });
      label(b.caption, b.x, y + 44, { size: 13, color: '#3a3f48' });
    });
  }

  function drawPanel() {
    regions = [];
    pctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    pctx.drawImage(bg, 0, 0, CW, CH);
    drawDisplay();
    if (mode === 'loading') label('…', CW / 2, 400, { size: 40 });
    else if (mode === 'login') drawLogin();
    else if (mode === 'offline') drawOffline();
    else drawFloors();
    drawBottomButtons();
    panelTex.needsUpdate = true;
    dirty = false;
  }

  function setScreen(text, animate) {
    screenPrev = screenText;
    screenText = text;
    screenAnim = animate ? 0 : 1;
    dirty = true;
  }

  // ---------- Étages ----------
  async function loadFloors(greeting) {
    mode = 'loading';
    dirty = true;
    try {
      const state = await api.state();
      if (!state.connecte) {
        mode = 'login';
        dirty = true;
        say(greeting || 'Bienvenue dans l’ascenseur ! 🛗 Pour savoir où tu vas, montre-moi ton badge : connecte-toi avec Discord sur le tableau.', 9000);
        return;
      }
      const data = await api.floors();
      me = data.moi;
      floors = [HALL, ...data.etages];
      myIndex = me ? floors.findIndex((f) => f.id === me.id) : -1;
      current = Math.min(current, floors.length - 1);
      mode = 'floors';
      dirty = true;
      if (!me) say('Je ne te trouve sur aucun serveur où se trouve ESGI-Bot… Rejoins le serveur de ta classe ! 🛰️', 8000);
      else say(greeting || `À quel étage on va ? 🛗 Ton étage, c’est le n° ${myIndex} : « ${me.nom} ».`, 8000);
    } catch (e) {
      mode = 'offline';
      offlineText = e.message;
      dirty = true;
      say('Oups… l’ascenseur est en panne 🔧 Le serveur du tableau de bord ne répond pas.', 8000);
    }
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function travelTo(target) {
    const dir = Math.sign(target - current);
    travelling = true;
    doorTarget = 0;
    dirty = true;
    await wait(1000);
    music.start();
    travelDir = dir;
    drawArrowSign(dir);
    const distance = Math.abs(target - current);
    // Trajet entre 3 et 8 secondes selon le nombre d'étages
    const total = Math.min(8000, Math.max(3000, 1800 + distance * 380));
    for (let i = 1; i <= distance; i++) {
      await wait(total / distance);
      current += dir;
      setScreen(floors[current].nom, true);
      page = Math.floor(current / ROWS_PER_PAGE);
    }
    await wait(400);
    travelDir = 0;
    drawArrowSign(0);
    music.stop(1.2);
    music.ding();
    travelling = false;
    dirty = true;
  }

  async function choose(index) {
    if (travelling || index < 0 || index >= floors.length) return;
    const floor = floors[index];
    const mine = index === myIndex;
    if (floor.id !== 'hall' && !mine) {
      say(`🔒 L’étage de ${floor.nom} est privé : seul ${floor.nom} a la clé. Ton étage à toi, c’est le n° ${myIndex} !`, 5500);
      return;
    }
    if (index === current) {
      if (mine) arriveAtMyFloor();
      else {
        doorTarget = 1;
        landingMat.map = hallTex;
        say('On est déjà au hall 😄', 3000);
      }
      return;
    }
    say(mine ? 'C’est parti, on monte ! 🎶' : 'Direction le hall ! 🎶', 3000);
    await travelTo(index);
    if (mine) {
      say('Ding ! Bienvenue chez toi ✨', 3500);
      arriveAtMyFloor();
    } else {
      landingMat.map = hallTex;
      doorTarget = 1;
      say('Hall de la tour. Tu peux sortir ou choisir un étage 🙂', 4000);
    }
  }

  // ---------- Étage du visiteur : le tableau de bord ----------
  const floorView = document.createElement('section');
  floorView.id = 'floor-view';
  floorView.setAttribute('role', 'dialog');
  floorView.setAttribute('aria-label', 'Ton étage');
  floorView.setAttribute('aria-hidden', 'true');
  document.body.appendChild(floorView);
  const dashboard = createDashboard(floorView, {
    say: (text) => say(text, 3500),
    onElevator: () => backToCabin(),
    onLogout: async () => {
      try {
        await api.logout();
      } catch (e) {
        /* déjà déconnecté */
      }
      me = null;
      myIndex = -1;
      floors = [HALL];
      current = 0;
      setScreen('HALL', false);
      landingMat.map = hallTex;
      await backToCabin(true);
      loadFloors('Déconnecté ! À bientôt 👋 Repasse ton badge quand tu veux.');
    }
  });

  async function arriveAtMyFloor() {
    landingMat.map = floorTex;
    doorTarget = 1;
    await wait(900);
    onFloor = true;
    document.body.classList.add('on-floor');
    floorView.classList.add('open');
    floorView.setAttribute('aria-hidden', 'false');
    try {
      await dashboard.load();
    } catch (e) {
      say(e.message, 5000);
    }
  }

  async function backToCabin(silent) {
    onFloor = false;
    document.body.classList.remove('on-floor');
    floorView.classList.remove('open');
    floorView.setAttribute('aria-hidden', 'true');
    if (!silent) say('Re ! On va où maintenant ? 🛗', 3500);
  }

  // ---------- Interaction ----------
  const uvHit = new THREE.Vector2();
  function regionAt(raycaster) {
    const hit = raycaster.intersectObject(panel, false)[0];
    if (!hit || !hit.uv) return null;
    uvHit.copy(hit.uv);
    const px = uvHit.x * CW;
    const py = (1 - uvHit.y) * CH;
    return regions.find((r) => px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) || null;
  }

  function act(r) {
    switch (r.act) {
      case 'login':
        window.location.href = api.loginUrl;
        break;
      case 'retry':
        loadFloors();
        break;
      case 'mine':
        choose(myIndex);
        break;
      case 'floor':
        choose(r.arg);
        break;
      case 'pageUp':
        page = Math.max(0, page - 1);
        break;
      case 'pageDown':
        page += 1;
        break;
      case 'open':
        if (travelling) return;
        if (current === myIndex && current !== 0) arriveAtMyFloor();
        else doorTarget = doorTarget > 0.5 ? 0 : 1;
        break;
      case 'mute':
        music.setMuted(!music.muted);
        say(music.muted ? 'Musique coupée 🔇' : 'Musique ! 🎶', 2000);
        break;
      case 'exit':
        if (!travelling) exit();
        break;
      default:
        break;
    }
    dirty = true;
  }

  // Pose de la caméra : face à la porte, le tableau visible à droite
  const camPos = new THREE.Vector3();
  const camTarget = new THREE.Vector3();
  function cameraPose(aspect, elapsed, mouse) {
    const portrait = aspect < 0.9;
    // Téléphone : on se rapproche du tableau pour pouvoir lire les noms
    camPos.set(portrait ? 0.5 : 0.12, portrait ? 1.36 : 1.5, portrait ? 0.55 : BZ - 0.3);
    camTarget.set(portrait ? 0.62 : 0.2, portrait ? 1.3 : 1.38, FZ);
    // Léger mouvement de tête avec la souris
    camPos.x += mouse.x * 0.05;
    camPos.y += mouse.y * 0.03;
    // Vibrations pendant le trajet
    if (travelling && travelDir !== 0) {
      camPos.y += Math.sin(elapsed * 40) * 0.0025;
      camPos.x += Math.sin(elapsed * 23) * 0.0015;
    }
    camPos.add(ORIGIN);
    camTarget.add(ORIGIN);
    return { position: camPos, target: camTarget };
  }

  async function exit() {
    if (!active) return;
    music.stop(0.4);
    backToCabin(true);
    if (onExit) await onExit();
  }

  window.addEventListener('keydown', (e) => {
    if (!active || e.key !== 'Escape' || travelling) return;
    e.preventDefault();
    if (onFloor) backToCabin();
    else exit();
  });

  return {
    get active() {
      return active;
    },
    /** Le tableau de bord (page HTML) couvre l'écran : la 3D peut se mettre en pause */
    get coversScreen() {
      return onFloor;
    },
    cameraPose,
    enter({ greeting } = {}) {
      active = true;
      group.visible = true;
      current = 0;
      page = 0;
      travelDir = 0;
      setScreen('HALL', false);
      landingMat.map = hallTex;
      doorOpen = 0;
      doorTarget = 0;
      // Portes fermées : on voit la porte dorée, et le tableau à droite
      loadFloors(greeting);
    },
    leave() {
      active = false;
      group.visible = false;
      onFloor = false;
      document.body.classList.remove('on-floor');
      floorView.classList.remove('open');
    },
    /** Survol : renvoie vrai si le pointeur est sur un bouton du tableau */
    pointerMove(raycaster) {
      const r = regionAt(raycaster);
      const key = r ? r.key : null;
      if (key !== hoverKey) {
        hoverKey = key;
        dirty = true;
      }
      return Boolean(r);
    },
    click(raycaster) {
      const r = regionAt(raycaster);
      if (r) act(r);
    },
    update(delta) {
      if (!active) return;
      doorOpen += (doorTarget - doorOpen) * (1 - Math.exp(-delta * 3.2));
      leaves.forEach((leaf) => {
        leaf.position.x = leaf.userData.closedX + leaf.userData.side * doorOpen * leafW * 0.98;
      });
      if (screenAnim < 1) {
        screenAnim = Math.min(1, screenAnim + delta * 4.5);
        dirty = true;
      }
      if (travelling) dirty = true; // flèche qui clignote
      if (dirty) drawPanel();
    }
  };
}
