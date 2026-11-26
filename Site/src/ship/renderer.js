import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { IS_TOUCH, readLiteMode } from './util.js';

// =========================================================================
// RENDU 3D DU VAISSEAU (cockpit, QG, laboratoire)
// Un seul moteur de rendu pour toutes les scènes du vaisseau : on change
// simplement la scène affichée. Halo des néons (bloom) en quart de
// résolution, et un effet « distorsion de l'espace » pour les sauts.
// =========================================================================

// Distorsion pendant le saut : flou radial vers le centre, aberration
// chromatique (rouge/bleu décalés) et déformation en barillet.
const WarpShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAmount: { value: 0 },
    uFlash: { value: 0 },
    uAspect: { value: 1 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uAmount;
    uniform float uFlash;
    uniform float uAspect;
    varying vec2 vUv;
    void main() {
      vec2 c = vUv - 0.5;
      c.x *= uAspect;
      float r2 = dot(c, c);
      // Barillet : le centre se bombe vers nous
      vec2 uv = 0.5 + (vUv - 0.5) * (1.0 - uAmount * 0.22 * r2 * 2.5);
      vec2 dir = (uv - 0.5);
      vec3 acc = vec3(0.0);
      float total = 0.0;
      for (int i = 0; i < 10; i++) {
        float f = float(i) / 9.0;
        float s = 1.0 - f * uAmount * 0.16;
        float w = 1.0 - f * 0.6;
        vec2 p = 0.5 + dir * s;
        float ca = uAmount * 0.012 * (0.5 + r2 * 4.0);
        acc.r += texture2D(tDiffuse, 0.5 + (p - 0.5) * (1.0 + ca)).r * w;
        acc.g += texture2D(tDiffuse, p).g * w;
        acc.b += texture2D(tDiffuse, 0.5 + (p - 0.5) * (1.0 - ca)).b * w;
        total += w;
      }
      vec3 col = acc / total;
      // Vignette qui se resserre avec la vitesse
      col *= 1.0 - smoothstep(0.25, 0.9, r2 * 2.0) * uAmount * 0.55;
      col = mix(col, vec3(0.85, 0.97, 1.0), uFlash);
      gl_FragColor = vec4(col, 1.0);
    }
  `
};

export function createShipRenderer(canvas) {
  let lite = readLiteMode();
  const maxRatio = () => Math.min(window.devicePixelRatio, lite ? 1.25 : IS_TOUCH ? 1.25 : 1.5);
  let pixelRatio = maxRatio();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    type: THREE.HalfFloatType,
    samples: lite ? 0 : 4
  });
  const composer = new EffectComposer(renderer, target);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(window.innerWidth, window.innerHeight);

  const renderPass = new RenderPass(new THREE.Scene(), new THREE.PerspectiveCamera());
  composer.addPass(renderPass);

  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.45, 0.95);
  // Halo calculé en quart de résolution : il est flou de toute façon
  bloom.setSize = (w, h) => UnrealBloomPass.prototype.setSize.call(bloom, Math.max(1, w / 2), Math.max(1, h / 2));
  bloom.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
  composer.addPass(bloom);

  const warpPass = new ShaderPass(WarpShader);
  warpPass.enabled = false;
  composer.addPass(warpPass);
  composer.addPass(new OutputPass());

  function setView(scene, camera) {
    renderPass.scene = scene;
    renderPass.camera = camera;
  }

  /** Distorsion du saut (0 = aucune) et flash blanc (0 à 1) */
  function setWarp(amount, flash = 0) {
    warpPass.uniforms.uAmount.value = amount;
    warpPass.uniforms.uFlash.value = flash;
    warpPass.enabled = amount > 0.001 || flash > 0.001;
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    warpPass.uniforms.uAspect.value = window.innerWidth / window.innerHeight;
  }
  resize();

  function setLite(on) {
    lite = on;
    pixelRatio = maxRatio();
    renderer.setPixelRatio(pixelRatio);
    composer.setPixelRatio(pixelRatio);
    const samples = on ? 0 : 4;
    [composer.renderTarget1, composer.renderTarget2].forEach((rt) => {
      if (rt.samples !== samples) {
        rt.samples = samples;
        rt.dispose();
      }
    });
    resize();
  }

  return {
    renderer,
    composer,
    bloom,
    setView,
    setWarp,
    resize,
    setLite,
    get lite() {
      return lite;
    },
    get bufferHeight() {
      return window.innerHeight * pixelRatio;
    },
    render() {
      composer.render();
    }
  };
}
