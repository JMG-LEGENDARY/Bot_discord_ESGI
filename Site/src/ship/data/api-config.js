// =========================================================================
// CONNEXION AUX FUTURES API (emploi du temps, missions, ressources, notes)
// Tant qu'aucune adresse n'est configurée, les interfaces affichent des
// données de démonstration clairement signalées.
//
// Pour brancher une vraie API plus tard :
//   1. Mettre l'adresse dans Site/.env :  VITE_ESGI_API_URL=https://…/api
//   2. Adapter si besoin les chemins de ENDPOINTS ci-dessous ;
//   3. Chaque fonction de hq-api.js / lab-api.js renvoie déjà le format
//      attendu par l'interface (décrit au-dessus de chaque fonction).
// =========================================================================

export const API_BASE = import.meta.env.VITE_ESGI_API_URL || null;

export const ENDPOINTS = {
  schedule: '/emploi-du-temps', // ?semaine=AAAA-MM-JJ
  missions: '/missions',
  tasks: '/taches',
  announcements: '/infos',
  resources: '/ressources', // ?categorie=…&q=…
  samples: '/notes'
};

export class ApiNotConnected extends Error {
  constructor() {
    super('API non connectée');
    this.name = 'ApiNotConnected';
  }
}

/** Lecture JSON avec la session du site (cookies), délai maximum 8 s */
export async function apiGet(path, params = {}) {
  if (!API_BASE) throw new ApiNotConnected();
  const url = new URL(API_BASE + path, window.location.origin);
  Object.entries(params).forEach(([k, v]) => v !== undefined && v !== null && v !== '' && url.searchParams.set(k, v));
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { credentials: 'include', signal: ctrl.signal, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function apiSend(method, path, body) {
  if (!API_BASE) throw new ApiNotConnected();
  const res = await fetch(new URL(API_BASE + path, window.location.origin), {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

export const isConnected = () => Boolean(API_BASE);
