import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {}

  create() {
    this.bg = this.game.add.image(0, 0, 'background');
    this.bg.width = this.game.width;
    this.bg.height = this.game.height;
    this.game.input.activePointer.leftButton.onUp.add(() => {
      this.state.start('Splash');
    });
    const text = this.add.text(this.world.centerX, this.world.height * 0.80,
      'Click anywhere to begin', { font: '24pt Nunito', fill: '#1d1d1d', align: 'center' });
    text.anchor.setTo(0.5, 0.5);
  }
}
