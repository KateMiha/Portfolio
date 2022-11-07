import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    AmbientLight,
    DirectionalLight,
    HemisphereLight,
} from 'three';

let sections = document.getElementById('main').getElementsByTagName('section');

export default class CanvasModel {
    init() {
        scene();
    }
}

function scene() {

    window.onload = () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let canvas = document.getElementById('canvas');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        let renderer = new THREE.WebGLRenderer({canvas: canvas});
        renderer.setClearColor(0x00000);

        let scene = new THREE.Scene();
        // камера
        let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
        camera.position.z = 500;

        let size = (width >= 1280) ? 400 : (width >= 1024) ? 380 : (width >= 800) ? 350 : 300;
        // свет
        const {ambientLight, mainLight} = createLights();
        scene.add(ambientLight, mainLight);

        const {material0, material1, material2, material3, material4} = materials();

        let loader = new GLTFLoader();
        let brain = new THREE.Object3D();
        // загрузка 3d модели
        loader.load(
            "../src/models/Brain.glb",
            function (gltf) {
                brain = gltf.scene;

                brain.children[0].material = material0;

                brain.children[1].material = material4;

                brain.children[2].material = material2;

                brain.children[3].material = material4;

                brain.position.y = -50;
                brain.scale.set(size, size, size);

                scene.add(brain)

            }, undefined, function (error) {

                console.error(error);

            }
        );
        // Движение модели при перемещении мыши
        let mouseTolerance = 0.01;

        document.onmousemove = function (e) {
            let centerX = window.innerWidth / 2;
            let centerY = window.innerHeight / 2;

            camera.position.x = (e.clientX - centerX) * mouseTolerance;
            camera.position.y = (e.clientY - centerY) * mouseTolerance;
        };
        // движение можели на старете
        let brainRotation = () => {
            brain.rotation.y += 0.005;
        }
        // фушкиция зацикливания
        function loop() {

            let sectionLeft = sections[0].getElementsByTagName('div')[0];
            let sectionRight = sections[1].getElementsByTagName('div')[0];

            if (sectionLeft) {

                // смена текстуры
                brain.children[1].material = material4;
                brain.children[3].material = material1;
                // смена цвета фона
                // renderer.setClearColor(0x85CDC9);
                // передвижение модели
                for (let i = brain.position.x; i < ((width / 2) - size) / 1.8; i++) {
                    brain.position.x += 0.05;
                }
                // поворот модели
                if(brain.rotation.y < 1){
                    for (let i = brain.rotation.y; i < 1; i++) {
                        brain.rotation.y = Number(brain.rotation.y.toFixed(2));
                        brain.rotation.y += 0.01 ;
                    }
                }else{
                    for (let i = brain.rotation.y; i > 1; i--) {
                        brain.rotation.y = Number(brain.rotation.y.toFixed(2));
                        brain.rotation.y -= 0.01 ;
                    }
                }

            } else if (sectionRight) {
                // смена текстуры
                brain.children[1].material = material3;
                brain.children[3].material = material4;
                // смена фона
                // renderer.setClearColor(0xE17B5E);
                // передвижение модели
                for (let i = brain.position.x; i > -((width / 2) - size) / 1.8; i--) {
                    brain.position.x -= 0.05;
                }
                // поворот модели
                if(brain.rotation.y > -1){
                    for (let i = brain.rotation.y; i > -1; i--) {
                        brain.rotation.y = Number(brain.rotation.y.toFixed(2));
                        brain.rotation.y -= 0.01;
                    }
                }else{
                    for (let i = brain.rotation.y; i < -1; i++) {
                        brain.rotation.y = Number(brain.rotation.y.toFixed(2));
                        brain.rotation.y += 0.01;
                    }
                }

            } else if (!sectionLeft && !sectionRight) {
                // смена цвета фона
                // renderer.setClearColor(0x000000);

                if (brain.position.x > 0) {
                    // переопределение функции стартового поворота
                    brainRotation = () => {
                        brain.rotation.y += 0.005;
                    }
                    // смена текстуры
                    brain.children[1].material = material4;
                    brain.children[3].material = material4;

                    // передвижение модели
                    for (let i = brain.position.x; i > 0; i--) {
                        brain.position.x -= 0.1;
                        brain.position.x = Number(brain.position.x.toFixed(1));
                    }
                    // поворот модели
                    for (let i = brain.rotation.y; i < 0; i++) {
                        brain.rotation.y += 0.02;
                    }

                } else if (brain.position.x < 0) {
                    // переопределение функции стартового поворота
                    brainRotation = () => {
                        brain.rotation.y -= 0.005;
                    }
                    // смена текстуры
                    brain.children[1].material = material4;
                    brain.children[3].material = material4;

                    // передвижение модели
                    for (let i = brain.position.x; i < 0; i++) {
                        brain.position.x += 0.1;
                        brain.position.x = Number(brain.position.x.toFixed(1));
                    }
                    // поворот модели
                    for (let i = brain.rotation.y; i > 0; i--) {
                        brain.rotation.y -= 0.02;
                    }
                }

                // смена материала
                for (let a = 0; a < brain.children.length; a++){
                    if(a === 3 || a === 1){
                        brain.children[a].material = material4;
                    }
                }
                // вызов стартовой функции поворота
                brainRotation();
            }

            renderer.render(scene, camera);

            requestAnimationFrame(function () {
                loop();
            });
        }

        loop();
    }

}

function createLights() {
    const ambientLight = new AmbientLight('white', 0.5);

    const mainLight = new DirectionalLight('white', 0.8);
    mainLight.position.set(500, 500, 500);

    return {ambientLight, mainLight};
}

function materials() {
    const pink = new THREE.Color(0xF18E91);
    const lightpink = new THREE.Color(0xF2D9C5);
    const mej = new THREE.Color(0xFCBC8D);

    let material0 = new THREE.MeshPhongMaterial();
    material0.color.set(pink);

    let material1 = new THREE.MeshPhongMaterial();
    const texture1 = new THREE.TextureLoader().load('../src/models/textures/colors.jpeg');
    material1.map = texture1;

    let material2 = new THREE.MeshPhongMaterial();
    material2.color.set(mej);

    let material3 = new THREE.MeshPhongMaterial();
    const texture3 = new THREE.TextureLoader().load('../src/models/textures/kod.png');
    material3.map = texture3;

    let material4 = new THREE.MeshPhongMaterial();
    material4.color.set(lightpink);

    return {material0, material1, material2, material3, material4};
}

