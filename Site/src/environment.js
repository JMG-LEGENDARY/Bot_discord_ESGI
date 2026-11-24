import * as THREE from 'three';

// =========================================================================
// CARTE DE REFLETS « NUIT »
// Le métal et le verre reflètent ce qui les entoure. On fabrique une fois,
// au démarrage, un petit décor de nuit (ciel indigo, lueur de la ville à
// l'horizon, quelques enseignes néon) que three.js convertit en reflets.
// =========================================================================
export function createNightEnvironment(renderer) {
  const envScene = new THREE.Scene();

  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 zenith = vec3(0.015, 0.02, 0.06);
        vec3 sky = vec3(0.05, 0.04, 0.13);
        vec3 cityGlow = vec3(0.35, 0.10, 0.32);
        vec3 ground = vec3(0.02, 0.02, 0.05);
        vec3 col = mix(sky, zenith, smoothstep(0.1, 0.8, h));
        // Lueur orangée-magenta des lumières de la ville juste au-dessus de l'horizon
        col += cityGlow * exp(-abs(h - 0.02) * 9.0);
        if (h < 0.0) col = mix(col, ground, smoothstep(0.0, -0.3, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  envScene.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyMat));

  // Lune : reflet net et froid sur les surfaces brillantes
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 16, 8),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 4.2, 5) })
  );
  moon.position.set(20, 34, 22);
  envScene.add(moon);

  // Enseignes néon autour : donnent des reflets colorés allongés
  const neonColors = [
    new THREE.Color(0.3, 3.0, 3.6),
    new THREE.Color(3.4, 0.4, 2.2),
    new THREE.Color(1.6, 0.8, 3.4)
  ];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(2 + (i % 3), 0.35 + (i % 2) * 0.5),
      new THREE.MeshBasicMaterial({ color: neonColors[i % 3], side: THREE.DoubleSide })
    );
    panel.position.set(Math.cos(a) * 40, 1 + (i % 4) * 2.5, Math.sin(a) * 40);
    panel.lookAt(0, panel.position.y, 0);
    envScene.add(panel);
  }

  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(envScene, 0.02).texture;
  pmrem.dispose();
  envScene.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) o.material.dispose();
  });
  return texture;
}

// =========================================================================
// CARTE DE REFLETS « JOUR » : ciel bleu, soleil, sol clair
// =========================================================================
export function createDayEnvironment(renderer) {
  const envScene = new THREE.Scene();
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 zenith = vec3(0.10, 0.32, 0.70);
        vec3 horizon = vec3(0.62, 0.78, 0.92);
        vec3 ground = vec3(0.22, 0.24, 0.24);
        vec3 col = mix(horizon, zenith, smoothstep(0.0, 0.7, h));
        if (h < 0.0) col = mix(horizon * 0.7, ground, smoothstep(0.0, -0.25, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  envScene.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyMat));

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2.4, 16, 8),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(12, 11, 9.5) })
  );
  sun.position.set(20, 34, 22);
  envScene.add(sun);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(envScene, 0.02).texture;
  pmrem.dispose();
  envScene.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) o.material.dispose();
  });
  return texture;
}
