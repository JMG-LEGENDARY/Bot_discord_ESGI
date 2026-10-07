import sqlite3
import discord
import asyncio
import sys
from discord.ext import commands
from config import config

class Logger:
  def __init__(self):
    pass
  def critical(self, msg, exc_info=False):
    pass
  def info(self, msg, exc_info=False):
    pass
  pass

logger = Logger()


class ESGIbot(commands.Bot):
  def __init__(self):
    pass

  def sqlite(self):
    cursor = sqlite3.connect("base1.db")
    creer_table = ("""CREATE TABLE IF NOT EXISTS B1 (eleves_id INTEGER PRIMARY KEY NOT NULL, pseudo VARCHAR)""")





async def initialize_bot():
  """Initialise le bot avec toutes les vérifications"""
  global bot

  try:

    # Initialiser la base de données
    logger.info("🗄️  Initialisation de la base de données...")
    #db.init_db()
    logger.info("✅ Base de données initialisée")

    # Créer le bot
    logger.info("🤖 Création du bot Discord...")
    bot = ESGIbot()
    logger.info("✅ Bot Discord créé")

    return bot
  except ValueError as e:
    logger.critical(f"❌ Erreur de configuration: {e}")
    sys.exit(1)
  except Exception as e:
    logger.critical(f"❌ Erreur lors de l'initialisation: {e}", exc_info=True)
    sys.exit(1)


async def main():
  """Fonction principale de démarrage."""
  global bot
  # Initialiser le bot
  bot = await initialize_bot()

  # Démarrer le bot
  try:
    async with bot:
      logger.info("🔌 Connexion à Discord...")
      await bot.start(config.BOT_TOKEN)
  except discord.LoginFailure:
    logger.critical("❌ Token Discord invalide!")
    sys.exit(1)
  except KeyboardInterrupt:
    logger.info("⏹️  Arrêt du bot par l'utilisateur")
  except Exception as e:
    logger.critical(f"❌ Erreur critique: {e}", exc_info=True)
    sys.exit(1)
  finally:
    logger.info("🔌 Fermeture des connexions...")
    logger.info("✅ Bot arrêté")


if __name__ == "__main__":
  try:
    asyncio.run(main())
  except KeyboardInterrupt:
    print("\n⏹️  Bot arrêté")
  except Exception as e:
    logger.critical(f"❌ Erreur non gérée: {e}", exc_info=True)
    sys.exit(1)