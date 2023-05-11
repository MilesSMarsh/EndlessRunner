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

let keyLEFT = null;
let keyRIGHT = null;
let keyUP = null;
let keySPACE = null;
let isRunning = true;