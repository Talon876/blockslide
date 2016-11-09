/* globals __DEV__ */
import Phaser from 'phaser';
import Tile from '../sprites/Tile';
import Player from '../sprites/Player';
import {setResponsiveWidth} from '../utils';
import {getLevel} from '../data/Level';
import {calculateNewLocation} from '../data/MovementCalculator';

const directions = {
  'up': { x: 0, y: -1, },
  'down': { x: 0, y: 1, },
  'left': { x: -1, y: 0, },
  'right': { x: 1, y: 0, },
};

export default class extends Phaser.State {
  init (levelId) {
    //called first, route to other state or prepare variables
    console.log(`Loading level ${levelId}`);
    this.levelId = levelId;
    this.level = getLevel(this.cache.getText(`level${this.levelId}`));
    console.log(`Level ${this.levelId} loaded. ${this.level.width} x ${this.level.height}`);
    console.log(this.level);
  }

  preload () {
    //called after init, load assets or ones needed for this state,
    //don't create objects that require assets being loaded
  }

  create () {
    //called after loading of assets in preload is complete
    this.level.data.forEach((tile) => {
      const tileSprite = new Tile({
        game: this.game,
        x: tile.x * 64,
        y: tile.y * 64,
      }, tile.type);
      this.game.add.existing(tileSprite);
    });

    this.player = new Player({
      game: this.game,
      x: this.level.start.x * 64,
      y: this.level.start.y * 64,
    });
    this.game.add.existing(this.player);

    this.destinations = Object.keys(directions).map((dir) => this.getNextLocation(dir));
    this.circleG = this.game.add.graphics();
  }

  getNextLocation(direction) {
    return calculateNewLocation(this.level, {
      x: this.player.tileLocation().x,
      y: this.player.tileLocation().y
    }, directions[direction]);
  }

  movePlayer(direction) {
    if (this.player.canMove) {
      let nextLocation = this.getNextLocation(direction);
      this.player.moveTo(nextLocation.x, nextLocation.y, () => {
        this.destinations = Object.keys(directions).map((dir) => this.getNextLocation(dir));
      });
    }
  }

  update () {
    if (this.player.tileLocation().x === this.level.end.x && this.player.tileLocation().y === this.level.end.y) {
      this.state.start('Game', true, false, this.levelId + 1);
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      this.movePlayer('down');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      this.movePlayer('up');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.movePlayer('left');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      this.movePlayer('right');
    }
  }

  render () {
    if (__DEV__) {
      this.circleG.clear();
      this.destinations.forEach((destination) => {
        this.circleG.beginFill(0xff0000);
        this.circleG.drawCircle(destination.x * 64 + 32, destination.y * 64 + 32, 8);
      });
      this.circleG.endFill();
    }
  }
}
