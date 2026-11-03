import discord
from discord import app_commands
from discord.ext import commands
from LOGS import Logger

class configSQL(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="admin_permission", description='Donne des permissions de niveau 0 à 4 à "nom" (ça peut être un groupe)')
    @app_commands.default_permissions(administrator=True)
    async def admin_permission(self, interaction: discord.Interaction, nom:str, niveau:int):
        if niveau > 4 or niveau < 0:
            await interaction.response.send_message("Mais tu sais pas lire ? entre 0 et 4 on t'as dit pour le niveau, ça sert à quoi sinon la description des commandes ?", ephemeral=True)

        else:
            try:
                sql_cog = self.bot.get_cog("SqlCog")
                if not sql_cog:
                    Logger.error("SqlCog introuvable.")
                    return

                guild_id = interaction.guild
                sql_cog.set_rang()

            except Exception as e:
                Logger.error(f"Erreur lors de la vérification de la base de données : {e}")




async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(configSQL(bot))