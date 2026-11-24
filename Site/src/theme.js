// =========================================================================
// THÈME COMMUN — « NUIT NÉON »
// Une seule palette pour toute la descente : espace -> ville de nuit -> sous-sol.
// Les mêmes couleurs sont reprises en CSS dans style.css (:root).
// =========================================================================

export const PALETTE = {
  // Accents néon (les deux seules couleurs vives du site)
  cyan: '#22e4ff',
  magenta: '#ff3dbb',
  // Accent secondaire, réservé aux touches rares
  violet: '#8b5cf6',

  // Fonds et matières sombres
  night: '#060814',
  ink: '#0b1022',
  steel: '#151c33',
  slate: '#2a3352',

  // Texte
  text: '#e8ecff',
  textSoft: '#a9b3d6'
};

// Version HDR des néons (valeurs > 1 pour déclencher le halo lumineux / bloom)
export const NEON_HDR = {
  cyan: [0.15, 2.3, 2.8],
  magenta: [2.6, 0.25, 1.6],
  violet: [1.3, 0.6, 2.6]
};

// Ciel : du crépuscule urbain (bas) à l'espace profond (haut)
export const SKY = {
  cityTop: 0x0a0f2e,
  cityMid: 0x1a1a4a,
  cityHorizon: 0x3a2560,
  spaceTop: 0x010207,
  spaceMid: 0x040616,
  spaceHorizon: 0x0b0f2a,
  cavernFog: 0x04060f
};

// Couleurs du ciel en mode JOUR (ville sous un ciel bleu)
export const SKY_DAY = {
  cityTop: 0x0284c7,
  cityMid: 0x38bdf8,
  cityHorizon: 0xbae6fd
};

// Mode jour/nuit : 0 = nuit, 1 = jour. Partagé par tous les shaders
// (même objet « uniform »), et animé en douceur lors du changement.
export const DAY_UNIFORM = { value: 0 };
