import discord

from datetime import timedelta, date, datetime, time
from discord.ext import commands, tasks
import zoneinfo

from discord.ext.commands import bot

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
            classes = sql_cog.recup_tous_classes_roles(guild)
            for classe in classes:
                nom_de_classe = guild.get_role(int(classe))
                devoirs = sql_cog.recup_tous_devoirs(guild.id, classe)
                possible_channel = []

                for channel in guild.text_channels:
                    role_class = guild.get_role(int(classe))
                    if role_class in channel.overwrites:
                        if channel.overwrites[role_class].read_messages:
                            logger.info(f"Salon trouvé pour la classe {nom_de_classe.name} : {channel.name}")
                            possible_channel.append(channel)

                for channel in possible_channel:
                    name_channel = self.bot.get_channel(int(channel)).name
                    if "notif" in name_channel.lower():
                        channel_to_post = channel
                        break
                    if "devoir" in name_channel.lower():
                        channel_to_post = channel
                        break
                    if "général" in name_channel.lower() or "general" in name_channel.lower():
                        channel_to_post = channel
                        break

                if not channel_to_post:
                    channel_to_post = possible_channel[0] if possible_channel else None
                    if channel_to_post:
                        logger.info(f"Salon par défaut choisi pour la classe {nom_de_classe.name} : {channel_to_post.name}")
                    else:
                        logger.warning(f"Aucun salon trouvé pour la classe {nom_de_classe.name} dans le serveur {guild.name}.")
                        continue



                for devoir in devoirs:
                    logger.info(f"Itération sur {devoir}")
                    # Convertit la date texte de SQLite (format ex: "2026-10-31") en objet date
                    date_devoir = datetime.strptime(
                        devoir["date_devoir"], "%Y-%m-%d"
                    ).date()

                    if date_devoir == date.today() + timedelta(days=7):
                        embed = discord.Embed(
                            title=f"Devoir prévu pour dans {(date_devoir - date.today()).days} jours !",
                            description=f'En {devoir["matiere"]}, {devoir["sujet"]}',
                            color=discord.Color.yellow()
                        )

                        if channel_to_post:
                            await channel_to_post.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de devoir envoyée")

                    if date_devoir == date.today() + timedelta(days=1):
                        embed = discord.Embed(
                            title=f"Devoir prévu pour demain !",
                            description=f'En {devoir["matiere"]}, {devoir["sujet"]}',
                            color=discord.Color.orange()
                        )
                        if channel:
                            await channel.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de devoir envoyée")

                    if date_devoir == date.today():
                        embed = discord.Embed(
                            title=f"Devoir prévu pour Aujourd'hui",
                            description=f'En {devoir["matiere"]}, {devoir["sujet"]}',
                            color=discord.Color.red()
                        )
                        if channel:
                            await channel.send(content=f"{nom_de_classe.mention}", embed=embed)
                            logger.info(f"Notification de devoir envoyée")



                    # Compare avec la date du jour
                    if date_devoir < datetime.now().date():
                        sql_cog.supprimer_devoir(guild_id=guild.id, classe_name=classe, devoir=devoir)



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(NotificationsCog(bot))
