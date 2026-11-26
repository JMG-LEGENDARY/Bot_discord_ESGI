import{$ as e,A as t,C as n,D as r,G as i,H as a,J as o,K as s,S as c,T as l,W as u,Z as d,at as f,ct as p,ft as m,g as h,h as g,ht as _,it as v,l as y,lt as b,m as x,mt as S,ot as C,q as w,rt as T,st as E,tt as D,ut as O,x as k,y as ee}from"./three-BM3ZYzA6.js";var A={cyan:`#22e4ff`,magenta:`#ff3dbb`,violet:`#8b5cf6`,night:`#060814`,ink:`#0b1022`,steel:`#151c33`,slate:`#2a3352`,text:`#e8ecff`,textSoft:`#a9b3d6`},j={cyan:[.15,2.3,2.8],magenta:[2.6,.25,1.6],violet:[1.3,.6,2.6]},M={cityTop:659246,cityMid:1710666,cityHorizon:3810656,spaceTop:66055,spaceMid:263702,spaceHorizon:724778,cavernFog:263695},N={cityTop:165063,cityMid:3718648,cityHorizon:12248829},P={value:0};function F(){let e=new Float32Array(65536).map(()=>Math.random()),t=e=>e*e*(3-2*e);function n(n,r,i){let a=Math.floor(n),o=Math.floor(r),s=t(n-a),c=t(r-o),l=(a%i+i)%i,u=(l+1)%i,d=(o%256+256)%256,f=(d+1)%256,p=e[d*256+l],m=e[d*256+u],h=e[f*256+l],g=e[f*256+u];return p+(m-p)*s+(h-p)*c+(p-m-h+g)*s*c}return function(e,t,r,i=4){let a=0,o=.5,s=r;for(let c=0;c<i;c++)a+=o*n(e*s,s/r*t,s),s*=2,t=t*2+3.1,o*=.5;return a}}function I(e){let t=document.createElement(`canvas`);t.width=256,t.height=1;let n=t.getContext(`2d`),r=n.createLinearGradient(0,0,256,0);return e.forEach(([e,t])=>r.addColorStop(e,t)),n.fillStyle=r,n.fillRect(0,0,256,1),n.getImageData(0,0,256,1).data}function L({stops:e,bands:t=9,turbulence:n=.06,storms:r=[],width:i=1024,height:o=512}){let s=F(),c=I(e),l=document.createElement(`canvas`);l.width=i,l.height=o;let u=l.getContext(`2d`),d=u.createImageData(i,o),p=d.data,m=Array.from({length:64},()=>Math.random());for(let e=0;e<o;e++){let l=e/o;for(let o=0;o<i;o++){let u=o/i,d=l,f=0,h=null;for(let e of r){let t=u-e.u;t-=Math.round(t);let n=d-e.v,r=Math.sqrt((t/e.ru)**2+(n/e.rv)**2);if(r<2.2){let i=(e.swirl||2.5)*Math.max(0,1-r/2.2)**2,o=Math.cos(i),s=Math.sin(i),c=t*o-n*e.ru/e.rv*s,l=t*s*e.rv/e.ru+n*o;u=e.u+c,d=e.v+l;let p=1-a.smoothstep(r,.55,1.05);p>f&&(f=p,h=e.color)}}u-=Math.floor(u);let g=(s(u,d*6,6)-.5)*n+(s(u,d*22+40,14,3)-.5)*n*.35,_=(d+g)*t,v=Math.floor(_),y=_-v,b=a.clamp(d+g*.6,0,1),x=(m[(v%64+64)%64]-.5)*.22,S=a.clamp(b+x*Math.sin(y*Math.PI),0,.999),C=Math.floor(S*255)*4,w=.78+s(u,d*90+7,24,3)*.42+Math.sin(y*Math.PI)*.06,T=c[C]*w,E=c[C+1]*w,D=c[C+2]*w;if(f>0){let e=.85+s(u,d*40,30,3)*.3;T+=(h[0]*e-T)*f,E+=(h[1]*e-E)*f,D+=(h[2]*e-D)*f}let O=a.smoothstep(Math.abs(l-.5),.36,.5),k=(e*i+o)*4;p[k]=Math.min(255,T*(1-O*.45)),p[k+1]=Math.min(255,E*(1-O*.45)),p[k+2]=Math.min(255,D*(1-O*.4)),p[k+3]=255}}u.putImageData(d,0,0);let g=new h(l);return g.colorSpace=f,g.anisotropy=8,g.wrapS=T,g}var R=`
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
`;function W({radius:e,texture:n,atmo:r,lightDir:i,ring:a}){let o=new t,s=new k(r),c=new _,l=new _(0,0,1),d={map:{value:n},uLightDir:{value:i},uAtmo:{value:s},uOpacity:{value:0},uRingNormal:{value:l},uCenter:{value:c},uRing:{value:new S(a.inner,a.outer)}},f=new u(new O(e,96,64),new E({uniforms:d,vertexShader:R,fragmentShader:z,transparent:!0})),p=new t;p.rotation.z=a.tiltZ||.25,p.add(f),o.add(p);let m=1.12,h={uLightDir:{value:i},uAtmo:{value:s},uOpacity:{value:0},uEdge:{value:Math.sqrt(1-1/(m*m))}},g=new u(new O(e*m,64,48),new E({uniforms:h,vertexShader:B,fragmentShader:V,side:1,transparent:!0,depthWrite:!1,blending:2}));o.add(g);let y={uLightDir:{value:i},uColorA:{value:new k(a.colorA)},uColorB:{value:new k(a.colorB)},uOpacity:{value:0},uRadii:{value:new S(a.inner,a.outer)},uCenter:{value:c},uPlanetR:{value:e},uNormal:{value:l}},b=new u(new v(a.inner,a.outer,160,1),new E({uniforms:y,vertexShader:H,fragmentShader:U,side:2,transparent:!0,depthWrite:!1}));b.rotation.x=a.tiltX,b.rotation.y=a.tiltY,o.add(b);let x=new D,C=new _;function w(){o.updateMatrixWorld(),b.matrixWorld.decompose(c,x,C),l.set(0,0,1).applyQuaternion(x);let t=C.x;y.uPlanetR.value=e*t,d.uRing.value.set(a.inner*t,a.outer*t)}function T(e){d.uOpacity.value=e,h.uOpacity.value=e,y.uOpacity.value=e,o.visible=e>.001}return{group:o,mesh:f,update:w,setOpacity:T,get opacity(){return d.uOpacity.value}}}function te(){return L({stops:[[0,`#0b1a3a`],[.18,`#1d4f9a`],[.35,`#3d86d6`],[.48,`#7cc4ec`],[.56,`#5aa6e0`],[.7,`#2a68b8`],[.85,`#173e85`],[1,`#0a1733`]],bands:11,turbulence:.05,storms:[{u:.3,v:.62,ru:.045,rv:.035,color:[18,36,92],swirl:3},{u:.72,v:.38,ru:.02,rv:.015,color:[210,235,255],swirl:2}]})}function G(){return L({stops:[[0,`#3a1408`],[.12,`#7a3218`],[.25,`#c8784a`],[.36,`#e8c49a`],[.45,`#b44a24`],[.52,`#f0d2a8`],[.6,`#c0582c`],[.72,`#e2b07c`],[.84,`#8a3a1a`],[1,`#2e1006`]],bands:14,turbulence:.07,storms:[{u:.62,v:.6,ru:.06,rv:.035,color:[176,58,30],swirl:3.2}]})}function K(t,n=512){let r=new Float32Array(n*3),i=new Float32Array(n*3),o=new Float32Array(n),s=new g;s.setAttribute(`position`,new x(r,3).setUsage(l)),s.setAttribute(`color`,new x(i,3).setUsage(l)),s.setAttribute(`size`,new x(o,1).setUsage(l)),s.setDrawRange(0,0);let c=new E({uniforms:{uScale:{value:window.innerHeight},uDay:P},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
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
    `}),u=new e(s,c);u.frustumCulled=!1,u.renderOrder=10,t.add(u);let d=[],f=new _;function p(e,t,r,i,a=null){d.length>=n||d.push({object:e,offset:t.clone(),color:new k(...r),size:i,blink:a})}function m(e){let t=0;for(let n=0;n<d.length;n++){let a=d[n];if(!a.object.visible)continue;let s=1;if(!(a.blink&&(s=+((e*a.blink.speed+a.blink.phase)%1<a.blink.duty),s===0))){if(f.copy(a.offset),a.object.localToWorld(f),r[t*3]=f.x,r[t*3+1]=f.y,r[t*3+2]=f.z,i[t*3]=a.color.r*s,i[t*3+1]=a.color.g*s,i[t*3+2]=a.color.b*s,a.object.userData.glowScale){let e=a.object.matrixWorld.elements;o[t]=a.size*Math.hypot(e[0],e[1],e[2])}else o[t]=a.size;t++}}s.setDrawRange(0,t),s.attributes.position.needsUpdate=!0,s.attributes.color.needsUpdate=!0,s.attributes.size.needsUpdate=!0}function h(e,t=50){c.uniforms.uScale.value=e/(2*Math.tan(a.degToRad(t)/2))}return{add:p,update:m,resize:h,points:u}}var q={headlight:[2.2,2.3,2.6],taillight:[2.6,.12,.25],navRed:[3,.15,.15],navGreen:[.2,2.6,.6],strobe:[3.2,3.2,3.4],engineCyan:[.35,2.2,3],engineMagenta:[2.6,.35,1.8],aviation:[3.2,.2,.1]};function ne(e){let t=new C,n=new E({side:1,depthWrite:!1,vertexShader:`
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
    `});t.add(new u(new O(50,32,16),n));let r=new u(new O(1.6,16,8),new i({color:new k(4,4.2,5)}));r.position.set(20,34,22),t.add(r);let a=[new k(.3,3,3.6),new k(3.4,.4,2.2),new k(1.6,.8,3.4)];for(let e=0;e<26;e++){let n=e/26*Math.PI*2,r=e%3==0,o=new u(new d(r?.6:2+e%3,r?6:.35+e%2*.5),new i({color:a[e%3].clone().multiplyScalar(1.6),side:2}));o.position.set(Math.cos(n)*40,(r?4:1)+e%5*3,Math.sin(n)*40),o.lookAt(0,o.position.y,0),t.add(o)}let o=new y(e),s=o.fromScene(t,.02).texture;return o.dispose(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),s}function J(e){let t=new C,n=new E({side:1,depthWrite:!1,vertexShader:`
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
    `});t.add(new u(new O(50,32,16),n));let r=new u(new O(2.4,16,8),new i({color:new k(12,11,9.5)}));r.position.set(20,34,22),t.add(r);let a=new y(e),o=a.fromScene(t,.02).texture;return a.dispose(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),o}function re(){let e=document.createElement(`canvas`);e.width=1024,e.height=512;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,512);n.addColorStop(0,`#ffffff`),n.addColorStop(.5,`#f4f6fc`),n.addColorStop(1,`#dde2ef`),t.fillStyle=n,t.fillRect(0,0,1024,512),t.fillStyle=`rgba(120, 130, 165, 0.35)`,t.fillRect(0,262,1024,3),t.fillStyle=`rgba(255, 255, 255, 0.9)`,t.fillRect(0,265,1024,2);for(let e=0;e<4;e++){let n=128+e*256;for(let e=0;e<3;e++)t.fillStyle=`rgba(110, 120, 160, 0.3)`,t.beginPath(),t.roundRect(n-24,330+e*12,48,5,3),t.fill()}let r=new h(e);return r.colorSpace=f,r.anisotropy=8,r}function ie(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`),n=new h(e);n.colorSpace=f;let r=`#62f4ff`,i=[178,334],a=``;function o(e){t.strokeStyle=r,t.lineWidth=e,t.lineCap=`round`,t.lineJoin=`round`}function s(){[118,394].forEach(e=>{let n=t.createRadialGradient(e,318,0,e,318,46);n.addColorStop(0,`rgba(255, 110, 190, 0.85)`),n.addColorStop(1,`rgba(255, 110, 190, 0)`),t.fillStyle=n,t.beginPath(),t.ellipse(e,318,46,28,0,0,Math.PI*2),t.fill()})}let c={open(){t.fillStyle=r,i.forEach(e=>{t.beginPath(),t.ellipse(e,222,34,50,0,0,Math.PI*2),t.fill(),t.fillStyle=`rgba(255,255,255,0.9)`,t.beginPath(),t.ellipse(e-11,202,11,14,-.4,0,Math.PI*2),t.fill(),t.fillStyle=r})},sleepy(){t.fillStyle=r,i.forEach(e=>{t.save(),t.beginPath(),t.rect(e-40,218,80,60),t.clip(),t.beginPath(),t.ellipse(e,222,34,50,0,0,Math.PI*2),t.fill(),t.restore()}),o(10),i.forEach(e=>{t.beginPath(),t.moveTo(e-38,218),t.lineTo(e+38,218),t.stroke()})},blink(){o(14),i.forEach(e=>{t.beginPath(),t.moveTo(e-32,228),t.lineTo(e+32,228),t.stroke()})},happy(){o(20),i.forEach(e=>{t.beginPath(),t.arc(e,244,34,Math.PI*1.1,Math.PI*1.9),t.stroke()})},sleep(){o(14),i.forEach(e=>{t.beginPath(),t.arc(e,216,30,Math.PI*.15,Math.PI*.85),t.stroke()})},dizzy(){o(9),i.forEach(e=>{t.beginPath();for(let n=0;n<Math.PI*5;n+=.15){let r=4+n*2.6,i=e+Math.cos(n)*r,a=222+Math.sin(n)*r;n===0?t.moveTo(i,a):t.lineTo(i,a)}t.stroke()})},angry(){o(18),[[i[0],1],[i[1],-1]].forEach(([e,n])=>{t.beginPath(),t.moveTo(e-26*n,192),t.lineTo(e+24*n,222),t.lineTo(e-26*n,252),t.stroke()})}},l={smile(){o(16),t.beginPath(),t.arc(256,300,40,Math.PI*.18,Math.PI*.82),t.stroke()},open(){t.fillStyle=r,t.beginPath(),t.moveTo(214,320),t.quadraticCurveTo(256,316,298,320),t.quadraticCurveTo(292,382,256,384),t.quadraticCurveTo(220,382,214,320),t.fill(),t.fillStyle=`rgba(255, 110, 190, 0.9)`,t.beginPath(),t.ellipse(256,366,22,10,0,0,Math.PI*2),t.fill()},grin(){t.fillStyle=r,t.beginPath(),t.moveTo(198,318),t.quadraticCurveTo(256,314,314,318),t.quadraticCurveTo(300,396,256,398),t.quadraticCurveTo(212,396,198,318),t.fill()},o(){o(12),t.beginPath(),t.ellipse(256,340,14,18,0,0,Math.PI*2),t.stroke()},flat(){o(14),t.beginPath(),t.moveTo(226,340),t.lineTo(286,340),t.stroke()},wavy(){o(12),t.beginPath();for(let e=210;e<=302;e+=4){let n=340+Math.sin((e-210)*.14)*9;e===210?t.moveTo(e,n):t.lineTo(e,n)}t.stroke()}};function u(e,i,o=!1){let u=`${e}/${i}/${o}`;u!==a&&(a=u,t.clearRect(0,0,512,512),t.fillStyle=`#000`,t.fillRect(0,0,512,512),t.shadowColor=r,t.shadowBlur=18,s(),c[e](),l[i](),o&&(t.fillStyle=r,t.font=`bold 54px sans-serif`,t.fillText(`z`,360,130),t.font=`bold 38px sans-serif`,t.fillText(`z`,404,92)),t.shadowBlur=0,n.needsUpdate=!0)}return u(`open`,`smile`),{texture:n,set:u}}function ae(){let e=document.createElement(`canvas`);e.width=128,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,256,0,0);n.addColorStop(0,`rgba(150, 235, 255, 0.95)`),n.addColorStop(1,`rgba(200, 245, 255, 0.55)`),t.fillStyle=n,t.beginPath(),t.ellipse(64,128,60,124,0,0,Math.PI*2),t.fill(),t.strokeStyle=`rgba(255, 255, 255, 0.95)`,t.lineWidth=7,t.stroke(),t.strokeStyle=`rgba(255, 255, 255, 0.6)`,t.lineWidth=4,t.beginPath(),t.moveTo(64,246),t.quadraticCurveTo(54,128,72,30),t.stroke();let r=new h(e);return r.colorSpace=f,r}function oe(){let e=new t,a=.3,o=new s({color:16777215,map:re(),metalness:0,roughness:.34,clearcoat:1,clearcoatRoughness:.1,sheen:.35,sheenRoughness:.5,sheenColor:new k(15923455),iridescence:.15,iridescenceIOR:1.3,envMapIntensity:1.1}),c=new s({color:10479862,roughness:.32,clearcoat:1,clearcoatRoughness:.12,sheen:.5,sheenColor:new k(16777215),envMapIntensity:1}),l=new s({color:16754392,roughness:.32,clearcoat:1,clearcoatRoughness:.12,sheen:.5,sheenColor:new k(16777215),envMapIntensity:1}),f=new s({color:4014944,metalness:.55,roughness:.28,clearcoat:.6,envMapIntensity:1.2}),h=ie(),g=new s({color:461852,emissive:16777215,emissiveMap:h.texture,emissiveIntensity:1.6,metalness:.2,roughness:.05,clearcoat:1,clearcoatRoughness:.03,iridescence:.35,iridescenceIOR:1.6,envMapIntensity:1.6}),v=new i({color:16777215,transparent:!0,opacity:.6,depthWrite:!1}),y=new i({color:new k(.5,2.6,3.4),toneMapped:!1}),b=new i({color:new k(2.8,.4,1.8),toneMapped:!1}),x=new i({map:ae(),color:new k(1.15,1.15,1.2),transparent:!0,depthWrite:!1,side:2,toneMapped:!1}),S=new u(new O(a,72,48),o);S.scale.set(1.04,.96,1),e.add(S);let C=.98,w=a*1.012,T=new O(w,64,32,0,Math.PI*2,0,C);T.rotateX(Math.PI/2);let E=w*Math.sin(C),D=T.attributes.position,A=T.attributes.uv;for(let e=0;e<D.count;e++)A.setXY(e,D.getX(e)/(2*E)+.5,D.getY(e)/(2*E)+.5);let j=new u(T,g);j.scale.copy(S.scale),e.add(j);let M=new u(new m(E,.017,14,80),c);M.position.z=w*Math.cos(C),M.scale.copy(S.scale),e.add(M);let N=new u(new ee(.03,20),v);N.scale.set(1.9,.6,1),N.position.set(-.1,.13,.25),N.lookAt(new _(-.1,.13,.25).multiplyScalar(3)),N.rotateZ(.6),e.add(N);let P=new u(new ee(.012,14),v);P.position.set(-.035,.165,.258),P.lookAt(new _(-.035,.165,.258).multiplyScalar(3)),e.add(P),[[-.075,c],[.075,l]].forEach(([t,n])=>{let r=Math.sqrt(a*a-t*t)+.004,i=new u(new m(r,.011,10,60,Math.PI*.62),n);i.rotation.y=Math.PI/2,i.rotation.x=Math.PI*.12,i.position.x=t,i.scale.set(1,.96,1),e.add(i)}),[-1,1].forEach(t=>{let r=new u(new n(.075,.08,.04,40),l);r.rotation.z=Math.PI/2,r.position.set(t*.305,-.01,-.02),e.add(r);let i=new u(new n(.045,.05,.02,32),c);i.rotation.z=Math.PI/2,i.position.set(t*.33,-.01,-.02),e.add(i)});let F=[];[-1,1].forEach(n=>{let r=new t;r.position.set(n*.1,.24,-.1);let i=new t;i.rotation.z=-n*.38,i.rotation.x=-.35;let a=new u(new d(.15,.32),x);a.position.y=.15,i.add(a),r.add(i),r.userData.side=n,e.add(r),F.push(r)});let I=new t;I.position.set(0,.27,.04);let L=new u(new O(.026,20,12,0,Math.PI*2,0,Math.PI/2),l),R=new u(new n(.007,.011,.1,12),f);R.position.y=.05;let z=new p;z.moveTo(0,-.03),z.bezierCurveTo(-.045,0,-.035,.035,0,.018),z.bezierCurveTo(.035,.035,.045,0,0,-.03);let B=new r(z,{depth:.014,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:4,curveSegments:20});B.center();let V=new u(B,b);V.scale.setScalar(1.2),V.position.y=.125,I.add(L,R,V),e.add(I);let H=[];[-1,1].forEach(t=>{let n=new u(new O(.055,32,20),f);n.scale.set(1,1,1.2),n.position.set(t*.1,-.1,-.25),e.add(n);let r=new u(new m(.042,.009,10,32),c);r.position.set(t*.1,-.1,-.312),e.add(r);let i=new u(new ee(.037,24),y);i.rotation.y=Math.PI,i.position.set(t*.1,-.1,-.318),e.add(i),H.push(new _(t*.1,-.1,-.34))});let U=new t;for(;e.children.length;)U.add(e.children[0]);return e.add(U),{ship:e,nozzles:H,face:h,antenna:I,wings:F,heart:V,rig:U,mats:{hullMat:o,pastelMat:c}}}function se(r,s,d){let{ship:f,nozzles:p,face:m,antenna:h,wings:v,heart:y,rig:S,mats:C}=oe(),T=null,ee=0,A=!1,j=0,M=0,N=!1,P=!1,F=null;f.scale.setScalar(1.05),f.userData.glowScale=!0,r.add(f),d&&(p.forEach(e=>{d.add(f,e,q.engineCyan,.38),d.add(f,e,[.6,1.6,2.2],.22,{speed:9,phase:e.x,duty:.6})}),d.add(f,new _(-.345,-.01,-.02),q.navRed,.06),d.add(f,new _(.345,-.01,-.02),q.navGreen,.06),d.add(f,new _(0,.395,.04),[2.4,.4,1.6],.16,{speed:.7,phase:.3,duty:.5}));let I=new Float32Array(288),L=new Float32Array(96);L.fill(1);let R=new g;R.setAttribute(`position`,new x(I,3).setUsage(l)),R.setAttribute(`age`,new x(L,1).setUsage(l));let z=new E({uniforms:{uScale:{value:window.innerHeight},uShip:{value:1}},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
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
    `}),B=new e(R,z);B.frustumCulled=!1,r.add(B);let V=0,H=0,U=new _,W=new _,te=new _,G=new _,K=new _,ne=new _,J=new _,re=new _(0,0,-1),ie=new _,ae=new _,se=new _,ce=new _,le=new _,ue=!1,de=2.5,fe=1,pe=!1,me=0,he=new D,Y=new o,ge=!1,_e=0,ve=0,X=null,Z=new _,ye=new _,be=new _,xe=new _,Se=[[0,0],[0,-1],[0,1],[-1,0],[1,0]],Q=1;function Ce(e){X=e}function we(e){if(!X)return 1;ye.set(0,1,0).applyQuaternion(s.quaternion),le.set(1,0,0).applyQuaternion(s.quaternion);let t=1;for(let[n,r]of Se){be.copy(W).addScaledVector(le,n*e).addScaledVector(ye,r*e),xe.subVectors(be,Z);let i=xe.length();if(i<.001)continue;xe.divideScalar(i);let a=n===0&&r===0?i+e:i,o=X.cast(Z,xe,a);o<a&&(t=Math.min(t,o*.97/a))}return Math.max(t,.12)}let $=document.getElementById(`companion-bubble`),Te=$?$.querySelector(`.companion-text`):null,Ee=null,De=null,Oe=!1;function ke(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]).replace(/(https?:\/\/[^\s]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`)}function Ae(e,t=4500){if(!$||!Te)return;clearInterval(Ee),clearTimeout(De),Te.textContent=``,$.classList.add(`visible`),Oe=!0,pe=!0;let n=Array.from(e),r=0;Ee=setInterval(()=>{Te.textContent+=n[r],r++,r>=n.length&&(clearInterval(Ee),e.includes(`http`)&&(Te.innerHTML=ke(e)))},26),De=setTimeout(je,t+n.length*26)}function je(){$&&(clearInterval(Ee),$.classList.remove(`visible`),Oe=!1,pe=!1)}let Me=new _,Ne=new _;function Pe(){if(!$||!Oe)return;if(Me.copy(f.position).project(s),Me.z>1){$.style.opacity=`0`;return}$.style.opacity=``;let e=window.innerWidth,t=window.innerHeight,n=(Me.x+1)*.5*e,r=(1-Me.y)*.5*t,i=$.offsetWidth,a=$.offsetHeight;Ne.set(1,0,0).applyQuaternion(s.quaternion).multiplyScalar(.36*f.scale.x).add(f.position).project(s);let o=Math.max(Math.abs((Ne.x+1)*.5*e-n),14),c=n-o-18-i>=12?`left`:`right`,l=c===`left`?n-o-18-i:n+o+18,u=r+o*.2,d=u-a*.5;l=Math.min(Math.max(l,12),e-i-12),d=Math.min(Math.max(d,64),t-a-12),$.dataset.side=c,$.style.transform=`translate(${Math.round(l)}px, ${Math.round(d)}px)`;let p=Math.min(Math.max(u-d,18),a-18);$.style.setProperty(`--tail-y`,`${Math.round(p)}px`)}function Fe(e,t,n){let r=n.portrait,i=n.progress,o=!!n.cabin,c=o?-1.25:r?-5.6:-5.2,l=Math.tan(a.degToRad(s.fov/2))*-c,u=l*s.aspect,d=o?-u*(r?.45:.62):u*(r?.55:.74),g=-l*(o?r?.72:.42:r?.5:.6),_=n.anchor||null;f.scale.setScalar(_?_.scale:o?.15:1.05),_?K.set(_.x+Math.sin(t*.6)*_.scale*.25,_.y+Math.sin(t*1.4)*_.scale*.12,_.z+Math.cos(t*.45)*_.scale*.2):(K.set(d+Math.sin(i*41)*u*.08,g+Math.sin(i*27+1.2)*l*.07+Math.sin(t*1.4)*.05,c+Math.cos(i*33)*.35),K.y+=a.clamp(-(n.verticalSpeed||0)*.01,-.3,.25));let b=o||_?0:a.smoothstep(n.idle||0,10,12.5);if(b>0){ve+=e;let t=ve;ne.set(Math.sin(t*.42)*(r?.9:2.6)+Math.sin(t*1.1)*.3,Math.sin(t*.63+.8)*(r?1.4:1),-5.6+Math.sin(t*.31)*1.6),K.lerp(ne,b)}else ve=0;G.copy(K),s.localToWorld(G),ge||=(W.copy(G),!0);let x=2*Math.sqrt(26)*.85;te.addScaledVector(G.clone().sub(W),26*e),te.multiplyScalar(Math.max(0,1-x*e)),W.addScaledVector(te,e),(W.distanceTo(G)>25||n.teleport)&&W.copy(G),s.getWorldDirection(ie),le.set(1,0,0).applyQuaternion(s.quaternion),ue&&ce.copy(K).sub(se).divideScalar(Math.max(e,.001)),se.copy(K),ue=!0;let C=ce.length();if(J.copy(ie).multiplyScalar(-1).addScaledVector(le,(n.portrait?-.25:-.45)*(o?-1:1)),C>.15){let e=ce.clone().applyQuaternion(s.quaternion).normalize();J.addScaledVector(e,Math.min(C,2)*.9)}J.normalize(),_&&(s.getWorldPosition(Z),J.subVectors(Z,W).normalize()),Y.position.copy(W),Y.up.copy(s.up).applyQuaternion(s.quaternion),ae.copy(W).add(J),Y.lookAt(ae);let w=re.clone().cross(J).dot(Y.up)/Math.max(e,.001);_e=a.lerp(_e,a.clamp(-w*.9,-.9,.9),1-Math.exp(-e*4)),re.copy(J),Y.rotateZ(_e+Math.sin(t*1.7)*.04),he.copy(Y.quaternion),s.getWorldPosition(Z);let E=o||_?1:we(.62*f.scale.x);Q=E<Q?E:Q+(E-Q)*(1-Math.exp(-e*3)),Q<.999?(f.position.subVectors(W,Z).multiplyScalar(Q).add(Z),f.scale.multiplyScalar(Q)):f.position.copy(W),z.uniforms.uShip.value=f.scale.x/1.05,f.quaternion.slerp(he,1-Math.exp(-e*7)),de-=e,de<=0&&(fe=0,de=2+Math.random()*3),fe=Math.min(1,fe+e*7);let D=1-Math.sin(fe*Math.PI)*.9,O=performance.now(),k=O<M;N&&!k&&Ae(`Ah ! Bien dormi 😊 On reprend ?`,3500),N=k,A=!!n.dancing&&!k;let F=O<j,B=O<ee?T:null,q=pe&&Math.floor(t*8)%2==0;k?m.set(`sleep`,`o`,!0):F?m.set(`dizzy`,`wavy`):B===`angry`?m.set(`angry`,`flat`):A?m.set(`happy`,`grin`):B===`happy`?m.set(`happy`,q?`open`:`grin`):D<.5?m.set(`blink`,q?`open`:`smile`):pe?m.set(`happy`,q?`open`:`smile`):P?m.set(`sleepy`,`o`):m.set(`open`,`smile`),h.rotation.z=Math.sin(t*2.3)*.18-_e*.5,h.rotation.x=Math.sin(t*1.7)*.1,me+=e*(k?1.5:6+Math.min(C,3)*4+(A?6:0)),v.forEach(e=>{e.rotation.z=-e.userData.side*Math.sin(me)*.32}),y.rotation.y+=e*(A?5:1.6);let oe=1-Math.exp(-e*12),X=0,ye=0,be=0,xe=0;if(A){let e=92/60*t,n=e%1,r=Math.floor(e),i=r%4==3;X=Math.exp(-n*6),ye=Math.sin(Math.PI*n)*(i?.17:.05),be=Math.exp(-n*10),xe=(r%2?1:-1)*.1*X,i&&(X=-.6*Math.sin(Math.PI*n))}k&&(X=.8+Math.sin(t*1.2)*.1),S.rotation.x=a.lerp(S.rotation.x,X*.42,oe),O<j?S.rotation.y+=e*14:S.rotation.y=a.lerp(S.rotation.y%(Math.PI*2),0,oe),S.rotation.z=a.lerp(S.rotation.z,xe,oe),h.rotation.x+=-X*.9,S.position.y=Math.sin(t*2.4)*.025+ye;let Se=a.clamp(C*.04,0,.14),Ce=a.lerp(S.scale.z,1+Se,1-Math.exp(-e*6)),$=A?be*.14:0;S.scale.set((1-(Ce-1)*.5)*(1+$*.5),(1-(Ce-1)*.5)*(1-$),Ce),H+=e;for(let t=0;t<L.length;t++)L[t]=Math.min(1,L[t]+e/.9);H>.02&&(H=0,f.updateMatrixWorld(),p.forEach((e,t)=>{U.copy(e),f.localToWorld(U);let n=V*2+t;I[n*3]=U.x,I[n*3+1]=U.y,I[n*3+2]=U.z,L[n]=0}),V=(V+1)%48,R.attributes.position.needsUpdate=!0),R.attributes.age.needsUpdate=!0,Pe()}function Ie(e,t){z.uniforms.uScale.value=e/(2*Math.tan(a.degToRad(t)/2))}let Le=new b;function Re(e){return Le.center.copy(f.position),Le.radius=.7*f.scale.x,e.ray.intersectsSphere(Le)}function ze(){C.hullMat.color.set(16768122),C.hullMat.metalness=.55,C.hullMat.roughness=.28,C.hullMat.emissive.set(7031308),C.hullMat.emissiveIntensity=.7,C.pastelMat.color.set(16771752),C.pastelMat.metalness=.5,C.pastelMat.roughness=.3,C.pastelMat.emissive.set(7031308),C.pastelMat.emissiveIntensity=.6}function Be(e,t=2.5){T=e,ee=performance.now()+t*1e3}function Ve(e=1.4){j=performance.now()+e*1e3}function He(e=15){M=performance.now()+e*1e3}function Ue(e){P=e}function We(){if(F)return;let e=new w({color:16763213,metalness:1,roughness:.25,emissive:5913088,emissiveIntensity:.4});F=new t;let r=new u(new n(.13,.12,.07,24,1,!0),e);r.material.side=2,F.add(r);for(let t=0;t<5;t++){let n=t/5*Math.PI*2,r=new u(new c(.03,.08,8),e);r.position.set(Math.cos(n)*.125,.07,Math.sin(n)*.125),F.add(r);let a=new u(new O(.014,10,8),new i({color:new k(t%2?2.4:.4,.3,t%2?1.2:2.6),toneMapped:!1}));a.position.set(Math.cos(n)*.13,.115,Math.sin(n)*.13),F.add(a)}F.position.set(0,.3,.02),F.rotation.x=-.15,S.add(F)}return{update:Fe,say:Ae,hide:je,resize:Ie,isHit:Re,ship:f,setCollision:Ce,setGolden:ze,spin:Ve,sleep:He,setSleepy:Ue,setCrown:We,setMood:Be,get sleeping(){return performance.now()<M}}}export{K as a,G as c,A as d,M as f,q as i,P as l,J as n,te as o,N as p,ne as r,W as s,se as t,j as u};