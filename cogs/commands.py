import discord
from discord.ext import commands
from discord import app_commands
import asyncio

from LOGS import logger
from cogs.events import EventsCog
from utils import cours_CHOICES

class EmbedButtonAccepterRefuser(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=180)
        self.confirmed = False

    @discord.ui.button(label="Accepter", style=discord.ButtonStyle.green, custom_id="Bouton_Accepter")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Accepter pressé par {interaction.user.name}")
        self.confirmed = True
        await interaction.response.defer()  # Indique à Discord que le clic est pris en compte
        self.stop()

    @discord.ui.button(label="Refuser", style=discord.ButtonStyle.red, custom_id="Bouton_Refuser")
    async def bouton_refuser(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Refuser pressé par {interaction.user.name}")
        self.confirmed = True
        await interaction.response.defer()  # Indique à Discord que le clic est pris en compte
        self.stop()

class SelectMatière(discord.ui.Select):
    def __init__(self):
        options = [
            discord.SelectOption(label="Élément 1", value="1"),
            discord.SelectOption(label="Élément 2", value="2"),
            discord.SelectOption(label="Élément 3", value="3"),
        ]
        super().__init__(placeholder="Choisissez un élément", options=options)

    async def callback(self, interaction: discord.Interaction):
        selected_value = self.values[0]
        logger.info(f"Élément {selected_value} choisi par {interaction.user.name}")
        await interaction.response.send_message(f"Vous avez choisi l'élément {selected_value}", ephemeral=True)

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

    @app_commands.command(name="ajouter_un_devoir", description="Vous permet de recevoir une notification pour un devoir à faire pour un cours")
    async def ajouter_devoir(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="Quelle matière",
            color=discord.Color.green(),
        )
        view = discord.ui.View()
        select_menu = SelectMenuExample()
        view.add_item(select_menu)
        await interaction.response.send_message(embed=embed, view=view)

    @app_commands.command(name="ajouter_une_évaluation", description="Vous permet de recevoir une notification ainsi que des fiches de révisions pour l'évaluation")
    async def ajouter_eval(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="Quelle matière ?",
            color=discord.Color.green(),
        )
        view = discord.ui.View()
        select_menu = SelectMenuExample()
        view.add_item(select_menu)
        await interaction.response.send_message(embed=embed, view=view)

    @app_commands.command(name="nouvelle_identité", description="Supprime tous les messages que tu as envoyés")
    async def nouvelle_identite(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="Porté de la suppresion",
            color=discord.Color.red(),
        )
        await interaction.response.send_message(embed=embed, view=EmbedButtonAccepterRefuser())

        if not EmbedButtonAccepterRefuser().confirmed:
            embed = discord.Embed(
                title="Suppression annulée",
                color=discord.Color.green(),
            )
            await interaction.response.send_message(embed=embed)

async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(CommandsCog(bot))
