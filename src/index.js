// 1.导入threejs
//import * as THREE from 'three';
//import * as THREE from "https://cdn.skypack.dev/three@0.126.0";
import * as THREE from "../node_modules/three/build/three.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// const skyJPG = require('../src/assets/sky.jpg');
// console.log(skyJPG);
// 2.初始化场景
const scene = new THREE.Scene();

// 3.创建透视相机
// 3.1 初始化透视相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

// 4.相机设置
// 4.1设置相机放置位置
camera.position.set(-50, 50, 130);
// 4.2设置相机头宽比
camera.aspect = window.innerWidth / window.innerHeight;
// 4.3更新投影矩阵
camera.updateProjectionMatrix();

// 5.将相机添加进场景
scene.add(camera);

// 6.初始化渲染器
const renderer = new THREE.WebGLRenderer({
    // 6.1设置抗锯齿
    antialias: true,
    // alpha: true
});
// renderer.outputEncoding = THREE.sRGBEncoding;
// 6.2设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 6.3设置屏幕大小变化时要重新渲染以更新画面
document.addEventListener('resize', () => {
    // 6.3.1修改摄像机的比例
    camera.aspect = window.innerWidth / window.innerHeight;
    // 6.3.2更新摄像机投影矩阵
    camera.updateProjectionMatrix();
    // 6.3.3更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    
});
// 9.创建天空球体
// 9.1加载天空纹理
let texture = new THREE.TextureLoader().load('../src/assets/sky.jpg');
// 9.2创建天空球体
const skyGeometry = new THREE.SphereGeometry(1000, 60, 60);
// 9.3为天空球体加上纹理
const skyMaterial = new THREE.MeshBasicMaterial({ map: texture});
// 9.6内外反转
skyGeometry.scale(1, 1, -1);
// 9.4 创建物体
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
// 9.5往场景添加天空
scene.add(sky);


// 10. 添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-100, 100, 10);
scene.add(light);

// 11.创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 7.将渲染器添加进页面
document.body.appendChild(renderer.domElement);

// 8.画面渲染
 function render() {
    // 8.1渲染场景
    renderer.render(scene, camera);
    // 8.2引擎自动更新渲染器
    requestAnimationFrame(render);
 }
 render();

