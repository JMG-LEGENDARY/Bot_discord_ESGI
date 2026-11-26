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
  return { player, playerThrust, nova, boss, goodNova, pickups, asteroids: createAsteroids() };
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
