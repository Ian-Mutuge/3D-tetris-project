let score = 0;

export function clearLines(completedLines) {
  score += completedLines * 100;
}

export function getScore() {
  return score;
}
