import sqlite3
from discord.ext import commands
from LOGS import logger

DB_PATH = "bot.db"

RANGS = ["eleve", "delegue", "admin"]
CLASSES = ("B1",)


class SqlCog(commands.Cog):

    def __init__(self, bot):
        self.bot = bot
        self.init_db()

    def connexion(self):

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row

        conn.execute("PRAGMA foreign_keys = ON")
        return conn

    def init_db(self):

        conn = self.connexion()

        conn.execute("""
                     CREATE TABLE IF NOT EXISTS salons
                     (
                         classe_id
                         INTEGER
                         NOT
                         NULL,
                         utilisateur
                         TEXT
                         NOT
                         NULL,
                         channel_id
                         INTEGER
                         NOT
                         NULL,
                         role_id
                         INTEGER
                         NOT
                         NULL
                         DEFAULT
                         "eleve",
                         PRIMARY
                         KEY
                     (
                         classe_id,
                         utilisateur,
                         channel_id,
                         role_id
                     )
                         )
                     """)

        # Table 4 : les projets (créés au fur et à mesure, avec un nom libre)
        # COLLATE NOCASE : "Bot Discord" et "bot discord" sont considérés comme le même nom
        # UNIQUE (classe_id, nom) : pas deux projets du même nom sur un serveur
        conn.execute("""
                     CREATE TABLE IF NOT EXISTS projets
                     (
                         id
                         INTEGER
                         PRIMARY
                         KEY
                         AUTOINCREMENT,
                         classe_id
                         INTEGER
                         NOT
                         NULL,
                         nom
                         TEXT
                         NOT
                         NULL
                         COLLATE
                         NOCASE,
                         cree_par
                         INTEGER
                         NOT
                         NULL,
                         date_creation
                         TEXT
                         NOT
                         NULL
                         DEFAULT (
                         date
                     (
                         'now',
                         'localtime'
                     )),
                         competence TEXT NOT NULL,
                         user_id INTEGER NOT NULL,
                         UNIQUE
                     (
                         classe_id,
                         nom
                     )
                         )
                     """)

        # Table 5 : les membres (une ligne par membre et par serveur)
        # projet_id pointe vers projets(id). Si le projet est supprimé,
        # ON DELETE SET NULL remet automatiquement projet_id à NULL (= aucun projet).
        conn.execute("""
                     CREATE TABLE IF NOT EXISTS membres
                     (
                         classe_id
                         INTEGER
                         NOT
                         NULL,
                         user_id
                         INTEGER
                         NOT
                         NULL,
                         projet_id
                         INTEGER
                         REFERENCES
                         projets
                     (
                         id
                     ) ON DELETE SET NULL,
                         date_arrivee TEXT NOT NULL DEFAULT
                     (
                         date
                     (
                         'now',
                         'localtime'
                     )),
                         PRIMARY KEY
                     (
                         classe_id,
                         user_id
                     )
                         )
                     """)

        conn.execute("""
                     CREATE TABLE IF NOT EXISTS competences
                     (
                         guild_id
                         INTEGER
                         NOT
                         NULL,
                         user_id
                         INTEGER
                         NOT
                         NULL,
                         competence
                         TEXT
                         NOT
                         NULL,
                         PRIMARY
                         KEY
                     (
                         guild_id,
                         user_id
                     )
                         )
                     """)

        # Table evenements
        conn.execute("""
                     CREATE TABLE IF NOT EXISTS evenements
                     (
                         id
                         INTEGER
                         PRIMARY
                         KEY
                         AUTOINCREMENT,
                         classe_id
                         INTEGER
                         NOT
                         NULL,
                         user_id
                         INTEGER
                         NOT
                         NULL,
                         devoir
                         TEXT
                         NOT
                         NULL,
                         date_devoir
                         TEXT
                         NOT
                         NULL,
                         matiere
                         TEXT
                         NOT
                         NULL
                     )
                     """)

        conn.commit()
        conn.close()
        logger.info("🗄️ Base de données prête")

    def ajouter_salon(self, classe_id, utilisateur, channel_id):

        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO salons (classe_id, utilisateur, channel_id) VALUES (?, ?, ?)",
            (classe_id, utilisateur, channel_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_salons(self, classe_id, utilisateur):
        """Renvoie la liste des salons d'une clé."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT channel_id FROM salons WHERE classe_id = ? AND utilisateur = ?",
            (classe_id, utilisateur)
        ).fetchall()
        conn.close()
        return [ligne["channel_id"] for ligne in lignes]

    def est_salon(self, classe_id, utilisateur, channel_id):

        conn = self.connexion()
        ligne = conn.execute(
            "SELECT 1 FROM salons WHERE classe_id = ? AND utilisateur = ? AND channel_id = ?",
            (classe_id, utilisateur, channel_id)
        ).fetchone()
        conn.close()
        return ligne is not None

    def retirer_salon(self, classe_id, utilisateur, channel_id):

        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM salons WHERE classe_id = ? AND utilisateur = ? AND channel_id = ?",
            (classe_id, utilisateur, channel_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def vider_salons(self, classe_id, utilisateur):
        """Retire TOUS les salons d'une clé. Renvoie le nombre de salons retirés."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM salons WHERE classe_id = ? AND utilisateur = ?",
            (classe_id, utilisateur)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount

    def oublier_salon(self, channel_id):
        """Retire un salon de TOUTES les clés (quand il est supprimé sur Discord)."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM salons WHERE channel_id = ?",
            (channel_id,)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount

    def get_roles(self, classe_id, utilisateur):

        conn = self.connexion()
        lignes = conn.execute(
            "SELECT role_id FROM roles WHERE classe_id = ? AND utilisateur = ?",
            (classe_id, utilisateur)
        ).fetchall()
        conn.close()
        return [ligne["role_id"] for ligne in lignes]

    def modifier_role(self, classe_id, utilisateur, role_id, interaction):

        conn = self.connexion()
        # à modifier le if pour si le role et dans la liste

        curseur = conn.execute(
            "DELETE FROM roles WHERE classe_id = ? AND utilisateur = ? AND role_id = ?",
            (classe_id, utilisateur, role_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def inscrire_membre(self, classe_id, user_id):
        """Inscrit un membre (élève, B1, sans projet). Ne fait rien s'il est déjà inscrit.
        Renvoie True s'il vient d'être inscrit."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO membres (classe_id, user_id) VALUES (?, ?)",
            (classe_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_membre(self, classe_id, user_id):
        """Renvoie la fiche d'un membre (ex: membre["rang"]), ou None s'il n'est pas inscrit."""
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT * FROM membres WHERE classe_id = ? AND user_id = ?",
            (classe_id, user_id)
        ).fetchone()
        conn.close()
        return ligne

    def get_rang(self, classe_id, user_id):
        """Renvoie le rang d'un membre ("eleve", "delegue", "admin"), ou None s'il n'est pas inscrit."""
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT rang FROM membres WHERE classe_id = ? AND user_id = ?",
            (classe_id, user_id)
        ).fetchone()
        conn.close()
        if ligne is None:
            return None
        return ligne["rang"]

    def set_rang(self, classe_id, user_id, rang):
        """Change le rang d'un membre. Renvoie True si le membre existait."""
        if rang not in RANGS:
            raise ValueError(f"Rang inconnu : {rang} (autorisés : {RANGS})")
        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE membres SET rang = ? WHERE classe_id = ? AND user_id = ?",
            (rang, classe_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def set_classe(self, classe_id, user_id, classe):

        if classe not in CLASSES:
            raise ValueError(f"Classe inconnue : {classe} (autorisées : {CLASSES})")
        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE membres SET classe = ? WHERE classe_id = ? AND user_id = ?",
            (classe, classe_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def retirer_membre(self, classe_id, user_id):
        """Supprime un membre ET ses compétences (quand il quitte le serveur)."""
        conn = self.connexion()
        conn.execute(
            "DELETE FROM competences WHERE classe_id = ? AND user_id = ?",
            (classe_id, user_id)
        )
        curseur = conn.execute(
            "DELETE FROM membres WHERE classe_id = ? AND user_id = ?",
            (classe_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def creer_projet(self, classe_id, nom, cree_par):
        """Crée un projet. Renvoie son id, ou None si un projet porte déjà ce nom."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO projets (classe_id, nom, cree_par) VALUES (?, ?, ?)",
            (classe_id, nom.strip(), cree_par)
        )
        conn.commit()
        conn.close()
        if curseur.rowcount == 0:
            return None
        return curseur.lastrowid  # le numéro que SQLite vient de donner au projet

    def renommer_projet(self, classe_id, projet_id, nouveau_nom):

        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE OR IGNORE projets SET nom = ? WHERE id = ? AND classe_id = ?",
            (nouveau_nom.strip(), projet_id, classe_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def supprimer_projet(self, classe_id, projet_id):

        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM projets WHERE id = ? AND classe_id = ?",
            (projet_id, classe_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_projets(self, classe_id):
        """Renvoie tous les projets du serveur, triés par nom (ex: projet["nom"], projet["id"])."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT * FROM projets WHERE classe_id = ? ORDER BY nom",
            (classe_id,)
        ).fetchall()
        conn.close()
        return lignes

    def get_projet_par_nom(self, classe_id, nom):
        """Retrouve un projet par son nom (majuscules ignorées), ou None."""
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT * FROM projets WHERE classe_id = ? AND nom = ?",
            (classe_id, nom.strip())
        ).fetchone()
        conn.close()
        return ligne

    def set_projet(self, classe_id, user_id, projet_id):
        """Met un membre dans un projet (None = le retirer de son projet).
        Renvoie False si le membre n'est pas inscrit ou si le projet n'existe pas sur ce serveur."""
        conn = self.connexion()
        if projet_id is not None:

            projet = conn.execute(
                "SELECT 1 FROM projets WHERE id = ? AND classe_id = ?",
                (projet_id, classe_id)
            ).fetchone()
            if projet is None:
                conn.close()
                return False
        curseur = conn.execute(
            "UPDATE membres SET projet_id = ? WHERE classe_id = ? AND user_id = ?",
            (projet_id, classe_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_membres_projet(self, classe_id, projet_id):
        """Renvoie la liste des user_id d'un projet."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT user_id FROM membres WHERE classe_id = ? AND projet_id = ?",
            (classe_id, projet_id)
        ).fetchall()
        conn.close()
        return [ligne["user_id"] for ligne in lignes]

    def ajouter_competence(self, classe_id, user_id, competence):
        """Ajoute une compétence à un membre. Renvoie True si elle a été ajoutée."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO competences (classe_id, user_id, competence) VALUES (?, ?, ?)",
            (classe_id, user_id, competence.strip().lower())
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def retirer_competence(self, classe_id, user_id, competence):
        """Retire une compétence d'un membre. Renvoie True si elle a été retirée."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM competences WHERE classe_id = ? AND user_id = ? AND competence = ?",
            (classe_id, user_id, competence.strip().lower())
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_competences(self, classe_id, user_id):
        """Renvoie la liste des compétences d'un membre."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT competence FROM competences WHERE classe_id = ? AND user_id = ? ORDER BY competence",
            (classe_id, user_id)
        ).fetchall()
        conn.close()
        return [ligne["competence"] for ligne in lignes]

    def chercher_competence(self, classe_id, competence):
        """Renvoie la liste des user_id qui ont cette compétence (ex: qui connaît le SQL ?)."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT user_id FROM competences WHERE classe_id = ? AND competence = ?",
            (classe_id, competence.strip().lower())
        ).fetchall()
        conn.close()
        return [ligne["user_id"] for ligne in lignes]

    def supprimer_serveur(self, classe_id):
        """Efface TOUT ce qui concerne un serveur (quand le bot en est retiré)."""
        conn = self.connexion()
        for table in ("valeurs", "salons", "roles", "competences", "membres", "projets"):
            # Le nom de table vient de notre propre liste ci-dessus, jamais d'un utilisateur :
            # c'est le seul cas où on peut le mettre avec une f-string.
            conn.execute(f"DELETE FROM {table} WHERE classe_id = ?", (classe_id,))
        conn.commit()
        conn.close()


    def ajouter_devoir(self, classe_id, user_id, devoir):
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO evenements (classe_id, user_id, devoir, date_devoir, matiere) VALUES (?, ?, ?, ?, ?)",
            (classe_id, user_id, devoir["sujet"], devoir["date"], devoir["matiere"])
        )
        conn.commit()
        conn.close()
        logger.info(f"SQL : devoir ajouté : {devoir['sujet']}, {devoir['matiere']} dans {classe_id}")
        return curseur.rowcount == 1





async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(SqlCog(bot))