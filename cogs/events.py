import discord
from discord.ext import commands
from config import config

from LOGS import logger


class EventsCog(commands.Cog):
    """Gestion des événements Discord"""

    def __init__(self, bot):
        self.bot = bot
        self.user_message_history = {}  # Suivi des messages pour copier-coller
        self.voice_activity = {}  # Suivi de l'activité vocale

    @commands.Cog.listener()
    async def on_message(self, message: discord.Message):
        """Gère les messages reçus"""
        # Ignorer les bots et les commandes
        logs_channel_id = config.salon_logs
        mc_bot_id = config.MC_JOIN_ID
        print(
            f"Message reçu: {message.author} dans {message.channel}: {message.content}\n {message.author.id} - {mc_bot_id}")

        if message.author.bot and message.author.id != mc_bot_id:
            return
        if message.content.startswith('/'):
            return

        if logs_channel_id and message.channel.id == logs_channel_id:
            if message.author.id != mc_bot_id:
                return

