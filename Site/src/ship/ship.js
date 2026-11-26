import * as THREE from 'three';
import gsap from 'gsap';
import { createShipRenderer } from './renderer.js';
import { createCockpit } from './cockpit.js';
import { createHud } from './hud.js';
import { createTravel } from './travel.js';
import { sfx } from './audio.js';
import { waitForFonts, REDUCED_MOTION } from './util.js';
import { DESTINATIONS } from './destinations.js';

// =========================================================================
// LE VAISSEAU : cockpit, sauts spatiaux et destinations embarquées
// (QG, laboratoire, mini-jeu). Une seule boucle d'animation, qui ne
// calcule que la vue affichée.
// =========================================================================

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

  const hud = createHud(ui, {
    onCommand: (id) => {
      sfx.unlock();
      sfx.click();
      onCommand(id);
    },
    onHover: (id) => cockpit.setHover(id),
    onLite: (on) => ship.setLite(on),
    liteOn: ship.lite
  });
  cockpit.onCommand = (id) => {
    sfx.unlock();
    sfx.click();
    onCommand(id);
  };
  cockpit.onHover = (id) => {
    hud.highlight(id);
    if (id) sfx.hover();
  };
  const travel = createTravel({ ship, cockpit, hud, flash });
  if (import.meta.env.DEV) window.__ship = { ship, cockpit, hud, travel };

  // ---- Destinations embarquées (chargées au premier voyage) ----
  const places = {};
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
      return;
    }
    // Saut retour : éclair, puis le vaisseau sort du trou de ver
    sfx.whoosh(0.8);
    await gsap.to(flash, { opacity: 1, duration: 0.45, ease: 'power2.in' });
    place?.leave();
    showView('cockpit');
    await travel.arriveInCockpit();
  }

  async function returnToCockpit() {
    visible = true;
    layer.classList.remove('away');
    gsap.set(flash, { opacity: 1 });
    showView('cockpit');
    await travel.arriveInCockpit();
  }

  async function startGame() {
    cockpit.enabled = false;
    hud.lock(true);
    cockpit.press('jeu');
    cockpit.nova.say('Tu prends le manche ? Attention à mes cousins maléfiques… 😈', 3500);
    hud.show('PILOTAGE MANUEL', 'MODE ARCADE', 'Initialisation de l’écran de pilotage', '#ffd166');
    const game = await getPlace('jeu');
    // La caméra plonge vers l'hologramme, puis l'écran du jeu s'allume
    await gsap.to(cockpit.fov, { extra: -24, duration: 0.9, ease: 'power2.in' });
    showView('jeu');
    cockpit.fov.extra = 0;
    cockpit.enabled = true;
    hud.lock(false);
    hud.hideAnnounce();
    await game.show();
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
    }
  };
}
