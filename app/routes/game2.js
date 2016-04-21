var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'hex-mech', { preload: preload, create: create });

function preload() {
  game.load.image('background', 'app/public/images/background_gamepage.png');
  game.load.image('map', 'app/public/images/map.png', 1000, 700);
  game.load.image('foreground', 'app/public/images/foreground_gamepage.png');
  game.load.spritesheet('exit', 'app/public/spritesheets/exit.png', 98, 72);
}

var background;
var map;
var foreground;
var exit;
var playerNameText;

function create() {
  background = game.add.tileSprite(0, 0, 1000, 700, 'background');
  map = game.add.sprite(0, 0, 'map');
  foreground = game.add.tileSprite(0, 0, 1000, 700, 'foreground');
  exit = game.add.sprite(10, 10, 'exit');
  playerNameText = game.add.text(10, 670, 'Player Playerson', { fontSize: '16px', fill: '#000' });
}
