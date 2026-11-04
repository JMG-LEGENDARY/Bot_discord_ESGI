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

        # ==================== TABLES DÉJÀ EXISTANTES ====================

        conn.execute("""CREATE TABLE IF NOT EXISTS salons
        (
            classe_id INTEGER NOT NULL,
            utilisateur TEXT NOT NULL,
            channel_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL DEFAULT "eleve",
            PRIMARY KEY (classe_id, utilisateur, channel_id, role_id)
        )""")

        conn.execute("""
        CREATE TABLE IF NOT EXISTS projets
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            classe_id INTEGER NOT NULL,
            nom TEXT NOT NULL COLLATE NOCASE,
            cree_par INTEGER NOT NULL,
            date_creation TEXT NOT NULL DEFAULT (date('now', 'localtime')),
            competence TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            UNIQUE (classe_id, nom)
        )""")

        conn.execute("""
        CREATE TABLE IF NOT EXISTS membres
        (
            classe_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            projet_id INTEGER REFERENCES projets(id) ON DELETE SET NULL,
            date_arrivee TEXT NOT NULL DEFAULT (date('now', 'localtime')),
            PRIMARY KEY (classe_id, user_id)
        )""")

        conn.execute("""
        CREATE TABLE IF NOT EXISTS competences
        (
            guild_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            competence TEXT NOT NULL,
            PRIMARY KEY (guild_id, user_id, competence)
        )""")

        conn.execute("""CREATE TABLE IF NOT EXISTS evenements (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            guild_id INTEGER NOT NULL,
            classe_id INTEGER NOT NULL, 
            user_id INTEGER NOT NULL, 
            devoir TEXT NOT NULL, 
            date_devoir TEXT NOT NULL, 
            matiere TEXT NOT NULL
        )""")

        conn.execute("""CREATE TABLE IF NOT EXISTS constantes_et_variables (id INTEGER PRIMARY KEY AUTOINCREMENT)""")

        # ==================== NOUVELLES TABLES POUR L'ARBORESCENCE ====================

        # 1. Config Salons par Guild
        conn.execute("""
        CREATE TABLE IF NOT EXISTS config_salons (
            guild_id INTEGER PRIMARY KEY,
            salon_logs_id INTEGER,
            salon_commandes_id INTEGER,
            salon_devs_id INTEGER,
            salon_1ere_annee_id INTEGER,
            salon_2eme_annee_id INTEGER,
            salon_3eme_annee_id INTEGER,
            salon_4eme_annee_id INTEGER,
            salon_5eme_annee_id INTEGER
        )""")

        # 2. Config Rôles par Guild
        conn.execute("""
        CREATE TABLE IF NOT EXISTS config_roles (
            guild_id INTEGER PRIMARY KEY,
            role_dev_id INTEGER,
            role_b1_id INTEGER,
            role_b2_id INTEGER,
            role_b3_id INTEGER,
            role_m1_id INTEGER,
            role_m2_id INTEGER,
            role_profs_id INTEGER
        )""")

        # 3. Notifications par membre
        conn.execute("""
        CREATE TABLE IF NOT EXISTS member_notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            temps_1 TEXT,
            temps_2 TEXT,
            channel_id INTEGER,
            is_personal BOOLEAN DEFAULT 0,
            FOREIGN KEY (guild_id, user_id) REFERENCES membres(classe_id, user_id) ON DELETE CASCADE
        )""")

        # 4. Config Bot Tokens & Liens par Guild
        conn.execute("""
        CREATE TABLE IF NOT EXISTS config_bot (
            guild_id INTEGER PRIMARY KEY,
            discord_token TEXT,
            github_token TEXT,
            thomson_api_key TEXT,
            ia_api_key TEXT,
            thomson_pics_url TEXT,
            bot_web_url TEXT
        )""")

        # 5. Constantes et Variables dynamiques
        conn.execute("""
        CREATE TABLE IF NOT EXISTS bot_constantes_variables (
            guild_id INTEGER NOT NULL,
            cle TEXT NOT NULL,
            valeur TEXT NOT NULL,
            is_constant BOOLEAN DEFAULT 0,
            PRIMARY KEY (guild_id, cle)
        )""")

        conn.commit()
        conn.close()
        logger.info("🗄️ Base de données prête (avec arborescence)")

    # ==================== NOUVELLES MÉTHODES DE L'ARBORESCENCE ====================

    def set_config_salons(self, guild_id, **kwargs):
        """Met à jour les salons de configuration d'un serveur."""
        conn = self.connexion()
        conn.execute("INSERT OR IGNORE INTO config_salons (guild_id) VALUES (?)", (guild_id,))
        for key, val in kwargs.items():
            conn.execute(f"UPDATE config_salons SET {key} = ? WHERE guild_id = ?", (val, guild_id))
        conn.commit()
        conn.close()

    def get_config_salons(self, guild_id):
        conn = self.connexion()
        row = conn.execute("SELECT * FROM config_salons WHERE guild_id = ?", (guild_id,)).fetchone()
        conn.close()
        return row

    def set_config_roles(self, guild_id, **kwargs):
        """Met à jour les rôles de configuration d'un serveur."""
        conn = self.connexion()
        conn.execute("INSERT OR IGNORE INTO config_roles (guild_id) VALUES (?)", (guild_id,))
        for key, val in kwargs.items():
            conn.execute(f"UPDATE config_roles SET {key} = ? WHERE guild_id = ?", (val, guild_id))
        conn.commit()
        conn.close()

    def get_config_roles(self, guild_id):
        conn = self.connexion()
        row = conn.execute("SELECT * FROM config_roles WHERE guild_id = ?", (guild_id,)).fetchone()
        conn.close()
        return row

    def ajouter_notification_membre(self, guild_id, user_id, temps_1, temps_2, channel_id, is_personal=False):
        conn = self.connexion()
        curseur = conn.execute(
            """INSERT INTO member_notifications 
               (guild_id, user_id, temps_1, temps_2, channel_id, is_personal) 
               VALUES (?, ?, ?, ?, ?, ?)""",
            (guild_id, user_id, temps_1, temps_2, channel_id, int(is_personal))
        )
        conn.commit()
        conn.close()
        return curseur.lastrowid

    def get_notifications_membre(self, guild_id, user_id):
        conn = self.connexion()
        rows = conn.execute(
            "SELECT * FROM member_notifications WHERE guild_id = ? AND user_id = ?",
            (guild_id, user_id)
        ).fetchall()
        conn.close()
        return rows

    def set_config_bot(self, guild_id, **kwargs):
        conn = self.connexion()
        conn.execute("INSERT OR IGNORE INTO config_bot (guild_id) VALUES (?)", (guild_id,))
        for key, val in kwargs.items():
            conn.execute(f"UPDATE config_bot SET {key} = ? WHERE guild_id = ?", (val, guild_id))
        conn.commit()
        conn.close()

    def get_config_bot(self, guild_id):
        conn = self.connexion()
        row = conn.execute("SELECT * FROM config_bot WHERE guild_id = ?", (guild_id,)).fetchone()
        conn.close()
        return row

    def set_setting(self, guild_id, cle, valeur, is_constant=False):
        conn = self.connexion()
        conn.execute(
            """INSERT INTO bot_constantes_variables (guild_id, cle, valeur, is_constant) 
               VALUES (?, ?, ?, ?) 
               ON CONFLICT(guild_id, cle) DO UPDATE SET valeur=excluded.valeur""",
            (guild_id, cle, str(valeur), int(is_constant))
        )
        conn.commit()
        conn.close()

    def get_settings(self, guild_id):
        conn = self.connexion()
        rows = conn.execute("SELECT * FROM bot_constantes_variables WHERE guild_id = ?", (guild_id,)).fetchall()
        conn.close()
        return rows

    def get_structure_complete(self, guild_id):
        """Récupère l'intégralité de l'arborescence pour un serveur sous forme de dictionnaire Python."""
        salons = self.get_config_salons(guild_id)
        roles = self.get_config_roles(guild_id)
        bot_cfg = self.get_config_bot(guild_id)
        settings = self.get_settings(guild_id)

        conn = self.connexion()
        membres_rows = conn.execute("SELECT * FROM membres WHERE classe_id = ?", (guild_id,)).fetchall()

        membres = []
        for m in membres_rows:
            notifs = self.get_notifications_membre(guild_id, m["user_id"])
            membres.append({
                "user_id": m["user_id"],
                "projet_id": m["projet_id"],
                "date_arrivee": m["date_arrivee"],
                "notifications": [dict(n) for n in notifs]
            })

        conn.close()

        return {
            "guild_id": guild_id,
            "config_salons": dict(salons) if salons else {},
            "config_roles": dict(roles) if roles else {},
            "config_bot": dict(bot_cfg) if bot_cfg else {},
            "constantes_variables": [dict(s) for s in settings],
            "membres": membres
        }

    # ==================== ANCIENNES MÉTHODES CONSERVÉES ====================

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
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM salons WHERE classe_id = ? AND utilisateur = ?",
            (classe_id, utilisateur)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount

    def oublier_salon(self, channel_id):
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
        curseur = conn.execute(
            "DELETE FROM roles WHERE classe_id = ? AND utilisateur = ? AND role_id = ?",
            (classe_id, utilisateur, role_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def inscrire_membre(self, classe_id, user_id):
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO membres (classe_id, user_id) VALUES (?, ?)",
            (classe_id, user_id)
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_membre(self, classe_id, user_id):
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT * FROM membres WHERE classe_id = ? AND user_id = ?",
            (classe_id, user_id)
        ).fetchone()
        conn.close()
        return ligne

    def get_rang(self, classe_id, user_id):
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT rang FROM membres WHERE classe_id = ? AND user_id = ?",
            (classe_id, user_id)
        ).fetchone()
        conn.close()
        if ligne is None:
            return None
        return ligne["rang"]

    def set_rang(self, user_id, rang):
        if rang not in RANGS:
            raise ValueError(f"Rang inconnu : {rang} (autorisés : {RANGS})")
        conn = self.connexion()
        curseur = conn.execute(
            "UPDATE membres SET rang = ? AND user_id = ?",
            (rang, user_id)
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
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO projets (classe_id, nom, cree_par) VALUES (?, ?, ?)",
            (classe_id, nom.strip(), cree_par)
        )
        conn.commit()
        conn.close()
        if curseur.rowcount == 0:
            return None
        return curseur.lastrowid

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
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT * FROM projets WHERE classe_id = ? ORDER BY nom",
            (classe_id,)
        ).fetchall()
        conn.close()
        return lignes

    def get_projet_par_nom(self, classe_id, nom):
        conn = self.connexion()
        ligne = conn.execute(
            "SELECT * FROM projets WHERE classe_id = ? AND nom = ?",
            (classe_id, nom.strip())
        ).fetchone()
        conn.close()
        return ligne

    def set_projet(self, classe_id, user_id, projet_id):
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
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT user_id FROM membres WHERE classe_id = ? AND projet_id = ?",
            (classe_id, projet_id)
        ).fetchall()
        conn.close()
        return [ligne["user_id"] for ligne in lignes]

    def ajouter_competence(self, classe_id, user_id, competence):
        conn = self.connexion()
        curseur = conn.execute(
            "INSERT OR IGNORE INTO competences (classe_id, user_id, competence) VALUES (?, ?, ?)",
            (classe_id, user_id, competence.strip().lower())
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def retirer_competence(self, classe_id, user_id, competence):
        conn = self.connexion()
        curseur = conn.execute(
            "DELETE FROM competences WHERE classe_id = ? AND user_id = ? AND competence = ?",
            (classe_id, user_id, competence.strip().lower())
        )
        conn.commit()
        conn.close()
        return curseur.rowcount == 1

    def get_competences(self, classe_id, user_id):
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT competence FROM competences WHERE classe_id = ? AND user_id = ? ORDER BY competence",
            (classe_id, user_id)
        ).fetchall()
        conn.close()
        return [ligne["competence"] for ligne in lignes]

    def chercher_competence(self, classe_id, competence):
        conn = self.connexion()
        lignes = conn.execute(
            "SELECT user_id FROM competences WHERE classe_id = ? AND competence = ?",
            (classe_id, competence.strip().lower())
        ).fetchall()
        conn.close()
        return [ligne["user_id"] for ligne in lignes]

    def supprimer_serveur(self, classe_id):
        conn = self.connexion()
        for table in (
            "valeurs", "salons", "roles", "competences", "membres", "projets",
            "config_salons", "config_roles", "member_notifications", "config_bot", "bot_constantes_variables"
        ):
            conn.execute(f"DELETE FROM {table} WHERE classe_id = ? OR guild_id = ?", (classe_id, classe_id))
        conn.commit()
        conn.close()

    def ajouter_devoir(self, guild_id, user_id, devoir):
        conn = self.connexion()
        curseur = conn.execute(
            """INSERT INTO evenements 
               (guild_id, classe_id, user_id, devoir, date_devoir, matiere) 
               VALUES (?, ?, ?, ?, ?, ?)""",
            (
                guild_id,
                guild_id,  # classe_id utilise aussi le guild_id
                user_id,
                devoir["sujet"],
                devoir["date"],
                devoir["matiere"]
            )
        )
        conn.commit()
        conn.close()
        logger.info(f"SQL : devoir ajouté : {devoir['sujet']}, {devoir['matiere']} dans {guild_id}")
        return curseur.rowcount == 1
        return curseur.rowcount == 1

    def recup_tous_devoirs(self, classe_id):
        with self.connexion() as conn:
            devoirs = conn.execute(
                "SELECT devoir, date_devoir, matiere FROM evenements WHERE classe_id = ?",
                (classe_id,),
            ).fetchall()

        logger.info(f"SQL : devoir trouvé : {devoirs}")
        return devoirs

    def supprimer_devoir(self, classe_id, devoir):
        with self.connexion() as conn:
            curseur = conn.execute(
                "DELETE FROM evenements WHERE classe_id = ? AND devoir = ? AND date_devoir = ? AND matiere = ?",
                (classe_id, devoir["sujet"], devoir["date"], devoir["matiere"]),
            )
            conn.commit()
            logger.info(f"Devoir supprimé : {devoir['sujet'], devoir['matiere'], devoir['date']} pour la classe {classe_id}")

        return curseur.rowcount > 0


async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(SqlCog(bot))