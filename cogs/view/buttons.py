import discord
from LOGS import logger


class EmbedButtonAccepterRefuser(discord.ui.View):
    def __init__(self, timeout=None):
        super().__init__(timeout=timeout if timeout else 180)
        self.confirmed = False

    @discord.ui.button(label="Accepter", style=discord.ButtonStyle.green, custom_id="Bouton_Accepter")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Accepter pressé par {interaction.user.name}")
        if interaction.user.id != interaction.user.id:
            await interaction.response.send_message("Seul l'auteur de la commande peut annuler.", ephemeral=True)
            return
        self.confirmed = True
        await interaction.response.defer()  # Indique à Discord que le clic est pris en compte
        self.stop()

    @discord.ui.button(label="Refuser", style=discord.ButtonStyle.red, custom_id="Bouton_Refuser")
    async def bouton_refuser(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Refuser pressé par {interaction.user.name}")
        if interaction.user.id != interaction.user.id:
            await interaction.response.send_message("Seul l'auteur de la commande peut annuler.", ephemeral=True)
            return
        self.confirmed = False
        await interaction.response.defer()  # Indique à Discord que le clic est pris en compte
        self.stop()


class EmbedButtonAccepterAnnuler(discord.ui.View):
    def __init__(self, timeout=None):
        super().__init__(timeout=timeout if timeout else 180)
        self.confirmed = None
        self.annul = None

    @discord.ui.button(label="Accepter", style=discord.ButtonStyle.green, custom_id="Bouton_Accepter")
    async def bouton_accepter(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Accepter pressé par {interaction.user.name}")
        if interaction.user.id != interaction.user.id:
            await interaction.response.send_message("Seul l'auteur de la commande peut annuler.", ephemeral=True)
            return
        self.confirmed = True
        await interaction.response.defer()  # Indique à Discord que le clic est pris en compte
        self.stop()

    @discord.ui.button(label="Annuler", style=discord.ButtonStyle.red, custom_id="Bouton_Annulé")
    async def bouton_refuser(self, interaction: discord.Interaction, button: discord.ui.Button):
        logger.info(f"Bouton Annulé pressé par {interaction.user.name}")
        if interaction.user.id != interaction.user.id:
            await interaction.response.send_message("Seul l'auteur de la commande peut annuler.", ephemeral=True)
            return
        self.annul = True
        await interaction.response.defer()  # Indique à Discord que le clic est pris en compte
        self.stop()
