const THREE = require('three');

function createGameScene() {
  const scene = new THREE.Scene();

  // Add background
  const backgroundTexture = new THREE.TextureLoader().load('assets/images/background.jpg');
  const backgroundMesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10, 10),
    new THREE.MeshBasicMaterial({ map: backgroundTexture })
  );
  scene.add(backgroundMesh);

  // Add walls
  const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  const wallGeometry = new THREE.BoxBufferGeometry(1, 20, 1);

  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.position.set(-4.5, 0, 0);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.set(4.5, 0, 0);
  scene.add(rightWall);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  return scene;
}

module.exports = { createGameScene };
