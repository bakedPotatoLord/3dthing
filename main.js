import './style.css'

import * as THREE from 'three';
import { CubeTexture } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const c = document.getElementById('bg')
const px =document.getElementById('px')

var keyArr=Array(200)

//add functions
export function rand(n1,n2){
  if(n1>n2){
    return n2 + (Math.random()* (n1-n2) )
  }else{
    return n1 + (Math.random()* (n2-n1) )
  }
}

// init scene
const scene = new THREE.Scene(c);
scene.background = new THREE.Color('black')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(5,5,0)
camera.lookAt(0,0,0)

//add controls
const controls = new OrbitControls(camera, c);


//load textures
const doughTexture = new THREE.TextureLoader().load( 'textures/dough.jpeg' );
const napkinTexture = new THREE.TextureLoader().load( 'textures/napkin.png',);

//create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//add light
const ambientlight = new THREE.AmbientLight( 0x404040,0.5 ); // soft white light
scene.add( ambientlight );

const light = new THREE.PointLight( 'white', 1, 100 );
light.position.set( 0, 10, 0 );
scene.add( light );

//add the doughnut
var geometry = new THREE.TorusGeometry(2.5,1,50,50);
var material = new THREE.MeshStandardMaterial( { map:doughTexture} );
const doughnut = new THREE.Mesh( geometry, material );
doughnut.rotateX(Math.PI/2)
doughnut.translateZ(-1)
scene.add( doughnut );

//add the napkin
var geometry = new THREE.PlaneGeometry(10,10);
var material = new THREE.MeshStandardMaterial( { map:napkinTexture ,transparent: true} );
const napkin = new THREE.Mesh( geometry, material );
napkin.rotateX(-Math.PI/2)
napkin.x = 0
scene.add( napkin );

//create star array
var stars = []
for(var i = 0;i<500;i++){
  var geometry = new THREE.SphereGeometry(0.25,20,20);
  var material = new THREE.MeshStandardMaterial( { emissive:'white'} );
  var star = new THREE.Mesh( geometry, material );
  star.position.set(rand(-50,50),rand(-50,50),rand(-50,50))
  stars.push(star)
  scene.add( stars[i] );
}



console.log(stars[0])

function animate() {
  requestAnimationFrame( animate );


	doughnut.rotateZ( -0.01)
	napkin.rotateZ(0.01)

  for(i in stars){
    stars[i].translateY(rand(-0.05,-0.15))
    if(stars[i].position.y <= -50){
      stars[i].position.y = 50
    }
  }


  renderer.render( scene, camera );
  
  px.innerHTML = JSON.stringify({'x':Math.round(camera.position.x),'y':Math.round(camera.position.y),'z':Math.round(camera.position.z)})
  //console.log(keyArr)
};

animate()

document.onkeydown = function(e){
  keyArr[e.keyCode] = true
  console.log(e.key)
}

document.onkeyup = function(e){
  keyArr[e.keyCode] =false
}

