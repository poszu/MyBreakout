module Breakout {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;

        create() {
            this.background = this.add.sprite(0, 0, 'level1_background');

            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

        }
    }
}
