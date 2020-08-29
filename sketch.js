var trex, obstacle, ground, ground_img, trex_collided, invisibleGround, gameOver, resetButton; 
var gameState = "play";
var score = 0;

function preload() {
    ground_img = loadImage("images/ground0.png");
    trex_collided = loadImage("images/sprite_0.png");
    obstacle1_img = loadImage("images/obstacle_0.png");
    obstacle2_img = loadImage("images/obstacle_1.png");
    obstacle3_img = loadImage("images/obstacle_2.png");
    obstacle4_img = loadImage("images/obstacle_3.png");
    obstacle5_img = loadImage("images/obstacle_4.png");
    obstacle6_img = loadImage("images/obstacle_5.png");
    cloud_img = loadImage("images/cloud_0.png");
}

function setup() {
    createCanvas(880, displayHeight - 300);

    obstaclesGroup = createGroup();

    cloudsGroup = createGroup();

    trex = createSprite(0, 250, 40, 70);
    //trex.addAnimation("images/trex_img0.png", "images/trex_img1.png", "images/trex_img2.png");

    ground = createSprite(0, 275, displayWidth * 100, 10);
    //ground.addImage("ground", ground_img); 

    //invisibleGround = createSprite(0, 300, 2377, 10);
    //invisibleGround.visible = false;

    gameOver = createSprite(trex.x, camera.position.y + 300, 336, 53);
    gameOver.visible = false;

    restartButton = createSprite(camera.position.x, 250, 50, 40);
    restartButton.visible = false;
}

function draw() {
    background(247);

    console.log(trex.x);

    trex.velocityX = 3 + score/25;

    createEdgeSprites();
    //trex.collide(invisibleGround);
    trex.collide(ground);

    textSize(20);
    text("Score: " + score, trex.x + 300, 65);  
    
    if (gameState === "play") {        
        if (keyDown("space") && trex.y >= 200) {
            trex.velocityY = -14;
        }

        startScoring();

        if (ground.x > 0) {
            ground.x = ground.width / 2;
        }

        spawnObstacles();

        spawnClouds();

        if (obstaclesGroup.isTouching(trex)) {
            gameState = "end";
        }
    } else if (gameState === "end") {
        gameOver.visible = true;
        gameOver.x = trex.x;
        gameOver.y = trex.y - 165;

        restartButton.visible = true;
        restartButton.x = trex.x;
        restartButton.y = trex.y - 100;

        trex.velocityX = 0;

        cloudsGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);

        //trex.addImage("trex_collision", trex_collided);

        if (mousePressedOver(restartButton)) {
            reset();
        }
    }
    
    //The gravity of the T-Rex
    trex.velocityY = trex.velocityY + 0.7;  
    
    //camera position
    camera.x = trex.x;

    drawSprites();
}

function reset(){
    gameState = "play";
    
    gameOver.visible = false;
    restartButton.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();

    trex.x = 0;
    
    //trex.addAnimation("images/trex_img0.png", "images/trex_img1.png", "images/trex_img2.png");
    
    score = 0;
  }

function spawnObstacles() {
    if (frameCount % 160 === 0) {
            obstacle = createSprite(trex.x + 350, 250, 50, 50);
            /*var rand = Math.round(random(1,6));
            switch(rand){
                case 1: obstacle.addImage("obstacle1", obstacle1_img);
                break;
                case 2: obstacle.addImage("obstacle2", obstacle2_img);
                break;
                case 3: obstacle.addImage("obstacle3", obstacle3_img);
                break;
                case 4: obstacle.addImage("obstacle4", obstacle4_img);
                break;
                case 5: obstacle.addImage("obstacle5", obstacle5_img);
                break;
                case 6: obstacle.addImage("obstacle6", obstacle6_img);
                break;
            }*/
            obstaclesGroup.add(obstacle);
    }   
}

function spawnClouds() {
    if (frameCount % 110 === 0) {
            cloud = createSprite(trex.x + 250, random(100, 150), 70, 50);
            //cloud.addImage(cloud_img);
            cloud.lifetime = 375;
            cloudsGroup.add(cloud);
    }
}

function startScoring() {
    score = Math.round(score + 0.5);
}