import{n as e}from"./gsap-BZVPcu9T.js";import{B as t,G as n,J as r,K as i,S as a,V as o,X as s,ct as ee,et as c,g as l,h as u,ht as d,j as f,k as p,m,q as h,tt as g,vt as _,w as v}from"./three-BzoxXuON.js";import{a as y,i as b,n as x,t as S}from"./api-config-Ddldtp4W.js";import{n as C}from"./api-CBo1b3_v.js";var w=[{id:`tout`,label:`Tout`},{id:`cours`,label:`Cours`},{id:`documents`,label:`Documents`},{id:`supports`,label:`Supports de travail`},{id:`outils`,label:`Outils`}],T=[{id:`r1`,category:`cours`,title:`Introduction — Module A`,module:`Module A`,format:`PDF`,size:`1,2 Mo`,url:null},{id:`r2`,category:`cours`,title:`Chapitre 2 — Module B`,module:`Module B`,format:`Diapos`,size:`3,4 Mo`,url:null},{id:`r3`,category:`documents`,title:`Règlement des études`,module:`Général`,format:`PDF`,size:`420 Ko`,url:null},{id:`r4`,category:`documents`,title:`Calendrier du semestre`,module:`Général`,format:`PDF`,size:`180 Ko`,url:null},{id:`r5`,category:`supports`,title:`Énoncé du TP 1`,module:`Module B`,format:`PDF`,size:`650 Ko`,url:null},{id:`r6`,category:`supports`,title:`Fichiers de départ du projet`,module:`Projet`,format:`ZIP`,size:`2,1 Mo`,url:null},{id:`r7`,category:`outils`,title:`Guide d’installation des outils`,module:`Général`,format:`Web`,size:`—`,url:null},{id:`r8`,category:`outils`,title:`Commandes d’ESGI-Bot`,module:`ESGI-Bot`,format:`Web`,size:`—`,url:`#/esgi-bot`}];async function te({category:e=`tout`,q:t=``}={}){if(b())return{demo:!1,items:await x(S.resources,{categorie:e===`tout`?``:e,q:t})};let n=t.trim().toLowerCase();return{demo:!0,items:T.filter(t=>(e===`tout`||t.category===e)&&(!n||`${t.title} ${t.module}`.toLowerCase().includes(n)))}}async function ne(){return b()?{connected:!0,items:await x(S.samples)}:{connected:!1,items:[]}}var re={PDF:`📄`,Diapos:`🖥️`,ZIP:`🗜️`,Web:`🌐`};function E({ship:b,root:x,onBack:S}){let T=y({renderer:b.renderer,accent:`#ff3dbb`,accentHdr:[2.2,.35,1.5],layout:`lab`,camPos:new _(0,2.6,6.8),camTarget:new _(0,2.1,-1.5),novaAnchor:{x:1,y:-.55,z:-2.6,scale:.28}}),{scene:E,group:D}=T,ie=new h({color:14217471,roughness:.06,metalness:0,transparent:!0,opacity:.16,envMapIntensity:.6,depthWrite:!1}),O=[],ae=[`#22e4ff`,`#ff3dbb`,`#a78bfa`,`#3dffa8`,`#ffd166`,`#22e4ff`,`#ff3dbb`];for(let e=0;e<7;e++){let t=Math.PI+(e-3)*.32,o=new f;o.position.set(Math.sin(t)*6.3,0,Math.cos(t)*6.3),D.add(o);let c=new a(ae[e]),l=new n(new v(.62,.7,.5,32),T.metal);l.position.y=.25,o.add(l);let u=new n(new v(.7,.62,.4,32),T.metal);u.position.y=3.6,o.add(u);let p=new n(new v(.5,.5,2.9,32,1,!0),new ee({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0},uColor:{value:c.clone().multiplyScalar(.9)},uBoost:{value:0},uSeed:{value:e*1.7}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
          uniform float uTime; uniform vec3 uColor; uniform float uBoost; uniform float uSeed;
          varying vec2 vUv;
          float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
          void main() {
            vec2 g = vec2(vUv.x * 18.0, vUv.y * 10.0 - uTime * (0.6 + hash(vec2(floor(vUv.x * 18.0), uSeed)) * 0.8));
            vec2 cell = floor(g);
            float r = hash(cell + uSeed);
            float bubble = r > 0.82 ? smoothstep(0.3, 0.05, length(fract(g) - 0.5)) : 0.0;
            float glow = 0.22 + 0.25 * vUv.y + bubble * 0.9;
            float waves = 0.85 + 0.15 * sin(vUv.y * 30.0 - uTime * 3.0 + vUv.x * 6.28);
            gl_FragColor = vec4(uColor * glow * waves * (0.55 + uBoost * 0.9), 1.0);
          }
        `}));p.position.y=1.95,o.add(p);let m=new n(new v(.6,.6,2.9,32,1,!0),ie);m.position.y=1.95,o.add(m);let h=new n(new s(.22,0),new r({color:c,emissive:c,emissiveIntensity:1.2,metalness:.2,roughness:.15}));h.scale.y=1.6,h.position.y=2,o.add(h),[.52,3.38].forEach(e=>{let t=new n(new d(.64,.02,6,48),new i({color:c.clone().multiplyScalar(1.4),toneMapped:!1}));t.rotation.x=Math.PI/2,t.position.y=e,o.add(t)}),T.glows.add(h,new _(0,0,0),[c.r*1.4,c.g*1.4,c.b*1.4],.9),O.push({crystal:h,liquid:p,phase:e*.9})}let k=new f;D.add(k);let A=new n(new m(3.4,.95,1.3),T.metal);A.position.y=.475,k.add(A);let j=new n(new m(3.6,.08,1.45),T.dark);j.position.y=.99,k.add(j);let M=new n(new m(3.5,.02,.02),T.led);M.position.set(0,.94,.73),k.add(M);let N=new n(new v(.32,.38,.06,32),T.metal);N.position.y=1.06,k.add(N);let P=new l,F=new Float32Array(540),I=new Float32Array(540),L=new a(.3,1.4,2),R=new a(2,.4,1.4);for(let e=0;e<90;e++){let t=e/90*2.4,n=e*.35;F.set([Math.cos(n)*.45,t,Math.sin(n)*.45],e*6),F.set([Math.cos(n+Math.PI)*.45,t,Math.sin(n+Math.PI)*.45],e*6+3),I.set([L.r,L.g,L.b],e*6),I.set([R.r,R.g,R.b],e*6+3)}P.setAttribute(`position`,new u(F,3)),P.setAttribute(`color`,new u(I,3));let z=new f;z.position.y=1.2,k.add(z);let B=new c(P,new g({size:.07,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}));z.add(B);let oe=new o((()=>{let e=new l,t=[];for(let e=0;e<90;e+=3)t.push(F[e*6],F[e*6+1],F[e*6+2],F[e*6+3],F[e*6+4],F[e*6+5]);return e.setAttribute(`position`,new p(t,3)),e})(),new t({color:new a(.6,.5,1.4),transparent:!0,opacity:.5,blending:2,depthWrite:!1,toneMapped:!1}));z.add(oe),T.glows.add(z,new _(0,1.2,0),[.8,.5,1.6],1);let V=document.createElement(`section`);V.className=`place place-lab`,V.setAttribute(`aria-label`,`Laboratoire`),V.innerHTML=`
    <header class="place-head">
      <button type="button" class="place-back">↩ <span>RETOUR AU COCKPIT</span></button>
      <div class="place-title">
        <span class="place-kicker">DESTINATION // LABORATOIRE</span>
        <h1>RESSOURCES PÉDAGOGIQUES</h1>
      </div>
      <span class="place-badge" hidden>DONNÉES DE DÉMONSTRATION · API NON CONNECTÉE</span>
    </header>
    <div class="lab-grid">
      <article class="holo-panel lab-library">
        <h2><span>01</span> BIBLIOTHÈQUE</h2>
        <div class="lab-tools">
          <div class="lab-tabs" role="tablist" aria-label="Catégories">
            ${w.map((e,t)=>`<button type="button" role="tab" data-cat="${e.id}" aria-selected="${t===0}">${C(e.label)}</button>`).join(``)}
          </div>
          <input class="lab-search" type="search" placeholder="Rechercher un cours, un document…" aria-label="Rechercher une ressource" />
        </div>
        <ul class="lab-list" aria-live="polite"></ul>
      </article>
      <div class="lab-side">
        <button type="button" class="lab-samples-btn" aria-expanded="false"><i aria-hidden="true">🧪</i> VOIR LES ÉCHANTILLONS RAMASSÉS</button>
        <article class="holo-panel lab-samples" hidden>
          <h2><span>02</span> ÉCHANTILLONS RAMASSÉS</h2>
          <div class="lab-samples-body"></div>
        </article>
      </div>
    </div>`,x.appendChild(V),V.querySelector(`.place-back`).addEventListener(`click`,S);let se=V.querySelector(`.place-badge`),H=V.querySelector(`.lab-list`),U=V.querySelector(`.lab-search`),W=V.querySelector(`.lab-tabs`),G=V.querySelector(`.lab-samples-btn`),K=V.querySelector(`.lab-samples`),q=V.querySelector(`.lab-samples-body`),J=`tout`,Y=null,X={v:0};async function Z(){try{let e=await te({category:J,q:U.value});se.hidden=!e.demo,H.innerHTML=e.items.length?e.items.map(e=>`
          <li class="lab-card">
            <span class="lab-card-head"><span>${C((w.find(t=>t.id===e.category)||{}).label||e.category)}</span><span>${re[e.format]||`📁`} ${C(e.format)}</span></span>
            <b>${C(e.title)}</b>
            <small>${C(e.module)} · ${C(e.size)}</small>
            ${e.url?`<a class="lab-open" href="${C(e.url)}" ${e.url.startsWith(`#`)?``:`target="_blank" rel="noopener noreferrer"`}>OUVRIR ↗</a>`:`<span class="lab-open" aria-disabled="true">BIENTÔT DISPONIBLE</span>`}
          </li>`).join(``):`<li class="hq-empty">Aucune ressource trouvée.</li>`}catch{H.innerHTML=`<li class="hq-empty">Bibliothèque injoignable. Réessaie plus tard.</li>`}}W.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-cat]`);if(!t)return;J=t.dataset.cat,W.querySelectorAll(`button`).forEach(e=>e.setAttribute(`aria-selected`,String(e===t))),Z();let n={tout:[`Toute la bibliothèque, rien que ça 📚`,`happy`],cours:[`Les cours ! Mon rayon préféré 🤓`,`love`],documents:[`Les documents officiels, rangés au millimètre 🗂️`,`happy`],supports:[`Les supports de TD : on met les mains dans le cambouis 🔧`,`surprised`],outils:[`La caisse à outils du parfait étudiant 🧰`,`wow`]}[J]||[`Rayon ${t.textContent.trim().toLowerCase()} 👀`,`happy`];$(n[0],n[1])}),U.addEventListener(`input`,()=>{clearTimeout(Y),Y=setTimeout(async()=>{await Z();let e=H.querySelectorAll(`.lab-card`).length;U.value.trim().length>=3&&(e?$(`J’ai trouvé ${e} résultat${e>1?`s`:``} 🔎`,`wow`,2500):$(`Rien trouvé… essaie un autre mot ? 🤔`,`sad`,2800))},220)});let Q=0;function $(e,t,n=3500){T.nova.setMood(t,2.4),performance.now()-Q<2500||(Q=performance.now(),T.nova.say(e,n))}async function ce(){let t=K.hidden;if(K.hidden=!t,G.setAttribute(`aria-expanded`,String(t)),e.to(X,{v:+!!t,duration:.8}),!t)return;T.nova.setMood(`wow`,2),e.fromTo(K,{opacity:0,x:30},{opacity:1,x:0,duration:.5,ease:`power3.out`}),q.innerHTML=`<div class="hq-empty">Analyse des cuves…</div>`;let n=await ne().catch(()=>({connected:!1,items:[]}));n.connected?q.innerHTML=n.items.length?`<table class="lab-sample-table">
          <thead><tr><th>MATIÈRE</th><th>ÉCHANTILLON</th><th>NOTE</th><th>COEF</th></tr></thead>
          <tbody>${n.items.map(e=>`<tr><td>${C(e.module)}</td><td>${C(e.label)}</td><td>${C(e.value)} / ${C(e.max??20)}</td><td>${C(e.coef??1)}</td></tr>`).join(``)}</tbody>
        </table>`:`<div class="hq-empty">Aucun échantillon pour le moment.</div>`:(q.innerHTML=`
        <div class="lab-locked">
          <div class="lab-lock-icon" aria-hidden="true">🔒</div>
          <b>Canal des notes pas encore relié</b>
          <p>Chaque échantillon de ces cuves deviendra une note dès que l’API sera branchée : matière, note, coefficient et date.</p>
          <div class="lab-skeleton" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>`,T.nova.say(`Les cuves sont prêtes, il manque juste le câble vers les notes 🔌`,4500),T.nova.setMood(`sad`,3))}G.addEventListener(`click`,ce);function le(e,t){O.forEach((e,n)=>{e.crystal.rotation.y=t*.8+e.phase,e.crystal.position.y=2+Math.sin(t*1.3+e.phase)*.18,e.liquid.material.uniforms.uTime.value=t,e.liquid.material.uniforms.uBoost.value=X.v*(.6+.4*Math.sin(t*4+n)),e.crystal.material.emissiveIntensity=1+X.v*1.5}),z.rotation.y=t*.6,T.update(e,t)}function ue(){V.classList.add(`open`),Z(),T.playEntry(),e.fromTo(V.querySelectorAll(`.lab-library, .lab-samples-btn`),{opacity:0,y:30},{opacity:1,y:0,duration:.7,stagger:.15,delay:.5,ease:`power3.out`}),setTimeout(()=>T.nova.say(`Bienvenue au labo ! Les cours sont dans la bibliothèque 📚`,5e3),1400)}function de(){V.classList.remove(`open`)}return{scene:E,camera:T.camera,nova:T.nova,update:le,enter:ue,leave:de,resize:T.fitCamera}}export{E as createLab};