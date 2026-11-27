import{c as e,l as t,o as n,s as r}from"./companion-Dj3qBWIq.js";import{C as i,D as a,G as o,J as s,K as c,L as l,P as u,Q as d,S as f,T as p,W as m,_ as h,ct as g,dt as _,et as v,ft as y,g as b,h as x,ht as S,j as C,l as w,m as T,nt as E,ot as D,pt as O,vt as k,w as A}from"./three-BzoxXuON.js";import{s as j}from"./util-db-XgVMf.js";function M(e,t,n){let r=new Float32Array(e*3),i=new Float32Array(e*3),a=new Float32Array(e*2),o=[[.75,.85,1],[1,1,1],[1,.86,.72],[.7,.95,1],[.95,.78,1]];for(let s=0;s<e;s++){let e=n()*2-1,c=n()*Math.PI*2,l=Math.sqrt(1-e*e);r.set([Math.cos(c)*l*t,e*t,Math.sin(c)*l*t],s*3);let u=o[Math.floor(n()*o.length)];i.set(u,s*3),a.set([.6+n()**6*3.2,n()*100],s*2)}let s=new b;s.setAttribute(`position`,new x(r,3)),s.setAttribute(`color`,new x(i,3)),s.setAttribute(`aData`,new x(a,2));let c=new g({uniforms:{uTime:{value:0},uOpacity:{value:1},uPx:{value:window.devicePixelRatio}},transparent:!0,depthWrite:!1,blending:2,vertexShader:`
      attribute vec3 color;
      attribute vec2 aData;
      uniform float uTime;
      uniform float uPx;
      varying vec3 vColor;
      void main() {
        float tw = 0.7 + 0.3 * sin(uTime * (1.2 + fract(aData.y) * 2.5) + aData.y);
        vColor = color * tw * (0.55 + aData.x * 0.45);
        gl_PointSize = aData.x * 1.6 * uPx;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uOpacity;
      varying vec3 vColor;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0) discard;
        gl_FragColor = vec4(vColor * exp(-d * 3.5) * 1.6 * uOpacity, 1.0);
      }
    `}),l=new v(s,c);return l.frustumCulled=!1,l}function N(e){let t=new g({uniforms:{uOpacity:{value:1}},side:1,depthWrite:!1,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uOpacity;
      varying vec3 vDir;
      float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      float noise(vec3 p) {
        vec3 i = floor(p); vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }
      float fbm(vec3 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
        return v;
      }
      void main() {
        vec3 d = normalize(vDir);
        float n = fbm(d * 2.6 + vec3(1.7, 0.3, 4.1));
        float m = fbm(d * 5.5 - vec3(3.1, 1.2, 0.4));
        // Grand nuage violet en diagonale, filaments bleus, coeur rose
        float band = exp(-pow((d.y + d.x * 0.45 - 0.1) * 2.6, 2.0));
        vec3 col = vec3(0.012, 0.014, 0.04);
        col += vec3(0.24, 0.08, 0.42) * smoothstep(0.42, 0.85, n) * (0.35 + band);
        col += vec3(0.05, 0.2, 0.42) * smoothstep(0.5, 0.95, m) * band;
        col += vec3(0.5, 0.12, 0.38) * pow(smoothstep(0.62, 0.95, n * m * 1.9), 2.0) * band;
        // Voie lactée : bande de lumière laiteuse, coeur plus chaud, poussières sombres
        float mwAxis = dot(d, normalize(vec3(0.35, 0.82, -0.45)));
        float mw = exp(-mwAxis * mwAxis * 60.0);
        float core = exp(-pow(length(d - normalize(vec3(-0.55, 0.12, -0.83))), 2.0) * 3.0);
        float dust = smoothstep(0.45, 0.75, fbm(d * 9.0 + vec3(2.0, 7.0, 1.0)));
        float grain = fbm(d * 26.0);
        vec3 milky = mix(vec3(0.1, 0.13, 0.26), vec3(0.22, 0.18, 0.2), core);
        col += milky * mw * pow(grain, 1.6) * 1.2 * (1.0 - dust * 0.8) * (0.45 + core * 0.25);
        gl_FragColor = vec4(col * uOpacity, 1.0);
      }
    `}),n=new o(new _(e,48,24),t);return n.frustumCulled=!1,n}function P(){let e=new C,t=new s({color:9411509,metalness:.8,roughness:.35}),n=new s({color:1778230,metalness:.7,roughness:.4}),r=new c({color:new f(.4,1.6,2.2),toneMapped:!1}),i=new c({color:new f(2.2,1.4,.6),toneMapped:!1}),a=new s({color:1323114,metalness:.6,roughness:.25,emissive:465469,emissiveIntensity:.6}),l=new o(new A(3,3,16,24),t);e.add(l);let u=new o(new _(3,24,12,0,Math.PI*2,0,Math.PI/2),t);u.position.y=8,e.add(u);let d=new o(new S(22,2.2,12,96),t);d.rotation.x=Math.PI/2,e.add(d);let p=new o(new S(22,2.25,4,96,Math.PI*2),i);p.rotation.x=Math.PI/2,p.scale.set(1,1,.18),e.add(p);for(let t=0;t<4;t++){let r=new o(new A(.6,.6,19,8),n);r.rotation.z=Math.PI/2,r.rotation.y=t/4*Math.PI*2,r.position.set(Math.cos(t/4*Math.PI*2)*11.5,0,-Math.sin(t/4*Math.PI*2)*11.5),e.add(r)}for(let t of[-1,1]){let r=new o(new T(.5,.5,30),n);r.position.set(0,t*5,0),e.add(r);for(let n of[-11,-5,5,11]){let r=new o(new T(9,.15,4.5),a);r.position.set(0,t*5,n),e.add(r)}}let m=new o(new _(.7,12,8),r);m.position.y=11,e.add(m);let h=new o(new S(24.3,.18,6,96),r);return h.rotation.x=Math.PI/2,e.add(h),{group:e,ring:d,windows:p,ringLights:h,beacon:m}}function F({arms:e=2,twist:t=3,seed:n=1,core:r=[1,.8,.55],arm:i=[.42,.45,1],knot:a=[1,.32,.72],bright:o=1}){return new g({uniforms:{uArms:{value:e},uTwist:{value:t},uSeed:{value:n},uCore:{value:new f(...r)},uArm:{value:new f(...i)},uKnot:{value:new f(...a)},uBright:{value:o},uOpacity:{value:1}},transparent:!0,depthWrite:!1,blending:2,side:2,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uArms;
      uniform float uTwist;
      uniform float uSeed;
      uniform vec3 uCore;
      uniform vec3 uArm;
      uniform vec3 uKnot;
      uniform float uBright;
      uniform float uOpacity;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7)) + uSeed * 17.3) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.07 + 3.1; a *= 0.5; }
        return v;
      }
      void main() {
        vec2 p = (vUv - 0.5) * 2.0;
        float r = length(p);
        if (r > 1.0) discard;
        float a = atan(p.y, p.x);
        // Spirale logarithmique serrée (bras enroulés comme M81)
        float phase = uArms * a - uTwist * uArms * log(r + 0.03);
        phase += (fbm(p * 2.6) - 0.5) * 1.6;
        float armMask = pow(0.5 + 0.5 * cos(phase), 4.0);
        // Bras secondaires plus fins (aspect floconneux)
        float fineArms = pow(0.5 + 0.5 * cos(phase * 2.0 + fbm(p * 5.0) * 3.0), 7.0) * 0.45;
        float radial = smoothstep(0.1, 0.3, r) * (1.0 - smoothstep(0.6, 1.0, r));
        float arms = (armMask + fineArms) * radial;
        // Poussières sombres sur le bord intérieur des bras
        float dust = pow(0.5 + 0.5 * cos(phase + 0.75), 10.0) * smoothstep(0.14, 0.32, r) * (1.0 - smoothstep(0.7, 0.95, r));
        dust *= 0.5 + 0.8 * fbm(p * 20.0);
        // Nuages d'étoiles en grains, amas roses, taches bleues lointaines
        float speck = smoothstep(0.45, 0.8, fbm(p * 26.0 + uSeed));
        float clumps = fbm(p * 12.0 + uSeed);
        float knots = smoothstep(0.66, 0.86, fbm(p * 24.0 + 7.0)) * armMask * radial;
        float outer = smoothstep(0.5, 0.85, fbm(p * 9.0 - 3.0)) * smoothstep(0.55, 0.85, r) * (1.0 - smoothstep(0.8, 1.0, r));
        // Bulbe doré, disque intérieur jaunâtre
        // Détails fins atténués quand la galaxie est petite à l'écran (pas de scintillement)
        float detail = clamp(1.0 - fwidth(r) * 55.0, 0.0, 1.0);
        speck *= detail;
        knots *= 0.4 + 0.6 * detail;
        float bulge = exp(-r * r * 14.0);
        float nucleus = exp(-r * r * 400.0);
        float innerDisk = exp(-r * 4.5) * (1.0 - smoothstep(0.3, 0.6, r));
        vec3 col = vec3(0.0);
        // Dégradé : coeur blanc doré, disque pêche, bras bleu-violet, bord bleu nuit
        vec3 armCol = mix(mix(uArm, vec3(0.85, 0.7, 0.95), 0.35), uArm * vec3(0.8, 0.85, 1.15), smoothstep(0.3, 0.85, r));
        col += mix(vec3(1.0, 0.95, 0.88), uCore, 0.45) * bulge * 0.8;
        col += vec3(1.0, 0.93, 0.8) * nucleus * 2.4; // halo de lumière (bloom)
        col += mix(uCore, vec3(0.8, 0.66, 0.6), 0.5) * innerDisk * 0.3;
        col += armCol * arms * (0.25 + clumps * 0.55 + speck * 0.65) * 0.85;
        col += uArm * outer * 0.16;
        col += uKnot * knots * 1.9;
        col *= 1.0 - dust * 0.82;
        // Halo bleuté diffus autour du disque
        col += uArm * 0.07 * exp(-r * 2.2);
        // Étoiles brillantes isolées dans les bras
        vec2 cell = floor(p * 70.0);
        float h = hash(cell + uSeed);
        float dStar = length(fract(p * 70.0) - 0.5);
        col += vec3(0.85, 0.9, 1.0) * step(0.982, h) * smoothstep(0.32, 0.0, dStar) * (0.3 + arms * 1.4) * detail;
        col *= 1.0 - smoothstep(0.86, 1.0, r);
        gl_FragColor = vec4(col * uBright * uOpacity, 1.0);
      }
    `})}function I(){let e=document.createElement(`canvas`);e.width=128,e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.08,`rgba(220,235,255,0.8)`),n.addColorStop(.3,`rgba(140,180,255,0.12)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),t.globalCompositeOperation=`lighter`,[[128,2],[2,128]].forEach(([e,n])=>{let r=e>n?t.createLinearGradient(0,64,128,64):t.createLinearGradient(64,0,64,128);r.addColorStop(0,`rgba(180,210,255,0)`),r.addColorStop(.5,`rgba(230,240,255,0.9)`),r.addColorStop(1,`rgba(180,210,255,0)`),t.fillStyle=r,t.fillRect(64-e/2,64-n/2,e,n)});let r=new h(e);return r.colorSpace=D,r}function L(e){let t=new C,n=[],r=[{dir:[.24,.3,-.92],size:260,tilt:.95,spin:.5,opts:{arms:2,twist:3.1,seed:1,bright:1.2}},{dir:[-.44,.24,-.86],size:170,tilt:.6,spin:2.1,opts:{arms:2,twist:3.4,seed:2,arm:[.62,.5,1],knot:[1,.4,.85]}},{dir:[.55,.12,-.82],size:110,tilt:1.1,spin:1.2,opts:{arms:3,twist:2.6,seed:3,arm:[.45,.75,1],knot:[1,.45,.7]}},{dir:[-.5,.05,-.86],size:150,tilt:1,spin:.9,opts:{arms:2,twist:3.2,seed:21,bright:1.1}},{dir:[.97,.12,-.15],size:110,tilt:.55,spin:1.4,opts:{arms:2,twist:3.4,seed:24}},{dir:[.9,.14,.4],size:180,tilt:.8,spin:.2,opts:{arms:2,twist:3,seed:5}},{dir:[-.85,.3,.42],size:140,tilt:.5,spin:1.6,opts:{arms:2,twist:2.8,seed:6,arm:[.55,.6,1]}}],i=[[.42,.45,1],[.6,.5,1],[.45,.72,1],[.75,.55,1],[.5,.6,.95]];for(let t=0;t<2;t++){let n=t<1,a=n?(e()-.5)*1.6:e()*Math.PI*2,o=n?-.1+e()*.75:(e()-.3)*1.2;r.push({dir:[Math.sin(a)*Math.cos(o),Math.sin(o),-Math.cos(a)*Math.cos(o)],size:26+e()*46,tilt:.2+e()*1.15,spin:e()*Math.PI*2,opts:{arms:e()<.75?2:3,twist:2.5+e()*1.3,seed:10+t,arm:i[Math.floor(e()*i.length)],bright:.75+e()*.4}})}r.forEach(r=>{let i=F(r.opts);n.push(i);let a=new o(new d(r.size,r.size),i);a.position.set(...r.dir).normalize().multiplyScalar(860),a.lookAt(0,0,0),a.rotateX(r.tilt),a.rotateZ(r.spin),a.userData.spin=(e()-.5)*.004,t.add(a)});let a=I();for(let r=0;r<14;r++){let r=e()*2-1,i=e()*Math.PI*2,o=Math.sqrt(1-r*r),s=new O({map:a,color:new f().setHSL(.55+e()*.15,.6,.75+e()*.2),transparent:!0,depthWrite:!1,blending:2,fog:!1});n.push(s);let c=new y(s);c.position.set(Math.cos(i)*o,r,Math.sin(i)*o).multiplyScalar(870),c.scale.setScalar(14+e()*22),c.userData.tw=e()*10,t.add(c)}return{group:t,mats:n}}function R(e){let t=new u(1,4);t.deleteAttribute(`normal`),t.deleteAttribute(`uv`),t=w(t);let n=[];for(let t=0;t<9;t++){let r=new k(e()-.5,e()-.5,e()-.5).normalize();n.push({d:r,f:1.2+e()*(t<3?1.5:7),a:(t<3?.16:.055)*(.5+e()),ph:e()*6.28})}let r=[];for(let t=0;t<11;t++)r.push({c:new k(e()-.5,e()-.5,e()-.5).normalize(),r:.12+e()*.32,depth:.07+e()*.12});let i=new k(1+e()*.5,.65+e()*.3,.85+e()*.3),a=t.attributes.position,o=new k;for(let e=0;e<a.count;e++){o.fromBufferAttribute(a,e).normalize();let t=1;n.forEach(e=>t+=Math.sin(o.dot(e.d)*e.f*3+e.ph)*e.a),r.forEach(e=>{let n=o.angleTo(e.c)/e.r;n<1?t-=e.depth*(1-n*n):n<1.35&&(t+=e.depth*.35*Math.sin((n-1)/.35*Math.PI))}),o.multiplyScalar(t).multiply(i),a.setXYZ(e,o.x,o.y,o.z)}return t.computeVertexNormals(),t}function z(){let e=new s({color:16777215,roughness:.95,metalness:.02,fog:!1});return e.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vRockPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vRockPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vRockPos;
        float rh(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
        float rn(vec3 p) {
          vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(rh(i), rh(i + vec3(1,0,0)), f.x), mix(rh(i + vec3(0,1,0)), rh(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(rh(i + vec3(0,0,1)), rh(i + vec3(1,0,1)), f.x), mix(rh(i + vec3(0,1,1)), rh(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        float rf(vec3 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * rn(p); p *= 2.1; a *= 0.5; } return v; }`).replace(`#include <color_fragment>`,`#include <color_fragment>
        float rock = rf(vRockPos * 3.0);
        float grain = rf(vRockPos * 18.0);
        float speck = rn(vRockPos * 55.0);
        float vein = 1.0 - smoothstep(0.0, 0.05, abs(rf(vRockPos * 1.6 + 4.0) - 0.5));
        diffuseColor.rgb *= 0.62 + rock * 0.7;
        diffuseColor.rgb *= 0.82 + grain * 0.38;
        diffuseColor.rgb *= 0.85 + step(0.82, speck) * 0.4;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.5 + 0.03, vein * 0.35);
        // Creux et fonds de cratères plus sombres, bosses plus claires
        diffuseColor.rgb *= 0.68 + 0.5 * smoothstep(0.8, 1.12, length(vRockPos / vec3(1.2, 0.85, 1.0)));`)},e.customProgramCacheKey=()=>`asteroid-rock-v3`,e}function B(e,t){let n=new C,r=z(),i=new m,o=new E,s=new a,c=new k,u=new k,d=[[.08,.12,.42],[.06,.18,.36],[.62,.06,.4],[.75,.08,.45],[.1,.05,.5]],p=Math.ceil(t/3);for(let t=0;t<3;t++){let t=new l(R(e),r,p);for(let n=0;n<p;n++){let r=e()*Math.PI*2,a=70+e()*90;c.set(Math.cos(r)*a,-18+e()*40+Math.sin(r*3)*8,Math.sin(r)*a),s.set(e()*6,e()*6,e()*6),o.setFromEuler(s);let l=.6+e()**3*5;u.set(l,l,l),i.compose(c,o,u),t.setMatrixAt(n,i);let p=d[Math.floor(e()*d.length)];t.setColorAt(n,new f().setHSL(p[0]+(e()-.5)*.03,p[1],p[2]+e()*.12))}t.frustumCulled=!1,n.add(t)}return n}function V(e){let t=new C,n=new s({color:10134461,metalness:.7,roughness:.35,fog:!1}),r=[],a=[[.3,1.4,2.2],[2.2,.4,1.5],[1.4,.8,2.2],[2,1.3,.4]];for(let s=0;s<6;s++){let l=new C,u=new o(new i(.9,4.2,6),n);u.rotation.z=-Math.PI/2,l.add(u);let d=new o(new T(1.6,.12,3.4),n);d.position.x=-.6,l.add(d);let p=a[s%a.length],m=new o(new _(.55,10,8),new c({color:new f(...p),toneMapped:!1,fog:!1}));m.position.x=-2.2,m.scale.set(1.6,.8,.8),l.add(m);let h=new o(new A(.05,.45,9,8,1,!0),new c({color:new f(...p).multiplyScalar(.35),transparent:!0,opacity:.6,blending:2,depthWrite:!1,fog:!1}));h.rotation.z=Math.PI/2,h.position.x=-6.8,l.add(h),t.add(l);let g=e()*Math.PI*2,v=90+e()*120;r.push({ship:l,yaw:g,dist:v,y:-10+e()*50,speed:10+e()*16,phase:e()*400,span:420,scale:1+e()*1.5})}function l(e){r.forEach(t=>{let n=(e*t.speed+t.phase)%t.span-t.span/2,r=Math.sin(t.yaw)*t.dist,i=-Math.cos(t.yaw)*t.dist,a=Math.cos(t.yaw),o=Math.sin(t.yaw);t.ship.position.set(r+a*n,t.y,i+o*n),t.ship.rotation.y=-t.yaw,t.ship.scale.setScalar(t.scale)})}return{group:t,update:l}}function H({seed:i=7,stars:a=5e3,layout:o=`cockpit`}={}){let s=j(i),c=new C,l=new C;c.add(l);let u=N(950);l.add(u);let d=L(s);l.add(d.group);let f=M(a,900,s);l.add(f);let m=new k(.8,.35,.45).normalize(),h=e({radius:130,texture:r(),atmo:5223679,lightDir:m,ring:{inner:170,outer:270,colorA:9417944,colorB:15135487,tiltX:Math.PI/2.5,tiltY:.3,tiltZ:.25}});h.setOpacity(1);let g=e({radius:34,texture:t(),atmo:16752736,lightDir:m,ring:{inner:44,outer:70,colorA:10520176,colorB:15917768,tiltX:Math.PI/2.3,tiltY:-.4,tiltZ:-.2}});g.setOpacity(1);let _={inner:.001,outer:.002,colorA:0,colorB:0,tiltX:0,tiltY:0},v=e({radius:22,texture:n({width:512,height:256,stops:[[0,`#1a0b3a`],[.25,`#4b2a8f`],[.45,`#9a6fe0`],[.55,`#c9b0ff`],[.7,`#6a3fbf`],[1,`#160830`]],bands:10,turbulence:.06}),atmo:11570431,lightDir:m,ring:{inner:30,outer:46,colorA:9404376,colorB:15129855,tiltX:Math.PI/2.2,tiltY:.6,tiltZ:.1}});v.setOpacity(1);let y=e({radius:14,texture:n({width:512,height:256,stops:[[0,`#06262a`],[.3,`#1d7a78`],[.5,`#7fe0d0`],[.62,`#3fb0a8`],[1,`#05201f`]],bands:7,turbulence:.08}),atmo:8384736,lightDir:m,ring:_});y.setOpacity(1);let b=P(),x=B(s,o===`cockpit`?90:160),S=V(s),w={cockpit:{planet:[-330,-70,-640],moon:[260,120,-760],station:[70,-6,-150],stationScale:.6,violet:[520,260,-560],teal:[-120,150,-720]},hq:{planet:[380,-40,-620],moon:[-300,160,-700],station:[-120,20,-260],stationScale:.8,violet:[-520,220,-420],teal:[140,190,-760]},lab:{planet:[-420,30,-560],moon:[380,110,-520],station:[160,40,-240],stationScale:.7,violet:[-150,230,-620],teal:[300,260,-560]}},T=w[o]||w.cockpit;h.group.position.set(...T.planet),g.group.position.set(...T.moon),b.group.position.set(...T.station),b.group.scale.setScalar(T.stationScale),b.group.rotation.set(.5,.2,.35),v.group.position.set(...T.violet),y.group.position.set(...T.teal),c.add(h.group,g.group,b.group,v.group,y.group,x,S.group);let E=new p(13624063,1.6);E.position.copy(m).multiplyScalar(100),c.add(E);let D=1;function O(e){D=e,f.material.uniforms.uOpacity.value=e,u.material.uniforms.uOpacity.value=.25+e*.75,h.setOpacity(e),g.setOpacity(e),v.setOpacity(e),y.setOpacity(e),d.mats.forEach(t=>{t.uniforms?t.uniforms.uOpacity.value=e:t.opacity=e}),b.group.visible=e>.02,x.visible=e>.02,S.group.visible=e>.02}function A(e,t){t&&l.position.copy(t.position),f.material.uniforms.uTime.value=e,b.group.rotateOnAxis(new k(0,1,0),.0012),b.beacon.visible=Math.sin(e*3)>.2,h.group.rotation.y=e*.004,h.update(),g.update(),v.update(),y.update(),x.rotation.y=e*.006,S.update(e),d.group.children.forEach(t=>{t.isSprite?t.material.opacity=(.75+.25*Math.sin(e*1.7+t.userData.tw))*D:t.rotateZ(t.userData.spin*.016)})}return{group:c,sun:E,update:A,setOpacity:O,get opacity(){return D}}}export{H as t};