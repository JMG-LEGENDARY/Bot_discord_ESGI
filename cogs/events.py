import discord
from discord.ext import commands
from config import config
from urllib.parse import urljoin
import aiohttp
import random
import json
from LOGS import logger



class EventsCog(commands.Cog):
    """Gestion des événements Discord"""

    def __init__(self, bot):
        self.bot = bot
        self.user_message_history = {}  # Suivi des messages pour copier-coller
        self.voice_activity = {}  # Suivi de l'activité vocale
        self.url = "https://thomsonpic-v2.grgoire.fr/"
        self.tms_api_key = config.tms_api_key
        self.file_path = "./files"
        self.phrases_data = self.charger_phrases()

    def charger_phrases(self) -> dict:
        """Charge le fichier JSON au démarrage pour éviter de lire le disque à chaque message."""
        try:
            with open("./files/Thomson_names.json", "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            logger.error("Fichier ./files/Thomson_names.json introuvable.")
            return {}
        except json.JSONDecodeError as e:
            logger.error(f"Erreur de lecture du JSON: {e}")
            return {}

    async def scraping(self):
        endpoint = "api_portal/v1/images"
        target_url = urljoin(self.url, endpoint)

        async with aiohttp.ClientSession() as session:
            toutes_les_images = []

            # 1. Première requête : on récupère les données ET la liste d'images de la page 1
            params_page_1 = {"api_key": self.tms_api_key, "page": 1}
            async with session.get(target_url, params=params_page_1) as response:
                data = await response.json()

                # Nombre total de pages (par défaut 1 si la clé n'est pas trouvée)
                nb_pages = data.get("meta", {}).get("pages", 1)

                # Traitement des images de la page 1
                for img in data.get("images", []):
                    url = img.get("url")
                    if url:
                        toutes_les_images.append(url)

            # 2. S'il y a d'autres pages, on boucle de la page 2 jusqu'à nb_pages
            for num_page in range(2, nb_pages + 1):
                params = {"api_key": self.tms_api_key, "page": num_page}
                async with session.get(target_url, params=params) as response:
                    data = await response.json()

                    for img in data.get("images", []):
                        url = img.get("url")
                        if url:
                            toutes_les_images.append(url)

            # 3. On renvoie simplement la liste complète
            return toutes_les_images


    @commands.Cog.listener()
    async def on_message(self, message: discord.Message):
        """Gère les messages reçus"""
        bot_id = config.bot_id
        logger.info(f"Message reçu: {message.author} dans {message.channel}: {message.content}\n {message.author.id} - {bot_id}")

        if message.author.bot :
            return

        if message.content.startswith('/'):
            return


        else :
            if random.random() < 0.001:
                if not self.phrases_data:
                    logger.warning("Aucune donnée chargée depuis Thomson_names.json")
                    return

                # Sélection des entités
                entites = (
                    self.phrases_data.get("entitesThomson", [])
                    if random.random() < 0.15
                    else self.phrases_data.get("entitesClassiques", [])
                )
                actions = self.phrases_data.get("actions", [])
                secteurs = self.phrases_data.get("secteurs", [])

                if not (entites and actions and secteurs):
                    return

                titre = f"👁️ {random.choice(entites)} {random.choice(actions)} {random.choice(secteurs)}..."
                logger.info(titre)
                lien = await self.scraping()
                image_url = random.choice(lien) if lien else None
                logger.info(image_url)
                embed = discord.Embed(
                    title=titre,
                    color=discord.Color.random()
                )
                if image_url:
                    embed.set_image(url=image_url)

                await message.channel.send(embed=embed)



async def setup(bot):
    """Fonction requise par discord.py pour charger le cog."""
    await bot.add_cog(EventsCog(bot))