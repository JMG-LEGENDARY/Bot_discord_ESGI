import sqlite3
from discord.ext import commands
from LOGS import logger

class SqlCog(commands.Cog):
    pass

async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(SqlCog(bot))