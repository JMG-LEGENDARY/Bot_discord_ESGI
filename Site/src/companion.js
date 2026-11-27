import * as THREE from 'three';
import { GLOW } from './glows.js';

// =========================================================================
// NOVA — le petit vaisseau compagnon qui suit le visiteur
// - suit la caméra avec un léger retard (ressort amorti, comme un vrai drone)
// - pendant le défilement : tracé scripté qui ondule selon la position dans la page
// - après 10 s sans bouger : se balade devant l'écran en faisant des boucles
// - parle dans une bulle de BD (messages envoyés par main.js)
// =========================================================================

// Revêtement « jouet » : plastique blanc nacré, un peu plus ombré sous le ventre,
// avec un joint discret à l'équateur
function createHullTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');
  const base = ctx.createLinearGradient(0, 0, 0, 512);
  base.addColorStop(0, '#ffffff');
  base.addColorStop(0.5, '#f4f6fc');
  base.addColorStop(1, '#dde2ef');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 1024, 512);
  // Joint gravé à l'équateur (trait sombre + trait clair)
  ctx.fillStyle = 'rgba(120, 130, 165, 0.35)';
  ctx.fillRect(0, 262, 1024, 3);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(0, 265, 1024, 2);
  // Petites grilles d'aération sous le ventre
  for (let k = 0; k < 4; k++) {
    const cx = 128 + k * 256;
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = 'rgba(110, 120, 160, 0.3)';
      ctx.beginPath();
      ctx.roundRect(cx - 24, 330 + i * 12, 48, 5, 3);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// -------------------------------------------------------------------------
// VISAGE : un écran dessiné sur un canvas, redessiné seulement quand
// l'expression change (yeux ovales, yeux rieurs ^^, sommeil, tournis, colère…)
// -------------------------------------------------------------------------
function createFace() {
  const S = 512;
  const cvs = document.createElement('canvas');
  cvs.width = S;
  cvs.height = S;
  const ctx = cvs.getContext('2d');
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  const CYAN = '#62f4ff';
  const EX = [178, 334]; // abscisses des yeux
  const EY = 222;
  let current = '';

  function stroke(width) {
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  function blush() {
    [118, 394].forEach((x) => {
      const g = ctx.createRadialGradient(x, 318, 0, x, 318, 46);
      g.addColorStop(0, 'rgba(255, 110, 190, 0.85)');
      g.addColorStop(1, 'rgba(255, 110, 190, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, 318, 46, 28, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  const eyes = {
    open() {
      ctx.fillStyle = CYAN;
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.ellipse(x, EY, 34, 50, 0, 0, Math.PI * 2);
        ctx.fill();
        // reflet
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.ellipse(x - 11, EY - 20, 11, 14, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = CYAN;
      });
    },
    sleepy() {
      ctx.fillStyle = CYAN;
      EX.forEach((x) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x - 40, EY - 4, 80, 60);
        ctx.clip();
        ctx.beginPath();
        ctx.ellipse(x, EY, 34, 50, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      stroke(10);
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x - 38, EY - 4);
        ctx.lineTo(x + 38, EY - 4);
        ctx.stroke();
      });
    },
    blink() {
      stroke(14);
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x - 32, EY + 6);
        ctx.lineTo(x + 32, EY + 6);
        ctx.stroke();
      });
    },
    happy() {
      // yeux rieurs « ^ ^ »
      stroke(20);
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, EY + 22, 34, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      });
    },
    sleep() {
      // paupières fermées « u u »
      stroke(14);
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, EY - 6, 30, Math.PI * 0.15, Math.PI * 0.85);
        ctx.stroke();
      });
    },
    dizzy() {
      // spirales
      stroke(9);
      EX.forEach((x) => {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 5; a += 0.15) {
          const r = 4 + a * 2.6;
          const px = x + Math.cos(a) * r;
          const py = EY + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
    },
    heart() {
      // yeux en cœur (amoureuse)
      ctx.fillStyle = '#ff7ad0';
      EX.forEach((x) => {
        const y = EY - 8;
        ctx.beginPath();
        ctx.moveTo(x, y + 40);
        ctx.bezierCurveTo(x - 58, y + 2, x - 30, y - 42, x, y - 12);
        ctx.bezierCurveTo(x + 30, y - 42, x + 58, y + 2, x, y + 40);
        ctx.fill();
      });
    },
    star() {
      // yeux étoiles (émerveillée)
      ctx.fillStyle = '#ffe17a';
      EX.forEach((x) => {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + (i * Math.PI) / 5;
          const r = i % 2 ? 18 : 44;
          ctx.lineTo(x + Math.cos(a) * r, EY + Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
      });
    },
    wide() {
      // grands yeux ronds (surprise)
      ctx.fillStyle = CYAN;
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, EY, 46, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x, EY, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(x - 16, EY - 18, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = CYAN;
      });
    },
    sad() {
      // yeux tristes, sourcils qui tombent
      ctx.fillStyle = CYAN;
      EX.forEach((x) => {
        ctx.beginPath();
        ctx.ellipse(x, EY + 10, 28, 36, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      stroke(10);
      [[EX[0], 1], [EX[1], -1]].forEach(([x, d]) => {
        ctx.beginPath();
        ctx.moveTo(x - 32 * d, EY - 44);
        ctx.lineTo(x + 28 * d, EY - 60);
        ctx.stroke();
      });
    },
    angry() {
      // « > < »
      stroke(18);
      [[EX[0], 1], [EX[1], -1]].forEach(([x, d]) => {
        ctx.beginPath();
        ctx.moveTo(x - 26 * d, EY - 30);
        ctx.lineTo(x + 24 * d, EY);
        ctx.lineTo(x - 26 * d, EY + 30);
        ctx.stroke();
      });
    }
  };
  const mouths = {
    smile() {
      stroke(16);
      ctx.beginPath();
      ctx.arc(256, 300, 40, Math.PI * 0.18, Math.PI * 0.82);
      ctx.stroke();
    },
    open() {
      // bouche ouverte en « D » couché
      ctx.fillStyle = CYAN;
      ctx.beginPath();
      ctx.moveTo(214, 320);
      ctx.quadraticCurveTo(256, 316, 298, 320);
      ctx.quadraticCurveTo(292, 382, 256, 384);
      ctx.quadraticCurveTo(220, 382, 214, 320);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 110, 190, 0.9)';
      ctx.beginPath();
      ctx.ellipse(256, 366, 22, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    grin() {
      ctx.fillStyle = CYAN;
      ctx.beginPath();
      ctx.moveTo(198, 318);
      ctx.quadraticCurveTo(256, 314, 314, 318);
      ctx.quadraticCurveTo(300, 396, 256, 398);
      ctx.quadraticCurveTo(212, 396, 198, 318);
      ctx.fill();
    },
    o() {
      stroke(12);
      ctx.beginPath();
      ctx.ellipse(256, 340, 14, 18, 0, 0, Math.PI * 2);
      ctx.stroke();
    },
    flat() {
      stroke(14);
      ctx.beginPath();
      ctx.moveTo(226, 340);
      ctx.lineTo(286, 340);
      ctx.stroke();
    },
    wavy() {
      stroke(12);
      ctx.beginPath();
      for (let x = 210; x <= 302; x += 4) {
        const y = 340 + Math.sin((x - 210) * 0.14) * 9;
        if (x === 210) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  /** eye : open | sleepy | blink | happy | sleep | dizzy | angry | heart | star | wide | sad ; mouth : smile | open | grin | o | flat | wavy */
  function set(eye, mouth, zzz = false) {
    const key = `${eye}/${mouth}/${zzz}`;
    if (key === current) return;
    current = key;
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, S, S);
    ctx.shadowColor = CYAN;
    ctx.shadowBlur = 18; // léger halo autour des traits
    blush();
    eyes[eye]();
    mouths[mouth]();
    if (zzz) {
      ctx.fillStyle = CYAN;
      ctx.font = 'bold 54px sans-serif';
      ctx.fillText('z', 360, 130);
      ctx.font = 'bold 38px sans-serif';
      ctx.fillText('z', 404, 92);
    }
    ctx.shadowBlur = 0;
    tex.needsUpdate = true;
  }
  set('open', 'smile');
  return { texture: tex, set };
}

// Aile translucide de libellule : dégradé bleuté, bord plus clair, nervure
function createWingTexture() {
  const W = 128;
  const H = 256;
  const cvs = document.createElement('canvas');
  cvs.width = W;
  cvs.height = H;
  const ctx = cvs.getContext('2d');
  const g = ctx.createLinearGradient(0, H, 0, 0);
  g.addColorStop(0, 'rgba(150, 235, 255, 0.95)');
  g.addColorStop(1, 'rgba(200, 245, 255, 0.55)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(W / 2, H / 2, W / 2 - 4, H / 2 - 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W / 2, H - 10);
  ctx.quadraticCurveTo(W / 2 - 10, H / 2, W / 2 + 8, 30);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildShip() {
  const ship = new THREE.Group();
  const R = 0.3; // NOVA est une boule toute ronde

  // Plastique laqué : vernis brillant, léger reflet nacré, bords veloutés
  const hullMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: createHullTexture(),
    metalness: 0.0,
    roughness: 0.34,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    sheen: 0.35,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color(0xf2f8ff),
    iridescence: 0.15,
    iridescenceIOR: 1.3,
    envMapIntensity: 1.1
  });
  const pastelMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fe8f6,
    roughness: 0.32,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffffff),
    envMapIntensity: 1.0
  });
  const pinkMat = new THREE.MeshPhysicalMaterial({
    color: 0xffa6d8,
    roughness: 0.32,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffffff),
    envMapIntensity: 1.0
  });
  const darkMat = new THREE.MeshPhysicalMaterial({
    color: 0x3d4360,
    metalness: 0.55,
    roughness: 0.28,
    clearcoat: 0.6,
    envMapIntensity: 1.2
  });
  const face = createFace();
  // Écran en verre fumé : le visage s'allume à travers (emissiveMap)
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x070c1c,
    emissive: 0xffffff,
    emissiveMap: face.texture,
    emissiveIntensity: 1.6,
    metalness: 0.2,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    iridescence: 0.35,
    iridescenceIOR: 1.6,
    envMapIntensity: 1.6
  });
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, depthWrite: false });
  const engineGlowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 2.6, 3.4), toneMapped: false });
  const antennaBallMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 0.4, 1.8), toneMapped: false });
  const wingMat = new THREE.MeshBasicMaterial({
    map: createWingTexture(),
    color: new THREE.Color(1.15, 1.15, 1.2),
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false
  });

  // Corps : une sphère à peine aplatie (bien dodue, façon boule de pâte)
  const body = new THREE.Mesh(new THREE.SphereGeometry(R, 72, 48), hullMat);
  body.scale.set(1.04, 0.96, 1.0);
  ship.add(body);

  // Grand écran bombé à l'avant : calotte de sphère tournée vers +z, avec des
  // coordonnées de texture « à plat » pour y dessiner le visage
  const capAngle = 0.98; // demi-ouverture de la calotte (rad)
  const capR = R * 1.012;
  const capGeo = new THREE.SphereGeometry(capR, 64, 32, 0, Math.PI * 2, 0, capAngle);
  capGeo.rotateX(Math.PI / 2);
  const faceRadius = capR * Math.sin(capAngle);
  const cp = capGeo.attributes.position;
  const cuv = capGeo.attributes.uv;
  for (let i = 0; i < cp.count; i++) {
    cuv.setXY(i, cp.getX(i) / (2 * faceRadius) + 0.5, cp.getY(i) / (2 * faceRadius) + 0.5);
  }
  const visor = new THREE.Mesh(capGeo, visorMat);
  visor.scale.copy(body.scale);
  ship.add(visor);

  // Cerclage pastel autour de l'écran
  const rim = new THREE.Mesh(new THREE.TorusGeometry(faceRadius, 0.017, 14, 80), pastelMat);
  rim.position.z = capR * Math.cos(capAngle);
  rim.scale.copy(body.scale);
  ship.add(rim);

  // Reflets « dessin animé » sur l'écran (haut à gauche)
  const glint = new THREE.Mesh(new THREE.CircleGeometry(0.03, 20), glintMat);
  glint.scale.set(1.9, 0.6, 1);
  glint.position.set(-0.1, 0.13, 0.25);
  glint.lookAt(new THREE.Vector3(-0.1, 0.13, 0.25).multiplyScalar(3));
  glint.rotateZ(0.6);
  ship.add(glint);
  const glintDot = new THREE.Mesh(new THREE.CircleGeometry(0.012, 14), glintMat);
  glintDot.position.set(-0.035, 0.165, 0.258);
  glintDot.lookAt(new THREE.Vector3(-0.035, 0.165, 0.258).multiplyScalar(3));
  ship.add(glintDot);

  // Deux bandes pastel qui passent par-dessus la tête (comme un casque)
  [[-0.075, pastelMat], [0.075, pinkMat]].forEach(([x, mat]) => {
    const r = Math.sqrt(R * R - x * x) + 0.004;
    const arc = new THREE.Mesh(new THREE.TorusGeometry(r, 0.011, 10, 60, Math.PI * 0.62), mat);
    arc.rotation.y = Math.PI / 2;
    arc.rotation.x = Math.PI * 0.12; // de l'arrière du crâne jusqu'au-dessus de l'écran
    arc.position.x = x;
    arc.scale.set(1, 0.96, 1.0);
    ship.add(arc);
  });

  // « Oreilles » : deux pastilles rondes sur les côtés (comme un casque audio)
  [-1, 1].forEach((side) => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.08, 0.04, 40), pinkMat);
    ear.rotation.z = Math.PI / 2;
    ear.position.set(side * 0.305, -0.01, -0.02);
    ship.add(ear);
    const earCap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.02, 32), pastelMat);
    earCap.rotation.z = Math.PI / 2;
    earCap.position.set(side * 0.33, -0.01, -0.02);
    ship.add(earCap);
  });

  // Deux ailes translucides sur le dos, qui battent doucement
  const wings = [];
  [-1, 1].forEach((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.1, 0.24, -0.1);
    const tilt = new THREE.Group();
    tilt.rotation.z = -side * 0.38; // écartées vers l'extérieur
    tilt.rotation.x = -0.35; // penchées vers l'arrière
    const wing = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.32), wingMat);
    wing.position.y = 0.15;
    tilt.add(wing);
    pivot.add(tilt);
    pivot.userData.side = side;
    ship.add(pivot);
    wings.push(pivot);
  });

  // Antenne avec un petit cœur lumineux au bout
  const antenna = new THREE.Group();
  antenna.position.set(0, 0.27, 0.04);
  const socket = new THREE.Mesh(new THREE.SphereGeometry(0.026, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), pinkMat);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.011, 0.1, 12), darkMat);
  stem.position.y = 0.05;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, -0.03);
  heartShape.bezierCurveTo(-0.045, 0.0, -0.035, 0.035, 0, 0.018);
  heartShape.bezierCurveTo(0.035, 0.035, 0.045, 0.0, 0, -0.03);
  const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.014,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 4,
    curveSegments: 20
  });
  heartGeo.center();
  const heart = new THREE.Mesh(heartGeo, antennaBallMat);
  heart.scale.setScalar(1.2);
  heart.position.y = 0.125;
  antenna.add(socket, stem, heart);
  ship.add(antenna);

  // Deux petits réacteurs ronds, nichés à l'arrière, cerclés de pastel
  const nozzles = [];
  [-1, 1].forEach((side) => {
    const pod = new THREE.Mesh(new THREE.SphereGeometry(0.055, 32, 20), darkMat);
    pod.scale.set(1, 1, 1.2);
    pod.position.set(side * 0.1, -0.1, -0.25);
    ship.add(pod);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.009, 10, 32), pastelMat);
    ring.position.set(side * 0.1, -0.1, -0.312);
    ship.add(ring);
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.037, 24), engineGlowMat);
    core.rotation.y = Math.PI;
    core.position.set(side * 0.1, -0.1, -0.318);
    ship.add(core);
    nozzles.push(new THREE.Vector3(side * 0.1, -0.1, -0.34));
  });

  // Toutes les pièces dans un « rig » : il peut rebondir et s'étirer sans déplacer le vaisseau
  const rig = new THREE.Group();
  while (ship.children.length) rig.add(ship.children[0]);
  ship.add(rig);

  return { ship, nozzles, face, antenna, wings, heart, rig, mats: { hullMat, pastelMat, visorMat } };
}

export function createCompanion(scene, camera, glows) {
  const { ship, nozzles, face, antenna, wings, heart, rig, mats } = buildShip();
  let moodName = null;
  let moodUntil = 0;
  let dancing = false;
  // Easter eggs : tournis, sieste, air fatigué, couronne
  let spinUntil = 0;
  let sleepUntil = 0;
  let wasSleeping = false;
  let sleepy = false;
  let crown = null;
  ship.scale.setScalar(1.05);
  ship.userData.glowScale = true;
  scene.add(ship);

  // Feux : réacteurs (avec scintillement), navigation rouge/vert, flash, phare
  if (glows) {
    nozzles.forEach((n) => {
      glows.add(ship, n, GLOW.engineCyan, 0.38);
      glows.add(ship, n, [0.6, 1.6, 2.2], 0.22, { speed: 9, phase: n.x, duty: 0.6 });
    });
    glows.add(ship, new THREE.Vector3(-0.345, -0.01, -0.02), GLOW.navRed, 0.06);
    glows.add(ship, new THREE.Vector3(0.345, -0.01, -0.02), GLOW.navGreen, 0.06);
    glows.add(ship, new THREE.Vector3(0, 0.395, 0.04), [2.4, 0.4, 1.6], 0.16, { speed: 0.7, phase: 0.3, duty: 0.5 });
  }

  // Traînée des réacteurs : points qui restent dans l'espace et s'estompent
  const TRAIL = 48;
  const trailPos = new Float32Array(TRAIL * 2 * 3);
  const trailAge = new Float32Array(TRAIL * 2);
  trailAge.fill(1);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3).setUsage(THREE.DynamicDrawUsage));
  trailGeo.setAttribute('age', new THREE.BufferAttribute(trailAge, 1).setUsage(THREE.DynamicDrawUsage));
  const trailMat = new THREE.ShaderMaterial({
    uniforms: { uScale: { value: window.innerHeight }, uShip: { value: 1 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    vertexShader: `
      attribute float age;
      uniform float uScale;
      uniform float uShip;
      varying float vAge;
      void main() {
        vAge = age;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp((0.09 * (1.0 - age) + 0.02) * uShip * uScale / -mv.z, 0.0, 64.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAge;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0 || vAge >= 1.0) discard;
        float a = exp(-d * 4.0) * pow(1.0 - vAge, 2.0);
        gl_FragColor = vec4(vec3(0.35, 1.6, 2.4) * a, 1.0);
      }
    `
  });
  const trail = new THREE.Points(trailGeo, trailMat);
  trail.frustumCulled = false;
  scene.add(trail);
  let trailHead = 0;
  let trailTimer = 0;
  const nozzleWorld = new THREE.Vector3();

  // État physique (ressort amorti vers la cible)
  const pos = new THREE.Vector3();
  const vel = new THREE.Vector3();
  const target = new THREE.Vector3();
  const local = new THREE.Vector3();
  const wander = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const prevForward = new THREE.Vector3(0, 0, -1);
  const camForward = new THREE.Vector3();
  const lookPoint = new THREE.Vector3();
  const prevLocal = new THREE.Vector3();
  const localVel = new THREE.Vector3();
  const camRight = new THREE.Vector3();
  let hasPrevLocal = false;
  let blinkTimer = 2.5;
  let blinkT = 1;
  let talking = false;
  let flapPhase = 0;
  const targetQuat = new THREE.Quaternion();
  const helper = new THREE.Object3D();
  let initialized = false;
  let roll = 0;
  let wanderPhase = 0;

  // Collisions : NOVA ne traverse ni les murs, ni le sol, ni la tour.
  // On lance 5 rayons depuis la caméra vers son centre et ses bords
  // (haut, bas, gauche, droite). Si une surface pleine est devant elle, on la
  // rapproche de la caméra en la rétrécissant d'autant : elle garde la même
  // place et la même taille à l'écran, mais reste devant le mur.
  let collision = null;
  const camPos = new THREE.Vector3();
  const camUp = new THREE.Vector3();
  const probe = new THREE.Vector3();
  const probeDir = new THREE.Vector3();
  const PROBES = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]];
  let fit = 1; // 1 = place normale, plus petit = rapprochée de la caméra
  function setCollision(world) {
    collision = world;
  }
  function clearance(radius) {
    if (!collision) return 1;
    camUp.set(0, 1, 0).applyQuaternion(camera.quaternion);
    camRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    let k = 1;
    for (const [ox, oy] of PROBES) {
      probe.copy(pos).addScaledVector(camRight, ox * radius).addScaledVector(camUp, oy * radius);
      probeDir.subVectors(probe, camPos);
      const len = probeDir.length();
      if (len < 1e-3) continue;
      probeDir.divideScalar(len);
      // Rayon du centre : on garde aussi l'épaisseur de NOVA vers l'arrière
      const reach = ox === 0 && oy === 0 ? len + radius : len;
      const hit = collision.cast(camPos, probeDir, reach);
      if (hit < reach) k = Math.min(k, (hit * 0.97) / reach);
    }
    return Math.max(k, 0.12);
  }

  // ---------------------------------------------------------------------
  // BULLE DE BD
  // ---------------------------------------------------------------------
  const bubble = document.getElementById('companion-bubble');
  const bubbleText = bubble ? bubble.querySelector('.companion-text') : null;
  let typingTimer = null;
  let hideTimer = null;
  let bubbleVisible = false;

  // Rend les adresses web cliquables (une fois le texte entièrement écrit)
  function linkify(text) {
    const escaped = text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    return escaped.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  function say(text, duration = 4500) {
    if (!bubble || !bubbleText) return;
    clearInterval(typingTimer);
    clearTimeout(hideTimer);
    bubbleText.textContent = '';
    bubble.classList.add('visible');
    bubbleVisible = true;
    talking = true;
    // Effet machine à écrire, lettre par lettre
    const chars = Array.from(text);
    let i = 0;
    typingTimer = setInterval(() => {
      bubbleText.textContent += chars[i];
      i++;
      if (i >= chars.length) {
        clearInterval(typingTimer);
        if (text.includes('http')) bubbleText.innerHTML = linkify(text);
      }
    }, 26);
    hideTimer = setTimeout(hide, duration + chars.length * 26);
  }

  function hide() {
    if (!bubble) return;
    clearInterval(typingTimer);
    bubble.classList.remove('visible');
    bubbleVisible = false;
    talking = false;
  }

  const screenPos = new THREE.Vector3();
  const bubbleEdge = new THREE.Vector3();
  function placeBubble() {
    if (!bubble || !bubbleVisible) return;
    screenPos.copy(ship.position).project(camera);
    if (screenPos.z > 1) {
      bubble.style.opacity = '0';
      return;
    }
    bubble.style.opacity = '';
    const w = window.innerWidth;
    const h = window.innerHeight;
    const sx = (screenPos.x + 1) * 0.5 * w;
    const sy = (1 - screenPos.y) * 0.5 * h;
    const bw = bubble.offsetWidth;
    const bh = bubble.offsetHeight;
    // Rayon de NOVA à l'écran (pour coller la bulle juste à côté de lui)
    bubbleEdge.set(1, 0, 0).applyQuaternion(camera.quaternion).multiplyScalar(0.36 * ship.scale.x).add(ship.position).project(camera);
    const r = Math.max(Math.abs((bubbleEdge.x + 1) * 0.5 * w - sx), 14);
    // La bulle se met à CÔTÉ de NOVA, à hauteur de sa bouche (jamais au-dessus
    // de sa tête : on voit la couronne et ses expressions), la pointe vers lui.
    // À gauche de préférence, à droite s'il n'y a pas la place.
    const side = sx - r - 18 - bw >= 12 ? 'left' : 'right';
    let left = side === 'left' ? sx - r - 18 - bw : sx + r + 18;
    const mouthY = sy + r * 0.2;
    let top = mouthY - bh * 0.5;
    left = Math.min(Math.max(left, 12), w - bw - 12);
    top = Math.min(Math.max(top, 64), h - bh - 12);
    bubble.dataset.side = side;
    bubble.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    // La pointe suit NOVA verticalement
    const tail = Math.min(Math.max(mouthY - top, 18), bh - 18);
    bubble.style.setProperty('--tail-y', `${Math.round(tail)}px`);
  }

  // ---------------------------------------------------------------------
  // MOUVEMENT
  // info : { progress (0-1 de la page), idle (s sans bouger), portrait, scrolling }
  // ---------------------------------------------------------------------
  function update(delta, elapsed, info) {
    const portrait = info.portrait;
    const p = info.progress;

    // 1) Tracé scripté pendant la visite : ondule selon la position dans la page.
    // Ancré en bas à droite de l'écran (en proportion de la vue, quel que soit
    // le format), pour ne jamais masquer le texte des panneaux au centre.
    // Dans la cabine d'ascenseur (petite pièce), il vole tout près de la
    // caméra, en bas à gauche, en plus petit, pour ne pas cacher le tableau.
    const cabin = Boolean(info.cabin);
    const baseZ = cabin ? -1.25 : portrait ? -5.6 : -5.2;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * -baseZ;
    const halfW = halfH * camera.aspect;
    const baseX = cabin ? -halfW * (portrait ? 0.45 : 0.62) : halfW * (portrait ? 0.55 : 0.74);
    const baseY = -halfH * (cabin ? (portrait ? 0.72 : 0.42) : portrait ? 0.5 : 0.6);
    // Point d'ancrage imposé (cockpit, QG, laboratoire) : position devant la
    // caméra { x, y, z } et taille { scale }, avec un léger flottement.
    const anchor = info.anchor || null;
    ship.scale.setScalar(anchor ? anchor.scale : cabin ? 0.15 : 1.05);
    if (anchor) {
      local.set(
        anchor.x + Math.sin(elapsed * 0.6) * anchor.scale * 0.25,
        anchor.y + Math.sin(elapsed * 1.4) * anchor.scale * 0.12,
        anchor.z + Math.cos(elapsed * 0.45) * anchor.scale * 0.2
      );
    } else {
      local.set(
        baseX + Math.sin(p * 41) * halfW * 0.08,
        baseY + Math.sin(p * 27 + 1.2) * halfH * 0.07 + Math.sin(elapsed * 1.4) * 0.05,
        baseZ + Math.cos(p * 33) * 0.35
      );
      // En descente il plonge un peu en avant, en montée il passe au-dessus
      local.y += THREE.MathUtils.clamp(-(info.verticalSpeed || 0) * 0.01, -0.3, 0.25);
    }

    // 2) Après 10 s d'inactivité : balade en boucles devant l'écran
    const wanderMix = cabin || anchor ? 0 : THREE.MathUtils.smoothstep(info.idle || 0, 10, 12.5);
    if (wanderMix > 0) {
      wanderPhase += delta;
      const t = wanderPhase;
      wander.set(
        Math.sin(t * 0.42) * (portrait ? 0.9 : 2.6) + Math.sin(t * 1.1) * 0.3,
        Math.sin(t * 0.63 + 0.8) * (portrait ? 1.4 : 1.0),
        -5.6 + Math.sin(t * 0.31) * 1.6
      );
      local.lerp(wander, wanderMix);
    } else {
      wanderPhase = 0;
    }

    target.copy(local);
    camera.localToWorld(target);

    if (!initialized) {
      pos.copy(target);
      initialized = true;
    }

    // 3) Ressort amorti : le vaisseau rattrape sa cible avec un petit retard
    const stiffness = 26;
    const damping = 2 * Math.sqrt(stiffness) * 0.85;
    vel.addScaledVector(target.clone().sub(pos), stiffness * delta);
    vel.multiplyScalar(Math.max(0, 1 - damping * delta));
    pos.addScaledVector(vel, delta);
    if (pos.distanceTo(target) > 25 || info.teleport) pos.copy(target); // téléportation de secours

    // 4) Orientation : il regarde le visiteur de trois quarts (on voit son visage),
    // et se tourne dans le sens de sa balade quand il bouge devant l'écran.
    camera.getWorldDirection(camForward);
    camRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    if (hasPrevLocal) localVel.copy(local).sub(prevLocal).divideScalar(Math.max(delta, 1e-3));
    prevLocal.copy(local);
    hasPrevLocal = true;
    const localSpeed = localVel.length();
    forward.copy(camForward).multiplyScalar(-1).addScaledVector(camRight, (info.portrait ? -0.25 : -0.45) * (cabin ? -1 : 1));
    if (localSpeed > 0.15) {
      const travel = localVel.clone().applyQuaternion(camera.quaternion).normalize();
      forward.addScaledVector(travel, Math.min(localSpeed, 2) * 0.9);
    }
    forward.normalize();
    // Posée dans une pièce (cockpit, QG, labo) : elle nous regarde en face
    if (anchor) {
      camera.getWorldPosition(camPos);
      forward.subVectors(camPos, pos).normalize();
    }

    helper.position.copy(pos);
    helper.up.copy(camera.up).applyQuaternion(camera.quaternion);
    lookPoint.copy(pos).add(forward);
    helper.lookAt(lookPoint);

    // Inclinaison dans les virages (comme un avion)
    const turn = prevForward.clone().cross(forward).dot(helper.up) / Math.max(delta, 1e-3);
    roll = THREE.MathUtils.lerp(roll, THREE.MathUtils.clamp(-turn * 0.9, -0.9, 0.9), 1 - Math.exp(-delta * 4));
    prevForward.copy(forward);
    helper.rotateZ(roll + Math.sin(elapsed * 1.7) * 0.04);
    targetQuat.copy(helper.quaternion);

    // Collisions : rentre vite devant un mur, ressort doucement ensuite
    camera.getWorldPosition(camPos);
    const k = cabin || anchor ? 1 : clearance(0.62 * ship.scale.x);
    fit = k < fit ? k : fit + (k - fit) * (1 - Math.exp(-delta * 3));
    if (fit < 0.999) {
      ship.position.subVectors(pos, camPos).multiplyScalar(fit).add(camPos);
      ship.scale.multiplyScalar(fit);
    } else {
      ship.position.copy(pos);
    }
    // Traînée à la taille de NOVA (plus petite dans le cockpit et l'ascenseur)
    trailMat.uniforms.uShip.value = ship.scale.x / 1.05;
    ship.quaternion.slerp(targetQuat, 1 - Math.exp(-delta * 7));

    // Clignement des yeux toutes les 2 à 5 s ; yeux plissés (sourire) quand il parle
    blinkTimer -= delta;
    if (blinkTimer <= 0) {
      blinkT = 0;
      blinkTimer = 2 + Math.random() * 3;
    }
    blinkT = Math.min(1, blinkT + delta * 7);
    const blink = 1 - Math.sin(blinkT * Math.PI) * 0.9;
    const now = performance.now();
    holoTime.value = elapsed;
    const sleeping = now < sleepUntil;
    if (wasSleeping && !sleeping) say('Ah ! Bien dormi 😊 On reprend ?', 3500);
    wasSleeping = sleeping;
    dancing = Boolean(info.dancing) && !sleeping;
    // Expression affichée sur l'écran du visage
    const spinning = now < spinUntil;
    const mood = now < moodUntil ? moodName : null;
    const mouthOpen = talking && Math.floor(elapsed * 8) % 2 === 0;
    if (sleeping) face.set('sleep', 'o', true);
    else if (spinning) face.set('dizzy', 'wavy');
    else if (mood === 'angry') face.set('angry', 'flat');
    else if (mood === 'love') face.set('heart', 'grin');
    else if (mood === 'wow') face.set('star', mouthOpen ? 'open' : 'grin');
    else if (mood === 'surprised') face.set('wide', 'o');
    else if (mood === 'sad') face.set('sad', 'wavy');
    else if (dancing) face.set('happy', 'grin');
    else if (mood === 'happy') face.set('happy', mouthOpen ? 'open' : 'grin');
    else if (blink < 0.5) face.set('blink', mouthOpen ? 'open' : 'smile');
    else if (talking) face.set('happy', mouthOpen ? 'open' : 'smile');
    else if (sleepy) face.set('sleepy', 'o');
    else face.set('open', 'smile');
    antenna.rotation.z = Math.sin(elapsed * 2.3) * 0.18 - roll * 0.5;
    antenna.rotation.x = Math.sin(elapsed * 1.7) * 0.1;

    // Ailes qui battent doucement (plus vite quand il se déplace ou danse, au ralenti quand il dort)
    flapPhase += delta * (sleeping ? 1.5 : 6 + Math.min(localSpeed, 3) * 4 + (dancing ? 6 : 0));
    wings.forEach((w) => {
      w.rotation.z = -w.userData.side * Math.sin(flapPhase) * 0.32;
    });
    heart.rotation.y += delta * (dancing ? 5 : 1.6);

    // Danse façon rap / pop sur la musique de l'ascenseur (environ 92 BPM) :
    // il hoche la tête sur chaque temps, sautille, et fait un gros saut
    // (pogo) tous les 4 temps, en s'écrasant un peu à chaque atterrissage.
    const follow = 1 - Math.exp(-delta * 12);
    let nod = 0;
    let hop = 0;
    let land = 0;
    let lean = 0;
    if (dancing) {
      const beats = elapsed * (92 / 60);
      const b = beats % 1; // position dans le temps (0 = sur le temps)
      const index = Math.floor(beats);
      const bigJump = index % 4 === 3;
      nod = Math.exp(-b * 6); // tête qui plonge sur le temps puis remonte
      hop = Math.sin(Math.PI * b) * (bigJump ? 0.17 : 0.05);
      land = Math.exp(-b * 10);
      lean = (index % 2 ? 1 : -1) * 0.1 * nod;
      if (bigJump) nod = -0.6 * Math.sin(Math.PI * b); // tête en arrière pendant le grand saut
    }
    if (sleeping) nod = 0.8 + Math.sin(elapsed * 1.2) * 0.1; // tête qui tombe, respiration lente
    rig.rotation.x = THREE.MathUtils.lerp(rig.rotation.x, nod * 0.42, follow);
    if (now < spinUntil) rig.rotation.y += delta * 14;
    else rig.rotation.y = THREE.MathUtils.lerp(rig.rotation.y % (Math.PI * 2), 0, follow);
    rig.rotation.z = THREE.MathUtils.lerp(rig.rotation.z, lean, follow);
    antenna.rotation.x += -nod * 0.9;
    // Petit rebond permanent + sauts en rythme quand il danse
    rig.position.y = Math.sin(elapsed * 2.4) * 0.025 + hop;
    const stretch = THREE.MathUtils.clamp(localSpeed * 0.04, 0, 0.14);
    const sq = THREE.MathUtils.lerp(rig.scale.z, 1 + stretch, 1 - Math.exp(-delta * 6));
    // S'écrase un peu à chaque atterrissage (effet « rebond »)
    const squash = dancing ? land * 0.14 : 0;
    rig.scale.set((1 - (sq - 1) * 0.5) * (1 + squash * 0.5), (1 - (sq - 1) * 0.5) * (1 - squash), sq);

    // 5) Traînée : un point par réacteur toutes les 20 ms
    trailTimer += delta;
    for (let i = 0; i < trailAge.length; i++) trailAge[i] = Math.min(1, trailAge[i] + delta / 0.9);
    if (trailTimer > 0.02) {
      trailTimer = 0;
      ship.updateMatrixWorld();
      nozzles.forEach((n, k) => {
        nozzleWorld.copy(n);
        ship.localToWorld(nozzleWorld);
        const idx = trailHead * 2 + k;
        trailPos[idx * 3] = nozzleWorld.x;
        trailPos[idx * 3 + 1] = nozzleWorld.y;
        trailPos[idx * 3 + 2] = nozzleWorld.z;
        trailAge[idx] = 0;
      });
      trailHead = (trailHead + 1) % TRAIL;
      trailGeo.attributes.position.needsUpdate = true;
    }
    trailGeo.attributes.age.needsUpdate = true;

    placeBubble();
  }

  function resize(bufferHeight, fovDeg) {
    trailMat.uniforms.uScale.value = bufferHeight / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
  }

  // Zone cliquable autour du vaisseau
  const hitSphere = new THREE.Sphere();
  function isHit(raycaster) {
    hitSphere.center.copy(ship.position);
    hitSphere.radius = 0.7 * ship.scale.x; // suit la taille de NOVA (plus petit dans l'ascenseur)
    return raycaster.ray.intersectsSphere(hitSphere);
  }

  // ---------------------------------------------------------------------
  // Easter eggs
  // ---------------------------------------------------------------------
  /** NOVA doré (0,1 % de chance, comme les images Thomson du bot) */
  function setGolden() {
    // Or brillant : un peu de lumière propre pour rester doré même la nuit
    mats.hullMat.color.set(0xffdc7a);
    mats.hullMat.metalness = 0.55;
    mats.hullMat.roughness = 0.28;
    mats.hullMat.emissive.set(0x6b4a0c);
    mats.hullMat.emissiveIntensity = 0.7;
    mats.pastelMat.color.set(0xffeaa8);
    mats.pastelMat.metalness = 0.5;
    mats.pastelMat.roughness = 0.3;
    mats.pastelMat.emissive.set(0x6b4a0c);
    mats.pastelMat.emissiveIntensity = 0.6;
  }

  /** NOVA en hologramme : silhouette bleutée transparente, lignes de
   * balayage et petit scintillement ; le visage reste allumé */
  const holoTime = { value: 0 };
  let holoMats = null;
  let hologram = false;
  function makeHoloMat(map) {
    return new THREE.ShaderMaterial({
      uniforms: { uTime: holoTime, uMap: { value: map || null }, uUseMap: { value: map ? 1 : 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      vertexShader: `
        varying vec3 vN;
        varying vec3 vView;
        varying float vY;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vY = wp.y;
          vec4 mv = viewMatrix * wp;
          vView = -mv.xyz;
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uMap;
        uniform float uUseMap;
        varying vec3 vN;
        varying vec3 vView;
        varying float vY;
        varying vec2 vUv;
        void main() {
          float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vView))), 2.0);
          float scan = 0.55 + 0.45 * sin(vY * 260.0 - uTime * 8.0);
          float band = smoothstep(0.0, 0.05, fract(vY * 3.0 - uTime * 0.6)) * 0.3 + 0.7;
          float flick = 0.9 + 0.1 * sin(uTime * 37.0) * sin(uTime * 11.0);
          vec3 col = vec3(0.25, 0.85, 1.2) * (0.12 + fres * 0.9) * scan * band * flick;
          if (uUseMap > 0.5) col += texture2D(uMap, vUv).rgb * vec3(0.7, 1.0, 1.1) * 0.9 * flick;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
  }
  function setHologram(on) {
    if (on === hologram) return;
    hologram = on;
    if (!holoMats) holoMats = { body: makeHoloMat(null), face: makeHoloMat(face.texture) };
    ship.traverse((o) => {
      if (!o.isMesh) return;
      if (on) {
        o.userData.realMat = o.material;
        o.material = o.material === mats.visorMat ? holoMats.face : holoMats.body;
      } else if (o.userData.realMat) {
        o.material = o.userData.realMat;
      }
    });
  }

  /** Expression temporaire : happy, angry, love, wow, surprised, sad */
  function setMood(name, seconds = 2.5) {
    moodName = name;
    moodUntil = performance.now() + seconds * 1000;
  }

  /** Il tourne sur lui-même (tournis) */
  function spin(seconds = 1.4) {
    spinUntil = performance.now() + seconds * 1000;
  }

  /** Il fait une sieste (yeux fermés, tête qui tombe) */
  function sleep(seconds = 15) {
    sleepUntil = performance.now() + seconds * 1000;
  }

  /** Air fatigué (tard la nuit) */
  function setSleepy(value) {
    sleepy = value;
  }

  /** Couronne dorée (« Big Boss ») */
  function setCrown() {
    if (crown) return;
    const gold = new THREE.MeshStandardMaterial({ color: 0xffc94d, metalness: 1, roughness: 0.25, emissive: 0x5a3a00, emissiveIntensity: 0.4 });
    crown = new THREE.Group();
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.12, 0.07, 24, 1, true), gold);
    band.material.side = THREE.DoubleSide;
    crown.add(band);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 8), gold);
      spike.position.set(Math.cos(a) * 0.125, 0.07, Math.sin(a) * 0.125);
      crown.add(spike);
      const gem = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 10, 8),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(i % 2 ? 2.4 : 0.4, 0.3, i % 2 ? 1.2 : 2.6), toneMapped: false })
      );
      gem.position.set(Math.cos(a) * 0.13, 0.115, Math.sin(a) * 0.13);
      crown.add(gem);
    }
    crown.position.set(0, 0.3, 0.02);
    crown.rotation.x = -0.15;
    rig.add(crown);
  }

  return {
    update, say, hide, resize, isHit, ship, setCollision,
    setGolden, spin, sleep, setSleepy, setCrown, setMood, setHologram,
    get hologram() {
      return hologram;
    },
    get sleeping() {
      return performance.now() < sleepUntil;
    }
  };
}
