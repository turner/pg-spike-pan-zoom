import * as THREE from 'three'
import CameraManager from './cameraManager.js'
import CameraRig from "./cameraRig.js"
import MapControlsFactory from './mapControlsFactory.js'
import RendererFactory from './rendererFactory.js'

class SceneManager {
    constructor(container) {
        this.container = container
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xeeeeee)
        
        // Initialize renderer
        this.renderer = RendererFactory.create(container)
        
        // Initialize camera system
        const frustumSize = 5
        const cameraManager = new CameraManager(frustumSize, container.clientWidth/container.clientHeight)
        const mapControl = MapControlsFactory.create(cameraManager.camera, container)
        this.cameraRig = new CameraRig(cameraManager, mapControl)
        this.scene.add(this.cameraRig.camera)
        
        // Setup resize handler
        window.addEventListener('resize', () => this.handleResize())
    }
    
    addToScene(object) {
        this.scene.add(object)
    }
    
    handleResize() {
        const width = this.container.clientWidth
        const height = this.container.clientHeight
        this.cameraRig.handleResize(width, height)
        this.renderer.setSize(width, height)
    }
    
    animate() {
        this.cameraRig.update()
        this.renderer.render(this.scene, this.cameraRig.camera)
    }
    
    startAnimation() {
        this.renderer.setAnimationLoop(() => this.animate())
    }
}

export default SceneManager 