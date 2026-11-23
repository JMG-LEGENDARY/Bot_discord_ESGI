import * as THREE from 'three';

export function createHoloPanel(tag, title, lines, accentColor = '#00f3ff', width = 9.2, height = 4.6) {
  const group = new THREE.Group();

  const cvs = document.createElement('canvas');
  cvs.width = 1024;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = 'rgba(4, 10, 22, 0.92)';
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

  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
  ctx.textAlign = 'right';
  ctx.fillText(tag, cvs.width - 46, 62);

  ctx.textAlign = 'left';
  ctx.font = 'bold 48px "Segoe UI", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title.toUpperCase(), 54, 114);

  ctx.fillStyle = accentColor;
  ctx.fillRect(54, 136, 190, 4);

  ctx.font = '32px "Segoe UI", sans-serif';
  ctx.fillStyle = '#eef8ff';
  lines.forEach((line, i) => {
    ctx.fillText(`▸ ${line}`, 56, 206 + i * 64);
  });

  const texture = new THREE.CanvasTexture(cvs);
  texture.colorSpace = THREE.SRGBColorSpace;

  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  );
  group.add(screenMesh);

  const hexColor = new THREE.Color(accentColor);
  const hdrNeonMat = new THREE.MeshBasicMaterial({
    color: hexColor.clone().multiplyScalar(2.2),
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

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(7.2, 4.5, 1.3, 8),
    new THREE.MeshStandardMaterial({ color: 0x131a29, metalness: 0.9, roughness: 0.25 })
  );
  group.add(base);

  const cyanHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.0, 2.2, 2.8), toneMapped: false });
  const pinkHdr = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.5, 0.1, 1.4), toneMapped: false });

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

  // Enseigne holographique haute lisibilité (sans laser parasite)
  const signCvs = document.createElement('canvas');
  signCvs.width = 1024;
  signCvs.height = 320;
  const ctx = signCvs.getContext('2d');

  // Cartouche sombre discret pour un contraste net face aux étoiles
  ctx.fillStyle = 'rgba(3, 8, 18, 0.72)';
  ctx.beginPath();
  ctx.roundRect(110, 24, 804, 260, 18);
  ctx.fill();

  ctx.strokeStyle = 'rgba(0, 243, 255, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = '900 132px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#00f3ff';
  ctx.shadowBlur = 14;
  ctx.fillText('ESGI BOT', 512, 162);

  ctx.font = '700 28px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.shadowBlur = 0;
  ctx.fillText('MEGASTRUCTURE // REIMS CYBERNETICS', 512, 232);

  const signTex = new THREE.CanvasTexture(signCvs);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(14.5, 4.5),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
  );
  signMesh.position.y = 3.5;
  group.add(signMesh);

  scene.add(group);

  function update(elapsed) {
    group.position.y = baseY + Math.sin(elapsed * 2) * 0.35;
    ring1.rotation.z = elapsed * 0.45;
    ring2.rotation.z = -elapsed * 0.7;
    ring3.rotation.y = elapsed * 0.35;
  }

  return { group, update };
}