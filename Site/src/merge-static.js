import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// =========================================================================
// FUSION DES OBJETS FIXES
// Chaque objet 3D coûte un « appel de dessin » à la carte graphique, même
// minuscule. Les objets immobiles qui partagent le même matériau sont donc
// fusionnés en un seul : même image, beaucoup moins de travail.
// Un objet (ou un de ses parents) marqué userData.dynamic n'est pas touché :
// il bouge, s'anime ou se clique.
// =========================================================================
export function mergeStaticMeshes(group) {
  group.updateMatrixWorld(true);
  // Les formes fusionnées sont exprimées dans le repère du groupe : le groupe
  // peut ensuite bouger (vaisseaux) sans rien casser.
  const toGroup = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const local = new THREE.Matrix4();
  const buckets = new Map();
  const merged = [];

  group.traverse((obj) => {
    if (!obj.isMesh || obj.isInstancedMesh || obj.isSkinnedMesh || !obj.visible) return;
    for (let p = obj; p && p !== group; p = p.parent) {
      if (p.userData.dynamic) return;
    }
    if (Array.isArray(obj.material)) return;
    const key = `${obj.material.uuid}|${obj.geometry.index ? 'i' : 'n'}|${obj.renderOrder}`;
    if (!buckets.has(key)) buckets.set(key, { material: obj.material, renderOrder: obj.renderOrder, meshes: [] });
    buckets.get(key).meshes.push(obj);
  });

  buckets.forEach(({ material, renderOrder, meshes }) => {
    if (meshes.length < 2) return;
    // Couleurs par sommet gardées seulement si toutes les formes en ont (feuillages)
    const keep = ['position', 'normal', 'uv'];
    if (meshes.every((m) => m.geometry.attributes.color)) keep.push('color');
    const geos = meshes.map((m) => {
      const g = m.geometry.clone();
      g.applyMatrix4(local.multiplyMatrices(toGroup, m.matrixWorld));
      // Ne garder que les attributs communs à toutes les formes
      Object.keys(g.attributes).forEach((name) => {
        if (!keep.includes(name)) g.deleteAttribute(name);
      });
      g.morphAttributes = {};
      return g;
    });
    const mergedGeo = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    if (!mergedGeo) return;
    meshes.forEach((m) => m.parent.remove(m));
    const mesh = new THREE.Mesh(mergedGeo, material);
    mesh.renderOrder = renderOrder;
    merged.push(mesh);
  });

  merged.forEach((m) => group.add(m));
  return merged.length;
}
