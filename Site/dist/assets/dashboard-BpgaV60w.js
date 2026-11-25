import{n as e,t}from"./api-CBo1b3_v.js";var n={eleve:`Élève`,delegue:`Délégué`,admin:`Admin du bot`,prof:`Professeur`},r=[{name:`/ajouter_un_devoir`,web:`Devoirs`,desc:`Ajoute un devoir pour ta classe`},{name:`/ajouter_une_évaluation`,web:`Évaluations`,desc:`Ajoute une évaluation pour ta classe`},{name:`/lister_les_devoirs`,web:`Devoirs`,desc:`Liste les prochains devoirs`},{name:`/lister_les_évaluations`,web:`Évaluations`,desc:`Liste les prochaines évaluations`},{name:`/configurer_les_classes`,web:`Classes`,desc:`Choisit les rôles qui sont des classes`},{name:`/admin_permission`,web:`Rangs`,desc:`Donne les droits admin du bot à un membre`},{name:`/ping`,web:null,desc:`Vérifie la latence du bot`},{name:`/nouvelle_identité`,web:null,desc:`Supprime tes messages (sur Discord uniquement)`},{name:`/implorer_le_tout_puissant`,web:null,desc:`Sigma Core`}];function i(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(`fr-FR`,{weekday:`short`,day:`numeric`,month:`long`})}function a(e){let[t,n,r]=e.split(`-`).map(Number),i=new Date;i.setHours(0,0,0,0);let a=Math.round((new Date(t,n-1,r)-i)/864e5);return a<0?{text:`passé`,tone:`past`}:a===0?{text:`aujourd'hui`,tone:`hot`}:a===1?{text:`demain`,tone:`hot`}:a<=7?{text:`dans ${a} j`,tone:`warm`}:{text:`dans ${a} j`,tone:`calm`}}function o(o,{say:s,onElevator:c,onLogout:l}){let u=null,d=null,f=`accueil`;o.innerHTML=`
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
    </div>`;let p=e=>o.querySelector(e),m=p(`.dash-nav`),h=p(`.dash-main`),g=p(`.dash-guild`);p(`[data-act="elevator"]`).addEventListener(`click`,c),p(`[data-act="logout"]`).addEventListener(`click`,l),g.addEventListener(`change`,()=>{d=u.serveurs.find(e=>e.id===g.value),v(),y()});function _(){let e=d?d.permissions:{},t=`Il te faut un rôle de classe sur ce serveur. Demande à un admin de configurer les classes.`;return[{id:`accueil`,icon:`◈`,label:`Accueil`,open:!0},{id:`devoirs`,icon:`✎`,label:`Devoirs`,open:e.voir&&u.base.devoirs,why:u.base.devoirs?t:`La base du bot n’a pas encore la table des devoirs : relance le bot.`},{id:`evaluations`,icon:`✓`,label:`Évaluations`,open:e.voir&&u.base.evaluations,why:u.base.evaluations?t:`La base du bot n’a pas encore la table des évaluations : relance le bot.`},{id:`classes`,icon:`◎`,label:`Classes`,open:e.configurer_classes&&u.base.classes,why:`Réservé aux administrateurs du serveur Discord ou du bot.`},{id:`rangs`,icon:`★`,label:`Rangs`,open:e.gerer_rangs&&u.base.rangs,why:`Réservé aux administrateurs du serveur Discord.`},{id:`commandes`,icon:`⌘`,label:`Commandes`,open:!0}]}function v(){m.innerHTML=_().map(e=>`
        <button type="button" class="dash-nav-btn ${e.id===f?`active`:``} ${e.open?``:`locked`}" data-mod="${e.id}">
          <span class="dash-nav-icon">${e.icon}</span>
          <span>${e.label}</span>
          ${e.open?``:`<span class="dash-lock" aria-label="verrouillé">🔒</span>`}
        </button>`).join(``),m.querySelectorAll(`.dash-nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{f=e.dataset.mod,v(),y()})})}function y(){if(h.scrollTop=0,!d){m.innerHTML=``,h.innerHTML=`
        <div class="dash-locked">
          <div class="dash-locked-icon">🛰️</div>
          <h2>Aucun serveur en commun</h2>
          <p>Ton compte Discord n’est sur aucun serveur où se trouve ESGI-Bot. Rejoins le serveur de ta classe puis reviens !</p>
        </div>`;return}let t=_().find(e=>e.id===f)||_()[0];t.open?{accueil:b,devoirs:()=>x(`devoirs`),evaluations:()=>x(`evaluations`),classes:S,rangs:C,commandes:w}[t.id]():(h.innerHTML=`
        <div class="dash-locked">
          <div class="dash-locked-icon">🔒</div>
          <h2>${t.label}</h2>
          <p>${e(t.why)}</p>
        </div>`,s(`Ce module est verrouillé pour ton compte 🔒`))}function b(){let t=d.permissions,r=[[`Voir les devoirs et évaluations de ta classe`,t.voir,`rôle de classe`],[`Ajouter un devoir ou une évaluation`,t.ajouter,`rôle de classe`],[`Modifier / supprimer tes propres ajouts`,t.ajouter,`rôle de classe`],[`Modifier / supprimer les ajouts des autres`,t.modifier_tout,`délégué, prof ou admin du bot`],[`Configurer les rôles de classe`,t.configurer_classes,`admin Discord ou admin du bot`],[`Changer le rang des membres`,t.gerer_rangs,`admin Discord`]];h.innerHTML=`
      <h2 class="dash-h">Bienvenue à ton étage, ${e(u.profil.nom)} 👋</h2>
      <div class="dash-cards">
        <div class="dash-card"><div class="dash-card-label">Serveur</div><div class="dash-card-value">${e(d.nom)}</div></div>
        <div class="dash-card"><div class="dash-card-label">Classe détectée</div><div class="dash-card-value">${d.classe?e(d.classe.nom):`—`}</div></div>
        <div class="dash-card"><div class="dash-card-label">Rang dans le bot</div><div class="dash-card-value">${n[d.rang]||e(d.rang)}</div></div>
        <div class="dash-card"><div class="dash-card-label">Admin Discord</div><div class="dash-card-value">${d.admin_discord?`Oui`:`Non`}</div></div>
      </div>
      <h3 class="dash-sub">Tes permissions</h3>
      <p class="dash-muted">Calculées à partir de tes rôles Discord et de ton rang dans le bot, comme sur Discord.</p>
      <ul class="dash-perms">
        ${r.map(([e,t,n])=>`
          <li class="${t?`ok`:`no`}">
            <span class="dash-perm-dot">${t?`✓`:`✕`}</span>
            <span class="dash-perm-label">${e}</span>
            <span class="dash-perm-need">${t?`autorisé`:`nécessite : ${n}`}</span>
          </li>`).join(``)}
      </ul>
      ${u.demo?`<p class="dash-demo">MODE DÉMO : fausses données, rien n’est envoyé sur Discord.</p>`:``}`}async function x(n){let r=n===`devoirs`,o=r?`Devoirs`:`Évaluations`;h.innerHTML=`<h2 class="dash-h">${o} — ${e(d.classe.nom)}</h2><p class="dash-muted">Chargement…</p>`;let c;try{c=(await t.list(d.id,n)).entrees}catch(t){h.innerHTML=`<h2 class="dash-h">${o}</h2><p class="dash-error">${e(t.message)}</p>`;return}let l=u.profil.id,f=d.permissions.modifier_tout,p=Object.entries(u.matieres).map(([t,n])=>`<option value="${e(t)}">${e(n.trim())}</option>`).join(``);h.innerHTML=`
      <h2 class="dash-h">${o} — ${e(d.classe.nom)}</h2>
      <form class="dash-form" novalidate>
        <div class="dash-form-row">
          <label>Matière<select name="matiere" required><option value="">Choisir…</option>${p}</select></label>
          <label>Date<input type="date" name="date" required /></label>
        </div>
        <label>Sujet <span class="dash-count">0 / 500</span>
          <textarea name="sujet" rows="3" minlength="20" maxlength="500" required placeholder="Au moins 20 caractères, comme sur Discord"></textarea>
        </label>
        <input type="hidden" name="entry" />
        <div class="dash-form-actions">
          <button type="submit" class="dash-btn">${r?`AJOUTER LE DEVOIR`:`AJOUTER L’ÉVALUATION`}</button>
          <button type="button" class="dash-btn ghost" data-act="cancel" hidden>ANNULER</button>
          <span class="dash-form-msg" role="status"></span>
        </div>
      </form>
      <ul class="dash-list">
        ${c.length?c.map(t=>{let n=a(t.date),r=t.auteur===l;return`
          <li class="dash-entry">
            <div class="dash-entry-head">
              <span class="dash-tag">${e((u.matieres[t.matiere]||t.matiere).trim())}</span>
              <span class="dash-date">${e(i(t.date))}</span>
              <span class="dash-when ${n.tone}">${n.text}</span>
            </div>
            <p class="dash-entry-text">${e(t.sujet)}</p>
            <div class="dash-entry-foot">
              <span class="dash-muted">Ajouté par ${r?`toi`:e(t.auteur_nom)}</span>
              ${r||f?`
                <button type="button" class="dash-link" data-edit="${t.id}">Modifier</button>
                <button type="button" class="dash-link danger" data-del="${t.id}">Supprimer</button>`:`<span class="dash-muted">🔒 lecture seule</span>`}
            </div>
          </li>`}).join(``):`<li class="dash-empty">Rien de prévu pour ta classe 🎉</li>`}
      </ul>`;let m=h.querySelector(`.dash-form`),g=m.querySelector(`.dash-form-msg`),_=m.querySelector(`.dash-count`),v=m.querySelector(`[type="submit"]`),y=m.querySelector(`[data-act="cancel"]`),b=v.textContent;m.sujet.addEventListener(`input`,()=>{_.textContent=`${m.sujet.value.trim().length} / 500`}),y.addEventListener(`click`,()=>{m.reset(),m.entry.value=``,v.textContent=b,y.hidden=!0,_.textContent=`0 / 500`}),m.addEventListener(`submit`,async e=>{e.preventDefault();let r={matiere:m.matiere.value,date:m.date.value,sujet:m.sujet.value.trim()};if(!r.matiere||!r.date)g.textContent=`Choisis une matière et une date.`;else if(r.sujet.length<20)g.textContent=`Le sujet doit faire au moins 20 caractères.`;else{v.disabled=!0,g.textContent=`Envoi…`;try{m.entry.value?await t.update(d.id,n,m.entry.value,r):await t.add(d.id,n,r),s(m.entry.value?`Modifié ! ✏️`:`C’est noté ! Le bot préviendra ta classe 📬`),x(n)}catch(e){g.textContent=e.message,v.disabled=!1}}}),h.querySelectorAll(`[data-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=c.find(t=>String(t.id)===e.dataset.edit);m.matiere.value=t.matiere,m.date.value=t.date,m.sujet.value=t.sujet,m.entry.value=t.id,_.textContent=`${t.sujet.length} / 500`,v.textContent=`ENREGISTRER`,y.hidden=!1,m.scrollIntoView({behavior:`smooth`,block:`start`}),m.sujet.focus()})}),h.querySelectorAll(`[data-del]`).forEach(e=>{e.addEventListener(`click`,async()=>{if(e.dataset.confirm!==`1`)e.dataset.confirm=`1`,e.textContent=`Confirmer ?`;else try{await t.remove(d.id,n,e.dataset.del),s(`${r?`Devoir supprimé`:`Évaluation supprimée`} 🗑️`),x(n)}catch(e){s(e.message)}})})}function S(){let n=new Set(d.classes);h.innerHTML=`
      <h2 class="dash-h">Rôles de classe</h2>
      <p class="dash-muted">Coche les rôles Discord qui correspondent à une classe (B1, B2…). Le bot s’en sert pour savoir dans quelle classe est chaque élève.</p>
      <div class="dash-roles">
        ${(d.roles||[]).map(t=>`
          <label class="dash-role">
            <input type="checkbox" value="${e(t.id)}" ${n.has(t.id)?`checked`:``} />
            <span class="dash-role-dot" style="background:${t.couleur===`#000000`?`#8a93a8`:e(t.couleur)}"></span>
            <span>${e(t.nom)}</span>
          </label>`).join(``)}
      </div>
      <div class="dash-form-actions">
        <button type="button" class="dash-btn" data-act="save">ENREGISTRER</button>
        <span class="dash-form-msg" role="status"></span>
      </div>`,h.querySelector(`[data-act="save"]`).addEventListener(`click`,async()=>{let e=[...h.querySelectorAll(`.dash-role input:checked`)].map(e=>e.value),n=h.querySelector(`.dash-form-msg`);try{await t.setClasses(d.id,e),n.textContent=`Enregistré ✓`,s(`Classes mises à jour ! 🎓`),await T()}catch(e){n.textContent=e.message}})}function C(){let r=e=>u.rangs.map(t=>`<option value="${t}" ${t===e?`selected`:``}>${n[t]||t}</option>`).join(``);h.innerHTML=`
      <h2 class="dash-h">Rangs des membres</h2>
      <p class="dash-muted">Délégués, profs et admins du bot peuvent modifier les devoirs et évaluations de toute leur classe.</p>
      <ul class="dash-members">
        ${(d.membres||[]).map(t=>`
          <li>
            <img src="${e(t.avatar)}" alt="" loading="lazy" />
            <span class="dash-member-name">${e(t.nom)}</span>
            <select data-user="${e(t.id)}" aria-label="Rang de ${e(t.nom)}">${r(t.rang)}</select>
          </li>`).join(``)}
      </ul>`,h.querySelectorAll(`select[data-user]`).forEach(e=>{e.addEventListener(`change`,async()=>{try{await t.setRank(d.id,e.dataset.user,e.value),s(`Rang mis à jour : ${n[e.value]} ✓`),e.dataset.user===u.profil.id&&await T()}catch(e){s(e.message)}})})}function w(){h.innerHTML=`
      <h2 class="dash-h">Commandes du bot</h2>
      <p class="dash-muted">Ce que tu peux faire depuis ce tableau de bord, et ce qui reste sur Discord.</p>
      <ul class="dash-commands">
        ${r.map(t=>`
          <li>
            <code>${e(t.name)}</code>
            <span>${e(t.desc)}</span>
            <span class="dash-chip ${t.web?`web`:``}">${t.web?`ici : ${t.web}`:`Discord uniquement`}</span>
          </li>`).join(``)}
      </ul>`}async function T(){let e=d&&d.id;u=await t.myFloor(),d=u.serveurs.find(t=>t.id===e)||u.serveurs[0]||null,v(),y()}return{async load(){h.innerHTML=`<p class="dash-muted">Chargement de ton étage…</p>`,u=await t.myFloor(),p(`.dash-avatar`).src=u.profil?u.profil.avatar:``,p(`.dash-name`).textContent=u.profil?u.profil.nom:``,d=u.serveurs[0]||null,g.innerHTML=u.serveurs.map(t=>`<option value="${e(t.id)}">${e(t.nom)}</option>`).join(``),g.hidden=u.serveurs.length<2,f=`accueil`,d&&v(),y()}}}export{o as createDashboard};