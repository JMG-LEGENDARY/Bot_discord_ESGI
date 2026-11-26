import{n as e}from"./gsap-BZVPcu9T.js";import{A as t,B as n,C as r,G as i,N as a,W as o,Y as s,Z as c,_t as l,ft as u,ht as d,p as f,st as p,ut as m,x as h,y as g,z as _}from"./three-BM3ZYzA6.js";import{a as v,i as y,n as b,r as x,t as S}from"./api-config-DdjGvgwn.js";import{n as C}from"./api-CBo1b3_v.js";var w=[`Lundi`,`Mardi`,`Mercredi`,`Jeudi`,`Vendredi`];function T(e=new Date){let t=new Date(e),n=(t.getDay()+6)%7;return t.setDate(t.getDate()-n),t.toISOString().slice(0,10)}var E=[[{start:`09:00`,end:`12:00`,title:`Module A — Cours`,place:`Salle A`,kind:`cours`},{start:`13:30`,end:`16:30`,title:`Module B — TP`,place:`Labo 1`,kind:`tp`}],[{start:`09:00`,end:`12:00`,title:`Module C — Cours`,place:`Salle B`,kind:`cours`},{start:`13:30`,end:`15:30`,title:`Projet tutoré`,place:`Salle projet`,kind:`projet`}],[{start:`09:00`,end:`12:00`,title:`Module D — TD`,place:`Salle C`,kind:`td`}],[{start:`09:00`,end:`12:00`,title:`Module B — Cours`,place:`Salle A`,kind:`cours`},{start:`13:30`,end:`16:30`,title:`Module A — TP`,place:`Labo 2`,kind:`tp`}],[{start:`09:00`,end:`11:00`,title:`Évaluation — Module C`,place:`Amphi`,kind:`exam`}]],D=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.toISOString().slice(0,10)},O=[{id:`m1`,title:`Rendu du TP — Module B`,due:D(2),priority:`haute`,module:`Module B`},{id:`m2`,title:`Exercices du chapitre 3`,due:D(5),priority:`moyenne`,module:`Module A`},{id:`m3`,title:`Préparer la présentation du projet`,due:D(9),priority:`moyenne`,module:`Projet`},{id:`m4`,title:`Réviser l’évaluation`,due:D(4),priority:`haute`,module:`Module C`}],k=[{id:`t1`,label:`Relire le cours de la semaine`,done:!0},{id:`t2`,label:`Installer les outils du TP`,done:!1},{id:`t3`,label:`Répartir le travail du projet`,done:!1},{id:`t4`,label:`Vérifier les devoirs sur ESGI-Bot`,done:!1}],A=[{id:`i1`,level:`info`,title:`Canal du QG ouvert`,text:`Cette interface recevra l’emploi du temps et les missions dès que l’API sera branchée.`},{id:`i2`,level:`alerte`,title:`Évaluation vendredi`,text:`Exemple d’alerte importante : elle s’affiche en rose.`},{id:`i3`,level:`info`,title:`Rappels automatiques`,text:`Le bot ESGI-Bot envoie déjà les rappels des devoirs sur Discord.`}];function j(){try{let e=JSON.parse(localStorage.getItem(`esgi-qg-demo-tasks`)||`{}`);return k.map(t=>({...t,done:e[t.id]??t.done}))}catch{return k}}async function M(e=T()){return y()?{demo:!1,items:await b(S.schedule,{semaine:e})}:{demo:!0,items:w.map((e,t)=>({day:e,slots:E[t]}))}}async function N(){return y()?{demo:!1,items:await b(S.missions)}:{demo:!0,items:[...O].sort((e,t)=>e.due.localeCompare(t.due))}}async function P(){return y()?{demo:!1,items:await b(S.tasks)}:{demo:!0,items:j()}}async function F(e,t){if(y())return x(`PATCH`,`${S.tasks}/${encodeURIComponent(e)}`,{done:t});try{let n=JSON.parse(localStorage.getItem(`esgi-qg-demo-tasks`)||`{}`);n[e]=t,localStorage.setItem(`esgi-qg-demo-tasks`,JSON.stringify(n))}catch{}return{ok:!0}}async function I(){return y()?{demo:!1,items:await b(S.announcements)}:{demo:!0,items:A}}var L={cours:`COURS`,td:`TD`,tp:`TP`,projet:`PROJET`,exam:`ÉVALUATION`};function R(e,t=1){return new i({color:new h(e).multiplyScalar(1.6),transparent:!0,opacity:t,blending:2,depthWrite:!1,toneMapped:!1})}function z({ship:y,root:b,onBack:x}){let S=v({renderer:y.renderer,accent:`#a78bfa`,accentHdr:[1,.55,2.2],layout:`hq`,camPos:new d(0,3.1,7.6),camTarget:new d(0,2,0),novaAnchor:{x:.95,y:-.6,z:-2.6,scale:.28}}),{scene:w,group:E}=S,D=new t;E.add(D);let O=new o(new r(2.1,2.5,1,64),S.metal);O.position.y=.5,D.add(O);let k=new o(new r(2.25,2.1,.12,64),S.dark);k.position.y=1.06,D.add(k);let A=new o(new u(2.24,.03,8,128),new i({color:new h(1,.55,2.2),toneMapped:!1}));A.rotation.x=Math.PI/2,A.position.y=1.12,D.add(A);let j=new o(new g(1.9,64),R(`#8b5cf6`,.25));j.rotation.x=-Math.PI/2,j.position.y=1.13,D.add(j);let z=new t;z.position.y=2.55,D.add(z);let B=new n(new l(new a(1,3)),new _({color:new h(.5,.35,1.4),transparent:!0,opacity:.55,blending:2,depthWrite:!1,toneMapped:!1}));z.add(B);let V=new o(new m(.97,48,24),new p({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0}},vertexShader:`
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vV = normalize(-mv.xyz); vP = position;
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        uniform float uTime;
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          float fres = pow(1.0 - abs(dot(vN, vV)), 2.5);
          // Continents en points lumineux
          float lat = asin(clamp(vP.y, -1.0, 1.0));
          float lon = atan(vP.z, vP.x) + uTime * 0.15;
          vec2 g = vec2(lon * 18.0, lat * 18.0);
          float dots = smoothstep(0.32, 0.0, length(fract(g) - 0.5));
          float land = step(0.15, sin(lon * 3.0) * cos(lat * 4.0 + 1.0) + sin(lon * 5.0 + lat * 2.0) * 0.5);
          vec3 col = vec3(0.35, 0.25, 1.1) * fres * 1.4 + vec3(0.3, 0.9, 1.3) * dots * land * 0.6;
          gl_FragColor = vec4(col, 1.0);
        }
      `}));z.add(V);let H=[];[[1.45,.4,`#22e4ff`],[1.75,-.6,`#ff3dbb`],[2.05,1.1,`#a78bfa`]].forEach(([e,n,r],i)=>{let a=new t;a.rotation.x=Math.PI/2+n*.4,a.rotation.z=n,z.add(a);let c=new o(new u(e,.008,4,160),R(r,.7));a.add(c);let l=new o(new s(.09),R(r));a.add(l),H.push({pivot:a,marker:l,r:e,speed:.35+i*.18,phase:i*2})});let U=new o(new r(1,1.7,1.4,48,1,!0),new p({transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec2 vUv; void main(){ gl_FragColor = vec4(vec3(0.45,0.3,1.2) * (1.0 - vUv.y) * 0.12, 1.0); }`}));U.position.y=1.85,D.add(U),S.glows.add(z,new d(0,0,0),[.6,.4,1.6],1.2);for(let e=0;e<6;e++){let n=e/6*Math.PI*2+Math.PI/6,r=new t;r.position.set(Math.sin(n)*5.4,0,Math.cos(n)*5.4),r.lookAt(0,0,0),E.add(r);let i=new o(new f(1.5,.9,.6),S.metal);i.position.y=.45,r.add(i);let a=new o(new c(1.3,.7),R(e%2?`#22e4ff`:`#a78bfa`,.35));a.position.set(0,1.45,.05),a.rotation.x=-.25,r.add(a);let s=new o(new f(1.3,.02,.02),S.led);s.position.set(0,.92,.31),r.add(s)}let W=document.createElement(`section`);W.className=`place place-hq`,W.setAttribute(`aria-label`,`Quartier général`),W.innerHTML=`
    <header class="place-head">
      <button type="button" class="place-back">↩ <span>RETOUR AU COCKPIT</span></button>
      <div class="place-title">
        <span class="place-kicker">DESTINATION // MISSIONS</span>
        <h1>QUARTIER GÉNÉRAL</h1>
      </div>
      <span class="place-badge" hidden>DONNÉES DE DÉMONSTRATION · API NON CONNECTÉE</span>
    </header>
    <div class="place-grid hq-grid">
      <article class="holo-panel hq-schedule">
        <h2><span>01</span> EMPLOI DU TEMPS</h2>
        <div class="hq-week" role="tablist" aria-label="Jours de la semaine"></div>
        <ol class="hq-slots" aria-live="polite"></ol>
      </article>
      <article class="holo-panel hq-missions">
        <h2><span>02</span> MISSIONS</h2>
        <ul class="hq-mission-list"></ul>
        <h2 class="hq-sub"><span>03</span> TÂCHES</h2>
        <ul class="hq-task-list"></ul>
      </article>
      <article class="holo-panel hq-infos">
        <h2><span>04</span> INFORMATIONS IMPORTANTES</h2>
        <div class="hq-info-list"></div>
      </article>
    </div>`,b.appendChild(W),W.querySelector(`.place-back`).addEventListener(`click`,x);let G=W.querySelector(`.place-badge`),K=W.querySelector(`.hq-week`),q=W.querySelector(`.hq-slots`),J=W.querySelector(`.hq-mission-list`),Y=W.querySelector(`.hq-task-list`),X=W.querySelector(`.hq-info-list`),Z=[],Q=Math.min(4,Math.max(0,(new Date().getDay()+6)%7)),ee=e=>{let t=new Date(`${e}T12:00:00`),n=Math.round((t-new Date)/864e5);return{label:t.toLocaleDateString(`fr-FR`,{weekday:`short`,day:`numeric`,month:`short`}),days:n}};function $(){K.innerHTML=Z.map((e,t)=>`<button type="button" role="tab" aria-selected="${t===Q}" data-i="${t}">${C(e.day.slice(0,3).toUpperCase())}</button>`).join(``);let e=Z[Q]?.slots||[];q.innerHTML=e.length?e.map(e=>`
        <li class="hq-slot kind-${C(e.kind)}">
          <span class="hq-time">${C(e.start)}<i>${C(e.end)}</i></span>
          <span class="hq-slot-body"><b>${C(e.title)}</b><small>${C(e.place||``)}</small></span>
          <span class="hq-kind">${C(L[e.kind]||e.kind||``)}</span>
        </li>`).join(``):`<li class="hq-empty">Aucun créneau ce jour-là.</li>`}K.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-i]`);t&&(Q=Number(t.dataset.i),$())});function te(e){Y.innerHTML=e.map(e=>`
      <li><label class="hq-task ${e.done?`done`:``}">
        <input type="checkbox" data-id="${C(e.id)}" ${e.done?`checked`:``} />
        <span class="hq-check" aria-hidden="true"></span>${C(e.label)}
      </label></li>`).join(``)}Y.addEventListener(`change`,async e=>{let t=e.target.closest(`input[data-id]`);if(t){t.closest(`.hq-task`).classList.toggle(`done`,t.checked);try{await F(t.dataset.id,t.checked)}catch{t.checked=!t.checked,t.closest(`.hq-task`).classList.toggle(`done`,t.checked)}}});async function ne(){q.innerHTML=`<li class="hq-empty">Réception des données…</li>`;try{let[e,t,n,r]=await Promise.all([M(T()),N(),P(),I()]);G.hidden=!(e.demo||t.demo||n.demo||r.demo),Z=e.items,$(),J.innerHTML=t.items.map(e=>{let t=ee(e.due),n=t.days<=2;return`<li class="hq-mission prio-${C(e.priority)} ${n?`urgent`:``}">
            <span class="hq-mission-dot" aria-hidden="true"></span>
            <span class="hq-mission-body"><b>${C(e.title)}</b><small>${C(e.module||``)}</small></span>
            <span class="hq-due">${C(t.label)}<i>${t.days<=0?`aujourd’hui`:`J-${t.days}`}</i></span>
          </li>`}).join(``),te(n.items),X.innerHTML=r.items.map(e=>`<div class="hq-info level-${C(e.level)}"><b>${C(e.title)}</b><p>${C(e.text)}</p></div>`).join(``)}catch{q.innerHTML=`<li class="hq-empty">Liaison avec le QG impossible. Réessaie plus tard.</li>`}}function re(e,t){z.rotation.y=t*.25,V.material.uniforms.uTime.value=t,z.position.y=2.55+Math.sin(t*1.2)*.05,H.forEach(e=>{let n=t*e.speed+e.phase;e.marker.position.set(Math.cos(n)*e.r,Math.sin(n)*e.r,0),e.marker.rotation.y=t*2}),S.update(e,t)}function ie(){W.classList.add(`open`),ne(),S.playEntry(),e.fromTo(W.querySelectorAll(`.holo-panel`),{opacity:0,y:30,scale:.96},{opacity:1,y:0,scale:1,duration:.7,stagger:.12,delay:.5,ease:`power3.out`}),setTimeout(()=>S.nova.say(`Bienvenue au QG ! Ici on suivra l’emploi du temps et les missions 🛰️`,5e3),1400)}function ae(){W.classList.remove(`open`)}return{scene:w,camera:S.camera,update:re,enter:ie,leave:ae,resize:S.fitCamera}}export{z as createHQ};