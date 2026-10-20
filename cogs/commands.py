import discord
from discord.ext import commands
from discord import app_commands

from LOGS import logger
from cogs.events import EventsCog

class EmbedButtonAccepterRefuser(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=180)

    @discord.ui.button(label="Accepter", style=discord.ButtonStyle.green, custom_id="Bouton_Accepter")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Accepter pressé par {interaction.user.name}")
        return True

    @discord.ui.button(label="Refuser", style=discord.ButtonStyle.red, custom_id="Bouton_Refuser")
    async def bouton_refuser(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Refuser pressé par {interaction.user.name}")
        return False

class EmbedButtonIciPartout(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=180)

    @discord.ui.button(label="Ici", style=discord.ButtonStyle.gray, custom_id="Bouton_Channel")
    async def bouton_ici(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Channel pressé par {interaction.user.name}")
        embedding.ConfirmEmbed(interaction)



    @discord.ui.button(label="Partout", style=discord.ButtonStyle.gray, custom_id="Bouton_Partout")
    async def bouton_partout(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Partout pressé par {interaction.user.name}")
        embed = discord.Embed(
            title="Veuillez confirmer",
            description="Tous vos messages seront supprimés",
            color=discord.Color.red(),
        )
        view = EmbedButtonAccepterRefuser()
        await interaction.response.send_message(embed=embed, view=view)


class EmbedGenerator(discord.ui.View):
    def __init__(self):
        super().__init__()

    def ConfirmEmbed(self, interaction):
        embed = discord.Embed(
            title="Veuillez confirmer",
            description=self.description,
            color=discord.Color.red(),
        )
        view = EmbedButtonAccepterRefuser()

embedding = EmbedGenerator()



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

    @app_commands.command(name="nouvelle_identité", description="Supprime tous les messages que tu as envoyés")
    async def nouvelle_identite(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="Porté de la suppresion",
            color=discord.Color.red(),
        )
        View = EmbedButtonIciPartout()
        await interaction.response.send_message(embed=embed, view=View)

async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(CommandsCog(bot))