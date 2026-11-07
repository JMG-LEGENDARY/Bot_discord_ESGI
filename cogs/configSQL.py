import discord
from discord import app_commands
from discord.ext import commands
from LOGS import Logger


class Roles_Pagination(discord.ui.View):
    def __init__(self, interaction: discord.Interaction):
        super().__init__(timeout=300)
        self.page = 0
        self.selection = set()

        roles = [
            role for role in interaction.guild.roles if not role.is_default() and not role.is_bot_managed()
        ]
        self.pages = [roles[i:i+25] for i in range(0, len(roles), 25)]
        self.build_page()

    def build_page(self):
        self.clear_items()
        roles_page_actuelle = self.pages[self.page]
        total_pages = len(self.pages) #total de pages dispo
        options = []

        for role in roles_page_actuelle:
            est_deja_coche = str(role.id) in self.selection #bool
            options.append(discord.SelectOption(
                label=role.name,
                value=str(role.id),
                default=est_deja_coche, #permet de déjà cocher la case si on revient en arrière
            ))

        select = discord.ui.Select(placeholder=f"Cochez les rôles correspondants à des classes (page {self.page + 1}/{len(self.pages) + 1}", options=options, min_values=0, max_values=len(options))
        select.callback = self.select_callback
        self.add_item(select)
        if total_pages > 1:
            btn_prev = discord.ui.Button(label="◀", disabled=(self.page == 0))
            btn_prev.callback = self.prev_page
            self.add_item(btn_prev)

            btn_next = discord.ui.Button(label="▶", disabled=(self.page == total_pages - 1))
            btn_next.callback = self.next_page
            self.add_item(btn_next)

            # D. Bouton Valider final
        btn_valider = discord.ui.Button(label="Valider", style=discord.ButtonStyle.green, emoji="✅")
        btn_valider.callback = self.valider
        self.add_item(btn_valider)

    async def prev_page(self, interaction: discord.Interaction):
        self.page -= 1
        self.build_page()  # Régénère les éléments
        await interaction.response.edit_message(view=self)  # Met à jour l'affichage

    async def next_page(self, interaction: discord.Interaction):
        self.page += 1
        self.build_page()
        await interaction.response.edit_message(view=self)

    async def valider(self, interaction: discord.Interaction):
        if not self.selection:
            await interaction.response.send_message("❌ Aucun rôle sélectionné !", ephemeral=True)
            return

        # Conversion des IDs stockés en mentions Discord
        mentions = [f"<@&{role_id}>" for role_id in self.selection]

        await interaction.response.send_message(
            f"✅ **{len(mentions)} rôle(s) validé(s) :**\n" + ", ".join(mentions),
            ephemeral=True
        )
        self.stop()  # Désactive la vue



    async def select_callback(self, interaction: discord.Interaction):
        # Récupère la liste des valeurs cochées sur le menu courant
        valeurs_selectionnees = interaction.data["values"]

        # Retire d'abord tous les rôles de la page actuelle de notre mémoire globale
        ids_page_actuelle = {str(r.id) for r in self.pages[self.page]}
        self.selection -= ids_page_actuelle

        # Ré-ajoute seulement ceux qui sont cochés
        self.selection.update(valeurs_selectionnees)

        # Avertit Discord que le clic a été reçu sans renvoyer de message
        await interaction.response.defer()




class ConfigSQL(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        try:
            self.sql_cog = self.bot.get_cog("SqlCog")
            if not self.sql_cog:
                Logger.error("SqlCog introuvable.")
                return

        except Exception as e:
            Logger.error(e)

    @app_commands.command(name="admin_permission", description='Donne des permissions admins à une personne')
    @app_commands.default_permissions(administrator=True)
    async def admin_permission(self, membre: discord.Member):
        try :
            self.sql_cog.set_rang(membre.id, "admin")
        except Exception as e:
            Logger.error(e)

    @app_commands.command(name="configurer_les_classes", description="Permet une gestions des classes par le bot")
    async def configurer_les_classes(self, interaction: discord.Interaction):
        Logger.info(f"Commande 'configurer les classes' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
        try :
            if interaction.user.guild_permissions.administrator or self.sql_cog.get_rang(interaction.user.id, "admin"):
                View = Roles_Pagination(interaction)
                await interaction.response.send_message("Veuillez choisir les classes", view=View, ephemeral=True)
            else :
                Logger.warning(f"{interaction.user.name} n'est pas admin")
        except Exception as e:
            Logger.error(e)




async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(ConfigSQL(bot))