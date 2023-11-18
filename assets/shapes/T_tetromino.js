const TTetromino = {
  vertices: [
    // Front face
    [-0.5, 0.5, 0.5], // Top left
    [-0.5, -0.5, 0.5], // Bottom left
    [0.5, -0.5, 0.5], // Bottom right
    [0.5, 0.5, 0.5], // Top right
    // Back face
    [-0.5, 0.5, -0.5], // Top left
    [-0.5, -0.5, -0.5], // Bottom left
    [0.5, -0.5, -0.5], // Bottom right
    [0.5, 0.5, -0.5], // Top right
    // Top face
    [-0.5, 0.5, -0.5], // Top left
    [0.5, 0.5, -0.5], // Top right,
  ],
  colors: [
    // Front face
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
    // Back face
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
    // Top face
    [0.7, 0.4, 0.0], // Purple
    [0.7, 0.4, 0.0], // Purple
  ],
};

module.exports = TTetromino;
