// 1.导入threejs
import * as THREE from 'three';

// 2.初始化场景
const scene = new THREE.Scene();

// 3.创建透视相机
const camera = new THREE.Camera(90, window.innerHeight / window.innerWidth, 0.01, 3000);

// 4.设置相机放置位置
camera.position.set(-100, 100, 150);

// 5.将相机添加进场景
scene.add(camera);

// 6.初始化渲染器
const renderer = new THREE.WebGL1Renderer({
    // 6.1设置抗锯齿
    antialias: true,

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

// 7.将渲染器添加进页面
document.body.appendChild(renderer.domElement);

// 8.画面渲染
 function render() {
    // 8.1渲染场景
    renderer.render(scene, camera);
    // 8.2引擎自动更新渲染器
    requestAnimationFrame(renderer);
 }
 render();