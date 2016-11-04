import Phaser from 'phaser';

const playerMsPerTile = 35;

export default class extends Phaser.Sprite {

  constructor ({ game, x, y }, type) {
    super(game, x, y, 'player');
    this.game = game;
    this.width = 64;
    this.height = 64;
    this.canMove = true;

    this.animations.add('player', null, 22, true);
    this.animations.play('player');
  }

  moveTo(x, y, onComplete = () => {}) {
    if (this.canMove) {
      const dx = Math.abs(this.tileLocation().x - x);
      const dy = Math.abs(this.tileLocation().y - y);
      const move = this.game.add.tween(this).to({
        x: x * 64,
        y: y * 64
      }, (dx + dy) * playerMsPerTile);
      move.onComplete.add(() => this.canMove = true);
      move.onComplete.add(onComplete);
      move.start();
      this.canMove = false;
    }
  }

  tileLocation() {
    return {
      x: this.x/this.width,
      y: this.y/this.height,
    };
  }

  render() {
    super.render();
  }

};

