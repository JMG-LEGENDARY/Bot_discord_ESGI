import * as THREE from 'three';
import './style.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { createAtmosphere } from './atmosphere.js';
import { buildEcoCyberCity } from './city.js';
import { buildSpaceFleet } from './ships.js';
import { createHoloPanel, buildSkyPlatform } from './panels.js';
import { buildUndergroundMasterclass } from './underground.js';
import { createNightEnvironment, createDayEnvironment } from './environment.js';
import { DAY_UNIFORM } from './theme.js';
import { createGlowSystem, GLOW } from './glows.js';
import { createCompanion } from './companion.js';
import { createEntranceDoor } from './entrance-door.js';
import { createElevator3D } from './elevator3d.js';
import './elevator.css';

gsap.registerPlugin(ScrollTrigger);

// Les panneaux 3D sont dessinés sur des canvas : on attend les polices
// (1,5 s maximum) pour ne pas les dessiner avec la police de secours.
await Promise.race([
  Promise.all([
    document.fonts.load('700 48px "Space Grotesk"'),
    document.fonts.load('400 32px "Space Grotesk"'),
    document.fonts.load('700 24px "JetBrains Mono"')
  ]),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).catch(() => {});

const canvas = document.querySelector('#bg');

// Écran de chargement : progression, puis message clair en cas de problème
const loaderEl = document.getElementById('loader');
const loaderFill = document.getElementById('loader-fill');
const loaderText = document.getElementById('loader-text');
function showLoadError(message) {
  if (!loaderEl) return;
  loaderEl.classList.add('error');
  loaderText.textContent = message;
}
function hideLoader() {
  if (loaderEl) loaderEl.classList.add('done');
}

// Navigateur sans 3D (WebGL) : on prévient au lieu d'afficher un écran noir
const webglOk = (() => {
  try {
    const test = document.createElement('canvas');
    return Boolean(test.getContext('webgl2') || test.getContext('webgl'));
  } catch (e) {
    return false;
  }
})();
if (!webglOk) {
  showLoadError('Ton navigateur ne gère pas la 3D (WebGL). Essaie avec Chrome, Edge ou Firefox à jour.');
  throw new Error('WebGL indisponible');
}
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x3a2560, 0.0014);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

// Téléphone en portrait : l'écran est étroit, on élargit l'angle de vue
// pour que les panneaux 3D tiennent en largeur (sans dépasser 75°).
function fitCameraToScreen() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  const wanted = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(22)) / aspect));
  camera.fov = THREE.MathUtils.clamp(wanted, 50, 75);
  camera.updateProjectionMatrix();
}
fitCameraToScreen();

// Résolution plafonnée à 1.5x : au-delà, l'œil ne voit presque pas la différence
// mais la carte graphique travaille jusqu'à 2x plus.
// Écran tactile (téléphone, tablette) : résolution un peu plus basse pour la batterie
const IS_TOUCH = window.matchMedia('(hover: none)').matches;
const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, IS_TOUCH ? 1.25 : 1.5);
let currentPixelRatio = MAX_PIXEL_RATIO;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(currentPixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Reflets de nuit (ciel indigo, lueur de la ville, néons) au lieu d'un studio blanc
const nightEnvironment = createNightEnvironment(renderer);
const dayEnvironment = createDayEnvironment(renderer);
scene.environment = nightEnvironment;

const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  type: THREE.HalfFloatType,
  samples: 4
});
const composer = new EffectComposer(renderer, renderTarget);
composer.setPixelRatio(currentPixelRatio);
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(new RenderPass(scene, camera));

// Halo lumineux des néons, un peu plus présent la nuit
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.55,
  0.4,
  1.05
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

// Accès debug (uniquement en développement) pour mesurer les performances
if (import.meta.env.DEV) window.__three = { renderer, scene, camera, DAY_UNIFORM };

const targetHeight = 130;
const glows = createGlowSystem(scene);
// NOVA, le petit vaisseau compagnon qui suit le visiteur
const companion = createCompanion(scene, camera, glows);
if (import.meta.env.DEV) window.__nova = companion;
const bufferSize = new THREE.Vector2();
function resizeGlows() {
  renderer.getDrawingBufferSize(bufferSize);
  glows.resize(bufferSize.y, camera.fov);
  companion.resize(bufferSize.y, camera.fov);
}
resizeGlows();

const atmosphere = createAtmosphere(scene, targetHeight);
atmosphere.setPlanetLayout(camera.aspect < 1);

// =========================================================================
// MODE JOUR / NUIT (clic sur la planète en haut de la tour)
// =========================================================================
let isDay = false;
try {
  isDay = localStorage.getItem('esgi-theme') === 'day';
} catch (e) {
  // stockage indisponible (navigation privée) : on reste en nuit
}
DAY_UNIFORM.value = isDay ? 1 : 0;
document.documentElement.dataset.theme = isDay ? 'day' : 'night';

const themeHint = document.getElementById('theme-hint');
function updateThemeHintText() {
  if (themeHint) {
    themeHint.textContent = isDay
      ? '☾ TOUCHEZ LA PLANÈTE POUR PASSER EN MODE NUIT'
      : '☀ TOUCHEZ LA PLANÈTE POUR PASSER EN MODE JOUR';
  }
}
updateThemeHintText();

function toggleDayNight() {
  isDay = !isDay;
  try {
    localStorage.setItem('esgi-theme', isDay ? 'day' : 'night');
  } catch (e) {
    // pas grave si le choix n'est pas mémorisé
  }
  document.documentElement.dataset.theme = isDay ? 'day' : 'night';
  updateThemeHintText();
  gsap.to(DAY_UNIFORM, { value: isDay ? 1 : 0, duration: 2.4, ease: 'power2.inOut', overwrite: true });
  companion.say(isDay ? 'Il fait jour ! ☀️ Tout est plus clair d\'un coup.' : 'Retour de la nuit 🌙 Les néons se rallument !');
}

// L'indication elle-même est aussi un bouton (plus simple au doigt)
if (themeHint) themeHint.addEventListener('click', toggleDayNight);

const planetSphere = new THREE.Sphere();
function isPointerOnPlanet(raycaster) {
  if (!atmosphere.isPlanetVisible()) return false;
  const activePlanet = atmosphere.getActivePlanet();
  activePlanet.getWorldPosition(planetSphere.center);
  planetSphere.radius = 54 * 1.5; // zone de clic plus large que la planète (pratique au doigt)
  return raycaster.ray.intersectsSphere(planetSphere);
}
const ecoCity = buildEcoCyberCity(scene, targetHeight, glows);
const spaceFleet = buildSpaceFleet(scene, targetHeight, glows);
const underground = buildUndergroundMasterclass(scene);
const skyPlatform = buildSkyPlatform(scene, targetHeight);

// Vitres de la tour : verre sombre qui reflète surtout le ciel, avec une lueur
// intérieure douce qui varie légèrement d'un étage à l'autre (pas de motif
// aléatoire fenêtre par fenêtre). Le jour, la lueur s'éteint : on ne voit que le reflet.
function applyWindowPattern(material) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uDay = DAY_UNIFORM;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWinPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWinPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWinPos;\nuniform float uDay;')
      // Le jour, verre teinté bleu acier (comme un vrai mur-rideau sous le ciel)
      .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb += vec3(0.12, 0.2, 0.32) * uDay;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float floorId = floor(vWinPos.y / 3.4);
        float floorVar = fract(sin(floorId * 91.7) * 43758.5453);
        totalEmissiveRadiance *= (0.8 + floorVar * 0.4) * (1.0 - uDay);`
      );
  };
  material.customProgramCacheKey = () => 'tower-windows';
}

// Matières de la tour, par nom de matériau du modèle 3D
const TOWER_MATERIALS = {
  // Façade : panneaux de pierre à revêtement métallisé (petits reflets du ciel et des néons)
  Marble: { color: 0xa29e98, metalness: 0.65, roughness: 0.24, env: 1.8, pattern: 'stone' },
  // Cadres et socle : acier anthracite
  M_0133_Gray: { color: 0x3a3e4a, metalness: 0.85, roughness: 0.25, env: 1.3 },
  // Couronne du sommet : acier brossé
  Steel: { color: 0xb4bac6, metalness: 1.0, roughness: 0.18, env: 1.5 },
  // Ailettes verticales : bronze anodisé
  Metal_Embossed: { color: 0x6a523a, metalness: 0.95, roughness: 0.22, env: 1.4 },
  // Sol / parvis de la tour : dallage de granit sombre
  FloorCover: { color: 0x5a5a64, metalness: 0.1, roughness: 0.55, env: 0.8, pattern: 'tiles' },
  // Petite enseigne
  FrontColor: { color: 0x0a1020, metalness: 0.3, roughness: 0.3, env: 0.6, emissive: 0x22e4ff, emissiveIntensity: 1.6 },
  default: { color: 0x55565e, metalness: 0.4, roughness: 0.5, env: 0.9 }
};

// Détails réalistes sans texture, calculés à partir de la position dans le monde :
// - 'stone' : chaque étage et chaque panneau de pierre a une teinte un peu différente
// - 'tiles' : dallage avec joints et dalles de teintes variées
function applySurfacePattern(material, pattern) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uDay = DAY_UNIFORM;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vSurfPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvSurfPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    const body = pattern === 'tiles'
      ? `
        vec2 tileUv = vSurfPos.xz / 2.2;
        vec2 tileId = floor(tileUv);
        vec2 tileF = fract(tileUv);
        float tHash = fract(sin(dot(tileId, vec2(127.1, 311.7))) * 43758.5453);
        float joint = step(0.04, tileF.x) * step(0.04, tileF.y);
        diffuseColor.rgb *= mix(0.35, 0.85 + tHash * 0.3, joint);`
      : `
        vec3 panelId = floor(vSurfPos / vec3(3.9, 3.4, 3.9));
        float sHash = fract(sin(dot(panelId, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
        float grain = fract(sin(dot(floor(vSurfPos * 6.0), vec3(7.1, 3.7, 5.3))) * 9751.31);
        diffuseColor.rgb *= 0.86 + sHash * 0.22 + (grain - 0.5) * 0.05;
        // Traces de ruissellement plus sombres vers le bas de chaque panneau
        diffuseColor.rgb *= 0.92 + 0.08 * fract(vSurfPos.y / 3.4);`;
    // Éclairage d'architecte : projecteurs chauds au pied de la façade,
    // couronne éclairée au sommet, flaque de lumière sur le parvis.
    const light = pattern === 'tiles'
      ? `
        float plazaGlow = exp(-length(vSurfPos.xz) / 22.0);
        totalEmissiveRadiance += vec3(1.0, 0.74, 0.46) * 0.66 * plazaGlow * diffuseColor.rgb * (1.0 - uDay);`
      : `
        float footWash = exp(-max(vSurfPos.y, 0.0) / 9.0);
        float crownWash = exp(-abs(vSurfPos.y - 124.0) / 5.0);
        totalEmissiveRadiance += vec3(1.0, 0.76, 0.5) * 0.55 * footWash * diffuseColor.rgb * (1.0 - uDay);
        totalEmissiveRadiance += vec3(0.4, 0.85, 1.0) * 0.45 * crownWash * diffuseColor.rgb * (1.0 - uDay);`;
    // Petits reflets métalliques : chaque panneau de façade a son propre brillant
    // (certains très lisses, d'autres satinés), les reflets scintillent en bougeant.
    const shine = pattern === 'stone'
      ? `
        roughnessFactor = mix(0.08, 0.42, sHash * sHash);`
      : '';
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vSurfPos;\nuniform float uDay;')
      .replace('#include <color_fragment>', `#include <color_fragment>${body}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>${shine}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>${light}`);
  };
  material.customProgramCacheKey = () => `tower-${pattern}`;
}

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
const panelGroups = [];
const interactivePanelScreens = [];

loader.load(`${import.meta.env.BASE_URL}skyscraper.glb`, (gltf) => {
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

  // Habillage de la tour : une matière réaliste par partie du modèle,
  // vitres sombres et réfléchissantes.
  tower.traverse((child) => {
    if (!child.isMesh || !child.material) return;
    const mat = child.material;
    const name = (mat.name || '').toLowerCase();

    if (name.includes('glass')) {
      const accent = name.includes('green');
      mat.color.set(0x070b1c);
      mat.metalness = 0.92;
      mat.roughness = 0.12;
      mat.envMapIntensity = 0.9;
      if (accent) {
        mat.emissive.set(0x7a1a78);
        mat.emissiveIntensity = 0.85;
      } else {
        // Lueur intérieure douce, légèrement froide
        mat.emissive.set(0x5a6a96);
        mat.emissiveIntensity = 0.55;
        applyWindowPattern(mat);
      }
    } else {
      // Chaque matériau du modèle reçoit sa propre matière réaliste
      const look = TOWER_MATERIALS[mat.name] || TOWER_MATERIALS.default;
      mat.color.set(look.color);
      mat.metalness = look.metalness;
      mat.roughness = look.roughness;
      mat.envMapIntensity = look.env;
      mat.emissive.set(look.emissive || 0x000000);
      mat.emissiveIntensity = look.emissiveIntensity || 0;
      if (look.pattern) applySurfacePattern(mat, look.pattern);
    }
    mat.needsUpdate = true;
  });

  scene.add(tower);

  // Porte d'entrée du modèle (façade avec les marches) : on mesure son
  // ouverture pour poser exactement par-dessus notre porte 3D animée.
  tower.updateMatrixWorld(true);
  const probe = new THREE.Raycaster();
  const probeHit = (origin, dir) => {
    probe.set(origin, dir);
    const hits = probe.intersectObject(tower, true);
    return hits.length > 0 ? hits[0] : null;
  };
  const doorSpot = { x: 0, z: 11.34, bottom: 3.71, top: 6.9, width: 2.8 };
  const doorWall = probeHit(new THREE.Vector3(0, 5, 140), new THREE.Vector3(0, 0, -1));
  if (doorWall) {
    doorSpot.z = doorWall.point.z;
    const below = probeHit(new THREE.Vector3(0, 5, doorSpot.z + 0.6), new THREE.Vector3(0, -1, 0));
    if (below) doorSpot.bottom = below.point.y;
    const above = probeHit(new THREE.Vector3(0, doorSpot.bottom + 0.5, doorSpot.z + 0.05), new THREE.Vector3(0, 1, 0));
    if (above) doorSpot.top = above.point.y;
    // Largeur : jusqu'où s'étend la matière de la porte de chaque côté
    const doorMaterial = doorWall.object.material.name;
    let half = 0;
    for (let x = 0.05; x < 4; x += 0.05) {
      const h = probeHit(new THREE.Vector3(x, 5, 140), new THREE.Vector3(0, 0, -1));
      if (!h || h.object.material.name !== doorMaterial) break;
      half = x;
    }
    if (half > 0.5) doorSpot.width = half * 2 + 0.06;
  }
  const entranceDoor = createEntranceDoor(scene, glows, { ...doorSpot, z: doorSpot.z + 0.02 });

  // Feux d'obstacle aviation : rouges clignotants aux 4 coins du toit + flash blanc
  const roofY = scaledBox.max.y - scaledBox.min.y;
  const halfX = (scaledBox.max.x - scaledBox.min.x) / 2;
  const halfZ = (scaledBox.max.z - scaledBox.min.z) / 2;
  const roofAnchor = new THREE.Object3D();
  scene.add(roofAnchor);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz], k) => {
    glows.add(roofAnchor, new THREE.Vector3(sx * halfX * 0.92, roofY + 0.4, sz * halfZ * 0.92), GLOW.aviation, 1.6,
      { speed: 0.5, phase: k * 0.03, duty: 0.45 });
  });
  glows.add(roofAnchor, new THREE.Vector3(0, roofY + 6.5, 0), GLOW.strobe, 2.4, { speed: 0.8, phase: 0, duty: 0.08 });
  // Feux rouges fixes tous les ~20 m sur les arêtes, comme sur les vrais gratte-ciel
  for (let y = 20; y < roofY - 5; y += 20) {
    [[-1, -1], [1, 1]].forEach(([sx, sz]) => {
      glows.add(roofAnchor, new THREE.Vector3(sx * halfX * 0.95, y, sz * halfZ * 0.95), [1.6, 0.08, 0.05], 0.9);
    });
  }

  // =========================================================================
  // 4 PANNEAUX DE LA TOUR (STRICTEMENT BASÉS SUR LE README)
  // =========================================================================
  const towerDossiers = [
    {
      y: 104,
      angle: Math.PI * 0.5,
      color: '#22e4ff',
      tag: 'SYS.01 // FONCTIONNALITÉS',
      tabLabel: '01 // FONCTIONNALITÉS',
      title: 'Fonctionnalités',
      zoneName: 'NIVEAU 01 — FONCTIONNALITÉS',
      lines: [
        'Devoirs & évaluations par classe',
        'Rappels quotidiens à 7 h 30',
        'Intégration API Thomson & logs'
      ],
      detail: {
        subtitle:
          "Bot Discord en Python conçu pour accompagner les étudiants ESGI sur leurs devoirs, évaluations et activités de serveur.",
        metrics: [
          { value: '7 H 30', label: 'Messages programmés tous les jours (Europe/Paris)' },
          { value: 'J-7 / J-1 / J0', label: 'Échéances prévues dans 7 jours, 1 jour ou le jour même' },
          { value: '0,1 %', label: 'Réponse aléatoire avec image issue de l’API Thomson' }
        ],
        sections: [
          {
            title: 'Devoirs, Évaluations & Détection de Classe',
            desc: 'Suivi scolaire automatisé en fonction des rôles Discord attribués à chaque étudiant sur le serveur.',
            bullets: [
              'Détection automatique de la classe de l’utilisateur à partir de ses rôles Discord',
              'Ajout et modification des devoirs avec matière, date et sujet',
              'Ajout et modification des évaluations, et affichage des devoirs et évaluations à venir',
              'Suppression automatique des devoirs dont la date est dépassée'
            ]
          },
          {
            title: 'Rappels Programmés & Administration',
            desc: 'Planification quotidienne des notifications et gestion des rôles administratifs du serveur.',
            bullets: [
              'Messages programmés tous les jours à 7 h 30 pour les échéances prévues dans 7 jours, dans 1 jour ou le jour même',
              'Configuration des rôles correspondant aux classes du serveur',
              'Attribution d’un rang administratif à un membre'
            ]
          },
          {
            title: 'API Thomson, Journalisation & Persistance',
            desc: 'Fonctionnalités communautaires liées à l’API Thomson, suivi console et stockage local.',
            bullets: [
              'Réponse aléatoire à environ 0,1 % des messages avec une image issue de l’API Thomson',
              'Commande spéciale utilisant l’API Thomson pour générer une bannière événementielle',
              'Journalisation des événements et des actions importantes dans la console',
              'Base SQLite locale pour les devoirs, évaluations, membres, rôles, projets, compétences, notifications et configurations'
            ]
          }
        ]
      }
    },
    {
      y: 78,
      angle: Math.PI * 1.0,
      color: '#ff3dbb',
      tag: 'SYS.02 // COMMANDES',
      tabLabel: '02 // COMMANDES',
      title: 'Commandes Discord',
      zoneName: 'NIVEAU 02 — COMMANDES SLASH',
      lines: [
        'Devoirs & évaluations (/ajouter_*, /lister_*)',
        'Classes & admin (/configurer_*, /admin_*)',
        'Thomson, ping & suppression (/implorer_*, /ping)'
      ],
      detail: {
        subtitle:
          "Ensemble des 9 commandes slash du bot Discord pour la gestion des devoirs, des évaluations, des classes et des interactions serveur.",
        metrics: [
          { value: '9 COMMANDES', label: 'Commandes slash synchronisées avec Discord' },
          { value: 'MENUS & MODALES', label: 'Sélection de matières et formulaires interactifs' },
          { value: 'PAR CLASSE', label: 'Filtrage selon la classe de l’utilisateur' }
        ],
        sections: [
          {
            title: 'Devoirs & Évaluations',
            desc: 'Ajout via menus de matières et formulaires, et consultation des échéances de la classe.',
            bullets: [
              '/ajouter_un_devoir : Ouvre un menu de matières puis un formulaire pour ajouter un devoir.',
              '/ajouter_une_évaluation : Ouvre un menu de matières puis un formulaire pour ajouter une évaluation.',
              '/lister_les_devoirs : Liste les devoirs de la classe de l’utilisateur.',
              '/lister_les_évaluations : Liste les évaluations de la classe de l’utilisateur.'
            ]
          },
          {
            title: 'Configuration & Permissions',
            desc: 'Commandes réservées au paramétrage des rôles de classes et des droits administrateur.',
            bullets: [
              '/configurer_les_classes : Permet à un administrateur de choisir les rôles Discord utilisés comme classes.',
              '/admin_permission : Attribue le rang administrateur à un membre.'
            ]
          },
          {
            title: 'Diagnostic, Thomson & Gestion des Messages',
            desc: 'Commandes utilitaires et créations aléatoires liées à l’API Thomson.',
            bullets: [
              '/ping : Affiche la latence du bot.',
              '/implorer_le_tout_puissant : Affiche une création aléatoire avec une image issue de l’API Thomson.',
              '/nouvelle_identité : Interface prévue pour supprimer les messages envoyés par l’utilisateur.'
            ]
          }
        ]
      }
    },
    {
      y: 50,
      angle: Math.PI * 1.5,
      color: '#22e4ff',
      tag: 'SYS.03 // ARCHITECTURE',
      tabLabel: '03 // ARCHITECTURE',
      title: 'Technologies & Structure',
      zoneName: 'NIVEAU 03 — STACK & STRUCTURE',
      lines: [
        'Python 3, discord.py, aiohttp & Zoneinfo',
        'Base de données SQLite locale (bot.db)',
        '5 cogs modulaires, files/ & dossier Site/'
      ],
      detail: {
        subtitle:
          "Architecture modulaire en Python 3 articulée autour de 5 cogs spécialisés, d'une base SQLite locale et du dossier Site Three.js.",
        metrics: [
          { value: 'PYTHON 3', label: 'discord.py, aiohttp & Zoneinfo (Europe/Paris)' },
          { value: '5 COGS', label: 'commands, configSQL, sql, notifications, events' },
          { value: 'BOT.DB', label: 'Persistance locale SQLite' }
        ],
        sections: [
          {
            title: 'Technologies',
            desc: 'Bibliothèques et modules utilisés pour exécuter le bot et ses tâches planifiées.',
            bullets: [
              'Python 3',
              'discord.py pour les commandes slash, les événements, les boutons et les modales',
              'SQLite pour la persistance locale',
              'aiohttp pour les appels API',
              'Zoneinfo pour la gestion du fuseau Europe/Paris'
            ]
          },
          {
            title: 'Structure du Projet',
            desc: 'Répartition des fichiers racines, des cogs Discord, des données Thomson et du site 3D.',
            bullets: [
              'Racine : main.py, config.py, utils.py, LOGS.py et bot.db',
              'cogs/ : commands.py, configSQL.py, sql.py, notifications.py et events.py',
              'files/Thomson_names.json & Site/ (src/, public/, package.json)'
            ],
            code: `.\n├── main.py                  # Point d'entrée et initialisation du bot\n├── config.py                # Configuration Discord et API\n├── utils.py                 # Matières et catégories proposées\n├── LOGS.py                  # Logger console\n├── bot.db                   # Base SQLite locale\n├── cogs/\n│   ├── commands.py          # Commandes slash et modales\n│   ├── configSQL.py         # Configuration des classes et permissions\n│   ├── sql.py               # Création et accès à la base SQLite\n│   ├── notifications.py     # Tâche quotidienne de rappel\n│   └── events.py            # Événements Discord et API Thomson\n├── files/\n│   └── Thomson_names.json   # Données utilisées pour générer les messages\n└── Site/\n    ├── src/                 # Scène Three.js, panneaux et animations\n    ├── public/              # Ressources 3D et fichiers publics\n    └── package.json         # Scripts et dépendances du site`
          }
        ]
      }
    },
    {
      y: 24,
      angle: Math.PI * 2.0,
      color: '#8b5cf6',
      tag: 'SYS.04 // INSTALLATION & RÔLES',
      tabLabel: '04 // INSTALL & RÔLES',
      title: 'Installation & Équipe',
      zoneName: 'NIVEAU 04 — INSTALLATION & ÉQUIPE',
      lines: [
        'Environnement .venv & lancement main.py',
        'Site 3D : npm install, npm run dev & build',
        'Rôles : JMG (développeur) & Yanis (secrétaire)'
      ],
      detail: {
        subtitle:
          "Procédure d'installation du bot Python, commandes de lancement du site 3D et présentation des contributions de JMG et Yanis.",
        metrics: [
          { value: 'MAIN.PY', label: 'Init tables SQLite, cogs & sync slash' },
          { value: 'SITE/', label: 'npm install, npm run dev & npm run build' },
          { value: 'JMG & YANIS', label: 'Développement principal & secrétariat du projet' }
        ],
        sections: [
          {
            title: 'Installation et Démarrage du Bot',
            desc: 'Au démarrage, le bot initialise les tables SQLite, charge les cogs, puis synchronise les commandes slash avec Discord.',
            bullets: [
              'Récupérer le code sur GitHub : <a href="https://github.com/JMG-LEGENDARY/Bot_discord_ESGI" target="_blank" rel="noopener noreferrer">github.com/JMG-LEGENDARY/Bot_discord_ESGI</a>',
              'Créer un environnement virtuel : python3 -m venv .venv',
              'L’activer : source .venv/bin/activate (Linux / macOS) ou .venv\\Scripts\\activate (Windows)',
              'Installer les dépendances Python : pip install -r requirements.txt',
              'Créer le fichier config.py avec le token du bot Discord (fichier ignoré par Git : ne jamais le publier)',
              'Lancer le bot : python main.py'
            ],
            code: `git clone https://github.com/JMG-LEGENDARY/Bot_discord_ESGI.git\ncd Bot_discord_ESGI\npython3 -m venv .venv\n# Linux / macOS\nsource .venv/bin/activate\n# Windows\n.venv\\Scripts\\activate\npip install -r requirements.txt\n# Créer config.py avec le token du bot (jamais commité)\npython main.py`
          },
          {
            title: 'Lancement et Build du Site',
            desc: 'Commandes exécutées dans le répertoire Site/ pour le développement et la version prête à être déployée.',
            bullets: [
              'Se placer dans le dossier Site et installer les dépendances avec npm install',
              'Lancer le serveur de développement avec npm run dev',
              'Créer une version prête à être déployée avec npm run build'
            ],
            code: `cd Site\nnpm install\nnpm run dev\nnpm run build`
          },
          {
            title: 'Rôles dans le Projet',
            desc: 'Répartition des contributions autour du bot Discord et du site 3D.',
            bullets: [
              'JMG — développeur principal du bot : porte l’essentiel du développement actuel du bot et de ses différentes briques (architecture Python, démarrage du bot, commandes Discord, modales, gestion des devoirs et évaluations, cogs, notifications programmées, accès SQLite, événements Discord, intégration Thomson et réalisation du site 3D).',
              'Yanis — secrétaire du projet : rédige les comptes rendus et rapports de livrables, suit l’avancement du bot, tient la documentation et s’occupe du site vitrine ; renfort sur le code si besoin (configuration, listes de matières, SQLite).'
            ]
          },
          {
            title: 'Feuille de Route',
            desc: 'Prochaines étapes prévues pour le bot, d’après le rapport du livrable 1.',
            bullets: [
              'Prévu : rôles par élève, par classe et par matière',
              'Prévu (janvier – mars 2027) : ouverture du bot à toute l’ESGI'
            ]
          }
        ]
      }
    }
  ];

  // =========================================================================
  // 5 PILIERS SOUTERRAINS (COLLABORATIONS, ÉCOLE, IA & REMERCIEMENTS)
  // =========================================================================
  const undergroundDossiers = [
    {
      label: 'pillar-0',
      color: '#22e4ff',
      tag: 'COLLAB 01 // DÉVELOPPEUR PRINCIPAL',
      tabLabel: '01 // JMG',
      title: 'JMG — Développeur Principal',
      detail: {
        subtitle:
          "Bryan (JMG), étudiant en 1re année de Bachelor Informatique à l'ESGI Reims, porte l'essentiel du développement du bot Discord et de cette expérience web 3D.",
        metrics: [
          { value: 'ESGI REIMS', label: '1re année de Bachelor Informatique' },
          { value: 'FULL-STACK', label: 'Architecture Python, SQLite & interface 3D' },
          { value: '9 COMMANDES', label: 'Commandes slash, modales & rappels programmés' }
        ],
        sections: [
          {
            title: 'Développement du Cœur du Bot (Python & SQLite)',
            desc: "Conception de l'architecture modulaire du bot, du démarrage dans main.py jusqu'à la persistance locale dans bot.db.",
            bullets: [
              'Architecture Python complète, initialisation des tables SQLite et chargement des cogs',
              'Commandes slash, menus de sélection de matières et formulaires modaux Discord',
              'Gestion des devoirs et évaluations avec détection automatique de la classe via les rôles',
              'Tâche quotidienne de notifications programmées à 7 h 30 (Europe/Paris)'
            ]
          },
          {
            title: 'Intégration Thomson & Réalisation du Site 3D',
            desc: "Connexion aux événements Discord, intégration de l'API Thomson et création de la vitrine interactive Three.js.",
            bullets: [
              'Gestion des événements Discord, journalisation console (LOGS.py) et intégration de l’API Thomson',
              'Conception et réalisation complète du site 3D interactif (Three.js, shaders GLSL, GSAP)'
            ]
          }
        ]
      }
    },
    {
      label: 'pillar-1',
      color: '#ff3dbb',
      tag: 'COLLAB 02 // SECRÉTARIAT & SUIVI',
      tabLabel: '02 // YANIS',
      title: 'Yanis — Secrétaire du Projet',
      detail: {
        subtitle:
          "Yanis, étudiant en 1re année de Bachelor Informatique à l'ESGI Reims, assure le secrétariat du projet : comptes rendus, suivi de l'avancement du bot et documentation. Il prête aussi main-forte sur le code quand c'est nécessaire et s'occupe du site vitrine.",
        metrics: [
          { value: 'COMPTES RENDUS', label: 'Rapports de livrables & points d’étape' },
          { value: 'SUIVI', label: 'Avancement du bot & tâches à venir' },
          { value: 'RENFORT CODE', label: 'Configuration, matières, SQL & site vitrine' }
        ],
        sections: [
          {
            title: 'Secrétariat & Suivi de l’Avancement',
            desc: 'Garder une trace claire de ce qui est fait, de ce qui reste à faire et des décisions prises.',
            bullets: [
              'Rédaction des comptes rendus de réunion et des rapports de livrables',
              'Suivi de l’avancement du bot : fonctionnalités terminées, en cours et prévues',
              'Documentation du projet : README, installation et liste des commandes'
            ]
          },
          {
            title: 'Renfort sur le Code',
            desc: 'Un coup de main sur le développement du bot quand le besoin se présente.',
            bullets: [
              'Configuration générale du bot (config.py)',
              'Listes de matières et catégories proposées aux étudiants (utils.py)',
              'Participation à la couche base de données SQLite (cogs/sql.py)'
            ]
          },
          {
            title: 'Site Vitrine',
            desc: 'Mise en forme et contenu de cette expérience web de présentation du projet.',
            bullets: [
              'Rédaction et mise à jour des contenus présentés sur le site',
              'Restylage de l’interface et cohérence des informations avec le bot'
            ]
          }
        ]
      }
    },
    {
      label: 'pillar-2',
      color: '#8b5cf6',
      tag: 'COLLAB 03 // ÉCOLE & CAMPUS',
      tabLabel: '03 // ESGI',
      title: 'ESGI — Campus de Reims',
      detail: {
        subtitle:
          "L'École Supérieure de Génie Informatique (ESGI) offre le cadre académique et collaboratif au sein duquel ce projet est né pour accompagner le quotidien des promotions.",
        metrics: [
          { value: 'ESGI REIMS', label: 'École Supérieure de Génie Informatique' },
          { value: 'ENTRAIDE', label: 'Centralisation des devoirs & évaluations' },
          { value: 'PRATIQUE', label: 'Application concrète du génie logiciel' }
        ],
        sections: [
          {
            title: 'Un Outil Pensé pour la Vie Étudiante',
            desc: "Répondre à un besoin concret d'organisation sur les serveurs Discord des étudiants de l'école.",
            bullets: [
              'Suivi partagé des devoirs et évaluations par classe et par matière',
              'Rappels automatiques quotidiens avant chaque échéance importante',
              'Adaptation multi-classes via les rôles Discord du campus'
            ]
          },
          {
            title: 'Terrain d’Expérimentation Technique',
            desc: 'Mise en pratique des compétences développées en cursus informatique : Python, bases de données relationnelles, API et rendu 3D.',
            bullets: [
              'Développement modulaire en Python avec persistance SQLite',
              'Intégration d’API asynchrones avec aiohttp (API Thomson)'
            ]
          }
        ]
      }
    },
    {
      label: 'pillar-3',
      color: '#22e4ff',
      tag: 'COLLAB 04 // ASSISTANTS IA',
      tabLabel: '04 // GEMINI & CLAUDE',
      title: 'Gemini & Claude — Assistance IA',
      detail: {
        subtitle:
          "Deux assistants IA ont accompagné l'équipe : Gemini sur la conception de l'expérience web 3D, Claude sur la relecture du code, le contenu et le restylage du site.",
        metrics: [
          { value: 'THREE.JS & GLSL', label: 'Gemini : shaders, scène 3D & post-traitement' },
          { value: 'GSAP SCROLL', label: 'Gemini : chorégraphie caméra & transitions' },
          { value: 'CODE & CONTENU', label: 'Claude : relecture, cohérence & restylage' }
        ],
        sections: [
          {
            title: 'Gemini — Environnement 3D & Shaders',
            desc: 'Assistance dans le développement de la scène WebGL et des effets atmosphériques.',
            bullets: [
              'Création des shaders personnalisés (Voie Lactée, mer de nuages et nuages barbe à papa)',
              'Génération procédurale de la mégalopole futuriste, de l’éco-parc et de la flotte spatiale',
              'Calibration du post-traitement (ACES Filmic, UnrealBloomPass) et instanciation GPU'
            ]
          },
          {
            title: 'Gemini — Navigation Interactive & Résolution de Bugs',
            desc: "Aide au pilotage de la caméra au défilement et à l'intégration des fiches de documentation.",
            bullets: [
              'Synchronisation des trajectoires de caméra avec GSAP ScrollTrigger',
              'Mise en place du raycasting 3D et de l’interface modale néon plein écran',
              'Diagnostic et correction des erreurs WebGL et d’ergonomie'
            ]
          },
          {
            title: 'Claude — Relecture, Contenu & Restylage',
            desc: "Aide à la vérification du code et à la mise en cohérence du site avec le vrai fonctionnement du bot.",
            bullets: [
              'Comparaison du contenu du site avec le code du bot pour corriger les informations',
              'Aide à la rédaction des présentations de l’équipe et des fonctionnalités',
              'Accompagnement sur le restylage de l’interface et le lancement du projet'
            ]
          }
        ]
      }
    },
    {
      label: 'pillar-4',
      color: '#ff3dbb',
      tag: 'COLLAB 05 // REMERCIEMENTS',
      tabLabel: '05 // MERCI',
      title: 'Remerciements Généraux',
      detail: {
        subtitle:
          "Un merci particulier à toutes les personnes qui ont rendu ce projet possible, inspiré ses fonctionnalités ou contribué à son évolution au quotidien.",
        metrics: [
          { value: 'THOMAS PIERSON', label: 'Direction pédagogique & inspiration API Thomson' },
          { value: 'GRÉGOIRE', label: 'Accès API & support technique' },
          { value: 'ÉQUIPE & ÉLÈVES', label: 'Encadrement pédagogique & retours terrain' }
        ],
        sections: [
          {
            title: 'Thomas Pierson & l’Équipe Pédagogique',
            desc: "Reconnaissance envers l'encadrement pédagogique de l'ESGI Reims pour son accompagnement et la dynamique de promo.",
            bullets: [
              'Thomas Pierson (directeur pédagogique à l’ESGI Reims) : inspiration directe de l’API Thomson et des commandes communautaires associées',
              'L’équipe pédagogique : suivi, conseils et cadre d’apprentissage tout au long de l’année'
            ]
          },
          {
            title: 'Grégoire & les Élèves de l’ESGI',
            desc: 'Merci aux contributeurs techniques et aux étudiants qui font vivre le bot sur Discord.',
            bullets: [
              'Grégoire : un grand merci pour l’accès à l’API ayant permis d’intégrer les fonctionnalités externes du bot',
              'Les élèves : merci pour leurs tests, leurs retours et l’utilisation quotidienne du bot pour les devoirs et évaluations'
            ]
          }
        ]
      }
    }
  ];

  towerDossiers.forEach((p, idx) => {
    const surfaceR = getFacadeRadiusAtY(tower, p.y, maxHalfWidth * 0.65);
    p.panelRadius = surfaceR + 3.0;
    p.camRadius = p.panelRadius + 14.5;

    const group = createHoloPanel(p.tag, p.title, p.lines, p.color, 9.4, 4.7);
    group.position.set(
      Math.sin(p.angle) * p.panelRadius,
      p.y,
      Math.cos(p.angle) * p.panelRadius
    );
    group.lookAt(0, p.y, 0);
    group.rotateY(Math.PI);

    if (group.screenMesh) {
      group.screenMesh.userData.dossierType = 'tower';
      group.screenMesh.userData.dossierIndex = idx;
      interactivePanelScreens.push(group.screenMesh);
    }

    scene.add(group);
    panelGroups.push(group);
  });

  // =========================================================================
  // GESTION DE LA PAGE PLEIN ÉCRAN NÉON (TOUR + PILIERS SOUTERRAINS)
  // =========================================================================
  const panelPrompt = document.getElementById('panel-prompt');
  const promptTag = document.getElementById('prompt-tag');
  const promptTitle = document.getElementById('prompt-title');
  const promptOpenBtn = document.getElementById('prompt-open-btn');

  const panelModal = document.getElementById('panel-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalScrollArea = document.getElementById('modal-scroll-area');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterClose = document.getElementById('modal-footer-close');
  const modalTabsContainer = document.getElementById('modal-tabs');

  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalAccordions = document.getElementById('modal-accordions');

  let activeDossier = null;
  let isModalOpen = false;

  function renderModalContent(type, idx) {
    const collection = type === 'underground' ? undergroundDossiers : towerDossiers;
    const item = collection[idx];
    if (!item) return;

    panelModal.style.setProperty('--modal-accent', item.color);
    modalTag.textContent = item.tag;
    modalTitle.textContent = item.title;
    modalSubtitle.textContent = item.detail.subtitle;

    modalTabsContainer.innerHTML = collection
      .map(
        (entry, i) => `
        <button type="button" class="modal-tab ${i === idx ? 'active' : ''}" data-type="${type}" data-idx="${i}">
          ${entry.tabLabel}
        </button>
      `
      )
      .join('');

    modalTabsContainer.querySelectorAll('.modal-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        renderModalContent(tab.dataset.type, Number(tab.dataset.idx));
      });
    });

    modalMetrics.innerHTML = item.detail.metrics
      .map(
        (m) => `
        <div class="metric-card">
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `
      )
      .join('');

    modalAccordions.innerHTML = item.detail.sections
      .map(
        (sec, sIdx) => `
        <div class="neon-dropdown ${sIdx === 0 ? 'expanded' : ''}">
          <button type="button" class="dropdown-trigger" aria-expanded="${sIdx === 0}">
            <div class="dropdown-trigger-left">
              <span class="dropdown-index">0${sIdx + 1}</span>
              <span class="dropdown-heading">${sec.title}</span>
            </div>
            <span class="dropdown-chevron">▼</span>
          </button>
          <div class="dropdown-body">
            <p class="dropdown-desc">${sec.desc}</p>
            <ul class="dropdown-list">
              ${sec.bullets.map((b) => `<li>${b}</li>`).join('')}
            </ul>
            ${sec.code ? `<pre class="dropdown-code">${sec.code}</pre>` : ''}
          </div>
        </div>
      `
      )
      .join('');

    modalAccordions.querySelectorAll('.dropdown-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.neon-dropdown');
        const isExpanded = parent.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', String(isExpanded));
      });
    });

    modalScrollArea.scrollTop = 0;
  }

  function openDossierModal(type, idx) {
    renderModalContent(type, idx);
    isModalOpen = true;
    panelModal.classList.add('open');
    panelModal.setAttribute('aria-hidden', 'false');
    panelPrompt.classList.remove('visible');
    companion.hide();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeDossierModal() {
    if (!isModalOpen) return;
    isModalOpen = false;
    panelModal.classList.remove('open');
    panelModal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  const DOOR_PROMPT = { color: '#e8c27a', tag: 'ENTRÉE // ASCENSEUR', title: 'Entrer dans la tour' };
  const promptActionLabel = promptOpenBtn.querySelector('kbd + span');

  // Le bouton de l'invite ouvre le dossier… ou fait entrer dans la tour
  function activatePrompt() {
    if (!activeDossier) return;
    if (activeDossier.type === 'door') enterTower();
    else openDossierModal(activeDossier.type, activeDossier.index);
  }

  promptOpenBtn.addEventListener('click', activatePrompt);

  modalCloseBtn.addEventListener('click', closeDossierModal);
  modalFooterClose.addEventListener('click', closeDossierModal);
  modalBackdrop.addEventListener('click', closeDossierModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isModalOpen && !insideTower && activeDossier) {
      e.preventDefault();
      activatePrompt();
    } else if (e.key === 'Escape' && isModalOpen) {
      e.preventDefault();
      closeDossierModal();
    }
  });

  // =========================================================================
  // CAMÉRA & TIMELINE GSAP SCROLLTRIGGER
  // =========================================================================
  const camState = {
    mode: 0,
    angle: 0,
    radius: 28,
    camY: targetHeight + 11.1,
    targetY: targetHeight + 11.0,
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
        document.body.classList.toggle('in-underground', isUnderground);
        if (hud) hud.classList.toggle('hidden', currentY < 2);
        if (pillarNav) pillarNav.classList.toggle('visible', isUnderground);
        document.body.classList.toggle('pillars-open', isUnderground);

        if (hudZone && !isUnderground) {
          if (currentY > 116) hudZone.textContent = 'CITADELLE ORBITALE';
          else if (currentY > 90) hudZone.textContent = towerDossiers[0].zoneName;
          else if (currentY > 64) hudZone.textContent = towerDossiers[1].zoneName;
          else if (currentY > 36) hudZone.textContent = towerDossiers[2].zoneName;
          else if (currentY > 17) hudZone.textContent = towerDossiers[3].zoneName;
          else hudZone.textContent = 'PARC NÉON & PASSERELLES';
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

  towerDossiers.forEach((p, idx) => {
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
  // On s'arrête face à la porte d'entrée, puis la descente continue
  .to(camState, {
    angle: Math.PI * 2.0,
    radius: doorSpot.z + 6.8,
    camY: doorSpot.bottom + 1.5,
    targetY: doorSpot.bottom + 1.45,
    duration: 1.8,
    ease: 'power1.inOut'
  })
  .to(camState, { duration: 0.4 })
  .addLabel('tower-door')
  .to(camState, { duration: 0.4 })
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

  // =========================================================================
  // ENTRÉE DANS LA TOUR : la porte s'ouvre, lumière blanche, puis l'ascenseur
  // =========================================================================
  let insideTower = false;
  let novaTeleport = false;
  const doorAnim = { open: 0, glow: 0, dolly: 0 };
  const doorFront = new THREE.Vector3();
  const doorLook = new THREE.Vector3();
  const flashEl = document.createElement('div');
  flashEl.id = 'white-flash';
  document.body.appendChild(flashEl);
  const flash = (on) => new Promise((resolve) => {
    flashEl.classList.toggle('on', on);
    setTimeout(resolve, 650);
  });
  const elevator = createElevator3D(scene, {
    say: (text, duration) => companion.say(text, duration),
    onExit: exitTower
  });
  if (import.meta.env.DEV) window.__tour = { tl, elevator, entranceDoor, doorSpot };

  function lockPage(locked) {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    document.body.style.overflow = locked ? 'hidden' : '';
    document.body.classList.toggle('in-elevator', locked);
  }

  async function enterTower() {
    if (insideTower || isModalOpen) return;
    insideTower = true;
    // Le clic sur la porte autorise le son (musique d'ascenseur)
    elevator.unlockAudio();
    cancelMagnet();
    lockPage(true);
    panelPrompt.classList.remove('visible');
    if (tooltip) tooltip.classList.remove('visible');
    document.body.style.cursor = 'default';
    // Les battants s'ouvrent, la lumière blanche jaillit, on avance dedans
    await new Promise((resolve) => gsap.to(doorAnim, { open: 1, duration: 0.9, ease: 'power2.inOut', onComplete: resolve }));
    gsap.to(doorAnim, { glow: 1, duration: 0.7, ease: 'power1.out' });
    gsap.to(doorAnim, { dolly: 1, duration: 1.5, ease: 'power2.in' });
    await new Promise((resolve) => setTimeout(resolve, 950));
    await flash(true);
    elevator.enter();
    novaTeleport = true;
    await flash(false);
  }

  async function exitTower() {
    await flash(true);
    elevator.leave();
    gsap.killTweensOf(doorAnim);
    doorAnim.open = 0;
    doorAnim.glow = 0;
    doorAnim.dolly = 0;
    novaTeleport = true;
    lockPage(false);
    // On ressort devant la porte (même si on est arrivé par la connexion Discord)
    const st = tl.scrollTrigger;
    if (st && tl.labels['tower-door'] !== undefined) {
      window.scrollTo(0, st.start + (tl.labels['tower-door'] / tl.duration()) * (st.end - st.start));
    }
    insideTower = false;
    activeDossier = null;
    await flash(false);
    companion.say('De retour dehors ! 🌃', 3000);
  }

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
    if (isProgrammaticScroll || isModalOpen) return;
    clearTimeout(magnetTimeout);

    magnetTimeout = setTimeout(() => {
      const st = tl.scrollTrigger;
      if (!st) return;

      const currentProgress = st.progress;
      const magnetLabels = ['panel-0', 'panel-1', 'panel-2', 'panel-3', 'tower-door'];
      let nearestProg = null;
      let minDist = 0.022;

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

  function navigateToLabel(labelName, onArrival = null) {
    const st = tl.scrollTrigger;
    if (!st || tl.labels[labelName] === undefined) {
      if (onArrival) onArrival();
      return;
    }
    cancelMagnet();
    const progress = tl.labels[labelName] / tl.duration();
    const targetScroll = st.start + progress * (st.end - st.start);
    const scrollProxy = { y: window.scrollY };
    isProgrammaticScroll = true;
    magnetTween = gsap.to(scrollProxy, {
      y: targetScroll,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => window.scrollTo(0, scrollProxy.y),
      onComplete: () => {
        isProgrammaticScroll = false;
        magnetTween = null;
        if (onArrival) onArrival();
      },
      onInterrupt: () => {
        isProgrammaticScroll = false;
      }
    });
  }

  pillarButtons.forEach((btn) => {
    btn.addEventListener('click', () => navigateToLabel(btn.dataset.label));
  });

  // =========================================================================
  // RAYCASTING RÉCURSIF (PANNEAUX TOUR + ÉTIQUETTES SOUTERRAINES)
  // =========================================================================
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tooltip = document.getElementById('pillar-tooltip');
  let pointerDownPos = { x: 0, y: 0 };
  const mouseTarget = { x: 0, y: 0 };
  const mouseCurrent = { x: 0, y: 0 };

  function resolveUndergroundLabel(hitObject) {
    let obj = hitObject;
    while (obj) {
      if (obj.userData && obj.userData.label) {
        return obj.userData.label;
      }
      obj = obj.parent;
    }
    return null;
  }

  window.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isModalOpen || (insideTower && !elevator.active) || elevator.coversScreen) {
      document.body.style.cursor = 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }

    pointer.set(mouseTarget.x, mouseTarget.y);
    raycaster.setFromCamera(pointer, camera);

    // Dans l'ascenseur : seuls les boutons du tableau réagissent
    if (elevator.active) {
      document.body.style.cursor = elevator.pointerMove(raycaster) ? 'pointer' : 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }

    if (camState.mode < 0.35) {
      const onPlanet = isPointerOnPlanet(raycaster);
      const onDoor = entranceDoor.isHit(raycaster);
      entranceDoor.setHover(onDoor);
      const panelHits = raycaster.intersectObjects(interactivePanelScreens, true);
      document.body.style.cursor = onPlanet || onDoor || panelHits.length > 0 ? 'pointer' : 'default';
      if (tooltip) {
        if (onDoor) tooltip.textContent = 'CLIQUEZ POUR ENTRER DANS LA TOUR';
        else tooltip.textContent = isDay ? 'CLIQUEZ : PASSER EN MODE NUIT' : 'CLIQUEZ : PASSER EN MODE JOUR';
        tooltip.classList.toggle('visible', onPlanet || onDoor);
      }
      return;
    }

    if (camState.mode < 0.72) {
      document.body.style.cursor = 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }

    const hits = raycaster.intersectObjects(underground.interactivePillarObjects, true);
    const hoveredLabel = hits.length > 0 ? resolveUndergroundLabel(hits[0].object) : null;
    document.body.style.cursor = hoveredLabel ? 'pointer' : 'default';
    if (tooltip) {
      tooltip.textContent = 'CLIQUEZ POUR INSPECTER LE PILIER';
      tooltip.classList.toggle('visible', Boolean(hoveredLabel));
    }
  });

  window.addEventListener('pointerup', (e) => {
    if (isModalOpen) return;
    // Clic sur un bouton de l'interface : ne pas le traiter aussi comme un clic dans la 3D
    if (e.target.closest && e.target.closest('button, nav, a, #companion-bubble')) return;
    const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (moveDist > 6) return;

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    if (elevator.active) {
      if (elevator.coversScreen) return;
      if (companion.isHit(raycaster)) {
        companion.say('Bip ! Choisis ton étage sur le tableau à droite 👉', 3000);
        return;
      }
      elevator.click(raycaster);
      return;
    }
    if (insideTower) return;

    // Clic sur NOVA : il répond
    if (companion.isHit(raycaster)) {
      companion.say(NOVA_POKES[Math.floor(Math.random() * NOVA_POKES.length)]);
      return;
    }

    if (camState.mode < 0.35) {
      if (isPointerOnPlanet(raycaster)) {
        toggleDayNight();
        return;
      }
      if (entranceDoor.isHit(raycaster)) {
        enterTower();
        return;
      }
      const panelHits = raycaster.intersectObjects(interactivePanelScreens, true);
      if (panelHits.length > 0 && panelHits[0].object.userData.dossierIndex !== undefined) {
        openDossierModal('tower', panelHits[0].object.userData.dossierIndex);
        return;
      }
    }

    if (camState.mode >= 0.72) {
      const hits = raycaster.intersectObjects(underground.interactivePillarObjects, true);
      const clickedLabel = hits.length > 0 ? resolveUndergroundLabel(hits[0].object) : null;
      if (clickedLabel) {
        const uIdx = undergroundDossiers.findIndex((d) => d.label === clickedLabel);
        if (tooltip) tooltip.classList.remove('visible');
        navigateToLabel(clickedLabel, () => {
          if (uIdx !== -1) openDossierModal('underground', uIdx);
        });
      }
    }
  });

  // =========================================================================
  // NOVA : INACTIVITÉ ET MESSAGES SELON CE QUE L'ON REGARDE
  // =========================================================================
  const openHint = IS_TOUCH ? 'Touche « Ouvrir le dossier »' : 'Appuie sur Entrée';
  const NOVA_MESSAGES = {
    top: 'Salut, moi c\'est NOVA ! 🛰️ Fais défiler pour descendre la tour, je te suis.',
    'panel-0': `Les fonctionnalités du bot sont ici. ${openHint} pour en savoir plus !`,
    'panel-1': 'Toutes les commandes slash du bot, à découvrir dans ce dossier.',
    'panel-2': 'Côté technique : Python, SQLite… le cœur du bot ⚙️',
    'panel-3': 'Comment installer le bot, et qui l\'a fabriqué 👀',
    city: 'La ville basse ! Attention aux voitures volantes 🚗',
    'tower-door': 'La porte de la tour ! Clique dessus pour entrer et prendre l’ascenseur jusqu’à ton étage 🛗',
    descent: 'Accroche-toi, on plonge sous la tour !',
    underground: 'Le sous-sol : l\'équipe derrière le projet 🛠️',
    'pillar-0': 'Bryan alias JMG : le Big Boss 😎',
    'pillar-1': "Yanis, c'est mon Papa 👨‍👦 Ma Maman ? C'est Claude 🤖💜",
    'pillar-2': 'L\'ESGI Reims, l\'école où tout a commencé 🎓',
    'pillar-3': 'Gemini et Maman Claude, les assistants IA… un peu comme moi 🤖',
    'pillar-4': 'Pense à aller voir ce site : https://thomsonpic-v2.grgoire.fr'
  };
  const NOVA_IDLE = [
    'Tu fais quoi ? 👀',
    'Hé ! Tu t\'es endormi ? 😴',
    'Tu es toujours là ? On continue la visite ?'
  ];
  const NOVA_POKES = [
    'Hé, ça chatouille ! 😆',
    'Je suis NOVA, ton guide de la tour 🛰️',
    'Bip boup ! Tout va bien ici.',
    'Tu veux que je te montre le sous-sol ? Fais défiler !'
  ];

  // Inactivité : défilement, touches, toucher et clics comptent comme une activité
  let lastActivity = performance.now();
  let wanderAnnounced = false;
  let idleAsked = false;
  const markActivity = () => {
    lastActivity = performance.now();
    wanderAnnounced = false;
    idleAsked = false;
  };
  ['scroll', 'wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown'].forEach((evt) =>
    window.addEventListener(evt, markActivity, { passive: true })
  );

  let lastContextKey = null;
  let contextSince = 0;
  let spokenKey = null;
  let prevCamY = null;
  let verticalSpeed = 0;

  // Repère de la visite sur lequel la caméra est arrivée (pilier, panneau…).
  // On se base sur la timeline, comme la barre des piliers : pas sur la distance,
  // sinon la caméra « frôle » d'autres piliers en passant et NOVA se trompe.
  function arrivedLabel(names) {
    const t = tl.time();
    let best = null;
    let bestGap = Infinity;
    names.forEach((name) => {
      const at = tl.labels[name];
      if (at === undefined) return;
      const gap = Math.abs(at - t);
      if (gap < bestGap) {
        bestGap = gap;
        best = name;
      }
    });
    return bestGap < 0.45 ? best : null;
  }
  const PILLAR_LABELS = ['underground-overview', 'pillar-0', 'pillar-1', 'pillar-2', 'pillar-3', 'pillar-4'];
  const PANEL_LABELS = ['panel-0', 'panel-1', 'panel-2', 'panel-3'];

  function currentContextKey(currentY) {
    if (camState.mode > 0.85) {
      const label = arrivedLabel(PILLAR_LABELS);
      if (label === 'underground-overview') return 'underground';
      return label; // null pendant le trajet entre deux piliers : NOVA attend
    }
    if (camState.mode > 0.1) return 'descent';
    const panel = arrivedLabel(PANEL_LABELS);
    if (panel) return panel;
    if (arrivedLabel(['tower-door'])) return 'tower-door';
    if (currentY > 116) return 'top';
    if (currentY < 17) return 'city';
    return null;
  }

  function updateCompanion(delta, elapsed, currentY) {
    const idle = (performance.now() - lastActivity) / 1000;

    // Vitesse verticale lissée (monte / descend)
    if (prevCamY !== null && delta > 0) {
      const vy = (currentY - prevCamY) / delta;
      verticalSpeed = THREE.MathUtils.lerp(verticalSpeed, vy, 1 - Math.exp(-delta * 4));
    }
    prevCamY = currentY;

    companion.update(delta, elapsed, {
      progress: tl.scrollTrigger ? tl.scrollTrigger.progress : 0,
      idle,
      portrait: camera.aspect < 1,
      verticalSpeed,
      teleport: novaTeleport
    });
    novaTeleport = false;
    if (insideTower) return; // pas de commentaires pendant l'entrée dans la tour

    // 10 s sans bouger : il part se balader ; 1 min : il demande ce qu'on fait
    if (idle > 10 && !wanderAnnounced) {
      wanderAnnounced = true;
      companion.say('Je fais un petit tour en attendant… 🌀', 3000);
    }
    if (idle > 60 && !idleAsked) {
      idleAsked = true;
      companion.say(NOVA_IDLE[Math.floor(Math.random() * NOVA_IDLE.length)], 6000);
    }

    // Message selon ce que l'on regarde
    const key = currentContextKey(currentY);
    if (key !== lastContextKey) {
      lastContextKey = key;
      contextSince = elapsed;
    }
    // Il parle une fois arrivé (vue stable 0,5 s), et seulement si l'endroit
    // a changé depuis son dernier message (il reparle si on revient plus tard).
    if (key && key !== spokenKey && elapsed - contextSince > 0.5 && NOVA_MESSAGES[key]) {
      const msg = NOVA_MESSAGES[key];
      companion.say(msg, msg.includes('http') ? 9000 : 4500);
      spokenKey = key;
    }
  }

  const clock = new THREE.Clock();
  const orbitalCamVec = new THREE.Vector3();
  const orbitalTargetVec = new THREE.Vector3();
  const underCamVec = new THREE.Vector3();
  const underTargetVec = new THREE.Vector3();
  const pillarWorldPos = new THREE.Vector3();

  // Lissage de la caméra : absorbe les à-coups de la molette
  const smoothCamPos = new THREE.Vector3();
  const smoothCamTarget = new THREE.Vector3();
  let camInitialized = false;

  // Qualité adaptative : si l'ordinateur n'arrive pas à suivre, on baisse la
  // résolution puis on coupe le halo lumineux, pour rester fluide.
  let perfFrames = 0;
  let perfTime = 0;
  function adaptQuality(delta) {
    perfFrames++;
    perfTime += delta;
    if (perfTime < 2) return;
    const fps = perfFrames / perfTime;
    perfFrames = 0;
    perfTime = 0;
    if (fps >= 45) return;
    if (currentPixelRatio > 1) {
      currentPixelRatio = Math.max(1, currentPixelRatio - 0.25);
      renderer.setPixelRatio(currentPixelRatio);
      composer.setPixelRatio(currentPixelRatio);
      resizeGlows();
    } else if (bloomPass.enabled && fps < 30) {
      bloomPass.enabled = false;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const rawDelta = clock.getDelta();
    const delta = Math.min(rawDelta, 0.05);
    const elapsed = clock.elapsedTime;

    // Fiche ouverte : elle couvre tout l'écran, inutile de calculer la 3D derrière
    if (isModalOpen) return;
    // Page de l'étage ouverte : elle couvre l'écran, la 3D se met en pause
    if (elevator.coversScreen) return;

    if (document.visibilityState === 'visible' && rawDelta < 0.5) adaptQuality(rawDelta);

    // Jour/nuit : reflets adaptés et halo lumineux plus discret en plein jour
    const day = DAY_UNIFORM.value;
    scene.environment = day > 0.5 ? dayEnvironment : nightEnvironment;
    bloomPass.strength = THREE.MathUtils.lerp(0.55, 0.22, day);
    bloomPass.threshold = THREE.MathUtils.lerp(1.05, 1.6, day);
    if (themeHint) {
      themeHint.classList.toggle('visible', atmosphere.isPlanetVisible() && camState.mode < 0.1 && camState.camY > 112);
    }

    mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
    mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;

    // Dans la cabine d'ascenseur : caméra fixe face aux portes
    if (elevator.active) {
      const pose = elevator.cameraPose(camera.aspect, elapsed, mouseCurrent);
      camera.position.copy(pose.position);
      camera.lookAt(pose.target);
      smoothCamPos.copy(pose.position);
      smoothCamTarget.copy(pose.target);
      elevator.update(delta);
      companion.update(delta, elapsed, {
        progress: 0, idle: 0, portrait: camera.aspect < 1, verticalSpeed: 0, cabin: true, teleport: novaTeleport
      });
      novaTeleport = false;
      scene.updateMatrixWorld();
      glows.update(elapsed);
      composer.render();
      return;
    }

    const currentY = THREE.MathUtils.lerp(camState.camY, camState.uy, camState.mode);
    atmosphere.update(delta, elapsed, currentY, camState.mode);
    ecoCity.update(delta, elapsed);
    spaceFleet.update(delta, elapsed);
    skyPlatform.update(elapsed);
    underground.update(delta, elapsed);

    const parallaxAngle = camState.angle + mouseCurrent.x * 0.06;
    const parallaxY = mouseCurrent.y * 1.1;

    orbitalCamVec.set(
      Math.sin(parallaxAngle) * camState.radius,
      camState.camY + parallaxY,
      Math.cos(parallaxAngle) * camState.radius
    );
    orbitalTargetVec.set(0, camState.targetY, 0);

    underCamVec.set(
      camState.ux + mouseCurrent.x * 0.85,
      camState.uy + mouseCurrent.y * 0.55,
      camState.uz
    );
    underTargetVec.set(camState.utx, camState.uty, camState.utz);

    const desiredCamPos = orbitalCamVec.lerp(underCamVec, camState.mode);
    const finalTarget = orbitalTargetVec.lerp(underTargetVec, camState.mode);
    // Porte d'entrée : ouverture, lumière blanche et caméra qui avance dedans
    entranceDoor.setState(doorAnim.open, doorAnim.glow);
    entranceDoor.update(elapsed);
    if (doorAnim.dolly > 0) {
      doorFront.set(entranceDoor.center.x, entranceDoor.center.y + 0.1, entranceDoor.center.z + 0.4);
      doorLook.set(entranceDoor.center.x, entranceDoor.center.y, entranceDoor.center.z - 6);
      desiredCamPos.lerp(doorFront, doorAnim.dolly);
      finalTarget.lerp(doorLook, doorAnim.dolly);
    }
    if (!camInitialized) {
      smoothCamPos.copy(desiredCamPos);
      smoothCamTarget.copy(finalTarget);
      camInitialized = true;
    } else {
      const follow = 1 - Math.exp(-delta * 8);
      smoothCamPos.lerp(desiredCamPos, follow);
      smoothCamTarget.lerp(finalTarget, follow);
    }
    camera.position.copy(smoothCamPos);
    camera.lookAt(smoothCamTarget);

    let nextDossier = null;

    if (camState.mode < 0.25) {
      let minPanelDist = 19.5;
      panelGroups.forEach((grp, idx) => {
        const dist = camera.position.distanceTo(grp.position);
        const targetScale = dist < 17.5 ? 1.04 : 1.0;
        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.12);

        if (dist < minPanelDist) {
          minPanelDist = dist;
          nextDossier = { type: 'tower', index: idx };
        }
      });
      // Devant la porte d'entrée, c'est elle qui compte (même si un panneau est proche)
      if (!insideTower && camera.position.distanceTo(entranceDoor.center) < 9) {
        nextDossier = { type: 'door', index: 0 };
      }
    } else if (camState.mode > 0.85) {
      let minPillarDist = 16.5;
      underground.pillarsData.forEach((p, idx) => {
        pillarWorldPos.set(p.pos.x, p.pos.y + 5.0, p.pos.z);
        const dist = camera.position.distanceTo(pillarWorldPos);
        if (dist < minPillarDist && undergroundDossiers[idx]) {
          minPillarDist = dist;
          nextDossier = { type: 'underground', index: idx };
        }
      });
    }

    const changed =
      (nextDossier === null) !== (activeDossier === null) ||
      (nextDossier &&
        activeDossier &&
        (nextDossier.type !== activeDossier.type || nextDossier.index !== activeDossier.index));

    if (changed) {
      activeDossier = nextDossier;
      if (activeDossier && !isModalOpen && !insideTower) {
        const source =
          activeDossier.type === 'door'
            ? DOOR_PROMPT
            : activeDossier.type === 'underground'
              ? undergroundDossiers[activeDossier.index]
              : towerDossiers[activeDossier.index];
        if (promptActionLabel) {
          promptActionLabel.textContent = activeDossier.type === 'door' ? 'ENTRER' : 'OUVRIR LE DOSSIER';
        }
        panelPrompt.style.setProperty('--prompt-accent', source.color);
        promptTag.textContent = source.tag;
        promptTitle.textContent = source.title.toUpperCase();
        panelPrompt.classList.add('visible');
        panelPrompt.setAttribute('aria-hidden', 'false');
      } else {
        panelPrompt.classList.remove('visible');
        panelPrompt.setAttribute('aria-hidden', 'true');
      }
    }

    updateCompanion(delta, elapsed, currentY);

    // Positions des halos lumineux mises à jour juste avant le rendu
    scene.updateMatrixWorld();
    glows.update(elapsed);

    composer.render();
  }
  animate();
  hideLoader();

  const returnParam = new URLSearchParams(window.location.search).get('ascenseur');
  if (returnParam) {
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    const st = tl.scrollTrigger;
    if (st && tl.labels['tower-door'] !== undefined) {
      window.scrollTo(0, st.start + (tl.labels['tower-door'] / tl.duration()) * (st.end - st.start));
    }
    insideTower = true;
    lockPage(true);
    novaTeleport = true;
    elevator.enter({
      greeting: returnParam === 'refus' ? 'Connexion annulée… Tu peux réessayer quand tu veux 🙂' : undefined
    });
  }
},
(event) => {
  // Progression du téléchargement du modèle 3D
  if (event.lengthComputable && loaderFill) {
    const pct = Math.round((event.loaded / event.total) * 100);
    loaderFill.style.width = `${pct}%`;
    loaderText.textContent = `CHARGEMENT DE LA TOUR… ${pct} %`;
  }
},
(error) => {
  console.error('Erreur de chargement du modèle 3D :', error);
  showLoadError('Impossible de charger la tour 3D. Vérifie ta connexion puis recharge la page.');
});

window.addEventListener('resize', () => {
  fitCameraToScreen();
  atmosphere.setPlanetLayout(camera.aspect < 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  resizeGlows();
});