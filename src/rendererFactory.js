import * as THREE from 'three'

class RendererFactory {
    static create(container) {
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(renderer.domElement)
        return renderer
    }
}

export default RendererFactory 