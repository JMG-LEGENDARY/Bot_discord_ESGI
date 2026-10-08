import discord
from discord.ext import commands
from discord import app_commands
from config import config


class CommandsCog(commands.Cog):
    """Commandes générales du bot."""

    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="ping", description="Vérifie la latence du bot")
    async def ping(self, interaction: discord.Interaction):
        """Commande ping pour tester la latence."""
        latency = round(self.bot.latency * 1000)
        embed = discord.Embed(
            title="🏓 Pong!",
            description=f"Latence : **{latency}ms**",
            color=discord.Color.blue()
        )
        await interaction.response.send_message(embed=embed)






async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(CommandsCog(bot))