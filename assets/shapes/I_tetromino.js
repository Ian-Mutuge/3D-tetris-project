const ITetromino = {
  vertices: [
    // Front face
    [0.5, 0.5, 0.5], // Top left
    [0.5, -0.5, 0.5], // Bottom left
    [-0.5, -0.5, 0.5], // Bottom right
    [-0.5, 0.5, 0.5], // Top right
    // Back face
    [0.5, 0.5, -0.5], // Top left
    [0.5, -0.5, -0.5], // Bottom left
    [-0.5, -0.5, -0.5], // Bottom right
    [-0.5, 0.5, -0.5], // Top right
  ],
  colors: [
    // Front face
    [1.0, 0.0, 0.0], // Red
    [1.0, 0.0, 0.0], // Red
    [1.0, 0.0, 0.0], // Red
    [1.0, 0.0, 0.0], // Red
    // Back face
    [1.0, 0.0, 0.0], // Red
    [1.0, 0.0, 0.0], // Red
    [1.0, 0.0, 0.0], // Red
    [1.0, 0.0, 0.0], // Red
  ],
};

module.exports = ITetromino;
