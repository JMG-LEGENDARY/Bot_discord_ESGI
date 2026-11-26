import { sfx } from '../audio.js';

// =========================================================================
// LE MINI-JEU : SPACE INVADERS × ASTEROIDS
// Le joueur se déplace librement (inertie, l'écran boucle sur ses bords),
// vise à la souris et tire. Trois secteurs :
//   1. Ceinture d'astéroïdes  → ouvre le portail du LABORATOIRE
//   2. Flotte des NOVA rebelles (formations) → ouvre le portail du QG
//   3. Forteresse de la MÉGA-NOVA (boss) → ouvre le portail ESGI-BOT
// Après chaque secteur, les portails débloqués apparaissent : on traverse
// celui de son choix (ou on continue vers le secteur suivant).
// Coordonnées en « pixels du jeu » (petite image agrandie, pixels nets).
// =========================================================================

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const SECTORS = [
  {
    name: 'CEINTURE D’ASTÉROÏDES',
    color: '#22e4ff',
    nebula: ['rgba(34,120,255,0.16)', 'rgba(120,60,255,0.1)'],
    unlock: 'labo',
    waves: [
      { type: 'mixed', count: 2, rows: 2, cols: 6 },
      { type: 'mixed', count: 3, rows: 3, cols: 6, divers: true },
      { type: 'formation', rows: 3, cols: 7, divers: true }
    ]
  },
  {
    name: 'FLOTTE DES NOVA REBELLES',
    color: '#a78bfa',
    nebula: ['rgba(140,70,255,0.18)', 'rgba(255,61,187,0.08)'],
    unlock: 'qg',
    waves: [
      { type: 'formation', rows: 3, cols: 7, divers: true },
      { type: 'mixed', count: 3, rows: 4, cols: 7, divers: true },
      { type: 'formation', rows: 4, cols: 8, divers: true }
    ]
  },
  {
    name: 'FORTERESSE MÉGA-NOVA',
    color: '#ff3dbb',
    nebula: ['rgba(255,61,140,0.16)', 'rgba(255,140,60,0.08)'],
    unlock: 'esgi-bot',
    waves: [
      { type: 'mixed', count: 3, rows: 4, cols: 8, divers: true },
      { type: 'formation', rows: 5, cols: 8, divers: true }
    ]
  }
];

export const PORTAL_INFO = {
  labo: { label: 'LABORATOIRE', color: '#ff3dbb' },
  qg: { label: 'QG · MISSIONS', color: '#a78bfa' },
  'esgi-bot': { label: 'LA TOUR', color: '#22e4ff' },
  next: { label: 'SECTEUR SUIVANT', color: '#ffd166' }
};

const ENEMY_STATS = {
  grunt: { hp: 1, score: 100, r: 6 },
  shooter: { hp: 2, score: 150, r: 6 },
  diver: { hp: 1, score: 200, r: 6 }
};
const ROCK = {
  big: { r: 13, hp: 3, score: 20, next: 'mid', speed: [10, 22] },
  mid: { r: 8, hp: 2, score: 50, next: 'small', speed: [18, 34] },
  small: { r: 4.5, hp: 1, score: 100, next: null, speed: [26, 48] }
};

export function createGame({ sprites, events }) {
  const g = {
    W: 480,
    H: 300,
    state: 'idle', // idle, play, clear, warp, dead, over
    score: 0,
    best: Number(localStorage.getItem('esgi-arcade-best') || 0),
    lives: 3,
    shield: 100,
    special: 1, // jauge de l'onde NOVA (1 = prête)
    sector: 0,
    wave: -1,
    unlocked: [],
    time: 0,
    shake: 0,
    flash: 0
  };
  const input = { x: 0, y: 0, aimX: 0, aimY: -1, aimMode: 'mouse', fire: false, special: false, mouse: null };

  let player;
  let bullets = [];
  let enemyBullets = [];
  let enemies = [];
  let rocks = [];
  let particles = [];
  let pickups = [];
  let portals = [];
  let rings = [];
  let boss = null;
  let formation = null;
  let waveTimer = 0;
  let diveTimer = 0;
  let stars = [];

  function resetStars() {
    stars = [];
    for (let i = 0; i < 160; i++) {
      stars.push({ x: rand(0, g.W), y: rand(0, g.H), z: Math.random() < 0.15 ? 3 : Math.random() < 0.4 ? 2 : 1, tw: rand(0, TAU) });
    }
  }

  function resize(W, H) {
    g.W = W;
    g.H = H;
    resetStars();
  }

  function newPlayer() {
    return { x: g.W / 2, y: g.H * 0.78, vx: 0, vy: 0, a: -Math.PI / 2, r: 5, cool: 0, inv: 2.2, triple: 0, rapid: 0, alive: true, thrust: 0 };
  }

  // target : destination choisie dans le cockpit. Le vol s'arrête au
  // secteur qui ouvre son portail (Labo : 1, QG : 2, la Tour : 3).
  function start(target = 'esgi-bot') {
    g.target = target;
    g.lastSector = Math.max(0, SECTORS.findIndex((s) => s.unlock === target));
    g.score = 0;
    g.lives = 3;
    g.shield = 100;
    g.special = 1;
    g.sector = 0;
    g.wave = -1;
    g.unlocked = [];
    g.bossDone = false;
    bullets = [];
    enemyBullets = [];
    enemies = [];
    rocks = [];
    particles = [];
    pickups = [];
    portals = [];
    rings = [];
    boss = null;
    formation = null;
    player = newPlayer();
    g.state = 'play';
    events.sector(SECTORS[0], 0);
    nextWave();
  }

  // ------------------------------------------------------------------ vagues
  function spawnRock(kind, x, y, vx, vy) {
    const s = ROCK[kind];
    if (x === undefined) {
      // Arrive par un bord, loin du joueur
      const side = Math.floor(rand(0, 4));
      x = side === 0 ? -s.r : side === 1 ? g.W + s.r : rand(0, g.W);
      y = side === 2 ? -s.r : side === 3 ? g.H * 0.5 : rand(0, g.H * 0.6);
      if (side === 3) y = -s.r;
      const a = Math.atan2(g.H * 0.5 - y, g.W * 0.5 - x) + rand(-0.6, 0.6);
      const sp = rand(...s.speed) * (1 + g.sector * 0.15);
      vx = Math.cos(a) * sp;
      vy = Math.sin(a) * sp;
    }
    rocks.push({ kind, x, y, vx, vy, r: s.r, hp: s.hp, a: rand(0, TAU), va: rand(-1.2, 1.2), sprite: sprites.asteroids[kind][Math.floor(rand(0, 4))], hit: 0 });
  }

  function spawnFormation(rows, cols, divers) {
    const gapX = Math.min(30, (g.W * 0.8) / cols);
    const gapY = 17;
    formation = { x: 0, dir: 1, y: 30, speed: 14 + g.sector * 6, divers, width: (cols - 1) * gapX };
    formation.x = (g.W - formation.width) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const type = r === 0 && g.sector > 0 ? 'shooter' : divers && r === rows - 1 && c % 2 ? 'diver' : 'grunt';
        const st = ENEMY_STATS[type];
        enemies.push({
          type,
          slotX: c * gapX,
          slotY: r * gapY,
          x: g.W / 2 + rand(-40, 40),
          y: -20 - r * 18 - c * 4,
          r: st.r,
          hp: st.hp + (g.sector > 1 ? 1 : 0),
          enter: 0,
          enterDelay: c * 0.06 + r * 0.25,
          mode: 'enter',
          dive: null,
          hit: 0,
          frame: Math.random()
        });
      }
    }
  }

  const BOSSES = {
    labo: { name: 'NOVA ALCHIMISTE', hp: 40, crown: '#ff3dbb', line: 'La NOVA Alchimiste garde le labo ! Vise sa visière 🧪' },
    qg: { name: 'AMIRALE NOVA', hp: 60, crown: '#a78bfa', line: 'L’Amirale NOVA bloque l’accès au QG… on fonce 💪' },
    'esgi-bot': { name: 'MÉGA-NOVA', hp: 85, crown: '#ffd166', line: 'C’est la MÉGA-NOVA ! Vise sa visière, je t’encourage d’ici 💪' }
  };
  function spawnBoss() {
    const info = BOSSES[g.target] || BOSSES['esgi-bot'];
    boss = { x: g.W / 2, y: -40, ty: 48, r: 22, hp: info.hp, max: info.hp, t: 0, fire: 2, spawn: 5, burst: 3.5, hit: 0, enter: true, crown: info.crown, name: info.name };
    events.boss(true, 1, info.name);
    events.wave('BOSS', 0);
    events.say(info.line);
  }

  function nextWave() {
    const sector = SECTORS[g.sector];
    g.wave++;
    if (g.wave >= sector.waves.length) {
      // Dernier secteur du vol : le boss, puis la destination
      if (g.sector >= g.lastSector && !g.bossDone) {
        if (!boss) spawnBoss();
        return;
      }
      sectorCleared();
      return;
    }
    const w = sector.waves[g.wave];
    events.wave(g.wave + 1, sector.waves.length);
    if (w.type === 'asteroids') {
      for (let i = 0; i < w.count; i++) spawnRock('big');
    } else if (w.type === 'formation') {
      spawnFormation(w.rows, w.cols, w.divers);
      if (g.sector === 1 && g.wave === 0) events.say('Mes cousins rebelles arrivent en formation… pas de pitié 😈');
    } else if (w.type === 'mixed') {
      for (let i = 0; i < w.count; i++) spawnRock('big');
      spawnFormation(w.rows, w.cols, w.divers);
    }
    waveTimer = 0;
  }

  function sectorCleared() {
    const sector = SECTORS[g.sector];
    if (!g.unlocked.includes(sector.unlock)) g.unlocked.push(sector.unlock);
    g.state = 'clear';
    enemyBullets = [];
    sfx.portal();
    // Portail : la destination choisie au bout du vol, sinon le secteur suivant
    const arrived = g.sector >= g.lastSector;
    portals = arrived
      ? [{ id: g.target, dest: true, x: g.W / 2, y: -50, ty: g.H * 0.3, r: 0, tr: 26, t: 0 }]
      : [{ id: 'next', x: g.W / 2, y: g.H * 0.3, r: 0, tr: 17, t: rand(0, TAU) }];
    events.cleared(sector, arrived, g.target);
  }

  // ------------------------------------------------------------------ effets
  function explode(x, y, colors, n = 18, power = 60) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, TAU);
      const s = rand(0.2, 1) * power;
      particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rand(0.35, 0.9), max: 0.9, c: colors[Math.floor(rand(0, colors.length))], size: Math.random() < 0.3 ? 2 : 1 });
    }
    rings.push({ x, y, r: 2, max: power * 0.45, life: 0.35, c: colors[0] });
  }

  function hurtPlayer(amount) {
    if (player.inv > 0 || !player.alive) return;
    g.shield -= amount;
    g.shake = Math.max(g.shake, 4);
    g.flash = 0.25;
    sfx.hurt();
    player.inv = 0.6;
    if (g.shield <= 25 && g.shield > 0) events.say('Bouclier faible ! Cherche un bonus bleu 🛡️');
    if (g.shield <= 0) {
      player.alive = false;
      explode(player.x, player.y, ['#ffffff', '#22e4ff', '#ffd166', '#ff9a3c'], 46, 110);
      sfx.explode(true);
      g.lives--;
      g.shake = 8;
      events.lives(g.lives);
      if (g.lives <= 0) {
        g.state = 'over';
        if (g.score > g.best) {
          g.best = g.score;
          try {
            localStorage.setItem('esgi-arcade-best', String(g.best));
          } catch {
            /* record pour cette visite */
          }
        }
        setTimeout(() => events.gameOver(g.score, g.best), 1400);
      } else {
        g.state = 'dead';
        setTimeout(() => {
          player = newPlayer();
          g.shield = 100;
          if (g.state === 'dead') g.state = portals.length ? 'clear' : 'play';
        }, 1300);
      }
    }
  }

  function addScore(v) {
    g.score += v;
    events.score(g.score);
  }

  function dropPickup(x, y) {
    if (Math.random() > 0.1) return;
    const kinds = ['shield', 'triple', 'rapid'];
    const kind = g.shield < 50 && Math.random() < 0.6 ? 'shield' : kinds[Math.floor(rand(0, 3))];
    pickups.push({ kind, x, y, vy: 22, life: 9, t: 0 });
  }

  function useSpecial() {
    if (g.special < 1 || !player.alive) return;
    g.special = 0;
    sfx.special();
    rings.push({ x: player.x, y: player.y, r: 4, max: 90, life: 0.6, c: '#22e4ff', wave: true });
    enemyBullets = enemyBullets.filter((b) => Math.hypot(b.x - player.x, b.y - player.y) > 90);
    enemies.forEach((e) => {
      if (Math.hypot(e.x - player.x, e.y - player.y) < 90) e.hp -= 2;
    });
    rocks.forEach((r) => {
      if (Math.hypot(r.x - player.x, r.y - player.y) < 90) r.hp -= 2;
    });
    if (boss && Math.hypot(boss.x - player.x, boss.y - player.y) < 110) boss.hp -= 6;
    g.shake = 5;
  }

  // ------------------------------------------------------------------ boucle
  function wrap(o, m) {
    if (o.x < -m) o.x += g.W + m * 2;
    else if (o.x > g.W + m) o.x -= g.W + m * 2;
    if (o.y < -m) o.y += g.H + m * 2;
    else if (o.y > g.H + m) o.y -= g.H + m * 2;
  }

  function fire() {
    const rate = player.rapid > 0 ? 0.09 : 0.17;
    if (player.cool > 0) return;
    player.cool = rate;
    const spread = player.triple > 0 ? [-0.18, 0, 0.18] : [0];
    spread.forEach((s) => {
      const a = player.a + s;
      bullets.push({ x: player.x + Math.cos(a) * 7, y: player.y + Math.sin(a) * 7, vx: Math.cos(a) * 330 + player.vx * 0.3, vy: Math.sin(a) * 330 + player.vy * 0.3, life: 0.9, a });
    });
    sfx.laser();
  }

  function enemyFire(x, y, aimed, speed = 95) {
    let vx = 0;
    let vy = speed;
    if (aimed && player.alive) {
      const a = Math.atan2(player.y - y, player.x - x);
      vx = Math.cos(a) * speed;
      vy = Math.sin(a) * speed;
    }
    enemyBullets.push({ x, y, vx, vy, life: 4 });
    sfx.enemyLaser();
  }

  function update(dt) {
    g.time += dt;
    g.shake = Math.max(0, g.shake - dt * 18);
    g.flash = Math.max(0, g.flash - dt);
    stars.forEach((s) => {
      s.y += (8 + s.z * 14) * dt - (player ? player.vy * 0.02 * s.z : 0) * dt * 10;
      s.x -= (player ? player.vx * 0.02 * s.z : 0) * dt * 10;
      if (s.y > g.H) s.y -= g.H;
      if (s.y < 0) s.y += g.H;
      if (s.x < 0) s.x += g.W;
      if (s.x > g.W) s.x -= g.W;
    });
    if (g.state === 'idle' || !player) return;

    // ---- Joueur ----
    if (player.alive && g.state !== 'warp') {
      const ax = input.x;
      const ay = input.y;
      const len = Math.hypot(ax, ay) || 1;
      const accel = 560;
      player.vx += (ax / Math.max(1, len)) * accel * dt;
      player.vy += (ay / Math.max(1, len)) * accel * dt;
      const drag = Math.exp(-dt * 2.4);
      player.vx *= drag;
      player.vy *= drag;
      const sp = Math.hypot(player.vx, player.vy);
      if (sp > 170) {
        player.vx *= 170 / sp;
        player.vy *= 170 / sp;
      }
      player.x += player.vx * dt;
      player.y += player.vy * dt;
      wrap(player, 8);
      player.thrust = Math.min(1, Math.hypot(ax, ay));
      // Visée : souris, joystick droit, ou sens du déplacement
      let tx;
      let ty;
      if (input.aimMode === 'mouse' && input.mouse) {
        tx = input.mouse.x - player.x;
        ty = input.mouse.y - player.y;
      } else if (Math.hypot(input.aimX, input.aimY) > 0.2) {
        tx = input.aimX;
        ty = input.aimY;
      } else {
        tx = 0;
        ty = -1;
      }
      const want = Math.atan2(ty, tx);
      let d = want - player.a;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      player.a += d * Math.min(1, dt * 16);
      player.cool -= dt;
      player.inv -= dt;
      player.triple -= dt;
      player.rapid -= dt;
      if (input.fire) fire();
      if (input.special) {
        input.special = false;
        useSpecial();
      }
    }
    g.special = Math.min(1, g.special + dt / 10);

    // ---- Tirs ----
    bullets.forEach((b) => {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      wrap(b, 4);
    });
    bullets = bullets.filter((b) => b.life > 0);
    enemyBullets.forEach((b) => {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
    });
    enemyBullets = enemyBullets.filter((b) => b.life > 0 && b.y < g.H + 10 && b.y > -10 && b.x > -10 && b.x < g.W + 10);

    // ---- Astéroïdes ----
    rocks.forEach((r) => {
      r.x += r.vx * dt;
      r.y += r.vy * dt;
      r.a += r.va * dt;
      r.hit = Math.max(0, r.hit - dt);
      wrap(r, r.r);
    });

    // ---- Formation de NOVA rebelles ----
    if (formation) {
      formation.x += formation.dir * formation.speed * dt;
      const left = formation.x;
      const right = formation.x + formation.width;
      if ((left < 14 && formation.dir < 0) || (right > g.W - 14 && formation.dir > 0)) {
        formation.dir *= -1;
        formation.y += 5;
      }
      formation.y = Math.min(formation.y, g.H * 0.3);
    }
    const alive = enemies.length;
    enemies.forEach((e) => {
      e.hit = Math.max(0, e.hit - dt);
      e.frame += dt * 3;
      const sx = formation ? formation.x + e.slotX : e.x;
      const sy = formation ? formation.y + e.slotY : e.y;
      if (e.mode === 'enter') {
        e.enterDelay -= dt;
        if (e.enterDelay <= 0) {
          e.enter = Math.min(1, e.enter + dt * 1.2);
          const k = 1 - Math.pow(1 - e.enter, 3);
          e.x += (sx - e.x) * Math.min(1, k * dt * 8 + 0.02);
          e.y += (sy - e.y) * Math.min(1, k * dt * 8 + 0.02);
          if (e.enter >= 1) e.mode = 'slot';
        }
      } else if (e.mode === 'slot') {
        e.x = sx + Math.sin(g.time * 3 + e.slotX) * 1.5;
        e.y = sy + Math.sin(g.time * 2 + e.slotY) * 1.2;
        // Tirs : plus fréquents quand il en reste peu
        const rate = (0.025 + g.sector * 0.02) * (1 + (1 - alive / 30));
        if (g.state === 'play' && Math.random() < rate * dt * (e.type === 'shooter' ? 3 : 1)) enemyFire(e.x, e.y + 5, e.type === 'shooter');
      } else if (e.mode === 'dive') {
        // Plongeon en piqué vers le joueur, puis retour en haut
        e.dive.t += dt;
        const t = e.dive.t;
        e.x = e.dive.x0 + (e.dive.tx - e.dive.x0) * Math.min(1, t / 1.6) + Math.sin(t * 5) * 18;
        e.y = e.dive.y0 + t * t * 70 + t * 40;
        if (t > 0.5 && !e.dive.shot) {
          e.dive.shot = true;
          enemyFire(e.x, e.y, true, 120);
        }
        if (e.y > g.H + 12 && !formation) {
          e.gone = true; // sbire du boss : il quitte l'écran
        } else if (e.y > g.H + 12) {
          e.mode = 'enter';
          e.enter = 0;
          e.enterDelay = 0.3;
          e.y = -16;
        }
      }
    });
    if (formation && formation.divers && g.state === 'play') {
      diveTimer -= dt;
      if (diveTimer <= 0) {
        diveTimer = rand(1.6, 3.2) - g.sector * 0.3;
        const candidates = enemies.filter((e) => e.mode === 'slot');
        const e = candidates.sort((a, b) => (a.type === 'diver' ? -1 : 1) - (b.type === 'diver' ? -1 : 1))[Math.floor(rand(0, Math.min(4, candidates.length)))];
        if (e && player.alive) e.mode = 'dive';
        if (e) e.dive = { t: 0, x0: e.x, y0: e.y, tx: player.x, shot: false };
      }
    }

    // ---- Boss ----
    if (boss) {
      boss.t += dt;
      boss.hit = Math.max(0, boss.hit - dt);
      const enraged = boss.hp < boss.max / 2;
      if (boss.enter) {
        boss.y += (boss.ty - boss.y) * dt * 1.5;
        if (Math.abs(boss.y - boss.ty) < 1) boss.enter = false;
      } else {
        boss.x = g.W / 2 + Math.sin(boss.t * (enraged ? 0.9 : 0.6)) * (g.W * 0.32);
        boss.y = boss.ty + Math.sin(boss.t * 1.3) * 10;
        boss.fire -= dt;
        boss.spawn -= dt;
        boss.burst -= dt;
        if (boss.fire <= 0) {
          boss.fire = enraged ? 1.3 : 2.0;
          const n = enraged ? 9 : 7;
          for (let i = 0; i < n; i++) {
            const a = Math.PI / 2 + (i - (n - 1) / 2) * 0.2;
            enemyBullets.push({ x: boss.x, y: boss.y + 16, vx: Math.cos(a) * 80, vy: Math.sin(a) * 80, life: 5, big: true });
          }
          sfx.enemyLaser();
        }
        if (boss.burst <= 0) {
          boss.burst = enraged ? 2.2 : 3.4;
          for (let i = 0; i < 3; i++) setTimeout(() => boss && enemyFire(boss.x, boss.y + 14, true, 140), i * 140);
        }
        if (boss.spawn <= 0 && enemies.length < 8) {
          boss.spawn = enraged ? 4.5 : 6.5;
          for (let i = 0; i < 2; i++) {
            enemies.push({ type: 'diver', slotX: 0, slotY: 0, x: boss.x + (i ? 20 : -20), y: boss.y, r: 6, hp: 1, mode: 'dive', dive: { t: 0, x0: boss.x + (i ? 20 : -20), y0: boss.y, tx: player.x + (i ? 30 : -30), shot: false }, hit: 0, frame: 0 });
          }
        }
      }
      events.boss(true, Math.max(0, boss.hp / boss.max));
    }

    // ---- Bonus ----
    pickups.forEach((p) => {
      p.y += p.vy * dt;
      p.t += dt;
      p.life -= dt;
    });
    pickups = pickups.filter((p) => p.life > 0 && p.y < g.H + 10);

    // ---- Collisions ----
    const hit = (a, b, extra = 0) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const rr = a.r + b.r + extra;
      return dx * dx + dy * dy < rr * rr;
    };
    bullets.forEach((b) => {
      b.r = 2;
      for (const e of enemies) {
        if (b.life > 0 && e.hp > 0 && hit(b, e)) {
          b.life = 0;
          e.hp--;
          e.hit = 0.1;
          sfx.hit();
        }
      }
      for (const r of rocks) {
        if (b.life > 0 && r.hp > 0 && hit(b, r)) {
          b.life = 0;
          r.hp--;
          r.hit = 0.08;
          sfx.hit();
          for (let i = 0; i < 3; i++) particles.push({ x: b.x, y: b.y, vx: rand(-30, 30), vy: rand(-30, 30), life: 0.3, max: 0.3, c: '#a3a9ba', size: 1 });
        }
      }
      if (boss && b.life > 0 && !boss.enter && hit(b, boss)) {
        b.life = 0;
        boss.hp--;
        boss.hit = 0.08;
        sfx.hit();
      }
    });
    bullets = bullets.filter((b) => b.life > 0);

    // Destructions
    enemies = enemies.filter((e) => {
      if (e.gone) return false;
      if (e.hp > 0) return true;
      explode(e.x, e.y, e.type === 'shooter' ? ['#ffee55', '#c23a64', '#ffffff'] : e.type === 'diver' ? ['#ffd166', '#d9772b', '#ffffff'] : ['#ff3dbb', '#7a4bc4', '#ffffff'], 20, 55);
      sfx.explode(false);
      addScore(ENEMY_STATS[e.type].score);
      dropPickup(e.x, e.y);
      g.shake = Math.max(g.shake, 1.5);
      return false;
    });
    const born = [];
    rocks = rocks.filter((r) => {
      if (r.hp > 0) return true;
      const s = ROCK[r.kind];
      explode(r.x, r.y, ['#a3a9ba', '#7f8597', '#ffd166'], r.kind === 'big' ? 22 : 12, r.kind === 'big' ? 50 : 35);
      sfx.explode(r.kind === 'big');
      addScore(s.score);
      if (s.next) {
        for (let i = 0; i < 2; i++) {
          const a = rand(0, TAU);
          const sp = rand(...ROCK[s.next].speed);
          born.push([s.next, r.x, r.y, Math.cos(a) * sp + r.vx * 0.4, Math.sin(a) * sp + r.vy * 0.4]);
        }
      }
      return false;
    });
    born.forEach((b) => spawnRock(...b));
    if (boss && boss.hp <= 0) {
      for (let i = 0; i < 6; i++) setTimeout(() => explode(boss ? boss.x + rand(-20, 20) : g.W / 2, boss ? boss.y + rand(-14, 14) : 50, ['#ffffff', '#ff3dbb', '#ffd166', '#a78bfa'], 30, 90), i * 120);
      sfx.explode(true);
      g.shake = 10;
      g.flash = 0.5;
      addScore(5000);
      const bx = boss.x;
      const by = boss.y;
      setTimeout(() => {
        explode(bx, by, ['#ffffff', '#ff3dbb', '#22e4ff'], 80, 160);
        const name = boss ? boss.name : 'Le boss';
        boss = null;
        enemies = [];
        enemyBullets = [];
        g.bossDone = true;
        events.boss(false, 0);
        events.say(`${name} vaincue ! La destination est en vue 🎉`);
      }, 800);
      boss.hp = Infinity; // n'explose qu'une fois
      boss.dying = true;
    }

    if (player.alive && g.state !== 'warp') {
      enemyBullets.forEach((b) => {
        b.r = b.big ? 3 : 2;
        if (b.life > 0 && hit(b, player, -1)) {
          b.life = 0;
          hurtPlayer(b.big ? 25 : 18);
        }
      });
      rocks.forEach((r) => {
        if (hit(r, player, -1)) {
          hurtPlayer(r.kind === 'big' ? 30 : r.kind === 'mid' ? 20 : 12);
          // Rebond
          const a = Math.atan2(player.y - r.y, player.x - r.x);
          player.vx = Math.cos(a) * 120;
          player.vy = Math.sin(a) * 120;
        }
      });
      enemies.forEach((e) => {
        if (hit(e, player, -1)) {
          e.hp = 0;
          hurtPlayer(35);
        }
      });
      if (boss && !boss.dying && hit(boss, player, -4)) hurtPlayer(40);
      pickups = pickups.filter((p) => {
        if (Math.hypot(p.x - player.x, p.y - player.y) < 10) {
          sfx.pickup();
          if (p.kind === 'shield') g.shield = Math.min(100, g.shield + 40);
          if (p.kind === 'triple') player.triple = 10;
          if (p.kind === 'rapid') player.rapid = 10;
          events.pickup(p.kind);
          return false;
        }
        return true;
      });
      // Portails
      portals.forEach((p) => {
        const ready = !p.dest || Math.abs(p.y - p.ty) < 4;
        if (g.state === 'clear' && ready && p.r > 10 && Math.hypot(p.x - player.x, p.y - player.y) < p.r) enterPortal(p);
      });
    }
    events.shield(Math.max(0, g.shield), g.special);

    // ---- Particules ----
    particles.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.life -= dt;
    });
    particles = particles.filter((p) => p.life > 0);
    rings.forEach((r) => {
      r.r += (r.max - r.r) * dt * 8;
      r.life -= dt;
    });
    rings = rings.filter((r) => r.life > 0);
    portals.forEach((p) => {
      p.r += (p.tr - p.r) * dt * 3;
      p.t += dt;
      if (p.dest) p.y += (p.ty - p.y) * Math.min(1, dt * 1.1); // la destination approche
    });

    // Vague terminée ?
    if (g.state === 'play' && enemies.length === 0 && rocks.length === 0 && !boss) {
      waveTimer += dt;
      if (waveTimer > 1.2) {
        formation = null;
        nextWave();
      }
    }

    // Saut par un portail : le vaisseau file vers le haut
    if (g.state === 'warp') {
      player.vy -= 900 * dt;
      player.y += player.vy * dt;
      for (let i = 0; i < 3; i++) particles.push({ x: player.x + rand(-2, 2), y: player.y + 6, vx: 0, vy: rand(40, 120), life: 0.4, max: 0.4, c: '#22e4ff', size: 1 });
    }
  }

  function enterPortal(p) {
    if (p.id === 'next') {
      portals = [];
      g.sector++;
      g.wave = -1;
      g.state = 'play';
      player.inv = 1.5;
      sfx.whoosh(0.8);
      g.flash = 0.4;
      events.sector(SECTORS[g.sector], g.sector);
      nextWave();
      return;
    }
    g.state = 'warp';
    player.x = p.x;
    player.y = p.y;
    player.vx = 0;
    player.vy = -40;
    player.a = -Math.PI / 2;
    sfx.portal();
    if (g.score > g.best) {
      g.best = g.score;
      try {
        localStorage.setItem('esgi-arcade-best', String(g.best));
      } catch {
        /* record pour cette visite */
      }
    }
    setTimeout(() => events.portal(p.id, g.score), 900);
  }

  // ------------------------------------------------------------------ dessin
  function drawSprite(ctx, img, x, y, a = 0, scale = 1, white = false) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (a) ctx.rotate(a);
    if (white) ctx.filter = 'brightness(4)';
    ctx.drawImage(img, Math.round((-img.width * scale) / 2), Math.round((-img.height * scale) / 2), img.width * scale, img.height * scale);
    ctx.restore();
  }

  let nebulaCache = null;
  function nebula(ctx) {
    const sector = SECTORS[g.sector] || SECTORS[0];
    const key = `${g.sector}-${g.W}-${g.H}`;
    if (!nebulaCache || nebulaCache.key !== key) {
      const c = document.createElement('canvas');
      c.width = g.W;
      c.height = g.H;
      const n = c.getContext('2d');
      const bg = n.createLinearGradient(0, 0, 0, g.H);
      bg.addColorStop(0, '#05040f');
      bg.addColorStop(1, '#0a0618');
      n.fillStyle = bg;
      n.fillRect(0, 0, g.W, g.H);
      [[0.25, 0.3, 0.55, 0], [0.78, 0.65, 0.5, 1], [0.6, 0.15, 0.3, 0]].forEach(([x, y, r, i]) => {
        const gr = n.createRadialGradient(g.W * x, g.H * y, 0, g.W * x, g.H * y, g.W * r);
        gr.addColorStop(0, sector.nebula[i]);
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        n.fillStyle = gr;
        n.fillRect(0, 0, g.W, g.H);
      });
      nebulaCache = { key, c };
    }
    ctx.drawImage(nebulaCache.c, 0, 0);
  }

  function render(ctx) {
    ctx.save();
    if (g.shake > 0) ctx.translate(Math.round(rand(-g.shake, g.shake)), Math.round(rand(-g.shake, g.shake)));
    nebula(ctx);
    // Étoiles (3 profondeurs)
    stars.forEach((s) => {
      const tw = 0.6 + 0.4 * Math.sin(g.time * 3 + s.tw);
      ctx.fillStyle = s.z === 3 ? `rgba(255,255,255,${tw})` : s.z === 2 ? `rgba(160,200,255,${0.7 * tw})` : `rgba(120,120,200,${0.5 * tw})`;
      ctx.fillRect(Math.round(s.x), Math.round(s.y), s.z === 3 ? 2 : 1, s.z === 3 ? 2 : 1);
    });

    // Portails
    portals.forEach((p) => {
      const info = PORTAL_INFO[p.id];
      if (p.dest) {
        // Halo qui pulse, puis la planète ou la station en pixels
        const img = p.id === 'esgi-bot' ? sprites.destinations.planet : sprites.destinations[p.id];
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const pulse = 0.5 + 0.5 * Math.sin(p.t * 3);
        const gr = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, 44 + pulse * 6);
        gr.addColorStop(0, `${info.color}55`);
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gr;
        ctx.fillRect(p.x - 52, p.y - 52, 104, 104);
        ctx.restore();
        drawSprite(ctx, img, p.x, p.y + Math.sin(p.t * 1.2) * 1.5);
        if (Math.abs(p.y - p.ty) < 4) {
          ctx.strokeStyle = info.color;
          ctx.globalAlpha = 0.5 + pulse * 0.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 6, 0, TAU);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
        ctx.font = '700 7px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = info.color;
        ctx.fillText(p.id === 'esgi-bot' ? 'ATTERRIR · LA TOUR' : `S’AMARRER · ${info.label}`, Math.round(p.x), Math.round(p.y + 42));
        return;
      }
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = info.color;
        ctx.globalAlpha = 0.9 - i * 0.25;
        ctx.lineWidth = 2 - i * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.r - i * 4), p.t * (i % 2 ? -2 : 2) + i, p.t * (i % 2 ? -2 : 2) + i + Math.PI * 1.5);
        ctx.stroke();
      }
      const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      gr.addColorStop(0, 'rgba(255,255,255,0.55)');
      gr.addColorStop(0.5, `${info.color}55`);
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
      for (let i = 0; i < 6; i++) {
        const a = p.t * 1.5 + (i / 6) * TAU;
        ctx.fillStyle = info.color;
        ctx.fillRect(Math.round(p.x + Math.cos(a) * (p.r + 3)), Math.round(p.y + Math.sin(a) * (p.r + 3)), 1, 1);
      }
      ctx.restore();
      ctx.font = '700 7px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = info.color;
      ctx.fillText(info.label, Math.round(p.x), Math.round(p.y + p.r + 11));
    });

    // Astéroïdes
    rocks.forEach((r) => drawSprite(ctx, r.sprite, r.x, r.y, Math.round(r.a / (Math.PI / 8)) * (Math.PI / 8), 1, r.hit > 0));

    // Bonus
    pickups.forEach((p) => {
      if (p.life < 2 && Math.floor(p.t * 8) % 2) return;
      drawSprite(ctx, sprites.pickups[p.kind], p.x, p.y + Math.sin(p.t * 4) * 1.5);
    });

    // NOVA rebelles
    enemies.forEach((e) => {
      const frames = sprites.nova[e.type];
      drawSprite(ctx, frames[Math.floor(e.frame) % 2], e.x, e.y, e.mode === 'dive' ? Math.sin(e.dive.t * 5) * 0.3 : 0, 1, e.hit > 0);
    });

    // Boss
    if (boss) {
      const s = 4;
      const wob = boss.dying ? rand(-2, 2) : 0;
      drawSprite(ctx, sprites.boss[Math.floor(boss.t * 3) % 2], boss.x + wob, boss.y, 0, s, boss.hit > 0);
      // Couronne
      ctx.fillStyle = boss.crown || '#ffd166';
      const cx = Math.round(boss.x - 10);
      const cy = Math.round(boss.y - 30);
      ctx.fillRect(cx, cy + 4, 20, 3);
      [0, 8, 16].forEach((o) => ctx.fillRect(cx + o, cy, 4, 4));
    }

    // Tirs (lumineux)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    bullets.forEach((b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.a + Math.PI / 2);
      ctx.fillStyle = 'rgba(34,228,255,0.35)';
      ctx.fillRect(-2, -4, 4, 8);
      ctx.fillStyle = '#c8fbff';
      ctx.fillRect(-1, -3, 2, 6);
      ctx.restore();
    });
    enemyBullets.forEach((b) => {
      const r = b.big ? 3 : 2;
      ctx.fillStyle = b.big ? 'rgba(255,61,187,0.35)' : 'rgba(255,60,90,0.35)';
      ctx.fillRect(Math.round(b.x) - r - 1, Math.round(b.y) - r - 1, r * 2 + 2, r * 2 + 2);
      ctx.fillStyle = b.big ? '#ffb3e6' : '#ffb0b8';
      ctx.fillRect(Math.round(b.x) - r + 1, Math.round(b.y) - r + 1, r * 2 - 2, r * 2 - 2);
    });
    ctx.restore();

    // Joueur
    if (player && player.alive && !(player.inv > 0 && Math.floor(g.time * 14) % 2 && g.state !== 'warp')) {
      const img = player.thrust > 0.1 && Math.floor(g.time * 20) % 2 ? sprites.playerThrust : sprites.player;
      drawSprite(ctx, img, player.x, player.y, player.a + Math.PI / 2);
      if (player.triple > 0 || player.rapid > 0) {
        ctx.strokeStyle = player.rapid > 0 ? 'rgba(255,61,187,0.5)' : 'rgba(255,209,102,0.5)';
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, TAU);
        ctx.stroke();
      }
    }

    // Particules et ondes
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.c;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    });
    rings.forEach((r) => {
      ctx.globalAlpha = Math.max(0, r.life * (r.wave ? 1.6 : 2.5));
      ctx.strokeStyle = r.c;
      ctx.lineWidth = r.wave ? 2 : 1;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, TAU);
      ctx.stroke();
    });
    ctx.restore();

    // Éclair (dégâts, portail)
    if (g.flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${Math.min(0.6, g.flash)})`;
      ctx.fillRect(0, 0, g.W, g.H);
    }
    ctx.restore();
  }

  // Outil de test (développement) : détruit tout ce qui est à l'écran
  function debugClear() {
    enemies.forEach((e) => (e.hp = 0));
    rocks.forEach((r) => {
      r.hp = 0;
      r.kind = 'small';
    });
    if (boss && !boss.dying) boss.hp = 0;
  }

  return {
    g,
    input,
    debugClear,
    get portals() {
      return portals;
    },
    start,
    update,
    render,
    resize,
    get player() {
      return player;
    }
  };
}
