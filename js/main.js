import { loadTetrominoShapes } from './loader.js';
import { createGameScene } from './scene.js';
import { createGameBoard } from './board.js';
import { spawnTetromino } from './manager.js';
import { clearLines } from './scoring.js';
import { showGameOver } from './gameover.js';
import { handleUserInput } from './input.js';
import { playGameOverSound } from './gameaudio.js';

const tetrominoShapes = loadTetrominoShapes(); // Load tetromino shapes from JSON files

const scene = createGameScene();
const gameBoard = createGameBoard();
const activeTetrominoGroup = spawnTetromino();

// Handle game loop, including tetromino movement, collision detection, and scoring
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
    scene.remove(activeTetrominoGroup);
    let activeTetrominoGroup = spawnTetromino();

  }

  // Update tetromino position based on user input
  handleUserInput(activeTetrominoGroup);

  // Render the scene
  renderer.render(scene, camera);
}
