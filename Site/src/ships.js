import * as THREE from 'three';
import { mergeStaticMeshes } from './merge-static.js';
import { GLOW } from './glows.js';

// Texture de coque : plaques de blindage, joints et trappes, pour que le métal
// ne soit pas uniforme. Sert de couleur et de rugosité (les joints brillent moins).
function createHullPlatingTexture() {
  const size = 512;
  const cvs = document.createElement('canvas');
  cvs.width = size;
  cvs.height = size;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#8a8f9c';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const w = 40 + Math.random() * 120;
    const h = 30 + Math.random() * 90;
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = 120 + Math.floor(Math.random() * 40);
    ctx.fillStyle = `rgb(${v}, ${v + 3}, ${v + 10})`;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(20, 22, 30, 0.85)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  }
  for (let i = 0; i < 400; i++) {
    ctx.fillStyle = 'rgba(25, 28, 36, 0.7)';
    ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createFlagshipCruiser(hullMat, darkMat, cyanGlow, pinkGlow) {
  const cruiser = new THREE.Group();

  const mainHull = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.2, 22), hullMat);
  cruiser.add(mainHull);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(3.1, 7.5, 4), hullMat);
  nose.rotation.x = Math.PI / 2;
  nose.rotation.z = Math.PI / 4;
  nose.scale.set(1.0, 1.0, 0.52);
  nose.position.z = 14.5;
  cruiser.add(nose);

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 5.2), darkMat);
  bridge.position.set(0, 1.7, -2.5);
  const bridgeVisor = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.26, 4.4), cyanGlow);
  bridgeVisor.position.set(0, 1.85, -2.3);
  cruiser.add(bridge, bridgeVisor);

  [-3.8, 3.8].forEach((sx, idx) => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.45, 9.5), darkMat);
    wing.position.set(sx, -0.2, -3.5);
    wing.rotation.z = idx === 0 ? 0.14 : -0.14;
    cruiser.add(wing);

    const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 8.5, 12), hullMat);
    nacelle.rotation.x = Math.PI / 2;
    nacelle.position.set(sx * 1.15, 0.1, -6.5);
    cruiser.add(nacelle);

    const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.18, 2.8, 12), cyanGlow);
    thruster.rotation.x = -Math.PI / 2;
    thruster.position.set(sx * 1.15, 0.1, -12.0);
    cruiser.add(thruster);

    const navLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 8, 8),
      idx === 0 ? pinkGlow : cyanGlow
    );
    navLight.position.set(sx * 1.5, -0.1, -3.5);
    cruiser.add(navLight);
  });

  const mainNozzle = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 0.25, 4.0, 14), cyanGlow);
  mainNozzle.rotation.x = -Math.PI / 2;
  mainNozzle.position.set(0, 0, -12.9);
  cruiser.add(mainNozzle);

  return cruiser;
}

function createStarfighter(hullMat, darkMat, engineMat) {
  const ship = new THREE.Group();

  const body = new THREE.Mesh(new THREE.ConeGeometry(0.55, 4.6, 12), hullMat);
  body.rotation.x = Math.PI / 2;
  body.scale.set(1.1, 1.0, 0.55);
  ship.add(body);

  const cockpit = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 1.15), engineMat);
  cockpit.position.set(0, 0.22, 0.35);
  ship.add(cockpit);

  const wings = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 1.6), darkMat);
  wings.position.set(0, 0, -0.85);
  ship.add(wings);

  [-0.85, 0.85].forEach((wx) => {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.9), hullMat);
    fin.position.set(wx, 0.32, -1.2);
    fin.rotation.z = wx > 0 ? -0.25 : 0.25;
    ship.add(fin);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.14, 2.1, 8), engineMat);
    flame.rotation.x = -Math.PI / 2;
    flame.position.set(wx * 0.45, 0, -2.65);
    ship.add(flame);
  });

  return ship;
}

function createOrbitalShuttle(hullMat, darkMat, accentMat) {
  const shuttle = new THREE.Group();

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.35, 6.8), hullMat);
  shuttle.add(cabin);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.0, 1.6), darkMat);
  nose.position.set(0, -0.1, 4.0);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.32, 0.88), accentMat);
  windshield.position.set(0, 0.25, 3.7);
  shuttle.add(nose, windshield);

  [
    [-1.45, 2.0],
    [1.45, 2.0],
    [-1.45, -2.2],
    [1.45, -2.2]
  ].forEach(([px, pz]) => {
    const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 1.6, 10), darkMat);
    pod.rotation.x = Math.PI / 2;
    pod.position.set(px, -0.1, pz);

    const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.04, 1.3, 8), accentMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(px, -0.1, pz - 1.25);
    shuttle.add(pod, glow);
  });

  return shuttle;
}

export function buildSpaceFleet(scene, mainTowerHeight, glows) {
  const fleetGroup = new THREE.Group();

  // Matériaux satinés calibrés pour éviter toute surexposition sous l'éclairage orbital
  const plating = createHullPlatingTexture();
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x9aa3b8,
    map: plating,
    roughnessMap: plating,
    bumpMap: plating,
    bumpScale: 0.6,
    metalness: 0.7,
    roughness: 0.55,
    envMapIntensity: 1.1
  });
  const darkHullMat = new THREE.MeshStandardMaterial({
    color: 0x2a3044,
    map: plating,
    bumpMap: plating,
    bumpScale: 0.5,
    metalness: 0.6,
    roughness: 0.5,
    envMapIntensity: 0.9
  });

  // Intensités HDR maîtrisées pour un halo néon propre sans éblouissement
  const cyanGlow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.0, 1.35, 1.75),
    toneMapped: false
  });
  const pinkGlow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.65, 0.12, 0.95),
    toneMapped: false
  });
  const amberGlow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.75, 0.85, 0.12),
    toneMapped: false
  });

  const flagship = createFlagshipCruiser(hullMat, darkHullMat, cyanGlow, pinkGlow);
  fleetGroup.add(flagship);
  if (glows) {
    glows.add(flagship, new THREE.Vector3(0, 0, -15.2), GLOW.engineCyan, 6.5);
    glows.add(flagship, new THREE.Vector3(-4.37, 0.1, -13.6), GLOW.engineCyan, 4.2);
    glows.add(flagship, new THREE.Vector3(4.37, 0.1, -13.6), GLOW.engineCyan, 4.2);
    // Convention aéronautique : rouge à gauche (bâbord), vert à droite (tribord)
    glows.add(flagship, new THREE.Vector3(5.9, -0.5, -3.5), GLOW.navRed, 1.2);
    glows.add(flagship, new THREE.Vector3(-5.9, -0.5, -3.5), GLOW.navGreen, 1.2);
    glows.add(flagship, new THREE.Vector3(0, 2.6, -2.5), GLOW.strobe, 1.8, { speed: 0.9, phase: 0.2, duty: 0.07 });
    glows.add(flagship, new THREE.Vector3(0, -1.2, 6), GLOW.navRed, 1.0, { speed: 0.6, phase: 0.5, duty: 0.5 });
  }

  const flightPaths = [
    new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-68, mainTowerHeight + 12, 42),
        new THREE.Vector3(0, mainTowerHeight + 18, 76),
        new THREE.Vector3(72, mainTowerHeight + 10, 34),
        new THREE.Vector3(58, mainTowerHeight + 4, -58),
        new THREE.Vector3(-25, mainTowerHeight + 15, -74),
        new THREE.Vector3(-76, mainTowerHeight + 8, -22)
      ],
      true
    ),
    new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(95, 110, -40),
        new THREE.Vector3(45, 92, 68),
        new THREE.Vector3(-55, 76, 62),
        new THREE.Vector3(-92, 95, -28),
        new THREE.Vector3(-20, 114, -88)
      ],
      true
    ),
    new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-82, 48, 55),
        new THREE.Vector3(38, 34, 78),
        new THREE.Vector3(88, 56, 12),
        new THREE.Vector3(44, 62, -76),
        new THREE.Vector3(-54, 38, -68)
      ],
      true
    )
  ];

  const ships = [];

  for (let i = 0; i < 15; i++) {
    const isCyan = i % 2 === 0;
    const fighter = createStarfighter(hullMat, darkHullMat, isCyan ? cyanGlow : pinkGlow);
    const curve = flightPaths[i % flightPaths.length];
    fleetGroup.add(fighter);
    if (glows) {
      const engine = isCyan ? GLOW.engineCyan : GLOW.engineMagenta;
      glows.add(fighter, new THREE.Vector3(-0.38, 0, -3.6), engine, 1.5);
      glows.add(fighter, new THREE.Vector3(0.38, 0, -3.6), engine, 1.5);
      glows.add(fighter, new THREE.Vector3(1.75, 0, -0.85), GLOW.navRed, 0.45);
      glows.add(fighter, new THREE.Vector3(-1.75, 0, -0.85), GLOW.navGreen, 0.45);
      glows.add(fighter, new THREE.Vector3(0, 0.35, -1.3), GLOW.strobe, 0.8, { speed: 1.1, phase: i * 0.13, duty: 0.06 });
    }

    ships.push({
      mesh: fighter,
      curve,
      t: (i / 15 + Math.random() * 0.05) % 1,
      speed: 0.036 + (i % 3) * 0.008,
      bankFactor: 1.8
    });
  }

  for (let s = 0; s < 9; s++) {
    const shuttle = createOrbitalShuttle(
      hullMat,
      darkHullMat,
      s % 3 === 0 ? pinkGlow : s % 2 === 0 ? cyanGlow : amberGlow
    );
    const curve = flightPaths[(s + 1) % flightPaths.length];
    fleetGroup.add(shuttle);
    if (glows) {
      const engine = s % 2 === 0 ? GLOW.engineCyan : GLOW.engineMagenta;
      [[-1.45, 2.0], [1.45, 2.0], [-1.45, -2.2], [1.45, -2.2]].forEach(([px, pz]) => {
        glows.add(shuttle, new THREE.Vector3(px, -0.1, pz - 2.0), engine, 1.2);
      });
      glows.add(shuttle, new THREE.Vector3(0, 0.9, 0), GLOW.strobe, 0.9, { speed: 0.7, phase: s * 0.21, duty: 0.06 });
      // Phares d'atterrissage à l'avant
      glows.add(shuttle, new THREE.Vector3(-0.5, -0.4, 4.85), GLOW.headlight, 0.8);
      glows.add(shuttle, new THREE.Vector3(0.5, -0.4, 4.85), GLOW.headlight, 0.8);
    }

    ships.push({
      mesh: shuttle,
      curve,
      t: (s / 9 + 0.12) % 1,
      speed: 0.02 + (s % 2) * 0.005,
      bankFactor: 0.75
    });
  }

  // Chaque vaisseau : ses pièces fusionnées par matériau (il bouge d'un bloc)
  fleetGroup.children.forEach((ship) => mergeStaticMeshes(ship));
  scene.add(fleetGroup);

  const posNow = new THREE.Vector3();
  const posAhead = new THREE.Vector3();
  const tangentNow = new THREE.Vector3();
  const tangentAhead = new THREE.Vector3();

  function update(delta, elapsed) {
    const cruiserAngle = elapsed * 0.085;
    const cruiserR = 84;
    const cruiserY = mainTowerHeight + 16 + Math.sin(elapsed * 0.6) * 2.2;
    flagship.position.set(
      Math.cos(cruiserAngle) * cruiserR,
      cruiserY,
      Math.sin(cruiserAngle) * cruiserR
    );
    flagship.rotation.y = -cruiserAngle;
    flagship.rotation.z = -0.08;

    ships.forEach((s) => {
      if (!s.mesh.visible) return;
      s.t = (s.t + s.speed * delta) % 1;
      const tNext = (s.t + 0.015) % 1;

      s.curve.getPointAt(s.t, posNow);
      s.curve.getPointAt(tNext, posAhead);
      s.curve.getTangentAt(s.t, tangentNow);
      s.curve.getTangentAt(tNext, tangentAhead);

      s.mesh.position.copy(posNow);
      s.mesh.lookAt(posAhead);

      const turnDelta = tangentNow.x * tangentAhead.z - tangentNow.z * tangentAhead.x;
      s.mesh.rotateZ(THREE.MathUtils.clamp(turnDelta * 22 * s.bankFactor, -0.75, 0.75));
    });
  }

  // Mode léger : un vaisseau sur deux disparaît (ses lumières aussi)
  function setLite(on) {
    ships.forEach((s, i) => {
      s.mesh.visible = !on || i % 2 === 0;
    });
  }

  return { group: fleetGroup, update, setLite };
}