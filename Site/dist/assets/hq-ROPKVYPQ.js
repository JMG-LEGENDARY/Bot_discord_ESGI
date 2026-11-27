import{n as e}from"./gsap-BZVPcu9T.js";import{B as t,G as n,K as r,P as i,Q as a,S as o,V as s,X as c,_ as l,b as u,bt as d,ct as f,dt as p,ht as m,j as h,m as g,ot as _,vt as v,w as y}from"./three-BzoxXuON.js";import{a as b,i as x,n as S,r as C,t as w}from"./api-config-BlMwZvh8.js";import{n as T}from"./api-CBo1b3_v.js";var E=[`Lundi`,`Mardi`,`Mercredi`,`Jeudi`,`Vendredi`];function D(e=new Date){let t=new Date(e),n=(t.getDay()+6)%7;return t.setDate(t.getDate()-n),t.toISOString().slice(0,10)}var O=[[{start:`09:00`,end:`12:00`,title:`Module A — Cours`,place:`Salle A`,kind:`cours`},{start:`13:30`,end:`16:30`,title:`Module B — TP`,place:`Labo 1`,kind:`tp`}],[{start:`09:00`,end:`12:00`,title:`Module C — Cours`,place:`Salle B`,kind:`cours`},{start:`13:30`,end:`15:30`,title:`Projet tutoré`,place:`Salle projet`,kind:`projet`}],[{start:`09:00`,end:`12:00`,title:`Module D — TD`,place:`Salle C`,kind:`td`}],[{start:`09:00`,end:`12:00`,title:`Module B — Cours`,place:`Salle A`,kind:`cours`},{start:`13:30`,end:`16:30`,title:`Module A — TP`,place:`Labo 2`,kind:`tp`}],[{start:`09:00`,end:`11:00`,title:`Évaluation — Module C`,place:`Amphi`,kind:`exam`}]],k=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.toISOString().slice(0,10)},A=[{id:`m1`,title:`Rendu du TP — Module B`,due:k(2),priority:`haute`,module:`Module B`},{id:`m2`,title:`Exercices du chapitre 3`,due:k(5),priority:`moyenne`,module:`Module A`},{id:`m3`,title:`Préparer la présentation du projet`,due:k(9),priority:`moyenne`,module:`Projet`},{id:`m4`,title:`Réviser l’évaluation`,due:k(4),priority:`haute`,module:`Module C`}],j=[{id:`t1`,label:`Relire le cours de la semaine`,done:!0},{id:`t2`,label:`Installer les outils du TP`,done:!1},{id:`t3`,label:`Répartir le travail du projet`,done:!1},{id:`t4`,label:`Vérifier les devoirs sur ESGI-Bot`,done:!1}],M=[{id:`i1`,level:`info`,title:`Canal du QG ouvert`,text:`Cette interface recevra l’emploi du temps et les missions dès que l’API sera branchée.`},{id:`i2`,level:`alerte`,title:`Évaluation vendredi`,text:`Exemple d’alerte importante : elle s’affiche en rose.`},{id:`i3`,level:`info`,title:`Rappels automatiques`,text:`Le bot ESGI-Bot envoie déjà les rappels des devoirs sur Discord.`}];function N(){try{let e=JSON.parse(localStorage.getItem(`esgi-qg-demo-tasks`)||`{}`);return j.map(t=>({...t,done:e[t.id]??t.done}))}catch{return j}}async function P(e=D()){return x()?{demo:!1,items:await S(w.schedule,{semaine:e})}:{demo:!0,items:E.map((e,t)=>({day:e,slots:O[t]}))}}async function F(){return x()?{demo:!1,items:await S(w.missions)}:{demo:!0,items:[...A].sort((e,t)=>e.due.localeCompare(t.due))}}async function I(){return x()?{demo:!1,items:await S(w.tasks)}:{demo:!0,items:N()}}async function L(e,t){if(x())return C(`PATCH`,`${w.tasks}/${encodeURIComponent(e)}`,{done:t});try{let n=JSON.parse(localStorage.getItem(`esgi-qg-demo-tasks`)||`{}`);n[e]=t,localStorage.setItem(`esgi-qg-demo-tasks`,JSON.stringify(n))}catch{}return{ok:!0}}async function R(){return x()?{demo:!1,items:await S(w.announcements)}:{demo:!0,items:M}}var z={cours:`COURS`,td:`TD`,tp:`TP`,projet:`PROJET`,exam:`ÉVALUATION`};function B(e,t){let n=document.createElement(`canvas`);n.width=256,n.height=140;let r=n.getContext(`2d`),i=t,a=()=>(i=(i*9301+49297)%233280)/233280;r.strokeStyle=e,r.fillStyle=e,r.globalAlpha=.9,r.lineWidth=2,r.strokeRect(3,3,250,134),r.globalAlpha=.25;for(let e=16;e<250;e+=20)r.fillRect(e,10,1,120);r.globalAlpha=.9,r.beginPath();for(let e=12;e<150;e+=6){let n=70+Math.sin(e*.08+t)*22+(a()-.5)*10;e===12?r.moveTo(e,n):r.lineTo(e,n)}r.stroke();for(let e=0;e<6;e++){let t=15+a()*55;r.fillRect(166+e*13,120-t,8,t)}r.globalAlpha=.6;for(let e=0;e<3;e++)r.fillRect(12,104+e*10,40+a()*90,4);let o=new l(n);return o.colorSpace=_,o}function V(e,t=1){return new r({color:new o(e).multiplyScalar(1.6),transparent:!0,opacity:t,blending:2,depthWrite:!1,toneMapped:!1})}function H({ship:l,root:_,onBack:x}){let S=b({renderer:l.renderer,accent:`#a78bfa`,accentHdr:[1,.55,2.2],layout:`hq`,camPos:new v(0,3.1,7.6),camTarget:new v(0,2,0),novaAnchor:{x:.95,y:-.6,z:-2.6,scale:.28}}),{scene:C,group:w}=S,E=new h;w.add(E);let O=new n(new y(2.1,2.5,1,64),S.metal);O.position.y=.5,E.add(O);let k=new n(new y(2.25,2.1,.12,64),S.dark);k.position.y=1.06,E.add(k);let A=new n(new m(2.24,.03,8,128),new r({color:new o(.5,.28,1.1),toneMapped:!1}));A.rotation.x=Math.PI/2,A.position.y=1.12,E.add(A);let j=new n(new u(1.9,64),V(`#8b5cf6`,.25));j.rotation.x=-Math.PI/2,j.position.y=1.13,E.add(j);let M=new h;M.position.y=2.55,E.add(M);let N=new s(new d(new i(1,3)),new t({color:new o(.5,.35,1.4),transparent:!0,opacity:.55,blending:2,depthWrite:!1,toneMapped:!1}));M.add(N);let H=new n(new p(.97,48,24),new f({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0}},vertexShader:`
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
      `}));M.add(H);let U=[];[[1.45,.4,`#22e4ff`],[1.75,-.6,`#ff3dbb`],[2.05,1.1,`#a78bfa`]].forEach(([e,t,r],i)=>{let a=new h;a.rotation.x=Math.PI/2+t*.4,a.rotation.z=t,M.add(a);let o=new n(new m(e,.008,4,160),V(r,.7));a.add(o);let s=new n(new c(.09),V(r));a.add(s),U.push({pivot:a,marker:s,r:e,speed:.35+i*.18,phase:i*2})});let W=new n(new y(1,1.7,1.4,48,1,!0),new f({transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec2 vUv; void main(){ gl_FragColor = vec4(vec3(0.45,0.3,1.2) * (1.0 - vUv.y) * 0.12, 1.0); }`}));W.position.y=1.85,E.add(W),S.glows.add(M,new v(0,0,0),[.6,.4,1.6],1.2);for(let e=0;e<6;e++){let t=e/6*Math.PI*2+Math.PI/6,r=new h;r.position.set(Math.sin(t)*5.4,0,Math.cos(t)*5.4),r.lookAt(0,0,0),w.add(r);let i=new n(new g(1.5,.9,.6),S.metal);i.position.y=.45,r.add(i);let o=V(`#ffffff`,.55);o.map=B(e%2?`#22e4ff`:`#a78bfa`,e*7+3);let s=new n(new a(1.3,.71),o);s.position.set(0,1.45,.05),s.rotation.x=-.25,r.add(s);let c=new n(new g(1.3,.02,.02),S.led);c.position.set(0,.92,.31),r.add(c)}let G=document.createElement(`section`);G.className=`place place-hq`,G.setAttribute(`aria-label`,`Quartier général`),G.innerHTML=`
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
    </div>`,_.appendChild(G),G.querySelector(`.place-back`).addEventListener(`click`,x);let K=G.querySelector(`.place-badge`),q=G.querySelector(`.hq-week`),J=G.querySelector(`.hq-slots`),Y=G.querySelector(`.hq-mission-list`),X=G.querySelector(`.hq-task-list`),ee=G.querySelector(`.hq-info-list`),Z=[],Q=Math.min(4,Math.max(0,(new Date().getDay()+6)%7)),te=e=>{let t=new Date(`${e}T12:00:00`),n=Math.round((t-new Date)/864e5);return{label:t.toLocaleDateString(`fr-FR`,{weekday:`short`,day:`numeric`,month:`short`}),days:n}};function $(){q.innerHTML=Z.map((e,t)=>`<button type="button" role="tab" aria-selected="${t===Q}" data-i="${t}">${T(e.day.slice(0,3).toUpperCase())}</button>`).join(``);let e=Z[Q]?.slots||[];J.innerHTML=e.length?e.map(e=>`
        <li class="hq-slot kind-${T(e.kind)}">
          <span class="hq-time">${T(e.start)}<i>${T(e.end)}</i></span>
          <span class="hq-slot-body"><b>${T(e.title)}</b><small>${T(e.place||``)}</small></span>
          <span class="hq-kind">${T(z[e.kind]||e.kind||``)}</span>
        </li>`).join(``):`<li class="hq-empty">Aucun créneau ce jour-là.</li>`}q.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-i]`);t&&(Q=Number(t.dataset.i),$())});function ne(e){X.innerHTML=e.map(e=>`
      <li><label class="hq-task ${e.done?`done`:``}">
        <input type="checkbox" data-id="${T(e.id)}" ${e.done?`checked`:``} />
        <span class="hq-check" aria-hidden="true"></span>${T(e.label)}
      </label></li>`).join(``)}X.addEventListener(`change`,async e=>{let t=e.target.closest(`input[data-id]`);if(t){t.closest(`.hq-task`).classList.toggle(`done`,t.checked);try{await L(t.dataset.id,t.checked)}catch{t.checked=!t.checked,t.closest(`.hq-task`).classList.toggle(`done`,t.checked)}}});async function re(){J.innerHTML=`<li class="hq-empty">Réception des données…</li>`;try{let[e,t,n,r]=await Promise.all([P(D()),F(),I(),R()]);K.hidden=!(e.demo||t.demo||n.demo||r.demo),Z=e.items,$(),Y.innerHTML=t.items.map(e=>{let t=te(e.due),n=t.days<=2;return`<li class="hq-mission prio-${T(e.priority)} ${n?`urgent`:``}">
            <span class="hq-mission-dot" aria-hidden="true"></span>
            <span class="hq-mission-body"><b>${T(e.title)}</b><small>${T(e.module||``)}</small></span>
            <span class="hq-due">${T(t.label)}<i>${t.days<=0?`aujourd’hui`:`J-${t.days}`}</i></span>
          </li>`}).join(``),ne(n.items),ee.innerHTML=r.items.map(e=>`<div class="hq-info level-${T(e.level)}"><b>${T(e.title)}</b><p>${T(e.text)}</p></div>`).join(``)}catch{J.innerHTML=`<li class="hq-empty">Liaison avec le QG impossible. Réessaie plus tard.</li>`}}function ie(e,t){M.rotation.y=t*.25,H.material.uniforms.uTime.value=t,M.position.y=2.55+Math.sin(t*1.2)*.05,U.forEach(e=>{let n=t*e.speed+e.phase;e.marker.position.set(Math.cos(n)*e.r,Math.sin(n)*e.r,0),e.marker.rotation.y=t*2}),S.update(e,t)}function ae(){G.classList.add(`open`),re(),S.playEntry(),e.fromTo(G.querySelectorAll(`.holo-panel`),{opacity:0,y:30,scale:.96},{opacity:1,y:0,scale:1,duration:.7,stagger:.12,delay:.5,ease:`power3.out`}),setTimeout(()=>S.nova.say(`Bienvenue au QG ! Ici on suivra l’emploi du temps et les missions 🛰️`,5e3),1400)}function oe(){G.classList.remove(`open`)}return{scene:C,camera:S.camera,update:ie,enter:ae,leave:oe,resize:S.fitCamera}}export{H as createHQ};