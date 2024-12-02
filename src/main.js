import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/MapControls'
import Camera from "./camera.js"

let scene
let camera
let renderer
let controls
let box
document.addEventListener("DOMContentLoaded", async (event) => {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xeeeeee)

    // Add grid for context. Rotate to lie in x-y plane
    const gridHelper = new THREE.GridHelper(20, 20)
    gridHelper.rotation.x = Math.PI / 2
    scene.add(gridHelper)

    // Box
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    box = new THREE.Mesh(geometry, material)
    scene.add(box)

    // 2D Camera
    const frustumSize = 5
    camera = new Camera(frustumSize, window.innerWidth/window.innerHeight)
    scene.add(camera.camera)

    // Light attached to camera
    const light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    camera.camera.add(light)

    // Pan/Zoom control
    controls = new MapControls(camera.camera, renderer.domElement);
    controls.enableRotate = false;   // Disable rotation for 2D visualization
    controls.screenSpacePanning = true; // Enable panning in screen space (x, y)
    controls.zoomSpeed = 1.2
    controls.panSpeed = 1;

    window.addEventListener('resize', () => {
        camera.windowResizeHelper(frustumSize, window.innerWidth/window.innerHeight)
        renderer.setSize(window.innerWidth, window.innerHeight);
    })

    animate();

})

function animate (){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera.camera);
}

