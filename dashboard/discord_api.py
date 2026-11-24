"""Accès à l'API Discord pour le tableau de bord.

Le tableau de bord ne lance pas le bot : il lit seulement, avec le token du bot,
les serveurs, rôles et membres, et utilise la connexion OAuth2 « Se connecter
avec Discord » pour savoir qui est le visiteur.

DemoDiscord imite la même interface avec de fausses données, pour tester le
site en local sans compte Discord ni token.
"""
import time
from urllib.parse import urlencode

import aiohttp

API = "https://discord.com/api/v10"
CACHE_SECONDES = 60
PERMISSION_ADMINISTRATEUR = 0x8


def nom_affiche(membre):
    """Pseudo du serveur, sinon nom d'affichage, sinon nom d'utilisateur."""
    user = membre["user"]
    return membre.get("nick") or user.get("global_name") or user["username"]


def avatar_url(user):
    if user.get("avatar"):
        return f"https://cdn.discordapp.com/avatars/{user['id']}/{user['avatar']}.png?size=128"
    index = (int(user["id"]) >> 22) % 6  # avatar par défaut de Discord
    return f"https://cdn.discordapp.com/embed/avatars/{index}.png"


def est_admin_discord(serveur, membre):
    """Vrai si le membre est propriétaire ou a la permission Administrateur."""
    if str(serveur.get("owner_id")) == str(membre["user"]["id"]):
        return True
    roles = {str(r["id"]): r for r in serveur["roles"]}
    ids = set(map(str, membre.get("roles", []))) | {str(serveur["id"])}  # + @everyone
    for role_id in ids:
        role = roles.get(role_id)
        if role and int(role.get("permissions", 0)) & PERMISSION_ADMINISTRATEUR:
            return True
    return False


class DiscordAPI:
    def __init__(self, bot_token, client_id, client_secret, redirect_uri):
        self.bot_token = bot_token
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
        self._cache = {}
        self._session = None

    async def _http(self):
        if self._session is None or self._session.closed:
            self._session = aiohttp.ClientSession()
        return self._session

    async def fermer(self):
        if self._session and not self._session.closed:
            await self._session.close()

    async def _get_bot(self, chemin, params=None):
        cle = (chemin, tuple(sorted((params or {}).items())))
        en_cache = self._cache.get(cle)
        if en_cache and time.monotonic() - en_cache[0] < CACHE_SECONDES:
            return en_cache[1]
        http = await self._http()
        async with http.get(
            API + chemin, params=params, headers={"Authorization": f"Bot {self.bot_token}"}
        ) as rep:
            rep.raise_for_status()
            donnees = await rep.json()
        self._cache[cle] = (time.monotonic(), donnees)
        return donnees

    # ---------- Connexion OAuth2 du visiteur ----------
    def url_connexion(self, etat):
        return "https://discord.com/oauth2/authorize?" + urlencode({
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "response_type": "code",
            "scope": "identify",
            "state": etat,
        })

    async def utilisateur_depuis_code(self, code):
        http = await self._http()
        async with http.post(f"{API}/oauth2/token", data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.redirect_uri,
        }, auth=aiohttp.BasicAuth(self.client_id, self.client_secret)) as rep:
            rep.raise_for_status()
            jeton = (await rep.json())["access_token"]
        async with http.get(f"{API}/users/@me", headers={"Authorization": f"Bearer {jeton}"}) as rep:
            rep.raise_for_status()
            return await rep.json()

    # ---------- Données lues avec le token du bot ----------
    async def serveurs_du_bot(self):
        return await self._get_bot("/users/@me/guilds")

    async def serveur(self, guild_id):
        return await self._get_bot(f"/guilds/{guild_id}")

    async def membres(self, guild_id):
        cle = ("membres", str(guild_id))
        en_cache = self._cache.get(cle)
        if en_cache and time.monotonic() - en_cache[0] < CACHE_SECONDES:
            return en_cache[1]
        tous, apres = [], "0"
        while True:
            page = await self._get_bot(f"/guilds/{guild_id}/members", {"limit": "1000", "after": apres})
            tous.extend(page)
            if len(page) < 1000:
                break
            apres = page[-1]["user"]["id"]
        self._cache[cle] = (time.monotonic(), tous)
        return tous


class DemoDiscord:
    """Faux Discord pour les tests en local (DASHBOARD_DEMO=1)."""

    GUILD_ID = "100000000000000001"
    ROLE_B1 = "200000000000000001"
    ROLE_B2 = "200000000000000002"
    ROLE_PROF = "200000000000000003"
    ROLE_ADMIN = "200000000000000004"

    def __init__(self):
        g = self.GUILD_ID
        self._serveur = {
            "id": g,
            "name": "ESGI Reims (démo)",
            "icon": None,
            "owner_id": "300000000000000001",
            "roles": [
                {"id": g, "name": "@everyone", "permissions": "0", "position": 0, "color": 0},
                {"id": self.ROLE_B1, "name": "B1", "permissions": "0", "position": 2, "color": 0x22E4FF},
                {"id": self.ROLE_B2, "name": "B2", "permissions": "0", "position": 3, "color": 0x8B5CF6},
                {"id": self.ROLE_PROF, "name": "Professeurs", "permissions": "0", "position": 4, "color": 0xFF3DBB},
                {"id": self.ROLE_ADMIN, "name": "Staff", "permissions": str(PERMISSION_ADMINISTRATEUR), "position": 5, "color": 0xF5B942},
            ],
        }
        personnes = [
            ("300000000000000001", "Bryan", [self.ROLE_B1, self.ROLE_ADMIN]),
            ("300000000000000002", "Yanis", [self.ROLE_B1]),
            ("300000000000000003", "Alice", [self.ROLE_B1]),
            ("300000000000000004", "Inès", [self.ROLE_B1]),
            ("300000000000000005", "Lucas", [self.ROLE_B2]),
            ("300000000000000006", "Mehdi", [self.ROLE_B1]),
            ("300000000000000007", "Sarah", [self.ROLE_B2]),
            ("300000000000000008", "Tom", [self.ROLE_B1]),
            ("300000000000000009", "Mme Martin", [self.ROLE_PROF]),
        ]
        self._membres = [
            {"user": {"id": i, "username": n.lower().replace(" ", ""), "global_name": n, "avatar": None}, "nick": None, "roles": r}
            for i, n, r in personnes
        ]
        self._membres.append({"user": {"id": "399999999999999999", "username": "esgi-bot", "global_name": "ESGI-Bot", "avatar": None, "bot": True}, "nick": None, "roles": []})

    def utilisateurs_demo(self):
        return [m["user"] for m in self._membres if not m["user"].get("bot")]

    async def serveurs_du_bot(self):
        return [{"id": self.GUILD_ID, "name": self._serveur["name"], "icon": None}]

    async def serveur(self, guild_id):
        return self._serveur

    async def membres(self, guild_id):
        return self._membres

    async def fermer(self):
        pass
