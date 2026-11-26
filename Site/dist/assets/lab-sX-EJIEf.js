import{n as e}from"./gsap-BZVPcu9T.js";import{$ as t,A as n,B as r,C as i,G as a,K as o,O as s,W as c,Y as l,et as u,ft as d,h as f,ht as p,m,p as h,q as g,st as _,x as v,z as y}from"./three-BM3ZYzA6.js";import{a as b,i as x,n as S,t as C}from"./api-config-DdjGvgwn.js";import{n as w}from"./api-CBo1b3_v.js";var T=[{id:`tout`,label:`Tout`},{id:`cours`,label:`Cours`},{id:`documents`,label:`Documents`},{id:`supports`,label:`Supports de travail`},{id:`outils`,label:`Outils`}],E=[{id:`r1`,category:`cours`,title:`Introduction — Module A`,module:`Module A`,format:`PDF`,size:`1,2 Mo`,url:null},{id:`r2`,category:`cours`,title:`Chapitre 2 — Module B`,module:`Module B`,format:`Diapos`,size:`3,4 Mo`,url:null},{id:`r3`,category:`documents`,title:`Règlement des études`,module:`Général`,format:`PDF`,size:`420 Ko`,url:null},{id:`r4`,category:`documents`,title:`Calendrier du semestre`,module:`Général`,format:`PDF`,size:`180 Ko`,url:null},{id:`r5`,category:`supports`,title:`Énoncé du TP 1`,module:`Module B`,format:`PDF`,size:`650 Ko`,url:null},{id:`r6`,category:`supports`,title:`Fichiers de départ du projet`,module:`Projet`,format:`ZIP`,size:`2,1 Mo`,url:null},{id:`r7`,category:`outils`,title:`Guide d’installation des outils`,module:`Général`,format:`Web`,size:`—`,url:null},{id:`r8`,category:`outils`,title:`Commandes d’ESGI-Bot`,module:`ESGI-Bot`,format:`Web`,size:`—`,url:`#/esgi-bot`}];async function ee({category:e=`tout`,q:t=``}={}){if(x())return{demo:!1,items:await S(C.resources,{categorie:e===`tout`?``:e,q:t})};let n=t.trim().toLowerCase();return{demo:!0,items:E.filter(t=>(e===`tout`||t.category===e)&&(!n||`${t.title} ${t.module}`.toLowerCase().includes(n)))}}async function te(){return x()?{connected:!0,items:await S(C.samples)}:{connected:!1,items:[]}}var ne={PDF:`📄`,Diapos:`🖥️`,ZIP:`🗜️`,Web:`🌐`};function D({ship:x,root:S,onBack:C}){let E=b({renderer:x.renderer,accent:`#ff3dbb`,accentHdr:[2.2,.35,1.5],layout:`lab`,camPos:new p(0,2.6,6.8),camTarget:new p(0,2.1,-1.5),novaAnchor:{x:1,y:-.55,z:-2.6,scale:.28}}),{scene:D,group:O}=E,k=new o({color:14217471,roughness:.06,metalness:0,transparent:!0,opacity:.16,envMapIntensity:.6,depthWrite:!1}),A=[],j=[`#22e4ff`,`#ff3dbb`,`#a78bfa`,`#3dffa8`,`#ffd166`,`#22e4ff`,`#ff3dbb`];for(let e=0;e<7;e++){let t=Math.PI+(e-3)*.32,r=new n;r.position.set(Math.sin(t)*6.3,0,Math.cos(t)*6.3),O.add(r);let o=new v(j[e]),s=new c(new i(.62,.7,.5,32),E.metal);s.position.y=.25,r.add(s);let u=new c(new i(.7,.62,.4,32),E.metal);u.position.y=3.6,r.add(u);let f=new c(new i(.5,.5,2.9,32,1,!0),new _({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0},uColor:{value:o.clone().multiplyScalar(.9)},uBoost:{value:0},uSeed:{value:e*1.7}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
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
        `}));f.position.y=1.95,r.add(f);let m=new c(new i(.6,.6,2.9,32,1,!0),k);m.position.y=1.95,r.add(m);let h=new c(new l(.22,0),new g({color:o,emissive:o,emissiveIntensity:1.2,metalness:.2,roughness:.15}));h.scale.y=1.6,h.position.y=2,r.add(h),[.52,3.38].forEach(e=>{let t=new c(new d(.64,.02,6,48),new a({color:o.clone().multiplyScalar(1.4),toneMapped:!1}));t.rotation.x=Math.PI/2,t.position.y=e,r.add(t)}),E.glows.add(h,new p(0,0,0),[o.r*1.4,o.g*1.4,o.b*1.4],.9),A.push({crystal:h,liquid:f,phase:e*.9})}let M=new n;O.add(M);let N=new c(new h(3.4,.95,1.3),E.metal);N.position.y=.475,M.add(N);let P=new c(new h(3.6,.08,1.45),E.dark);P.position.y=.99,M.add(P);let F=new c(new h(3.5,.02,.02),E.led);F.position.set(0,.94,.73),M.add(F);let I=new c(new i(.32,.38,.06,32),E.metal);I.position.y=1.06,M.add(I);let L=new f,R=new Float32Array(540),z=new Float32Array(540),B=new v(.3,1.4,2),V=new v(2,.4,1.4);for(let e=0;e<90;e++){let t=e/90*2.4,n=e*.35;R.set([Math.cos(n)*.45,t,Math.sin(n)*.45],e*6),R.set([Math.cos(n+Math.PI)*.45,t,Math.sin(n+Math.PI)*.45],e*6+3),z.set([B.r,B.g,B.b],e*6),z.set([V.r,V.g,V.b],e*6+3)}L.setAttribute(`position`,new m(R,3)),L.setAttribute(`color`,new m(z,3));let H=new n;H.position.y=1.2,M.add(H);let re=new t(L,new u({size:.07,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}));H.add(re);let ie=new r((()=>{let e=new f,t=[];for(let e=0;e<90;e+=3)t.push(R[e*6],R[e*6+1],R[e*6+2],R[e*6+3],R[e*6+4],R[e*6+5]);return e.setAttribute(`position`,new s(t,3)),e})(),new y({color:new v(.6,.5,1.4),transparent:!0,opacity:.5,blending:2,depthWrite:!1,toneMapped:!1}));H.add(ie),E.glows.add(H,new p(0,1.2,0),[.8,.5,1.6],1);let U=document.createElement(`section`);U.className=`place place-lab`,U.setAttribute(`aria-label`,`Laboratoire`),U.innerHTML=`
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
            ${T.map((e,t)=>`<button type="button" role="tab" data-cat="${e.id}" aria-selected="${t===0}">${w(e.label)}</button>`).join(``)}
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
    </div>`,S.appendChild(U),U.querySelector(`.place-back`).addEventListener(`click`,C);let ae=U.querySelector(`.place-badge`),W=U.querySelector(`.lab-list`),G=U.querySelector(`.lab-search`),K=U.querySelector(`.lab-tabs`),q=U.querySelector(`.lab-samples-btn`),J=U.querySelector(`.lab-samples`),Y=U.querySelector(`.lab-samples-body`),X=`tout`,Z=null,Q={v:0};async function $(){try{let e=await ee({category:X,q:G.value});ae.hidden=!e.demo,W.innerHTML=e.items.length?e.items.map(e=>`
          <li class="lab-card">
            <span class="lab-card-head"><span>${w((T.find(t=>t.id===e.category)||{}).label||e.category)}</span><span>${ne[e.format]||`📁`} ${w(e.format)}</span></span>
            <b>${w(e.title)}</b>
            <small>${w(e.module)} · ${w(e.size)}</small>
            ${e.url?`<a class="lab-open" href="${w(e.url)}" ${e.url.startsWith(`#`)?``:`target="_blank" rel="noopener noreferrer"`}>OUVRIR ↗</a>`:`<span class="lab-open" aria-disabled="true">BIENTÔT DISPONIBLE</span>`}
          </li>`).join(``):`<li class="hq-empty">Aucune ressource trouvée.</li>`}catch{W.innerHTML=`<li class="hq-empty">Bibliothèque injoignable. Réessaie plus tard.</li>`}}K.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-cat]`);t&&(X=t.dataset.cat,K.querySelectorAll(`button`).forEach(e=>e.setAttribute(`aria-selected`,String(e===t))),$())}),G.addEventListener(`input`,()=>{clearTimeout(Z),Z=setTimeout($,220)});async function oe(){let t=J.hidden;if(J.hidden=!t,q.setAttribute(`aria-expanded`,String(t)),e.to(Q,{v:+!!t,duration:.8}),!t)return;e.fromTo(J,{opacity:0,x:30},{opacity:1,x:0,duration:.5,ease:`power3.out`}),Y.innerHTML=`<div class="hq-empty">Analyse des cuves…</div>`;let n=await te().catch(()=>({connected:!1,items:[]}));n.connected?Y.innerHTML=n.items.length?`<table class="lab-sample-table">
          <thead><tr><th>MATIÈRE</th><th>ÉCHANTILLON</th><th>NOTE</th><th>COEF</th></tr></thead>
          <tbody>${n.items.map(e=>`<tr><td>${w(e.module)}</td><td>${w(e.label)}</td><td>${w(e.value)} / ${w(e.max??20)}</td><td>${w(e.coef??1)}</td></tr>`).join(``)}</tbody>
        </table>`:`<div class="hq-empty">Aucun échantillon pour le moment.</div>`:(Y.innerHTML=`
        <div class="lab-locked">
          <div class="lab-lock-icon" aria-hidden="true">🔒</div>
          <b>Canal des notes pas encore relié</b>
          <p>Chaque échantillon de ces cuves deviendra une note dès que l’API sera branchée : matière, note, coefficient et date.</p>
          <div class="lab-skeleton" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>`,E.nova.say(`Les cuves sont prêtes, il manque juste le câble vers les notes 🔌`,4500))}q.addEventListener(`click`,oe);function se(e,t){A.forEach((e,n)=>{e.crystal.rotation.y=t*.8+e.phase,e.crystal.position.y=2+Math.sin(t*1.3+e.phase)*.18,e.liquid.material.uniforms.uTime.value=t,e.liquid.material.uniforms.uBoost.value=Q.v*(.6+.4*Math.sin(t*4+n)),e.crystal.material.emissiveIntensity=1+Q.v*1.5}),H.rotation.y=t*.6,E.update(e,t)}function ce(){U.classList.add(`open`),$(),E.playEntry(),e.fromTo(U.querySelectorAll(`.lab-library, .lab-samples-btn`),{opacity:0,y:30},{opacity:1,y:0,duration:.7,stagger:.15,delay:.5,ease:`power3.out`}),setTimeout(()=>E.nova.say(`Bienvenue au labo ! Les cours sont dans la bibliothèque 📚`,5e3),1400)}function le(){U.classList.remove(`open`)}return{scene:D,camera:E.camera,update:se,enter:ce,leave:le,resize:E.fitCamera}}export{D as createLab};