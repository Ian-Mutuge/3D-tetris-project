const THREE = require('three');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const tetrominoGroups = [];

function parseJSONFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);
    return parsedData || {}; // Return parsedData if truthy, otherwise return an empty object
  } catch (error) {
    console.error(`Error parsing JSON file at ${filePath}:`, error);
    return {}; // Return an empty object on error
  }
}

async function loadTetrominoShapes() {
  const tetrominoShapes = [];
  const shapeFilesDirectory = '../assets/shapes'; // Replace with your actual path

  try {
    const fileNames = await readdir(shapeFilesDirectory);

    for (const fileName of fileNames) {
      const filePath = path.join(shapeFilesDirectory, fileName);
      const shapeData = parseJSONFile(filePath);
      tetrominoShapes.push({
        vertices: shapeData.vertices,
        colors: shapeData.colors,
        additionalInfo: shapeData.additionalInfo || {},
      });
    }
  } catch (error) {
    console.error('Error reading shape files:', error);
  }

  return tetrominoShapes;
}

const tetrominoShapes = loadTetrominoShapes();

for (const tetrominoShape of Object.values(tetrominoShapes)) {
  if (tetrominoShape && tetrominoShape.vertices && Array.isArray(tetrominoShape.vertices)) {
    const geometry = new THREE.BufferGeometry().setFromPoints(tetrominoShape.vertices);
    const material = new THREE.MeshLambertMaterial({ color: tetrominoShape.colors[0] });
    const mesh = new THREE.Mesh(geometry, material);

    const tetrominoGroup = new THREE.Group();
    tetrominoGroup.add(mesh);
    tetrominoGroups.push(tetrominoGroup);
  } else {
    console.error('Invalid tetrominoShape:', tetrominoShape);
  }
}

let activeTetrominoGroup = tetrominoGroups[0];

function spawnTetromino(scene, tetrominoIndex) {
  let tetrominoGroup;

  if (tetrominoIndex === undefined) {
    tetrominoIndex = Math.floor(Math.random() * tetrominoGroups.length);
  }

  tetrominoGroup = tetrominoGroups[tetrominoIndex];
  tetrominoGroup.position.set(0, 20, 0);
  scene.add(tetrominoGroup);

  activeTetrominoGroup = tetrominoGroup;
}

function rotateTetromino() {
  activeTetrominoGroup.rotateY(Math.PI / 2);
}

function moveTetromino(direction) {
  switch (direction) {
    case 'left':
      activeTetrominoGroup.position.x -= 1;
      break;
    case 'right':
      activeTetrominoGroup.position.x += 1;
      break;
    case 'down':
      activeTetrominoGroup.position.y += 0.2; // Fixed this line
      break;
  }
}

module.exports = {
  loadTetrominoShapes,
  spawnTetromino,
  rotateTetromino,
  moveTetromino,
};

