// =========================================================================
// Appels au serveur du tableau de bord (dossier dashboard/ du projet)
// =========================================================================

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function call(method, path, body) {
  let res;
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers: method !== 'GET' ? { 'Content-Type': 'application/json', 'X-ESGI-Dashboard': '1' } : {},
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
  } catch (e) {
    throw new ApiError('Le serveur du tableau de bord ne répond pas.', 0);
  }
  const type = res.headers.get('content-type') || '';
  if (!type.includes('application/json')) {
    // Pas de serveur derrière /api (site hébergé seul, ou serveur éteint)
    throw new ApiError('Le serveur du tableau de bord ne répond pas.', 0);
  }
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.erreur || 'Erreur inconnue.', res.status);
  return data;
}

export const api = {
  state: () => call('GET', '/etat'),
  floors: () => call('GET', '/etages'),
  myFloor: () => call('GET', '/etage'),
  logout: () => call('POST', '/auth/deconnexion', {}),
  list: (guild, type) => call('GET', `/serveurs/${guild}/${type}`),
  add: (guild, type, entry) => call('POST', `/serveurs/${guild}/${type}`, entry),
  update: (guild, type, id, entry) => call('PUT', `/serveurs/${guild}/${type}/${id}`, entry),
  remove: (guild, type, id) => call('DELETE', `/serveurs/${guild}/${type}/${id}`),
  setClasses: (guild, roles) => call('PUT', `/serveurs/${guild}/classes`, { roles }),
  setRank: (guild, user, rang) => call('PUT', `/serveurs/${guild}/rangs/${user}`, { rang }),
  loginUrl: '/api/auth/connexion'
};

/** Échappe un texte avant de l'insérer dans du HTML (noms Discord, sujets…) */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
