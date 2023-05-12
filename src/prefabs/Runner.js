class Runner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, health){
        
        super(scene, x, y, texture, frame);
        

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health = health;

        this.setDragX(0);


    }

    jump(){
        this.setVelocity(0, -500);
        console.log('jump');
    }


}