// =========================================================================
// MUSIQUE D'ASCENSEUR
// Deux albums SoundCloud (BonjourJeSuis), morceaux tirés au hasard, joués avec
// le lecteur officiel de SoundCloud (intégration autorisée par l'artiste).
// Si SoundCloud ne répond pas, l'ascenseur reste simplement silencieux.
// Le « ding » d'arrivée à l'étage est un petit bruitage fait avec Web Audio.
// =========================================================================

const PLAYLISTS = [
  'https://soundcloud.com/bonjourjesuis/sets/bonjourjesuis',
  'https://soundcloud.com/bonjourjesuis/sets/bonjourjesuistoujours'
];
const SC_VOLUME = 55; // volume normal (0 à 100)
const STORAGE_KEY = 'esgi-ascenseur-muet';

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

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

function playerUrl(playlist) {
  const params = new URLSearchParams({
    url: playlist,
    auto_play: 'false',
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
  let muted = false;
  try {
    muted = localStorage.getItem(STORAGE_KEY) === '1';
  } catch (e) {
    /* stockage indisponible : son activé par défaut */
  }

  // ---------- « Ding » d'arrivée (Web Audio) ----------
  let ctx = null;
  function ensureAudio() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    return true;
  }

  // ---------- SoundCloud ----------
  let widget = null;
  let ready = false;
  let failed = false;
  let creating = false;
  let wanted = false; // la musique doit-elle jouer en ce moment ?
  let playing = false; // SoundCloud joue réellement
  let playlist = Math.floor(Math.random() * PLAYLISTS.length);
  let shuffled = false;
  let lastTrack = null;
  let volume = 0;
  let fadeTimer = null;
  let watchdog = null;
  let onTrack = null;
  let onFallback = null;
  let onPlayingChange = null;

  function setPlaying(value) {
    if (playing === value) return;
    playing = value;
    if (onPlayingChange) onPlayingChange(value);
  }

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

  // Un morceau au hasard de l'album chargé (jamais deux fois le même de suite)
  function playRandomTrack() {
    widget.getSounds((sounds) => {
      const count = sounds.length || 1;
      let index = Math.floor(Math.random() * count);
      if (count > 1 && `${playlist}:${index}` === lastTrack) index = (index + 1) % count;
      lastTrack = `${playlist}:${index}`;
      widget.skip(index);
      widget.setVolume(Math.round(volume));
      // skip() ne relance pas toujours la lecture (après la fin d'un morceau)
      setTimeout(() => {
        if (wanted && !muted) widget.play();
      }, 300);
    });
  }

  function giveUp() {
    failed = true;
    setPlaying(false);
    if (widget) widget.pause();
    if (onFallback) onFallback();
  }

  function play() {
    if (!widget || !ready || failed || muted) return;
    widget.setVolume(Math.round(volume));
    if (!shuffled) {
      shuffled = true;
      playRandomTrack();
    } else {
      widget.play();
    }
    fadeVolume(SC_VOLUME, 1200);
    // Si SoundCloud n'a toujours pas démarré au bout de 8 s (navigateur qui
    // bloque la lecture, réseau…), on abandonne : l'ascenseur reste silencieux.
    clearTimeout(watchdog);
    watchdog = setTimeout(() => {
      if (!wanted || muted || failed) return;
      widget.getPosition((position) => {
        if (position > 0 || !wanted || muted) return;
        giveUp();
      });
    }, 8000);
  }

  function create() {
    if (widget || creating || failed) return;
    creating = true;
    loadSoundCloudApi()
      .then(() => {
        const iframe = document.createElement('iframe');
        iframe.title = 'Musique de l’ascenseur (SoundCloud)';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.src = playerUrl(PLAYLISTS[playlist]);
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
          if (!ready) giveUp();
        }, 10000);
        widget.bind(E.READY, () => {
          clearTimeout(timeout);
          ready = true;
          if (wanted) play();
        });
        widget.bind(E.PLAY, () => {
          setPlaying(true);
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
        widget.bind(E.PAUSE, () => setPlaying(false));
        // Fin d'un morceau : un album au hasard, puis un morceau au hasard
        widget.bind(E.FINISH, () => {
          setPlaying(false);
          if (!wanted || muted) return;
          const next = Math.floor(Math.random() * PLAYLISTS.length);
          if (next === playlist) {
            playRandomTrack();
            return;
          }
          playlist = next;
          widget.load(PLAYLISTS[playlist], {
            auto_play: false,
            visual: false, show_artwork: false, show_comments: false, sharing: false, buying: false, download: false,
            callback: () => playRandomTrack()
          });
        });
        // Morceau illisible : on passe au suivant
        widget.bind(E.ERROR, () => widget.next());
      })
      .catch(() => giveUp());
  }

  // Page cachée ou fermée : on coupe tout de suite (rien ne continue en fond)
  function silenceNow() {
    wanted = false;
    clearInterval(fadeTimer);
    clearTimeout(watchdog);
    if (widget) widget.pause();
    setPlaying(false);
  }
  window.addEventListener('pagehide', silenceNow);

  return {
    get muted() {
      return muted;
    },
    /** SoundCloud joue réellement en ce moment */
    get playing() {
      return playing;
    },
    get state() {
      return ctx ? ctx.state : 'none';
    },
    /** soundcloud, chargement ou indisponible */
    get source() {
      if (failed) return 'indisponible';
      return ready ? 'soundcloud' : 'chargement';
    },
    debug() {
      return { muted, playing, wanted, volume: Math.round(volume), source: failed ? 'indisponible' : ready ? 'soundcloud' : 'chargement' };
    },
    /** Appelé à chaque nouveau morceau : { title, artist, url } */
    set onTrack(cb) {
      onTrack = cb;
    },
    /** Appelé si SoundCloud ne peut pas jouer */
    set onFallback(cb) {
      onFallback = cb;
    },
    /** Appelé quand la musique démarre ou s'arrête (pour faire danser NOVA) */
    set onPlayingChange(cb) {
      onPlayingChange = cb;
    },
    /** À appeler pendant un clic (règle des navigateurs pour le son) */
    unlock() {
      if (ensureAudio() && ctx.state === 'suspended') ctx.resume();
      create();
    },
    setMuted(value) {
      muted = value;
      try {
        localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
      } catch (e) {
        /* sans importance */
      }
      if (!widget || !ready || failed) return;
      if (value) {
        clearInterval(fadeTimer);
        widget.pause();
        setPlaying(false);
      } else if (wanted) {
        play();
      }
    },
    start() {
      wanted = true;
      create();
      if (ready && !failed) play();
    },
    stop(fadeSeconds = 0.8) {
      wanted = false;
      clearTimeout(watchdog);
      if (widget && ready) {
        fadeVolume(0, fadeSeconds * 1000, () => {
          if (!wanted) widget.pause();
        });
      }
    },
    /** « Ding » d'arrivée à l'étage (deux notes de carillon) */
    ding() {
      if (!ensureAudio() || muted) return;
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
