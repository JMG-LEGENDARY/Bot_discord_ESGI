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
  const ledCyan = new THREE.MeshBasicMaterial({ color: hdr(0.08, 0.5, 0.8), toneMapped: false });
  const ledViolet = new THREE.MeshBasicMaterial({ color: hdr(0.4, 0.13, 0.8), toneMapped: false });
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
  const status = { hover: null, selected: null, hyper: 0, engine: 0, power: 0, time: 0 };
  const screens = [];
  function addScreen(phi, r, y, w, h, drawFn, tilt = -0.35) {
    const scr = createCanvasScreen(512, Math.round((512 * h) / w), drawFn);
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
    screens.push({ scr, face, every: 0.11 + screens.length * 0.013, acc: Math.random() * 0.1 });
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

  // Écran droit : carte de navigation (les trois destinations)
  const navPoints = {
    'esgi-bot': [0.72, 0.3],
    qg: [0.28, 0.32],
    labo: [0.5, 0.78]
  };
  addScreen(Math.PI - 0.56, 1.42, DESK_Y + 0.2, 0.52, 0.31, (ctx, w, h, t) => {
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
    const target = status.selected || status.hover;
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
  function addButton(id, phi, r, size) {
    const d = DESTINATIONS[id];
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
        map: createLabelTexture(d.command === 'AUTOPILOT' ? '➤' : d.command === 'MISSIONS' ? '◎' : '⬡', { color: '#ffffff', size: 92, width: 128, height: 128 }),
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
      new THREE.PlaneGeometry(0.3, 0.075),
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
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(size * 1.9, size * 1.9, 0.2, 16), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 0.06;
    hit.userData.command = id;
    group.add(hit);
    hitTargets.push(hit);
    glows.add(ring, new THREE.Vector3(0, 0, 0), d.hdr.map((v) => v * 0.8), 0.06);
    buttons[id] = { group, cap, capMat, ringMat, ring, hover: 0, press: 0, base: new THREE.Color(...d.hdr) };
  }
  addButton('esgi-bot', Math.PI, 1.02, 0.07);
  addButton('qg', Math.PI + 0.36, 1.0, 0.058);
  addButton('labo', Math.PI - 0.36, 1.0, 0.058);

  // ---- Manche du pilotage manuel (à droite) ----
  const stick = new THREE.Group();
  stick.position.copy(polar(0.98, Math.PI - 0.78, DESK_Y));
  stick.rotation.y = Math.PI - 0.78;
  room.add(stick);
  const stickBase = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), gunmetal);
  stick.add(stickBase);
  const gimbal = new THREE.Group();
  gimbal.position.y = 0.04;
  stick.add(gimbal);
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.2, 12), chrome);
  shaft.position.y = 0.1;
  gimbal.add(shaft);
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x232a3d, metalness: 0.4, roughness: 0.55 });
  const grip = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.09, 6, 12), gripMat);
  grip.position.y = 0.22;
  grip.rotation.x = -0.25;
  gimbal.add(grip);
  const trigger = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 8), new THREE.MeshBasicMaterial({ color: hdr(2.2, 1.5, 0.3), toneMapped: false }));
  trigger.position.set(0, 0.275, 0.012);
  gimbal.add(trigger);
  const stickRing = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.006, 6, 48), new THREE.MeshBasicMaterial({ color: hdr(2.0, 1.4, 0.3), toneMapped: false }));
  stickRing.rotation.x = Math.PI / 2;
  stickRing.position.y = 0.004;
  stick.add(stickRing);
  const stickLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.075),
    new THREE.MeshBasicMaterial({
      map: createLabelTexture('PILOTAGE', { color: MANUAL.color, size: 54, width: 512, height: 128, sub: 'MANUEL' }),
      transparent: true,
      depthWrite: false,
      toneMapped: false
    })
  );
  stickLabel.rotation.x = -Math.PI / 2 - 0.5;
  stickLabel.rotation.z = Math.PI;
  stickLabel.position.set(0, 0.035, -0.17);
  stick.add(stickLabel);
  const stickHit = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.5, 12), new THREE.MeshBasicMaterial({ visible: false }));
  stickHit.position.y = 0.2;
  stickHit.userData.command = 'jeu';
  stick.add(stickHit);
  hitTargets.push(stickHit);
  buttons.jeu = { group: stick, cap: grip, capMat: gripMat, ringMat: stickRing.material, ring: stickRing, hover: 0, press: 0, base: hdr(2.0, 1.4, 0.3) };

  // ---- Manette des gaz (à gauche) : avance pendant le saut ----
  const throttle = new THREE.Group();
  throttle.position.copy(polar(0.98, Math.PI + 0.78, DESK_Y));
  throttle.rotation.y = Math.PI + 0.78;
  room.add(throttle);
  const slot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.24), darkMetal);
  slot.position.y = 0.01;
  throttle.add(slot);
  const lever = new THREE.Group();
  throttle.add(lever);
  const leverArm = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.16, 0.018), chrome);
  leverArm.position.y = 0.08;
  lever.add(leverArm);
  const leverHead = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.035, 0.05), new THREE.MeshStandardMaterial({ color: 0x2a3148, metalness: 0.5, roughness: 0.4, emissive: 0x22e4ff, emissiveIntensity: 0.15 }));
  leverHead.position.y = 0.165;
  lever.add(leverHead);
  lever.position.z = -0.08;

  // ---- Projecteur holographique (au centre, devant la vitre) ----
  const holo = createCanvasScreen(1024, 560, (ctx, w, h, t) => drawHolo(ctx, w, h, t));
  const holoMat = new THREE.ShaderMaterial({
    uniforms: { map: { value: holo.texture }, uTime: { value: 0 }, uPower: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
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
      uniform float uPower;
      varying vec2 vUv;
      void main() {
        // Petites ondulations horizontales, lignes de balayage, scintillement
        vec2 uv = vUv;
        uv.x += sin(uv.y * 80.0 + uTime * 9.0) * 0.0012;
        vec4 tex = texture2D(map, uv);
        float lines = 0.82 + 0.18 * sin(vUv.y * 420.0 - uTime * 6.0);
        float flicker = 0.94 + 0.06 * sin(uTime * 31.0) * sin(uTime * 7.3);
        float edge = smoothstep(0.0, 0.04, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
        vec3 col = tex.rgb * lines * flicker * edge * uPower * 1.9;
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `
  });
  const holoPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 0.536), holoMat);
  holoPlane.position.copy(polar(1.78, Math.PI, DESK_Y + 0.42));
  holoPlane.lookAt(EYE.x, EYE.y - 0.05, EYE.z);
  holoPlane.renderOrder = 20;
  room.add(holoPlane);
  // Émetteur et cône de lumière
  const emitter = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.025, 32), chrome);
  emitter.position.copy(polar(1.72, Math.PI, DESK_Y + 0.0125));
  room.add(emitter);
  const emitterGlow = new THREE.Mesh(new THREE.CircleGeometry(0.075, 32), ledCyan);
  emitterGlow.rotation.x = -Math.PI / 2;
  emitterGlow.position.copy(polar(1.72, Math.PI, DESK_Y + 0.026));
  room.add(emitterGlow);
  const coneMat = new THREE.ShaderMaterial({
    uniforms: { uPower: { value: 0 }, uColor: { value: new THREE.Color(0.2, 0.9, 1.4) } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform float uPower;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float a = (1.0 - vUv.y) * 0.16 * uPower;
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `
  });
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.07, 0.3, 32, 1, true), coneMat);
  cone.position.copy(polar(1.72, Math.PI, DESK_Y + 0.17));
  room.add(cone);

  // Contenu de l'hologramme : destination survolée ou choisie
  function drawHolo(ctx, w, h, t) {
    const id = status.selected || status.hover;
    const d = id ? (id === 'jeu' ? MANUAL : DESTINATIONS[id]) : null;
    const col = d ? d.color : '#22e4ff';
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
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;
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
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.font = '700 88px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = col;
    ctx.shadowBlur = 24;
    ctx.fillText(d ? (id === 'esgi-bot' ? '➤' : id === 'qg' ? '◎' : id === 'labo' ? '⬡' : '✜') : '◇', 0, 4);
    ctx.restore();
    // Textes
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '4px';
    ctx.font = '600 26px "JetBrains Mono", monospace';
    ctx.fillStyle = col;
    ctx.fillText(d ? (status.selected ? 'CAP VERROUILLÉ' : 'DESTINATION') : 'ORDINATEUR DE BORD', 380, 96);
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
      ctx.fillText(status.selected ? 'SAUT EN COURS ▶▶' : `[ ${d.command} ]`, w - 50, h - 70);
      ctx.textAlign = 'left';
    } else {
      ctx.font = '500 24px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(169,179,214,0.85)';
      ctx.fillText('AUTOPILOT · MISSIONS · LABORATOIRE', 380, 300);
      ctx.fillText('ou prends le manche : PILOTAGE MANUEL', 380, 336);
    }
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
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

  function pick(clientX, clientY) {
    pointer.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(hitTargets, false)[0];
    return hit ? hit.object.userData.command : null;
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
    setHover(id);
    canvas.style.cursor = id ? 'pointer' : 'default';
  });
  canvas.addEventListener('pointerdown', (e) => {
    if (!enabled) return;
    drag = { x: e.clientX, y: e.clientY, lx: look.tx, ly: look.ty, moved: false };
  });
  canvas.addEventListener('pointerup', (e) => {
    if (!enabled) return;
    const moved = drag && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8;
    drag = null;
    if (moved) return;
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
    holoMat.uniforms.uTime.value = t;
    holoMat.uniforms.uPower.value = status.power;
    coneMat.uniforms.uPower.value = status.power;

    // Boutons : survol (le bouton s'allume et monte), appui
    Object.entries(buttons).forEach(([id, b]) => {
      const want = hovered === id || status.selected === id ? 1 : 0;
      b.hover += (want - b.hover) * (1 - Math.exp(-delta * 10));
      b.press = Math.max(0, b.press - delta * 2.5);
      const pulse = 0.75 + 0.25 * Math.sin(t * 3 + id.length);
      const glow = (0.35 + b.hover * 1.3) * pulse * status.power;
      b.ringMat.color.copy(b.base).multiplyScalar(glow);
      if (id === 'jeu') {
        gimbal.rotation.x = look.y * 0.25 + b.press * 0.3;
        gimbal.rotation.z = -look.x * 0.3;
        b.capMat.emissive.set(0xffd166);
        b.capMat.emissiveIntensity = b.hover * 0.25;
      } else {
        b.cap.position.y = 0.045 + b.hover * 0.006 - b.press * 0.022;
        b.capMat.emissiveIntensity = (0.45 + b.hover * 1.4) * status.power;
      }
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
    holoAcc += delta;
    if (holoAcc > 0.07) {
      holoAcc = 0;
      holo.redraw(t);
    }

    // Manette des gaz poussée vers l'avant pendant le saut
    lever.position.z = -0.08 + status.engine * 0.16;
    lever.rotation.x = status.engine * 0.5;

    space.update(t, camera);
    warp.update(delta, t);
    nova.update(delta, t, { anchor: novaAnchor, portrait: camera.aspect < 1, progress: 0, idle: 0, verticalSpeed: 0 });
    scene.updateMatrixWorld();
    glows.update(t);
  }
  let holoAcc = 0;

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
