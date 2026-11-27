import { DESTINATIONS, DESTINATION_ORDER, MANUAL } from './destinations.js';
import { sfx } from './audio.js';
import { saveLiteMode } from './util.js';

// =========================================================================
// HUD DU COCKPIT (interface intégrée à la verrière)
// Haut : identité du vaisseau, horloge, son et mode léger.
// Centre : annonces de l'ordinateur de bord (compte à rebours du saut).
// Bas : la barre des commandes, doublon accessible des boutons 3D
// (clavier : 1, 2, 3 et M).
// =========================================================================

export function createHud(root, { music, onCommand, onHover, onLite, liteOn }) {
  const el = document.createElement('div');
  el.className = 'ship-hud';
  const items = [...DESTINATION_ORDER.map((id) => DESTINATIONS[id]), MANUAL];
  el.innerHTML = `
    <div class="sh-frame" aria-hidden="true">
      <span class="sh-corner tl"></span><span class="sh-corner tr"></span>
      <span class="sh-corner bl"></span><span class="sh-corner br"></span>
    </div>
    <header class="sh-top">
      <div class="sh-id">
        <img src="${import.meta.env.BASE_URL}logo.png" alt="" width="34" height="34" />
        <div>
          <div class="sh-name">VAISSEAU ESGI-01</div>
          <div class="sh-state"><span class="sh-dot"></span><span class="sh-state-text">SYSTÈMES NOMINAUX</span></div>
        </div>
      </div>
      <div class="sh-telemetry" aria-hidden="true">
        <span>VIT <b class="sh-speed">0,02 c</b></span>
        <span>CAP <b class="sh-heading">000°</b></span>
        <span class="sh-clock">--:--</span>
      </div>
      <div class="sh-tools">
        <a class="sh-track" target="_blank" rel="noopener noreferrer" hidden></a>
        <button type="button" class="sh-tool" data-tool="sound" aria-pressed="${!music.muted}" title="Couper ou remettre la musique">${music.muted ? '✕' : '♪'}<span> MUSIQUE</span></button>
        <button type="button" class="sh-tool" data-tool="lite" aria-pressed="${liteOn}" title="Moins d'effets, plus de fluidité">⚡<span> LÉGER</span></button>
      </div>
    </header>
    <div class="sh-reticle" aria-hidden="true"><span></span></div>
    <div class="sh-announce" aria-live="assertive">
      <div class="sh-announce-kicker"></div>
      <div class="sh-announce-title"></div>
      <div class="sh-announce-sub"></div>
    </div>
    <div class="sh-hint">Choisis une destination à gauche, puis clique sur NOVA pour l’autopilote ou prends les leviers</div>
    <div class="sh-go" hidden>
      <span class="sh-go-target"></span>
      <button type="button" class="sh-go-btn" data-cmd="engage"><kbd>ENTRÉE</kbd> AUTOPILOTE (NOVA)</button>
      <button type="button" class="sh-go-btn manual" data-cmd="jeu"><kbd>M</kbd> PRENDRE LES LEVIERS</button>
    </div>
    <nav class="sh-nav" aria-label="Destinations du vaisseau">
      ${items
        .map(
          (d, i) => `
        <button type="button" class="sh-cmd" data-cmd="${d.id}" style="--c:${d.color}">
          <kbd>${d.id === 'jeu' ? 'M' : i + 1}</kbd>
          <span class="sh-cmd-name">${d.command}</span>
          <span class="sh-cmd-dest">${d.id === 'jeu' ? 'MINI-JEU ARCADE' : d.name}</span>
        </button>`
        )
        .join('')}
    </nav>`;
  root.appendChild(el);

  const announce = el.querySelector('.sh-announce');
  const kicker = el.querySelector('.sh-announce-kicker');
  const title = el.querySelector('.sh-announce-title');
  const sub = el.querySelector('.sh-announce-sub');
  const stateText = el.querySelector('.sh-state-text');
  const speedEl = el.querySelector('.sh-speed');
  const headingEl = el.querySelector('.sh-heading');
  const clockEl = el.querySelector('.sh-clock');
  const cmdButtons = [...el.querySelectorAll('.sh-cmd')];
  const go = el.querySelector('.sh-go');
  const hintEl = el.querySelector('.sh-hint');
  const goTarget = el.querySelector('.sh-go-target');
  go.querySelectorAll('.sh-go-btn').forEach((b) => b.addEventListener('click', () => !locked && onCommand(b.dataset.cmd)));
  let locked = false;

  cmdButtons.forEach((b) => {
    b.addEventListener('click', () => !locked && onCommand(b.dataset.cmd));
    b.addEventListener('mouseenter', () => {
      if (locked) return;
      sfx.hover();
      onHover(b.dataset.cmd);
    });
    b.addEventListener('mouseleave', () => !locked && onHover(null));
    b.addEventListener('focus', () => !locked && onHover(b.dataset.cmd));
    b.addEventListener('blur', () => !locked && onHover(null));
  });

  // Bouton MUSIQUE : coupe ou remet la musique. Les bruitages (bips du cockpit,
  // tirs du mini-jeu) ne se coupent jamais.
  if (sfx.muted) sfx.setMuted(false); // ancien réglage : on remet les bruitages
  const soundBtn = el.querySelector('[data-tool="sound"]');
  const trackEl = el.querySelector('.sh-track');
  function syncSound() {
    soundBtn.innerHTML = `${music.muted ? '✕' : '♪'}<span> MUSIQUE</span>`;
    soundBtn.setAttribute('aria-pressed', String(!music.muted));
    trackEl.hidden = music.muted || !music.track;
    toolsChanged();
  }
  soundBtn.addEventListener('click', () => {
    music.unlock();
    music.setMuted(!music.muted);
    if (!music.muted) music.start();
    syncSound();
  });
  // Titre du morceau en cours (lien vers SoundCloud, crédit de l'artiste)
  music.onTrack = (tr) => {
    trackEl.textContent = `♪ ${tr.title}${tr.artist ? ` · ${tr.artist}` : ''}`;
    trackEl.href = tr.url;
    syncSound();
  };
  music.onMuteChange = () => syncSound();
  music.onFallback = () => {
    trackEl.hidden = true;
  };
  const liteBtn = el.querySelector('[data-tool="lite"]');
  liteBtn.addEventListener('click', () => {
    const on = liteBtn.getAttribute('aria-pressed') !== 'true';
    liteBtn.setAttribute('aria-pressed', String(on));
    saveLiteMode(on);
    onLite(on);
    toolsChanged();
  });
  // Les interrupteurs 3D du tableau de bord pilotent ces mêmes réglages
  let onTools = null;
  function toolsChanged() {
    if (onTools) onTools({ sound: !music.muted, lite: liteBtn.getAttribute('aria-pressed') === 'true' });
  }

  function onKey(e) {
    if (locked || !el.isConnected || el.classList.contains('hidden')) return;
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    const map = { 1: 'esgi-bot', 2: 'qg', 3: 'labo', m: 'jeu', M: 'jeu', Enter: 'engage' };
    if (map[e.key]) {
      e.preventDefault();
      onCommand(map[e.key]);
    }
  }
  window.addEventListener('keydown', onKey);

  let announceTimer = null;
  function show(k, t, s = '', color = '#22e4ff', hold = 0) {
    clearTimeout(announceTimer);
    kicker.textContent = k;
    title.textContent = t;
    sub.textContent = s;
    announce.style.setProperty('--c', color);
    announce.classList.remove('on');
    void announce.offsetWidth; // relance l'animation
    announce.classList.add('on');
    if (hold) announceTimer = setTimeout(() => announce.classList.remove('on'), hold);
  }

  function tick(speedC, heading) {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    speedEl.textContent = speedC >= 1 ? `${speedC.toFixed(1).replace('.', ',')} c` : `${speedC.toFixed(2).replace('.', ',')} c`;
    headingEl.textContent = `${String(Math.round(((heading % 360) + 360) % 360)).padStart(3, '0')}°`;
  }

  return {
    /** Interrupteurs 3D : mêmes actions que les boutons de la barre */
    tools: {
      sound: () => soundBtn.click(),
      lite: () => liteBtn.click()
    },
    set onTools(fn) {
      onTools = fn;
      toolsChanged();
    },
    el,
    show,
    hideAnnounce: () => announce.classList.remove('on'),
    tick,
    setState(text, alert = false) {
      stateText.textContent = text;
      el.classList.toggle('alert', alert);
    },
    setTarget(dest) {
      go.hidden = !dest;
      el.classList.toggle('has-target', Boolean(dest));
      // Consigne sous le tableau de bord : la cible, puis quoi faire
      hintEl.innerHTML = dest
        ? `CAP SUR <b style="color:${dest.color}">${dest.name}</b> · clique sur NOVA pour l’autopilote, ou prends les leviers`
        : 'Choisis une destination à gauche, puis clique sur NOVA pour l’autopilote ou prends les leviers';
      if (dest) {
        goTarget.innerHTML = `CAP SUR <b style="color:${dest.color}">${dest.name}</b>`;
        go.style.setProperty('--c', dest.color);
      }
      cmdButtons.forEach((b) => b.classList.toggle('target', dest && b.dataset.cmd === dest.id));
    },
    highlight(id) {
      cmdButtons.forEach((b) => b.classList.toggle('active', b.dataset.cmd === id));
    },
    lock(v) {
      locked = v;
      el.classList.toggle('locked', v);
    },
    setVisible(v) {
      el.classList.toggle('hidden', !v);
    }
  };
}
