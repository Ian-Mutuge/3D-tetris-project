function handleUserInput(activeTetromino) {
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowDown':
        // Drop the active tetromino
        activeTetromino.position.y -= 1;
        break;
      case 'ArrowLeft':
        // Move the active tetromino left
        activeTetromino.position.x -= 1;
        break;
      case 'ArrowRight':
        // Move the active tetromino right
        activeTetromino.position.x += 1;
        break;
      case 'ArrowUp':
        // Rotate the active tetromino
        activeTetromino.rotateY(Math.PI / 2); // Rotate counterclockwise
        break;
    }
  });
}

module.exports = {
  handleUserInput
};
