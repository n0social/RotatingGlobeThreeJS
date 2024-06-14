//npm install parcel --save-dev
//npm install three
//parcel ./src/index.html
//npm install dat.gui


//imports
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import * as dat from 'dat.gui'; //package used to change the color of elements on the fly
import background from './mat1.png';
import background2 from './mat2.png';
import background3 from './backgroundStars.jpg';
import background4 from './mat3.png';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
)

const orbit = new OrbitControls(camera,renderer.domElement);
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(0,2,10);
orbit.update();


// const sphereGeometry = new THREE.SphereGeometry(4,50,50);
// const sphereMaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF});
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(sphere);

//Add a plane
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF, side:THREE.DoubleSide}); //Change the color and add a double side to the plane
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30); //30 is used to increase grid size
scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;


const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(background3);


const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    
    map:textureLoader.load(background2),
    
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 5, 0);
scene.add(sphere);

function animate(time) {
        sphere.rotation.x = time / 10000;
        sphere.rotation.y = time / 1000;

    //Make the sphere bounce
    // step += options.speed;
    // sphere.position.y = 10 *Math.abs(Math.sin(step));

    // spotLight.angle = options.angle;
    // spotLight.pneumbra = options.pneumbra;
    // spotLight.intensity = options.intensity;
    // sLightHelper.update();

    // rayCaster.setFromCamera(mousePosition,camera);
    // const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects);

    // for(let i = 0; i < intersects.length; i++) {
    //     if(intersects[i].object.id === sphereId)
    //         intersects[i].object.material.color.set(0xFF0000);
    // }

    //Render camera and scene within function to continuously render animation
    renderer.render(scene,camera);

}

renderer.setAnimationLoop(animate);