const shapeFilesDirectory = '../assets/shapes';

export function loadTetrominoShapes() {
  const tetrominoShapes = []; // Array to store shape data for all tetrominoes

  for (const fileName of fs.readdirSync(shapeFilesDirectory)) {
    const filePath = path.join(shapeFilesDirectory, fileName);
    const shapeData = parseJSONFile(filePath);
    tetrominoShapes.push({
      vertices: shapeData.vertices,
      colors: shapeData.colors,
      additionalInfo: shapeData.additionalInfo || {},
    });
  }

  return tetrominoShapes;
}


