import * as THREE from 'three';

const tetrominoShapes = require('./loader.js');

const tetrominoGroups = []; // Array to store tetromino object groups

for (const tetrominoShape of tetrominoShapes) {

  const geometry = new THREE.BufferGeometry().setFromPoints(tetrominoShape.vertices);

  const material = new THREE.MeshLambertMaterial({ color: tetrominoShape.colors[0] });

  const mesh = new THREE.Mesh(geometry, material);


  const tetrominoGroup = new THREE.Group();
  tetrominoGroup.add(mesh);
  tetrominoGroups.push(tetrominoGroup);
}

let activeTetrominoGroup = tetrominoGroups[0]; // Set the first tetromino as active

export function spawnTetromino(tetrominoIndex) {
  let tetrominoGroup;

  if (tetrominoIndex === undefined) {
    // Randomly select a tetromino
    tetrominoIndex = Math.floor(Math.random() * tetrominoGroups.length);
  }

  tetrominoGroup = tetrominoGroups[tetrominoIndex].clone();
  tetrominoGroup.position.set(0, 20, 0);
  scene.add(tetrominoGroup);

  activeTetrominoGroup = tetrominoGroup;
}

export function rotateTetromino() {
  activeTetrominoGroup.rotateY(Math.PI / 2); // Rotate counterclockwise
}

export function moveTetromino(direction) {
  switch (direction) {
    case 'left':
      activeTetrominoGroup.position.x -= 1;
      break;
    case 'right':
      activeTetrominoGroup.position.x += 1;
      break;
    case 'down':
      activeTetrominoGroup.position.y -= 1;
      break;
  }
}
