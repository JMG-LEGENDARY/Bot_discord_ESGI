import * as THREE from 'three';
import './style.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { createAtmosphere } from './atmosphere.js';
import { buildEcoCyberCity } from './city.js';
import { createHoloPanel, buildSkyPlatform } from './panels.js';
import { buildUndergroundMasterclass } from './underground.js';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xbae6fd, 0.0018);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  type: THREE.HalfFloatType,
  samples: 4
});
const composer = new EffectComposer(renderer, renderTarget);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.32,
  0.25,
  1.28
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

const targetHeight = 130;
const atmosphere = createAtmosphere(scene, targetHeight);
const ecoCity = buildEcoCyberCity(scene, targetHeight);
const underground = buildUndergroundMasterclass(scene);
const skyPlatform = buildSkyPlatform(scene, targetHeight);

function getFacadeRadiusAtY(tower, y, fallbackRadius) {
  tower.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster();
  const directions = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0, 0, 1)
  ];

  let maxR = 0;
  directions.forEach((dir) => {
    const origin = dir.clone().multiplyScalar(-140).setY(y);
    raycaster.set(origin, dir);
    const hits = raycaster.intersectObject(tower, true);
    if (hits.length > 0) {
      const r = 140 - hits[0].distance;
      if (r > maxR) maxR = r;
    }
  });

  return maxR > 1 ? maxR : fallbackRadius;
}

const loader = new GLTFLoader();
const panelMeshes = [];

loader.load('/skyscraper.glb', (gltf) => {
  const tower = gltf.scene;

  const box = new THREE.Box3().setFromObject(tower);
  const size = box.getSize(new THREE.Vector3());

  const scaleFactor = targetHeight / size.y;
  tower.scale.setScalar(scaleFactor);

  const scaledBox = new THREE.Box3().setFromObject(tower);
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
  tower.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

  const maxHalfWidth = Math.max(
    scaledBox.max.x - scaledBox.min.x,
    scaledBox.max.z - scaledBox.min.z
  ) / 2;

  tower.traverse((child) => {
    if (child.isMesh && child.material) {
      if (child.material.color) {
        child.material.color.multiplyScalar(0.32);
      }
      child.material.emissiveIntensity = 0;
      child.material.envMapIntensity = 0.35;
      child.material.roughness = Math.max(child.material.roughness ?? 0.5, 0.45);
      child.material.needsUpdate = true;
    }
  });

  scene.add(tower);

  const panelsData = [
    {
      y: 104,
      angle: Math.PI * 0.5,
      color: '#00f3ff',
      tag: 'SYS.01 // FEATURES',
      title: 'Fonctionnalités Clés',
      zoneName: 'NIVEAU 01 — FONCTIONNALITÉS',
      lines: [
        'Rappels automatiques devoirs & examens',
        'Gestion dynamique des rôles par classe',
        'Boutique virtuelle & économie serveur'
      ]
    },
    {
      y: 78,
      angle: Math.PI * 1.0,
      color: '#ff007f',
      tag: 'SYS.02 // INTERFACE',
      title: 'Expérience Étudiante',
      zoneName: 'NIVEAU 02 — EXPÉRIENCE',
      lines: [
        'Modales interactives Discord',
        'Notifications ciblées par filière',
        'Commandes slash ultra-rapides'
      ]
    },
    {
      y: 50,
      angle: Math.PI * 1.5,
      color: '#00f3ff',
      tag: 'SYS.03 // ARCHITECTURE',
      title: 'Architecture & Code',
      zoneName: 'NIVEAU 03 — STACK TECHNIQUE',
      lines: [
        'Développé en Python & portage Rust',
        'Base de données SQLite optimisée',
        'Hébergement autonome 24/7 sur Raspberry Pi'
      ]
    },
    {
      y: 24,
      angle: Math.PI * 2.0,
      color: '#a855f7',
      tag: 'SYS.04 // DEPLOYMENT',
      title: 'Open-Source ESGI',
      zoneName: 'NIVEAU 04 — OPEN-SOURCE',
      lines: [
        'Code modulaire & maintenable',
        'Déploiement continu via systemd',
        'Conçu par et pour les étudiants ESGI'
      ]
    }
  ];

  panelsData.forEach((p) => {
    const surfaceR = getFacadeRadiusAtY(tower, p.y, maxHalfWidth * 0.65);
    p.panelRadius = surfaceR + 3.0;
    p.camRadius = p.panelRadius + 14.5;

    const panel = createHoloPanel(p.tag, p.title, p.lines, p.color, 9.4, 4.7);
    panel.position.set(
      Math.sin(p.angle) * p.panelRadius,
      p.y,
      Math.cos(p.angle) * p.panelRadius
    );
    panel.lookAt(0, p.y, 0);
    panel.rotateY(Math.PI);

    scene.add(panel);
    panelMeshes.push(panel);
  });

  const camState = {
    mode: 0,
    angle: 0,
    radius: 36,
    camY: targetHeight + 9.5,
    targetY: targetHeight + 5.0,
    ux: 0,
    uy: 14,
    uz: 44,
    utx: 0,
    uty: 3,
    utz: 0
  };

  const pillarButtons = document.querySelectorAll('.pillar-btn');
  function updateActivePillarButton(activeLabel) {
    pillarButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.label === activeLabel);
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const hud = document.getElementById('hud');
        const hudAlt = document.getElementById('hud-alt');
        const hudZone = document.getElementById('hud-zone');
        const hudFill = document.getElementById('hud-fill');
        const hint = document.getElementById('scroll-hint');
        const pillarNav = document.getElementById('pillar-nav');

        if (hint) hint.style.opacity = self.progress > 0.02 ? '0' : '1';
        if (hudFill) hudFill.style.width = `${Math.round(self.progress * 100)}%`;

        const currentY = THREE.MathUtils.lerp(camState.camY, camState.uy, camState.mode);
        const meters = Math.round(currentY * 5);
        if (hudAlt) hudAlt.textContent = `ALT ${meters}M`;

        const isUnderground = camState.mode > 0.72;
        if (hud) hud.classList.toggle('hidden', currentY < 2);
        if (pillarNav) pillarNav.classList.toggle('visible', isUnderground);

        if (hudZone && !isUnderground) {
          if (currentY > 116) hudZone.textContent = 'CITADELLE ORBITALE';
          else if (currentY > 90) hudZone.textContent = panelsData[0].zoneName;
          else if (currentY > 64) hudZone.textContent = panelsData[1].zoneName;
          else if (currentY > 36) hudZone.textContent = panelsData[2].zoneName;
          else if (currentY > 17) hudZone.textContent = panelsData[3].zoneName;
          else hudZone.textContent = 'ECO-PARC & SKYBRIDGES';
        }

        if (isUnderground) {
          const currentTime = tl.time();
          let closestLabel = 'underground-overview';
          let minDiff = Infinity;
          ['underground-overview', 'pillar-0', 'pillar-1', 'pillar-2', 'pillar-3', 'pillar-4'].forEach((lbl) => {
            const diff = Math.abs(tl.labels[lbl] - currentTime);
            if (diff < minDiff) {
              minDiff = diff;
              closestLabel = lbl;
            }
          });
          updateActivePillarButton(closestLabel);
        }
      }
    }
  });

  tl.addLabel('top');

  panelsData.forEach((p, idx) => {
    tl.to(camState, {
      angle: p.angle,
      radius: p.camRadius,
      camY: p.y,
      targetY: p.y,
      duration: 2.0,
      ease: 'power1.inOut'
    })
    .to(camState, {
      angle: p.angle,
      camY: p.y,
      targetY: p.y,
      duration: 0.4,
      ease: 'none'
    })
    .addLabel(`panel-${idx}`)
    .to(camState, {
      angle: p.angle,
      camY: p.y,
      targetY: p.y,
      duration: 0.4,
      ease: 'none'
    });
  });

  tl.to(camState, {
    angle: Math.PI * 2.25,
    radius: 48,
    camY: 13.5,
    targetY: 3.5,
    duration: 2.0,
    ease: 'power1.inOut'
  })
  .to(camState, {
    angle: Math.PI * 2.0,
    radius: 12,
    camY: 6.0,
    targetY: -12.0,
    ux: 0,
    uy: 6.0,
    uz: 12,
    utx: 0,
    uty: -12.0,
    utz: 4,
    duration: 1.4,
    ease: 'power2.in'
  })
  .to(camState, {
    mode: 1,
    ux: 0,
    uy: underground.floorY + 12.5,
    uz: 25.5,
    utx: 0,
    uty: underground.floorY + 5.2,
    utz: -3.5,
    duration: 2.4,
    ease: 'power2.out'
  })
  .to(camState, { duration: 0.4 })
  .addLabel('underground-overview')
  .to(camState, { duration: 0.4 });

  underground.pillarsData.forEach((p) => {
    tl.to(camState, {
      ux: p.camPos.x,
      uy: p.camPos.y,
      uz: p.camPos.z,
      utx: p.pos.x,
      uty: p.pos.y + 5.2,
      utz: p.pos.z,
      duration: 1.8,
      ease: 'power2.inOut'
    })
    .to(camState, { duration: 0.35 })
    .addLabel(p.label)
    .to(camState, { duration: 0.35 });
  });

  let magnetTimeout = null;
  let magnetTween = null;
  let isProgrammaticScroll = false;

  function cancelMagnet() {
    clearTimeout(magnetTimeout);
    if (magnetTween) {
      magnetTween.kill();
      magnetTween = null;
    }
  }

  window.addEventListener('wheel', cancelMagnet, { passive: true });
  window.addEventListener('touchstart', cancelMagnet, { passive: true });

  window.addEventListener('scroll', () => {
    if (isProgrammaticScroll) return;
    clearTimeout(magnetTimeout);

    magnetTimeout = setTimeout(() => {
      const st = tl.scrollTrigger;
      if (!st) return;

      const currentProgress = st.progress;
      const magnetLabels = ['panel-0', 'panel-1', 'panel-2', 'panel-3'];
      let nearestProg = null;
      let minDist = 0.036;

      magnetLabels.forEach((lbl) => {
        if (tl.labels[lbl] !== undefined) {
          const prog = tl.labels[lbl] / tl.duration();
          const d = Math.abs(prog - currentProgress);
          if (d < minDist) {
            minDist = d;
            nearestProg = prog;
          }
        }
      });

      if (nearestProg !== null && minDist > 0.002) {
        const targetY = st.start + nearestProg * (st.end - st.start);
        const scrollProxy = { y: window.scrollY };
        isProgrammaticScroll = true;
        magnetTween = gsap.to(scrollProxy, {
          y: targetY,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => window.scrollTo(0, scrollProxy.y),
          onComplete: () => {
            isProgrammaticScroll = false;
            magnetTween = null;
          },
          onInterrupt: () => {
            isProgrammaticScroll = false;
          }
        });
      }
    }, 340);
  }, { passive: true });

  function navigateToLabel(labelName) {
    const st = tl.scrollTrigger;
    if (!st || tl.labels[labelName] === undefined) return;
    cancelMagnet();
    const progress = tl.labels[labelName] / tl.duration();
    const targetScroll = st.start + progress * (st.end - st.start);
    const scrollProxy = { y: window.scrollY };
    isProgrammaticScroll = true;
    magnetTween = gsap.to(scrollProxy, {
      y: targetScroll,
      duration: 1.05,
      ease: 'power2.inOut',
      onUpdate: () => window.scrollTo(0, scrollProxy.y),
      onComplete: () => {
        isProgrammaticScroll = false;
        magnetTween = null;
      }
    });
  }

  pillarButtons.forEach((btn) => {
    btn.addEventListener('click', () => navigateToLabel(btn.dataset.label));
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tooltip = document.getElementById('pillar-tooltip');
  let pointerDownPos = { x: 0, y: 0 };

  window.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (camState.mode < 0.72) {
      document.body.style.cursor = 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(underground.interactivePillarObjects, false);
    const hovered = hits.length > 0;
    document.body.style.cursor = hovered ? 'pointer' : 'default';
    if (tooltip) tooltip.classList.toggle('visible', hovered);
  });

  window.addEventListener('pointerup', (e) => {
    const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (moveDist > 6 || camState.mode < 0.72) return;

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(underground.interactivePillarObjects, false);

    if (hits.length > 0 && hits[0].object.userData.label) {
      navigateToLabel(hits[0].object.userData.label);
    }
  });

  const clock = new THREE.Clock();
  const orbitalCamVec = new THREE.Vector3();
  const orbitalTargetVec = new THREE.Vector3();
  const underCamVec = new THREE.Vector3();
  const underTargetVec = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    const currentY = THREE.MathUtils.lerp(camState.camY, camState.uy, camState.mode);
    atmosphere.update(delta, elapsed, currentY, camState.mode);
    ecoCity.update(delta, elapsed);
    skyPlatform.update(elapsed);
    underground.update(delta, elapsed);

    orbitalCamVec.set(
      Math.sin(camState.angle) * camState.radius,
      camState.camY,
      Math.cos(camState.angle) * camState.radius
    );
    orbitalTargetVec.set(0, camState.targetY, 0);

    underCamVec.set(camState.ux, camState.uy, camState.uz);
    underTargetVec.set(camState.utx, camState.uty, camState.utz);

    camera.position.lerpVectors(orbitalCamVec, underCamVec, camState.mode);
    const finalTarget = orbitalTargetVec.lerp(underTargetVec, camState.mode);
    camera.lookAt(finalTarget);

    panelMeshes.forEach((mesh) => {
      const dist = camera.position.distanceTo(mesh.position);
      const targetScale = dist < 16.5 ? 1.04 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.12);
    });

    composer.render();
  }
  animate();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});