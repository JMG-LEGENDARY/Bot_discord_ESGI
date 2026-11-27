import{C as e,E as t,G as n,J as r,K as i,O as a,Q as o,S as s,U as c,Y as l,_ as u,_t as d,at as f,b as p,ct as m,dt as h,et as g,g as _,h as v,ht as y,it as b,j as x,lt as S,nt as C,ot as w,q as T,st as E,u as D,ut as O,vt as k,w as A}from"./three-BzoxXuON.js";var j={cyan:`#22e4ff`,magenta:`#ff3dbb`,violet:`#8b5cf6`,night:`#060814`,ink:`#0b1022`,steel:`#151c33`,slate:`#2a3352`,text:`#e8ecff`,textSoft:`#a9b3d6`},ee={cyan:[.15,2.3,2.8],magenta:[2.6,.25,1.6],violet:[1.3,.6,2.6]},M={cityTop:659246,cityMid:1710666,cityHorizon:3810656,spaceTop:66055,spaceMid:263702,spaceHorizon:724778,cavernFog:263695},N={cityTop:165063,cityMid:3718648,cityHorizon:12248829},P={value:0};function F(){let e=new Float32Array(65536).map(()=>Math.random()),t=e=>e*e*(3-2*e);function n(n,r,i){let a=Math.floor(n),o=Math.floor(r),s=t(n-a),c=t(r-o),l=(a%i+i)%i,u=(l+1)%i,d=(o%256+256)%256,f=(d+1)%256,p=e[d*256+l],m=e[d*256+u],h=e[f*256+l],g=e[f*256+u];return p+(m-p)*s+(h-p)*c+(p-m-h+g)*s*c}return function(e,t,r,i=4){let a=0,o=.5,s=r;for(let c=0;c<i;c++)a+=o*n(e*s,s/r*t,s),s*=2,t=t*2+3.1,o*=.5;return a}}function I(e){let t=document.createElement(`canvas`);t.width=256,t.height=1;let n=t.getContext(`2d`),r=n.createLinearGradient(0,0,256,0);return e.forEach(([e,t])=>r.addColorStop(e,t)),n.fillStyle=r,n.fillRect(0,0,256,1),n.getImageData(0,0,256,1).data}function L({stops:e,bands:t=9,turbulence:n=.06,storms:r=[],width:i=1024,height:a=512}){let o=F(),s=I(e),l=document.createElement(`canvas`);l.width=i,l.height=a;let d=l.getContext(`2d`),f=d.createImageData(i,a),p=f.data,m=Array.from({length:64},()=>Math.random());for(let e=0;e<a;e++){let l=e/a;for(let a=0;a<i;a++){let u=a/i,d=l,f=0,h=null;for(let e of r){let t=u-e.u;t-=Math.round(t);let n=d-e.v,r=Math.sqrt((t/e.ru)**2+(n/e.rv)**2);if(r<2.2){let i=(e.swirl||2.5)*Math.max(0,1-r/2.2)**2,a=Math.cos(i),o=Math.sin(i),s=t*a-n*e.ru/e.rv*o,l=t*o*e.rv/e.ru+n*a;u=e.u+s,d=e.v+l;let p=1-c.smoothstep(r,.55,1.05);p>f&&(f=p,h=e.color)}}u-=Math.floor(u);let g=(o(u,d*6,6)-.5)*n+(o(u,d*22+40,14,3)-.5)*n*.35,_=(d+g)*t,v=Math.floor(_),y=_-v,b=c.clamp(d+g*.6,0,1),x=(m[(v%64+64)%64]-.5)*.22,S=c.clamp(b+x*Math.sin(y*Math.PI),0,.999),C=Math.floor(S*255)*4,w=.78+o(u,d*90+7,24,3)*.42+Math.sin(y*Math.PI)*.06,T=s[C]*w,E=s[C+1]*w,D=s[C+2]*w;if(f>0){let e=.85+o(u,d*40,30,3)*.3;T+=(h[0]*e-T)*f,E+=(h[1]*e-E)*f,D+=(h[2]*e-D)*f}let O=c.smoothstep(Math.abs(l-.5),.36,.5),k=(e*i+a)*4;p[k]=Math.min(255,T*(1-O*.45)),p[k+1]=Math.min(255,E*(1-O*.45)),p[k+2]=Math.min(255,D*(1-O*.4)),p[k+3]=255}}d.putImageData(f,0,0);let h=new u(l);return h.colorSpace=w,h.anisotropy=8,h.wrapS=b,h}var R=`
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,z=`
  uniform sampler2D map;
  uniform vec3 uLightDir;
  uniform vec3 uAtmo;
  uniform float uOpacity;
  uniform vec3 uRingNormal;
  uniform vec3 uCenter;
  uniform vec2 uRing; // rayons intérieur / extérieur des anneaux (monde)
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uLightDir);
    vec3 albedo = texture2D(map, vUv).rgb;

    float ndl = dot(N, L);
    // Terminateur doux (diffusion dans l'atmosphère)
    float diff = smoothstep(-0.18, 0.55, ndl);
    float ndv = max(dot(N, V), 0.0);
    float limb = mix(0.55, 1.0, pow(ndv, 0.45));

    // Ombre des anneaux sur la planète
    float ringShadow = 1.0;
    float denom = dot(L, uRingNormal);
    if (abs(denom) > 0.001) {
      float t = dot(uCenter - vWorldPos, uRingNormal) / denom;
      if (t > 0.0) {
        float r = length(vWorldPos + L * t - uCenter);
        float inRing = smoothstep(uRing.x, uRing.x + 3.0, r) * (1.0 - smoothstep(uRing.y - 3.0, uRing.y, r));
        ringShadow = 1.0 - inRing * 0.55;
      }
    }

    vec3 col = albedo * (0.018 + diff * 1.25 * ringShadow) * limb;
    // Diffusion de l'atmosphère sur le bord éclairé + liseré au terminateur
    float fres = pow(1.0 - ndv, 3.0);
    col += uAtmo * fres * smoothstep(-0.25, 0.6, ndl) * 1.1;
    col += uAtmo * 0.12 * (1.0 - smoothstep(0.0, 0.25, abs(ndl))) * smoothstep(-0.1, 0.0, ndl);

    gl_FragColor = vec4(col, uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,B=`
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,V=`
  uniform vec3 uLightDir;
  uniform vec3 uAtmo;
  uniform float uOpacity;
  uniform float uEdge;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vWorldPos);
    // Faces arrière de la coque : maximum contre la planète, nul au bord extérieur
    float d = clamp(-dot(N, V) / uEdge, 0.0, 1.0);
    float glow = pow(d, 2.2);
    float lit = smoothstep(-0.45, 0.6, dot(N, normalize(uLightDir)));
    vec3 col = uAtmo * glow * lit * 1.4;
    gl_FragColor = vec4(col, uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,H=`
  varying vec3 vWorldPos;
  varying float vR;
  void main() {
    vR = length(position.xy);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,U=`
  uniform vec3 uLightDir;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform vec2 uRadii;  // intérieur / extérieur (local)
  uniform vec3 uCenter; // centre de la planète (monde)
  uniform float uPlanetR; // rayon de la planète (monde)
  uniform vec3 uNormal;
  varying vec3 vWorldPos;
  varying float vR;

  float h1(float n) { return fract(sin(n) * 43758.5453); }
  float n1(float x) {
    float i = floor(x);
    float f = fract(x);
    return mix(h1(i), h1(i + 1.0), f * f * (3.0 - 2.0 * f));
  }

  void main() {
    float t = (vR - uRadii.x) / (uRadii.y - uRadii.x);
    // Fines bandes concentriques
    float b = n1(t * 38.0) * 0.55 + n1(t * 130.0) * 0.3 + n1(t * 420.0) * 0.15;
    float density = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.9, 1.0, t));
    density *= 0.35 + b * 0.9;
    // Division sombre (comme celle de Cassini) et un petit vide
    density *= 1.0 - 0.88 * (1.0 - smoothstep(0.0, 0.025, abs(t - 0.64)));
    density *= 1.0 - 0.6 * (1.0 - smoothstep(0.0, 0.01, abs(t - 0.86)));
    // Zone intérieure plus ténue
    density *= mix(0.35, 1.0, smoothstep(0.05, 0.3, t));

    vec3 col = mix(uColorA, uColorB, smoothstep(0.2, 0.9, b + t * 0.3));

    // Éclairage : les anneaux sont plus brillants face au soleil
    vec3 L = normalize(uLightDir);
    float lit = 0.32 + 0.5 * abs(dot(normalize(uNormal), L));

    // Ombre de la planète projetée sur les anneaux
    vec3 oc = vWorldPos - uCenter;
    float bb = dot(oc, L);
    float c = dot(oc, oc) - uPlanetR * uPlanetR;
    float shadow = 1.0;
    if (bb < 0.0) {
      float disc = bb * bb - c;
      shadow = 1.0 - 0.9 * smoothstep(0.0, uPlanetR * uPlanetR * 0.08, disc);
    }

    gl_FragColor = vec4(col * lit * shadow, density * uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function W({radius:e,texture:t,atmo:r,lightDir:i,ring:a}){let o=new x,c=new s(r),l=new k,u=new k(0,0,1),p={map:{value:t},uLightDir:{value:i},uAtmo:{value:c},uOpacity:{value:0},uRingNormal:{value:u},uCenter:{value:l},uRing:{value:new d(a.inner,a.outer)}},g=new n(new h(e,96,64),new m({uniforms:p,vertexShader:R,fragmentShader:z,transparent:!0})),_=new x;_.rotation.z=a.tiltZ||.25,_.add(g),o.add(_);let v=1.12,y={uLightDir:{value:i},uAtmo:{value:c},uOpacity:{value:0},uEdge:{value:Math.sqrt(1-1/(v*v))}},b=new n(new h(e*v,64,48),new m({uniforms:y,vertexShader:B,fragmentShader:V,side:1,transparent:!0,depthWrite:!1,blending:2}));o.add(b);let S={uLightDir:{value:i},uColorA:{value:new s(a.colorA)},uColorB:{value:new s(a.colorB)},uOpacity:{value:0},uRadii:{value:new d(a.inner,a.outer)},uCenter:{value:l},uPlanetR:{value:e},uNormal:{value:u}},w=new n(new f(a.inner,a.outer,160,1),new m({uniforms:S,vertexShader:H,fragmentShader:U,side:2,transparent:!0,depthWrite:!1}));w.rotation.x=a.tiltX,w.rotation.y=a.tiltY,o.add(w);let T=new C,E=new k;function D(){o.updateMatrixWorld(),w.matrixWorld.decompose(l,T,E),u.set(0,0,1).applyQuaternion(T);let t=E.x;S.uPlanetR.value=e*t,p.uRing.value.set(a.inner*t,a.outer*t)}function O(e){p.uOpacity.value=e,y.uOpacity.value=e,S.uOpacity.value=e,o.visible=e>.001}return{group:o,mesh:g,update:D,setOpacity:O,get opacity(){return p.uOpacity.value}}}function te(){return L({stops:[[0,`#0b1a3a`],[.18,`#1d4f9a`],[.35,`#3d86d6`],[.48,`#7cc4ec`],[.56,`#5aa6e0`],[.7,`#2a68b8`],[.85,`#173e85`],[1,`#0a1733`]],bands:11,turbulence:.05,storms:[{u:.3,v:.62,ru:.045,rv:.035,color:[18,36,92],swirl:3},{u:.72,v:.38,ru:.02,rv:.015,color:[210,235,255],swirl:2}]})}function G(){return L({stops:[[0,`#3a1408`],[.12,`#7a3218`],[.25,`#c8784a`],[.36,`#e8c49a`],[.45,`#b44a24`],[.52,`#f0d2a8`],[.6,`#c0582c`],[.72,`#e2b07c`],[.84,`#8a3a1a`],[1,`#2e1006`]],bands:14,turbulence:.07,storms:[{u:.62,v:.6,ru:.06,rv:.035,color:[176,58,30],swirl:3.2}]})}function K(e,n=512){let r=new Float32Array(n*3),i=new Float32Array(n*3),a=new Float32Array(n),o=new _;o.setAttribute(`position`,new v(r,3).setUsage(t)),o.setAttribute(`color`,new v(i,3).setUsage(t)),o.setAttribute(`size`,new v(a,1).setUsage(t)),o.setDrawRange(0,0);let l=new m({uniforms:{uScale:{value:window.innerHeight},uDay:P},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
      attribute float size;
      attribute vec3 color;
      uniform float uScale;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        // Taille en unités du monde : le halo rétrécit avec la distance
        gl_PointSize = clamp(size * uScale / -mv.z, 0.0, 256.0);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      varying vec3 vColor;
      uniform float uDay;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0) discard;
        // Cœur net + halo doux, comme une vraie source lumineuse dans l'air
        float core = exp(-d * 18.0);
        float halo = exp(-d * 3.5) * 0.35;
        // En plein jour, les lumières se voient beaucoup moins
        gl_FragColor = vec4(vColor * (core + halo * (1.0 - uDay * 0.8)) * mix(1.0, 0.45, uDay), 1.0);
      }
    `}),u=new g(o,l);u.frustumCulled=!1,u.renderOrder=10,e.add(u);let d=[],f=new k;function p(e,t,r,i,a=null){d.length>=n||d.push({object:e,offset:t.clone(),color:new s(...r),size:i,blink:a})}function h(e){let t=0;for(let n=0;n<d.length;n++){let o=d[n];if(!o.object.visible)continue;let s=1;if(!(o.blink&&(s=+((e*o.blink.speed+o.blink.phase)%1<o.blink.duty),s===0))){if(f.copy(o.offset),o.object.localToWorld(f),r[t*3]=f.x,r[t*3+1]=f.y,r[t*3+2]=f.z,i[t*3]=o.color.r*s,i[t*3+1]=o.color.g*s,i[t*3+2]=o.color.b*s,o.object.userData.glowScale){let e=o.object.matrixWorld.elements;a[t]=o.size*Math.hypot(e[0],e[1],e[2])}else a[t]=o.size;t++}}o.setDrawRange(0,t),o.attributes.position.needsUpdate=!0,o.attributes.color.needsUpdate=!0,o.attributes.size.needsUpdate=!0}function y(e,t=50){l.uniforms.uScale.value=e/(2*Math.tan(c.degToRad(t)/2))}return{add:p,update:h,resize:y,points:u}}var q={headlight:[2.2,2.3,2.6],taillight:[2.6,.12,.25],navRed:[3,.15,.15],navGreen:[.2,2.6,.6],strobe:[3.2,3.2,3.4],engineCyan:[.35,2.2,3],engineMagenta:[2.6,.35,1.8],aviation:[3.2,.2,.1]};function ne(e){let t=new E,r=new m({side:1,depthWrite:!1,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 zenith = vec3(0.015, 0.02, 0.06);
        vec3 sky = vec3(0.05, 0.04, 0.13);
        vec3 cityGlow = vec3(0.35, 0.10, 0.32);
        vec3 ground = vec3(0.02, 0.02, 0.05);
        vec3 col = mix(sky, zenith, smoothstep(0.1, 0.8, h));
        // Lueur orangée-magenta des lumières de la ville juste au-dessus de l'horizon
        col += cityGlow * exp(-abs(h - 0.02) * 9.0);
        if (h < 0.0) col = mix(col, ground, smoothstep(0.0, -0.3, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `});t.add(new n(new h(50,32,16),r));let a=new n(new h(1.6,16,8),new i({color:new s(4,4.2,5)}));a.position.set(20,34,22),t.add(a);let c=[new s(.3,3,3.6),new s(3.4,.4,2.2),new s(1.6,.8,3.4)];for(let e=0;e<26;e++){let r=e/26*Math.PI*2,a=e%3==0,s=new n(new o(a?.6:2+e%3,a?6:.35+e%2*.5),new i({color:c[e%3].clone().multiplyScalar(1.6),side:2}));s.position.set(Math.cos(r)*40,(a?4:1)+e%5*3,Math.sin(r)*40),s.lookAt(0,s.position.y,0),t.add(s)}let l=new D(e),u=l.fromScene(t,.02).texture;return l.dispose(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),u}function J(e){let t=new E,r=new m({side:1,depthWrite:!1,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 zenith = vec3(0.10, 0.32, 0.70);
        vec3 horizon = vec3(0.62, 0.78, 0.92);
        vec3 ground = vec3(0.22, 0.24, 0.24);
        vec3 col = mix(horizon, zenith, smoothstep(0.0, 0.7, h));
        if (h < 0.0) col = mix(horizon * 0.7, ground, smoothstep(0.0, -0.25, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `});t.add(new n(new h(50,32,16),r));let a=new n(new h(2.4,16,8),new i({color:new s(12,11,9.5)}));a.position.set(20,34,22),t.add(a);let o=new D(e),c=o.fromScene(t,.02).texture;return o.dispose(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),c}function re(){let e=document.createElement(`canvas`);e.width=1024,e.height=512;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,512);n.addColorStop(0,`#ffffff`),n.addColorStop(.5,`#f4f6fc`),n.addColorStop(1,`#dde2ef`),t.fillStyle=n,t.fillRect(0,0,1024,512),t.fillStyle=`rgba(120, 130, 165, 0.35)`,t.fillRect(0,262,1024,3),t.fillStyle=`rgba(255, 255, 255, 0.9)`,t.fillRect(0,265,1024,2);for(let e=0;e<4;e++){let n=128+e*256;for(let e=0;e<3;e++)t.fillStyle=`rgba(110, 120, 160, 0.3)`,t.beginPath(),t.roundRect(n-24,330+e*12,48,5,3),t.fill()}let r=new u(e);return r.colorSpace=w,r.anisotropy=8,r}function ie(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`),n=new u(e);n.colorSpace=w;let r=`#62f4ff`,i=[178,334],a=``;function o(e){t.strokeStyle=r,t.lineWidth=e,t.lineCap=`round`,t.lineJoin=`round`}function s(){[118,394].forEach(e=>{let n=t.createRadialGradient(e,318,0,e,318,46);n.addColorStop(0,`rgba(255, 110, 190, 0.85)`),n.addColorStop(1,`rgba(255, 110, 190, 0)`),t.fillStyle=n,t.beginPath(),t.ellipse(e,318,46,28,0,0,Math.PI*2),t.fill()})}let c={open(){t.fillStyle=r,i.forEach(e=>{t.beginPath(),t.ellipse(e,222,34,50,0,0,Math.PI*2),t.fill(),t.fillStyle=`rgba(255,255,255,0.9)`,t.beginPath(),t.ellipse(e-11,202,11,14,-.4,0,Math.PI*2),t.fill(),t.fillStyle=r})},sleepy(){t.fillStyle=r,i.forEach(e=>{t.save(),t.beginPath(),t.rect(e-40,218,80,60),t.clip(),t.beginPath(),t.ellipse(e,222,34,50,0,0,Math.PI*2),t.fill(),t.restore()}),o(10),i.forEach(e=>{t.beginPath(),t.moveTo(e-38,218),t.lineTo(e+38,218),t.stroke()})},blink(){o(14),i.forEach(e=>{t.beginPath(),t.moveTo(e-32,228),t.lineTo(e+32,228),t.stroke()})},happy(){o(20),i.forEach(e=>{t.beginPath(),t.arc(e,244,34,Math.PI*1.1,Math.PI*1.9),t.stroke()})},sleep(){o(14),i.forEach(e=>{t.beginPath(),t.arc(e,216,30,Math.PI*.15,Math.PI*.85),t.stroke()})},dizzy(){o(9),i.forEach(e=>{t.beginPath();for(let n=0;n<Math.PI*5;n+=.15){let r=4+n*2.6,i=e+Math.cos(n)*r,a=222+Math.sin(n)*r;n===0?t.moveTo(i,a):t.lineTo(i,a)}t.stroke()})},heart(){t.fillStyle=`#ff7ad0`,i.forEach(e=>{t.beginPath(),t.moveTo(e,254),t.bezierCurveTo(e-58,216,e-30,172,e,202),t.bezierCurveTo(e+30,172,e+58,216,e,254),t.fill()})},star(){t.fillStyle=`#ffe17a`,i.forEach(e=>{t.beginPath();for(let n=0;n<10;n++){let r=-Math.PI/2+n*Math.PI/5,i=n%2?18:44;t.lineTo(e+Math.cos(r)*i,222+Math.sin(r)*i)}t.closePath(),t.fill()})},wide(){t.fillStyle=r,i.forEach(e=>{t.beginPath(),t.arc(e,222,46,0,Math.PI*2),t.fill(),t.fillStyle=`#000`,t.beginPath(),t.arc(e,222,16,0,Math.PI*2),t.fill(),t.fillStyle=`rgba(255,255,255,0.9)`,t.beginPath(),t.arc(e-16,204,10,0,Math.PI*2),t.fill(),t.fillStyle=r})},sad(){t.fillStyle=r,i.forEach(e=>{t.beginPath(),t.ellipse(e,232,28,36,0,0,Math.PI*2),t.fill()}),o(10),[[i[0],1],[i[1],-1]].forEach(([e,n])=>{t.beginPath(),t.moveTo(e-32*n,178),t.lineTo(e+28*n,162),t.stroke()})},angry(){o(18),[[i[0],1],[i[1],-1]].forEach(([e,n])=>{t.beginPath(),t.moveTo(e-26*n,192),t.lineTo(e+24*n,222),t.lineTo(e-26*n,252),t.stroke()})}},l={smile(){o(16),t.beginPath(),t.arc(256,300,40,Math.PI*.18,Math.PI*.82),t.stroke()},open(){t.fillStyle=r,t.beginPath(),t.moveTo(214,320),t.quadraticCurveTo(256,316,298,320),t.quadraticCurveTo(292,382,256,384),t.quadraticCurveTo(220,382,214,320),t.fill(),t.fillStyle=`rgba(255, 110, 190, 0.9)`,t.beginPath(),t.ellipse(256,366,22,10,0,0,Math.PI*2),t.fill()},grin(){t.fillStyle=r,t.beginPath(),t.moveTo(198,318),t.quadraticCurveTo(256,314,314,318),t.quadraticCurveTo(300,396,256,398),t.quadraticCurveTo(212,396,198,318),t.fill()},o(){o(12),t.beginPath(),t.ellipse(256,340,14,18,0,0,Math.PI*2),t.stroke()},flat(){o(14),t.beginPath(),t.moveTo(226,340),t.lineTo(286,340),t.stroke()},wavy(){o(12),t.beginPath();for(let e=210;e<=302;e+=4){let n=340+Math.sin((e-210)*.14)*9;e===210?t.moveTo(e,n):t.lineTo(e,n)}t.stroke()}};function d(e,i,o=!1){let u=`${e}/${i}/${o}`;u!==a&&(a=u,t.clearRect(0,0,512,512),t.fillStyle=`#000`,t.fillRect(0,0,512,512),t.shadowColor=r,t.shadowBlur=18,s(),c[e](),l[i](),o&&(t.fillStyle=r,t.font=`bold 54px sans-serif`,t.fillText(`z`,360,130),t.font=`bold 38px sans-serif`,t.fillText(`z`,404,92)),t.shadowBlur=0,n.needsUpdate=!0)}return d(`open`,`smile`),{texture:n,set:d}}function ae(){let e=document.createElement(`canvas`);e.width=128,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,256,0,0);n.addColorStop(0,`rgba(150, 235, 255, 0.95)`),n.addColorStop(1,`rgba(200, 245, 255, 0.55)`),t.fillStyle=n,t.beginPath(),t.ellipse(64,128,60,124,0,0,Math.PI*2),t.fill(),t.strokeStyle=`rgba(255, 255, 255, 0.95)`,t.lineWidth=7,t.stroke(),t.strokeStyle=`rgba(255, 255, 255, 0.6)`,t.lineWidth=4,t.beginPath(),t.moveTo(64,246),t.quadraticCurveTo(54,128,72,30),t.stroke();let r=new u(e);return r.colorSpace=w,r}function oe(){let e=new x,t=.3,r=new T({color:16777215,map:re(),metalness:0,roughness:.34,clearcoat:1,clearcoatRoughness:.1,sheen:.35,sheenRoughness:.5,sheenColor:new s(15923455),iridescence:.15,iridescenceIOR:1.3,envMapIntensity:1.1}),c=new T({color:10479862,roughness:.32,clearcoat:1,clearcoatRoughness:.12,sheen:.5,sheenColor:new s(16777215),envMapIntensity:1}),l=new T({color:16754392,roughness:.32,clearcoat:1,clearcoatRoughness:.12,sheen:.5,sheenColor:new s(16777215),envMapIntensity:1}),u=new T({color:4014944,metalness:.55,roughness:.28,clearcoat:.6,envMapIntensity:1.2}),d=ie(),f=new T({color:461852,emissive:16777215,emissiveMap:d.texture,emissiveIntensity:1.6,metalness:.2,roughness:.05,clearcoat:1,clearcoatRoughness:.03,iridescence:.35,iridescenceIOR:1.6,envMapIntensity:1.6}),m=new i({color:16777215,transparent:!0,opacity:.6,depthWrite:!1}),g=new i({color:new s(.5,2.6,3.4),toneMapped:!1}),_=new i({color:new s(2.8,.4,1.8),toneMapped:!1}),v=new i({map:ae(),color:new s(1.15,1.15,1.2),transparent:!0,depthWrite:!1,side:2,toneMapped:!1}),b=new n(new h(t,72,48),r);b.scale.set(1.04,.96,1),e.add(b);let C=.98,w=t*1.012,E=new h(w,64,32,0,Math.PI*2,0,C);E.rotateX(Math.PI/2);let D=w*Math.sin(C),O=E.attributes.position,j=E.attributes.uv;for(let e=0;e<O.count;e++)j.setXY(e,O.getX(e)/(2*D)+.5,O.getY(e)/(2*D)+.5);let ee=new n(E,f);ee.scale.copy(b.scale),e.add(ee);let M=new n(new y(D,.017,14,80),c);M.position.z=w*Math.cos(C),M.scale.copy(b.scale),e.add(M);let N=new n(new p(.03,20),m);N.scale.set(1.9,.6,1),N.position.set(-.1,.13,.25),N.lookAt(new k(-.1,.13,.25).multiplyScalar(3)),N.rotateZ(.6),e.add(N);let P=new n(new p(.012,14),m);P.position.set(-.035,.165,.258),P.lookAt(new k(-.035,.165,.258).multiplyScalar(3)),e.add(P),[[-.075,c],[.075,l]].forEach(([r,i])=>{let a=Math.sqrt(t*t-r*r)+.004,o=new n(new y(a,.011,10,60,Math.PI*.62),i);o.rotation.y=Math.PI/2,o.rotation.x=Math.PI*.12,o.position.x=r,o.scale.set(1,.96,1),e.add(o)}),[-1,1].forEach(t=>{let r=new n(new A(.075,.08,.04,40),l);r.rotation.z=Math.PI/2,r.position.set(t*.305,-.01,-.02),e.add(r);let i=new n(new A(.045,.05,.02,32),c);i.rotation.z=Math.PI/2,i.position.set(t*.33,-.01,-.02),e.add(i)});let F=[];[-1,1].forEach(t=>{let r=new x;r.position.set(t*.1,.24,-.1);let i=new x;i.rotation.z=-t*.38,i.rotation.x=-.35;let a=new n(new o(.15,.32),v);a.position.y=.15,i.add(a),r.add(i),r.userData.side=t,e.add(r),F.push(r)});let I=new x;I.position.set(0,.27,.04);let L=new n(new h(.026,20,12,0,Math.PI*2,0,Math.PI/2),l),R=new n(new A(.007,.011,.1,12),u);R.position.y=.05;let z=new S;z.moveTo(0,-.03),z.bezierCurveTo(-.045,0,-.035,.035,0,.018),z.bezierCurveTo(.035,.035,.045,0,0,-.03);let B=new a(z,{depth:.014,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:4,curveSegments:20});B.center();let V=new n(B,_);V.scale.setScalar(1.2),V.position.y=.125,I.add(L,R,V),e.add(I);let H=[];[-1,1].forEach(t=>{let r=new n(new h(.055,32,20),u);r.scale.set(1,1,1.2),r.position.set(t*.1,-.1,-.25),e.add(r);let i=new n(new y(.042,.009,10,32),c);i.position.set(t*.1,-.1,-.312),e.add(i);let a=new n(new p(.037,24),g);a.rotation.y=Math.PI,a.position.set(t*.1,-.1,-.318),e.add(a),H.push(new k(t*.1,-.1,-.34))});let U=new x;for(;e.children.length;)U.add(e.children[0]);return e.add(U),{ship:e,nozzles:H,face:d,antenna:I,wings:F,heart:V,rig:U,mats:{hullMat:r,pastelMat:c,visorMat:f}}}function se(a,o,u){let{ship:d,nozzles:f,face:p,antenna:y,wings:b,heart:S,rig:w,mats:T}=oe(),E=null,D=0,j=!1,ee=0,M=0,N=!1,P=!1,F=null;d.scale.setScalar(1.05),d.userData.glowScale=!0,a.add(d),u&&(f.forEach(e=>{u.add(d,e,q.engineCyan,.38),u.add(d,e,[.6,1.6,2.2],.22,{speed:9,phase:e.x,duty:.6})}),u.add(d,new k(-.345,-.01,-.02),q.navRed,.06),u.add(d,new k(.345,-.01,-.02),q.navGreen,.06),u.add(d,new k(0,.395,.04),[2.4,.4,1.6],.16,{speed:.7,phase:.3,duty:.5}));let I=new Float32Array(288),L=new Float32Array(96);L.fill(1);let R=new _;R.setAttribute(`position`,new v(I,3).setUsage(t)),R.setAttribute(`age`,new v(L,1).setUsage(t));let z=new m({uniforms:{uScale:{value:window.innerHeight},uShip:{value:1}},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
      attribute float age;
      uniform float uScale;
      uniform float uShip;
      varying float vAge;
      void main() {
        vAge = age;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp((0.09 * (1.0 - age) + 0.02) * uShip * uScale / -mv.z, 0.0, 64.0);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      varying float vAge;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0 || vAge >= 1.0) discard;
        float a = exp(-d * 4.0) * pow(1.0 - vAge, 2.0);
        gl_FragColor = vec4(vec3(0.35, 1.6, 2.4) * a, 1.0);
      }
    `}),B=new g(R,z);B.frustumCulled=!1,a.add(B);let V=0,H=0,U=new k,W=new k,te=new k,G=new k,K=new k,ne=new k,J=new k,re=new k(0,0,-1),ie=new k,ae=new k,se=new k,ce=new k,le=new k,ue=!1,de=2.5,fe=1,pe=!1,me=0,he=new C,Y=new l,ge=!1,_e=0,ve=0,X=null,Z=new k,ye=new k,be=new k,xe=new k,Se=[[0,0],[0,-1],[0,1],[-1,0],[1,0]],Q=1;function Ce(e){X=e}function we(e){if(!X)return 1;ye.set(0,1,0).applyQuaternion(o.quaternion),le.set(1,0,0).applyQuaternion(o.quaternion);let t=1;for(let[n,r]of Se){be.copy(W).addScaledVector(le,n*e).addScaledVector(ye,r*e),xe.subVectors(be,Z);let i=xe.length();if(i<.001)continue;xe.divideScalar(i);let a=n===0&&r===0?i+e:i,o=X.cast(Z,xe,a);o<a&&(t=Math.min(t,o*.97/a))}return Math.max(t,.12)}let $=document.getElementById(`companion-bubble`),Te=$?$.querySelector(`.companion-text`):null,Ee=null,De=null,Oe=!1;function ke(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]).replace(/(https?:\/\/[^\s]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`)}function Ae(e,t=4500){if(!$||!Te)return;clearInterval(Ee),clearTimeout(De),Te.textContent=``,$.classList.add(`visible`),Oe=!0,pe=!0;let n=Array.from(e),r=0;Ee=setInterval(()=>{Te.textContent+=n[r],r++,r>=n.length&&(clearInterval(Ee),e.includes(`http`)&&(Te.innerHTML=ke(e)))},26),De=setTimeout(je,t+n.length*26)}function je(){$&&(clearInterval(Ee),$.classList.remove(`visible`),Oe=!1,pe=!1)}let Me=new k,Ne=new k;function Pe(){if(!$||!Oe)return;if(Me.copy(d.position).project(o),Me.z>1){$.style.opacity=`0`;return}$.style.opacity=``;let e=window.innerWidth,t=window.innerHeight,n=(Me.x+1)*.5*e,r=(1-Me.y)*.5*t,i=$.offsetWidth,a=$.offsetHeight;Ne.set(1,0,0).applyQuaternion(o.quaternion).multiplyScalar(.36*d.scale.x).add(d.position).project(o);let s=Math.max(Math.abs((Ne.x+1)*.5*e-n),14),c=n-s-18-i>=12?`left`:`right`,l=c===`left`?n-s-18-i:n+s+18,u=r+s*.2,f=u-a*.5;l=Math.min(Math.max(l,12),e-i-12),f=Math.min(Math.max(f,64),t-a-12),$.dataset.side=c,$.style.transform=`translate(${Math.round(l)}px, ${Math.round(f)}px)`;let p=Math.min(Math.max(u-f,18),a-18);$.style.setProperty(`--tail-y`,`${Math.round(p)}px`)}function Fe(e,t,n){let r=n.portrait,i=n.progress,a=!!n.cabin,s=a?-1.25:r?-5.6:-5.2,l=Math.tan(c.degToRad(o.fov/2))*-s,u=l*o.aspect,m=a?-u*(r?.45:.62):u*(r?.55:.74),h=-l*(a?r?.72:.42:r?.5:.6),g=n.anchor||null;d.scale.setScalar(g?g.scale:a?.15:1.05),g?K.set(g.x+Math.sin(t*.6)*g.scale*.25,g.y+Math.sin(t*1.4)*g.scale*.12,g.z+Math.cos(t*.45)*g.scale*.2):(K.set(m+Math.sin(i*41)*u*.08,h+Math.sin(i*27+1.2)*l*.07+Math.sin(t*1.4)*.05,s+Math.cos(i*33)*.35),K.y+=c.clamp(-(n.verticalSpeed||0)*.01,-.3,.25));let _=a||g?0:c.smoothstep(n.idle||0,10,12.5);if(_>0){ve+=e;let t=ve;ne.set(Math.sin(t*.42)*(r?.9:2.6)+Math.sin(t*1.1)*.3,Math.sin(t*.63+.8)*(r?1.4:1),-5.6+Math.sin(t*.31)*1.6),K.lerp(ne,_)}else ve=0;G.copy(K),o.localToWorld(G),ge||=(W.copy(G),!0);let v=2*Math.sqrt(26)*.85;te.addScaledVector(G.clone().sub(W),26*e),te.multiplyScalar(Math.max(0,1-v*e)),W.addScaledVector(te,e),(W.distanceTo(G)>25||n.teleport)&&W.copy(G),o.getWorldDirection(ie),le.set(1,0,0).applyQuaternion(o.quaternion),ue&&ce.copy(K).sub(se).divideScalar(Math.max(e,.001)),se.copy(K),ue=!0;let x=ce.length();if(J.copy(ie).multiplyScalar(-1).addScaledVector(le,(n.portrait?-.25:-.45)*(a?-1:1)),x>.15){let e=ce.clone().applyQuaternion(o.quaternion).normalize();J.addScaledVector(e,Math.min(x,2)*.9)}J.normalize(),g&&(o.getWorldPosition(Z),J.subVectors(Z,W).normalize()),Y.position.copy(W),Y.up.copy(o.up).applyQuaternion(o.quaternion),ae.copy(W).add(J),Y.lookAt(ae);let C=re.clone().cross(J).dot(Y.up)/Math.max(e,.001);_e=c.lerp(_e,c.clamp(-C*.9,-.9,.9),1-Math.exp(-e*4)),re.copy(J),Y.rotateZ(_e+Math.sin(t*1.7)*.04),he.copy(Y.quaternion),o.getWorldPosition(Z);let T=a||g?1:we(.62*d.scale.x);Q=T<Q?T:Q+(T-Q)*(1-Math.exp(-e*3)),Q<.999?(d.position.subVectors(W,Z).multiplyScalar(Q).add(Z),d.scale.multiplyScalar(Q)):d.position.copy(W),z.uniforms.uShip.value=d.scale.x/1.05,d.quaternion.slerp(he,1-Math.exp(-e*7)),de-=e,de<=0&&(fe=0,de=2+Math.random()*3),fe=Math.min(1,fe+e*7);let O=1-Math.sin(fe*Math.PI)*.9,k=performance.now();Be.value=t;let A=k<M;N&&!A&&Ae(`Ah ! Bien dormi 😊 On reprend ?`,3500),N=A,j=!!n.dancing&&!A;let F=k<ee,B=k<D?E:null,q=pe&&Math.floor(t*8)%2==0;A?p.set(`sleep`,`o`,!0):F?p.set(`dizzy`,`wavy`):B===`angry`?p.set(`angry`,`flat`):B===`love`?p.set(`heart`,`grin`):B===`wow`?p.set(`star`,q?`open`:`grin`):B===`surprised`?p.set(`wide`,`o`):B===`sad`?p.set(`sad`,`wavy`):j?p.set(`happy`,`grin`):B===`happy`?p.set(`happy`,q?`open`:`grin`):O<.5?p.set(`blink`,q?`open`:`smile`):pe?p.set(`happy`,q?`open`:`smile`):P?p.set(`sleepy`,`o`):p.set(`open`,`smile`),y.rotation.z=Math.sin(t*2.3)*.18-_e*.5,y.rotation.x=Math.sin(t*1.7)*.1,me+=e*(A?1.5:6+Math.min(x,3)*4+(j?6:0)),b.forEach(e=>{e.rotation.z=-e.userData.side*Math.sin(me)*.32}),S.rotation.y+=e*(j?5:1.6);let oe=1-Math.exp(-e*12),X=0,ye=0,be=0,xe=0;if(j){let e=92/60*t,n=e%1,r=Math.floor(e),i=r%4==3;X=Math.exp(-n*6),ye=Math.sin(Math.PI*n)*(i?.17:.05),be=Math.exp(-n*10),xe=(r%2?1:-1)*.1*X,i&&(X=-.6*Math.sin(Math.PI*n))}A&&(X=.8+Math.sin(t*1.2)*.1),w.rotation.x=c.lerp(w.rotation.x,X*.42,oe),k<ee?w.rotation.y+=e*14:w.rotation.y=c.lerp(w.rotation.y%(Math.PI*2),0,oe),w.rotation.z=c.lerp(w.rotation.z,xe,oe),y.rotation.x+=-X*.9,w.position.y=Math.sin(t*2.4)*.025+ye;let Se=c.clamp(x*.04,0,.14),Ce=c.lerp(w.scale.z,1+Se,1-Math.exp(-e*6)),$=j?be*.14:0;w.scale.set((1-(Ce-1)*.5)*(1+$*.5),(1-(Ce-1)*.5)*(1-$),Ce),H+=e;for(let t=0;t<L.length;t++)L[t]=Math.min(1,L[t]+e/.9);H>.02&&(H=0,d.updateMatrixWorld(),f.forEach((e,t)=>{U.copy(e),d.localToWorld(U);let n=V*2+t;I[n*3]=U.x,I[n*3+1]=U.y,I[n*3+2]=U.z,L[n]=0}),V=(V+1)%48,R.attributes.position.needsUpdate=!0),R.attributes.age.needsUpdate=!0,Pe()}function Ie(e,t){z.uniforms.uScale.value=e/(2*Math.tan(c.degToRad(t)/2))}let Le=new O;function Re(e){return Le.center.copy(d.position),Le.radius=.7*d.scale.x,e.ray.intersectsSphere(Le)}function ze(){T.hullMat.color.set(16768122),T.hullMat.metalness=.55,T.hullMat.roughness=.28,T.hullMat.emissive.set(7031308),T.hullMat.emissiveIntensity=.7,T.pastelMat.color.set(16771752),T.pastelMat.metalness=.5,T.pastelMat.roughness=.3,T.pastelMat.emissive.set(7031308),T.pastelMat.emissiveIntensity=.6}let Be={value:0},Ve=null,He=!1;function Ue(e){return new m({uniforms:{uTime:Be,uMap:{value:e||null},uUseMap:{value:+!!e}},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
        varying vec3 vN;
        varying vec3 vView;
        varying float vY;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vY = wp.y;
          vec4 mv = viewMatrix * wp;
          vView = -mv.xyz;
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform sampler2D uMap;
        uniform float uUseMap;
        varying vec3 vN;
        varying vec3 vView;
        varying float vY;
        varying vec2 vUv;
        void main() {
          float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vView))), 2.0);
          float scan = 0.55 + 0.45 * sin(vY * 260.0 - uTime * 8.0);
          float band = smoothstep(0.0, 0.05, fract(vY * 3.0 - uTime * 0.6)) * 0.3 + 0.7;
          float flick = 0.9 + 0.1 * sin(uTime * 37.0) * sin(uTime * 11.0);
          vec3 col = vec3(0.25, 0.85, 1.2) * (0.12 + fres * 0.9) * scan * band * flick;
          if (uUseMap > 0.5) col += texture2D(uMap, vUv).rgb * vec3(0.7, 1.0, 1.1) * 0.9 * flick;
          gl_FragColor = vec4(col, 1.0);
        }
      `})}function We(e){e!==He&&(He=e,Ve||={body:Ue(null),face:Ue(p.texture)},d.traverse(t=>{t.isMesh&&(e?(t.userData.realMat=t.material,t.material=t.material===T.visorMat?Ve.face:Ve.body):t.userData.realMat&&(t.material=t.userData.realMat))}))}function Ge(e,t=2.5){E=e,D=performance.now()+t*1e3}function Ke(e=1.4){ee=performance.now()+e*1e3}function qe(e=15){M=performance.now()+e*1e3}function Je(e){P=e}function Ye(){if(F)return;let t=new r({color:16763213,metalness:1,roughness:.25,emissive:5913088,emissiveIntensity:.4});F=new x;let a=new n(new A(.13,.12,.07,24,1,!0),t);a.material.side=2,F.add(a);for(let r=0;r<5;r++){let a=r/5*Math.PI*2,o=new n(new e(.03,.08,8),t);o.position.set(Math.cos(a)*.125,.07,Math.sin(a)*.125),F.add(o);let c=new n(new h(.014,10,8),new i({color:new s(r%2?2.4:.4,.3,r%2?1.2:2.6),toneMapped:!1}));c.position.set(Math.cos(a)*.13,.115,Math.sin(a)*.13),F.add(c)}F.position.set(0,.3,.02),F.rotation.x=-.15,w.add(F)}return{update:Fe,say:Ae,hide:je,resize:Ie,isHit:Re,ship:d,setCollision:Ce,setGolden:ze,spin:Ke,sleep:qe,setSleepy:Je,setCrown:Ye,setMood:Ge,setHologram:We,get hologram(){return He},get sleeping(){return performance.now()<M}}}export{K as a,W as c,ee as d,j as f,q as i,G as l,N as m,J as n,L as o,M as p,ne as r,te as s,se as t,P as u};