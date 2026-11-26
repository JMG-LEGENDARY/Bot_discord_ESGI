import './arcade.css';
import { createSprites } from './sprites.js';
import { createGame, SECTORS, PORTAL_INFO } from './game.js';
import { sfx } from '../audio.js';
import { IS_TOUCH } from '../util.js';

// =========================================================================
// ÉCRAN DE PILOTAGE MANUEL (le mini-jeu d'arcade 2D)
// Le jeu est dessiné dans une petite image (environ 480 × 300 pixels),
// agrandie sans lissage : vrais pixels d'arcade, et presque aucun calcul.
// Ce fichier gère l'écran : HUD, menus, commandes clavier/souris/tactile,
// et l'effet d'allumage d'un écran cathodique.
// =========================================================================

export function createArcade({ root, onExit, onPortal }) {
  const sprites = createSprites();

  const el = document.createElement('div');
  el.className = 'arcade';
  el.innerHTML = `
    <canvas class="arcade-screen" aria-label="Mini-jeu de pilotage"></canvas>
    <div class="arcade-crt" aria-hidden="true"></div>
    <div class="arcade-hud">
      <div class="ah-left">
        <div class="ah-label">BOUCLIER</div>
        <div class="ah-bar"><span class="ah-shield"></span></div>
        <div class="ah-label">ONDE NOVA <kbd>ESPACE</kbd></div>
        <div class="ah-bar special"><span class="ah-special"></span></div>
        <div class="ah-lives" aria-label="Vies"></div>
      </div>
      <div class="ah-center">
        <div class="ah-score">0</div>
        <div class="ah-best">RECORD <span>0</span></div>
      </div>
      <div class="ah-right">
        <div class="ah-sector"></div>
        <div class="ah-wave"></div>
        <button type="button" class="ah-pause" aria-label="Pause">❚❚</button>
      </div>
    </div>
    <div class="ah-boss" hidden><span>MÉGA-NOVA</span><div class="ah-bar boss"><span class="ah-boss-hp"></span></div></div>
    <div class="ah-banner" aria-live="polite"></div>
    <div class="ah-nova">
      <canvas class="ah-nova-face" width="13" height="12" aria-hidden="true"></canvas>
      <p class="ah-nova-text"></p>
    </div>
    <div class="arcade-menu" data-screen="title">
      <div class="am-box">
        <div class="am-kicker">ESGI-01 // PILOTAGE MANUEL</div>
        <h1 class="am-title">CONVOI NOVA</h1>
        <p class="am-sub">Traverse la ceinture d’astéroïdes, la flotte des NOVA rebelles et la forteresse de la MÉGA-NOVA. Chaque secteur nettoyé ouvre un portail : <b style="color:#ff3dbb">LABO</b>, <b style="color:#a78bfa">QG</b>, puis <b style="color:#22e4ff">ESGI-BOT</b>.</p>
        <ul class="am-keys">
          ${
            IS_TOUCH
              ? '<li><kbd>⬤ gauche</kbd> se déplacer</li><li><kbd>⬤ droite</kbd> viser et tirer</li><li><kbd>ONDE</kbd> capacité spéciale</li>'
              : '<li><kbd>ZQSD</kbd><kbd>WASD</kbd> se déplacer</li><li><kbd>SOURIS</kbd> viser · <kbd>CLIC</kbd> tirer</li><li><kbd>ESPACE</kbd> onde NOVA · <kbd>ÉCHAP</kbd> pause</li>'
          }
        </ul>
        <div class="am-actions">
          <button type="button" class="am-btn primary" data-act="start">DÉCOLLER ▶</button>
          <button type="button" class="am-btn" data-act="exit">↩ COCKPIT</button>
        </div>
        <div class="am-best">RECORD : <span>0</span></div>
      </div>
    </div>
    <div class="arcade-touch" aria-hidden="true">
      <div class="at-stick left"><span></span></div>
      <div class="at-stick right"><span></span></div>
      <button type="button" class="at-special">ONDE</button>
    </div>`;
  root.appendChild(el);

  const canvas = el.querySelector('.arcade-screen');
  const ctx = canvas.getContext('2d');
  const buffer = document.createElement('canvas');
  const bctx = buffer.getContext('2d');
  const menu = el.querySelector('.arcade-menu');
  const box = el.querySelector('.am-box');
  const titleHTML = box.innerHTML;
  const banner = el.querySelector('.ah-banner');
  const novaText = el.querySelector('.ah-nova-text');
  const novaBox = el.querySelector('.ah-nova');
  el.querySelector('.ah-nova-face').getContext('2d').drawImage(sprites.goodNova, 0, 0);
  const $ = (s) => el.querySelector(s);

  // ---- Événements du jeu -> HUD ----
  let novaTimer = null;
  function say(text, ms = 3200) {
    clearTimeout(novaTimer);
    novaText.textContent = text;
    novaBox.classList.add('on');
    novaTimer = setTimeout(() => novaBox.classList.remove('on'), ms);
  }
  let bannerTimer = null;
  function showBanner(kicker, title, color, ms = 2200) {
    clearTimeout(bannerTimer);
    banner.innerHTML = `<small>${kicker}</small><b>${title}</b>`;
    banner.style.setProperty('--c', color);
    banner.classList.remove('on');
    void banner.offsetWidth;
    banner.classList.add('on');
    bannerTimer = setTimeout(() => banner.classList.remove('on'), ms);
  }
  function renderLives(n) {
    $('.ah-lives').innerHTML = Array.from({ length: Math.max(0, n) }, () => '<i></i>').join('');
  }
  let lastShield = -1;
  let lastSpecial = -1;
  const events = {
    score: (s) => ($('.ah-score').textContent = s.toLocaleString('fr-FR')),
    lives: renderLives,
    shield: (v, sp) => {
      const sv = Math.round(v);
      if (sv !== lastShield) {
        lastShield = sv;
        $('.ah-shield').style.width = `${sv}%`;
        $('.ah-shield').classList.toggle('low', sv <= 30);
      }
      const spv = Math.round(sp * 50);
      if (spv !== lastSpecial) {
        lastSpecial = spv;
        $('.ah-special').style.width = `${spv * 2}%`;
        $('.ah-special').classList.toggle('ready', sp >= 1);
        $('.at-special').classList.toggle('ready', sp >= 1);
      }
    },
    sector: (s, i) => {
      $('.ah-sector').textContent = `SECTEUR ${i + 1} · ${s.name}`;
      $('.ah-sector').style.color = s.color;
      showBanner(`SECTEUR ${i + 1} / ${SECTORS.length}`, s.name, s.color, 2600);
      if (i === 0) say('C’est parti ! Détruis les astéroïdes, ils se cassent en morceaux ☄️');
      if (i === 2) say('La forteresse de la MÉGA-NOVA… reste en mouvement !');
    },
    wave: (n, total) => ($('.ah-wave').textContent = `VAGUE ${n} / ${total}`),
    boss: (on, hp) => {
      $('.ah-boss').hidden = !on;
      $('.ah-boss-hp').style.width = `${Math.round(hp * 100)}%`;
    },
    say,
    pickup: (k) => {
      const t = { shield: 'BOUCLIER +40', triple: 'TIR TRIPLE', rapid: 'TIR RAPIDE' }[k];
      showBanner('BONUS', t, k === 'shield' ? '#22e4ff' : k === 'triple' ? '#ffd166' : '#ff3dbb', 1200);
    },
    cleared: (sector, last) => {
      showBanner(last ? 'VICTOIRE' : 'SECTEUR NETTOYÉ', last ? 'TOUS LES PORTAILS SONT OUVERTS' : `PORTAIL ${PORTAL_INFO[sector.unlock].label} OUVERT`, last ? '#ffd166' : PORTAL_INFO[sector.unlock].color, 3200);
      say(last ? 'Choisis ta destination, pilote ! 🌌' : 'Traverse un portail pour y aller, ou continue vers le secteur suivant ✨', 5000);
    },
    gameOver: (score, best) => openMenu('over', { score, best }),
    portal: (id, score) => {
      running = false;
      onPortal(id, score);
    }
  };

  const game = createGame({ sprites, events });
  const input = game.input;
  if (import.meta.env.DEV) window.__arcade = game;

  // ---- Taille de l'image : petite, agrandie en pixels nets ----
  let scale = 1;
  function resize() {
    const w = el.clientWidth || window.innerWidth;
    const h = el.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    // Environ 220 pixels de jeu sur le petit côté (gros pixels d'arcade)
    const short = Math.min(w, h);
    scale = short / (w < h ? 200 : 220);
    const W = Math.round(w / scale);
    const H = Math.round(h / scale);
    buffer.width = W;
    buffer.height = H;
    game.resize(W, H);
  }
  window.addEventListener('resize', () => visible && resize());

  // ---- Clavier ----
  const keys = new Set();
  const MOVE = {
    KeyW: [0, -1], KeyZ: [0, -1], ArrowUp: [0, -1],
    KeyS: [0, 1], ArrowDown: [0, 1],
    KeyA: [-1, 0], KeyQ: [-1, 0], ArrowLeft: [-1, 0],
    KeyD: [1, 0], ArrowRight: [1, 0]
  };
  function updateMove() {
    let x = 0;
    let y = 0;
    keys.forEach((k) => {
      if (MOVE[k]) {
        x += MOVE[k][0];
        y += MOVE[k][1];
      }
    });
    input.x = Math.max(-1, Math.min(1, x));
    input.y = Math.max(-1, Math.min(1, y));
  }
  window.addEventListener('keydown', (e) => {
    if (!visible) return;
    if (e.code === 'Escape' || e.code === 'KeyP') {
      e.preventDefault();
      if (running && game.g.state !== 'over') togglePause();
      return;
    }
    if (menu.classList.contains('open')) {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        menu.querySelector('.am-btn.primary')?.click();
      }
      return;
    }
    if (MOVE[e.code]) {
      e.preventDefault();
      keys.add(e.code);
      updateMove();
    }
    if (e.code === 'Space') {
      e.preventDefault();
      input.special = true;
    }
    if (e.code === 'Enter') input.fire = true;
  });
  window.addEventListener('keyup', (e) => {
    keys.delete(e.code);
    updateMove();
    if (e.code === 'Enter') input.fire = false;
  });
  window.addEventListener('blur', () => {
    keys.clear();
    updateMove();
    input.fire = false;
  });

  // ---- Souris : viser et tirer ----
  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = canvas.getBoundingClientRect();
    input.aimMode = 'mouse';
    input.mouse = { x: ((e.clientX - r.left) / r.width) * buffer.width, y: ((e.clientY - r.top) / r.height) * buffer.height };
  });
  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button === 0) {
      input.fire = true;
      sfx.unlock();
    }
  });
  window.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'mouse') input.fire = false;
  });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  // ---- Tactile : deux joysticks (déplacement / visée + tir) ----
  const touch = el.querySelector('.arcade-touch');
  const sticks = {};
  function bindStick(side) {
    const zone = touch.querySelector(`.at-stick.${side}`);
    const knob = zone.querySelector('span');
    zone.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      zone.setPointerCapture(e.pointerId);
      const r = zone.getBoundingClientRect();
      sticks[side] = { id: e.pointerId, cx: r.left + r.width / 2, cy: r.top + r.height / 2, rad: r.width / 2 };
      move(e);
      sfx.unlock();
    });
    const move = (e) => {
      const s = sticks[side];
      if (!s || s.id !== e.pointerId) return;
      let dx = (e.clientX - s.cx) / s.rad;
      let dy = (e.clientY - s.cy) / s.rad;
      const len = Math.hypot(dx, dy);
      if (len > 1) {
        dx /= len;
        dy /= len;
      }
      knob.style.transform = `translate(${dx * 50}%, ${dy * 50}%)`;
      if (side === 'left') {
        input.x = dx;
        input.y = dy;
      } else {
        input.aimMode = 'stick';
        input.aimX = dx;
        input.aimY = dy;
        input.fire = len > 0.25;
      }
    };
    zone.addEventListener('pointermove', move);
    const end = (e) => {
      const s = sticks[side];
      if (!s || s.id !== e.pointerId) return;
      sticks[side] = null;
      knob.style.transform = '';
      if (side === 'left') {
        input.x = 0;
        input.y = 0;
      } else {
        input.fire = false;
      }
    };
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', end);
  }
  bindStick('left');
  bindStick('right');
  touch.querySelector('.at-special').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    input.special = true;
  });
  el.classList.toggle('touch', IS_TOUCH);

  // ---- Menus ----
  let running = false;
  let paused = false;
  function openMenu(screen, data = {}) {
    menu.dataset.screen = screen;
    const best = game.g.best.toLocaleString('fr-FR');
    if (screen === 'pause') {
      box.innerHTML = `
        <div class="am-kicker">PILOTAGE MANUEL</div>
        <h1 class="am-title small">PAUSE</h1>
        <div class="am-actions">
          <button type="button" class="am-btn primary" data-act="resume">REPRENDRE ▶</button>
          <button type="button" class="am-btn" data-act="restart">RECOMMENCER</button>
          <button type="button" class="am-btn" data-act="exit">↩ COCKPIT</button>
        </div>`;
    } else if (screen === 'over') {
      box.innerHTML = `
        <div class="am-kicker">VAISSEAU DÉTRUIT</div>
        <h1 class="am-title small danger">GAME OVER</h1>
        <p class="am-sub">Score : <b>${data.score.toLocaleString('fr-FR')}</b> · Record : <b>${best}</b></p>
        <div class="am-actions">
          <button type="button" class="am-btn primary" data-act="restart">REJOUER ▶</button>
          <button type="button" class="am-btn" data-act="exit">↩ COCKPIT</button>
        </div>`;
      say('Pas grave, on y retourne ? 💫', 4000);
    } else {
      box.innerHTML = titleHTML;
      $('.am-best span').textContent = best;
    }
    menu.classList.add('open');
    menu.querySelector('.am-btn.primary')?.focus({ preventScroll: true });
  }
  function closeMenu() {
    menu.classList.remove('open');
  }
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    sfx.unlock();
    sfx.click();
    const act = b.dataset.act;
    if (act === 'start' || act === 'restart') {
      closeMenu();
      paused = false;
      running = true;
      renderLives(3);
      game.start();
      events.score(0);
      $('.ah-best span').textContent = game.g.best.toLocaleString('fr-FR');
      el.classList.add('playing');
    } else if (act === 'resume') {
      togglePause();
    } else if (act === 'exit') {
      running = false;
      onExit();
    }
  });
  $('.ah-pause').addEventListener('click', () => running && togglePause());
  function togglePause() {
    paused = !paused;
    if (paused) openMenu('pause');
    else closeMenu();
  }

  // ---- Boucle (appelée par le vaisseau) ----
  let visible = false;
  function frame(delta) {
    if (!visible) return;
    if (running && !paused) game.update(delta);
    else game.update(0.016 * 0.3); // fond étoilé qui défile doucement dans les menus
    bctx.imageSmoothingEnabled = false;
    game.render(bctx);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
  }

  // ---- Allumage / extinction façon écran cathodique ----
  function show() {
    visible = true;
    el.classList.add('visible');
    resize();
    running = false;
    paused = false;
    el.classList.remove('playing', 'crt-off');
    el.classList.add('crt-on');
    openMenu('title');
    $('.am-best span').textContent = game.g.best.toLocaleString('fr-FR');
    say('Prends le manche ! Je reste dans ta radio 📡', 3500);
    return new Promise((r) => setTimeout(r, 700));
  }
  function hide() {
    running = false;
    keys.clear();
    updateMove();
    input.fire = false;
    el.classList.remove('crt-on');
    el.classList.add('crt-off');
    return new Promise((r) =>
      setTimeout(() => {
        visible = false;
        el.classList.remove('visible', 'crt-off', 'playing');
        closeMenu();
        r();
      }, 520)
    );
  }

  return { show, hide, frame };
}
