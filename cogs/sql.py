import sqlite3
from discord.ext import commands
from LOGS import logger

DB_PATH = "bot.db"


RANGS = ("eleve", "delegue", "admin")
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

        # Table 1 : réglages à une seule valeur, par serveur
        conn.execute("""
            CREATE TABLE IF NOT EXISTS valeurs (
                guild_id  INTEGER NOT NULL,
                cle       TEXT    NOT NULL,
                valeur    TEXT    NOT NULL,
                PRIMARY KEY (guild_id, cle)
            )
        """)

        # Table 2 : plusieurs salons par clé, par serveur
        conn.execute("""
            CREATE TABLE IF NOT EXISTS salons (
                guild_id    INTEGER NOT NULL,
                cle         TEXT    NOT NULL,
                channel_id  INTEGER NOT NULL,
                PRIMARY KEY (guild_id, cle, channel_id)
            )
        """)

        # Table 3 : plusieurs rôles par clé, par serveur (même principe que salons)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS roles (
                guild_id  INTEGER NOT NULL,
                cle       TEXT    NOT NULL,
                role_id   INTEGER NOT NULL,
                PRIMARY KEY (guild_id, cle, role_id)
            )
        """)

        # Table 4 : les projets (créés au fur et à mesure, avec un nom libre)
        # COLLATE NOCASE : "Bot Discord" et "bot discord" sont considérés comme le même nom
        # UNIQUE (guild_id, nom) : pas deux projets du même nom sur un serveur
        conn.execute("""
            CREATE TABLE IF NOT EXISTS projets (
                id             INTEGER PRIMARY KEY AUTOINCREMENT,
                guild_id       INTEGER NOT NULL,
                nom            TEXT    NOT NULL COLLATE NOCASE,
                cree_par       INTEGER NOT NULL,
                date_creation  TEXT    NOT NULL DEFAULT (date('now', 'localtime')),
                UNIQUE (guild_id, nom)
            )
        """)

        # Table 5 : les membres (une ligne par membre et par serveur)
        # projet_id pointe vers projets(id). Si le projet est supprimé,
        # ON DELETE SET NULL remet automatiquement projet_id à NULL (= aucun projet).
        conn.execute("""
            CREATE TABLE IF NOT EXISTS membres (
                guild_id      INTEGER NOT NULL,
                user_id       INTEGER NOT NULL,
                rang          TEXT    NOT NULL DEFAULT 'eleve',
                classe        TEXT    NOT NULL DEFAULT 'B1',
                projet_id     INTEGER REFERENCES projets(id) ON DELETE SET NULL,
                date_arrivee  TEXT    NOT NULL DEFAULT (date('now', 'localtime')),
                PRIMARY KEY (guild_id, user_id)
            )
        """)

        # Table 6 : les compétences (plusieurs par membre)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS competences (
                guild_id    INTEGER NOT NULL,
                user_id     INTEGER NOT NULL,
                competence  TEXT    NOT NULL,
                PRIMARY KEY (guild_id, user_id, competence)
            )
        """)

        conn.commit()
        conn.close()
        logger.info("🗄️ Base de données prête")


    def set_valeur(self, guild_id, cle, valeur):
        
        conn = self.connexion()
        conn.execute(
            "INSERT OR REPLACE INTO valeurs (guild_id, cle, valeur) VALUES (?, ?, ?)",
            (guild_id, cle, str(valeur))
        )
        conn.commit()
        conn.close()

    def get_valeur(self, guild_id, cle, defaut=None):
        
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT valeur FROM valeurs WHERE guild_id = ? AND cle = ?",
            (guild_id, cle)
        ).fetchone()
        conn.close()
        if ligne is None:
            return defaut
        return ligne["valeur"]

    def supprimer_valeur(self, guild_id, cle):
        
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM valeurs WHERE guild_id = ? AND cle = ?",
            (guild_id, cle)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def ajouter_salon(self, guild_id, cle, channel_id):
        
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO salons (guild_id, cle, channel_id) VALUES (?, ?, ?)",
            (guild_id, cle, channel_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_salons(self, guild_id, cle):
        """Renvoie la liste des salons d'une clé."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT channel_id FROM salons WHERE guild_id = ? AND cle = ?",
            (guild_id, cle)
        ).fetchall()
        conn.close()
        return [ligne["channel_id"] for ligne in lignes]

    def est_salon(self, guild_id, cle, channel_id):
        
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT 1 FROM salons WHERE guild_id = ? AND cle = ? AND channel_id = ?",
            (guild_id, cle, channel_id)
        ).fetchone()
        conn.close()
        return ligne is not None

    def retirer_salon(self, guild_id, cle, channel_id):
        
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM salons WHERE guild_id = ? AND cle = ? AND channel_id = ?",
            (guild_id, cle, channel_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def vider_salons(self, guild_id, cle):
        """Retire TOUS les salons d'une clé. Renvoie le nombre de salons retirés."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM salons WHERE guild_id = ? AND cle = ?",
            (guild_id, cle)
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


    def ajouter_role(self, guild_id, cle, role_id):
        """Ajoute un rôle sans toucher aux autres. Renvoie True s'il a été ajouté."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO roles (guild_id, cle, role_id) VALUES (?, ?, ?)",
            (guild_id, cle, role_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_roles(self, guild_id, cle):
        
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT role_id FROM roles WHERE guild_id = ? AND cle = ?",
            (guild_id, cle)
        ).fetchall()
        conn.close()
        return [ligne["role_id"] for ligne in lignes]

    def retirer_role(self, guild_id, cle, role_id):
        """Retire UN rôle d'une clé. Renvoie True s'il a été retiré."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM roles WHERE guild_id = ? AND cle = ? AND role_id = ?",
            (guild_id, cle, role_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def oublier_role(self, role_id):
        """Retire un rôle de TOUTES les clés (quand il est supprimé sur Discord)."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM roles WHERE role_id = ?",
            (role_id,)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount


    def inscrire_membre(self, guild_id, user_id):
        """Inscrit un membre (élève, B1, sans projet). Ne fait rien s'il est déjà inscrit.
        Renvoie True s'il vient d'être inscrit."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO membres (guild_id, user_id) VALUES (?, ?)",
            (guild_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_membre(self, guild_id, user_id):
        """Renvoie la fiche d'un membre (ex: membre["rang"]), ou None s'il n'est pas inscrit."""
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT * FROM membres WHERE guild_id = ? AND user_id = ?",
            (guild_id, user_id)
        ).fetchone()
        conn.close()
        return ligne

    def get_rang(self, guild_id, user_id):
        """Renvoie le rang d'un membre ("eleve", "delegue", "admin"), ou None s'il n'est pas inscrit."""
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT rang FROM membres WHERE guild_id = ? AND user_id = ?",
            (guild_id, user_id)
        ).fetchone()
        conn.close()
        if ligne is None:
            return None
        return ligne["rang"]

    def set_rang(self, guild_id, user_id, rang):
        """Change le rang d'un membre. Renvoie True si le membre existait."""
        if rang not in RANGS:
            raise ValueError(f"Rang inconnu : {rang} (autorisés : {RANGS})")
        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE membres SET rang = ? WHERE guild_id = ? AND user_id = ?",
            (rang, guild_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def set_classe(self, guild_id, user_id, classe):
        
        if classe not in CLASSES:
            raise ValueError(f"Classe inconnue : {classe} (autorisées : {CLASSES})")
        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE membres SET classe = ? WHERE guild_id = ? AND user_id = ?",
            (classe, guild_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def retirer_membre(self, guild_id, user_id):
        """Supprime un membre ET ses compétences (quand il quitte le serveur)."""
        conn = self.connexion()
        conn.execute(
            "DELETE FROM competences WHERE guild_id = ? AND user_id = ?",
            (guild_id, user_id)
        )
        curseur = conn.execute(
            "DELETE FROM membres WHERE guild_id = ? AND user_id = ?",
            (guild_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1


    def creer_projet(self, guild_id, nom, cree_par):
        """Crée un projet. Renvoie son id, ou None si un projet porte déjà ce nom."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO projets (guild_id, nom, cree_par) VALUES (?, ?, ?)",
            (guild_id, nom.strip(), cree_par)
        )
        conn.commit()
        conn.close()
        if curseur.rowcount == 0:
            return None
        return curseur.lastrowid   # le numéro que SQLite vient de donner au projet

    def renommer_projet(self, guild_id, projet_id, nouveau_nom):
        
        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE OR IGNORE projets SET nom = ? WHERE id = ? AND guild_id = ?",
            (nouveau_nom.strip(), projet_id, guild_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def supprimer_projet(self, guild_id, projet_id):
        
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM projets WHERE id = ? AND guild_id = ?",
            (projet_id, guild_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_projets(self, guild_id):
        """Renvoie tous les projets du serveur, triés par nom (ex: projet["nom"], projet["id"])."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT * FROM projets WHERE guild_id = ? ORDER BY nom",
            (guild_id,)
        ).fetchall()
        conn.close()
        return lignes

    def get_projet_par_nom(self, guild_id, nom):
        """Retrouve un projet par son nom (majuscules ignorées), ou None."""
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT * FROM projets WHERE guild_id = ? AND nom = ?",
            (guild_id, nom.strip())
        ).fetchone()
        conn.close()
        return ligne

    def set_projet(self, guild_id, user_id, projet_id):
        """Met un membre dans un projet (None = le retirer de son projet).
        Renvoie False si le membre n'est pas inscrit ou si le projet n'existe pas sur ce serveur."""
        conn = self.connexion()
        if projet_id is not None:
            
            projet = conn.execute(
                "SELECT 1 FROM projets WHERE id = ? AND guild_id = ?",
                (projet_id, guild_id)
            ).fetchone()
            if projet is None:
                conn.close()
                return False
        curseur = conn.execute(
            "UPDATE membres SET projet_id = ? WHERE guild_id = ? AND user_id = ?",
            (projet_id, guild_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_membres_projet(self, guild_id, projet_id):
        """Renvoie la liste des user_id d'un projet."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT user_id FROM membres WHERE guild_id = ? AND projet_id = ?",
            (guild_id, projet_id)
        ).fetchall()
        conn.close()
        return [ligne["user_id"] for ligne in lignes]


    def ajouter_competence(self, guild_id, user_id, competence):
        """Ajoute une compétence à un membre. Renvoie True si elle a été ajoutée."""
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO competences (guild_id, user_id, competence) VALUES (?, ?, ?)",
            (guild_id, user_id, competence.strip().lower())
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def retirer_competence(self, guild_id, user_id, competence):
        """Retire une compétence d'un membre. Renvoie True si elle a été retirée."""
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM competences WHERE guild_id = ? AND user_id = ? AND competence = ?",
            (guild_id, user_id, competence.strip().lower())
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_competences(self, guild_id, user_id):
        """Renvoie la liste des compétences d'un membre."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT competence FROM competences WHERE guild_id = ? AND user_id = ? ORDER BY competence",
            (guild_id, user_id)
        ).fetchall()
        conn.close()
        return [ligne["competence"] for ligne in lignes]

    def chercher_competence(self, guild_id, competence):
        """Renvoie la liste des user_id qui ont cette compétence (ex: qui connaît le SQL ?)."""
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT user_id FROM competences WHERE guild_id = ? AND competence = ?",
            (guild_id, competence.strip().lower())
        ).fetchall()
        conn.close()
        return [ligne["user_id"] for ligne in lignes]

    def supprimer_serveur(self, guild_id):
        """Efface TOUT ce qui concerne un serveur (quand le bot en est retiré)."""
        conn = self.connexion()
        for table in ("valeurs", "salons", "roles", "competences", "membres", "projets"):
            # Le nom de table vient de notre propre liste ci-dessus, jamais d'un utilisateur :
            # c'est le seul cas où on peut le mettre avec une f-string.
            conn.execute(f"DELETE FROM {table} WHERE guild_id = ?", (guild_id,))
        conn.commit()
        conn.close()


async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(SqlCog(bot))