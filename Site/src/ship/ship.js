import * as THREE from 'three';
import gsap from 'gsap';
import { createShipRenderer } from './renderer.js';
import { createCockpit } from './cockpit.js';
import { createHud } from './hud.js';
import { createTravel } from './travel.js';
import { sfx } from './audio.js';
import { waitForFonts, REDUCED_MOTION } from './util.js';
import { DESTINATIONS } from './destinations.js';
import { createNovaReactions } from './nova-react.js';
import { sharedMusic } from '../elevator-music.js';

// =========================================================================
// LE VAISSEAU : cockpit, sauts spatiaux et destinations embarquées
// (QG, laboratoire, mini-jeu). Une seule boucle d'animation, qui ne
// calcule que la vue affichée.
// =========================================================================

const pickOne = (list) => list[Math.floor(Math.random() * list.length)];

export async function createShip({ onCommand }) {
  await waitForFonts();

  // ---- Calque plein écran du vaisseau (au-dessus du site) ----
  const layer = document.createElement('div');
  layer.id = 'ship-layer';
  layer.innerHTML = `
    <canvas id="ship-canvas" aria-label="Cockpit du vaisseau ESGI-01"></canvas>
    <div id="ship-ui"></div>
    <div id="warp-flash" aria-hidden="true"></div>`;
  document.body.appendChild(layer);
  const canvas = layer.querySelector('#ship-canvas');
  const ui = layer.querySelector('#ship-ui');
  const flash = layer.querySelector('#warp-flash');

  const ship = createShipRenderer(canvas);
  const cockpit = createCockpit(ship);

  // ---- Choix de la destination, puis autopilote ou leviers ----
  // Les boutons (LA TOUR, MISSIONS, LABORATOIRE) choisissent la cible.
  // Ensuite : engager l'autopilote (second appui, Entrée) ou prendre les
  // leviers (pilotage manuel : le mini-jeu mène à cette cible).
  let target = null;
  function setTarget(id) {
    target = id;
    cockpit.status.target = id;
    hud.setTarget(id ? DESTINATIONS[id] : null);
  }
  function command(id) {
    sfx.unlock();
    // Barre de volume de la musique
    if (id.startsWith('vol:')) {
      const v = Number(id.slice(4));
      music.setLevel(v);
      if (music.muted && v > 0.02) hud.tools.sound(); // on remonte le volume : la musique revient
      cockpit.setVolume(v, music.muted);
      return;
    }
    // Morceau suivant
    if (id === 'tool:next') {
      cockpit.pressToggle('next');
      sfx.click();
      music.unlock();
      if (music.muted) hud.tools.sound();
      if (!music.next()) music.start();
      novaCockpit.react(pickOne(['Morceau suivant ! 🎶', 'Oh, j’adore celui-là 💃', 'Allez, on change d’ambiance 🎧']), 'love', { key: 'next', duration: 2200 });
      return;
    }
    // Interrupteurs du tableau de bord (musique, son, mode léger)
    if (id.startsWith('tool:')) {
      const tool = id.slice(5);
      hud.tools[tool]?.();
      sfx.click();
      const LINES = {
        sound: () => (music.muted ? ['Musique coupée. Silence radio 🤫', 'sad'] : ['♪ Musique ! Je danse dans ma tête 💃', 'love']),
        lite: () => (ship.lite ? ['Mode léger : moins d’effets, plus fluide ⚡', 'happy'] : ['Tous les effets à fond ✨', 'wow'])
      };
      const line = LINES[tool]?.();
      if (line) novaCockpit.react(line[0], line[1], { key: `tool-${tool}`, duration: 2500 });
      return;
    }
    if (id === 'engage') {
      if (target) {
        sfx.click();
        onCommand(target);
      }
      return;
    }
    if (id === 'jeu') {
      if (!target) {
        sfx.countdown();
        hud.show('PILOTAGE MANUEL', 'CHOISIS UNE DESTINATION', 'La Tour · Missions · Laboratoire, puis les leviers', '#ffd166', 2800);
        cockpit.nova.say('Choisis d’abord où on va avec les boutons, puis prends les leviers 🕹️', 4000);
        cockpit.nova.setMood('surprised', 2);
        return;
      }
      sfx.click();
      onCommand('jeu');
      return;
    }
    if (!DESTINATIONS[id]) return;
    if (id === target) {
      sfx.click();
      onCommand(id); // second appui : autopilote
      return;
    }
    setTarget(id);
    cockpit.press(id);
    sfx.confirm();
    // L'autopilote, c'est NOVA : on clique sur elle
    cockpit.nova.say(`Cap sur ${DESTINATIONS[id].name} ! 🚀 Appuie sur moi si tu veux l’autopilote 😊👉 … ou prends les leviers 🕹️`, 9000);
    cockpit.nova.setMood('wow', 2.5);
  }

  // ---- Musique (la même que l'ascenseur) ----
  // Elle démarre au premier clic ou à la première touche (règle des
  // navigateurs), joue partout dans le vaisseau et s'arrête sur le site.
  const music = sharedMusic();
  const startMusic = () => {
    if (!visible) return;
    music.unlock();
    music.start();
  };
  layer.addEventListener('pointerdown', startMusic);
  window.addEventListener('keydown', startMusic);
  // NOVA aime la musique : elle réagit au nouveau morceau (de temps en temps)
  music.onTrack = (tr) => {
    if (!visible || current !== 'cockpit') return;
    novaCockpit.react(`♪ « ${tr.title} » ! J’adore ce morceau 🎶`, 'love', { key: 'track', cooldown: 90000, duration: 4000 });
  };

  const hud = createHud(ui, {
    music,
    onCommand: command,
    onHover: (id) => cockpit.setHover(id),
    onLite: (on) => ship.setLite(on),
    liteOn: ship.lite
  });
  cockpit.onCommand = command;
  hud.onTools = (s) => {
    Object.entries(s).forEach(([k, v]) => cockpit.setToggle(k, v));
    cockpit.setVolume(music.level, music.muted);
  };
  cockpit.onHover = (id) => {
    hud.highlight(id);
    if (id) sfx.hover();
    const line = id && HOVER_LINES[id];
    if (line && Math.random() < 0.6) novaCockpit.react(line[0], line[1], { key: `hover-${id}`, cooldown: 25000, duration: 3200 });
  };
  const travel = createTravel({ ship, cockpit, hud, flash });

  // ---- NOVA réagit à tout ce qu'on fait dans le cockpit ----
  const HOVER_LINES = {
    'esgi-bot': ['La Tour ! C’est chez moi là-bas 🏙️', 'love'],
    qg: ['Le QG : emploi du temps, missions… le sérieux 📋', 'happy'],
    labo: ['Le labo ! Ça sent le café et les cours ☕', 'wow'],
    jeu: ['Les leviers ? Tu sais piloter au moins ? 😏', 'surprised']
  };
  const novaCockpit = createNovaReactions(cockpit.nova, {
    camera: cockpit.camera,
    canvas,
    isActive: () => visible && current === 'cockpit',
    // Clic sur NOVA avec une destination choisie : elle prend les commandes
    onClick: () => {
      if (!target || !cockpit.enabled) return false;
      cockpit.nova.setMood('love', 2);
      command('engage');
      return true;
    },
    hoverLines: ['Coucou 👋 Tu me cherchais ?', 'Je suis là ! Prête à décoller 🚀', 'Clique-moi pas trop fort hein 😄'],
    idleLines: [
      'Tu savais que la lumière met 8 minutes à venir du Soleil ? ☀️',
      'On attend quoi ? La Tour, les missions ou le labo ? 🤔',
      'Psst… essaie de taper « holo » 🤫',
      'Les leviers, c’est le mode arcade. Mes cousins maléfiques t’attendent 😈',
      'J’ai compté 412 étoiles par ce hublot. Puis j’ai perdu le fil 😅'
    ]
  });
  // Très rare : NOVA dorée dès l'arrivée (0,5 %)
  if (Math.random() < 0.005) cockpit.nova.setGolden();

  // ---- Destinations embarquées (chargées au premier voyage) ----
  const places = {};
  if (import.meta.env.DEV) window.__ship = { ship, cockpit, hud, travel, places, music };
  async function getPlace(id) {
    if (places[id]) return places[id];
    if (id === 'qg') {
      const { createHQ } = await import('./hq.js');
      places.qg = createHQ({ ship, root: ui, onBack: () => onCommand('cockpit') });
    } else if (id === 'labo') {
      const { createLab } = await import('./lab.js');
      places.labo = createLab({ ship, root: ui, onBack: () => onCommand('cockpit') });
    } else if (id === 'jeu') {
      const { createArcade } = await import('./arcade/arcade.js');
      places.jeu = createArcade({
        root: layer,
        onExit: () => onCommand('cockpit'),
        onPortal: (dest) => window.dispatchEvent(new CustomEvent('esgi-portal', { detail: dest }))
      });
    }
    if ((id === 'qg' || id === 'labo') && !places[id].reactions) {
      places[id].reactions = createNovaReactions(places[id].nova, {
        camera: places[id].camera,
        canvas,
        isActive: () => visible && current === id,
        hoverLines: id === 'qg' ? ['Besoin d’aide pour les missions ? 🛰️'] : ['Tu cherches un cours ? Je connais la bibliothèque par cœur 📚'],
        idleLines:
          id === 'qg'
            ? ['Une mission par jour et le semestre est plié 💪', 'Coche tes tâches, ça fait du bien ✅', 'Le globe tourne, et nous on bosse 🌍']
            : ['Les cristaux brillent plus fort quand on révise 🔮', 'Utilise la recherche, ça va plus vite 🔎', 'Pas touche aux cuves sans blouse 🥼']
      });
    }
    return places[id];
  }
  // Préchargement discret du QG et du labo quand le cockpit est au calme
  setTimeout(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
    idle(() => import('./hq.js'));
    idle(() => import('./lab.js'));
  }, 6000);

  let current = 'cockpit'; // ce que la boucle affiche
  let place = null; // destination 3D affichée (QG, labo)
  let visible = true;
  ship.setView(cockpit.scene, cockpit.camera);

  function showView(id) {
    current = id;
    place = id === 'cockpit' || id === 'jeu' ? null : places[id];
    if (place) ship.setView(place.scene, place.camera);
    else ship.setView(cockpit.scene, cockpit.camera);
    hud.setVisible(id === 'cockpit');
    canvas.style.visibility = id === 'jeu' ? 'hidden' : 'visible';
  }

  // ---- Boucle d'animation ----
  const clock = new THREE.Clock();
  let last = 0;
  let hudAcc = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) {
      clock.getDelta();
      return;
    }
    if (now - last < 1000 / (ship.lite ? 60 : 120) - 1) return;
    last = now;
    const delta = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (current === 'jeu') {
      places.jeu?.frame(delta);
      return;
    }
    if (place) place.update(delta, t);
    else cockpit.update(delta, t);
    hudAcc += delta;
    if (hudAcc > 0.25 && current === 'cockpit') {
      hudAcc = 0;
      const sp = cockpit.warp.state.speed;
      hud.tick(0.02 + sp * sp * 9.8, 212 + (cockpit.camera.rotation.y * 180) / Math.PI);
    }
    ship.render();
  }
  requestAnimationFrame(frame);

  window.addEventListener('resize', () => {
    ship.resize();
    cockpit.fitCamera();
    Object.values(places).forEach((p) => p.resize?.());
  });

  // ---- Démarrage du cockpit : les systèmes s'allument ----
  function showCockpit({ intro = false } = {}) {
    showView('cockpit');
    if (!intro) return;
    cockpit.status.power = 0;
    hud.el.classList.add('booting');
    // Allumage qui grésille, comme de vrais néons
    const boot = gsap.timeline({ delay: 0.3, onComplete: () => hud.el.classList.remove('booting') });
    const steps = REDUCED_MOTION ? [1] : [0.35, 0.05, 0.6, 0.2, 0.85, 0.55, 1];
    steps.forEach((v, i) => boot.to(cockpit.status, { power: v, duration: i === steps.length - 1 ? 0.7 : 0.11, ease: 'none' }));
    setTimeout(() => {
      hud.show('VAISSEAU ESGI-01', 'BIENVENUE À BORD', 'Choisis une destination ou prends les commandes', '#22e4ff', 3800);
      cockpit.nova.say('Bienvenue à bord ! Je suis NOVA, ton copilote. On va où aujourd’hui ? 🚀', 6000);
    }, REDUCED_MOTION ? 300 : 1500);
  }

  // ---- Voyages ----
  async function arriveAt(dest, onFlash) {
    if (dest.id === 'esgi-bot') {
      // Le site prend la place du vaisseau pendant l'éclair
      if (onFlash) onFlash();
      travel.resetCockpit();
      hud.lock(false);
      await gsap.to(flash, { opacity: 0, duration: 1.2, ease: 'power2.out' });
      sfx.engineStop();
      return;
    }
    const p = await getPlace(dest.id);
    showView(dest.id);
    await travel.reveal(() => p.enter());
  }

  async function jump(dest, { onFlash } = {}) {
    setTarget(null);
    // Le décor de destination se prépare pendant le saut
    const ready = dest.id === 'esgi-bot' ? null : getPlace(dest.id);
    await travel.depart(dest);
    await ready;
    await arriveAt(dest, onFlash);
  }

  async function jumpFromGame(dest, onFlash) {
    const game = places.jeu;
    const ready = dest.id === 'esgi-bot' ? null : getPlace(dest.id);
    // Le jeu s'éteint (effet écran cathodique) et on se retrouve dans le cockpit lancé à pleine vitesse
    await game.hide();
    showView('cockpit');
    hud.setVisible(true);
    await travel.depart(dest, { quick: true });
    await ready;
    await arriveAt(dest, onFlash);
  }

  async function leaveDestination() {
    if (current === 'cockpit') return;
    if (current === 'jeu') {
      await places.jeu.hide();
      showView('cockpit');
      hud.show('PILOTAGE MANUEL', 'RETOUR AU COCKPIT', 'Commandes rendues à l’ordinateur de bord', '#ffd166', 2400);
      novaCockpit.react('Ouf, on est rentrés entiers ! Joli pilotage 🕹️', 'happy', { duration: 3500 });
      return;
    }
    // Saut retour : éclair, puis le vaisseau sort du trou de ver
    sfx.whoosh(0.8);
    await gsap.to(flash, { opacity: 1, duration: 0.45, ease: 'power2.in' });
    const from = current;
    place?.leave();
    showView('cockpit');
    await travel.arriveInCockpit();
    novaCockpit.react(from === 'qg' ? 'Retour à bord ! Les missions attendront un peu 😄' : 'Re ! Le labo était cool, non ? 🧪', 'happy', { duration: 3500 });
  }

  async function returnToCockpit() {
    visible = true;
    startMusic();
    layer.classList.remove('away');
    gsap.set(flash, { opacity: 1 });
    // Vaisseau créé à la volée (arrivée directe sur le site) : il n'a jamais
    // fait sa séquence d'allumage, on allume les écrans tout de suite
    cockpit.status.power = 1;
    showView('cockpit');
    await travel.arriveInCockpit();
    novaCockpit.react(pickOne(['Re-bienvenue à bord ! 🚀', 'Tu m’as manqué ! On va où maintenant ? 💫', 'La Tour était belle vue d’en haut 🏙️']), 'love', { duration: 3800 });
  }

  async function startGame() {
    // Destination du vol (par défaut : la Tour, tout le parcours)
    const gameTarget = target || 'esgi-bot';
    setTarget(null);
    cockpit.enabled = false;
    hud.lock(true);
    cockpit.press('jeu');
    cockpit.nova.say('Tu prends le manche ? Attention à mes cousins maléfiques… 😈', 3500);
    hud.show('PILOTAGE MANUEL', 'MODE ARCADE', 'Initialisation de l’écran de pilotage', '#ffd166');
    const game = await getPlace('jeu');
    // La caméra plonge vers l'hologramme, puis l'écran du jeu s'allume
    await gsap.to(cockpit.fov, { extra: -24, duration: 0.9, ease: 'power2.in' });
    cockpit.nova.hide(); // la NOVA du jeu parle dans sa radio
    showView('jeu');
    cockpit.fov.extra = 0;
    cockpit.enabled = true;
    hud.lock(false);
    hud.hideAnnounce();
    await game.show({ target: gameTarget });
  }

  async function openDirect(id) {
    // Lien direct vers une destination : on y apparaît après un éclair
    gsap.set(flash, { opacity: 1 });
    cockpit.status.power = 1;
    if (id === 'jeu') {
      showView('cockpit');
      gsap.set(flash, { opacity: 0 });
      return startGame();
    }
    if (!DESTINATIONS[id]) return showCockpit({ intro: true });
    const p = await getPlace(id);
    showView(id);
    await travel.reveal(() => p.enter());
  }

  return {
    layer,
    showCockpit,
    jump,
    jumpFromGame,
    leaveDestination,
    returnToCockpit,
    startGame,
    openDirect,
    hide() {
      visible = false;
      layer.classList.add('away');
      music.stop(0.6); // sur le site, c'est l'ascenseur qui a la musique
    }
  };
}
