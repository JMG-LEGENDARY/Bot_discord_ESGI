import { apiGet, ENDPOINTS, isConnected } from './api-config.js';

// =========================================================================
// DONNÉES DU LABORATOIRE : ressources pédagogiques et échantillons (notes)
// =========================================================================

export const CATEGORIES = [
  { id: 'tout', label: 'Tout' },
  { id: 'cours', label: 'Cours' },
  { id: 'documents', label: 'Documents' },
  { id: 'supports', label: 'Supports de travail' },
  { id: 'outils', label: 'Outils' }
];

// Exemples génériques (structure seulement, pas de vrais fichiers)
const DEMO_RESOURCES = [
  { id: 'r1', category: 'cours', title: 'Introduction — Module A', module: 'Module A', format: 'PDF', size: '1,2 Mo', url: null },
  { id: 'r2', category: 'cours', title: 'Chapitre 2 — Module B', module: 'Module B', format: 'Diapos', size: '3,4 Mo', url: null },
  { id: 'r3', category: 'documents', title: 'Règlement des études', module: 'Général', format: 'PDF', size: '420 Ko', url: null },
  { id: 'r4', category: 'documents', title: 'Calendrier du semestre', module: 'Général', format: 'PDF', size: '180 Ko', url: null },
  { id: 'r5', category: 'supports', title: 'Énoncé du TP 1', module: 'Module B', format: 'PDF', size: '650 Ko', url: null },
  { id: 'r6', category: 'supports', title: 'Fichiers de départ du projet', module: 'Projet', format: 'ZIP', size: '2,1 Mo', url: null },
  { id: 'r7', category: 'outils', title: 'Guide d’installation des outils', module: 'Général', format: 'Web', size: '—', url: null },
  { id: 'r8', category: 'outils', title: 'Commandes d’ESGI-Bot', module: 'ESGI-Bot', format: 'Web', size: '—', url: '#/esgi-bot' }
];

/**
 * Ressources : [{ id, category, title, module, format, size, url }]
 * url = null : document pas encore disponible (bouton grisé).
 */
export async function getResources({ category = 'tout', q = '' } = {}) {
  if (isConnected()) {
    return { demo: false, items: await apiGet(ENDPOINTS.resources, { categorie: category === 'tout' ? '' : category, q }) };
  }
  const query = q.trim().toLowerCase();
  const items = DEMO_RESOURCES.filter(
    (r) => (category === 'tout' || r.category === category) && (!query || `${r.title} ${r.module}`.toLowerCase().includes(query))
  );
  return { demo: true, items };
}

/**
 * Échantillons ramassés = les notes.
 * Format attendu : { connected: true, items: [{ module, label, value, max, coef, date }] }
 * Sans API : { connected: false } et l'interface affiche un emplacement verrouillé.
 */
export async function getSamples() {
  if (isConnected()) return { connected: true, items: await apiGet(ENDPOINTS.samples) };
  return { connected: false, items: [] };
}
