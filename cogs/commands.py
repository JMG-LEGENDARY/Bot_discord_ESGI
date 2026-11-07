import discord
from discord.ext import commands
from discord import app_commands
from datetime import datetime

from LOGS import logger
from cogs.events import EventsCog
from utils import cours





class DateModal(discord.ui.Modal, title="Entrez la date du devoir ainsi que son sujet"):
    date_input = discord.ui.TextInput(
        label="Date du devoir",
        placeholder="JJ/MM/AAAA",
        min_length=10,
        max_length=10,
        required=True,
    )

    subject_input = discord.ui.TextInput(
        label="Sujet du devoir",
        min_length=20,
        max_length=500,
        required=True,
    )

    def __init__(self, devoir):
        super().__init__()
        self.devoir = devoir

    async def on_submit(self, interaction: discord.Interaction):
        saisie = self.date_input.value

        try:
            date = datetime.strptime(saisie, "%d/%m/%Y").date()
        except ValueError:
            logger.error(f"Date du devoir : {saisie} par {interaction.user.name}")
            await interaction.response.send_message("Format invalide. Utilisez JJ/MM/AAAA avec une date existante, commande annulez veuillez recommencer.")
            return None
        self.devoir["date"] = date

        saisie2 = self.subject_input.value
        self.devoir["sujet"] = saisie2
        try:
            # 1. Utilise interaction.client pour cibler le bot
            # 2. Utilise le NOM DE LA CLASSE de ton cog (ex: SQLCog), pas le chemin du fichier
            sql_cog = interaction.client.get_cog("SqlCog")
            commands_cog = interaction.client.get_cog("CommandsCog")

            if commands_cog:
                class_id = await commands_cog.get_classe_role(interaction=interaction)

            if sql_cog:
                sql_cog.ajouter_devoir(
                    guild_id=interaction.guild_id,
                    user_id=interaction.user.id,
                    devoir=self.devoir,
                    classe_name = class_id # c'est toujours pas des names c'est des ID
                )
                embed = discord.Embed(
                    title="Devoir enregistré",
                    color=discord.Color.blue(),
                    description=f"Devoir enregistré : \n**Le {self.devoir["date"]}**\n**en {self.devoir["matiere"]}**\n**{self.devoir["sujet"]}** !"
                )
            else:
                logger.error("Le Cog SQL n'a pas été trouvé.")
                embed = discord.Embed(
                    title="Problème, veuillez contacter l'assistance",
                    color=discord.Color.red(),
                )
        except Exception as e:
            logger.error(f"Erreur lors de l'ajout en BDD : {e}")
            embed = discord.Embed(
                title="Problème, veuillez contacter l'assistance",
                color=discord.Color.red(),
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)
        return None


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
        self.selected_value = None
        options = [
            discord.SelectOption(label=str(value), value=str(key)) for key, value in cours.items()
        ]
        super().__init__(placeholder="Choisissez une matière", options=options)

    async def callback(self, interaction: discord.Interaction):
        self.selected_value = self.options[0]
        devoir = {"date": "", "matiere": self.values[0], "sujet": ""}

        # On ouvre directement le Modal au lieu de defer()
        modal = DateModal(devoir)
        await interaction.response.send_modal(modal)



class CommandsCog(commands.Cog):
    """Commandes générales du bot."""

    def __init__(self, bot):
        self.bot = bot
        self.events_cog = EventsCog(bot)
        try:
            self.sql_cog = self.bot.get_cog("SqlCog")
            if not self.sql_cog:
                logger.error("SqlCog introuvable.")
                return

        except Exception as e:
            logger.error(e)

    async def get_classe_role(self, interaction: discord.Interaction):
        try:
            sql_cog = interaction.client.get_cog("SqlCog")
            if not sql_cog:
                await interaction.response.send_message("Erreur, veuillez contacter un admin",
                    ephemeral=True)
                logger.error("SqlCog introuvable.")
                return None

            guild_class_roles = sql_cog.recup_tous_classes_roles(interaction.guild_id)

            # 1. Vérifie si la BDD ou la fonction a échoué
            if guild_class_roles is None:
                await interaction.response.send_message("Erreur, veuillez contacter un admin",
                    ephemeral=True)
                logger.error(f"Impossible d'accéder à guild_class_roles pour la guilde {interaction.guild_id}")
                return None

            # 2. Vérifie si le serveur a configuré au moins une classe
            if not guild_class_roles:
                await interaction.response.send_message("Erreur, veuillez contacter un admin",
                    ephemeral=True)
                logger.warning(
                    f"Le serveur {interaction.guild.name} ({interaction.guild_id}) n'a aucune classe configurée.")
                return None

            # 3. Récupère les rôles de l'utilisateur qui correspondent aux classes du serveur
            classe_name_list = []
            user_role_ids = {str(role.id) for role in interaction.user.roles if role != interaction.guild.default_role}

            for class_role in guild_class_roles:
                if str(class_role) in user_role_ids:
                    classe_name_list.append(class_role)

            # 4. Vérifie si l'utilisateur possède au moins un rôle de classe
            if not classe_name_list:
                await interaction.response.send_message(
                    "Vous n'êtes dans aucune classe, veuillez contacter l'administrateur (commande : /configurer_les_classes).",
                    ephemeral=True)
                logger.warning(
                    f"L'utilisateur {interaction.user.name} ({interaction.user.id}) n'a aucun rôle de classe.")
                return None

            # 5. Si l'utilisateur est dans plusieurs classes
            if len(classe_name_list) > 1:
                logger.warning(
                    f"L'utilisateur {interaction.user.name} est dans {len(classe_name_list)} classes : {classe_name_list}. "
                    f"Classe retenue : {classe_name_list[0]}"
                )

            logger.info(f"Classe trouvée pour {interaction.user.name} : {classe_name_list[0]}")
            return classe_name_list[0]

        except Exception as e:
            logger.error(f"Erreur dans get_classe_role : {e}")
            return None


    @app_commands.command(name="ping", description="Vérifie la latence du bot")
    async def ping(self, interaction: discord.Interaction):
        logger.info(
            f"Commande 'ping' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
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

    @app_commands.command(name="ajouter_un_devoir", description="Ajoute un devoir")
    async def ajouter_devoir(self, interaction: discord.Interaction):
        await self.get_classe_role(interaction)
        if self.classe_name:

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
        else :
            return








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
