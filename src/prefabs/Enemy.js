class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, color){
        
        super(scene, x, y, texture, frame);
        

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;



    }

}