// =========================================================================
// SPRITES DU MINI-JEU (pixel art dessiné dans le code)
// Chaque sprite est une petite grille de caractères : un caractère = un
// pixel, sa couleur vient de la palette. Ils sont « cuits » une fois pour
// toutes sur des petits canvas, puis dessinés sans lissage (pixels nets).
// =========================================================================

function bake(rows, palette) {
  const h = rows.length;
  const w = rows[0].length;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const col = palette[rows[y][x]];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return c;
}

// ---- Le vaisseau du joueur (pointe vers le haut) ----
const PLAYER = [
  '......w......',
  '.....wcw.....',
  '.....cCc.....',
  '....wcycw....',
  '....cyYyc....',
  '...wcyyycw...',
  '..p.cCCCc.p..',
  '.pP.cCcCc.Pp.',
  'pPPwccccc wPPp'.slice(0, 13),
  'pPPccdcdccPPp',
  '.pc.cd.dc.cp.',
  '..c..o.o..c..',
  '.....o.o.....'
];
const PLAYER_PAL = {
  w: '#ffffff',
  c: '#22e4ff',
  C: '#9ff4ff',
  y: '#ffd166',
  Y: '#fff1b8',
  p: '#8b5cf6',
  P: '#c4b5fd',
  d: '#1b2b4a',
  o: '#ff9a3c'
};

// ---- NOVA rebelle (version méchante de NOVA) ----
// Casque rond, visière noire, yeux rouges en colère, oreilles en pointe.
const EVIL_NOVA = [
  '..e.......e..',
  '..ee.....ee..',
  '...eBBBBBe...',
  '..BBbbbbbBB..',
  '.BbVVVVVVVbB.',
  '.BbVrVVVrVbB.',
  '.BbVVrVrVVbB.',
  '.BbVRRVRRVbB.',
  '.BbbVVVVVbbB.',
  '..BBbbbbbBB..',
  '...BBBBBBB...',
  '.....f.f.....'
];
const EVIL_NOVA_2 = EVIL_NOVA.slice(0, 11).concat(['....f...f....']);
const NOVA_VARIANTS = {
  // Soldat violet, tireur rouge, plongeur orange
  grunt: { B: '#4c2a7a', b: '#7a4bc4', e: '#ff3dbb', V: '#08060f', r: '#ff2d55', R: '#ff8aa0', f: '#ff9a3c' },
  shooter: { B: '#7a1f3d', b: '#c23a64', e: '#ffd166', V: '#08060f', r: '#ffee55', R: '#fff7b0', f: '#ff9a3c' },
  diver: { B: '#7a3b12', b: '#d9772b', e: '#ff3dbb', V: '#08060f', r: '#22e4ff', R: '#b8f7ff', f: '#ffd166' }
};

// ---- NOVA amicale (portrait du HUD) ----
const GOOD_NOVA = [
  '..p.......p..',
  '..pp.....pp..',
  '...wWWWWWw...',
  '..WWwwwwwWW..',
  '.WwVVVVVVVwW.',
  '.WwVcVVVcVwW.',
  '.WwVcVVVcVwW.',
  '.WwVVcccVVwW.',
  '.WwwVVVVVwwW.',
  '..WWwwwwwWW..',
  '...WWWWWWW...',
  '.....c.c.....'
];
const GOOD_PAL = { p: '#ff8ad8', W: '#dfe8ff', w: '#ffffff', V: '#0a1022', c: '#22e4ff' };

// ---- Bonus ----
const PICKUP = [
  '..xxxxx..',
  '.x.....x.',
  'x.......x',
  'x...i...x',
  'x..iii..x',
  'x...i...x',
  'x.......x',
  '.x.....x.',
  '..xxxxx..'
];

export function createSprites() {
  const player = bake(PLAYER, PLAYER_PAL);
  const playerThrust = bake(
    PLAYER.slice(0, 11).concat(['..c.oOoOo.c..'.slice(0, 13), '....oOoOo....'.slice(0, 13)]),
    { ...PLAYER_PAL, O: '#ffe9a8' }
  );
  const nova = {};
  Object.entries(NOVA_VARIANTS).forEach(([k, pal]) => {
    nova[k] = [bake(EVIL_NOVA, pal), bake(EVIL_NOVA_2, pal)];
  });
  // Boss : grande NOVA rebelle couronnée (même dessin, plus détaillé)
  const bossPal = { B: '#2a1146', b: '#5b2a9e', e: '#ff3dbb', V: '#050309', r: '#ff2d55', R: '#ffd0d8', f: '#ff3dbb' };
  const boss = [bake(EVIL_NOVA, bossPal), bake(EVIL_NOVA_2, bossPal)];
  const goodNova = bake(GOOD_NOVA, GOOD_PAL);
  const pickups = {
    shield: bake(PICKUP, { x: '#22e4ff', i: '#ffffff' }),
    triple: bake(PICKUP, { x: '#ffd166', i: '#ffffff' }),
    rapid: bake(PICKUP, { x: '#ff3dbb', i: '#ffffff' })
  };
  return { player, playerThrust, nova, boss, goodNova, pickups, asteroids: createAsteroids(), destinations: createDestinations() };
}

// ---- Destinations d'arrivée (pixel art) ----
// La Tour : planète bleue à anneaux, la citadelle pointe au sommet.
// QG et labo : stations spatiales en anneau, aux couleurs de la destination.
function pixelCanvas(size, paint) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const set = (x, y, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(x, y, 1, 1);
  };
  paint(set, size);
  return c;
}

function createDestinations() {
  const planet = pixelCanvas(72, (set, S) => {
    const c = S / 2;
    const R = 22;
    const bands = ['#0b2a5a', '#14468a', '#2a74c4', '#5fb2ec', '#9fe3ff', '#3d8fd8', '#1a4f96'];
    // Anneau arrière
    for (let a = 0; a < Math.PI * 2; a += 0.004) {
      const x = Math.round(c + Math.cos(a) * 33);
      const y = Math.round(c + 3 + Math.sin(a) * 8);
      if (Math.sin(a) < 0) set(x, y, Math.cos(a * 3) > 0 ? '#b8d8f0' : '#7fa6c8');
    }
    for (let y = -R; y <= R; y++) {
      for (let x = -R; x <= R; x++) {
        const d = Math.hypot(x, y);
        if (d > R) continue;
        const band = bands[Math.floor(((y + R) / (2 * R)) * bands.length + Math.sin(x * 0.4) * 0.5) % bands.length];
        const light = (-x - y) / (R * 2) + 0.4;
        let col = band;
        if (light < 0.05 || d > R - 1.2) col = '#071a38';
        else if (light > 0.62) col = '#c8f2ff';
        set(c + x, c + y, col);
      }
    }
    // Anneau avant
    for (let a = 0; a < Math.PI * 2; a += 0.004) {
      const x = Math.round(c + Math.cos(a) * 33);
      const y = Math.round(c + 3 + Math.sin(a) * 8);
      if (Math.sin(a) >= 0) set(x, y, Math.cos(a * 3) > 0 ? '#e6f4ff' : '#9cc2e0');
    }
    // La citadelle : tour lumineuse au sommet
    for (let y = 0; y < 9; y++) {
      const w = y < 3 ? 0 : 1;
      for (let x = -w; x <= w; x++) set(c + x, c - R - 9 + y, y < 2 ? '#ffffff' : '#22e4ff');
    }
    set(c, c - R - 11, '#ff3dbb');
  });

  const station = (accent, light) =>
    pixelCanvas(72, (set, S) => {
      const c = S / 2;
      // Anneau d'habitation (vu de biais)
      for (let a = 0; a < Math.PI * 2; a += 0.003) {
        for (let t = 0; t < 4; t++) {
          const x = Math.round(c + Math.cos(a) * (30 - t));
          const y = Math.round(c + Math.sin(a) * (14 - t * 0.5));
          set(x, y, t === 0 ? '#2a3150' : t === 3 ? '#4a5378' : '#8a94b8');
        }
        if (Math.floor(a * 9) % 2 === 0) set(Math.round(c + Math.cos(a) * 28), Math.round(c + Math.sin(a) * 13), light);
      }
      // Rayons
      [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((a) => {
        for (let r = 6; r < 27; r++) set(Math.round(c + Math.cos(a) * r), Math.round(c + Math.sin(a) * r * 0.47), '#5b6488');
      });
      // Moyeu central et mât
      for (let y = -10; y <= 10; y++) {
        for (let x = -5; x <= 5; x++) {
          if (Math.abs(x) + Math.abs(y) * 0.4 > 6.5) continue;
          set(c + x, c + y, x < -2 ? '#3a4262' : x > 2 ? '#7f89ad' : '#aeb7d6');
        }
      }
      // Baie d'amarrage lumineuse (couleur de la destination)
      for (let x = -2; x <= 2; x++) for (let y = 3; y <= 6; y++) set(c + x, c + y, accent);
      set(c, c - 12, '#ffffff');
      set(c, c - 13, accent);
      // Panneaux solaires
      [-1, 1].forEach((s) => {
        for (let x = 0; x < 5; x++) for (let y = 0; y < 5; y++) set(c + s * (31 + x), c - 2 + y, y % 2 ? '#1d3f8a' : '#2f63c0');
      });
    });

  return { planet, qg: station('#a78bfa', '#d9c8ff'), labo: station('#ff3dbb', '#ffc2e8') };
}

// ---- Astéroïdes : rochers en pixels, plusieurs tailles et formes ----
function createAsteroids() {
  const sizes = { big: 15, mid: 9, small: 5 };
  const out = {};
  Object.entries(sizes).forEach(([name, r]) => {
    out[name] = [];
    for (let v = 0; v < 4; v++) {
      const d = r * 2 + 2;
      const c = document.createElement('canvas');
      c.width = d;
      c.height = d;
      const ctx = c.getContext('2d');
      // Contour bosselé
      const bumps = [];
      const n = 9;
      for (let i = 0; i < n; i++) bumps.push(0.72 + Math.random() * 0.3);
      const radiusAt = (a) => {
        const f = ((a / (Math.PI * 2)) * n + n) % n;
        const i = Math.floor(f);
        const t = f - i;
        return r * (bumps[i] * (1 - t) + bumps[(i + 1) % n] * t);
      };
      const tones = v % 2 ? ['#3b3f4d', '#5d6273', '#7f8597', '#a3a9ba'] : ['#40382f', '#655a4c', '#8a7d6a', '#b0a28c'];
      const craters = [];
      for (let k = 0; k < Math.max(1, Math.round(r / 4)); k++) {
        const a = Math.random() * Math.PI * 2;
        const rr = Math.random() * r * 0.5;
        craters.push([r + 1 + Math.cos(a) * rr, r + 1 + Math.sin(a) * rr, 1 + Math.random() * r * 0.22]);
      }
      for (let y = 0; y < d; y++) {
        for (let x = 0; x < d; x++) {
          const dx = x - r - 0.5;
          const dy = y - r - 0.5;
          const dist = Math.hypot(dx, dy);
          const lim = radiusAt(Math.atan2(dy, dx));
          if (dist > lim) continue;
          // Lumière venant d'en haut à gauche
          const light = (-dx - dy) / (r * 2) + 0.5 - dist / (lim * 3);
          let tone = light > 0.62 ? 3 : light > 0.4 ? 2 : light > 0.15 ? 1 : 0;
          if (dist > lim - 1.2) tone = 0;
          for (const [cx, cy, cr] of craters) {
            if (Math.hypot(x - cx, y - cy) < cr) tone = Math.max(0, tone - 1);
          }
          ctx.fillStyle = tones[tone];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      out[name].push(c);
    }
  });
  return out;
}
