const { Howl } = require('howler');

const gameOverSound = new Howl({
  src: ['assets/sounds/game-over.mp3'],
  volume: 0.5,
});

function playGameOverSound() {
  gameOverSound.play();
}

module.exports = {
  playGameOverSound
};

