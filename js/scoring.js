let score = 0;

function clearLines(completedLines) {
  score += completedLines * 100;
}

function getScore() {
  return score;
}

module.exports = {
  clearLines,
  getScore
};
