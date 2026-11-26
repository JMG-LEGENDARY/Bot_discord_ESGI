import{$ as e,A as t,C as n,G as r,W as i,ft as a,h as o,ht as s,m as c,p as l,q as u,st as d,ut as f,w as p,x as m}from"./three-BM3ZYzA6.js";import{c as h,o as g,s as _}from"./companion-CebKIo5-.js";import{s as v}from"./util-A00l0eUr.js";function y(t,n,r){let i=new Float32Array(t*3),a=new Float32Array(t*3),s=new Float32Array(t*2),l=[[.75,.85,1],[1,1,1],[1,.86,.72],[.7,.95,1],[.95,.78,1]];for(let e=0;e<t;e++){let t=r()*2-1,o=r()*Math.PI*2,c=Math.sqrt(1-t*t);i.set([Math.cos(o)*c*n,t*n,Math.sin(o)*c*n],e*3);let u=l[Math.floor(r()*l.length)];a.set(u,e*3),s.set([.6+r()**6*3.2,r()*100],e*2)}let u=new o;u.setAttribute(`position`,new c(i,3)),u.setAttribute(`color`,new c(a,3)),u.setAttribute(`aData`,new c(s,2));let f=new d({uniforms:{uTime:{value:0},uOpacity:{value:1},uPx:{value:window.devicePixelRatio}},transparent:!0,depthWrite:!1,blending:2,vertexShader:`
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
    `}),p=new e(u,f);return p.frustumCulled=!1,p}function b(e){let t=new d({uniforms:{uOpacity:{value:1}},side:1,depthWrite:!1,vertexShader:`
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
        gl_FragColor = vec4(col * uOpacity, 1.0);
      }
    `}),n=new i(new f(e,48,24),t);return n.frustumCulled=!1,n}function x(){let e=new t,o=new u({color:9411509,metalness:.8,roughness:.35}),s=new u({color:1778230,metalness:.7,roughness:.4}),c=new r({color:new m(.4,1.6,2.2),toneMapped:!1}),d=new r({color:new m(2.2,1.4,.6),toneMapped:!1}),p=new u({color:1323114,metalness:.6,roughness:.25,emissive:465469,emissiveIntensity:.6}),h=new i(new n(3,3,16,24),o);e.add(h);let g=new i(new f(3,24,12,0,Math.PI*2,0,Math.PI/2),o);g.position.y=8,e.add(g);let _=new i(new a(22,2.2,12,96),o);_.rotation.x=Math.PI/2,e.add(_);let v=new i(new a(22,2.25,4,96,Math.PI*2),d);v.rotation.x=Math.PI/2,v.scale.set(1,1,.18),e.add(v);for(let t=0;t<4;t++){let r=new i(new n(.6,.6,19,8),s);r.rotation.z=Math.PI/2,r.rotation.y=t/4*Math.PI*2,r.position.set(Math.cos(t/4*Math.PI*2)*11.5,0,-Math.sin(t/4*Math.PI*2)*11.5),e.add(r)}for(let t of[-1,1]){let n=new i(new l(.5,.5,30),s);n.position.set(0,t*5,0),e.add(n);for(let n of[-11,-5,5,11]){let r=new i(new l(9,.15,4.5),p);r.position.set(0,t*5,n),e.add(r)}}let y=new i(new f(.7,12,8),c);y.position.y=11,e.add(y);let b=new i(new a(24.3,.18,6,96),c);return b.rotation.x=Math.PI/2,e.add(b),{group:e,ring:_,windows:v,ringLights:b,beacon:y}}function S({seed:e=7,stars:n=5e3,layout:r=`cockpit`}={}){let i=v(e),a=new t,o=new t;a.add(o);let c=b(950);o.add(c);let l=y(n,900,i);o.add(l);let u=new s(.8,.35,.45).normalize(),d=_({radius:130,texture:g(),atmo:5223679,lightDir:u,ring:{inner:170,outer:270,colorA:9417944,colorB:15135487,tiltX:Math.PI/2.5,tiltY:.3,tiltZ:.25}});d.setOpacity(1);let f=_({radius:34,texture:h(),atmo:16752736,lightDir:u,ring:{inner:44,outer:70,colorA:10520176,colorB:15917768,tiltX:Math.PI/2.3,tiltY:-.4,tiltZ:-.2}});f.setOpacity(1);let m=x(),S={cockpit:{planet:[-330,-70,-640],moon:[260,120,-760],station:[70,-6,-150],stationScale:.6},hq:{planet:[380,-40,-620],moon:[-300,160,-700],station:[-120,20,-260],stationScale:.8},lab:{planet:[-60,-220,-620],moon:[320,60,-560],station:[160,30,-240],stationScale:.7}},C=S[r]||S.cockpit;d.group.position.set(...C.planet),f.group.position.set(...C.moon),m.group.position.set(...C.station),m.group.scale.setScalar(C.stationScale),m.group.rotation.set(.5,.2,.35),a.add(d.group,f.group,m.group);let w=new p(13624063,1.6);w.position.copy(u).multiplyScalar(100),a.add(w);let T=1;function E(e){T=e,l.material.uniforms.uOpacity.value=e,c.material.uniforms.uOpacity.value=.25+e*.75,d.setOpacity(e),f.setOpacity(e),m.group.visible=e>.02}function D(e,t){t&&o.position.copy(t.position),l.material.uniforms.uTime.value=e,m.group.rotateOnAxis(new s(0,1,0),.0012),m.beacon.visible=Math.sin(e*3)>.2,d.group.rotation.y=e*.004,d.update(),f.update()}return{group:a,sun:w,update:D,setOpacity:E,get opacity(){return T}}}export{S as t};