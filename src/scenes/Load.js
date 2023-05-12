class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(50, 300, 600, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.atlas('runner', 'assets/texture_atlas/runner.png', 'assets/JSON/runner.json');

        this.load.image('mountain', './assets/mountain.png');

        this.load.image('clouds', './assets/clouds.png');

        this.load.image('ground', './assets/ground.png');

        this.load.image('platform', './assets/platform.png');

        this.load.image('projectileRed', './assets/projectileRed.png');

        this.load.image('projectileGreen', './assets/projectileGreen.png');

        this.load.image('projectileBlue', './assets/projectileBlue.png');

        this.load.image('blueEnemy', './assets/blueEnemy.png');

        this.load.image('redEnemy', './assets/redEnemy.png');

        this.load.image('greenEnemy', './assets/greenEnemy.png');

        this.load.image('title', './assets/title_screen.png');

        this.load.image('death', './assets/end_screen.png');

        this.load.audio('menu', './assets/menu.mp3');

        this.load.audio('gameplay', './assets/gameplay.mp3');

        this.load.audio('scream', './assets/scream.mp3');

        this.load.audio('sceneChange', './assets/sceneChange.mp3');

        this.load.audio('doip', './assets/doip.mp3');

        this.load.image('tutorial', './assets/tutorial.png');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}