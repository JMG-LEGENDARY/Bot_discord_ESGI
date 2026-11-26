import { apiGet, apiSend, ENDPOINTS, isConnected } from './api-config.js';

// =========================================================================
// DONNÉES DU QUARTIER GÉNÉRAL
// Chaque fonction renvoie { demo: boolean, items: [...] }.
// demo = true : aucune API branchée, contenu d'exemple générique (aucune
// vraie information personnelle).
// =========================================================================

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

/** Lundi de la semaine d'une date (format AAAA-MM-JJ) */
export function weekStart(date = new Date()) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return d.toISOString().slice(0, 10);
}

// ---- Exemples affichés tant que l'API n'existe pas ----
const DEMO_SCHEDULE = [
  [
    { start: '09:00', end: '12:00', title: 'Module A — Cours', place: 'Salle A', kind: 'cours' },
    { start: '13:30', end: '16:30', title: 'Module B — TP', place: 'Labo 1', kind: 'tp' }
  ],
  [
    { start: '09:00', end: '12:00', title: 'Module C — Cours', place: 'Salle B', kind: 'cours' },
    { start: '13:30', end: '15:30', title: 'Projet tutoré', place: 'Salle projet', kind: 'projet' }
  ],
  [{ start: '09:00', end: '12:00', title: 'Module D — TD', place: 'Salle C', kind: 'td' }],
  [
    { start: '09:00', end: '12:00', title: 'Module B — Cours', place: 'Salle A', kind: 'cours' },
    { start: '13:30', end: '16:30', title: 'Module A — TP', place: 'Labo 2', kind: 'tp' }
  ],
  [{ start: '09:00', end: '11:00', title: 'Évaluation — Module C', place: 'Amphi', kind: 'exam' }]
];

const inDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

const DEMO_MISSIONS = [
  { id: 'm1', title: 'Rendu du TP — Module B', due: inDays(2), priority: 'haute', module: 'Module B' },
  { id: 'm2', title: 'Exercices du chapitre 3', due: inDays(5), priority: 'moyenne', module: 'Module A' },
  { id: 'm3', title: 'Préparer la présentation du projet', due: inDays(9), priority: 'moyenne', module: 'Projet' },
  { id: 'm4', title: 'Réviser l’évaluation', due: inDays(4), priority: 'haute', module: 'Module C' }
];

const DEMO_TASKS = [
  { id: 't1', label: 'Relire le cours de la semaine', done: true },
  { id: 't2', label: 'Installer les outils du TP', done: false },
  { id: 't3', label: 'Répartir le travail du projet', done: false },
  { id: 't4', label: 'Vérifier les devoirs sur ESGI-Bot', done: false }
];

const DEMO_INFOS = [
  { id: 'i1', level: 'info', title: 'Canal du QG ouvert', text: 'Cette interface recevra l’emploi du temps et les missions dès que l’API sera branchée.' },
  { id: 'i2', level: 'alerte', title: 'Évaluation vendredi', text: 'Exemple d’alerte importante : elle s’affiche en rose.' },
  { id: 'i3', level: 'info', title: 'Rappels automatiques', text: 'Le bot ESGI-Bot envoie déjà les rappels des devoirs sur Discord.' }
];

// Tâches cochées en démo : gardées dans ce navigateur uniquement
function demoTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem('esgi-qg-demo-tasks') || '{}');
    return DEMO_TASKS.map((t) => ({ ...t, done: saved[t.id] ?? t.done }));
  } catch {
    return DEMO_TASKS;
  }
}

// ---- API ----

/**
 * Emploi du temps de la semaine.
 * Format : items = [{ day: 'Lundi', slots: [{ start, end, title, place, kind }] }]
 * kind : cours | td | tp | projet | exam
 */
export async function getSchedule(week = weekStart()) {
  if (isConnected()) return { demo: false, items: await apiGet(ENDPOINTS.schedule, { semaine: week }) };
  return { demo: true, items: DAYS.map((day, i) => ({ day, slots: DEMO_SCHEDULE[i] })) };
}

/** Missions : [{ id, title, due (AAAA-MM-JJ), priority: haute|moyenne|basse, module }] */
export async function getMissions() {
  if (isConnected()) return { demo: false, items: await apiGet(ENDPOINTS.missions) };
  return { demo: true, items: [...DEMO_MISSIONS].sort((a, b) => a.due.localeCompare(b.due)) };
}

/** Tâches : [{ id, label, done }] */
export async function getTasks() {
  if (isConnected()) return { demo: false, items: await apiGet(ENDPOINTS.tasks) };
  return { demo: true, items: demoTasks() };
}

export async function setTaskDone(id, done) {
  if (isConnected()) return apiSend('PATCH', `${ENDPOINTS.tasks}/${encodeURIComponent(id)}`, { done });
  try {
    const saved = JSON.parse(localStorage.getItem('esgi-qg-demo-tasks') || '{}');
    saved[id] = done;
    localStorage.setItem('esgi-qg-demo-tasks', JSON.stringify(saved));
  } catch {
    /* démo : rien à enregistrer */
  }
  return { ok: true };
}

/** Informations importantes : [{ id, level: info|alerte, title, text }] */
export async function getAnnouncements() {
  if (isConnected()) return { demo: false, items: await apiGet(ENDPOINTS.announcements) };
  return { demo: true, items: DEMO_INFOS };
}
