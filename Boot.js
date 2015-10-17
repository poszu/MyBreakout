var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Breakout;
(function (Breakout) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
            this.counter = 0;
            this.step = Math.PI / 360;
        }
        Boot.prototype.preload = function () {
            this.load.image('breakout_logo', 'assets/breakout.png');
            this.load.image('level1_background', 'assets/background1.jpg');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.logo = this.add.sprite(0, 0, 'breakout_logo');
            this.logo.x = this.game.width / 2;
            this.logo.anchor.x = this.logo.anchor.y = 0.5;
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        Boot.prototype.update = function () {
            var tStep = Math.sin(this.counter);
            this.logo.y = (this.game.height / 2) + tStep * 40;
            this.logo.rotation = 0.8 * tStep;
            this.counter += this.step;
            this.game.debug.spriteInfo(this.logo, 32, 100);
        };
        Boot.prototype.fadeOut = function () {
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Boot.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return Boot;
    })(Phaser.State);
    Breakout.Boot = Boot;
})(Breakout || (Breakout = {}));
