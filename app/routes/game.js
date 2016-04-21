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
	newGame = game.add.button(172, 460, 'newGame', actionOnClick, this, 1, 0, 1);
  rules = game.add.button(417, 460, 'rules', actionOnClick, this, 1, 0, 1);
  signOut = game.add.button(663, 460, 'signOut', actionOnClick, this, 1, 0, 1);
}

function actionOnClick() {
  game.load.image('background','app/public/images/background_gamepage.png');
  game.load.image('map','app/public/images/map.png');
  game.load.image('foreground','app/public/images/foreground_gamepage.png');
  exit = game.add.sprite(10, 10, 'exit');
  playerNameText = game.add.text(10, 670, 'Player Playerson', { fontSize: '16px', fill: '#000' });
}
