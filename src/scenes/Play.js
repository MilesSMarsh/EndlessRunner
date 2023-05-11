class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.atlas('runner', 'assets/texture_atlas/runner.png', 'assets/JSON/runner.json');

        this.load.image('mountain', './assets/mountain.png');

        this.load.image('clouds', './assets/clouds.png');

        this.load.image('ground', './assets/ground.png');

        this.load.image('platform', './assets/platform.png');

        this.load.image('chaser', './assets/chaser.png');
    }

    create(){

        this.speed = 4;
        //-------------------create background------------------------
        this.mountain = this.add.tileSprite(0, 0, 700, 700, 'mountain').setOrigin(0, 0);

        this.cloud = this.add.tileSprite(0, 0, 700, 700, 'clouds').setOrigin(0, 0);

        this.ground = this.add.tileSprite(0, 0, 700, 700, 'ground').setOrigin(0, 0);
        //-------------------create background------------------------


        //--------------create runner instance---------------------



        this.runner = new Runner(this, 200, 550, 'runner', null, 100);




        //--------------create runner instance---------------------


        //-------------create follower----------------

        this.follower1 = new Follower(this, 150, 550, 'chaser', null, this.runner);

        this.follower2 = new Follower(this, 100, 550, 'chaser', null, this.follower1);

        this.follower3 = new Follower(this, 50, 550, 'chaser', null, this.follower2);

        //-------------create follower----------------

    
        //-----------------create cursors-------------------
        
        cursors = this.input.keyboard.createCursorKeys();

        //-----------------create cursors-------------------


        //-------------------animations---------------------------
        this.anims.create({
            key: "run",
            frameRate: 7,
            frames: this.anims.generateFrameNames("runner", {
                prefix: "run",
                suffix: ".png",
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            repeat: -1
        });

        this.anims.create({
            key: "jump",
            frameRate: 8,
            frames: this.anims.generateFrameNames("runner", {
                prefix: "jump",
                suffix: ".png",
                start: 1,
                end: 2,
                zeroPad: 1
            }),
        });

        this.runner.anims.play('run');
        //-------------------animations------------------------------
        
        //------------------------------platforms-------------------------------
        
        this.groundBarrier = this.physics.add.staticSprite(0, 600, 'platform').setScale(4).setOrigin(0,0).setAlpha(0).refreshBody();
    
        //-----------------------------platforms--------------------------------
    
    
        //--------physics colliders--------

        this.physics.add.collider(this.runner, this.groundBarrier);


        //--------physics colliders--------
    
    
    
    
    }

    update(){

        if(this.runner.body.touching.down && !isRunning){
            this.runner.anims.play('run');
            isRunning = true;
        }

        if (cursors.space.isDown  && this.runner.body.touching.down)
        {
            this.runner.jump();
            this.runner.anims.play('jump');
            isRunning = false;
        }

        this.follower1.followTarget();
        this.follower2.followTarget();
        this.follower3.followTarget();

        //--------------move background-------------------
        this.mountain.tilePositionX+= this.speed/40;

        this.cloud.tilePositionX-= this.speed*0.075;

        this.ground.tilePositionX+= this.speed;
        //--------------move background-------------------





    }
    
}

