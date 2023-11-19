import { Howl } from 'howler';

const gameOverSound = new Howl({
  src: ['assets/sounds/game-over.mp3'],
  volume: 0.5,
});

export function playGameOverSound() {
  gameOverSound.play();
}
