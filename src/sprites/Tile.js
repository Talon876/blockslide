import Phaser from 'phaser';

const spriteFromType = (type) => {
  return {
    'wall': 'wall',
    'start': 'floor',
    'end': 'goal',
    'floor': 'floor',
  }[type];
};

export default class extends Phaser.Sprite {

  constructor ({ game, x, y }, type) {
    super(game, x, y, spriteFromType(type));
    this.game = game;
    this.width = 64;
    this.height = 64;

    if (type === 'wall') {
      const shimmer = this.animations.add('wall', null, 28);
      const timer = this.game.time.create(false);

      shimmer.onComplete.add(() => {
        shimmer.frame = 0;
        timer.add(this.game.rnd.between(15000, 60000), () => shimmer.play(), this);
      });
      timer.add(this.game.rnd.between(10000, 120000), () => shimmer.play(), this);
      timer.start();
    } else if (type === 'end') {
      this.animations.add('goal', null, 14, true);
      this.animations.play('goal');
    }
  }

  render() {
  }
};
