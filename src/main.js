import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';
import TitleState from './states/Title';

class Game extends Phaser.Game {

  constructor () {
    let width = 1152;
    let height = 640;

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Title', TitleState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();
