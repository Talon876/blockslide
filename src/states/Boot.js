import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#6495ed';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Nunito']
      },
      active: this.fontsLoaded
    });

    const text = this.add.text(this.world.centerX, this.world.centerY,
      'loading assets', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
    this.load.image('background', './assets/images/title-screen.png');
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Title');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }

}
