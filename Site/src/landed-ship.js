import * as THREE from 'three';

// =========================================================================
// LE VAISSEAU POSÉ SUR LA PISTE DU SOMMET
// C'est le vaisseau du cockpit, vu de l'extérieur. Quand on arrive du
// cockpit, on le voit descendre du ciel et se poser sur la piste ; un clic
// dessus le fait redécoller et on remonte à bord (retour au cockpit).
// Coordonnées locales à la plateforme : le dessus de la piste est à y = 0.
// =========================================================================

const PARK = new THREE.Vector3(0, 0, 1.2); // place sur la piste
const PARK_YAW = 0.55; // nez tourné vers la caméra, un peu de biais
const GEAR = 0.5; // hauteur des trains d'atterrissage
const SCALE = 1.25; // taille du vaisseau sur la piste
const BODY_Y = (0.36 + GEAR - 0.07) * SCALE; // centre de la coque quand il est posé

const smooth = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;

function buildHull() {
  const ship = new THREE.Group();

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xbfc7d6,
    metalness: 0.65,
    roughness: 0.3,
    envMapIntensity: 0.9,
    emissive: new THREE.Color(0x22e4ff),
    emissiveIntensity: 0
  });
  // Panneaux supérieurs (même réaction au survol que la coque)
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x8f9ab3,
    metalness: 0.7,
    roughness: 0.38,
    envMapIntensity: 0.8,
    emissive: new THREE.Color(0x22e4ff),
    emissiveIntensity: 0
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x161c2c, metalness: 0.75, roughness: 0.42, envMapIntensity: 0.6 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a1430,
    emissive: new THREE.Color(0x0a3a6a),
    emissiveIntensity: 0.35,
    metalness: 0.2,
    roughness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.6
  });
  const cyan = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.15, 0.75, 1.0), toneMapped: false });
  const pink = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 0.12, 0.6), toneMapped: false });
  const windowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.75, 0.9, 1.0), toneMapped: false });

  // Forme vue de dessus (x, z), nez vers +z, extrudée vers le bas avec des
  // bords arrondis : coque en pointe de flèche, épaules larges
  const extrudeTop = (pts, depth, bevel, y, mat) => {
    const shape = new THREE.Shape();
    pts.forEach(([x, z], i) => (i ? shape.lineTo(x, z) : shape.moveTo(x, z)));
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 4 });
    geo.rotateX(Math.PI / 2); // y de la forme -> z ; l'épaisseur part vers le bas
    geo.translate(0, y, 0);
    const mesh = new THREE.Mesh(geo, mat);
    ship.add(mesh);
    return mesh;
  };
  const mirror = (half) => half.concat(half.slice(1, -1).reverse().map(([x, z]) => [-x, z]));

  // Coque principale
  extrudeTop(mirror([[0, 2.6], [0.5, 1.7], [0.95, 0.5], [1.85, -0.5], [2.0, -1.3], [1.35, -1.85], [0.7, -1.7], [0, -1.75]]), 0.24, 0.1, 0.16, hullMat);
  // Lignes de panneaux gravées sur le dessus de la coque
  [[0.95, 0.1, 0.5], [1.35, -0.6, 0.45], [1.2, -1.35, 0.4]].forEach(([x, z, len]) => {
    [1, -1].forEach((side) => {
      const groove = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.02, len), darkMat);
      groove.position.set(side * x, 0.27, z);
      groove.rotation.y = side * 0.5;
      ship.add(groove);
    });
  });
  // Ventre sombre, un peu plus petit
  extrudeTop(mirror([[0, 2.1], [0.75, 0.5], [1.5, -0.5], [1.55, -1.3], [0, -1.5]]), 0.08, 0.05, -0.17, darkMat);
  // Superstructure dorsale (le pont)
  extrudeTop(mirror([[0, 1.45], [0.42, 0.7], [0.62, -0.5], [0.55, -1.55], [0, -1.6]]), 0.24, 0.08, 0.55, wingMat);
  // Tourelle de capteurs à l'arrière du pont, avec son mât
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), darkMat);
  dome.position.set(0, 0.6, -1.05);
  ship.add(dome);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.45, 6), darkMat);
  mast.position.set(0, 0.95, -1.05);
  ship.add(mast);
  const mastTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), pink);
  mastTip.position.set(0, 1.18, -1.05);
  ship.add(mastTip);

  // Verrière panoramique à l'avant du pont
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), glassMat);
  canopy.scale.set(0.4, 0.2, 0.62);
  canopy.position.set(0, 0.6, 0.62);
  ship.add(canopy);

  // Hublots éclairés sur les flancs du pont
  [1, -1].forEach((side) => {
    for (let i = 0; i < 5; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.05, 0.12), windowMat);
      w.position.set(side * (0.63 - i * 0.004), 0.44, -0.2 - i * 0.26);
      ship.add(w);
    }
  });

  // Liserés lumineux sur les bords du nez et à l'arrière
  [1, -1].forEach((side) => {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 1.25), cyan);
    edge.position.set(side * 0.72, 0.17, 1.1);
    edge.rotation.y = side * Math.atan2(0.45, 1.2);
    ship.add(edge);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.9), pink);
    stripe.position.set(side * 1.4, 0.22, -0.95);
    stripe.rotation.y = side * 0.25;
    ship.add(stripe);
  });

  // Réacteurs : un gros moteur central et deux nacelles latérales
  const engines = [];
  const nozzleTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 2, 32, 32, 32);
    gr.addColorStop(0, '#ffffff');
    gr.addColorStop(0.35, '#9fdcff');
    gr.addColorStop(0.7, '#1d4f8a');
    gr.addColorStop(0.9, '#0a1428');
    gr.addColorStop(1, '#2a3350');
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const flameMat = new THREE.ShaderMaterial({
    uniforms: { uPower: { value: 0 }, uTime: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform float uPower;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        float flick = 0.85 + 0.15 * sin(uTime * 40.0 + vUv.y * 20.0);
        float a = pow(vUv.y, 2.0) * flick * uPower;
        vec3 col = mix(vec3(0.2, 0.5, 1.0), vec3(0.8, 0.95, 1.0), vUv.y);
        gl_FragColor = vec4(col * a * 0.9, 1.0);
      }
    `
  });
  const engine = (x, y, z, r, len) => {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.08, len, 28), darkMat);
    body.rotation.x = Math.PI / 2;
    body.position.set(x, y, z);
    ship.add(body);
    const back = z - len / 2;
    // Anneau lumineux autour de la tuyère
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.02, r * 0.1, 8, 32), cyan);
    ring.position.set(x, y, back - 0.01);
    ship.add(ring);
    const glowMat = new THREE.MeshBasicMaterial({ map: nozzleTex, color: new THREE.Color(0.3, 0.85, 1.2), toneMapped: false });
    const glow = new THREE.Mesh(new THREE.CircleGeometry(r * 0.9, 28), glowMat);
    glow.rotation.y = Math.PI;
    glow.position.set(x, y, back - 0.02);
    ship.add(glow);
    engines.push(glowMat);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(r * 0.8, r * 6, 16, 1, true), flameMat);
    flame.rotation.x = Math.PI / 2; // pointe contre la tuyère, s'évase vers l'arrière
    flame.position.set(x, y, back - r * 3);
    ship.add(flame);
  };
  engine(0, 0.12, -1.75, 0.36, 0.7);
  [1, -1].forEach((side) => {
    // Nacelle : corps, nez arrondi, pylône qui la relie à la coque
    const x = side * 2.3;
    engine(x, 0.05, -0.55, 0.24, 2.3);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 12), hullMat);
    nose.scale.set(1, 1, 1.8);
    nose.position.set(x, 0.05, 0.6);
    ship.add(nose);
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.9), wingMat);
    pylon.position.set(side * 1.95, 0.08, -0.65);
    ship.add(pylon);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 1.8), cyan);
    strip.position.set(x + side * 0.24, 0.05, -0.5);
    ship.add(strip);
    // Feu de position sur la nacelle (vert à droite, rouge à gauche)
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 10, 8),
      new THREE.MeshBasicMaterial({ color: side > 0 ? new THREE.Color(0.1, 1.2, 0.4) : new THREE.Color(1.3, 0.1, 0.15), toneMapped: false })
    );
    tip.position.set(x, 0.32, -0.2);
    tip.userData.navLight = true;
    ship.add(tip);
  });

  // Patins de sustentation sous la coque : disques lumineux + jets
  const liftMat = flameMat.clone();
  liftMat.uniforms = { uPower: { value: 0 }, uTime: flameMat.uniforms.uTime };
  const padMat = new THREE.MeshBasicMaterial({ map: nozzleTex, color: new THREE.Color(0.25, 0.7, 1.0), toneMapped: false });
  [[1.05, -0.9], [-1.05, -0.9], [0.5, 1.0], [-0.5, 1.0]].forEach(([x, z]) => {
    const pad = new THREE.Mesh(new THREE.CircleGeometry(0.2, 20), padMat);
    pad.rotation.x = Math.PI / 2;
    pad.position.set(x, -0.31, z);
    ship.add(pad);
    const jet = new THREE.Mesh(new THREE.ConeGeometry(0.17, 1.1, 14, 1, true), liftMat);
    jet.position.set(x, -0.92, z);
    ship.add(jet);
  });

  // Trains d'atterrissage (vérins épais, larges patins ; rentrent en vol)
  const gear = new THREE.Group();
  [[0, 1.5], [1.25, -1.15], [-1.25, -1.15]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, GEAR, 10), darkMat);
    leg.position.set(x, -0.36 - GEAR / 2 + 0.04, z);
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, GEAR * 0.45, 10), wingMat);
    sleeve.position.set(x, -0.36 - GEAR * 0.22, z);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.05, 0.42), darkMat);
    foot.position.set(x, -0.36 - GEAR + 0.07, z);
    gear.add(leg, sleeve, foot);
  });
  ship.add(gear);
  ship.scale.setScalar(SCALE);

  return { ship, hullMat, wingMat, engines, flameMat, liftMat, gear };
}

// Balises lumineuses autour de la piste : elles s'allument en vague pendant
// l'atterrissage, puis restent en veille douce
function buildPadLights() {
  const N = 24;
  const pos = new Float32Array(N * 3);
  const idx = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    pos.set([Math.cos(a) * 6.55, 0.05, Math.sin(a) * 6.55], i * 3);
    idx[i] = i / N;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aIdx', new THREE.BufferAttribute(idx, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uActive: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float aIdx;
      uniform float uTime;
      uniform float uActive;
      varying float vGlow;
      void main() {
        // Vague qui court autour de la piste, plus rapide quand on se pose
        float wave = pow(0.5 + 0.5 * cos((aIdx - uTime * (0.25 + uActive * 0.6)) * 6.2831), 6.0);
        vGlow = 0.25 + wave * (0.35 + uActive * 0.6);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = min(0.5 * projectionMatrix[1][1] * 300.0 / -mv.z, 18.0);
      }
    `,
    fragmentShader: `
      varying float vGlow;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        float core = pow(1.0 - d, 2.5);
        gl_FragColor = vec4(vec3(0.35, 0.9, 1.0) * core * vGlow, 1.0);
      }
    `
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return { pts, mat };
}

export function createLandedShip(platformGroup) {
  const root = new THREE.Group();
  platformGroup.add(root);

  const { ship, hullMat, wingMat, engines, flameMat, liftMat, gear } = buildHull();
  root.add(ship);
  const lights = buildPadLights();
  root.add(lights.pts);

  // Zone de clic invisible, un peu plus large que le vaisseau
  const hitBox = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.8, 5.2), new THREE.MeshBasicMaterial({ visible: false }));
  ship.add(hitBox);

  const parkedQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, PARK_YAW, 0));
  const parkedPos = new THREE.Vector3(PARK.x, BODY_Y, PARK.z);

  // Trajectoire d'approche : arrive de loin derrière la tour, passe au-dessus,
  // puis se met en vol stationnaire au-dessus de la piste
  const approach = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-70, 55, -140),
    new THREE.Vector3(-34, 30, -50),
    new THREE.Vector3(-6, 14, 6),
    new THREE.Vector3(PARK.x, 6.5, PARK.z)
  ]);
  // Départ : monte, puis file vers le ciel
  const departure = new THREE.CatmullRomCurve3([
    new THREE.Vector3(PARK.x, 3.2, PARK.z),
    new THREE.Vector3(6, 9, -12),
    new THREE.Vector3(22, 28, -70),
    new THREE.Vector3(45, 60, -170)
  ]);

  let state = 'parked'; // parked, landing, takeoff, away
  let t = 0;
  let hover = false;
  let onDone = null;
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const tmpM = new THREE.Matrix4();
  const flyQuat = new THREE.Quaternion();
  const UP = new THREE.Vector3(0, 1, 0);

  function park() {
    state = 'parked';
    ship.visible = true;
    ship.position.copy(parkedPos);
    ship.quaternion.copy(parkedQuat);
    gear.scale.y = 1;
    gear.visible = true;
  }
  park();

  // Orientation qui suit la trajectoire (nez vers l'avant, léger roulis)
  function faceAlong(curve, u, roll) {
    curve.getPointAt(Math.min(0.999, u), tmpA);
    curve.getPointAt(Math.min(1, u + 0.01), tmpB);
    tmpM.lookAt(tmpB, tmpA, UP);
    flyQuat.setFromRotationMatrix(tmpM);
    if (roll) flyQuat.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), roll));
    return tmpA;
  }

  function setPower(engine, lift) {
    engines.forEach((m) => m.color.setRGB(0.3 + engine * 0.5, 0.85 + engine * 0.4, 1.2 + engine * 0.4));
    flameMat.uniforms.uPower.value = engine;
    liftMat.uniforms.uPower.value = lift;
  }

  function update(delta, elapsed) {
    flameMat.uniforms.uTime.value = elapsed;
    lights.mat.uniforms.uTime.value = elapsed;
    // Feux de position qui clignotent
    const blink = Math.sin(elapsed * 3.2) > 0.6;
    ship.children.forEach((c) => {
      if (c.userData.navLight) c.visible = blink;
    });
    const hoverGlow = hover && state === 'parked' ? 0.12 + Math.sin(elapsed * 5) * 0.04 : 0;
    hullMat.emissiveIntensity += (hoverGlow - hullMat.emissiveIntensity) * Math.min(1, delta * 10);
    wingMat.emissiveIntensity = hullMat.emissiveIntensity;

    if (state === 'parked') {
      setPower(0, 0);
      lights.mat.uniforms.uActive.value = Math.max(0, lights.mat.uniforms.uActive.value - delta * 0.5);
      return;
    }
    if (state === 'away') return;

    if (state === 'landing') {
      t += delta;
      const A = 3.4; // approche
      const B = 2.6; // descente verticale
      lights.mat.uniforms.uActive.value = 1;
      if (t < A) {
        const u = easeOut(t / A);
        const p = faceAlong(approach, u, Math.sin(u * Math.PI) * -0.5);
        ship.position.copy(p);
        // Sur la fin de l'approche, le vaisseau se redresse vers sa place
        ship.quaternion.copy(flyQuat).slerp(parkedQuat, smooth(Math.max(0, (u - 0.7) / 0.3)));
        gear.scale.y = 0.05;
        setPower(1 - u * 0.7, u * 0.6);
      } else {
        const v = Math.min(1, (t - A) / B);
        ship.position.set(PARK.x, 6.5 + (BODY_Y - 6.5) * smooth(v), PARK.z);
        // Petite oscillation pendant la descente, qui s'éteint au contact
        ship.position.x += Math.sin(t * 2.4) * 0.08 * (1 - v);
        ship.quaternion.copy(parkedQuat);
        gear.scale.y = 0.05 + 0.95 * smooth(Math.min(1, v * 1.6));
        setPower(0.3 * (1 - v), 1 - easeIn(v));
        if (v >= 1) {
          park();
          lights.mat.uniforms.uActive.value = 1;
          if (onDone) onDone();
          onDone = null;
        }
      }
    } else if (state === 'takeoff') {
      t += delta;
      const A = 0.9; // décollage vertical
      const B = 1.6; // départ vers le ciel
      lights.mat.uniforms.uActive.value = 1;
      if (t < A) {
        const v = smooth(t / A);
        ship.position.set(PARK.x, BODY_Y + (3.2 - BODY_Y) * v, PARK.z);
        gear.scale.y = Math.max(0.05, 1 - v * 1.4);
        setPower(0.2, 1);
      } else {
        const u = Math.min(1, (t - A) / B);
        const p = faceAlong(departure, easeIn(u) * 0.97 + u * 0.03, Math.sin(u * Math.PI) * 0.4);
        ship.position.copy(p);
        ship.quaternion.copy(parkedQuat).slerp(flyQuat, smooth(Math.min(1, u * 3)));
        gear.scale.y = 0.05;
        setPower(0.6 + u * 0.4, 1 - u);
        if (u >= 1) {
          state = 'away';
          ship.visible = false;
          if (onDone) onDone();
          onDone = null;
        }
      }
    }
  }

  return {
    get busy() {
      return state === 'landing' || state === 'takeoff';
    },
    /** Arrivée depuis le cockpit : le vaisseau se pose sous nos yeux */
    land() {
      state = 'landing';
      t = 0;
      ship.visible = true;
      gear.scale.y = 0.05;
      return new Promise((resolve) => (onDone = resolve));
    },
    /** Clic sur le vaisseau : il redécolle (on remonte à bord) */
    takeoff() {
      if (state !== 'parked') return Promise.resolve();
      state = 'takeoff';
      t = 0;
      return new Promise((resolve) => (onDone = resolve));
    },
    park,
    object: ship,
    isHit(raycaster) {
      if (!ship.visible || state !== 'parked') return false;
      return raycaster.intersectObject(hitBox, false).length > 0;
    },
    setHover(v) {
      hover = v;
    },
    update
  };
}
