import Phaser from 'phaser';

const spriteFromType = (type) => {
  return {
    'wall': 'wall',
    'start': 'floor',
    'end': 'floor',
    'floor': 'floor',
  }[type];
};

export default class extends Phaser.Sprite {

  constructor ({ game, x, y }, type) {
    super(game, x, y, spriteFromType(type));
    this.game = game;
    this.width = 64;
    this.height = 64;

    //TODO replace with sprites
    if (type === 'start') {
      this.tint = '0x00cc00';
    } else if (type === 'end') {
      this.tint = '0xcc0000';
    };
  }

  render() {
  }
};
