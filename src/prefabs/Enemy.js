class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, color, gameSpeed){
        
        super(scene, x, y, texture, frame);
        
        this.color = color;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.gameSpeed = gameSpeed;
        
        this.setVelocity(0);
        this.setVelocityX(-this.gameSpeed);

        this.newEnemy = true;


    }
    update()
    {
        if(this.newEnemy && this.x < 100){
            this.scene.spawnEnemy(this.gameSpeed);
            this.newEnemy = false;
        }

        if(this.x < -this.width){
            this.destroy();
        }
    }

}