(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`attached`,t=1e3,n=1001,r=1002,i=1003,a=1004,o=1005,s=1006,c=1007,l=1008,u=1009,d=1010,f=1011,p=1012,m=1013,h=1014,g=1015,_=1016,v=1017,y=1018,b=1020,x=35902,S=35899,C=1021,w=1022,T=1023,E=1026,D=1027,O=1028,k=1029,A=1030,j=1031,M=1033,N=33776,P=33777,F=33778,I=33779,ee=35840,te=35841,ne=35842,L=35843,re=36196,ie=37492,R=37496,z=37488,B=37489,ae=37490,oe=37491,se=37808,ce=37809,V=37810,le=37811,ue=37812,de=37813,fe=37814,pe=37815,me=37816,he=37817,ge=37818,_e=37819,H=37820,ve=37821,U=36492,ye=36494,be=36495,xe=36283,Se=36284,Ce=36285,we=36286,Te=2300,W=2301,Ee=2302,De=2303,G=2400,K=2401,Oe=2402,q=2500,ke=3200,Ae=`srgb`,je=`srgb-linear`,Me=`linear`,Ne=`srgb`,Pe=7680,Fe=35044,Ie=35048,Le=2e3;function Re(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function ze(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Be(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ve(){let e=Be(`canvas`);return e.style.display=`block`,e}var He={};function Ue(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function We(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function Ge(...e){e=We(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Ke(...e){e=We(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function qe(...e){let t=e.join(` `);t in He||(He[t]=!0,Ge(...e))}function Je(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ye={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},Xe=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Ze=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Qe=1234567,$e=Math.PI/180,et=180/Math.PI;function tt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Ze[e&255]+Ze[e>>8&255]+Ze[e>>16&255]+Ze[e>>24&255]+`-`+Ze[t&255]+Ze[t>>8&255]+`-`+Ze[t>>16&15|64]+Ze[t>>24&255]+`-`+Ze[n&63|128]+Ze[n>>8&255]+`-`+Ze[n>>16&255]+Ze[n>>24&255]+Ze[r&255]+Ze[r>>8&255]+Ze[r>>16&255]+Ze[r>>24&255]).toLowerCase()}function nt(e,t,n){return Math.max(t,Math.min(n,e))}function rt(e,t){return(e%t+t)%t}function it(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function at(e,t,n){return e===t?0:(n-e)/(t-e)}function ot(e,t,n){return(1-n)*e+n*t}function st(e,t,n,r){return ot(e,t,1-Math.exp(-n*r))}function ct(e,t=1){return t-Math.abs(rt(e,t*2)-t)}function lt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ut(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function dt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ft(e,t){return e+Math.random()*(t-e)}function pt(e){return e*(.5-Math.random())}function mt(e){e!==void 0&&(Qe=e);let t=Qe+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ht(e){return e*$e}function gt(e){return e*et}function _t(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function vt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function yt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function bt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:Ge(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function xt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function St(e,t){if(t.constructor===Float32Array)return e;let n=xt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Ct(e,t){if(t.constructor===Float32Array)return e;let n=xt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var wt={DEG2RAD:$e,RAD2DEG:et,generateUUID:tt,clamp:nt,euclideanModulo:rt,mapLinear:it,inverseLerp:at,lerp:ot,damp:st,pingpong:ct,smoothstep:lt,smootherstep:ut,randInt:dt,randFloat:ft,randFloatSpread:pt,seededRandom:mt,degToRad:ht,radToDeg:gt,isPowerOfTwo:_t,ceilPowerOfTwo:vt,floorPowerOfTwo:yt,setQuaternionFromProperEuler:bt,normalize:Ct,denormalize:St},J=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Tt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:Ge(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Et.copy(this).projectOnVector(e),this.sub(Et)}reflect(e){return this.sub(Et.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Et=new Y,Dt=new Tt,Ot=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return qe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(kt.makeScale(e,t)),this}rotate(e){return qe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(kt.makeRotation(-e)),this}translate(e,t){return qe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(kt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},kt=new Ot,At=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jt=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mt(){let e={enabled:!0,workingColorSpace:je,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ft(e.r),e.g=Ft(e.g),e.b=Ft(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Me:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[je]:{primaries:t,whitePoint:r,transfer:Me,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:r,transfer:Ne,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),e}var Nt=Mt();function Pt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ft(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var It,Lt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{It===void 0&&(It=Be(`canvas`)),It.width=e.width,It.height=e.height;let t=It.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=It}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Be(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Pt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Pt(t[e]/255)*255):t[e]=Pt(t[e]);return{data:t,width:e.width,height:e.height}}return Ge(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Rt=0,zt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rt++}),this.uuid=tt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Bt(r[t].image)):e.push(Bt(r[t]))}else e=Bt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Bt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Lt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ge(`Texture: Unable to serialize Texture.`),{})}var Vt=0,Ht=new Y,Ut=class e extends Xe{constructor(t=e.DEFAULT_IMAGE,r=e.DEFAULT_MAPPING,i=n,a=n,o=s,c=l,d=T,f=u,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vt++}),this.uuid=tt(),this.name=``,this.source=new zt(t),this.mipmaps=[],this.mapping=r,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=c,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ht).x}get height(){return this.source.getSize(Ht).y}get depth(){return this.source.getSize(Ht).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?Ge(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case t:e.x-=Math.floor(e.x);break;case n:e.x=e.x<0?0:1;break;case r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case t:e.y-=Math.floor(e.y);break;case n:e.y=e.y<0?0:1;break;case r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null,Ut.DEFAULT_MAPPING=300,Ut.DEFAULT_ANISOTROPY=1;var Wt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gt=class extends Xe{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:s,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Wt(0,0,e,t),this.scissorTest=!1,this.viewport=new Wt(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Ut({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:s,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new zt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Kt=class extends Gt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qt=class extends Ut{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Jt=class extends Ut{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Yt=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Xt.setFromMatrixColumn(e,0).length(),i=1/Xt.setFromMatrixColumn(e,1).length(),a=1/Xt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qt,e,$t)}lookAt(e,t,n){let r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),en.crossVectors(n,nn),en.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),en.crossVectors(n,nn)),en.normalize(),tn.crossVectors(nn,en),r[0]=en.x,r[4]=tn.x,r[8]=nn.x,r[1]=en.y,r[5]=tn.y,r[9]=nn.y,r[2]=en.z,r[6]=tn.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Xt.set(r[0],r[1],r[2]).length(),o=Xt.set(r[4],r[5],r[6]).length(),s=Xt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Zt.copy(this);let c=1/a,l=1/o,u=1/s;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=l,Zt.elements[5]*=l,Zt.elements[6]*=l,Zt.elements[8]*=u,Zt.elements[9]*=u,Zt.elements[10]*=u,t.setFromRotationMatrix(Zt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Le,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Le,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Xt=new Y,Zt=new Yt,Qt=new Y(0,0,0),$t=new Y(1,1,1),en=new Y,tn=new Y,nn=new Y,rn=new Yt,an=new Tt,on=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-nt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(nt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:Ge(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return an.setFromEuler(this),this.setFromQuaternion(an,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER=`XYZ`;var sn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},cn=0,ln=new Y,un=new Tt,dn=new Yt,fn=new Y,pn=new Y,mn=new Y,hn=new Tt,gn=new Y(1,0,0),_n=new Y(0,1,0),vn=new Y(0,0,1),yn={type:`added`},bn={type:`removed`},xn={type:`childadded`,child:null},Sn={type:`childremoved`,child:null},Cn=class e extends Xe{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cn++}),this.uuid=tt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Y,n=new on,r=new Tt,i=new Y(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Yt},normalMatrix:{value:new Ot}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return un.setFromAxisAngle(e,t),this.quaternion.multiply(un),this}rotateOnWorldAxis(e,t){return un.setFromAxisAngle(e,t),this.quaternion.premultiply(un),this}rotateX(e){return this.rotateOnAxis(gn,e)}rotateY(e){return this.rotateOnAxis(_n,e)}rotateZ(e){return this.rotateOnAxis(vn,e)}translateOnAxis(e,t){return ln.copy(e).applyQuaternion(this.quaternion),this.position.add(ln.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gn,e)}translateY(e){return this.translateOnAxis(_n,e)}translateZ(e){return this.translateOnAxis(vn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fn.copy(e):fn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),pn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(pn,fn,this.up):dn.lookAt(fn,pn,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),un.setFromRotationMatrix(dn),this.quaternion.premultiply(un.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(Ke(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null):Ke(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bn),Sn.child=e,this.dispatchEvent(Sn),Sn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pn,e,mn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pn,hn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Cn.DEFAULT_UP=new Y(0,1,0),Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=class extends Cn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Tn={type:`move`},En=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Dn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},kn={h:0,s:0,l:0};function An(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ae){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Nt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Nt.workingColorSpace){if(e=rt(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=An(i,r,e+1/3),this.g=An(i,r,e),this.b=An(i,r,e-1/3)}return Nt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ae){function n(t){t!==void 0&&parseFloat(t)<1&&Ge(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:Ge(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);Ge(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ae){let n=Dn[e.toLowerCase()];return n===void 0?Ge(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}copyLinearToSRGB(e){return this.r=Ft(e.r),this.g=Ft(e.g),this.b=Ft(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ae){return Nt.workingToColorSpace(jn.copy(this),e),Math.round(nt(jn.r*255,0,255))*65536+Math.round(nt(jn.g*255,0,255))*256+Math.round(nt(jn.b*255,0,255))}getHexString(e=Ae){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Nt.workingColorSpace){Nt.workingToColorSpace(jn.copy(this),t);let n=jn.r,r=jn.g,i=jn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Nt.workingColorSpace){return Nt.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e=Ae){Nt.workingToColorSpace(jn.copy(this),e);let t=jn.r,n=jn.g,r=jn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(kn);let n=ot(On.h,kn.h,t),r=ot(On.s,kn.s,t),i=ot(On.l,kn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new X;X.NAMES=Dn;var Mn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new X(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Nn=class extends Cn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pn=new Y,Fn=new Y,In=new Y,Ln=new Y,Rn=new Y,zn=new Y,Bn=new Y,Vn=new Y,Hn=new Y,Un=new Y,Wn=new Wt,Gn=new Wt,Kn=new Wt,qn=class e{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pn.subVectors(e,t),r.cross(Pn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Pn.subVectors(r,t),Fn.subVectors(n,t),In.subVectors(e,t);let a=Pn.dot(Pn),o=Pn.dot(Fn),s=Pn.dot(In),c=Fn.dot(Fn),l=Fn.dot(In),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ln)!==null&&Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Ln)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Ln.x),s.addScaledVector(a,Ln.y),s.addScaledVector(o,Ln.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Wn.setScalar(0),Gn.setScalar(0),Kn.setScalar(0),Wn.fromBufferAttribute(e,t),Gn.fromBufferAttribute(e,n),Kn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wn,i.x),a.addScaledVector(Gn,i.y),a.addScaledVector(Kn,i.z),a}static isFrontFacing(e,t,n,r){return Pn.subVectors(n,t),Fn.subVectors(e,t),Pn.cross(Fn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),Pn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Rn.subVectors(r,n),zn.subVectors(i,n),Vn.subVectors(e,n);let s=Rn.dot(Vn),c=zn.dot(Vn);if(s<=0&&c<=0)return t.copy(n);Hn.subVectors(e,r);let l=Rn.dot(Hn),u=zn.dot(Hn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Rn,a);Un.subVectors(e,i);let f=Rn.dot(Un),p=zn.dot(Un);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(zn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Bn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Bn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Rn,a).addScaledVector(zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jn=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Xn):Xn.fromBufferAttribute(r,t),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Zn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Zn.copy(e.boundingBox)),Zn.applyMatrix4(e.matrixWorld),this.union(Zn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),ar.subVectors(this.max,ir),Qn.subVectors(e.a,ir),$n.subVectors(e.b,ir),er.subVectors(e.c,ir),tr.subVectors($n,Qn),nr.subVectors(er,$n),rr.subVectors(Qn,er);let t=[0,-tr.z,tr.y,0,-nr.z,nr.y,0,-rr.z,rr.y,tr.z,0,-tr.x,nr.z,0,-nr.x,rr.z,0,-rr.x,-tr.y,tr.x,0,-nr.y,nr.x,0,-rr.y,rr.x,0];return!cr(t,Qn,$n,er,ar)||(t=[1,0,0,0,1,0,0,0,1],!cr(t,Qn,$n,er,ar))?!1:(or.crossVectors(tr,nr),t=[or.x,or.y,or.z],cr(t,Qn,$n,er,ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Yn=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Xn=new Y,Zn=new Jn,Qn=new Y,$n=new Y,er=new Y,tr=new Y,nr=new Y,rr=new Y,ir=new Y,ar=new Y,or=new Y,sr=new Y;function cr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){sr.fromArray(e,a);let o=i.x*Math.abs(sr.x)+i.y*Math.abs(sr.y)+i.z*Math.abs(sr.z),s=t.dot(sr),c=n.dot(sr),l=r.dot(sr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var lr=new Y,ur=new J,dr=0,fr=class extends Xe{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Fe,this.updateRanges=[],this.gpuType=g,this.version=0,this._normalizationScale=e===void 0?void 0:xt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix4(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyNormalMatrix(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.transformDirection(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?St(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Ct(e,this.array):Math.round(e*t)}},pr=class extends fr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},mr=class extends fr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},hr=class extends fr{constructor(e,t,n){super(new Float32Array(e),t,n)}},gr=new Jn,_r=new Y,vr=new Y,yr=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?gr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);let t=_r.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(_r,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(vr)),this.expandByPoint(_r.copy(e.center).sub(vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},br=0,xr=new Yt,Sr=new Cn,Cr=new Y,wr=new Jn,Tr=new Jn,Er=new Y,Dr=class e extends Xe{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:br++}),this.uuid=tt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Re(e)?mr:pr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Ot().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xr.makeRotationFromQuaternion(e),this.applyMatrix4(xr),this}rotateX(e){return xr.makeRotationX(e),this.applyMatrix4(xr),this}rotateY(e){return xr.makeRotationY(e),this.applyMatrix4(xr),this}rotateZ(e){return xr.makeRotationZ(e),this.applyMatrix4(xr),this}translate(e,t,n){return xr.makeTranslation(e,t,n),this.applyMatrix4(xr),this}scale(e,t,n){return xr.makeScale(e,t,n),this.applyMatrix4(xr),this}lookAt(e){return Sr.lookAt(e),Sr.updateMatrix(),this.applyMatrix4(Sr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new hr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&Ge(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)Ke(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Er.addVectors(this.boundingBox.min,wr.min),this.boundingBox.expandByPoint(Er),Er.addVectors(this.boundingBox.max,wr.max),this.boundingBox.expandByPoint(Er)):(this.boundingBox.expandByPoint(wr.min),this.boundingBox.expandByPoint(wr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)Ke(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Y,1/0);else if(e){let n=this.boundingSphere.center;if(wr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Tr.setFromBufferAttribute(n),this.morphTargetsRelative?(Er.addVectors(wr.min,Tr.min),wr.expandByPoint(Er),Er.addVectors(wr.max,Tr.max),wr.expandByPoint(Er)):(wr.expandByPoint(Tr.min),wr.expandByPoint(Tr.max))}wr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Er.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Er));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Er.fromBufferAttribute(a,t),o&&(Cr.fromBufferAttribute(e,t),Er.add(Cr)),r=Math.max(r,n.distanceToSquared(Er))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ke(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new fr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new Y,s[e]=new Y;let l=new Y,u=new Y,d=new Y,f=new J,p=new J,m=new J,h=new Y,g=new Y;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new Y,b=new Y,x=new Y,S=new Y;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new fr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Y,i=new Y,a=new Y,o=new Y,s=new Y,c=new Y,l=new Y,u=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Er.fromBufferAttribute(e,t),Er.normalize(),e.setXYZ(t,Er.x,Er.y,Er.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new fr(a,r,i)}if(this.index===null)return Ge(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Or=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Fe,this.updateRanges=[],this.version=0,this.uuid=tt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=kr(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=kr(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function kr(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=tt()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var Ar=new Y,jr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:xt(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ar.fromBufferAttribute(this,t),Ar.applyMatrix4(e),this.setXYZ(t,Ar.x,Ar.y,Ar.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ar.fromBufferAttribute(this,t),Ar.applyNormalMatrix(e),this.setXYZ(t,Ar.x,Ar.y,Ar.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ar.fromBufferAttribute(this,t),Ar.transformDirection(e),this.setXYZ(t,Ar.x,Ar.y,Ar.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Ue(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new fr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ue(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?St(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Ct(e,this.data.array):Math.round(e*t)}},Mr=new Y,Nr=new Y,Pr=new Ot,Fr=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Mr.subVectors(n,t).cross(Nr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Mr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pr.getNormalMatrix(e),r=this.coplanarPoint(Mr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ir=0,Lr=class extends Xe{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ir++}),this.uuid=tt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pe,this.stencilZFail=Pe,this.stencilZPass=Pe,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?Ge(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new X().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Fr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new J().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Rr=new Y,zr=new Y,Br=new Y,Vr=new Y,Hr=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Rr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Rr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Rr.copy(this.origin).addScaledVector(this.direction,t),Rr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){zr.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),Vr.copy(this.origin).sub(zr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Br),o=Vr.dot(this.direction),s=-Vr.dot(Br),c=Vr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(zr).addScaledVector(Br,d),f}intersectSphere(e,t){if(e.radius<0)return null;Rr.subVectors(e.center,this.origin);let n=Rr.dot(this.direction),r=Rr.dot(Rr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Rr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,te=E-F*D,ne=O-P*A,L=k-F*A,re=j-P*N,ie=M-F*N,R=re*L-ie*ne,z=ee*ie-te*re,B=ne*te-L*ee;if(r){if(R<0||z<0||B<0)return null}else if((R<0||z<0||B<0)&&(R>0||z>0||B>0))return null;let ae=R+z+B;if(ae===0)return null;let oe=I*(R*D+z*A+B*N);return(ae>0?oe<0:oe>0)?null:this.at(oe/ae,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ur=class extends Lr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wr=new Yt,Gr=new Hr,Kr=new yr,qr=new Y,Jr=new Y,Yr=new Y,Xr=new Y,Zr=new Y,Qr=new Y,$r=new Y,ei=new Y,Z=class extends Cn{constructor(e=new Dr,t=new Ur){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Qr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Zr.fromBufferAttribute(s,e),a?Qr.addScaledVector(Zr,r):Qr.addScaledVector(Zr.sub(t),r))}t.add(Qr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(i),Gr.copy(e.ray).recast(e.near),Kr.containsPoint(Gr.origin)===!1&&(Gr.intersectSphere(Kr,qr)===null||Gr.origin.distanceToSquared(qr)>(e.far-e.near)**2)||(Wr.copy(i).invert(),Gr.copy(e.ray).applyMatrix4(Wr),(n.boundingBox===null||Gr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Gr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ni(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ni(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ni(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ni(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ti(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ei.copy(s),ei.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ei);return l<n.near||l>n.far?null:{distance:l,point:ei.clone(),object:e}}function ni(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Jr),e.getVertexPosition(c,Yr),e.getVertexPosition(l,Xr);let u=ti(e,t,n,r,Jr,Yr,Xr,$r);if(u){let e=new Y;qn.getBarycoord($r,Jr,Yr,Xr,e),i&&(u.uv=qn.getInterpolatedAttribute(i,s,c,l,e,new J)),a&&(u.uv1=qn.getInterpolatedAttribute(a,s,c,l,e,new J)),o&&(u.normal=qn.getInterpolatedAttribute(o,s,c,l,e,new Y),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Y,materialIndex:0};qn.getNormal(Jr,Yr,Xr,t.normal),u.face=t,u.barycoord=e}return u}var ri=new Wt,ii=new Wt,ai=new Wt,oi=new Wt,si=new Yt,ci=new Y,li=new yr,ui=new Yt,di=new Hr,fi=class extends Z{constructor(t,n){super(t,n),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=e,this.bindMatrix=new Yt,this.bindMatrixInverse=new Yt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jn),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ci),this.boundingBox.expandByPoint(ci)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yr),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ci),this.boundingSphere.expandByPoint(ci)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),li.copy(this.boundingSphere),li.applyMatrix4(r),e.ray.intersectsSphere(li)!==!1&&(ui.copy(r).invert(),di.copy(e.ray).applyMatrix4(ui),(this.boundingBox===null||di.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,di)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Wt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ge(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;ii.fromBufferAttribute(r.attributes.skinIndex,e),ai.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(ri.copy(t),t.set(0,0,0,0)):(ri.set(t.x,t.y,t.z,1),t.set(0,0,0)),ri.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=ai.getComponent(e);if(r!==0){let i=ii.getComponent(e);si.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(oi.copy(ri).applyMatrix4(si),r)}}return t.isVector4&&(t.w=ri.w),t.applyMatrix4(this.bindMatrixInverse)}},pi=class extends Cn{constructor(){super(),this.isBone=!0,this.type=`Bone`}},mi=class extends Ut{constructor(e=null,t=1,n=1,r,a,o,s,c,l=i,u=i,d,f){super(null,o,s,c,l,u,r,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hi=new Yt,gi=new Yt,_i=class e{constructor(e=[],t=[]){this.uuid=tt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ge(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new Yt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new Yt;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:gi;hi.multiplyMatrices(i,t[r]),hi.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new mi(t,e,e,T,g);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(Ge(`Skeleton: No bone found with UUID:`,r),i=new pi),this.bones.push(i),this.boneInverses.push(new Yt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},vi=class extends fr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},yi=new Yt,bi=new Yt,xi=[],Si=new Jn,Ci=new Yt,wi=new Z,Ti=new yr,Ei=class extends Z{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ci)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yi),Si.copy(e.boundingBox).applyMatrix4(yi),this.boundingBox.union(Si)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yi),Ti.copy(e.boundingSphere).applyMatrix4(yi),this.boundingSphere.union(Ti)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(wi.geometry=this.geometry,wi.material=this.material,wi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ti.copy(this.boundingSphere),Ti.applyMatrix4(n),e.ray.intersectsSphere(Ti)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,yi),bi.multiplyMatrices(n,yi),wi.matrixWorld=bi,wi.raycast(e,xi);for(let e=0,n=xi.length;e<n;e++){let n=xi[e];n.instanceId=i,n.object=this,t.push(n)}xi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new vi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new mi(new Float32Array(r*this.count),r,this.count,O,g));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Di=new yr,Oi=new J(.5,.5),ki=new Y,Ai=class{constructor(e=new Fr,t=new Fr,n=new Fr,r=new Fr,i=new Fr,a=new Fr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Le,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476+Oi.distanceTo(e.center),Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ki.x=r.normal.x>0?e.max.x:e.min.x,ki.y=r.normal.y>0?e.max.y:e.min.y,ki.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ki)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ji=new Yt,Mi=class e{constructor(){this.coordinateSystem=Le,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];ji.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Ai),n[e].setFromProjectionMatrix(ji,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Ai),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Ni=class extends Lr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Pi=new Y,Fi=new Y,Ii=new Yt,Li=new Hr,Ri=new yr,zi=new Y,Bi=new Y,Vi=class extends Cn{constructor(e=new Dr,t=new Ni){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Pi.fromBufferAttribute(t,e-1),Fi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Pi.distanceTo(Fi);e.setAttribute(`lineDistance`,new hr(n,1))}else Ge(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ri.copy(n.boundingSphere),Ri.applyMatrix4(r),Ri.radius+=i,e.ray.intersectsSphere(Ri)===!1)return;Ii.copy(r).invert(),Li.copy(e.ray).applyMatrix4(Ii);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Hi(this,e,Li,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Hi(this,e,Li,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Hi(this,e,Li,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Hi(this,e,Li,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Hi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Pi.fromBufferAttribute(s,i),Fi.fromBufferAttribute(s,a),n.distanceSqToSegment(Pi,Fi,zi,Bi)>r)return;zi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(zi);if(!(c<t.near||c>t.far))return{distance:c,point:Bi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Ui=new Y,Wi=new Y,Gi=class extends Vi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Ui.fromBufferAttribute(t,e),Wi.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Ui.distanceTo(Wi);e.setAttribute(`lineDistance`,new hr(n,1))}else Ge(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Ki=class extends Vi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},qi=class extends Lr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ji=new Yt,Yi=new Hr,Xi=new yr,Zi=new Y,Qi=class extends Cn{constructor(e=new Dr,t=new qi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xi.copy(n.boundingSphere),Xi.applyMatrix4(r),Xi.radius+=i,e.ray.intersectsSphere(Xi)===!1)return;Ji.copy(r).invert(),Yi.copy(e.ray).applyMatrix4(Ji);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Zi.fromBufferAttribute(l,n),$i(Zi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Zi.fromBufferAttribute(l,a),$i(Zi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function $i(e,t,n,r,i,a,o){let s=Yi.distanceSqToPoint(e);if(s<n){let n=new Y;Yi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ea=class extends Ut{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ta=class extends Ut{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},na=class extends Ut{constructor(e,t,n=h,r,a,o,s=i,c=i,l,u=E,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ra=class extends na{constructor(e,t=h,n=301,r,a,o=i,s=i,c,l=E){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ia=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},aa=class e extends Dr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new hr(c,3)),this.setAttribute(`normal`,new hr(l,3)),this.setAttribute(`uv`,new hr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Y;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},oa=class e extends Dr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new Y,l=new J;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new hr(a,3)),this.setAttribute(`normal`,new hr(o,3)),this.setAttribute(`uv`,new hr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},sa=class e extends Dr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new hr(u,3)),this.setAttribute(`normal`,new hr(d,3)),this.setAttribute(`uv`,new hr(f,2));function _(){let a=new Y,_=new Y,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new J,m=new Y,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ca=class e extends sa{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},la=class e extends Dr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new hr(i,3)),this.setAttribute(`normal`,new hr(i.slice(),3)),this.setAttribute(`uv`,new hr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new Y,r=new Y,i=new Y;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new Y;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new Y;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new Y,t=new Y,n=new Y,r=new Y,o=new J,s=new J,c=new J;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ua=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new J:new Y);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new Y,r=[],i=[],a=[],o=new Y,s=new Yt;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new Y)}i[0]=new Y,a[0]=new Y;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(nt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(nt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},da=class extends ua{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new J){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},fa=class extends da{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function pa(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ma=new Y,ha=new Y,ga=new pa,_a=new pa,va=new pa,ya=class extends ua{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new Y){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(ha.subVectors(r[0],r[1]).add(r[0]),c=ha);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ma.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ma),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ga.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),_a.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),va.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ga.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),_a.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),va.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ga.calc(s),_a.calc(s),va.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new Y().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ba(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function xa(e,t){let n=1-e;return n*n*t}function Sa(e,t){return 2*(1-e)*e*t}function Ca(e,t){return e*e*t}function wa(e,t,n,r){return xa(e,t)+Sa(e,n)+Ca(e,r)}function Ta(e,t){let n=1-e;return n*n*n*t}function Ea(e,t){let n=1-e;return 3*n*n*e*t}function Da(e,t){return 3*(1-e)*e*e*t}function Oa(e,t){return e*e*e*t}function ka(e,t,n,r,i){return Ta(e,t)+Ea(e,n)+Da(e,r)+Oa(e,i)}var Aa=class extends ua{constructor(e=new J,t=new J,n=new J,r=new J){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new J){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ka(e,r.x,i.x,a.x,o.x),ka(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ja=class extends ua{constructor(e=new Y,t=new Y,n=new Y,r=new Y){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ka(e,r.x,i.x,a.x,o.x),ka(e,r.y,i.y,a.y,o.y),ka(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ma=class extends ua{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new J){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Na=class extends ua{constructor(e=new Y,t=new Y){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new Y){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Y){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Pa=class extends ua{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(wa(e,r.x,i.x,a.x),wa(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fa=class extends ua{constructor(e=new Y,t=new Y,n=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(wa(e,r.x,i.x,a.x),wa(e,r.y,i.y,a.y),wa(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ia=class extends ua{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new J){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ba(o,s.x,c.x,l.x,u.x),ba(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new J().fromArray(n))}return this}},La=Object.freeze({__proto__:null,ArcCurve:fa,CatmullRomCurve3:ya,CubicBezierCurve:Aa,CubicBezierCurve3:ja,EllipseCurve:da,LineCurve:Ma,LineCurve3:Na,QuadraticBezierCurve:Pa,QuadraticBezierCurve3:Fa,SplineCurve:Ia}),Ra=class extends ua{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new La[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new La[n.type]().fromJSON(n))}return this.cacheLengths=null,this}},za=class extends Ra{constructor(e){super(),this.type=`Path`,this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ma(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Pa(this.currentPoint.clone(),new J(e,t),new J(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Aa(this.currentPoint.clone(),new J(e,t),new J(n,r),new J(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Ia([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new da(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ba=class extends za{constructor(e){super(e),this.uuid=tt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new za().fromJSON(n))}return this}};function Va(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Ha(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Ya(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Wa(a,o,n,s,c,l,0),o}function Ha(e,t,n,r,i){let a;if(i===bo(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=_o(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=_o(i/r|0,e[i],e[i+1],a);return a&&co(a,a.next)&&(vo(a),a=a.next),a}function Ua(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(co(n,n.next)||so(n.prev,n,n.next)===0)){if(vo(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Wa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&eo(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ka(e,r,i,a):Ga(e))t.push(c.i,e.i,l.i),vo(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=qa(Ua(e),t),Wa(e,t,n,r,i,a,2)):o===2&&Ja(e,t,n,r,i,a):Wa(Ua(e),t,n,r,i,a,1);break}}}function Ga(e){let t=e.prev,n=e,r=e.next;if(so(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&ao(i,s,a,c,o,l,m.x,m.y)&&so(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ka(e,t,n,r){let i=e.prev,a=e,o=e.next;if(so(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=no(p,m,t,n,r),v=no(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&ao(s,u,c,d,l,f,y.x,y.y)&&so(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&ao(s,u,c,d,l,f,b.x,b.y)&&so(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&ao(s,u,c,d,l,f,y.x,y.y)&&so(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&ao(s,u,c,d,l,f,b.x,b.y)&&so(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function qa(e,t){let n=e;do{let r=n.prev,i=n.next.next;!co(r,i)&&lo(r,n,n.next,i)&&mo(r,i)&&mo(i,r)&&(t.push(r.i,n.i,i.i),vo(n),vo(n.next),n=e=i),n=n.next}while(n!==e);return Ua(n)}function Ja(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&oo(o,e)){let s=go(o,e);o=Ua(o,o.next),s=Ua(s,s.next),Wa(o,t,n,r,i,a,0),Wa(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Ya(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Ha(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(ro(o))}i.sort(Xa);for(let e=0;e<i.length;e++)n=Za(i[e],n);return n}function Xa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Za(e,t){let n=Qa(e,t);if(!n)return t;let r=go(n,e);return Ua(r,r.next),Ua(n,n.next)}function Qa(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(co(e,n))return n;do{if(co(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&io(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);mo(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&$a(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function $a(e,t){return so(e.prev,e,t.prev)<0&&so(t.next,e,e.next)<0}function eo(e,t,n,r){let i=e;do i.z===0&&(i.z=no(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,to(i)}function to(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function no(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ro(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function io(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function ao(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&io(e,t,n,r,i,a,o,s)}function oo(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!po(e,t)&&(mo(e,t)&&mo(t,e)&&ho(e,t)&&(so(e.prev,e,t.prev)||so(e,t.prev,t))||co(e,t)&&so(e.prev,e,e.next)>0&&so(t.prev,t,t.next)>0)}function so(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function co(e,t){return e.x===t.x&&e.y===t.y}function lo(e,t,n,r){let i=fo(so(e,t,n)),a=fo(so(e,t,r)),o=fo(so(n,r,e)),s=fo(so(n,r,t));return!!(i!==a&&o!==s||i===0&&uo(e,n,t)||a===0&&uo(e,r,t)||o===0&&uo(n,e,r)||s===0&&uo(n,t,r))}function uo(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function fo(e){return e>0?1:e<0?-1:0}function po(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&lo(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function mo(e,t){return so(e.prev,e,e.next)<0?so(e,t,e.next)>=0&&so(e,e.prev,t)>=0:so(e,t,e.prev)<0||so(e,e.next,t)<0}function ho(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function go(e,t){let n=yo(e.i,e.x,e.y),r=yo(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function _o(e,t,n,r){let i=yo(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function vo(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function yo(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function bo(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var xo=class{static triangulate(e,t,n=2){return Va(e,t,n)}},So=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Co(e),wo(n,e);let a=e.length;t.forEach(Co);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,wo(n,t[e]);let o=xo.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Co(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function wo(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var To=class e extends Dr{constructor(e=new Ba([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new hr(r,3)),this.setAttribute(`uv`,new hr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Eo:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new Y,b=new Y,x=new Y}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!So.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];So.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||Ke(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new J(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new J(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let F;if(p===0)F=So.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);re(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);re(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}F=So.triangulateShape(e,t)}let I=F.length,ee=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],ee):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),re(x.x,x.y,x.z)):re(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],ee):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),re(x.x,x.y,x.z)):re(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);re(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?re(i.x,i.y+g[s-1].y,g[s-1].x+n):re(i.x,i.y,c+n)}}}te(),ne();function te(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<I;e++){let n=F[e];ie(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<I;e++){let n=F[e];ie(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<I;e++){let t=F[e];ie(t[2],t[1],t[0])}for(let e=0;e<I;e++){let t=F[e];ie(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ne(){let e=r.length/3,t=0;L(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];L(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function L(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);R(t+r+n,t+i+n,t+i+a,t+r+a)}}}function re(e,t,n){a.push(e),a.push(t),a.push(n)}function ie(e,t,i){z(e),z(t),z(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);B(o[0]),B(o[1]),B(o[2])}function R(e,t,i,a){z(e),z(t),z(a),z(t),z(i),z(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);B(s[0]),B(s[1]),B(s[3]),B(s[1]),B(s[2]),B(s[3])}function z(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function B(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Do(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new La[i.type]().fromJSON(i)),new e(r,t.options)}},Eo={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new J(a,o),new J(s,c),new J(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new J(o,1-c),new J(l,1-d),new J(f,1-m),new J(h,1-_)]:[new J(s,1-c),new J(u,1-d),new J(p,1-m),new J(g,1-_)]}};function Do(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Oo=class e extends la{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ko=class e extends Dr{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=nt(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new Y,d=new J,f=new Y,p=new Y,m=new Y,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new hr(a,3)),this.setAttribute(`uv`,new hr(o,2)),this.setAttribute(`normal`,new hr(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Ao=class e extends la{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},jo=class e extends Dr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new hr(p,3)),this.setAttribute(`normal`,new hr(m,3)),this.setAttribute(`uv`,new hr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Mo=class e extends Dr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new Y,p=new J;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new hr(s,3)),this.setAttribute(`normal`,new hr(c,3)),this.setAttribute(`uv`,new hr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},No=class e extends Dr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new Y,d=new Y,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new hr(p,3)),this.setAttribute(`normal`,new hr(m,3)),this.setAttribute(`uv`,new hr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Po=class e extends Dr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new Y,f=new Y,p=new Y;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new hr(c,3)),this.setAttribute(`normal`,new hr(l,3)),this.setAttribute(`uv`,new hr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Fo=class e extends Dr{constructor(e=new Fa(new Y(-1,-1,0),new Y(-1,1,0),new Y(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new Y,s=new Y,c=new J,l=new Y,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new hr(u,3)),this.setAttribute(`normal`,new hr(d,3)),this.setAttribute(`uv`,new hr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new La[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Io(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ro(i))i.isRenderTargetTexture?(Ge(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ro(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Lo(e){let t={};for(let n=0;n<e.length;n++){let r=Io(e[n]);for(let e in r)t[e]=r[e]}return t}function Ro(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function zo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Bo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Nt.workingColorSpace}var Vo={clone:Io,merge:Lo},Ho=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wo=class extends Lr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ho,this.fragmentShader=Uo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Io(e.uniforms),this.uniformsGroups=zo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new X().setHex(r.value);break;case`v2`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Wt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Ot().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Yt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Go=class extends Wo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ko=class extends Lr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},qo=class extends Ko{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new X(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new X(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new X(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return qe(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){qe(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Jo=class extends Lr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ke,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Yo=class extends Lr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Xo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Zo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function Qo(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function $o(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function es(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var ts=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ns=class extends ts{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:G,endingEnd:G}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case K:i=e,o=2*t-n;break;case Oe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case K:a=e,s=2*n-t;break;case Oe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},rs=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},is=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},as=class extends ts{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=cs(n,t,g,y,r);i[p]=os(x,o,_,b,m)}return i}};function os(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ss(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function cs(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=os(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ss(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var ls=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Xo(t,this.TimeBufferType),this.values=Xo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xo(e.times,Array),values:Xo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Zo(e.settings)&&(n.settings={inTangents:Xo(e.settings.inTangents,Array),outTangents:Xo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new is(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ns(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new as(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Te:t=this.InterpolantFactoryMethodDiscrete;break;case W:t=this.InterpolantFactoryMethodLinear;break;case Ee:t=this.InterpolantFactoryMethodSmooth;break;case De:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return Ge(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Te;case this.InterpolantFactoryMethodLinear:return W;case this.InterpolantFactoryMethodSmooth:return Ee;case this.InterpolantFactoryMethodBezier:return De}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Zo(this.settings)&&(us(this.settings.inTangents,e),us(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Zo(this.settings)&&(ds(this.settings.inTangents,e),ds(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(Ke(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){Ke(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){Ke(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&ze(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){Ke(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ee,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Zo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function us(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function ds(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}ls.prototype.ValueTypeName=``,ls.prototype.TimeBufferType=Float32Array,ls.prototype.ValueBufferType=Float32Array,ls.prototype.DefaultInterpolation=W;var fs=class extends ls{constructor(e,t,n){super(e,t,n)}};fs.prototype.ValueTypeName=`bool`,fs.prototype.ValueBufferType=Array,fs.prototype.DefaultInterpolation=Te,fs.prototype.InterpolantFactoryMethodLinear=void 0,fs.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}};ps.prototype.ValueTypeName=`color`;var ms=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}};ms.prototype.ValueTypeName=`number`;var hs=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Tt.slerpFlat(i,0,a,c-o,a,c,s);return i}},gs=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new hs(this.times,this.values,this.getValueSize(),e)}};gs.prototype.ValueTypeName=`quaternion`,gs.prototype.InterpolantFactoryMethodSmooth=void 0;var _s=class extends ls{constructor(e,t,n){super(e,t,n)}};_s.prototype.ValueTypeName=`string`,_s.prototype.ValueBufferType=Array,_s.prototype.DefaultInterpolation=Te,_s.prototype.InterpolantFactoryMethodLinear=void 0,_s.prototype.InterpolantFactoryMethodSmooth=void 0;var vs=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}};vs.prototype.ValueTypeName=`vector`;var ys=class{constructor(e=``,t=-1,n=[],r=q){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=tt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(xs(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(ls.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=Qo(o);o=$o(o,1,c),s=$o(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new ms(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function bs(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return ms;case`vector`:case`vector2`:case`vector3`:case`vector4`:return vs;case`color`:return ps;case`quaternion`:return gs;case`bool`:case`boolean`:return fs;case`string`:return _s}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function xs(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=bs(e.type);if(e.times===void 0){let t=[],n=[];es(e.keys,t,n,`value`),e.times=t,e.values=n}let n;return n=t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e),Zo(e.settings)&&(n.settings={inTangents:Xo(e.settings.inTangents,Float32Array),outTangents:Xo(e.settings.outTangents,Float32Array)}),n}var Ss={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Cs(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Cs(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Cs(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var ws=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ts=class{constructor(e){this.manager=e===void 0?ws:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Ts.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Es={},Ds=class extends Error{constructor(e,t){super(e),this.response=t}},Os=class extends Ts{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=Ss.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(Es[e]!==void 0){Es[e].push({onLoad:t,onProgress:n,onError:r});return}Es[e]=[],Es[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&Ge(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Es[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new Ds(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{Ss.add(`file:${e}`,t);let n=Es[e];delete Es[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Es[e];if(n===void 0)throw this.manager.itemError(e),t;delete Es[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},ks=new WeakMap,As=class extends Ts{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Ss.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=ks.get(a);e===void 0&&(e=[],ks.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Be(`img`);function s(){l(),t&&t(this);let n=ks.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}ks.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Ss.remove(`image:${e}`);let n=ks.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}ks.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ss.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},js=class extends Ts{constructor(e){super(e)}load(e,t,n,r){let i=new Ut,a=new As(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Ms=class extends Cn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new X(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ns=class extends Ms{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ps=new Yt,Fs=new Y,Is=new Y,Ls=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=u,this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ai,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new Wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Fs.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fs),Is.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Is),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ps.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ps,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ps)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Rs=new Y,zs=new Tt,Bs=new Y,Vs=class extends Cn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=Le,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Rs,zs,Bs),Bs.x===1&&Bs.y===1&&Bs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rs,zs,Bs.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Rs,zs,Bs),Bs.x===1&&Bs.y===1&&Bs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rs,zs,Bs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hs=new Y,Us=new J,Ws=new J,Gs=class extends Vs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=et*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($e*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return et*2*Math.atan(Math.tan($e*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hs.x,Hs.y).multiplyScalar(-e/Hs.z),Hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hs.x,Hs.y).multiplyScalar(-e/Hs.z)}getViewSize(e,t){return this.getViewBounds(e,Us,Ws),t.subVectors(Ws,Us)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($e*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ks=class extends Ls{constructor(){super(new Gs(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=et*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},qs=class extends Ms{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Ks}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Js=class extends Ls{constructor(){super(new Gs(90,1,.5,500)),this.isPointLightShadow=!0}},Ys=class extends Ms{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Js}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Xs=class extends Vs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zs=class extends Ls{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qs=class extends Ms{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new Zs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},$s=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ec=new WeakMap,tc=class extends Ts{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&Ge(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&Ge(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Ss.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{ec.has(a)===!0?(r&&r(ec.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!==`anonymous`?`include`:`same-origin`,o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign({},i.options,{colorSpaceConversion:`none`}))}).then(function(n){return Ss.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e),n}).catch(function(t){r&&r(t),ec.set(s,t),Ss.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});Ss.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},nc=-90,rc=1,ic=class extends Cn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Gs(nc,rc,e,t);r.layers=this.layers,this.add(r);let i=new Gs(nc,rc,e,t);i.layers=this.layers,this.add(i);let a=new Gs(nc,rc,e,t);a.layers=this.layers,this.add(a);let o=new Gs(nc,rc,e,t);o.layers=this.layers,this.add(o);let s=new Gs(nc,rc,e,t);s.layers=this.layers,this.add(s);let c=new Gs(nc,rc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ac=class extends Gs{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},oc=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=sc.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function sc(){this._document.hidden===!1&&this.reset()}var cc=`\\[\\]\\.:\\/`,lc=RegExp(`[\\[\\]\\.:\\/]`,`g`),uc=`[^\\[\\]\\.:\\/]`,dc=`[^`+cc.replace(`\\.`,``)+`]`,fc=`((?:WC+[\\/:])*)`.replace(`WC`,uc),pc=`(WCOD+)?`.replace(`WCOD`,dc),mc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,uc),hc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,uc),gc=RegExp(`^`+fc+pc+mc+hc+`$`),_c=[`material`,`materials`,`bones`,`map`],vc=class{constructor(e,t,n){let r=n||yc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(lc,``)}static parseTrackName(e){let t=gc.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);_c.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ge(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){Ke(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){Ke(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){Ke(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){Ke(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){Ke(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){Ke(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){Ke(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;Ke(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){Ke(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){Ke(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yc.Composite=vc,yc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},yc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},yc.prototype.GetterByBindingType=[yc.prototype._getValue_direct,yc.prototype._getValue_array,yc.prototype._getValue_arrayElement,yc.prototype._getValue_toArray],yc.prototype.SetterByBindingTypeAndVersioning=[[yc.prototype._setValue_direct,yc.prototype._setValue_direct_setNeedsUpdate,yc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yc.prototype._setValue_array,yc.prototype._setValue_array_setNeedsUpdate,yc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yc.prototype._setValue_arrayElement,yc.prototype._setValue_arrayElement_setNeedsUpdate,yc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yc.prototype._setValue_fromArray,yc.prototype._setValue_fromArray_setNeedsUpdate,yc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var bc=new Yt,xc=class{constructor(e,t,n=0,r=1/0){this.ray=new Hr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new sn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ke(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return bc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bc),this}intersectObject(e,t=!0,n=[]){return Cc(e,this,n,t),n.sort(Sc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Cc(e[r],this,n,t);return n.sort(Sc),n}};function Sc(e,t){return e.distance-t.distance}function Cc(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Cc(r[e],t,n,!0)}}var wc=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ge(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Tc(e,t,n,r){let i=Ec(r);switch(n){case C:return e*t;case O:return e*t/i.components*i.byteLength;case k:return e*t/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case j:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case M:return e*t*4/i.components*i.byteLength;case N:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case F:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case te:case L:return Math.max(e,16)*Math.max(t,8)/4;case ee:case ne:return Math.max(e,8)*Math.max(t,8)/2;case re:case ie:case z:case B:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case R:case ae:case oe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ce:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case V:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case le:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ue:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case de:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case fe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case pe:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case me:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case H:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ve:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case U:case ye:case be:return Math.ceil(e/4)*Math.ceil(t/4)*16;case xe:case Se:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ce:case we:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ec(e){switch(e){case u:case d:return{byteLength:1,components:1};case p:case f:case _:return{byteLength:2,components:1};case v:case y:return{byteLength:2,components:4};case h:case m:case g:return{byteLength:4,components:1};case x:case S:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?Ge(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Dc(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Oc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var kc={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Ac={basic:{uniforms:Lo([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:kc.meshbasic_vert,fragmentShader:kc.meshbasic_frag},lambert:{uniforms:Lo([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new X(0)},envMapIntensity:{value:1}}]),vertexShader:kc.meshlambert_vert,fragmentShader:kc.meshlambert_frag},phong:{uniforms:Lo([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kc.meshphong_vert,fragmentShader:kc.meshphong_frag},standard:{uniforms:Lo([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kc.meshphysical_vert,fragmentShader:kc.meshphysical_frag},toon:{uniforms:Lo([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new X(0)}}]),vertexShader:kc.meshtoon_vert,fragmentShader:kc.meshtoon_frag},matcap:{uniforms:Lo([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:kc.meshmatcap_vert,fragmentShader:kc.meshmatcap_frag},points:{uniforms:Lo([Q.points,Q.fog]),vertexShader:kc.points_vert,fragmentShader:kc.points_frag},dashed:{uniforms:Lo([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kc.linedashed_vert,fragmentShader:kc.linedashed_frag},depth:{uniforms:Lo([Q.common,Q.displacementmap]),vertexShader:kc.depth_vert,fragmentShader:kc.depth_frag},normal:{uniforms:Lo([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:kc.meshnormal_vert,fragmentShader:kc.meshnormal_frag},sprite:{uniforms:Lo([Q.sprite,Q.fog]),vertexShader:kc.sprite_vert,fragmentShader:kc.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kc.background_vert,fragmentShader:kc.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:kc.backgroundCube_vert,fragmentShader:kc.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kc.cube_vert,fragmentShader:kc.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kc.equirect_vert,fragmentShader:kc.equirect_frag},distance:{uniforms:Lo([Q.common,Q.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kc.distance_vert,fragmentShader:kc.distance_frag},shadow:{uniforms:Lo([Q.lights,Q.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:kc.shadow_vert,fragmentShader:kc.shadow_frag}};Ac.physical={uniforms:Lo([Ac.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:kc.meshphysical_vert,fragmentShader:kc.meshphysical_frag};var jc={r:0,b:0,g:0},Mc=new Yt,Nc=new Ot;Nc.set(-1,0,0,0,1,0,0,0,1);function Pc(e,t,n,r,i,a){let o=new X(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Z(new aa(1,1,1),new Wo({name:`BackgroundCubeMaterial`,uniforms:Io(Ac.backgroundCube.uniforms),vertexShader:Ac.backgroundCube.vertexShader,fragmentShader:Ac.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Mc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Nc),l.material.toneMapped=Nt.getTransfer(i.colorSpace)!==Ne,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Z(new jo(2,2),new Wo({name:`BackgroundMaterial`,uniforms:Io(Ac.background.uniforms),vertexShader:Ac.background.vertexShader,fragmentShader:Ac.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Nt.getTransfer(i.colorSpace)!==Ne,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(jc,Bo(e)),n.buffers.color.setClear(jc.r,jc.g,jc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Fc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ic(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Lc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(Ge(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&Ge(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&Ge(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Rc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Fr,s=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var zc=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ea(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new aa(5,5,5),i=new Wo({name:`CubemapFromEquirect`,uniforms:Io(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Z(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=s),new ic(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Bc=256,Vc=3,Hc=20,Uc=256,Wc=16,Gc=3,Kc=new Y,qc=new X,Jc=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ic(1,10,null),this._boxMesh=new Z(new aa(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Kc}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(qc));let h=new ic(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=el(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Bc,yt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Bc:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Yc(e,!1,!1),n=Math.log2(e)-Vc;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Yc(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=el()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Zc(),this._integrationMaterial=Qc());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Wc);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Gc)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Uc*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=$c());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Yc(e,t,n){return new zc(e,{minFilter:l,generateMipmaps:t,type:_,colorSpace:je,depthBuffer:n})}function Xc(e,t,n){return new Wo({name:e,uniforms:t,vertexShader:kc.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Zc(){return Xc(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Uc}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qc(){return Xc(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Wc}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $c(){return Xc(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Hc}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function el(){return Xc(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tl(){return Xc(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function nl(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new zc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Jc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Jc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function rl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&qe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function il(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?mr:pr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function al(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ol(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:Ke(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function sl(e,t,n){let r=new WeakMap,i=new Wt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),_=new qt(h,p,m,u);_.type=g,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new J(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function cl(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ll={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ul(e,t,n,r,i,a){let o=new Kt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Dr;u.setAttribute(`position`,new hr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new hr([0,2,0,0,2,0],2));let d=new Go({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Z(u,d),p=new Xs(-1,1,1,-1,0,1),m=null,h=null,g=!1,v,y=null,x=[],S=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<x.length;n++){let r=x[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){x=e,S=x.length>0&&x[0].isRenderPass===!0;let t=o.width,n=o.height;x.length>0&&s===null&&(s=new Kt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}),c=new Kt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&x.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new na(t,n),a===!0&&(l.format=D,l.type=b)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<x.length;e++){let i=x[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&x.length===0)return!1;if(y=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return S===!1&&e.setRenderTarget(o),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return S},this.end=function(e,t){e.toneMapping=v,g=!0;let n=o,r=s;for(let i=0;i<x.length;i++){let a=x[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Nt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=ll[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(y),e.render(f,p),y=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var dl=new Ut,fl=new na(1,1),pl=new ra(1),ml=new qt,hl=new Jt,gl=new ea,_l=[],vl=[],yl=new Float32Array(16),bl=new Float32Array(9),xl=new Float32Array(4);function Sl(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=_l[i];if(a===void 0&&(a=new Float32Array(i),_l[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Cl(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function wl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Tl(e,t){let n=vl[t];n===void 0&&(n=new Int32Array(t),vl[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function El(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Dl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cl(n,t))return;e.uniform2fv(this.addr,t),wl(n,t)}}function Ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Cl(n,t))return;e.uniform3fv(this.addr,t),wl(n,t)}}function kl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cl(n,t))return;e.uniform4fv(this.addr,t),wl(n,t)}}function Al(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cl(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),wl(n,t)}else{if(Cl(n,r))return;xl.set(r),e.uniformMatrix2fv(this.addr,!1,xl),wl(n,r)}}function jl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cl(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),wl(n,t)}else{if(Cl(n,r))return;bl.set(r),e.uniformMatrix3fv(this.addr,!1,bl),wl(n,r)}}function Ml(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cl(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),wl(n,t)}else{if(Cl(n,r))return;yl.set(r),e.uniformMatrix4fv(this.addr,!1,yl),wl(n,r)}}function Nl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cl(n,t))return;e.uniform2iv(this.addr,t),wl(n,t)}}function Fl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Cl(n,t))return;e.uniform3iv(this.addr,t),wl(n,t)}}function Il(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cl(n,t))return;e.uniform4iv(this.addr,t),wl(n,t)}}function Ll(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Rl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cl(n,t))return;e.uniform2uiv(this.addr,t),wl(n,t)}}function zl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Cl(n,t))return;e.uniform3uiv(this.addr,t),wl(n,t)}}function Bl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cl(n,t))return;e.uniform4uiv(this.addr,t),wl(n,t)}}function Vl(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Hl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Vl(fl):dl,n.setTexture2D(t||a,i)}function Ul(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||hl,i)}function Wl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Vl(pl):gl,n.setTextureCube(t||a,i)}function Gl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ml,i)}function Kl(e){switch(e){case 5126:return El;case 35664:return Dl;case 35665:return Ol;case 35666:return kl;case 35674:return Al;case 35675:return jl;case 35676:return Ml;case 5124:case 35670:return Nl;case 35667:case 35671:return Pl;case 35668:case 35672:return Fl;case 35669:case 35673:return Il;case 5125:return Ll;case 36294:return Rl;case 36295:return zl;case 36296:return Bl;case 35678:case 36198:case 36298:case 36306:case 35682:return Hl;case 35679:case 36299:case 36307:return Ul;case 35680:case 36300:case 36308:case 36293:return Wl;case 36289:case 36303:case 36311:case 36292:return Gl}}function ql(e,t){e.uniform1fv(this.addr,t)}function Jl(e,t){let n=Sl(t,this.size,2);e.uniform2fv(this.addr,n)}function Yl(e,t){let n=Sl(t,this.size,3);e.uniform3fv(this.addr,n)}function Xl(e,t){let n=Sl(t,this.size,4);e.uniform4fv(this.addr,n)}function Zl(e,t){let n=Sl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ql(e,t){let n=Sl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $l(e,t){let n=Sl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function eu(e,t){e.uniform1iv(this.addr,t)}function tu(e,t){e.uniform2iv(this.addr,t)}function nu(e,t){e.uniform3iv(this.addr,t)}function ru(e,t){e.uniform4iv(this.addr,t)}function iu(e,t){e.uniform1uiv(this.addr,t)}function au(e,t){e.uniform2uiv(this.addr,t)}function ou(e,t){e.uniform3uiv(this.addr,t)}function su(e,t){e.uniform4uiv(this.addr,t)}function cu(e,t,n){let r=this.cache,i=t.length,a=Tl(n,i);Cl(r,a)||(e.uniform1iv(this.addr,a),wl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Vl(fl):dl;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function lu(e,t,n){let r=this.cache,i=t.length,a=Tl(n,i);Cl(r,a)||(e.uniform1iv(this.addr,a),wl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||hl,a[e])}function uu(e,t,n){let r=this.cache,i=t.length,a=Tl(n,i);Cl(r,a)||(e.uniform1iv(this.addr,a),wl(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Vl(pl):gl;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function du(e,t,n){let r=this.cache,i=t.length,a=Tl(n,i);Cl(r,a)||(e.uniform1iv(this.addr,a),wl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ml,a[e])}function fu(e){switch(e){case 5126:return ql;case 35664:return Jl;case 35665:return Yl;case 35666:return Xl;case 35674:return Zl;case 35675:return Ql;case 35676:return $l;case 5124:case 35670:return eu;case 35667:case 35671:return tu;case 35668:case 35672:return nu;case 35669:case 35673:return ru;case 5125:return iu;case 36294:return au;case 36295:return ou;case 36296:return su;case 35678:case 36198:case 36298:case 36306:case 35682:return cu;case 35679:case 36299:case 36307:return lu;case 35680:case 36300:case 36308:case 36293:return uu;case 36289:case 36303:case 36311:case 36292:return du}}var pu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kl(t.type)}},mu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fu(t.type)}},hu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},gu=/(\w+)(\])?(\[|\.)?/g;function _u(e,t){e.seq.push(t),e.map[t.id]=t}function vu(e,t,n){let r=e.name,i=r.length;for(gu.lastIndex=0;;){let a=gu.exec(r),o=gu.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){_u(n,l===void 0?new pu(s,e,t):new mu(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new hu(s),_u(n,e)),n=e}}}var yu=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);vu(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function bu(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var xu=37297,Su=0;function Cu(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var wu=new Ot;function Tu(e){Nt._getMatrix(wu,Nt.workingColorSpace,e);let t=`mat3( ${wu.elements.map(e=>e.toFixed(4))} )`;switch(Nt.getTransfer(e)){case Me:return[t,`LinearTransferOETF`];case Ne:return[t,`sRGBTransferOETF`];default:return Ge(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Eu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Cu(e.getShaderSource(t),r)}return i}function Du(e,t){let n=Tu(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Ou={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function ku(e,t){let n=Ou[t];return n===void 0?(Ge(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Au=new Y;function ju(){return Nt.getLuminanceCoefficients(Au),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Au.x.toFixed(4)}, ${Au.y.toFixed(4)}, ${Au.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Mu(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Fu).join(`
`)}function Nu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Pu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Fu(e){return e!==``}function Iu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Lu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ru=/^[ \t]*#include +<([\w\d./]+)>/gm;function zu(e){return e.replace(Ru,Bu)}function Bu(e,t){let n=kc[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return zu(n)}var Vu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hu(e){return e.replace(Vu,Uu)}function Uu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Wu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Gu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ku(e){return Gu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var qu={302:`ENVMAP_MODE_REFRACTION`};function Ju(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:qu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yu[e.combine]||`ENVMAP_BLENDING_NONE`}function Zu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ku(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Ju(n),d=Xu(n),f=Mu(n),p=Nu(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fu).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fu).join(`
`),g.length>0&&(g+=`
`)):(h=[Wu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Fu).join(`
`),g=[Wu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:kc.tonemapping_pars_fragment,n.toneMapping===0?``:ku(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,kc.colorspace_pars_fragment,Du(`linearToOutputTexel`,n.outputColorSpace),ju(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Fu).join(`
`)),o=zu(o),o=Iu(o,n),o=Lu(o,n),s=zu(s),s=Iu(s,n),s=Lu(s,n),o=Hu(o),s=Hu(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=bu(i,i.VERTEX_SHADER,v),x=bu(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Eu(i,b,`vertex`),n=Eu(i,x,`fragment`);Ke(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):Ge(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new yu(i,m),w=Pu(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,xu)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Su++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Qu=0,$u=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ed(e),t.set(e,n)),n}},ed=class{constructor(e){this.id=Qu++,this.code=e,this.usedTimes=0}};function td(e){return e===1030||e===37490||e===36285}function nd(e,t,n,r,i,a){let o=new sn,s=new $u,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&Ge(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Ac[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,I=!!b,ee=I&&b.isPMREMTexture===!0,te=!!i.aoMap,ne=!!i.lightMap,L=!!i.bumpMap&&i.wireframe===!1,re=!!i.normalMap,ie=!!i.displacementMap,R=!!i.emissiveMap,z=!!i.metalnessMap,B=!!i.roughnessMap,ae=i.anisotropy>0,oe=i.clearcoat>0,se=i.diffuseRoughness>0,ce=i.dispersion>0,V=i.retroreflectivity>0,le=i.iridescence>0,ue=i.sheen>0,de=i.transmission>0,fe=ae&&!!i.anisotropyMap,pe=oe&&!!i.clearcoatMap,me=oe&&!!i.clearcoatNormalMap,he=oe&&!!i.clearcoatRoughnessMap,ge=se&&!!i.diffuseRoughnessMap,_e=le&&!!i.iridescenceMap,H=le&&!!i.iridescenceThicknessMap,ve=ue&&!!i.sheenColorMap,U=ue&&!!i.sheenRoughnessMap,ye=!!i.specularMap,be=!!i.specularColorMap,xe=!!i.specularIntensityMap,Se=de&&!!i.transmissionMap,Ce=de&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,W=i.alphaTest>0,Ee=!!i.alphaHash,De=!!i.extensions,G=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(G=e.toneMapping);let K=ee?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Oe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Nt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:I,envMapMode:I&&b.mapping,envMapPMREM:ee,envMapMaxLod:ee?K.length-1:null,envMapSize:ee?K[0].width:null,aoMap:te,lightMap:ne,bumpMap:L,normalMap:re,displacementMap:ie,emissiveMap:R,normalMapObjectSpace:re&&i.normalMapType===1,normalMapTangentSpace:re&&i.normalMapType===0,packedNormalMap:re&&i.normalMapType===0&&td(i.normalMap.format),metalnessMap:z,roughnessMap:B,anisotropy:ae,anisotropyMap:fe,clearcoat:oe,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:he,diffuseRoughness:se,diffuseRoughnessMap:ge,dispersion:ce,retroreflection:V,iridescence:le,iridescenceMap:_e,iridescenceThicknessMap:H,sheen:ue,sheenColorMap:ve,sheenRoughnessMap:U,specularMap:ye,specularColorMap:be,specularIntensityMap:xe,transmission:de,transmissionMap:Se,thicknessMap:Ce,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:W,alphaHash:Ee,combine:i.combine,mapUv:P&&p(i.map.channel),aoMapUv:te&&p(i.aoMap.channel),lightMapUv:ne&&p(i.lightMap.channel),bumpMapUv:L&&p(i.bumpMap.channel),normalMapUv:re&&p(i.normalMap.channel),displacementMapUv:ie&&p(i.displacementMap.channel),emissiveMapUv:R&&p(i.emissiveMap.channel),metalnessMapUv:z&&p(i.metalnessMap.channel),roughnessMapUv:B&&p(i.roughnessMap.channel),anisotropyMapUv:fe&&p(i.anisotropyMap.channel),clearcoatMapUv:pe&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:me&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ge&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:_e&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:H&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:U&&p(i.sheenRoughnessMap.channel),specularMapUv:ye&&p(i.specularMap.channel),specularColorMapUv:be&&p(i.specularColorMap.channel),specularIntensityMapUv:xe&&p(i.specularIntensityMap.channel),transmissionMapUv:Se&&p(i.transmissionMap.channel),thicknessMapUv:Ce&&p(i.thicknessMap.channel),alphaMapUv:Te&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(re||ae),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(P||Te),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&re===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:G,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&Nt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:R&&i.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:De&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(De&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Ac[t];n=Vo.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Zu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function rd(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function id(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ad(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function od(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||id),r.length>1&&r.sort(t||ad),i.length>1&&i.sort(t||ad)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function sd(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new od,e.set(t,[i])):n>=r.length?(i=new od,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function cd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Y,color:new X};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function ld(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ud=0;function dd(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function fd(e){let t=new cd,n=ld(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new Yt,o=new Yt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(dd);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ud++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function pd(e){let t=new fd(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function md(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new pd(e),t.set(n,[a])):r>=i.length?(a=new pd(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var hd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_d=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],vd=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],yd=new Yt,bd=new Y,xd=new Y;function Sd(e,t,n){let r=new Ai,a=new J,o=new J,c=new Wt,l=new Jo,u=new Yo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Wo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:hd,fragmentShader:gd}),v=m.clone();v.defines.HORIZONTAL_PASS=1;let y=new Dr;y.setAttribute(`position`,new fr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Z(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(Ge(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){Ge(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),o.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(o.x=Math.floor(f/y.x),a.x=o.x*y.x,p.mapSize.x=o.x),a.y>f&&(o.y=Math.floor(f/y.y),a.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){Ge(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Kt(a.x,a.y,{format:A,type:_,minFilter:s,magFilter:s,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new na(a.x,a.y,g),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=E,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i}else d.isPointLight?(p.map=new zc(a.x),p.map.depthTexture=new ra(a.x,h)):(p.map=new Kt(a.x,a.y),p.map.depthTexture=new na(a.x,a.y,h)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=E,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);let S=p.camera.layers.mask&4294967294?p.camera.layers:l.layers;for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),bd.setFromMatrixPosition(d.matrixWorld),e.position.copy(bd),xd.copy(e.position),xd.add(_d[t]),e.up.copy(vd[t]),e.lookAt(xd),e.updateMatrixWorld(),n.makeTranslation(-bd.x,-bd.y,-bd.z),yd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(yd,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(c)}r=p.getFrustum(t),T(n,l,i,d,S,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Kt(a.x,a.y,{format:A,type:_}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,m,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=w(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)T(l[e],i,a,o,s,c)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Cd(e,t){function n(){let t=!1,n=new Wt,r=null,i=new Wt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?z(e.DEPTH_TEST):B(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ye[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?z(e.STENCIL_TEST):B(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),L=new Wt().fromArray(te),re=new Wt().fromArray(ne);function ie(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let R={};R[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),R[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),R[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),R[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),z(e.DEPTH_TEST),o.setFunc(3),de(!1),fe(1),z(e.CULL_FACE),le(0);function z(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function B(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ae(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function oe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function se(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ce={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ce[103]=e.MIN,ce[104]=e.MAX;let V={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function le(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(B(e.BLEND),g=!1);else if(g===!1&&(z(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Ke(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Ke(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:Ke(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Ke(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ce[n],ce[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(V[r],V[i],V[o],V[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ue(t,n){t.side===2?B(e.CULL_FACE):z(e.CULL_FACE);let r=t.side===1;n&&(r=!r),de(r),t.blending===1&&t.transparent===!1?le(0):le(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),me(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?z(e.SAMPLE_ALPHA_TO_COVERAGE):B(e.SAMPLE_ALPHA_TO_COVERAGE)}function de(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function fe(t){t===0?B(e.CULL_FACE):(z(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function pe(t){t!==k&&(N&&e.lineWidth(t),k=t)}function me(t,n,r){t?(z(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):B(e.POLYGON_OFFSET_FILL)}function he(t){t?z(e.SCISSOR_TEST):B(e.SCISSOR_TEST)}function ge(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function _e(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||R[t]),i.type=t,i.texture=n)}function H(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ve(){try{e.compressedTexImage2D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function U(){try{e.compressedTexImage3D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function ye(){try{e.texSubImage2D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function be(){try{e.texSubImage3D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function xe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function Se(){try{e.compressedTexSubImage3D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function Ce(){try{e.texStorage2D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function we(){try{e.texStorage3D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function Te(){try{e.texImage2D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function W(){try{e.texImage3D(...arguments)}catch(e){Ke(`WebGLState:`,e)}}function Ee(t){return d[t]===void 0?e.getParameter(t):d[t]}function De(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function G(t){L.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),L.copy(t))}function K(t){re.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),re.copy(t))}function Oe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function q(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,L.set(0,0,e.canvas.width,e.canvas.height),re.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:z,disable:B,bindFramebuffer:ae,drawBuffers:oe,useProgram:se,setBlending:le,setMaterial:ue,setFlipSided:de,setCullFace:fe,setLineWidth:pe,setPolygonOffset:me,setScissorTest:he,activeTexture:ge,bindTexture:_e,unbindTexture:H,compressedTexImage2D:ve,compressedTexImage3D:U,texImage2D:Te,texImage3D:W,pixelStorei:De,getParameter:Ee,updateUBOMapping:Oe,uniformBlockBinding:q,texStorage2D:Ce,texStorage3D:we,texSubImage2D:ye,texSubImage3D:be,compressedTexSubImage2D:xe,compressedTexSubImage3D:Se,scissor:G,viewport:K,reset:ke}}function wd(e,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new J,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return T?new OffscreenCanvas(e,t):Be(`canvas`)}function O(e,t,n){let r=1,i=ke(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=E(n,a));let o=t?E(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),Ge(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&Ge(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function k(e){return e.generateMipmaps}function A(t){e.generateMipmap(t)}function j(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function M(t,n,r,i,a,o=!1){if(t!==null){if(e[t]!==void 0)return e[t];Ge(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+t+`'`)}let s;i&&(s=u.get(`EXT_texture_norm16`),s||Ge(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let c=n;if(n===e.RED&&(r===e.FLOAT&&(c=e.R32F),r===e.HALF_FLOAT&&(c=e.R16F),r===e.UNSIGNED_BYTE&&(c=e.R8),r===e.UNSIGNED_SHORT&&s&&(c=s.R16_EXT),r===e.SHORT&&s&&(c=s.R16_SNORM_EXT)),n===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.R8UI),r===e.UNSIGNED_SHORT&&(c=e.R16UI),r===e.UNSIGNED_INT&&(c=e.R32UI),r===e.BYTE&&(c=e.R8I),r===e.SHORT&&(c=e.R16I),r===e.INT&&(c=e.R32I)),n===e.RG&&(r===e.FLOAT&&(c=e.RG32F),r===e.HALF_FLOAT&&(c=e.RG16F),r===e.UNSIGNED_BYTE&&(c=e.RG8),r===e.UNSIGNED_SHORT&&s&&(c=s.RG16_EXT),r===e.SHORT&&s&&(c=s.RG16_SNORM_EXT)),n===e.RG_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RG8UI),r===e.UNSIGNED_SHORT&&(c=e.RG16UI),r===e.UNSIGNED_INT&&(c=e.RG32UI),r===e.BYTE&&(c=e.RG8I),r===e.SHORT&&(c=e.RG16I),r===e.INT&&(c=e.RG32I)),n===e.RGB_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGB8UI),r===e.UNSIGNED_SHORT&&(c=e.RGB16UI),r===e.UNSIGNED_INT&&(c=e.RGB32UI),r===e.BYTE&&(c=e.RGB8I),r===e.SHORT&&(c=e.RGB16I),r===e.INT&&(c=e.RGB32I)),n===e.RGBA_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGBA8UI),r===e.UNSIGNED_SHORT&&(c=e.RGBA16UI),r===e.UNSIGNED_INT&&(c=e.RGBA32UI),r===e.BYTE&&(c=e.RGBA8I),r===e.SHORT&&(c=e.RGBA16I),r===e.INT&&(c=e.RGBA32I)),n===e.RGB&&(r===e.UNSIGNED_SHORT&&s&&(c=s.RGB16_EXT),r===e.SHORT&&s&&(c=s.RGB16_SNORM_EXT),r===e.UNSIGNED_INT_5_9_9_9_REV&&(c=e.RGB9_E5),r===e.UNSIGNED_INT_10F_11F_11F_REV&&(c=e.R11F_G11F_B10F)),n===e.RGBA){let t=o?Me:Nt.getTransfer(a);r===e.FLOAT&&(c=e.RGBA32F),r===e.HALF_FLOAT&&(c=e.RGBA16F),r===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT&&s&&(c=s.RGBA16_EXT),r===e.SHORT&&s&&(c=s.RGBA16_SNORM_EXT),r===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&u.get(`EXT_color_buffer_float`),c}function N(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,Ge(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function P(e,t){return k(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function F(e){let t=new WeakRef(e);f.get(e).__ref=t,C.add(t),w.register(e,t,t)}function I(e){let t=f.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function ee(e){ne(e.target)}function te(e){L(e.target)}function ne(e){e.removeEventListener(`dispose`,ee),I(e),ie(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function L(e){e.removeEventListener(`dispose`,te),I(e),z(e)}function re(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?L(t):ne(t))}C.clear(),b.clear()}function ie(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&R(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function R(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function z(t){let n=f.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let r=t.depthTexture;if(r&&r.renderTarget===t&&ne(r),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=f.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(i[t])}f.remove(t)}let B=0;function ae(){B=0}function oe(){return B}function se(e){B=e}function ce(){let e=B;return e>=p.maxTextures&&Ge(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),B+=1,e}function V(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function le(t,n){let r=f.get(t);if(t.isVideoTexture&&Oe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)Ge(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)Ge(`WebGLRenderer: Texture marked for update but image is incomplete`);else{U(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function ue(t,n){let r=f.get(t);t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version?U(r,t,n):(t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n))}function de(t,n){let r=f.get(t);t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version?U(r,t,n):d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function fe(t,n){let r=f.get(t);t.version>0&&r.__version!==t.version?ye(r,t,n):d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let pe={[t]:e.REPEAT,[n]:e.CLAMP_TO_EDGE,[r]:e.MIRRORED_REPEAT},me={[i]:e.NEAREST,[a]:e.NEAREST_MIPMAP_NEAREST,[o]:e.NEAREST_MIPMAP_LINEAR,[s]:e.LINEAR,[c]:e.LINEAR_MIPMAP_NEAREST,[l]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(t,n){if(n.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(n.magFilter===1006||n.magFilter===1007||n.magFilter===1005||n.magFilter===1008||n.minFilter===1006||n.minFilter===1007||n.minFilter===1005||n.minFilter===1008)&&Ge(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(t,e.TEXTURE_WRAP_S,pe[n.wrapS]),e.texParameteri(t,e.TEXTURE_WRAP_T,pe[n.wrapT]),(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)&&e.texParameteri(t,e.TEXTURE_WRAP_R,pe[n.wrapR]),e.texParameteri(t,e.TEXTURE_MAG_FILTER,me[n.magFilter]),e.texParameteri(t,e.TEXTURE_MIN_FILTER,me[n.minFilter]),n.compareFunction&&(e.texParameteri(t,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(t,e.TEXTURE_COMPARE_FUNC,he[n.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(n.magFilter===1003||n.minFilter!==1005&&n.minFilter!==1008||n.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(n.anisotropy>1||f.get(n).__currentAnisotropy){let r=u.get(`EXT_texture_filter_anisotropic`);e.texParameterf(t,r.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(n.anisotropy,p.getMaxAnisotropy())),f.get(n).__currentAnisotropy=n.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ee),F(n));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=V(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&R(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function H(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ve(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=H(r.start,n.width,4),c=H(t.start,n.width,4);r.start<=i+1&&s===c&&H(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function U(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=_e(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=Nt.getPrimaries(Nt.workingColorSpace),r=n.colorSpace===``?null:Nt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=O(n.image,!1,p.maxTextureSize);t=q(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=M(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);ge(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=P(n,t);if(n.isDepthTexture)u=N(n.format===D,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&ve(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=Tc(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=Tc(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=ke(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=ke(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);k(n)&&n.mipmapsAutoUpdate===!0&&A(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function ye(t,n,r){if(n.image.length!==6)return;let i=_e(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Nt.getPrimaries(Nt.workingColorSpace),s=n.colorSpace===``?null:Nt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=O(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=q(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=M(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=P(n,h);ge(e.TEXTURE_CUBE_MAP,n);let C;if(n.isDepthTexture){if(v=N(n.format===D,n.type),b){if(y)d.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=ke(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}k(n)&&n.mipmapsAutoUpdate===!0&&A(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function be(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=M(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),K(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,G(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=N(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;K(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,G(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,G(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=M(a.internalFormat,o,s,a.normalized,a.colorSpace);K(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,G(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,G(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);a.__renderTarget=n;let o=i?n.depthTexture.image[0]:n.depthTexture.image;a.__webglTexture&&o.width===n.width&&o.height===n.height||(o.width=n.width,o.height=n.height,n.depthTexture.needsUpdate=!0),i?fe(n.depthTexture,0):le(n.depthTexture,0);let s=a.__webglTexture,c=G(n),l=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,u=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)K(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,u,l,s,0,c):e.framebufferTexture2D(e.FRAMEBUFFER,u,l,s,0);else if(n.depthTexture.format===1027)K(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,u,l,s,0,c):e.framebufferTexture2D(e.FRAMEBUFFER,u,l,s,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)Se(n.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Se(n.__webglFramebuffer[0],t,0):Se(n.__webglFramebuffer,t,0)}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),xe(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),xe(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}d.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){let i=f.get(t);n!==void 0&&be(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&Ce(t)}function Te(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,te),F(t);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&K(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=M(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=G(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),xe(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),ge(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)be(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else be(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);k(n)?A(e.TEXTURE_CUBE_MAP):n.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,n.mipmaps.length-1),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),ge(s,i),be(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),k(i)&&A(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),ge(a,n),n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)be(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else be(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);k(n)?A(a):n.mipmaps.length>0&&e.texParameteri(a,e.TEXTURE_MAX_LEVEL,n.mipmaps.length-1),d.unbindTexture()}t.depthBuffer&&Ce(t)}function W(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(k(r)&&r.mipmapsAutoUpdate===!0){let t=j(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),A(t),d.unbindTexture()}}}let Ee=[];function De(t){if(t.samples>0){if(K(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(Ee.length=0,Ee.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Ee.push(o),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ee))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function G(e){return Math.min(p.maxSamples,e.samples)}function K(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Oe(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function q(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Nt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&Ge(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Ke(`WebGLTextures: Unsupported texture color space:`,n)),t}function ke(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ce,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=le,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=K,this.dispose=re}function Td(e,t){function n(n,r=``){let i,a=Nt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ed=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Od=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ia(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Wo({vertexShader:Ed,fragmentShader:Dd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Z(new jo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kd=class extends Xe{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,d=null,f=null,p=null,m=null,g=typeof XRWebGLBinding<`u`,_=new Od,v={},y=t.getContextAttributes(),x=null,S=null,C=[],w=[],O=new J,k=null,A=null,j=new Gs;j.viewport=new Wt;let M=new Gs;M.viewport=new Wt;let N=[j,M],P=new ac,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new En,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new En,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new En,C[e]=t),t.getHandSpace()};function ee(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}F=null,I=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,z.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&Ge(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&Ge(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?D:E,a=y.stencil?b:h);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Kt(f.textureWidth,f.textureHeight,{format:T,type:u,depthTexture:new na(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Kt(p.framebufferWidth,p.framebufferHeight,{format:T,type:u,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),z.setContext(r),z.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}function L(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;L(P,i);for(let e=0;e<a.length;e++)L(a[e],i);P.projectionMatrix.copy(j.projectionMatrix),P.projectionMatrixInverse.copy(j.projectionMatrixInverse),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),re(e,P,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=et*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let ie=null;function R(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=N[n];o===void 0&&(o=new Gs,o.layers.enable(n),o.viewport=new Wt,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new ia,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let z=new Dc;z.setAnimationLoop(R),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},Ad=new Yt,jd=new Ot;jd.set(-1,0,0,0,1,0,0,0,1);function Md(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Bo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ad.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(jd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Nd(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?Ge(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):Ge(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Pd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Fd=null;function Id(){return Fd===null&&(Fd=new mi(Pd,16,16,A,_),Fd.name=`DFG_LUT`,Fd.minFilter=s,Fd.magFilter=s,Fd.wrapS=n,Fd.wrapT=n,Fd.generateMipmaps=!1,Fd.needsUpdate=!0),Fd}var Ld=class{constructor(e={}){let{canvas:t=Ve(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:g=u}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=g,C=new Set([M,j,k]),w=new Set([u,h,p,b,v,y]),T=new Uint32Array(4),E=new Int32Array(4),D={textures:[],min:[],max:[],resolution:[]},O=null,A=null,N=[],P=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,ee=!1,te=null,ne=null,L=null,re=null;this._outputColorSpace=Ae;let ie=0,R=0,z=null,B=-1,ae=null,oe=new Wt,se=new Wt,ce=null,V=new X(0),le=0,ue=t.width,de=t.height,fe=1,pe=null,me=null,he=new Wt(0,0,ue,de),ge=new Wt(0,0,ue,de),_e=!1,H=new Ai,ve=new Mi,U=!1,ye=!1,be=new Yt,xe=new Y,Se=new Wt,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},we=!1;function Te(){return z===null?fe:1}let W=n;function Ee(e,n){return t.getContext(e,n)}let De,G,K,Oe,q,ke,je,Me,Ne,Pe,Fe,Ie,Re,ze,Be,He,We,qe,Ye,Xe,Ze,Qe,$e;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,nt,!1),t.addEventListener(`webglcontextrestored`,rt,!1),t.addEventListener(`webglcontextcreationerror`,it,!1),W===null){let t=`webgl2`;if(W=Ee(t,e),W===null)throw Ee(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}et()}catch(e){throw t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),Ke(`WebGLRenderer: `+e.message),e}function et(){De=new rl(W),De.init(),Ze=new Td(W,De),G=new Lc(W,De,e,Ze),K=new Cd(W,De),G.reversedDepthBuffer&&m&&K.buffers.depth.setReversed(!0),ne=W.createFramebuffer(),L=W.createFramebuffer(),re=W.createFramebuffer(),Oe=new ol(W),q=new rd,ke=new wd(W,De,K,q,G,Ze,Oe),je=new nl(I),Me=new Oc(W),Qe=new Fc(W,Me),Ne=new il(W,Me,Oe,Qe),Pe=new cl(W,Ne,Me,Qe,Oe),qe=new sl(W,G,ke),Be=new Rc(q),Fe=new nd(I,je,De,G,Qe,Be),Ie=new Md(I,q),Re=new sd,ze=new md(De),We=new Pc(I,je,K,Pe,x,s),He=new Sd(I,Pe,G),$e=new Nd(W,Oe,G,K),Ye=new Ic(W,De,Oe),Xe=new al(W,De,Oe),Oe.programs=Fe.programs,I.capabilities=G,I.extensions=De,I.properties=q,I.renderLists=Re,I.shadowMap=He,I.state=K,I.info=Oe}S!==1009&&(F=new ul(S,t.width,t.height,o,r,i));let tt=new kd(I,W);this.xr=tt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let e=De.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=De.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(e){e!==void 0&&(fe=e,this.setSize(ue,de,!1))},this.getSize=function(e){return e.set(ue,de)},this.setSize=function(e,n,r=!0){tt.isPresenting?Ge(`WebGLRenderer: Can't change size while VR device is presenting.`):(ue=e,de=n,t.width=Math.floor(e*fe),t.height=Math.floor(n*fe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ue*fe,de*fe).floor()},this.setDrawingBufferSize=function(e,n,r){ue=e,de=n,fe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)Ke(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){Ge(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(oe)},this.getViewport=function(e){return e.copy(he)},this.setViewport=function(e,t,n,r){e.isVector4?he.set(e.x,e.y,e.z,e.w):he.set(e,t,n,r),K.viewport(oe.copy(he).multiplyScalar(Te()).round())},this.getScissor=function(e){return e.copy(ge)},this.setScissor=function(e,t,n,r){e.isVector4?ge.set(e.x,e.y,e.z,e.w):ge.set(e,t,n,r),K.scissor(se.copy(ge).multiplyScalar(Te()).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(e){K.setScissorTest(_e=e)},this.setOpaqueSort=function(e){pe=e},this.setTransparentSort=function(e){me=e},this.getClearColor=function(e){return e.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(z!==null){let t=z.texture.format;e=C.has(t)}if(e){let e=z.texture.type,t=w.has(e),n=We.getClearColor(),r=We.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,W.clearBufferuiv(W.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,W.clearBufferiv(W.COLOR,0,E))}else r|=W.COLOR_BUFFER_BIT}t&&(r|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&W.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),te=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),We.dispose(),Re.dispose(),ze.dispose(),ke.dispose(),q.dispose(),je.dispose(),Pe.dispose(),Ne.dispose(),Qe.dispose(),$e.dispose(),Fe.dispose(),tt.dispose(),tt.removeEventListener(`sessionstart`,dt),tt.removeEventListener(`sessionend`,ft),pt.stop()};function nt(e){e.preventDefault(),Ue(`WebGLRenderer: Context Lost.`),ee=!0}function rt(){Ue(`WebGLRenderer: Context Restored.`),ee=!1;let e=Oe.autoReset,t=He.enabled,n=He.autoUpdate,r=He.needsUpdate,i=He.type;et(),Oe.autoReset=e,He.enabled=t,He.autoUpdate=n,He.needsUpdate=r,He.type=i}function it(e){Ke(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function at(e){let t=e.target;t.removeEventListener(`dispose`,at),ot(t)}function ot(e){st(e),q.remove(e)}function st(e){let t=q.get(e).programs;t!==void 0&&(t.forEach(function(e){Fe.releaseProgram(e)}),e.isShaderMaterial&&Fe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ce);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=wt(e,t,n,r,i);K.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ne.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Qe.setup(i,r,s,n,c);let h,g=Ye;if(c!==null&&(h=Me.get(c),g=Xe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(K.setLineWidth(r.wireframeLinewidth*Te()),g.setMode(W.LINES)):g.setMode(W.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),K.setLineWidth(e*Te()),i.isLineSegments?g.setMode(W.LINES):i.isLineLoop?g.setMode(W.LINE_LOOP):g.setMode(W.LINE_STRIP)}else i.isPoints?g.setMode(W.POINTS):i.isSprite&&g.setMode(W.TRIANGLES);if(i.isBatchedMesh){if(De.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Me.get(c).bytesPerElement:1,o=q.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(W,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ct(e,t,n,r){te!==null&&e.isNodeMaterial&&te.setObject(r,e),U===!0&&Be.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,bt(e,t,r),e.side=0,e.needsUpdate=!0,bt(e,t,r),e.side=2):bt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),te!==null&&te.renderStart(e,t,n),A=ze.get(n),A.init(t),P.push(A),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(A.pushLight(e),e.castShadow&&A.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(A.pushLight(e),e.castShadow&&A.pushShadow(e))}),A.setupLights(),te!==null&&te.updateLights(A.state.lightsArray),ye=this.localClippingEnabled,U=Be.init(this.clippingPlanes,ye),U===!0&&Be.setGlobalState(this.clippingPlanes,t),te!==null&&He.render(A.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ct(o,n,t,e),r.add(o)}else ct(i,n,t,e),r.add(i)}}),A=P.pop(),te!==null&&te.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=q.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}De.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let lt=null;function ut(e){lt&&lt(e)}function dt(){pt.stop()}function ft(){pt.start()}let pt=new Dc;pt.setAnimationLoop(ut),typeof self<`u`&&pt.setContext(self),this.setAnimationLoop=function(e){lt=e,tt.setAnimationLoop(e),e===null?pt.stop():pt.start()},tt.addEventListener(`sessionstart`,dt),tt.addEventListener(`sessionend`,ft),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){Ke(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;te!==null&&te.renderStart(e,t);let n=tt.enabled===!0&&tt.isPresenting===!0,r=F!==null&&(z===null||n)&&F.begin(I,z);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(t),t=tt.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,z),A=ze.get(e,P.length),A.init(t),A.state.textureUnits=ke.getTextureUnits(),P.push(A),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?ve.setFromArrayCamera(t):H.setFromProjectionMatrix(be,Le,t.reversedDepth),ye=this.localClippingEnabled,U=Be.init(this.clippingPlanes,ye),O=Re.get(e,N.length),O.init(),N.push(O),this.info.render.frame++,tt.enabled===!0&&tt.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&mt(e,t,-1/0,I.sortObjects)}mt(e,t,0,I.sortObjects),O.finish(),te!==null&&te.updateLights(A.state.lightsArray),I.sortObjects===!0&&O.sort(pe,me),we=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,we&&We.addToRenderList(O,e),this.info.autoReset===!0&&this.info.reset(),U===!0&&Be.beginShadows();let i=A.state.shadowsArray;if(He.render(i,e,t),U===!0&&Be.endShadows(),(r&&F.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(A.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];gt(n,r,e,a)}we&&We.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ht(O,e,n,n.viewport)}}else r.length>0&&gt(n,r,e,t),we&&We.render(e),ht(O,e,t)}z!==null&&R===0&&(ke.updateMultisampleRenderTarget(z),ke.updateRenderTargetMipmap(z)),r&&F.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),Qe.resetDefaultState(),B=-1,ae=null,P.pop(),P.length>0?(A=P[P.length-1],ke.setTextureUnits(A.state.textureUnits),U===!0&&Be.setGlobalState(I.clippingPlanes,A.state.camera)):A=null,N.pop(),O=N.length>0?N[N.length-1]:null,te!==null&&te.renderEnd()};function mt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)A.pushLight(e),e.castShadow&&A.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?ve:H;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Se.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let i=Pe.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Se.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?ve:H;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Pe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Se.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Se.copy(e.boundingSphere.center)),Se.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Se.z,s,t)}}else a.visible&&O.push(e,i,a,n,Se.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)mt(i[e],t,n,r)}function ht(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;A.setupLightsView(n),U===!0&&Be.setGlobalState(I.clippingPlanes,n),r&&K.viewport(oe.copy(r)),i.length>0&&_t(i,t,n),a.length>0&&_t(a,t,n),o.length>0&&_t(o,t,n),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function gt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[r.id]===void 0){let e=De.has(`EXT_color_buffer_half_float`)||De.has(`EXT_color_buffer_float`);A.state.transmissionRenderTarget[r.id]=new Kt(1,1,{generateMipmaps:!0,type:e?_:u,minFilter:l,samples:Math.max(4,G.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Nt.workingColorSpace})}let a=A.state.transmissionRenderTarget[r.id],o=r.viewport||oe;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),c=I.getActiveCubeFace(),d=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(V),le=I.getClearAlpha(),le<1&&I.setClearColor(16777215,.5),I.clear(),we&&We.render(n);let f=I.toneMapping;I.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),A.setupLightsView(r),U===!0&&Be.setGlobalState(I.clippingPlanes,r),_t(e,n,r),ke.updateMultisampleRenderTarget(a),ke.updateRenderTargetMipmap(a),De.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,vt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(ke.updateMultisampleRenderTarget(a),ke.updateRenderTargetMipmap(a))}I.setRenderTarget(s,c,d),I.setClearColor(V,le),p!==void 0&&(r.viewport=p),I.toneMapping=f}function _t(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&vt(o,t,n,s,l,c)}}function vt(e,t,n,r,i,a){te!==null&&i.isNodeMaterial&&te.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function yt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function bt(e,t,n){t.isScene!==!0&&(t=Ce);let r=q.get(e),i=A.state.lights,a=A.state.shadowsArray,o=i.state.version,s=Fe.getParameters(e,i.state,a,t,n,A.state.lightProbeGridArray),c=Fe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=je.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,at),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=Fe.getUniforms(e),te!==null&&e.isNodeMaterial&&te.build(e,n,s),e.onBeforeCompile(s,I),d=Fe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Be.uniform),Ct(e,s),r.needsLights=Tt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=yt(A.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function xt(e,t,n,r,i){let a=q.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=bt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=yu.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=q.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t,n,r,i){t.isScene!==!0&&(t=Ce),ke.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=z===null?I.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Nt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=je.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=q.get(r),y=A.state.lights;if(U===!0&&(ye===!0||e!==ae)){let t=e===ae&&r.id===B;Be.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Be.numPlanes||v.numIntersection!==Be.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===yt(A.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;(b===!0||x===!0)&&(S=x===!0?xt(r,t,i,s,h):bt(r,t,i),te&&r.isNodeMaterial&&te.onUpdateProgram(r,S,v));let C=!1,w=!1,T=!1,E=S.getUniforms(),O=v.uniforms;if(K.useProgram(S.program)&&(C=!0,w=!0,T=!0),r.id!==B&&(B=r.id,w=!0),C||ae!==e){K.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(W,`projectionMatrix`,e.projectionMatrix),E.setValue(W,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(W,xe.setFromMatrixPosition(e.matrixWorld)),G.logarithmicDepthBuffer&&E.setValue(W,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(W,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(W,`sunShadowMap`,y.state.sunShadowMap,ke),y.state.directionalShadowMap.length>0&&E.setValue(W,`directionalShadowMap`,y.state.directionalShadowMap,ke),y.state.spotShadowMap.length>0&&E.setValue(W,`spotShadowMap`,y.state.spotShadowMap,ke),y.state.pointShadowMap.length>0&&E.setValue(W,`pointShadowMap`,y.state.pointShadowMap,ke)),i.isSkinnedMesh){E.setOptional(W,i,`bindMatrix`),E.setOptional(W,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(W,`boneTexture`,e.boneTexture,ke))}i.isBatchedMesh&&(E.setOptional(W,i,`batchingTexture`),E.setValue(W,`batchingTexture`,i._matricesTexture,ke),E.setOptional(W,i,`batchingIdTexture`),E.setValue(W,`batchingIdTexture`,i._indirectTexture,ke),E.setOptional(W,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(W,`batchingColorTexture`,i._colorsTexture,ke));let k=n.morphAttributes;if((k.position!==void 0||k.normal!==void 0||k.color!==void 0)&&qe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(W,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Id()),w){if(E.setValue(W,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&J(O,T),a&&r.fog===!0&&Ie.refreshFogUniforms(O,a),Ie.refreshMaterialUniforms(O,r,fe,de,A.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=D,t=0;for(let n of A.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}yu.upload(W,St(v),O,ke)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(yu.upload(W,St(v),O,ke),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(W,`center`,i.center),E.setValue(W,`modelViewMatrix`,i.modelViewMatrix),E.setValue(W,`normalMatrix`,i.normalMatrix),E.setValue(W,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];$e.update(n,S),$e.bind(n,S)}}return S}function J(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Tt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(e,t,n){let r=q.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),q.get(e.texture).__webglTexture=t,q.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=q.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){z=e,ie=t,R=n;let r=null,i=!1,a=!1;if(e){let o=q.get(e);if(o.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(W.FRAMEBUFFER,o.__webglFramebuffer),oe.copy(e.viewport),se.copy(e.scissor),ce=e.scissorTest,K.viewport(oe),K.scissor(se),K.setScissorTest(ce),B=-1;return}if(o.__webglFramebuffer===void 0)ke.setupRenderTarget(e);else if(o.__hasExternalTextures)ke.rebindTextures(e,q.get(e.texture).__webglTexture,q.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&q.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);ke.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=q.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&ke.useMultisampledRTT(e)===!1?q.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,oe.copy(e.viewport),se.copy(e.scissor),ce=e.scissorTest}else oe.copy(he).multiplyScalar(fe).floor(),se.copy(ge).multiplyScalar(fe).floor(),ce=_e;if(n!==0&&(r=ne),K.bindFramebuffer(W.FRAMEBUFFER,r)&&K.drawBuffers(e,r),K.viewport(oe),K.scissor(se),K.setScissorTest(ce),i){let r=q.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=q.get(e.textures[t]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=q.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,t.__webglTexture,n)}B=-1};function Et(e){let t=q.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=G.textureFormatReadable(e.format),t.__typeReadable=G.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){Ke(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){K.bindFramebuffer(W.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let u=Et(o);if(u.__formatReadable===!1){Ke(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){Ke(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&W.readPixels(t,n,r,i,Ze.convert(c),Ze.convert(l),a)}finally{let e=z===null?null:q.get(z).__webglFramebuffer;K.bindFramebuffer(W.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){K.bindFramebuffer(W.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let d=Et(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.bufferData(W.PIXEL_PACK_BUFFER,a.byteLength,W.STREAM_READ),W.readPixels(t,n,r,i,Ze.convert(l),Ze.convert(u),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let p=z===null?null:q.get(z).__webglFramebuffer;K.bindFramebuffer(W.FRAMEBUFFER,p);let m=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Je(W,m,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,a),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(f),W.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ke.setTexture2D(e,0),W.copyTexSubImage2D(W.TEXTURE_2D,n,0,0,o,s,i,a),K.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ze.convert(t.format),_=Ze.convert(t.type),v;t.isData3DTexture?(ke.setTexture3D(t,0),v=W.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ke.setTexture2DArray(t,0),v=W.TEXTURE_2D_ARRAY):(ke.setTexture2D(t,0),v=W.TEXTURE_2D),K.activeTexture(W.TEXTURE0),K.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,t.flipY),K.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),K.pixelStorei(W.UNPACK_ALIGNMENT,t.unpackAlignment);let y=K.getParameter(W.UNPACK_ROW_LENGTH),b=K.getParameter(W.UNPACK_IMAGE_HEIGHT),x=K.getParameter(W.UNPACK_SKIP_PIXELS),S=K.getParameter(W.UNPACK_SKIP_ROWS),C=K.getParameter(W.UNPACK_SKIP_IMAGES);K.pixelStorei(W.UNPACK_ROW_LENGTH,h.width),K.pixelStorei(W.UNPACK_IMAGE_HEIGHT,h.height),K.pixelStorei(W.UNPACK_SKIP_PIXELS,l),K.pixelStorei(W.UNPACK_SKIP_ROWS,u),K.pixelStorei(W.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=q.get(e),r=q.get(t),h=q.get(n.__renderTarget),g=q.get(r.__renderTarget);K.bindFramebuffer(W.READ_FRAMEBUFFER,h.__webglFramebuffer),K.bindFramebuffer(W.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,q.get(e).__webglTexture,i,d+n),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,q.get(t).__webglTexture,a,m+n)),W.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,W.DEPTH_BUFFER_BIT,W.NEAREST);K.bindFramebuffer(W.READ_FRAMEBUFFER,null),K.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||q.has(e)){let n=q.get(e),r=q.get(t);K.bindFramebuffer(W.READ_FRAMEBUFFER,L),K.bindFramebuffer(W.DRAW_FRAMEBUFFER,re);for(let e=0;e<c;e++)w?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,n.__webglTexture,i),T?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,r.__webglTexture,a),i===0?T?W.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):W.copyTexSubImage2D(v,a,f,p,l,u,o,s):W.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,W.COLOR_BUFFER_BIT,W.NEAREST);K.bindFramebuffer(W.READ_FRAMEBUFFER,null),K.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?W.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h);K.pixelStorei(W.UNPACK_ROW_LENGTH,y),K.pixelStorei(W.UNPACK_IMAGE_HEIGHT,b),K.pixelStorei(W.UNPACK_SKIP_PIXELS,x),K.pixelStorei(W.UNPACK_SKIP_ROWS,S),K.pixelStorei(W.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&W.generateMipmap(v),K.unbindTexture()},this.initRenderTarget=function(e){q.get(e).__webglFramebuffer===void 0&&ke.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ke.setTextureCube(e,0):e.isData3DTexture?ke.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ke.setTexture2DArray(e,0):ke.setTexture2D(e,0),K.unbindTexture()},this.resetState=function(){ie=0,R=0,z=null,K.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Le}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Nt._getUnpackColorSpace()}};function Rd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Dr;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=zd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=zd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function zd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new fr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Bd(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));return i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`),e.setIndex(i),e.clearGroups(),e}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function Vd(e){let t=new Map,n=new Map,r=e.clone();return Hd(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function Hd(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)Hd(e.children[r],t.children[r],n)}var Ud=class extends Ts{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Xd(e)}),this.register(function(e){return new Zd(e)}),this.register(function(e){return new Qd(e)}),this.register(function(e){return new cf(e)}),this.register(function(e){return new lf(e)}),this.register(function(e){return new uf(e)}),this.register(function(e){return new ef(e)}),this.register(function(e){return new tf(e)}),this.register(function(e){return new nf(e)}),this.register(function(e){return new rf(e)}),this.register(function(e){return new Yd(e)}),this.register(function(e){return new af(e)}),this.register(function(e){return new $d(e)}),this.register(function(e){return new sf(e)}),this.register(function(e){return new of(e)}),this.register(function(e){return new qd(e)}),this.register(function(e){return new df(e,Kd.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new df(e,Kd.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new ff(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=$s.extractUrlBase(e);a=$s.resolveURL(t,this.path)}else a=$s.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new Os(this.manager);s.setPriority(this.priority),s.setCache(this.cache),s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===pf){try{a[Kd.KHR_BINARY_GLTF]=new gf(e)}catch(e){r&&r(e);return}i=JSON.parse(a[Kd.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Hf(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case Kd.KHR_MATERIALS_UNLIT:a[t]=new Jd;break;case Kd.KHR_DRACO_MESH_COMPRESSION:a[t]=new _f(i,this.dracoLoader);break;case Kd.KHR_TEXTURE_TRANSFORM:a[t]=new vf;break;case Kd.KHR_MESH_QUANTIZATION:a[t]=new yf;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Wd(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Gd(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var Kd={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DIFFUSE_ROUGHNESS:`KHR_materials_diffuse_roughness`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},qd=class{constructor(e){this.parser=e,this.name=Kd.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new X(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],je);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new Qs(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new Ys(s),o.distance=c;break;case`spot`:o=new qs(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),Pf(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},Jd=class{constructor(){this.name=Kd.KHR_MATERIALS_UNLIT}getMaterialType(){return Ur}extendParams(e,t,n){let r=[];e.color=new X(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],je),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,Ae))}return Promise.all(r)}},Yd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Xd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new J(e,e)}return Promise.all(r)}},Zd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.diffuseRoughness=n.diffuseRoughnessFactor===void 0?0:n.diffuseRoughnessFactor,n.diffuseRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`diffuseRoughnessMap`,n.diffuseRoughnessTexture)),Promise.all(r)}},Qd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},$d=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},ef=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new X(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],je)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,Ae)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},tf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},nf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new X().setRGB(i[0],i[1],i[2],je),Promise.all(r)}},rf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_IOR}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);return n===null||(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},af=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new X().setRGB(i[0],i[1],i[2],je),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,Ae)),Promise.all(r)}},of=class{constructor(e){this.parser=e,this.name=Kd.EXT_MATERIALS_BUMP}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},sf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:qo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},cf=class{constructor(e){this.parser=e,this.name=Kd.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},lf=class{constructor(e){this.parser=e,this.name=Kd.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},uf=class{constructor(e){this.parser=e,this.name=Kd.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},df=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},ff=class{constructor(e){this.name=Kd.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==Cf.TRIANGLES&&e.mode!==Cf.TRIANGLE_STRIP&&e.mode!==Cf.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new Yt,n=new Y,a=new Tt,s=new Y(1,1,1),c=new Ei(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new vi(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new Dr,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new vi(t.array,t.itemSize,t.normalized))}Cn.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},pf=`glTF`,mf=12,hf={JSON:1313821514,BIN:5130562},gf=class{constructor(e){this.name=Kd.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,mf),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==pf)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-mf,i=new DataView(e,mf),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===hf.JSON){let r=new Uint8Array(e,mf+a,t);this.content=n.decode(r)}else if(r===hf.BIN){let n=mf+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},_f=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=Kd.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=Of[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=Of[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=wf[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,je,n)})})}},vf=class{constructor(){this.name=Kd.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},yf=class{constructor(){this.name=Kd.KHR_MESH_QUANTIZATION}},bf=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},xf=new Tt,Sf=class extends bf{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return xf.fromArray(i).normalize().toArray(i),i}},Cf={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},wf={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Tf={9728:i,9729:s,9984:a,9985:c,9986:o,9987:l},Ef={33071:n,33648:r,10497:t},Df={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Of={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},kf={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},Af={CUBICSPLINE:void 0,LINEAR:W,STEP:Te},jf={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function Mf(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Ko({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Nf(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function Pf(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Ff(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function If(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Lf(e){let t,n=e.extensions&&e.extensions[Kd.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Rf(n.attributes):e.indices+`:`+Rf(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Rf(e.targets[n]);return t}function Rf(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function zf(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function Bf(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Vf=new Yt,Hf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>`u`||n&&r<17||i&&a<98?(this.textureLoader=new js(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new tc(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Os(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType(`arraybuffer`),(this.options.withCredentials||this.options.crossOrigin===`use-credentials`)&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Nf(i,a,r),Pf(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Kd.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load($s.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=Df[r.type],t=wf[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new fr(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=Df[r.type],o=wf[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Or(f,u/s),t.cache.add(n,c)),p=new jr(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new fr(f,a,d);if(r.sparse!==void 0){let t=Df.SCALAR,n=wf[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new fr(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=Tf[n.magFilter]||1006,t.minFilter=Tf[n.minFilter]||1008,t.wrapS=Ef[n.wrapS]||1e3,t.wrapT=Ef[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1,l;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)l=n.getDependency(`bufferView`,a.bufferView).then(function(e){return new Promise(function(n,r){t.parse(e,n,r)})});else{if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new Ut(e);t.needsUpdate=!0,n(t)}),t.load($s.resolveURL(e,i.path),a,void 0,r)})})}let u=l.then(function(e){return c===!0&&o.revokeObjectURL(s),Pf(e,a),e.userData.mimeType=a.mimeType||Bf(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[Kd.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[Kd.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[Kd.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new qi,Lr.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Ni,Lr.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return Ko}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[Kd.KHR_MATERIALS_UNLIT]){let e=r[Kd.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new X(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],je),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,Ae)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||jf.OPAQUE;if(l===jf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===jf.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Ur&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new J(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Ur&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Ur){let e=i.emissiveFactor;o.emissive=new X().setRGB(e[0],e[1],e[2],je)}return i.emissiveTexture!==void 0&&a!==Ur&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,Ae)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),Pf(n,i),t.associations.set(n,{materials:e}),i.extensions&&Nf(r,n,i),n})}createUniqueName(e){let t=yc.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[Kd.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Wf(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Lf(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[Kd.KHR_DRACO_MESH_COMPRESSION]?i(o):Wf(new Dr,o,t),o.mode===Cf.TRIANGLE_STRIP?e=e.then(e=>Bd(e,1)):o.mode===Cf.TRIANGLE_FAN&&(e=e.then(e=>Bd(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?Mf(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===Cf.TRIANGLES||u.mode===Cf.TRIANGLE_STRIP||u.mode===Cf.TRIANGLE_FAN||u.mode===void 0){let e=i.isSkinnedMesh===!0,t=l.hasAttribute(`skinIndex`)&&l.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),d=e&&t?new fi(l,f):new Z(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights()}else if(u.mode===Cf.LINES)d=new Gi(l,f);else if(u.mode===Cf.LINE_STRIP)d=new Vi(l,f);else if(u.mode===Cf.LINE_LOOP)d=new Ki(l,f);else if(u.mode===Cf.POINTS)d=new Qi(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&If(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),Pf(d,i),u.extensions&&Nf(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&Nf(r,c[0],i),c[0];let l=new wn;i.extensions&&Nf(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r)console.warn(`THREE.GLTFLoader: Missing camera parameters.`);else return n.type===`perspective`?t=new Gs(wt.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new Xs(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Pf(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new Yt;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new _i(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new ys(i,void 0,l);return Pf(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Vf)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new Y().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new pi:t.length>1?new wn:t.length===1?t[0]:new Cn,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),Pf(o,i),i.extensions&&Nf(n,o,i),i.matrix!==void 0){let e=new Yt;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new wn;n.name&&(i.name=r.createUniqueName(n.name)),Pf(i,n),n.extensions&&Nf(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Vd(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Lr||e instanceof Ut)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}kf[i.path]===kf.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(kf[i.path]){case kf.weights:l=ms;break;case kf.rotation:l=gs;break;case kf.translation:case kf.scale:l=vs;break;default:switch(n.itemSize){case 1:l=ms;break;default:l=vs}}let u=r.interpolation===void 0?W:Af[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+kf[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=zf(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof gs?Sf:bf)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Uf(e,t,n){let r=t.attributes,i=new Jn;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new Y(t[0],t[1],t[2]),new Y(a[0],a[1],a[2])),e.normalized){let t=zf(wf[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new Y,t=new Y;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=zf(wf[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new yr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Wf(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=Of[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return Nt.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Nt.workingColorSpace}" not supported.`),Pf(e,t),Uf(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:Ff(e,t.targets,n)})}var Gf={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Kf=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},qf=new Xs(-1,1,1,-1,0,1),Jf=new class extends Dr{constructor(){super(),this.setAttribute(`position`,new hr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new hr([0,2,0,0,2,0],2))}},Yf=class{constructor(e){this._mesh=new Z(Jf,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,qf)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Xf=class extends Kf{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Wo?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Vo.clone(e.uniforms),this.material=new Wo({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Yf(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Zf=class extends Kf{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Qf=class extends Kf{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},$f=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new J);this._width=n.width,this._height=n.height,t=new Kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Xf(Gf),this.copyPass.material.blending=0,this.timer=new oc}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Zf!==void 0&&(r instanceof Zf?n=!0:r instanceof Qf&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new J);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},ep=class extends Kf{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new X}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},tp={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new X(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},np=class e extends Kf{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new J(256,256):new J(e.x,e.y),this.clearColor=new X(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Kt(i,a,{type:_,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Kt(i,a,{type:_,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Kt(i,a,{type:_,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=tp;this.highPassUniforms=Vo.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Wo({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new J(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Vo.clone(Gf.uniforms),this.blendMaterial=new Wo({uniforms:this.copyUniforms,vertexShader:Gf.vertexShader,fragmentShader:Gf.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new X,this._oldClearAlpha=1,this._basic=new Ur,this._fsQuad=new Yf(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new J(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new Wo({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new J(.5,.5)},direction:{value:new J(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Wo({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};np.BlurDirectionX=new J(1,0),np.BlurDirectionY=new J(0,1);var rp={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},ip=class extends Kf{constructor(){super(),this.isOutputPass=!0,this.uniforms=Vo.clone(rp.uniforms),this.material=new Go({name:rp.name,uniforms:this.uniforms,vertexShader:rp.vertexShader,fragmentShader:rp.fragmentShader}),this._fsQuad=new Yf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Nt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function ap(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function op(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var sp={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},cp={duration:.5,overwrite:!1,delay:0},lp,up,dp,fp=1e8,pp=1/fp,mp=Math.PI*2,hp=mp/4,gp=0,_p=Math.sqrt,vp=Math.cos,yp=Math.sin,bp=function(e){return typeof e==`string`},xp=function(e){return typeof e==`function`},Sp=function(e){return typeof e==`number`},Cp=function(e){return e===void 0},wp=function(e){return typeof e==`object`},Tp=function(e){return e!==!1},Ep=function(){return typeof window<`u`},Dp=function(e){return xp(e)||bp(e)},Op=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},kp=Array.isArray,Ap=/random\([^)]+\)/g,jp=/,\s*/g,Mp=/(?:-?\.?\d|\.)+/gi,Np=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Pp=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Fp=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ip=/[+-]=-?[.\d]+/,Lp=/[^,'"\[\]\s]+/gi,Rp=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,zp,Bp,Vp,Hp,Up={},Wp={},Gp,Kp=function(e){return(Wp=wm(e,Up))&&Ug},qp=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},Jp=function(e,t){return!t&&console.warn(e)},Yp=function(e,t){return e&&(Up[e]=t)&&Wp&&(Wp[e]=t)||Up},Xp=function(){return 0},Zp={suppressEvents:!0,isStart:!0,kill:!1},Qp={suppressEvents:!0,kill:!1},$p={suppressEvents:!0},em={},tm=[],nm={},rm,im={},am={},om=30,sm=[],cm=``,lm=function(e){var t=e[0],n,r;if(wp(t)||xp(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=sm.length;r--&&!sm[r].targetTest(t););n=sm[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new $h(e[r],n)))||e.splice(r,1);return e},um=function(e){return e._gsap||lm(sh(e))[0]._gsap},dm=function(e,t,n){return(n=e[t])&&xp(n)?e[t]():Cp(n)&&e.getAttribute&&e.getAttribute(t)||n},fm=function(e,t){return(e=e.split(`,`)).forEach(t)||e},pm=function(e){return Math.round(e*1e5)/1e5||0},mm=function(e){return Math.round(e*1e7)/1e7||0},hm=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},gm=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},_m=function(){var e=tm.length,t=tm.slice(0),n,r;for(nm={},tm.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},vm=function(e){return!!(e._initted||e._startAt||e.add)},ym=function(e,t,n,r){tm.length&&!up&&_m(),e.render(t,n,r||!!(up&&t<0&&vm(e))),tm.length&&!up&&_m()},bm=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Lp).length<2?t:bp(e)?e.trim():e},xm=function(e){return e},Sm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Cm=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},wm=function(e,t){for(var n in t)e[n]=t[n];return e},Tm=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=wp(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Em=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Dm=function(e){var t=e.parent||zp,n=e.keyframes?Cm(kp(e.keyframes)):Sm;if(Tp(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Om=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},km=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Am=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},jm=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Mm=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Nm=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Pm=function(e,t,n,r){return e._startAt&&(up?e._startAt.revert(Qp):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Fm=function e(t){return!t||t._ts&&e(t.parent)},Im=function(e){return e._repeat?Lm(e._tTime,e=e.duration()+e._rDelay)*e:0},Lm=function(e,t){var n=Math.floor(e=mm(e/t));return e&&n===e?n-1:n},Rm=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},zm=function(e){return e._end=mm(e._start+(e._tDur/Math.abs(e._ts||e._rts||pp)||0))},Bm=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=mm(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),zm(e),n._dirty||Mm(n,e)),e},Vm=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Rm(e.rawTime(),t),(!t._dur||th(0,t.totalDuration(),n)-t._tTime>pp)&&t.render(n,!0)),Mm(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-pp}},Hm=function(e,t,n,r){return t.parent&&jm(t),t._start=mm((Sp(n)?n:!n&&Km(t)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:n||e!==zp?Qm(e,n,t):e._time)+t._delay),t._end=mm(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),km(e,t,`_first`,`_last`,e._sort?`_start`:0),Km(t)||(e._recent=t),r||Vm(e,t),e._ts<0&&Bm(e,e._tTime),e},Um=function(e,t){return(Up.ScrollTrigger||qp(`scrollTrigger`,t))&&Up.ScrollTrigger.create(t,e)},Wm=function(e,t,n,r,i){if(cg(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!up&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&rm!==zh.frame)return tm.push(e),e._lazy=[i,r],1},Gm=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Km=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},qm=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Gm(e)&&(e._initted||!Km(e))||(e._ts<0||e._dp._ts<0)&&!Km(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=th(0,e._tDur,t),l=Lm(s,o),e._yoyo&&l&1&&(a=1-a),l!==Lm(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||up||r||e._zTime===pp||!t&&e._zTime){if(!e._initted&&Wm(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?pp:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Pm(e,t,n,!0),e._onUpdate&&!n&&wh(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&wh(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&jm(e,1),!n&&!up&&(wh(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Jm=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},Ym=function(e,t,n,r){var i=e._repeat,a=mm(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:mm(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Bm(e,e._tTime=e._tDur*o),e.parent&&zm(e),n||Mm(e.parent,e),e},Xm=function(e){return e instanceof tg?Mm(e):Ym(e,e._dur)},Zm={_start:0,endTime:Xp,totalDuration:Xp},Qm=function e(t,n,r){var i=t.labels,a=t._recent||Zm,o=t.duration()>=fp?a.endTime(!1):t._dur,s,c,l;return bp(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(kp(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},$m=function(e,t,n){var r=Sp(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Tp(s.vars.inherit)&&s.parent;a.immediateRender=Tp(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new hg(t[0],a,t[i+1])},eh=function(e,t){return e||e===0?t(e):t},th=function(e,t,n){return n<e?e:n>t?t:n},nh=function(e,t){return!bp(e)||!(t=Rp.exec(e))?``:t[1]},rh=function(e,t,n){return eh(n,function(n){return th(e,t,n)})},ih=[].slice,ah=function(e,t){return e&&wp(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&wp(e[0]))&&!e.nodeType&&e!==Bp},oh=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return bp(e)&&!t||ah(e,1)?(r=n).push.apply(r,sh(e)):n.push(e)})||n},sh=function(e,t,n){return dp&&!t&&dp.selector?dp.selector(e):bp(e)&&!n&&(Vp||!Bh())?ih.call((t||Hp).querySelectorAll(e),0):kp(e)?oh(e,n):ah(e)?ih.call(e,0):e?[e]:[]},ch=function(e){return e=sh(e)[0]||Jp(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return sh(t,n.querySelectorAll?n:n===e?Jp(`Invalid scope`)||Hp.createElement(`div`):e)}},lh=function(e){return e.sort(function(){return .5-Math.random()})},uh=function(e){if(xp(e))return e;var t=wp(e)?e:{each:e},n=Jh(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return bp(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,fp])[1],!S){for(b=-fp;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===fp?0:s?f*u/S-.5:r/S|0,b=0,x=fp,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):_p(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&lh(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=nh(t.amount||t.each)||0,n=n&&f<0?qh(n):n}return f=(p[e]-p.min)/p.max||0,mm(p.b+(n?n(f):f)*p.v)+p.u}},dh=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=mm(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Sp(n)?0:nh(n))}},fh=function(e,t){var n=kp(e),r,i;return!n&&wp(e)&&(r=n=e.radius||fp,e.values?(e=sh(e.values),(i=!Sp(e[0]))&&(r*=r)):e=dh(e.increment)),eh(t,n?xp(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=fp,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||Sp(t)?s:s+nh(t)}:dh(e))},ph=function(e,t,n,r){return eh(kp(e)?!t:n===!0?!!(n=0):!r,function(){return kp(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},mh=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},hh=function(e,t){return function(n){return e(parseFloat(n))+(t||nh(n))}},gh=function(e,t,n){return xh(e,t,0,1,n)},_h=function(e,t,n){return eh(n,function(n){return e[~~t(n)]})},vh=function e(t,n,r){var i=n-t;return kp(t)?_h(t,e(0,t.length),n):eh(r,function(e){return(i+(e-t)%i)%i+t})},yh=function e(t,n,r){var i=n-t,a=i*2;return kp(t)?_h(t,e(0,t.length-1),n):eh(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},bh=function(e){return e.replace(Ap,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(jp);return ph(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},xh=function(e,t,n,r,i){var a=t-e,o=r-n;return eh(i,function(t){return n+((t-e)/a*o||0)})},Sh=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=bp(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(kp(t)&&!kp(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=wm(kp(t)?[]:{},t));if(!u){for(c in n)rg.call(s,t,c,`get`,n[c]);a=function(e){return wg(e,s)||(o?t.p:t)}}}return eh(r,a)},Ch=function(e,t,n){var r=e.labels,i=fp,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},wh=function(e,t,n){var r=e.vars,i=r[t],a=dp,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&tm.length&&_m(),o&&(dp=o),l=s?i.apply(c,s):i.call(c),dp=a,l},Th=function(e){return jm(e),e.scrollTrigger&&e.scrollTrigger.kill(!!up),e.progress()<1&&wh(e,`onInterrupt`),e},Eh,Dh=[],Oh=function(e){if(e){if(e=!e.name&&e.default||e,Ep()||e.headless){var t=e.name,n=xp(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:Xp,render:wg,add:rg,kill:Eg,modifier:Tg,rawVars:0},a={targetTest:0,get:0,getSetter:bg,aliases:{},register:0};if(Bh(),e!==r){if(im[t])return;Sm(r,Sm(Em(e,i),a)),wm(r.prototype,wm(i,Em(e,a))),im[r.prop=t]=r,e.targetTest&&(sm.push(r),em[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}Yp(t,r),e.register&&e.register(Ug,r,kg)}else Dh.push(e)}},kh=255,Ah={aqua:[0,kh,kh],lime:[0,kh,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,kh],navy:[0,0,128],white:[kh,kh,kh],olive:[128,128,0],yellow:[kh,kh,0],orange:[kh,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[kh,0,0],pink:[kh,192,203],cyan:[0,kh,kh],transparent:[kh,kh,kh,0]},jh=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*kh+.5|0},Mh=function(e,t,n){var r=e?Sp(e)?[e>>16,e>>8&kh,e&kh]:0:Ah.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ah[e])r=Ah[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&kh,r&kh,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&kh,e&kh]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(Mp),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=jh(s+1/3,i,a),r[1]=jh(s,i,a),r[2]=jh(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Np),n&&r.length<4&&(r[3]=1),r}else r=e.match(Mp)||Ah.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/kh,a=r[1]/kh,o=r[2]/kh,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},Nh=function(e){var t=[],n=[],r=-1;return e.split(Fh).forEach(function(e){var i=e.match(Pp)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Ph=function(e,t,n){var r=``,i=(e+r).match(Fh),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Mh(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=Nh(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(Fh,`1`).split(Pp),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(Fh),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},Fh=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ah)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Ih=/hsl[a]?\(/,Lh=function(e){var t=e.join(` `),n;if(Fh.lastIndex=0,Fh.test(t))return n=Ih.test(t),e[1]=Ph(e[1],n),e[0]=Ph(e[0],n,Nh(e[1])),!0},Rh,zh=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?0:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Gp&&(!Vp&&Ep()&&(Bp=Vp=window,Hp=Bp.document||{},Up.gsap=Ug,(Bp.gsapVersions||(Bp.gsapVersions=[])).push(Ug.version),Kp(Wp||Bp.GreenSockGlobals||!Bp.gsap&&Bp||{}),Dh.forEach(Oh)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Rh=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Rh=0,l=Xp},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Bh(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Bh=function(){return!Rh&&zh.wake()},Vh={},Hh=/^[\d.\-M][\d.\-,\s]/,Uh=/["']/g,Wh=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Uh,``).trim():+c,r=s.substr(o+1).trim();return t},Gh=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},Kh=function(e){var t=(e+``).split(`(`),n=Vh[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[Wh(t[1])]:Gh(e).split(`,`).map(bm)):Vh._CE&&Hh.test(e)?Vh._CE(``,e):n},qh=function(e){return function(t){return 1-e(1-t)}},Jh=function(e,t){return e&&(xp(e)?e:Vh[e]||Kh(e))||t},Yh=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return fm(e,function(e){for(var t in Vh[e]=Up[e]=i,Vh[a=e.toLowerCase()]=n,i)Vh[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=Vh[e+`.`+t]=i[t]}),i},Xh=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Zh=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/mp*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*yp((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Xh(s);return a=mp/a,c.config=function(n,r){return e(t,n,r)},c},Qh=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Xh(r);return i.config=function(n){return e(t,n)},i};fm(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Yh(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),Vh.Linear.easeNone=Vh.none=Vh.Linear.easeIn,Yh(`Elastic`,Zh(`in`),Zh(`out`),Zh()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Yh(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Yh(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Yh(`Circ`,function(e){return-(_p(1-e*e)-1)}),Yh(`Sine`,function(e){return e===1?1:-vp(e*hp)+1}),Yh(`Back`,Qh(`in`),Qh(`out`),Qh()),Vh.SteppedEase=Vh.steps=Up.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-pp;return function(e){return((r*th(0,a,e)|0)+i)*n}}},cp.ease=Vh[`quad.out`],fm(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return cm+=e+`,`+e+`Params,`});var $h=function(e,t){this.id=gp++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:dm,this.set=t?t.getSetter:bg},eg=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ym(this,+e.duration,1,1),this.data=e.data,dp&&(this._ctx=dp,dp.data.push(this)),Rh||zh.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Ym(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Bh(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Bm(this,e),!n._dp||n.parent||Vm(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&Hm(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===pp||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),ym(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Im(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Im(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Lm(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-pp?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Rm(this.parent._time,this):this._tTime,r=this._rts<0;this._rts=+e||0,this._ts=this._ps||e===-pp?0:this._rts;var i=this.totalDuration();return(r!==this._rts<0||n>0&&n<i)&&this.totalTime(th(-Math.abs(this._delay),i,n),t!==!1),zm(this),Nm(this)},t.paused=function(e){if(!arguments.length)return this._ps;if(this._ps!==e){if(this._ps=e,e)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Bh(),this._ts=this._rts;var t=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,n=this.progress()===1&&Math.abs(this._zTime)!==pp,r;if(n)for(this._tTime-=pp,r=this._first;r;){if(!r._dur&&r._zTime<0&&r._ts&&r._start<=t+pp){n=!1;break}r=r._next}this.totalTime(t,n)}}return this},t.startTime=function(e){if(arguments.length){this._start=mm(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&Hm(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Tp(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Rm(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=$p);var t=up;return up=e,vm(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),up=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,Xm(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,Xm(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(Qm(this,e),Tp(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Tp(t)),this._dur||(this._zTime=-pp),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-pp:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-pp,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-pp)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=xp(e)?e:xm,a=function(){var e=t.then;t.then=null,n&&n(),xp(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Th(this)},e}();Sm(eg.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-pp,_prom:0,_ps:!1,_rts:1});var tg=function(e){op(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Tp(t.sortChildren),zp&&Hm(t.parent||zp,ap(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Um(ap(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return $m(0,arguments,this),this},n.from=function(e,t,n){return $m(1,arguments,this),this},n.fromTo=function(e,t,n,r){return $m(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Dm(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new hg(e,t,Qm(this,n),1),this},n.call=function(e,t,n){return Hm(this,hg.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new hg(e,n,Qm(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Dm(n).immediateRender=Tp(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Dm(r).immediateRender=Tp(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:mm(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==zp&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=mm(o%f),o===i?(d=this._repeat,c=a):(_=mm(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Lm(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:mm(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&wh(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Jm(this,mm(r),mm(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(wh(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-pp);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||up&&vm(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-pp:pp);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-pp)._zTime=c>=r?1:-1,this._ts))return this._start=g,zm(this),this.render(e,t,n);this._onUpdate&&!t&&wh(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g!==this._start&&Math.abs(h)===Math.abs(this._ts)||this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&jm(this,1),t||e<0&&!r||!o&&!r&&i||(wh(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Sp(t)||(t=Qm(this,t,e)),!(e instanceof eg)){if(kp(e))return e.forEach(function(e){return n.add(e,t)}),this;if(bp(e))return this.addLabel(e,t);if(xp(e))e=hg.delayedCall(0,e);else return this}return this===e?this:Hm(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-fp);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof hg?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return bp(e)?this.removeLabel(e):xp(e)?this.killTweensOf(e):(e.parent===this&&Am(this,e),e===this._recent&&(this._recent=this._last),Mm(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=mm(zh.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=Qm(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=hg.delayedCall(0,t||Xp,n);return r.data=`isPause`,this._hasPause=1,Hm(this,r,Qm(this,e))},n.removePause=function(e){var t=this._first;for(e=Qm(this,e);t;)t._start===e&&t.data===`isPause`&&jm(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)og!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=sh(e),i=this._first,a=Sp(t),o;i;)i instanceof hg?gm(i._targets,r)&&(a?(!og||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=Qm(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=hg.to(n,Sm({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||pp,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&Ym(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Sm({startAt:{time:Qm(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Ch(this,Qm(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Ch(this,Qm(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+pp)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=mm(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Mm(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Mm(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=fp,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,Hm(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=mm(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;Ym(n,n===zp&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(zp._ts&&(ym(zp,Rm(e,zp)),rm=zh.frame),zh.frame>=om){om+=sp.autoSleep||120;var t=zp._first;if((!t||!t._ts)&&sp.autoSleep&&zh._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||zh.sleep()}}},t}(eg);Sm(tg.prototype,{_lock:0,_hasPause:0,_forcing:0});var ng=function(e,t,n,r,i,a,o){var s=new kg(this._pt,e,t,0,1,Cg,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=bh(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Fp)||[];u=Fp.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?hm(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Fp.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(Ip.test(r)||g)&&(s.e=0),this._pt=s,s},rg=function(e,t,n,r,i,a,o,s,c,l){xp(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?xp(u)?c?e[t.indexOf(`set`)||!xp(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=xp(u)?c?vg:_g:gg,p;if(bp(r)&&(~r.indexOf(`random(`)&&(r=bh(r)),r.charAt(1)===`=`&&(p=hm(d,r)+(nh(d)||0),(p||p===0)&&(r=p))),!l||d!==r||sg)return!isNaN(d*r)&&r!==``?(p=new kg(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?Sg:xg,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&qp(t,r),ng.call(this,e,t,d,r,f,s||sp.stringFilter,c))},ig=function(e,t,n,r,i){if(xp(e)&&(e=fg(e,i,t,n,r)),!wp(e)||e.style&&e.nodeType||kp(e)||Op(e))return bp(e)?fg(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=fg(e[o],i,t,n,r);return a},ag=function(e,t,n,r,i,a){var o,s,c,l;if(im[e]&&(o=new im[e]).init(i,o.rawVars?t[e]:ig(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new kg(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Eh))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},og,sg,cg=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!lp,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,M,N,P;if(!b||f&&a||(a=`none`),t._ease=Jh(a,cp.ease),t._rEase=x&&(Jh(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?um(g[0]).harness:0,N=k&&i[k.prop],S=Em(i,em),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Qp:Zp),h._lazy=0),o){if(jm(t._startAt=hg.set(g,Sm({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Tp(c),startAt:null,delay:0,onUpdate:l&&function(){return wh(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(up||!s&&!p)&&t._startAt.revert(Qp),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Sm({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Tp(c),immediateRender:s,stagger:0,parent:_},S),N&&(w[k.prop]=N),jm(t._startAt=hg.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(up?t._startAt.revert(Qp):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,pp,pp);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Tp(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||lm(g)[C]._gsap,t._ptLookup[C]=j={},nm[O.id]&&tm.length&&_m(),M=v===g?C:v.indexOf(E),k&&(A=new k).init(E,N||S,t,M,v)!==!1&&(t._pt=T=new kg(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||N)for(w in S)im[w]&&(A=ag(w,S,t,M,E,v))?A.priority&&(D=1):j[w]=T=rg.call(t,E,w,`get`,S[w],M,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(og=t,zp.killTweensOf(E,j,t.globalTime(n)),P=!t.parent,og=0),t._pt&&c&&(nm[O.id]=1)}D&&Og(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!P,f&&n<=0&&b.render(fp,!0,!0)},lg=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return sg=1,e.vars[t]=`+=0`,cg(e,o),sg=0,s?Jp(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=pm(n)+nh(u.e)),u.b&&(u.b=l.s+nh(u.b))},ug=function(e,t){var n=e[0]?um(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=wm({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},dg=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(kp(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},fg=function(e,t,n,r,i){return xp(e)?e.call(t,n,r,i):bp(e)&&~e.indexOf(`random(`)?bh(e):e},pg=cm+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,mg={};fm(pg+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return mg[e]=1}),pg=pg.split(`,`);var hg=function(e){op(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Dm(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||zp,g=(kp(t)||Op(t)?Sp(t[0]):`length`in n)?[t]:sh(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?lm(g):Jp(`GSAP target `+t+` not found. https://gsap.com`,!sp.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Dp(s)||Dp(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new tg({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=ap(a),_._start=0,u||Dp(s)||Dp(c)){if(b=g.length,C=u&&uh(u),wp(u))for(x in u)~pg.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Em(n,mg),y.stagger=0,T&&(y.easeReverse=T),w&&wm(y,w),S=g[v],y.duration=+fg(s,ap(a),v,S,g),y.delay=(+fg(c,ap(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=Vh.none;_.duration()?s=c=0:a.timeline=0}else if(f){Dm(Sm(_.vars.defaults,{ease:`none`})),_._ease=Jh(f.ease||n.ease||`none`);var E=0,D,O,k;if(kp(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||dg(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!lp&&(og=ap(a),zp.killTweensOf(g),og=0),Hm(h,ap(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===mm(h._time)&&Tp(l)&&Fm(ap(a))&&h.data!==`nested`)&&(a._tTime=-pp,a.render(Math.max(0,-c)||0)),m&&Um(ap(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-pp&&!o?i:e<pp?0:e,c,l,u,d,f,p,m,h;if(!a)qm(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=mm(s%d),s===i?(u=this._repeat,c=a):(f=mm(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Lm(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(mm(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(Wm(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(wh(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&Pm(this,e,t,n),wh(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&wh(this,`onRepeat`),s!==this._tDur&&s||this._tTime!==s||(o&&!this._onUpdate&&Pm(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&jm(this,1),!t&&(!o||r)&&(s||r||p)&&(wh(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Rh||zh.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||cg(this,a),o=this._ease(a/this._dur),lg(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Bm(this,0),this.parent||km(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Th(this):this.scrollTrigger&&this.scrollTrigger.kill(!!up),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,og&&og.vars.overwrite!==!0)._first||Th(this),this.parent&&n!==this.timeline.totalDuration()&&Ym(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?sh(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Om(r,i))return t===`all`&&(this._pt=0),Th(this);for(s=this._op=this._op||[],t!==`all`&&(bp(t)&&(d={},fm(t,function(e){return d[e]=1}),t=d),t=ug(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&(`kill`in f.d&&f.d.kill(d)!==!0||Am(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Th(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return $m(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return $m(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return zp.killTweensOf(e,t,n)},t}(eg);Sm(hg.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),fm(`staggerTo,staggerFrom,staggerFromTo`,function(e){hg[e]=function(){var t=new tg,n=ih.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var gg=function(e,t,n){return e[t]=n},_g=function(e,t,n){return e[t](n)},vg=function(e,t,n,r){return e[t](r.fp,n)},yg=function(e,t,n){return e.setAttribute(t,n)},bg=function(e,t){return xp(e[t])?_g:Cp(e[t])&&e.setAttribute?yg:gg},xg=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Sg=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Cg=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},wg=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Tg=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Eg=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Am(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Dg=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Og=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},kg=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||xg,this.d=o||this,this.set=s||gg,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Dg,this.m=e,this.mt=n,this.tween=t},e}();fm(cm+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return em[e]=1}),Up.TweenMax=Up.TweenLite=hg,Up.TimelineLite=Up.TimelineMax=tg,zp=new tg({sortChildren:!1,defaults:cp,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),sp.stringFilter=Lh;var Ag=[],jg={},Mg=[],Ng=0,Pg=0,Fg=function(e){return(jg[e]||Mg).map(function(e){return e()})},Ig=function(){var e=Date.now(),t=[];e-Ng>2&&(Fg(`matchMediaInit`),Ag.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=Bp.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),Fg(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Ng=e,Fg(`matchMedia`))},Lg=function(){function e(e,t){this.selector=t&&ch(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Pg++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){xp(e)&&(n=t,t=e,e=xp);var r=this,i=function(){var e=dp,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=ch(n)),dp=r,a=t.apply(r,arguments),xp(a)&&r._r.push(a),dp=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===xp?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=dp;dp=null,e(this),dp=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof hg&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof tg?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof hg)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t){for(var r=Ag.length;r--;)Ag[r].id===this.id&&Ag.splice(r,1);this._mqs&&this._mqs.forEach(function(e){return e.removeListener?e.removeListener(Ig):e.removeEventListener(`change`,Ig)}),this._mqs=null}},t.revert=function(e){this.kill(e||{})},e}(),Rg=function(){function e(e){this.contexts=[],this.scope=e,dp&&dp.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){wp(e)||(e={matches:e});var r=new Lg(0,n||this.scope),i=r.conditions={},a,o,s;for(o in dp&&!r.selector&&(r.selector=dp.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=Bp.matchMedia(e[o]),a&&(Ag.indexOf(r)<0&&Ag.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Ig):a.addEventListener(`change`,Ig),(r._mqs||=[]).push(a)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),zg={registerPlugin:function(){[...arguments].forEach(function(e){return Oh(e)})},timeline:function(e){return new tg(e)},getTweensOf:function(e,t){return zp.getTweensOf(e,t)},getProperty:function(e,t,n,r){bp(e)&&(e=sh(e)[0]);var i=um(e||{}).get,a=n?xm:bm;return n===`native`&&(n=``),e&&(t?a((im[t]&&im[t].get||i)(e,t,n,r)):function(t,n,r){return a((im[t]&&im[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=sh(e),e.length>1){var r=e.map(function(e){return Ug.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=im[t],o=um(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Eh._pt=0,r.init(e,n?t+n:t,Eh,0,[e]),r.render(1,r),Eh._pt&&wg(1,Eh)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=Ug.to(e,Sm((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return zp.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Jh(e.ease,cp.ease)),Tm(cp,e||{})},config:function(e){return Tm(sp,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!im[e]&&!Up[e]&&Jp(t+` effect requires `+e+` plugin.`)}),am[t]=function(e,t,r){return n(sh(e),Sm(t||{},i),r)},a&&(tg.prototype[t]=function(e,n,r){return this.add(am[t](e,wp(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){Vh[e]=Jh(t)},parseEase:function(e,t){return arguments.length?Jh(e,t):Vh},getById:function(e){return zp.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new tg(e),r,i;for(n.smoothChildTiming=Tp(e.smoothChildTiming),zp.remove(n),n._dp=0,n._time=n._tTime=zp._time,r=zp._first;r;)i=r._next,(t||!(!r._dur&&r instanceof hg&&r.vars.onComplete===r._targets[0]))&&Hm(n,r,r._start-r._delay),r=i;return Hm(zp,n,0),n},context:function(e,t){return e?new Lg(e,t):dp},matchMedia:function(e){return new Rg(e)},matchMediaRefresh:function(){return Ag.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Ig()},addEventListener:function(e,t){var n=jg[e]||(jg[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=jg[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:vh,wrapYoyo:yh,distribute:uh,random:ph,snap:fh,normalize:gh,getUnit:nh,clamp:rh,splitColor:Mh,toArray:sh,selector:ch,mapRange:xh,pipe:mh,unitize:hh,interpolate:Sh,shuffle:lh},install:Kp,effects:am,ticker:zh,updateRoot:tg.updateRoot,plugins:im,globalTimeline:zp,core:{PropTween:kg,globals:Yp,Tween:hg,Timeline:tg,Animation:eg,getCache:um,_removeLinkedListItem:Am,reverting:function(){return up},context:function(e){return e&&dp&&(dp.data.push(e),e._ctx=dp),dp},suppressOverwrites:function(e){return lp=e}}};fm(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return zg[e]=hg[e]}),zh.add(tg.updateRoot),Eh=zg.to({},{duration:0});var Bg=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Vg=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Bg(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Hg=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(bp(n)&&(r={},fm(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Vg(e,n)}}}},Ug=zg.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)up?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Hg(`roundProps`,dh),Hg(`modifiers`),Hg(`snap`,fh))||zg;hg.version=tg.version=Ug.version=`3.15.1`,Gp=1,Ep()&&Bh(),Vh.Power0,Vh.Power1,Vh.Power2,Vh.Power3,Vh.Power4,Vh.Linear,Vh.Quad,Vh.Cubic,Vh.Quart,Vh.Quint,Vh.Strong,Vh.Elastic,Vh.Back,Vh.SteppedEase,Vh.Bounce,Vh.Sine,Vh.Expo,Vh.Circ;var Wg,Gg,Kg,qg,Jg,Yg,Xg,Zg=function(){return typeof window<`u`},Qg={},$g=180/Math.PI,e_=Math.PI/180,t_=Math.atan2,n_=1e8,r_=/([A-Z])/g,i_=/(left|right|width|margin|padding|x)/i,a_=/[\s,\(]\S/,o_={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},s_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},c_=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},l_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},u_=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},d_=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},f_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},p_=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},m_=function(e,t,n){return e.style[t]=n},h_=function(e,t,n){return e.style.setProperty(t,n)},g_=function(e,t,n){return e._gsap[t]=n},__=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},v_=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},y_=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},b_=`transform`,x_=b_+`Origin`,S_=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in Qg&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=o_[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=V_(i,e)}):this.tfm[t]=o.x?o[t]:V_(i,t),t===x_&&(this.tfm.zOrigin=o.zOrigin);else return o_.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(b_)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(x_,n,``)),t=b_}(a||n)&&this.props.push(t,n,a[t])},C_=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},w_=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(r_,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Xg(),i&&i.isStart||n[b_]||(C_(n),r.zOrigin&&n[x_]&&(n[x_]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},T_=function(e,t){var n={target:e,props:[],revert:w_,save:S_};return e._gsap||Ug.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},E_,D_=function(e,t){var n=Gg.createElementNS?Gg.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):Gg.createElement(e);return n&&n.style?n:Gg.createElement(e)},O_=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(r_,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,A_(n)||n,1)||``},k_=`O,Moz,ms,Ms,Webkit`.split(`,`),A_=function(e,t,n){var r=(t||Jg).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(k_[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?k_[i]:``)+e},j_=function(){Zg()&&window.document&&(Wg=window,Gg=Wg.document,Kg=Gg.documentElement,Jg=D_(`div`)||{style:{}},D_(`div`),b_=A_(b_),x_=b_+`Origin`,Jg.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,E_=!!A_(`perspective`),Xg=Ug.core.reverting,qg=1)},M_=function(e){var t=e.ownerSVGElement,n=D_(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Kg.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Kg.removeChild(n),i},N_=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},P_=function(e){var t,n;try{t=e.getBBox()}catch{t=M_(e),n=1}return t&&(t.width||t.height)||n||(t=M_(e)),t&&!t.width&&!t.x&&!t.y?{x:+N_(e,[`x`,`cx`,`x1`])||0,y:+N_(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},F_=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!P_(e))},I_=function(e,t){if(t){var n=e.style,r;t in Qg&&t!==x_&&(t=b_),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(r_,`-$1`).toLowerCase())):n.removeAttribute(t)}},L_=function(e,t,n,r,i,a){var o=new kg(e._pt,t,n,0,1,a?p_:f_);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},R_={deg:1,rad:1,turn:1},z_={grid:1,flex:1},B_=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Jg.style,c=i_.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||R_[i]||R_[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&F_(t),(p||o===`%`)&&(Qg[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],pm(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),h&&h!==Gg&&h.appendChild||(h=Gg.body),g=h._gsap,g&&p&&g.width&&c&&g.time===zh.time&&!g.uncache)return pm(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:I_(t,n)}else(p||o===`%`)&&!z_[O_(h,`display`)]&&(s.position=O_(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Jg),m=Jg[u],h.removeChild(Jg),s.position=`absolute`;return c&&p&&(g=um(h),g.time=zh.time,g.width=h[u]),pm(f?m*a/d:m&&a?d/m*a:0)},V_=function(e,t,n,r){var i;return qg||j_(),t in o_&&t!==`transform`&&(t=o_[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),Qg[t]&&t!==`transform`?(i=$_(e,r),i=t===`transformOrigin`?i.svg?i.origin:ev(O_(e,x_))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=K_[t]&&K_[t](e,t,n)||O_(e,t)||dm(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?B_(e,t,i,n)+n:i},H_=function(e,t,n,r){if(!n||n===`none`){var i=A_(t,e,1),a=i&&O_(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=O_(e,`borderTopColor`))}var o=new kg(this._pt,e.style,t,0,1,Cg),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=O_(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=O_(e,t)||r,m?e.style[t]=m:I_(e,t)),l=[n,r],Lh(l),n=l[0],r=l[1],d=n.match(Pp)||[],b=r.match(Pp)||[],b.length){for(;u=Pp.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=hm(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Pp.lastIndex-v.length,v||(v=v||sp.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=B_(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?p_:f_;return Ip.test(r)&&(o.e=0),this._pt=o,o},U_={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},W_=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=U_[n]||n,t[1]=U_[r]||r,t.join(` `)},G_=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],Qg[o]&&(s=1,o=o===`transformOrigin`?x_:b_),I_(n,o);s&&(I_(n,b_),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,$_(n,1),a.uncache=1,C_(r)))}},K_={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new kg(e._pt,t,n,0,0,G_);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},q_=[1,0,0,1,0,0],J_={},Y_=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},X_=function(e){var t=O_(e,b_);return Y_(t)?q_:t.substr(7).match(Np).map(pm)},Z_=function(e,t){var n=e._gsap||um(e),r=e.style,i=X_(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?q_:i):(i===q_&&!e.offsetParent&&e!==Kg&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,a&&(e.offsetParent||e.getBoundingClientRect().width)||(c=1,o=e.nextElementSibling,Kg.appendChild(e)),i=X_(e),s?r.display=s:I_(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Kg.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Q_=function(e,t,n,r,i,a){var o=e._gsap,s=i||Z_(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==q_&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=P_(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[x_]=`0px 0px`,a&&(L_(a,o,`xOrigin`,c,y),L_(a,o,`yOrigin`,l,b),L_(a,o,`xOffset`,u,o.xOffset),L_(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},$_=function(e,t){var n=e._gsap||new $h(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=O_(e,x_)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,ee,te,ne,L;return n.svg=!!(e.getCTM&&F_(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[b_]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[b_]===`none`?``:s[b_])),r.scale=r.rotate=r.translate=`none`),S=Z_(e,n.svg),n.svg&&(n.uncache?(N=e.getBBox(),c=n.xOrigin-N.x+`px `+(n.yOrigin-N.y)+`px`,M=``):M=!t&&e.getAttribute(`data-svg-origin`),Q_(e,M||c,!!M||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==q_&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?t_(D,E)*$g:0,_=O||k?t_(O,k)*$g+m:0,_&&(p*=Math.abs(Math.cos(_*e_))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(L=S[6],te=S[7],F=S[8],I=S[9],ee=S[10],ne=S[11],l=S[12],u=S[13],d=S[14],C=t_(L,ee),h=C*$g,C&&(w=Math.cos(-C),T=Math.sin(-C),M=A*w+F*T,N=j*w+I*T,P=L*w+ee*T,F=A*-T+F*w,I=j*-T+I*w,ee=L*-T+ee*w,ne=te*-T+ne*w,A=M,j=N,L=P),C=t_(-O,ee),g=C*$g,C&&(w=Math.cos(-C),T=Math.sin(-C),M=E*w-F*T,N=D*w-I*T,P=O*w-ee*T,ne=k*T+ne*w,E=M,D=N,O=P),C=t_(D,E),m=C*$g,C&&(w=Math.cos(C),T=Math.sin(C),M=E*w+D*T,N=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=M,A=N),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=pm(Math.sqrt(E*E+D*D+O*O)),p=pm(Math.sqrt(j*j+L*L)),C=t_(A,j),_=Math.abs(C)>2e-4?C*$g:0,y=ne?1/(ne<0?-ne:ne):0),n.svg&&(M=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Y_(O_(e,b_)),M&&e.setAttribute(`transform`,M))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=pm(f),n.scaleY=pm(p),n.rotation=pm(m)+o,n.rotationX=pm(h)+o,n.rotationY=pm(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[x_]=ev(c)),n.xOffset=n.yOffset=0,n.force3D=sp.force3D,n.renderTransform=n.svg?sv:E_?ov:nv,n.uncache=0,n},ev=function(e){return(e=e.split(` `))[0]+` `+e[1]},tv=function(e,t,n){var r=nh(t);return pm(parseFloat(t)+parseFloat(B_(e,`x`,n+`px`,r)))+r},nv=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,ov(e,t)},rv=`0deg`,iv=`0px`,av=`) `,ov=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==rv||l!==rv)){var x=parseFloat(l)*e_,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*e_,w=Math.cos(x),a=tv(_,a,S*w*-v),o=tv(_,o,-Math.sin(x)*-v),s=tv(_,s,C*w*-v+v)}h!==iv&&(y+=`perspective(`+h+av),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==iv||o!==iv||s!==iv)&&(y+=s!==iv||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+av),c!==rv&&(y+=`rotate(`+c+av),l!==rv&&(y+=`rotateY(`+l+av),u!==rv&&(y+=`rotateX(`+u+av),(d!==rv||f!==rv)&&(y+=`skew(`+d+`, `+f+av),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+av),_.style[b_]=y||`translate(0, 0)`},sv=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=e_,c*=e_,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=e_,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=pm(b),x=pm(x),S=pm(S),C=pm(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=B_(f,`x`,a,`px`),y=B_(f,`y`,o,`px`)),(p||m||h||g)&&(v=pm(v+p-(p*b+m*S)+h),y=pm(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=pm(v+r/100*w.width),y=pm(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[b_]=w)},cv=function(e,t,n,r,i){var a=360,o=bp(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?$g:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*n_)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*n_)%a-~~(s/a)*a)),e._pt=u=new kg(e._pt,t,n,r,s,c_),u.e=c,u.u=`deg`,e._props.push(n),u},lv=function(e,t){for(var n in t)e[n]=t[n];return e},uv=function(e,t,n){var r=lv({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[b_]=t,o=$_(n,1),I_(n,b_),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[b_],a[b_]=t,o=$_(n,1),a[b_]=c),Qg)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=nh(c),p=nh(l),u=f===p?parseFloat(c):B_(n,s,c,p),d=parseFloat(l),e._pt=new kg(e._pt,o,s,u,d-u,s_),e._pt.u=p||0,e._props.push(s));lv(o,r)};fm(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});K_[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return V_(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var dv={name:`css`,register:j_,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in qg||j_(),this.styles=this.styles||T_(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(im[m]&&ag(m,t,n,r,e,i)))){if(f=typeof l,p=K_[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=bh(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,Fh.lastIndex=0,Fh.test(c)||(h=nh(c),g=nh(l),g?h!==g&&(c=B_(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],bp(c)&&~c.indexOf(`random(`)&&(c=bh(c)),nh(c+``)||c===`auto`||(c+=sp.units[m]||nh(V_(e,m))||``),(c+``).charAt(1)===`=`&&(c=V_(e,m))):c=V_(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in o_&&(m===`autoAlpha`&&(d===1&&V_(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),L_(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=o_[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in Qg,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=O_(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=O_(e,`perspective`),T?e.style.perspective=T:I_(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||$_(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new kg(this._pt,o,b_,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new kg(this._pt,b,`scaleY`,b.scaleY,(_?hm(b.scaleY,_+u):u)-b.scaleY||0,s_),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(x_,0,o[x_]),l=W_(l),b.svg?Q_(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&L_(this,b,`zOrigin`,b.zOrigin,g),L_(this,o,m,ev(c),ev(l)));continue}else if(m===`svgOrigin`){Q_(e,l,1,x,0,this);continue}else if(m in J_){cv(this,b,m,d,_?hm(d,_+l):l);continue}else if(m===`smoothOrigin`){L_(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){uv(this,l,e);continue}}else m in o||(m=A_(m)||m);if(v||(u||u===0)&&(d||d===0)&&!a_.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=nh(l)||(m in sp.units?sp.units[m]:h),h!==g&&(d=B_(e,m,c,g)),this._pt=new kg(this._pt,v?b:o,m,d,(_?hm(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?d_:s_),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=u_):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=l_);else if(m in o)H_.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){qp(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Og(this)},render:function(e,t){if(t.tween._time||!Xg())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:V_,aliases:o_,getSetter:function(e,t,n){var r=o_[t];return r&&r.indexOf(`,`)<0&&(t=r),t in Qg&&t!==x_&&(e._gsap.x||V_(e,`x`))?n&&Yg===n?t===`scale`?__:g_:(Yg=n||{})&&(t===`scale`?v_:y_):e.style&&!Cp(e.style[t])?m_:~t.indexOf(`-`)?h_:bg(e,t)},core:{_removeProperty:I_,_getMatrix:Z_}};Ug.utils.checkPrefix=A_,Ug.core.getStyleSaver=T_,(function(e,t,n,r){var i=fm(e+`,`+t+`,`+n,function(e){Qg[e]=1});fm(t,function(e){sp.units[e]=`deg`,J_[e]=1}),o_[i[13]]=e+`,`+t,fm(r,function(e){var t=e.split(`:`);o_[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),fm(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){sp.units[e]=`px`}),Ug.registerPlugin(dv);var fv=Ug.registerPlugin(dv)||Ug;fv.core.Tween;function pv(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function mv(e,t,n){return t&&pv(e.prototype,t),n&&pv(e,n),e}var hv,gv,_v,vv,yv,bv,xv,Sv,Cv,wv,Tv,Ev,Dv,Ov=function(){return hv||typeof window<`u`&&(hv=window.gsap)&&hv.registerPlugin&&hv},kv=1,Av=[],jv=[],Mv=[],Nv=Date.now,Pv=function(e,t){return t},Fv=function(){var e=Cv.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,jv),r.push.apply(r,Mv),jv=n,Mv=r,Pv=function(e,n){return t[e](n)}},Iv=function(e,t){return~Mv.indexOf(e)&&Mv[Mv.indexOf(e)+1][t]},Lv=function(e){return!!~wv.indexOf(e)},Rv=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:r!==!1,capture:!!i})},zv=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Bv=`scrollLeft`,Vv=`scrollTop`,Hv=function(){return Tv&&Tv.isPressed||jv.cache++},Uv=function(e,t){var n=function n(r){if(r||r===0){kv&&_v.history.scrollRestoration!==`manual`&&(_v.history.scrollRestoration=`manual`);var i=Tv&&Tv.isPressed;r=n.v=Math.round(r)||(Tv&&Tv.iOS?1:0),e(r),n.cacheID=jv.cache,i&&Pv(`ss`,r)}else(t||jv.cache!==n.cacheID||Pv(`ref`))&&(n.cacheID=jv.cache,n.v=e());return n.v+n.offset};return n.offset=0,e&&n},Wv={s:Bv,p:`left`,p2:`Left`,os:`right`,os2:`Right`,d:`width`,d2:`Width`,a:`x`,sc:Uv(function(e){return arguments.length?_v.scrollTo(e,Gv.sc()):_v.pageXOffset||vv[Bv]||yv[Bv]||bv[Bv]||0})},Gv={s:Vv,p:`top`,p2:`Top`,os:`bottom`,os2:`Bottom`,d:`height`,d2:`Height`,a:`y`,op:Wv,sc:Uv(function(e){return arguments.length?_v.scrollTo(Wv.sc(),e):_v.pageYOffset||vv[Vv]||yv[Vv]||bv[Vv]||0})},Kv=function(e,t){return(t&&t._ctx&&t._ctx.selector||hv.utils.toArray)(e)[0]||(typeof e==`string`&&hv.config().nullTargetWarn!==!1?console.warn(`Element not found:`,e):null)},qv=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Jv=function(e,t){var n=t.s,r=t.sc;Lv(e)&&(e=vv.scrollingElement||yv);var i=jv.indexOf(e),a=r===Gv.sc?1:2;!~i&&(i=jv.push(e)-1),jv[i+a]||Rv(e,`scroll`,Hv);var o=jv[i+a],s=o||(jv[i+a]=Uv(Iv(e,n),!0)||(Lv(e)?r:Uv(function(t){return arguments.length?e[n]=t:e[n]})));return s.target=e,o||(s.smooth=hv.getProperty(e,`scrollBehavior`)===`smooth`),s},Yv=function(e,t,n){var r=e,i=e,a=Nv(),o=a,s=t||50,c=Math.max(500,s*3),l=function(e,t){var c=Nv();t||c-a>s?(i=r,r=e,o=a,a=c):n?r+=e:r=i+(e-i)/(c-o)*(a-o)};return{update:l,reset:function(){i=r=n?0:r,o=a=0},getVelocity:function(e){var t=o,s=i,u=Nv();return(e||e===0)&&e!==r&&l(e),a===o||u-o>c?0:(r+(n?s:-s))/((n?u:a)-t)*1e3}}},Xv=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Zv=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Qv=function(){Cv=hv.core.globals().ScrollTrigger,Cv&&Cv.core&&Fv()},$v=function(e){return hv=e||Ov(),!gv&&hv&&typeof document<`u`&&document.body&&(_v=window,vv=document,yv=vv.documentElement,bv=vv.body,wv=[_v,vv,yv,bv],hv.utils.clamp,Dv=hv.core.context||function(){},Sv=`onpointerenter`in bv?`pointer`:`mouse`,xv=ey.isTouch=_v.matchMedia&&_v.matchMedia(`(hover: none), (pointer: coarse)`).matches?1:`ontouchstart`in _v||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ev=ey.eventTypes=(`ontouchstart`in yv?`touchstart,touchmove,touchcancel,touchend`:`onpointerdown`in yv?`pointerdown,pointermove,pointercancel,pointerup`:`mousedown,mousemove,mouseup,mouseup`).split(`,`),setTimeout(function(){return kv=0},500),gv=1),Cv||Qv(),gv};Wv.op=Gv,jv.cache=0;var ey=function(){function e(e){this.init(e)}var t=e.prototype;return t.init=function(e){gv||$v(hv)||console.warn(`Please gsap.registerPlugin(Observer)`),Cv||Qv();var t=e.tolerance,n=e.dragMinimum,r=e.type,i=e.target,a=e.lineHeight,o=e.debounce,s=e.preventDefault,c=e.onStop,l=e.onStopDelay,u=e.ignore,d=e.wheelSpeed,f=e.event,p=e.onDragStart,m=e.onDragEnd,h=e.onDrag,g=e.onPress,_=e.onRelease,v=e.onRight,y=e.onLeft,b=e.onUp,x=e.onDown,S=e.onChangeX,C=e.onChangeY,w=e.onChange,T=e.onToggleX,E=e.onToggleY,D=e.onHover,O=e.onHoverEnd,k=e.onMove,A=e.ignoreCheck,j=e.isNormalizer,M=e.onGestureStart,N=e.onGestureEnd,P=e.onWheel,F=e.onEnable,I=e.onDisable,ee=e.onClick,te=e.scrollSpeed,ne=e.capture,L=e.allowClicks,re=e.lockAxis,ie=e.onLockAxis;this.target=i=Kv(i)||yv,this.vars=e,u&&=hv.utils.toArray(u),t||=1e-9,n||=0,d||=1,te||=1,r||=`wheel,touch,pointer`,o=o!==!1,a||=parseFloat(_v.getComputedStyle(bv).lineHeight)||22;var R,z,B,ae,oe,se,ce,V=this,le=0,ue=0,de=e.passive||!s&&e.passive!==!1,fe=Jv(i,Wv),pe=Jv(i,Gv),me=fe(),he=pe(),ge=~r.indexOf(`touch`)&&!~r.indexOf(`pointer`)&&Ev[0]===`pointerdown`,_e=Lv(i),H=i.ownerDocument||vv,ve=[0,0,0],U=[0,0,0],ye=0,be=function(){return ye=Nv()},xe=function(e,t){return(V.event=e)&&u&&qv(e.target,u)||t&&ge&&e.pointerType!==`touch`||A&&A(e,t)},Se=function(){V._vx.reset(),V._vy.reset(),z.pause(),c&&c(V)},Ce=function(){var e=V.deltaX=Zv(ve),n=V.deltaY=Zv(U),r=Math.abs(e)>=t,i=Math.abs(n)>=t;w&&(r||i)&&w(V,e,n,ve,U),r&&(v&&V.deltaX>0&&v(V),y&&V.deltaX<0&&y(V),S&&S(V),T&&V.deltaX<0!=le<0&&T(V),le=V.deltaX,ve[0]=ve[1]=ve[2]=0),i&&(x&&V.deltaY>0&&x(V),b&&V.deltaY<0&&b(V),C&&C(V),E&&V.deltaY<0!=ue<0&&E(V),ue=V.deltaY,U[0]=U[1]=U[2]=0),(ae||B)&&(k&&k(V),B&&=(p&&B===1&&p(V),h&&h(V),0),ae=!1),se&&!(se=!1)&&ie&&ie(V),oe&&=(P(V),!1),R=0},we=function(e,t,n){ve[n]+=e,U[n]+=t,V._vx.update(e),V._vy.update(t),o?R||=requestAnimationFrame(Ce):Ce()},Te=function(e,t){re&&!ce&&(V.axis=ce=Math.abs(e)>Math.abs(t)?`x`:`y`,se=!0),ce!==`y`&&(ve[2]+=e,V._vx.update(e,!0)),ce!==`x`&&(U[2]+=t,V._vy.update(t,!0)),o?R||=requestAnimationFrame(Ce):Ce()},W=function(e){if(!xe(e,1)){e=Xv(e,s);var t=e.clientX,r=e.clientY,i=t-V.x,a=r-V.y,o=V.isDragging;V.x=t,V.y=r,(o||(i||a)&&(Math.abs(V.startX-t)>=n||Math.abs(V.startY-r)>=n))&&(B||=o?2:1,o||(V.isDragging=!0),Te(i,a))}},Ee=V.onPress=function(e){xe(e,1)||e&&e.button||(V.axis=ce=null,z.pause(),V.isPressed=!0,e=Xv(e),le=ue=0,V.startX=V.x=e.clientX,V.startY=V.y=e.clientY,V._vx.reset(),V._vy.reset(),Rv(j?i:H,Ev[1],W,de,!0),V.deltaX=V.deltaY=0,g&&g(V))},De=V.onRelease=function(e){if(!xe(e,1)){zv(j?i:H,Ev[1],W,!0);var t=!isNaN(V.y-V.startY),n=V.isDragging,r=n&&(Math.abs(V.x-V.startX)>3||Math.abs(V.y-V.startY)>3),a=Xv(e);!r&&t&&(V._vx.reset(),V._vy.reset(),s&&L&&hv.delayedCall(.08,function(){if(Nv()-ye>300&&!e.defaultPrevented){if(e.target.click)e.target.click();else if(H.createEvent){var t=H.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,_v,1,a.screenX,a.screenY,a.clientX,a.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(t)}}})),V.isDragging=V.isGesturing=V.isPressed=!1,c&&n&&!j&&z.restart(!0),B&&Ce(),m&&n&&m(V),_&&_(V,r)}},G=function(e){return e.touches&&e.touches.length>1&&(V.isGesturing=!0)&&M(e,V.isDragging)},K=function(){return(V.isGesturing=!1)||N(V)},Oe=function(e){if(!xe(e)){var t=fe(),n=pe();we((t-me)*te,(n-he)*te,1),me=t,he=n,c&&z.restart(!0)}},q=function(e){if(!xe(e)){e=Xv(e,s),P&&(oe=!0);var t=(e.deltaMode===1?a:e.deltaMode===2?_v.innerHeight:1)*d;we(e.deltaX*t,e.deltaY*t,0),c&&!j&&z.restart(!0)}},ke=function(e){if(!xe(e)){var t=e.clientX,n=e.clientY,r=t-V.x,i=n-V.y;V.x=t,V.y=n,ae=!0,c&&z.restart(!0),(r||i)&&Te(r,i)}},Ae=function(e){V.event=e,D(V)},je=function(e){V.event=e,O(V)},Me=function(e){return xe(e)||Xv(e,s)&&ee(V)};z=V._dc=hv.delayedCall(l||.25,Se).pause(),V.deltaX=V.deltaY=0,V._vx=Yv(0,50,!0),V._vy=Yv(0,50,!0),V.scrollX=fe,V.scrollY=pe,V.isDragging=V.isGesturing=V.isPressed=!1,Dv(this),V.enable=function(e){return V.isEnabled||(Rv(_e?H:i,`scroll`,Hv),r.indexOf(`scroll`)>=0&&Rv(_e?H:i,`scroll`,Oe,de,ne),r.indexOf(`wheel`)>=0&&Rv(i,`wheel`,q,de,ne),(r.indexOf(`touch`)>=0&&xv||r.indexOf(`pointer`)>=0)&&(Rv(i,Ev[0],Ee,de,ne),Rv(H,Ev[2],De),Rv(H,Ev[3],De),L&&Rv(i,`click`,be,!0,!0),ee&&Rv(i,`click`,Me),M&&Rv(H,`gesturestart`,G),N&&Rv(H,`gestureend`,K),D&&Rv(i,Sv+`enter`,Ae),O&&Rv(i,Sv+`leave`,je),k&&Rv(i,Sv+`move`,ke)),V.isEnabled=!0,V.isDragging=V.isGesturing=V.isPressed=ae=B=!1,V._vx.reset(),V._vy.reset(),me=fe(),he=pe(),e&&e.type&&Ee(e),F&&F(V)),V},V.disable=function(){V.isEnabled&&(Av.filter(function(e){return e!==V&&Lv(e.target)}).length||zv(_e?H:i,`scroll`,Hv),V.isPressed&&(V._vx.reset(),V._vy.reset(),zv(j?i:H,Ev[1],W,!0)),zv(_e?H:i,`scroll`,Oe,ne),zv(i,`wheel`,q,ne),zv(i,Ev[0],Ee,ne),zv(H,Ev[2],De),zv(H,Ev[3],De),zv(i,`click`,be,!0),zv(i,`click`,Me),zv(H,`gesturestart`,G),zv(H,`gestureend`,K),zv(i,Sv+`enter`,Ae),zv(i,Sv+`leave`,je),zv(i,Sv+`move`,ke),V.isEnabled=V.isPressed=V.isDragging=!1,I&&I(V))},V.kill=V.revert=function(){V.disable();var e=Av.indexOf(V);e>=0&&Av.splice(e,1),Tv===V&&(Tv=0)},Av.push(V),j&&Lv(i)&&(Tv=V),V.enable(f)},mv(e,[{key:`velocityX`,get:function(){return this._vx.getVelocity()}},{key:`velocityY`,get:function(){return this._vy.getVelocity()}}]),e}();ey.version=`3.15.1`,ey.create=function(e){return new ey(e)},ey.register=$v,ey.getAll=function(){return Av.slice()},ey.getById=function(e){return Av.filter(function(t){return t.vars.id===e})[0]},Ov()&&hv.registerPlugin(ey);var $,ty,ny,ry,iy,ay,oy,sy,cy,ly,uy,dy,fy,py,my,hy,gy,_y,vy,yy,by,xy,Sy,Cy,wy,Ty,Ey,Dy,Oy,ky,Ay,jy,My,Ny,Py=1,Fy=Date.now,Iy=Fy(),Ly=0,Ry=0,zy=function(e,t,n){var r=tb(e)&&(e.substr(0,6)===`clamp(`||e.indexOf(`max`)>-1);return n[`_`+t+`Clamp`]=r,r?e.substr(6,e.length-7):e},By=function(e,t){return t&&(!tb(e)||e.substr(0,6)!==`clamp(`)?`clamp(`+e+`)`:e},Vy=function e(){return Ry&&requestAnimationFrame(e)},Hy=function(){return py=1},Uy=function(){return py=0},Wy=function(e){return e},Gy=function(e){return Math.round(e*1e5)/1e5||0},Ky=function(){return typeof window<`u`},qy=function(){return $||Ky()&&($=window.gsap)&&$.registerPlugin&&$},Jy=function(e){return!!~oy.indexOf(e)},Yy=function(e){return(e===`Height`?Ay:ny[`inner`+e])||iy[`client`+e]||ay[`client`+e]},Xy=function(e){return Iv(e,`getBoundingClientRect`)||(Jy(e)?function(){return Cx.width=ny.innerWidth,Cx.height=Ay,Cx}:function(){return Eb(e)})},Zy=function(e,t,n){var r=n.d,i=n.d2,a=n.a;return(a=Iv(e,`getBoundingClientRect`))?function(){return a()[r]}:function(){return(t?Yy(i):e[`client`+i])||0}},Qy=function(e,t){return!t||~Mv.indexOf(e)?Xy(e):function(){return Cx}},$y=function(e,t){var n=t.s,r=t.d2,i=t.d,a=t.a;return Math.max(0,(n=`scroll`+r)&&(a=Iv(e,n))?a()-Xy(e)()[i]:Jy(e)?(iy[n]||ay[n])-Yy(r):e[n]-e[`offset`+r])},eb=function(e,t){for(var n=0;n<vy.length;n+=3)(!t||~t.indexOf(vy[n+1]))&&e(vy[n],vy[n+1],vy[n+2])},tb=function(e){return typeof e==`string`},nb=function(e){return typeof e==`function`},rb=function(e){return typeof e==`number`},ib=function(e){return typeof e==`object`},ab=function(e,t,n){return e&&e.progress(+!t)&&n&&e.pause()},ob=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},sb=Math.abs,cb=`left`,lb=`top`,ub=`right`,db=`bottom`,fb=`width`,pb=`height`,mb=`Right`,hb=`Left`,gb=`Top`,_b=`Bottom`,vb=`padding`,yb=`margin`,bb=`Width`,xb=`Height`,Sb=`px`,Cb=function(e){return ny.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},wb=function(e){var t=Cb(e).position;e.style.position=t===`absolute`||t===`fixed`?t:`relative`},Tb=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Eb=function(e,t){var n=t&&Cb(e)[my]!==`matrix(1, 0, 0, 1, 0, 0)`&&$.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},Db=function(e,t){var n=t.d2;return e[`offset`+n]||e[`client`+n]||0},Ob=function(e){var t=[],n=e.labels,r=e.duration(),i;for(i in n)t.push(n[i]/r);return t},kb=function(e){return function(t){return $.utils.snap(Ob(e),t)}},Ab=function(e){var t=$.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(e,t){return e-t});return n?function(e,r,i){i===void 0&&(i=.001);var a;if(!r)return t(e);if(r>0){for(e-=i,a=0;a<n.length;a++)if(n[a]>=e)return n[a];return n[a-1]}for(a=n.length,e+=i;a--;)if(n[a]<=e)return n[a];return n[0]}:function(n,r,i){i===void 0&&(i=.001);var a=t(n);return!r||Math.abs(a-n)<i||a-n<0==r<0?a:t(r<0?n-e:n+e)}},jb=function(e){return function(t,n){return Ab(Ob(e))(t,n.direction)}},Mb=function(e,t,n,r){return n.split(`,`).forEach(function(n){return e(t,n,r)})},Nb=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:!r,capture:!!i})},Pb=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Fb=function(e,t,n){n&&=n.wheelHandler,n&&(e(t,`wheel`,n),e(t,`touchmove`,n))},Ib={startColor:`green`,endColor:`red`,indent:0,fontSize:`16px`,fontWeight:`normal`},Lb={toggleActions:`play`,anticipatePin:0},Rb={top:0,left:0,center:.5,bottom:1,right:1},zb=function(e,t){if(tb(e)){var n=e.indexOf(`=`),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf(`%`)>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Rb?Rb[e]*t:~e.indexOf(`%`)?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Bb=function(e,t,n,r,i,a,o,s){var c=i.startColor,l=i.endColor,u=i.fontSize,d=i.indent,f=i.fontWeight,p=ry.createElement(`div`),m=Jy(n)||Iv(n,`pinType`)===`fixed`,h=e.indexOf(`scroller`)!==-1,g=m?ay:n.tagName===`IFRAME`?n.contentDocument.body:n,_=e.indexOf(`start`)!==-1,v=_?c:l,y=`border-color:`+v+`;font-size:`+u+`;color:`+v+`;font-weight:`+f+`;pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;`;return y+=`position:`+((h||s)&&m?`fixed;`:`absolute;`),(h||s||!m)&&(y+=(r===Gv?ub:db)+`:`+(a+parseFloat(d))+`px;`),o&&(y+=`box-sizing:border-box;text-align:left;width:`+o.offsetWidth+`px;`),p._isStart=_,p.setAttribute(`class`,`gsap-marker-`+e+(t?` marker-`+t:``)),p.style.cssText=y,p.innerText=t||t===0?e+`-`+t:e,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p[`offset`+r.op.d2],Vb(p,0,r,_),p},Vb=function(e,t,n,r){var i={display:`block`},a=n[r?`os2`:`p2`],o=n[r?`p2`:`os2`];e._isFlipped=r,i[n.a+`Percent`]=r?-100:0,i[n.a]=r?`1px`:0,i[`border`+a+bb]=1,i[`border`+o+bb]=0,i[n.p]=t+`px`,$.set(e,i)},Hb=[],Ub={},Wb,Gb=function(){return Fy()-Ly>34&&(Wb||=requestAnimationFrame(mx))},Kb=function(){(!Sy||!Sy.isPressed||Sy.startX>ay.clientWidth)&&(jv.cache++,Sy?Wb||=requestAnimationFrame(mx):mx(),Ly||Qb(`scrollStart`),Ly=Fy())},qb=function(){Ty=ny.innerWidth,wy=ny.innerHeight},Jb=function(e){jv.cache++,(e===!0||!fy&&!xy&&!ry.fullscreenElement&&!ry.webkitFullscreenElement&&(!Cy||Ty!==ny.innerWidth||Math.abs(ny.innerHeight-wy)>ny.innerHeight*.25))&&sy.restart(!0)},Yb={},Xb=[],Zb=function e(){return Pb(Ax,`scrollEnd`,e)||ux(!0)},Qb=function(e){return Yb[e]&&Yb[e].map(function(e){return e()})||Xb},$b=[],ex=function(e){for(var t=0;t<$b.length;t+=5)(!e||$b[t+4]&&$b[t+4].query===e)&&($b[t].style.cssText=$b[t+1],$b[t].getBBox&&$b[t].setAttribute(`transform`,$b[t+2]||``),$b[t+3].uncache=1)},tx=function(){jv.cache++,jv.forEach(function(e){return nb(e)&&(e.rec=e())})},nx=function(e,t){var n;for(hy=0;hy<Hb.length;hy++)n=Hb[hy],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));jy=!0,t&&ex(t),t||Qb(`revert`)},rx=function(e,t){jv.cache++,(t||!ix)&&jv.forEach(function(e){return nb(e)&&e.cacheID++&&(e.rec=0)}),tb(e)&&(Oy=e,ny.history.scrollRestoration!==e&&(ny.history.scrollRestoration=e))},ix,ax=0,ox,sx=function(){if(ox!==ax){var e=ox=ax;requestAnimationFrame(function(){return e===ax&&ux(!0)})}},cx=function(){ay.appendChild(ky),Ay=!Sy&&ky.offsetHeight||ny.innerHeight,ay.removeChild(ky)},lx=function(e){return cy(`.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end`).forEach(function(t){return t.style.display=e?`none`:`block`})},ux=function(e,t){if(iy=ry.documentElement,ay=ry.body,oy=[ny,ry,iy,ay],Ly&&!e&&!jy)Nb(Ax,`scrollEnd`,Zb);else{cx(),ix=Ax.isRefreshing=!0,jy||tx();var n=Qb(`refreshInit`);yy&&Ax.sort(),t||nx(),jv.forEach(function(e){nb(e)&&(e.smooth&&(e.target.style.scrollBehavior=`auto`),e(0))}),Hb.slice(0).forEach(function(e){return e.refresh()}),jy=!1,Hb.forEach(function(e){if(e._subPinOffset&&e.pin){var t=e.vars.horizontal?`offsetWidth`:`offsetHeight`,n=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-n),e.refresh()}}),My=1,lx(!0),Hb.forEach(function(e){var t=$y(e.scroller,e._dir),n=e.vars.end===`max`||e._endClamp&&e.end>t,r=e._startClamp&&e.start>=t;(n||r)&&e.setPositions(r?t-1:e.start,n?Math.max(r?t:e.start+1,t):e.end,!0)}),lx(!1),My=0,n.forEach(function(e){return e&&e.render&&e.render(-1)}),jv.forEach(function(e){nb(e)&&(e.smooth&&requestAnimationFrame(function(){return e.target.style.scrollBehavior=`smooth`}),e.rec&&e(e.rec))}),rx(Oy,1),sy.pause(),ax++,ix=2,mx(2),Hb.forEach(function(e){return nb(e.vars.onRefresh)&&e.vars.onRefresh(e)}),ix=Ax.isRefreshing=!1,Qb(`refresh`)}},dx=0,fx=1,px,mx=function(e){if(e===2||!ix&&!jy){Ax.isUpdating=!0,px&&px.update(0);var t=Hb.length,n=Fy(),r=n-Iy>=50,i=t&&Hb[0].scroll();if(fx=dx>i?-1:1,ix||(dx=i),r&&(Ly&&!py&&n-Ly>200&&(Ly=0,Qb(`scrollEnd`)),uy=Iy,Iy=n),fx<0){for(hy=t;hy-->0;)Hb[hy]&&Hb[hy].update(0,r);fx=1}else for(hy=0;hy<t;hy++)Hb[hy]&&Hb[hy].update(0,r);Ax.isUpdating=!1}Wb=0},hx=[cb,lb,db,ub,yb+_b,yb+mb,yb+gb,yb+hb,`display`,`flexShrink`,`float`,`zIndex`,`gridColumnStart`,`gridColumnEnd`,`gridRowStart`,`gridRowEnd`,`gridArea`,`justifySelf`,`alignSelf`,`placeSelf`,`order`],gx=hx.concat([fb,pb,`boxSizing`,`max`+bb,`max`+xb,`position`,yb,vb,vb+gb,vb+mb,vb+_b,vb+hb]),_x=function(e,t,n){bx(n);var r=e._gsap;if(r.spacerIsNative)bx(r.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1},vx=function(e,t,n,r){if(!e._gsap.swappedIn){for(var i=hx.length,a=t.style,o=e.style,s;i--;)s=hx[i],a[s]=n[s];a.position=n.position===`absolute`?`absolute`:`relative`,n.display===`inline`&&(a.display=`inline-block`),o[db]=o[ub]=`auto`,a.flexBasis=n.flexBasis||`auto`,a.overflow=`visible`,a.boxSizing=`border-box`,a[fb]=Db(e,Wv)+Sb,a[pb]=Db(e,Gv)+Sb,a[vb]=o[yb]=o[lb]=o[cb]=`0`,bx(r),o[fb]=o[`max`+bb]=n[fb],o[pb]=o[`max`+xb]=n[pb],o[vb]=n[vb],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},yx=/([A-Z])/g,bx=function(e){if(e){var t=e.t.style,n=e.length,r=0,i,a;for((e.t._gsap||$.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],i=e[r],a?t[i]=a:t[i]&&t.removeProperty(i.replace(yx,`-$1`).toLowerCase())}},xx=function(e){for(var t=gx.length,n=e.style,r=[],i=0;i<t;i++)r.push(gx[i],n[gx[i]]);return r.t=e,r},Sx=function(e,t,n){for(var r=[],i=e.length,a=n?8:0,o;a<i;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},Cx={left:0,top:0},wx=function(e,t,n,r,i,a,o,s,c,l,u,d,f,p){nb(e)&&(e=e(s)),tb(e)&&e.substr(0,3)===`max`&&(e=d+(e.charAt(4)===`=`?zb(`0`+e.substr(3),n):0));var m=f?f.time():0,h,g,_;if(f&&f.seek(0),isNaN(e)||(e=+e),rb(e))f&&(e=$.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),o&&Vb(o,n,r,!0);else{nb(t)&&(t=t(s));var v=(e||`0`).split(` `),y,b,x,S;_=Kv(t,s)||ay,y=Eb(_)||{},y&&(y.left||y.top)||Cb(_).display!==`none`||(S=_.style.display,_.style.display=`block`,y=Eb(_),S?_.style.display=S:_.style.removeProperty(`display`)),b=zb(v[0],y[r.d]),x=zb(v[1]||`0`,n),e=y[r.p]-c[r.p]-l+b+i-x,o&&Vb(o,x,r,n-x<20||o._isStart&&x>20),n-=n-x}if(p&&(s[p]=e||-.001,e<0&&(e=0)),a){var C=e+n,w=a._isStart;h=`scroll`+r.d2,Vb(a,C,r,w&&C>20||!w&&(u?Math.max(ay[h],iy[h]):a.parentNode[h])<=C+1),u&&(c=Eb(o),u&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+Sb))}return f&&_&&(h=Eb(_),f.seek(d),g=Eb(_),f._caScrollDist=h[r.p]-g[r.p],e=e/f._caScrollDist*d),f&&f.seek(m),f?e:Math.round(e)},Tx=/(webkit|moz|length|cssText|inset)/i,Ex=function(e,t,n,r){if(e.parentNode!==t){var i=e.style,a,o;if(t===ay){for(a in e._stOrig=i.cssText,o=Cb(e),o)!+a&&!Tx.test(a)&&o[a]&&typeof i[a]==`string`&&a!==`0`&&(i[a]=o[a]);i.top=n,i.left=r}else i.cssText=e._stOrig;$.core.getCache(e).uncache=1,t.appendChild(e)}},Dx=function(e,t,n){var r=t,i=r;return function(t){var a=Math.round(e());return a!==r&&a!==i&&Math.abs(a-r)>3&&Math.abs(a-i)>3&&(t=a,n&&n()),i=r,r=Math.round(t),r}},Ox=function(e,t,n){var r={};r[t.p]=`+=`+n,$.set(e,r)},kx=function(e,t){var n=Jv(e,t),r=`_scroll`+t.p2,i=function t(i,a,o,s,c){var l=t.tween,u=a.onComplete,d={};o||=n();var f=Dx(n,o,function(){l.kill(),t.tween=0});return c=s&&c||0,s||=i-o,l&&l.kill(),a[r]=i,a.inherit=!1,a.modifiers=d,d[r]=function(){return f(o+s*l.ratio+c*l.ratio*l.ratio)},a.onUpdate=function(){jv.cache++,t.tween&&mx()},a.onComplete=function(){t.tween=0,u&&u.call(l)},l=t.tween=$.to(e,a),l};return e[r]=n,n.wheelHandler=function(){return i.tween&&i.tween.kill()&&(i.tween=0)},Nb(e,`wheel`,n.wheelHandler),Ax.isTouch&&Nb(e,`touchmove`,n.wheelHandler),i},Ax=function(){function e(t,n){ty||e.register($)||console.warn(`Please gsap.registerPlugin(ScrollTrigger)`),Dy(this),this.init(t,n)}var t=e.prototype;return t.init=function(t,n){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ry)this.update=this.refresh=this.kill=Wy;else{t=Tb(tb(t)||rb(t)||t.nodeType?{trigger:t}:t,Lb);var r=t,i=r.onUpdate,a=r.toggleClass,o=r.id,s=r.onToggle,c=r.onRefresh,l=r.scrub,u=r.trigger,d=r.pin,f=r.pinSpacing,p=r.invalidateOnRefresh,m=r.anticipatePin,h=r.onScrubComplete,g=r.onSnapComplete,_=r.once,v=r.snap,y=r.pinReparent,b=r.pinSpacer,x=r.containerAnimation,S=r.fastScrollEnd,C=r.preventOverlaps,w=t.horizontal||t.containerAnimation&&t.horizontal!==!1?Wv:Gv,T=!l&&l!==0,E=Kv(t.scroller||ny),D=$.core.getCache(E),O=Jy(E),k=(`pinType`in t?t.pinType:Iv(E,`pinType`)||O&&`fixed`)===`fixed`,A=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],j=T&&t.toggleActions.split(` `),M=`markers`in t?t.markers:Lb.markers,N=O?0:parseFloat(Cb(E)[`border`+w.p2+bb])||0,P=this,F=t.onRefreshInit&&function(){return t.onRefreshInit(P)},I=Zy(E,O,w),ee=Qy(E,O),te=0,ne=0,L=0,re=Jv(E,w),ie,R,z,B,ae,oe,se,ce,V,le,ue,de,fe,pe,me,he,ge,_e,H,ve,U,ye,be,xe,Se,Ce,we,Te,W,Ee,De,G,K,Oe,q,ke,Ae,je,Me;if(P._startClamp=P._endClamp=!1,P._dir=w,m*=45,P.scroller=E,P.scroll=x?x.time.bind(x):re,B=re(),jy&&re.rec==null&&(re.rec=B),P.vars=t,n||=t.animation,`refreshPriority`in t&&(yy=1,t.refreshPriority===-9999&&(px=P)),D.tweenScroll=D.tweenScroll||{top:kx(E,Gv),left:kx(E,Wv)},P.tweenTo=ie=D.tweenScroll[w.p],P.scrubDuration=function(e){K=rb(e)&&e,K?G?G.duration(e):G=$.to(n,{ease:`expo`,totalProgress:`+=0`,inherit:!1,duration:K,paused:!0,onComplete:function(){return h&&h(P)}}):(G&&G.progress(1).kill(),G=0)},n&&(n.vars.lazy=!1,n._initted&&!P.isReverted||n.vars.immediateRender!==!1&&t.immediateRender!==!1&&n.duration()&&n.render(0,!0,!0),P.animation=n.pause(),n.scrollTrigger=P,P.scrubDuration(l),Ee=0,o||=n.vars.id),v&&((!ib(v)||v.push)&&(v={snapTo:v}),`scrollBehavior`in ay.style&&$.set(O?[ay,iy]:E,{scrollBehavior:`auto`}),jv.forEach(function(e){return nb(e)&&e.target===(O?ry.scrollingElement||iy:E)&&(e.smooth=!1)}),z=nb(v.snapTo)?v.snapTo:v.snapTo===`labels`?kb(n):v.snapTo===`labelsDirectional`?jb(n):v.directional===!1?$.utils.snap(v.snapTo):function(e,t){return Ab(v.snapTo)(e,Fy()-ne<500?0:t.direction)},Oe=v.duration||{min:.1,max:2},Oe=ib(Oe)?ly(Oe.min,Oe.max):ly(Oe,Oe),q=$.delayedCall(v.delay||K/2||.1,function(){var e=re(),t=Fy()-ne<500,r=ie.tween;if((t||Math.abs(P.getVelocity())<10)&&!r&&!py&&te!==e){var i=(e-oe)/pe,a=n&&!T?n.totalProgress():i,o=t?0:(a-De)/(Fy()-uy)*1e3||0,s=$.utils.clamp(-i,1-i,sb(o/2)*o/.185),c=i+(v.inertia===!1?0:s),l,u,d=v,f=d.onStart,p=d.onInterrupt,m=d.onComplete;if(l=z(c,P),rb(l)||(l=c),u=Math.max(0,Math.round(oe+l*pe)),e<=se&&e>=oe&&u!==e){if(r&&!r._initted&&r.data<=sb(u-e))return;v.inertia===!1&&(s=l-i),ie(u,{duration:Oe(sb(Math.max(sb(c-a),sb(l-a))*.185/o/.05||0)),ease:v.ease||`power3`,data:sb(u-e),onInterrupt:function(){return q.restart(!0)&&p&&ob(P,p)},onComplete:function(){P.update(),te=re(),n&&!T&&(G?G.resetTo(`totalProgress`,l,n._tTime/n._tDur):n.progress(l)),Ee=De=n&&!T?n.totalProgress():P.progress,g&&g(P),m&&ob(P,m)}},e,s*pe,u-e-s*pe),f&&ob(P,f,ie.tween)}}else P.isActive&&te!==e&&q.restart(!0)}).pause()),o&&(Ub[o]=P),u=P.trigger=Kv(u||d!==!0&&d),Me=u&&u._gsap&&u._gsap.stRevert,Me&&=Me(P),d=d===!0?u:Kv(d),tb(a)&&(a={targets:u,className:a}),d&&(f===!1||f===yb||(f=!f&&d.parentNode&&d.parentNode.style&&Cb(d.parentNode).display===`flex`?!1:vb),P.pin=d,R=$.core.getCache(d),R.spacer?me=R.pinState:(b&&(b=Kv(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),R.spacerIsNative=!!b,b&&(R.spacerState=xx(b))),R.spacer=_e=b||ry.createElement(`div`),_e.classList.add(`pin-spacer`),o&&_e.classList.add(`pin-spacer-`+o),R.pinState=me=xx(d)),t.force3D!==!1&&$.set(d,{force3D:!0}),P.spacer=_e=R.spacer,W=Cb(d),xe=W[f+w.os2],ve=$.getProperty(d),U=$.quickSetter(d,w.a,Sb),vx(d,_e,W),ge=xx(d)),M){de=ib(M)?Tb(M,Ib):Ib,le=Bb(`scroller-start`,o,E,w,de,0),ue=Bb(`scroller-end`,o,E,w,de,0,le),H=le[`offset`+w.op.d2];var Ne=Kv(Iv(E,`content`)||E);ce=this.markerStart=Bb(`start`,o,Ne,w,de,H,0,x),V=this.markerEnd=Bb(`end`,o,Ne,w,de,H,0,x),x&&(je=$.quickSetter([ce,V],w.a,Sb)),!k&&!(Mv.length&&Iv(E,`fixedMarkers`)===!0)&&(wb(O?ay:E),$.set([le,ue],{force3D:!0}),Ce=$.quickSetter(le,w.a,Sb),Te=$.quickSetter(ue,w.a,Sb))}if(x){var Pe=x.vars.onUpdate,Fe=x.vars.onUpdateParams;x.eventCallback(`onUpdate`,function(){P.update(0,0,1),Pe&&Pe.apply(x,Fe||[])})}if(P.previous=function(){return Hb[Hb.indexOf(P)-1]},P.next=function(){return Hb[Hb.indexOf(P)+1]},P.revert=function(e,t){if(!t)return P.kill(!0);var r=e!==!1||!P.enabled,i=fy;r!==P.isReverted&&(r&&(ke=Math.max(re(),P.scroll.rec||0),L=P.progress,Ae=n&&n.progress()),ce&&[ce,V,le,ue].forEach(function(e){return e.style.display=r?`none`:`block`}),r&&(fy=P,P.update(r)),!d||y&&P.isActive||(r?_x(d,_e,me):vx(d,_e,Cb(d),Se)),r||P.update(r),fy=i,P.isReverted=r)},P.refresh=function(r,i,a,o){if(!fy&&P.enabled||i){if(d&&r&&Ly)Nb(e,`scrollEnd`,Zb);else{!ix&&F&&F(P),fy=P,ie.tween&&!a&&(ie.tween.kill(),ie.tween=0),G&&G.pause(),p&&n&&(n.revert({kill:!1}).invalidate(),n.getChildren?n.getChildren(!0,!0,!1).forEach(function(e){return e.vars.immediateRender&&e.render(0,!0,!0)}):n.vars.immediateRender&&n.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var s=I(),l=ee(),m=x?x.duration():$y(E,w),h=pe<=.01||!pe,g=0,_=o||0,v=ib(a)?a.end:t.end,b=t.endTrigger||u,S=ib(a)?a.start:t.start||(t.start===0||!u?0:d?`0 0`:`0 100%`),C=P.pinnedContainer=t.pinnedContainer&&Kv(t.pinnedContainer,P),D=u&&Math.max(0,Hb.indexOf(P))||0,A=D,j,R,z,de,H,U,xe,Ce,Te,W,Ee,De,K;for(M&&ib(a)&&(De=$.getProperty(le,w.p),K=$.getProperty(ue,w.p));A-->0;)U=Hb[A],U.end||U.refresh(0,1)||(fy=P),xe=U.pin,xe&&(xe===u||xe===d||xe===C)&&!U.isReverted&&(W||=[],W.unshift(U),U.revert(!0,!0)),U!==Hb[A]&&(D--,A--);for(nb(S)&&(S=S(P)),S=zy(S,`start`,P),oe=wx(S,u,s,w,re(),ce,le,P,l,N,k,m,x,P._startClamp&&`_startClamp`)||(d?-.001:0),nb(v)&&(v=v(P)),tb(v)&&!v.indexOf(`+=`)&&(~v.indexOf(` `)?v=(tb(S)?S.split(` `)[0]:``)+v:(g=zb(v.substr(2),s),v=tb(S)?S:(x?$.utils.mapRange(0,x.duration(),x.scrollTrigger.start,x.scrollTrigger.end,oe):oe)+g,b=u)),v=zy(v,`end`,P),se=Math.max(oe,wx(v||(b?`100% 0`:m),b,s,w,re()+g,V,ue,P,l,N,k,m,x,P._endClamp&&`_endClamp`))||-.001,g=0,A=D;A--;)U=Hb[A]||{},xe=U.pin,xe&&U.start-U._pinPush<=oe&&!x&&U.end>0&&(j=U.end-(P._startClamp?Math.max(0,U.start):U.start),(xe===u&&U.start-U._pinPush<oe||xe===C)&&isNaN(S)&&(g+=j*(1-U.progress)),xe===d&&(_+=j));if(oe+=g,se+=g,P._startClamp&&(P._startClamp+=g),P._endClamp&&!ix&&(P._endClamp=se||-.001,se=Math.min(se,$y(E,w))),pe=se-oe||(oe-=.01)&&.001,h&&(L=$.utils.clamp(0,1,$.utils.normalize(oe,se,ke))),P._pinPush=_,ce&&g&&(j={},j[w.a]=`+=`+g,C&&(j[w.p]=`-=`+re()),$.set([ce,V],j)),d&&!(My&&P.end>=$y(E,w)))j=Cb(d),de=w===Gv,z=re(),ye=parseFloat(ve(w.a))+_,!m&&se>1&&(Ee=(O?ry.scrollingElement||iy:E).style,Ee={style:Ee,value:Ee[`overflow`+w.a.toUpperCase()]},O&&Cb(ay)[`overflow`+w.a.toUpperCase()]!==`scroll`&&(Ee.style[`overflow`+w.a.toUpperCase()]=`scroll`)),vx(d,_e,j),ge=xx(d),R=Eb(d,!0),Ce=k&&Jv(E,de?Wv:Gv)(),f?(Se=[f+w.os2,pe+_+Sb],Se.t=_e,A=f===vb?Db(d,w)+pe+_:0,A&&(Se.push(w.d,A+Sb),_e.style.flexBasis!==`auto`&&(_e.style.flexBasis=A+Sb)),bx(Se),C&&Hb.forEach(function(e){e.pin===C&&e.vars.pinSpacing!==!1&&(e._subPinOffset=!0)}),k&&re(ke)):(A=Db(d,w),A&&_e.style.flexBasis!==`auto`&&(_e.style.flexBasis=A+Sb)),k&&(H={top:R.top+(de?z-oe:Ce)+Sb,left:R.left+(de?Ce:z-oe)+Sb,boxSizing:`border-box`,position:`fixed`},H[fb]=H[`max`+bb]=Math.ceil(R.width)+Sb,H[pb]=H[`max`+xb]=Math.ceil(R.height)+Sb,H[yb]=H[yb+gb]=H[yb+mb]=H[yb+_b]=H[yb+hb]=`0`,H[vb]=j[vb],H[vb+gb]=j[vb+gb],H[vb+mb]=j[vb+mb],H[vb+_b]=j[vb+_b],H[vb+hb]=j[vb+hb],he=Sx(me,H,y),ix&&re(0)),n?(Te=n._initted,by(1),n.render(n.duration(),!0,!0),be=ve(w.a)-ye+pe+_,we=Math.abs(pe-be)>1,k&&we&&he.splice(he.length-2,2),n.render(0,!0,!0),Te||n.invalidate(!0),n.parent||n.totalTime(n.totalTime()),by(0)):be=pe,Ee&&(Ee.value?Ee.style[`overflow`+w.a.toUpperCase()]=Ee.value:Ee.style.removeProperty(`overflow-`+w.a));else if(u&&re()&&!x)for(R=u.parentNode;R&&R!==ay;)R._pinOffset&&(oe-=R._pinOffset,se-=R._pinOffset),R=R.parentNode;W&&W.forEach(function(e){return e.revert(!1,!0)}),P.start=oe,P.end=se,B=ae=ix?ke:re(),x||ix||jy||(B<ke&&re(ke),P.scroll.rec=0),P.revert(!1,!0),ne=Fy(),q&&(te=-1,q.restart(!0)),fy=0,n&&T&&(n._initted||Ae)&&n.progress()!==Ae&&n.progress(Ae||0,!0).render(n.time(),!0,!0),(h||L!==P.progress||x||p||n&&!n._initted)&&(n&&!T&&(n._initted||L||n.vars.immediateRender!==!1)&&n.totalProgress(x&&oe<-.001&&!L?$.utils.normalize(oe,se,0):L,!0),P.progress=h||(B-oe)/pe===L?0:L),d&&f&&(_e._pinOffset=Math.round(P.progress*be)),G&&G.invalidate(),isNaN(De)||(De-=$.getProperty(le,w.p),K-=$.getProperty(ue,w.p),Ox(le,w,De),Ox(ce,w,De-(o||0)),Ox(ue,w,K),Ox(V,w,K-(o||0))),h&&!ix&&P.update(),c&&!ix&&!fe&&(fe=!0,c(P),fe=!1)}}},P.getVelocity=function(){return(re()-ae)/(Fy()-uy)*1e3||0},P.endAnimation=function(){ab(P.callbackAnimation),n&&(G?G.progress(1):n.paused()?T||ab(n,P.direction<0,1):ab(n,n.reversed()))},P.labelToScroll=function(e){return n&&n.labels&&(oe||P.refresh()||oe)+n.labels[e]/n.duration()*pe||0},P.getTrailing=function(e){var t=Hb.indexOf(P),n=P.direction>0?Hb.slice(0,t).reverse():Hb.slice(t+1);return(tb(e)?n.filter(function(t){return t.vars.preventOverlaps===e}):n).filter(function(e){return P.direction>0?e.end<=oe:e.start>=se})},P.update=function(e,t,r){if(!x||r||e){var o=ix===!0?ke:P.scroll(),c=e?0:(o-oe)/pe,u=c<0?0:c>1?1:c||0,p=P.progress,h,g,b,D,O,M,N,F;if(t&&(ae=B,B=x?re():o,v&&(De=Ee,Ee=n&&!T?n.totalProgress():u)),m&&d&&!fy&&!Py&&Ly&&(!u&&oe<o+(o-ae)/(Fy()-uy)*m?u=1e-4:u===1&&se>o+(o-ae)/(Fy()-uy)*m&&(u=.9999)),u!==p&&P.enabled){if(h=P.isActive=!!u&&u<1,g=!!p&&p<1,M=h!==g,O=M||!!u!=!!p,P.direction=u>p?1:-1,P.progress=u,O&&!fy&&(b=u&&!p?0:u===1?1:p===1?2:3,T&&(D=!M&&j[b+1]!==`none`&&j[b+1]||j[b],F=n&&(D===`complete`||D===`reset`||D in n))),C&&(M||F)&&(F||l||!n)&&(nb(C)?C(P):P.getTrailing(C).forEach(function(e){return e.endAnimation()})),T||(G&&!fy&&!Py?(G._dp._time-G._start!==G._time&&G.render(G._dp._time-G._start),G.resetTo?G.resetTo(`totalProgress`,u,n._tTime/n._tDur):(G.vars.totalProgress=u,G.invalidate().restart())):n&&n.totalProgress(u,!!(fy&&(ne||e)))),d){if(e&&f&&(_e.style[f+w.os2]=xe),!k)U(Gy(ye+be*u));else if(O){if(N=!e&&u>p&&se+1>o&&o+1>=$y(E,w),y){if(!e&&(h||N)){var I=Eb(d,!0),ee=o-oe;Ex(d,ay,I.top+(w===Gv?ee:0)+Sb,I.left+(w===Gv?0:ee)+Sb)}else Ex(d,_e)}bx(h||N?he:ge),we&&u<1&&h||U(ye+(u===1&&!N?be:0))}}v&&!ie.tween&&!fy&&!Py&&q.restart(!0),a&&(M||_&&u&&(u<1||!Ny))&&cy(a.targets).forEach(function(e){return e.classList[h||_?`add`:`remove`](a.className)}),i&&!T&&!e&&i(P),O&&!fy?(T&&(F&&(D===`complete`?n.pause().totalProgress(1):D===`reset`?n.restart(!0).pause():D===`restart`?n.restart(!0):n[D]()),i&&i(P)),(M||!Ny)&&(s&&M&&ob(P,s),A[b]&&ob(P,A[b]),_&&(u===1?P.kill(!1,1):A[b]=0),M||(b=u===1?1:3,A[b]&&ob(P,A[b]))),S&&!h&&Math.abs(P.getVelocity())>(rb(S)?S:2500)&&(ab(P.callbackAnimation),G?G.progress(1):ab(n,D===`reverse`?1:!u,1))):T&&i&&!fy&&i(P)}if(Te){var te=x?o/x.duration()*(x._caScrollDist||0):o;Ce(te+ +!!le._isFlipped),Te(te)}je&&je(-o/x.duration()*(x._caScrollDist||0))}},P.enable=function(t,n){P.enabled||(P.enabled=!0,Nb(E,`resize`,Jb),O||Nb(E,`scroll`,Kb),F&&Nb(e,`refreshInit`,F),t!==!1&&(P.progress=L=0,B=ae=te=re()),n!==!1&&P.refresh())},P.getTween=function(e){return e&&ie?ie.tween:G},P.setPositions=function(e,t,n,r){if(x){var i=x.scrollTrigger,a=x.duration(),o=i.end-i.start;e=i.start+o*e/a,t=i.start+o*t/a}P.refresh(!1,!1,{start:By(e,n&&!!P._startClamp),end:By(t,n&&!!P._endClamp)},r),P.update()},P.adjustPinSpacing=function(e){if(Se&&e){var t=Se.indexOf(w.d)+1;Se[t]=parseFloat(Se[t])+e+Sb,Se[1]=parseFloat(Se[1])+e+Sb,bx(Se)}},P.disable=function(t,n){if(t!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,n||G&&G.pause(),ke=0,R&&(R.uncache=1),F&&Pb(e,`refreshInit`,F),q&&(q.pause(),ie.tween&&ie.tween.kill()&&(ie.tween=0)),!O)){for(var r=Hb.length;r--;)if(Hb[r].scroller===E&&Hb[r]!==P)return;Pb(E,`resize`,Jb),O||Pb(E,`scroll`,Kb)}},P.kill=function(e,r){P.disable(e,r),G&&!r&&G.kill(),o&&delete Ub[o];var i=Hb.indexOf(P);i>=0&&Hb.splice(i,1),i===hy&&fx>0&&hy--,i=0,Hb.forEach(function(e){return e.scroller===P.scroller&&(i=1)}),i||ix||jy||(P.scroll.rec=0),n&&(n.scrollTrigger=null,e&&n.revert({kill:!1}),r||n.kill()),ce&&[ce,V,le,ue].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),px===P&&(px=0),d&&(R&&(R.uncache=1),i=0,Hb.forEach(function(e){return e.pin===d&&i++}),i||(R.spacer=0)),t.onKill&&t.onKill(P)},Hb.push(P),P.enable(!1,!1),Me&&Me(P),n&&n.add&&!pe){var Ie=P.update;P.update=function(){P.update=Ie,jv.cache++,oe||se||P.refresh()},$.delayedCall(.01,P.update),pe=.01,oe=se=0}else P.refresh();d&&sx()}},e.register=function(t){return ty||=($=t||qy(),Ky()&&window.document&&e.enable(),Ry),ty},e.defaults=function(e){if(e)for(var t in e)Lb[t]=e[t];return Lb},e.disable=function(e,t){Ry=0,Hb.forEach(function(n){return n[t?`kill`:`disable`](e)}),Pb(ny,`wheel`,Kb),Pb(ry,`scroll`,Kb),clearInterval(dy),Pb(ry,`touchcancel`,Wy),Pb(ay,`touchstart`,Wy),Mb(Pb,ry,`pointerdown,touchstart,mousedown`,Hy),Mb(Pb,ry,`pointerup,touchend,mouseup`,Uy),sy.kill(),eb(Pb);for(var n=0;n<jv.length;n+=3)Fb(Pb,jv[n],jv[n+1]),Fb(Pb,jv[n],jv[n+2])},e.enable=function(){if(ny=window,ry=document,iy=ry.documentElement,ay=ry.body,$){if(cy=$.utils.toArray,ly=$.utils.clamp,Dy=$.core.context||Wy,by=$.core.suppressOverwrites||Wy,Oy=ny.history.scrollRestoration||`auto`,dx=ny.pageYOffset||0,$.core.globals(`ScrollTrigger`,e),ay){Ry=1,ky=document.createElement(`div`),ky.style.height=`100vh`,ky.style.position=`absolute`,cx(),Vy(),ey.register($),e.isTouch=ey.isTouch,Ey=ey.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Cy=ey.isTouch===1,Nb(ny,`wheel`,Kb),oy=[ny,ry,iy,ay],$.matchMedia?(e.matchMedia=function(e){var t=$.matchMedia(),n;for(n in e)t.add(n,e[n]);return t},$.addEventListener(`matchMediaInit`,function(){tx(),nx()}),$.addEventListener(`matchMediaRevert`,function(){return ex()}),$.addEventListener(`matchMedia`,function(){ux(0,1),Qb(`matchMedia`)}),$.matchMedia().add(`(orientation: portrait)`,function(){return qb(),qb})):console.warn(`Requires GSAP 3.11.0 or later`),qb(),Nb(ry,`scroll`,Kb);var t=ay.hasAttribute(`style`),n=ay.style,r=n.borderTopStyle,i=$.core.Animation.prototype,a,o;for(i.revert||Object.defineProperty(i,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle=`solid`,a=Eb(ay),Gv.m=Math.round(a.top+Gv.sc())||0,Wv.m=Math.round(a.left+Wv.sc())||0,r?n.borderTopStyle=r:n.removeProperty(`border-top-style`),t||(ay.setAttribute(`style`,``),ay.removeAttribute(`style`)),dy=setInterval(Gb,250),$.delayedCall(.5,function(){return Py=0}),Nb(ry,`touchcancel`,Wy),Nb(ay,`touchstart`,Wy),Mb(Nb,ry,`pointerdown,touchstart,mousedown`,Hy),Mb(Nb,ry,`pointerup,touchend,mouseup`,Uy),my=$.utils.checkPrefix(`transform`),gx.push(my),ty=Fy(),sy=$.delayedCall(.2,ux).pause(),vy=[ry,`visibilitychange`,function(){var e=ny.innerWidth,t=ny.innerHeight;ry.hidden?(gy=e,_y=t):(gy!==e||_y!==t)&&Jb()},ry,`DOMContentLoaded`,ux,ny,`load`,ux,ny,`resize`,Jb],eb(Nb),Hb.forEach(function(e){return e.enable(0,1)}),o=0;o<jv.length;o+=3)Fb(Pb,jv[o],jv[o+1]),Fb(Pb,jv[o],jv[o+2])}else ry&&ry.addEventListener(`DOMContentLoaded`,function t(){e.enable(),ry.removeEventListener(`DOMContentLoaded`,t)})}},e.config=function(t){`limitCallbacks`in t&&(Ny=!!t.limitCallbacks);var n=t.syncInterval;n&&clearInterval(dy)||(dy=n)&&setInterval(Gb,n),`ignoreMobileResize`in t&&(Cy=e.isTouch===1&&t.ignoreMobileResize),`autoRefreshEvents`in t&&(eb(Pb)||eb(Nb,t.autoRefreshEvents||`none`),xy=(t.autoRefreshEvents+``).indexOf(`resize`)===-1)},e.scrollerProxy=function(e,t){var n=Kv(e),r=jv.indexOf(n),i=Jy(n);~r&&jv.splice(r,i?6:2),t&&(i?Mv.unshift(ny,t,ay,t,iy,t):Mv.unshift(n,t))},e.clearMatchMedia=function(e){Hb.forEach(function(t){return t._ctx&&t._ctx.query===e&&t._ctx.kill(!0,!0)})},e.isInViewport=function(e,t,n){var r=(tb(e)?Kv(e):e).getBoundingClientRect(),i=r[n?fb:pb]*t||0;return n?r.right-i>0&&r.left+i<ny.innerWidth:r.bottom-i>0&&r.top+i<ny.innerHeight},e.positionInViewport=function(e,t,n){tb(e)&&(e=Kv(e));var r=e.getBoundingClientRect(),i=r[n?fb:pb],a=t==null?i/2:t in Rb?Rb[t]*i:~t.indexOf(`%`)?parseFloat(t)*i/100:parseFloat(t)||0;return n?(r.left+a)/ny.innerWidth:(r.top+a)/ny.innerHeight},e.killAll=function(e){if(Hb.slice(0).forEach(function(e){return e.vars.id!==`ScrollSmoother`&&e.kill()}),e!==!0){var t=Yb.killAll||[];Yb={},t.forEach(function(e){return e()})}},e}();Ax.version=`3.15.1`,Ax.saveStyles=function(e){return e?cy(e).forEach(function(e){if(e&&e.style){var t=$b.indexOf(e);t>=0&&$b.splice(t,5),$b.push(e,e.style.cssText,e.getBBox&&e.getAttribute(`transform`),$.core.getCache(e),Dy())}}):$b},Ax.revert=function(e,t){return nx(!e,t)},Ax.create=function(e,t){return new Ax(e,t)},Ax.refresh=function(e){return e?Jb(!0):(ty||Ax.register())&&ux(!0)},Ax.update=function(e){return++jv.cache&&mx(e===!0?2:0)},Ax.clearScrollMemory=rx,Ax.maxScroll=function(e,t){return $y(e,t?Wv:Gv)},Ax.getScrollFunc=function(e,t){return Jv(Kv(e),t?Wv:Gv)},Ax.getById=function(e){return Ub[e]},Ax.getAll=function(){return Hb.filter(function(e){return e.vars.id!==`ScrollSmoother`})},Ax.isScrolling=function(){return!!Ly},Ax.snapDirectional=Ab,Ax.addEventListener=function(e,t){var n=Yb[e]||(Yb[e]=[]);~n.indexOf(t)||n.push(t)},Ax.removeEventListener=function(e,t){var n=Yb[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},Ax.batch=function(e,t){var n=[],r={},i=t.interval||.016,a=t.batchMax||1e9,o=function(e,t){var n=[],r=[],o=$.delayedCall(i,function(){t(n,r),n=[],r=[]}).pause();return function(e){n.length||o.restart(!0),n.push(e.trigger),r.push(e),a<=n.length&&o.progress(1)}},s;for(s in t)r[s]=s.substr(0,2)===`on`&&nb(t[s])&&s!==`onRefreshInit`?o(s,t[s]):t[s];return nb(a)&&(a=a(),Nb(Ax,`refresh`,function(){return a=t.batchMax()})),cy(e).forEach(function(e){var t={};for(s in r)t[s]=r[s];t.trigger=e,n.push(Ax.create(t))}),n};var jx=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Mx=function e(t,n){n===!0?t.style.removeProperty(`touch-action`):t.style.touchAction=n===!0?`auto`:n?`pan-`+n+(ey.isTouch?` pinch-zoom`:``):`none`,t===iy&&e(ay,n)},Nx={auto:1,scroll:1},Px=function(e){var t=e.event,n=e.target,r=e.axis,i=(t.changedTouches?t.changedTouches[0]:t).target,a=i._gsap||$.core.getCache(i),o=Fy(),s;if(!a._isScrollT||o-a._isScrollT>2e3){for(;i&&i!==ay&&(i.scrollHeight<=i.clientHeight&&i.scrollWidth<=i.clientWidth||!(Nx[(s=Cb(i)).overflowY]||Nx[s.overflowX]));)i=i.parentNode;a._isScroll=i&&i!==n&&!Jy(i)&&(Nx[(s=Cb(i)).overflowY]||Nx[s.overflowX]),a._isScrollT=o}(a._isScroll||r===`x`)&&(t.stopPropagation(),t._gsapAllow=!0)},Fx=function(e,t,n,r){return ey.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r&&=Px,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Nb(ry,ey.eventTypes[0],Rx,!1,!0)},onDisable:function(){return Pb(ry,ey.eventTypes[0],Rx,!0)}})},Ix=/(input|label|select|textarea)/i,Lx,Rx=function(e){var t=Ix.test(e.target.tagName);(t||Lx)&&(e._gsapAllow=!0,Lx=t)},zx=function(e){ib(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type=`wheel,touch`),e.debounce=!!e.debounce,e.id=e.id||`normalizer`;var t=e,n=t.normalizeScrollX,r=t.momentum,i=t.allowNestedScroll,a=t.onRelease,o,s,c=Kv(e.target)||iy,l=$.core.globals().ScrollSmoother,u=l&&l.get(),d=Ey&&(e.content&&Kv(e.content)||u&&e.content!==!1&&!u.smooth()&&u.content()),f=Jv(c,Gv),p=Jv(c,Wv),m=1,h=(ey.isTouch&&ny.visualViewport?ny.visualViewport.scale*ny.visualViewport.width:ny.outerWidth)/ny.innerWidth,g=0,_=nb(r)?function(){return r(o)}:function(){return r||2.8},v,y,b=Fx(c,e.type,!0,i),x=function(){return y=!1},S=Wy,C=Wy,w=function(){s=$y(c,Gv),C=ly(+!!Ey,s),n&&(S=ly(0,$y(c,Wv))),v=ax},T=function(){d._gsap.y=Gy(parseFloat(d._gsap.y)+f.offset)+`px`,d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+parseFloat(d._gsap.y)+`, 0, 1)`,f.offset=f.cacheID=0},E=function(){if(y){requestAnimationFrame(x);var e=Gy(o.deltaY/2),t=C(f.v-e);if(d&&t!==f.v+f.offset){f.offset=t-f.v;var n=Gy((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+n+`, 0, 1)`,d._gsap.y=n+`px`,f.cacheID=jv.cache,mx()}return!0}f.offset&&T(),y=!0},D,O,k,A,j=function(){w(),D.isActive()&&D.vars.scrollY>s&&(f()>s?D.progress(1)&&f(s):D.resetTo(`scrollY`,s))};return d&&$.set(d,{y:`+=0`}),e.ignoreCheck=function(e){return Ey&&e.type===`touchmove`&&E(e)||m>1.05&&e.type!==`touchstart`||o.isGesturing||e.touches&&e.touches.length>1},e.onPress=function(){y=!1;var e=m;m=Gy((ny.visualViewport&&ny.visualViewport.scale||1)/h),D.pause(),e!==m&&Mx(c,m>1.01||!n&&`x`),O=p(),k=f(),w(),v=ax},e.onRelease=e.onGestureStart=function(e,t){if(f.offset&&T(),!t)A.restart(!0);else{jv.cache++;var r=_(),i,o;n&&(i=p(),o=i+r*.05*-e.velocityX/.227,r*=jx(p,i,o,$y(c,Wv)),D.vars.scrollX=S(o)),i=f(),o=i+r*.05*-e.velocityY/.227,r*=jx(f,i,o,$y(c,Gv)),D.vars.scrollY=C(o),D.invalidate().duration(r).play(.01),(Ey&&D.vars.scrollY>=s||i>=s-1)&&$.to({},{onUpdate:j,duration:r})}a&&a(e)},e.onWheel=function(){D._ts&&D.pause(),Fy()-g>1e3&&(v=0,g=Fy())},e.onChange=function(e,t,r,i,a){if(ax!==v&&w(),t&&n&&p(S(i[2]===t?O+(e.startX-e.x):p()+t-i[1])),r){f.offset&&T();var o=a[2]===r,s=o?k+e.startY-e.y:f()+r-a[1],c=C(s);o&&s!==c&&(k+=c-s),f(c)}(r||t)&&mx()},e.onEnable=function(){Mx(c,!n&&`x`),Ax.addEventListener(`refresh`,j),Nb(ny,`resize`,j),f.smooth&&=(f.target.style.scrollBehavior=`auto`,p.smooth=!1),b.enable()},e.onDisable=function(){Mx(c,!0),Pb(ny,`resize`,j),Ax.removeEventListener(`refresh`,j),b.kill()},e.lockAxis=e.lockAxis!==!1,o=new ey(e),o.iOS=Ey,Ey&&!f()&&f(1),Ey&&$.ticker.add(Wy),A=o._dc,D=$.to(o,{ease:`power4`,paused:!0,inherit:!1,scrollX:n?`+=0.1`:`+=0`,scrollY:`+=0.1`,modifiers:{scrollY:Dx(f,f(),function(){return D.pause()})},onUpdate:mx,onComplete:A.vars.onComplete}),o};Ax.sort=function(e){if(nb(e))return Hb.sort(e);var t=ny.pageYOffset||0;return Ax.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+ny.innerHeight}),Hb.sort(e||function(e,t){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})},Ax.observe=function(e){return new ey(e)},Ax.normalizeScroll=function(e){if(e===void 0)return Sy;if(e===!0&&Sy)return Sy.enable();if(e===!1)Sy&&Sy.kill(),Sy=e;else{var t=e instanceof ey?e:zx(e);return Sy&&Sy.target===t.target&&Sy.kill(),Jy(t.target)&&(Sy=t),t}},Ax.core={_getVelocityProp:Yv,_inputObserver:Fx,_scrollers:jv,_proxies:Mv,bridge:{ss:function(){Ly||Qb(`scrollStart`),Ly=Fy()},ref:function(){return fy}}},qy()&&$.registerPlugin(Ax);var Bx={cyan:`#22e4ff`,magenta:`#ff3dbb`,violet:`#8b5cf6`,night:`#060814`,ink:`#0b1022`,steel:`#151c33`,slate:`#2a3352`,text:`#e8ecff`,textSoft:`#a9b3d6`},Vx={cyan:[.15,2.3,2.8],magenta:[2.6,.25,1.6],violet:[1.3,.6,2.6]},Hx={cityTop:659246,cityMid:1710666,cityHorizon:3810656,spaceTop:66055,spaceMid:263702,spaceHorizon:724778,cavernFog:263695},Ux={cityTop:165063,cityMid:3718648,cityHorizon:12248829},Wx={value:0};function Gx(e=256){let t=new Float32Array(4096).map(()=>Math.random()),n=(e,n)=>t[(n%64+64)%64*64+(e%64+64)%64],r=e=>e*e*(3-2*e);function i(e,t){let i=Math.floor(e),a=Math.floor(t),o=r(e-i),s=r(t-a),c=n(i,a),l=n(i+1,a),u=n(i,a+1),d=n(i+1,a+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function a(e,t){let n=0,r=.5;for(let a=0;a<5;a++)n+=r*i(e,t),e=e*2.03+17.1,t=t*2.03+9.7,r*=.5;return n}let o=document.createElement(`canvas`);o.width=e,o.height=e;let s=o.getContext(`2d`),c=s.createImageData(e,e);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=n/e-.5,i=t/e-.5,o=Math.sqrt(r*r+i*i)*2,s=a(n/e*5,t/e*5),l=(1-wt.smoothstep(o,.2,.98))*(.35+s*1.1)-.18;l=Math.max(0,Math.min(1,l*1.5));let u=(t*e+n)*4,d=200+s*55;c.data[u]=d,c.data[u+1]=d,c.data[u+2]=d,c.data[u+3]=l*l*255}s.putImageData(c,0,0);let u=new ta(o);return u.colorSpace=``,u.generateMipmaps=!0,u.minFilter=l,u}function Kx({clusters:e,dayUniform:t,puffsPerCloud:n=12}){let r=[];e.forEach(e=>{let t=9*e.scale,i=6*e.scale,a=n+Math.floor(Math.random()*5),o=.55+Math.random()*.35,s=Math.random()*Math.PI*2;for(let n=0;n<a;n++){let n=Math.sqrt(Math.random())*.95,a=Math.random()*Math.PI*2,c=Math.cos(a)*n*t,l=Math.sin(a)*n*t*o,u=Math.max(0,1-n*n)*i*(.35+Math.random()*.65),d=Math.cos(s),f=Math.sin(s);r.push({x:e.x+c*d-l*f,y:e.y+u,z:e.z+c*f+l*d,size:e.scale*(6.5+Math.random()*5.5)*(1.15-n*.45),shade:u/i,rot:Math.random()*Math.PI*2,alpha:.55+Math.random()*.45})}}),r.sort((e,t)=>e.y-t.y);let i={map:{value:Gx()},uOpacity:{value:1},uKeep:{value:1},uDay:t},a=new Wo({uniforms:i,transparent:!0,depthWrite:!1,vertexShader:`
      attribute vec4 aPuff; // x : hauteur dans le nuage, y : rotation, z : opacité, w : tirage au sort
      uniform float uKeep;
      varying vec2 vUv;
      varying vec2 vCorner;
      varying float vShade;
      varying float vAlpha;
      varying float vDepth;
      void main() {
        // Mode léger : bouffée écartée, envoyée hors de l'écran (rien à dessiner)
        if (aPuff.w > uKeep) {
          gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
          return;
        }
        vec3 center = instanceMatrix[3].xyz;
        // Moins de bouffées : celles qui restent grossissent pour garder le volume
        float size = length(instanceMatrix[0].xyz) * mix(1.3, 1.0, uKeep);
        vec4 mv = modelViewMatrix * vec4(center, 1.0);
        // Carré toujours face à la caméra, tourné sur lui-même au hasard
        float c = cos(aPuff.y);
        float s = sin(aPuff.y);
        vec2 corner = position.xy;
        mv.xy += vec2(corner.x * c - corner.y * s, corner.x * s + corner.y * c) * size;
        vUv = uv;
        vCorner = corner;
        vShade = aPuff.x;
        vAlpha = aPuff.z;
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float uOpacity;
      uniform float uDay;
      varying vec2 vUv;
      varying vec2 vCorner;
      varying float vShade;
      varying float vAlpha;
      varying float vDepth;
      void main() {
        vec4 tex = texture2D(map, vUv);
        if (tex.a < 0.01) discard;
        // Éclairage : sommet du nuage et haut de chaque bouffée plus clairs,
        // relief interne donné par la texture
        float light = clamp(vShade * 0.7 + (vCorner.y + 0.5) * 0.35, 0.0, 1.0);
        light *= 0.72 + 0.28 * tex.r;

        // Nuit : ventre violet, sommet bleu lunaire, lueur des néons par-dessous
        vec3 night = mix(vec3(0.06, 0.05, 0.13), vec3(0.36, 0.40, 0.58), smoothstep(0.15, 0.95, light));
        night += vec3(0.15, 0.03, 0.13) * (1.0 - light) * (1.0 - vShade);
        // Jour : ventre gris-bleu, sommet blanc éclatant
        vec3 day = mix(vec3(0.56, 0.63, 0.76), vec3(1.0, 0.99, 0.97), smoothstep(0.1, 0.9, light));
        vec3 col = mix(night, day, uDay);

        // Disparaît près de la caméra (on traverse la brume) et à l'horizon
        float closeFade = smoothstep(4.0, 40.0, vDepth);
        float farFade = 1.0 - smoothstep(1150.0, 1450.0, vDepth);
        float a = tex.a * vAlpha * uOpacity * closeFade * farFade;
        gl_FragColor = vec4(col, a);
      }
    `}),o=new jo(1,1),s=new Float32Array(r.length*4),c=new Ei(o,a,r.length);c.frustumCulled=!1;let l=new Cn;return r.forEach((e,t)=>{l.position.set(e.x,e.y,e.z),l.scale.setScalar(e.size),l.updateMatrix(),c.setMatrixAt(t,l.matrix),s.set([e.shade,e.rot,e.alpha,Math.random()],t*4)}),o.setAttribute(`aPuff`,new vi(s,4)),c.instanceMatrix.needsUpdate=!0,{mesh:c,uniforms:i}}function qx(){let e=new Float32Array(65536).map(()=>Math.random()),t=e=>e*e*(3-2*e);function n(n,r,i){let a=Math.floor(n),o=Math.floor(r),s=t(n-a),c=t(r-o),l=(a%i+i)%i,u=(l+1)%i,d=(o%256+256)%256,f=(d+1)%256,p=e[d*256+l],m=e[d*256+u],h=e[f*256+l],g=e[f*256+u];return p+(m-p)*s+(h-p)*c+(p-m-h+g)*s*c}return function(e,t,r,i=4){let a=0,o=.5,s=r;for(let c=0;c<i;c++)a+=o*n(e*s,s/r*t,s),s*=2,t=t*2+3.1,o*=.5;return a}}function Jx(e){let t=document.createElement(`canvas`);t.width=256,t.height=1;let n=t.getContext(`2d`),r=n.createLinearGradient(0,0,256,0);return e.forEach(([e,t])=>r.addColorStop(e,t)),n.fillStyle=r,n.fillRect(0,0,256,1),n.getImageData(0,0,256,1).data}function Yx({stops:e,bands:n=9,turbulence:r=.06,storms:i=[],width:a=1024,height:o=512}){let s=qx(),c=Jx(e),l=document.createElement(`canvas`);l.width=a,l.height=o;let u=l.getContext(`2d`),d=u.createImageData(a,o),f=d.data,p=Array.from({length:64},()=>Math.random());for(let e=0;e<o;e++){let t=e/o;for(let o=0;o<a;o++){let l=o/a,u=t,d=0,m=null;for(let e of i){let t=l-e.u;t-=Math.round(t);let n=u-e.v,r=Math.sqrt((t/e.ru)**2+(n/e.rv)**2);if(r<2.2){let i=(e.swirl||2.5)*Math.max(0,1-r/2.2)**2,a=Math.cos(i),o=Math.sin(i),s=t*a-n*e.ru/e.rv*o,c=t*o*e.rv/e.ru+n*a;l=e.u+s,u=e.v+c;let f=1-wt.smoothstep(r,.55,1.05);f>d&&(d=f,m=e.color)}}l-=Math.floor(l);let h=(s(l,u*6,6)-.5)*r+(s(l,u*22+40,14,3)-.5)*r*.35,g=(u+h)*n,_=Math.floor(g),v=g-_,y=wt.clamp(u+h*.6,0,1),b=(p[(_%64+64)%64]-.5)*.22,x=wt.clamp(y+b*Math.sin(v*Math.PI),0,.999),S=Math.floor(x*255)*4,C=.78+s(l,u*90+7,24,3)*.42+Math.sin(v*Math.PI)*.06,w=c[S]*C,T=c[S+1]*C,E=c[S+2]*C;if(d>0){let e=.85+s(l,u*40,30,3)*.3;w+=(m[0]*e-w)*d,T+=(m[1]*e-T)*d,E+=(m[2]*e-E)*d}let D=wt.smoothstep(Math.abs(t-.5),.36,.5),O=(e*a+o)*4;f[O]=Math.min(255,w*(1-D*.45)),f[O+1]=Math.min(255,T*(1-D*.45)),f[O+2]=Math.min(255,E*(1-D*.4)),f[O+3]=255}}u.putImageData(d,0,0);let m=new ta(l);return m.colorSpace=Ae,m.anisotropy=8,m.wrapS=t,m}var Xx=`
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
`,Zx=`
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
`,Qx=`
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,$x=`
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
`,eS=`
  varying vec3 vWorldPos;
  varying float vR;
  void main() {
    vR = length(position.xy);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,tS=`
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
`;function nS({radius:e,texture:t,atmo:n,lightDir:r,ring:i}){let a=new wn,o=new X(n),s=new Y,c=new Y(0,0,1),l={map:{value:t},uLightDir:{value:r},uAtmo:{value:o},uOpacity:{value:0},uRingNormal:{value:c},uCenter:{value:s},uRing:{value:new J(i.inner,i.outer)}},u=new Z(new No(e,96,64),new Wo({uniforms:l,vertexShader:Xx,fragmentShader:Zx,transparent:!0})),d=new wn;d.rotation.z=i.tiltZ||.25,d.add(u),a.add(d);let f=1.12,p={uLightDir:{value:r},uAtmo:{value:o},uOpacity:{value:0},uEdge:{value:Math.sqrt(1-1/(f*f))}},m=new Z(new No(e*f,64,48),new Wo({uniforms:p,vertexShader:Qx,fragmentShader:$x,side:1,transparent:!0,depthWrite:!1,blending:2}));a.add(m);let h={uLightDir:{value:r},uColorA:{value:new X(i.colorA)},uColorB:{value:new X(i.colorB)},uOpacity:{value:0},uRadii:{value:new J(i.inner,i.outer)},uCenter:{value:s},uPlanetR:{value:e},uNormal:{value:c}},g=new Z(new Mo(i.inner,i.outer,160,1),new Wo({uniforms:h,vertexShader:eS,fragmentShader:tS,side:2,transparent:!0,depthWrite:!1}));g.rotation.x=i.tiltX,g.rotation.y=i.tiltY,a.add(g);let _=new Tt,v=new Y;function y(){a.updateMatrixWorld(),g.matrixWorld.decompose(s,_,v),c.set(0,0,1).applyQuaternion(_);let t=v.x;h.uPlanetR.value=e*t,l.uRing.value.set(i.inner*t,i.outer*t)}function b(e){l.uOpacity.value=e,p.uOpacity.value=e,h.uOpacity.value=e,a.visible=e>.001}return{group:a,mesh:u,update:y,setOpacity:b,get opacity(){return l.uOpacity.value}}}function rS(){return Yx({stops:[[0,`#0b1a3a`],[.18,`#1d4f9a`],[.35,`#3d86d6`],[.48,`#7cc4ec`],[.56,`#5aa6e0`],[.7,`#2a68b8`],[.85,`#173e85`],[1,`#0a1733`]],bands:11,turbulence:.05,storms:[{u:.3,v:.62,ru:.045,rv:.035,color:[18,36,92],swirl:3},{u:.72,v:.38,ru:.02,rv:.015,color:[210,235,255],swirl:2}]})}function iS(){return Yx({stops:[[0,`#3a1408`],[.12,`#7a3218`],[.25,`#c8784a`],[.36,`#e8c49a`],[.45,`#b44a24`],[.52,`#f0d2a8`],[.6,`#c0582c`],[.72,`#e2b07c`],[.84,`#8a3a1a`],[1,`#2e1006`]],bands:14,turbulence:.07,storms:[{u:.62,v:.6,ru:.06,rv:.035,color:[176,58,30],swirl:3.2}]})}function aS(e,t){let n=new wn,r={uTopColor:{value:new X(Hx.cityTop)},uMidColor:{value:new X(Hx.cityMid)},uHorizonColor:{value:new X(Hx.cityHorizon)},uSunDir:{value:new Y(.45,.72,.52).normalize()},uSunIntensity:{value:1},uSpaceFactor:{value:0},uTime:{value:0},uDay:Wx},i=new No(1480,64,48),a=new Wo({uniforms:r,side:1,depthWrite:!1,vertexShader:`
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform vec3 uTopColor;
      uniform vec3 uMidColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uSunDir;
      uniform float uSunIntensity;
      uniform float uSpaceFactor;
      uniform float uTime;
      uniform float uDay;
      varying vec3 vWorldPos;

      float hash(vec3 p) {
        p = fract(p * vec3(443.897, 441.423, 437.195));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
        );
      }

      float fbm(vec3 p) {
        float val = 0.0;
        float amp = 0.52;
        for (int i = 0; i < 5; i++) {
          val += amp * noise(p);
          p = p * 2.04 + vec3(13.1, 7.4, 5.2);
          amp *= 0.5;
        }
        return val;
      }

      void main() {
        vec3 dir = normalize(vWorldPos);
        float h = dir.y;

        vec3 col;
        if (h >= 0.0) {
          float t1 = smoothstep(0.0, 0.25, h);
          float t2 = smoothstep(0.18, 0.85, h);
          col = mix(uHorizonColor, uMidColor, t1);
          col = mix(col, uTopColor, t2);
        } else {
          col = uHorizonColor;
        }

        float sunAmt = max(dot(dir, uSunDir), 0.0);
        // Nuit : lune froide (halo discret + disque net)
        vec3 moon = vec3(0.55, 0.65, 1.0) * pow(sunAmt, 24.0) * 0.18
                  + vec3(0.92, 0.95, 1.0) * pow(sunAmt, 900.0) * 1.4;
        // Jour : soleil chaud (large halo + disque éblouissant)
        vec3 sun = vec3(1.0, 0.95, 0.88) * pow(sunAmt, 16.0) * 0.25
                 + vec3(1.0, 0.98, 0.92) * pow(sunAmt, 180.0) * 0.65;
        col += mix(moon, sun, uDay) * uSunIntensity;

        if (uSpaceFactor > 0.02) {
          // Limbe lumineux bleu-violet à l'horizon vu depuis le sommet
          float limb = exp(-abs(h + 0.015) * 15.0) * smoothstep(-0.22, 0.16, h);
          col += vec3(0.08, 0.36, 0.72) * limb * uSpaceFactor * 0.75;

          if (h > -0.15) {
            vec3 galCoord = vec3(
              dir.x * 0.72 + dir.y * 0.45 - dir.z * 0.52,
              dir.y * 0.82 - dir.x * 0.38,
              dir.z * 0.78 + dir.x * 0.42
            );

            float gx = galCoord.x * 3.1;
            float galacticPlane = exp(-(gx * gx));

            vec3 warp = vec3(
              fbm(galCoord * 3.2 + uTime * 0.004),
              fbm(galCoord * 3.2 + vec3(4.2)),
              fbm(galCoord * 3.2 + vec3(8.7))
            );
            float neb1 = fbm(galCoord * 4.5 + warp * 1.4);
            float neb2 = fbm(galCoord * 9.0 - warp * 1.1);
            float dustLane = smoothstep(0.44, 0.68, fbm(galCoord * 7.5 + vec3(2.1)));

            vec3 cyanNeb = vec3(0.04, 0.26, 0.48);
            vec3 violetNeb = vec3(0.28, 0.08, 0.42);
            vec3 coreGlow = vec3(0.55, 0.38, 0.62);

            vec3 galaxyColor = mix(cyanNeb, violetNeb, neb2);
            galaxyColor = mix(galaxyColor, coreGlow, smoothstep(0.55, 0.85, neb1) * galacticPlane);

            float intensity = galacticPlane * neb1 * (1.0 - dustLane * 0.72);
            col += galaxyColor * intensity * uSpaceFactor * 1.15;

            float microStar = hash(floor(dir * 520.0));
            if (microStar > 0.9965) {
              float twinkle = 0.65 + 0.35 * sin(uTime * 2.5 + microStar * 100.0);
              col += vec3(0.75, 0.88, 1.0) * twinkle * uSpaceFactor * 0.75;
            }
          }
        }

        gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
      }
    `});n.add(new Z(i,a));let o=new Ns(8226480,2761779,.9);e.add(o);let s=new Qs(11188479,.9);s.position.set(110,230,120),e.add(s);let c=new Qs(16727483,.45);c.position.set(-80,90,-70),e.add(c);let l=t*.52,u={uTime:{value:0},uOpacity:{value:.86},uDay:Wx},d=new Mo(34,1440,96,1);d.rotateX(-Math.PI/2);let f=new Z(d,new Wo({uniforms:u,transparent:!0,depthWrite:!1,side:2,vertexShader:`
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform float uOpacity;
      uniform float uDay;
      varying vec3 vWorldPos;

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise2D(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash21(i);
        float b = hash21(i + vec2(1.0, 0.0));
        float c = hash21(i + vec2(0.0, 1.0));
        float d = hash21(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm2D(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise2D(p);
          p = p * 2.05 + vec2(7.3, 11.1);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        float r = length(vWorldPos.xz);
        // Transparent près de la tour centrale pour voir la ville en contrebas, dense vers l'horizon
        float innerMask = smoothstep(34.0, 210.0, r);
        float outerFade = 1.0 - smoothstep(1150.0, 1435.0, r);

        vec2 uv = vWorldPos.xz * 0.0085 + vec2(uTime * 0.006, -uTime * 0.004);
        float n1 = fbm2D(uv);
        float n2 = fbm2D(uv * 2.3 - vec2(uTime * 0.008, 0.0));
        float billow = smoothstep(0.28, 0.78, n1 * 0.65 + n2 * 0.35);

        // Nuages de nuit : ventre éclairé par les néons de la ville, sommet lunaire
        vec3 shadowBlue = vec3(0.035, 0.04, 0.11);
        vec3 cottonPink = vec3(0.16, 0.05, 0.20);
        vec3 creamTop   = vec3(0.17, 0.20, 0.36);

        vec3 col = mix(shadowBlue, cottonPink, smoothstep(0.2, 0.65, n2));
        col = mix(col, creamTop, billow);
        // Trouées : la ville éclaire la brume par en dessous près de la tour
        col += vec3(0.18, 0.04, 0.16) * (1.0 - billow) * (1.0 - innerMask * 0.7);

        // Jour : nuages blancs ensoleillés
        vec3 dayCol = mix(vec3(0.62, 0.72, 0.88), vec3(0.95, 0.96, 0.99), billow);
        col = mix(col, dayCol, uDay);

        // Densité progressive : trouées nuageuses proches, mer coton continue au loin
        float density = mix(billow * 0.55, 0.45 + billow * 0.55, innerMask);
        float alpha = clamp(density * innerMask * outerFade * uOpacity, 0.0, 1.0);

        gl_FragColor = vec4(max(col, vec3(0.0)), alpha);
      }
    `}));f.position.y=l-1.5,n.add(f);let p=[];for(let e=0;e<300;e++){let t=40+((e+Math.random())/300)**.62*1330,n=e*2.399963+(Math.random()-.5)*.35,r=wt.smoothstep(t,300,1200)*(Math.random()*11);p.push({x:Math.cos(n)*t,y:l-3+(Math.random()-.45)*7+r,z:Math.sin(n)*t,scale:(1.05+Math.random()*1.45)*(1+t/460)})}let m=Kx({clusters:p,dayUniform:Wx,puffsPerCloud:11}),h=new wn;h.add(m.mesh),n.add(h);function g(e,t,r,i,a){let o=new Float32Array(e*3),s=new Float32Array(e*3);for(let n=0;n<e;n++){let e=Math.random()*Math.PI*2,i=Math.acos(Math.random()*.96+.02),a=t+Math.random()*(r-t);o[n*3]=a*Math.sin(i)*Math.cos(e),o[n*3+1]=a*Math.cos(i)+30,o[n*3+2]=a*Math.sin(i)*Math.sin(e);let c=Math.random();c>.78?(s[n*3]=.62,s[n*3+1]=.88,s[n*3+2]=1):c>.62?(s[n*3]=1,s[n*3+1]=.82,s[n*3+2]=.95):c>.52?(s[n*3]=1,s[n*3+1]=.95,s[n*3+2]=.75):(s[n*3]=1,s[n*3+1]=1,s[n*3+2]=1)}let c=new Dr;c.setAttribute(`position`,new fr(o,3)),c.setAttribute(`color`,new fr(s,3));let l=new qi({size:i,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1}),u=new Qi(c,l);return u.userData.thinnable=!0,n.add(u),{points:u,mat:l,baseOpacity:a}}let _=g(14500,820,1280,1.5,.9),v=g(3500,740,1140,3.1,1),y=[];for(let e=0;e<5;e++){let t=new Z(new aa(.35,.35,28),new Ur({color:14742270,transparent:!0,opacity:0}));n.add(t),y.push({mesh:t,timer:e*2.8,interval:6.5+e*2.2})}let b=new wn,x=new Y(320,340,-620);b.position.copy(x);let S=new Y(.75,.35,.55).normalize(),C=nS({radius:54,texture:rS(),atmo:5223679,lightDir:S,ring:{inner:70,outer:112,colorA:9417944,colorB:15135487,tiltX:Math.PI/2.6,tiltY:.35,tiltZ:.2}}),w=C.mesh;b.add(C.group),n.add(b);let T=new wn,E=nS({radius:48,texture:iS(),atmo:16752736,lightDir:S,ring:{inner:64,outer:104,colorA:10520176,colorB:15917768,tiltX:Math.PI/2.4,tiltY:-.5,tiltZ:-.3}}),D=E.mesh;T.add(E.group),T.position.copy(x),n.add(T);function O(e){e?x.set(150,330,-640):x.set(320,340,-620)}e.add(n);let k=new X(Hx.cityTop),A=new X(Hx.cityMid),j=new X(Hx.cityHorizon),M=new X(Ux.cityTop),N=new X(Ux.cityMid),P=new X(Ux.cityHorizon),F=new X,I=new X,ee=new X,te=new X(8226480),ne=new X(2761779),L=new X(12248829),re=new X(4872802),ie=new X(11188479),R=new X(16777215),z=new X(16727483),B=new X(3718648),ae=new X(Hx.spaceTop),oe=new X(Hx.spaceMid),se=new X(Hx.spaceHorizon),ce=new X(Hx.cavernFog),V=new X,le=new X,ue=new X(7176152),de=new X(593178),fe=new Y,pe=new Y;function me(t,n,i,a){let l=wt.smoothstep(i,34,114);r.uSpaceFactor.value=l,r.uTime.value=n;let d=Wx.value;F.copy(k).lerp(M,d),I.copy(A).lerp(N,d),ee.copy(j).lerp(P,d),V.copy(te).lerp(L,d),le.copy(ne).lerp(re,d),s.color.copy(ie).lerp(R,d),c.color.copy(z).lerp(B,d),c.intensity=wt.lerp(.45,.5,d),r.uTopColor.value.copy(F).lerp(ae,l),r.uMidColor.value.copy(I).lerp(oe,l),r.uHorizonColor.value.copy(ee).lerp(se,l),r.uSunIntensity.value=1-l*wt.lerp(.4,.85,d),e.fog&&(e.fog.color.copy(r.uHorizonColor.value).lerp(ce,a),e.fog.density=wt.lerp(55e-5,72e-5,l)),o.color.copy(V).lerp(ue,l),o.groundColor.copy(le).lerp(de,l),o.intensity=wt.lerp(wt.lerp(.95,1.4,d),.75,l),s.intensity=wt.lerp(wt.lerp(.9,1.75,d),1.1,l);let f=wt.smoothstep(i,76,108),p=wt.lerp(wt.lerp(.35,0,d),1,f)*(1-a),g=f*(1-a);_.mat.opacity=p*_.baseOpacity,v.mat.opacity=p*v.baseOpacity,_.points.rotation.y=n*.003,v.points.rotation.y=n*.0045;let S=wt.smoothstep(d,0,.55),O=wt.smoothstep(d,.45,1);b.position.copy(x).add(fe.set(S*260,-S*220,0)),b.scale.setScalar(1-S*.35),T.position.copy(x).add(pe.set(-(1-O)*300,(1-O)*240,0)),T.scale.setScalar(.65+O*.35),C.setOpacity(g*(1-S)),E.setOpacity(g*O),C.update(),E.update(),b.visible=S<.999,T.visible=O>.001,w.rotation.y=n*.04,D.rotation.y=-n*.05,y.forEach(e=>{if(e.timer+=t,e.timer>e.interval){e.timer=0;let t=(Math.random()-.5)*600,n=260+Math.random()*180,r=-350-Math.random()*250;e.mesh.position.set(t,n,r),e.mesh.lookAt(t+120,n-70,r+80)}e.timer<1.1&&g>.3?(e.mesh.translateZ(260*t),e.mesh.material.opacity=Math.sin(e.timer/1.1*Math.PI)*g*.9):e.mesh.material.opacity=0});let me=1-a;u.uTime.value=n,u.uOpacity.value=.86*me,m.uniforms.uOpacity.value=me,h.visible=me>.01,h.rotation.y=n*.0025}return{update:me,setPlanetLayout:O,setLite:e=>{m.uniforms.uKeep.value=e?.35:1},getActivePlanet:()=>Wx.value>.5?D:w,isPlanetVisible:()=>Math.max(C.opacity,E.opacity)>.3}}function oS(e,t=512){let n=new Float32Array(t*3),r=new Float32Array(t*3),i=new Float32Array(t),a=new Dr;a.setAttribute(`position`,new fr(n,3).setUsage(Ie)),a.setAttribute(`color`,new fr(r,3).setUsage(Ie)),a.setAttribute(`size`,new fr(i,1).setUsage(Ie)),a.setDrawRange(0,0);let o=new Wo({uniforms:{uScale:{value:window.innerHeight},uDay:Wx},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
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
    `}),s=new Qi(a,o);s.frustumCulled=!1,s.renderOrder=10,e.add(s);let c=[],l=new Y;function u(e,n,r,i,a=null){c.length>=t||c.push({object:e,offset:n.clone(),color:new X(...r),size:i,blink:a})}function d(e){let t=0;for(let a=0;a<c.length;a++){let o=c[a];if(!o.object.visible)continue;let s=1;if(!(o.blink&&(s=+((e*o.blink.speed+o.blink.phase)%1<o.blink.duty),s===0))){if(l.copy(o.offset),o.object.localToWorld(l),n[t*3]=l.x,n[t*3+1]=l.y,n[t*3+2]=l.z,r[t*3]=o.color.r*s,r[t*3+1]=o.color.g*s,r[t*3+2]=o.color.b*s,o.object.userData.glowScale){let e=o.object.matrixWorld.elements;i[t]=o.size*Math.hypot(e[0],e[1],e[2])}else i[t]=o.size;t++}}a.setDrawRange(0,t),a.attributes.position.needsUpdate=!0,a.attributes.color.needsUpdate=!0,a.attributes.size.needsUpdate=!0}function f(e,t=50){o.uniforms.uScale.value=e/(2*Math.tan(wt.degToRad(t)/2))}return{add:u,update:d,resize:f,points:s}}var sS={headlight:[2.2,2.3,2.6],taillight:[2.6,.12,.25],navRed:[3,.15,.15],navGreen:[.2,2.6,.6],strobe:[3.2,3.2,3.4],engineCyan:[.35,2.2,3],engineMagenta:[2.6,.35,1.8],aviation:[3.2,.2,.1]};function cS(e){e.updateMatrixWorld(!0);let t=new Map,n=[];e.traverse(n=>{if(!n.isMesh)return;for(let t=n;t&&t!==e;t=t.parent)if(t.userData.dynamic)return;let r=n.material.uuid+(n.geometry.index?`|i`:`|n`);t.has(r)||t.set(r,{material:n.material,meshes:[]}),t.get(r).meshes.push(n)}),t.forEach(({material:e,meshes:t})=>{if(t.length<2)return;let r=[`position`,`normal`,`uv`];t.every(e=>e.geometry.attributes.color)&&r.push(`color`);let i=t.map(e=>{let t=e.geometry.clone();return t.applyMatrix4(e.matrixWorld),Object.keys(t.attributes).forEach(e=>{r.includes(e)||t.deleteAttribute(e)}),t}),a=Rd(i,!1);i.forEach(e=>e.dispose()),a&&(t.forEach(e=>e.parent.remove(e)),n.push(new Z(a,e)))}),n.forEach(t=>e.add(t))}function lS(e,t){let n=Math.hypot(e,t);if(n<28)return 0;let r=Math.abs(Math.abs(e)-98),i=Math.abs(Math.abs(t)-98),a=Math.min(wt.smoothstep(r,5,16),wt.smoothstep(i,5,16)),o=wt.smoothstep(n,28,44),s=Math.sin(e*.028)*Math.cos(t*.028),c=Math.sin(e*.065+t*.045)*.5,l=Math.cos(e*.012-t*.015),u=(s*2.2+c*1.1+1.2)*o*a,d=wt.smoothstep(n,125,420)*(l*7.5+s*4.5+6)*a;return Math.max(-.4,u+d)}var uS={base:`#111b36`,patches:[`#16224a`,`#1a1844`,`#13203f`,`#182650`,`#1b2756`,`#21184a`,`#152447`],fade:`rgba(17, 27, 54, 0)`,specks:[`#18244a`,`#131e3e`,`#0f1833`,`#1a1a46`],road:`#05070f`,roadLine:`#22e4ff`,pathOuter:`#8b2a7a`,pathInner:`#1c2344`,plaza:`#141b33`,plazaRings:[`#22e4ff`,`#ff3dbb`]},dS={base:`#4b6c3b`,patches:[`#587b41`,`#486a38`,`#628846`,`#53773e`,`#6b8e4a`,`#7b8a49`,`#50733d`],fade:`rgba(75, 108, 59, 0)`,specks:[`#5d8246`,`#4a6c3b`,`#43633a`,`#66894b`],road:`#2b3038`,roadLine:`#e2e8f0`,pathOuter:`#94a3b8`,pathInner:`#e2e8f0`,plaza:`#64748b`,plazaRings:[`#38bdf8`,`#22c55e`]};function fS(e=uS){let n=2048,r=document.createElement(`canvas`);r.width=n,r.height=n;let i=r.getContext(`2d`),a=document.createElement(`canvas`);a.width=1024,a.height=1024;let o=a.getContext(`2d`);i.fillStyle=e.base,i.fillRect(0,0,n,n),o.fillStyle=`#707070`,o.fillRect(0,0,1024,1024),[{x:420,y:420,r:380,c:e.patches[0]},{x:1620,y:440,r:400,c:e.patches[1]},{x:440,y:1620,r:390,c:e.patches[2]},{x:1600,y:1600,r:410,c:e.patches[3]},{x:1024,y:1024,r:500,c:e.patches[4]},{x:750,y:1320,r:220,c:e.patches[5]},{x:1320,y:740,r:240,c:e.patches[6]}].forEach(t=>{let n=i.createRadialGradient(t.x,t.y,30,t.x,t.y,t.r);n.addColorStop(0,t.c),n.addColorStop(1,e.fade),i.fillStyle=n,i.beginPath(),i.arc(t.x,t.y,t.r,0,Math.PI*2),i.fill()});for(let t=0;t<11e4;t++){let r=Math.random()*n,a=Math.random()*n,s=Math.random();i.fillStyle=s>.68?e.specks[0]:s>.35?e.specks[1]:s>.12?e.specks[2]:e.specks[3],i.fillRect(r,a,2,4),t%2==0&&(o.fillStyle=s>.5?`#969696`:`#525252`,o.fillRect(r*.5,a*.5,2,2))}i.fillStyle=e.road,i.fillRect(0,0,n,96),i.fillRect(0,1952,n,96),i.fillRect(0,0,96,n),i.fillRect(1952,0,96,n),o.fillStyle=`#383838`,o.fillRect(0,0,1024,48),o.fillRect(0,976,1024,48),o.fillRect(0,0,48,1024),o.fillRect(976,0,48,1024),i.strokeStyle=e.roadLine,i.lineWidth=4,i.setLineDash([42,28]),i.beginPath(),i.moveTo(0,48),i.lineTo(n,48),i.moveTo(0,2e3),i.lineTo(n,2e3),i.moveTo(48,0),i.lineTo(48,n),i.moveTo(2e3,0),i.lineTo(2e3,n),i.stroke(),i.setLineDash([]);function s(t,n){i.save(),i.lineCap=`round`,i.lineJoin=`round`,i.strokeStyle=e.pathOuter,i.lineWidth=n+10,i.beginPath(),i.moveTo(t[0][0],t[0][1]);for(let e=1;e<t.length-1;e++){let n=(t[e][0]+t[e+1][0])/2,r=(t[e][1]+t[e+1][1])/2;i.quadraticCurveTo(t[e][0],t[e][1],n,r)}i.stroke(),i.strokeStyle=e.pathInner,i.lineWidth=n,i.stroke(),o.save(),o.lineCap=`round`,o.lineJoin=`round`,o.strokeStyle=`#b8b8b8`,o.lineWidth=n*.5,o.beginPath(),o.moveTo(t[0][0]*.5,t[0][1]*.5);for(let e=1;e<t.length-1;e++){let n=(t[e][0]+t[e+1][0])*.25,r=(t[e][1]+t[e+1][1])*.25;o.quadraticCurveTo(t[e][0]*.5,t[e][1]*.5,n,r)}o.stroke(),o.restore(),i.restore()}s([[96,1024],[520,780],[1024,1180],[1520,820],[1952,1024]],40),s([[1024,96],[780,520],[1180,1024],[820,1520],[1024,1952]],40),[[520,520],[1528,520],[520,1528],[1528,1528],[1024,1024]].forEach(([t,n],r)=>{let a=r===4?195:112;i.fillStyle=e.plaza,i.beginPath(),i.arc(t,n,a,0,Math.PI*2),i.fill(),i.strokeStyle=r===4?e.plazaRings[0]:e.plazaRings[1],i.lineWidth=6,i.stroke()});let c=new ta(r);c.wrapS=t,c.wrapT=t,c.repeat.set(14,14),c.anisotropy=8,c.colorSpace=Ae;let l=new ta(a);return l.wrapS=t,l.wrapT=t,l.repeat.set(14,14),l.anisotropy=4,{diffTex:c,bumpTex:l}}function pS(e){let n=document.createElement(`canvas`);n.width=256,n.height=512;let r=n.getContext(`2d`),i=[{wall:`#0a0e1f`,win1:`#9ad8ff`,win2:`#22e4ff`,style:`grid`},{wall:`#0d1022`,win1:`#ffd9a8`,win2:`#ff3dbb`,style:`stripes`},{wall:`#0c0f24`,win1:`#c4b5fd`,win2:`#ff3dbb`,style:`grid`},{wall:`#0a1020`,win1:`#a5f3fc`,win2:`#22e4ff`,style:`tall`},{wall:`#111430`,win1:`#4b4f8f`,win2:`#22e4ff`,style:`diagrid`}],a=i[e%i.length];if(r.fillStyle=a.wall,r.fillRect(0,0,256,512),a.style===`stripes`)for(let e=12;e<500;e+=18)r.fillStyle=Math.random()>.2?a.win1:`#0e1328`,r.fillRect(10,e,236,8),Math.random()>.85&&(r.fillStyle=a.win2,r.fillRect(10,e,236,4));else if(a.style===`tall`)for(let e=14;e<240;e+=26){r.fillStyle=a.win1,r.fillRect(e,12,12,488),r.fillStyle=a.wall;for(let t=40;t<490;t+=48)r.fillRect(e,t,12,6)}else if(a.style===`diagrid`){r.fillStyle=a.win1,r.fillRect(12,12,232,488),r.strokeStyle=a.wall,r.lineWidth=6;for(let e=-512;e<512;e+=32)r.beginPath(),r.moveTo(0,e),r.lineTo(256,e+256),r.moveTo(256,e),r.lineTo(0,e+256),r.stroke()}else for(let e=10;e<500;e+=14){let t=Math.random()>.2;for(let n=10;n<246;n+=16)t&&Math.random()>.3?(r.fillStyle=Math.random()>.86?a.win2:a.win1,r.fillRect(n,e,10,6)):(r.fillStyle=`#0e1328`,r.fillRect(n,e,10,6))}let o=new ta(n);return o.wrapS=t,o.wrapT=t,o.repeat.set(2,5),o.colorSpace=Ae,o}function mS(e,t,n){let r=new wn,i=new Ur({color:new X(...Vx.cyan),toneMapped:!1}),a=new Ur({color:new X(...Vx.magenta),toneMapped:!1});new Ur({color:new X(...Vx.violet),toneMapped:!1});let o=new Ko({color:16727483,emissive:11539066,emissiveIntensity:.9,roughness:.45}),s=new Ko({color:2286847,emissive:692144,emissiveIntensity:.9,roughness:.45}),c=new Ko({color:3818600,metalness:.6,roughness:.3}),l=new Ko({color:1450035,metalness:.82,roughness:.28}),{diffTex:u,bumpTex:d}=fS(uS),{diffTex:f}=fS(dS),p=new jo(2800,2800,220,220);p.rotateX(-Math.PI/2);let m=p.attributes.position;for(let e=0;e<m.count;e++){let t=m.getX(e),n=m.getZ(e);m.setY(e,lS(t,n))}p.computeVertexNormals();let h=new Z(p,new Ko({map:u,bumpMap:d,bumpScale:.35,roughness:.78,metalness:.08,side:2}));r.add(h);let g={value:0};h.material.onBeforeCompile=e=>{e.uniforms.uDayMap={value:f},e.uniforms.uDay=Wx,e.uniforms.uTime=g,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vTerrPos;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vTerrPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        uniform sampler2D uDayMap;
        uniform float uDay;
        uniform float uTime;
        varying vec3 vTerrPos;
        float gxHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float gxNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(gxHash(i), gxHash(i + vec2(1.0, 0.0)), f.x), mix(gxHash(i + vec2(0.0, 1.0)), gxHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }`).replace(`#include <map_fragment>`,`#ifdef USE_MAP
          vec4 sampledDiffuseColor = mix(texture2D(map, vMapUv), texture2D(uDayMap, vMapUv), uDay);
          diffuseColor *= sampledDiffuseColor;
        #endif
        float grassBig = gxNoise(vTerrPos.xz * 0.06) * 0.55 + gxNoise(vTerrPos.xz * 0.23) * 0.45;
        float grassFine = gxNoise(vTerrPos.xz * 3.1) * 0.6 + gxNoise(vTerrPos.xz * 11.0) * 0.4;
        diffuseColor.rgb *= 0.74 + grassBig * 0.42 + (grassFine - 0.5) * 0.16;
        // Herbe un peu plus jaune sur les zones claires, plus bleue dans les creux (jour)
        diffuseColor.rgb *= mix(vec3(1.0), mix(vec3(0.92, 0.98, 1.08), vec3(1.08, 1.04, 0.9), grassBig), uDay);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        vec2 sporeCell = floor(vTerrPos.xz / 0.8);
        float sporeH = gxHash(sporeCell);
        vec2 sporeF = fract(vTerrPos.xz / 0.8) - 0.5;
        float spore = step(0.985, sporeH) * (1.0 - smoothstep(0.0, 0.22, length(sporeF)));
        spore *= 0.55 + 0.45 * sin(uTime * (1.0 + sporeH * 3.0) + sporeH * 60.0);
        spore *= 1.0 - smoothstep(35.0, 80.0, distance(vTerrPos, cameraPosition));
        vec3 sporeCol = mix(vec3(0.13, 0.89, 1.0), vec3(1.0, 0.3, 0.8), step(0.993, sporeH));
        totalEmissiveRadiance += sporeCol * spore * 0.9 * (1.0 - uDay);`)},h.material.customProgramCacheKey=()=>`terrain-day-night-v2`;let _=new qo({color:730176,emissive:731733,emissiveIntensity:.45,metalness:.1,roughness:.06,clearcoat:1,clearcoatRoughness:.03,envMapIntensity:1.6}),v=new Ko({color:9277593,roughness:.9,metalness:0});[{x:-46,z:-42,r:12},{x:48,z:44,r:11}].forEach(e=>{let t=lS(e.x,e.z)+.12,n=new Z(new oa(e.r,32),_);n.rotation.x=-Math.PI/2,n.position.set(e.x,t,e.z),r.add(n);let i=new Z(new Po(e.r+.35,.5,10,64),v);i.rotation.x=Math.PI/2,i.scale.set(1,1,.45),i.position.set(e.x,t+.05,e.z),r.add(i)});let y=new Z(new sa(23,24.5,.4,32),l);y.position.y=.2,r.add(y);let b=new Z(new Po(23.2,.12,12,64),i);b.rotation.x=Math.PI/2,b.position.y=.42,r.add(b);let x=new Ko({color:3818600,metalness:.55,roughness:.28});x.defines={USE_UV:``},x.onBeforeCompile=e=>{e.uniforms.uDay=Wx,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vDeckN;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
vDeckN = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vDeckN;
uniform float uDay;`).replace(`#include <color_fragment>`,`#include <color_fragment>
        float panel = fract(vUv.x * 70.0);
        float seam = smoothstep(0.0, 0.04, panel) * smoothstep(1.0, 0.96, panel);
        float top = smoothstep(0.55, 0.8, vDeckN.y);
        diffuseColor.rgb *= mix(1.0, mix(0.55, 1.0, seam), top);
        diffuseColor.rgb *= 0.92 + 0.08 * fract(sin(floor(vUv.x * 70.0) * 91.7) * 4375.5);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        float edgeLine = 1.0 - smoothstep(0.0, 0.07, abs(vDeckN.y - 0.38));
        float centre = step(0.996, vDeckN.y) * step(0.5, fract(vUv.x * 35.0));
        float glowOn = mix(1.1, 0.15, uDay);
        totalEmissiveRadiance += (vec3(0.13, 0.89, 1.0) * edgeLine + vec3(1.0, 0.24, 0.73) * centre) * glowOn;`)},x.customProgramCacheKey=()=>`bridge-deck`;function S(e){let t=new ya(e),n=new Fo(t,80,1.35,8,!1);n.scale(1,.26,1);let i=new Z(n,x);r.add(i);let a=new Z(new Fo(t,80,.09,6,!1),s);a.position.y=-.34,r.add(a);for(let e=.1;e<=.9;e+=.2){let n=t.getPoint(e),i=lS(n.x,n.z),a=n.y-i;if(a>.5){let e=new Z(new sa(.22,.35,a,8),c);e.position.set(n.x,i+a/2,n.z),r.add(e)}}}S([new Y(-72,2.2,44),new Y(-35,8.2,36),new Y(0,11.5,32),new Y(36,8.2,26),new Y(74,2.5,-12)]),S([new Y(70,2.5,-46),new Y(34,10,-38),new Y(-4,14,-34),new Y(-40,8.5,-26),new Y(-75,2.5,10)]);let C=17.5,w=new Z(new Po(86,.45,8,96),l);w.rotation.x=Math.PI/2,w.position.y=C,r.add(w);let T=new Z(new Po(86,.09,6,96),s);T.rotation.x=Math.PI/2,T.position.y=17.05,r.add(T);for(let e=0;e<16;e++){let t=e/16*Math.PI*2,n=Math.cos(t)*86,i=Math.sin(t)*86,a=lS(n,i),o=C-a,s=new Z(new sa(.45,.7,o,8),c);s.position.set(n,a+o/2,i),r.add(s)}let E=[],D=new Ko({color:329487,emissive:16763274,emissiveIntensity:1.1,roughness:.2,metalness:.5});for(let e=0;e<5;e++){let t=new wn;t.userData.dynamic=!0;let o=new Z(new aa(1.6,1.3,4.4),c),s=new Z(new aa(1.66,.18,4.45),e===0?a:i),l=new Z(new aa(1.64,.38,3.6),D);l.position.y=.2,t.add(o,s,l),r.add(t),E.push({mesh:t,offset:e*.062}),n&&(e===0&&(n.add(t,new Y(-.5,-.2,-2.3),sS.headlight,.9),n.add(t,new Y(.5,-.2,-2.3),sS.headlight,.9)),e===4&&(n.add(t,new Y(-.5,-.2,2.3),sS.taillight,.6),n.add(t,new Y(.5,-.2,2.3),sS.taillight,.6)))}let O={cyan:{base:[.05,.25,.4],tip:[.35,1.7,2.3],leaves:[[.3,1.9,2.6],[.55,1.4,2.6],[1,2.2,2.4]]},pink:{base:[.35,.06,.3],tip:[2.2,.45,1.6],leaves:[[2.6,.5,1.7],[2.4,.9,2],[2.6,1.6,2.2]]},violet:{base:[.18,.08,.4],tip:[1.2,.6,2.6],leaves:[[1.3,.55,2.8],[.8,.9,2.8],[2,.7,2.4]]}},k=[],A=[],j=[],M=[],N=new Y(0,1,0),P=new Tt,F=new X;function I(e,t,n,r,i,a){let o=e.distanceTo(t),s=new sa(r,n,o,6,1,!0),c=new Float32Array(s.attributes.position.count*3);for(let e=0;e<s.attributes.position.count;e++){let t=s.attributes.position.getY(e)/o+.5;F.setRGB(...i).lerp(new X(...a),t),c.set([F.r,F.g,F.b],e*3)}s.setAttribute(`color`,new fr(c,3)),s.deleteAttribute(`uv`),P.setFromUnitVectors(N,t.clone().sub(e).normalize()),s.applyQuaternion(P),s.translate((e.x+t.x)/2,(e.y+t.y)/2,(e.z+t.z)/2),k.push(s)}function ee(e,t,n){return[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n]}function te(e,t,n,r,i){for(let a=0;a<n;a++){let n=Math.random()*2-1,a=Math.random()*Math.PI*2,o=t*Math.cbrt(Math.random()),s=Math.sqrt(1-n*n);A.push(e.x+s*Math.cos(a)*o,e.y+n*o*.75,e.z+s*Math.sin(a)*o);let c=r.leaves[Math.floor(Math.random()*r.leaves.length)],l=.55+Math.random()*.45;j.push(c[0]*l,c[1]*l,c[2]*l),M.push(Math.random(),.08+Math.random()*.13,i)}}function ne(e,t,n,r,i,a,o,s,c){let l=e.clone().addScaledVector(t,n),u=1-i/a,d=1-(i-1)/a;if(I(e,l,r,r*.66,ee(o.base,o.tip,u*u),ee(o.base,o.tip,d*d)),i>=a){te(l,1+Math.random()*.4,26,o,l.y-c);return}i>=a-1?te(l,.8,12,o,l.y-c):i>=a-2&&te(l,.6,5,o,l.y-c);let f=i===0?3:2+ +(Math.random()<.45);for(let e=0;e<f;e++){let u=s===`tall`?.32:.62,d=e/f*Math.PI*2+Math.random()*1.2,p=new Y(Math.cos(d),0,Math.sin(d)),m=t.clone().multiplyScalar(Math.cos(u)).addScaledVector(p,Math.sin(u)*(.8+Math.random()*.4));m.y+=s===`tall`?.35:.18,m.normalize(),ne(l,m,n*(s===`tall`?.68:.74),r*.55,i+1,a,o,s,c)}}function L(e,t,n,i,a){let c=lS(e,t),l=O[i],u=new Y(e,c,t),d=new Y((Math.random()-.5)*.12,1,(Math.random()-.5)*.12).normalize(),f=(a===`tall`?2.4:2.1)*n,p=u.clone().addScaledVector(d,f*.55);p.x+=(Math.random()-.5)*.15*n,p.z+=(Math.random()-.5)*.15*n,I(u,p,.26*n,.2*n,l.base,ee(l.base,l.tip,.12)),ne(p,d,f*.6,.2*n,0,4,l,a,c);let m=new Z(new Po(.8*n,.035,8,28),i===`pink`?o:s);m.rotation.x=Math.PI/2,m.position.set(e,c+.06,t),r.add(m)}let re=(e,t)=>Math.abs(e)<9&&t>10&&t<42;for(let e=0;e<64;e++){let t=e/64*Math.PI*2+(Math.random()-.5)*.14,n=31+Math.random()*52,r=Math.cos(t)*n,i=Math.sin(t)*n;if(re(r,i))continue;let a=e%3==0?`pink`:e%3==1?`cyan`:`violet`;L(r,i,.9+Math.random()*.6,a,e%4==2?`tall`:`round`)}[{x:-46,z:-42,r:12},{x:48,z:44,r:11}].forEach((e,t)=>{for(let n=0;n<16;n++){let r=n/16*Math.PI*2+Math.random()*.2,i=e.r+2+Math.random()*1.2,a=e.x+Math.cos(r)*i,o=e.z+Math.sin(r)*i;te(new Y(a,lS(a,o)+.45,o),.55,14,O[(n+t)%2?`cyan`:`pink`],.3)}});let ie=new Ur({vertexColors:!0,toneMapped:!1}),R=new Z(Rd(k,!1),ie);k.forEach(e=>e.dispose()),R.userData.dynamic=!0,r.add(R);let z=new Dr;z.setAttribute(`position`,new hr(A,3)),z.setAttribute(`aColor`,new hr(j,3)),z.setAttribute(`aData`,new hr(M,3));let B={uTime:{value:0},uDay:Wx,uViewportH:{value:800}},ae=new Qi(z,new Wo({uniforms:B,transparent:!0,depthWrite:!1,blending:2,vertexShader:`
        attribute vec3 aColor;
        attribute vec3 aData; // phase, taille, hauteur (balancement)
        uniform float uTime;
        uniform float uViewportH;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          vec3 p = position;
          // Vent : les grappes hautes ondulent davantage
          float sway = aData.z * 0.035;
          p.x += sin(uTime * 1.1 + position.z * 0.15 + aData.x * 0.6) * sway;
          p.z += cos(uTime * 0.9 + position.x * 0.15) * sway * 0.6;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = min(aData.y * projectionMatrix[1][1] * uViewportH * 0.5 / -mv.z, 48.0);
          vTwinkle = 0.6 + 0.4 * sin(uTime * (1.5 + aData.x * 2.5) + aData.x * 40.0);
          vColor = aColor;
        }
      `,fragmentShader:`
        uniform float uDay;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float core = pow(1.0 - d, 2.5);
          float halo = (1.0 - d) * 0.35;
          vec3 col = vColor * (core * 1.3 + halo) * vTwinkle * mix(0.42, 0.75, uDay);
          gl_FragColor = vec4(col, 1.0);
        }
      `}));ae.frustumCulled=!1,ae.userData.dynamic=!0,ae.userData.thinnable=!0,r.add(ae);for(let e=0;e<16;e++){let t=e/16*Math.PI*2,n=Math.cos(t)*26.5,i=Math.sin(t)*26.5,a=lS(n,i),o=new Z(new sa(.06,.1,3.6,8),l);o.position.set(n,a+1.8,i);let c=new Z(new No(.18,8,8),s);c.position.set(n,a+3.65,i),r.add(o,c)}let oe=[];function se(e,t){let n=new Ba;n.moveTo(e[0][0],e[0][1]);for(let t=1;t<e.length;t++){let r=e[t];r.length===4?n.quadraticCurveTo(r[0],r[1],r[2],r[3]):n.lineTo(r[0],r[1])}n.closePath();let r=new To(n,{depth:t,bevelEnabled:!0,bevelThickness:.08,bevelSize:.07,bevelSegments:2,curveSegments:6});return r.translate(0,0,-t/2),r.rotateY(-Math.PI/2),r}let ce=se([[-1.8,.22],[1.65,.2],[1.92,.24,1.88,.42],[1.2,.58],[.35,.95],[-.7,.98],[-1.55,.88,-1.82,.6]],1.42),V=se([[1.12,.6],[.36,.93],[-.68,.96],[-1.38,.74],[-1.3,.6]],1.5),le=new aa(1.2,.07,.06).translate(0,.42,1.93),ue=new aa(1.36,.08,.06).translate(0,.6,-1.9),de=new Ko({color:16777215,metalness:.75,roughness:.26,envMapIntensity:1.1}),fe=new Ko({color:197900,metalness:1,roughness:.05,envMapIntensity:1.4}),pe=new Ur({color:new X(...sS.headlight),toneMapped:!1}),me=new Ur({color:new X(...sS.taillight),toneMapped:!1}),he=[790036,1845834,12173260,3804462,1448482,5922928],ge=new Ei(ce,de,28),_e=new Ei(V,fe,28),H=new Ei(le,pe,28),ve=new Ei(ue,me,28);[ge,_e,H,ve].forEach(e=>{e.frustumCulled=!1,e.userData.dynamic=!0,e.instanceMatrix.setUsage(Ie),r.add(e)});function U(e){let t=new Cn;return t.userData.dynamic=!0,ge.setColorAt(e,new X(he[e%he.length])),n&&(n.add(t,new Y(-.52,.42,1.98),sS.headlight,.75),n.add(t,new Y(.52,.42,1.98),sS.headlight,.75),n.add(t,new Y(-.6,.6,-1.95),sS.taillight,.5),n.add(t,new Y(.6,.6,-1.95),sS.taillight,.5),n.add(t,new Y(0,.05,0),e%2?[.12,.7,.9]:[.8,.1,.55],2.2)),t}let ye=0;[-98,98].forEach((e,t)=>{for(let n=0;n<7;n++){let i=U(ye++),a=t===0?1:-1;i.position.set(e+a*2.2,.35,-260+n*85),i.rotation.y=a>0?0:Math.PI,r.add(i),oe.push({mesh:i,axis:`z`,speed:(24+Math.random()*14)*a,limit:290,phase:Math.random()*6});let o=U(ye++),s=t===0?-1:1;o.position.set(-260+n*85,.35,e-s*2.2),o.rotation.y=s>0?Math.PI/2:-Math.PI/2,r.add(o),oe.push({mesh:o,axis:`x`,speed:(24+Math.random()*14)*s,limit:290,phase:Math.random()*6})}}),ge.instanceColor&&(ge.instanceColor.needsUpdate=!0);let be=[0,1,2,3,4].map(e=>{let t=pS(e);return new Ko({color:856356,map:t,emissiveMap:t,emissive:new X(16777215),emissiveIntensity:.75,metalness:.65,roughness:.3})}),xe=new Ko({color:726064,metalness:.92,roughness:.12}),Se=new Ur({color:new X(2.8,.1,.35),toneMapped:!1}),Ce=new Ur({color:2286847,transparent:!0,opacity:.07,side:2,depthWrite:!1}),we=[],Te=t*.64;[{count:22,minR:108,maxR:142,minH:34,maxH:72},{count:30,minR:150,maxR:205,minH:42,maxH:Te},{count:38,minR:215,maxR:290,minH:44,maxH:Te},{count:44,minR:300,maxR:400,minH:38,maxH:Te*.92},{count:46,minR:410,maxR:540,minH:32,maxH:Te*.85}].forEach((e,t)=>{for(let n=0;n<e.count;n++){let s=n/e.count*Math.PI*2+t*.27+(Math.random()-.5)*.11,c=e.minR+Math.random()*(e.maxR-e.minR),u=Math.cos(s)*c,d=Math.sin(s)*c,f=lS(u,d),p=t<=2&&n%13==0,m=p?96+Math.random()*8:e.minH+Math.random()*(e.maxH-e.minH),h=11+Math.random()*11,g=11+Math.random()*11,_=(n+t)%6,v=be[(n+t)%be.length],y=n%3==0?a:n%2==0?i:o;if(_===0){let e=h*.52,t=new Z(new sa(e*.85,e,m,20),xe);t.position.set(u,f+m/2,d),r.add(t),[.45,.82,.99].forEach(t=>{let n=new Z(new Po(e*.92,.14,8,24),y);n.rotation.x=Math.PI/2,n.position.set(u,f+m*t,d),r.add(n)})}else if(_===1){let e=m*.55,t=m*.3,n=m*.15,i=new Z(new aa(h*1.15,e,g*1.15),v);i.position.set(u,f+e/2,d);let a=new Z(new aa(h*.82,t,g*.82),v);a.position.set(u,f+e+t/2,d);let o=new Z(new aa(h*.48,n,g*.48),v);o.position.set(u,f+e+t+n/2,d),r.add(i,a,o)}else if(_===2){let e=h*.36,t=new Z(new aa(h*.45,m,g*.8),v);t.position.set(u-e,f+m/2,d);let n=new Z(new aa(h*.45,m*.92,g*.8),v);n.position.set(u+e,f+m*.92/2,d);let i=new Z(new aa(h*.9,1.8,g*.4),y);i.position.set(u,f+m*.65,d),r.add(t,n,i)}else if(_===3){let e=new Z(new sa(h*.46,h*.62,m,6),v);e.position.set(u,f+m/2,d),r.add(e);let t=new Z(new sa(.4,h*.46,9,6),l);t.position.set(u,f+m+4.5,d),r.add(t)}else{let e=new Z(new aa(h,m,g),v);e.position.set(u,f+m/2,d),r.add(e);let t=new Z(new aa(.24,m*.9,.24),y);t.position.set(u+h/2+.1,f+m*.45,d+g/2+.1),r.add(t);let n=new Z(new aa(h+.3,.35,g+.3),y);n.position.set(u,f+m-1,d),r.add(n)}let b=p?10:4+Math.random()*6,x=new Z(new sa(.06,.18,b,6),l);x.position.set(u,f+m+b/2,d);let S=new Z(new No(.32,6,6),Se);if(S.position.set(u,f+m+b,d),r.add(x,S),t===0&&n%5==0){let e=new sa(2.6,.25,52,12,1,!0);e.translate(0,26,0);let t=new Z(e,Ce);t.userData.dynamic=!0,t.position.set(u,f+m,d),r.add(t),we.push({mesh:t,phase:n*1.4})}}}),h.userData.dynamic=!0,cS(r),e.add(r);let W=e=>new X(e),Ee=[...be.map(e=>({m:e,color:[W(856356),W(9082540)],emissive:[.75,.12]})),{m:c,color:[W(3818600),W(14870768)]},{m:x,color:[W(2896980),W(14081512)]},{m:xe,color:[W(726064),W(2775690)]},{m:o,emissive:[.9,.3]},{m:ie,color:[W(5066061),W(16777215)]},{m:s,emissive:[.9,.3]},{m:D,emissive:[1.1,.15]},{m:Ce,opacity:[.07,0]}],De=-1;function G(e){Math.abs(e-De)<.002||(De=e,Ee.forEach(t=>{t.color&&t.m.color.copy(t.color[0]).lerp(t.color[1],e),t.emissive&&(t.m.emissiveIntensity=wt.lerp(t.emissive[0],t.emissive[1],e)),t.opacity&&(t.m.opacity=wt.lerp(t.opacity[0],t.opacity[1],e))}))}function K(e,t){G(Wx.value),g.value=t,B.uTime.value=t,B.uViewportH.value=window.innerHeight*Math.min(window.devicePixelRatio||1,2),we.forEach(e=>{e.mesh.rotation.x=Math.sin(t*.45+e.phase)*.22,e.mesh.rotation.z=Math.cos(t*.38+e.phase)*.22});let n=t*.24;E.forEach(e=>{let t=n-e.offset;e.mesh.position.set(Math.cos(t)*86,18.35,Math.sin(t)*86),e.mesh.rotation.y=-t}),oe.forEach((n,r)=>{n.axis===`z`?(n.mesh.position.z+=n.speed*e,n.mesh.position.z>n.limit&&(n.mesh.position.z=-n.limit),n.mesh.position.z<-n.limit&&(n.mesh.position.z=n.limit)):(n.mesh.position.x+=n.speed*e,n.mesh.position.x>n.limit&&(n.mesh.position.x=-n.limit),n.mesh.position.x<-n.limit&&(n.mesh.position.x=n.limit)),n.mesh.position.y=.35+Math.sin(t*2.1+n.phase)*.05,n.mesh.updateMatrix(),ge.setMatrixAt(r,n.mesh.matrix),_e.setMatrixAt(r,n.mesh.matrix),H.setMatrixAt(r,n.mesh.matrix),ve.setMatrixAt(r,n.mesh.matrix)}),ge.instanceMatrix.needsUpdate=!0,_e.instanceMatrix.needsUpdate=!0,H.instanceMatrix.needsUpdate=!0,ve.instanceMatrix.needsUpdate=!0}return{update:K}}function hS(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let n=e.getContext(`2d`);n.fillStyle=`#8a8f9c`,n.fillRect(0,0,512,512);for(let e=0;e<90;e++){let e=40+Math.random()*120,t=30+Math.random()*90,r=Math.random()*512,i=Math.random()*512,a=120+Math.floor(Math.random()*40);n.fillStyle=`rgb(${a}, ${a+3}, ${a+10})`,n.fillRect(r,i,e,t),n.strokeStyle=`rgba(20, 22, 30, 0.85)`,n.lineWidth=2,n.strokeRect(r,i,e,t)}for(let e=0;e<400;e++)n.fillStyle=`rgba(25, 28, 36, 0.7)`,n.fillRect(Math.random()*512,Math.random()*512,2,2);let r=new ta(e);return r.wrapS=t,r.wrapT=t,r.repeat.set(2,2),r.colorSpace=Ae,r.anisotropy=4,r}function gS(e,t,n,r){let i=new wn,a=new Z(new aa(4.4,2.2,22),e);i.add(a);let o=new Z(new ca(3.1,7.5,4),e);o.rotation.x=Math.PI/2,o.rotation.z=Math.PI/4,o.scale.set(1,1,.52),o.position.z=14.5,i.add(o);let s=new Z(new aa(2.2,1.4,5.2),t);s.position.set(0,1.7,-2.5);let c=new Z(new aa(2.28,.26,4.4),n);c.position.set(0,1.85,-2.3),i.add(s,c),[-3.8,3.8].forEach((a,o)=>{let s=new Z(new aa(4.2,.45,9.5),t);s.position.set(a,-.2,-3.5),s.rotation.z=o===0?.14:-.14,i.add(s);let c=new Z(new sa(.85,1.05,8.5,12),e);c.rotation.x=Math.PI/2,c.position.set(a*1.15,.1,-6.5),i.add(c);let l=new Z(new sa(.68,.18,2.8,12),n);l.rotation.x=-Math.PI/2,l.position.set(a*1.15,.1,-12),i.add(l);let u=new Z(new No(.22,8,8),o===0?r:n);u.position.set(a*1.5,-.1,-3.5),i.add(u)});let l=new Z(new sa(1.05,.25,4,14),n);return l.rotation.x=-Math.PI/2,l.position.set(0,0,-12.9),i.add(l),i}function _S(e,t,n){let r=new wn,i=new Z(new ca(.55,4.6,12),e);i.rotation.x=Math.PI/2,i.scale.set(1.1,1,.55),r.add(i);let a=new Z(new aa(.42,.22,1.15),n);a.position.set(0,.22,.35),r.add(a);let o=new Z(new aa(3.6,.08,1.6),t);return o.position.set(0,0,-.85),r.add(o),[-.85,.85].forEach(t=>{let i=new Z(new aa(.08,.65,.9),e);i.position.set(t,.32,-1.2),i.rotation.z=t>0?-.25:.25,r.add(i);let a=new Z(new ca(.14,2.1,8),n);a.rotation.x=-Math.PI/2,a.position.set(t*.45,0,-2.65),r.add(a)}),r}function vS(e,t,n){let r=new wn,i=new Z(new aa(2.1,1.35,6.8),e);r.add(i);let a=new Z(new aa(1.7,1,1.6),t);a.position.set(0,-.1,4);let o=new Z(new aa(1.76,.32,.88),n);return o.position.set(0,.25,3.7),r.add(a,o),[[-1.45,2],[1.45,2],[-1.45,-2.2],[1.45,-2.2]].forEach(([e,i])=>{let a=new Z(new sa(.32,.38,1.6,10),t);a.rotation.x=Math.PI/2,a.position.set(e,-.1,i);let o=new Z(new sa(.22,.04,1.3,8),n);o.rotation.x=-Math.PI/2,o.position.set(e,-.1,i-1.25),r.add(a,o)}),r}function yS(e,t,n){let r=new wn,i=hS(),a=new Ko({color:10134456,map:i,roughnessMap:i,bumpMap:i,bumpScale:.6,metalness:.7,roughness:.55,envMapIntensity:1.1}),o=new Ko({color:2764868,map:i,bumpMap:i,bumpScale:.5,metalness:.6,roughness:.5,envMapIntensity:.9}),s=new Ur({color:new X(0,1.35,1.75),toneMapped:!1}),c=new Ur({color:new X(1.65,.12,.95),toneMapped:!1}),l=new Ur({color:new X(1.75,.85,.12),toneMapped:!1}),u=gS(a,o,s,c);r.add(u),n&&(n.add(u,new Y(0,0,-15.2),sS.engineCyan,6.5),n.add(u,new Y(-4.37,.1,-13.6),sS.engineCyan,4.2),n.add(u,new Y(4.37,.1,-13.6),sS.engineCyan,4.2),n.add(u,new Y(5.9,-.5,-3.5),sS.navRed,1.2),n.add(u,new Y(-5.9,-.5,-3.5),sS.navGreen,1.2),n.add(u,new Y(0,2.6,-2.5),sS.strobe,1.8,{speed:.9,phase:.2,duty:.07}),n.add(u,new Y(0,-1.2,6),sS.navRed,1,{speed:.6,phase:.5,duty:.5}));let d=[new ya([new Y(-68,t+12,42),new Y(0,t+18,76),new Y(72,t+10,34),new Y(58,t+4,-58),new Y(-25,t+15,-74),new Y(-76,t+8,-22)],!0),new ya([new Y(95,110,-40),new Y(45,92,68),new Y(-55,76,62),new Y(-92,95,-28),new Y(-20,114,-88)],!0),new ya([new Y(-82,48,55),new Y(38,34,78),new Y(88,56,12),new Y(44,62,-76),new Y(-54,38,-68)],!0)],f=[];for(let e=0;e<15;e++){let t=e%2==0,i=_S(a,o,t?s:c),l=d[e%d.length];if(r.add(i),n){let r=t?sS.engineCyan:sS.engineMagenta;n.add(i,new Y(-.38,0,-3.6),r,1.5),n.add(i,new Y(.38,0,-3.6),r,1.5),n.add(i,new Y(1.75,0,-.85),sS.navRed,.45),n.add(i,new Y(-1.75,0,-.85),sS.navGreen,.45),n.add(i,new Y(0,.35,-1.3),sS.strobe,.8,{speed:1.1,phase:e*.13,duty:.06})}f.push({mesh:i,curve:l,t:(e/15+Math.random()*.05)%1,speed:.036+e%3*.008,bankFactor:1.8})}for(let e=0;e<9;e++){let t=vS(a,o,e%3==0?c:e%2==0?s:l),i=d[(e+1)%d.length];if(r.add(t),n){let r=e%2==0?sS.engineCyan:sS.engineMagenta;[[-1.45,2],[1.45,2],[-1.45,-2.2],[1.45,-2.2]].forEach(([e,i])=>{n.add(t,new Y(e,-.1,i-2),r,1.2)}),n.add(t,new Y(0,.9,0),sS.strobe,.9,{speed:.7,phase:e*.21,duty:.06}),n.add(t,new Y(-.5,-.4,4.85),sS.headlight,.8),n.add(t,new Y(.5,-.4,4.85),sS.headlight,.8)}f.push({mesh:t,curve:i,t:(e/9+.12)%1,speed:.02+e%2*.005,bankFactor:.75})}e.add(r);let p=new Y,m=new Y,h=new Y,g=new Y;function _(e,n){let r=n*.085,i=t+16+Math.sin(n*.6)*2.2;u.position.set(Math.cos(r)*84,i,Math.sin(r)*84),u.rotation.y=-r,u.rotation.z=-.08,f.forEach(t=>{if(!t.mesh.visible)return;t.t=(t.t+t.speed*e)%1;let n=(t.t+.015)%1;t.curve.getPointAt(t.t,p),t.curve.getPointAt(n,m),t.curve.getTangentAt(t.t,h),t.curve.getTangentAt(n,g),t.mesh.position.copy(p),t.mesh.lookAt(m);let r=h.x*g.z-h.z*g.x;t.mesh.rotateZ(wt.clamp(r*22*t.bankFactor,-.75,.75))})}function v(e){f.forEach((t,n)=>{t.mesh.visible=!e||n%2==0})}return{update:_,setLite:v}}function bS(e,t,n,r=`#22e4ff`,i=9.2,a=4.6){let o=new wn,s=document.createElement(`canvas`);s.width=1024,s.height=512;let c=s.getContext(`2d`);c.fillStyle=`rgba(8, 10, 28, 0.9)`,c.fillRect(0,0,s.width,s.height),c.strokeStyle=`rgba(255, 255, 255, 0.04)`,c.lineWidth=1;for(let e=0;e<s.width;e+=32)c.beginPath(),c.moveTo(e,0),c.lineTo(e,s.height),c.stroke();for(let e=0;e<s.height;e+=8)c.beginPath(),c.moveTo(0,e),c.lineTo(s.width,e),c.stroke();c.strokeStyle=r,c.lineWidth=4,c.strokeRect(18,18,s.width-36,s.height-36),c.lineWidth=10,c.beginPath(),c.moveTo(14,60),c.lineTo(14,14),c.lineTo(60,14),c.stroke(),c.beginPath(),c.moveTo(s.width-14-46,14),c.lineTo(s.width-14,14),c.lineTo(s.width-14,60),c.stroke(),c.beginPath(),c.moveTo(14,s.height-14-46),c.lineTo(14,s.height-14),c.lineTo(60,s.height-14),c.stroke(),c.beginPath(),c.moveTo(s.width-14-46,s.height-14),c.lineTo(s.width-14,s.height-14),c.lineTo(s.width-14,s.height-14-46),c.stroke(),c.font=`bold 24px "JetBrains Mono", monospace`,c.fillStyle=`rgba(255, 255, 255, 0.58)`,c.textAlign=`right`,c.fillText(e,s.width-46,62),c.textAlign=`left`,c.font=`bold 48px "Space Grotesk", "Segoe UI", sans-serif`,c.fillStyle=r,c.fillText(t.toUpperCase(),54,114),c.fillStyle=r,c.fillRect(54,136,190,4),c.font=`32px "Space Grotesk", "Segoe UI", sans-serif`,c.fillStyle=`#eef8ff`,n.forEach((e,t)=>{c.fillText(`▸ ${e}`,56,206+t*62)}),c.fillStyle=`rgba(255, 255, 255, 0.06)`,c.fillRect(54,408,s.width-108,54),c.strokeStyle=r,c.lineWidth=2,c.strokeRect(54,408,s.width-108,54),c.font=`bold 23px "JetBrains Mono", monospace`,c.fillStyle=r,c.textAlign=`center`,c.fillText(`[ APPUYEZ SUR ENTRÉE OU CLIQUEZ POUR EXPLORER LE DOSSIER ↗ ]`,s.width/2,443);let l=new ta(s);l.colorSpace=Ae;let u=new Z(new jo(i,a),new Ur({map:l,transparent:!0,side:2}));o.add(u),o.screenMesh=u;let d=new Ur({color:new X(r).clone().multiplyScalar(2),toneMapped:!1}),f=new aa(i*.85,.06,.08),p=new Z(f,d);p.position.y=a/2+.14;let m=new Z(f,d);return m.position.y=-a/2-.14,o.add(p,m),o}function xS(){let e=1024,t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`);n.clearRect(0,0,e,e),n.lineCap=`round`,[.94,.86,.62,.42,.24].forEach((e,t)=>{n.strokeStyle=t%2?`rgba(255, 90, 200, 0.75)`:`rgba(80, 235, 255, 0.85)`,n.lineWidth=t===0?6:3,n.beginPath(),n.arc(512,512,e*512,0,Math.PI*2),n.stroke()}),n.strokeStyle=`rgba(80, 235, 255, 0.6)`,n.lineWidth=3;for(let e=0;e<120;e++){let t=e/120*Math.PI*2,r=445.44,i=(e%10==0?.8:.84)*512;n.beginPath(),n.moveTo(512+Math.cos(t)*r,512+Math.sin(t)*r),n.lineTo(512+Math.cos(t)*i,512+Math.sin(t)*i),n.stroke()}n.strokeStyle=`rgba(80, 235, 255, 0.45)`,n.lineWidth=2;for(let e=0;e<6;e++){let t=e/6*Math.PI*2+Math.PI/6;n.beginPath(),n.moveTo(512+Math.cos(t)*.26*512,512+Math.sin(t)*.26*512),n.lineTo(512+Math.cos(t)*.6*512,512+Math.sin(t)*.6*512),n.stroke(),n.beginPath(),n.arc(512,512,266.24,t-.25,t+.25),n.stroke()}let r=n.createRadialGradient(512,512,0,512,512,122.88);r.addColorStop(0,`rgba(120, 240, 255, 0.55)`),r.addColorStop(1,`rgba(120, 240, 255, 0)`),n.fillStyle=r,n.beginPath(),n.arc(512,512,122.88,0,Math.PI*2),n.fill();let i=new ta(t);return i.colorSpace=Ae,i.anisotropy=8,i}function SS(){let e=2048,t=document.createElement(`canvas`);t.width=e,t.height=640;let n=t.getContext(`2d`);n.clearRect(0,0,e,640),n.textAlign=`center`,n.textBaseline=`alphabetic`,n.font=`800 300px "Space Grotesk", "Segoe UI", sans-serif`;let r=`ESGI BOT`;n.shadowColor=`rgba(60, 220, 255, 0.9)`,n.shadowBlur=60,n.fillStyle=`rgba(60, 220, 255, 0.35)`,n.fillText(r,e/2,380),n.shadowBlur=18,n.shadowColor=`rgba(255, 60, 190, 0.8)`,n.fillStyle=`rgba(255, 70, 200, 0.85)`,n.fillText(r,e/2-7,380),n.shadowColor=`rgba(40, 230, 255, 0.8)`,n.fillStyle=`rgba(40, 230, 255, 0.85)`,n.fillText(r,1031,380),n.shadowBlur=10,n.shadowColor=`rgba(255, 255, 255, 0.8)`;let i=n.createLinearGradient(0,150,0,390);i.addColorStop(0,`#ffffff`),i.addColorStop(.6,`#e8fbff`),i.addColorStop(1,`#9fe9ff`),n.fillStyle=i,n.fillText(r,e/2,380),n.shadowBlur=0;let a=n.createLinearGradient(e/2-520,0,1544,0);a.addColorStop(0,`rgba(255, 70, 200, 0)`),a.addColorStop(.3,`rgba(255, 70, 200, 0.95)`),a.addColorStop(.7,`rgba(40, 230, 255, 0.95)`),a.addColorStop(1,`rgba(40, 230, 255, 0)`),n.fillStyle=a,n.fillRect(e/2-520,428,1040,5),n.font=`700 66px "JetBrains Mono", monospace`,`letterSpacing`in n&&(n.letterSpacing=`16px`),n.lineJoin=`round`,n.strokeStyle=`rgba(6, 10, 30, 0.85)`,n.lineWidth=14,n.strokeText(`BOT DISCORD · ESGI REIMS`,e/2,530),n.fillStyle=`rgba(225, 245, 255, 0.98)`,n.shadowColor=`rgba(60, 220, 255, 0.9)`,n.shadowBlur=16,n.fillText(`BOT DISCORD · ESGI REIMS`,e/2,530);let o=new ta(t);return o.colorSpace=Ae,o.anisotropy=8,o}function CS(e,t){let n=new wn,r=t+7.5;n.position.set(0,r,0);let i={value:0},a=new Ko({color:1251881,metalness:.65,roughness:.35,envMapIntensity:.35}),o=new Ko({color:805486,emissive:165063,emissiveIntensity:.2,metalness:.6,roughness:.3,envMapIntensity:.35}),s=new Ur({color:new X(0,.95,1.2),toneMapped:!1}),c=new Ur({color:new X(1.1,.08,.65),toneMapped:!1}),l=[[0,0],[6.9,0],[7.25,-.12],[7.3,-.32],[7,-.55],[5.2,-1.3],[3,-2.2],[1.4,-2.75],[.6,-3],[0,-3.05]].map(([e,t])=>new J(e,t)),u=new qo({color:659230,metalness:.75,roughness:.18,clearcoat:1,clearcoatRoughness:.05,iridescence:.35,iridescenceIOR:1.5,envMapIntensity:1.4}),d=new Z(new ko(l,96),u);n.add(d);let f=new Z(new oa(6.85,96),new Ur({map:xS(),color:new X(1.05,1.05,1.05),transparent:!0,depthWrite:!1,toneMapped:!1}));f.rotation.x=-Math.PI/2,f.position.y=.012,n.add(f);let p=new Z(new Po(7.28,.055,12,160),s);p.rotation.x=Math.PI/2,p.position.y=-.3,n.add(p);let m=new Z(new Po(4.3,.045,10,128),c);m.rotation.x=Math.PI/2,m.position.y=-1.7,n.add(m);let h=new Z(new No(.55,32,16),new Ur({color:new X(.8,1.45,1.85),toneMapped:!1}));h.position.y=-3.05,n.add(h);let g=new Wo({uniforms:{uTime:i},transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        // Ondes d'énergie qui descendent vers la tour, fondu en bas
        float waves = 0.55 + 0.45 * sin((vUv.y * 9.0 + uTime * 3.0) * 6.2831);
        float fade = smoothstep(0.0, 0.7, vUv.y);
        float edge = 0.6 + 0.4 * sin(vUv.x * 6.2831 * 12.0 + uTime);
        vec3 col = mix(vec3(1.0, 0.3, 0.85), vec3(0.3, 0.9, 1.0), vUv.y);
        gl_FragColor = vec4(col * waves * edge * fade * 0.55, 1.0);
      }
    `}),_=new Z(new sa(.45,1.9,6.5,48,1,!0),g);_.position.y=-6.3,n.add(_);function v(e,t,r,a){let o=new Wo({uniforms:{uTime:i,uColor:{value:new X(...t)},uSpeed:{value:r}},transparent:!0,depthWrite:!1,blending:2,vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform float uSpeed;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float t = fract(vUv.x - uTime * uSpeed);
          float tail = pow(t, 6.0);           // traînée qui s'estompe
          float base = 0.12;                  // anneau à peine visible
          gl_FragColor = vec4(uColor * (base + tail * 0.9), 1.0);
        }
      `}),s=new Z(new Po(e,.035,8,220),o);return s.rotation.x=Math.PI/2+a,n.add(s),s}let y=v(8.6,[.2,1.6,2],.12,.18),b=v(9.8,[1.8,.3,1.3],-.08,-.26),x=new Float32Array(660),S=new Float32Array(440);for(let e=0;e<220;e++){let t=Math.random()*Math.PI*2,n=3.5+Math.random()*6.5;x.set([Math.cos(t)*n,Math.random(),Math.sin(t)*n],e*3),S.set([Math.random(),.06+Math.random()*.1],e*2)}let C=new Dr;C.setAttribute(`position`,new fr(x,3)),C.setAttribute(`aData`,new fr(S,2));let w=new Qi(C,new Wo({uniforms:{uTime:i},transparent:!0,depthWrite:!1,blending:2,vertexShader:`
        attribute vec2 aData;
        uniform float uTime;
        varying float vAlpha;
        varying float vHue;
        void main() {
          // Montée en boucle de -3 m à +9 m, avec un fondu en haut et en bas
          float t = fract(position.y + uTime * 0.05 * (0.6 + aData.x));
          vec3 p = vec3(position.x, -3.0 + t * 12.0, position.z);
          vAlpha = smoothstep(0.0, 0.15, t) * (1.0 - smoothstep(0.7, 1.0, t)) * (0.6 + 0.4 * sin(uTime * 3.0 + aData.x * 40.0));
          vHue = aData.x;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = min(aData.y * projectionMatrix[1][1] * 600.0 / -mv.z, 24.0);
        }
      `,fragmentShader:`
        varying float vAlpha;
        varying float vHue;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          vec3 col = mix(vec3(0.3, 0.9, 1.0), vec3(1.0, 0.35, 0.85), step(0.7, vHue));
          gl_FragColor = vec4(col * pow(1.0 - d, 2.0) * vAlpha * 1.0, 1.0);
        }
      `}));w.frustumCulled=!1,w.userData.thinnable=!0,n.add(w);let T=new Wo({uniforms:{uTime:i,map:{value:SS()}},transparent:!0,depthWrite:!1,side:2,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(map, vUv);
        // Balayage lumineux qui traverse le titre toutes les quelques secondes
        float sweep = smoothstep(0.06, 0.0, abs(vUv.x - fract(uTime * 0.18) * 1.6 + 0.3));
        // Fines lignes d'hologramme et léger scintillement
        float lines = 0.9 + 0.1 * sin(vUv.y * 420.0 + uTime * 4.0);
        float flicker = 0.96 + 0.04 * sin(uTime * 23.0) * sin(uTime * 7.0);
        vec3 col = tex.rgb * lines * flicker + vec3(0.6, 0.95, 1.0) * sweep * tex.a * 0.8;
        gl_FragColor = vec4(col * 1.0, tex.a);
        #include <colorspace_fragment>
      }
    `}),E=new Z(new jo(16.4,5.125),T);E.position.y=3.6,E.renderOrder=10,n.add(E),e.add(n);let D=[];for(let t=0;t<3;t++){let n=new wn,r=new Z(new sa(.45,.45,1.8,8),a);r.rotation.z=Math.PI/2;let i=new Z(new aa(2.6,.06,.9),o);i.position.x=-2;let l=new Z(new aa(2.6,.06,.9),o);l.position.x=2;let u=new Z(new No(.16,8,8),t===0?c:s);u.position.y=.55,n.add(r,i,l,u),e.add(n),D.push({mesh:n,angle:t/3*Math.PI*2,radius:26+t*6,yOffset:11+t*3.5,speed:.16-t*.02})}function O(e){i.value=e,n.position.y=r+Math.sin(e*1.8)*.16,f.rotation.z=e*.06,d.rotation.y=e*.06,y.rotation.z=e*.05,b.rotation.z=-e*.04,h.scale.setScalar(1+Math.sin(e*2.6)*.08),E.position.y=3.6+Math.sin(e*1.1)*.12,D.forEach(t=>{let n=t.angle+e*t.speed;t.mesh.position.set(Math.cos(n)*t.radius,r+t.yOffset,Math.sin(n)*t.radius),t.mesh.rotation.y=-n})}return{group:n,update:O}}function wS(){let e=document.createElement(`canvas`);e.width=1024,e.height=1024;let n=e.getContext(`2d`);n.fillStyle=`#0c1322`,n.fillRect(0,0,1024,1024);for(let e=0;e<1024;e+=128)for(let t=0;t<1024;t+=128)n.fillStyle=(e+t)%256==0?`#111a2e`:`#0e1628`,n.fillRect(e+3,t+3,122,122),n.strokeStyle=`#1e293b`,n.lineWidth=2,n.strokeRect(e+3,t+3,122,122),n.fillStyle=`#334155`,n.fillRect(e+10,t+10,4,4),n.fillRect(e+128-14,t+10,4,4),n.fillRect(e+10,t+128-14,4,4),n.fillRect(e+128-14,t+128-14,4,4);n.strokeStyle=`rgba(0, 243, 255, 0.35)`,n.lineWidth=3,n.beginPath(),n.moveTo(0,256),n.lineTo(1024,256),n.moveTo(0,768),n.lineTo(1024,768),n.moveTo(256,0),n.lineTo(256,1024),n.moveTo(768,0),n.lineTo(768,1024),n.stroke();let r=new ta(e);return r.wrapS=t,r.wrapT=t,r.repeat.set(8,8),r.anisotropy=8,r.colorSpace=Ae,r}function TS(){let e=document.createElement(`canvas`);e.width=1024,e.height=1024;let n=e.getContext(`2d`);n.fillStyle=`#080e1a`,n.fillRect(0,0,1024,1024),n.strokeStyle=`#17233b`,n.lineWidth=4;for(let e=0;e<1024;e+=64)n.beginPath(),n.moveTo(0,e),n.lineTo(1024,e),n.stroke();for(let e=0;e<1024;e+=128)n.beginPath(),n.moveTo(e,0),n.lineTo(e,1024),n.stroke();n.strokeStyle=`rgba(0, 243, 255, 0.45)`,n.lineWidth=3;for(let e=0;e<24;e++){let t=Math.floor(Math.random()*8)*128,r=Math.floor(Math.random()*16)*64;n.beginPath(),n.moveTo(t,r),t+=128,n.lineTo(t,r),r+=64,n.lineTo(t,r),t+=128,n.lineTo(t,r),n.stroke(),n.fillStyle=e%3==0?`#ff3dbb`:`#22e4ff`,n.beginPath(),n.arc(t,r,5,0,Math.PI*2),n.fill()}let r=new ta(e);return r.wrapS=t,r.wrapT=t,r.repeat.set(4,2),r.colorSpace=Ae,r}function ES(){let e=1024,t=document.createElement(`canvas`);t.width=256,t.height=e;let n=t.getContext(`2d`);n.fillStyle=`#4a5068`,n.fillRect(0,0,256,e);for(let t=0;t<e;t+=128)for(let e=0;e<256;e+=64){let r=64+Math.floor(Math.random()*22);n.fillStyle=`rgb(${r}, ${r+4}, ${r+18})`,n.fillRect(e+2,t+2,60,124),n.fillStyle=`#9aa2b8`,[[8,8],[54,8],[8,118],[54,118]].forEach(([r,i])=>{n.beginPath(),n.arc(e+r,t+i,2.2,0,Math.PI*2),n.fill()})}n.fillStyle=`#12141c`;for(let t=0;t<e;t+=128)n.fillRect(0,t,256,3);for(let t=0;t<256;t+=64)n.fillRect(t,0,3,e);for(let t=0;t<260;t++)n.fillStyle=`rgba(20, 22, 30, ${.15+Math.random()*.25})`,n.fillRect(Math.random()*256,Math.random()*e,1+Math.random()*3,4+Math.random()*20);for(let e=-40;e<296;e+=28)n.fillStyle=`#c99a1a`,n.beginPath(),n.moveTo(e,974),n.lineTo(e+14,974),n.lineTo(e+34,1020),n.lineTo(e+20,1020),n.closePath(),n.fill();let r=new ta(t);return r.colorSpace=Ae,r.anisotropy=8,r}function DS(){let e=1024,t=document.createElement(`canvas`);t.width=256,t.height=e;let n=t.getContext(`2d`);n.fillStyle=`#000`,n.fillRect(0,0,256,e);for(let e=0;e<4;e++){let t=(e+.5)*64-3;for(let e=0;e<960;e+=128){let r=n.createLinearGradient(t-6,0,t+12,0);r.addColorStop(0,`rgba(255,255,255,0)`),r.addColorStop(.5,`rgba(255,255,255,1)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(t-6,e+14,18,100)}}let r=new ta(t);return r.anisotropy=8,r}function OS(e){let t=new wn,n=wS(),r=TS(),i=new Ko({map:n,bumpMap:n,bumpScale:.08,metalness:.75,roughness:.35}),a=new Ko({map:r,emissiveMap:r,emissive:new X(3718648),emissiveIntensity:.41,metalness:.7,roughness:.4,side:2}),o=new Ko({color:1449776,metalness:.88,roughness:.25}),s=new Ur({color:new X(0,1.75,2.1),toneMapped:!1}),c=new Ur({color:new X(2.8,.1,1.5),toneMapped:!1}),l=new Z(new sa(18,18,22,16,1,!0),a);l.position.set(0,-10,4),t.add(l);for(let e=-2;e>=-18;e-=4){let n=new Z(new Po(17.6,.12,8,24),e%8==0?c:s);n.rotation.x=Math.PI/2,n.position.set(0,e,4),t.add(n)}let u=new Z(new jo(100,120),i);u.rotation.x=-Math.PI/2,u.position.set(0,-48,-4),t.add(u);let d=new Z(new jo(100,120),a);d.rotation.x=Math.PI/2,d.position.set(0,-18,-4),t.add(d);let f=new Z(new aa(100,34,2),a);f.position.set(0,-32,-34),t.add(f),[-31,31].forEach(e=>{let n=new Z(new aa(2,34,120),a);n.position.set(e,-32,-4),t.add(n)});for(let e=-28;e<=28;e+=9){let n=new Z(new Po(28,.8,10,32,Math.PI),o);n.position.set(0,-46,e),t.add(n);let r=new Z(new Po(27,.07,8,32,Math.PI),e%18==0?c:s);r.position.set(0,-46,e),t.add(r)}[-26.5,26.5].forEach(e=>{for(let n=-24;n<=18;n+=7){let r=new Z(new aa(2.4,9.5,4.2),o);r.position.set(e,-43.2,n),t.add(r);let i=new Z(new aa(.1,8.2,.16),n%14==0?c:s);i.position.set(e>0?e-1.25:e+1.25,-43.2,n+1.4),t.add(i)}let n=new Z(new aa(3.8,.4,96),o);n.position.set(e>0?24:-24,-36.5,-4),t.add(n),[14.5,17.5].forEach((n,r)=>{let i=new Z(new sa(.85,.85,96,16),o);i.rotation.x=Math.PI/2,i.position.set(e>0?25.5:-25.5,-48+n,-4),t.add(i);for(let e=-26;e<=22;e+=14){let n=new Z(new Po(.95,.06,8,24),r===0?c:s);n.position.set(i.position.x,i.position.y,e),t.add(n)}})});let p=new wn;p.position.set(0,-32.5,-3.5);let m=new Z(new Ao(2.1,0),new Ur({color:new X(.1,2.7,3),wireframe:!0,toneMapped:!1})),h=new Z(new Oo(1.2,0),c),g=new Z(new Po(3.2,.08,10,48),s),_=new Z(new Po(4.1,.07,10,48),c);_.rotation.x=Math.PI/3;let v=new Z(new sa(.25,.25,29,12,1,!0),new Ur({color:62463,transparent:!0,opacity:.22,side:2}));v.position.y=-1,p.add(m,h,g,_,v),t.add(p);let y=new Z(new jo(8.5,98),new Ko({color:267042,emissive:13124,emissiveIntensity:.65,metalness:.95,roughness:.08}));y.rotation.x=-Math.PI/2,y.position.set(0,-47.94,-4),t.add(y),[-4.4,4.4].forEach(e=>{let n=new Z(new aa(.5,.45,98),o);n.position.set(e,-47.78,-4),t.add(n);let r=new Z(new aa(.12,.1,98),s);r.position.set(e>0?e-.22:e+.22,-47.54,-4),t.add(r)});let b=new Z(new jo(6.5,18),new Ur({color:62463,transparent:!0,opacity:.16,side:2}));b.rotation.x=-Math.PI/2,b.position.set(0,-47.91,-15),t.add(b);let x=[];[-14,14].forEach((e,n)=>{let r=new Z(new Po(4.4,.35,10,24),o);r.position.set(e,-34.5,-32.6),t.add(r);let i=new wn;i.position.set(e,-34.5,-32.4);for(let e=0;e<6;e++){let t=new Z(new aa(.7,4,.12),o);t.rotation.z=e/6*Math.PI*2,i.add(t)}t.add(i),x.push({mesh:i,dir:n===0?1:-1})});let S=new Ys(3718648,33,80);S.position.set(0,-32,12),t.add(S);let C=new Ys(16711807,34,75);C.position.set(0,-34,-18),t.add(C);let w=[{id:0,label:`pillar-0`,name:`BRYAN (JMG)`,role:`Développeur Principal — Bot & Site 3D`,tag:`COLLAB 01 // DÉVELOPPEUR`,color:`#22e4ff`,pos:new Y(0,-48,7),camPos:new Y(0,-42.8,16.5)},{id:1,label:`pillar-1`,name:`YANIS`,role:`Secrétaire, Suivi & Renfort Code`,tag:`COLLAB 02 // SECRÉTARIAT`,color:`#ff3dbb`,pos:new Y(-8.5,-48,-2.5),camPos:new Y(-14.5,-42.8,6.2)},{id:2,label:`pillar-2`,name:`ESGI REIMS`,role:`Campus & Cadre Académique`,tag:`COLLAB 03 // ÉCOLE`,color:`#8b5cf6`,pos:new Y(-15.5,-48,-12.5),camPos:new Y(-19.5,-42.8,-2.2)},{id:3,label:`pillar-3`,name:`GEMINI & CLAUDE`,role:`Assistants IA — 3D, Code & Contenu`,tag:`COLLAB 04 // ASSISTANTS IA`,color:`#22e4ff`,pos:new Y(15.5,-48,-12.5),camPos:new Y(19.5,-42.8,-2.2)},{id:4,label:`pillar-4`,name:`REMERCIEMENTS`,role:`T. Pierson, Grégoire, Équipe & Élèves`,tag:`COLLAB 05 // COMMUNAUTÉ`,color:`#ff3dbb`,pos:new Y(8.5,-48,-2.5),camPos:new Y(14.5,-42.8,6.2)}],T=[new Y(0,-47.86,7),new Y(-15.5,-47.86,-12.5),new Y(15.5,-47.86,-12.5),new Y(0,-47.86,7)];t.add(new Vi(new Dr().setFromPoints(T),new Ni({color:62463})));let E=[],D=[],O=ES(),k=DS(),A=new Ko({color:10133684,map:O,roughnessMap:O,bumpMap:O,bumpScale:.04,metalness:.8,roughness:.55,envMapIntensity:1}),j=new Ko({color:12633812,metalness:1,roughness:.16,envMapIntensity:1.3});w.forEach(e=>{let n=new wn,r=A.clone();r.emissiveMap=k,r.emissive=new X(e.color);let i=e.color===`#22e4ff`;r.emissiveIntensity=i?1.15:1.8,n.position.copy(e.pos);let a=i?s:c,o=new Z(new sa(2.1,2.5,1.8,24),A);o.position.y=.9,n.add(o);let l=new Z(new sa(1.25,1.55,30,32),r);l.position.y=15,n.add(l);for(let e=0;e<4;e++){let t=e/4*Math.PI*2+Math.PI/4,r=new Z(new sa(.18,.24,29,12),j);r.position.set(Math.cos(t)*1.65,14.5,Math.sin(t)*1.65),n.add(r)}let u=new Z(new Po(1.85,.07,12,32),a);u.rotation.x=Math.PI/2,u.position.y=2.4,n.add(u);let d=new Z(new Po(1.75,.07,12,32),a);d.rotation.x=Math.PI/2,d.position.y=8.2,n.add(d);let f=new Y(e.pos.x,-27,e.pos.z),p=new Y(0,-32.5,-3.5),m=new Z(new sa(.06,.06,f.distanceTo(p),6),a);m.position.copy(f).lerp(p,.5),m.quaternion.setFromUnitVectors(new Y(0,1,0),p.clone().sub(f).normalize()),t.add(m);let h=e.camPos.x-e.pos.x,g=e.camPos.z-e.pos.z,_=Math.hypot(h,g)||1,v=Math.atan2(h,g),y=bS(e.tag,e.name,[e.role,`Cliquer ou scroller pour explorer`],e.color,5.4,2.7);y.position.set(h/_*2.05,5.2,g/_*2.05),y.rotation.set(0,v,0),n.add(y);let b=new Z(new sa(2.6,2.6,14,12),new Ur({visible:!1}));b.position.y=7,b.userData={label:e.label},n.add(b),E.push(b),y.traverse(t=>{t.isMesh&&(t.userData={label:e.label},E.push(t))}),D.push({ringLower:u,ringUpper:d,offset:e.id*1.3}),t.add(n)}),e.add(t);function M(e,t){D.forEach(e=>{e.ringLower.position.y=2.4+Math.sin(t*2.2+e.offset)*.35,e.ringUpper.position.y=8.2-Math.sin(t*2.2+e.offset)*.35}),x.forEach(t=>{t.mesh.rotation.z+=e*1.4*t.dir}),m.rotation.y=t*.9,m.rotation.x=t*.5,h.rotation.y=-t*1.3,g.rotation.z=t*.7,_.rotation.y=-t*.6,b.position.z=-35+t*15%72}return{floorY:-48,pillarsData:w,interactivePillarObjects:E,update:M}}function kS(e){let t=new Nn,n=new Wo({side:1,depthWrite:!1,vertexShader:`
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
    `});t.add(new Z(new No(50,32,16),n));let r=new Z(new No(1.6,16,8),new Ur({color:new X(4,4.2,5)}));r.position.set(20,34,22),t.add(r);let i=[new X(.3,3,3.6),new X(3.4,.4,2.2),new X(1.6,.8,3.4)];for(let e=0;e<26;e++){let n=e/26*Math.PI*2,r=e%3==0,a=new Z(new jo(r?.6:2+e%3,r?6:.35+e%2*.5),new Ur({color:i[e%3].clone().multiplyScalar(1.6),side:2}));a.position.set(Math.cos(n)*40,(r?4:1)+e%5*3,Math.sin(n)*40),a.lookAt(0,a.position.y,0),t.add(a)}let a=new Jc(e),o=a.fromScene(t,.02).texture;return a.dispose(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),o}function AS(e){let t=new Nn,n=new Wo({side:1,depthWrite:!1,vertexShader:`
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
    `});t.add(new Z(new No(50,32,16),n));let r=new Z(new No(2.4,16,8),new Ur({color:new X(12,11,9.5)}));r.position.set(20,34,22),t.add(r);let i=new Jc(e),a=i.fromScene(t,.02).texture;return i.dispose(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),a}function jS(){let e=document.createElement(`canvas`);e.width=1024,e.height=512;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,512);n.addColorStop(0,`#ffffff`),n.addColorStop(.5,`#f4f6fc`),n.addColorStop(1,`#dde2ef`),t.fillStyle=n,t.fillRect(0,0,1024,512),t.fillStyle=`rgba(120, 130, 165, 0.35)`,t.fillRect(0,262,1024,3),t.fillStyle=`rgba(255, 255, 255, 0.9)`,t.fillRect(0,265,1024,2);for(let e=0;e<4;e++){let n=128+e*256;for(let e=0;e<3;e++)t.fillStyle=`rgba(110, 120, 160, 0.3)`,t.beginPath(),t.roundRect(n-24,330+e*12,48,5,3),t.fill()}let r=new ta(e);return r.colorSpace=Ae,r.anisotropy=8,r}function MS(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`),n=new ta(e);n.colorSpace=Ae;let r=`#62f4ff`,i=[178,334],a=``;function o(e){t.strokeStyle=r,t.lineWidth=e,t.lineCap=`round`,t.lineJoin=`round`}function s(){[118,394].forEach(e=>{let n=t.createRadialGradient(e,318,0,e,318,46);n.addColorStop(0,`rgba(255, 110, 190, 0.85)`),n.addColorStop(1,`rgba(255, 110, 190, 0)`),t.fillStyle=n,t.beginPath(),t.ellipse(e,318,46,28,0,0,Math.PI*2),t.fill()})}let c={open(){t.fillStyle=r,i.forEach(e=>{t.beginPath(),t.ellipse(e,222,34,50,0,0,Math.PI*2),t.fill(),t.fillStyle=`rgba(255,255,255,0.9)`,t.beginPath(),t.ellipse(e-11,202,11,14,-.4,0,Math.PI*2),t.fill(),t.fillStyle=r})},sleepy(){t.fillStyle=r,i.forEach(e=>{t.save(),t.beginPath(),t.rect(e-40,218,80,60),t.clip(),t.beginPath(),t.ellipse(e,222,34,50,0,0,Math.PI*2),t.fill(),t.restore()}),o(10),i.forEach(e=>{t.beginPath(),t.moveTo(e-38,218),t.lineTo(e+38,218),t.stroke()})},blink(){o(14),i.forEach(e=>{t.beginPath(),t.moveTo(e-32,228),t.lineTo(e+32,228),t.stroke()})},happy(){o(20),i.forEach(e=>{t.beginPath(),t.arc(e,244,34,Math.PI*1.1,Math.PI*1.9),t.stroke()})},sleep(){o(14),i.forEach(e=>{t.beginPath(),t.arc(e,216,30,Math.PI*.15,Math.PI*.85),t.stroke()})},dizzy(){o(9),i.forEach(e=>{t.beginPath();for(let n=0;n<Math.PI*5;n+=.15){let r=4+n*2.6,i=e+Math.cos(n)*r,a=222+Math.sin(n)*r;n===0?t.moveTo(i,a):t.lineTo(i,a)}t.stroke()})},angry(){o(18),[[i[0],1],[i[1],-1]].forEach(([e,n])=>{t.beginPath(),t.moveTo(e-26*n,192),t.lineTo(e+24*n,222),t.lineTo(e-26*n,252),t.stroke()})}},l={smile(){o(16),t.beginPath(),t.arc(256,300,40,Math.PI*.18,Math.PI*.82),t.stroke()},open(){t.fillStyle=r,t.beginPath(),t.moveTo(214,320),t.quadraticCurveTo(256,316,298,320),t.quadraticCurveTo(292,382,256,384),t.quadraticCurveTo(220,382,214,320),t.fill(),t.fillStyle=`rgba(255, 110, 190, 0.9)`,t.beginPath(),t.ellipse(256,366,22,10,0,0,Math.PI*2),t.fill()},grin(){t.fillStyle=r,t.beginPath(),t.moveTo(198,318),t.quadraticCurveTo(256,314,314,318),t.quadraticCurveTo(300,396,256,398),t.quadraticCurveTo(212,396,198,318),t.fill()},o(){o(12),t.beginPath(),t.ellipse(256,340,14,18,0,0,Math.PI*2),t.stroke()},flat(){o(14),t.beginPath(),t.moveTo(226,340),t.lineTo(286,340),t.stroke()},wavy(){o(12),t.beginPath();for(let e=210;e<=302;e+=4){let n=340+Math.sin((e-210)*.14)*9;e===210?t.moveTo(e,n):t.lineTo(e,n)}t.stroke()}};function u(e,i,o=!1){let u=`${e}/${i}/${o}`;u!==a&&(a=u,t.clearRect(0,0,512,512),t.fillStyle=`#000`,t.fillRect(0,0,512,512),t.shadowColor=r,t.shadowBlur=18,s(),c[e](),l[i](),o&&(t.fillStyle=r,t.font=`bold 54px sans-serif`,t.fillText(`z`,360,130),t.font=`bold 38px sans-serif`,t.fillText(`z`,404,92)),t.shadowBlur=0,n.needsUpdate=!0)}return u(`open`,`smile`),{texture:n,set:u}}function NS(){let e=document.createElement(`canvas`);e.width=128,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,256,0,0);n.addColorStop(0,`rgba(150, 235, 255, 0.95)`),n.addColorStop(1,`rgba(200, 245, 255, 0.55)`),t.fillStyle=n,t.beginPath(),t.ellipse(64,128,60,124,0,0,Math.PI*2),t.fill(),t.strokeStyle=`rgba(255, 255, 255, 0.95)`,t.lineWidth=7,t.stroke(),t.strokeStyle=`rgba(255, 255, 255, 0.6)`,t.lineWidth=4,t.beginPath(),t.moveTo(64,246),t.quadraticCurveTo(54,128,72,30),t.stroke();let r=new ta(e);return r.colorSpace=Ae,r}function PS(){let e=new wn,t=.3,n=new qo({color:16777215,map:jS(),metalness:0,roughness:.34,clearcoat:1,clearcoatRoughness:.1,sheen:.35,sheenRoughness:.5,sheenColor:new X(15923455),iridescence:.15,iridescenceIOR:1.3,envMapIntensity:1.1}),r=new qo({color:10479862,roughness:.32,clearcoat:1,clearcoatRoughness:.12,sheen:.5,sheenColor:new X(16777215),envMapIntensity:1}),i=new qo({color:16754392,roughness:.32,clearcoat:1,clearcoatRoughness:.12,sheen:.5,sheenColor:new X(16777215),envMapIntensity:1}),a=new qo({color:4014944,metalness:.55,roughness:.28,clearcoat:.6,envMapIntensity:1.2}),o=MS(),s=new qo({color:461852,emissive:16777215,emissiveMap:o.texture,emissiveIntensity:1.6,metalness:.2,roughness:.05,clearcoat:1,clearcoatRoughness:.03,iridescence:.35,iridescenceIOR:1.6,envMapIntensity:1.6}),c=new Ur({color:16777215,transparent:!0,opacity:.6,depthWrite:!1}),l=new Ur({color:new X(.5,2.6,3.4),toneMapped:!1}),u=new Ur({color:new X(2.8,.4,1.8),toneMapped:!1}),d=new Ur({map:NS(),color:new X(1.15,1.15,1.2),transparent:!0,depthWrite:!1,side:2,toneMapped:!1}),f=new Z(new No(t,72,48),n);f.scale.set(1.04,.96,1),e.add(f);let p=.98,m=t*1.012,h=new No(m,64,32,0,Math.PI*2,0,p);h.rotateX(Math.PI/2);let g=m*Math.sin(p),_=h.attributes.position,v=h.attributes.uv;for(let e=0;e<_.count;e++)v.setXY(e,_.getX(e)/(2*g)+.5,_.getY(e)/(2*g)+.5);let y=new Z(h,s);y.scale.copy(f.scale),e.add(y);let b=new Z(new Po(g,.017,14,80),r);b.position.z=m*Math.cos(p),b.scale.copy(f.scale),e.add(b);let x=new Z(new oa(.03,20),c);x.scale.set(1.9,.6,1),x.position.set(-.1,.13,.25),x.lookAt(new Y(-.1,.13,.25).multiplyScalar(3)),x.rotateZ(.6),e.add(x);let S=new Z(new oa(.012,14),c);S.position.set(-.035,.165,.258),S.lookAt(new Y(-.035,.165,.258).multiplyScalar(3)),e.add(S),[[-.075,r],[.075,i]].forEach(([n,r])=>{let i=new Z(new Po(Math.sqrt(t*t-n*n)+.004,.011,10,60,Math.PI*.62),r);i.rotation.y=Math.PI/2,i.rotation.x=Math.PI*.12,i.position.x=n,i.scale.set(1,.96,1),e.add(i)}),[-1,1].forEach(t=>{let n=new Z(new sa(.075,.08,.04,40),i);n.rotation.z=Math.PI/2,n.position.set(t*.305,-.01,-.02),e.add(n);let a=new Z(new sa(.045,.05,.02,32),r);a.rotation.z=Math.PI/2,a.position.set(t*.33,-.01,-.02),e.add(a)});let C=[];[-1,1].forEach(t=>{let n=new wn;n.position.set(t*.1,.24,-.1);let r=new wn;r.rotation.z=-t*.38,r.rotation.x=-.35;let i=new Z(new jo(.15,.32),d);i.position.y=.15,r.add(i),n.add(r),n.userData.side=t,e.add(n),C.push(n)});let w=new wn;w.position.set(0,.27,.04);let T=new Z(new No(.026,20,12,0,Math.PI*2,0,Math.PI/2),i),E=new Z(new sa(.007,.011,.1,12),a);E.position.y=.05;let D=new Ba;D.moveTo(0,-.03),D.bezierCurveTo(-.045,0,-.035,.035,0,.018),D.bezierCurveTo(.035,.035,.045,0,0,-.03);let O=new To(D,{depth:.014,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:4,curveSegments:20});O.center();let k=new Z(O,u);k.scale.setScalar(1.2),k.position.y=.125,w.add(T,E,k),e.add(w);let A=[];[-1,1].forEach(t=>{let n=new Z(new No(.055,32,20),a);n.scale.set(1,1,1.2),n.position.set(t*.1,-.1,-.25),e.add(n);let i=new Z(new Po(.042,.009,10,32),r);i.position.set(t*.1,-.1,-.312),e.add(i);let o=new Z(new oa(.037,24),l);o.rotation.y=Math.PI,o.position.set(t*.1,-.1,-.318),e.add(o),A.push(new Y(t*.1,-.1,-.34))});let j=new wn;for(;e.children.length;)j.add(e.children[0]);return e.add(j),{ship:e,nozzles:A,face:o,antenna:w,wings:C,heart:k,rig:j,mats:{hullMat:n,pastelMat:r}}}function FS(e,t,n){let{ship:r,nozzles:i,face:a,antenna:o,wings:s,heart:c,rig:l,mats:u}=PS(),d=null,f=0,p=!1,m=0,h=0,g=!1,_=!1,v=null;r.scale.setScalar(1.05),r.userData.glowScale=!0,e.add(r),n&&(i.forEach(e=>{n.add(r,e,sS.engineCyan,.38),n.add(r,e,[.6,1.6,2.2],.22,{speed:9,phase:e.x,duty:.6})}),n.add(r,new Y(-.345,-.01,-.02),sS.navRed,.06),n.add(r,new Y(.345,-.01,-.02),sS.navGreen,.06),n.add(r,new Y(0,.395,.04),[2.4,.4,1.6],.16,{speed:.7,phase:.3,duty:.5}));let y=new Float32Array(288),b=new Float32Array(96);b.fill(1);let x=new Dr;x.setAttribute(`position`,new fr(y,3).setUsage(Ie)),x.setAttribute(`age`,new fr(b,1).setUsage(Ie));let S=new Wo({uniforms:{uScale:{value:window.innerHeight}},transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,vertexShader:`
      attribute float age;
      uniform float uScale;
      varying float vAge;
      void main() {
        vAge = age;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp((0.09 * (1.0 - age) + 0.02) * uScale / -mv.z, 0.0, 64.0);
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
    `}),C=new Qi(x,S);C.frustumCulled=!1,e.add(C);let w=0,T=0,E=new Y,D=new Y,O=new Y,k=new Y,A=new Y,j=new Y,M=new Y,N=new Y(0,0,-1),P=new Y,F=new Y,I=new Y,ee=new Y,te=new Y,ne=!1,L=2.5,re=1,ie=!1,R=0,z=new Tt,B=new Cn,ae=!1,oe=0,se=0,ce=document.getElementById(`companion-bubble`),V=ce?ce.querySelector(`.companion-text`):null,le=null,ue=null,de=!1;function fe(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]).replace(/(https?:\/\/[^\s]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`)}function pe(e,t=4500){if(!ce||!V)return;clearInterval(le),clearTimeout(ue),V.textContent=``,ce.classList.add(`visible`),de=!0,ie=!0;let n=Array.from(e),r=0;le=setInterval(()=>{V.textContent+=n[r],r++,r>=n.length&&(clearInterval(le),e.includes(`http`)&&(V.innerHTML=fe(e)))},26),ue=setTimeout(me,t+n.length*26)}function me(){ce&&(clearInterval(le),ce.classList.remove(`visible`),de=!1,ie=!1)}let he=new Y,ge=new Y;function _e(){if(!ce||!de)return;if(he.copy(D).project(t),he.z>1){ce.style.opacity=`0`;return}ce.style.opacity=``;let e=window.innerWidth,n=window.innerHeight,i=(he.x+1)*.5*e,a=(1-he.y)*.5*n,o=ce.offsetWidth,s=ce.offsetHeight;ge.set(1,0,0).applyQuaternion(t.quaternion).multiplyScalar(.36*r.scale.x).add(D).project(t);let c=Math.max(Math.abs((ge.x+1)*.5*e-i),14),l=i-c-18-o>=12?`left`:`right`,u=l===`left`?i-c-18-o:i+c+18,d=a+c*.2,f=d-s*.5;u=Math.min(Math.max(u,12),e-o-12),f=Math.min(Math.max(f,64),n-s-12),ce.dataset.side=l,ce.style.transform=`translate(${Math.round(u)}px, ${Math.round(f)}px)`;let p=Math.min(Math.max(d-f,18),s-18);ce.style.setProperty(`--tail-y`,`${Math.round(p)}px`)}function H(e,n,u){let v=u.portrait,S=u.progress,C=!!u.cabin,ce=C?-1.25:v?-5.6:-5.2,V=Math.tan(wt.degToRad(t.fov/2))*-ce,le=V*t.aspect,ue=C?-le*(v?.45:.62):le*(v?.55:.74),de=-V*(C?v?.72:.42:v?.5:.6);r.scale.setScalar(C?.15:1.05),A.set(ue+Math.sin(S*41)*le*.08,de+Math.sin(S*27+1.2)*V*.07+Math.sin(n*1.4)*.05,ce+Math.cos(S*33)*.35),A.y+=wt.clamp(-u.verticalSpeed*.01,-.3,.25);let fe=C?0:wt.smoothstep(u.idle,10,12.5);if(fe>0){se+=e;let t=se;j.set(Math.sin(t*.42)*(v?.9:2.6)+Math.sin(t*1.1)*.3,Math.sin(t*.63+.8)*(v?1.4:1),-5.6+Math.sin(t*.31)*1.6),A.lerp(j,fe)}else se=0;k.copy(A),t.localToWorld(k),ae||=(D.copy(k),!0);let me=2*Math.sqrt(26)*.85;O.addScaledVector(k.clone().sub(D),26*e),O.multiplyScalar(Math.max(0,1-me*e)),D.addScaledVector(O,e),(D.distanceTo(k)>25||u.teleport)&&D.copy(k),t.getWorldDirection(P),te.set(1,0,0).applyQuaternion(t.quaternion),ne&&ee.copy(A).sub(I).divideScalar(Math.max(e,.001)),I.copy(A),ne=!0;let he=ee.length();if(M.copy(P).multiplyScalar(-1).addScaledVector(te,(u.portrait?-.25:-.45)*(C?-1:1)),he>.15){let e=ee.clone().applyQuaternion(t.quaternion).normalize();M.addScaledVector(e,Math.min(he,2)*.9)}M.normalize(),B.position.copy(D),B.up.copy(t.up).applyQuaternion(t.quaternion),F.copy(D).add(M),B.lookAt(F);let ge=N.clone().cross(M).dot(B.up)/Math.max(e,.001);oe=wt.lerp(oe,wt.clamp(-ge*.9,-.9,.9),1-Math.exp(-e*4)),N.copy(M),B.rotateZ(oe+Math.sin(n*1.7)*.04),z.copy(B.quaternion),r.position.copy(D),r.quaternion.slerp(z,1-Math.exp(-e*7)),L-=e,L<=0&&(re=0,L=2+Math.random()*3),re=Math.min(1,re+e*7);let H=1-Math.sin(re*Math.PI)*.9,ve=performance.now(),U=ve<h;g&&!U&&pe(`Ah ! Bien dormi 😊 On reprend ?`,3500),g=U,p=!!u.dancing&&!U;let ye=ve<m,be=ve<f?d:null,xe=ie&&Math.floor(n*8)%2==0;U?a.set(`sleep`,`o`,!0):ye?a.set(`dizzy`,`wavy`):be===`angry`?a.set(`angry`,`flat`):p?a.set(`happy`,`grin`):be===`happy`?a.set(`happy`,xe?`open`:`grin`):H<.5?a.set(`blink`,xe?`open`:`smile`):ie?a.set(`happy`,xe?`open`:`smile`):_?a.set(`sleepy`,`o`):a.set(`open`,`smile`),o.rotation.z=Math.sin(n*2.3)*.18-oe*.5,o.rotation.x=Math.sin(n*1.7)*.1,R+=e*(U?1.5:6+Math.min(he,3)*4+(p?6:0)),s.forEach(e=>{e.rotation.z=-e.userData.side*Math.sin(R)*.32}),c.rotation.y+=e*(p?5:1.6);let Se=1-Math.exp(-e*12),Ce=0,we=0,Te=0,W=0;if(p){let e=92/60*n,t=e%1,r=Math.floor(e),i=r%4==3;Ce=Math.exp(-t*6),we=Math.sin(Math.PI*t)*(i?.17:.05),Te=Math.exp(-t*10),W=(r%2?1:-1)*.1*Ce,i&&(Ce=-.6*Math.sin(Math.PI*t))}U&&(Ce=.8+Math.sin(n*1.2)*.1),l.rotation.x=wt.lerp(l.rotation.x,Ce*.42,Se),ve<m?l.rotation.y+=e*14:l.rotation.y=wt.lerp(l.rotation.y%(Math.PI*2),0,Se),l.rotation.z=wt.lerp(l.rotation.z,W,Se),o.rotation.x+=-Ce*.9,l.position.y=Math.sin(n*2.4)*.025+we;let Ee=wt.clamp(he*.04,0,.14),De=wt.lerp(l.scale.z,1+Ee,1-Math.exp(-e*6)),G=p?Te*.14:0;l.scale.set((1-(De-1)*.5)*(1+G*.5),(1-(De-1)*.5)*(1-G),De),T+=e;for(let t=0;t<b.length;t++)b[t]=Math.min(1,b[t]+e/.9);T>.02&&(T=0,r.updateMatrixWorld(),i.forEach((e,t)=>{E.copy(e),r.localToWorld(E);let n=w*2+t;y[n*3]=E.x,y[n*3+1]=E.y,y[n*3+2]=E.z,b[n]=0}),w=(w+1)%48,x.attributes.position.needsUpdate=!0),x.attributes.age.needsUpdate=!0,_e()}function ve(e,t){S.uniforms.uScale.value=e/(2*Math.tan(wt.degToRad(t)/2))}let U=new yr;function ye(e){return U.center.copy(D),U.radius=.7*r.scale.x,e.ray.intersectsSphere(U)}function be(){u.hullMat.color.set(16768122),u.hullMat.metalness=.55,u.hullMat.roughness=.28,u.hullMat.emissive.set(7031308),u.hullMat.emissiveIntensity=.7,u.pastelMat.color.set(16771752),u.pastelMat.metalness=.5,u.pastelMat.roughness=.3,u.pastelMat.emissive.set(7031308),u.pastelMat.emissiveIntensity=.6}function xe(e,t=2.5){d=e,f=performance.now()+t*1e3}function Se(e=1.4){m=performance.now()+e*1e3}function Ce(e=15){h=performance.now()+e*1e3}function we(e){_=e}function Te(){if(v)return;let e=new Ko({color:16763213,metalness:1,roughness:.25,emissive:5913088,emissiveIntensity:.4});v=new wn;let t=new Z(new sa(.13,.12,.07,24,1,!0),e);t.material.side=2,v.add(t);for(let t=0;t<5;t++){let n=t/5*Math.PI*2,r=new Z(new ca(.03,.08,8),e);r.position.set(Math.cos(n)*.125,.07,Math.sin(n)*.125),v.add(r);let i=new Z(new No(.014,10,8),new Ur({color:new X(t%2?2.4:.4,.3,t%2?1.2:2.6),toneMapped:!1}));i.position.set(Math.cos(n)*.13,.115,Math.sin(n)*.13),v.add(i)}v.position.set(0,.3,.02),v.rotation.x=-.15,l.add(v)}return{update:H,say:pe,hide:me,resize:ve,isHit:ye,ship:r,setGolden:be,spin:Se,sleep:Ce,setSleepy:we,setCrown:Te,setMood:xe,get sleeping(){return performance.now()<h}}}function IS(){let e=document.createElement(`canvas`);e.width=512,e.height=96;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,96);n.addColorStop(0,`#141a26`),n.addColorStop(1,`#0a0d14`),t.fillStyle=n,t.fillRect(0,0,512,96),t.font=`700 40px "Space Grotesk", sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillStyle=`#e8c98a`,t.shadowColor=`rgba(255, 200, 120, 0.8)`,t.shadowBlur=10,t.fillText(`E S G I  ·  B O T`,256,50);let r=new ta(e);return r.colorSpace=Ae,r.anisotropy=4,r}function LS(){let e=document.createElement(`canvas`);e.width=128,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,256);n.addColorStop(0,`#2b2a2c`),n.addColorStop(1,`#4a3a28`),t.fillStyle=n,t.fillRect(0,0,128,256),t.strokeStyle=`rgba(255,255,255,0.12)`,t.lineWidth=10,t.beginPath(),t.moveTo(-20,120),t.lineTo(150,20),t.stroke(),t.lineWidth=4,t.beginPath(),t.moveTo(-20,160),t.lineTo(150,60),t.stroke();let r=new ta(e);return r.colorSpace=Ae,r}function RS(e,t,n){let r=new wn;r.position.set(n.x,n.bottom,n.z),e.add(r);let i=n.width,a=n.top-n.bottom,o=Math.min(.5,a*.16),s=a-o-.06,c=i/2-.04,l=new Ko({color:9202239,metalness:.92,roughness:.32,envMapIntensity:1.5,emissive:16756816,emissiveIntensity:0}),u=new Ko({map:LS(),color:16777215,metalness:.6,roughness:.08,envMapIntensity:1.6}),d=new Ko({color:14266986,metalness:1,roughness:.2,envMapIntensity:1.8}),f=new Ur({color:new X(1,1,1).multiplyScalar(3),transparent:!0,opacity:0,toneMapped:!1,depthWrite:!1}),p=new Z(new jo(i,s),f);p.position.set(0,s/2,.01),r.add(p);let m=new Ur({color:new X(1,.97,.9).multiplyScalar(1.4),transparent:!0,opacity:0,toneMapped:!1,depthWrite:!1,side:2,blending:2}),h=new Z(new sa(i*1.6,i*.55,5,4,1,!0),m);h.rotation.set(Math.PI/2,Math.PI/4,0),h.scale.set(1,1,s/i),h.position.set(0,s/2,2.5),r.add(h);let g=.09;[-1,1].forEach(e=>{let t=new Z(new aa(g,a,.12),l);t.position.set(e*(i/2-g/2),a/2,.06),r.add(t)});let _=new Z(new aa(i,g,.12),l);_.position.set(0,a-g/2,.06),r.add(_);let v=new Z(new aa(i,.06,.12),l);v.position.set(0,s+.03,.06),r.add(v);let y=new Z(new jo(i-g*2,o-.06),new Ur({map:IS(),toneMapped:!1}));y.position.set(0,s+.06+(o-.06)/2-.03,.07),r.add(y);let b=[-1,1].map(e=>{let t=new wn;t.position.set(e*(i/2-g),0,.08),r.add(t);let n=new wn;n.position.x=-e*c/2,t.add(n);let a=.08,o=new Z(new aa(c-a*2,s-a*2,.02),u);o.position.y=s/2,n.add(o),[[-1,0],[1,0]].forEach(([e])=>{let t=new Z(new aa(a,s,.06),l);t.position.set(e*(c/2-a/2),s/2,0),n.add(t)}),[a/2,s-a/2,s*.18].forEach((e,t)=>{let r=new Z(new aa(c,t===2?a*1.6:a,.06),l);r.position.set(0,e,0),n.add(r)});let f=new Z(new sa(.018,.018,s*.32,10),d);return f.position.set(-e*(c/2-.16),s*.5,.07),n.add(f),[-1,1].forEach(t=>{let r=new Z(new aa(.02,.02,.06),d);r.position.set(-e*(c/2-.16),s*.5+t*s*.15,.04),n.add(r)}),t.userData.side=e,t});[-1,1].forEach(e=>{let n=new Z(new aa(.1,.34,.08),d);n.position.set(e*(i/2+.2),a*.62,.05),r.add(n),t.add(r,new Y(e*(i/2+.2),a*.62+.12,.12),[1.7,1.25,.75],.4)});let x=new Z(new aa(i+.2,a+.1,.4),new Ur({visible:!1}));x.position.set(0,a/2,.15),r.add(x);let S=new Y(n.x,n.bottom+s/2,n.z),C=0,w=0,T=0,E=0;return{center:S,height:a,isHit(e){return e.intersectObject(x,!1).length>0},setHover(e){E=+!!e},setState(e,t){C=wt.clamp(e,0,1),w=wt.clamp(t,0,1)},update(e){T+=(E-T)*.15,l.emissiveIntensity=T*(.35+.1*Math.sin(e*4));let t=C*C*(3-2*C);b.forEach(e=>{e.rotation.y=e.userData.side*t*1.75}),f.opacity=Math.min(1,w*1.4),m.opacity=w*.35}}}var zS=class extends Error{constructor(e,t){super(e),this.status=t}};async function BS(e,t,n){let r;try{r=await fetch(`/api${t}`,{method:e,credentials:`same-origin`,headers:e===`GET`?{}:{"Content-Type":`application/json`,"X-ESGI-Dashboard":`1`},body:n===void 0?void 0:JSON.stringify(n)})}catch{throw new zS(`Le serveur du tableau de bord ne répond pas.`,0)}if(!(r.headers.get(`content-type`)||``).includes(`application/json`))throw new zS(`Le serveur du tableau de bord ne répond pas.`,0);let i=await r.json();if(!r.ok)throw new zS(i.erreur||`Erreur inconnue.`,r.status);return i}var VS={state:()=>BS(`GET`,`/etat`),floors:()=>BS(`GET`,`/etages`),myFloor:()=>BS(`GET`,`/etage`),logout:()=>BS(`POST`,`/auth/deconnexion`,{}),list:(e,t)=>BS(`GET`,`/serveurs/${e}/${t}`),add:(e,t,n)=>BS(`POST`,`/serveurs/${e}/${t}`,n),update:(e,t,n,r)=>BS(`PUT`,`/serveurs/${e}/${t}/${n}`,r),remove:(e,t,n)=>BS(`DELETE`,`/serveurs/${e}/${t}/${n}`),setClasses:(e,t)=>BS(`PUT`,`/serveurs/${e}/classes`,{roles:t}),setRank:(e,t,n)=>BS(`PUT`,`/serveurs/${e}/rangs/${t}`,{rang:n}),loginUrl:`/api/auth/connexion`};function HS(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}var US=[`https://soundcloud.com/bonjourjesuis/sets/bonjourjesuis`,`https://soundcloud.com/bonjourjesuis/sets/bonjourjesuistoujours`],WS=55,GS=`esgi-ascenseur-muet`,KS=e=>440*2**((e-69)/12);function qS(){return window.SC&&window.SC.Widget?Promise.resolve():new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`https://w.soundcloud.com/player/api.js`,n.async=!0,n.onload=()=>e(),n.onerror=()=>t(Error(`SoundCloud indisponible`)),document.head.appendChild(n)})}function JS(e){return`https://w.soundcloud.com/player/?${new URLSearchParams({url:e,auto_play:`false`,visual:`false`,show_artwork:`false`,show_comments:`false`,sharing:`false`,buying:`false`,download:`false`,show_playcount:`false`,show_user:`true`})}`}function YS(){let e=!1;try{e=localStorage.getItem(GS)===`1`}catch{}let t=null;function n(){if(t)return!0;let e=window.AudioContext||window.webkitAudioContext;return e?(t=new e,!0):!1}let r=null,i=!1,a=!1,o=!1,s=!1,c=!1,l=Math.floor(Math.random()*US.length),u=!1,d=null,f=0,p=null,m=null,h=null,g=null,_=null;function v(e){c!==e&&(c=e,_&&_(e))}function y(e,t,n){clearInterval(p);let i=f,a=performance.now();p=setInterval(()=>{let o=Math.min(1,(performance.now()-a)/t);f=i+(e-i)*o,r&&r.setVolume(Math.round(f)),o>=1&&(clearInterval(p),n&&n())},50)}function b(){r.getSounds(t=>{let n=t.length||1,i=Math.floor(Math.random()*n);n>1&&`${l}:${i}`===d&&(i=(i+1)%n),d=`${l}:${i}`,r.skip(i),r.setVolume(Math.round(f)),setTimeout(()=>{s&&!e&&r.play()},300)})}function x(){a=!0,v(!1),r&&r.pause(),g&&g()}function S(){r&&i&&!a&&!e&&(r.setVolume(Math.round(f)),u?r.play():(u=!0,b()),y(WS,1200),clearTimeout(m),m=setTimeout(()=>{!s||e||a||r.getPosition(t=>{t>0||!s||e||x()})},8e3))}function C(){r||o||a||(o=!0,qS().then(()=>{let t=document.createElement(`iframe`);t.title=`Musique de l’ascenseur (SoundCloud)`,t.allow=`autoplay; encrypted-media`,t.src=JS(US[l]),Object.assign(t.style,{position:`fixed`,left:`0`,bottom:`0`,width:`1px`,height:`1px`,opacity:`0`,pointerEvents:`none`,border:`0`}),t.setAttribute(`aria-hidden`,`true`),t.tabIndex=-1,document.body.appendChild(t),r=window.SC.Widget(t);let n=window.SC.Widget.Events,a=setTimeout(()=>{i||x()},1e4);r.bind(n.READY,()=>{clearTimeout(a),i=!0,s&&S()}),r.bind(n.PLAY,()=>{v(!0),r.getCurrentSound(e=>{e&&h&&h({title:e.title,artist:e.user?e.user.username:``,url:e.permalink_url})})}),r.bind(n.PAUSE,()=>v(!1)),r.bind(n.FINISH,()=>{if(v(!1),!s||e)return;let t=Math.floor(Math.random()*US.length);t===l?b():(l=t,r.load(US[l],{auto_play:!1,visual:!1,show_artwork:!1,show_comments:!1,sharing:!1,buying:!1,download:!1,callback:()=>b()}))}),r.bind(n.ERROR,()=>r.next())}).catch(()=>x()))}function w(){s=!1,clearInterval(p),clearTimeout(m),r&&r.pause(),v(!1)}return window.addEventListener(`pagehide`,w),{get muted(){return e},get playing(){return c},get state(){return t?t.state:`none`},get source(){return a?`indisponible`:i?`soundcloud`:`chargement`},debug(){return{muted:e,playing:c,wanted:s,volume:Math.round(f),source:a?`indisponible`:i?`soundcloud`:`chargement`}},set onTrack(e){h=e},set onFallback(e){g=e},set onPlayingChange(e){_=e},unlock(){n()&&t.state===`suspended`&&t.resume(),C()},setMuted(t){e=t;try{localStorage.setItem(GS,t?`1`:`0`)}catch{}r&&i&&!a&&(t?(clearInterval(p),r.pause(),v(!1)):s&&S())},start(){s=!0,C(),i&&!a&&S()},stop(e=.8){s=!1,clearTimeout(m),r&&i&&y(0,e*1e3,()=>{s||r.pause()})},ding(){if(!n()||e)return;t.state===`suspended`&&t.resume();let r=t.createGain();r.gain.value=.9,r.connect(t.destination),[[88,0],[84,.32]].forEach(([e,n])=>{let i=t.currentTime+n;[[1,.25],[2.76,.06],[5.4,.025]].forEach(([n,a])=>{let o=t.createOscillator(),s=t.createGain();o.type=`sine`,o.frequency.value=KS(e)*n,s.gain.setValueAtTime(0,i),s.gain.linearRampToValueAtTime(a,i+.005),s.gain.exponentialRampToValueAtTime(1e-4,i+1.6),o.connect(s),s.connect(r),o.start(i),o.stop(i+1.7)})})}}}var XS={eleve:`Élève`,delegue:`Délégué`,admin:`Admin du bot`,prof:`Professeur`},ZS=[{name:`/ajouter_un_devoir`,web:`Devoirs`,desc:`Ajoute un devoir pour ta classe`},{name:`/ajouter_une_évaluation`,web:`Évaluations`,desc:`Ajoute une évaluation pour ta classe`},{name:`/lister_les_devoirs`,web:`Devoirs`,desc:`Liste les prochains devoirs`},{name:`/lister_les_évaluations`,web:`Évaluations`,desc:`Liste les prochaines évaluations`},{name:`/configurer_les_classes`,web:`Classes`,desc:`Choisit les rôles qui sont des classes`},{name:`/admin_permission`,web:`Rangs`,desc:`Donne les droits admin du bot à un membre`},{name:`/ping`,web:null,desc:`Vérifie la latence du bot`},{name:`/nouvelle_identité`,web:null,desc:`Supprime tes messages (sur Discord uniquement)`},{name:`/implorer_le_tout_puissant`,web:null,desc:`Sigma Core`}];function QS(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(`fr-FR`,{weekday:`short`,day:`numeric`,month:`long`})}function $S(e){let[t,n,r]=e.split(`-`).map(Number),i=new Date;i.setHours(0,0,0,0);let a=Math.round((new Date(t,n-1,r)-i)/864e5);return a<0?{text:`passé`,tone:`past`}:a===0?{text:`aujourd'hui`,tone:`hot`}:a===1?{text:`demain`,tone:`hot`}:a<=7?{text:`dans ${a} j`,tone:`warm`}:{text:`dans ${a} j`,tone:`calm`}}function eC(e,{say:t,onElevator:n,onLogout:r}){let i=null,a=null,o=`accueil`;e.innerHTML=`
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
    </div>`;let s=t=>e.querySelector(t),c=s(`.dash-nav`),l=s(`.dash-main`),u=s(`.dash-guild`);s(`[data-act="elevator"]`).addEventListener(`click`,n),s(`[data-act="logout"]`).addEventListener(`click`,r),u.addEventListener(`change`,()=>{a=i.serveurs.find(e=>e.id===u.value),f(),p()});function d(){let e=a?a.permissions:{},t=`Il te faut un rôle de classe sur ce serveur. Demande à un admin de configurer les classes.`;return[{id:`accueil`,icon:`◈`,label:`Accueil`,open:!0},{id:`devoirs`,icon:`✎`,label:`Devoirs`,open:e.voir&&i.base.devoirs,why:i.base.devoirs?t:`La base du bot n’a pas encore la table des devoirs : relance le bot.`},{id:`evaluations`,icon:`✓`,label:`Évaluations`,open:e.voir&&i.base.evaluations,why:i.base.evaluations?t:`La base du bot n’a pas encore la table des évaluations : relance le bot.`},{id:`classes`,icon:`◎`,label:`Classes`,open:e.configurer_classes&&i.base.classes,why:`Réservé aux administrateurs du serveur Discord ou du bot.`},{id:`rangs`,icon:`★`,label:`Rangs`,open:e.gerer_rangs&&i.base.rangs,why:`Réservé aux administrateurs du serveur Discord.`},{id:`commandes`,icon:`⌘`,label:`Commandes`,open:!0}]}function f(){c.innerHTML=d().map(e=>`
        <button type="button" class="dash-nav-btn ${e.id===o?`active`:``} ${e.open?``:`locked`}" data-mod="${e.id}">
          <span class="dash-nav-icon">${e.icon}</span>
          <span>${e.label}</span>
          ${e.open?``:`<span class="dash-lock" aria-label="verrouillé">🔒</span>`}
        </button>`).join(``),c.querySelectorAll(`.dash-nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o=e.dataset.mod,f(),p()})})}function p(){if(l.scrollTop=0,!a){c.innerHTML=``,l.innerHTML=`
        <div class="dash-locked">
          <div class="dash-locked-icon">🛰️</div>
          <h2>Aucun serveur en commun</h2>
          <p>Ton compte Discord n’est sur aucun serveur où se trouve ESGI-Bot. Rejoins le serveur de ta classe puis reviens !</p>
        </div>`;return}let e=d().find(e=>e.id===o)||d()[0];e.open?{accueil:m,devoirs:()=>h(`devoirs`),evaluations:()=>h(`evaluations`),classes:g,rangs:_,commandes:v}[e.id]():(l.innerHTML=`
        <div class="dash-locked">
          <div class="dash-locked-icon">🔒</div>
          <h2>${e.label}</h2>
          <p>${HS(e.why)}</p>
        </div>`,t(`Ce module est verrouillé pour ton compte 🔒`))}function m(){let e=a.permissions,t=[[`Voir les devoirs et évaluations de ta classe`,e.voir,`rôle de classe`],[`Ajouter un devoir ou une évaluation`,e.ajouter,`rôle de classe`],[`Modifier / supprimer tes propres ajouts`,e.ajouter,`rôle de classe`],[`Modifier / supprimer les ajouts des autres`,e.modifier_tout,`délégué, prof ou admin du bot`],[`Configurer les rôles de classe`,e.configurer_classes,`admin Discord ou admin du bot`],[`Changer le rang des membres`,e.gerer_rangs,`admin Discord`]];l.innerHTML=`
      <h2 class="dash-h">Bienvenue à ton étage, ${HS(i.profil.nom)} 👋</h2>
      <div class="dash-cards">
        <div class="dash-card"><div class="dash-card-label">Serveur</div><div class="dash-card-value">${HS(a.nom)}</div></div>
        <div class="dash-card"><div class="dash-card-label">Classe détectée</div><div class="dash-card-value">${a.classe?HS(a.classe.nom):`—`}</div></div>
        <div class="dash-card"><div class="dash-card-label">Rang dans le bot</div><div class="dash-card-value">${XS[a.rang]||HS(a.rang)}</div></div>
        <div class="dash-card"><div class="dash-card-label">Admin Discord</div><div class="dash-card-value">${a.admin_discord?`Oui`:`Non`}</div></div>
      </div>
      <h3 class="dash-sub">Tes permissions</h3>
      <p class="dash-muted">Calculées à partir de tes rôles Discord et de ton rang dans le bot, comme sur Discord.</p>
      <ul class="dash-perms">
        ${t.map(([e,t,n])=>`
          <li class="${t?`ok`:`no`}">
            <span class="dash-perm-dot">${t?`✓`:`✕`}</span>
            <span class="dash-perm-label">${e}</span>
            <span class="dash-perm-need">${t?`autorisé`:`nécessite : ${n}`}</span>
          </li>`).join(``)}
      </ul>
      ${i.demo?`<p class="dash-demo">MODE DÉMO : fausses données, rien n’est envoyé sur Discord.</p>`:``}`}async function h(e){let n=e===`devoirs`,r=n?`Devoirs`:`Évaluations`;l.innerHTML=`<h2 class="dash-h">${r} — ${HS(a.classe.nom)}</h2><p class="dash-muted">Chargement…</p>`;let o;try{o=(await VS.list(a.id,e)).entrees}catch(e){l.innerHTML=`<h2 class="dash-h">${r}</h2><p class="dash-error">${HS(e.message)}</p>`;return}let s=i.profil.id,c=a.permissions.modifier_tout,u=Object.entries(i.matieres).map(([e,t])=>`<option value="${HS(e)}">${HS(t.trim())}</option>`).join(``);l.innerHTML=`
      <h2 class="dash-h">${r} — ${HS(a.classe.nom)}</h2>
      <form class="dash-form" novalidate>
        <div class="dash-form-row">
          <label>Matière<select name="matiere" required><option value="">Choisir…</option>${u}</select></label>
          <label>Date<input type="date" name="date" required /></label>
        </div>
        <label>Sujet <span class="dash-count">0 / 500</span>
          <textarea name="sujet" rows="3" minlength="20" maxlength="500" required placeholder="Au moins 20 caractères, comme sur Discord"></textarea>
        </label>
        <input type="hidden" name="entry" />
        <div class="dash-form-actions">
          <button type="submit" class="dash-btn">${n?`AJOUTER LE DEVOIR`:`AJOUTER L’ÉVALUATION`}</button>
          <button type="button" class="dash-btn ghost" data-act="cancel" hidden>ANNULER</button>
          <span class="dash-form-msg" role="status"></span>
        </div>
      </form>
      <ul class="dash-list">
        ${o.length?o.map(e=>{let t=$S(e.date),n=e.auteur===s;return`
          <li class="dash-entry">
            <div class="dash-entry-head">
              <span class="dash-tag">${HS((i.matieres[e.matiere]||e.matiere).trim())}</span>
              <span class="dash-date">${HS(QS(e.date))}</span>
              <span class="dash-when ${t.tone}">${t.text}</span>
            </div>
            <p class="dash-entry-text">${HS(e.sujet)}</p>
            <div class="dash-entry-foot">
              <span class="dash-muted">Ajouté par ${n?`toi`:HS(e.auteur_nom)}</span>
              ${n||c?`
                <button type="button" class="dash-link" data-edit="${e.id}">Modifier</button>
                <button type="button" class="dash-link danger" data-del="${e.id}">Supprimer</button>`:`<span class="dash-muted">🔒 lecture seule</span>`}
            </div>
          </li>`}).join(``):`<li class="dash-empty">Rien de prévu pour ta classe 🎉</li>`}
      </ul>`;let d=l.querySelector(`.dash-form`),f=d.querySelector(`.dash-form-msg`),p=d.querySelector(`.dash-count`),m=d.querySelector(`[type="submit"]`),g=d.querySelector(`[data-act="cancel"]`),_=m.textContent;d.sujet.addEventListener(`input`,()=>{p.textContent=`${d.sujet.value.trim().length} / 500`}),g.addEventListener(`click`,()=>{d.reset(),d.entry.value=``,m.textContent=_,g.hidden=!0,p.textContent=`0 / 500`}),d.addEventListener(`submit`,async n=>{n.preventDefault();let r={matiere:d.matiere.value,date:d.date.value,sujet:d.sujet.value.trim()};if(!r.matiere||!r.date)f.textContent=`Choisis une matière et une date.`;else if(r.sujet.length<20)f.textContent=`Le sujet doit faire au moins 20 caractères.`;else{m.disabled=!0,f.textContent=`Envoi…`;try{d.entry.value?await VS.update(a.id,e,d.entry.value,r):await VS.add(a.id,e,r),t(d.entry.value?`Modifié ! ✏️`:`C’est noté ! Le bot préviendra ta classe 📬`),h(e)}catch(e){f.textContent=e.message,m.disabled=!1}}}),l.querySelectorAll(`[data-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.find(t=>String(t.id)===e.dataset.edit);d.matiere.value=t.matiere,d.date.value=t.date,d.sujet.value=t.sujet,d.entry.value=t.id,p.textContent=`${t.sujet.length} / 500`,m.textContent=`ENREGISTRER`,g.hidden=!1,d.scrollIntoView({behavior:`smooth`,block:`start`}),d.sujet.focus()})}),l.querySelectorAll(`[data-del]`).forEach(r=>{r.addEventListener(`click`,async()=>{if(r.dataset.confirm!==`1`)r.dataset.confirm=`1`,r.textContent=`Confirmer ?`;else try{await VS.remove(a.id,e,r.dataset.del),t(`${n?`Devoir supprimé`:`Évaluation supprimée`} 🗑️`),h(e)}catch(e){t(e.message)}})})}function g(){let e=new Set(a.classes);l.innerHTML=`
      <h2 class="dash-h">Rôles de classe</h2>
      <p class="dash-muted">Coche les rôles Discord qui correspondent à une classe (B1, B2…). Le bot s’en sert pour savoir dans quelle classe est chaque élève.</p>
      <div class="dash-roles">
        ${(a.roles||[]).map(t=>`
          <label class="dash-role">
            <input type="checkbox" value="${HS(t.id)}" ${e.has(t.id)?`checked`:``} />
            <span class="dash-role-dot" style="background:${t.couleur===`#000000`?`#8a93a8`:HS(t.couleur)}"></span>
            <span>${HS(t.nom)}</span>
          </label>`).join(``)}
      </div>
      <div class="dash-form-actions">
        <button type="button" class="dash-btn" data-act="save">ENREGISTRER</button>
        <span class="dash-form-msg" role="status"></span>
      </div>`,l.querySelector(`[data-act="save"]`).addEventListener(`click`,async()=>{let e=[...l.querySelectorAll(`.dash-role input:checked`)].map(e=>e.value),n=l.querySelector(`.dash-form-msg`);try{await VS.setClasses(a.id,e),n.textContent=`Enregistré ✓`,t(`Classes mises à jour ! 🎓`),await y()}catch(e){n.textContent=e.message}})}function _(){let e=e=>i.rangs.map(t=>`<option value="${t}" ${t===e?`selected`:``}>${XS[t]||t}</option>`).join(``);l.innerHTML=`
      <h2 class="dash-h">Rangs des membres</h2>
      <p class="dash-muted">Délégués, profs et admins du bot peuvent modifier les devoirs et évaluations de toute leur classe.</p>
      <ul class="dash-members">
        ${(a.membres||[]).map(t=>`
          <li>
            <img src="${HS(t.avatar)}" alt="" loading="lazy" />
            <span class="dash-member-name">${HS(t.nom)}</span>
            <select data-user="${HS(t.id)}" aria-label="Rang de ${HS(t.nom)}">${e(t.rang)}</select>
          </li>`).join(``)}
      </ul>`,l.querySelectorAll(`select[data-user]`).forEach(e=>{e.addEventListener(`change`,async()=>{try{await VS.setRank(a.id,e.dataset.user,e.value),t(`Rang mis à jour : ${XS[e.value]} ✓`),e.dataset.user===i.profil.id&&await y()}catch(e){t(e.message)}})})}function v(){l.innerHTML=`
      <h2 class="dash-h">Commandes du bot</h2>
      <p class="dash-muted">Ce que tu peux faire depuis ce tableau de bord, et ce qui reste sur Discord.</p>
      <ul class="dash-commands">
        ${ZS.map(e=>`
          <li>
            <code>${HS(e.name)}</code>
            <span>${HS(e.desc)}</span>
            <span class="dash-chip ${e.web?`web`:``}">${e.web?`ici : ${e.web}`:`Discord uniquement`}</span>
          </li>`).join(``)}
      </ul>`}async function y(){let e=a&&a.id;i=await VS.myFloor(),a=i.serveurs.find(t=>t.id===e)||i.serveurs[0]||null,f(),p()}return{async load(){l.innerHTML=`<p class="dash-muted">Chargement de ton étage…</p>`,i=await VS.myFloor(),s(`.dash-avatar`).src=i.profil?i.profil.avatar:``,s(`.dash-name`).textContent=i.profil?i.profil.nom:``,a=i.serveurs[0]||null,u.innerHTML=i.serveurs.map(e=>`<option value="${HS(e.id)}">${HS(e.nom)}</option>`).join(``),u.hidden=i.serveurs.length<2,o=`accueil`,a&&f(),p()}}}var tC=new Y(0,-300,0),nC={w:2.5,h:2.7,front:-1.15,back:1.7},rC={x:-.32,w:1.12,h:2.15},iC={x:.8,y:1.62,w:.6,h:1.14},aC={id:`hall`,nom:`HALL`},oC=7;function sC(e,n,r,i){let a=document.createElement(`canvas`);a.width=e,a.height=n,r(a.getContext(`2d`),e,n);let o=new ta(a);return o.colorSpace=Ae,o.anisotropy=4,i&&(o.wrapS=o.wrapT=t,o.repeat.set(i[0],i[1])),o}var cC=`#d4af6a`,lC=`#f2d79a`,uC=`#8a6a34`;function dC(e,t,n){let r=e.createLinearGradient(0,0,t,0);r.addColorStop(0,`#2a150b`),r.addColorStop(.5,`#3f2213`),r.addColorStop(1,`#2c170c`),e.fillStyle=r,e.fillRect(0,0,t,n);for(let r=0;r<140;r++){let i=Math.random()*t,a=2+Math.random()*10,o=.004+Math.random()*.01;e.strokeStyle=Math.random()<.55?`rgba(20, 8, 3, ${.12+Math.random()*.2})`:`rgba(150, 90, 50, ${.06+Math.random()*.1})`,e.lineWidth=.6+Math.random()*2.2,e.beginPath();for(let t=0;t<=n;t+=16){let n=i+Math.sin(t*o+r)*a+Math.sin(t*o*3.1)*a*.3;t===0?e.moveTo(n,t):e.lineTo(n,t)}e.stroke()}let i=e.createLinearGradient(0,0,t,0);i.addColorStop(0,`rgba(255,220,180,0)`),i.addColorStop(.42,`rgba(255,220,180,0.06)`),i.addColorStop(.5,`rgba(255,220,180,0.12)`),i.addColorStop(.58,`rgba(255,220,180,0.06)`),i.addColorStop(1,`rgba(255,220,180,0)`),e.fillStyle=i,e.fillRect(0,0,t,n)}function fC(){return sC(512,1024,(e,t,n)=>dC(e,t,n))}function pC(e){return sC(512*e,1024,(t,n,r)=>{dC(t,n,r);let i=r*.07,a=r*.6,o=n/e;for(let n=0;n<e;n++){let e=n*o+o*.12,r=o*.76;t.fillStyle=`rgba(0,0,0,0.18)`,t.fillRect(e,i,r,a-i),t.strokeStyle=cC,t.lineWidth=5,t.strokeRect(e,i,r,a-i),t.strokeStyle=`rgba(242, 215, 154, 0.55)`,t.lineWidth=2,t.strokeRect(e+16,i+16,r-32,a-i-32),t.lineWidth=3,t.strokeStyle=cC,[[e+16,i+16,0],[e+r-16,i+16,Math.PI/2],[e+r-16,a-16,Math.PI],[e+16,a-16,Math.PI*1.5]].forEach(([e,n,r])=>{t.beginPath(),t.arc(e,n,28,r,r+Math.PI/2),t.stroke()});let s=e+r/2,c=(i+a)/2;t.fillStyle=cC,t.beginPath(),t.moveTo(s,c-26),t.lineTo(s+14,c),t.lineTo(s,c+26),t.lineTo(s-14,c),t.closePath(),t.fill()}})}function mC(){return sC(1024,512,(e,t,n)=>{e.fillStyle=`#0c0a0a`,e.fillRect(0,0,t,n);for(let r=0;r<26;r++){let i=r%3==0;e.strokeStyle=i?`rgba(212, 175, 106, ${.35+Math.random()*.35})`:`rgba(255, 255, 255, ${.04+Math.random()*.06})`,e.lineWidth=i?1+Math.random()*1.5:1+Math.random()*3,e.beginPath();let a=Math.random()*t,o=Math.random()*n;e.moveTo(a,o);for(let t=0;t<7;t++)a+=(Math.random()-.3)*180,o+=(Math.random()-.5)*90,e.lineTo(a,o);e.stroke()}})}function hC(e){return sC(256,512,(t,n,r)=>{let i=t.createLinearGradient(0,0,0,r);i.addColorStop(0,`#3a2a18`),i.addColorStop(.5,`#4c3720`),i.addColorStop(1,`#2e2112`),t.fillStyle=i,t.fillRect(0,0,n,r);for(let e=0;e<300;e++)t.fillStyle=`rgba(255, 220, 160, ${Math.random()*.05})`,t.fillRect(0,Math.random()*r,n,.7);t.save(),e&&(t.translate(n,0),t.scale(-1,1));let a=t.createLinearGradient(0,0,n,r);a.addColorStop(0,lC),a.addColorStop(.5,cC),a.addColorStop(1,uC),t.strokeStyle=a,t.lineWidth=5,t.strokeRect(14,14,n-14,r-28),t.lineWidth=1.5,t.strokeRect(24,24,n-24,r-48);for(let e=0;e<3;e++){let r=n,i=150+e*140,o=t.createRadialGradient(r,i,10,r,i,112);o.addColorStop(0,`rgba(242, 215, 154, 0.38)`),o.addColorStop(1,`rgba(212, 175, 106, 0.1)`),t.fillStyle=o,t.beginPath(),t.moveTo(r,i),t.arc(r,i,112,Math.PI,Math.PI*1.5),t.closePath(),t.fill(),t.strokeStyle=a,t.lineWidth=3.5,t.stroke();for(let e=1;e<=6;e++){let n=Math.PI+e/7*(Math.PI/2);t.lineWidth=2,t.beginPath(),t.moveTo(r+Math.cos(n)*30,i+Math.sin(n)*30),t.lineTo(r+Math.cos(n)*112,i+Math.sin(n)*112),t.stroke()}[80.64,50.4].forEach(e=>{t.lineWidth=2,t.beginPath(),t.arc(r,i,e,Math.PI,Math.PI*1.5),t.stroke()}),t.lineWidth=3,t.beginPath(),t.moveTo(r-5,i),t.lineTo(r-5,i+36),t.stroke()}t.fillStyle=a,t.fillRect(14,r-58,n-14,6),t.fillRect(14,r-46,n-14,3),t.restore()})}function gC(){return sC(1024,1024,(e,t,n)=>{e.fillStyle=`#0d0b0a`,e.fillRect(0,0,t,n),e.fillStyle=`#e6dccb`,e.fillRect(96,96,t-192,n-192);for(let r=0;r<36;r++){e.strokeStyle=`rgba(150, 128, 100, ${.06+Math.random()*.12})`,e.lineWidth=1+Math.random()*2,e.beginPath();let r=96+Math.random()*(t-192),i=96+Math.random()*(n-192);e.moveTo(r,i);for(let t=0;t<7;t++)r+=(Math.random()-.5)*150,i+=(Math.random()-.3)*110,e.lineTo(r,i);e.stroke()}e.strokeStyle=cC,e.lineWidth=8,e.strokeRect(92,92,t-192+8,n-192+8),e.lineWidth=3,e.strokeRect(114,114,t-192-36,n-192-36);let r=t/2;[[300,`#0d0b0a`],[286,cC],[276,`#1a1512`],[230,`#e6dccb`]].forEach(([t,n])=>{e.fillStyle=n,e.beginPath(),e.arc(r,r,t,0,Math.PI*2),e.fill()});for(let t=0;t<16;t++){let n=t/16*Math.PI*2,i=t%2==0?222:150;e.fillStyle=t%4==0?cC:t%2==0?`#1a1512`:`#b8925a`,e.beginPath(),e.moveTo(r+Math.cos(n)*i,r+Math.sin(n)*i),e.lineTo(r+Math.cos(n+.2)*46,r+Math.sin(n+.2)*46),e.lineTo(r,r),e.lineTo(r+Math.cos(n-.2)*46,r+Math.sin(n-.2)*46),e.closePath(),e.fill()}e.fillStyle=lC,e.beginPath(),e.arc(r,r,26,0,Math.PI*2),e.fill()})}function _C(e){return sC(256,512,(t,n,r)=>{if(e===`floor`){let e=t.createRadialGradient(n/2,r*.45,10,n/2,r*.45,r*.7);e.addColorStop(0,`#ffffff`),e.addColorStop(1,`#dfe9ff`),t.fillStyle=e,t.fillRect(0,0,n,r);return}let i=t.createLinearGradient(0,0,0,r);i.addColorStop(0,`#f6e3c0`),i.addColorStop(.6,`#b98d5c`),i.addColorStop(1,`#5b432c`),t.fillStyle=i,t.fillRect(0,0,n,r),t.fillStyle=`rgba(255,255,255,0.5)`,t.fillRect(n*.15,r*.12,n*.7,r*.02),t.font=`700 22px "Space Grotesk", sans-serif`,t.textAlign=`center`,t.fillStyle=`rgba(60, 40, 20, 0.7)`,t.fillText(`HALL · ESGI-BOT`,n/2,r*.3)})}function vC(){return sC(1024,1024,(e,t,n)=>{dC(e,t,n);let r=t/3;for(let t=0;t<3;t++)for(let n=0;n<3;n++){let i=t*r+18,a=n*r+18,o=r-36;e.fillStyle=`rgba(0,0,0,0.28)`,e.fillRect(i,a,o,o),e.strokeStyle=cC,e.lineWidth=6,e.strokeRect(i,a,o,o),e.strokeStyle=`rgba(242, 215, 154, 0.5)`,e.lineWidth=2,e.strokeRect(i+16,a+16,o-32,o-32)}})}var yC=500,bC=950,xC=2;function SC(e,t,n){if(e.measureText(t).width<=n)return t;let r=t;for(;r.length>1&&e.measureText(`${r}…`).width>n;)r=r.slice(0,-1);return`${r}…`}function CC(e,t,n,r,i,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}function wC(){let e=document.createElement(`canvas`);e.width=yC*xC,e.height=bC*xC;let t=e.getContext(`2d`);t.scale(xC,xC);let n=t.createLinearGradient(0,0,yC,bC);n.addColorStop(0,`#9c7a3e`),n.addColorStop(.3,`#e8cc8e`),n.addColorStop(.55,`#b48f4e`),n.addColorStop(.8,`#e0c283`),n.addColorStop(1,`#8e6d35`),t.fillStyle=n,CC(t,0,0,yC,bC,22),t.fill();for(let e=0;e<900;e++)t.fillStyle=`rgba(${Math.random()<.5?`255,245,220`:`80,55,20`},${Math.random()*.1})`,t.fillRect(Math.random()*yC,Math.random()*bC,20+Math.random()*90,.6);let r=t.createLinearGradient(0,0,yC,bC);r.addColorStop(0,`#16131a`),r.addColorStop(.5,`#0b0a0d`),r.addColorStop(1,`#141117`),t.fillStyle=r,CC(t,18,18,464,914,12),t.fill(),t.save(),CC(t,18,18,464,914,12),t.clip();let i=t.createLinearGradient(0,0,yC,bC*.6);return i.addColorStop(0,`rgba(255,255,255,0)`),i.addColorStop(.45,`rgba(255,255,255,0.05)`),i.addColorStop(.5,`rgba(255,255,255,0)`),t.fillStyle=i,t.fillRect(0,0,yC,bC),t.restore(),t.strokeStyle=`rgba(212, 175, 106, 0.7)`,t.lineWidth=1.5,CC(t,28,28,444,894,8),t.stroke(),[[10,10],[490,10],[10,940],[490,940]].forEach(([e,n])=>{t.fillStyle=`#6e5228`,t.beginPath(),t.arc(e,n,4,0,Math.PI*2),t.fill()}),e}function TC(e,{say:t,onExit:n,renderer:r}){let i=YS(),a=document.createElement(`a`);a.id=`now-playing`,a.target=`_blank`,a.rel=`noopener noreferrer`;let o=document.createElement(`span`);o.className=`now-icon`,o.textContent=`♪`;let s=document.createElement(`span`);s.className=`now-text`;let c=document.createElement(`span`);c.className=`now-source`,c.textContent=`SoundCloud`,a.append(o,s,c),document.body.appendChild(a);let l=null;function u(){let e=xe&&!Ie&&!i.muted&&!!l&&i.source===`soundcloud`;a.classList.toggle(`visible`,e)}i.onFallback=()=>u(),i.onTrack=e=>{l=e,s.textContent=e.artist?`${e.title} — ${e.artist}`:e.title,e.url&&/^https:\/\/soundcloud\.com\//.test(e.url)&&(a.href=e.url),u()};let d=new Nn,f=sC(16,256,(e,t,n)=>{let r=e.createLinearGradient(0,0,0,n);r.addColorStop(0,`#fff1d6`),r.addColorStop(.35,`#b98a52`),r.addColorStop(.6,`#4a2e18`),r.addColorStop(1,`#140c07`),e.fillStyle=r,e.fillRect(0,0,t,n)});d.add(new Z(new No(10,32,16),new Ur({map:f,side:1})));let p=new Jc(r),m=p.fromScene(d,.02).texture;p.dispose();let h=[],g=new wn;g.position.copy(tC),g.visible=!1,e.add(g);let _=e=>new qo({map:e,roughness:.42,metalness:0,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:.3}),v=_(fC()),y=_(pC(3)),b=_(pC(3)),x=new qo({map:mC(),roughness:.2,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.5}),S=new Ko({color:14859638,metalness:1,roughness:.32,envMapIntensity:.9}),C=new Ko({color:8018476,metalness:1,roughness:.3,envMapIntensity:.8}),w=new qo({map:gC(),roughness:.16,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:.5}),T=new Ko({map:vC(),roughness:.5}),E=new Ur({color:new X(1,.9,.72).multiplyScalar(1),toneMapped:!1}),D=new Ur({color:new X(1,.72,.38).multiplyScalar(1.2),toneMapped:!1}),{w:O,h:k,front:A,back:j}=nC,M=j-A,N=(j+A)/2,P=.92,F=new Z(new jo(O,M),w);F.rotation.x=-Math.PI/2,F.position.set(0,0,N),g.add(F);let I=new Z(new jo(O,M),T);I.rotation.x=Math.PI/2,I.position.set(0,k,N),g.add(I),[[.46,.022],[.38,.014]].forEach(([e,t])=>{let n=new Z(new Po(e,t,12,64),S);n.rotation.x=Math.PI/2,n.position.set(0,k-.03,N-.1),g.add(n)});let ee=new Z(new oa(.34,48),E);ee.rotation.x=Math.PI/2,ee.position.set(0,k-.012,N-.1),g.add(ee),[[-.85,A+.45],[.85,A+.45],[-.85,j-.4],[.85,j-.4]].forEach(([e,t])=>{let n=new Z(new oa(.04,16),E);n.rotation.x=Math.PI/2,n.position.set(e,k-.004,t),g.add(n);let r=new Z(new Po(.05,.008,8,24),S);r.rotation.x=Math.PI/2,r.position.set(e,k-.006,t),g.add(r)}),g.add(new Ns(16769720,3810324,.75));let te=new Ys(16766624,3.4,7,1.4);te.position.set(0,k-.5,j-.75),g.add(te);let ne=new Ys(16771272,.9,5,1.2);ne.position.set(.1,1.1,j-.5),g.add(ne);function L(e,t,n,r,i){let a=new Z(new jo(e,k),i);a.position.set(t,k/2,n),a.rotation.y=r,g.add(a);let o=new Z(new jo(e,P),x);o.position.set(t,P/2,n),o.rotation.y=r,o.translateZ(.006),g.add(o);let s=new Z(new aa(e,.03,.025),S);s.position.set(t,.932,n),s.rotation.y=r,s.translateZ(.012),g.add(s);let c=new Z(new aa(e,.07,.06),C);c.position.set(t,k-.035,n),c.rotation.y=r,c.translateZ(.03),g.add(c);let l=new Z(new jo(e-.04,.018),D);l.position.set(t,k-.08,n),l.rotation.y=r,l.translateZ(.05),g.add(l)}L(M,-O/2,N,Math.PI/2,y),L(M,O/2,N,-Math.PI/2,y),L(O,0,j,Math.PI,b),[-1,1].forEach(e=>{let t=new Z(new sa(.024,.024,M-.5,18),S);t.rotation.x=Math.PI/2,t.position.set(e*(O/2-.075),1,N),g.add(t),[A+.4,j-.35].forEach(t=>{let n=new Z(new sa(.012,.012,.08,10),S);n.rotation.z=Math.PI/2,n.position.set(e*(O/2-.035),1,t),g.add(n)}),[A+.25+0,j-.25].forEach((t,n)=>{let r=new Z(new No(.032,16,12),S);r.position.set(e*(O/2-.075),1,n===0?N-(M-.5)/2:N+(M-.5)/2),g.add(r)})});let re=.12,ie=rC.x-rC.w/2,R=rC.x+rC.w/2;function z(e,t,n,r){let i=new Z(new aa(t-e,r-n,re),v);if(i.position.set((e+t)/2,(n+r)/2,A-re/2),g.add(i),n===0){let n=new Z(new jo(t-e,P),x);n.position.set((e+t)/2,P/2,A+.004),g.add(n);let r=new Z(new aa(t-e,.03,.025),S);r.position.set((e+t)/2,.932,A+.012),g.add(r)}}z(-O/2,ie-.1,0,k),z(R+.1,O/2,0,k),z(ie-.1,R+.1,rC.h+.1,k);let B=new Z(new aa(O,.07,.06),C);B.position.set(0,k-.035,A+.03),g.add(B);let ae=new Z(new jo(O-.04,.018),D);ae.position.set(0,k-.08,A+.05),g.add(ae),[[ie-.05,rC.h/2+.05,.1,rC.h+.1],[R+.05,rC.h/2+.05,.1,rC.h+.1],[rC.x,rC.h+.05,rC.w,.1]].forEach(([e,t,n,r])=>{let i=new Z(new aa(n,r,re),C);i.position.set(e,t,A-re/2),g.add(i)}),[[.1,.03,0],[.06,.06,.02]].forEach(([e,t,n])=>{[ie-e/2,R+e/2].forEach(r=>{let i=new Z(new aa(e,rC.h+e,t),n?S:C);i.position.set(r,(rC.h+e)/2,A+t/2+n+.004),g.add(i)});let r=new Z(new aa(rC.w+e*2,e,t),n?S:C);r.position.set(rC.x,rC.h+e/2,A+t/2+n+.004),g.add(r)});let oe=document.createElement(`canvas`);oe.width=512,oe.height=280;let se=new ta(oe);se.colorSpace=Ae,se.anisotropy=4;let ce=new Z(new jo(.5,.27),new Ko({map:se,emissiveMap:se,emissive:16777215,emissiveIntensity:.35,metalness:.5,roughness:.35}));ce.position.set(rC.x,rC.h+.28,A+.006),g.add(ce);function V(e,t=0){let n=oe.getContext(`2d`);n.clearRect(0,0,512,280);let r=n.createLinearGradient(0,0,512,280);r.addColorStop(0,`#9c7a3e`),r.addColorStop(.4,`#ecd193`),r.addColorStop(1,`#8e6d35`),n.fillStyle=r,n.beginPath(),n.arc(256,250,236,Math.PI,0),n.lineTo(492,280),n.lineTo(20,280),n.closePath(),n.fill(),n.fillStyle=`#100c0a`,n.beginPath(),n.arc(256,250,214,Math.PI,0),n.closePath(),n.fill();for(let e=0;e<=10;e++){let t=Math.PI+e/10*Math.PI;n.strokeStyle=cC,n.lineWidth=e%5==0?5:2.5,n.beginPath(),n.moveTo(256+Math.cos(t)*196,250+Math.sin(t)*196),n.lineTo(256+Math.cos(t)*(e%5==0?166:178),250+Math.sin(t)*(e%5==0?166:178)),n.stroke()}n.font=`400 34px "Marcellus", serif`,n.fillStyle=lC,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(`H`,106,232),[[-1,196],[1,316]].forEach(([t,r])=>{let i=e===t;n.fillStyle=i?`#ffbf5e`:`#3a2c1c`,n.shadowColor=`#ffbf5e`,n.shadowBlur=i?18:0,n.beginPath(),t>0?(n.moveTo(r,158),n.lineTo(r+18,188),n.lineTo(r-18,188)):(n.moveTo(r,188),n.lineTo(r+18,158),n.lineTo(r-18,158)),n.closePath(),n.fill(),n.shadowBlur=0});let i=Math.PI+Math.min(1,Math.max(0,t))*Math.PI;n.strokeStyle=lC,n.lineWidth=6,n.lineCap=`round`,n.beginPath(),n.moveTo(256,250),n.lineTo(256+Math.cos(i)*172,250+Math.sin(i)*172),n.stroke(),n.fillStyle=cC,n.beginPath(),n.arc(256,250,16,0,Math.PI*2),n.fill(),se.needsUpdate=!0}V(0,0);let le=_C(`hall`),ue=_C(`floor`),de=new Ur({map:le,toneMapped:!1}),fe=new Z(new jo(rC.w+.2,rC.h+.1),de);fe.position.set(rC.x,rC.h/2,A-re-.35),g.add(fe);let pe=new Ko({color:1709072,roughness:.9});[ie,R].forEach(e=>{let t=new Z(new jo(.4,rC.h),pe);t.rotation.y=e<rC.x?Math.PI/2:-Math.PI/2,t.position.set(e,rC.h/2,A-re-.18),g.add(t)});let me=rC.w/2,he=[-1,1].map(e=>{let t=new Ko({map:hC(e>0),metalness:.85,roughness:.26,envMapIntensity:1.1,emissive:3810320,emissiveIntensity:.35}),n=new Z(new aa(me,rC.h,.035),t);return n.userData.closedX=rC.x+e*me/2,n.userData.side=e,n.position.set(n.userData.closedX,rC.h/2,A-re/2),g.add(n),n}),ge=wC(),_e=document.createElement(`canvas`);_e.width=yC*xC,_e.height=bC*xC;let H=_e.getContext(`2d`),ve=new ta(_e);ve.colorSpace=Ae,ve.anisotropy=8;let U=new Ko({map:ve,emissiveMap:ve,emissive:16777215,emissiveIntensity:.32,metalness:.4,roughness:.3,envMapIntensity:.5}),ye=new Z(new jo(iC.w,iC.h),U);ye.position.set(iC.x,iC.y,A+.012),g.add(ye);let be=new Z(new aa(iC.w+.05,iC.h+.05,.02),C);be.position.set(iC.x,iC.y,A+0),g.add(be);let xe=!1,Se=`loading`,Ce=``,we=[aC],Te=null,W=-1,Ee=0,De=0,G=!1,K=0,Oe=0,q=0,ke=null,je=`HALL`,Me=1,Ne=null,Pe=[],Fe=!0,Ie=!1;function Le(e,t,n,r,i,a){return Pe.push({x:e,y:t,w:n,h:r,act:i,arg:a,key:`${i}:${a??``}`}),Ne===`${i}:${a??``}`}let Re=`#ffbf5e`,ze=`#efdcb0`,Be=`#9b8660`;function Ve(e,t,n,r,{lit:i=!1,hover:a=!1,font:o=26}={}){let s=H.createLinearGradient(e-n,t-n,e+n,t+n);s.addColorStop(0,`#f3dca4`),s.addColorStop(.5,`#b48f4e`),s.addColorStop(1,`#6e5228`),H.fillStyle=s,H.beginPath(),H.arc(e,t,n,0,Math.PI*2),H.fill(),i&&(H.shadowColor=Re,H.shadowBlur=18,H.strokeStyle=Re,H.lineWidth=3,H.beginPath(),H.arc(e,t,n-3,0,Math.PI*2),H.stroke(),H.shadowBlur=0);let c=H.createRadialGradient(e-n*.3,t-n*.35,2,e,t,n);c.addColorStop(0,a?`#4a3d33`:`#2c2420`),c.addColorStop(1,`#0b0908`),H.fillStyle=c,H.beginPath(),H.arc(e,t,n-6,0,Math.PI*2),H.fill(),H.fillStyle=i?`#ffd796`:cC,i&&(H.shadowColor=Re,H.shadowBlur=10),H.font=`400 ${o}px "Marcellus", serif`,H.textAlign=`center`,H.textBaseline=`middle`,H.fillText(r,e,t+1),H.shadowBlur=0}function He(){let e=H.createLinearGradient(44,44,456,156);e.addColorStop(0,`#f0d699`),e.addColorStop(.5,`#a9843f`),e.addColorStop(1,`#e2c27f`),H.fillStyle=e,CC(H,44,44,412,112,10),H.fill(),H.fillStyle=`#070505`,CC(H,51,51,398,98,6),H.fill(),H.save(),CC(H,51,51,398,98,6),H.clip(),H.fillStyle=`rgba(255, 191, 94, 0.05)`;for(let e=44;e<456;e+=4)H.fillRect(e,44,1,112);let t=G&&Math.floor(performance.now()/350)%2==0;H.font=`700 36px "JetBrains Mono", monospace`,H.textAlign=`center`,H.textBaseline=`middle`,H.fillStyle=q!==0&&!t?Re:`#3a2a14`,H.fillText(q<0?`▼`:`▲`,88,100),H.shadowColor=Re,H.shadowBlur=16,H.fillStyle=`#ffc874`,H.font=`600 40px "JetBrains Mono", monospace`,H.textAlign=`left`;let n=(1-Me)*98,r=q<0?-1:1;ke&&Me<1&&H.fillText(SC(H,ke.toUpperCase(),312),124,100-r*(98-n)),H.fillText(SC(H,je.toUpperCase(),312),124,100+r*n),H.restore(),H.shadowBlur=0}function Ue(e,t,n,{size:r=18,color:i=ze,align:a=`center`}={}){H.font=`400 ${r}px "Marcellus", serif`,H.fillStyle=i,H.textAlign=a,H.textBaseline=`middle`,H.fillText(e,t,n)}function We(e){H.strokeStyle=`rgba(212, 175, 106, 0.6)`,H.lineWidth=1.2,H.beginPath(),H.moveTo(60,e),H.lineTo(yC/2-14,e),H.moveTo(264,e),H.lineTo(440,e),H.stroke(),H.fillStyle=cC,H.beginPath(),H.moveTo(yC/2,e-6),H.lineTo(257,e),H.lineTo(yC/2,e+6),H.lineTo(yC/2-7,e),H.closePath(),H.fill()}function Ge(){Ue(`LECTEUR DE BADGE`,yC/2,210,{size:22,color:cC}),We(236);let e=H.createLinearGradient(yC/2-70,260,320,440);e.addColorStop(0,`#f0d699`),e.addColorStop(1,`#8e6d35`),H.fillStyle=e,CC(H,yC/2-70,262,140,176,16),H.fill(),H.fillStyle=`#0b0908`,CC(H,yC/2-62,270,124,160,12),H.fill(),H.fillStyle=Re,H.shadowColor=Re,H.shadowBlur=18,H.beginPath(),H.arc(yC/2,306,9,0,Math.PI*2),H.fill(),H.shadowBlur=0,H.strokeStyle=`rgba(212, 175, 106, 0.7)`,H.lineWidth=2,CC(H,yC/2-38,336,76,64,6),H.stroke();let t=Le(56,470,388,120,`login`);H.fillStyle=t?`#241d18`:`#15110f`,CC(H,56,470,388,120,16),H.fill(),H.strokeStyle=t?lC:cC,H.lineWidth=2.5,H.stroke(),H.fillStyle=`#5865f2`,H.beginPath(),H.arc(104,530,22,0,Math.PI*2),H.fill(),Ue(`D`,104,531,{size:24,color:`#ffffff`}),Ue(`SE CONNECTER`,284,512,{size:28,color:ze}),Ue(`AVEC DISCORD`,284,550,{size:28,color:cC}),Ue(`Pour aller à ton étage,`,yC/2,650,{size:21,color:Be}),Ue(`présente ton badge Discord.`,yC/2,680,{size:21,color:Be})}function Ke(){Ue(`HORS SERVICE`,yC/2,250,{size:40,color:`#ff8a72`}),We(286),Ue(SC(H,Ce,420),yC/2,330,{size:19,color:ze}),Ue(`Lance le serveur du tableau`,yC/2,380,{size:19,color:Be}),Ue(`de bord (dossier dashboard/).`,yC/2,408,{size:19,color:Be});let e=Le(120,470,260,76,`retry`);H.fillStyle=e?`#241d18`:`#15110f`,CC(H,120,470,260,76,14),H.fill(),H.strokeStyle=cC,H.lineWidth=2,H.stroke(),Ue(`RÉESSAYER`,yC/2,509,{size:24,color:ze})}function qe(){if(Te){let e=Le(44,178,412,104,`mine`);H.fillStyle=e?`rgba(255, 191, 94, 0.14)`:`rgba(255, 191, 94, 0.07)`,CC(H,44,178,412,104,14),H.fill(),H.strokeStyle=cC,H.lineWidth=2,H.stroke(),Ve(98,230,36,String(W),{lit:!0,hover:e,font:28}),Ue(`TON ÉTAGE`,150,208,{size:16,color:cC,align:`left`}),H.font=`400 32px "Marcellus", serif`,Ue(SC(H,Te.nom,250),150,248,{size:32,color:ze,align:`left`}),Ue(`▲`,422,230,{size:24,color:Re})}else Ue(`Aucun étage pour ton compte`,yC/2,215,{size:21,color:ze}),Ue(`(rejoins le serveur de ta classe)`,yC/2,247,{size:18,color:Be});Ue(`TOUS LES ÉTAGES`,yC/2,306,{size:15,color:cC}),We(326);let e=Math.max(1,Math.ceil(we.length/oC));De=Math.min(De,e-1);let t=De*oC;if(we.slice(t,t+oC).forEach((e,n)=>{let r=t+n,i=338+n*60,a=r===W,o=e.id===`hall`;Le(44,i,412,56,`floor`,r)&&(H.fillStyle=`rgba(255, 220, 160, 0.07)`,CC(H,44,i,412,56,10),H.fill()),Ve(76,i+28,23,o?`H`:String(r),{lit:r===Ee,font:19}),H.font=`400 24px "Marcellus", serif`,Ue(SC(H,e.nom,270),114,i+29,{size:24,color:a?`#ffd796`:o?ze:Be,align:`left`}),a?Ue(`◆`,428,i+29,{size:16,color:Re}):o||Ue(`🔒`,428,i+29,{size:18})}),e>1){let t=Le(yC/2-110,768,60,50,`pageUp`);Ve(yC/2-80,793,22,`▲`,{font:16,lit:!1,hover:t}),Ue(`${De+1} / ${e}`,yC/2,794,{size:18,color:Be}),Ve(330,793,22,`▼`,{font:16,lit:!1,hover:Le(300,768,60,50,`pageDown`)})}}function Je(){We(832),[{act:`open`,x:130,text:`◀▶`,caption:`PORTES`},{act:`mute`,x:250,text:i.muted?`✕`:`♪`,caption:i.muted?`COUPÉE`:`MUSIQUE`},{act:`exit`,x:370,text:`⇱`,caption:`SORTIR`}].forEach(e=>{let t=Le(e.x-40,836,80,84,e.act),n=e.act===`open`&&K>.5||e.act===`mute`&&!i.muted;Ve(e.x,870,32,e.text,{font:22,hover:t,lit:n}),Ue(e.caption,e.x,916,{size:13,color:cC})})}function Ye(){Pe=[],H.setTransform(xC,0,0,xC,0,0),H.drawImage(ge,0,0,yC,bC),He(),Se===`loading`?Ue(`…`,yC/2,400,{size:40,color:cC}):Se===`login`?Ge():Se===`offline`?Ke():qe(),Je(),ve.needsUpdate=!0,Fe=!1}function Xe(e,t){ke=je,je=e,Me=+!t,Fe=!0}async function Ze(e){Se=`loading`,Fe=!0;try{if(!(await VS.state()).connecte){Se=`login`,Fe=!0,t(e||`Bienvenue dans l’ascenseur ! 🛗 Pour savoir où tu vas, montre-moi ton badge : connecte-toi avec Discord sur le tableau.`,9e3);return}let n=await VS.floors();Te=n.moi,we=[aC,...n.etages],W=Te?we.findIndex(e=>e.id===Te.id):-1,Ee=Math.min(Ee,we.length-1),Se=`floors`,Fe=!0,t(Te?e||`À quel étage on va ? 🛗 Ton étage, c’est le n° ${W} : « ${Te.nom} ».`:`Je ne te trouve sur aucun serveur où se trouve ESGI-Bot… Rejoins le serveur de ta classe ! 🛰️`,8e3)}catch(e){Se=`offline`,Ce=e.message,Fe=!0,t(`Oups… l’ascenseur est en panne 🔧 Le serveur du tableau de bord ne répond pas.`,8e3)}}let Qe=e=>new Promise(t=>setTimeout(t,e));async function $e(e){let t=Math.sign(e-Ee);G=!0,K=0,Fe=!0,await Qe(1e3),i.start(),q=t;let n=Math.max(1,we.length-1);V(t,Ee/n);let r=Math.abs(e-Ee),a=Math.min(8e3,Math.max(3e3,1800+r*380));for(let e=1;e<=r;e++)await Qe(a/r),Ee+=t,V(t,Ee/n),Xe(we[Ee].nom,!0),De=Math.floor(Ee/oC);await Qe(400),q=0,V(0,Ee/n),i.ding(),G=!1,Fe=!0}async function et(e){if(G||e<0||e>=we.length)return;let n=we[e],r=e===W;n.id!==`hall`&&!r?t(`🔒 L’étage de ${n.nom} est privé : seul ${n.nom} a la clé. Ton étage à toi, c’est le n° ${W} !`,5500):e===Ee?r?rt():(K=1,de.map=le,t(`On est déjà au hall 😄`,3e3)):(t(r?`C’est parti, on monte ! 🎶`:`Direction le hall ! 🎶`,3e3),await $e(e),r?(t(`Ding ! Bienvenue chez toi ✨`,3500),rt()):(de.map=le,K=1,t(`Hall de la tour. Tu peux sortir ou choisir un étage 🙂`,4e3)))}let tt=document.createElement(`section`);tt.id=`floor-view`,tt.setAttribute(`role`,`dialog`),tt.setAttribute(`aria-label`,`Ton étage`),tt.setAttribute(`aria-hidden`,`true`),document.body.appendChild(tt);let nt=eC(tt,{say:e=>t(e,3500),onElevator:()=>it(),onLogout:async()=>{try{await VS.logout()}catch{}Te=null,W=-1,we=[aC],Ee=0,Xe(`HALL`,!1),de.map=le,await it(!0),Ze(`Déconnecté ! À bientôt 👋 Repasse ton badge quand tu veux.`)}});async function rt(){de.map=ue,K=1,await Qe(900),i.stop(1),Ie=!0,u(),document.body.classList.add(`on-floor`),tt.classList.add(`open`),tt.setAttribute(`aria-hidden`,`false`);try{await nt.load()}catch(e){t(e.message,5e3)}}async function it(e){Ie=!1,document.body.classList.remove(`on-floor`),tt.classList.remove(`open`),tt.setAttribute(`aria-hidden`,`true`),xe&&!e&&i.start(),u(),e||t(`Re ! On va où maintenant ? 🛗`,3500)}let at=new J;function ot(e){let t=e.intersectObject(ye,!1)[0];if(!t||!t.uv)return null;at.copy(t.uv);let n=at.x*yC,r=(1-at.y)*bC;return Pe.find(e=>n>=e.x&&n<=e.x+e.w&&r>=e.y&&r<=e.y+e.h)||null}function st(e){switch(e.act){case`login`:window.location.href=VS.loginUrl;break;case`retry`:Ze();break;case`mine`:et(W);break;case`floor`:et(e.arg);break;case`pageUp`:De=Math.max(0,De-1);break;case`pageDown`:De+=1;break;case`open`:if(G)return;Ee===W&&Ee!==0?rt():K=K>.5?0:1;break;case`mute`:i.setMuted(!i.muted),u(),t(i.muted?`Musique coupée 🔇`:`Musique ! 🎶`,2e3);break;case`exit`:G||dt()}Fe=!0}let ct=new Y,lt=new Y;function ut(e,t,n){let r=e<.9;return ct.set(r?.5:.12,r?1.6:1.55,r?.6:j-.3),lt.set(r?.62:.2,r?1.58:1.5,A),ct.x+=n.x*.05,ct.y+=n.y*.03,G&&q!==0&&(ct.y+=Math.sin(t*40)*.0025,ct.x+=Math.sin(t*23)*.0015),ct.add(tC),lt.add(tC),{position:ct,target:lt}}async function dt(){xe&&(i.stop(.4),it(!0),n&&await n())}return window.addEventListener(`pointerdown`,()=>{xe&&i.unlock()}),window.addEventListener(`keydown`,e=>{xe&&i.unlock(),xe&&e.key===`Escape`&&!G&&(e.preventDefault(),Ie?it():dt())}),{get active(){return xe},get coversScreen(){return Ie},get musicPlaying(){return xe&&!Ie&&i.playing},cameraPose:ut,environment:m,enter({greeting:t}={}){xe=!0,g.visible=!0,h=[],e.traverse(e=>{if(!e.isLight||!e.visible)return;let t=!1;for(let n=e;n;n=n.parent)n===g&&(t=!0);t||h.push(e)}),h.forEach(e=>{e.visible=!1}),Ee=0,De=0,q=0,Xe(`HALL`,!1),V(0,0),de.map=le,Oe=0,K=0,i.start(),u(),Ze(t)},leave(){xe=!1,g.visible=!1,h.forEach(e=>{e.visible=!0}),h=[],u(),Ie=!1,document.body.classList.remove(`on-floor`),tt.classList.remove(`open`)},pointerMove(e){let t=ot(e),n=t?t.key:null;return n!==Ne&&(Ne=n,Fe=!0),!!t},unlockAudio(){i.unlock()},get audioState(){return i.state},click(e){i.unlock();let t=ot(e);t&&st(t)},update(e){xe&&(Oe+=(K-Oe)*(1-Math.exp(-e*3.2)),he.forEach(e=>{e.position.x=e.userData.closedX+e.userData.side*Oe*me*.98}),Me<1&&(Me=Math.min(1,Me+e*4.5),Fe=!0),G&&(Fe=!0),Fe&&Ye())}}}function EC(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let n=e.getContext(`2d`);n.fillStyle=`#070a18`,n.fillRect(0,0,512,512);for(let e=0;e<512;e+=64)for(let t=0;t<512;t+=128){let r=n.createLinearGradient(e,t,e+64,t+128);r.addColorStop(0,`#111733`),r.addColorStop(1,`#0a0e22`),n.fillStyle=r,n.fillRect(e+2,t+2,60,124)}n.strokeStyle=`rgba(34, 228, 255, 0.18)`,n.lineWidth=1;for(let e=0;e<=512;e+=64)n.beginPath(),n.moveTo(e,0),n.lineTo(e,512),n.stroke();for(let e=0;e<40;e++)n.fillStyle=Math.random()<.5?`rgba(34,228,255,0.9)`:`rgba(255,61,187,0.9)`,n.fillRect(8+Math.floor(Math.random()*8)*64,Math.random()*512,3,3);let r=new ta(e);return r.colorSpace=Ae,r.wrapS=t,r.wrapT=t,r.anisotropy=4,r}function DC(e,{x:t,z:n,top:r,bottom:i,radius:a=3,opening:o=null}){let s=new wn;s.position.set(t,0,n),e.add(s);let c=r-i,l=EC();l.repeat.set(4,c/6);let u=new Z(new sa(a,a,c,48,1,!0),new Ko({map:l,emissiveMap:l,emissive:16777215,emissiveIntensity:.5,metalness:.6,roughness:.45,side:1}));u.position.y=(r+i)/2,s.add(u);let d=new Ur({color:new X(Bx.cyan).multiplyScalar(2.2),toneMapped:!1}),f=new Ur({color:new X(Bx.magenta).multiplyScalar(2),toneMapped:!1}),p=new Po(a-.05,.045,8,64),m=0;for(let e=r-1.2;e>i+.4;e-=2.4){let t=new Z(p,m%2?f:d);t.rotation.x=Math.PI/2,t.position.y=e,s.add(t),m++}for(let e=0;e<4;e++){let t=e/4*Math.PI*2+Math.PI/4,n=new Z(new aa(.06,c,.06),e%2?f:d);n.position.set(Math.cos(t)*(a-.06),(r+i)/2,Math.sin(t)*(a-.06)),s.add(n)}let h=new Z(new Po(a+.1,.12,12,64),d);if(h.rotation.x=Math.PI/2,h.position.y=i+.1,s.add(h),o){let e=new wn;e.position.set(0,o.y,0),e.rotation.x=o.tilt||0,s.add(e);let t=document.createElement(`canvas`);t.width=256,t.height=256;let n=t.getContext(`2d`),r=n.createRadialGradient(128,128,10,128,128,128);r.addColorStop(0,`#02030a`),r.addColorStop(.55,`#050a1e`),r.addColorStop(.8,`rgba(34, 228, 255, 0.55)`),r.addColorStop(1,`rgba(34, 228, 255, 0)`),n.fillStyle=r,n.fillRect(0,0,256,256);let i=new ta(t);i.colorSpace=Ae;let c=new Z(new oa(a*1.25,64),new Ur({map:i,transparent:!0,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-8}));c.renderOrder=2,c.rotation.x=-Math.PI/2,e.add(c),[[a,d,.07],[a*.72,f,.04]].forEach(([t,n,r])=>{let i=new Z(new Po(t,r,10,72),n);i.rotation.x=Math.PI/2,i.position.y=.02,e.add(i)})}return s}fv.registerPlugin(Ax),await Promise.race([Promise.all([document.fonts.load(`700 48px "Space Grotesk"`),document.fonts.load(`400 32px "Space Grotesk"`),document.fonts.load(`700 24px "JetBrains Mono"`),document.fonts.load(`400 24px "Marcellus"`)]),new Promise(e=>setTimeout(e,1500))]).catch(()=>{});var OC=document.querySelector(`#bg`),kC=document.getElementById(`loader`),AC=document.getElementById(`loader-fill`),jC=document.getElementById(`loader-text`);function MC(e){kC&&(kC.classList.add(`error`),jC.textContent=e)}function NC(){kC&&kC.classList.add(`done`)}if(!(()=>{try{let e=document.createElement(`canvas`);return!!(e.getContext(`webgl2`)||e.getContext(`webgl`))}catch{return!1}})())throw MC(`Ton navigateur ne gère pas la 3D (WebGL). Essaie avec Chrome, Edge ou Firefox à jour.`),Error(`WebGL indisponible`);var PC=new Nn;PC.fog=new Mn(3810656,.0014);var FC=new Gs(50,window.innerWidth/window.innerHeight,.1,2e3);function IC(){let e=window.innerWidth/window.innerHeight;FC.aspect=e;let t=wt.radToDeg(2*Math.atan(Math.tan(wt.degToRad(22))/e));FC.fov=wt.clamp(t,50,75),FC.updateProjectionMatrix()}IC();var LC=window.matchMedia(`(hover: none)`).matches,RC=Math.min(window.devicePixelRatio,LC?1.25:1.5),zC=RC,BC=new Ld({canvas:OC,antialias:!1,powerPreference:`high-performance`});BC.setSize(window.innerWidth,window.innerHeight),BC.setPixelRatio(zC),BC.outputColorSpace=Ae,BC.toneMapping=4,BC.toneMappingExposure=1;var VC=kS(BC),HC=AS(BC);PC.environment=VC;var UC=new $f(BC,new Kt(window.innerWidth,window.innerHeight,{type:_,samples:4}));UC.setPixelRatio(zC),UC.setSize(window.innerWidth,window.innerHeight),UC.addPass(new ep(PC,FC));var WC=new np(new J(window.innerWidth,window.innerHeight),.55,.4,1.05);UC.addPass(WC),UC.addPass(new ip);var GC=130,KC=oS(PC),qC=FS(PC,FC,KC),JC=new J;function YC(){BC.getDrawingBufferSize(JC),KC.resize(JC.y,FC.fov),qC.resize(JC.y,FC.fov)}YC();var XC=aS(PC,GC),ZC=1.25,QC=document.getElementById(`lite-toggle`),$C=!1,ew=!1;function tw(){let e=new URLSearchParams(window.location.search).get(`leger`);if(e===`1`||e===`0`)return e;try{return localStorage.getItem(`esgi-lite`)}catch{return null}}function nw(){try{let e=BC.getContext(),t=e.getExtension(`WEBGL_debug_renderer_info`),n=t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):``;return/swiftshader|llvmpipe|software|basic render/i.test(n)}catch{return!1}}function rw(e,t=!1){if($C=e,t)try{localStorage.setItem(`esgi-lite`,e?`1`:`0`)}catch{}zC=e?Math.min(window.devicePixelRatio,ZC):RC,BC.setPixelRatio(zC),UC.setPixelRatio(zC);let n=e?0:4;[UC.renderTarget1,UC.renderTarget2].forEach(e=>{e.samples!==n&&(e.samples=n,e.dispose())}),WC.enabled=!e,XC.setLite(e),YC(),document.body.classList.toggle(`lite`,e),QC&&(QC.setAttribute(`aria-pressed`,String(e)),QC.textContent=e?`⚡ MODE LÉGER : ON`:`⚡ MODE LÉGER`)}{let e=tw();e!==null&&(ew=!0),(e===`1`||e===null&&nw())&&rw(!0)}QC?.addEventListener(`click`,()=>{ew=!0,rw(!$C,!0),qC.say($C?`⚡ Mode léger activé ! Moins joli, mais beaucoup plus fluide.`:`✨ Mode normal : tous les effets sont de retour !`,3500)}),XC.setPlanetLayout(FC.aspect<1);var iw=!1;try{iw=localStorage.getItem(`esgi-theme`)===`day`}catch{}Wx.value=+!!iw,document.documentElement.dataset.theme=iw?`day`:`night`;var aw=document.getElementById(`theme-hint`);function ow(){aw&&(aw.textContent=iw?`☾ TOUCHEZ LA PLANÈTE POUR PASSER EN MODE NUIT`:`☀ TOUCHEZ LA PLANÈTE POUR PASSER EN MODE JOUR`)}ow();function sw(){iw=!iw;try{localStorage.setItem(`esgi-theme`,iw?`day`:`night`)}catch{}document.documentElement.dataset.theme=iw?`day`:`night`,ow(),fv.to(Wx,{value:+!!iw,duration:2.4,ease:`power2.inOut`,overwrite:!0}),qC.say(iw?`Il fait jour ! ☀️ Tout est plus clair d'un coup.`:`Retour de la nuit 🌙 Les néons se rallument !`)}aw&&aw.addEventListener(`click`,sw);function cw(){let e=document.createElement(`canvas`);e.width=1024,e.height=512;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,512);n.addColorStop(0,`#7b86ff`),n.addColorStop(.5,`#5865f2`),n.addColorStop(1,`#3c45c0`),t.fillStyle=n,t.fillRect(0,0,1024,512);for(let e=0;e<14;e++)t.fillStyle=`rgba(255,255,255,${.04+Math.random()*.06})`,t.fillRect(0,Math.random()*512,1024,6+Math.random()*18);let r=new Path2D(`M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z`);[256,768].forEach(e=>{t.save();let n=1.45;t.translate(e-127.14*n/2,256-96.36*n/2),t.scale(n,n),t.fillStyle=`#ffffff`,t.fill(r),t.restore()});let i=new ta(e);return i.colorSpace=Ae,i}var lw=null,uw=0,dw=null,fw=!1;function pw(){if(fw)return;fw=!0;let e=XC.getActivePlanet();lw||=cw();let t=e.material.uniforms.map.value;e.material.uniforms.map.value=lw,qC.say(`👾 Bip bip ! Tu as réveillé la planète Discord ! Elle se rendort dans 20 secondes…`,6e3),setTimeout(()=>{e.material.uniforms.map.value=t,fw=!1},2e4)}function mw(){uw++,clearTimeout(dw),dw=setTimeout(()=>{uw=0},2500),uw<=2?sw():(uw===4&&qC.say(`Euh… tu vas finir par l’user, cette planète 😅`,2500),uw===6&&qC.say(`Encore un clic et… 👀`,2e3),uw>=7&&(uw=0,pw()))}var hw=new yr;function gw(e){return XC.isPlanetVisible()?(XC.getActivePlanet().getWorldPosition(hw.center),hw.radius=81,e.ray.intersectsSphere(hw)):!1}var _w=mS(PC,GC,KC),vw=yS(PC,GC,KC),yw=OS(PC);DC(PC,{x:0,z:25.5,top:1.5,bottom:-18.6,opening:{y:2.5,tilt:.155}});var bw=CS(PC,GC),xw=`
  float winHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float winNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(winHash(i), winHash(i + vec2(1.0, 0.0)), f.x), mix(winHash(i + vec2(0.0, 1.0)), winHash(i + vec2(1.0, 1.0)), f.x), f.y);
  }`;function Sw(e){let t=e.geometry,n=t.attributes.position,r=t.index?t.index.array:null,i=n.count,a=new Map,o=new Int32Array(i);for(let e=0;e<i;e++){let t=`${n.getX(e).toFixed(4)},${n.getY(e).toFixed(4)},${n.getZ(e).toFixed(4)}`;a.has(t)||a.set(t,e),o[e]=a.get(t)}let s=new Int32Array(i).map((e,t)=>t),c=e=>{for(;s[e]!==e;)s[e]=s[s[e]],e=s[e];return e},l=r||Array.from({length:i},(e,t)=>t);for(let e=0;e<l.length;e+=3){let t=c(o[l[e]]);s[c(o[l[e+1]])]=t,s[c(o[l[e+2]])]=t}e.updateWorldMatrix(!0,!1);let u=new Y,d=new Map;for(let t=0;t<i;t++){u.fromBufferAttribute(n,t).applyMatrix4(e.matrixWorld);let r=c(o[t]);d.has(r)||d.set(r,new Jn),d.get(r).expandByPoint(u)}let f=new Float32Array(i*4),p=new Float32Array(i*2);for(let e=0;e<i;e++){let t=d.get(c(o[e])),n=t.max.z-t.min.z>t.max.x-t.min.x,r=n?(t.min.x+t.max.x)/2:(t.min.z+t.max.z)/2,i=t.max.y-t.min.y>2;f.set([n?t.min.z:t.min.x,n?t.max.z:t.max.x,+!!n,+(r>0)+(i?2:0)],e*4),p.set([t.min.y,t.max.y],e*2)}t.setAttribute(`aStrip`,new fr(f,4)),t.setAttribute(`aStripY`,new fr(p,2))}function Cw(e){e.onBeforeCompile=e=>{e.uniforms.uDay=Wx,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec4 aStrip;
attribute vec2 aStripY;
varying vec4 vStrip;
varying vec2 vStripY;
varying vec3 vWinPos;
varying vec3 vWinN;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
vWinN = normalize(mat3(modelMatrix) * objectNormal);
vStrip = aStrip;
vStripY = aStripY;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vWinPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nvarying vec4 vStrip;\nvarying vec2 vStripY;\nvarying vec3 vWinPos;\nvarying vec3 vWinN;\nuniform float uDay;${xw}`).replace(`#include <color_fragment>`,`#include <color_fragment>
        diffuseColor.rgb *= mix(1.0, 0.35, uDay);
        // Fenêtres incomplètes (morceaux étroits aux bords de façade) :
        // murées avec exactement la même pierre que la façade autour
        float cu = vStrip.z < 0.5 ? vWinPos.x : vWinPos.z;
        float ci = floor(cu / 1.85 + 0.5);
        float cw = min((ci + 0.5) * 1.85 - 0.125, vStrip.y) - max((ci - 0.5) * 1.85 + 0.125, vStrip.x);
        // + les vitres de l'édicule sur le toit (au-dessus de 90 m), murées aussi
        float wClosed = ((cw < 1.2 && vStrip.w < 1.5) || vStripY.x > 90.0) ? 1.0 : 0.0;
        vec3 sN = normalize(vWinN);
        float fu = dot(vWinPos.xz, normalize(vec2(abs(sN.z), abs(sN.x)) + 1e-5)) / 1.85;
        float fv = (vWinPos.y - 1.464) / 2.667;
        vec2 pCell = floor(vec2(fu, fv) + 0.5);
        vec2 pLoc = fract(vec2(fu, fv) + 0.5) - 0.5;
        float sHash = winHash(pCell + floor(abs(sN.x) * 2.0 + 0.5) * 7.0);
        float grain = winNoise(vWinPos.xz * 7.0 + vWinPos.y * 5.0) * 0.5 + winNoise(vec2(fu * 40.0, vWinPos.y * 13.0)) * 0.5;
        float jointH = 1.0 - smoothstep(0.0, 0.018, abs(abs(pLoc.y) - 0.5));
        float jointV = 1.0 - smoothstep(0.0, 0.012, abs(abs(pLoc.x) - 0.5));
        vec3 stoneCol = vec3(0.367, 0.342, 0.311) * (0.84 + sHash * 0.2 + (grain - 0.5) * 0.12) * (1.0 - max(jointH, jointV) * 0.55);
        float ledBand = step(abs(mod(pCell.y, 6.0)), 0.5) * (1.0 - smoothstep(0.0, 0.03, abs(pLoc.y + 0.47)));
        diffuseColor.rgb = mix(diffuseColor.rgb, stoneCol, wClosed);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        vec3 V = normalize(cameraPosition - vWinPos);
        vec3 wN = normalize(vWinN);
        if (dot(wN, V) < 0.0) wN = -wN; // même résultat pour les deux faces du verre
        // Fenêtre réelle : travée de la grille, bornée par les bords de la bande
        float u = vStrip.z < 0.5 ? vWinPos.x : vWinPos.z;
        float cellIdx = floor(u / 1.85 + 0.5);
        float visL = max((cellIdx - 0.5) * 1.85 + 0.125, vStrip.x);
        float visR = min((cellIdx + 0.5) * 1.85 - 0.125, vStrip.y);
        // Position dans la vitre : (0,0) en bas à gauche, (1,1) en haut à droite
        vec2 w = vec2((u - visL) / max(visR - visL, 0.05), (vWinPos.y - vStripY.x) / max(vStripY.y - vStripY.x, 0.05));
        vec2 cell = vec2(cellIdx, floor(vStripY.x * 3.0 + 0.5));
        float side = vStrip.z * 7.0 + mod(vStrip.w, 2.0) * 13.0;
        float isLobby = step(1.5, vStrip.w);
        float h1 = winHash(cell + side);
        float h2 = winHash(cell * 1.7 + side + 3.1);
        float h3 = winHash(cell * 2.3 + side + 7.7);
        float edgeShade = smoothstep(0.0, 0.08, min(min(w.x, 1.0 - w.x), min(w.y, 1.0 - w.y)));

        // --- Nuit : intérieur des bureaux ---
        // Environ 5 bureaux sur 6 allumés
        float lit = step(0.17, h1);
        // Couleurs : blanc chaud, blanc froid, et beaucoup de bleu et de rose néon
        vec3 roomCol = h2 < 0.36 ? vec3(1.0, 0.76, 0.5)
          : h2 < 0.56 ? vec3(0.8, 0.9, 1.0)
          : h2 < 0.78 ? vec3(0.3, 0.75, 1.0)
          : vec3(1.0, 0.32, 0.78);
        float ceiling = 0.45 + 0.75 * smoothstep(0.25, 0.98, w.y);
        // Stores : certains bureaux les ont baissés à mi-hauteur
        float blindLevel = h3 < 0.35 ? mix(0.35, 0.85, h2) : 1.1;
        // Lamelles lissées puis fondues en teinte moyenne quand la vitre est
        // petite à l'écran (sinon elles scintillent de loin)
        float slatW = fwidth(w.y * 14.0);
        float slat = mix(smoothstep(0.35, 0.65, abs(fract(w.y * 14.0) - 0.5) * 2.0), 0.5, clamp(slatW * 1.5, 0.0, 1.0));
        float blinds = w.y > blindLevel ? mix(0.25, 0.45, slat) : 1.0;
        // Silhouettes de bureaux et d'écrans en bas de la vitre
        float deskW = clamp(fwidth(w.x * 3.0) * 1.5, 0.0, 1.0);
        float desk = (1.0 - smoothstep(0.24, 0.27, w.y)) * step(0.5, h3) * (0.55 + 0.45 * mix(step(0.5, fract(w.x * 3.0 + h1)), 0.5, deskW));
        float interior = ceiling * blinds * (1.0 - desk * 0.7) * edgeShade * (0.8 + 0.4 * h3);
        vec3 nightGlow = roomCol * interior * lit * 0.95 + vec3(0.03, 0.04, 0.08) * (1.0 - lit);
        // Hall du rez-de-chaussée (grandes baies) : vrai hall d'entrée,
        // bandeau lumineux au plafond, imposte, comptoir d'accueil, montants
        vec2 lw = vec2((u - vStrip.x) / max(vStrip.y - vStrip.x, 0.05), w.y);
        vec3 warm = vec3(1.0, 0.8, 0.56);
        vec3 lobbyCol = warm * (0.12 + 0.3 * smoothstep(0.0, 0.85, lw.y));
        lobbyCol += warm * 1.1 * smoothstep(0.86, 0.89, lw.y) * (1.0 - smoothstep(0.93, 0.96, lw.y));
        float transom = 1.0 - smoothstep(0.0, 0.012, abs(lw.y - 0.8));
        float counter = (1.0 - smoothstep(0.26, 0.29, lw.y)) * step(0.2, lw.x) * step(lw.x, 0.8);
        float mullion = 1.0 - smoothstep(0.0, 0.012, min(lw.x, 1.0 - lw.x));
        lobbyCol *= (1.0 - transom * 0.85) * (1.0 - counter * 0.75) * (1.0 - mullion * 0.9);
        nightGlow = mix(nightGlow, lobbyCol, isLobby);

        // --- Jour : reflet du ciel ---
        vec3 R = reflect(-V, wN);
        float fres = 0.2 + 0.8 * pow(1.0 - max(dot(wN, V), 0.0), 3.0);
        vec3 sky = mix(vec3(0.42, 0.62, 0.88), vec3(0.08, 0.24, 0.6), clamp(R.y * 1.4 + 0.25 + (h1 - 0.5) * 0.3, 0.0, 1.0));
        sky = mix(vec3(0.1, 0.14, 0.2), sky, smoothstep(-0.25, 0.05, R.y));
        // Petit reflet du soleil sur certaines vitres
        float glint = pow(max(dot(R, normalize(vec3(0.5, 0.6, 0.6))), 0.0), 60.0) * 2.0;
        vec3 dayGlow = (sky * (0.45 + fres * 0.65) + glint) * edgeShade + vec3(0.02, 0.04, 0.08);

        totalEmissiveRadiance = mix(nightGlow, dayGlow, uDay);
        // Fenêtre murée : même éclairage que la pierre de façade
        vec3 stoneEmis = vec3(1.0, 0.76, 0.5) * 0.55 * exp(-max(vWinPos.y, 0.0) / 9.0) * diffuseColor.rgb * (1.0 - uDay);
        stoneEmis += vec3(0.4, 0.85, 1.0) * 0.45 * exp(-abs(vWinPos.y - 124.0) / 5.0) * diffuseColor.rgb * (1.0 - uDay);
        stoneEmis += vec3(0.13, 0.89, 1.0) * ledBand * mix(1.1, 0.12, uDay);
        totalEmissiveRadiance = mix(totalEmissiveRadiance, stoneEmis, wClosed);`).replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
metalnessFactor = mix(metalnessFactor, 0.65, wClosed);`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, mix(0.12, 0.42, sHash * sHash) + max(jointH, jointV) * 0.4, wClosed);`)},e.customProgramCacheKey=()=>`tower-windows-v14`}var ww={Marble:{color:10657432,metalness:.65,roughness:.24,env:1.8,pattern:`stone`},M_0133_Gray:{color:3817034,metalness:.85,roughness:.25,env:1.3},Steel:{color:11844294,metalness:1,roughness:.18,env:1.5},Metal_Embossed:{color:6967866,metalness:.95,roughness:.22,env:1.4},FloorCover:{color:5921380,metalness:.1,roughness:.55,env:.8,pattern:`tiles`},FrontColor:{color:659488,metalness:.3,roughness:.3,env:.6,emissive:2286847,emissiveIntensity:1.6},default:{color:5592670,metalness:.4,roughness:.5,env:.9}};function Tw(e,t){e.onBeforeCompile=e=>{e.uniforms.uDay=Wx,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vSurfPos;
varying vec3 vSurfN;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
vSurfN = normalize(mat3(modelMatrix) * objectNormal);`).replace(`#include <project_vertex>`,`#include <project_vertex>
vSurfPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`);let n=t===`tiles`?`
        vec2 tileUv = vSurfPos.xz / 2.2;
        vec2 tileId = floor(tileUv);
        vec2 tileF = fract(tileUv);
        float tHash = sxHash(tileId);
        float edge = min(min(tileF.x, 1.0 - tileF.x), min(tileF.y, 1.0 - tileF.y));
        float joint = smoothstep(0.012, 0.03, edge);
        float bevel = smoothstep(0.03, 0.16, edge);
        float grain = sxNoise(vSurfPos.xz * 9.0) * 0.6 + sxNoise(vSurfPos.xz * 31.0) * 0.4;
        float veins = smoothstep(0.6, 0.68, sxNoise(vSurfPos.xz * 1.4 + tHash * 17.0));
        vec3 stone = diffuseColor.rgb * (0.74 + tHash * 0.32) * (0.84 + grain * 0.32);
        stone = mix(stone, stone * 1.45, veins * 0.45);
        stone *= mix(0.7, 1.0, bevel);
        diffuseColor.rgb = mix(stone * 0.22, stone, joint);
        vec2 laneD = abs(fract(tileUv / 5.0 + 0.5) - 0.5) * 5.0;
        float laneX = 1.0 - smoothstep(0.012, 0.04, laneD.x);
        float laneZ = 1.0 - smoothstep(0.012, 0.04, laneD.y);
        // Murets et bordures (faces verticales) : panneaux d'aluminium
        // anthracite brossé, joints creux, au lieu du granit du sol
        float wall = 1.0 - smoothstep(0.35, 0.6, abs(vSurfN.y));
        float wallU = abs(vSurfN.x) > abs(vSurfN.z) ? vSurfPos.z : vSurfPos.x;
        vec2 wallF = fract(vec2(wallU / 1.4, vSurfPos.y / 0.5));
        float wallSeam = smoothstep(0.0, 0.03, wallF.x) * smoothstep(1.0, 0.97, wallF.x) * smoothstep(0.0, 0.05, wallF.y) * smoothstep(1.0, 0.95, wallF.y);
        float brushed = sxNoise(vec2(wallU * 60.0, vSurfPos.y * 2.0)) * 0.6 + sxNoise(vec2(wallU * 3.0, vSurfPos.y * 7.0)) * 0.4;
        vec3 wallCol = mix(vec3(0.11, 0.12, 0.16), vec3(0.28, 0.3, 0.36), uDay) * (0.82 + brushed * 0.3);
        wallCol *= mix(0.45, 1.0, wallSeam);
        diffuseColor.rgb = mix(diffuseColor.rgb, wallCol, wall);
        laneX *= 1.0 - wall;
        laneZ *= 1.0 - wall;`:`
        // Façade calée sur la grille des fenêtres : un panneau de pierre par
        // travée et par étage, joints creux, grain fin, traînées de pluie
        // sous chaque fenêtre, et un bandeau LED tous les 6 étages.
        vec3 sN = normalize(vSurfN);
        float facadeMask = 1.0 - smoothstep(0.35, 0.6, abs(sN.y));
        float fu = dot(vSurfPos.xz, normalize(vec2(abs(sN.z), abs(sN.x)) + 1e-5)) / 1.85;
        float fv = (vSurfPos.y - 1.464) / 2.667;
        vec2 pCell = floor(vec2(fu, fv) + 0.5);
        vec2 pLoc = fract(vec2(fu, fv) + 0.5) - 0.5;
        float sHash = sxHash(pCell + floor(abs(sN.x) * 2.0 + 0.5) * 7.0);
        float grain = sxNoise(vSurfPos.xz * 7.0 + vSurfPos.y * 5.0) * 0.5 + sxNoise(vec2(fu * 40.0, vSurfPos.y * 13.0)) * 0.5;
        diffuseColor.rgb *= 0.84 + sHash * 0.2 + (grain - 0.5) * 0.12;
        // Joints : horizontal au niveau des dalles, vertical entre les travées
        float jointH = 1.0 - smoothstep(0.0, 0.018, abs(abs(pLoc.y) - 0.5));
        float jointV = 1.0 - smoothstep(0.0, 0.012, abs(abs(pLoc.x) - 0.5));
        diffuseColor.rgb *= 1.0 - max(jointH, jointV) * 0.55 * facadeMask;
        // Traînées sombres qui coulent sous les fenêtres
        float underWin = step(abs(pLoc.x), 0.42) * step(pLoc.y, -0.25) * step(-0.5, pLoc.y);
        float streak = sxNoise(vec2(fu * 22.0, 0.5)) * smoothstep(-0.5, -0.25, pLoc.y);
        diffuseColor.rgb *= 1.0 - underWin * streak * 0.22 * facadeMask;
        // Bandeau LED (au niveau d'une dalle, tous les 6 étages)
        float ledFloor = step(abs(mod(pCell.y, 6.0)), 0.5);
        float ledBand = ledFloor * (1.0 - smoothstep(0.0, 0.03, abs(pLoc.y + 0.47))) * facadeMask;`,r=t===`tiles`?`
        float plazaGlow = exp(-length(vSurfPos.xz) / 22.0);
        totalEmissiveRadiance += vec3(1.0, 0.74, 0.46) * 0.5 * plazaGlow * diffuseColor.rgb * (1.0 - uDay);
        // Lignes néon encastrées (discrètes le jour)
        float laneOn = mix(1.2, 0.18, uDay);
        totalEmissiveRadiance += (vec3(0.13, 0.89, 1.0) * laneX + vec3(1.0, 0.24, 0.73) * laneZ * (1.0 - laneX)) * laneOn;`:`
        float footWash = exp(-max(vSurfPos.y, 0.0) / 9.0);
        float crownWash = exp(-abs(vSurfPos.y - 124.0) / 5.0);
        totalEmissiveRadiance += vec3(1.0, 0.76, 0.5) * 0.55 * footWash * diffuseColor.rgb * (1.0 - uDay);
        totalEmissiveRadiance += vec3(0.4, 0.85, 1.0) * 0.45 * crownWash * diffuseColor.rgb * (1.0 - uDay);
        totalEmissiveRadiance += vec3(0.13, 0.89, 1.0) * ledBand * mix(1.1, 0.12, uDay);`,i=t===`stone`?`
        roughnessFactor = mix(0.12, 0.42, sHash * sHash) + max(jointH, jointV) * 0.4;`:`
        // Dalles plus ou moins polies (reflets des néons), joints mats
        roughnessFactor = mix(0.9, mix(0.14, 0.42, tHash) + grain * 0.08, joint);
        roughnessFactor = mix(roughnessFactor, 0.32 + brushed * 0.12, wall);`;e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vSurfPos;
        varying vec3 vSurfN;
        uniform float uDay;
        float sxHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float sxNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(sxHash(i), sxHash(i + vec2(1.0, 0.0)), f.x), mix(sxHash(i + vec2(0.0, 1.0)), sxHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }`).replace(`#include <color_fragment>`,`#include <color_fragment>${n}`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>${i}`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>${r}`)},e.customProgramCacheKey=()=>`tower-${t}-v6`}function Ew(e,t,n){e.updateMatrixWorld(!0);let r=new xc,i=[new Y(-1,0,0),new Y(1,0,0),new Y(0,0,-1),new Y(0,0,1)],a=0;return i.forEach(n=>{let i=n.clone().multiplyScalar(-140).setY(t);r.set(i,n);let o=r.intersectObject(e,!0);if(o.length>0){let e=140-o[0].distance;e>a&&(a=e)}}),a>1?a:n}var Dw=new Ud,Ow=[],kw=[];Dw.load(`/skyscraper.glb`,e=>{let t=e.scene,n=GC/new Jn().setFromObject(t).getSize(new Y).y;t.scale.setScalar(n);let r=new Jn().setFromObject(t),i=r.getCenter(new Y);t.position.set(-i.x,-r.min.y,-i.z);let a=Math.max(r.max.x-r.min.x,r.max.z-r.min.z)/2;t.traverse(e=>{if(!e.isMesh||!e.material)return;let t=e.material,n=(t.name||``).toLowerCase();if(n.includes(`glass`)){let r=n.includes(`green`);t.color.set(461596),t.metalness=.92,t.roughness=.12,t.envMapIntensity=.9,r?(t.emissive.set(8002168),t.emissiveIntensity=.85):(t.emissive.set(5925526),t.emissiveIntensity=.55,Sw(e),Cw(t))}else{let e=ww[t.name]||ww.default;t.color.set(e.color),t.metalness=e.metalness,t.roughness=e.roughness,t.envMapIntensity=e.env,t.emissive.set(e.emissive||0),t.emissiveIntensity=e.emissiveIntensity||0,e.pattern&&Tw(t,e.pattern)}t.needsUpdate=!0}),PC.add(t),t.updateMatrixWorld(!0);let o=new xc,s=(e,n)=>{o.set(e,n);let r=o.intersectObject(t,!0);return r.length>0?r[0]:null},c={x:0,z:11.34,bottom:3.71,top:6.9,width:2.8},l=s(new Y(0,5,140),new Y(0,0,-1));if(l){c.z=l.point.z;let e=s(new Y(0,5,c.z+.6),new Y(0,-1,0));e&&(c.bottom=e.point.y);let t=s(new Y(0,c.bottom+.5,c.z+.05),new Y(0,1,0));t&&(c.top=t.point.y);let n=l.object.material.name,r=0;for(let e=.05;e<4;e+=.05){let t=s(new Y(e,5,140),new Y(0,0,-1));if(!t||t.object.material.name!==n)break;r=e}r>.5&&(c.width=r*2+.06)}let u=RS(PC,KC,{...c,z:c.z+.02}),d=r.max.y-r.min.y,f=(r.max.x-r.min.x)/2,p=(r.max.z-r.min.z)/2,m=new Cn;PC.add(m),[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([e,t],n)=>{KC.add(m,new Y(e*f*.92,d+.4,t*p*.92),sS.aviation,1.6,{speed:.5,phase:n*.03,duty:.45})}),KC.add(m,new Y(0,d+6.5,0),sS.strobe,2.4,{speed:.8,phase:0,duty:.08});for(let e=20;e<d-5;e+=20)[[-1,-1],[1,1]].forEach(([t,n])=>{KC.add(m,new Y(t*f*.95,e,n*p*.95),[1.6,.08,.05],.9)});let h=[{y:104,angle:Math.PI*.5,color:`#22e4ff`,tag:`SYS.01 // FONCTIONNALITÉS`,tabLabel:`01 // FONCTIONNALITÉS`,title:`Fonctionnalités`,zoneName:`NIVEAU 01 — FONCTIONNALITÉS`,lines:[`Devoirs & évaluations par classe`,`Rappels quotidiens à 7 h 30`,`Intégration API Thomson & logs`],detail:{subtitle:`Bot Discord en Python conçu pour accompagner les étudiants ESGI sur leurs devoirs, évaluations et activités de serveur.`,metrics:[{value:`7 H 30`,label:`Messages programmés tous les jours (Europe/Paris)`},{value:`J-7 / J-1 / J0`,label:`Échéances prévues dans 7 jours, 1 jour ou le jour même`},{value:`0,1 %`,label:`Réponse aléatoire avec image issue de l’API Thomson`}],sections:[{title:`Devoirs, Évaluations & Détection de Classe`,desc:`Suivi scolaire automatisé en fonction des rôles Discord attribués à chaque étudiant sur le serveur.`,bullets:[`Détection automatique de la classe de l’utilisateur à partir de ses rôles Discord`,`Ajout et modification des devoirs avec matière, date et sujet`,`Ajout et modification des évaluations, et affichage des devoirs et évaluations à venir`,`Suppression automatique des devoirs dont la date est dépassée`]},{title:`Rappels Programmés & Administration`,desc:`Planification quotidienne des notifications et gestion des rôles administratifs du serveur.`,bullets:[`Messages programmés tous les jours à 7 h 30 pour les échéances prévues dans 7 jours, dans 1 jour ou le jour même`,`Configuration des rôles correspondant aux classes du serveur`,`Attribution d’un rang administratif à un membre`]},{title:`API Thomson, Journalisation & Persistance`,desc:`Fonctionnalités communautaires liées à l’API Thomson, suivi console et stockage local.`,bullets:[`Réponse aléatoire à environ 0,1 % des messages avec une image issue de l’API Thomson`,`Commande spéciale utilisant l’API Thomson pour générer une bannière événementielle`,`Journalisation des événements et des actions importantes dans la console`,`Base SQLite locale pour les devoirs, évaluations, membres, rôles, projets, compétences, notifications et configurations`]}]}},{y:78,angle:Math.PI*1,color:`#ff3dbb`,tag:`SYS.02 // COMMANDES`,tabLabel:`02 // COMMANDES`,title:`Commandes Discord`,zoneName:`NIVEAU 02 — COMMANDES SLASH`,lines:[`Devoirs & évaluations (/ajouter_*, /lister_*)`,`Classes & admin (/configurer_*, /admin_*)`,`Thomson, ping & suppression (/implorer_*, /ping)`],detail:{subtitle:`Ensemble des 9 commandes slash du bot Discord pour la gestion des devoirs, des évaluations, des classes et des interactions serveur.`,metrics:[{value:`9 COMMANDES`,label:`Commandes slash synchronisées avec Discord`},{value:`MENUS & MODALES`,label:`Sélection de matières et formulaires interactifs`},{value:`PAR CLASSE`,label:`Filtrage selon la classe de l’utilisateur`}],sections:[{title:`Devoirs & Évaluations`,desc:`Ajout via menus de matières et formulaires, et consultation des échéances de la classe.`,bullets:[`/ajouter_un_devoir : Ouvre un menu de matières puis un formulaire pour ajouter un devoir.`,`/ajouter_une_évaluation : Ouvre un menu de matières puis un formulaire pour ajouter une évaluation.`,`/lister_les_devoirs : Liste les devoirs de la classe de l’utilisateur.`,`/lister_les_évaluations : Liste les évaluations de la classe de l’utilisateur.`]},{title:`Configuration & Permissions`,desc:`Commandes réservées au paramétrage des rôles de classes et des droits administrateur.`,bullets:[`/configurer_les_classes : Permet à un administrateur de choisir les rôles Discord utilisés comme classes.`,`/admin_permission : Attribue le rang administrateur à un membre.`]},{title:`Diagnostic, Thomson & Gestion des Messages`,desc:`Commandes utilitaires et créations aléatoires liées à l’API Thomson.`,bullets:[`/ping : Affiche la latence du bot.`,`/implorer_le_tout_puissant : Affiche une création aléatoire avec une image issue de l’API Thomson.`,`/nouvelle_identité : Interface prévue pour supprimer les messages envoyés par l’utilisateur.`]}]}},{y:50,angle:Math.PI*1.5,color:`#22e4ff`,tag:`SYS.03 // ARCHITECTURE`,tabLabel:`03 // ARCHITECTURE`,title:`Technologies & Structure`,zoneName:`NIVEAU 03 — STACK & STRUCTURE`,lines:[`Python 3, discord.py, aiohttp & Zoneinfo`,`Base de données SQLite locale (bot.db)`,`5 cogs modulaires, files/ & dossier Site/`],detail:{subtitle:`Architecture modulaire en Python 3 articulée autour de 5 cogs spécialisés, d'une base SQLite locale et du dossier Site Three.js.`,metrics:[{value:`PYTHON 3`,label:`discord.py, aiohttp & Zoneinfo (Europe/Paris)`},{value:`5 COGS`,label:`commands, configSQL, sql, notifications, events`},{value:`BOT.DB`,label:`Persistance locale SQLite`}],sections:[{title:`Technologies`,desc:`Bibliothèques et modules utilisés pour exécuter le bot et ses tâches planifiées.`,bullets:[`Python 3`,`discord.py pour les commandes slash, les événements, les boutons et les modales`,`SQLite pour la persistance locale`,`aiohttp pour les appels API`,`Zoneinfo pour la gestion du fuseau Europe/Paris`]},{title:`Structure du Projet`,desc:`Répartition des fichiers racines, des cogs Discord, des données Thomson et du site 3D.`,bullets:[`Racine : main.py, config.py, utils.py, LOGS.py et bot.db`,`cogs/ : commands.py, configSQL.py, sql.py, notifications.py et events.py`,`files/Thomson_names.json & Site/ (src/, public/, package.json)`],code:`.
├── main.py                  # Point d'entrée et initialisation du bot
├── config.py                # Configuration Discord et API
├── utils.py                 # Matières et catégories proposées
├── LOGS.py                  # Logger console
├── bot.db                   # Base SQLite locale
├── cogs/
│   ├── commands.py          # Commandes slash et modales
│   ├── configSQL.py         # Configuration des classes et permissions
│   ├── sql.py               # Création et accès à la base SQLite
│   ├── notifications.py     # Tâche quotidienne de rappel
│   └── events.py            # Événements Discord et API Thomson
├── files/
│   └── Thomson_names.json   # Données utilisées pour générer les messages
└── Site/
    ├── src/                 # Scène Three.js, panneaux et animations
    ├── public/              # Ressources 3D et fichiers publics
    └── package.json         # Scripts et dépendances du site`}]}},{y:24,angle:Math.PI*2,color:`#8b5cf6`,tag:`SYS.04 // INSTALLATION & RÔLES`,tabLabel:`04 // INSTALL & RÔLES`,title:`Installation & Équipe`,zoneName:`NIVEAU 04 — INSTALLATION & ÉQUIPE`,lines:[`Environnement .venv & lancement main.py`,`Site 3D : npm install, npm run dev & build`,`Rôles : JMG (développeur) & Yanis (secrétaire)`],detail:{subtitle:`Procédure d'installation du bot Python, commandes de lancement du site 3D et présentation des contributions de JMG et Yanis.`,metrics:[{value:`MAIN.PY`,label:`Init tables SQLite, cogs & sync slash`},{value:`SITE/`,label:`npm install, npm run dev & npm run build`},{value:`JMG & YANIS`,label:`Développement principal & secrétariat du projet`}],sections:[{title:`Installation et Démarrage du Bot`,desc:`Au démarrage, le bot initialise les tables SQLite, charge les cogs, puis synchronise les commandes slash avec Discord.`,bullets:[`Récupérer le code sur GitHub : <a href="https://github.com/JMG-LEGENDARY/Bot_discord_ESGI" target="_blank" rel="noopener noreferrer">github.com/JMG-LEGENDARY/Bot_discord_ESGI</a>`,`Créer un environnement virtuel : python3 -m venv .venv`,`L’activer : source .venv/bin/activate (Linux / macOS) ou .venv\\Scripts\\activate (Windows)`,`Installer les dépendances Python : pip install -r requirements.txt`,`Créer le fichier config.py avec le token du bot Discord (fichier ignoré par Git : ne jamais le publier)`,`Lancer le bot : python main.py`],code:`git clone https://github.com/JMG-LEGENDARY/Bot_discord_ESGI.git
cd Bot_discord_ESGI
python3 -m venv .venv
# Linux / macOS
source .venv/bin/activate
# Windows
.venv\\Scripts\\activate
pip install -r requirements.txt
# Créer config.py avec le token du bot (jamais commité)
python main.py`},{title:`Lancement et Build du Site`,desc:`Commandes exécutées dans le répertoire Site/ pour le développement et la version prête à être déployée.`,bullets:[`Se placer dans le dossier Site et installer les dépendances avec npm install`,`Lancer le serveur de développement avec npm run dev`,`Créer une version prête à être déployée avec npm run build`],code:`cd Site
npm install
npm run dev
npm run build`},{title:`Rôles dans le Projet`,desc:`Répartition des contributions autour du bot Discord et du site 3D.`,bullets:[`JMG — développeur principal du bot : porte l’essentiel du développement actuel du bot et de ses différentes briques (architecture Python, démarrage du bot, commandes Discord, modales, gestion des devoirs et évaluations, cogs, notifications programmées, accès SQLite, événements Discord, intégration Thomson et réalisation du site 3D).`,`Yanis — secrétaire du projet : rédige les comptes rendus et rapports de livrables, suit l’avancement du bot, tient la documentation et s’occupe du site vitrine ; renfort sur le code si besoin (configuration, listes de matières, SQLite).`]},{title:`Feuille de Route`,desc:`Prochaines étapes prévues pour le bot, d’après le rapport du livrable 1.`,bullets:[`Prévu : rôles par élève, par classe et par matière`,`Prévu (janvier – mars 2027) : ouverture du bot à toute l’ESGI`]}]}}],g=[{label:`pillar-0`,color:`#22e4ff`,tag:`COLLAB 01 // DÉVELOPPEUR PRINCIPAL`,tabLabel:`01 // JMG`,title:`JMG — Développeur Principal`,detail:{subtitle:`Bryan (JMG), étudiant en 1re année de Bachelor Informatique à l'ESGI Reims, porte l'essentiel du développement du bot Discord et de cette expérience web 3D.`,metrics:[{value:`ESGI REIMS`,label:`1re année de Bachelor Informatique`},{value:`FULL-STACK`,label:`Architecture Python, SQLite & interface 3D`},{value:`9 COMMANDES`,label:`Commandes slash, modales & rappels programmés`}],sections:[{title:`Développement du Cœur du Bot (Python & SQLite)`,desc:`Conception de l'architecture modulaire du bot, du démarrage dans main.py jusqu'à la persistance locale dans bot.db.`,bullets:[`Architecture Python complète, initialisation des tables SQLite et chargement des cogs`,`Commandes slash, menus de sélection de matières et formulaires modaux Discord`,`Gestion des devoirs et évaluations avec détection automatique de la classe via les rôles`,`Tâche quotidienne de notifications programmées à 7 h 30 (Europe/Paris)`]},{title:`Intégration Thomson & Réalisation du Site 3D`,desc:`Connexion aux événements Discord, intégration de l'API Thomson et création de la vitrine interactive Three.js.`,bullets:[`Gestion des événements Discord, journalisation console (LOGS.py) et intégration de l’API Thomson`,`Conception et réalisation complète du site 3D interactif (Three.js, shaders GLSL, GSAP)`]}]}},{label:`pillar-1`,color:`#ff3dbb`,tag:`COLLAB 02 // SECRÉTARIAT & SUIVI`,tabLabel:`02 // YANIS`,title:`Yanis — Secrétaire du Projet`,detail:{subtitle:`Yanis, étudiant en 1re année de Bachelor Informatique à l'ESGI Reims, assure le secrétariat du projet : comptes rendus, suivi de l'avancement du bot et documentation. Il prête aussi main-forte sur le code quand c'est nécessaire et s'occupe du site vitrine.`,metrics:[{value:`COMPTES RENDUS`,label:`Rapports de livrables & points d’étape`},{value:`SUIVI`,label:`Avancement du bot & tâches à venir`},{value:`RENFORT CODE`,label:`Configuration, matières, SQL & site vitrine`}],sections:[{title:`Secrétariat & Suivi de l’Avancement`,desc:`Garder une trace claire de ce qui est fait, de ce qui reste à faire et des décisions prises.`,bullets:[`Rédaction des comptes rendus de réunion et des rapports de livrables`,`Suivi de l’avancement du bot : fonctionnalités terminées, en cours et prévues`,`Documentation du projet : README, installation et liste des commandes`]},{title:`Renfort sur le Code`,desc:`Un coup de main sur le développement du bot quand le besoin se présente.`,bullets:[`Configuration générale du bot (config.py)`,`Listes de matières et catégories proposées aux étudiants (utils.py)`,`Participation à la couche base de données SQLite (cogs/sql.py)`]},{title:`Site Vitrine`,desc:`Mise en forme et contenu de cette expérience web de présentation du projet.`,bullets:[`Rédaction et mise à jour des contenus présentés sur le site`,`Restylage de l’interface et cohérence des informations avec le bot`]}]}},{label:`pillar-2`,color:`#8b5cf6`,tag:`COLLAB 03 // ÉCOLE & CAMPUS`,tabLabel:`03 // ESGI`,title:`ESGI — Campus de Reims`,detail:{subtitle:`L'École Supérieure de Génie Informatique (ESGI) offre le cadre académique et collaboratif au sein duquel ce projet est né pour accompagner le quotidien des promotions.`,metrics:[{value:`ESGI REIMS`,label:`École Supérieure de Génie Informatique`},{value:`ENTRAIDE`,label:`Centralisation des devoirs & évaluations`},{value:`PRATIQUE`,label:`Application concrète du génie logiciel`}],sections:[{title:`Un Outil Pensé pour la Vie Étudiante`,desc:`Répondre à un besoin concret d'organisation sur les serveurs Discord des étudiants de l'école.`,bullets:[`Suivi partagé des devoirs et évaluations par classe et par matière`,`Rappels automatiques quotidiens avant chaque échéance importante`,`Adaptation multi-classes via les rôles Discord du campus`]},{title:`Terrain d’Expérimentation Technique`,desc:`Mise en pratique des compétences développées en cursus informatique : Python, bases de données relationnelles, API et rendu 3D.`,bullets:[`Développement modulaire en Python avec persistance SQLite`,`Intégration d’API asynchrones avec aiohttp (API Thomson)`]}]}},{label:`pillar-3`,color:`#22e4ff`,tag:`COLLAB 04 // ASSISTANTS IA`,tabLabel:`04 // GEMINI & CLAUDE`,title:`Gemini & Claude — Assistance IA`,detail:{subtitle:`Deux assistants IA ont accompagné l'équipe : Gemini sur la conception de l'expérience web 3D, Claude sur la relecture du code, le contenu et le restylage du site.`,metrics:[{value:`THREE.JS & GLSL`,label:`Gemini : shaders, scène 3D & post-traitement`},{value:`GSAP SCROLL`,label:`Gemini : chorégraphie caméra & transitions`},{value:`CODE & CONTENU`,label:`Claude : relecture, cohérence & restylage`}],sections:[{title:`Gemini — Environnement 3D & Shaders`,desc:`Assistance dans le développement de la scène WebGL et des effets atmosphériques.`,bullets:[`Création des shaders personnalisés (Voie Lactée, mer de nuages et nuages barbe à papa)`,`Génération procédurale de la mégalopole futuriste, de l’éco-parc et de la flotte spatiale`,`Calibration du post-traitement (ACES Filmic, UnrealBloomPass) et instanciation GPU`]},{title:`Gemini — Navigation Interactive & Résolution de Bugs`,desc:`Aide au pilotage de la caméra au défilement et à l'intégration des fiches de documentation.`,bullets:[`Synchronisation des trajectoires de caméra avec GSAP ScrollTrigger`,`Mise en place du raycasting 3D et de l’interface modale néon plein écran`,`Diagnostic et correction des erreurs WebGL et d’ergonomie`]},{title:`Claude — Relecture, Contenu & Restylage`,desc:`Aide à la vérification du code et à la mise en cohérence du site avec le vrai fonctionnement du bot.`,bullets:[`Comparaison du contenu du site avec le code du bot pour corriger les informations`,`Aide à la rédaction des présentations de l’équipe et des fonctionnalités`,`Accompagnement sur le restylage de l’interface et le lancement du projet`]}]}},{label:`pillar-4`,color:`#ff3dbb`,tag:`COLLAB 05 // REMERCIEMENTS`,tabLabel:`05 // MERCI`,title:`Remerciements Généraux`,detail:{subtitle:`Un merci particulier à toutes les personnes qui ont rendu ce projet possible, inspiré ses fonctionnalités ou contribué à son évolution au quotidien.`,metrics:[{value:`THOMAS PIERSON`,label:`Direction pédagogique & inspiration API Thomson`},{value:`GRÉGOIRE`,label:`Accès API & support technique`},{value:`ÉQUIPE & ÉLÈVES`,label:`Encadrement pédagogique & retours terrain`}],sections:[{title:`Thomas Pierson & l’Équipe Pédagogique`,desc:`Reconnaissance envers l'encadrement pédagogique de l'ESGI Reims pour son accompagnement et la dynamique de promo.`,bullets:[`Thomas Pierson (directeur pédagogique à l’ESGI Reims) : inspiration directe de l’API Thomson et des commandes communautaires associées`,`L’équipe pédagogique : suivi, conseils et cadre d’apprentissage tout au long de l’année`]},{title:`Grégoire & les Élèves de l’ESGI`,desc:`Merci aux contributeurs techniques et aux étudiants qui font vivre le bot sur Discord.`,bullets:[`Grégoire : un grand merci pour l’accès à l’API ayant permis d’intégrer les fonctionnalités externes du bot`,`Les élèves : merci pour leurs tests, leurs retours et l’utilisation quotidienne du bot pour les devoirs et évaluations`]}]}}];h.forEach((e,n)=>{e.panelRadius=Ew(t,e.y,a*.65)+3,e.camRadius=e.panelRadius+14.5;let r=bS(e.tag,e.title,e.lines,e.color,9.4,4.7);r.position.set(Math.sin(e.angle)*e.panelRadius,e.y,Math.cos(e.angle)*e.panelRadius),r.lookAt(0,e.y,0),r.rotateY(Math.PI),r.screenMesh&&(r.screenMesh.userData.dossierType=`tower`,r.screenMesh.userData.dossierIndex=n,kw.push(r.screenMesh)),PC.add(r),Ow.push(r)});let _=document.getElementById(`panel-prompt`),v=document.getElementById(`prompt-tag`),y=document.getElementById(`prompt-title`),b=document.getElementById(`prompt-open-btn`),x=document.getElementById(`panel-modal`),S=document.getElementById(`modal-backdrop`),C=document.getElementById(`modal-scroll-area`),w=document.getElementById(`modal-close-btn`),T=document.getElementById(`modal-footer-close`),E=document.getElementById(`modal-tabs`),D=document.getElementById(`modal-tag`),O=document.getElementById(`modal-title`),k=document.getElementById(`modal-subtitle`),A=document.getElementById(`modal-metrics`),j=document.getElementById(`modal-accordions`),M=null,N=!1;function P(e,t){let n=e===`underground`?g:h,r=n[t];r&&(x.style.setProperty(`--modal-accent`,r.color),D.textContent=r.tag,O.textContent=r.title,k.textContent=r.detail.subtitle,E.innerHTML=n.map((n,r)=>`
        <button type="button" class="modal-tab ${r===t?`active`:``}" data-type="${e}" data-idx="${r}">
          ${n.tabLabel}
        </button>
      `).join(``),E.querySelectorAll(`.modal-tab`).forEach(e=>{e.addEventListener(`click`,()=>{P(e.dataset.type,Number(e.dataset.idx))})}),A.innerHTML=r.detail.metrics.map(e=>`
        <div class="metric-card">
          <div class="metric-value">${e.value}</div>
          <div class="metric-label">${e.label}</div>
        </div>
      `).join(``),j.innerHTML=r.detail.sections.map((e,t)=>`
        <div class="neon-dropdown ${t===0?`expanded`:``}">
          <button type="button" class="dropdown-trigger" aria-expanded="${t===0}">
            <div class="dropdown-trigger-left">
              <span class="dropdown-index">0${t+1}</span>
              <span class="dropdown-heading">${e.title}</span>
            </div>
            <span class="dropdown-chevron">▼</span>
          </button>
          <div class="dropdown-body">
            <p class="dropdown-desc">${e.desc}</p>
            <ul class="dropdown-list">
              ${e.bullets.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            ${e.code?`<pre class="dropdown-code">${e.code}</pre>`:``}
          </div>
        </div>
      `).join(``),j.querySelectorAll(`.dropdown-trigger`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.neon-dropdown`).classList.toggle(`expanded`);e.setAttribute(`aria-expanded`,String(t))})}),C.scrollTop=0)}function F(e,t){P(e,t),N=!0,x.classList.add(`open`),x.setAttribute(`aria-hidden`,`false`),_.classList.remove(`visible`),qC.hide(),document.documentElement.style.overflow=`hidden`,document.body.style.overflow=`hidden`}function I(){N&&(N=!1,x.classList.remove(`open`),x.setAttribute(`aria-hidden`,`true`),document.documentElement.style.overflow=``,document.body.style.overflow=``)}let ee={color:`#e8c27a`,tag:`ENTRÉE // ASCENSEUR`,title:`Entrer dans la tour`},te=b.querySelector(`kbd + span`);function ne(){M&&(M.type===`door`?de():F(M.type,M.index))}b.addEventListener(`click`,ne),w.addEventListener(`click`,I),T.addEventListener(`click`,I),S.addEventListener(`click`,I),window.addEventListener(`keydown`,e=>{e.key===`Enter`&&!N&&!z&&M?(e.preventDefault(),ne()):e.key===`Escape`&&N&&(e.preventDefault(),I())});let L={mode:0,angle:0,radius:28,camY:141.1,targetY:141,ux:0,uy:14,uz:44,utx:0,uty:3,utz:0},re=document.querySelectorAll(`.pillar-btn`);function ie(e){re.forEach(t=>{t.classList.toggle(`active`,t.dataset.label===e)})}let R=fv.timeline({scrollTrigger:{trigger:`.scroll-container`,start:`top top`,end:`bottom bottom`,scrub:.6,onUpdate:e=>{let t=document.getElementById(`hud`),n=document.getElementById(`hud-alt`),r=document.getElementById(`hud-zone`),i=document.getElementById(`hud-fill`),a=document.getElementById(`scroll-hint`),o=document.getElementById(`pillar-nav`);a&&(a.style.opacity=e.progress>.02?`0`:`1`),i&&(i.style.width=`${Math.round(e.progress*100)}%`);let s=wt.lerp(L.camY,L.uy,L.mode),c=Math.round(s*5);n&&(n.textContent=`ALT ${c}M`);let l=L.mode>.72;if(document.body.classList.toggle(`in-underground`,l),t&&t.classList.toggle(`hidden`,s<2),o&&o.classList.toggle(`visible`,l),document.body.classList.toggle(`pillars-open`,l),r&&!l&&(r.textContent=s>116?`CITADELLE ORBITALE`:s>90?h[0].zoneName:s>64?h[1].zoneName:s>36?h[2].zoneName:s>17?h[3].zoneName:`PARC NÉON & PASSERELLES`),l){let e=R.time(),t=`underground-overview`,n=1/0;[`underground-overview`,`pillar-0`,`pillar-1`,`pillar-2`,`pillar-3`,`pillar-4`].forEach(r=>{let i=Math.abs(R.labels[r]-e);i<n&&(n=i,t=r)}),ie(t)}}}});R.addLabel(`top`),h.forEach((e,t)=>{R.to(L,{angle:e.angle,radius:e.camRadius,camY:e.y,targetY:e.y,duration:2,ease:`power1.inOut`}).to(L,{angle:e.angle,camY:e.y,targetY:e.y,duration:.4,ease:`none`}).addLabel(`panel-${t}`).to(L,{angle:e.angle,camY:e.y,targetY:e.y,duration:.4,ease:`none`})}),R.to(L,{angle:Math.PI*2.25,radius:48,camY:13.5,targetY:3.5,duration:2,ease:`power1.inOut`}).to(L,{angle:Math.PI*2,radius:c.z+6.8,camY:c.bottom+1.5,targetY:c.bottom+1.45,duration:1.8,ease:`power1.inOut`}).to(L,{duration:.4}).addLabel(`tower-door`).to(L,{duration:.4}).to(L,{angle:Math.PI*2,radius:25.5,camY:5,targetY:-40,ux:0,uy:5,uz:25.5,utx:0,uty:-30,utz:24.5,duration:1.4,ease:`power1.inOut`}).to(L,{mode:1,ux:0,uy:-16,uz:25.5,utx:0,uty:-40,utz:25,duration:1.6,ease:`power2.in`}).to(L,{ux:0,uy:yw.floorY+12.5,uz:25.5,utx:0,uty:yw.floorY+5.2,utz:-3.5,duration:1.8,ease:`power2.out`}).to(L,{duration:.4}).addLabel(`underground-overview`).to(L,{duration:.4}),yw.pillarsData.forEach(e=>{R.to(L,{ux:e.camPos.x,uy:e.camPos.y,uz:e.camPos.z,utx:e.pos.x,uty:e.pos.y+5.2,utz:e.pos.z,duration:1.8,ease:`power2.inOut`}).to(L,{duration:.35}).addLabel(e.label).to(L,{duration:.35})});let z=!1,B=!1,ae={open:0,glow:0,dolly:0},oe=new Y,se=new Y,ce=document.createElement(`div`);ce.id=`white-flash`,document.body.appendChild(ce);let V=e=>new Promise(t=>{ce.classList.toggle(`on`,e),setTimeout(t,650)}),le=TC(PC,{say:(e,t)=>qC.say(e,t),onExit:fe,renderer:BC});function ue(e){document.documentElement.style.overflow=e?`hidden`:``,document.body.style.overflow=e?`hidden`:``,document.body.classList.toggle(`in-elevator`,e)}async function de(){z||N||(z=!0,le.unlockAudio(),ge(),ue(!0),_.classList.remove(`visible`),be&&be.classList.remove(`visible`),document.body.style.cursor=`default`,await new Promise(e=>fv.to(ae,{open:1,duration:.9,ease:`power2.inOut`,onComplete:e})),fv.to(ae,{glow:1,duration:.7,ease:`power1.out`}),fv.to(ae,{dolly:1,duration:1.5,ease:`power2.in`}),await new Promise(e=>setTimeout(e,950)),await V(!0),le.enter(),B=!0,await V(!1))}async function fe(){await V(!0),le.leave(),fv.killTweensOf(ae),ae.open=0,ae.glow=0,ae.dolly=0,B=!0,ue(!1);let e=R.scrollTrigger;e&&R.labels[`tower-door`]!==void 0&&window.scrollTo(0,e.start+R.labels[`tower-door`]/R.duration()*(e.end-e.start)),z=!1,M=null,await V(!1),qC.say(`De retour dehors ! 🌃`,3e3)}let pe=null,me=null,he=!1;function ge(){clearTimeout(pe),me&&=(me.kill(),null)}window.addEventListener(`wheel`,ge,{passive:!0}),window.addEventListener(`touchstart`,ge,{passive:!0}),window.addEventListener(`scroll`,()=>{he||N||(clearTimeout(pe),pe=setTimeout(()=>{let e=R.scrollTrigger;if(!e)return;let t=e.progress,n=[`panel-0`,`panel-1`,`panel-2`,`panel-3`,`tower-door`],r=null,i=.022;if(n.forEach(e=>{if(R.labels[e]!==void 0){let n=R.labels[e]/R.duration(),a=Math.abs(n-t);a<i&&(i=a,r=n)}}),r!==null&&i>.002){let t=e.start+r*(e.end-e.start),n={y:window.scrollY};he=!0,me=fv.to(n,{y:t,duration:.9,ease:`power2.out`,onUpdate:()=>window.scrollTo(0,n.y),onComplete:()=>{he=!1,me=null},onInterrupt:()=>{he=!1}})}},340))},{passive:!0});function _e(e,t=null){let n=R.scrollTrigger;if(!n||R.labels[e]===void 0){t&&t();return}ge();let r=R.labels[e]/R.duration(),i=n.start+r*(n.end-n.start),a={y:window.scrollY};he=!0,me=fv.to(a,{y:i,duration:1,ease:`power2.inOut`,onUpdate:()=>window.scrollTo(0,a.y),onComplete:()=>{he=!1,me=null,t&&t()},onInterrupt:()=>{he=!1}})}let H=0,ve=null;re.forEach(e=>{e.addEventListener(`click`,()=>{_e(e.dataset.label),e.dataset.label===`pillar-0`&&(H++,clearTimeout(ve),ve=setTimeout(()=>{H=0},6e3),H>=5&&(H=0,qC.setCrown(),qC.say(`👑 Bryan alias JMG, le Big Boss… je porte sa couronne maintenant !`,5e3)))})});let U=new xc,ye=new J,be=document.getElementById(`pillar-tooltip`),xe={x:0,y:0},Se={x:0,y:0},Ce={x:0,y:0};function we(e){let t=e;for(;t;){if(t.userData&&t.userData.label)return t.userData.label;t=t.parent}return null}window.addEventListener(`pointerdown`,e=>{xe={x:e.clientX,y:e.clientY}}),window.addEventListener(`pointermove`,e=>{if(Se.x=e.clientX/window.innerWidth*2-1,Se.y=-(e.clientY/window.innerHeight)*2+1,N||z&&!le.active||le.coversScreen){document.body.style.cursor=`default`,be&&be.classList.remove(`visible`);return}if(ye.set(Se.x,Se.y),U.setFromCamera(ye,FC),le.active){document.body.style.cursor=le.pointerMove(U)?`pointer`:`default`,be&&be.classList.remove(`visible`);return}if(L.mode<.35){let e=gw(U),t=u.isHit(U);u.setHover(t);let n=U.intersectObjects(kw,!0);document.body.style.cursor=e||t||n.length>0?`pointer`:`default`,be&&(t?be.textContent=`CLIQUEZ POUR ENTRER DANS LA TOUR`:be.textContent=iw?`CLIQUEZ : PASSER EN MODE NUIT`:`CLIQUEZ : PASSER EN MODE JOUR`,be.classList.toggle(`visible`,e||t));return}if(L.mode<.72){document.body.style.cursor=`default`,be&&be.classList.remove(`visible`);return}let t=U.intersectObjects(yw.interactivePillarObjects,!0),n=t.length>0?we(t[0].object):null;document.body.style.cursor=n?`pointer`:`default`,be&&(be.textContent=`CLIQUEZ POUR INSPECTER LE PILIER`,be.classList.toggle(`visible`,!!n))}),window.addEventListener(`pointerup`,e=>{if(!N&&!(e.target.closest&&e.target.closest(`button, nav, a, #companion-bubble`))&&!(Math.hypot(e.clientX-xe.x,e.clientY-xe.y)>6)){if(ye.x=e.clientX/window.innerWidth*2-1,ye.y=-(e.clientY/window.innerHeight)*2+1,U.setFromCamera(ye,FC),le.active){if(le.coversScreen)return;if(qC.isHit(U)){qC.say(`Bip ! Choisis ton étage sur le tableau à droite 👉`,3e3);return}le.click(U)}else if(!z){if(qC.isHit(U))K();else{if(L.mode<.35){if(gw(U)){mw();return}if(u.isHit(U)){de();return}let e=U.intersectObjects(kw,!0);if(e.length>0&&e[0].object.userData.dossierIndex!==void 0){F(`tower`,e[0].object.userData.dossierIndex);return}}if(L.mode>=.72){let e=U.intersectObjects(yw.interactivePillarObjects,!0),t=e.length>0?we(e[0].object):null;if(t){let e=g.findIndex(e=>e.label===t);be&&be.classList.remove(`visible`),_e(t,()=>{e!==-1&&F(`underground`,e)})}}}}}});let Te={top:`Salut, moi c'est NOVA ! 🛰️ Fais défiler pour descendre la tour, je te suis.`,"panel-0":`Les fonctionnalités du bot sont ici. ${LC?`Touche « Ouvrir le dossier »`:`Appuie sur Entrée`} pour en savoir plus !`,"panel-1":`Toutes les commandes slash du bot, à découvrir dans ce dossier.`,"panel-2":`Côté technique : Python, SQLite… le cœur du bot ⚙️`,"panel-3":`Comment installer le bot, et qui l'a fabriqué 👀`,city:`La ville basse ! Attention aux voitures volantes 🚗`,"tower-door":`La porte de la tour ! Clique dessus pour entrer et prendre l’ascenseur jusqu’à ton étage 🛗`,descent:`Accroche-toi, on plonge sous la tour !`,underground:`Le sous-sol : l'équipe derrière le projet 🛠️`,"pillar-0":`Bryan alias JMG : le Big Boss 😎`,"pillar-1":`Yanis, c'est mon Papa 👨‍👦 Ma Maman ? C'est Claude 🤖💜`,"pillar-2":`L'ESGI Reims, l'école où tout a commencé 🎓`,"pillar-3":`Gemini et Maman Claude, les assistants IA… un peu comme moi 🤖`,"pillar-4":`Pense à aller voir ce site : https://thomsonpic-v2.grgoire.fr`},W=[`Tu fais quoi ? 👀`,`Hé ! Tu t'es endormi ? 😴`,`Tu es toujours là ? On continue la visite ?`],Ee=0,De=null,G={3:`Hé ! Ça chatouille 😆`,5:`Arrête, je travaille là 😤`,7:`Wouah… j’ai le tournis 😵‍💫`,9:`Dernier avertissement ! 😠`,10:`Bon. Je fais une sieste. Réveille-moi plus tard 💤`};function K(){qC.sleeping?qC.say(`💤 Zzz… (chut, il dort)`,2e3):(Ee++,clearTimeout(De),De=setTimeout(()=>{Ee=0},6e3),Ee===7&&qC.spin(),Ee===3&&qC.setMood(`happy`,2.5),(Ee===5||Ee===9)&&qC.setMood(`angry`,2.5),Ee>=10?(Ee=0,qC.say(G[10],3e3),qC.sleep(15)):qC.say(G[Ee]||Oe[Math.floor(Math.random()*Oe.length)],2600))}let Oe=[`Hé, ça chatouille ! 😆`,`Je suis NOVA, ton guide de la tour 🛰️`,`Bip boup ! Tout va bien ici.`,`Tu veux que je te montre le sous-sol ? Fais défiler !`],q=performance.now(),ke=!1,Ae=!1,je=()=>{q=performance.now(),ke=!1,Ae=!1};[`scroll`,`wheel`,`touchstart`,`touchmove`,`keydown`,`pointerdown`].forEach(e=>window.addEventListener(e,je,{passive:!0}));let Me=null,Ne=0,Pe=null,Fe=null,Ie=0;function Le(e){let t=R.time(),n=null,r=1/0;return e.forEach(e=>{let i=R.labels[e];if(i===void 0)return;let a=Math.abs(i-t);a<r&&(r=a,n=e)}),r<.45?n:null}let Re=[`underground-overview`,`pillar-0`,`pillar-1`,`pillar-2`,`pillar-3`,`pillar-4`],ze=[`panel-0`,`panel-1`,`panel-2`,`panel-3`];function Be(e){if(L.mode>.85){let e=Le(Re);return e===`underground-overview`?`underground`:e}return L.mode>.1?`descent`:Le(ze)||(Le([`tower-door`])?`tower-door`:e>116?`top`:e<17?`city`:null)}function Ve(e,t,n){let r=(performance.now()-q)/1e3;if(Fe!==null&&e>0){let t=(n-Fe)/e;Ie=wt.lerp(Ie,t,1-Math.exp(-e*4))}if(Fe=n,qC.update(e,t,{progress:R.scrollTrigger?R.scrollTrigger.progress:0,idle:r,portrait:FC.aspect<1,verticalSpeed:Ie,teleport:B}),B=!1,z)return;r>10&&!ke&&(ke=!0,qC.say(`Je fais un petit tour en attendant… 🌀`,3e3)),r>60&&!Ae&&(Ae=!0,qC.say(W[Math.floor(Math.random()*W.length)],6e3));let i=Be(n);if(i!==Me&&(Me=i,Ne=t),i&&i!==Pe&&t-Ne>.5&&Te[i]){let e=Te[i];qC.say(e,e.includes(`http`)?9e3:4500),Pe=i}}let He=new wc,Ue=new Y,We=new Y,Ge=new Y,Ke=new Y,qe=new Y,Je=new Y,Ye=new Y,Xe=!1,Ze=0,Qe=0,$e=0;function et(e){if(Ze++,Qe+=e,Qe<2)return;let t=Ze/Qe;Ze=0,Qe=0,t>=45?$e=0:$C?t<30&&zC>1&&(zC=Math.max(1,zC-.125),BC.setPixelRatio(zC),UC.setPixelRatio(zC),YC()):zC>1?(zC=Math.max(1,zC-.25),BC.setPixelRatio(zC),UC.setPixelRatio(zC),YC()):WC.enabled&&t<30?WC.enabled=!1:t<30&&!ew&&++$e>=2&&(rw(!0,!0),qC.say(`😅 Ton ordi a l’air de souffrir… J’ai activé le mode léger. Bouton en bas à droite pour le couper.`,7e3))}function tt(e,t){let n=e.geometry,r=n.attributes.position.count;if(!e.userData.shuffled){let t=Array.from({length:r},(e,t)=>t);for(let e=r-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}Object.values(n.attributes).forEach(e=>{let n=e.itemSize,r=e.array.slice();t.forEach((t,i)=>{for(let a=0;a<n;a++)e.array[i*n+a]=r[t*n+a]}),e.needsUpdate=!0}),e.userData.shuffled=!0}n.setDrawRange(0,Math.ceil(r*t))}let nt=[`clearcoat`,`iridescence`,`sheen`,`transmission`];function rt(e,t){e&&e.isMeshPhysicalMaterial&&(t?(e.userData.liteBackup||(e.userData.liteBackup={},nt.forEach(t=>e.userData.liteBackup[t]=e[t])),nt.forEach(t=>e[t]=0)):e.userData.liteBackup&&nt.forEach(t=>e[t]=e.userData.liteBackup[t]))}let it=!1;function at(e){PC.traverse(t=>{t.isPoints&&t.userData.thinnable&&tt(t,e?.45:1),t.isMesh&&(Array.isArray(t.material)?t.material:[t.material]).forEach(t=>rt(t,e))}),vw.setLite(e),it=e}let ot=0;function st(e=performance.now()){if(requestAnimationFrame(st),e-ot<1e3/($C?60:120)-1)return;ot=e,it!==$C&&at($C);let t=He.getDelta(),n=Math.min(t,.05),r=He.elapsedTime;if(N||le.coversScreen)return;document.visibilityState===`visible`&&t<.5&&et(t);let i=Wx.value;if(PC.environment=i>.5?HC:VC,PC.environmentIntensity=1,BC.toneMappingExposure=1,WC.strength=wt.lerp(.55,.22,i),WC.threshold=wt.lerp(1.05,1.6,i),aw&&aw.classList.toggle(`visible`,XC.isPlanetVisible()&&L.mode<.1&&L.camY>112),Ce.x+=(Se.x-Ce.x)*.05,Ce.y+=(Se.y-Ce.y)*.05,le.active){PC.environment=le.environment,PC.environmentIntensity=1,BC.toneMappingExposure=1.2,WC.strength=.35,WC.threshold=1.1;let e=le.cameraPose(FC.aspect,r,Ce);FC.position.copy(e.position),FC.lookAt(e.target),Je.copy(e.position),Ye.copy(e.target),le.update(n),qC.update(n,r,{progress:0,idle:0,portrait:FC.aspect<1,verticalSpeed:0,cabin:!0,teleport:B,dancing:le.musicPlaying}),B=!1,PC.updateMatrixWorld(),KC.update(r),UC.render();return}let a=wt.lerp(L.camY,L.uy,L.mode);XC.update(n,r,a,L.mode),_w.update(n,r),vw.update(n,r),bw.update(r),yw.update(n,r);let o=L.angle+Ce.x*.06,s=Ce.y*1.1;Ue.set(Math.sin(o)*L.radius,L.camY+s,Math.cos(o)*L.radius),We.set(0,L.targetY,0),Ge.set(L.ux+Ce.x*.85,L.uy+Ce.y*.55,L.uz),Ke.set(L.utx,L.uty,L.utz);let c=Ue.lerp(Ge,L.mode),l=We.lerp(Ke,L.mode);if(u.setState(ae.open,ae.glow),u.update(r),ae.dolly>0&&(oe.set(u.center.x,u.center.y+.1,u.center.z+.4),se.set(u.center.x,u.center.y,u.center.z-6),c.lerp(oe,ae.dolly),l.lerp(se,ae.dolly)),!Xe)Je.copy(c),Ye.copy(l),Xe=!0;else{let e=1-Math.exp(-n*8);Je.lerp(c,e),Ye.lerp(l,e)}FC.position.copy(Je),FC.lookAt(Ye);let d=null;if(L.mode<.25){let e=19.5;Ow.forEach((t,n)=>{let r=FC.position.distanceTo(t.position),i=r<17.5?1.04:1;t.scale.lerp(new Y(i,i,1),.12),r<e&&(e=r,d={type:`tower`,index:n})}),!z&&FC.position.distanceTo(u.center)<9&&(d={type:`door`,index:0})}else if(L.mode>.85){let e=16.5;yw.pillarsData.forEach((t,n)=>{qe.set(t.pos.x,t.pos.y+5,t.pos.z);let r=FC.position.distanceTo(qe);r<e&&g[n]&&(e=r,d={type:`underground`,index:n})})}if(d===null!=(M===null)||d&&M&&(d.type!==M.type||d.index!==M.index)){if(M=d,M&&!N&&!z){let e=M.type===`door`?ee:M.type===`underground`?g[M.index]:h[M.index];te&&(te.textContent=M.type===`door`?`ENTRER`:`OUVRIR LE DOSSIER`),_.style.setProperty(`--prompt-accent`,e.color),v.textContent=e.tag,y.textContent=e.title.toUpperCase(),_.classList.add(`visible`),_.setAttribute(`aria-hidden`,`false`)}else _.classList.remove(`visible`),_.setAttribute(`aria-hidden`,`true`)}Ve(n,r,a),PC.updateMatrixWorld(),KC.update(r),UC.render()}st(),NC(),Math.random()<.001&&(qC.setGolden(),setTimeout(()=>{qC.say(`✨ Waouh, tu as trouvé NOVA doré ! 0,1 % de chance, comme les images Thomson du bot. Fais une capture !`,9e3)},2500));let ct=!1;function lt(e){let t=new Date,n=t.getHours(),r=n*60+t.getMinutes(),i=n<5;qC.setSleepy(i),e&&i&&setTimeout(()=>qC.say(`🥱 Il est tard… Va dormir, les devoirs attendront demain !`,6e3),4e3),!ct&&r>=445&&r<=460&&(ct=!0,setTimeout(()=>qC.say(`⏰ 7 h 30 ! C’est l’heure des rappels du bot : pense à vérifier tes devoirs 📚`,7e3),e?4e3:0))}lt(!0),setInterval(()=>lt(!1),6e4);let ut=new URLSearchParams(window.location.search).get(`ascenseur`);if(ut){window.history.replaceState(null,``,window.location.pathname+window.location.hash);let e=R.scrollTrigger;e&&R.labels[`tower-door`]!==void 0&&window.scrollTo(0,e.start+R.labels[`tower-door`]/R.duration()*(e.end-e.start)),z=!0,ue(!0),B=!0,le.enter({greeting:ut===`refus`?`Connexion annulée… Tu peux réessayer quand tu veux 🙂`:void 0})}},e=>{if(e.lengthComputable&&AC){let t=Math.round(e.loaded/e.total*100);AC.style.width=`${t}%`,jC.textContent=`CHARGEMENT DE LA TOUR… ${t} %`}},e=>{console.error(`Erreur de chargement du modèle 3D :`,e),MC(`Impossible de charger la tour 3D. Vérifie ta connexion puis recharge la page.`)}),window.addEventListener(`resize`,()=>{IC(),XC.setPlanetLayout(FC.aspect<1),BC.setSize(window.innerWidth,window.innerHeight),UC.setSize(window.innerWidth,window.innerHeight),YC()});