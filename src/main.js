let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade : {
            gravity: { y: 700 },
            debug: true
        }
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config);

let cursors = null;
let isRunning = true;