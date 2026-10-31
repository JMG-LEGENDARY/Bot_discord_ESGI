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
        global sql_cog, devoirs
        try :
            sql_cog = self.bot.client.get_cog("SqlCog")
            devoirs = sql_cog.recup_tous_devoirs(self.bot.channel_id)
        except Exception as e:
            Logger.error(f"impossible de syncroniser la base de donnée : {e}")
        try :
            for devoir in devoirs:
                if devoir["date"].date()<=datetime.now():
                    sql_cog.supprimer_devoir(devoir)



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(NotificationsCog(bot))
