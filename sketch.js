var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
//var PLAY = 1;
//var END = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  // creating tower
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //creating ghost
  ghost = createSprite(300,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale= 0.4;
  


  doorsGroup = new Group() ;
  climbersGroup = new Group() ;
  invisibleBlockGroup = new Group() ;

  //spookySound.play();                   
}

function draw() {

  background(0);

  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x +=5;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x -=5;    
    }
  if(keyDown("space")){
    ghost.velocityY = - 2;
  }
  ghost.velocityY +=0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  spawnDoor();

  
  // to make game end when ghost touches bottom of climber and 
   //when it falls down
   if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
     

    ghost.destroy();
    gameState ="end";
  }
  drawSprites();
}
   
if(gameState == "end"){
  textSize(30);
  fill ("yellow");
  stroke("red");
  strokeWeight(3);
  text ("GAME OVER!!", 225, 300);
  

}

   
    

           
}

function spawnDoor(){
  if(frameCount%200==0){
  door = createSprite(Math.round(random(150,250)), 0, 50, 50);
  door.addImage (doorImg);
  door.velocityY = 2;
  doorsGroup.add(door);
  door.lifetime = 600;

  ghost.depth = door.depth;
  ghost.depth +=1;

  climber = createSprite(door.x, 50, 50, 50);
  climber.addImage (climberImg);
  climber.velocityY = 2;
  climbersGroup.add(climber);
  climber.lifetime = 600;


  invisibleBlock = createSprite(climber.x, 70,50,10);
  invisibleBlock.velocityY = 2;
  invisibleBlock.visible = false;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.lifetime = 600;
  invisibleBlock.debug= true;
  }


}


