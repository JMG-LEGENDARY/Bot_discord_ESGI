import * as THREE from 'three';

// =========================================================================
// PORTE D'ENTRÉE DE LA TOUR
// Posée exactement sur la porte du modèle 3D (en haut des marches).
// Deux battants vitrés à cadre bronze ; au clic ils s'ouvrent vers nous et
// une lumière blanche jaillit de l'intérieur.
// =========================================================================

// Imposte au-dessus des battants : verre sombre et lettres dorées
function createTransomTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 512;
  cvs.height = 96;
  const ctx = cvs.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 0, 96);
  bg.addColorStop(0, '#141a26');
  bg.addColorStop(1, '#0a0d14');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 96);
  ctx.font = '700 40px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#e8c98a';
  ctx.shadowColor = 'rgba(255, 200, 120, 0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('E S G I  ·  B O T', 256, 50);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Verre des battants : reflets obliques, intérieur tamisé chaud
function createGlassTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 128;
  cvs.height = 256;
  const ctx = cvs.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 0, 256);
  bg.addColorStop(0, '#2b2a2c');
  bg.addColorStop(1, '#4a3a28');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 128, 256);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-20, 120);
  ctx.lineTo(150, 20);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-20, 160);
  ctx.lineTo(150, 60);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * spot = { x, z, bottom, top, width } : ouverture de la porte du modèle.
 */
export function createEntranceDoor(scene, glows, spot) {
  const group = new THREE.Group();
  group.position.set(spot.x, spot.bottom, spot.z);
  scene.add(group);

  const W = spot.width;
  const H = spot.top - spot.bottom;
  const transomH = Math.min(0.5, H * 0.16);
  const leafH = H - transomH - 0.06;
  const leafW = W / 2 - 0.04;

  const bronze = new THREE.MeshStandardMaterial({
    color: 0x8c6a3f, metalness: 0.92, roughness: 0.32, envMapIntensity: 1.5,
    emissive: 0xffb050, emissiveIntensity: 0
  });
  const glass = new THREE.MeshStandardMaterial({
    map: createGlassTexture(), color: 0xffffff, metalness: 0.6, roughness: 0.08, envMapIntensity: 1.6
  });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd9b26a, metalness: 1, roughness: 0.2, envMapIntensity: 1.8 });

  // Lumière blanche derrière les battants (invisible tant que c'est fermé)
  const lightMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1, 1, 1).multiplyScalar(3), transparent: true, opacity: 0, toneMapped: false, depthWrite: false
  });
  const light = new THREE.Mesh(new THREE.PlaneGeometry(W, leafH), lightMat);
  light.position.set(0, leafH / 2, 0.01);
  group.add(light);

  // Rayons de lumière qui sortent par la porte ouverte
  const rayMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1, 0.97, 0.9).multiplyScalar(1.4), transparent: true, opacity: 0,
    toneMapped: false, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
  });
  const rays = new THREE.Mesh(new THREE.CylinderGeometry(W * 1.6, W * 0.55, 5, 4, 1, true), rayMat);
  rays.rotation.set(Math.PI / 2, Math.PI / 4, 0);
  rays.scale.set(1, 1, leafH / W);
  rays.position.set(0, leafH / 2, 2.5);
  group.add(rays);

  // Cadre bronze autour de l'ouverture
  const frameT = 0.09;
  [-1, 1].forEach((s) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(frameT, H, 0.12), bronze);
    post.position.set(s * (W / 2 - frameT / 2), H / 2, 0.06);
    group.add(post);
  });
  const head = new THREE.Mesh(new THREE.BoxGeometry(W, frameT, 0.12), bronze);
  head.position.set(0, H - frameT / 2, 0.06);
  group.add(head);
  const mullion = new THREE.Mesh(new THREE.BoxGeometry(W, 0.06, 0.12), bronze);
  mullion.position.set(0, leafH + 0.03, 0.06);
  group.add(mullion);

  // Imposte avec l'inscription
  const transom = new THREE.Mesh(
    new THREE.PlaneGeometry(W - frameT * 2, transomH - 0.06),
    new THREE.MeshBasicMaterial({ map: createTransomTexture(), toneMapped: false })
  );
  transom.position.set(0, leafH + 0.06 + (transomH - 0.06) / 2 - 0.03, 0.07);
  group.add(transom);

  // Deux battants qui pivotent vers l'extérieur (charnières sur les côtés)
  const leaves = [-1, 1].map((s) => {
    const hinge = new THREE.Group();
    hinge.position.set(s * (W / 2 - frameT), 0, 0.08);
    group.add(hinge);

    const leaf = new THREE.Group();
    leaf.position.x = -s * leafW / 2;
    hinge.add(leaf);

    const stile = 0.08;
    const pane = new THREE.Mesh(new THREE.BoxGeometry(leafW - stile * 2, leafH - stile * 2, 0.02), glass);
    pane.position.y = leafH / 2;
    leaf.add(pane);
    // Montants et traverses bronze
    [[-1, 0], [1, 0]].forEach(([k]) => {
      const st = new THREE.Mesh(new THREE.BoxGeometry(stile, leafH, 0.06), bronze);
      st.position.set(k * (leafW / 2 - stile / 2), leafH / 2, 0);
      leaf.add(st);
    });
    [stile / 2, leafH - stile / 2, leafH * 0.18].forEach((y, i) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(leafW, i === 2 ? stile * 1.6 : stile, 0.06), bronze);
      rail.position.set(0, y, 0);
      leaf.add(rail);
    });
    // Poignée verticale dorée côté ouverture
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, leafH * 0.32, 10), gold);
    handle.position.set(-s * (leafW / 2 - 0.16), leafH * 0.5, 0.07);
    leaf.add(handle);
    [-1, 1].forEach((k) => {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.06), gold);
      foot.position.set(-s * (leafW / 2 - 0.16), leafH * 0.5 + k * leafH * 0.15, 0.04);
      leaf.add(foot);
    });
    hinge.userData.side = s;
    return hinge;
  });

  // Appliques murales de chaque côté
  [-1, 1].forEach((s) => {
    const sconce = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.08), gold);
    sconce.position.set(s * (W / 2 + 0.2), H * 0.62, 0.05);
    group.add(sconce);
    glows.add(group, new THREE.Vector3(s * (W / 2 + 0.2), H * 0.62 + 0.12, 0.12), [1.7, 1.25, 0.75], 0.4);
  });

  // Zone de clic : toute la porte
  const hitBox = new THREE.Mesh(new THREE.BoxGeometry(W + 0.2, H + 0.1, 0.4), new THREE.MeshBasicMaterial({ visible: false }));
  hitBox.position.set(0, H / 2, 0.15);
  group.add(hitBox);

  const center = new THREE.Vector3(spot.x, spot.bottom + leafH / 2, spot.z);
  let open = 0;
  let glow = 0;
  let hover = 0;
  let hoverTarget = 0;

  return {
    center,
    height: H,
    isHit(raycaster) {
      return raycaster.intersectObject(hitBox, false).length > 0;
    },
    setHover(on) {
      hoverTarget = on ? 1 : 0;
    },
    /** open : 0 fermée → 1 ouverte ; glow : intensité de la lumière blanche */
    setState(openAmount, glowAmount) {
      open = THREE.MathUtils.clamp(openAmount, 0, 1);
      glow = THREE.MathUtils.clamp(glowAmount, 0, 1);
    },
    update(elapsed) {
      hover += (hoverTarget - hover) * 0.15;
      // Au survol, le cadre s'illumine doucement (invite au clic)
      bronze.emissiveIntensity = hover * (0.35 + 0.1 * Math.sin(elapsed * 4));
      const eased = open * open * (3 - 2 * open);
      leaves.forEach((hinge) => {
        hinge.rotation.y = hinge.userData.side * eased * 1.75;
      });
      lightMat.opacity = Math.min(1, glow * 1.4);
      rayMat.opacity = glow * 0.35;
    }
  };
}
