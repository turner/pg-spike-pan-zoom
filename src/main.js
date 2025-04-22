import * as THREE from 'three'
import CameraManager from './cameraManager.js'
import CameraRig from "./cameraRig.js"
import MapControlsFactory from './mapControlsFactory.js'
import RendererFactory from './rendererFactory.js'
import './styles/app.scss'

let scene
let cameraRig
let renderer
let box

document.addEventListener("DOMContentLoaded", async (event) => {
    const container = document.getElementById('three-container')

    // Renderer
    renderer = RendererFactory.create(container)
    renderer.setAnimationLoop(animate)

    // Scene
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

    // Camera Manager
    const frustumSize = 5
    const cameraManager = new CameraManager(frustumSize, container.clientWidth/container.clientHeight)
    
    // Map Controls
    const mapControl = MapControlsFactory.create(cameraManager.camera, container)

    // Camera Rig
    cameraRig = new CameraRig(cameraManager, mapControl)
    scene.add(cameraRig.camera)

    window.addEventListener('resize', () => {
        const width = container.clientWidth
        const height = container.clientHeight
        cameraRig.handleResize(width, height)
        renderer.setSize(width, height)
    })
})

function animate (){
    cameraRig.update()
    renderer.render(scene, cameraRig.camera)
}
