// 1.导入threejs
import * as THREE from "../node_modules/three/build/three.min.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "../node_modules/three/examples/jsm/loaders/RGBELoader";
// 导入水面
import { Water } from "../node_modules/three/examples/jsm/objects/Water2";
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
    antialias: true
});

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
const controls = new OrbitControls(camera, renderer.domElement);

// 12.创建天空动态视频纹理
const videoSky = document.createElement('video');
videoSky.src = '../src/assets/sky.mp4';
videoSky.loop = true
// 13.鼠标移动时添加天空动态视频
// window.addEventListener('click', () => {
//     // 13.1当视频处于停止状态时,播放视频
//     if(videoSky.paused){
//         console.log(videoSky);
//         videoSky.play();
//         // 13.2 创建动态天空纹理
//         const videoTure = new THREE.VideoTexture(videoSky);
//         // 13.3 添加视频纹理
//         skyMaterial.map = videoTure;
//         // 13.4更新缓存
//         skyMaterial.map.needsUpdate = true;
//     }
// });

// 14.载入环境纹理s
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync('../src/assets/050.hdr').then((hdrTexture) => {
    //14.1 环境反射贴图的映射方式，这里用的是一个叫等量矩形投影的映射方法
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    // 14.2添加环境纹理
    scene.background = hdrTexture;
    // 14.3设为场景中所有物理材质的环境贴图
    scene.environment = hdrTexture;
})

// 15.创建水平面
const waterGeometry = new THREE.CircleBufferGeometry(300, 64);
// 15.1 创建水
const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 1
});
// 15.2 导入进来的水面时竖起来的，所以要放平
water.rotation.x = -Math.PI / 2;
water.position.y = 3;
scene.add(water);

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

