# ESGI Discord Bot

Bot Discord en Python conçu pour accompagner les étudiants ESGI sur leurs devoirs, évaluations et activités de serveur.

## Fonctionnalités

- Détection automatique de la classe de l'utilisateur à partir de ses rôles Discord.
- Ajout et modification des devoirs avec matière, date et sujet.
- Ajout et modification des évaluations.
- Affichage des devoirs et évaluations à venir.
- Messages programmés tous les jours à 7 h 30 pour les échéances prévues dans 7 jours, dans 1 jour ou le jour même.
- Suppression automatique des devoirs dont la date est dépassée.
- Configuration des rôles correspondant aux classes du serveur.
- Attribution d'un rang administratif à un membre.
- Réponse aléatoire à environ 0,1 % des messages avec une image issue de l'API Thomson.
- Commande spéciale utilisant l'API Thomson pour générer une bannière événementielle.
- Journalisation des événements et des actions importantes dans la console.
- Base SQLite locale pour les devoirs, évaluations, membres, rôles, projets, compétences, notifications et configurations.


## Commandes Discord

| Commande | Description |
|---|---|
| `/ping` | Affiche la latence du bot. |
| `/ajouter_un_devoir` | Ouvre un menu de matières puis un formulaire pour ajouter un devoir. |
| `/ajouter_une_évaluation` | Ouvre un menu de matières puis un formulaire pour ajouter une évaluation. |
| `/lister_les_devoirs` | Liste les devoirs de la classe de l'utilisateur. |
| `/lister_les_évaluations` | Liste les évaluations de la classe de l'utilisateur. |
| `/configurer_les_classes` | Permet à un administrateur de choisir les rôles Discord utilisés comme classes. |
| `/admin_permission` | Attribue le rang administrateur à un membre. |
| `/implorer_le_tout_puissant` | Affiche une création aléatoire avec une image issue de l'API Thomson. |
| `/nouvelle_identité` | Interface prévue pour supprimer les messages envoyés par l'utilisateur. |

## Technologies

- Python 3
- `discord.py` pour les commandes slash, les événements, les boutons et les modales
- SQLite pour la persistance locale
- `aiohttp` pour les appels API
- Zoneinfo pour la gestion du fuseau `Europe/Paris`

## Structure du projet

```text
.
├── main.py                  # Point d'entrée et initialisation du bot
├── config.py                # Configuration Discord et API
├── utils.py                 # Matières et catégories proposées
├── LOGS.py                  # Logger console
├── bot.db                   # Base SQLite locale
├── cogs/
│   ├── commands.py          # Commandes slash et modales
│   ├── configSQL.py         # Configuration des classes et permissions
│   ├── sql.py               # Création et accès à la base SQLite
│   ├── notifications.py     # Tâche quotidienne de rappel
│   └── events.py            # Événements Discord et API Thomson
├── files/
│   └── Thomson_names.json   # Données utilisées pour générer les messages
└── Site/
    ├── src/                 # Scène Three.js, panneaux et animations
    ├── public/              # Ressources 3D et fichiers publics
    └── package.json         # Scripts et dépendances du site
```

## Installation du bot

1. Créez un environnement virtuel :

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Installez les dépendances Python :

```bash
pip install -r requirements.txt
```

4. Lancez le bot :

```bash
python main.py
```

Au démarrage, le bot initialise les tables SQLite, charge les cogs, puis synchronise les commandes slash avec Discord.

## Lancement du site

```bash
cd Site
npm install
npm run dev
```

Pour créer une version prête à être déployée :

```bash
npm run build
```

## Rôles dans le projet

### JMG — développeur principal du bot

JMG porte l'essentiel du développement actuel du bot et de ses différentes briques : architecture Python, démarrage du bot, commandes Discord, modales, gestion des devoirs et évaluations, cogs, notifications programmées, accès SQLite, événements Discord, intégration Thomson et réalisation du site 3D.

### Yanis — participation au socle du projet

Yanis a contribué notamment aux éléments fondateurs du projet, avec ses premiers travaux visibles sur la configuration générale et les listes de matières, ainsi qu'à des évolutions du README. Son intervention a participé à poser une base utilisée ensuite par le reste du développement.
