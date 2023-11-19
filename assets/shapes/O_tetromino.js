const OTetromino = {
  vertices: [
    // Front face
    [0.5, 0.5, 0.5], // Top left
    [0.5, -0.5, 0.5], // Bottom left
    [-0.5, -0.5, 0.5], // Bottom right
    [-0.5, 0.5, 0.5], // Top right,
    // Back face
    [0.5, 0.5, -0.5], // Top left
    [0.5, -0.5, -0.5], // Bottom left
    [-0.5, -0.5, -0.5], // Bottom right
    [-0.5, 0.5, -0.5], // Top right
  ],
  colors: [
    // Front face
    [1.0, 0.5, 0.0], // Yellow
    [1.0, 0.5, 0.0], // Yellow
    [1.0, 0.5, 0.0], // Yellow
    [1.0, 0.5, 0.0], // Yellow
    // Back face
    [1.0, 0.5, 0.0], // Yellow
    [1.0, 0.5, 0.0], // Yellow
    [1.0, 0.5, 0.0], // Yellow
    [1.0, 0.5, 0.0], // Yellow
  ],
};

module.exports = OTetromino;
