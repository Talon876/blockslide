import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    this.load.spritesheet('player', 'assets/images/player.png', 64, 64, 11);
    this.load.spritesheet('wall', 'assets/images/wall.png', 64, 64, 8);
    this.load.spritesheet('goal', 'assets/images/goal.png', 64, 64, 8);
    this.load.image('floor', 'assets/images/floor.png');
    for (let i = 1; i <= 100; i++) {
      this.load.text(`level${i}`, `./assets/levels/level${i}.blks`);
    }
  }

  create () {
    const level = 1;
    this.state.start('Game', true, false, level);
  }

}
