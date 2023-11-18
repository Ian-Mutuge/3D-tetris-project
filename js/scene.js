import * as THREE from 'three';

export function createGameScene() {
  const scene = new THREE.Scene();

  // Add background
  const backgroundTexture = new THREE.TextureLoader().load('assets/images/background.jpg');
  const backgroundMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), new THREE.MeshBasicMaterial({ map: backgroundTexture }));
  scene.add(backgroundMesh);

  // Add walls
  const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const leftWall = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 20, 1), wallMaterial);
  const rightWall = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 20, 1), wallMaterial);
  leftWall.position.x = -4.5;
  rightWall.position.x = 4.5;
  scene.add(leftWall);
  scene.add(rightWall);

  return scene;
}
