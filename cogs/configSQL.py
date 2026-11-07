import discord
from discord import app_commands
from discord.ext import commands
from LOGS import logger


class Roles_Pagination(discord.ui.View):
    def __init__(self, interaction: discord.Interaction):
        super().__init__(timeout=300)
        self.page = 0
        self.selection = set()

        roles = [
            role for role in interaction.guild.roles if not role.is_default() and not role.is_bot_managed()
        ]

        # Sécurité si aucun rôle n'est éligible
        self.pages = [roles[i:i + 25] for i in range(0, len(roles), 25)] if roles else [[]]
        self.build_page()

    def build_page(self):
        self.clear_items()
        roles_page_actuelle = self.pages[self.page]
        total_pages = len(self.pages)
        options = []

        for role in roles_page_actuelle:
            est_deja_coche = str(role.id) in self.selection
            options.append(discord.SelectOption(
                label=role.name,
                value=str(role.id),
                default=est_deja_coche,
            ))

        if options:
            select = discord.ui.Select(
                placeholder=f"Choisissez des rôles (page {self.page + 1}/{total_pages})",
                options=options,
                min_values=0,
                max_values=len(options)
            )
            select.callback = self.select_callback
            self.add_item(select)

        if total_pages > 1:
            btn_prev = discord.ui.Button(label="◀", disabled=(self.page == 0))
            btn_prev.callback = self.prev_page
            self.add_item(btn_prev)

            btn_next = discord.ui.Button(label="▶", disabled=(self.page == total_pages - 1))
            btn_next.callback = self.next_page
            self.add_item(btn_next)

        btn_valider = discord.ui.Button(label="Valider", style=discord.ButtonStyle.green, emoji="✅")
        btn_valider.callback = self.valider
        self.add_item(btn_valider)

    async def prev_page(self, interaction: discord.Interaction):
        self.page -= 1
        self.build_page()
        await interaction.response.edit_message(view=self)

    async def next_page(self, interaction: discord.Interaction):
        self.page += 1
        self.build_page()
        await interaction.response.edit_message(view=self)

    async def valider(self, interaction: discord.Interaction):
        if not self.selection:
            await interaction.response.send_message("❌ Aucun rôle sélectionné !", ephemeral=True)
            return

        mentions = [f"<@&{role_id}>" for role_id in self.selection]
        await interaction.response.send_message(
            f"✅ **{len(mentions)} rôle(s) validé(s) :**\n" + ", ".join(mentions),
            ephemeral=True
        )
        self.stop()

    async def select_callback(self, interaction: discord.Interaction):
        valeurs_selectionnees = interaction.data["values"]
        ids_page_actuelle = {str(r.id) for r in self.pages[self.page]}

        self.selection -= ids_page_actuelle
        self.selection.update(valeurs_selectionnees)
        await interaction.response.defer()




class ConfigSQL(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        try:
            self.sql_cog = self.bot.get_cog("SqlCog")
            if not self.sql_cog:
                logger.error("SqlCog introuvable.")
                return

        except Exception as e:
            logger.error(e)



    @app_commands.command(name="configurer_les_classes", description="Permet une gestions des classes par le bot")
    async def configurer_les_classes(self, interaction: discord.Interaction):
        logger.info(f"Commande 'configurer les classes' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
        try :
            if interaction.user.guild_permissions.administrator or self.sql_cog.get_rang(interaction.user.id, "admin"):
                View = Roles_Pagination(interaction)
                await interaction.response.send_message("Veuillez choisir les classes", view=View, ephemeral=True)
            else :
                logger.warning(f"{interaction.user.name} n'est pas admin")
                await interaction.response.send_message("Vous n'êtes pas admin", ephemeral=True)
        except Exception as e:
            logger.error(e)




async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(ConfigSQL(bot))