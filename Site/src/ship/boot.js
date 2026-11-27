import '../style.css';
import './ship.css';
import { siteControl } from '../site-control.js';
import { DESTINATIONS } from './destinations.js';

// =========================================================================
// POINT D'ENTRÉE DU SITE : LE VAISSEAU
// On arrive dans le cockpit. Les destinations (site ESGI-BOT, QG,
// laboratoire, mini-jeu) ne sont chargées qu'au moment d'y aller.
// Adresses : #/ (cockpit), #/esgi-bot, #/qg, #/labo, #/jeu.
// Retour de la connexion Discord (?ascenseur=…) : directement sur le site.
// =========================================================================

const html = document.documentElement;
const ROUTES = { '': 'cockpit', cockpit: 'cockpit', 'esgi-bot': 'esgi-bot', qg: 'qg', labo: 'labo', jeu: 'jeu' };
const routeFromHash = () => ROUTES[window.location.hash.replace(/^#\/?/, '')] || 'cockpit';

let view = null; // vue affichée : cockpit, esgi-bot, qg, labo, jeu
let ship = null; // moteur 3D du vaisseau (créé au premier besoin)
let sitePromise = null;
let savedScroll = 0;

function loadSite() {
  // Chargé pendant qu'on est dans le vaisseau : le site démarre en pause
  if (html.classList.contains('ship-mode')) siteControl.suspended = true;
  if (!sitePromise) sitePromise = import('../main.js');
  return sitePromise;
}

function setHash(id) {
  const want = id === 'cockpit' ? '#/' : `#/${id}`;
  if (window.location.hash !== want) {
    window.history.pushState(null, '', window.location.pathname + window.location.search + want);
  }
}

// ---------------------------------------------------------------------------
// Le site ESGI-BOT (tour, ville, sous-sol)
// ---------------------------------------------------------------------------
function showSite() {
  // On arrive du cockpit : retour au sommet, le vaisseau se pose sur la piste
  siteControl.arriving = true;
  savedScroll = 0;
  siteControl.suspended = false;
  html.classList.remove('ship-mode');
  html.classList.add('site-mode');
  if (ship) ship.hide();
  window.scrollTo(0, savedScroll);
  window.dispatchEvent(new Event('resize'));
  window.dispatchEvent(new Event('esgi-ship-arrive'));
}

function leaveSite() {
  savedScroll = window.scrollY;
  siteControl.suspended = true;
  html.classList.add('ship-mode');
  html.classList.remove('site-mode');
}

// Arrivée directe sur le site (lien #/esgi-bot ou retour de connexion Discord)
const startRoute = new URLSearchParams(window.location.search).has('ascenseur') ? 'esgi-bot' : routeFromHash();
if (startRoute === 'esgi-bot') {
  html.classList.remove('ship-mode');
  html.classList.add('site-mode');
  view = 'esgi-bot';
  loadSite();
} else {
  startShip(startRoute);
}

// Sur le site, un clic sur le vaisseau posé au sommet : retour au cockpit
window.addEventListener('esgi-board-ship', () => goTo('cockpit'));

// Boutons précédent / suivant du navigateur
window.addEventListener('popstate', () => {
  const r = routeFromHash();
  if (r !== view) goTo(r, { fromHistory: true });
});

// ---------------------------------------------------------------------------
// Le vaisseau
// ---------------------------------------------------------------------------
async function startShip(initial) {
  html.classList.add('ship-mode');
  const { createShip } = await import('./ship.js');
  ship = await createShip({ onCommand: (id) => goTo(id) });
  if (initial === 'cockpit') {
    view = 'cockpit';
    ship.showCockpit({ intro: true });
  } else {
    view = initial;
    await ship.openDirect(initial);
  }
}

let navigating = false;
let pending = null;
async function goTo(id, { fromHistory = false } = {}) {
  if (navigating) {
    pending = id; // dernière demande, traitée à la fin du voyage en cours
    return;
  }
  if (id === view) return;
  navigating = true;
  try {
    if (!fromHistory) setHash(id);
    // 1) Depuis le site : on remonte à bord, au cockpit
    if (view === 'esgi-bot') {
      leaveSite();
      if (!ship) {
        const { createShip } = await import('./ship.js');
        ship = await createShip({ onCommand: (cmd) => goTo(cmd) });
      }
      await ship.returnToCockpit();
      view = 'cockpit';
    }
    // 2) Depuis une destination du vaisseau (QG, labo, mini-jeu) : escale au cockpit
    if (view !== 'cockpit' && id !== view) {
      await ship.leaveDestination();
      view = 'cockpit';
    }
    if (id === 'cockpit' || id === view) return;
    // 3) Départ du cockpit
    if (id === 'jeu') {
      await ship.startGame();
      view = 'jeu';
    } else if (id === 'esgi-bot') {
      // La tour se construit à l'arrivée, derrière son écran de chargement :
      // le saut reste fluide (la construction occupe le processeur)
      await ship.jump(DESTINATIONS[id], { onFlash: showSite });
      view = 'esgi-bot';
      loadSite();
    } else if (DESTINATIONS[id]) {
      await ship.jump(DESTINATIONS[id]);
      view = id;
    }
  } finally {
    navigating = false;
    if (pending && pending !== view) {
      const next = pending;
      pending = null;
      goTo(next, { fromHistory: true });
    }
    pending = null;
  }
}

// Le mini-jeu choisit sa destination en traversant un portail
window.addEventListener('esgi-portal', async (e) => {
  const id = e.detail;
  if (!ship || navigating || !DESTINATIONS[id]) return;
  navigating = true;
  try {
    setHash(id);
    await ship.jumpFromGame(DESTINATIONS[id], id === 'esgi-bot' ? showSite : null);
    view = id;
    if (id === 'esgi-bot') loadSite();
  } finally {
    navigating = false;
  }
});

