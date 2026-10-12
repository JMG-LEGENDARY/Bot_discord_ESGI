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
    "architecture réseau": " Archi-des-réseaux",
    "architecture web": "🌐 Architecture web",
    "connaissance de l'entreprise": "🏢 Connaissance de l'entreprise",
    "circuits logiques": "🔌 Circuits logiques",
    "cyber sécurité": "🛡️ Cyber sécurité",
    "exel": "📊 Excel",
    "html": "🌐 HTML",
    "IA": "🤖 Intelligence artificielle",
    "javascript": "🟨 JavaScript",
    "language C": "💻 Langage C",
    "SQL": "🗄️ SQL",
    "linux": "🐧 Linux",
    "projet-annuel": "🛠️ Projet",
}

categories = {
    "devoir": "📝 Devoir",
    "examen": "📚 Contrôle / Examen",
    "evenement": "🎉 Événement",
    "autre": "📌 Autre",
}

cours_CHOICES = [
    app_commands.Choice(name=label, value=key) for key, label in cours.items()
]
CATEGORY_CHOICES = [
    app_commands.Choice(name=label, value=key) for key, label in categories.items()
]
