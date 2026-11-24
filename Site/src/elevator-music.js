// =========================================================================
// MUSIQUE D'ASCENSEUR (composée en direct avec Web Audio, aucun fichier)
// Petite boucle bossa douce : accords de piano électrique, basse, arpèges.
// =========================================================================

const BPM = 104;
const BEAT = 60 / BPM;

// I – vi – ii – V en fa majeur (notes MIDI)
const CHORDS = [
  { bass: 41, notes: [57, 60, 64, 69] }, // Fmaj7
  { bass: 38, notes: [57, 60, 62, 65] }, // Dm7
  { bass: 43, notes: [58, 62, 65, 67] }, // Gm7
  { bass: 36, notes: [58, 60, 64, 67] } // C7
];
// Mélodie (une note par demi-temps, null = silence), 4 mesures
const MELODY = [
  72, null, 69, null, 72, 74, null, 72,
  69, null, 65, null, 69, null, null, null,
  70, null, 69, 67, null, 65, 67, null,
  64, null, 67, null, 65, null, null, null
];

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

export function createElevatorMusic() {
  let ctx = null;
  let master = null;
  let timer = null;
  let nextTime = 0;
  let step = 0;
  let muted = false;
  try {
    muted = localStorage.getItem('esgi-ascenseur-muet') === '1';
  } catch (e) {
    /* stockage indisponible : son activé par défaut */
  }

  function ensure() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    // Son feutré, comme à travers les haut-parleurs de la cabine
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3200;
    master.connect(tone);
    tone.connect(ctx.destination);
    return true;
  }

  // Piano électrique : sinus + harmoniques douces, longue chute
  function epiano(freq, time, dur, vol) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(vol, time + 0.012);
    g.gain.exponentialRampToValueAtTime(vol * 0.35, time + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    g.connect(master);
    [[1, 1], [2, 0.18], [3.01, 0.06]].forEach(([mult, amp]) => {
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq * mult;
      og.gain.value = amp;
      o.connect(og);
      og.connect(g);
      o.start(time);
      o.stop(time + dur + 0.05);
    });
  }

  function bass(freq, time, dur) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.22, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    o.connect(g);
    g.connect(master);
    o.start(time);
    o.stop(time + dur + 0.05);
  }

  // Petit « shaker » : bruit filtré très court
  let noiseBuffer = null;
  function shaker(time, vol) {
    if (!noiseBuffer) {
      noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 6000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
    src.connect(hp);
    hp.connect(g);
    g.connect(master);
    src.start(time);
  }

  // Planifie les notes un peu à l'avance (horloge audio = tempo stable)
  function schedule() {
    while (nextTime < ctx.currentTime + 0.25) {
      const half = step % 32; // 32 demi-temps = 4 mesures
      const chord = CHORDS[Math.floor(half / 8)];
      const inBar = half % 8;
      if (inBar === 0 || inBar === 3 || inBar === 6) {
        chord.notes.forEach((n) => epiano(midi(n), nextTime, BEAT * 1.6, 0.045));
      }
      if (inBar === 0) bass(midi(chord.bass), nextTime, BEAT * 1.4);
      if (inBar === 3) bass(midi(chord.bass + 7), nextTime, BEAT * 1.0);
      if (inBar === 4) bass(midi(chord.bass + 12), nextTime, BEAT * 1.0);
      const note = MELODY[half];
      if (note) epiano(midi(note), nextTime, BEAT * 1.2, 0.07);
      shaker(nextTime, inBar % 2 === 0 ? 0.03 : 0.018);
      nextTime += BEAT / 2;
      step++;
    }
  }

  function fadeTo(value, seconds) {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + seconds);
  }

  return {
    get muted() {
      return muted;
    },
    setMuted(value) {
      muted = value;
      try {
        localStorage.setItem('esgi-ascenseur-muet', value ? '1' : '0');
      } catch (e) {
        /* sans importance */
      }
      if (ctx && timer) fadeTo(muted ? 0 : 0.9, 0.3);
    },
    /** Lance la musique (après un clic : règle des navigateurs) */
    start() {
      if (!ensure()) return;
      if (ctx.state === 'suspended') ctx.resume();
      if (timer) return;
      step = 0;
      nextTime = ctx.currentTime + 0.08;
      schedule();
      timer = setInterval(schedule, 90);
      fadeTo(muted ? 0 : 0.9, 0.8);
    },
    stop(fadeSeconds = 0.8) {
      if (!ctx || !timer) return;
      fadeTo(0, fadeSeconds);
      const t = timer;
      setTimeout(() => {
        clearInterval(t);
        if (timer === t) timer = null;
      }, fadeSeconds * 1000 + 50);
    },
    /** « Ding » d'arrivée à l'étage (deux notes de carillon) */
    ding() {
      if (!ensure() || muted) return;
      if (ctx.state === 'suspended') ctx.resume();
      const out = ctx.createGain();
      out.gain.value = 0.9;
      out.connect(ctx.destination);
      [[88, 0], [84, 0.32]].forEach(([n, delay]) => {
        const t = ctx.currentTime + delay;
        [[1, 0.25], [2.76, 0.06], [5.4, 0.025]].forEach(([mult, vol]) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = midi(n) * mult;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(vol, t + 0.005);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
          o.connect(g);
          g.connect(out);
          o.start(t);
          o.stop(t + 1.7);
        });
      });
    }
  };
}
