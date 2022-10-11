import * as THREE from './three.js-dev/three.js-dev/build/three.module.js'
import {GLTFLoader} from './three.js-dev/three.js-dev/examples/jsm/loaders/GLTFLoader.js'
//creating a scene and canvas,loader

const canvas=document.querySelector('.webgl')
const scene= new THREE.Scene()


const loader=new GLTFLoader()
loader.load('assets/6C 1500 Gioiello.glb',function(glb){
    console.log(glb)
    const root=glb.scene;
    root.scale.set(0.8,0.8,0.8)
    scene.add(root);
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"%loaded")
},function(error){
    console.log('an error occurred')
})

//adding the light to the scene
const light=new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
scene.add(light)

//size of the canvas

const sizes={
    width:window.innerWidth,
    height:window.innerHeight,
}

//camera for the scene
const camera=new THREE.PerspectiveCamera(80,sizes.width/sizes.height,0.1,100)

//setting the position of the camera
camera.position.set(0,1,2)
scene.add(camera)

//renderer
const renderer=new THREE.WebGL1Renderer({
    canvas:canvas
})

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled=true
renderer.gammaOuput=true

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate()