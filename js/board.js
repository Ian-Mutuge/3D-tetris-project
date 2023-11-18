import * as THREE from 'three';

export function createGameBoard() {
  const gameBoard = new THREE.Object3D();

  // Create game board blocks
  const blockMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
      const block = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), blockMaterial);
      block.position.set(x - 4.5, y - 19.5, 0);
      gameBoard.add(block);
    }
  }

  return gameBoard;
}
