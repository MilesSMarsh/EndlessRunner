class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){

        this.isBeingPushed = false;

        this.isFiring = false;
        this.speed = 4;
        this.gameSpeed = 200;
        this.playerPoints = 0;
        this.pointThreshold = 200;



        //-----------------------create sounds-----------------------
        this.doip = this.sound.add('doip');
        this.gameplayMusic = this.sound.add('gameplay');
        this.gameplayMusic.loop = true;
        this.gameplayMusic.play();
        //-----------------------create sounds-----------------------

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

        
        //---------make follower queue----------

        this.follower_queue = [this.follower1, this.follower2, this.follower3];

        //---------make follower queue----------



        //-------------make enemy group------------

        this.enemyGroup = this.add.group({runChildUpdate: true});

        //-------------make enemy group------------

        //------------------make platform group-----------------

        this.platformGroup = this.add.group({runChilUpdate: true});

        //------------------make platform group-----------------



    

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


        
        //------------------------------ground-------------------------------
        
        this.groundBarrier = this.physics.add.staticSprite(0, 600, 'platform').setScale(4).setOrigin(0,0).setAlpha(0).refreshBody();
    
        //-----------------------------ground--------------------------------

    
    
        //--------physics colliders--------

        this.physics.add.collider(this.runner, this.groundBarrier, this.unslick, null, this);
        this.physics.add.collider(this.runner, this.platformGroup, function(obj1, obj2){this.slick(this.isBeingPushed)}, null, this);


        //--------physics colliders--------
    
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F1F42F',
            color: '#0000F0',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            }
        }
        this.scoreText = this.add.text(50, 50, `points: ${this.playerPoints}`, this.scoreConfig);
        this.time.delayedCall(2500, ()=> {this.spawnEnemy(this.gameSpeed);});
    
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


        //------------------Character Hit Enemy-----------------------

        this.physics.world.collide(this.runner, this.enemyGroup, this.gameOver, null, this);

        //------------------Character Hit Enemy-----------------------


        //-------projectiles hit enemy-----------

        this.physics.world.collide(this.follower1, this.enemyGroup, function(obj1, obj2){this.projectileHit(obj1, obj2)}, null, this);
        this.physics.world.collide(this.follower2, this.enemyGroup, function(obj1, obj2){this.projectileHit(obj1, obj2)}, null, this);
        this.physics.world.collide(this.follower3, this.enemyGroup, function(obj1, obj2){this.projectileHit(obj1, obj2)}, null, this);



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
            this.follower_queue[0].fire();
            this.follower_queue.push(this.follower_queue.shift());
            this.follower_queue[0].x += 50;
            this.follower_queue[0].target = this.runner;
            this.follower_queue[1].x += 50;
            this.follower_queue[1].target = this.follower_queue[0];
            this.follower_queue[2].target = this.follower_queue[1];
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


        if(this.playerPoints > this.pointThreshold){
            this.gameSpeed += 20;
            this.speed += 0.2;
            this.pointThreshold += 200;

        }

        if(this.runner.x < -this.runner.width){
            this.gameOver();
        }

    }

    gameOver(){
        this.runner.setVelocity(-600, -300);
        this.time.delayedCall(2500, ()=> {this.scene.start('deathScene')});
        this.time.delayedCall(2500, ()=>{this.gameplayMusic.stop()});
        this.isBeingPushed = true;
    }

    projectileHit(projectile, enemy){
        if(enemy != undefined){
            if(projectile.color === enemy.color){
                this.doip.play();
                projectile.x = 50;
                projectile.setVelocityX(0);
                enemy.destroy();
                this.spawnEnemy(this.gameSpeed);
                this.isFiring = false;
                if(projectile.color == 'blue'){
                    this.playerPoints += 50;
                    this.scoreText.text = `Points: ${this.playerPoints}`;
                }
                else{
                    this.playerPoints += 10;
                    this.scoreText.text = `Points: ${this.playerPoints}`;
                }

                if(projectile.color == 'red'){
                    this.playerPoints += 50;
                    this.scoreText.text = `Points: ${this.playerPoints}`;
                }
                if(projectile.color == 'green'){
                    this.spawnPlatform();
                }
            }
            else{
                projectile.x = 50;
                projectile.setVelocityX(0);
                this.isFiring = false;
                enemy.setVelocityX(-this.gameSpeed);
                if(projectile.color == 'red' || enemy.color == 'red'){
                    this.runner.setVelocity(-600, -600);
                }
            }
        }
    }

    spawnEnemy(gameSpeed){
        var rando = Math.random();
        let enemy = null;
        if(rando < 0.33){
            enemy = new Enemy(this, 700, this.runner.y, 'redEnemy', null, 'red', gameSpeed);
        }
        else if(rando >= 0.33 && rando < 0.66){
            enemy = new Enemy(this, 700, this.runner.y, 'greenEnemy', null, 'green', gameSpeed);
        }
        else{
            enemy = new Enemy(this, 700, this.runner.y, 'blueEnemy', null, 'blue', gameSpeed);
        }

        this.enemyGroup.add(enemy);
    }

    spawnPlatform(gameSpeed){
        console.log('spawn platform');

        let platform = new Platform(this, 700, 450, 'platform', null, gameSpeed);
        this.platformGroup.add(platform);
    }

    slick(){
        this.runner.setVelocityX(100);
    }

    unslick(beingPushed){
        if(!beingPushed){
            this.runner.setVelocity(0);
        }
    }

    
}

