const THREE = require('three');
const { loadTetrominoShapes } = require('./manager.js');
const { createGameScene } = require('./scene.js');
const { createGameBoard } = require('./board.js');
const { spawnTetromino } = require('./manager.js');
const { clearLines } = require('./scoring.js');
const { showGameOver } = require('./gameover.js');
const { handleUserInput } =require ('./input.js');
const { playGameOverSound } = require('./gameaudio.js');

// Initialize three.js renderer, scene, and camera
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, BOARD_HEIGHT / 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Set up lighting
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Load tetromino shapes from JSON files
const tetrominoShapes = loadTetrominoShapes();

// Initialize game components
const gameBoard = createGameBoard();
let activeTetrominoGroup = spawnTetromino();

// Handle game loop, including tetromino movement, collision detection, scoring, and rendering
let completedLines = 0;

while (true) {
  // Check for collisions
  if (checkCollisions(activeTetrominoGroup)) {
    // Tetromino landed, check for completed lines
    completedLines = checkCompletedLines(activeTetrominoGroup, gameBoard);
    clearLines(completedLines);

    // Update score and display game over if necessary
    const newScore = getScore();
    console.log(`Score: ${newScore}`);
    if (activeTetrominoGroup.position.y <= 0) {
      showGameOver();
      playGameOverSound(); // Play game over sound effect
      break; // Game over
    }

    // Remove landed tetromino and spawn a new one
    scene.remove(activeTetrominoGroup.mesh);
    activeTetrominoGroup.mesh = null;
    activeTetrominoGroup = spawnTetromino();
  }

  // Update tetromino position based on user input
  handleUserInput(activeTetrominoGroup);

  // Render the game components
  renderGameComponents();
}

function renderGameComponents() {
  // Render the game board
  const gameBoardGeometry = new THREE.PlaneGeometry(BOARD_WIDTH * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);
  const gameBoardMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });

  const gameBoardMesh = new THREE.Mesh(gameBoardGeometry, gameBoardMaterial);
  gameBoardMesh.position.x = -BOARD_WIDTH / 2 * BLOCK_SIZE;
  gameBoardMesh.position.y = BOARD_HEIGHT / 2 * BLOCK_SIZE;
  gameBoardMesh.position.z = 0;

  scene.add(gameBoardMesh);

  // Render the active tetromino
  scene.add(activeTetrominoGroup.mesh);

  // Render the score display
  // (TODO: Implement score display rendering)

  // Render the scene to the canvas
  renderer.render(scene, camera);
}
