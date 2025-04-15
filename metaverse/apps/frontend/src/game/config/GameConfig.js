import Phaser from 'phaser';

export const gameConfig = {
  type: Phaser.AUTO,
  width: 800,   // Adjust based on your needs
  height: 600,  // Adjust based on your needs
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,        // Important for crisp pixel art
  backgroundColor: '#000000'
};