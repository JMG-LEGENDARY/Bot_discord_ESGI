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
  0.32,
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
      ],
      detail: {
        subtitle:
          "Un écosystème complet pensé pour centraliser la vie étudiante sur Discord : planification des rendus, attribution instantanée des promos et mini-économie communautaire.",
        metrics: [
          { value: '100% AUTO', label: 'Alertes J-7, J-3 et J-1 avant chaque rendu' },
          { value: 'MULTI-PROMO', label: 'Isolation complète des classes & filières' },
          { value: '24/7 ACTIF', label: 'Tâches planifiées asynchrones sans latence' }
        ],
        sections: [
          {
            title: 'Système de Rappels Devoirs & Examens',
            desc: 'Chaque délégué ou étudiant autorisé peut enregistrer une échéance directement depuis Discord. Le bot planifie des notifications ciblées uniquement vers le rôle de la classe concernée.',
            bullets: [
              'Création via formulaire natif Discord (matière, titre, date limite, description)',
              'Rappels automatiques intelligents à 7 jours, 48 heures et le matin même',
              'Tableau récapitulatif filtrable par semaine ou par matière (/devoirs)'
            ],
            code: `/devoir ajouter matiere:"Maths" titre:"TD Congruences" date:"28/11 18:00"`
          },
          {
            title: 'Attribution Dynamique des Rôles & Classes',
            desc: 'Fini la configuration manuelle des permissions à chaque rentrée : un panneau interactif paginé permet aux étudiants de rejoindre leur campus, année et spécialisation.',
            bullets: [
              'Menus déroulants paginés supportant un grand nombre de filières (AL, SRC, SI, IABD...)',
              'Synchronisation immédiate des salons textuels et vocaux privés',
              'Protection anti-doublon et mise à jour instantanée lors d’un changement de groupe'
            ]
          },
          {
            title: 'Boutique Virtuelle & Économie Étudiante',
            desc: 'Les membres accumulent des crédits au fil de leur activité sur le serveur pour débloquer des récompenses cosmétiques, rôles spéciaux ou bonus communautaires.',
            bullets: [
              'Solde persistant stocké en base relationnelle avec historique des transactions',
              'Catalogue configurable par serveur avec stock limité ou objets permanents',
              'Classement hebdomadaire des membres les plus actifs'
            ]
          }
        ]
      }
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
      ],
      detail: {
        subtitle:
          "Une ergonomie zéro friction reposant exclusivement sur les composants natifs modernes de Discord : modales, boutons persistants, embeds riches et autocomplétion.",
        metrics: [
          { value: '< 50 MS', label: 'Temps de réponse moyen des interactions' },
          { value: 'ZERO SPAM', label: 'Réponses éphémères visibles uniquement par l’auteur' },
          { value: '100% SLASH', label: 'Autocomplétion intégrée sur chaque paramètre' }
        ],
        sections: [
          {
            title: 'Modales Interactives & Formulaires Natifs',
            desc: 'Plutôt que de taper des commandes longues avec une syntaxe complexe, l’utilisateur remplit une fenêtre modale claire directement dans l’interface Discord.',
            bullets: [
              'Validation côté bot des formats de dates et des champs obligatoires',
              'Messages d’erreur pédagogiques en éphémère sans polluer le salon',
              'Pré-remplissage intelligent lors de l’édition d’un devoir existant'
            ]
          },
          {
            title: 'Vues Paginées & Navigation par Boutons',
            desc: 'Les listes longues (devoirs à venir, catalogue boutique, annuaire des rôles) sont découpées en pages fluides contrôlées par boutons.',
            bullets: [
              'Navigation Précédent / Suivant avec compteur de page dynamique',
              'Verrouillage par utilisateur pour éviter que deux étudiants n’interfèrent sur la même vue',
              'Expiration propre des composants après inactivité pour économiser la RAM'
            ]
          },
          {
            title: 'Notifications Ciblées & Embeds Structurés',
            desc: 'Chaque annonce adopte un code couleur cohérent selon son niveau d’urgence (information, devoir standard, partiel critique).',
            bullets: [
              'Mentions chirurgicales uniquement sur les rôles abonnés',
              'Horodatage dynamique Discord (<t:timestamp:R>) adapté au fuseau horaire de chacun',
              'Mode silencieux configurable pendant les périodes de vacances'
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
      title: 'Architecture & Code',
      zoneName: 'NIVEAU 03 — STACK TECHNIQUE',
      lines: [
        'Développé en Python & portage Rust',
        'Base de données SQLite optimisée',
        'Hébergement autonome 24/7 sur Raspberry Pi'
      ],
      detail: {
        subtitle:
          "Une double implémentation combinant la rapidité de prototypage de Python (disnake / discord.py) et les performances bas-niveau d'un portage complet en Rust (poise / serenity / sqlx).",
        metrics: [
          { value: 'PYTHON + RUST', label: 'Architecture hybride & portage haute performance' },
          { value: 'SQLITE WAL', label: 'Persistance locale ultra-rapide sans serveur lourd' },
          { value: '< 35 MO RAM', label: 'Empreinte mémoire optimisée pour SBC' }
        ],
        sections: [
          {
            title: 'Cœur Python Modulaire (Cogs & Services)',
            desc: 'La version principale repose sur une séparation stricte entre les commandes Discord (Cogs), la logique métier et la couche d’accès aux données.',
            bullets: [
              'Chargement dynamique des modules (devoirs, rôles, boutique, utilitaires)',
              'Boucles asynchrones asyncio pour la vérification périodique des échéances',
              'Gestion centralisée des exceptions et journalisation structurée'
            ],
            code: `Bot_discord_ESGI/\n├── cogs/          # Commandes slash & vues interactives\n├── database/      # Requêtes SQLite & migrations\n├── services/      # Planificateur de rappels & logique métier\n└── main.py        # Point d'entrée & orchestration`
          },
          {
            title: 'Portage Natif en Rust (Serenity + Poise + SQLx)',
            desc: 'Réécriture complète pensée pour la sûreté mémoire, la concurrence sans GIL et une consommation minimale sur matériel embarqué.',
            bullets: [
              'Vérification des requêtes SQL à la compilation grâce aux macros sqlx',
              'Binaire statique léger déployable sans environnement virtuel Python',
              'Typage fort sur l’ensemble des états partagés et modales Discord'
            ],
            code: `#[poise::command(slash_command, guild_only)]\npub async fn rappels(ctx: Context<'_>) -> Result<(), Error> {\n    // Requête SQLx asynchrone compilée & vérifiée\n    Ok(())\n}`
          },
          {
            title: 'Hébergement Autonome 24/7 sur Raspberry Pi Zero 2 W',
            desc: 'Le bot tourne en continu sur un nano-ordinateur dédié relié par réseau privé Tailscale, garantissant une disponibilité constante sans frais cloud.',
            bullets: [
              'Exécution en arrière-plan via service systemd avec redémarrage automatique',
              'Mode WAL (Write-Ahead Logging) sur SQLite pour préserver la carte SD',
              'Administration sécurisée à distance via SSH sur mesh Tailscale'
            ]
          }
        ]
      }
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
      ],
      detail: {
        subtitle:
          "Un projet collaboratif développé par des étudiants en informatique de l'ESGI Reims, ouvert aux contributions, reproductible sur n'importe quel serveur Discord.",
        metrics: [
          { value: 'OPEN-SOURCE', label: 'Code transparent, documenté et extensible' },
          { value: 'MULTI-SERVEUR', label: 'Isolation des données par guild_id Discord' },
          { value: 'SYSTEMD CI', label: 'Mise à jour et relance propre en une commande' }
        ],
        sections: [
          {
            title: 'Architecture Multi-Serveur Prête à l’Emploi',
            desc: 'Chaque serveur Discord dispose de sa propre configuration isolée (salons d’annonces, rôles, catalogue boutique, fuseau horaire).',
            bullets: [
              'Initialisation guidée via commande /setup réservée aux administrateurs',
              'Aucune donnée partagée entre différents campus ou serveurs',
              'Variables d’environnement sécurisées (.env) pour les tokens API'
            ]
          },
          {
            title: 'Déploiement & Supervision Systemd',
            desc: 'Intégration native Linux permettant au bot de démarrer automatiquement avec la machine et de récupérer instantanément en cas de coupure réseau.',
            bullets: [
              'Unité systemd dédiée avec politique Restart=always',
              'Consultation des logs en temps réel via journalctl -u esgi-bot -f',
              'Sauvegardes automatisées de la base SQLite'
            ],
            code: `[Unit]\nDescription=ESGI Discord Bot Service\nAfter=network-online.target\n\n[Service]\nWorkingDirectory=/home/jmg/Bot_discord_ESGI\nExecStart=/usr/bin/python3 main.py\nRestart=always\nRestartSec=5`
          },
          {
            title: 'Collaborer & Contribuer au Projet',
            desc: 'Pensé comme un terrain d’apprentissage réel autour du génie logiciel, des bases de données, du réseau et de Rust.',
            bullets: [
              'Structure claire facilitant l’ajout de nouveaux cogs ou commandes',
              'Conventions de nommage strictes et séparation logique/présentation',
              'Idéal pour tester en conditions réelles le développement asynchrone'
            ]
          }
        ]
      }
    }
  ];

  panelsData.forEach((p, idx) => {
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
      group.screenMesh.userData.panelIndex = idx;
      interactivePanelScreens.push(group.screenMesh);
    }

    scene.add(group);
    panelGroups.push(group);
  });

  // =========================================================================
  // GESTION DE LA PAGE PLEIN ÉCRAN NÉON & DES MENUS DÉROULANTS
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
  const modalTabs = document.querySelectorAll('.modal-tab');

  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalAccordions = document.getElementById('modal-accordions');

  let activePanelIndex = null;
  let isModalOpen = false;

  function renderModalContent(idx) {
    const p = panelsData[idx];
    if (!p) return;

    panelModal.style.setProperty('--modal-accent', p.color);
    modalTag.textContent = p.tag;
    modalTitle.textContent = p.title;
    modalSubtitle.textContent = p.detail.subtitle;

    modalTabs.forEach((tab) => {
      tab.classList.toggle('active', Number(tab.dataset.idx) === idx);
    });

    modalMetrics.innerHTML = p.detail.metrics
      .map(
        (m) => `
        <div class="metric-card">
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `
      )
      .join('');

    modalAccordions.innerHTML = p.detail.sections
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

    // Gestion du clic sur chaque menu déroulant
    modalAccordions.querySelectorAll('.dropdown-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.neon-dropdown');
        const isExpanded = parent.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', String(isExpanded));
      });
    });

    modalScrollArea.scrollTop = 0;
  }

  function openPanelModal(idx) {
    if (idx === null || idx === undefined || !panelsData[idx]) return;
    renderModalContent(idx);
    isModalOpen = true;
    panelModal.classList.add('open');
    panelModal.setAttribute('aria-hidden', 'false');
    panelPrompt.classList.remove('visible');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closePanelModal() {
    if (!isModalOpen) return;
    isModalOpen = false;
    panelModal.classList.remove('open');
    panelModal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  promptOpenBtn.addEventListener('click', () => {
    if (activePanelIndex !== null) openPanelModal(activePanelIndex);
  });

  modalCloseBtn.addEventListener('click', closePanelModal);
  modalFooterClose.addEventListener('click', closePanelModal);
  modalBackdrop.addEventListener('click', closePanelModal);

  modalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      renderModalContent(Number(tab.dataset.idx));
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isModalOpen && activePanelIndex !== null) {
      e.preventDefault();
      openPanelModal(activePanelIndex);
    } else if (e.key === 'Escape' && isModalOpen) {
      e.preventDefault();
      closePanelModal();
    }
  });

  // =========================================================================
  // CAMÉRA & TIMELINE GSAP SCROLLTRIGGER
  // =========================================================================
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
    if (isProgrammaticScroll || isModalOpen) return;
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

  // =========================================================================
  // RAYCASTING (PANNEAUX 3D + PILIERS SOUTERRAINS) & PARALLAXE SOURIS
  // =========================================================================
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tooltip = document.getElementById('pillar-tooltip');
  let pointerDownPos = { x: 0, y: 0 };
  const mouseTarget = { x: 0, y: 0 };
  const mouseCurrent = { x: 0, y: 0 };

  window.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isModalOpen) {
      document.body.style.cursor = 'default';
      return;
    }

    pointer.set(mouseTarget.x, mouseTarget.y);
    raycaster.setFromCamera(pointer, camera);

    if (camState.mode < 0.35) {
      const panelHits = raycaster.intersectObjects(interactivePanelScreens, false);
      document.body.style.cursor = panelHits.length > 0 ? 'pointer' : 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }

    if (camState.mode < 0.72) {
      document.body.style.cursor = 'default';
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }

    const hits = raycaster.intersectObjects(underground.interactivePillarObjects, false);
    const hovered = hits.length > 0;
    document.body.style.cursor = hovered ? 'pointer' : 'default';
    if (tooltip) tooltip.classList.toggle('visible', hovered);
  });

  window.addEventListener('pointerup', (e) => {
    if (isModalOpen) return;
    const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (moveDist > 6) return;

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    // Clic direct sur un panneau holographique 3D
    if (camState.mode < 0.35) {
      const panelHits = raycaster.intersectObjects(interactivePanelScreens, false);
      if (panelHits.length > 0 && panelHits[0].object.userData.panelIndex !== undefined) {
        openPanelModal(panelHits[0].object.userData.panelIndex);
        return;
      }
    }

    // Clic sur un pilier souterrain
    if (camState.mode >= 0.72) {
      const hits = raycaster.intersectObjects(underground.interactivePillarObjects, false);
      if (hits.length > 0 && hits[0].object.userData.label) {
        navigateToLabel(hits[0].object.userData.label);
      }
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

    // Détection de proximité avec les panneaux holographiques pour l'invite [ ENTRÉE ]
    let detectedIdx = null;
    let minPanelDist = 19.5;

    panelGroups.forEach((grp, idx) => {
      const dist = camera.position.distanceTo(grp.position);
      const targetScale = dist < 17.5 ? 1.04 : 1.0;
      grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.12);

      if (camState.mode < 0.25 && dist < minPanelDist) {
        minPanelDist = dist;
        detectedIdx = idx;
      }
    });

    if (detectedIdx !== activePanelIndex) {
      activePanelIndex = detectedIdx;
      if (activePanelIndex !== null && !isModalOpen) {
        const p = panelsData[activePanelIndex];
        panelPrompt.style.setProperty('--prompt-accent', p.color);
        promptTag.textContent = p.tag;
        promptTitle.textContent = p.title.toUpperCase();
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