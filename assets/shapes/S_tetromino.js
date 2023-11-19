const STetromino = {
  vertices: [
    // Front face
    [-0.5, -0.5, 0.5], // Bottom left
    [0.5, -0.5, 0.5], // Bottom right
    [0.5, 0.5, 0.5], // Top right
    [-0.5, 0.5, 0.5], // Top left
    // Back face
    [-0.5, -0.5, -0.5], // Bottom left
    [0.5, -0.5, -0.5], // Bottom right
    [0.5, 0.5, -0.5], // Top right
    [-0.5, 0.5, -0.5], // Top left
    // Top face
    [0.5, 0.5, 0.5], // Top right
    [0.5, 0.5, -0.5], // Top left
  ],
  colors: [
    // Front face
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
    // Back face
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
    // Top face
    [0.0, 1.0, 0.0], // Green
    [0.0, 1.0, 0.0], // Green
  ],
};

module.exports = STetromino;
