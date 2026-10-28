import discord

import datetime
from datetime import timedelta

from discord.ext import commands, tasks


class NotificationsCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.check_database_task.start()

    @tasks.loop(time=datetime.now() + timedelta(hours=7, minutes=30))
    async def check_database_task(self):
        # Votre code pour lire la base de données ici
        pass


async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(NotificationsCog(bot))
