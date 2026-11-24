"""Lecture et écriture dans la base du bot (bot.db).

Le tableau de bord ne modifie jamais la structure de la base : c'est le bot qui
crée les tables au démarrage (cogs/sql.py). Si une table ou une colonne manque
(base ancienne), la fonctionnalité concernée est signalée comme indisponible.

Les règles reprennent celles du bot :
- un devoir/une évaluation est rangé par classe (ID du rôle de classe) ;
- un même jour + une même matière = une seule entrée (sinon on modifie) ;
- seul l'auteur, un délégué, un prof ou un admin du bot peut modifier.
"""
import json
import sqlite3
from datetime import date

RANGS = ["eleve", "delegue", "admin", "prof"]
RANGS_GESTION = {"admin", "prof", "delegue"}

# Copie de la liste « cours » de utils.py (on n'importe pas utils.py, qui
# charge config.py et donc le token du bot).
MATIERES = {
    "maths": "📐 Mathématiques",
    "francais": "📖 Français",
    "anglais": "🇬🇧 Anglais",
    "algorithmique": "💻 Algorithmique",
    "architecture réseau": " Archi-des-réseaux",
    "architecture web": "🌐 Architecture web",
    "connaissance de l'entreprise": "🏢 Connaissance de l'entreprise",
    "circuits logiques": "🔌 Circuits logiques",
    "cyber sécurité": "🛡️ Cyber sécurité",
    "exel": "📊 Excel",
    "html": "🌐 HTML",
    "IA": "🤖 Intelligence artificielle",
    "javascript": "🟨 JavaScript",
    "language C": "💻 Langage C",
    "SQL": "🗄️ SQL",
    "linux": "🐧 Linux",
    "projet-annuel": "🛠️ Projet",
}

# type d'entrée -> (table, colonne du sujet)
TYPES = {"devoirs": ("devoirs", "devoir"), "evaluations": ("evaluations", "eval")}


class ErreurDonnees(Exception):
    def __init__(self, message, statut=400):
        super().__init__(message)
        self.statut = statut


class Base:
    def __init__(self, chemin):
        self.chemin = chemin

    def _connexion(self):
        conn = sqlite3.connect(self.chemin, timeout=5)
        conn.row_factory = sqlite3.Row
        return conn

    def _colonnes(self, conn, table):
        return {r[1] for r in conn.execute(f"PRAGMA table_info({table})")}

    def disponibilites(self):
        """Ce que la base permet, selon les tables présentes."""
        with self._connexion() as conn:
            def a(table, *cols):
                return set(cols) <= self._colonnes(conn, table)
            return {
                "devoirs": a("devoirs", "id", "guild_id", "classe_name", "user_id", "devoir", "date", "matiere"),
                "evaluations": a("evaluations", "id", "guild_id", "classe_name", "user_id", "eval", "date", "matiere"),
                "classes": a("config_roles", "guild_id", "roles_classe_id"),
                "rangs": a("membres", "user_id", "rang", "classe_name"),
            }

    # ---------- Classes et rangs ----------
    def roles_de_classe(self, guild_id):
        with self._connexion() as conn:
            if "roles_classe_id" not in self._colonnes(conn, "config_roles"):
                return []
            ligne = conn.execute(
                "SELECT roles_classe_id FROM config_roles WHERE guild_id = ?", (int(guild_id),)
            ).fetchone()
        if not ligne or not ligne[0]:
            return []
        try:
            return [str(r) for r in json.loads(ligne[0])]
        except (TypeError, ValueError):
            return []

    def definir_roles_de_classe(self, guild_id, roles):
        with self._connexion() as conn:
            if "roles_classe_id" not in self._colonnes(conn, "config_roles"):
                raise ErreurDonnees("La base du bot n'est pas à jour (table config_roles).", 503)
            # Même requête que le bot (ajouter_classes_roles)
            conn.execute(
                "INSERT OR REPLACE INTO config_roles (guild_id, roles_classe_id) VALUES (?, ?)",
                (int(guild_id), json.dumps([str(r) for r in roles])),
            )

    def rang(self, user_id):
        with self._connexion() as conn:
            if "rang" not in self._colonnes(conn, "membres"):
                return "eleve"
            ligne = conn.execute("SELECT rang FROM membres WHERE user_id = ?", (int(user_id),)).fetchone()
        return ligne[0] if ligne and ligne[0] in RANGS else "eleve"

    def rangs(self, user_ids):
        with self._connexion() as conn:
            if "rang" not in self._colonnes(conn, "membres"):
                return {}
            lignes = conn.execute("SELECT user_id, rang FROM membres").fetchall()
        voulus = set(map(str, user_ids))
        return {str(l[0]): l[1] for l in lignes if str(l[0]) in voulus}

    def definir_rang(self, user_id, rang):
        if rang not in RANGS:
            raise ErreurDonnees("Rang inconnu.")
        with self._connexion() as conn:
            if not {"rang", "classe_name"} <= self._colonnes(conn, "membres"):
                raise ErreurDonnees("La base du bot n'est pas à jour (table membres).", 503)
            # Même requête que set_rang du bot
            conn.execute(
                """INSERT INTO membres (classe_name, user_id, rang) VALUES ('', ?, ?)
                   ON CONFLICT(user_id) DO UPDATE SET rang = excluded.rang""",
                (int(user_id), rang),
            )

    # ---------- Devoirs et évaluations ----------
    def _verifier_type(self, conn, type_):
        if type_ not in TYPES:
            raise ErreurDonnees("Type inconnu.", 404)
        table, col = TYPES[type_]
        if not {"id", "guild_id", "classe_name", "user_id", col, "date", "matiere"} <= self._colonnes(conn, table):
            raise ErreurDonnees(f"La base du bot n'est pas à jour (table {table}).", 503)
        return table, col

    def lister(self, type_, guild_id, classe_id):
        with self._connexion() as conn:
            table, col = self._verifier_type(conn, type_)
            lignes = conn.execute(
                f"SELECT id, user_id, {col} AS sujet, date, matiere FROM {table} "
                "WHERE guild_id = ? AND classe_name = ? ORDER BY date, matiere",
                (int(guild_id), int(classe_id)),
            ).fetchall()
        return [
            {"id": l["id"], "auteur": str(l["user_id"]), "sujet": l["sujet"], "date": str(l["date"])[:10], "matiere": l["matiere"]}
            for l in lignes
        ]

    @staticmethod
    def valider(entree):
        matiere = str(entree.get("matiere", ""))
        if matiere not in MATIERES:
            raise ErreurDonnees("Choisis une matière de la liste.")
        try:
            jour = date.fromisoformat(str(entree.get("date", "")))
        except ValueError:
            raise ErreurDonnees("Date invalide.")
        sujet = str(entree.get("sujet", "")).strip()
        # Mêmes limites que la fenêtre du bot sur Discord
        if not 20 <= len(sujet) <= 500:
            raise ErreurDonnees("Le sujet doit faire entre 20 et 500 caractères.")
        return {"matiere": matiere, "date": jour.isoformat(), "sujet": sujet}

    def ajouter(self, type_, guild_id, classe_id, user_id, entree):
        entree = self.valider(entree)
        with self._connexion() as conn:
            table, col = self._verifier_type(conn, type_)
            # Règle du bot : un seul devoir par jour et par matière pour une classe
            existe = conn.execute(
                f"SELECT id FROM {table} WHERE guild_id = ? AND classe_name = ? AND date = ? AND matiere = ?",
                (int(guild_id), int(classe_id), entree["date"], entree["matiere"]),
            ).fetchone()
            if existe:
                raise ErreurDonnees("Il y a déjà une entrée pour cette matière ce jour-là : modifie-la plutôt.", 409)
            cur = conn.execute(
                f"INSERT INTO {table} (guild_id, classe_name, user_id, {col}, date, matiere) VALUES (?, ?, ?, ?, ?, ?)",
                (int(guild_id), int(classe_id), int(user_id), entree["sujet"], entree["date"], entree["matiere"]),
            )
            return cur.lastrowid

    def _entree(self, conn, table, entree_id, guild_id, classe_id):
        ligne = conn.execute(
            f"SELECT id, user_id FROM {table} WHERE id = ? AND guild_id = ? AND classe_name = ?",
            (int(entree_id), int(guild_id), int(classe_id)),
        ).fetchone()
        if not ligne:
            raise ErreurDonnees("Entrée introuvable.", 404)
        return ligne

    def modifier(self, type_, guild_id, classe_id, entree_id, peut_tout, user_id, entree):
        entree = self.valider(entree)
        with self._connexion() as conn:
            table, col = self._verifier_type(conn, type_)
            ligne = self._entree(conn, table, entree_id, guild_id, classe_id)
            if not peut_tout and str(ligne["user_id"]) != str(user_id):
                raise ErreurDonnees("Seul l'auteur, un délégué, un prof ou un admin peut modifier ceci.", 403)
            doublon = conn.execute(
                f"SELECT id FROM {table} WHERE guild_id = ? AND classe_name = ? AND date = ? AND matiere = ? AND id != ?",
                (int(guild_id), int(classe_id), entree["date"], entree["matiere"], int(entree_id)),
            ).fetchone()
            if doublon:
                raise ErreurDonnees("Il y a déjà une entrée pour cette matière ce jour-là.", 409)
            conn.execute(
                f"UPDATE {table} SET {col} = ?, date = ?, matiere = ? WHERE id = ?",
                (entree["sujet"], entree["date"], entree["matiere"], int(entree_id)),
            )

    def supprimer(self, type_, guild_id, classe_id, entree_id, peut_tout, user_id):
        with self._connexion() as conn:
            table, _ = self._verifier_type(conn, type_)
            ligne = self._entree(conn, table, entree_id, guild_id, classe_id)
            if not peut_tout and str(ligne["user_id"]) != str(user_id):
                raise ErreurDonnees("Seul l'auteur, un délégué, un prof ou un admin peut supprimer ceci.", 403)
            conn.execute(f"DELETE FROM {table} WHERE id = ?", (int(entree_id),))


def creer_base_demo(chemin, discord_demo):
    """Base de test avec la même structure que celle créée par le bot."""
    conn = sqlite3.connect(chemin)
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS membres (
            classe_name TEXT NOT NULL, user_id INTEGER NOT NULL PRIMARY KEY,
            rang TEXT NOT NULL DEFAULT 'eleve', projet_id INTEGER,
            date_arrivee TEXT NOT NULL DEFAULT (date('now', 'localtime')));
        CREATE TABLE IF NOT EXISTS devoirs (
            id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id INTEGER NOT NULL,
            classe_name INTEGER NOT NULL, user_id INTEGER NOT NULL,
            devoir TEXT NOT NULL, date TEXT NOT NULL, matiere TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS evaluations (
            id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id INTEGER NOT NULL,
            classe_name INTEGER NOT NULL, user_id INTEGER NOT NULL,
            eval TEXT NOT NULL, date TEXT NOT NULL, matiere TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS config_roles (
            guild_id INTEGER PRIMARY KEY, role_dev_id INTEGER,
            roles_classe_id TEXT NOT NULL DEFAULT '[]', role_profs_id INTEGER);
    """)
    if conn.execute("SELECT COUNT(*) FROM config_roles").fetchone()[0] == 0:
        d = discord_demo
        g, b1 = int(d.GUILD_ID), int(d.ROLE_B1)
        conn.execute("INSERT INTO config_roles (guild_id, roles_classe_id) VALUES (?, ?)",
                     (g, json.dumps([d.ROLE_B1, d.ROLE_B2])))
        conn.execute("INSERT INTO membres (classe_name, user_id, rang) VALUES (?, ?, 'admin')", (d.ROLE_B1, 300000000000000001))
        conn.execute("INSERT INTO membres (classe_name, user_id, rang) VALUES (?, ?, 'delegue')", (d.ROLE_B1, 300000000000000004))
        aujourd_hui = date.today().toordinal()
        for jours, matiere, sujet, auteur in [
            (2, "maths", "Exercices 4 à 9 page 112 sur les suites numériques", 300000000000000001),
            (5, "html", "Finir la page portfolio avec un formulaire de contact", 300000000000000002),
            (9, "anglais", "Préparer une présentation orale de 3 minutes sur une entreprise tech", 300000000000000003),
        ]:
            conn.execute("INSERT INTO devoirs (guild_id, classe_name, user_id, devoir, date, matiere) VALUES (?, ?, ?, ?, ?, ?)",
                         (g, b1, auteur, sujet, date.fromordinal(aujourd_hui + jours).isoformat(), matiere))
        conn.execute("INSERT INTO evaluations (guild_id, classe_name, user_id, eval, date, matiere) VALUES (?, ?, ?, ?, ?, ?)",
                     (g, b1, 300000000000000004, "Contrôle sur les requêtes SELECT, JOIN et GROUP BY",
                      date.fromordinal(aujourd_hui + 7).isoformat(), "SQL"))
    conn.commit()
    conn.close()
