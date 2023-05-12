class Death extends Phaser.Scene {
    constructor() {
        super('deathScene');
    }
    create(){
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.image(0, 0, 'death').setOrigin(0,0);
        this.scream = this.sound.add('scream');
        this.scream.play();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER) ){
            this.scream.stop();
            this.scene.start('menuScene');

        }
    }
}