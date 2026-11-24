"""Serveur du tableau de bord ESGI-Bot (comme le panel de DraftBot).

- Connexion avec Discord (OAuth2, permission « identify » seulement).
- Chaque compte n'accède qu'à SON étage : ses serveurs, sa classe, et les
  actions que ses rôles lui permettent (mêmes règles que le bot).
- Lit et écrit dans la base du bot (bot.db) ; ne lance pas le bot et ne
  modifie pas son code.

Lancement (depuis la racine du projet) :
    .venv\\Scripts\\python dashboard\\serveur.py          (Windows)
    .venv/bin/python dashboard/serveur.py               (Linux / macOS)

Configuration : fichier dashboard/.env (voir .env.example).
Mode démo sans Discord : DASHBOARD_DEMO=1 (fausses données, base demo.db).
"""
import json
import os
import secrets
import sys
import time
from pathlib import Path

from aiohttp import web

ICI = Path(__file__).resolve().parent
RACINE = ICI.parent
sys.path.insert(0, str(ICI))

from discord_api import DemoDiscord, DiscordAPI, avatar_url, est_admin_discord, nom_affiche  # noqa: E402
from donnees import MATIERES, RANGS, RANGS_GESTION, TYPES, Base, ErreurDonnees, creer_base_demo  # noqa: E402


def charger_env(chemin):
    """Lit un fichier .env simple (CLE=valeur), sans dépendance."""
    if not chemin.exists():
        return
    for ligne in chemin.read_text(encoding="utf-8").splitlines():
        ligne = ligne.strip()
        if not ligne or ligne.startswith("#") or "=" not in ligne:
            continue
        cle, valeur = ligne.split("=", 1)
        os.environ.setdefault(cle.strip(), valeur.strip().strip('"').strip("'"))


charger_env(ICI / ".env")

DEMO = os.environ.get("DASHBOARD_DEMO") == "1"
HOTE = os.environ.get("DASHBOARD_HOST", "127.0.0.1")
PORT = int(os.environ.get("DASHBOARD_PORT", "8787"))
# Adresse publique du site (sert à construire l'adresse de retour de Discord)
URL_SITE = os.environ.get("DASHBOARD_URL", f"http://localhost:{PORT}").rstrip("/")
COOKIE_SECURISE = URL_SITE.startswith("https://")
DUREE_SESSION = 7 * 24 * 3600
COOKIE = "esgi_session"
DOSSIER_SITE = RACINE / "Site" / "dist"

if DEMO:
    discord = DemoDiscord()
    chemin_base = ICI / "demo.db"
    creer_base_demo(chemin_base, discord)
else:
    manquants = [c for c in ("DISCORD_CLIENT_ID", "DISCORD_CLIENT_SECRET", "DISCORD_BOT_TOKEN") if not os.environ.get(c)]
    if manquants:
        sys.exit(
            "Il manque dans dashboard/.env : " + ", ".join(manquants)
            + "\n(ou lance le mode démo avec DASHBOARD_DEMO=1)"
        )
    discord = DiscordAPI(
        os.environ["DISCORD_BOT_TOKEN"],
        os.environ["DISCORD_CLIENT_ID"],
        os.environ["DISCORD_CLIENT_SECRET"],
        f"{URL_SITE}/api/auth/retour",
    )
    chemin_base = Path(os.environ.get("BOT_DB_PATH", RACINE / "bot.db"))
    if not chemin_base.exists():
        sys.exit(f"Base du bot introuvable : {chemin_base} (lance le bot une fois, ou règle BOT_DB_PATH)")

base = Base(str(chemin_base))
sessions = {}  # jeton -> {"id", "expire"}


# ---------------------------------------------------------------------------
# Outils
# ---------------------------------------------------------------------------
def erreur(message, statut=400):
    return web.json_response({"erreur": message}, status=statut)


def session_de(request):
    jeton = request.cookies.get(COOKIE)
    s = sessions.get(jeton) if jeton else None
    if s and s["expire"] > time.time():
        return s
    if jeton:
        sessions.pop(jeton, None)
    return None


def ouvrir_session(reponse, user_id):
    jeton = secrets.token_urlsafe(32)
    sessions[jeton] = {"id": str(user_id), "expire": time.time() + DUREE_SESSION}
    reponse.set_cookie(COOKIE, jeton, max_age=DUREE_SESSION, httponly=True,
                       samesite="Lax", secure=COOKIE_SECURISE, path="/")


@web.middleware
async def protections(request, handler):
    # Les modifications ne sont acceptées qu'avec l'en-tête envoyé par le site
    # lui-même (un autre site ne peut pas l'ajouter avec le cookie).
    if request.method in ("POST", "PUT", "DELETE") and request.path.startswith("/api/") \
            and not request.path.startswith("/api/auth/"):
        if request.headers.get("X-ESGI-Dashboard") != "1":
            return erreur("Requête refusée.", 403)
    try:
        reponse = await handler(request)
    except ErreurDonnees as e:
        return erreur(str(e), e.statut)
    except web.HTTPException:
        raise
    except Exception as e:  # On ne montre jamais le détail technique au visiteur
        print(f"[dashboard] Erreur : {type(e).__name__}: {e}")
        return erreur("Le serveur a rencontré un problème. Réessaie dans un instant.", 500)
    reponse.headers.setdefault("X-Content-Type-Options", "nosniff")
    return reponse


async def contexte(user_id):
    """Serveurs communs au visiteur et au bot, avec ses droits sur chacun."""
    resultat = []
    for g in await discord.serveurs_du_bot():
        membres = await discord.membres(g["id"])
        moi = next((m for m in membres if str(m["user"]["id"]) == str(user_id)), None)
        if not moi:
            continue
        serveur = await discord.serveur(g["id"])
        classes = base.roles_de_classe(g["id"])
        # Même logique que get_classe_role du bot : 1re classe trouvée dans ses rôles
        ses_roles = set(map(str, moi.get("roles", [])))
        classe_id = next((c for c in classes if c in ses_roles), None)
        resultat.append({
            "serveur": serveur, "membres": membres, "moi": moi, "classes": classes,
            "classe_id": classe_id, "rang": base.rang(user_id),
            "admin_discord": est_admin_discord(serveur, moi),
        })
    return resultat


def permissions(c):
    """Actions disponibles pour ce compte (mêmes règles que le bot)."""
    a_classe = c["classe_id"] is not None
    return {
        "voir": a_classe,
        "ajouter": a_classe,
        "modifier_tout": a_classe and c["rang"] in RANGS_GESTION,
        "configurer_classes": c["admin_discord"] or c["rang"] == "admin",
        "gerer_rangs": c["admin_discord"],
    }


async def contexte_serveur(request, guild_id):
    s = session_de(request)
    if not s:
        raise ErreurDonnees("Connecte-toi d'abord avec Discord.", 401)
    for c in await contexte(s["id"]):
        if str(c["serveur"]["id"]) == str(guild_id):
            return s, c
    raise ErreurDonnees("Tu n'es pas sur ce serveur.", 403)


async def lire_json(request):
    try:
        donnees = await request.json()
    except (json.JSONDecodeError, UnicodeDecodeError):
        raise ErreurDonnees("Données illisibles.")
    if not isinstance(donnees, dict):
        raise ErreurDonnees("Données illisibles.")
    return donnees


# ---------------------------------------------------------------------------
# Connexion
# ---------------------------------------------------------------------------
async def connexion(request):
    if DEMO:
        raise web.HTTPFound("/api/auth/demo")
    etat = secrets.token_urlsafe(16)
    rep = web.HTTPFound(discord.url_connexion(etat))
    rep.set_cookie("esgi_oauth", etat, max_age=600, httponly=True, samesite="Lax",
                   secure=COOKIE_SECURISE, path="/api/auth")
    raise rep


async def retour(request):
    etat = request.query.get("state")
    if not etat or etat != request.cookies.get("esgi_oauth"):
        raise web.HTTPFound("/?ascenseur=refus")
    code = request.query.get("code")
    if not code:  # Le visiteur a annulé sur Discord
        raise web.HTTPFound("/?ascenseur=refus")
    user = await discord.utilisateur_depuis_code(code)
    rep = web.HTTPFound("/?ascenseur=1")
    rep.del_cookie("esgi_oauth", path="/api/auth")
    ouvrir_session(rep, user["id"])
    raise rep


async def connexion_demo(request):
    """Mode démo uniquement : choisir avec quel faux compte se connecter."""
    if not DEMO:
        raise web.HTTPNotFound()
    user_id = request.query.get("id")
    comptes = {u["id"]: u for u in discord.utilisateurs_demo()}
    if user_id in comptes:
        rep = web.HTTPFound("/?ascenseur=1")
        ouvrir_session(rep, user_id)
        raise rep
    liens = "".join(
        f'<li><a href="/api/auth/demo?id={u["id"]}">{u["global_name"]}</a></li>' for u in comptes.values()
    )
    page = f"""<!doctype html><meta charset="utf-8"><title>Connexion démo</title>
<style>body{{font-family:system-ui;background:#060814;color:#e8ecff;padding:40px}}
a{{color:#22e4ff;font-size:1.2rem;line-height:2}}</style>
<h1>Mode démo</h1><p>Choisis un faux compte Discord :</p><ul>{liens}</ul>"""
    return web.Response(text=page, content_type="text/html")


async def deconnexion(request):
    sessions.pop(request.cookies.get(COOKIE), None)
    rep = web.json_response({"ok": True})
    rep.del_cookie(COOKIE, path="/")
    return rep


# ---------------------------------------------------------------------------
# API
# ---------------------------------------------------------------------------
async def etat(request):
    return web.json_response({"connecte": bool(session_de(request)), "demo": DEMO})


async def etages(request):
    """Liste des étages : les comptes Discord liés au bot (serveurs communs)."""
    s = session_de(request)
    if not s:
        return erreur("Connecte-toi d'abord avec Discord.", 401)
    personnes = {}
    moi = None
    for c in await contexte(s["id"]):
        for m in c["membres"]:
            u = m["user"]
            if u.get("bot"):
                continue
            entree = {"id": str(u["id"]), "nom": nom_affiche(m), "avatar": avatar_url(u)}
            personnes.setdefault(entree["id"], entree)
            if entree["id"] == s["id"]:
                moi = entree
    liste = sorted(personnes.values(), key=lambda p: (p["nom"].casefold(), p["id"]))
    return web.json_response({"etages": liste, "moi": moi})


async def mon_etage(request):
    s = session_de(request)
    if not s:
        return erreur("Connecte-toi d'abord avec Discord.", 401)
    serveurs = []
    profil = None
    for c in await contexte(s["id"]):
        g = c["serveur"]
        roles = {str(r["id"]): r for r in g["roles"]}
        perms = permissions(c)
        if profil is None:
            profil = {"id": s["id"], "nom": nom_affiche(c["moi"]), "avatar": avatar_url(c["moi"]["user"])}
        info = {
            "id": str(g["id"]),
            "nom": g["name"],
            "rang": c["rang"],
            "admin_discord": c["admin_discord"],
            "classe": {"id": c["classe_id"], "nom": roles.get(c["classe_id"], {}).get("name", "?")} if c["classe_id"] else None,
            "permissions": perms,
            "classes": c["classes"],
        }
        if perms["configurer_classes"]:
            info["roles"] = [
                {"id": str(r["id"]), "nom": r["name"], "couleur": f"#{int(r.get('color', 0)):06x}"}
                for r in sorted(g["roles"], key=lambda r: -int(r.get("position", 0)))
                if str(r["id"]) != str(g["id"]) and not r.get("managed")
            ]
        if perms["gerer_rangs"]:
            humains = [m for m in c["membres"] if not m["user"].get("bot")]
            rangs = base.rangs([m["user"]["id"] for m in humains])
            info["membres"] = sorted(
                ({"id": str(m["user"]["id"]), "nom": nom_affiche(m), "avatar": avatar_url(m["user"]),
                  "rang": rangs.get(str(m["user"]["id"]), "eleve")} for m in humains),
                key=lambda p: p["nom"].casefold(),
            )
        serveurs.append(info)
    return web.json_response({
        "profil": profil, "serveurs": serveurs, "matieres": MATIERES, "rangs": RANGS,
        "base": base.disponibilites(), "demo": DEMO,
    })


def classe_obligatoire(c):
    if not c["classe_id"]:
        raise ErreurDonnees("Tu n'as aucun rôle de classe sur ce serveur (demande à un admin : /configurer_les_classes).", 403)
    return c["classe_id"]


async def lister(request):
    _, c = await contexte_serveur(request, request.match_info["guild"])
    entrees = base.lister(request.match_info["type"], c["serveur"]["id"], classe_obligatoire(c))
    noms = {str(m["user"]["id"]): nom_affiche(m) for m in c["membres"]}
    for e in entrees:
        e["auteur_nom"] = noms.get(e["auteur"], "Ancien membre")
    return web.json_response({"entrees": entrees})


async def ajouter(request):
    s, c = await contexte_serveur(request, request.match_info["guild"])
    classe = classe_obligatoire(c)
    nouvel_id = base.ajouter(request.match_info["type"], c["serveur"]["id"], classe, s["id"], await lire_json(request))
    return web.json_response({"id": nouvel_id}, status=201)


async def modifier(request):
    s, c = await contexte_serveur(request, request.match_info["guild"])
    classe = classe_obligatoire(c)
    base.modifier(request.match_info["type"], c["serveur"]["id"], classe, request.match_info["id"],
                  permissions(c)["modifier_tout"], s["id"], await lire_json(request))
    return web.json_response({"ok": True})


async def supprimer(request):
    s, c = await contexte_serveur(request, request.match_info["guild"])
    classe = classe_obligatoire(c)
    base.supprimer(request.match_info["type"], c["serveur"]["id"], classe, request.match_info["id"],
                   permissions(c)["modifier_tout"], s["id"])
    return web.json_response({"ok": True})


async def definir_classes(request):
    _, c = await contexte_serveur(request, request.match_info["guild"])
    if not permissions(c)["configurer_classes"]:
        return erreur("Réservé aux administrateurs du serveur ou du bot.", 403)
    roles = (await lire_json(request)).get("roles")
    valides = {str(r["id"]) for r in c["serveur"]["roles"]}
    if not isinstance(roles, list) or not set(map(str, roles)) <= valides:
        return erreur("Rôles invalides.")
    base.definir_roles_de_classe(c["serveur"]["id"], roles)
    return web.json_response({"ok": True})


async def definir_rang(request):
    _, c = await contexte_serveur(request, request.match_info["guild"])
    if not permissions(c)["gerer_rangs"]:
        return erreur("Réservé aux administrateurs du serveur Discord.", 403)
    cible = request.match_info["user"]
    if not any(str(m["user"]["id"]) == cible for m in c["membres"]):
        return erreur("Membre introuvable.", 404)
    base.definir_rang(cible, (await lire_json(request)).get("rang"))
    return web.json_response({"ok": True})


# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------
async def accueil(request):
    index = DOSSIER_SITE / "index.html"
    if index.exists():
        return web.FileResponse(index)
    return web.Response(text="Site non construit : lance « npm run build » dans Site/.", status=404)


async def fermeture(app):
    await discord.fermer()


def creer_app():
    app = web.Application(middlewares=[protections], client_max_size=64 * 1024)
    app.router.add_get("/api/etat", etat)
    app.router.add_get("/api/auth/connexion", connexion)
    app.router.add_get("/api/auth/retour", retour)
    app.router.add_get("/api/auth/demo", connexion_demo)
    app.router.add_post("/api/auth/deconnexion", deconnexion)
    app.router.add_get("/api/etages", etages)
    app.router.add_get("/api/etage", mon_etage)
    app.router.add_get("/api/serveurs/{guild:\\d+}/{type:devoirs|evaluations}", lister)
    app.router.add_post("/api/serveurs/{guild:\\d+}/{type:devoirs|evaluations}", ajouter)
    app.router.add_put("/api/serveurs/{guild:\\d+}/{type:devoirs|evaluations}/{id:\\d+}", modifier)
    app.router.add_delete("/api/serveurs/{guild:\\d+}/{type:devoirs|evaluations}/{id:\\d+}", supprimer)
    app.router.add_put("/api/serveurs/{guild:\\d+}/classes", definir_classes)
    app.router.add_put("/api/serveurs/{guild:\\d+}/rangs/{user:\\d+}", definir_rang)
    # En production, ce serveur sert aussi le site construit (Site/dist)
    app.router.add_get("/", accueil)
    if DOSSIER_SITE.exists():
        app.router.add_static("/", DOSSIER_SITE)
    app.on_cleanup.append(fermeture)
    return app


if __name__ == "__main__":
    print(f"Tableau de bord ESGI-Bot sur {URL_SITE}" + ("  (MODE DÉMO)" if DEMO else ""))
    print(f"Base utilisée : {chemin_base}")
    web.run_app(creer_app(), host=HOTE, port=PORT, print=None)
