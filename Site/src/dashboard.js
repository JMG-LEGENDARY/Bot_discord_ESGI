import { api, esc } from './api.js';

// =========================================================================
// L'ÉTAGE DU VISITEUR : son tableau de bord (inspiré du panel de DraftBot)
// Chaque module n'est utilisable que si les rôles du compte le permettent ;
// sinon il apparaît verrouillé avec la raison. Le serveur revérifie tout.
// =========================================================================

const RANG_LABELS = { eleve: 'Élève', delegue: 'Délégué', admin: 'Admin du bot', prof: 'Professeur' };

const DISCORD_COMMANDS = [
  { name: '/ajouter_un_devoir', web: 'Devoirs', desc: 'Ajoute un devoir pour ta classe' },
  { name: '/ajouter_une_évaluation', web: 'Évaluations', desc: 'Ajoute une évaluation pour ta classe' },
  { name: '/lister_les_devoirs', web: 'Devoirs', desc: 'Liste les prochains devoirs' },
  { name: '/lister_les_évaluations', web: 'Évaluations', desc: 'Liste les prochaines évaluations' },
  { name: '/configurer_les_classes', web: 'Classes', desc: 'Choisit les rôles qui sont des classes' },
  { name: '/admin_permission', web: 'Rangs', desc: 'Donne les droits admin du bot à un membre' },
  { name: '/ping', web: null, desc: 'Vérifie la latence du bot' },
  { name: '/nouvelle_identité', web: null, desc: 'Supprime tes messages (sur Discord uniquement)' },
  { name: '/implorer_le_tout_puissant', web: null, desc: 'Sigma Core' }
];

function frenchDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' });
}

function daysUntil(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(y, m - 1, d) - today) / 86400000);
  if (diff < 0) return { text: 'passé', tone: 'past' };
  if (diff === 0) return { text: "aujourd'hui", tone: 'hot' };
  if (diff === 1) return { text: 'demain', tone: 'hot' };
  if (diff <= 7) return { text: `dans ${diff} j`, tone: 'warm' };
  return { text: `dans ${diff} j`, tone: 'calm' };
}

export function createDashboard(root, { say, onElevator, onLogout }) {
  let data = null;
  let guild = null;
  let module = 'accueil';

  root.innerHTML = `
    <div class="dash">
      <header class="dash-top">
        <div class="dash-who">
          <img class="dash-avatar" alt="" />
          <div>
            <div class="dash-kicker">ÉTAGE PRIVÉ</div>
            <div class="dash-name"></div>
          </div>
        </div>
        <select class="dash-guild" aria-label="Serveur Discord"></select>
        <div class="dash-actions">
          <button type="button" class="dash-btn ghost" data-act="elevator">↩ ASCENSEUR</button>
          <button type="button" class="dash-btn ghost" data-act="logout">SE DÉCONNECTER</button>
        </div>
      </header>
      <div class="dash-body">
        <nav class="dash-nav" aria-label="Modules"></nav>
        <main class="dash-main" tabindex="-1"></main>
      </div>
    </div>`;

  const $ = (sel) => root.querySelector(sel);
  const nav = $('.dash-nav');
  const main = $('.dash-main');
  const guildSelect = $('.dash-guild');

  $('[data-act="elevator"]').addEventListener('click', onElevator);
  $('[data-act="logout"]').addEventListener('click', onLogout);
  guildSelect.addEventListener('change', () => {
    guild = data.serveurs.find((g) => g.id === guildSelect.value);
    renderNav();
    renderModule();
  });

  function modules() {
    const p = guild ? guild.permissions : {};
    const noClass = 'Il te faut un rôle de classe sur ce serveur. Demande à un admin de configurer les classes.';
    return [
      { id: 'accueil', icon: '◈', label: 'Accueil', open: true },
      { id: 'devoirs', icon: '✎', label: 'Devoirs', open: p.voir && data.base.devoirs, why: data.base.devoirs ? noClass : 'La base du bot n’a pas encore la table des devoirs : relance le bot.' },
      { id: 'evaluations', icon: '✓', label: 'Évaluations', open: p.voir && data.base.evaluations, why: data.base.evaluations ? noClass : 'La base du bot n’a pas encore la table des évaluations : relance le bot.' },
      { id: 'classes', icon: '◎', label: 'Classes', open: p.configurer_classes && data.base.classes, why: 'Réservé aux administrateurs du serveur Discord ou du bot.' },
      { id: 'rangs', icon: '★', label: 'Rangs', open: p.gerer_rangs && data.base.rangs, why: 'Réservé aux administrateurs du serveur Discord.' },
      { id: 'commandes', icon: '⌘', label: 'Commandes', open: true }
    ];
  }

  function renderNav() {
    nav.innerHTML = modules()
      .map((m) => `
        <button type="button" class="dash-nav-btn ${m.id === module ? 'active' : ''} ${m.open ? '' : 'locked'}" data-mod="${m.id}">
          <span class="dash-nav-icon">${m.icon}</span>
          <span>${m.label}</span>
          ${m.open ? '' : '<span class="dash-lock" aria-label="verrouillé">🔒</span>'}
        </button>`)
      .join('');
    nav.querySelectorAll('.dash-nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        module = btn.dataset.mod;
        renderNav();
        renderModule();
      });
    });
  }

  function renderModule() {
    main.scrollTop = 0;
    if (!guild) {
      nav.innerHTML = '';
      main.innerHTML = `
        <div class="dash-locked">
          <div class="dash-locked-icon">🛰️</div>
          <h2>Aucun serveur en commun</h2>
          <p>Ton compte Discord n’est sur aucun serveur où se trouve ESGI-Bot. Rejoins le serveur de ta classe puis reviens !</p>
        </div>`;
      return;
    }
    const m = modules().find((x) => x.id === module) || modules()[0];
    if (!m.open) {
      main.innerHTML = `
        <div class="dash-locked">
          <div class="dash-locked-icon">🔒</div>
          <h2>${m.label}</h2>
          <p>${esc(m.why)}</p>
        </div>`;
      say('Ce module est verrouillé pour ton compte 🔒');
      return;
    }
    ({
      accueil: renderHome,
      devoirs: () => renderEntries('devoirs'),
      evaluations: () => renderEntries('evaluations'),
      classes: renderClasses,
      rangs: renderRanks,
      commandes: renderCommands
    })[m.id]();
  }

  // ---------- Accueil : profil et permissions ----------
  function renderHome() {
    const p = guild.permissions;
    const rows = [
      ['Voir les devoirs et évaluations de ta classe', p.voir, 'rôle de classe'],
      ['Ajouter un devoir ou une évaluation', p.ajouter, 'rôle de classe'],
      ['Modifier / supprimer tes propres ajouts', p.ajouter, 'rôle de classe'],
      ['Modifier / supprimer les ajouts des autres', p.modifier_tout, 'délégué, prof ou admin du bot'],
      ['Configurer les rôles de classe', p.configurer_classes, 'admin Discord ou admin du bot'],
      ['Changer le rang des membres', p.gerer_rangs, 'admin Discord']
    ];
    main.innerHTML = `
      <h2 class="dash-h">Bienvenue à ton étage, ${esc(data.profil.nom)} 👋</h2>
      <div class="dash-cards">
        <div class="dash-card"><div class="dash-card-label">Serveur</div><div class="dash-card-value">${esc(guild.nom)}</div></div>
        <div class="dash-card"><div class="dash-card-label">Classe détectée</div><div class="dash-card-value">${guild.classe ? esc(guild.classe.nom) : '—'}</div></div>
        <div class="dash-card"><div class="dash-card-label">Rang dans le bot</div><div class="dash-card-value">${RANG_LABELS[guild.rang] || esc(guild.rang)}</div></div>
        <div class="dash-card"><div class="dash-card-label">Admin Discord</div><div class="dash-card-value">${guild.admin_discord ? 'Oui' : 'Non'}</div></div>
      </div>
      <h3 class="dash-sub">Tes permissions</h3>
      <p class="dash-muted">Calculées à partir de tes rôles Discord et de ton rang dans le bot, comme sur Discord.</p>
      <ul class="dash-perms">
        ${rows.map(([label, ok, need]) => `
          <li class="${ok ? 'ok' : 'no'}">
            <span class="dash-perm-dot">${ok ? '✓' : '✕'}</span>
            <span class="dash-perm-label">${label}</span>
            <span class="dash-perm-need">${ok ? 'autorisé' : `nécessite : ${need}`}</span>
          </li>`).join('')}
      </ul>
      ${data.demo ? '<p class="dash-demo">MODE DÉMO : fausses données, rien n’est envoyé sur Discord.</p>' : ''}`;
  }

  // ---------- Devoirs / évaluations ----------
  async function renderEntries(type) {
    const isHomework = type === 'devoirs';
    const label = isHomework ? 'devoir' : 'évaluation';
    const title = isHomework ? 'Devoirs' : 'Évaluations';
    main.innerHTML = `<h2 class="dash-h">${title} — ${esc(guild.classe.nom)}</h2><p class="dash-muted">Chargement…</p>`;
    let entries;
    try {
      entries = (await api.list(guild.id, type)).entrees;
    } catch (e) {
      main.innerHTML = `<h2 class="dash-h">${title}</h2><p class="dash-error">${esc(e.message)}</p>`;
      return;
    }
    const myId = data.profil.id;
    const canAll = guild.permissions.modifier_tout;
    const options = Object.entries(data.matieres)
      .map(([k, v]) => `<option value="${esc(k)}">${esc(v.trim())}</option>`).join('');

    main.innerHTML = `
      <h2 class="dash-h">${title} — ${esc(guild.classe.nom)}</h2>
      <form class="dash-form" novalidate>
        <div class="dash-form-row">
          <label>Matière<select name="matiere" required><option value="">Choisir…</option>${options}</select></label>
          <label>Date<input type="date" name="date" required /></label>
        </div>
        <label>Sujet <span class="dash-count">0 / 500</span>
          <textarea name="sujet" rows="3" minlength="20" maxlength="500" required placeholder="Au moins 20 caractères, comme sur Discord"></textarea>
        </label>
        <input type="hidden" name="entry" />
        <div class="dash-form-actions">
          <button type="submit" class="dash-btn">${isHomework ? 'AJOUTER LE DEVOIR' : 'AJOUTER L’ÉVALUATION'}</button>
          <button type="button" class="dash-btn ghost" data-act="cancel" hidden>ANNULER</button>
          <span class="dash-form-msg" role="status"></span>
        </div>
      </form>
      <ul class="dash-list">
        ${entries.length ? entries.map((e) => {
          const when = daysUntil(e.date);
          const mine = e.auteur === myId;
          return `
          <li class="dash-entry">
            <div class="dash-entry-head">
              <span class="dash-tag">${esc((data.matieres[e.matiere] || e.matiere).trim())}</span>
              <span class="dash-date">${esc(frenchDate(e.date))}</span>
              <span class="dash-when ${when.tone}">${when.text}</span>
            </div>
            <p class="dash-entry-text">${esc(e.sujet)}</p>
            <div class="dash-entry-foot">
              <span class="dash-muted">Ajouté par ${mine ? 'toi' : esc(e.auteur_nom)}</span>
              ${mine || canAll ? `
                <button type="button" class="dash-link" data-edit="${e.id}">Modifier</button>
                <button type="button" class="dash-link danger" data-del="${e.id}">Supprimer</button>`
                : '<span class="dash-muted">🔒 lecture seule</span>'}
            </div>
          </li>`;
        }).join('') : `<li class="dash-empty">Rien de prévu pour ta classe 🎉</li>`}
      </ul>`;

    const form = main.querySelector('.dash-form');
    const msg = form.querySelector('.dash-form-msg');
    const count = form.querySelector('.dash-count');
    const submit = form.querySelector('[type="submit"]');
    const cancel = form.querySelector('[data-act="cancel"]');
    const addLabel = submit.textContent;
    form.sujet.addEventListener('input', () => {
      count.textContent = `${form.sujet.value.trim().length} / 500`;
    });
    cancel.addEventListener('click', () => {
      form.reset();
      form.entry.value = '';
      submit.textContent = addLabel;
      cancel.hidden = true;
      count.textContent = '0 / 500';
    });

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const entry = { matiere: form.matiere.value, date: form.date.value, sujet: form.sujet.value.trim() };
      if (!entry.matiere || !entry.date) {
        msg.textContent = 'Choisis une matière et une date.';
        return;
      }
      if (entry.sujet.length < 20) {
        msg.textContent = 'Le sujet doit faire au moins 20 caractères.';
        return;
      }
      submit.disabled = true;
      msg.textContent = 'Envoi…';
      try {
        if (form.entry.value) await api.update(guild.id, type, form.entry.value, entry);
        else await api.add(guild.id, type, entry);
        say(form.entry.value ? 'Modifié ! ✏️' : `C’est noté ! Le bot préviendra ta classe 📬`);
        renderEntries(type);
      } catch (e) {
        msg.textContent = e.message;
        submit.disabled = false;
      }
    });

    main.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const e = entries.find((x) => String(x.id) === btn.dataset.edit);
        form.matiere.value = e.matiere;
        form.date.value = e.date;
        form.sujet.value = e.sujet;
        form.entry.value = e.id;
        count.textContent = `${e.sujet.length} / 500`;
        submit.textContent = 'ENREGISTRER';
        cancel.hidden = false;
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        form.sujet.focus();
      });
    });
    main.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (btn.dataset.confirm !== '1') {
          btn.dataset.confirm = '1';
          btn.textContent = 'Confirmer ?';
          return;
        }
        try {
          await api.remove(guild.id, type, btn.dataset.del);
          say(`${isHomework ? 'Devoir supprimé' : 'Évaluation supprimée'} 🗑️`);
          renderEntries(type);
        } catch (e) {
          say(e.message);
        }
      });
    });
  }

  // ---------- Classes ----------
  function renderClasses() {
    const selected = new Set(guild.classes);
    main.innerHTML = `
      <h2 class="dash-h">Rôles de classe</h2>
      <p class="dash-muted">Coche les rôles Discord qui correspondent à une classe (B1, B2…). Le bot s’en sert pour savoir dans quelle classe est chaque élève.</p>
      <div class="dash-roles">
        ${(guild.roles || []).map((r) => `
          <label class="dash-role">
            <input type="checkbox" value="${esc(r.id)}" ${selected.has(r.id) ? 'checked' : ''} />
            <span class="dash-role-dot" style="background:${r.couleur === '#000000' ? '#8a93a8' : esc(r.couleur)}"></span>
            <span>${esc(r.nom)}</span>
          </label>`).join('')}
      </div>
      <div class="dash-form-actions">
        <button type="button" class="dash-btn" data-act="save">ENREGISTRER</button>
        <span class="dash-form-msg" role="status"></span>
      </div>`;
    main.querySelector('[data-act="save"]').addEventListener('click', async () => {
      const roles = [...main.querySelectorAll('.dash-role input:checked')].map((i) => i.value);
      const out = main.querySelector('.dash-form-msg');
      try {
        await api.setClasses(guild.id, roles);
        out.textContent = 'Enregistré ✓';
        say('Classes mises à jour ! 🎓');
        await reload();
      } catch (e) {
        out.textContent = e.message;
      }
    });
  }

  // ---------- Rangs ----------
  function renderRanks() {
    const opts = (cur) => data.rangs
      .map((r) => `<option value="${r}" ${r === cur ? 'selected' : ''}>${RANG_LABELS[r] || r}</option>`).join('');
    main.innerHTML = `
      <h2 class="dash-h">Rangs des membres</h2>
      <p class="dash-muted">Délégués, profs et admins du bot peuvent modifier les devoirs et évaluations de toute leur classe.</p>
      <ul class="dash-members">
        ${(guild.membres || []).map((m) => `
          <li>
            <img src="${esc(m.avatar)}" alt="" loading="lazy" />
            <span class="dash-member-name">${esc(m.nom)}</span>
            <select data-user="${esc(m.id)}" aria-label="Rang de ${esc(m.nom)}">${opts(m.rang)}</select>
          </li>`).join('')}
      </ul>`;
    main.querySelectorAll('select[data-user]').forEach((sel) => {
      sel.addEventListener('change', async () => {
        try {
          await api.setRank(guild.id, sel.dataset.user, sel.value);
          say(`Rang mis à jour : ${RANG_LABELS[sel.value]} ✓`);
          if (sel.dataset.user === data.profil.id) await reload();
        } catch (e) {
          say(e.message);
        }
      });
    });
  }

  // ---------- Commandes ----------
  function renderCommands() {
    main.innerHTML = `
      <h2 class="dash-h">Commandes du bot</h2>
      <p class="dash-muted">Ce que tu peux faire depuis ce tableau de bord, et ce qui reste sur Discord.</p>
      <ul class="dash-commands">
        ${DISCORD_COMMANDS.map((c) => `
          <li>
            <code>${esc(c.name)}</code>
            <span>${esc(c.desc)}</span>
            <span class="dash-chip ${c.web ? 'web' : ''}">${c.web ? `ici : ${c.web}` : 'Discord uniquement'}</span>
          </li>`).join('')}
      </ul>`;
  }

  async function reload() {
    const previous = guild && guild.id;
    data = await api.myFloor();
    guild = data.serveurs.find((g) => g.id === previous) || data.serveurs[0] || null;
    renderNav();
    renderModule();
  }

  return {
    async load() {
      main.innerHTML = '<p class="dash-muted">Chargement de ton étage…</p>';
      data = await api.myFloor();
      $('.dash-avatar').src = data.profil ? data.profil.avatar : '';
      $('.dash-name').textContent = data.profil ? data.profil.nom : '';
      guild = data.serveurs[0] || null;
      guildSelect.innerHTML = data.serveurs.map((g) => `<option value="${esc(g.id)}">${esc(g.nom)}</option>`).join('');
      guildSelect.hidden = data.serveurs.length < 2;
      module = 'accueil';
      if (guild) renderNav();
      renderModule();
    }
  };
}
