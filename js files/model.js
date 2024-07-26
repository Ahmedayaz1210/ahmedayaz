//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
let root;
const loader = new GLTFLoader();
loader.load('./assets/Ahmed.glb', function(glb) {
    console.log(glb);
    root = glb.scene;
    scene.add(root);
}, function(xhr) {
    console.log ((xhr.loaded / xhr.total * 100) + "% loaded");
}, function(error) {
    console.log("An error occurred.");
});
const light = new THREE.DirectionalLight(0xff88dd, 1);
light.position.set(2, 2, 5);
scene.add(light);
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);

camera.position.set(30, 5,0);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
renderer.setClearColor( 0xffffff, 0);

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zooming
controls.enablePan = false;  // Optionally disable panning
controls.enableRotate = false; // Enable rotation

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    const canvas = renderer.domElement;
    resizeRendererToDisplaySize(renderer);
    if (root) {
        root.rotation.y += 0.005; // Adjust the speed of rotation here
    }
}
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}
//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // camera.position.set(0, 2,-20);
  });
animate();

