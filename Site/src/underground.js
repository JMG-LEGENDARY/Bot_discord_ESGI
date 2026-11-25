import * as THREE from 'three';
import { mergeStaticMeshes } from './merge-static.js';
import { createHoloPanel } from './panels.js';

function createUndergroundDeckTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 1024;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = '#0c1322';
  ctx.fillRect(0, 0, 1024, 1024);

  const tile = 128;
  for (let x = 0; x < 1024; x += tile) {
    for (let y = 0; y < 1024; y += tile) {
      ctx.fillStyle = (x + y) % 256 === 0 ? '#111a2e' : '#0e1628';
      ctx.fillRect(x + 3, y + 3, tile - 6, tile - 6);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 3, y + 3, tile - 6, tile - 6);

      ctx.fillStyle = '#334155';
      ctx.fillRect(x + 10, y + 10, 4, 4);
      ctx.fillRect(x + tile - 14, y + 10, 4, 4);
      ctx.fillRect(x + 10, y + tile - 14, 4, 4);
      ctx.fillRect(x + tile - 14, y + tile - 14, 4, 4);
    }
  }

  ctx.strokeStyle = 'rgba(0, 243, 255, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 256);
  ctx.lineTo(1024, 256);
  ctx.moveTo(0, 768);
  ctx.lineTo(1024, 768);
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 1024);
  ctx.moveTo(768, 0);
  ctx.lineTo(768, 1024);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCircuitWallTexture() {
  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 1024;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = '#080e1a';
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = '#17233b';
  ctx.lineWidth = 4;
  for (let y = 0; y < 1024; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }
  for (let x = 0; x < 1024; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(0, 243, 255, 0.45)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 24; i++) {
    let cx = Math.floor(Math.random() * 8) * 128;
    let cy = Math.floor(Math.random() * 16) * 64;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    cx += 128;
    ctx.lineTo(cx, cy);
    cy += 64;
    ctx.lineTo(cx, cy);
    cx += 128;
    ctx.lineTo(cx, cy);
    ctx.stroke();

    ctx.fillStyle = i % 3 === 0 ? '#ff3dbb' : '#22e4ff';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Plaques d'acier : joints horizontaux et verticaux, rivets, usure,
// bande de sécurité en bas. Sert de couleur, de rugosité et de relief.
function createPillarPanelTexture() {
  const w = 256;
  const h = 1024;
  const cvs = document.createElement('canvas');
  cvs.width = w;
  cvs.height = h;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#4a5068';
  ctx.fillRect(0, 0, w, h);

  // Plaques de teintes légèrement différentes
  for (let y = 0; y < h; y += 128) {
    for (let x = 0; x < w; x += 64) {
      const v = 64 + Math.floor(Math.random() * 22);
      ctx.fillStyle = `rgb(${v}, ${v + 4}, ${v + 18})`;
      ctx.fillRect(x + 2, y + 2, 60, 124);
      // Rivets aux coins
      ctx.fillStyle = '#9aa2b8';
      [[8, 8], [54, 8], [8, 118], [54, 118]].forEach(([rx, ry]) => {
        ctx.beginPath();
        ctx.arc(x + rx, y + ry, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }
  // Joints sombres
  ctx.fillStyle = '#12141c';
  for (let y = 0; y < h; y += 128) ctx.fillRect(0, y, w, 3);
  for (let x = 0; x < w; x += 64) ctx.fillRect(x, 0, 3, h);
  // Traces d'usure
  for (let i = 0; i < 260; i++) {
    ctx.fillStyle = `rgba(20, 22, 30, ${0.15 + Math.random() * 0.25})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 3, 4 + Math.random() * 20);
  }
  // Bande de sécurité jaune et noire à la base
  for (let x = -40; x < w + 40; x += 28) {
    ctx.fillStyle = '#c99a1a';
    ctx.beginPath();
    ctx.moveTo(x, h - 50);
    ctx.lineTo(x + 14, h - 50);
    ctx.lineTo(x + 34, h - 4);
    ctx.lineTo(x + 20, h - 4);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Masque des fentes lumineuses (blanc = lumière) : 4 bandes verticales
// interrompues à chaque joint de plaque.
function createPillarLightSlitTexture() {
  const w = 256;
  const h = 1024;
  const cvs = document.createElement('canvas');
  cvs.width = w;
  cvs.height = h;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  for (let k = 0; k < 4; k++) {
    const x = (k + 0.5) * (w / 4) - 3;
    for (let y = 0; y < h - 64; y += 128) {
      const g = ctx.createLinearGradient(x - 6, 0, x + 12, 0);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, 'rgba(255,255,255,1)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - 6, y + 14, 18, 100);
    }
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.anisotropy = 8;
  return tex;
}

export function buildUndergroundMasterclass(scene) {
  const underGroup = new THREE.Group();
  const floorY = -48;
  const ceilY = -18;

  const deckTex = createUndergroundDeckTexture();
  const wallCircuitTex = createCircuitWallTexture();

  const floorDeckMat = new THREE.MeshStandardMaterial({
    map: deckTex,
    bumpMap: deckTex,
    bumpScale: 0.08,
    metalness: 0.75,
    roughness: 0.35
  });

  const circuitWallMat = new THREE.MeshStandardMaterial({
    map: wallCircuitTex,
    emissiveMap: wallCircuitTex,
    emissive: new THREE.Color(0x38bdf8),
    emissiveIntensity: 0.41,
    metalness: 0.7,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x161f30,
    metalness: 0.88,
    roughness: 0.25
  });

  // Néons bleus adoucis (ils dominaient tout le sous-sol)
  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 1.75, 2.1), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 0.1, 1.5), toneMapped: false });

  // Puits blindé vertical (y = 0 jusqu'à ceilY = -18)
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 18, 22, 16, 1, true),
    circuitWallMat
  );
  shaft.position.set(0, -10, 4);
  underGroup.add(shaft);

  for (let sy = -2; sy >= -18; sy -= 4) {
    const sRing = new THREE.Mesh(
      new THREE.TorusGeometry(17.6, 0.12, 8, 24),
      sy % 8 === 0 ? pinkHdr : cyanHdr
    );
    sRing.rotation.x = Math.PI / 2;
    sRing.position.set(0, sy, 4);
    underGroup.add(sRing);
  }

  // Sol, plafond et parois closes texturées
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 120), floorDeckMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, floorY, -4);
  underGroup.add(floor);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(100, 120), circuitWallMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, ceilY, -4);
  underGroup.add(ceiling);

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(100, 34, 2), circuitWallMat);
  backWall.position.set(0, floorY + 16, -34);
  underGroup.add(backWall);

  [-31, 31].forEach((wx) => {
    const sideWall = new THREE.Mesh(new THREE.BoxGeometry(2, 34, 120), circuitWallMat);
    sideWall.position.set(wx, floorY + 16, -4);
    underGroup.add(sideWall);
  });

  // Arches structurelles & néons
  for (let zArch = -28; zArch <= 28; zArch += 9) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(28, 0.8, 10, 32, Math.PI), darkSteelMat);
    arch.position.set(0, floorY + 2, zArch);
    underGroup.add(arch);

    const archNeon = new THREE.Mesh(
      new THREE.TorusGeometry(27.0, 0.07, 8, 32, Math.PI),
      zArch % 18 === 0 ? pinkHdr : cyanHdr
    );
    archNeon.position.set(0, floorY + 2, zArch);
    underGroup.add(archNeon);
  }

  // Racks serveurs, passerelles & collecteurs
  [-26.5, 26.5].forEach((rx) => {
    for (let rz = -24; rz <= 18; rz += 7) {
      const rack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 9.5, 4.2), darkSteelMat);
      rack.position.set(rx, floorY + 4.8, rz);
      underGroup.add(rack);

      const ledStrip = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 8.2, 0.16),
        rz % 14 === 0 ? pinkHdr : cyanHdr
      );
      ledStrip.position.set(rx > 0 ? rx - 1.25 : rx + 1.25, floorY + 4.8, rz + 1.4);
      underGroup.add(ledStrip);
    }

    const catwalk = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.4, 96), darkSteelMat);
    catwalk.position.set(rx > 0 ? 24 : -24, floorY + 11.5, -4);
    underGroup.add(catwalk);

    [14.5, 17.5].forEach((py, pIdx) => {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 96, 16), darkSteelMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(rx > 0 ? 25.5 : -25.5, floorY + py, -4);
      underGroup.add(pipe);

      for (let kz = -26; kz <= 22; kz += 14) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.95, 0.06, 8, 24),
          pIdx === 0 ? pinkHdr : cyanHdr
        );
        ring.position.set(pipe.position.x, pipe.position.y, kz);
        underGroup.add(ring);
      }
    });
  });

  // Réacteur géométrique central suspendu
  const coreGroup = new THREE.Group();
  coreGroup.position.set(0, floorY + 15.5, -3.5);

  const coreCrystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(2.1, 0),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.1, 2.7, 3.0),
      wireframe: true,
      toneMapped: false
    })
  );
  const coreInner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), pinkHdr);
  const gimbal1 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.08, 10, 48), cyanHdr);
  const gimbal2 = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.07, 10, 48), pinkHdr);
  gimbal2.rotation.x = Math.PI / 3;

  const coreBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 29, 12, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    })
  );
  coreBeam.position.y = -1.0;

  coreGroup.add(coreCrystal, coreInner, gimbal1, gimbal2, coreBeam);
  coreGroup.userData.dynamic = true; // réacteur animé
  underGroup.add(coreGroup);

  // Canal central d'eau réfléchissante
  const canalWater = new THREE.Mesh(
    new THREE.PlaneGeometry(8.5, 98),
    new THREE.MeshStandardMaterial({
      color: 0x041322,
      emissive: 0x003344,
      emissiveIntensity: 0.65,
      metalness: 0.95,
      roughness: 0.08
    })
  );
  canalWater.rotation.x = -Math.PI / 2;
  canalWater.position.set(0, floorY + 0.06, -4);
  underGroup.add(canalWater);

  [-4.4, 4.4].forEach((cx) => {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 98), darkSteelMat);
    curb.position.set(cx, floorY + 0.22, -4);
    underGroup.add(curb);

    const curbNeon = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 98), cyanHdr);
    curbNeon.position.set(cx > 0 ? cx - 0.22 : cx + 0.22, floorY + 0.46, -4);
    underGroup.add(curbNeon);
  });

  const waterPulse = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 18),
    new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide
    })
  );
  waterPulse.rotation.x = -Math.PI / 2;
  waterPulse.position.set(0, floorY + 0.09, -15);
  waterPulse.userData.dynamic = true; // vague qui glisse sur l'eau
  underGroup.add(waterPulse);

  // Turbines du mur du fond
  const turbines = [];
  [-14, 14].forEach((tx, tIdx) => {
    const frame = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.35, 10, 24), darkSteelMat);
    frame.position.set(tx, floorY + 13.5, -32.6);
    underGroup.add(frame);

    const rotor = new THREE.Group();
    rotor.position.set(tx, floorY + 13.5, -32.4);
    for (let b = 0; b < 6; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.0, 0.12), darkSteelMat);
      blade.rotation.z = (b / 6) * Math.PI * 2;
      rotor.add(blade);
    }
    rotor.userData.dynamic = true; // pales qui tournent
    underGroup.add(rotor);
    turbines.push({ mesh: rotor, dir: tIdx === 0 ? 1 : -1 });
  });

  const mainUnderLight = new THREE.PointLight(0x38bdf8, 33, 80);
  mainUnderLight.position.set(0, floorY + 16, 12);
  underGroup.add(mainUnderLight);

  const rearUnderLight = new THREE.PointLight(0xff007f, 34, 75);
  rearUnderLight.position.set(0, floorY + 14, -18);
  underGroup.add(rearUnderLight);

  // 5 Piliers en triangle avec étiquettes de face
  const pillarsData = [
    {
      id: 0,
      label: 'pillar-0',
      name: 'BRYAN (JMG)',
      role: 'Développeur Principal — Bot & Site 3D',
      tag: 'COLLAB 01 // DÉVELOPPEUR',
      color: '#22e4ff',
      pos: new THREE.Vector3(0, floorY, 7.0),
      camPos: new THREE.Vector3(0, floorY + 5.2, 16.5)
    },
    {
      id: 1,
      label: 'pillar-1',
      name: 'YANIS',
      role: 'Secrétaire, Suivi & Renfort Code',
      tag: 'COLLAB 02 // SECRÉTARIAT',
      color: '#ff3dbb',
      pos: new THREE.Vector3(-8.5, floorY, -2.5),
      camPos: new THREE.Vector3(-14.5, floorY + 5.2, 6.2)
    },
    {
      id: 2,
      label: 'pillar-2',
      name: 'ESGI REIMS',
      role: 'Campus & Cadre Académique',
      tag: 'COLLAB 03 // ÉCOLE',
      color: '#8b5cf6',
      pos: new THREE.Vector3(-15.5, floorY, -12.5),
      camPos: new THREE.Vector3(-19.5, floorY + 5.2, -2.2)
    },
    {
      id: 3,
      label: 'pillar-3',
      name: 'GEMINI & CLAUDE',
      role: 'Assistants IA — 3D, Code & Contenu',
      tag: 'COLLAB 04 // ASSISTANTS IA',
      color: '#22e4ff',
      pos: new THREE.Vector3(15.5, floorY, -12.5),
      camPos: new THREE.Vector3(19.5, floorY + 5.2, -2.2)
    },
    {
      id: 4,
      label: 'pillar-4',
      name: 'REMERCIEMENTS',
      role: 'T. Pierson, Grégoire, Équipe & Élèves',
      tag: 'COLLAB 05 // COMMUNAUTÉ',
      color: '#ff3dbb',
      pos: new THREE.Vector3(8.5, floorY, -2.5),
      camPos: new THREE.Vector3(14.5, floorY + 5.2, 6.2)
    }
  ];

  const triPoints = [
    new THREE.Vector3(0, floorY + 0.14, 7.0),
    new THREE.Vector3(-15.5, floorY + 0.14, -12.5),
    new THREE.Vector3(15.5, floorY + 0.14, -12.5),
    new THREE.Vector3(0, floorY + 0.14, 7.0)
  ];
  underGroup.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(triPoints),
      new THREE.LineBasicMaterial({ color: 0x00f3ff })
    )
  );

  const interactivePillarObjects = [];
  const pillarAnimItems = [];

  const pillarPanelTex = createPillarPanelTexture();
  const pillarSlitTex = createPillarLightSlitTexture();
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x9aa0b4,
    map: pillarPanelTex,
    roughnessMap: pillarPanelTex,
    bumpMap: pillarPanelTex,
    bumpScale: 0.04,
    metalness: 0.8,
    roughness: 0.55,
    envMapIntensity: 1.0
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c6d4,
    metalness: 1.0,
    roughness: 0.16,
    envMapIntensity: 1.3
  });

  pillarsData.forEach((p) => {
    const pGroup = new THREE.Group();
    // Colonne propre à chaque pilier : mêmes plaques, fentes de sa couleur
    const columnMat = pedestalMat.clone();
    columnMat.emissiveMap = pillarSlitTex;
    columnMat.emissive = new THREE.Color(p.color);
    const isCyan = p.color === '#22e4ff';
    columnMat.emissiveIntensity = isCyan ? 1.15 : 1.8;
    pGroup.position.copy(p.pos);

    const ringMat = isCyan ? cyanHdr : pinkHdr;

    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.5, 1.8, 24), pedestalMat);
    pedestal.position.y = 0.9;
    pGroup.add(pedestal);

    const column = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.55, 30, 32), columnMat);
    column.position.y = 15;
    pGroup.add(column);

    for (let k = 0; k < 4; k++) {
      const ka = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 29, 12), chromeMat);
      piston.position.set(Math.cos(ka) * 1.65, 14.5, Math.sin(ka) * 1.65);
      pGroup.add(piston);
    }

    const ringLower = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.07, 12, 32), ringMat);
    ringLower.rotation.x = Math.PI / 2;
    ringLower.position.y = 2.4;
    ringLower.userData.dynamic = true;
    pGroup.add(ringLower);

    const ringUpper = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.07, 12, 32), ringMat);
    ringUpper.rotation.x = Math.PI / 2;
    ringUpper.position.y = 8.2;
    ringUpper.userData.dynamic = true;
    pGroup.add(ringUpper);

    const topAnchor = new THREE.Vector3(p.pos.x, floorY + 21, p.pos.z);
    const coreAnchor = new THREE.Vector3(0, floorY + 15.5, -3.5);
    const beamDist = topAnchor.distanceTo(coreAnchor);
    const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, beamDist, 6), ringMat);
    conduit.position.copy(topAnchor).lerp(coreAnchor, 0.5);
    conduit.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      coreAnchor.clone().sub(topAnchor).normalize()
    );
    underGroup.add(conduit);

    const dx = p.camPos.x - p.pos.x;
    const dz = p.camPos.z - p.pos.z;
    const horizLen = Math.hypot(dx, dz) || 1;
    const yawAngle = Math.atan2(dx, dz);

    const plaque = createHoloPanel(
      p.tag,
      p.name,
      [p.role, 'Cliquer ou scroller pour explorer'],
      p.color,
      5.4,
      2.7
    );
    plaque.position.set((dx / horizLen) * 2.05, 5.2, (dz / horizLen) * 2.05);
    plaque.rotation.set(0, yawAngle, 0);
    plaque.userData.dynamic = true; // panneau cliquable
    pGroup.add(plaque);

    const hitBox = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 14, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.y = 7;
    hitBox.userData = { label: p.label };
    hitBox.userData.dynamic = true;
    pGroup.add(hitBox);
    interactivePillarObjects.push(hitBox);

    plaque.traverse((child) => {
      if (child.isMesh) {
        child.userData = { label: p.label };
        interactivePillarObjects.push(child);
      }
    });

    pillarAnimItems.push({ ringLower, ringUpper, offset: p.id * 1.3 });
    underGroup.add(pGroup);
  });

  scene.add(underGroup);
  // Murs, sols, racks, tuyaux, colonnes... fusionnés par matériau
  mergeStaticMeshes(underGroup);

  function update(delta, elapsed) {
    pillarAnimItems.forEach((item) => {
      item.ringLower.position.y = 2.4 + Math.sin(elapsed * 2.2 + item.offset) * 0.35;
      item.ringUpper.position.y = 8.2 - Math.sin(elapsed * 2.2 + item.offset) * 0.35;
    });
    turbines.forEach((t) => {
      t.mesh.rotation.z += delta * 1.4 * t.dir;
    });
    coreCrystal.rotation.y = elapsed * 0.9;
    coreCrystal.rotation.x = elapsed * 0.5;
    coreInner.rotation.y = -elapsed * 1.3;
    gimbal1.rotation.z = elapsed * 0.7;
    gimbal2.rotation.y = -elapsed * 0.6;
    waterPulse.position.z = -35 + ((elapsed * 15) % 72);
  }

  return { group: underGroup, floorY, pillarsData, interactivePillarObjects, update };
}