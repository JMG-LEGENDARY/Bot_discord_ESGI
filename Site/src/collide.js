// =========================================================================
// COLLISIONS RAPIDES (grille de triangles)
// Tester un rayon contre la tour entière (des dizaines de milliers de
// triangles) prend plusieurs millisecondes. On range donc une fois pour
// toutes les triangles des décors fixes dans une grille de cases de 4 m :
// un rayon ne teste ensuite que les triangles des quelques cases qu'il
// traverse (quelques centièmes de milliseconde).
// =========================================================================
import * as THREE from 'three';

const CELL = 4;
const OFFSET = 1024; // coordonnées de case de -1024 à +1023 (±4 km)
const MAX_CELLS = 512; // au-delà, le triangle est « grand » et testé à part

const cellKey = (x, y, z) => ((x + OFFSET) * 2048 + (y + OFFSET)) * 2048 + (z + OFFSET);

// Grille des triangles d'une liste d'objets fixes
function buildCollisionGrid(meshes) {
  const tris = [];
  const v = new THREE.Vector3();
  meshes.forEach((o) => {
    const pos = o.geometry.attributes.position;
    const index = o.geometry.index;
    const count = index ? index.count : pos.count;
    for (let i = 0; i < count; i++) {
      v.fromBufferAttribute(pos, index ? index.getX(i) : i).applyMatrix4(o.matrixWorld);
      tris.push(v.x, v.y, v.z);
    }
  });
  const data = new Float32Array(tris);
  const nTris = data.length / 9;
  const cells = new Map();
  const large = [];
  for (let t = 0; t < nTris; t++) {
    const b = t * 9;
    const x0 = Math.floor(Math.min(data[b], data[b + 3], data[b + 6]) / CELL);
    const y0 = Math.floor(Math.min(data[b + 1], data[b + 4], data[b + 7]) / CELL);
    const z0 = Math.floor(Math.min(data[b + 2], data[b + 5], data[b + 8]) / CELL);
    const x1 = Math.floor(Math.max(data[b], data[b + 3], data[b + 6]) / CELL);
    const y1 = Math.floor(Math.max(data[b + 1], data[b + 4], data[b + 7]) / CELL);
    const z1 = Math.floor(Math.max(data[b + 2], data[b + 5], data[b + 8]) / CELL);
    if ((x1 - x0 + 1) * (y1 - y0 + 1) * (z1 - z0 + 1) > MAX_CELLS) {
      large.push(t);
      continue;
    }
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        for (let z = z0; z <= z1; z++) {
          const k = cellKey(x, y, z);
          let list = cells.get(k);
          if (!list) cells.set(k, (list = []));
          list.push(t);
        }
      }
    }
  }
  return { data, cells, large, stamp: new Uint32Array(nTris), query: 0 };
}

// Triangle contre rayon (Möller–Trumbore, les deux faces)
function hitTriangle(d, b, ox, oy, oz, dx, dy, dz, far) {
  const e1x = d[b + 3] - d[b], e1y = d[b + 4] - d[b + 1], e1z = d[b + 5] - d[b + 2];
  const e2x = d[b + 6] - d[b], e2y = d[b + 7] - d[b + 1], e2z = d[b + 8] - d[b + 2];
  const px = dy * e2z - dz * e2y, py = dz * e2x - dx * e2z, pz = dx * e2y - dy * e2x;
  const det = e1x * px + e1y * py + e1z * pz;
  if (Math.abs(det) < 1e-9) return far;
  const inv = 1 / det;
  const tx = ox - d[b], ty = oy - d[b + 1], tz = oz - d[b + 2];
  const u = (tx * px + ty * py + tz * pz) * inv;
  if (u < 0 || u > 1) return far;
  const qx = ty * e1z - tz * e1y, qy = tz * e1x - tx * e1z, qz = tx * e1y - ty * e1x;
  const w = (dx * qx + dy * qy + dz * qz) * inv;
  if (w < 0 || u + w > 1) return far;
  const t = (e2x * qx + e2y * qy + e2z * qz) * inv;
  return t > 0 && t < far ? t : far;
}

// Distance du premier mur le long du rayon (ou `far` si rien)
function castGrid(grid, origin, dir, far) {
  const { data, cells, large, stamp } = grid;
  const q = ++grid.query;
  const ox = origin.x, oy = origin.y, oz = origin.z;
  const dx = dir.x, dy = dir.y, dz = dir.z;
  let best = far;
  for (const t of large) best = hitTriangle(data, t * 9, ox, oy, oz, dx, dy, dz, best);
  const ex = ox + dx * far, ey = oy + dy * far, ez = oz + dz * far;
  const x0 = Math.floor(Math.min(ox, ex) / CELL), x1 = Math.floor(Math.max(ox, ex) / CELL);
  const y0 = Math.floor(Math.min(oy, ey) / CELL), y1 = Math.floor(Math.max(oy, ey) / CELL);
  const z0 = Math.floor(Math.min(oz, ez) / CELL), z1 = Math.floor(Math.max(oz, ez) / CELL);
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        const list = cells.get(cellKey(x, y, z));
        if (!list) continue;
        for (let i = 0; i < list.length; i++) {
          const t = list[i];
          if (stamp[t] === q) continue; // déjà testé dans une autre case
          stamp[t] = q;
          best = hitTriangle(data, t * 9, ox, oy, oz, dx, dy, dz, best);
        }
      }
    }
  }
  return best;
}

const triCount = (g) => (g.index ? g.index.count : g.attributes.position.count) / 3;

// Monde des collisions. Les objets sont notés au départ ; une seconde plus
// tard (finalize), ceux qui n'ont pas bougé vont dans la grille de leur zone,
// les petits objets qui bougent (soucoupe, satellites…) sont testés un par
// un, les gros objets mobiles sont ignorés.
export function createCollisionWorld(roots, layer) {
  const zones = roots.map((root) => {
    const meshes = [];
    root.updateMatrixWorld(true);
    root.traverse((o) => {
      if (o.isMesh && o.layers.isEnabled(layer)) meshes.push({ o, m: o.matrixWorld.clone() });
    });
    return { root, meshes, grid: null, moving: [] };
  });
  const ray = new THREE.Raycaster();
  ray.layers.set(layer);
  const hits = [];
  let ready = false;

  function finalize() {
    zones.forEach((z) => {
      z.root.updateMatrixWorld(true);
      const still = [];
      z.meshes.forEach(({ o, m }) => {
        if (o.matrixWorld.equals(m)) still.push(o);
        else if (triCount(o.geometry) < 8000) z.moving.push(o);
      });
      if (still.length) z.grid = buildCollisionGrid(still);
      z.meshes = null;
    });
    ready = true;
  }

  // Distance du premier obstacle sur le rayon (ou `far` si rien)
  function cast(origin, dir, far) {
    if (!ready) return far;
    let best = far;
    for (const z of zones) {
      if (!z.root.visible) continue;
      if (z.grid) best = castGrid(z.grid, origin, dir, best);
      if (z.moving.length) {
        ray.set(origin, dir);
        ray.far = best;
        hits.length = 0;
        for (const o of z.moving) if (o.visible) o.raycast(ray, hits);
        for (const h of hits) if (h.distance < best) best = h.distance;
      }
    }
    return best;
  }

  return { finalize, cast, get ready() { return ready; } };
}
