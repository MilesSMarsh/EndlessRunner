class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    create(){
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.mainMenu = this.add.image(0, 0, 'title').setOrigin(0,0);

        this.tutorial = this.add.image(0, 0, 'tutorial').setOrigin(0,0).setAlpha(0);


        this.sceneChange = this.sound.add('sceneChange');

        this.menuMusic = this.sound.add('menu');
        this.menuMusic.loop = true;
        this.menuMusic.play();
        this.tutorialOut = false;
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER) ){
            this.scene.start('playScene');
            this.sceneChange.play();
            this.menuMusic.stop();
        }

        if(Phaser.Input.Keyboard.JustDown(keyT))
        {
            if(this.tutorialOut){
                this.mainMenu.setAlpha(1);
                this.tutorial.setAlpha(0);
                this.sceneChange.play();
                this.tutorialOut = false;
            }
            else{
                this.mainMenu.setAlpha(0);
                this.tutorial.setAlpha(1);
                this.sceneChange.play();
                this.tutorialOut = true;
            }
        }
    }
}