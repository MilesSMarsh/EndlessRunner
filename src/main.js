//name, game title, approximate hours spent on project, and your creative tilt justification 
//Miles Marsh
//Game Title: Bram
//13 hrs spent on project
//
//creative tilt:
//I really enjoyed making the assets for the game and making the glonks and bleebles
//
//I think the coolest thing that I implemented was the queue of projectiles that cycles 
//on command and you can fire the on in front location, then upon collision it returnss to the back of the queue









let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade : {
            gravity: { y: 700 },
            //debug: true
        }
    },
    scene: [ Load, Menu, Play, Death ]
}

let game = new Phaser.Game(config);

let keyLEFT = null;
let keyRIGHT = null;
let keyUP = null;
let keySPACE = null;
let keyENTER = null;
let keyT = null;
let isRunning = true;