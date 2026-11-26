import * as THREE from 'three';
import gsap from 'gsap';
import './places.css';
import { createRoom } from './room-kit.js';
import { CATEGORIES, getResources, getSamples } from './data/lab-api.js';
import { esc } from '../api.js';

// =========================================================================
// LE LABORATOIRE
// Au fond, des cuves de confinement où flottent les échantillons ramassés
// (les futures notes). Au centre, une paillasse projette une double hélice
// holographique. Interface : bibliothèque de ressources pédagogiques et
// bouton « VOIR LES ÉCHANTILLONS RAMASSÉS ».
// =========================================================================

const FORMAT_ICON = { PDF: '📄', Diapos: '🖥️', ZIP: '🗜️', Web: '🌐' };

export function createLab({ ship, root, onBack }) {
  const room = createRoom({
    renderer: ship.renderer,
    accent: '#ff3dbb',
    accentHdr: [2.2, 0.35, 1.5],
    layout: 'lab',
    camPos: new THREE.Vector3(0, 2.6, 6.8),
    camTarget: new THREE.Vector3(0, 2.1, -1.5),
    novaAnchor: { x: 1.0, y: -0.55, z: -2.6, scale: 0.28 }
  });
  const { scene, group } = room;

  // ---- Cuves de confinement (en arc, au fond) ----
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8f0ff,
    roughness: 0.06,
    metalness: 0,
    transparent: true,
    opacity: 0.16,
    envMapIntensity: 0.6,
    depthWrite: false
  });
  const tubes = [];
  const sampleColors = ['#22e4ff', '#ff3dbb', '#a78bfa', '#3dffa8', '#ffd166', '#22e4ff', '#ff3dbb'];
  const TUBES = 7;
  for (let i = 0; i < TUBES; i++) {
    const a = Math.PI + (i - (TUBES - 1) / 2) * 0.32;
    const tube = new THREE.Group();
    tube.position.set(Math.sin(a) * 6.3, 0, Math.cos(a) * 6.3);
    group.add(tube);
    const col = new THREE.Color(sampleColors[i]);
    const baseCap = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.5, 32), room.metal);
    baseCap.position.y = 0.25;
    tube.add(baseCap);
    const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.62, 0.4, 32), room.metal);
    topCap.position.y = 3.6;
    tube.add(topCap);
    // Liquide lumineux avec bulles qui montent
    const liquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2.9, 32, 1, true),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 }, uColor: { value: col.clone().multiplyScalar(0.9) }, uBoost: { value: 0 }, uSeed: { value: i * 1.7 } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: `
          uniform float uTime; uniform vec3 uColor; uniform float uBoost; uniform float uSeed;
          varying vec2 vUv;
          float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
          void main() {
            vec2 g = vec2(vUv.x * 18.0, vUv.y * 10.0 - uTime * (0.6 + hash(vec2(floor(vUv.x * 18.0), uSeed)) * 0.8));
            vec2 cell = floor(g);
            float r = hash(cell + uSeed);
            float bubble = r > 0.82 ? smoothstep(0.3, 0.05, length(fract(g) - 0.5)) : 0.0;
            float glow = 0.22 + 0.25 * vUv.y + bubble * 0.9;
            float waves = 0.85 + 0.15 * sin(vUv.y * 30.0 - uTime * 3.0 + vUv.x * 6.28);
            gl_FragColor = vec4(uColor * glow * waves * (0.55 + uBoost * 0.9), 1.0);
          }
        `
      })
    );
    liquid.position.y = 1.95;
    tube.add(liquid);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2.9, 32, 1, true), glassMat);
    glass.position.y = 1.95;
    tube.add(glass);
    // L'échantillon : cristal qui flotte et tourne
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.22, 0),
      new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 1.2, metalness: 0.2, roughness: 0.15 })
    );
    crystal.scale.y = 1.6;
    crystal.position.y = 2.0;
    tube.add(crystal);
    [0.52, 3.38].forEach((y) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.02, 6, 48), new THREE.MeshBasicMaterial({ color: col.clone().multiplyScalar(1.4), toneMapped: false }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      tube.add(ring);
    });
    room.glows.add(crystal, new THREE.Vector3(0, 0, 0), [col.r * 1.4, col.g * 1.4, col.b * 1.4], 0.9);
    tubes.push({ crystal, liquid, phase: i * 0.9 });
  }

  // ---- Paillasse et double hélice holographique ----
  const bench = new THREE.Group();
  group.add(bench);
  const benchBase = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.95, 1.3), room.metal);
  benchBase.position.y = 0.475;
  bench.add(benchBase);
  const benchTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 1.45), room.dark);
  benchTop.position.y = 0.99;
  bench.add(benchTop);
  const benchLed = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.02, 0.02), room.led);
  benchLed.position.set(0, 0.94, 0.73);
  bench.add(benchLed);
  const emitter = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.06, 32), room.metal);
  emitter.position.y = 1.06;
  bench.add(emitter);

  const HELIX = 90;
  const helixGeo = new THREE.BufferGeometry();
  const hp = new Float32Array(HELIX * 2 * 3);
  const hc = new Float32Array(HELIX * 2 * 3);
  const cA = new THREE.Color(0.3, 1.4, 2.0);
  const cB = new THREE.Color(2.0, 0.4, 1.4);
  for (let i = 0; i < HELIX; i++) {
    const y = (i / HELIX) * 2.4;
    const a = i * 0.35;
    hp.set([Math.cos(a) * 0.45, y, Math.sin(a) * 0.45], i * 6);
    hp.set([Math.cos(a + Math.PI) * 0.45, y, Math.sin(a + Math.PI) * 0.45], i * 6 + 3);
    hc.set([cA.r, cA.g, cA.b], i * 6);
    hc.set([cB.r, cB.g, cB.b], i * 6 + 3);
  }
  helixGeo.setAttribute('position', new THREE.BufferAttribute(hp, 3));
  helixGeo.setAttribute('color', new THREE.BufferAttribute(hc, 3));
  const helix = new THREE.Group();
  helix.position.y = 1.2;
  bench.add(helix);
  const helixPoints = new THREE.Points(
    helixGeo,
    new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  helix.add(helixPoints);
  // Barreaux entre les deux brins
  const rungs = new THREE.LineSegments(
    (() => {
      const g = new THREE.BufferGeometry();
      const pts = [];
      for (let i = 0; i < HELIX; i += 3) pts.push(hp[i * 6], hp[i * 6 + 1], hp[i * 6 + 2], hp[i * 6 + 3], hp[i * 6 + 4], hp[i * 6 + 5]);
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      return g;
    })(),
    new THREE.LineBasicMaterial({ color: new THREE.Color(0.6, 0.5, 1.4), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  helix.add(rungs);
  room.glows.add(helix, new THREE.Vector3(0, 1.2, 0), [0.8, 0.5, 1.6], 1.0);

  // ---- Interface ----
  const ui = document.createElement('section');
  ui.className = 'place place-lab';
  ui.setAttribute('aria-label', 'Laboratoire');
  ui.innerHTML = `
    <header class="place-head">
      <button type="button" class="place-back">↩ <span>RETOUR AU COCKPIT</span></button>
      <div class="place-title">
        <span class="place-kicker">DESTINATION // LABORATOIRE</span>
        <h1>RESSOURCES PÉDAGOGIQUES</h1>
      </div>
      <span class="place-badge" hidden>DONNÉES DE DÉMONSTRATION · API NON CONNECTÉE</span>
    </header>
    <div class="lab-grid">
      <article class="holo-panel lab-library">
        <h2><span>01</span> BIBLIOTHÈQUE</h2>
        <div class="lab-tools">
          <div class="lab-tabs" role="tablist" aria-label="Catégories">
            ${CATEGORIES.map((c, i) => `<button type="button" role="tab" data-cat="${c.id}" aria-selected="${i === 0}">${esc(c.label)}</button>`).join('')}
          </div>
          <input class="lab-search" type="search" placeholder="Rechercher un cours, un document…" aria-label="Rechercher une ressource" />
        </div>
        <ul class="lab-list" aria-live="polite"></ul>
      </article>
      <div class="lab-side">
        <button type="button" class="lab-samples-btn" aria-expanded="false"><i aria-hidden="true">🧪</i> VOIR LES ÉCHANTILLONS RAMASSÉS</button>
        <article class="holo-panel lab-samples" hidden>
          <h2><span>02</span> ÉCHANTILLONS RAMASSÉS</h2>
          <div class="lab-samples-body"></div>
        </article>
      </div>
    </div>`;
  root.appendChild(ui);
  ui.querySelector('.place-back').addEventListener('click', onBack);
  const badge = ui.querySelector('.place-badge');
  const list = ui.querySelector('.lab-list');
  const search = ui.querySelector('.lab-search');
  const tabs = ui.querySelector('.lab-tabs');
  const samplesBtn = ui.querySelector('.lab-samples-btn');
  const samplesPanel = ui.querySelector('.lab-samples');
  const samplesBody = ui.querySelector('.lab-samples-body');
  let category = 'tout';
  let searchTimer = null;
  const boost = { v: 0 };

  async function loadResources() {
    try {
      const r = await getResources({ category, q: search.value });
      badge.hidden = !r.demo;
      list.innerHTML = r.items.length
        ? r.items
            .map(
              (x) => `
          <li class="lab-card">
            <span class="lab-card-head"><span>${esc((CATEGORIES.find((c) => c.id === x.category) || {}).label || x.category)}</span><span>${FORMAT_ICON[x.format] || '📁'} ${esc(x.format)}</span></span>
            <b>${esc(x.title)}</b>
            <small>${esc(x.module)} · ${esc(x.size)}</small>
            ${
              x.url
                ? `<a class="lab-open" href="${esc(x.url)}" ${x.url.startsWith('#') ? '' : 'target="_blank" rel="noopener noreferrer"'}>OUVRIR ↗</a>`
                : '<span class="lab-open" aria-disabled="true">BIENTÔT DISPONIBLE</span>'
            }
          </li>`
            )
            .join('')
        : '<li class="hq-empty">Aucune ressource trouvée.</li>';
    } catch {
      list.innerHTML = '<li class="hq-empty">Bibliothèque injoignable. Réessaie plus tard.</li>';
    }
  }
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-cat]');
    if (!b) return;
    category = b.dataset.cat;
    tabs.querySelectorAll('button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    loadResources();
  });
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(loadResources, 220);
  });

  async function showSamples() {
    const open = samplesPanel.hidden;
    samplesPanel.hidden = !open;
    samplesBtn.setAttribute('aria-expanded', String(open));
    // Les cuves s'illuminent quand on consulte les échantillons
    gsap.to(boost, { v: open ? 1 : 0, duration: 0.8 });
    if (!open) return;
    gsap.fromTo(samplesPanel, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' });
    samplesBody.innerHTML = '<div class="hq-empty">Analyse des cuves…</div>';
    const s = await getSamples().catch(() => ({ connected: false, items: [] }));
    if (!s.connected) {
      samplesBody.innerHTML = `
        <div class="lab-locked">
          <div class="lab-lock-icon" aria-hidden="true">🔒</div>
          <b>Canal des notes pas encore relié</b>
          <p>Chaque échantillon de ces cuves deviendra une note dès que l’API sera branchée : matière, note, coefficient et date.</p>
          <div class="lab-skeleton" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>`;
      room.nova.say('Les cuves sont prêtes, il manque juste le câble vers les notes 🔌', 4500);
      return;
    }
    samplesBody.innerHTML = s.items.length
      ? `<table class="lab-sample-table">
          <thead><tr><th>MATIÈRE</th><th>ÉCHANTILLON</th><th>NOTE</th><th>COEF</th></tr></thead>
          <tbody>${s.items
            .map((n) => `<tr><td>${esc(n.module)}</td><td>${esc(n.label)}</td><td>${esc(n.value)} / ${esc(n.max ?? 20)}</td><td>${esc(n.coef ?? 1)}</td></tr>`)
            .join('')}</tbody>
        </table>`
      : '<div class="hq-empty">Aucun échantillon pour le moment.</div>';
  }
  samplesBtn.addEventListener('click', showSamples);

  // ---- Animation ----
  function update(delta, t) {
    tubes.forEach((tb, i) => {
      tb.crystal.rotation.y = t * 0.8 + tb.phase;
      tb.crystal.position.y = 2.0 + Math.sin(t * 1.3 + tb.phase) * 0.18;
      tb.liquid.material.uniforms.uTime.value = t;
      tb.liquid.material.uniforms.uBoost.value = boost.v * (0.6 + 0.4 * Math.sin(t * 4 + i));
      tb.crystal.material.emissiveIntensity = 1.0 + boost.v * 1.5;
    });
    helix.rotation.y = t * 0.6;
    room.update(delta, t);
  }

  function enter() {
    ui.classList.add('open');
    loadResources();
    room.playEntry();
    gsap.fromTo(ui.querySelectorAll('.lab-library, .lab-samples-btn'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, delay: 0.5, ease: 'power3.out' });
    setTimeout(() => room.nova.say('Bienvenue au labo ! Les cours sont dans la bibliothèque 📚', 5000), 1400);
  }

  function leave() {
    ui.classList.remove('open');
  }

  return { scene, camera: room.camera, update, enter, leave, resize: room.fitCamera };
}
