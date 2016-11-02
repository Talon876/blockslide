import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    this.load.image('player', 'assets/images/mushroom.png');
    this.load.image('floor', 'assets/images/floor.png');
    this.load.image('wall', 'assets/images/wall.png');
  }

  create () {
    const level = 1;
    this.state.start('Game', true, false, level);
  }

}
