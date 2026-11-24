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
import { buildSpaceFleet } from './ships.js';
import { createHoloPanel, buildSkyPlatform } from './panels.js';
import { buildUndergroundMasterclass } from './underground.js';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xbae6fd, 0.0014);

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
  0.3,
  0.25,
  1.28
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

const targetHeight = 130;
const atmosphere = createAtmosphere(scene, targetHeight);
const ecoCity = buildEcoCyberCity(scene, targetHeight);
const spaceFleet = buildSpaceFleet(scene, targetHeight);
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

  // =========================================================================
  // 4 PANNEAUX DE LA TOUR (STRICTEMENT BASÉS SUR LE README)
  // =========================================================================
  const towerDossiers = [
    {
      y: 104,
      angle: Math.PI * 0.5,
      color: '#00f3ff',
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
      color: '#ff007f',
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
      color: '#00f3ff',
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
      color: '#a855f7',
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
              'Créer et activer un environnement virtuel : python3 -m venv .venv puis source .venv/bin/activate',
              'Installer les dépendances Python : pip install -r requirements.txt',
              'Lancer le bot : python main.py'
            ],
            code: `python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npython main.py`
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
      color: '#00f3ff',
      tag: 'COLLAB 01 // DÉVELOPPEUR PRINCIPAL',
      tabLabel: '01 // JMG',
      title: 'JMG — Développeur Principal',
      detail: {
        subtitle:
          "Bryan (JMG), étudiant en 1re année de Bachelor Informatique à l'ESGI Reims, porte l'essentiel du développement du bot Discord et de cette expérience web 3D.",
        metrics: [
          { value: 'ESGI REIMS', label: '1re année de Bachelor Informatique' },
          { value: 'FULL-STACK', label: 'Architecture Python, SQLite & interface 3D' },
          { value: '24/7 HOSTING', label: 'Déploiement autonome & administration' }
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
      color: '#38bdf8',
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
      color: '#10b981',
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
              'Intégration d’API asynchrones et déploiement continu'
            ]
          }
        ]
      }
    },
    {
      label: 'pillar-3',
      color: '#ff007f',
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
      color: '#a855f7',
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

  promptOpenBtn.addEventListener('click', () => {
    if (activeDossier) {
      openDossierModal(activeDossier.type, activeDossier.index);
    }
  });

  modalCloseBtn.addEventListener('click', closeDossierModal);
  modalFooterClose.addEventListener('click', closeDossierModal);
  modalBackdrop.addEventListener('click', closeDossierModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isModalOpen && activeDossier) {
      e.preventDefault();
      openDossierModal(activeDossier.type, activeDossier.index);
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
      scrub: 1.1,
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

        if (hudZone && !isUnderground) {
          if (currentY > 116) hudZone.textContent = 'CITADELLE ORBITALE';
          else if (currentY > 90) hudZone.textContent = towerDossiers[0].zoneName;
          else if (currentY > 64) hudZone.textContent = towerDossiers[1].zoneName;
          else if (currentY > 36) hudZone.textContent = towerDossiers[2].zoneName;
          else if (currentY > 17) hudZone.textContent = towerDossiers[3].zoneName;
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
    if (isProgrammaticScroll || isModalOpen) return;
    clearTimeout(magnetTimeout);

    magnetTimeout = setTimeout(() => {
      const st = tl.scrollTrigger;
      if (!st) return;

      const currentProgress = st.progress;
      const magnetLabels = ['panel-0', 'panel-1', 'panel-2', 'panel-3'];
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

    if (isModalOpen) {
      document.body.style.cursor = 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }

    pointer.set(mouseTarget.x, mouseTarget.y);
    raycaster.setFromCamera(pointer, camera);

    if (camState.mode < 0.35) {
      const panelHits = raycaster.intersectObjects(interactivePanelScreens, true);
      document.body.style.cursor = panelHits.length > 0 ? 'pointer' : 'default';
      if (tooltip) tooltip.classList.remove('visible');
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
    if (tooltip) tooltip.classList.toggle('visible', Boolean(hoveredLabel));
  });

  window.addEventListener('pointerup', (e) => {
    if (isModalOpen) return;
    const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (moveDist > 6) return;

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    if (camState.mode < 0.35) {
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

  const clock = new THREE.Clock();
  const orbitalCamVec = new THREE.Vector3();
  const orbitalTargetVec = new THREE.Vector3();
  const underCamVec = new THREE.Vector3();
  const underTargetVec = new THREE.Vector3();
  const pillarWorldPos = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
    mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;

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

    camera.position.lerpVectors(orbitalCamVec, underCamVec, camState.mode);
    const finalTarget = orbitalTargetVec.lerp(underTargetVec, camState.mode);
    camera.lookAt(finalTarget);

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
      if (activeDossier && !isModalOpen) {
        const source =
          activeDossier.type === 'underground'
            ? undergroundDossiers[activeDossier.index]
            : towerDossiers[activeDossier.index];
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