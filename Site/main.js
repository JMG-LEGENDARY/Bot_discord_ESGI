import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Scène, Caméra et Renderer
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070d, 0.015); // Brouillard futuriste

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 25);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// 2. Éclairage cyberpunk / futuriste
const ambientLight = new THREE.AmbientLight(0x4060ff, 1.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x00f0ff, 3);
dirLight.position.set(15, 30, 20);
scene.add(dirLight);

const rimLight = new THREE.DirectionalLight(0xff0055, 2); // Contre-jour néon magenta
rimLight.position.set(-15, 10, -20);
scene.add(rimLight);

// 3. Chargement du modèle GLB
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let building;

gltfLoader.load(
    '/skyscraper.glb',
    (gltf) => {
        building = gltf.scene;

        // Normalisation automatique : centre le modèle et ajuste sa hauteur à 30 unités
        const box = new THREE.Box3().setFromObject(building);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const scaleFactor = 30 / size.y;
        building.scale.setScalar(scaleFactor);
        building.position.sub(center.multiplyScalar(scaleFactor));
        building.position.y += 15; // Pose la base du gratte-ciel à y = 0

        scene.add(building);
        setupScrollAnimation();
    },
    undefined,
    (error) => console.error('Erreur de chargement GLB :', error)
);

// 4. Animation au Scroll avec GSAP
function setupScrollAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.scroll-container',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5, // Lissage fluide du scroll (1.5s d'inertie)
        },
    });

    // Fait monter la caméra le long de la tour tout en la faisant tourner
    tl.to(camera.position, {
        y: 28,
        z: 14,
        ease: 'none',
    }, 0)
    .to(building.rotation, {
        y: Math.PI * 1.5, // Rotation de 270° du gratte-ciel
        ease: 'none',
    }, 0);
}

// 5. Boucle de rendu et redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
