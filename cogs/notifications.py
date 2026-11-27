import discord

from datetime import timedelta, date, datetime, time
from discord.ext import commands, tasks
import zoneinfo
from LOGS import logger


class NotificationsCog(commands.Cog):
    tz_paris = zoneinfo.ZoneInfo("Europe/Paris")

    def __init__(self, bot):
        self.bot = bot
        self.check_database_task.start()

    @tasks.loop(time=time(hour=7, minute=30, tzinfo=tz_paris))
    async def check_database_task(self):
        logger.info("Scan des devoirs en cours...")
        sql_cog = self.bot.get_cog("SqlCog")
        if not sql_cog:
            logger.error("SqlCog introuvable.")
            return

        for guild in self.bot.guilds:
            logger.info(f"Scan des devoirs sur guild {guild.name}")
            classes = sql_cog.recup_tous_classes_roles(guild.id)
            for classe in classes:
                nom_de_classe = guild.get_role(int(classe))
                devoirs = sql_cog.recup_tous_devoirs(guild.id, int(classe))
                evals = sql_cog.recup_tous_evals(guild.id, int(classe))
                possible_channel = []

                for channel in guild.text_channels:
                    role_class = guild.get_role(int(classe))
                    if channel.permissions_for(role_class).read_messages:
                        logger.info(f"Salon trouvé pour la classe {nom_de_classe.name} : {channel.name}")
                        possible_channel.append(channel.id)

                channel_to_post = None
                for channel in possible_channel:
                    name_channel = self.bot.get_channel(channel).name
                    if "notif" in name_channel.lower():
                        channel_to_post = channel
                        break
                    elif "devoir" in name_channel.lower():
                        channel_to_post = channel
                        break
                    elif "général" in name_channel.lower() or "general" in name_channel.lower():
                        channel_to_post = channel

                if not channel_to_post:
                    channel_to_post = possible_channel[0] if possible_channel else None
                    if channel_to_post:
                        logger.info(f"Salon par défaut choisi pour la classe {nom_de_classe.name} : {self.bot.get_channel(channel_to_post).name}")
                    else:
                        logger.warning(f"Aucun salon trouvé pour la classe {nom_de_classe.name} dans le serveur {guild.name}.")
                        continue


                channel_to_post = self.bot.get_channel(channel_to_post) if channel_to_post else None
                for devoir in devoirs:
                    logger.info(f"Itération sur {devoir}")
                    # Convertit la date texte de SQLite (format ex: "2026-10-31") en objet date
                    date = datetime.strptime(
                        devoir["date"], "%Y-%m-%d"
                    ).date()

                    if date == date.today() + timedelta(days=7):
                        embed = discord.Embed(
                            title=f"Devoir prévu pour dans {(date - date.today()).days} jours !",
                            description=f'En {devoir["matiere"]}, {devoir["sujet"]}',
                            color=discord.Color.yellow()
                        )

                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de devoir envoyée")

                    if date == date.today() + timedelta(days=1):
                        embed = discord.Embed(
                            title=f"Devoir prévu pour demain !",
                            description=f'En {devoir["matiere"]}, {devoir["sujet"]}',
                            color=discord.Color.orange()
                        )
                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de devoir envoyée")

                    if date == date.today():
                        embed = discord.Embed(
                            title=f"Devoir prévu pour Aujourd'hui",
                            description=f'En {devoir["matiere"]}, {devoir["sujet"]}',
                            color=discord.Color.red()
                        )
                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de devoir envoyée")



                    # Compare avec la date du jour
                    if date < datetime.now().date():
                        sql_cog.supprimer_devoir(guild_id=guild.id, classe_name=classe, devoir=devoir)

                for eval in evals:
                    logger.info(f"Itération sur {eval}")
                    # Convertit la date texte de SQLite (format ex: "2026-10-31") en objet date
                    date = datetime.strptime(
                        eval["date"], "%Y-%m-%d"
                    ).date()

                    if date == date.today() + timedelta(days=7):
                        embed = discord.Embed(
                            title=f"Évaluation prévue pour dans {(date - date.today()).days} jours !",
                            description=f'En {eval["matiere"]}, {eval["sujet"]}',
                            color=discord.Color.yellow()
                        )

                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de évaluation envoyée")

                    if date == date.today() + timedelta(days=1):
                        embed = discord.Embed(
                            title=f"Évaluation prévue pour demain !",
                            description=f'En {eval["matiere"]}, {eval["sujet"]}',
                            color=discord.Color.orange()
                        )
                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de évaluation envoyée")

                    if date == date.today():
                        embed = discord.Embed(
                            title=f"Évaluation prévue pour Aujourd'hui",
                            description=f'En {eval["matiere"]}, {eval["sujet"]}',
                            color=discord.Color.red()
                        )
                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de évaluation envoyée")



                    # Compare avec la date du jour
                    if date < datetime.now().date():
                        sql_cog.supprimer_eval(guild_id=guild.id, classe_name=classe, eval=eval)



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(NotificationsCog(bot))
