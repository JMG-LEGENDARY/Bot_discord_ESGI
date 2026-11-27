from asyncio import exceptions

import discord
from discord import app_commands
from discord.ext import commands
import asyncio

from .view.buttons import EmbedButtonAccepterAnnuler

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
        try :
            sql_cog = interaction.client.get_cog("SqlCog")
            if sql_cog:
                sql_cog.ajouter_classes_roles(interaction.guild_id, self.selection)
            else :
                logger.error("SqlCog introuvable.")
        except Exception as e:
            logger.error(e)

        await interaction.response.defer()



class ConfigSelect(discord.ui.Select):
    def __init__(self):
        options = [
            discord.SelectOption(label="Configurer les classes", value="configurer_les_classes"),
            discord.SelectOption(label="Ajouter un rôle", value="ajouter_un_role"),
            discord.SelectOption(label="Supprimer un rôle", value="supprimer_un_role"),
        ]
        super().__init__(placeholder="Choisissez une option...", options=options)


    async def callback(self, interaction: discord.Interaction):
        await interaction.response.send_message(f"Vous avez choisi : {self.values[0]}", ephemeral=True)



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


    @app_commands.command(name="admin_permission", description='Donne des permissions admins à une personne')
    @app_commands.default_permissions(administrator=True)
    async def admin_permission(self, interaction: discord.Interaction, membre: discord.Member):
        logger.info(
            f"Commande 'admin_permission' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
        try:
            self.sql_cog.set_rang(membre.id, "admin")
            await interaction.response.send_message(
                f"{membre.name} a maintenant les privilèges admins pour la gestion du bot !", ephemeral=True)
        except Exception as e:
            logger.error(e)

    @app_commands.command(name="configurer_les_classes", description="Permet une gestions des classes par le bot")
    async def configurer_les_classes(self, interaction: discord.Interaction):
        logger.info(f"Commande 'configurer les classes' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
        try :
            if interaction.user.guild_permissions.administrator or self.sql_cog.get_rang(interaction.user.id) == "admin":
                View = Roles_Pagination(interaction)
                await interaction.response.send_message("Veuillez choisir les classes", view=View, ephemeral=True)
            else :
                logger.warning(f"{interaction.user.name} n'est pas admin")
                await interaction.response.send_message("Vous n'êtes pas admin", ephemeral=True)
        except Exception as e:
            logger.error(f"[configSQL - configurer_les_classes] {e}")

    @app_commands.command(name="configurer_les_salons", description="Permet de définir les salons pour les notifications")
    async def configurer_les_salons(self, interaction: discord.Interaction):
        logger.info(f"Commande 'configurer les salons' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
        try :
            if interaction.user.guild_permissions.administrator or self.sql_cog.get_rang(interaction.user.id) == "admin":
                view = EmbedButtonAccepterAnnuler()
                embed = discord.Embed(title="Entrez le nom du salon", color=discord.Color.from_rgb(0, 162, 246))
                await interaction.response.send_message(embed=embed, view=view, ephemeral=True)
                try:
                    salons_list = []
                    salons_list_name = []
                    #IA Cette partie
                    def check(m: discord.Message):
                        if m.author.id == interaction.user.id and m.channel.id == interaction.channel.id:
                            return True
                        return False

                    async def collecter_msg():
                        while not view.is_finished():
                            try :
                                msg = await self.bot.wait_for("message", check=check)
                                logger.info(f"message : {msg.content}")
                                # Nettoie le message : supprime les espaces aux extrémités, enlève '#' ou '<#...>' si l'utilisateur
                                # a tapé un nom avec '#' ou une mention de salon, puis met en minuscules pour comparer sans casse.
                                raw = msg.content.strip().lstrip("#").removeprefix("<").removesuffix(">").lower()
                                if '#' in raw:
                                    raw = raw.replace("#", "")
                                logger.info(f"raw : {raw}")
                                # Cherche dans tous les salons textuels du serveur le premier salon dont le nom (en minuscules)
                                # ou l'ID correspond à la valeur nettoyée ; renvoie None si aucun salon ne correspond.
                                salon = discord.utils.find(
                                    lambda c: c.name.lower() == raw or str(c.id) == raw,
                                    interaction.guild.text_channels,
                                )

                                # Vérifie si un salon a bien été trouvé
                                if salon is not None:
                                    # Le salon existe sur le serveur (ex. : récupérer salon.id, salon.name ou salon.mention)
                                    try :
                                        salon_name = self.bot.get_channel(salon.id).name
                                        salons_list_name.append(salon_name)
                                        salons_list.append(raw)
                                        await msg.delete()
                                    except ValueError:
                                        logger.error(f"[configSQL - configurer_les_salons] raw : {raw}")
                                    except Exception as e:
                                        logger.error(f"[configSQL - configurer_les_salons] {e}")
                                else:
                                    # Aucun salon textuel correspondant trouvé sur le serveur
                                    pass

                            except asyncio.CancelledError:
                                break

                    listen_task = asyncio.create_task(collecter_msg())
                    view_task = asyncio.create_task(view.wait())
                    await asyncio.wait([view_task], return_when=asyncio.FIRST_COMPLETED)
                    listen_task.cancel()
                    await asyncio.gather(listen_task, return_exceptions=True)

                    if view.confirmed:
                        await interaction.edit_original_response(
                            content=f"Salons enregistrés : {', '.join(salons_list_name) if salons_list else 'aucun'}",
                            embed=None,
                            view=None,
                        )
                    elif view.annul:
                        await interaction.edit_original_response(
                            content="Configuration annulée.",
                            embed=None,
                            view=None,
                        )
                    else:
                        await interaction.edit_original_response(
                            content="Temps écoulé.",
                            embed=None,
                            view=None,
                        )
                    #fin de partie IA
                    sql_cog = self.bot.get_cog("SqlCog")
                    sql_cog.set_notif_channel(interaction.guild.id, salons_list)
                    logger.info(f"Salons enregistrés pour les notifications dans le serveur {interaction.guild.name} : {', '.join(salons_list_name) if salons_list else 'aucun'}")
                except Exception as e:
                    logger.error(f"[configSQL - configurer_les_salons] {e}")

            else :
                logger.warning(f"{interaction.user.name} n'est pas admin")
                await interaction.response.send_message("Vous n'êtes pas admin", ephemeral=True)
        except Exception as e:
            logger.error(f"[configSQL - configurer_les_salons] {e}")

    """@app_commands.command(name="config", description="Permet de configurer le bot")
    async def config(self, interaction: discord.Interaction):
        logger.info(f"Commande 'config' reçue dans le salon {interaction.channel.name} de la guild {interaction.guild.name} par {interaction.user.name}")
        options = [
            discord.SelectOption(label="Configurer les classes", value="configurer_les_classes"),
            discord.SelectOption(label="Ajouter un rôle", value="ajouter_un_role"),
            discord.SelectOption(label="Supprimer un rôle", value="supprimer_un_role"),
        ]
        try :
            embed = discord.Embed(title="Configurer les classes", color=discord.Color.from_rgb(0, 162, 246))
            view = ConfigSelect(options)
            await interaction.response.send_message(embed=embed, view=view, ephemeral=True)
        except Exception as e:
            logger.error(f"[configSQL - config] {e}")"""

async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(ConfigSQL(bot))