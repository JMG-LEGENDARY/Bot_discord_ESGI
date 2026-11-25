import discord
from discord.ext import commands
from discord import app_commands
from datetime import datetime

from LOGS import logger
from cogs.events import EventsCog
from utils import cours





class DateModal(discord.ui.Modal, title=f"Entrez le sujet"):


    date_input = discord.ui.TextInput(
        label="Veuillez entrer la date",
        placeholder="JJ/MM/AAAA",
        min_length=10,
        max_length=10,
        required=True,
    )

    subject_input = discord.ui.TextInput(
        label="Ainsi que le sujet",
        min_length=20,
        max_length=500,
        required=True,
    )

    def __init__(self, topic, dico):
        super().__init__()
        self.topic = topic
        self.dico = dico



    async def on_submit(self, interaction: discord.Interaction):
        saisie = self.date_input.value

        try:
            date = datetime.strptime(saisie, "%d/%m/%Y").date()
        except ValueError:
            logger.error(f"Date {self.dico['du']} : {saisie} par {interaction.user.name}")
            await interaction.response.send_message("Format invalide. Utilisez JJ/MM/AAAA avec une date existante, commande annulez veuillez recommencer.")
            return None


        self.topic["date"] = date

        saisie2 = self.subject_input.value
        self.topic["sujet"] = saisie2
        try:
            # 1. Utilise interaction.client pour cibler le bot
            # 2. Utilise le NOM DE LA CLASSE de ton cog (ex: SQLCog), pas le chemin du fichier
            sql_cog = interaction.client.get_cog("SqlCog")
            commands_cog = interaction.client.get_cog("CommandsCog")

            if commands_cog:
                class_id = await commands_cog.get_classe_role(interaction=interaction)

                if sql_cog:
                    is_devoir = True if self.dico["commande"] == "ajouter_un_devoir" else False
                    if is_devoir:
                        autres_devoirs = sql_cog.recup_tous_devoirs(interaction.guild_id, class_id)

                    if not is_devoir:
                        autres_devoirs = sql_cog.recup_tous_evals(interaction.guild_id, class_id)

                    if not autres_devoirs:
                        if is_devoir:
                            print(f"Ajout du devoir : {self.topic['date']} - {self.topic['sujet']} - {self.topic['matiere']} pour la classe {class_id} par {interaction.user.name}")
                            sql_cog.ajouter_devoir(guild_id=interaction.guild_id,user_id=interaction.user.id,devoir=self.topic,classe_name=class_id)
                            embed = discord.Embed(title="Devoir enregistré",color=discord.Color.blue(),description=f"Devoir enregistré : \n**Le {self.topic['date']}**\n**en {self.topic['matiere']}**\n**{self.topic['sujet']}** !"
)

                        if not is_devoir:
                            print(f"Ajout de l'évaluation : {self.topic['date']} - {self.topic['sujet']} - {self.topic['matiere']} pour la classe {class_id} par {interaction.user.name}")
                            sql_cog.ajouter_eval(guild_id=interaction.guild_id,user_id=interaction.user.id,eval=self.topic,classe_name=class_id)
                            embed = discord.Embed(title="Évaluation enregistrée",color=discord.Color.blue(),description=f"Évaluation enregistrée : \n**Le {self.topic['date']}**\n**en {self.topic['matiere']}**\n**{self.topic['sujet']}** !")

                    if autres_devoirs:
                        for devoir in autres_devoirs:
                            date_devoir = datetime.strptime(devoir["date"], "%Y-%m-%d").date()
                            if date_devoir== self.topic["date"] and devoir["matiere"] == self.topic["matiere"]:
                                embed = discord.Embed(title=f"Ceci a déjà été enregistré",color=discord.Color.yellow(),description=f"{self.dico['le']} pour **{self.topic['matiere']}** est déjà enregistré pour le **{self.topic['date']}** ! \nVoulez vous le modifier ?")
                                logger.info(f"Devoir déjà existant pour {self.topic['matiere']} le {self.topic['date']}. Demande de modification par {interaction.user.name}")
                                view = EmbedButtonAccepterRefuser()
                                await interaction.response.send_message(embed=embed, view=view, ephemeral=True)
                                await view.wait()  # Attend que l'utilisateur clique sur un bouton
                                if view.confirmed:
                                    try :
                                        if is_devoir:
                                            self_user_id = sql_cog.get_devoir_user(interaction.guild_id, self.topic,class_id)
                                        if not is_devoir:
                                            self_user_id = sql_cog.get_eval_user(interaction.guild_id, self.topic,class_id)
                                        rang = sql_cog.get_rang(interaction.user.id)
                                        if rang == "admin" or rang == "prof" or rang == "delegue" or self_user_id == interaction.user.id:
                                            if is_devoir:
                                                sql_cog.modifier_devoir(guild_id=interaction.guild_id, user_id=interaction.user.id,devoir=self.topic, classe_name=class_id)
                                                embed = discord.Embed( title="Devoir enregistré",color=discord.Color.blue(),description=f"Devoir enregistré : \n**Le {self.topic["date"]}**\n**en {self.topic["matiere"]}**\n**{self.topic["sujet"]}** !")
                                            if not is_devoir:
                                                sql_cog.modifier_eval(guild_id=interaction.guild_id,user_id=interaction.user.id,eval=self.topic,classe_name=class_id)
                                                embed = discord.Embed(title="Évaluation enregistrée",color=discord.Color.blue(),description=f"Évaluation enregistrée : \n**Le {self.topic["date"]}**\n**en {self.topic["matiere"]}**\n**{self.topic["sujet"]}** !")
                                        else :
                                            embed = discord.Embed(title=f"Vous n'avez pas les droits pour modifier {self.dico['le']}",color=discord.Color.red())
                                    except Exception as e:
                                        logger.error(f"-- [commande - on_submit] Erreur lors de la modification en BDD : {e}")
                                        embed = discord.Embed(title="Problème, veuillez contacter l'assistance", color=discord.Color.red())
                            break
                        if is_devoir:
                            sql_cog.ajouter_devoir(guild_id=interaction.guild_id,user_id=interaction.user.id,devoir=self.topic,classe_name=class_id)
                            embed = discord.Embed(title="Devoir enregistré",color=discord.Color.blue(),description=f"Devoir enregistré : \n**Le {self.topic['date']}**\n**en {self.topic['matiere']}**\n**{self.topic['sujet']}** !")
                        if not is_devoir:
                            sql_cog.ajouter_eval(guild_id=interaction.guild_id,user_id=interaction.user.id,eval=self.topic,classe_name=class_id)
                            embed = discord.Embed(title="Évaluation enregistrée", color=discord.Color.blue(), description=f"Évaluation enregistrée : \n**Le {self.topic['date']}**\n**en {self.topic['matiere']}**\n**{self.topic['sujet']}** !")

                else:
                    logger.error("Le Cog SQL n'a pas été trouvé.")
                    embed = discord.Embed( title="Problème, veuillez contacter l'assistance", color=discord.Color.red(), )
        except Exception as e:
            logger.error(f"-- [commande - on_submit] Erreur lors de l'ajout en BDD : {e}")
            embed = discord.Embed(title="Problème, veuillez contacter l'assistance",color=discord.Color.red(),
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
    def __init__(self, cours: dict, dico: dict):
        self.selected_value = None
        self.dico = dico
        options = [
            discord.SelectOption(label=str(value), value=str(key)) for key, value in cours.items()
        ]
        super().__init__(placeholder="Choisissez une matière", options=options)

    async def callback(self, interaction: discord.Interaction):
        self.selected_value = self.options[0]
        topic = {"date": "", "matiere": self.values[0], "sujet": ""}

        # On ouvre directement le Modal au lieu de defer()
        modal = DateModal(topic, self.dico)
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
                logger.error(f"[commands - get_classe_role] Impossible d'accéder à guild_class_roles pour la guilde {interaction.guild_id}")
                return None

            # 2. Vérifie si le serveur a configuré au moins une classe
            if not guild_class_roles:
                await interaction.response.send_message("Votre serveur n'a aucune classe configurée. Veuillez contacter un administrateur pour configurer les classes.",
                    ephemeral=True)
                logger.warning(
                    f"[commands - get_classe_role] Le serveur {interaction.guild.name} ({interaction.guild_id}) n'a aucune classe configurée.")
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
                    f"[commands - get_classe_role] L'utilisateur {interaction.user.name} ({interaction.user.id}) n'a aucun rôle de classe.")
                return None

            # 5. Si l'utilisateur est dans plusieurs classes
            if len(classe_name_list) > 1:
                logger.warning(
                    f"[commands - get_classe_role] L'utilisateur {interaction.user.name} est dans {len(classe_name_list)} classes : {classe_name_list}. "
                    f"Classe retenue : {classe_name_list[0]}"
                )

            logger.info(f"[commands - get_classe_role] Classe trouvée pour {interaction.user.name} : {classe_name_list[0]}")
            return classe_name_list[0]

        except Exception as e:
            logger.error(f"[commands - get_classe_role] Erreur dans get_classe_role : {e}")
            return None





    async def ajouter_eval_devoir(self, interaction: discord.Interaction, dico: dict):
        classe = await self.get_classe_role(interaction)
        if classe:

            embed = discord.Embed(
                title=f"Ajoutez {dico['le']}",
                description="Choisissez la matière dans le menu ci-dessous.",
                color=discord.Color.green(),
            )

            view = discord.ui.View()
            view.add_item(SelectMatiere(cours, dico))

            await interaction.response.send_message(
                embed=embed, view=view, ephemeral=True
            )
        else:
            logger.warning(
                f"[commands - ajouter_eval_devoir] Classe introuvable pour {interaction.user.name} ({interaction.user.id})")
            return


    async def lister_les_devoirs_eval(self, interaction: discord.Interaction, dico: dict):
        try :
            classe = await self.get_classe_role(interaction)
            if classe:
                sql_cog = interaction.client.get_cog("SqlCog")
                if sql_cog:
                    if dico["commande"] == "lister_les_devoirs":
                        topics = sql_cog.recup_tous_devoirs(guild_id=interaction.guild.id, classe_name=classe)
                    if dico["commande"] == "lister_les_eval":
                        topics = sql_cog.recup_tous_evals(guild_id=interaction.guild.id, classe_name=classe)

                    if topics:
                        classe_name = interaction.guild.get_role(int(classe)).name if interaction.guild.get_role(int(classe)) else classe
                        embed = discord.Embed(
                            title=f"{dico["titre"]} pour la classe {classe_name}",
                            color=discord.Color.blue(),
                        )
                        topic_list = sorted(topics, key=lambda x: x["date"])  # Trie les devoirs par date
                        for topic in topic_list:
                            date_obj = datetime.fromisoformat(topic['date'])
                            name = f"{topic['matiere']} - {date_obj.strftime('%d/%m/%Y')}"
                            embed.add_field(
                                name=name,
                                value=topic['sujet'],
                                inline=False
                            )
                            await interaction.response.send_message(embed=embed, ephemeral=False)
                    else:
                        await interaction.response.send_message(
                            "Aucun devoir trouvé pour votre classe.",
                            ephemeral=True
                        )
                else:
                    logger.error("SqlCog introuvable.")
            else:
                logger.error(f"[commands - lister_les_devoirs_eval] Classe introuvable pour {interaction.user.name} ({interaction.user.id})")
        except Exception as e:
            logger.error(f"[commands - lister_les_devoirs_eval] Erreur lors de la récupération des devoirs : {e}")
            await interaction.response.send_message(
                "Erreur lors de la récupération des devoirs, veuillez contacter un administrateur.",
                ephemeral=True
            )


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

    @app_commands.command(name="ajouter_une_évaluation",description="Vous permet de recevoir une notification ainsi que des fiches de révisions pour l'évaluation")
    async def ajouter_eval(self, interaction: discord.Interaction):
        dico = {"commande": "ajouter_une_évaluation", "le": "l'évaluation", "du" : "de l'évaluation"}
        await self.ajouter_eval_devoir(interaction, dico)


    @app_commands.command(name="ajouter_un_devoir", description="Ajoute un devoir")
    async def ajouter_devoir(self, interaction: discord.Interaction):
        dico = {"commande": "ajouter_un_devoir", "le": "le devoir", "du" : "du devoir"}
        await self.ajouter_eval_devoir(interaction, dico)

    @app_commands.command(name="lister_les_devoirs", description="Fais une liste de tous les prochains devoirs")
    async def lister_les_devoirs(self, interaction: discord.Interaction):
        dico = {"commande": "lister_les_devoirs", "titre": "Devoirs à venir", "le": "le devoir", "du" : "du devoir"}
        await self.lister_les_devoirs_eval(interaction, dico)

    @app_commands.command(name="lister_les_évaluations", description="Fais une liste de tous les prochaines évaluations")
    async def lister_les_eval(self, interaction: discord.Interaction):
        dico = {"commande": "lister_les_eval", "titre": "Évaluations à venir", "le": "l'évaluation", "du" : "de l'évaluation"}
        await self.lister_les_devoirs_eval(interaction, dico)



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