import gsap from 'gsap';
import { sfx } from './audio.js';
import { REDUCED_MOTION } from './util.js';

// =========================================================================
// LE SAUT SPATIAL
// Départ : annonce, commandes qui s'allument, moteurs, accélération, les
// étoiles deviennent des traînées, l'espace se déforme, trou de ver,
// éclair blanc. Pendant l'éclair, la destination prend la place du cockpit.
// Arrivée : l'éclair se dissipe pendant que la caméra entre dans la pièce
// (ou que le vaisseau décélère, au retour au cockpit).
// =========================================================================

export function createTravel({ ship, cockpit, hud, flash }) {
  const st = cockpit.warp.state;
  const status = cockpit.status;
  const fx = { amount: 0 };
  // Visibilité de l'espace (planètes, étoiles) : coupée dans le trou de ver
  const spaceVis = { v: 1 };
  const applySpace = () => cockpit.space.setOpacity(spaceVis.v);
  let busy = false;

  const applyFx = () => ship.setWarp(fx.amount);
  const flashTo = (v, dur, ease = 'power2.out') => gsap.to(flash, { opacity: v, duration: dur, ease });

  function resetCockpit() {
    st.speed = 0;
    st.tunnel = 0;
    fx.amount = 0;
    applyFx();
    status.engine = 0;
    status.hyper = 0;
    status.selected = null;
    cockpit.shake.amount = 0;
    cockpit.fov.extra = 0;
    cockpit.glowBoost.value = 1;
    cockpit.alertLight.intensity = 0;
    spaceVis.v = 1;
    applySpace();
    hud.setState('SYSTÈMES NOMINAUX');
    hud.highlight(null);
  }

  /**
   * Départ vers une destination. Se termine au sommet de l'éclair blanc
   * (écran entièrement blanc) : l'appelant change alors de vue.
   * quick : départ déjà lancé (portail du mini-jeu), on saute l'annonce.
   */
  function depart(dest, { quick = false } = {}) {
    busy = true;
    const color = dest.color;
    status.selected = dest.id;
    cockpit.enabled = false;
    hud.lock(true);
    hud.highlight(dest.id);
    hud.setState(`SAUT VERS ${dest.name}`, true);
    const speedUp = REDUCED_MOTION ? 0.5 : 1;

    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve, onUpdate: applyFx });
      if (!quick) {
        // 1) Annonce et commandes qui s'activent
        tl.call(() => {
          cockpit.press(dest.id);
          sfx.confirm();
          hud.show('ORDINATEUR DE BORD', `CAP SUR ${dest.name}`, 'Autopilote engagé · préparation du saut', color);
          cockpit.nova.say(
            dest.id === 'esgi-bot'
              ? 'Cap sur la citadelle ESGI-BOT ! Accroche-toi 🚀'
              : dest.id === 'qg'
                ? 'Direction le QG, les missions nous attendent 🛰️'
                : 'En route pour le labo ! J’adore les échantillons 🧪',
            3500
          );
          cockpit.nova.setMood('wow', 3);
        });
        tl.to(cockpit.glowBoost, { value: 2.4, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.inOut' }, 0.2);
        tl.to(cockpit.alertLight, { intensity: 3.5, duration: 0.4 }, 0.2);
        tl.call(() => cockpit.alertLight.color.set(color), [], 0.2);
        // 2) Moteurs
        tl.call(() => {
          sfx.engineStart();
          hud.show('MOTEURS', 'ALLUMAGE', 'Hyperpropulseur en charge', color);
        }, [], 1.0);
        tl.to(status, { engine: 1, duration: 1.1, ease: 'power2.inOut', onUpdate: () => sfx.engineLevel(status.engine * 0.5) }, 1.0);
        tl.to(status, { hyper: 1, duration: 1.6, ease: 'power1.in' }, 1.0);
        ['3', '2', '1'].forEach((n, i) => {
          tl.call(() => {
            sfx.countdown();
            hud.show('SAUT DANS', n, dest.name, color);
          }, [], 1.6 + i * 0.42 * speedUp);
        });
      } else {
        status.engine = 1;
        status.hyper = 1;
        st.speed = 0.35;
        sfx.engineStart();
        sfx.engineLevel(0.6);
      }
      const go = quick ? 0 : 1.6 + 3 * 0.42 * speedUp;
      // 3) Accélération : les étoiles s'étirent
      tl.call(() => {
        hud.show('', 'SAUT', `${dest.name} · ${dest.distance || ''}`, color);
        sfx.whoosh(2.4);
      }, [], go);
      tl.to(st, { speed: 0.4, duration: 0.7, ease: 'power2.in' }, go);
      tl.to(cockpit.shake, { amount: 0.35, duration: 0.7 }, go);
      tl.to(cockpit.fov, { extra: 6, duration: 0.7, ease: 'power2.in' }, go);
      tl.to(st, { speed: 1, duration: 0.9, ease: 'power3.in', onUpdate: () => sfx.engineLevel(0.5 + st.speed * 0.5) }, go + 0.7);
      tl.to(cockpit.fov, { extra: 24, duration: 0.9, ease: 'power3.in' }, go + 0.7);
      tl.to(cockpit.shake, { amount: 1, duration: 0.9 }, go + 0.7);
      // 4) L'espace se déforme, le trou de ver s'ouvre
      tl.to(fx, { amount: 1, duration: 1.0, ease: 'power2.in' }, go + 0.8);
      tl.to(spaceVis, { v: 0, duration: 0.8, onUpdate: applySpace }, go + 0.9);
      tl.to(st, { tunnel: 1, duration: 0.7, ease: 'power2.out' }, go + 1.3);
      tl.call(() => hud.hideAnnounce(), [], go + 1.4);
      tl.to(cockpit.shake, { amount: 0.55, duration: 0.4 }, go + 1.8);
      // 5) Éclair blanc au bout du tunnel
      tl.to(flash, { opacity: 1, duration: 0.35, ease: 'power2.in' }, go + 2.45);
    });
  }

  /**
   * Fin du saut : l'éclair se dissipe sur la destination.
   * onReveal : animation d'entrée de la destination (caméra, interface).
   */
  function reveal(onReveal) {
    sfx.arrive();
    sfx.engineStop();
    resetCockpit();
    hud.lock(false);
    hud.highlight(null);
    hud.setState('SYSTÈMES NOMINAUX');
    if (onReveal) onReveal();
    return new Promise((resolve) => {
      flashTo(0, 1.1, 'power2.out').then(() => {
        busy = false;
        resolve();
      });
    });
  }

  /**
   * Retour au cockpit : on sort du trou de ver et le vaisseau décélère.
   */
  function arriveInCockpit() {
    busy = true;
    resetCockpit();
    st.speed = 1;
    st.tunnel = 1;
    fx.amount = 1;
    applyFx();
    cockpit.fov.extra = 22;
    cockpit.shake.amount = 0.6;
    spaceVis.v = 0;
    applySpace();
    status.engine = 0.8;
    cockpit.enabled = false;
    hud.lock(true);
    sfx.arrive();
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onUpdate: applyFx,
        onComplete: () => {
          busy = false;
          cockpit.enabled = true;
          hud.lock(false);
          resolve();
        }
      });
      tl.to(flash, { opacity: 0, duration: 0.7, ease: 'power2.out' }, 0);
      tl.to(st, { tunnel: 0, duration: 0.8, ease: 'power2.in' }, 0.1);
      tl.to(fx, { amount: 0, duration: 1.2, ease: 'power2.out' }, 0.2);
      tl.to(st, { speed: 0, duration: 1.9, ease: 'power3.out' }, 0.3);
      tl.to(cockpit.fov, { extra: 0, duration: 1.6, ease: 'power3.out' }, 0.3);
      tl.to(cockpit.shake, { amount: 0, duration: 1.4 }, 0.3);
      tl.to(status, { engine: 0, duration: 1.6 }, 0.4);
      tl.to(spaceVis, { v: 1, duration: 1.2, onUpdate: applySpace }, 0.5);
      tl.call(() => hud.show('ARRIVÉE', 'RETOUR AU COCKPIT', 'Systèmes nominaux · choisis ta prochaine destination', '#22e4ff', 2600), [], 0.9);
    });
  }

  return {
    depart,
    reveal,
    arriveInCockpit,
    resetCockpit,
    get busy() {
      return busy;
    }
  };
}
