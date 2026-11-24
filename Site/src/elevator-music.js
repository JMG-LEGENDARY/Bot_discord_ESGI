// =========================================================================
// MUSIQUE D'ASCENSEUR
// - Musique principale : deux albums SoundCloud joués à la suite, en boucle,
//   avec le lecteur officiel de SoundCloud (intégration autorisée).
// - Musique de secours : une petite boucle bossa composée en direct avec
//   Web Audio (pendant le chargement, ou si SoundCloud ne répond pas).
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

// Musique de secours, composée en direct
function createSynth() {
  let ctx = null;
  let master = null;
  let muteGain = null;
  let timer = null;
  let stopTimer = null;
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
    // Interrupteur « couper la musique » : séparé des fondus, donc immédiat
    muteGain = ctx.createGain();
    muteGain.gain.value = muted ? 0 : 1;
    // Son feutré, comme à travers les haut-parleurs de la cabine
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3200;
    master.connect(muteGain);
    muteGain.connect(tone);
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
    // Musique coupée : on avance dans la partition sans jouer de notes
    if (muted) {
      while (nextTime < ctx.currentTime + 0.25) {
        nextTime += BEAT / 2;
        step++;
      }
      return;
    }
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
    /** Pour le débogage : volume réel et état */
    debug() {
      return ctx ? { gain: master.gain.value * muteGain.gain.value, playing: Boolean(timer), muted, state: ctx.state } : null;
    },
    /** État du son (pour vérifier) : none, suspended ou running */
    get state() {
      return ctx ? ctx.state : 'none';
    },
    /**
     * À appeler PENDANT un clic : les navigateurs n'autorisent le son
     * qu'après une action du visiteur. Les notes déjà prévues se lancent alors.
     */
    unlock() {
      if (!ensure()) return;
      if (ctx.state === 'suspended') ctx.resume();
    },
    setMuted(value) {
      muted = value;
      try {
        localStorage.setItem('esgi-ascenseur-muet', value ? '1' : '0');
      } catch (e) {
        /* sans importance */
      }
      if (!ctx) return;
      const now = ctx.currentTime;
      muteGain.gain.cancelScheduledValues(now);
      muteGain.gain.setValueAtTime(muted ? 0 : 1, now);
    },
    /** Lance la musique (après un clic : règle des navigateurs) */
    start() {
      if (!ensure()) return;
      if (ctx.state === 'suspended') ctx.resume();
      // Relancée pendant qu'elle s'arrêtait : on annule l'arrêt
      if (stopTimer) {
        clearTimeout(stopTimer);
        stopTimer = null;
      }
      if (!timer) {
        step = 0;
        nextTime = ctx.currentTime + 0.08;
        schedule();
        timer = setInterval(schedule, 90);
      }
      fadeTo(0.9, 0.8);
    },
    stop(fadeSeconds = 0.8) {
      if (!ctx || !timer) return;
      fadeTo(0, fadeSeconds);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        clearInterval(timer);
        timer = null;
        stopTimer = null;
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

// ---------------------------------------------------------------------------
// Lecteur SoundCloud
// ---------------------------------------------------------------------------
const PLAYLISTS = [
  'https://soundcloud.com/bonjourjesuis/sets/bonjourjesuis',
  'https://soundcloud.com/bonjourjesuis/sets/bonjourjesuistoujours'
];
const SC_VOLUME = 55; // volume normal (0 à 100)

function loadSoundCloudApi() {
  if (window.SC && window.SC.Widget) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('SoundCloud indisponible'));
    document.head.appendChild(script);
  });
}

function playerUrl(playlist, autoPlay) {
  const params = new URLSearchParams({
    url: playlist,
    auto_play: autoPlay ? 'true' : 'false',
    visual: 'false',
    show_artwork: 'false',
    show_comments: 'false',
    sharing: 'false',
    buying: 'false',
    download: 'false',
    show_playcount: 'false',
    show_user: 'true'
  });
  return `https://w.soundcloud.com/player/?${params}`;
}

export function createElevatorMusic() {
  const synth = createSynth();
  let widget = null;
  let ready = false;
  let failed = false;
  let wanted = false; // la musique doit-elle jouer en ce moment ?
  let playlist = 0;
  let volume = 0;
  let fadeTimer = null;
  let onTrack = null;
  let creating = false;

  function fadeVolume(target, ms, then) {
    clearInterval(fadeTimer);
    const start = volume;
    const t0 = performance.now();
    fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      volume = start + (target - start) * k;
      if (widget) widget.setVolume(Math.round(volume));
      if (k >= 1) {
        clearInterval(fadeTimer);
        if (then) then();
      }
    }, 50);
  }

  function useSynth() {
    if (wanted) synth.start();
  }

  function playSoundCloud() {
    if (!widget || !ready || failed) return;
    // La musique de secours s'efface, SoundCloud prend le relais
    synth.stop(1);
    if (synth.muted) return;
    widget.setVolume(Math.round(volume));
    widget.play();
    fadeVolume(SC_VOLUME, 1200);
  }

  function create() {
    if (widget || creating || failed) return;
    creating = true;
    loadSoundCloudApi()
      .then(() => {
        const iframe = document.createElement('iframe');
        iframe.title = 'Musique de l’ascenseur (SoundCloud)';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.src = playerUrl(PLAYLISTS[0], false);
        // Lecteur invisible : on le pilote avec les boutons de l'ascenseur
        Object.assign(iframe.style, {
          position: 'fixed', left: '0', bottom: '0', width: '1px', height: '1px',
          opacity: '0', pointerEvents: 'none', border: '0'
        });
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        document.body.appendChild(iframe);
        widget = window.SC.Widget(iframe);
        const E = window.SC.Widget.Events;
        const timeout = setTimeout(() => {
          if (!ready) {
            failed = true;
            useSynth();
          }
        }, 10000);
        widget.bind(E.READY, () => {
          clearTimeout(timeout);
          ready = true;
          if (wanted) playSoundCloud();
        });
        widget.bind(E.PLAY, () => {
          widget.getCurrentSound((sound) => {
            if (sound && onTrack) {
              onTrack({
                title: sound.title,
                artist: sound.user ? sound.user.username : '',
                url: sound.permalink_url
              });
            }
          });
        });
        // Fin d'un morceau : à la fin du dernier de l'album, on passe à l'autre album
        widget.bind(E.FINISH, () => {
          widget.getSounds((sounds) => {
            widget.getCurrentSoundIndex((index) => {
              if (index >= sounds.length - 1) {
                playlist = (playlist + 1) % PLAYLISTS.length;
                widget.load(PLAYLISTS[playlist], {
                  auto_play: wanted && !synth.muted,
                  visual: false, show_artwork: false, show_comments: false, sharing: false, buying: false, download: false,
                  callback: () => widget.setVolume(Math.round(volume))
                });
              }
            });
          });
        });
        widget.bind(E.ERROR, () => {
          // Morceau illisible : on essaie le suivant, sinon la musique de secours
          widget.next();
        });
      })
      .catch(() => {
        failed = true;
        useSynth();
      });
  }

  return {
    get muted() {
      return synth.muted;
    },
    get state() {
      return synth.state;
    },
    /** Source utilisée : soundcloud, secours ou chargement */
    get source() {
      if (failed) return 'secours';
      return ready ? 'soundcloud' : 'chargement';
    },
    debug() {
      return { ...synth.debug(), source: failed ? 'secours' : ready ? 'soundcloud' : 'chargement', volume: Math.round(volume), wanted };
    },
    /** Appelé à chaque nouveau morceau : { title, artist, url } */
    set onTrack(cb) {
      onTrack = cb;
    },
    unlock() {
      synth.unlock();
      create();
    },
    setMuted(value) {
      synth.setMuted(value);
      if (!widget || !ready || failed) return;
      if (value) {
        clearInterval(fadeTimer);
        widget.pause();
      } else if (wanted) {
        playSoundCloud();
      }
    },
    start() {
      wanted = true;
      create();
      if (ready && !failed) playSoundCloud();
      else synth.start(); // en attendant SoundCloud (ou s'il ne répond pas)
    },
    stop(fadeSeconds = 0.8) {
      wanted = false;
      synth.stop(fadeSeconds);
      if (widget && ready) {
        fadeVolume(0, fadeSeconds * 1000, () => {
          if (!wanted) widget.pause();
        });
      }
    },
    ding() {
      synth.ding();
    }
  };
}
