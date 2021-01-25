//GAME STATE
var PLAY = 1 ;
var END = 0 ;
var gameState = 1 ;

var sword, swordImage ; 
var fruit1, fruit2, fruit3, fruit4 ;
var enemy, enemyImage;

var score ;


function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  enemyImage = loadImage("alien1.png");
 
}

function setup(){
  
  createCanvas(700, 700);
  
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7 ;
  
//Set Collider For Sword 
  sword.setCollider("rectangle", 0, 0, 40, 40);
  
//Score Variables And Group
  score = 0 ;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
//Increase Score If Sword Is Touching Fruits
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score = score+2;
  }
  
  if(sword.isTouching(enemy)){
    
    gameState = END ;
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
//Change The Animation Of Sword To GameOver And Reset its Position
    sword.addImage(gameOverImage);
    sword.x = 200 ;
    sword.y = 200 ;
  }
}

function draw(){
  background("lightblue");

  
  
  if(gameState.PLAY){

//Move The Sword With Mouse
    sword.y = World.mouseY ;
    sword.x = World.mouseX ;
    
  }
  
  drawSprites();
  
  //Call Enieme And Fruit Function
  fruits();
  Enemy();
  
//Display Score
  text("Score :"+ score, 300, 30 );
  
}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2 ;
    //fruit.debug = true ;
    r=Math.round(random(1, 4));
    if (r == 1){
      fruit.addImage(fruit1);
    } else if ( r == 2){
      fruit.addImage(fruit2);
    } else if ( r == 3){
      fruit.addImage(fruit3);
    } else if ( r == 4){
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50, 340));
    
    fruit.velocityX = -7 ;
    fruit.lifetime = 100 ;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    enemy = createSprite(400, 200, 20, 20);
    enemy.addAnimation("moving", enemyImage);
    enemy.y = Math.round(random(100, 300));
    enemy.velocityX = -8 ;
    enemy.setlifetime = 50 ;
    
    enemyGroup.add(enemy);
  }
}
