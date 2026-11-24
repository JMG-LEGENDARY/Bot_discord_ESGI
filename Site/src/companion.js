import * as THREE from 'three';
import { GLOW } from './glows.js';

// =========================================================================
// NOVA — le petit vaisseau compagnon qui suit le visiteur
// - suit la caméra avec un léger retard (ressort amorti, comme un vrai drone)
// - pendant le défilement : tracé scripté qui ondule selon la position dans la page
// - après 10 s sans bouger : se balade devant l'écran en faisant des boucles
// - parle dans une bulle de BD (messages envoyés par main.js)
// =========================================================================

// Revêtement « jouet » : plastique blanc nacré, joints très discrets, bandes pastel
function createHullTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 512;
  cvs.height = 256;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#f4f6fb';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(150, 160, 190, 0.35)';
  ctx.lineWidth = 1.2;
  for (let x = 0; x < 512; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  // Bandes pastel autour de l'arrière du corps
  ctx.fillStyle = '#8fe6f7';
  ctx.fillRect(0, 168, 512, 10);
  ctx.fillStyle = '#ffa6d8';
  ctx.fillRect(0, 182, 512, 5);
  // Petits points décoratifs
  ctx.fillStyle = '#ffa6d8';
  for (let x = 32; x < 512; x += 128) {
    ctx.beginPath();
    ctx.arc(x, 140, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Forme plate extrudée (ailes, dérives), dessinée dans le plan XY puis couchée
function flatPart(points, thickness) {
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: thickness * 0.35,
    bevelSize: thickness * 0.35,
    bevelSegments: 2
  });
  geo.translate(0, 0, -thickness / 2);
  return geo;
}

function buildShip() {
  const ship = new THREE.Group();
  const hullTex = createHullTexture();

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: hullTex,
    metalness: 0.08,
    roughness: 0.42,
    envMapIntensity: 1.0
  });
  const pastelMat = new THREE.MeshStandardMaterial({
    color: 0x9fe8f6,
    metalness: 0.05,
    roughness: 0.45,
    envMapIntensity: 0.9
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xffa6d8,
    metalness: 0.05,
    roughness: 0.45,
    envMapIntensity: 0.9
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x5a5f7a,
    metalness: 0.3,
    roughness: 0.4,
    envMapIntensity: 1.0
  });
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x050b16,
    emissive: 0x08304a,
    emissiveIntensity: 0.5,
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 1.8
  });
  const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 2.5, 3.2), toneMapped: false });
  const cheekMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.6, 0.35, 0.9),
    transparent: true,
    opacity: 0.55,
    toneMapped: false
  });
  const engineGlowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 2.6, 3.4), toneMapped: false });
  const antennaBallMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 0.4, 1.8), toneMapped: false });

  // Corps rond et dodu (tour d'un profil), avant vers +z
  const profile = [
    [0.0, -0.32], [0.12, -0.3], [0.2, -0.22], [0.245, -0.08], [0.255, 0.05],
    [0.24, 0.2], [0.2, 0.28], [0.12, 0.31], [0.0, 0.315]
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const bodyGeo = new THREE.LatheGeometry(profile, 48);
  bodyGeo.rotateX(Math.PI / 2);
  bodyGeo.scale(1.1, 1.0, 1);
  ship.add(new THREE.Mesh(bodyGeo, hullMat));

  // Grande visière vitrée à l'avant : c'est le « visage »
  const visorGeo = new THREE.SphereGeometry(0.19, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
  visorGeo.rotateX(Math.PI / 2);
  visorGeo.scale(1.15, 0.9, 0.85);
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.03, 0.29);
  ship.add(visor);

  // Deux yeux lumineux (ovales) + joues roses
  const eyes = [];
  [-1, 1].forEach((side) => {
    const eye = new THREE.Mesh(new THREE.CircleGeometry(0.034, 24), eyeMat);
    eye.scale.set(1, 1.35, 1);
    eye.position.set(side * 0.07, 0.07, 0.442);
    eye.rotation.y = side * 0.28;
    eye.rotation.x = -0.15;
    ship.add(eye);
    eyes.push(eye);

    const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.022, 16), cheekMat);
    cheek.scale.set(1.5, 0.8, 1);
    cheek.position.set(side * 0.135, 0.0, 0.42);
    cheek.rotation.y = side * 0.55;
    ship.add(cheek);
  });

  // Deux petites ailettes arrondies qui battent (pivot à la base)
  const wings = [];
  [-1, 1].forEach((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.22, 0.02, -0.06);
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.1, 28, 18), pastelMat);
    wing.scale.set(1.6, 0.3, 1.0);
    wing.position.set(side * 0.13, 0, 0);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 12), pinkMat);
    tip.position.set(side * 0.27, 0, 0);
    pivot.add(wing, tip);
    pivot.userData.side = side;
    ship.add(pivot);
    wings.push(pivot);
  });

  // Antenne avec un petit cœur lumineux au bout
  const antenna = new THREE.Group();
  antenna.position.set(0, 0.235, 0.0);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.14, 8), darkMat);
  stem.position.y = 0.07;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, -0.03);
  heartShape.bezierCurveTo(-0.045, 0.0, -0.035, 0.035, 0, 0.018);
  heartShape.bezierCurveTo(0.035, 0.035, 0.045, 0.0, 0, -0.03);
  const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.014,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 3,
    curveSegments: 16
  });
  heartGeo.center();
  const heart = new THREE.Mesh(heartGeo, antennaBallMat);
  heart.scale.setScalar(1.3);
  heart.position.y = 0.17;
  antenna.add(stem, heart);
  ship.add(antenna);

  // Deux petits réacteurs ronds, nichés à l'arrière
  const nozzles = [];
  [-1, 1].forEach((side) => {
    const pod = new THREE.Mesh(new THREE.SphereGeometry(0.062, 24, 16), darkMat);
    pod.scale.set(1, 1, 1.2);
    pod.position.set(side * 0.11, -0.07, -0.28);
    ship.add(pod);

    const core = new THREE.Mesh(new THREE.CircleGeometry(0.042, 20), engineGlowMat);
    core.rotation.y = Math.PI;
    core.position.set(side * 0.11, -0.07, -0.356);
    ship.add(core);
    nozzles.push(new THREE.Vector3(side * 0.11, -0.07, -0.38));
  });

  // Toutes les pièces dans un « rig » : il peut rebondir et s'étirer sans déplacer le vaisseau
  const rig = new THREE.Group();
  while (ship.children.length) rig.add(ship.children[0]);
  ship.add(rig);

  return { ship, nozzles, eyes, antenna, wings, heart, rig };
}

export function createCompanion(scene, camera, glows) {
  const { ship, nozzles, eyes, antenna, wings, heart, rig } = buildShip();
  ship.scale.setScalar(1.05);
  scene.add(ship);

  // Feux : réacteurs (avec scintillement), navigation rouge/vert, flash, phare
  if (glows) {
    nozzles.forEach((n) => {
      glows.add(ship, n, GLOW.engineCyan, 0.38);
      glows.add(ship, n, [0.6, 1.6, 2.2], 0.22, { speed: 9, phase: n.x, duty: 0.6 });
    });
    glows.add(ship, new THREE.Vector3(-0.49, 0.03, -0.06), GLOW.navRed, 0.07);
    glows.add(ship, new THREE.Vector3(0.49, 0.03, -0.06), GLOW.navGreen, 0.07);
    glows.add(ship, new THREE.Vector3(0, 0.405, 0), [2.4, 0.4, 1.6], 0.16, { speed: 0.7, phase: 0.3, duty: 0.5 });
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
    uniforms: { uScale: { value: window.innerHeight } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    vertexShader: `
      attribute float age;
      uniform float uScale;
      varying float vAge;
      void main() {
        vAge = age;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp((0.09 * (1.0 - age) + 0.02) * uScale / -mv.z, 0.0, 64.0);
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
  function placeBubble() {
    if (!bubble || !bubbleVisible) return;
    screenPos.copy(pos).project(camera);
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
    // La bulle se place au-dessus du vaisseau, la pointe dirigée vers lui
    let left = sx - bw * 0.75;
    let top = sy - bh - 34;
    left = Math.min(Math.max(left, 12), w - bw - 12);
    top = Math.min(Math.max(top, 64), h - bh - 12);
    bubble.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    // La pointe de la bulle suit le vaisseau horizontalement
    const tail = Math.min(Math.max(sx - left, 18), bw - 18);
    bubble.style.setProperty('--tail-x', `${Math.round(tail)}px`);
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
    const baseZ = portrait ? -5.6 : -5.2;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * -baseZ;
    const halfW = halfH * camera.aspect;
    const baseX = halfW * (portrait ? 0.55 : 0.74);
    const baseY = -halfH * (portrait ? 0.5 : 0.6);
    local.set(
      baseX + Math.sin(p * 41) * halfW * 0.08,
      baseY + Math.sin(p * 27 + 1.2) * halfH * 0.07 + Math.sin(elapsed * 1.4) * 0.05,
      baseZ + Math.cos(p * 33) * 0.35
    );
    // En descente il plonge un peu en avant, en montée il passe au-dessus
    local.y += THREE.MathUtils.clamp(-info.verticalSpeed * 0.01, -0.3, 0.25);

    // 2) Après 10 s d'inactivité : balade en boucles devant l'écran
    const wanderMix = THREE.MathUtils.smoothstep(info.idle, 10, 12.5);
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
    if (pos.distanceTo(target) > 25) pos.copy(target); // téléportation de secours

    // 4) Orientation : il regarde le visiteur de trois quarts (on voit son visage),
    // et se tourne dans le sens de sa balade quand il bouge devant l'écran.
    camera.getWorldDirection(camForward);
    camRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    if (hasPrevLocal) localVel.copy(local).sub(prevLocal).divideScalar(Math.max(delta, 1e-3));
    prevLocal.copy(local);
    hasPrevLocal = true;
    const localSpeed = localVel.length();
    forward.copy(camForward).multiplyScalar(-1).addScaledVector(camRight, info.portrait ? -0.25 : -0.45);
    if (localSpeed > 0.15) {
      const travel = localVel.clone().applyQuaternion(camera.quaternion).normalize();
      forward.addScaledVector(travel, Math.min(localSpeed, 2) * 0.9);
    }
    forward.normalize();

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

    ship.position.copy(pos);
    ship.quaternion.slerp(targetQuat, 1 - Math.exp(-delta * 7));

    // Clignement des yeux toutes les 2 à 5 s ; yeux plissés (sourire) quand il parle
    blinkTimer -= delta;
    if (blinkTimer <= 0) {
      blinkT = 0;
      blinkTimer = 2 + Math.random() * 3;
    }
    blinkT = Math.min(1, blinkT + delta * 7);
    const blink = 1 - Math.sin(blinkT * Math.PI) * 0.9;
    const eyeHeight = (talking ? 0.55 : 1.35) * blink;
    eyes.forEach((eye) => {
      eye.scale.y = THREE.MathUtils.lerp(eye.scale.y, eyeHeight, 1 - Math.exp(-delta * 18));
    });
    antenna.rotation.z = Math.sin(elapsed * 2.3) * 0.18 - roll * 0.5;
    antenna.rotation.x = Math.sin(elapsed * 1.7) * 0.1;

    // Ailettes qui battent (plus vite quand il se déplace)
    flapPhase += delta * (5 + Math.min(localSpeed, 3) * 4);
    wings.forEach((w) => {
      w.rotation.z = w.userData.side * (0.35 + Math.sin(flapPhase) * 0.28);
    });
    heart.rotation.y += delta * 1.6;
    // Petit rebond permanent + s'étire un peu dans le sens de la vitesse
    rig.position.y = Math.sin(elapsed * 2.4) * 0.025;
    const stretch = THREE.MathUtils.clamp(localSpeed * 0.04, 0, 0.14);
    const sq = THREE.MathUtils.lerp(rig.scale.z, 1 + stretch, 1 - Math.exp(-delta * 6));
    rig.scale.set(1 - (sq - 1) * 0.5, 1 - (sq - 1) * 0.5, sq);

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
    hitSphere.center.copy(pos);
    hitSphere.radius = 0.75;
    return raycaster.ray.intersectsSphere(hitSphere);
  }

  return { update, say, hide, resize, isHit, ship };
}
