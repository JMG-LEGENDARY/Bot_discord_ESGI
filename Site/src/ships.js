import * as THREE from 'three';

function createFlagshipCruiser(hullMat, darkMat, cyanHdr, pinkHdr) {
  const cruiser = new THREE.Group();

  // Coque principale profilée (26m)
  const mainHull = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.2, 22), hullMat);
  cruiser.add(mainHull);

  // Proue effilée
  const nose = new THREE.Mesh(new THREE.ConeGeometry(3.1, 7.5, 4), hullMat);
  nose.rotation.x = Math.PI / 2;
  nose.rotation.z = Math.PI / 4;
  nose.scale.set(1.0, 1.0, 0.52);
  nose.position.z = 14.5;
  cruiser.add(nose);

  // Passerelle de commandement supérieure
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 5.2), darkMat);
  bridge.position.set(0, 1.7, -2.5);
  const bridgeVisor = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.28, 4.4), cyanHdr);
  bridgeVisor.position.set(0, 1.85, -2.3);
  cruiser.add(bridge, bridgeVisor);

  // Ailes latérales & nacelles de réacteurs
  [-3.8, 3.8].forEach((sx, idx) => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.45, 9.5), darkMat);
    wing.position.set(sx, -0.2, -3.5);
    wing.rotation.z = idx === 0 ? 0.14 : -0.14;
    cruiser.add(wing);

    const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 8.5, 12), hullMat);
    nacelle.rotation.x = Math.PI / 2;
    nacelle.position.set(sx * 1.15, 0.1, -6.5);
    cruiser.add(nacelle);

    const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.2, 3.2, 12), cyanHdr);
    thruster.rotation.x = -Math.PI / 2;
    thruster.position.set(sx * 1.15, 0.1, -12.2);
    cruiser.add(thruster);

    // Feux de navigation bout d'aile
    const navLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 8, 8),
      idx === 0 ? pinkHdr : cyanHdr
    );
    navLight.position.set(sx * 1.5, -0.1, -3.5);
    cruiser.add(navLight);
  });

  // Tuyère centrale principale
  const mainNozzle = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.3, 4.5, 14), cyanHdr);
  mainNozzle.rotation.x = -Math.PI / 2;
  mainNozzle.position.set(0, 0, -13.2);
  cruiser.add(mainNozzle);

  return cruiser;
}

function createStarfighter(hullMat, darkMat, engineMat) {
  const ship = new THREE.Group();

  // Fuselage effilé
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.55, 4.6, 6), hullMat);
  body.rotation.x = Math.PI / 2;
  body.scale.set(1.1, 1.0, 0.55);
  ship.add(body);

  // Verrière cockpit lumineuse
  const cockpit = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.24, 1.2), engineMat);
  cockpit.position.set(0, 0.22, 0.35);
  ship.add(cockpit);

  // Ailes delta + dérives
  const wings = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 1.6), darkMat);
  wings.position.set(0, 0, -0.85);
  ship.add(wings);

  [-0.85, 0.85].forEach((wx) => {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.9), hullMat);
    fin.position.set(wx, 0.32, -1.2);
    fin.rotation.z = wx > 0 ? -0.25 : 0.25;
    ship.add(fin);

    // Double réacteur ionique + traînée lumineuse
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 2.4, 8), engineMat);
    flame.rotation.x = -Math.PI / 2;
    flame.position.set(wx * 0.45, 0, -2.8);
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
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.35, 0.9), accentMat);
  windshield.position.set(0, 0.25, 3.7);
  shuttle.add(nose, windshield);

  // 4 nacelles orientables latérales
  [
    [-1.45, 2.0],
    [1.45, 2.0],
    [-1.45, -2.2],
    [1.45, -2.2]
  ].forEach(([px, pz]) => {
    const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 1.6, 10), darkMat);
    pod.rotation.x = Math.PI / 2;
    pod.position.set(px, -0.1, pz);

    const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.05, 1.4, 8), accentMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(px, -0.1, pz - 1.3);
    shuttle.add(pod, glow);
  });

  return shuttle;
}

export function buildSpaceFleet(scene, mainTowerHeight) {
  const fleetGroup = new THREE.Group();

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xdbeafe,
    metalness: 0.78,
    roughness: 0.24
  });
  const darkHullMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.28
  });
  const cyanHdr = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.0, 2.5, 3.2),
    toneMapped: false
  });
  const pinkHdr = new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.9, 0.1, 1.5),
    toneMapped: false
  });
  const amberHdr = new THREE.MeshBasicMaterial({
    color: new THREE.Color(3.0, 1.4, 0.1),
    toneMapped: false
  });

  // 1. CROISEUR ORBITAL MAJESTUEUX EN HAUTE ORBITE (ESPACE)
  const flagship = createFlagshipCruiser(hullMat, darkHullMat, cyanHdr, pinkHdr);
  fleetGroup.add(flagship);

  // 2. TRAJECTOIRES 3D EN SPLINES POUR ESCADRILLES DE CHASSEURS & NAVETTES
  const flightPaths = [
    // Circuit haute orbite autour de la citadelle (y ~ 132-146m)
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
    // Circuit plongeant à travers la couche nuageuse (y ~ 74-112m)
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
    // Circuit basse/moyenne altitude entre les gratte-ciels (y ~ 32-62m)
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

  // 15 Chasseurs stellaires rapides répartis sur les 3 couloirs aériens
  for (let i = 0; i < 15; i++) {
    const isCyan = i % 2 === 0;
    const fighter = createStarfighter(hullMat, darkHullMat, isCyan ? cyanHdr : pinkHdr);
    const curve = flightPaths[i % flightPaths.length];
    fleetGroup.add(fighter);

    ships.push({
      mesh: fighter,
      curve,
      t: (i / 15 + Math.random() * 0.05) % 1,
      speed: 0.036 + (i % 3) * 0.008,
      bankFactor: 1.8
    });
  }

  // 9 Navettes orbitales lourdes
  for (let s = 0; s < 9; s++) {
    const shuttle = createOrbitalShuttle(
      hullMat,
      darkHullMat,
      s % 3 === 0 ? pinkHdr : s % 2 === 0 ? cyanHdr : amberHdr
    );
    const curve = flightPaths[(s + 1) % flightPaths.length];
    fleetGroup.add(shuttle);

    ships.push({
      mesh: shuttle,
      curve,
      t: (s / 9 + 0.12) % 1,
      speed: 0.02 + (s % 2) * 0.005,
      bankFactor: 0.75
    });
  }

  scene.add(fleetGroup);

  const posNow = new THREE.Vector3();
  const posAhead = new THREE.Vector3();
  const tangentNow = new THREE.Vector3();
  const tangentAhead = new THREE.Vector3();

  function update(delta, elapsed) {
    // Orbite majestueuse du croiseur amiral dans l'espace
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

    // Mouvement fluide et inclinaison (banking) de toute la flotte
    ships.forEach((s) => {
      s.t = (s.t + s.speed * delta) % 1;
      const tNext = (s.t + 0.015) % 1;

      s.curve.getPointAt(s.t, posNow);
      s.curve.getPointAt(tNext, posAhead);
      s.curve.getTangentAt(s.t, tangentNow);
      s.curve.getTangentAt(tNext, tangentAhead);

      s.mesh.position.copy(posNow);
      s.mesh.lookAt(posAhead);

      // Calcul du roulis dans les virages
      const turnDelta = tangentNow.x * tangentAhead.z - tangentNow.z * tangentAhead.x;
      s.mesh.rotateZ(THREE.MathUtils.clamp(turnDelta * 22 * s.bankFactor, -0.75, 0.75));
    });
  }

  return { update };
}