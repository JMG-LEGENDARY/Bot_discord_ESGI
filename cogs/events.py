import discord
from discord.ext import commands
from config import config
from urllib.parse import urljoin
import aiohttp
import random
from LOGS import logger

from bs4 import BeautifulSoup
import requests
import urllib.request


class EventsCog(commands.Cog):
    """Gestion des événements Discord"""

    def __init__(self, bot):
        self.bot = bot
        self.user_message_history = {}  # Suivi des messages pour copier-coller
        self.voice_activity = {}  # Suivi de l'activité vocale
        self.url = "https://thomsonpic-v2.grgoire.fr/"
        self.tms_api_key = config.tms_api_key

    async def scraping(self):
        # Route exacte indiquée par le portail API
        endpoint = "api_portal/v1/images"
        target_url = urljoin(self.url, endpoint)

        # Passage de la clé API en paramètre GET
        params = {"api_key": self.tms_api_key}

        async with aiohttp.ClientSession() as session:
            async with session.get(target_url, params=params) as response:
                if response.status != 200:
                    print(f"Erreur d'accès à l'API : Code {response.status}")
                    return []

                data = await response.json()

                # Selon la structure renvoyée (liste directe [...] ou objet {"images": [...]})
                images = data.get("images", data) if isinstance(data, dict) else data

                image_urls = []
                for img in images:
                    # Adapter les clés selon le format exact renvoyé par l'API v1
                    filename = img.get("filename") or img.get("file")
                    if filename:
                        # Construction des URLs HD et miniature
                        full_url = urljoin(self.url, f"uploads/{filename}")
                        thumb_url = urljoin(self.url, f"uploads/thumbs/{filename}")

                        image_urls.append({
                            "name": img.get("name") or img.get("title"),
                            "url": full_url,
                            "thumb": thumb_url,
                        })

                return image_urls


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
            f = 0#random.randrange(100)
            if f == 0:
                print(await self.scraping())
            return



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(EventsCog(bot))