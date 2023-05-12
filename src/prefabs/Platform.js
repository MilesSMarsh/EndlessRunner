class Platform extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, gameSpeed){
        
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.gameSpeed = gameSpeed;
        
        this.setVelocity(0);
        this.setVelocityX(-100);

        this.setImmovable();



    }
    update()
    {
        if(this.x < -this.width){
            console.log('i destroy')
            this.destroy();
        }
    }

}