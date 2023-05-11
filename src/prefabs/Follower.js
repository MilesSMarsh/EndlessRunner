class Follower extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, target, color){
        super(scene, x, y, texture, frame);

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.color = color;

        this.target = target;
        this.followSpeed = 10/Math.sqrt((this.target.x - this.x)^2+(this.target.y + this.y)^2);
        this.body.allowGravity = false;

    }

    

    followTarget(){

        this.followSpeed = Math.abs(this.target.y - this.y)/20;

        if(this.y > this.target.y){
            this.y -= this.followSpeed;
        }
        else if(this.y < this.target.y-2){
            this.y += this.followSpeed;
        }
    }

    fire(){
        this.scene.isFiring = true;
        this.setVelocityX(500);
    }


}