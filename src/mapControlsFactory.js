import { MapControls } from 'three/examples/jsm/controls/MapControls'

class MapControlsFactory {
    static create(camera, container) {
        const controls = new MapControls(camera, container)
        
        // Configure controls
        controls.zoomToCursor = true
        controls.enableRotate = false
        controls.screenSpacePanning = true
        controls.zoomSpeed = 1.2
        controls.panSpeed = 1

        return controls
    }
}

export default MapControlsFactory 