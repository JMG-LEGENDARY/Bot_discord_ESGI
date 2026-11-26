// =========================================================================
// PILOTAGE DU SITE ESGI-BOT DEPUIS LE VAISSEAU
// Le site (la tour, la ville, le sous-sol) est une destination du vaisseau.
// Quand on retourne au cockpit, il se met en pause (plus aucun calcul 3D)
// et reprend exactement là où on l'avait laissé.
// =========================================================================
export const siteControl = {
  /** true : le cockpit ou une autre destination est affiché par-dessus */
  suspended: false,
  /** true : la tour est chargée et le site est affiché */
  ready: false
};

/** Prévient le vaisseau que le site est prêt (fin de l'écran de chargement) */
export function markSiteReady() {
  siteControl.ready = true;
  window.dispatchEvent(new Event('esgi-site-ready'));
}
