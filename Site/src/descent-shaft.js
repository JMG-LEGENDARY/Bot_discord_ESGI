import * as THREE from 'three';
import { PALETTE } from './theme.js';

// =========================================================================
// PUITS DE DESCENTE
// Tube vertical lumineux qui relie le pied de la tour au sous-sol. La caméra
// y descend à la verticale : on ne voit plus le dessous de la ville (sol,
// voitures, arbres coupés) pendant la plongée.
// =========================================================================

// Parois : panneaux métalliques sombres, joints et petites lumières
function createWallTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 512;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#070a18';
  ctx.fillRect(0, 0, 512, 512);
  // Panneaux
  for (let x = 0; x < 512; x += 64) {
    for (let y = 0; y < 512; y += 128) {
      const g = ctx.createLinearGradient(x, y, x + 64, y + 128);
      g.addColorStop(0, '#111733');
      g.addColorStop(1, '#0a0e22');
      ctx.fillStyle = g;
      ctx.fillRect(x + 2, y + 2, 60, 124);
    }
  }
  // Joints lumineux très fins
  ctx.strokeStyle = 'rgba(34, 228, 255, 0.18)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 512; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  // Voyants
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = Math.random() < 0.5 ? 'rgba(34,228,255,0.9)' : 'rgba(255,61,187,0.9)';
    ctx.fillRect(8 + Math.floor(Math.random() * 8) * 64, Math.random() * 512, 3, 3);
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/**
 * { x, z } : axe du puits ; top / bottom : hauteurs (haut sous le sol,
 * bas juste sous le plafond du sous-sol) ; opening : { y, tilt } trappe
 * lumineuse posée sur le sol (inclinée comme les marches).
 */
export function createDescentShaft(scene, { x, z, top, bottom, radius = 3, opening = null }) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  scene.add(group);
  const height = top - bottom;

  const wallTex = createWallTexture();
  wallTex.repeat.set(4, height / 6);
  const wall = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, 48, 1, true),
    new THREE.MeshStandardMaterial({
      map: wallTex,
      emissiveMap: wallTex,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      metalness: 0.6,
      roughness: 0.45,
      side: THREE.BackSide
    })
  );
  wall.position.y = (top + bottom) / 2;
  group.add(wall);

  // Anneaux néon qui défilent pendant la descente (cyan / rose en alternance)
  const cyan = new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.cyan).multiplyScalar(2.2), toneMapped: false });
  const pink = new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.magenta).multiplyScalar(2.0), toneMapped: false });
  const ringGeo = new THREE.TorusGeometry(radius - 0.05, 0.045, 8, 64);
  let k = 0;
  for (let y = top - 1.2; y > bottom + 0.4; y -= 2.4) {
    const ring = new THREE.Mesh(ringGeo, k % 2 ? pink : cyan);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    group.add(ring);
    k++;
  }

  // Quatre bandes lumineuses verticales
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, height, 0.06), i % 2 ? pink : cyan);
    strip.position.set(Math.cos(a) * (radius - 0.06), (top + bottom) / 2, Math.sin(a) * (radius - 0.06));
    group.add(strip);
  }

  // Bouche du puits au plafond du sous-sol : un anneau lumineux plus épais
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(radius + 0.1, 0.12, 12, 64), cyan);
  mouth.rotation.x = Math.PI / 2;
  mouth.position.y = bottom + 0.1;
  group.add(mouth);

  if (opening) {
    // Trappe lumineuse posée sur le sol à l'entrée du puits : un disque sombre
    // qui « s'ouvre » vers le bas, cerclé de néon, avec un halo en dégradé
    const hatch = new THREE.Group();
    hatch.position.set(0, opening.y, 0);
    hatch.rotation.x = opening.tilt || 0;
    group.add(hatch);
    const glowCvs = document.createElement('canvas');
    glowCvs.width = 256;
    glowCvs.height = 256;
    const g = glowCvs.getContext('2d');
    const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, '#02030a');
    grad.addColorStop(0.55, '#050a1e');
    grad.addColorStop(0.8, 'rgba(34, 228, 255, 0.55)');
    grad.addColorStop(1, 'rgba(34, 228, 255, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const glowTex = new THREE.CanvasTexture(glowCvs);
    glowTex.colorSpace = THREE.SRGBColorSpace;
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 1.25, 64),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        // Toujours dessiné par-dessus le bord des marches (pas de clignotement)
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -8
      })
    );
    disc.renderOrder = 2;
    disc.rotation.x = -Math.PI / 2;
    hatch.add(disc);
    [[radius, cyan, 0.07], [radius * 0.72, pink, 0.04]].forEach(([r, mat, t]) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, t, 10, 72), mat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.02;
      hatch.add(ring);
    });
  }

  return group;
}
