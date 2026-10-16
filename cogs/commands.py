import discord
from discord.ext import commands
from discord import app_commands

from LOGS import logger
from cogs.events import EventsCog


class CommandsCog(commands.Cog):
    """Commandes générales du bot."""

    def __init__(self, bot):
        self.bot = bot
        self.events_cog = EventsCog(bot)

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

    @app_commands.command(name="implorer_le_tout_puissant", description="Sigma Core")
    async def implorer_le_tout_puissant(self, interaction: discord.Interaction):
        await self.events_cog.scraping(message=None, interaction=interaction)

    @app_commands.command(name="nouvelle_identité", description="Supprime tous les messages que tu as envoyé")
    async def nouvelle_identite(self, interaction: discord.Interaction):
        logger.info(f"{interaction.user.name} a demandé à supprimé ses messages")
        for channel in self.bot.get_all_channels():
            for message in channel.history:
                if message.author == self.bot.user:
                    await message.delete()

async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(CommandsCog(bot))