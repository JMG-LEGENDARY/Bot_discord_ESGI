import discord
from discord.ext import commands
from discord import app_commands

from LOGS import logger
from cogs.events import EventsCog


class ScopeViewButton():
    def __init__(self, author_id):
        super().__init__(timeout=180)
        self.author_id = author_id
        self.choix = None

    async def user_verification(self, interaction:discord.Interaction):
        if self.author_id != interaction.user.id :
            await interaction.response.send_message("Ce n'est pas à vous de choisir")
            return False
        return True


    @discord.ui.button(label="Ce Salon", style=discord.ButtonStyle.blurple, custom_id="Bouton_salon")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Salon pressé par {interaction.user.name}")
        self.choix = "channel"
        await interaction.response.defer()
        self.stop()

    @discord.ui.button(label="Tout le serveur", style=discord.ButtonStyle.secondary, custom_id="Bouton_salon")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Salon pressé par {interaction.user.name}")
        self.choix = "all"
        await interaction.response.defer()
        self.stop()

    
class EmbedButtonConfirm(discord.ui.View):
    def __init__(self, author_id):
        super().__init__(timeout=180)
        self.author_id = author_id
        self.choix = None

    async def user_verification(self, interaction:discord.Interaction):
        if self.author_id != interaction.user.id :
            await interaction.response.send_message("Ce n'est pas à vous de choisir")
            return False
        return True

    @discord.ui.button(label="Accepter", style=discord.ButtonStyle.green, custom_id="Bouton_Accepter")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Accepter pressé par {interaction.user.name}")
        self.choix = "Accepter"
        await interaction.response.defer()
        self.stop()

    @discord.ui.button(label="Refuser", style=discord.ButtonStyle.danger, custom_id="Bouton_Refuser")
    async def bouton_refuser(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Refuser pressé par {interaction.user.name}")
        self.choix = "Refuser"
        await interaction.response.defer()
        self.stop()


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
        View = ScopeViewButton(author_id=interaction.user.id)
        await interaction.response.send_message(embed=embed, view=View)

        await View.wait()

        if View.choix == None:
            pass
            











async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(CommandsCog(bot))