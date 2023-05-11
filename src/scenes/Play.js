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

        this.load.image('projectileRed', './assets/projectileRed.png');

        this.load.image('projectileGreen', './assets/projectileGreen.png');

        this.load.image('projectileBlue', './assets/projectileBlue.png');

        this.load.image('blueEnemy', './assets/blueEnemy.png');

        this.load.image('redEnemy', './assets/redEnemy.png');

        this.load.image('greenEnemy', './assets/greenEnemy.png');
    }

    create(){

        this.isFiring = false;
        this.speed = 4;
        //-------------------create background------------------------
        this.mountain = this.add.tileSprite(0, 0, 700, 700, 'mountain').setOrigin(0, 0);

        this.cloud = this.add.tileSprite(0, 0, 700, 700, 'clouds').setOrigin(0, 0);

        this.ground = this.add.tileSprite(0, 0, 700, 700, 'ground').setOrigin(0, 0);
        //-------------------create background------------------------


        //-----------------create cursors-------------------
        
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //-----------------create cursors-------------------



        //--------------create runner instance---------------------



        this.runner = new Runner(this, 200, 550, 'runner', null, 100);




        //--------------create runner instance---------------------


        //-------------create follower----------------

        this.follower1 = new Follower(this, 150, 550, 'projectileBlue', null, this.runner, 'blue');

        this.follower2 = new Follower(this, 100, 550, 'projectileGreen', null, this.follower1, 'green');

        this.follower3 = new Follower(this, 50, 550, 'projectileRed', null, this.follower2, 'red');

        //-------------create follower----------------

        //-------------make enemy------------

        this.enemyRed = new Enemy(this, 500, 550, 'redEnemy', null, 'red');

        this.enemyGreen = new Enemy(this, 400, 550, 'greenEnemy', null, 'green');

        this.enemyBlue = new Enemy(this, 300, 550, 'blueEnemy', null, '');

        //-------------make enemy------------


        //---------make follower queue----------

        this.follower_queue = [this.follower1, this.follower2, this.follower3];

        //---------make follower queue----------

    

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

        //-----------character run and jump animation and functionality------------
        if(this.runner.body.touching.down && !isRunning){
            this.runner.anims.play('run');
            isRunning = true;
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)  && this.runner.body.touching.down)
        {
            this.runner.jump();
            this.runner.anims.play('jump');
            isRunning = false;
        }
        //-----------character run and jump animation and functionality------------

        //-----------reset projectiles on world bounds collision----------
        if(this.follower1.x > this.game.config.width){
            this.follower1.x = 50;
            this.follower1.setVelocityX(0);
            this.isFiring = false;
        }
        if(this.follower2.x > this.game.config.width){
            this.follower2.x = 50;
            this.follower2.setVelocityX(0);
            this.isFiring = false;
        }
        if(this.follower3.x > this.game.config.width){
            this.follower3.x = 50;
            this.follower3.setVelocityX(0);
            this.isFiring = false;
        }
        //-----------reset projectiles on world bounds collision----------



        //-----------shoot first projectiles----------------
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring)
        {
            console.log(this.follower_queue[0]);
            this.follower_queue[0].fire();
            this.follower_queue.push(this.follower_queue.shift());
            this.follower_queue[0].x += 50;
            this.follower_queue[0].target = this.runner;
            this.follower_queue[1].x += 50;
            this.follower_queue[1].target = this.follower_queue[0];
            this.follower_queue[2].target = this.follower_queue[1];
            console.log(this.follower_queue[0]);
        }

        //-----------shoot first projectiles----------------

        //-------------rotate projectiel queue---------------
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && !this.isFiring)
        {
            //rotate followers right

            this.follower_queue.push(this.follower_queue.shift());
            this.follower_queue[0].x += 50;
            this.follower_queue[0].target = this.runner;
            this.follower_queue[1].x += 50;
            this.follower_queue[1].target = this.follower_queue[0];
            this.follower_queue[2].x -= 100;
            this.follower_queue[2].target = this.follower_queue[1];

        }







        //-------------rotate projectile queue---------------





        //-----------update projectiles y value ---------------

        this.follower1.followTarget();
        this.follower2.followTarget();
        this.follower3.followTarget();

        //-----------update projectiles y value ---------------




        //--------------move background-------------------
        this.mountain.tilePositionX+= this.speed/40;

        this.cloud.tilePositionX-= this.speed*0.075;

        this.ground.tilePositionX+= this.speed;
        //--------------move background-------------------





    }

    
}

