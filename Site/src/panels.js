import * as THREE from 'three';

export function createHoloPanel(tag, title, lines, accentColor = '#22e4ff', width = 9.2, height = 4.6) {
  const group = new THREE.Group();

  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = 'rgba(8, 10, 28, 0.9)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < cvs.width; gx += 32) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, cvs.height);
    ctx.stroke();
  }
  for (let gy = 0; gy < cvs.height; gy += 8) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(cvs.width, gy);
    ctx.stroke();
  }

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, cvs.width - 36, cvs.height - 36);

  ctx.lineWidth = 10;
  const cLen = 46;
  ctx.beginPath();
  ctx.moveTo(14, 14 + cLen);
  ctx.lineTo(14, 14);
  ctx.lineTo(14 + cLen, 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cvs.width - 14 - cLen, 14);
  ctx.lineTo(cvs.width - 14, 14);
  ctx.lineTo(cvs.width - 14, 14 + cLen);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(14, cvs.height - 14 - cLen);
  ctx.lineTo(14, cvs.height - 14);
  ctx.lineTo(14 + cLen, cvs.height - 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cvs.width - 14 - cLen, cvs.height - 14);
  ctx.lineTo(cvs.width - 14, cvs.height - 14);
  ctx.lineTo(cvs.width - 14, cvs.height - 14 - cLen);
  ctx.stroke();

  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
  ctx.textAlign = 'right';
  ctx.fillText(tag, cvs.width - 46, 62);

  ctx.textAlign = 'left';
  ctx.font = 'bold 48px "Space Grotesk", "Segoe UI", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title.toUpperCase(), 54, 114);

  ctx.fillStyle = accentColor;
  ctx.fillRect(54, 136, 190, 4);

  ctx.font = '32px "Space Grotesk", "Segoe UI", sans-serif';
  ctx.fillStyle = '#eef8ff';
  lines.forEach((line, i) => {
    ctx.fillText(`▸ ${line}`, 56, 206 + i * 62);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(54, 408, cvs.width - 108, 54);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 408, cvs.width - 108, 54);

  ctx.font = 'bold 23px "JetBrains Mono", monospace';
  ctx.fillStyle = accentColor;
  ctx.textAlign = 'center';
  ctx.fillText('[ APPUYEZ SUR ENTRÉE OU CLIQUEZ POUR EXPLORER LE DOSSIER ↗ ]', cvs.width / 2, 443);

  const texture = new THREE.CanvasTexture(cvs);
  texture.colorSpace = THREE.SRGBColorSpace;

  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  );
  group.add(screenMesh);
  group.screenMesh = screenMesh;

  const hexColor = new THREE.Color(accentColor);
  const hdrNeonMat = new THREE.MeshBasicMaterial({
    color: hexColor.clone().multiplyScalar(2.0),
    toneMapped: false
  });
  const barGeo = new THREE.BoxGeometry(width * 0.85, 0.06, 0.08);
  const topBar = new THREE.Mesh(barGeo, hdrNeonMat);
  topBar.position.y = height / 2 + 0.14;
  const botBar = new THREE.Mesh(barGeo, hdrNeonMat);
  botBar.position.y = -height / 2 - 0.14;
  group.add(topBar, botBar);

  return group;
}

export function buildSkyPlatform(scene, topY) {
  const group = new THREE.Group();
  const baseY = topY + 7.5;
  group.position.set(0, baseY, 0);

  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x131a29,
    metalness: 0.65,
    roughness: 0.35,
    envMapIntensity: 0.35
  });
  const solarMat = new THREE.MeshStandardMaterial({
    color: 0x0c4a6e,
    emissive: 0x0284c7,
    emissiveIntensity: 0.2,
    metalness: 0.6,
    roughness: 0.3,
    envMapIntensity: 0.35
  });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 4.5, 1.3, 8), darkSteelMat);
  group.add(base);

  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 1.5, 1.9), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.7, 0.12, 1.0), toneMapped: false });

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(7.6, 0.08, 16, 64), cyanHdr);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.06, 16, 64), pinkHdr);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -1.2;
  group.add(ring2);

  const ring3 = new THREE.Mesh(new THREE.TorusGeometry(9.4, 0.05, 12, 64), cyanHdr);
  ring3.rotation.x = Math.PI / 2.3;
  group.add(ring3);

  // Panneau ESGI BOT haute définition & contraste renforcé
  const signCvs = document.createElement('canvas');
  signCvs.width = 1280;
  signCvs.height = 384;
  const ctx = signCvs.getContext('2d');

  ctx.fillStyle = 'rgba(2, 7, 18, 0.88)';
  ctx.beginPath();
  ctx.roundRect(70, 24, 1140, 336, 22);
  ctx.fill();

  ctx.strokeStyle = '#22e4ff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Coins techniques
  ctx.strokeStyle = '#ff3dbb';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(96, 84);
  ctx.lineTo(96, 48);
  ctx.lineTo(148, 48);
  ctx.moveTo(1184, 300);
  ctx.lineTo(1184, 336);
  ctx.lineTo(1132, 336);
  ctx.stroke();

  ctx.font = '900 168px "Space Grotesk", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('ESGI BOT', 640, 206);

  ctx.fillStyle = '#22e4ff';
  ctx.fillRect(360, 234, 560, 4);

  ctx.font = '700 32px "JetBrains Mono", monospace';
  ctx.fillStyle = '#a9b3d6';
  ctx.fillText('MEGASTRUCTURE // REIMS CYBERNETICS', 640, 294);

  const signTex = new THREE.CanvasTexture(signCvs);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(15.6, 4.68),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
  );
  // Situé à baseY + 3.5 = 141.0m (strictement au niveau des yeux de la caméra)
  signMesh.position.y = 3.5;
  group.add(signMesh);

  scene.add(group);

  const satellites = [];
  for (let s = 0; s < 3; s++) {
    const sat = new THREE.Group();
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.8, 8), darkSteelMat);
    core.rotation.z = Math.PI / 2;
    const panelL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.9), solarMat);
    panelL.position.x = -2.0;
    const panelR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.9), solarMat);
    panelR.position.x = 2.0;
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), s === 0 ? pinkHdr : cyanHdr);
    beacon.position.y = 0.55;

    sat.add(core, panelL, panelR, beacon);
    scene.add(sat);
    satellites.push({
      mesh: sat,
      angle: (s / 3) * Math.PI * 2,
      radius: 26 + s * 6,
      yOffset: 11 + s * 3.5,
      speed: 0.16 - s * 0.02
    });
  }

  function update(elapsed) {
    group.position.y = baseY + Math.sin(elapsed * 1.8) * 0.16;
    ring1.rotation.z = elapsed * 0.45;
    ring2.rotation.z = -elapsed * 0.7;
    ring3.rotation.y = elapsed * 0.35;

    satellites.forEach((sat) => {
      const a = sat.angle + elapsed * sat.speed;
      sat.mesh.position.set(
        Math.cos(a) * sat.radius,
        baseY + sat.yOffset,
        Math.sin(a) * sat.radius
      );
      sat.mesh.rotation.y = -a;
    });
  }

  return { group, update };
}