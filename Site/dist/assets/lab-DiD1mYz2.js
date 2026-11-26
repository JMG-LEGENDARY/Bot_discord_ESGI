import{n as e}from"./gsap-BZVPcu9T.js";import{B as t,G as n,J as ee,K as te,S as r,V as i,X as a,ct as o,et as s,g as c,h as l,ht as u,j as d,k as f,m as p,q as m,tt as h,vt as g,w as _}from"./three-BzoxXuON.js";import{a as ne,i as v,n as y,t as b}from"./api-config-BlMwZvh8.js";import{n as x}from"./api-CBo1b3_v.js";var S=[{id:`tout`,label:`Tout`},{id:`cours`,label:`Cours`},{id:`documents`,label:`Documents`},{id:`supports`,label:`Supports de travail`},{id:`outils`,label:`Outils`}],C=[{id:`r1`,category:`cours`,title:`Introduction — Module A`,module:`Module A`,format:`PDF`,size:`1,2 Mo`,url:null},{id:`r2`,category:`cours`,title:`Chapitre 2 — Module B`,module:`Module B`,format:`Diapos`,size:`3,4 Mo`,url:null},{id:`r3`,category:`documents`,title:`Règlement des études`,module:`Général`,format:`PDF`,size:`420 Ko`,url:null},{id:`r4`,category:`documents`,title:`Calendrier du semestre`,module:`Général`,format:`PDF`,size:`180 Ko`,url:null},{id:`r5`,category:`supports`,title:`Énoncé du TP 1`,module:`Module B`,format:`PDF`,size:`650 Ko`,url:null},{id:`r6`,category:`supports`,title:`Fichiers de départ du projet`,module:`Projet`,format:`ZIP`,size:`2,1 Mo`,url:null},{id:`r7`,category:`outils`,title:`Guide d’installation des outils`,module:`Général`,format:`Web`,size:`—`,url:null},{id:`r8`,category:`outils`,title:`Commandes d’ESGI-Bot`,module:`ESGI-Bot`,format:`Web`,size:`—`,url:`#/esgi-bot`}];async function re({category:e=`tout`,q:t=``}={}){if(v())return{demo:!1,items:await y(b.resources,{categorie:e===`tout`?``:e,q:t})};let n=t.trim().toLowerCase();return{demo:!0,items:C.filter(t=>(e===`tout`||t.category===e)&&(!n||`${t.title} ${t.module}`.toLowerCase().includes(n)))}}async function ie(){return v()?{connected:!0,items:await y(b.samples)}:{connected:!1,items:[]}}var ae={PDF:`📄`,Diapos:`🖥️`,ZIP:`🗜️`,Web:`🌐`};function w({ship:v,root:y,onBack:b}){let C=ne({renderer:v.renderer,accent:`#ff3dbb`,accentHdr:[2.2,.35,1.5],layout:`lab`,camPos:new g(0,2.6,6.8),camTarget:new g(0,2.1,-1.5),novaAnchor:{x:1,y:-.55,z:-2.6,scale:.28}}),{scene:w,group:T}=C,oe=new m({color:14217471,roughness:.06,metalness:0,transparent:!0,opacity:.16,envMapIntensity:.6,depthWrite:!1}),E=[],D=[`#22e4ff`,`#ff3dbb`,`#a78bfa`,`#3dffa8`,`#ffd166`,`#22e4ff`,`#ff3dbb`];for(let e=0;e<7;e++){let t=Math.PI+(e-3)*.32,i=new d;i.position.set(Math.sin(t)*6.3,0,Math.cos(t)*6.3),T.add(i);let s=new r(D[e]),c=new n(new _(.62,.7,.5,32),C.metal);c.position.y=.25,i.add(c);let l=new n(new _(.7,.62,.4,32),C.metal);l.position.y=3.6,i.add(l);let f=new n(new _(.5,.5,2.9,32,1,!0),new o({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0},uColor:{value:s.clone().multiplyScalar(.9)},uBoost:{value:0},uSeed:{value:e*1.7}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
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
        `}));f.position.y=1.95,i.add(f);let p=new n(new _(.6,.6,2.9,32,1,!0),oe);p.position.y=1.95,i.add(p);let m=new n(new a(.22,0),new ee({color:s,emissive:s,emissiveIntensity:1.2,metalness:.2,roughness:.15}));m.scale.y=1.6,m.position.y=2,i.add(m),[.52,3.38].forEach(e=>{let t=new n(new u(.64,.02,6,48),new te({color:s.clone().multiplyScalar(1.4),toneMapped:!1}));t.rotation.x=Math.PI/2,t.position.y=e,i.add(t)}),C.glows.add(m,new g(0,0,0),[s.r*1.4,s.g*1.4,s.b*1.4],.9),E.push({crystal:m,liquid:f,phase:e*.9})}let O=new d;T.add(O);let k=new n(new p(3.4,.95,1.3),C.metal);k.position.y=.475,O.add(k);let A=new n(new p(3.6,.08,1.45),C.dark);A.position.y=.99,O.add(A);let j=new n(new p(3.5,.02,.02),C.led);j.position.set(0,.94,.73),O.add(j);let M=new n(new _(.32,.38,.06,32),C.metal);M.position.y=1.06,O.add(M);let N=new c,P=new Float32Array(540),F=new Float32Array(540),I=new r(.3,1.4,2),L=new r(2,.4,1.4);for(let e=0;e<90;e++){let t=e/90*2.4,n=e*.35;P.set([Math.cos(n)*.45,t,Math.sin(n)*.45],e*6),P.set([Math.cos(n+Math.PI)*.45,t,Math.sin(n+Math.PI)*.45],e*6+3),F.set([I.r,I.g,I.b],e*6),F.set([L.r,L.g,L.b],e*6+3)}N.setAttribute(`position`,new l(P,3)),N.setAttribute(`color`,new l(F,3));let R=new d;R.position.y=1.2,O.add(R);let z=new s(N,new h({size:.07,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}));R.add(z);let B=new i((()=>{let e=new c,t=[];for(let e=0;e<90;e+=3)t.push(P[e*6],P[e*6+1],P[e*6+2],P[e*6+3],P[e*6+4],P[e*6+5]);return e.setAttribute(`position`,new f(t,3)),e})(),new t({color:new r(.6,.5,1.4),transparent:!0,opacity:.5,blending:2,depthWrite:!1,toneMapped:!1}));R.add(B),C.glows.add(R,new g(0,1.2,0),[.8,.5,1.6],1);let V=document.createElement(`section`);V.className=`place place-lab`,V.setAttribute(`aria-label`,`Laboratoire`),V.innerHTML=`
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
            ${S.map((e,t)=>`<button type="button" role="tab" data-cat="${e.id}" aria-selected="${t===0}">${x(e.label)}</button>`).join(``)}
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
    </div>`,y.appendChild(V),V.querySelector(`.place-back`).addEventListener(`click`,b);let H=V.querySelector(`.place-badge`),U=V.querySelector(`.lab-list`),W=V.querySelector(`.lab-search`),G=V.querySelector(`.lab-tabs`),K=V.querySelector(`.lab-samples-btn`),q=V.querySelector(`.lab-samples`),J=V.querySelector(`.lab-samples-body`),Y=`tout`,X=null,Z={v:0};async function Q(){try{let e=await re({category:Y,q:W.value});H.hidden=!e.demo,U.innerHTML=e.items.length?e.items.map(e=>`
          <li class="lab-card">
            <span class="lab-card-head"><span>${x((S.find(t=>t.id===e.category)||{}).label||e.category)}</span><span>${ae[e.format]||`📁`} ${x(e.format)}</span></span>
            <b>${x(e.title)}</b>
            <small>${x(e.module)} · ${x(e.size)}</small>
            ${e.url?`<a class="lab-open" href="${x(e.url)}" ${e.url.startsWith(`#`)?``:`target="_blank" rel="noopener noreferrer"`}>OUVRIR ↗</a>`:`<span class="lab-open" aria-disabled="true">BIENTÔT DISPONIBLE</span>`}
          </li>`).join(``):`<li class="hq-empty">Aucune ressource trouvée.</li>`}catch{U.innerHTML=`<li class="hq-empty">Bibliothèque injoignable. Réessaie plus tard.</li>`}}G.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-cat]`);t&&(Y=t.dataset.cat,G.querySelectorAll(`button`).forEach(e=>e.setAttribute(`aria-selected`,String(e===t))),Q())}),W.addEventListener(`input`,()=>{clearTimeout(X),X=setTimeout(Q,220)});async function se(){let t=q.hidden;if(q.hidden=!t,K.setAttribute(`aria-expanded`,String(t)),e.to(Z,{v:+!!t,duration:.8}),!t)return;e.fromTo(q,{opacity:0,x:30},{opacity:1,x:0,duration:.5,ease:`power3.out`}),J.innerHTML=`<div class="hq-empty">Analyse des cuves…</div>`;let n=await ie().catch(()=>({connected:!1,items:[]}));n.connected?J.innerHTML=n.items.length?`<table class="lab-sample-table">
          <thead><tr><th>MATIÈRE</th><th>ÉCHANTILLON</th><th>NOTE</th><th>COEF</th></tr></thead>
          <tbody>${n.items.map(e=>`<tr><td>${x(e.module)}</td><td>${x(e.label)}</td><td>${x(e.value)} / ${x(e.max??20)}</td><td>${x(e.coef??1)}</td></tr>`).join(``)}</tbody>
        </table>`:`<div class="hq-empty">Aucun échantillon pour le moment.</div>`:(J.innerHTML=`
        <div class="lab-locked">
          <div class="lab-lock-icon" aria-hidden="true">🔒</div>
          <b>Canal des notes pas encore relié</b>
          <p>Chaque échantillon de ces cuves deviendra une note dès que l’API sera branchée : matière, note, coefficient et date.</p>
          <div class="lab-skeleton" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>`,C.nova.say(`Les cuves sont prêtes, il manque juste le câble vers les notes 🔌`,4500))}K.addEventListener(`click`,se);function ce(e,t){E.forEach((e,n)=>{e.crystal.rotation.y=t*.8+e.phase,e.crystal.position.y=2+Math.sin(t*1.3+e.phase)*.18,e.liquid.material.uniforms.uTime.value=t,e.liquid.material.uniforms.uBoost.value=Z.v*(.6+.4*Math.sin(t*4+n)),e.crystal.material.emissiveIntensity=1+Z.v*1.5}),R.rotation.y=t*.6,C.update(e,t)}function le(){V.classList.add(`open`),Q(),C.playEntry(),e.fromTo(V.querySelectorAll(`.lab-library, .lab-samples-btn`),{opacity:0,y:30},{opacity:1,y:0,duration:.7,stagger:.15,delay:.5,ease:`power3.out`}),setTimeout(()=>C.nova.say(`Bienvenue au labo ! Les cours sont dans la bibliothèque 📚`,5e3),1400)}function $(){V.classList.remove(`open`)}return{scene:w,camera:C.camera,update:ce,enter:le,leave:$,resize:C.fitCamera}}export{w as createLab};