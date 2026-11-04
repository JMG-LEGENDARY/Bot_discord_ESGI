import discord
from discord import app_commands
from discord.ext import commands
from LOGS import Logger

class configSQL(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="admin_permission", description='Donne des permissions admins à une personne')
    @app_commands.default_permissions(administrator=True)
    async def admin_permission(self, interaction: discord.Interaction, membre: discord.Member):
        try:
            sql_cog = self.bot.get_cog("SqlCog")
            if not sql_cog:
                Logger.error("SqlCog introuvable.")
                return
        except Exception as e:
            Logger.error(f"Erreur lors de la vérification de la base de données : {e}")
        try :
            sql_cog.set_rang(membre.id, "admin")
        except Exception as e:
            Logger.error(e)



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(configSQL(bot))