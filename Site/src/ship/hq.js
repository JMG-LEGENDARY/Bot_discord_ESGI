import * as THREE from 'three';
import gsap from 'gsap';
import './places.css';
import { createRoom } from './room-kit.js';
import { getSchedule, getMissions, getTasks, setTaskDone, getAnnouncements, weekStart } from './data/hq-api.js';
import { esc } from '../api.js';

// =========================================================================
// LE QUARTIER GÉNÉRAL
// Au centre, une table de commandement projette un globe holographique
// entouré d'orbites (une balise par mission). Autour, l'interface
// holographique : emploi du temps, missions, tâches et infos importantes.
// Les données viennent de data/hq-api.js (démo tant que l'API n'existe pas).
// =========================================================================

const KIND_LABEL = { cours: 'COURS', td: 'TD', tp: 'TP', projet: 'PROJET', exam: 'ÉVALUATION' };

// Écran holographique des consoles : courbes, barres et lignes de texte
function consoleScreenTexture(color, seed) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 140;
  const g = c.getContext('2d');
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  g.strokeStyle = color;
  g.fillStyle = color;
  g.globalAlpha = 0.9;
  g.lineWidth = 2;
  g.strokeRect(3, 3, 250, 134);
  g.globalAlpha = 0.25;
  for (let x = 16; x < 250; x += 20) g.fillRect(x, 10, 1, 120);
  g.globalAlpha = 0.9;
  g.beginPath();
  for (let x = 12; x < 150; x += 6) {
    const y = 70 + Math.sin(x * 0.08 + seed) * 22 + (rnd() - 0.5) * 10;
    if (x === 12) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  g.stroke();
  for (let i = 0; i < 6; i++) {
    const h = 15 + rnd() * 55;
    g.fillRect(166 + i * 13, 120 - h, 8, h);
  }
  g.globalAlpha = 0.6;
  for (let i = 0; i < 3; i++) g.fillRect(12, 104 + i * 10, 40 + rnd() * 90, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function holoMaterial(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(1.6),
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  });
}

export function createHQ({ ship, root, onBack }) {
  const room = createRoom({
    renderer: ship.renderer,
    accent: '#a78bfa',
    accentHdr: [1.0, 0.55, 2.2],
    layout: 'hq',
    camPos: new THREE.Vector3(0, 3.1, 7.6),
    camTarget: new THREE.Vector3(0, 2.0, 0),
    novaAnchor: { x: 0.95, y: -0.6, z: -2.6, scale: 0.28 }
  });
  const { scene, group } = room;

  // ---- Table de commandement ----
  const table = new THREE.Group();
  group.add(table);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.5, 1.0, 64), room.metal);
  base.position.y = 0.5;
  table.add(base);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.1, 0.12, 64), room.dark);
  top.position.y = 1.06;
  table.add(top);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.24, 0.03, 8, 128), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.28, 1.1), toneMapped: false }));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.12;
  table.add(rim);
  const plate = new THREE.Mesh(new THREE.CircleGeometry(1.9, 64), holoMaterial('#8b5cf6', 0.25));
  plate.rotation.x = -Math.PI / 2;
  plate.position.y = 1.13;
  table.add(plate);

  // ---- Globe holographique ----
  const holo = new THREE.Group();
  holo.position.y = 2.55;
  table.add(holo);
  const globeWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.0, 3)),
    new THREE.LineBasicMaterial({ color: new THREE.Color(0.5, 0.35, 1.4), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  holo.add(globeWire);
  const globeCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.97, 48, 24),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vV = normalize(-mv.xyz); vP = position;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          float fres = pow(1.0 - abs(dot(vN, vV)), 2.5);
          // Continents en points lumineux
          float lat = asin(clamp(vP.y, -1.0, 1.0));
          float lon = atan(vP.z, vP.x) + uTime * 0.15;
          vec2 g = vec2(lon * 18.0, lat * 18.0);
          float dots = smoothstep(0.32, 0.0, length(fract(g) - 0.5));
          float land = step(0.15, sin(lon * 3.0) * cos(lat * 4.0 + 1.0) + sin(lon * 5.0 + lat * 2.0) * 0.5);
          vec3 col = vec3(0.35, 0.25, 1.1) * fres * 1.4 + vec3(0.3, 0.9, 1.3) * dots * land * 0.6;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })
  );
  holo.add(globeCore);
  // Orbites et balises de mission
  const orbits = [];
  [[1.45, 0.4, '#22e4ff'], [1.75, -0.6, '#ff3dbb'], [2.05, 1.1, '#a78bfa']].forEach(([r, tilt, col], i) => {
    const pivot = new THREE.Group();
    pivot.rotation.x = Math.PI / 2 + tilt * 0.4;
    pivot.rotation.z = tilt;
    holo.add(pivot);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.008, 4, 160), holoMaterial(col, 0.7));
    pivot.add(ring);
    const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.09), holoMaterial(col));
    pivot.add(marker);
    orbits.push({ pivot, marker, r, speed: 0.35 + i * 0.18, phase: i * 2 });
  });
  // Faisceau de projection
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.7, 1.4, 48, 1, true),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'varying vec2 vUv; void main(){ gl_FragColor = vec4(vec3(0.45,0.3,1.2) * (1.0 - vUv.y) * 0.12, 1.0); }'
    })
  );
  beam.position.y = 1.85;
  table.add(beam);
  // Halos
  room.glows.add(holo, new THREE.Vector3(0, 0, 0), [0.6, 0.4, 1.6], 1.2);

  // Consoles en arc autour de la table
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const c = new THREE.Group();
    c.position.set(Math.sin(a) * 5.4, 0, Math.cos(a) * 5.4);
    c.lookAt(0, 0, 0);
    group.add(c);
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 0.6), room.metal);
    desk.position.y = 0.45;
    c.add(desk);
    const screenMat = holoMaterial('#ffffff', 0.55);
    screenMat.map = consoleScreenTexture(i % 2 ? '#22e4ff' : '#a78bfa', i * 7 + 3);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.71), screenMat);
    screen.position.set(0, 1.45, 0.05);
    screen.rotation.x = -0.25;
    c.add(screen);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.02, 0.02), room.led);
    bar.position.set(0, 0.92, 0.31);
    c.add(bar);
  }

  // ---- Interface holographique ----
  const ui = document.createElement('section');
  ui.className = 'place place-hq';
  ui.setAttribute('aria-label', 'Quartier général');
  ui.innerHTML = `
    <header class="place-head">
      <button type="button" class="place-back">↩ <span>RETOUR AU COCKPIT</span></button>
      <div class="place-title">
        <span class="place-kicker">DESTINATION // MISSIONS</span>
        <h1>QUARTIER GÉNÉRAL</h1>
      </div>
      <span class="place-badge" hidden>DONNÉES DE DÉMONSTRATION · API NON CONNECTÉE</span>
    </header>
    <div class="place-grid hq-grid">
      <article class="holo-panel hq-schedule">
        <h2><span>01</span> EMPLOI DU TEMPS</h2>
        <div class="hq-week" role="tablist" aria-label="Jours de la semaine"></div>
        <ol class="hq-slots" aria-live="polite"></ol>
      </article>
      <article class="holo-panel hq-missions">
        <h2><span>02</span> MISSIONS</h2>
        <ul class="hq-mission-list"></ul>
        <h2 class="hq-sub"><span>03</span> TÂCHES</h2>
        <ul class="hq-task-list"></ul>
      </article>
      <article class="holo-panel hq-infos">
        <h2><span>04</span> INFORMATIONS IMPORTANTES</h2>
        <div class="hq-info-list"></div>
      </article>
    </div>`;
  root.appendChild(ui);
  ui.querySelector('.place-back').addEventListener('click', onBack);
  const badge = ui.querySelector('.place-badge');
  const weekEl = ui.querySelector('.hq-week');
  const slotsEl = ui.querySelector('.hq-slots');
  const missionsEl = ui.querySelector('.hq-mission-list');
  const tasksEl = ui.querySelector('.hq-task-list');
  const infosEl = ui.querySelector('.hq-info-list');

  let schedule = [];
  let dayIndex = Math.min(4, Math.max(0, (new Date().getDay() + 6) % 7));

  const fmtDue = (iso) => {
    const d = new Date(`${iso}T12:00:00`);
    const days = Math.round((d - new Date()) / 86400000);
    const label = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
    return { label, days };
  };

  function renderDay() {
    weekEl.innerHTML = schedule
      .map((d, i) => `<button type="button" role="tab" aria-selected="${i === dayIndex}" data-i="${i}">${esc(d.day.slice(0, 3).toUpperCase())}</button>`)
      .join('');
    const slots = schedule[dayIndex]?.slots || [];
    slotsEl.innerHTML = slots.length
      ? slots
          .map(
            (s) => `
        <li class="hq-slot kind-${esc(s.kind)}">
          <span class="hq-time">${esc(s.start)}<i>${esc(s.end)}</i></span>
          <span class="hq-slot-body"><b>${esc(s.title)}</b><small>${esc(s.place || '')}</small></span>
          <span class="hq-kind">${esc(KIND_LABEL[s.kind] || s.kind || '')}</span>
        </li>`
          )
          .join('')
      : '<li class="hq-empty">Aucun créneau ce jour-là.</li>';
  }
  weekEl.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]');
    if (!b) return;
    dayIndex = Number(b.dataset.i);
    renderDay();
  });

  function renderTasks(tasks) {
    tasksEl.innerHTML = tasks
      .map(
        (t) => `
      <li><label class="hq-task ${t.done ? 'done' : ''}">
        <input type="checkbox" data-id="${esc(t.id)}" ${t.done ? 'checked' : ''} />
        <span class="hq-check" aria-hidden="true"></span>${esc(t.label)}
      </label></li>`
      )
      .join('');
  }
  tasksEl.addEventListener('change', async (e) => {
    const box = e.target.closest('input[data-id]');
    if (!box) return;
    box.closest('.hq-task').classList.toggle('done', box.checked);
    try {
      await setTaskDone(box.dataset.id, box.checked);
    } catch {
      box.checked = !box.checked;
      box.closest('.hq-task').classList.toggle('done', box.checked);
    }
  });

  async function load() {
    slotsEl.innerHTML = '<li class="hq-empty">Réception des données…</li>';
    try {
      const [s, m, t, a] = await Promise.all([getSchedule(weekStart()), getMissions(), getTasks(), getAnnouncements()]);
      badge.hidden = !(s.demo || m.demo || t.demo || a.demo);
      schedule = s.items;
      renderDay();
      missionsEl.innerHTML = m.items
        .map((x) => {
          const due = fmtDue(x.due);
          const urgent = due.days <= 2;
          return `<li class="hq-mission prio-${esc(x.priority)} ${urgent ? 'urgent' : ''}">
            <span class="hq-mission-dot" aria-hidden="true"></span>
            <span class="hq-mission-body"><b>${esc(x.title)}</b><small>${esc(x.module || '')}</small></span>
            <span class="hq-due">${esc(due.label)}<i>${due.days <= 0 ? 'aujourd’hui' : `J-${due.days}`}</i></span>
          </li>`;
        })
        .join('');
      renderTasks(t.items);
      infosEl.innerHTML = a.items
        .map((x) => `<div class="hq-info level-${esc(x.level)}"><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`)
        .join('');
    } catch {
      slotsEl.innerHTML = '<li class="hq-empty">Liaison avec le QG impossible. Réessaie plus tard.</li>';
    }
  }

  // ---- Animation ----
  const clock = { t: 0 };
  function update(delta, t) {
    clock.t = t;
    holo.rotation.y = t * 0.25;
    globeCore.material.uniforms.uTime.value = t;
    holo.position.y = 2.55 + Math.sin(t * 1.2) * 0.05;
    orbits.forEach((o) => {
      const a = t * o.speed + o.phase;
      o.marker.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
      o.marker.rotation.y = t * 2;
    });
    room.update(delta, t);
  }

  function enter() {
    ui.classList.add('open');
    load();
    room.playEntry();
    gsap.fromTo(ui.querySelectorAll('.holo-panel'), { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, delay: 0.5, ease: 'power3.out' });
    setTimeout(() => room.nova.say('Bienvenue au QG ! Ici on suivra l’emploi du temps et les missions 🛰️', 5000), 1400);
  }

  function leave() {
    ui.classList.remove('open');
  }

  return { scene, camera: room.camera, update, enter, leave, resize: room.fitCamera };
}
