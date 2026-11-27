import * as THREE from 'three';

// =========================================================================
// RÉACTIONS DE NOVA (cockpit, QG, laboratoire)
// NOVA réagit à ce qu'on fait : survol, clic sur elle (elle s'agace, puis
// tourne sur elle-même…), inactivité (elle papote, puis fait une sieste).
// Easter egg : la cliquer 7 fois d'affilée, ou taper « holo » au clavier,
// la transforme en hologramme (et inversement).
// =========================================================================

const pick = (list) => list[Math.floor(Math.random() * list.length)];

const POKES = [
  ['Hé ! 😊', 'happy'],
  ['Ça chatouille ! 🤭', 'happy'],
  ['Tu cherches quelque chose ? 👀', 'surprised'],
  ['Wouuuh… la tête qui tourne 😵‍💫', 'spin'],
  ['Bon, ça suffit ! 😤', 'angry'],
  ['Encore une fois et je me transforme… ⚠️', 'angry']
];

/**
 * nova : compagnon (createCompanion) ; camera : caméra de la vue ;
 * canvas : canvas qui reçoit les clics ; isActive() : la vue est affichée ;
 * idleLines : phrases quand on ne fait rien ; hoverLines : phrases au survol
 */
export function createNovaReactions(nova, { camera, canvas, isActive, idleLines = [], hoverLines = [], onClick = null }) {
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let pokes = 0;
  let pokeTimer = null;
  let hoverOn = false;
  let lastHoverLine = 0;
  let lastActivity = performance.now();
  let idleSaid = 0;
  const cooldowns = {};

  const hit = (e) => {
    ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    return nova.isHit(raycaster);
  };

  /** Phrase + expression, avec un délai minimal par sujet (pas de bavardage) */
  function react(text, mood = null, { key = text, cooldown = 0, duration = 3500, moodTime = 2.2 } = {}) {
    const now = performance.now();
    if (cooldown && cooldowns[key] && now - cooldowns[key] < cooldown) return false;
    cooldowns[key] = now;
    if (mood === 'spin') nova.spin(1.6);
    else if (mood) nova.setMood(mood, moodTime);
    if (text) nova.say(text, duration);
    return true;
  }

  function toggleHologram() {
    const on = !nova.hologram;
    nova.setHologram(on);
    nova.spin(1.2);
    react(on ? 'Mode hologramme activé ✨ Je suis partout et nulle part…' : 'Ouf, de retour en vrai ! Le hologramme, ça gratte 😅', on ? 'wow' : 'happy', { duration: 4500, moodTime: 3 });
  }

  function poke() {
    clearTimeout(pokeTimer);
    pokeTimer = setTimeout(() => (pokes = 0), 4000);
    pokes++;
    if (pokes >= 7) {
      pokes = 0;
      toggleHologram();
      return;
    }
    const [text, mood] = POKES[Math.min(pokes - 1, POKES.length - 1)];
    react(text, mood, { key: `poke${pokes}`, duration: 2600 });
  }

  function wake() {
    lastActivity = performance.now();
    // Elle se réveille (et le dit elle-même)
    if (nova.sleeping) nova.sleep(0);
  }

  canvas.addEventListener('pointermove', (e) => {
    if (!isActive()) return;
    lastActivity = performance.now();
    const on = hit(e);
    if (on) canvas.style.cursor = 'pointer';
    if (on && !hoverOn && hoverLines.length && performance.now() - lastHoverLine > 15000) {
      lastHoverLine = performance.now();
      react(pick(hoverLines), 'happy', { key: 'hover' });
    } else if (on && !hoverOn) {
      nova.setMood('happy', 1.2);
    }
    hoverOn = on;
  });
  canvas.addEventListener('pointerup', (e) => {
    if (!isActive()) return;
    wake();
    if (!hit(e)) return;
    // Un clic peut avoir un autre rôle (dans le cockpit : l'autopilote)
    if (onClick && onClick()) return;
    poke();
  });

  // Taper « holo » : NOVA passe en hologramme
  let typed = '';
  window.addEventListener('keydown', (e) => {
    if (!isActive() || e.target.closest?.('input, textarea')) return;
    wake();
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === 'holo') {
      typed = '';
      toggleHologram();
    }
  });

  // Inactivité : une petite phrase après 25 s, la sieste après 70 s
  setInterval(() => {
    if (!isActive() || document.hidden) return;
    const quiet = performance.now() - lastActivity;
    if (quiet > 70000 && !nova.sleeping) {
      nova.sleep(30);
      nova.say('Bon… je fais une petite sieste. Réveille-moi si tu as besoin 😴', 4000);
      lastActivity = performance.now() - 40000;
    } else if (quiet > 25000 && idleLines.length && performance.now() - idleSaid > 30000 && !nova.sleeping) {
      idleSaid = performance.now();
      react(pick(idleLines), pick(['happy', 'wow', null]), { key: 'idle', duration: 4500 });
    }
  }, 2000);

  return { react, poke, toggleHologram, wake };
}
