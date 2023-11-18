const LTetromino = {
  vertices: [
    // Front face
    [-0.5, -0.5, 0.5], // Bottom left
    [-0.5, 0.5, 0.5], // Top left
    [0.5, 0.5, 0.5], // Top right
    [0.5, -0.5, 0.5], // Bottom right
    // Back face
    [-0.5, -0.5, -0.5], // Bottom left
    [-0.5, 0.5, -0.5], // Top left
    [0.5, 0.5, -0.5], // Top right
    [0.5, -0.5, -0.5], // Bottom right
    // Side face
    [0.5, 0.5, 0.5], // Top right
    [0.5, 0.5, -0.5], // Top right (back)
  ],
  colors: [
    // Front face
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
    // Back face
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
    // Side face
    [1.0, 0.6, 0.0], // Orange
    [1.0, 0.6, 0.0], // Orange
  ],
};

module.exports = LTetromino;
