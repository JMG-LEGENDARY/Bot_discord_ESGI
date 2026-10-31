import discord

import datetime
from datetime import timedelta

from discord.ext import commands, tasks
from LOGS import Logger


class NotificationsCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.check_database_task.start()

    @tasks.loop(time=datetime.now() + timedelta(hours=7, minutes=30))
    async def check_database_task(self):
        try:
            sql_cog = self.bot.get_cog("SqlCog")
            if not sql_cog:
                Logger.error("SqlCog introuvable.")
                return

            channel_id = self.bot.channel_id
            devoirs = sql_cog.recup_tous_devoirs(channel_id)

            for devoir in devoirs:
                # Convertit la date texte de SQLite (format ex: "2026-10-31") en objet date
                date_devoir = datetime.strptime(
                    devoir["date_devoir"], "%Y-%m-%d"
                ).date()

                # Compare avec la date du jour
                if date_devoir <= datetime.now().date():
                    sql_cog.supprimer_devoir(channel_id, devoir)

        except Exception as e:
            Logger.error(
                f"Erreur lors de la vérification de la base de données : {e}"
            )



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(NotificationsCog(bot))
