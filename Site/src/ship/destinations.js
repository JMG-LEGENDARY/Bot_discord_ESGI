// =========================================================================
// LES DESTINATIONS DU VAISSEAU
// Une entrée par commande du tableau de bord. L'adresse (#/...) permet de
// partager un lien direct vers une destination.
// =========================================================================
export const DESTINATIONS = {
  'esgi-bot': {
    id: 'esgi-bot',
    command: 'LA TOUR',
    name: 'ESGI-BOT',
    tagline: 'Citadelle orbitale du bot Discord',
    description: 'La tour du bot, sa ville et son sous-sol : fonctionnalités, architecture et tableau de bord.',
    color: '#22e4ff',
    hdr: [0.25, 1.5, 2.2],
    distance: '4,2 AL',
    hash: '#/esgi-bot'
  },
  qg: {
    id: 'qg',
    command: 'MISSIONS',
    name: 'QUARTIER GÉNÉRAL',
    tagline: 'Emploi du temps, missions et tâches',
    description: 'Le centre de commandement : planning de la semaine, missions à effectuer et informations importantes.',
    color: '#a78bfa',
    hdr: [1.0, 0.55, 2.2],
    distance: '2,7 AL',
    hash: '#/qg'
  },
  labo: {
    id: 'labo',
    command: 'LABORATOIRE',
    name: 'LABORATOIRE',
    tagline: 'Ressources pédagogiques',
    description: 'Cours, documents et supports de travail, et les échantillons ramassés (tes notes).',
    color: '#ff3dbb',
    hdr: [2.2, 0.35, 1.5],
    distance: '3,1 AL',
    hash: '#/labo'
  }
};

export const MANUAL = {
  id: 'jeu',
  command: 'PILOTAGE MANUEL',
  name: 'PILOTAGE MANUEL',
  tagline: 'Prends les commandes',
  description: 'Traverse la ceinture d’astéroïdes et la flotte des NOVA rebelles pour rejoindre ta destination.',
  color: '#ffd166',
  hash: '#/jeu'
};

export const DESTINATION_ORDER = ['esgi-bot', 'qg', 'labo'];
