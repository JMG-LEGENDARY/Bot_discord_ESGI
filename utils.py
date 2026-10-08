from datetime import datetime
import discord
from discord import app_commands

from config import config

format_date = "%d/%m/%Y %H:%M"

cours = {
    "maths": "📐 Mathématiques",
    "francais": "📖 Français",
    "anglais": "🇬🇧 Anglais",
    "algorithmique": "💻 Algorithmique",
    "architecture réseau": "🏛️ Archi-des-réseaux",
}
categories = {
    "devoir": "📝 Devoir",
    "examen": "📚 Contrôle / Examen",
    "evenement": "🎉 Événement",
    "autre": "📌 Autre",
}