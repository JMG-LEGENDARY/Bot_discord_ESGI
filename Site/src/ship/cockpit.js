import * as THREE from 'three';
import { createNightEnvironment } from '../environment.js';
import { createGlowSystem } from '../glows.js';
import { createCompanion } from '../companion.js';
import { createSpaceBackdrop } from './space.js';
import { createWarpEffects } from './warp-fx.js';
import { createCanvasScreen, createLabelTexture, roundRect, IS_TOUCH, REDUCED_MOTION } from './util.js';
import { DESTINATIONS, MANUAL } from './destinations.js';

// =========================================================================
// LE COCKPIT
// On est assis aux commandes : grande baie vitrée courbe sur l'espace,
// montants métalliques éclairés, tableau de bord en arc avec ses boutons
// physiques (AUTOPILOT, MISSIONS, LABORATOIRE), le manche du pilotage
// manuel, des écrans animés et un hologramme de destination. NOVA flotte
// au-dessus du tableau de bord.
// Unités : mètres. Le centre de la pièce est l'origine, l'avant est -z.
// =========================================================================

const R = 2.7; // rayon de la baie vitrée
const SILL = 0.95; // bas de la vitre
const HEAD = 2.42; // haut de la vitre
const DESK_Y = 0.82; // dessus du tableau de bord
const EYE = new THREE.Vector3(0, 1.28, 0.32);
const LOOK = new THREE.Vector3(0, 1.1, -3);

// Angle « cylindre » (0 = arrière, PI = avant) vers une position
const polar = (r, phi, y) => new THREE.Vector3(r * Math.sin(phi), y, r * Math.cos(phi));

const hdr = (r, g, b) => new THREE.Color(r, g, b);

// ---------------------------------------------------------------------------
// Textures dessinées
// ---------------------------------------------------------------------------

// Panneaux muraux : plaques, rainures, rivets, petites inscriptions
function createPanelTexture() {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#20283a';
  ctx.fillRect(0, 0, s, s);
  const plates = [
    [8, 8, 240, 300], [256, 8, 248, 140], [256, 156, 248, 152], [8, 316, 160, 188], [176, 316, 328, 188]
  ];
  plates.forEach(([x, y, w, h], i) => {
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, i % 2 ? '#2a3349' : '#252d42');
    g.addColorStop(1, '#1a2132');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,0.65)';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(160,190,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    ctx.fillStyle = 'rgba(10,14,24,0.9)';
    [[x + 10, y + 10], [x + w - 10, y + 10], [x + 10, y + h - 10], [x + w - 10, y + h - 10]].forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  // Grille d'aération et inscriptions techniques
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  for (let i = 0; i < 9; i++) ctx.fillRect(30, 60 + i * 22, 190, 8);
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(140,200,255,0.35)';
  ctx.fillText('ESGI-01 // HULL 7B', 270, 40);
  ctx.fillText('PRESSURISÉ', 270, 190);
  ctx.fillStyle = 'rgba(255,200,80,0.25)';
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.translate(200 + i * 36, 470);
    ctx.rotate(-0.6);
    ctx.fillRect(0, 0, 14, 40);
    ctx.restore();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

// Dessus du tableau de bord (vu de haut) : couleur + lueurs
function createDeskTextures(outer) {
  const s = 1024;
  const make = () => {
    const c = document.createElement('canvas');
    c.width = s;
    c.height = s;
    return c;
  };
  const base = make();
  const glow = make();
  const b = base.getContext('2d');
  const g = glow.getContext('2d');
  const px = (r) => (r / (2 * outer)) * s; // mètres -> pixels
  const cx = s / 2;
  const cy = s / 2;
  const grad = b.createRadialGradient(cx, cy, px(0.7), cx, cy, px(outer));
  grad.addColorStop(0, '#2b3550');
  grad.addColorStop(0.45, '#1b2236');
  grad.addColorStop(1, '#0b0f1c');
  b.fillStyle = grad;
  b.fillRect(0, 0, s, s);
  g.fillStyle = '#000';
  g.fillRect(0, 0, s, s);

  // Rainures concentriques (les plus proches s'éclairent)
  [[0.8, 3, '#0a2a33'], [1.28, 2, '#22e4ff'], [1.62, 2, '#8b5cf6'], [2.05, 1.5, '#22e4ff']].forEach(([r, w, col]) => {
    b.strokeStyle = 'rgba(0,0,0,0.8)';
    b.lineWidth = w + 3;
    b.beginPath();
    b.arc(cx, cy, px(r), 0, Math.PI * 2);
    b.stroke();
    g.strokeStyle = col;
    g.lineWidth = w;
    g.beginPath();
    g.arc(cx, cy, px(r), 0, Math.PI * 2);
    g.stroke();
  });
  // Joints de plaques en rayons
  b.strokeStyle = 'rgba(0,0,0,0.55)';
  b.lineWidth = 2;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 15) {
    b.beginPath();
    b.moveTo(cx + Math.cos(a) * px(1.3), cy + Math.sin(a) * px(1.3));
    b.lineTo(cx + Math.cos(a) * px(outer), cy + Math.sin(a) * px(outer));
    b.stroke();
  }
  // Petites diodes le long de l'arc avant
  for (let a = -2.2; a <= -0.94; a += 0.035) {
    const r = px(1.45);
    g.fillStyle = Math.random() > 0.8 ? '#ff3dbb' : '#22e4ff';
    g.globalAlpha = 0.5 + Math.random() * 0.5;
    g.fillRect(cx + Math.cos(a) * r - 1.5, cy + Math.sin(a) * r - 1.5, 3, 3);
  }
  g.globalAlpha = 1;
  // Inscriptions au sol du tableau de bord
  b.save();
  b.translate(cx, cy);
  b.font = '600 13px "JetBrains Mono", monospace';
  b.fillStyle = 'rgba(150,200,255,0.4)';
  b.textAlign = 'center';
  ['NAV', 'SYS', 'COMMS', 'HYPER', 'ARMES', 'BOUCLIER'].forEach((t, i) => {
    const a = -Math.PI / 2 + (i - 2.5) * 0.17;
    b.save();
    b.rotate(a + Math.PI / 2);
    b.fillText(t, 0, -px(1.17));
    b.restore();
  });
  b.restore();

  const map = new THREE.CanvasTexture(base);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const emissive = new THREE.CanvasTexture(glow);
  emissive.colorSpace = THREE.SRGBColorSpace;
  return { map, emissive };
}

// ---------------------------------------------------------------------------
// Construction
// ---------------------------------------------------------------------------

export function createCockpit(ship) {
  const scene = new THREE.Scene();
  scene.environment = createNightEnvironment(ship.renderer);
  scene.environmentIntensity = 0.4;

  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.05, 2500);
  camera.position.copy(EYE);
  camera.lookAt(LOOK);
  scene.add(camera);

  // Décor spatial derrière la vitre
  const space = createSpaceBackdrop({ seed: 11, layout: 'cockpit' });
  scene.add(space.group);

  // Effets du saut (traînées d'étoiles, trou de ver)
  const warp = createWarpEffects(camera);

  const glows = createGlowSystem(scene, 160);

  // ---- Matériaux ----
  const gunmetal = new THREE.MeshStandardMaterial({ color: 0x1c2233, metalness: 0.8, roughness: 0.48 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x0d111c, metalness: 0.7, roughness: 0.45 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0x9aa6c2, metalness: 0.9, roughness: 0.35 });
  const panelTex = createPanelTexture();
  const wallMat = new THREE.MeshStandardMaterial({ map: panelTex, color: 0x8b95b0, metalness: 0.55, roughness: 0.55, side: THREE.BackSide });
  const ledCyan = new THREE.MeshBasicMaterial({ color: hdr(0.05, 0.32, 0.5), toneMapped: false });
  const ledViolet = new THREE.MeshBasicMaterial({ color: hdr(0.26, 0.08, 0.5), toneMapped: false });
  // Intensité des néons du cockpit (allumage, alertes du saut)
  const ledCyanBase = ledCyan.color.clone();
  const ledVioletBase = ledViolet.color.clone();

  const room = new THREE.Group();
  scene.add(room);

  // ---- Murs bas, plafond, sol ----
  const lowerWall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, SILL, 72, 1, true), wallMat);
  lowerWall.position.y = SILL / 2;
  panelTex.repeat.set(10, 1);
  room.add(lowerWall);

  const sideSpan = Math.PI * 2 - THREE.MathUtils.degToRad(150);
  const sideWallMat = wallMat.clone();
  sideWallMat.map = panelTex.clone();
  sideWallMat.map.repeat.set(6, 1.6);
  sideWallMat.map.needsUpdate = true;
  // Murs latéraux et arrière (tout sauf la baie vitrée de 150°)
  const sideWall = new THREE.Mesh(
    new THREE.CylinderGeometry(R, R, HEAD - SILL, 72, 1, true, Math.PI + THREE.MathUtils.degToRad(75), sideSpan),
    sideWallMat
  );
  sideWall.position.y = (HEAD + SILL) / 2;
  room.add(sideWall);

  const upper = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.35, R, 0.45, 72, 1, true), new THREE.MeshStandardMaterial({ color: 0x141a28, metalness: 0.7, roughness: 0.4, side: THREE.BackSide }));
  upper.position.y = HEAD + 0.225;
  room.add(upper);
  const ceiling = new THREE.Mesh(new THREE.CircleGeometry(R - 0.35, 64), new THREE.MeshStandardMaterial({ color: 0x0e1320, metalness: 0.6, roughness: 0.5 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = HEAD + 0.45;
  room.add(ceiling);
  // Anneaux lumineux au plafond
  [1.2, 1.9].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 6, 128), i ? ledViolet : ledCyan);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = HEAD + 0.43;
    room.add(ring);
  });

  const floor = new THREE.Mesh(new THREE.CircleGeometry(R, 64), new THREE.MeshStandardMaterial({ color: 0x10141f, metalness: 0.6, roughness: 0.6 }));
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  // ---- Baie vitrée : verre teinté qui reflète le cockpit ----
  const glassSpan = THREE.MathUtils.degToRad(150);
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(R - 0.02, R - 0.02, HEAD - SILL, 72, 1, true, Math.PI - glassSpan / 2, glassSpan),
    new THREE.MeshPhysicalMaterial({
      color: 0xa8d8ff,
      metalness: 0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.045,
      envMapIntensity: 0.5,
      side: THREE.BackSide,
      depthWrite: false
    })
  );
  glass.position.y = (HEAD + SILL) / 2;
  glass.renderOrder = 5;
  room.add(glass);

  // Montants de la verrière, avec un néon sur la face intérieure
  const ribLeds = [];
  for (let k = -5; k <= 5; k++) {
    const phi = Math.PI + k * THREE.MathUtils.degToRad(15);
    const thick = k === 0 ? 0.0 : Math.abs(k) === 5 ? 0.16 : 0.075;
    if (thick === 0) continue; // pas de montant pile au centre : vue dégagée
    const rib = new THREE.Mesh(new THREE.BoxGeometry(thick, HEAD - SILL + 0.02, 0.14), gunmetal);
    const p = polar(R - 0.06, phi, (HEAD + SILL) / 2);
    rib.position.copy(p);
    rib.lookAt(0, p.y, 0);
    room.add(rib);
    if (Math.abs(k) < 5) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.012, HEAD - SILL - 0.25, 0.01), Math.abs(k) % 2 ? ledCyan : ledViolet);
      led.position.copy(polar(R - 0.135, phi, (HEAD + SILL) / 2));
      led.lookAt(0, led.position.y, 0);
      room.add(led);
      ribLeds.push(led);
    }
  }
  // Poutres haute et basse de la verrière (arcs)
  const beamArc = glassSpan + 0.1;
  [SILL, HEAD].forEach((y, i) => {
    const beam = new THREE.Mesh(new THREE.TorusGeometry(R - 0.07, i ? 0.08 : 0.06, 10, 96, beamArc), gunmetal);
    beam.rotation.x = Math.PI / 2;
    beam.rotation.z = -Math.PI / 2 - beamArc / 2;
    beam.position.y = y;
    room.add(beam);
    const strip = new THREE.Mesh(new THREE.TorusGeometry(R - 0.16, 0.007, 4, 128, beamArc - 0.1), i ? ledViolet : ledCyan);
    strip.rotation.x = Math.PI / 2;
    strip.rotation.z = -Math.PI / 2 - (beamArc - 0.1) / 2;
    strip.position.y = y + (i ? -0.07 : 0.06);
    room.add(strip);
  });

  // ---- Tableau de bord en arc ----
  const DESK_IN = 0.74;
  const DESK_OUT = R - 0.05;
  const deskSpan = THREE.MathUtils.degToRad(150);
  const deskTex = createDeskTextures(DESK_OUT);
  const deskTopGeo = new THREE.RingGeometry(DESK_IN, DESK_OUT, 72, 4, Math.PI / 2 - deskSpan / 2, deskSpan);
  deskTopGeo.rotateX(-Math.PI / 2);
  const deskMat = new THREE.MeshStandardMaterial({
    map: deskTex.map,
    emissiveMap: deskTex.emissive,
    emissive: 0xffffff,
    emissiveIntensity: 0,
    metalness: 0.55,
    roughness: 0.6
  });
  const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
  deskTop.position.y = DESK_Y;
  room.add(deskTop);
  // Face avant du tableau de bord (côté pilote)
  const deskFront = new THREE.Mesh(
    new THREE.CylinderGeometry(DESK_IN, DESK_IN - 0.08, DESK_Y, 64, 1, true, Math.PI - deskSpan / 2, deskSpan),
    new THREE.MeshStandardMaterial({ color: 0x151b2b, metalness: 0.75, roughness: 0.4, side: THREE.BackSide })
  );
  deskFront.position.y = DESK_Y / 2;
  room.add(deskFront);
  // Rebord chromé et néon du bord du tableau de bord
  const lipArc = deskSpan;
  const lip = new THREE.Mesh(new THREE.TorusGeometry(DESK_IN, 0.025, 8, 96, lipArc), chrome);
  lip.rotation.x = Math.PI / 2;
  lip.rotation.z = -Math.PI / 2 - lipArc / 2;
  lip.position.y = DESK_Y;
  room.add(lip);
  const lipLed = new THREE.Mesh(new THREE.TorusGeometry(DESK_IN - 0.02, 0.004, 4, 128, lipArc), ledViolet);
  lipLed.rotation.x = Math.PI / 2;
  lipLed.rotation.z = -Math.PI / 2 - lipArc / 2;
  lipLed.position.y = DESK_Y - 0.06;
  room.add(lipLed);

  // ---- Écrans (canvas animés) ----
  const status = { hover: null, selected: null, target: null, hyper: 0, engine: 0, power: 0, time: 0 };
  const screens = [];
  function addScreen(phi, r, y, w, h, drawFn, tilt = -0.35, cw = 512) {
    const scr = createCanvasScreen(cw, Math.round((cw * h) / w), drawFn);
    const frame = new THREE.Group();
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, h + 0.04, 0.03), darkMetal);
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: scr.texture, toneMapped: false, color: new THREE.Color(1.25, 1.25, 1.25) })
    );
    face.position.z = 0.016;
    frame.add(bezel, face);
    const p = polar(r, phi, y);
    frame.position.copy(p);
    frame.lookAt(EYE.x, y, EYE.z);
    frame.rotateX(tilt);
    room.add(frame);
    // ~25 images/s pour des courbes et radars fluides (le grand écran de droite : ~12/s)
    screens.push({ scr, face, every: cw > 512 ? 0.08 : 0.04, acc: Math.random() * 0.04 });
    return frame;
  }

  // Écran gauche : état du vaisseau
  addScreen(Math.PI + 0.56, 1.42, DESK_Y + 0.2, 0.52, 0.31, (ctx, w, h, t) => {
    const p = status.power;
    ctx.fillStyle = 'rgba(4,10,24,0.96)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = p;
    ctx.font = '700 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#22e4ff';
    ctx.fillText('ÉTAT DU VAISSEAU', 22, 38);
    ctx.fillStyle = 'rgba(34,228,255,0.25)';
    ctx.fillRect(22, 48, w - 44, 2);
    const rows = [
      ['BOUCLIER', 1, '#22e4ff'],
      ['RÉACTEUR', 0.55 + status.engine * 0.45, '#a78bfa'],
      ['HYPERPROPULSEUR', status.hyper, '#ff3dbb']
    ];
    rows.forEach(([label, v, col], i) => {
      const y = 82 + i * 46;
      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.fillStyle = '#a9b3d6';
      ctx.fillText(label, 22, y);
      ctx.fillStyle = '#e8ecff';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(v * 100)} %`, w - 180, y);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(22, y + 9, w - 210, 9);
      ctx.fillStyle = col;
      ctx.fillRect(22, y + 9, (w - 210) * v, 9);
    });
    // Radar circulaire
    const rx = w - 92;
    const ry = 122;
    const rr = 62;
    ctx.strokeStyle = 'rgba(34,228,255,0.35)';
    ctx.lineWidth = 1.5;
    [1, 0.66, 0.33].forEach((k) => {
      ctx.beginPath();
      ctx.arc(rx, ry, rr * k, 0, Math.PI * 2);
      ctx.stroke();
    });
    const a = t * 2.2;
    const sweep = ctx.createConicGradient ? ctx.createConicGradient(a - 0.8, rx, ry) : null;
    if (sweep) {
      sweep.addColorStop(0, 'rgba(34,228,255,0)');
      sweep.addColorStop(0.12, 'rgba(34,228,255,0.45)');
      sweep.addColorStop(0.13, 'rgba(34,228,255,0)');
      ctx.fillStyle = sweep;
      ctx.beginPath();
      ctx.arc(rx, ry, rr, 0, Math.PI * 2);
      ctx.fill();
    }
    [[0.4, 1.1], [0.75, 3.6], [0.55, 5.2]].forEach(([d, ang]) => {
      ctx.fillStyle = '#ff3dbb';
      ctx.beginPath();
      ctx.arc(rx + Math.cos(ang) * rr * d, ry + Math.sin(ang) * rr * d, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    // Courbe du réacteur
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= w - 44; x += 6) {
      const y = h - 34 + Math.sin(x * 0.05 + t * 6) * (6 + status.engine * 10) * Math.sin(x * 0.013 + t);
      if (x === 0) ctx.moveTo(22 + x, y);
      else ctx.lineTo(22 + x, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  // Écran central : carte de navigation (les trois destinations), sur un pied
  const navPoints = {
    'esgi-bot': [0.72, 0.3],
    qg: [0.28, 0.32],
    labo: [0.5, 0.78]
  };
  const navScreen = addScreen(Math.PI, 1.66, DESK_Y + 0.4, 0.8, 0.45, (ctx, w, h, t) => {
    const p = status.power;
    ctx.fillStyle = 'rgba(6,6,24,0.96)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = p;
    ctx.font = '700 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('NAVIGATION', 22, 38);
    ctx.fillStyle = 'rgba(167,139,250,0.25)';
    ctx.fillRect(22, 48, w - 44, 2);
    // Grille
    ctx.strokeStyle = 'rgba(120,140,255,0.12)';
    ctx.lineWidth = 1;
    for (let x = 22; x < w - 22; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, h - 16);
      ctx.stroke();
    }
    for (let y = 60; y < h - 16; y += 32) {
      ctx.beginPath();
      ctx.moveTo(22, y);
      ctx.lineTo(w - 22, y);
      ctx.stroke();
    }
    const ox = 22;
    const oy = 60;
    const W = w - 44;
    const H = h - 76;
    const ship = [0.5, 0.52];
    const target = status.selected || status.hover || status.target;
    Object.entries(navPoints).forEach(([id, [x, y]]) => {
      const d = DESTINATIONS[id];
      const X = ox + x * W;
      const Y = oy + y * H;
      const on = target === id;
      if (on) {
        ctx.strokeStyle = d.color;
        ctx.setLineDash([8, 6]);
        ctx.lineDashOffset = -t * 40;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ox + ship[0] * W, oy + ship[1] * H);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(X, Y, on ? 8 : 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = d.color;
      ctx.globalAlpha = p * (0.4 + 0.3 * Math.sin(t * 3 + x * 9));
      ctx.beginPath();
      ctx.arc(X, Y, 14 + (t * 14) % 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = p;
      ctx.font = `${on ? 700 : 500} 15px "JetBrains Mono", monospace`;
      ctx.fillStyle = on ? '#ffffff' : '#a9b3d6';
      ctx.fillText(d.name, Math.min(X + 14, w - 22 - ctx.measureText(d.name).width), Y - 12);
    });
    // Le vaisseau
    ctx.save();
    ctx.translate(ox + ship[0] * W, oy + ship[1] * H);
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(6, 7);
    ctx.lineTo(0, 3);
    ctx.lineTo(-6, 7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  });

  const navStand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.05), darkMetal);
  navStand.position.copy(polar(1.7, Math.PI, DESK_Y + 0.1));
  room.add(navStand);
  const navFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.02, 24), darkMetal);
  navFoot.position.copy(polar(1.7, Math.PI, DESK_Y + 0.01));
  room.add(navFoot);
  void navScreen;

  // Écran droit : la destination choisie (ou survolée)
  addScreen(Math.PI - 0.56, 1.42, DESK_Y + 0.2, 0.52, 0.31, (ctx, w, h, t) => drawHolo(ctx, w, h, t), -0.35, 1024);

  // Petits écrans latéraux : liaison et journal de bord
  const logLines = [
    'LIAISON ESGI-BOT ........ OK',
    'NOVA ................ EN LIGNE',
    'COQUE ............... INTACTE',
    'CEINTURE D’ASTÉROÏDES : DENSE',
    'FLOTTE NOVA REBELLE : REPÉRÉE',
    'HYPERPROPULSEUR ........ PRÊT',
    'QG ............ CANAL OUVERT',
    'LABORATOIRE ... CANAL OUVERT',
    'TEMPÉRATURE ........... 21 °C',
    'OXYGÈNE ................ 98 %'
  ];
  [Math.PI + 1.16, Math.PI - 1.16].forEach((phi, side) => {
    addScreen(phi, 1.75, DESK_Y + 0.17, 0.4, 0.26, (ctx, w, h, t) => {
      const p = status.power;
      ctx.fillStyle = 'rgba(3,8,18,0.96)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = p;
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillStyle = side ? '#ff3dbb' : '#22e4ff';
      ctx.fillText(side ? 'JOURNAL DE BORD' : 'LIAISONS', 20, 34);
      ctx.font = '500 16px "JetBrains Mono", monospace';
      const start = Math.floor(t * 0.8 + side * 5);
      for (let i = 0; i < 7; i++) {
        const line = logLines[(start + i) % logLines.length];
        ctx.fillStyle = i === 6 ? '#ffffff' : `rgba(169,179,214,${0.35 + i * 0.09})`;
        ctx.fillText(line, 20, 66 + i * 25);
      }
      if (Math.floor(t * 2) % 2) {
        ctx.fillStyle = side ? '#ff3dbb' : '#22e4ff';
        ctx.fillRect(20 + ctx.measureText(logLines[(start + 6) % logLines.length]).width + 6, 66 + 6 * 25 - 14, 10, 16);
      }
      ctx.globalAlpha = 1;
    }, -0.2);
  });

  // ---- Consoles latérales : rangées de petits boutons qui clignotent ----
  const keyGeo = new THREE.BoxGeometry(0.035, 0.012, 0.028);
  const keyMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const KEYS = 72;
  const keys = new THREE.InstancedMesh(keyGeo, keyMat, KEYS);
  const keyColors = [hdr(0.1, 0.6, 0.9), hdr(0.8, 0.12, 0.55), hdr(0.45, 0.2, 0.9), hdr(0.9, 0.55, 0.15), hdr(0.05, 0.06, 0.1)];
  const keyState = [];
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  for (let i = 0; i < KEYS; i++) {
    const side = i < KEYS / 2 ? 1 : -1;
    const j = i % (KEYS / 2);
    const row = Math.floor(j / 9);
    const col = j % 9;
    const phi = Math.PI + side * (0.62 + col * 0.04);
    const r = 1.32 + row * 0.07;
    const p = polar(r, phi, DESK_Y + 0.008);
    q.setFromEuler(new THREE.Euler(0, phi, 0));
    m4.compose(p, q, new THREE.Vector3(1, 1, 1));
    keys.setMatrixAt(i, m4);
    const c = Math.floor(Math.random() * keyColors.length);
    keyState.push({ c, blink: Math.random() < 0.3 });
    keys.setColorAt(i, keyColors[c]);
  }
  room.add(keys);

  // ---- Boutons de commande (AUTOPILOT, MISSIONS, LABORATOIRE) ----
  const buttons = {};
  const hitTargets = [];
  // Bouton « ENGAGER » : lance l'autopilote vers la destination choisie
  const ENGAGE = { id: 'engage', command: 'AUTOPILOTE', name: 'ENGAGER', color: '#3dffa8', hdr: [0.3, 1.5, 0.8] };
  function addButton(id, phi, r, size) {
    const d = DESTINATIONS[id] || ENGAGE;
    const group = new THREE.Group();
    const p = polar(r, phi, DESK_Y);
    group.position.copy(p);
    group.rotation.y = phi;
    room.add(group);
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(size * 1.32, size * 1.45, 0.028, 40), gunmetal);
    bezel.position.y = 0.014;
    group.add(bezel);
    const ringMat = new THREE.MeshBasicMaterial({ color: hdr(...d.hdr), toneMapped: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 1.16, size * 0.07, 8, 48), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.03;
    group.add(ring);
    const capColor = new THREE.Color(d.color);
    const capMat = new THREE.MeshStandardMaterial({
      color: capColor.clone().multiplyScalar(0.35),
      emissive: capColor,
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.25
    });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(size, size * 1.04, 0.035, 40), capMat);
    cap.position.y = 0.045;
    group.add(cap);
    // Icône gravée sur le bouton
    const icon = new THREE.Mesh(
      new THREE.CircleGeometry(size * 0.8, 32),
      new THREE.MeshBasicMaterial({
        map: createLabelTexture(d.id === 'esgi-bot' ? '▲' : d.id === 'qg' ? '◎' : d.id === 'engage' ? '▶' : '⬡', { color: '#ffffff', size: 92, width: 128, height: 128 }),
        transparent: true,
        toneMapped: false
      })
    );
    icon.rotation.x = -Math.PI / 2;
    icon.rotation.z = Math.PI;
    icon.position.y = 0.064;
    cap.add(icon);
    icon.position.y = 0.019;
    // Étiquette posée devant le bouton (côté pilote)
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.17, 0.0425),
      new THREE.MeshBasicMaterial({
        map: createLabelTexture(d.command, { color: d.color, size: 54, width: 512, height: 128, sub: d.name }),
        transparent: true,
        depthWrite: false,
        toneMapped: false
      })
    );
    label.rotation.x = -Math.PI / 2 - 0.5;
    label.rotation.z = Math.PI;
    label.position.set(0, 0.035, -(size * 1.4 + 0.07));
    group.add(label);
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(size * 1.5, size * 1.5, 0.14, 16), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 0.06;
    hit.userData.command = id;
    group.add(hit);
    hitTargets.push(hit);
    glows.add(ring, new THREE.Vector3(0, 0, 0), d.hdr.map((v) => v * 0.8), 0.06);
    buttons[id] = { group, cap, capMat, ringMat, ring, hover: 0, press: 0, base: new THREE.Color(...d.hdr) };
  }
  // Les trois destinations à gauche (l'autopilote, c'est NOVA : on clique
  // sur elle). À droite : musique et son.
  addButton('esgi-bot', Math.PI + 0.57, 0.98, 0.052);
  addButton('qg', Math.PI + 0.77, 0.98, 0.052);
  addButton('labo', Math.PI + 0.97, 0.98, 0.052);

  // ---- Petits boutons ronds du tableau de bord : MUSIQUE et MODE LÉGER ----
  // Placés dans les espaces entre les gros boutons (rien devant, rien
  // derrière) : allumés = actif, éteints = coupé. L'étiquette est derrière.
  const toggles = {};
  function addToggle(id, phi, r, icon, text, color, rgb) {
    const size = 0.045;
    const group = new THREE.Group();
    group.position.copy(polar(r, phi, DESK_Y));
    group.rotation.y = phi;
    room.add(group);
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(size * 1.32, size * 1.45, 0.024, 32), gunmetal);
    bezel.position.y = 0.012;
    group.add(bezel);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 1.16, size * 0.08, 8, 40), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.026;
    group.add(ring);
    const capMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.3), emissive: new THREE.Color(color), emissiveIntensity: 0.5, metalness: 0.2, roughness: 0.25 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(size, size * 1.04, 0.03, 32), capMat);
    cap.position.y = 0.04;
    group.add(cap);
    const iconMesh = new THREE.Mesh(
      new THREE.CircleGeometry(size * 0.85, 28),
      new THREE.MeshBasicMaterial({ map: createLabelTexture(icon, { color: '#ffffff', size: 84, width: 128, height: 128 }), transparent: true, toneMapped: false })
    );
    iconMesh.rotation.x = -Math.PI / 2;
    iconMesh.rotation.z = Math.PI;
    iconMesh.position.y = 0.0155;
    cap.add(iconMesh);
    // Petit panneau debout derrière le bouton, tourné vers le pilote : son nom
    const sign = new THREE.Group();
    sign.position.set(0, 0, size * 1.45 + 0.025);
    sign.rotation.y = Math.PI;
    group.add(sign);
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.06, 0.008), gunmetal);
    board.position.set(0, 0.055, 0.006);
    board.rotation.x = -0.35;
    sign.add(board);
    // Nom + état (ACTIVÉE / COUPÉE) : deux textures, échangées au clic
    const texOn = createLabelTexture(text, { color, size: 62, width: 512, height: 180, sub: 'ACTIVÉ' });
    const texOff = createLabelTexture(text, { color: '#8a93b0', size: 62, width: 512, height: 180, sub: 'COUPÉ' });
    const labelMat = new THREE.MeshBasicMaterial({ map: texOff, transparent: true, depthWrite: false, toneMapped: false });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.0563), labelMat);
    label.position.set(0, 0.0565, 0.0115);
    label.rotation.x = -0.35;
    sign.add(label);
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(size * 1.6, size * 1.6, 0.12, 16), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 0.05;
    hit.userData.command = `tool:${id}`;
    group.add(hit);
    hitTargets.push(hit);
    toggles[id] = { cap, capMat, ringMat, labelMat, texOn, texOff, on: false, hover: 0, press: 0, rgb: new THREE.Color(...rgb) };
  }
  // À droite, en miroir des destinations (loin des leviers)
  // MUSIQUE coupe la musique (jamais les bruitages), SUIVANTE change de
  // morceau, la barre de volume est juste devant MUSIQUE
  addToggle('sound', Math.PI - 0.6, 0.98, '♪', 'MUSIQUE', '#ff8ad8', [1.4, 0.3, 1.0]);
  addToggle('next', Math.PI - 0.8, 0.98, '⏭', 'SUIVANTE', '#c4b5fd', [0.8, 0.5, 1.5]);
  addToggle('lite', Math.PI - 1.0, 0.98, '⚡', 'MODE LÉGER', '#ffd166', [1.5, 1.0, 0.2]);
  toggles.next.on = true; // toujours allumé (c'est une action, pas un réglage)
  toggles.next.labelMat.map = toggles.next.texOn;

  // ---- Barre de volume (sous le bouton MUSIQUE) ----
  // 12 segments qui s'allument selon le volume ; on clique ou on glisse.
  const VOL_SEGS = 12;
  const volGroup = new THREE.Group();
  volGroup.position.copy(polar(0.85, Math.PI - 0.6, DESK_Y));
  volGroup.rotation.y = Math.PI - 0.6;
  room.add(volGroup);
  const volBase = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.008, 0.032), gunmetal);
  volBase.position.y = 0.004;
  volGroup.add(volBase);
  const volSegs = [];
  for (let i = 0; i < VOL_SEGS; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false });
    const seg = new THREE.Mesh(new THREE.BoxGeometry(0.0105, 0.006, 0.016 + i * 0.0009), mat);
    // De gauche à droite vu du siège du pilote (l'axe x local est inversé)
    seg.position.set(0.0715 - i * 0.013, 0.011, 0);
    volGroup.add(seg);
    volSegs.push(mat);
  }
  const volLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.1, 0.025),
    new THREE.MeshBasicMaterial({ map: createLabelTexture('VOLUME', { color: '#ff8ad8', size: 60, width: 512, height: 128 }), transparent: true, depthWrite: false, toneMapped: false })
  );
  volLabel.rotation.x = -Math.PI / 2 - 0.5;
  volLabel.rotation.z = Math.PI;
  volLabel.position.set(0, 0.012, -0.032);
  volGroup.add(volLabel);
  const volHit = new THREE.Mesh(new THREE.PlaneGeometry(0.19, 0.07), new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
  volHit.rotation.x = -Math.PI / 2;
  volHit.position.y = 0.015;
  volHit.userData.command = 'vol';
  volGroup.add(volHit);
  hitTargets.push(volHit);
  let volume = 1;
  let volMuted = false;

  // ---- Console centrale (radar) et leviers de pilotage ----
  // Un bloc avance vers le pilote, avec un radar rond. De chaque côté, un
  // levier : on les prend pour piloter soi-même vers la destination choisie.
  const pedestal = new THREE.Group();
  pedestal.position.set(0, 0, -0.64);
  room.add(pedestal);
  const pedBody = new THREE.Mesh(new THREE.BoxGeometry(0.34, DESK_Y - 0.04, 0.3), gunmetal);
  pedBody.position.y = (DESK_Y - 0.04) / 2;
  pedestal.add(pedBody);
  const pedTop = new THREE.Group();
  pedTop.position.y = DESK_Y - 0.02;
  pedTop.rotation.x = 0.28;
  pedestal.add(pedTop);
  const pedPlate = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.03, 0.33), darkMetal);
  pedTop.add(pedPlate);
  const radar = createCanvasScreen(256, 256, (ctx, w, h, t) => {
    const p = status.power;
    const c = w / 2;
    ctx.fillStyle = '#030a14';
    ctx.beginPath();
    ctx.arc(c, c, c - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = p;
    ctx.strokeStyle = 'rgba(34,228,255,0.45)';
    ctx.lineWidth = 2;
    [0.92, 0.66, 0.4, 0.14].forEach((k) => {
      ctx.beginPath();
      ctx.arc(c, c, (c - 4) * k, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(c, 6);
    ctx.lineTo(c, w - 6);
    ctx.moveTo(6, c);
    ctx.lineTo(w - 6, c);
    ctx.stroke();
    // La destination choisie apparaît sur le radar
    const id = status.target || status.hover;
    Object.entries(navPoints).forEach(([k, [x, y]]) => {
      const d = DESTINATIONS[k];
      ctx.fillStyle = d.color;
      ctx.globalAlpha = p * (k === id ? 1 : 0.45);
      ctx.beginPath();
      ctx.arc(c + (x - 0.5) * c * 1.4, c + (y - 0.52) * c * 1.4, k === id ? 9 : 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  });
  screens.push({ scr: radar, every: 0.2, acc: 0 });
  const radarFace = new THREE.Mesh(
    new THREE.CircleGeometry(0.11, 48),
    new THREE.MeshBasicMaterial({ map: radar.texture, toneMapped: false, color: new THREE.Color(1.2, 1.2, 1.2) })
  );
  radarFace.rotation.x = -Math.PI / 2;
  radarFace.position.set(0, 0.017, -0.02);
  pedTop.add(radarFace);
  // Faisceau du radar : tourne à chaque image (parfaitement fluide)
  const sweepMat = new THREE.ShaderMaterial({
    uniforms: { uAngle: { value: 0 }, uPower: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform float uAngle;
      uniform float uPower;
      varying vec2 vP;
      void main() {
        float a = atan(vP.y, vP.x + 1e-6);
        float d = mod(uAngle - a, 6.28318);
        float trail = exp(-d * 2.6) * 0.55 + smoothstep(0.03, 0.0, d) * 0.9;
        float r = length(vP) / 0.11;
        gl_FragColor = vec4(vec3(0.15, 0.85, 1.0) * trail * (1.0 - smoothstep(0.92, 1.0, r)) * uPower, 1.0);
      }
    `
  });
  const sweep = new THREE.Mesh(new THREE.CircleGeometry(0.108, 64), sweepMat);
  sweep.rotation.x = -Math.PI / 2;
  sweep.position.set(0, 0.0185, -0.02);
  pedTop.add(sweep);
  const radarRing = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.008, 8, 48), chrome);
  radarRing.rotation.x = Math.PI / 2;
  radarRing.position.set(0, 0.018, -0.02);
  pedTop.add(radarRing);
  // Plaque « PILOTAGE MANUEL » sur la face avant (côté pilote)
  const pedLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.075),
    new THREE.MeshBasicMaterial({
      map: createLabelTexture('PILOTAGE', { color: MANUAL.color, size: 54, width: 512, height: 128, sub: 'MANUEL' }),
      transparent: true,
      depthWrite: false,
      toneMapped: false
    })
  );
  pedLabel.rotation.x = -Math.PI / 2;
  pedLabel.position.set(0, 0.018, 0.125);
  pedLabel.scale.setScalar(0.85);
  pedTop.add(pedLabel);

  // Les deux leviers
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x3a4058, metalness: 0.5, roughness: 0.45, emissive: 0xffd166, emissiveIntensity: 0.12 });
  const knobMat = new THREE.MeshBasicMaterial({ color: hdr(1.2, 0.8, 0.2), toneMapped: false });
  const levers = [];
  [-1, 1].forEach((side) => {
    const base = new THREE.Group();
    base.position.set(side * 0.255, DESK_Y, -0.6);
    room.add(base);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.03, 0.26), darkMetal);
    slot.position.y = 0.015;
    base.add(slot);
    const slotLed = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.004, 0.22), ledCyan);
    slotLed.position.set(side * -0.03, 0.032, 0);
    base.add(slotLed);
    const pivot = new THREE.Group();
    pivot.position.y = 0.02;
    base.add(pivot);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.16, 0.022), chrome);
    arm.position.y = 0.08;
    pivot.add(arm);
    const grip = new THREE.Mesh(new THREE.CapsuleGeometry(0.024, 0.09, 6, 12), gripMat);
    grip.rotation.z = Math.PI / 2;
    grip.position.y = 0.17;
    pivot.add(grip);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.014, 12, 8), knobMat);
    knob.position.set(side * 0.058, 0.17, 0);
    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.26, 0.2), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 0.12;
    hit.userData.command = 'jeu';
    base.add(hit);
    hitTargets.push(hit);
    pivot.add(knob);
    levers.push({ pivot, side });
  });
  buttons.jeu = { group: pedestal, cap: null, capMat: gripMat, ringMat: knobMat, ring: null, hover: 0, press: 0, base: hdr(1.2, 0.8, 0.2) };

  // Contenu de l'hologramme : destination survolée ou choisie
  function drawHolo(ctx, w, h, t) {
    const id = status.selected || status.hover || status.target;
    const d = id ? (id === 'jeu' ? MANUAL : DESTINATIONS[id]) : null;
    const col = d ? d.color : '#22e4ff';
    const locked = Boolean(status.selected) || (status.target && status.target === id);
    ctx.fillStyle = 'rgba(6,6,24,0.97)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = status.power;
    ctx.strokeStyle = col;
    ctx.lineWidth = 3;
    // Cadre à coins coupés
    const m = 18;
    ctx.beginPath();
    ctx.moveTo(m + 30, m);
    ctx.lineTo(w - m, m);
    ctx.lineTo(w - m, h - m - 30);
    ctx.lineTo(w - m - 30, h - m);
    ctx.lineTo(m, h - m);
    ctx.lineTo(m, m + 30);
    ctx.closePath();
    ctx.globalAlpha = 0.6 * status.power;
    ctx.stroke();
    ctx.globalAlpha = status.power;
    // Anneaux qui tournent (à gauche)
    const cx = 200;
    const cy = h / 2 + 10;
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < 3; i++) {
      ctx.rotate(t * (0.6 + i * 0.35) * (i % 2 ? -1 : 1));
      ctx.beginPath();
      ctx.arc(0, 0, 70 + i * 34, 0.2, Math.PI * 1.3 + i * 0.3);
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.85 - i * 0.22;
      ctx.lineWidth = 6 - i * 1.5;
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = status.power;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.font = '700 88px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = col;
    ctx.shadowBlur = 24;
    ctx.fillText(d ? (id === 'esgi-bot' ? '▲' : id === 'qg' ? '◎' : id === 'labo' ? '⬡' : '✜') : '◇', 0, 4);
    ctx.restore();
    // Textes
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '4px';
    ctx.font = '600 26px "JetBrains Mono", monospace';
    ctx.fillStyle = col;
    ctx.fillText(d ? (locked ? 'CAP VERROUILLÉ' : 'DESTINATION') : 'ORDINATEUR DE BORD', 380, 96);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
    ctx.font = '700 62px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(d ? d.name : 'CHOISIS TA', 380, 172);
    if (!d) ctx.fillText('DESTINATION', 380, 238);
    ctx.font = '500 26px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(220,235,255,0.85)';
    if (d) {
      ctx.fillText(d.tagline, 380, 222);
      // Description sur deux lignes
      const words = d.description.split(' ');
      let line = '';
      let y = 290;
      ctx.font = '400 23px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(200,215,245,0.75)';
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > w - 420) {
          ctx.fillText(line, 380, y);
          line = word;
          y += 32;
          if (y > 360) break;
        } else line = test;
      }
      if (y <= 360) ctx.fillText(line, 380, y);
      ctx.font = '600 24px "JetBrains Mono", monospace';
      ctx.fillStyle = col;
      ctx.fillText(d.distance ? `DISTANCE ${d.distance}` : 'MODE ARCADE', 380, h - 70);
      const blink = Math.floor(t * 2.5) % 2;
      ctx.fillStyle = blink ? '#ffffff' : col;
      ctx.textAlign = 'right';
      ctx.fillText(status.selected ? 'SAUT EN COURS ▶▶' : locked ? 'AUTOPILOTE OU LEVIERS' : `[ ${d.command} ]`, w - 50, h - 70);
      ctx.textAlign = 'left';
    } else {
      ctx.font = '500 24px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(169,179,214,0.85)';
      ctx.fillText('LA TOUR · MISSIONS · LABORATOIRE', 380, 300);
      ctx.fillText('puis autopilote ou leviers de pilotage', 380, 336);
    }
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    ctx.globalAlpha = 1;
  }

  // ---- Éclairage ----
  scene.add(new THREE.AmbientLight(0x1b2444, 0.7));
  scene.add(new THREE.HemisphereLight(0x5a78c8, 0x0a0614, 0.45));
  const deskLight = new THREE.PointLight(0x22e4ff, 2.2, 3.2, 1.6);
  deskLight.position.set(0, DESK_Y + 0.45, -1.3);
  scene.add(deskLight);
  const ceilingLight = new THREE.PointLight(0x8b5cf6, 2.6, 4.5, 1.6);
  ceilingLight.position.set(0, HEAD + 0.1, -0.4);
  scene.add(ceilingLight);
  const alertLight = new THREE.PointLight(0xff3dbb, 0, 5, 1.4);
  alertLight.position.set(0, 1.8, 0.2);
  scene.add(alertLight);

  // ---- NOVA : posée au-dessus du tableau de bord, à droite ----
  const nova = createCompanion(scene, camera, glows);
  const novaAnchor = { x: 0.62, y: 0.14, z: -1.45, scale: 0.2 };

  // ---- Interaction : survol et clic sur les commandes ----
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-10, -10);
  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  let enabled = true;
  let onCommand = () => {};
  let onHover = () => {};
  let hovered = null;

  const navFace = navScreen.children[1];
  function pick(clientX, clientY) {
    pointer.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([...hitTargets, navFace], false)[0];
    if (!hit) return null;
    if (hit.object.userData.command === 'vol' && hit.uv) {
      // Côté gauche (vu du pilote) = 0, côté droit = 1 ; un peu de marge aux bouts
      const v = Math.min(1, Math.max(0, (1 - hit.uv.x - 0.06) / 0.88));
      return `vol:${v.toFixed(3)}`;
    }
    if (hit.object === navFace && hit.uv) {
      // Même placement que le dessin de la carte (canvas 512 × 288)
      const cw = 512;
      const ch = 288;
      const u = hit.uv.x * cw;
      const v = (1 - hit.uv.y) * ch;
      let best = null;
      let bestD = 46;
      Object.entries(navPoints).forEach(([id, [x, y]]) => {
        const d = Math.hypot(u - (22 + x * (cw - 44)), v - (60 + y * (ch - 76)));
        if (d < bestD) {
          bestD = d;
          best = id;
        }
      });
      return best;
    }
    return hit.object.userData.command;
  }

  function setHover(id) {
    if (hovered === id) return;
    hovered = id;
    status.hover = id;
    onHover(id);
  }

  const canvas = ship.renderer.domElement;
  let drag = null;
  canvas.addEventListener('pointermove', (e) => {
    if (!enabled) return;
    if (e.pointerType === 'mouse') {
      look.tx = (e.clientX / window.innerWidth) * 2 - 1;
      look.ty = (e.clientY / window.innerHeight) * 2 - 1;
    } else if (drag) {
      // Au doigt : on fait glisser pour regarder autour de soi
      look.tx = THREE.MathUtils.clamp(drag.lx - (e.clientX - drag.x) / (window.innerWidth * 0.5), -1, 1);
      look.ty = THREE.MathUtils.clamp(drag.ly - (e.clientY - drag.y) / (window.innerHeight * 0.5), -1, 1);
    }
    const id = pick(e.clientX, e.clientY);
    if (drag && drag.vol && id && id.startsWith('vol:')) onCommand(id);
    setHover(id && id.startsWith('vol:') ? 'vol' : id);
    canvas.style.cursor = id ? 'pointer' : 'default';
  });
  canvas.addEventListener('pointerdown', (e) => {
    if (!enabled) return;
    drag = { x: e.clientX, y: e.clientY, lx: look.tx, ly: look.ty, moved: false };
    const id = pick(e.clientX, e.clientY);
    if (id && id.startsWith('vol:')) {
      drag.vol = true;
      onCommand(id);
    }
  });
  canvas.addEventListener('pointerup', (e) => {
    if (!enabled) return;
    const moved = drag && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8;
    const wasVol = drag && drag.vol;
    drag = null;
    if (moved || wasVol) return;
    const id = pick(e.clientX, e.clientY);
    if (id) onCommand(id);
  });
  canvas.addEventListener('pointerleave', () => {
    look.tx = 0;
    look.ty = 0;
    setHover(null);
  });

  // ---- Animation ----
  const shake = { amount: 0 };
  const fov = { base: 62, extra: 0 };
  const glowBoost = { value: 1 };
  let blinkAcc = 0;
  const tmpColor = new THREE.Color();

  function fitCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    // Écran étroit (téléphone) : on élargit le champ pour garder les commandes
    fov.base = THREE.MathUtils.clamp(THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(31)) / Math.min(aspect, 1.6) * 1.6)), 60, 92);
    camera.updateProjectionMatrix();
    glows.resize(ship.bufferHeight, camera.fov);
    nova.resize(ship.bufferHeight, camera.fov);
    warp.resize(window.innerWidth, window.innerHeight);
  }
  fitCamera();

  const lookTarget = new THREE.Vector3();
  function update(delta, t) {
    status.time = t;
    // Regard : la souris fait tourner la tête du pilote
    const k = 1 - Math.exp(-delta * 4);
    look.x += (look.tx - look.x) * k;
    look.y += (look.ty - look.y) * k;
    // Souris à droite : le pilote tourne la tête vers la droite
    const yaw = look.x * (IS_TOUCH ? 0.45 : 0.26);
    const pitch = -look.y * 0.12;
    const breathe = REDUCED_MOTION ? 0 : Math.sin(t * 0.9) * 0.006;
    camera.position.set(EYE.x + look.x * 0.06, EYE.y + breathe, EYE.z);
    lookTarget.set(
      EYE.x + Math.sin(yaw) * 3.3,
      LOOK.y + Math.tan(pitch) * 3.3,
      EYE.z - Math.cos(yaw) * 3.3
    );
    camera.lookAt(lookTarget);
    if (shake.amount > 0) {
      camera.position.x += (Math.random() - 0.5) * shake.amount * 0.02;
      camera.position.y += (Math.random() - 0.5) * shake.amount * 0.02;
      camera.rotation.z += (Math.random() - 0.5) * shake.amount * 0.01;
    }
    const wantFov = fov.base + fov.extra;
    if (Math.abs(camera.fov - wantFov) > 0.01) {
      camera.fov = wantFov;
      camera.updateProjectionMatrix();
    }

    // Néons : allumage progressif puis intensité pilotée par le saut
    const pw = status.power * glowBoost.value;
    ledCyan.color.copy(ledCyanBase).multiplyScalar(pw);
    ledViolet.color.copy(ledVioletBase).multiplyScalar(pw);
    deskMat.emissiveIntensity = status.power * 0.32 * glowBoost.value;
    deskLight.intensity = 2.2 * status.power;
    ceilingLight.intensity = 2.6 * status.power;

    // Boutons : survol (le bouton s'allume et monte), appui
    Object.entries(buttons).forEach(([id, b]) => {
      const want = hovered === id || status.selected === id || status.target === id || (id === 'engage' && status.target) ? 1 : 0;
      b.hover += (want - b.hover) * (1 - Math.exp(-delta * 10));
      b.press = Math.max(0, b.press - delta * 2.5);
      const pulse = 0.75 + 0.25 * Math.sin(t * 3 + id.length);
      const glow = (0.35 + b.hover * 1.3) * pulse * status.power;
      b.ringMat.color.copy(b.base).multiplyScalar(glow);
      if (id === 'jeu') {
        // Leviers : suivent un peu la souris, tirés quand on les prend,
        // poussés vers l'avant pendant le saut
        levers.forEach((l) => {
          l.pivot.rotation.x = -0.3 + status.engine * 0.65 - b.press * 0.35 + look.y * 0.12 * l.side * 0 + b.hover * 0.06;
          l.pivot.rotation.z = -look.x * 0.12;
        });
        b.capMat.emissiveIntensity = 0.12 + b.hover * 0.4;
      } else {
        b.cap.position.y = 0.045 + b.hover * 0.006 - b.press * 0.022;
        b.capMat.emissiveIntensity = (0.45 + b.hover * 1.4) * status.power;
      }
    });

    // Interrupteurs : bascule douce, voyant allumé quand actif
    Object.entries(toggles).forEach(([id, tg]) => {
      tg.hover += ((hovered === `tool:${id}` ? 1 : 0) - tg.hover) * (1 - Math.exp(-delta * 10));
      tg.press = Math.max(0, tg.press - delta * 2.5);
      tg.cap.position.y = 0.04 + tg.hover * 0.004 - tg.press * 0.016;
      // Allumé = actif ; éteint (presque noir) = coupé
      tg.capMat.emissiveIntensity = ((tg.on ? 0.55 : 0.04) + tg.hover * 0.5) * status.power;
      tg.ringMat.color.copy(tg.rgb).multiplyScalar(((tg.on ? 0.55 : 0.05) + tg.hover * 0.4) * status.power);
    });

    // Barre de volume : segments du rose au violet, éteints au-delà du niveau
    const lit = volMuted ? 0 : Math.round(volume * VOL_SEGS);
    const vh = hovered === 'vol' ? 0.35 : 0;
    volSegs.forEach((m, i) => {
      if (i < lit) m.color.setRGB(1.3 - i * 0.05, 0.25 + i * 0.02, 0.9 + i * 0.05).multiplyScalar((0.55 + vh) * status.power);
      else m.color.setRGB(0.06, 0.07, 0.12).multiplyScalar(status.power + vh);
    });

    // Petits boutons latéraux qui clignotent
    blinkAcc += delta;
    if (blinkAcc > 0.18) {
      blinkAcc = 0;
      for (let i = 0; i < 6; i++) {
        const n = Math.floor(Math.random() * KEYS);
        const s = keyState[n];
        if (!s.blink) continue;
        s.on = !s.on;
        tmpColor.copy(keyColors[s.on ? s.c : 4]).multiplyScalar(status.power);
        keys.setColorAt(n, tmpColor);
      }
      keys.instanceColor.needsUpdate = true;
    }

    // Écrans redessinés une dizaine de fois par seconde (pas à chaque image)
    screens.forEach((s) => {
      s.acc += delta;
      if (s.acc >= s.every) {
        s.acc = 0;
        s.scr.redraw(t);
      }
    });

    sweepMat.uniforms.uAngle.value = (t * 1.8) % (Math.PI * 2);
    sweepMat.uniforms.uPower.value = status.power;
    space.update(t, camera);
    warp.update(delta, t);
    nova.update(delta, t, { anchor: novaAnchor, portrait: camera.aspect < 1, progress: 0, idle: 0, verticalSpeed: 0 });
    scene.updateMatrixWorld();
    glows.update(t);
  }

  return {
    scene,
    camera,
    space,
    warp,
    nova,
    status,
    shake,
    fov,
    glowBoost,
    alertLight,
    buttons,
    update,
    fitCamera,
    setHover,
    press(id) {
      if (buttons[id]) buttons[id].press = 1;
    },
    /** Barre de volume : niveau (0 à 1), éteinte si la musique est coupée */
    setVolume(v, muted = false) {
      volume = v;
      volMuted = muted;
    },
    /** Appui visuel sur un petit bouton (SUIVANTE) */
    pressToggle(id) {
      if (toggles[id]) toggles[id].press = 1;
    },
    /** Interrupteur du tableau de bord : music, sound, lite */
    setToggle(id, on) {
      if (!toggles[id]) return;
      const tg = toggles[id];
      if (tg.on !== on) tg.press = 1;
      tg.on = on;
      tg.labelMat.map = on ? tg.texOn : tg.texOff;
    },
    set onCommand(fn) {
      onCommand = fn;
    },
    set onHover(fn) {
      onHover = fn;
    },
    set enabled(v) {
      enabled = v;
      if (!v) {
        setHover(null);
        canvas.style.cursor = 'default';
      }
    },
    get enabled() {
      return enabled;
    }
  };
}
