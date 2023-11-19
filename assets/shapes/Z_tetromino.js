const ZTetromino = {
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
    // Top face
    [-0.5, 0.5, 0.5], // Top left
    [-0.5, 0.5, -0.5], // Top right
  ],
  colors: [
    // Front face
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
    // Back face
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
    // Top face
    [1.0, 0.0, 1.0], // Purple
    [1.0, 0.0, 1.0], // Purple
  ],
};

module.exports = ZTetromino;
