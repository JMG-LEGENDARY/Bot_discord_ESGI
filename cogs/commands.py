import discord
from discord.ext import commands
from discord import app_commands
import asyncio

from LOGS import logger
from cogs.events import EventsCog
from utils import cours


class DateModal(discord.ui.Modal, title="Entrez la date du devoir"):
    date_input = discord.ui.TextInput(
        label="Date du devoir",
        placeholder="JJ/MM/AAAA",
        min_length=10,
        max_length=10,
        required=True,
    )

    def __init__(self, matiere_choisie: str):
        super().__init__()
        self.matiere_choisie = matiere_choisie

    async def on_submit(self, interaction: discord.Interaction):
        saisie = self.date_input.value

        # Traitement/Sauvegarde du devoir ici
        await interaction.response.send_message(
            f"Devoir ajouté avec succès !\n"
            f"• **Matière :** {self.matiere_choisie}\n"
            f"• **Date :** {saisie}",
            ephemeral=True,
        )


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

class SelectMatiere(discord.ui.Select):

    def __init__(self, cours: dict):
        options = [
            discord.SelectOption(label=str(value), value=str(key)) for key, value in cours.items()
        ]
        super().__init__(placeholder="Choisissez une matière", options=options)

    async def callback(self, interaction: discord.Interaction):
        matiere_selectionnee = self.values[0]

        # On ouvre directement le Modal au lieu de defer()
        modal = DateModal(matiere_choisie=matiere_selectionnee)
        await interaction.response.send_modal(modal)

async def traiter_ajout_devoir(interaction: discord.Interaction, view: discord.ui.View, select_menu: SelectMatiere):
    await view.wait()

    if select_menu.selected_value:
        embed2 = discord.Embed(
            title="Entrez la date",
            description=f"Matière sélectionnée : **{select_menu.selected_value}**\nEntrez la date sous le format JJ/MM/AAAA",
            color=discord.Color.green(),
        )
        await interaction.followup.send(embed=embed2, ephemeral=True)

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

    @app_commands.command(
        name="ajouter_un_devoir", description="Ajoute un devoir avec date"
    )
    async def ajouter_devoir(self, interaction: discord.Interaction):

        embed = discord.Embed(
            title="Ajoutez le devoir",
            description="Choisissez la matière dans le menu ci-dessous.",
            color=discord.Color.green(),
        )

        view = discord.ui.View()
        view.add_item(SelectMatiere(cours))

        await interaction.response.send_message(
            embed=embed, view=view, ephemeral=True
        )


    @app_commands.command(name="ajouter_une_évaluation", description="Vous permet de recevoir une notification ainsi que des fiches de révisions pour l'évaluation")
    async def ajouter_eval(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="Quelle matière ?",
            color=discord.Color.green(),
        )
        view = discord.ui.View()
        select_menu = SelectMatiere()
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
