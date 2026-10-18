import sqlite3
from discord.ext import commands
from LOGS import logger

DB_PATH = "bot.db"

class SqlCog(commands.Cog):

    def __init__(self, bot):
        self.bot = bot      
        self.init_db()

    def connexion(self):
        """Ouvre bot.db et renvoie la connexion."""
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  
        return conn
    
    def init_db(self):
        """Crée les tables si elles n'existent pas encore."""
        conn = self.connexion()

        # Table 1 : une seule valeur par clé (une nouvelle valeur remplace l'ancienne)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS valeurs (
                cle     TEXT PRIMARY KEY,
                valeur  TEXT NOT NULL
            )
        """)

        # Table 2 : plusieurs salons par clé (ajouter un salon n'efface pas les autres)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS salons (
                cle         TEXT    NOT NULL,
                channel_id  INTEGER NOT NULL,
                PRIMARY KEY (cle, channel_id)
            )            """)

        conn.commit()
        conn.close()
        logger.info("🗄️ Base de données prête")

    def set_valeur(self, cle, valeur):
        """Ajoute ou remplace une valeur dans la table 'valeurs'."""
        conn = self.connexion()

        conn.execute(
            "INSERT OR REPLACE INTO valeurs (cle, valeur) VALUES (?, ?)",
            (cle, str(valeur))
        )

        conn.commit()
        conn.close()

    def get_valeur(self, cle, defaut=None):
        """Renvoie la valeur d'une clé, ou `defaut` si elle n'existe pas."""
        conn = self.connexion()

        ligne = conn.execute(
            "SELECT valeur FROM valeurs WHERE cle = ?",
            (cle,)
            ).fetchone()
        
        conn.close()

        if ligne is None:
            return defaut
        return ligne["valeur"]

    def ajouter_salon(self, cle, channel_id):
        conn = self.connexion()

        curseur = conn.execute(
            "INSERT OR IGNORE INTO salons (cle, channel_id) VALUES (?, ?)",
            (cle, channel_id)
        )

        conn.commit()
        conn.close()    

        return curseur.rowcount == 1
    
    def get_salons(self, cle):
        """Renvoie la liste des salons d'une clé."""
        conn = self.connexion()

        lignes = conn.execute(
            "SELECT channel_id FROM salons WHERE cle = ?",
            (cle,)
            ).fetchall()
        
        conn.close()

        return [ligne["channel_id"] for ligne in lignes]


async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(SqlCog(bot))