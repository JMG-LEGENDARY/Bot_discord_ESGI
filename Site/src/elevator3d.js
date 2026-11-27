import * as THREE from 'three';
import { api } from './api.js';
import { createElevatorMusic } from './elevator-music.js';

// =========================================================================
// L'ASCENSEUR EN 3D
// Cabine de luxe art déco : noyer laqué en panneaux à filets d'or,
// soubassement en marbre noir veiné d'or, corniche lumineuse, plafond à
// caissons, sol en marbre et rosace dorée. Portes dorées à éventails avec
// cadran à aiguille, et à droite un tableau en laiton et verre noir assorti,
// dont l'écran ambré fait défiler les noms des étages.
// Étages = comptes Discord liés au bot, par ordre alphabétique ; on ne peut
// aller qu'à SON étage (connexion avec Discord).
// =========================================================================

// La cabine est construite à l'écart de la ville (sous le sol, invisible d'en haut)
const ORIGIN = new THREE.Vector3(0, -300, 0);
const ROOM = { w: 2.5, h: 2.7, front: -1.15, back: 1.7 };
const DOOR = { x: -0.32, w: 1.12, h: 2.15 };
const PANEL = { x: 0.8, y: 1.62, w: 0.6, h: 1.14 };
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

const GOLD = '#d4af6a';
const GOLD_LIGHT = '#f2d79a';
const GOLD_DARK = '#8a6a34';

// Veinage du noyer : flammes et fils, sur un fond brun profond
function drawWalnut(ctx, w, h) {
  const bg = ctx.createLinearGradient(0, 0, w, 0);
  bg.addColorStop(0, '#2a150b');
  bg.addColorStop(0.5, '#3f2213');
  bg.addColorStop(1, '#2c170c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 140; i++) {
    const x0 = Math.random() * w;
    const amp = 2 + Math.random() * 10;
    const freq = 0.004 + Math.random() * 0.01;
    ctx.strokeStyle = Math.random() < 0.55
      ? `rgba(20, 8, 3, ${0.12 + Math.random() * 0.2})`
      : `rgba(150, 90, 50, ${0.06 + Math.random() * 0.1})`;
    ctx.lineWidth = 0.6 + Math.random() * 2.2;
    ctx.beginPath();
    for (let y = 0; y <= h; y += 16) {
      const x = x0 + Math.sin(y * freq + i) * amp + Math.sin(y * freq * 3.1) * amp * 0.3;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // Reflet vertical du vernis
  const sheen = ctx.createLinearGradient(0, 0, w, 0);
  sheen.addColorStop(0, 'rgba(255,220,180,0)');
  sheen.addColorStop(0.42, 'rgba(255,220,180,0.06)');
  sheen.addColorStop(0.5, 'rgba(255,220,180,0.12)');
  sheen.addColorStop(0.58, 'rgba(255,220,180,0.06)');
  sheen.addColorStop(1, 'rgba(255,220,180,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);
}

// Noyer laqué uni
function woodTexture() {
  return canvasTexture(512, 1024, (ctx, w, h) => drawWalnut(ctx, w, h));
}

// Boiserie : noyer avec des panneaux encadrés de filets d'or (partie haute du mur)
function woodPanelTexture(cols) {
  return canvasTexture(512 * cols, 1024, (ctx, w, h) => {
    drawWalnut(ctx, w, h);
    const top = h * 0.07;
    const bottom = h * 0.6; // le soubassement en marbre couvre le bas
    const colW = w / cols;
    for (let c = 0; c < cols; c++) {
      const x = c * colW + colW * 0.12;
      const pw = colW * 0.76;
      // Ombre du panneau en creux
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(x, top, pw, bottom - top);
      // Double filet d'or
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 5;
      ctx.strokeRect(x, top, pw, bottom - top);
      ctx.strokeStyle = 'rgba(242, 215, 154, 0.55)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 16, top + 16, pw - 32, bottom - top - 32);
      // Coins en quart de cercle (art déco)
      ctx.lineWidth = 3;
      ctx.strokeStyle = GOLD;
      [[x + 16, top + 16, 0], [x + pw - 16, top + 16, Math.PI / 2], [x + pw - 16, bottom - 16, Math.PI], [x + 16, bottom - 16, Math.PI * 1.5]]
        .forEach(([cx, cy, a]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 28, a, a + Math.PI / 2);
          ctx.stroke();
        });
      // Petit losange doré au centre du panneau
      const mx = x + pw / 2;
      const my = (top + bottom) / 2;
      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.moveTo(mx, my - 26);
      ctx.lineTo(mx + 14, my);
      ctx.lineTo(mx, my + 26);
      ctx.lineTo(mx - 14, my);
      ctx.closePath();
      ctx.fill();
    }
  });
}

// Marbre noir veiné d'or (soubassement)
function blackMarbleTexture() {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = '#0c0a0a';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) {
      const gold = i % 3 === 0;
      ctx.strokeStyle = gold ? `rgba(212, 175, 106, ${0.35 + Math.random() * 0.35})` : `rgba(255, 255, 255, ${0.04 + Math.random() * 0.06})`;
      ctx.lineWidth = gold ? 1 + Math.random() * 1.5 : 1 + Math.random() * 3;
      ctx.beginPath();
      let x = Math.random() * w;
      let y = Math.random() * h;
      ctx.moveTo(x, y);
      for (let k = 0; k < 7; k++) {
        x += (Math.random() - 0.3) * 180;
        y += (Math.random() - 0.5) * 90;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });
}

// Battant de porte : bronze foncé brossé, éventails en or poli (le motif du milieu)
function doorLeafTexture(mirror) {
  return canvasTexture(256, 512, (ctx, w, h) => {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#3a2a18');
    bg.addColorStop(0.5, '#4c3720');
    bg.addColorStop(1, '#2e2112');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(255, 220, 160, ${Math.random() * 0.05})`;
      ctx.fillRect(0, Math.random() * h, w, 0.7);
    }
    ctx.save();
    if (mirror) {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, GOLD_LIGHT);
    goldGrad.addColorStop(0.5, GOLD);
    goldGrad.addColorStop(1, GOLD_DARK);
    // Double cadre doré
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 5;
    ctx.strokeRect(14, 14, w - 14, h - 28);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(24, 24, w - 24, h - 48);
    // Trois éventails, ancrés là où les battants se touchent
    for (let k = 0; k < 3; k++) {
      const cx = w;
      const cy = 150 + k * 140;
      const r = 112;
      const fill = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
      fill.addColorStop(0, 'rgba(242, 215, 154, 0.38)');
      fill.addColorStop(1, 'rgba(212, 175, 106, 0.1)');
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, Math.PI, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 3.5;
      ctx.stroke();
      for (let q = 1; q <= 6; q++) {
        const a = Math.PI + (q / 7) * (Math.PI / 2);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 30, cy + Math.sin(a) * 30);
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.stroke();
      }
      [r * 0.72, r * 0.45].forEach((rr) => {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, Math.PI, Math.PI * 1.5);
        ctx.stroke();
      });
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy);
      ctx.lineTo(cx - 5, cy + 36);
      ctx.stroke();
    }
    // Plinthe dorée en gradins
    ctx.fillStyle = goldGrad;
    ctx.fillRect(14, h - 58, w - 14, 6);
    ctx.fillRect(14, h - 46, w - 14, 3);
    ctx.restore();
  });
}

// Sol : marbre crème bordé de marbre noir, filet d'or et rosace au centre
function marbleTexture() {
  return canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#0d0b0a';
    ctx.fillRect(0, 0, w, h);
    const m = 96;
    ctx.fillStyle = '#e6dccb';
    ctx.fillRect(m, m, w - m * 2, h - m * 2);
    for (let i = 0; i < 36; i++) {
      ctx.strokeStyle = `rgba(150, 128, 100, ${0.06 + Math.random() * 0.12})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      let x = m + Math.random() * (w - m * 2);
      let y = m + Math.random() * (h - m * 2);
      ctx.moveTo(x, y);
      for (let k = 0; k < 7; k++) {
        x += (Math.random() - 0.5) * 150;
        y += (Math.random() - 0.3) * 110;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 8;
    ctx.strokeRect(m - 4, m - 4, w - m * 2 + 8, h - m * 2 + 8);
    ctx.lineWidth = 3;
    ctx.strokeRect(m + 18, m + 18, w - m * 2 - 36, h - m * 2 - 36);
    const c = w / 2;
    [[300, '#0d0b0a'], [286, GOLD], [276, '#1a1512'], [230, '#e6dccb']].forEach(([r, col]) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.fill();
    });
    // Étoile à 16 branches en or, noir et crème
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      const len = k % 2 === 0 ? 222 : 150;
      ctx.fillStyle = k % 4 === 0 ? GOLD : k % 2 === 0 ? '#1a1512' : '#b8925a';
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * len, c + Math.sin(a) * len);
      ctx.lineTo(c + Math.cos(a + 0.2) * 46, c + Math.sin(a + 0.2) * 46);
      ctx.lineTo(c, c);
      ctx.lineTo(c + Math.cos(a - 0.2) * 46, c + Math.sin(a - 0.2) * 46);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = GOLD_LIGHT;
    ctx.beginPath();
    ctx.arc(c, c, 26, 0, Math.PI * 2);
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

// Plafond à caissons en noyer, filets d'or
function ceilingTexture() {
  return canvasTexture(1024, 1024, (ctx, w, h) => {
    drawWalnut(ctx, w, h);
    const n = 3;
    const cell = w / n;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = i * cell + 18;
        const y = j * cell + 18;
        const s = cell - 36;
        ctx.fillStyle = 'rgba(0,0,0,0.28)';
        ctx.fillRect(x, y, s, s);
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 6;
        ctx.strokeRect(x, y, s, s);
        ctx.strokeStyle = 'rgba(242, 215, 154, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 16, y + 16, s - 32, s - 32);
      }
    }
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

// Fond du tableau : cadre en laiton brossé et grande plaque de verre noir
function plateBackground() {
  const cvs = document.createElement('canvas');
  cvs.width = CW * SCALE;
  cvs.height = CH * SCALE;
  const ctx = cvs.getContext('2d');
  ctx.scale(SCALE, SCALE);
  const brassGrad = ctx.createLinearGradient(0, 0, CW, CH);
  brassGrad.addColorStop(0, '#9c7a3e');
  brassGrad.addColorStop(0.3, '#e8cc8e');
  brassGrad.addColorStop(0.55, '#b48f4e');
  brassGrad.addColorStop(0.8, '#e0c283');
  brassGrad.addColorStop(1, '#8e6d35');
  ctx.fillStyle = brassGrad;
  roundRect(ctx, 0, 0, CW, CH, 22);
  ctx.fill();
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(${Math.random() < 0.5 ? '255,245,220' : '80,55,20'},${Math.random() * 0.1})`;
    ctx.fillRect(Math.random() * CW, Math.random() * CH, 20 + Math.random() * 90, 0.6);
  }
  // Verre noir
  const glass = ctx.createLinearGradient(0, 0, CW, CH);
  glass.addColorStop(0, '#16131a');
  glass.addColorStop(0.5, '#0b0a0d');
  glass.addColorStop(1, '#141117');
  ctx.fillStyle = glass;
  roundRect(ctx, 18, 18, CW - 36, CH - 36, 12);
  ctx.fill();
  // Reflet diagonal sur le verre
  ctx.save();
  roundRect(ctx, 18, 18, CW - 36, CH - 36, 12);
  ctx.clip();
  const shine = ctx.createLinearGradient(0, 0, CW, CH * 0.6);
  shine.addColorStop(0, 'rgba(255,255,255,0)');
  shine.addColorStop(0.45, 'rgba(255,255,255,0.05)');
  shine.addColorStop(0.5, 'rgba(255,255,255,0)');
  ctx.fillStyle = shine;
  ctx.fillRect(0, 0, CW, CH);
  ctx.restore();
  // Filet d'or intérieur
  ctx.strokeStyle = 'rgba(212, 175, 106, 0.7)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 28, 28, CW - 56, CH - 56, 8);
  ctx.stroke();
  // Vis dorées
  [[10, 10], [CW - 10, 10], [10, CH - 10], [CW - 10, CH - 10]].forEach(([x, y]) => {
    ctx.fillStyle = '#6e5228';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  return cvs;
}

// ---------------------------------------------------------------------------
export function createElevator3D(scene, { say, onExit, renderer }) {
  const music = createElevatorMusic();

  // « En ce moment » : titre du morceau SoundCloud, avec un lien vers l'artiste
  const nowPlaying = document.createElement('a');
  nowPlaying.id = 'now-playing';
  nowPlaying.target = '_blank';
  nowPlaying.rel = 'noopener noreferrer';
  const nowIcon = document.createElement('span');
  nowIcon.className = 'now-icon';
  nowIcon.textContent = '♪';
  const nowText = document.createElement('span');
  nowText.className = 'now-text';
  const nowSource = document.createElement('span');
  nowSource.className = 'now-source';
  nowSource.textContent = 'SoundCloud';
  nowPlaying.append(nowIcon, nowText, nowSource);
  document.body.appendChild(nowPlaying);
  let currentTrack = null;
  function updateNowPlaying() {
    const show = active && !onFloor && !music.muted && Boolean(currentTrack) && music.source === 'soundcloud';
    nowPlaying.classList.toggle('visible', show);
  }
  music.onFallback = () => updateNowPlaying();
  music.onTrack = (track) => {
    currentTrack = track;
    nowText.textContent = track.artist ? `${track.title} — ${track.artist}` : track.title;
    if (track.url && /^https:\/\/soundcloud\.com\//.test(track.url)) nowPlaying.href = track.url;
    updateNowPlaying();
  };
  if (import.meta.env.DEV) window.__music = music;
  // Reflets propres à la cabine : une pièce neutre et lumineuse (l'or et le
  // vernis ne reflètent plus les néons violets de la ville)
  // (dégradé chaud : bois sombre en bas, lumière crème en haut, sans point
  // trop lumineux qui ferait des reflets éblouissants)
  const envScene = new THREE.Scene();
  const envGradient = canvasTexture(16, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#fff1d6');
    g.addColorStop(0.35, '#b98a52');
    g.addColorStop(0.6, '#4a2e18');
    g.addColorStop(1, '#140c07');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  envScene.add(new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 16),
    new THREE.MeshBasicMaterial({ map: envGradient, side: THREE.BackSide })
  ));
  const pmrem = new THREE.PMREMGenerator(renderer);
  const cabinEnvironment = pmrem.fromScene(envScene, 0.02).texture;
  pmrem.dispose();
  // Lumières de la ville (lune, néon rose…) éteintes pendant qu'on est dedans
  let outdoorLights = [];

  const group = new THREE.Group();
  group.position.copy(ORIGIN);
  group.visible = false;
  scene.add(group);

  // ---------- Matières ----------
  // Noyer verni : couche de vernis brillante (clearcoat), reflets discrets
  const lacquer = (map) => new THREE.MeshPhysicalMaterial({
    map, roughness: 0.42, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 0.3
  });
  const woodMat = lacquer(woodTexture());
  const sidePanelMat = lacquer(woodPanelTexture(3));
  const backPanelMat = lacquer(woodPanelTexture(3));
  const marbleMat = new THREE.MeshPhysicalMaterial({
    map: blackMarbleTexture(), roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 0.5
  });
  const brass = new THREE.MeshStandardMaterial({ color: 0xe2bd76, metalness: 1, roughness: 0.32, envMapIntensity: 0.9 });
  const darkBrass = new THREE.MeshStandardMaterial({ color: 0x7a5a2c, metalness: 1, roughness: 0.3, envMapIntensity: 0.8 });
  const floorMat = new THREE.MeshPhysicalMaterial({ map: marbleTexture(), roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.5 });
  const ceilMat = new THREE.MeshStandardMaterial({ map: ceilingTexture(), roughness: 0.5 });
  const lampMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.9, 0.72).multiplyScalar(1.0), toneMapped: false });
  // Bandeaux lumineux chauds (corniche) : un peu de halo grâce au bloom
  const coveMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.72, 0.38).multiplyScalar(1.2), toneMapped: false });
  const { w: RW, h: RH, front: FZ, back: BZ } = ROOM;
  const depth = BZ - FZ;
  const midZ = (BZ + FZ) / 2;
  const DADO = 0.92; // hauteur du soubassement en marbre

  // ---------- Sol, plafond ----------
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(RW, depth), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, midZ);
  group.add(floor);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(RW, depth), ceilMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, RH, midZ);
  group.add(ceiling);

  // Rosace lumineuse au plafond : anneaux dorés et disque de lumière
  [[0.46, 0.022], [0.38, 0.014]].forEach(([r, t]) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, t, 12, 64), brass);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, RH - 0.03, midZ - 0.1);
    group.add(ring);
  });
  const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.34, 48), lampMat);
  lamp.rotation.x = Math.PI / 2;
  lamp.position.set(0, RH - 0.012, midZ - 0.1);
  group.add(lamp);
  // Spots encastrés cerclés d'or
  [[-0.85, FZ + 0.45], [0.85, FZ + 0.45], [-0.85, BZ - 0.4], [0.85, BZ - 0.4]].forEach(([x, z]) => {
    const spot = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), lampMat);
    spot.rotation.x = Math.PI / 2;
    spot.position.set(x, RH - 0.004, z);
    group.add(spot);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 24), brass);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(x, RH - 0.006, z);
    group.add(rim);
  });

  // Lumière d'ambiance chaude (plafond doré, sol en marbre)
  group.add(new THREE.HemisphereLight(0xffe2b8, 0x3a2414, 0.75));
  const cabinLight = new THREE.PointLight(0xffd6a0, 3.4, 7, 1.4);
  cabinLight.position.set(0, RH - 0.5, BZ - 0.75);
  group.add(cabinLight);
  const doorLight = new THREE.PointLight(0xffe8c8, 0.9, 5, 1.2);
  doorLight.position.set(0.1, 1.1, BZ - 0.5);
  group.add(doorLight);

  // ---------- Murs : boiserie en haut, marbre noir en bas ----------
  function wall(width, x, z, rotY, mat) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(width, RH), mat);
    m.position.set(x, RH / 2, z);
    m.rotation.y = rotY;
    group.add(m);
    // Soubassement en marbre, légèrement en saillie
    const dado = new THREE.Mesh(new THREE.PlaneGeometry(width, DADO), marbleMat);
    dado.position.set(x, DADO / 2, z);
    dado.rotation.y = rotY;
    dado.translateZ(0.006);
    group.add(dado);
    // Cimaise dorée au-dessus du marbre
    const cap = new THREE.Mesh(new THREE.BoxGeometry(width, 0.03, 0.025), brass);
    cap.position.set(x, DADO + 0.012, z);
    cap.rotation.y = rotY;
    cap.translateZ(0.012);
    group.add(cap);
    // Corniche dorée et bandeau lumineux juste dessous
    const crown = new THREE.Mesh(new THREE.BoxGeometry(width, 0.07, 0.06), darkBrass);
    crown.position.set(x, RH - 0.035, z);
    crown.rotation.y = rotY;
    crown.translateZ(0.03);
    group.add(crown);
    const cove = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.04, 0.018), coveMat);
    cove.position.set(x, RH - 0.08, z);
    cove.rotation.y = rotY;
    cove.translateZ(0.05);
    group.add(cove);
  }
  wall(depth, -RW / 2, midZ, Math.PI / 2, sidePanelMat);
  wall(depth, RW / 2, midZ, -Math.PI / 2, sidePanelMat);
  wall(RW, 0, BZ, Math.PI, backPanelMat);

  [-1, 1].forEach((s) => {
    // Main courante en laiton poli, au-dessus du marbre
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, depth - 0.5, 18), brass);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(s * (RW / 2 - 0.075), DADO + 0.08, midZ);
    group.add(rail);
    [FZ + 0.4, BZ - 0.35].forEach((z) => {
      const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 10), brass);
      bracket.rotation.z = Math.PI / 2;
      bracket.position.set(s * (RW / 2 - 0.035), DADO + 0.08, z);
      group.add(bracket);
    });
    // Embouts sphériques
    [FZ + 0.25 + 0.0, BZ - 0.25].forEach((z, k) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.032, 16, 12), brass);
      cap.position.set(s * (RW / 2 - 0.075), DADO + 0.08, k === 0 ? midZ - (depth - 0.5) / 2 : midZ + (depth - 0.5) / 2);
      group.add(cap);
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
    // Marbre en bas, comme sur les autres murs
    if (y0 === 0) {
      const dado = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, DADO), marbleMat);
      dado.position.set((x0 + x1) / 2, DADO / 2, FZ + 0.004);
      group.add(dado);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.03, 0.025), brass);
      cap.position.set((x0 + x1) / 2, DADO + 0.012, FZ + 0.012);
      group.add(cap);
    }
  }
  frontPiece(-RW / 2, doorL - 0.1, 0, RH);
  frontPiece(doorR + 0.1, RW / 2, 0, RH);
  frontPiece(doorL - 0.1, doorR + 0.1, DOOR.h + 0.1, RH);
  // Corniche et bandeau lumineux sur le mur de la porte
  const frontCrown = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.07, 0.06), darkBrass);
  frontCrown.position.set(0, RH - 0.035, FZ + 0.03);
  group.add(frontCrown);
  const frontCove = new THREE.Mesh(new THREE.PlaneGeometry(RW - 0.04, 0.018), coveMat);
  frontCove.position.set(0, RH - 0.08, FZ + 0.05);
  group.add(frontCove);

  // Tableau de la porte : remplit l'épaisseur du mur autour de l'ouverture
  [[doorL - 0.05, DOOR.h / 2 + 0.05, 0.1, DOOR.h + 0.1], [doorR + 0.05, DOOR.h / 2 + 0.05, 0.1, DOOR.h + 0.1],
    [DOOR.x, DOOR.h + 0.05, DOOR.w, 0.1]].forEach(([x, y, w, h]) => {
    const reveal = new THREE.Mesh(new THREE.BoxGeometry(w, h, wallT), darkBrass);
    reveal.position.set(x, y, FZ - wallT / 2);
    group.add(reveal);
  });

  // Encadrement de porte en laiton, à gradins (architrave art déco)
  [[0.1, 0.03, 0.0], [0.06, 0.06, 0.02]].forEach(([wid, dep, z]) => {
    [doorL - wid / 2, doorR + wid / 2].forEach((x) => {
      const j = new THREE.Mesh(new THREE.BoxGeometry(wid, DOOR.h + wid, dep), z ? brass : darkBrass);
      j.position.set(x, (DOOR.h + wid) / 2, FZ + dep / 2 + z + 0.004);
      group.add(j);
    });
    const top = new THREE.Mesh(new THREE.BoxGeometry(DOOR.w + wid * 2, wid, dep), z ? brass : darkBrass);
    top.position.set(DOOR.x, DOOR.h + wid / 2, FZ + dep / 2 + z + 0.004);
    group.add(top);
  });

  // Cadran à aiguille au-dessus de la porte (indique l'étage, années 30)
  const dialCvs = document.createElement('canvas');
  dialCvs.width = 512;
  dialCvs.height = 280;
  const dialTex = new THREE.CanvasTexture(dialCvs);
  dialTex.colorSpace = THREE.SRGBColorSpace;
  dialTex.anisotropy = 4;
  const dial = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.27),
    new THREE.MeshStandardMaterial({ map: dialTex, emissiveMap: dialTex, emissive: 0xffffff, emissiveIntensity: 0.35, metalness: 0.5, roughness: 0.35 })
  );
  dial.position.set(DOOR.x, DOOR.h + 0.28, FZ + 0.006);
  group.add(dial);
  function drawArrowSign(dir, fraction = 0) {
    const ctx = dialCvs.getContext('2d');
    const W = 512;
    const H = 280;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2;
    const cy = H - 30;
    // Plaque en demi-cercle
    const plate = ctx.createLinearGradient(0, 0, W, H);
    plate.addColorStop(0, '#9c7a3e');
    plate.addColorStop(0.4, '#ecd193');
    plate.addColorStop(1, '#8e6d35');
    ctx.fillStyle = plate;
    ctx.beginPath();
    ctx.arc(cx, cy, 236, Math.PI, 0);
    ctx.lineTo(cx + 236, H);
    ctx.lineTo(cx - 236, H);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#100c0a';
    ctx.beginPath();
    ctx.arc(cx, cy, 214, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    // Graduations
    for (let k = 0; k <= 10; k++) {
      const a = Math.PI + (k / 10) * Math.PI;
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = k % 5 === 0 ? 5 : 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 196, cy + Math.sin(a) * 196);
      ctx.lineTo(cx + Math.cos(a) * (k % 5 === 0 ? 166 : 178), cy + Math.sin(a) * (k % 5 === 0 ? 166 : 178));
      ctx.stroke();
    }
    ctx.font = '400 34px "Marcellus", serif';
    ctx.fillStyle = GOLD_LIGHT;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('H', cx - 150, cy - 18);
    // Flèches de direction (s'allument pendant le trajet)
    [[-1, cx - 60], [1, cx + 60]].forEach(([d, x]) => {
      const lit = dir === d;
      ctx.fillStyle = lit ? '#ffbf5e' : '#3a2c1c';
      ctx.shadowColor = '#ffbf5e';
      ctx.shadowBlur = lit ? 18 : 0;
      ctx.beginPath();
      if (d > 0) {
        ctx.moveTo(x, cy - 92); ctx.lineTo(x + 18, cy - 62); ctx.lineTo(x - 18, cy - 62);
      } else {
        ctx.moveTo(x, cy - 62); ctx.lineTo(x + 18, cy - 92); ctx.lineTo(x - 18, cy - 92);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    // Aiguille
    const a = Math.PI + Math.min(1, Math.max(0, fraction)) * Math.PI;
    ctx.strokeStyle = GOLD_LIGHT;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * 172, cy + Math.sin(a) * 172);
    ctx.stroke();
    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
    dialTex.needsUpdate = true;
  }
  drawArrowSign(0, 0);

  // Ce qu'il y a derrière la porte
  const hallTex = landingTexture('hall');
  const floorTex = landingTexture('floor');
  const landingMat = new THREE.MeshBasicMaterial({ map: hallTex, toneMapped: false });
  const landing = new THREE.Mesh(new THREE.PlaneGeometry(DOOR.w + 0.2, DOOR.h + 0.1), landingMat);
  landing.position.set(DOOR.x, DOOR.h / 2, FZ - wallT - 0.35);
  group.add(landing);
  const shaftSide = new THREE.MeshStandardMaterial({ color: 0x1a1410, roughness: 0.9 });
  [doorL, doorR].forEach((x) => {
    const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(0.4, DOOR.h), shaftSide);
    sideWall.rotation.y = x < DOOR.x ? Math.PI / 2 : -Math.PI / 2;
    sideWall.position.set(x, DOOR.h / 2, FZ - wallT - 0.18);
    group.add(sideWall);
  });

  // Battants dorés (coulissent dans le mur)
  const leafW = DOOR.w / 2;
  const leaves = [-1, 1].map((s) => {
    const mat = new THREE.MeshStandardMaterial({
      map: doorLeafTexture(s > 0), metalness: 0.85, roughness: 0.26, envMapIntensity: 1.1,
      emissive: 0x3a2410, emissiveIntensity: 0.35
    });
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(leafW, DOOR.h, 0.035), mat);
    leaf.userData.closedX = DOOR.x + s * leafW / 2;
    leaf.userData.side = s;
    leaf.position.set(leaf.userData.closedX, DOOR.h / 2, FZ - wallT / 2);
    group.add(leaf);
    return leaf;
  });

  // ---------- Tableau de commande ----------
  const bg = plateBackground();
  const panelCvs = document.createElement('canvas');
  panelCvs.width = CW * SCALE;
  panelCvs.height = CH * SCALE;
  const pctx = panelCvs.getContext('2d');
  const panelTex = new THREE.CanvasTexture(panelCvs);
  panelTex.colorSpace = THREE.SRGBColorSpace;
  panelTex.anisotropy = 8;
  const panelMat = new THREE.MeshStandardMaterial({
    map: panelTex, emissiveMap: panelTex, emissive: 0xffffff, emissiveIntensity: 0.32,
    metalness: 0.4, roughness: 0.3, envMapIntensity: 0.5
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(PANEL.w, PANEL.h), panelMat);
  panel.position.set(PANEL.x, PANEL.y, FZ + 0.012);
  group.add(panel);
  const panelFrame = new THREE.Mesh(new THREE.BoxGeometry(PANEL.w + 0.05, PANEL.h + 0.05, 0.02), darkBrass);
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

  const AMBER = '#ffbf5e';
  const CREAM = '#efdcb0';
  const DIM = '#9b8660';

  // Bouton rond : lunette en laiton, face en émail noir, chiffre doré
  function roundButton(cx, cy, r, text, { lit = false, hover = false, font = 26 } = {}) {
    const bezel = pctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    bezel.addColorStop(0, '#f3dca4');
    bezel.addColorStop(0.5, '#b48f4e');
    bezel.addColorStop(1, '#6e5228');
    pctx.fillStyle = bezel;
    pctx.beginPath();
    pctx.arc(cx, cy, r, 0, Math.PI * 2);
    pctx.fill();
    if (lit) {
      pctx.shadowColor = AMBER;
      pctx.shadowBlur = 18;
      pctx.strokeStyle = AMBER;
      pctx.lineWidth = 3;
      pctx.beginPath();
      pctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
      pctx.stroke();
      pctx.shadowBlur = 0;
    }
    const face = pctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 2, cx, cy, r);
    face.addColorStop(0, hover ? '#4a3d33' : '#2c2420');
    face.addColorStop(1, '#0b0908');
    pctx.fillStyle = face;
    pctx.beginPath();
    pctx.arc(cx, cy, r - 6, 0, Math.PI * 2);
    pctx.fill();
    pctx.fillStyle = lit ? '#ffd796' : GOLD;
    if (lit) {
      pctx.shadowColor = AMBER;
      pctx.shadowBlur = 10;
    }
    pctx.font = `400 ${font}px "Marcellus", serif`;
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText(text, cx, cy + 1);
    pctx.shadowBlur = 0;
  }

  // Écran ambré dans une lunette dorée
  function drawDisplay() {
    const x = 44;
    const y = 44;
    const w = CW - 88;
    const h = 112;
    const bezel = pctx.createLinearGradient(x, y, x + w, y + h);
    bezel.addColorStop(0, '#f0d699');
    bezel.addColorStop(0.5, '#a9843f');
    bezel.addColorStop(1, '#e2c27f');
    pctx.fillStyle = bezel;
    roundRect(pctx, x, y, w, h, 10);
    pctx.fill();
    pctx.fillStyle = '#070505';
    roundRect(pctx, x + 7, y + 7, w - 14, h - 14, 6);
    pctx.fill();
    pctx.save();
    roundRect(pctx, x + 7, y + 7, w - 14, h - 14, 6);
    pctx.clip();
    // Trame fine de l'afficheur
    pctx.fillStyle = 'rgba(255, 191, 94, 0.05)';
    for (let gx = x; gx < x + w; gx += 4) pctx.fillRect(gx, y, 1, h);
    const blink = travelling && Math.floor(performance.now() / 350) % 2 === 0;
    pctx.font = '700 36px "JetBrains Mono", monospace';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillStyle = travelDir !== 0 && !blink ? AMBER : '#3a2a14';
    pctx.fillText(travelDir < 0 ? '▼' : '▲', x + 44, y + h / 2);
    pctx.shadowColor = AMBER;
    pctx.shadowBlur = 16;
    pctx.fillStyle = '#ffc874';
    pctx.font = '600 40px "JetBrains Mono", monospace';
    pctx.textAlign = 'left';
    const textX = x + 80;
    const maxW = w - 100;
    const shift = (1 - screenAnim) * (h - 14);
    const sign = travelDir < 0 ? -1 : 1;
    if (screenPrev && screenAnim < 1) {
      pctx.fillText(fitText(pctx, screenPrev.toUpperCase(), maxW), textX, y + h / 2 - sign * (h - 14 - shift));
    }
    pctx.fillText(fitText(pctx, screenText.toUpperCase(), maxW), textX, y + h / 2 + sign * shift);
    pctx.restore();
    pctx.shadowBlur = 0;
  }

  function label(text, x, y, { size = 18, color = CREAM, align = 'center' } = {}) {
    pctx.font = `400 ${size}px "Marcellus", serif`;
    pctx.fillStyle = color;
    pctx.textAlign = align;
    pctx.textBaseline = 'middle';
    pctx.fillText(text, x, y);
  }

  // Petit séparateur art déco : filet doré et losange
  function ornament(y) {
    pctx.strokeStyle = 'rgba(212, 175, 106, 0.6)';
    pctx.lineWidth = 1.2;
    pctx.beginPath();
    pctx.moveTo(60, y);
    pctx.lineTo(CW / 2 - 14, y);
    pctx.moveTo(CW / 2 + 14, y);
    pctx.lineTo(CW - 60, y);
    pctx.stroke();
    pctx.fillStyle = GOLD;
    pctx.beginPath();
    pctx.moveTo(CW / 2, y - 6);
    pctx.lineTo(CW / 2 + 7, y);
    pctx.lineTo(CW / 2, y + 6);
    pctx.lineTo(CW / 2 - 7, y);
    pctx.closePath();
    pctx.fill();
  }

  function drawLogin() {
    label('LECTEUR DE BADGE', CW / 2, 210, { size: 22, color: GOLD });
    ornament(236);
    // Lecteur en laiton et verre
    const rim = pctx.createLinearGradient(CW / 2 - 70, 260, CW / 2 + 70, 440);
    rim.addColorStop(0, '#f0d699');
    rim.addColorStop(1, '#8e6d35');
    pctx.fillStyle = rim;
    roundRect(pctx, CW / 2 - 70, 262, 140, 176, 16);
    pctx.fill();
    pctx.fillStyle = '#0b0908';
    roundRect(pctx, CW / 2 - 62, 270, 124, 160, 12);
    pctx.fill();
    pctx.fillStyle = AMBER;
    pctx.shadowColor = AMBER;
    pctx.shadowBlur = 18;
    pctx.beginPath();
    pctx.arc(CW / 2, 306, 9, 0, Math.PI * 2);
    pctx.fill();
    pctx.shadowBlur = 0;
    pctx.strokeStyle = 'rgba(212, 175, 106, 0.7)';
    pctx.lineWidth = 2;
    roundRect(pctx, CW / 2 - 38, 336, 76, 64, 6);
    pctx.stroke();
    // Bouton de connexion : verre noir, liseré doré, pastille Discord
    const hover = region(56, 470, CW - 112, 120, 'login');
    pctx.fillStyle = hover ? '#241d18' : '#15110f';
    roundRect(pctx, 56, 470, CW - 112, 120, 16);
    pctx.fill();
    pctx.strokeStyle = hover ? GOLD_LIGHT : GOLD;
    pctx.lineWidth = 2.5;
    pctx.stroke();
    pctx.fillStyle = '#5865f2';
    pctx.beginPath();
    pctx.arc(104, 530, 22, 0, Math.PI * 2);
    pctx.fill();
    label('D', 104, 531, { size: 24, color: '#ffffff' });
    label('SE CONNECTER', 284, 512, { size: 28, color: CREAM });
    label('AVEC DISCORD', 284, 550, { size: 28, color: GOLD });
    label('Pour aller à ton étage,', CW / 2, 650, { size: 21, color: DIM });
    label('présente ton badge Discord.', CW / 2, 680, { size: 21, color: DIM });
  }

  function drawOffline() {
    label('HORS SERVICE', CW / 2, 250, { size: 40, color: '#ff8a72' });
    ornament(286);
    label(fitText(pctx, offlineText, CW - 80), CW / 2, 330, { size: 19, color: CREAM });
    label('Lance le serveur du tableau', CW / 2, 380, { size: 19, color: DIM });
    label('de bord (dossier dashboard/).', CW / 2, 408, { size: 19, color: DIM });
    const hover = region(120, 470, CW - 240, 76, 'retry');
    pctx.fillStyle = hover ? '#241d18' : '#15110f';
    roundRect(pctx, 120, 470, CW - 240, 76, 14);
    pctx.fill();
    pctx.strokeStyle = GOLD;
    pctx.lineWidth = 2;
    pctx.stroke();
    label('RÉESSAYER', CW / 2, 509, { size: 24, color: CREAM });
  }

  function drawFloors() {
    // Ton étage, à part : plus facile que de le chercher dans la liste
    if (me) {
      const hover = region(44, 178, CW - 88, 104, 'mine');
      pctx.fillStyle = hover ? 'rgba(255, 191, 94, 0.14)' : 'rgba(255, 191, 94, 0.07)';
      roundRect(pctx, 44, 178, CW - 88, 104, 14);
      pctx.fill();
      pctx.strokeStyle = GOLD;
      pctx.lineWidth = 2;
      pctx.stroke();
      roundButton(98, 230, 36, String(myIndex), { lit: true, hover, font: 28 });
      label('TON ÉTAGE', 150, 208, { size: 16, color: GOLD, align: 'left' });
      pctx.font = '400 32px "Marcellus", serif';
      label(fitText(pctx, me.nom, CW - 250), 150, 248, { size: 32, color: CREAM, align: 'left' });
      label('▲', CW - 78, 230, { size: 24, color: AMBER });
    } else {
      label('Aucun étage pour ton compte', CW / 2, 215, { size: 21, color: CREAM });
      label('(rejoins le serveur de ta classe)', CW / 2, 247, { size: 18, color: DIM });
    }

    label('TOUS LES ÉTAGES', CW / 2, 306, { size: 15, color: GOLD });
    ornament(326);
    const pages = Math.max(1, Math.ceil(floors.length / ROWS_PER_PAGE));
    page = Math.min(page, pages - 1);
    const start = page * ROWS_PER_PAGE;
    floors.slice(start, start + ROWS_PER_PAGE).forEach((f, k) => {
      const i = start + k;
      const y = 338 + k * 60;
      const mine = i === myIndex;
      const isHall = f.id === 'hall';
      const hover = region(44, y, CW - 88, 56, 'floor', i);
      if (hover) {
        pctx.fillStyle = 'rgba(255, 220, 160, 0.07)';
        roundRect(pctx, 44, y, CW - 88, 56, 10);
        pctx.fill();
      }
      roundButton(76, y + 28, 23, isHall ? 'H' : String(i), { lit: i === current, font: 19 });
      pctx.font = '400 24px "Marcellus", serif';
      const name = fitText(pctx, f.nom, CW - 230);
      label(name, 114, y + 29, { size: 24, color: mine ? '#ffd796' : isHall ? CREAM : DIM, align: 'left' });
      if (mine) label('◆', CW - 72, y + 29, { size: 16, color: AMBER });
      else if (!isHall) label('🔒', CW - 72, y + 29, { size: 18 });
    });

    // Pages
    if (pages > 1) {
      const upHover = region(CW / 2 - 110, 768, 60, 50, 'pageUp');
      roundButton(CW / 2 - 80, 793, 22, '▲', { font: 16, lit: false, hover: upHover });
      label(`${page + 1} / ${pages}`, CW / 2, 794, { size: 18, color: DIM });
      const downHover = region(CW / 2 + 50, 768, 60, 50, 'pageDown');
      roundButton(CW / 2 + 80, 793, 22, '▼', { font: 16, lit: false, hover: downHover });
    }
  }

  function drawBottomButtons() {
    ornament(832);
    const y = 878;
    const items = [
      { act: 'open', x: 130, text: '◀▶', caption: 'PORTES' },
      { act: 'mute', x: 250, text: music.muted ? '✕' : '♪', caption: music.muted ? 'COUPÉE' : 'MUSIQUE' },
      { act: 'exit', x: 370, text: '⇱', caption: 'SORTIR' }
    ];
    items.forEach((b) => {
      const hover = region(b.x - 40, y - 42, 80, 84, b.act);
      const lit = (b.act === 'open' && doorTarget > 0.5) || (b.act === 'mute' && !music.muted);
      roundButton(b.x, y - 8, 32, b.text, { font: 22, hover, lit });
      label(b.caption, b.x, y + 38, { size: 13, color: GOLD });
    });
  }

  function drawPanel() {
    regions = [];
    pctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    pctx.drawImage(bg, 0, 0, CW, CH);
    drawDisplay();
    if (mode === 'loading') label('…', CW / 2, 400, { size: 40, color: GOLD });
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
    await wait(400); // portes qui se ferment
    music.start();
    travelDir = dir;
    const span = Math.max(1, floors.length - 1);
    drawArrowSign(dir, current / span);
    const distance = Math.abs(target - current);
    // Trajet rapide : 2 secondes au plus en tout (portes comprises)
    const total = Math.min(1300, 300 + distance * 150);
    for (let i = 1; i <= distance; i++) {
      await wait(total / distance);
      current += dir;
      drawArrowSign(dir, current / span);
      setScreen(floors[current].nom, true);
      page = Math.floor(current / ROWS_PER_PAGE);
    }
    await wait(250);
    travelDir = 0;
    drawArrowSign(0, current / span);
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
  // Tableau de bord chargé seulement à la première visite de son étage :
  // la page d'accueil n'a pas à télécharger ce code.
  let dashboardReady = null;
  const getDashboard = () =>
    (dashboardReady ??= import('./dashboard.js').then(({ createDashboard }) => createDashboard(floorView, dashboardOptions)));
  const dashboardOptions = {
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
  };

  async function arriveAtMyFloor() {
    landingMat.map = floorTex;
    doorTarget = 1;
    await wait(900);
    music.stop(1);
    onFloor = true;
    updateNowPlaying();
    document.body.classList.add('on-floor');
    floorView.classList.add('open');
    floorView.setAttribute('aria-hidden', 'false');
    try {
      await (await getDashboard()).load();
    } catch (e) {
      say(e.message, 5000);
    }
  }

  async function backToCabin(silent) {
    onFloor = false;
    document.body.classList.remove('on-floor');
    floorView.classList.remove('open');
    floorView.setAttribute('aria-hidden', 'true');
    if (active && !silent) music.start();
    updateNowPlaying();
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
        updateNowPlaying();
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
    camPos.set(portrait ? 0.5 : 0.12, portrait ? 1.6 : 1.55, portrait ? 0.6 : BZ - 0.3);
    camTarget.set(portrait ? 0.62 : 0.2, portrait ? 1.58 : 1.5, FZ);
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

  // Premier clic ou toucher dans la cabine (ex. retour de la connexion
  // Discord, page rechargée) : on débloque le son à ce moment-là.
  window.addEventListener('pointerdown', () => {
    if (active) music.unlock();
  });

  window.addEventListener('keydown', (e) => {
    if (active) music.unlock();
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
    /** La musique joue dans la cabine : NOVA danse */
    get musicPlaying() {
      return active && !onFloor && music.playing;
    },
    cameraPose,
    group,
    environment: cabinEnvironment,
    enter({ greeting } = {}) {
      active = true;
      group.visible = true;
      outdoorLights = [];
      scene.traverse((o) => {
        if (!o.isLight || !o.visible) return;
        let inside = false;
        for (let p = o; p; p = p.parent) if (p === group) inside = true;
        if (!inside) outdoorLights.push(o);
      });
      outdoorLights.forEach((l) => { l.visible = false; });
      current = 0;
      page = 0;
      travelDir = 0;
      setScreen('HALL', false);
      drawArrowSign(0, 0);
      landingMat.map = hallTex;
      doorOpen = 0;
      doorTarget = 0;
      // Portes fermées : on voit la porte dorée, et le tableau à droite
      music.start();
      updateNowPlaying();
      loadFloors(greeting);
    },
    leave() {
      active = false;
      group.visible = false;
      outdoorLights.forEach((l) => { l.visible = true; });
      outdoorLights = [];
      updateNowPlaying();
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
    /** Débloque le son : à appeler pendant le clic qui fait entrer */
    unlockAudio() {
      music.unlock();
    },
    get audioState() {
      return music.state;
    },
    click(raycaster) {
      music.unlock();
      const r = regionAt(raycaster);
      if (r) act(r);
    },
    update(delta) {
      if (!active) return;
      doorOpen += (doorTarget - doorOpen) * (1 - Math.exp(-delta * 6.5));
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
