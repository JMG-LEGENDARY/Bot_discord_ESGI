// =========================================================================
// SONS DU VAISSEAU (synthétisés : aucun fichier à télécharger)
// Bips des commandes, moteurs, souffle du saut, et bruitages du mini-jeu.
// Le son ne démarre qu'après un clic (règle des navigateurs) et se coupe
// avec le bouton 🔊 (choix enregistré).
// =========================================================================

let ctx = null;
let master = null;
let noiseBuffer = null;
let muted = (() => {
  try {
    return localStorage.getItem('esgi-sound') === '0';
  } catch {
    return false;
  }
})();

function ensure() {
  if (ctx) {
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.55;
  master.connect(ctx.destination);
  // Bruit blanc (2 s) réutilisé pour le souffle, les explosions, le moteur
  noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return ctx;
}

function noise() {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;
  src.loop = true;
  return src;
}

function tone({ type = 'sine', from = 440, to = from, dur = 0.15, vol = 0.2, delay = 0 }) {
  if (!ensure()) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function burst({ dur = 0.4, vol = 0.3, from = 2000, to = 200, type = 'lowpass', q = 1, delay = 0 }) {
  if (!ensure()) return;
  const t = ctx.currentTime + delay;
  const src = noise();
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(Math.max(30, to), t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.03, dur / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t, Math.random());
  src.stop(t + dur + 0.05);
}

// Moteurs : grondement grave continu, plus fort avec la vitesse
let engine = null;
function engineStart() {
  if (!ensure() || engine) return;
  const src = noise();
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 120;
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 42;
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.05;
  const g = ctx.createGain();
  g.gain.value = 0.0001;
  src.connect(f).connect(g);
  osc.connect(oscGain).connect(g);
  g.connect(master);
  src.start();
  osc.start();
  engine = { src, osc, f, g };
}
function engineLevel(v) {
  if (!engine) return;
  const t = ctx.currentTime;
  engine.g.gain.setTargetAtTime(0.0001 + v * 0.5, t, 0.15);
  engine.f.frequency.setTargetAtTime(120 + v * 900, t, 0.2);
  engine.osc.frequency.setTargetAtTime(42 + v * 60, t, 0.2);
}
function engineStop() {
  if (!engine) return;
  const e = engine;
  engine = null;
  const t = ctx.currentTime;
  e.g.gain.setTargetAtTime(0.0001, t, 0.3);
  e.src.stop(t + 1.5);
  e.osc.stop(t + 1.5);
}

export const sfx = {
  unlock: () => ensure(),
  get muted() {
    return muted;
  },
  setMuted(v) {
    muted = v;
    try {
      localStorage.setItem('esgi-sound', v ? '0' : '1');
    } catch {
      /* choix pour cette visite */
    }
    if (master) master.gain.setTargetAtTime(v ? 0 : 0.55, ctx.currentTime, 0.05);
  },
  hover: () => tone({ type: 'sine', from: 1400, to: 1800, dur: 0.05, vol: 0.04 }),
  click: () => {
    tone({ type: 'square', from: 880, to: 660, dur: 0.07, vol: 0.06 });
    tone({ type: 'sine', from: 1320, to: 1320, dur: 0.12, vol: 0.06, delay: 0.06 });
  },
  confirm: () => [523, 659, 784, 1046].forEach((f, i) => tone({ type: 'triangle', from: f, dur: 0.14, vol: 0.09, delay: i * 0.07 })),
  countdown: (high = false) => tone({ type: 'sine', from: high ? 1320 : 880, dur: high ? 0.35 : 0.14, vol: 0.12 }),
  engineStart,
  engineLevel,
  engineStop,
  // Souffle du saut : bruit filtré qui monte, grave qui descend
  whoosh: (dur = 1.6) => {
    burst({ dur, vol: 0.35, from: 300, to: 5000, type: 'bandpass', q: 0.8 });
    tone({ type: 'sawtooth', from: 220, to: 30, dur, vol: 0.08 });
  },
  arrive: () => {
    burst({ dur: 1.2, vol: 0.3, from: 4000, to: 120, type: 'lowpass' });
    tone({ type: 'sine', from: 90, to: 40, dur: 1.0, vol: 0.18 });
  },
  // Mini-jeu
  laser: () => tone({ type: 'square', from: 1500, to: 380, dur: 0.09, vol: 0.035 }),
  enemyLaser: () => tone({ type: 'sawtooth', from: 520, to: 180, dur: 0.14, vol: 0.03 }),
  explode: (big = false) => {
    burst({ dur: big ? 0.9 : 0.35, vol: big ? 0.4 : 0.22, from: big ? 1800 : 2600, to: 60 });
    if (big) tone({ type: 'sine', from: 120, to: 30, dur: 0.8, vol: 0.2 });
  },
  hit: () => burst({ dur: 0.12, vol: 0.15, from: 3000, to: 800, type: 'highpass' }),
  hurt: () => {
    tone({ type: 'square', from: 220, to: 90, dur: 0.25, vol: 0.1 });
    burst({ dur: 0.3, vol: 0.2, from: 1200, to: 100 });
  },
  pickup: () => [660, 880, 1320].forEach((f, i) => tone({ type: 'triangle', from: f, dur: 0.1, vol: 0.08, delay: i * 0.05 })),
  special: () => {
    tone({ type: 'sine', from: 200, to: 1600, dur: 0.5, vol: 0.12 });
    burst({ dur: 0.6, vol: 0.25, from: 400, to: 6000, type: 'bandpass', q: 1.5 });
  },
  portal: () => [392, 523, 659, 784, 1046].forEach((f, i) => tone({ type: 'sine', from: f, dur: 0.3, vol: 0.07, delay: i * 0.09 }))
};
