var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'hex-mech', { preload: preload, create: create });

function preload() {
  game.load.image('newGame', 'app/public/spritesheets/new_game.png', 150, 72);
  game.load.image('rules', 'app/public/spritesheets/rules.png', 150, 72);
  game.load.image('signOut', 'app/public/spritesheets/sign_out.png', 150, 72);
  game.load.image('background', 'app/public/images/background_mainpage.png');
}

var newgame;
var rules;
var signout;
var background;

function create() {
  background = game.add.tileSprite(0,0,1000,700, 'background');
  newGame = game.add.sprite(172, 460, 'newGame');
  rules = game.add.sprite(417, 460, 'rules');
  signOut = game.add.sprite(663, 460, 'signOut');
}
