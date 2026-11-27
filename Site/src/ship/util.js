import * as THREE from 'three';

// =========================================================================
// OUTILS DU VAISSEAU : textures dessinées sur canvas (écrans, étiquettes),
// réglages partagés (mode léger, écran tactile).
// =========================================================================

export const IS_TOUCH = window.matchMedia('(hover: none)').matches;
export const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Même réglage que le site : bouton « mode léger », ?leger=1 ou choix enregistré */
export function readLiteMode() {
  const param = new URLSearchParams(window.location.search).get('leger');
  if (param === '1') return true;
  if (param === '0') return false;
  try {
    return localStorage.getItem('esgi-lite') === '1';
  } catch {
    return false;
  }
}

export function saveLiteMode(on) {
  try {
    localStorage.setItem('esgi-lite', on ? '1' : '0');
  } catch {
    /* stockage bloqué : le choix vaut pour cette visite */
  }
}

/**
 * Écran dessiné sur un canvas, redessiné à la demande (ex. 10 fois par seconde).
 * draw(ctx, w, h, t) dessine une image.
 */
export function createCanvasScreen(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  function redraw(t = 0) {
    ctx.clearRect(0, 0, width, height);
    draw(ctx, width, height, t);
    texture.needsUpdate = true;
  }
  redraw(0);
  return { canvas, ctx, texture, redraw };
}

/** Étiquette lumineuse (texte néon sur fond transparent) */
export function createLabelTexture(text, { color = '#22e4ff', size = 64, weight = 700, font = 'Space Grotesk', width = 512, height = 128, sub = '' } = {}) {
  return createCanvasScreen(width, height, (ctx, w, h) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(size * 0.12)}px`;
    ctx.font = `${weight} ${size}px "${font}", "Segoe UI", sans-serif`;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 0.35;
    ctx.fillStyle = color;
    ctx.fillText(text, w / 2, sub ? h * 0.4 : h / 2);
    ctx.shadowBlur = size * 0.1;
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.85;
    ctx.fillText(text, w / 2, sub ? h * 0.4 : h / 2);
    if (sub) {
      ctx.globalAlpha = 0.8;
      ctx.font = `600 ${Math.round(size * 0.38)}px "JetBrains Mono", monospace`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(size * 0.08)}px`;
      ctx.fillStyle = color;
      ctx.fillText(sub, w / 2, h * 0.78);
    }
  }).texture;
}

/** Attend les polices du site (1,5 s maximum) avant de dessiner du texte */
export function waitForFonts() {
  return Promise.race([
    Promise.all([
      document.fonts.load('700 48px "Space Grotesk"'),
      document.fonts.load('400 32px "Space Grotesk"'),
      document.fonts.load('700 24px "JetBrains Mono"'),
      document.fonts.load('400 24px "JetBrains Mono"')
    ]),
    new Promise((resolve) => setTimeout(resolve, 1500))
  ]).catch(() => {});
}

/** Petit bruit pseudo-aléatoire reproductible */
export function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Rectangle aux coins arrondis (canvas 2D) */
export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
