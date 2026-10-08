import sqlite3
import discord
import asyncio
import sys
from discord.ext import commands
from config import config

from LOGS import logger


class ESGIbot(commands.Bot):
  def __init__(self):
    """Initialise le bot avec les configurations appropriées"""
    intents = discord.Intents.all()
    super().__init__(
      command_prefix=commands.when_mentioned,
      intents=intents,
      help_command=None
    )
    self.synced = False


  def sqlite(self):
    cursor = sqlite3.connect("base1.db")
    creer_table = ("""CREATE TABLE IF NOT EXISTS B1 (eleves_id INTEGER PRIMARY KEY NOT NULL, pseudo VARCHAR)""")
    cursor.execute(creer_table)


  async def setup_hook(self):

    logger.info("🔧 Initialisation des extensions...")

    # Liste des cogs à charger (ordre importe: decorators/utilities d'abord)
    cogs_to_load = [
      'cogs.commands',
      'cogs.events'
    ]






































    for cog in cogs_to_load:
      try:
        await self.load_extension(cog)
        logger.info(f"✅ Cog chargé : {cog}")
      except Exception as e:
        logger.error(f"❌ Erreur en chargeant {cog} : {e}", exc_info=True)

    logger.info("🔄 Synchronisation des commandes slash...")
    try:
      synced = await self.tree.sync()
      logger.info(f"✅ {len(synced)} commandes slash synchronisées !")
      self.synced = True
    except Exception as e:
      logger.error(f"❌ Erreur lors de la synchronisation : {e}", exc_info=True)



  async def on_ready(self):
    if not self.synced:
      return

    logger.info("=" * 60)
    logger.info(f"🚀 Bot connecté en tant que : {self.user}")
    if self.user.id:  # type: ignore
      logger.info(f"📊 ID Bot : {self.user.id}")  # type: ignore
    else:
      logger.warning("⚠️  Impossible de récupérer l'ID du bot !")
    logger.info(f"📈 Serveurs : {len(self.guilds)}")
    logger.info("⚡ Prêt à recevoir des commandes !")
    logger.info("=" * 60)

    # Définir le statut
    activity = discord.Activity(
      type=discord.ActivityType.watching,
      name="ESGI_Coin 💎"
    )
    await self.change_presence(activity=activity)



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
