module Breakout {
    export class Boot extends Phaser.State {

        logo: Phaser.Sprite;
        counter = 0;
        step = Math.PI / 360;

        preload() {
            this.load.image("breakout_logo", "assets/breakout.png");
            this.load.image("brick", "assets/break.png");
            this.load.image("ball", "assets/ball.gif");
            this.load.image("level1_background", "assets/background1.jpg");
        }

        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {

                //  If you have any desktop specific settings, they can go in here
                // this.stage.scale. pageAlignHorizontally = true;
            }
            else {
                //  Same goes for mobile settings.
            }
            this.logo = this.add.sprite(0, 0, "breakout_logo");

            this.logo.x = this.game.width / 2;
            this.logo.anchor.x = this.logo.anchor.y = 0.5;
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        update() {
          var tStep = Math.sin(this.counter);
          this.logo.y = (this.game.height/2) + tStep * 40 ;
          this.logo.rotation = 0.8*tStep;
          //Phaser.Math.degToRad(0.2 * tStep) ;
          this.counter += this.step;
          this.game.debug.spriteInfo(this.logo, 32, 100);
        }
        fadeOut()
        {
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame()
        {
            this.game.state.start("Level1", true, false);
        }
    }
}
