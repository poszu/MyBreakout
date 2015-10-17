module Breakout {
  export class Game extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO, 'content', null);
      this.state.add('Boot', Boot, false);
      this.state.add('Level1', Level1, false);
      this.state.start('Boot');
    }
  }
}
