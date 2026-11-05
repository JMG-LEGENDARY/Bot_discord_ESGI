import discord

import datetime

from discord.ext import commands, tasks
from LOGS import Logger


class NotificationsCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.check_database_task.start()

    @tasks.loop(time=datetime.time(hour=7, minute=30))
    async def check_database_task(self):


            sql_cog = self.bot.get_cog("SqlCog")
            if not sql_cog:
                Logger.error("SqlCog introuvable.")
                return


"""
                        for devoir in devoirs:
                            # Convertit la date texte de SQLite (format ex: "2026-10-31") en objet date
                            date_devoir = datetime.strptime(
                                devoir["date_devoir"], "%Y-%m-%d"
                            ).date()

                            # Compare avec la date du jour
                            if date_devoir <= datetime.now().date():
                                sql_cog.supprimer_devoir(channel_id, devoir)"""



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(NotificationsCog(bot))
