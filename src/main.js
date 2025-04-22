import './styles/app.scss'
import SceneManager from './sceneManager.js'
import * as THREE from 'three'

let sceneManager

document.addEventListener("DOMContentLoaded", async (event) => {
    
    sceneManager = new SceneManager(document.getElementById('three-container'))
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20)
    gridHelper.rotation.x = Math.PI / 2
    sceneManager.addToScene(gridHelper)
    
    // Add test box
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    const box = new THREE.Mesh(geometry, material)
    sceneManager.addToScene(box)
    
    sceneManager.startAnimation()
})
