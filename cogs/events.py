import discord
from discord.ext import commands
from config import config
import random
from LOGS import logger
from bs4 import BeautifulSoup
import urllib.request


class EventsCog(commands.Cog):
    """Gestion des événements Discord"""

    def __init__(self, bot):
        self.bot = bot
        self.user_message_history = {}  # Suivi des messages pour copier-coller
        self.voice_activity = {}  # Suivi de l'activité vocale
        self.url = "https://thomsonpic-v2.grgoire.fr/"


    async def scraping(self):
        f = open("https://thomsonpic-v2.grgoire.fr/", "r")
        html_content = f.read()
        f.close()
        soup = BeautifulSoup(html_content, "html.parser")
        images = soup.find_all("img")
        print(images)


    @commands.Cog.listener()
    async def on_message(self, message: discord.Message):
        """Gère les messages reçus"""
        # Ignorer les bots et les commandes
        logs_channel_id = config.salon_logs
        bot_id = config.bot_id
        logger.info(f"Message reçu: {message.author} dans {message.channel}: {message.content}\n {message.author.id} - {bot_id}")

        if message.author.bot and message.author.id != bot_id:
            return
        if message.content.startswith('/'):
            return

        if logs_channel_id and message.channel.id == logs_channel_id:
            if message.author.id != bot_id:
                return

        else :
            f = random.randrange(3)
            print(f)
            if f == 0:
                await self.scraping()
                print("scraped")
            return



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(EventsCog(bot))