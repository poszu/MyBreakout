module Breakout {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        bricks : Phaser.Group;
        brick_count = 0;
        the_thing : Phaser.Sprite;
        ball : Phaser.Sprite;
        ball_on_plate : Boolean;
        music: Phaser.Sound;

        create() {

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            // Do not check collison on bottom line
            this.game.physics.arcade.checkCollision.down = false;

            this.background = this.add.sprite(0, 0, "level1_background");

            this.bricks = this.add.group();
            this.bricks.enableBody = true;
            this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

            // Create bricks
            var brick;
            for (var y = 0; y < 4; y++)
            {
                for (var x = 0; x < 12; x++)
                {
                    brick = this.bricks.create(120 + (x*45), 100 + (y*52), "brick", "assets/break.png");
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                    this.brick_count ++;
                }
            }

            // this.music = this.add.audio("music", 1, false);
            // this.music.play();

            // Create the thing
            this.the_thing = this.add.sprite(this.game.world.width/2, this.game.world.height - 50, "brick");
            this.game.physics.enable(this.the_thing, Phaser.Physics.ARCADE);
            this.the_thing.body.collideWorldBounds = true;
            this.the_thing.body.bounce.set(1);
            this.the_thing.body.immovable = true;
            this.the_thing.scale.x = 2;

            // Create the ball
            this.ball = this.add.sprite(this.the_thing.position.x, this.the_thing.position.y - this.the_thing.height/2, "ball");
            this.ball.anchor.set(0.5);
            this.ball.checkWorldBounds = true;
            this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.set(1);
            this.ball_on_plate = true;

            this.ball.events.onOutOfBounds.add(this.ballLost, this);
            this.game.input.onDown.add(this.releaseBall, this);
        }
        update()
        {
            this.the_thing.x = this.game.input.x;
            if (this.ball_on_plate)
            {
                this.ball.body.x = this.the_thing.x + this.the_thing.width/2 - this.ball.width/2;
            }
            else
            {
                this.game.physics.arcade.collide(this.ball, this.the_thing, this.ballHitPaddle, null, this);
                this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
            }
        }

        ballHitPaddle(_ball, _paddle)
        {
            var diff = 0;

            if (_ball.x < _paddle.x)
            {
                //  Ball is on the left-hand side of the paddle
                diff = _paddle.x + _paddle.width/2 - _ball.x;
                _ball.body.velocity.x = (-10 * diff);
            }
            else if (_ball.x > _paddle.x)
            {
                //  Ball is on the right-hand side of the paddle
                diff = _ball.x -(_paddle.x + _paddle.width/2);
                _ball.body.velocity.x = (10 * diff);
            }
            else
            {
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                _ball.body.velocity.x = 2 + Math.random() * 8;
            }
        }

        ballHitBrick(_ball, _brick)
        {
            _brick.kill();
            //  Are there any bricks left?
            if (this.bricks.countLiving() == 0)
            {
                //  Let's move the ball back to the paddle
                this.ball_on_plate = true;
                this.ball.body.velocity.set(0);
                this.ball.x = this.the_thing.x + this.the_thing.width/2;
                this.ball.y = this.the_thing.y - this.the_thing.height/2;
                this.ball.animations.stop();

                //  And bring the bricks back from the dead :)
                this.bricks.callAll("revive");
            }
        }
        ballLost() {
            this.ball_on_plate = true;
            this.ball.reset(
                this.the_thing.x + this.the_thing.width/2 - this.ball.width/2,
                this.the_thing.y - this.the_thing.height/2);
            this.ball.animations.stop();
        }

        releaseBall() {
            if (this.ball_on_plate)
            {
                this.ball_on_plate = false;
                this.ball.body.velocity.y = -300
                this.ball.body.velocity.x =  75 - 150*Math.random();
            }
        }
    }
}
