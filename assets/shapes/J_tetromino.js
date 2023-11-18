const JTetromino = {
  vertices: [
    // Front face
    [0.5, -0.5, 0.5], // Bottom right
    [0.5, 0.5, 0.5], // Top right
    [-0.5, 0.5, 0.5], // Top left
    [-0.5, -0.5, 0.5], // Bottom left
    // Back face
    [0.5, -0.5, -0.5], // Bottom right
    [0.5, 0.5, -0.5], // Top right
    [-0.5, 0.5, -0.5], // Top left
    [-0.5, -0.5, -0.5], // Bottom left
    // Side face
    [0.5, 0.5, 0.5], // Top right
    [0.5, 0.5, -0.5], // Top right (back)
  ],
  colors: [
    // Front face
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
    // Back face
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
    // Side face
    [0.0, 0.0, 1.0], // Blue
    [0.0, 0.0, 1.0], // Blue
  ],
};

module.exports = JTetromino;
