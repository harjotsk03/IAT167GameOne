let player;
let playerImg;
let basicEnemyImg;
let bossEnemyImg;
let backgroundImg;
let trophyIcon2;
let clockIconImg;
let customFont;
let customFont2;
let bossShootSpeed;
let enemies = [];
let healthPackets = [];
let gameState = 4;
let score = 0;
let enemiesSpawned = false;
let prevGameState;
let healthPacketInterval = 600;
let timeAchievement1;
let scoreAchievement1;
let timeIcon;
let scoreIcon;
let waveTransitionDelay = 180; // Adjust this value as needed
let waveTransitionTimer = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  player = new Player(createVector(width/2, height/2), createVector(2,2), 100, 100,100)
  
  backgroundImg.resize(width, height); 
  
  timeAchievement1 = new TimeAchievement(
  createVector(width / 2, 100), // Example position
  createVector(30, height - 30) // Example move position
);
  scoreAchievement1 = new ScoreAchievement(
  createVector(width / 2, 100), // Example position
  createVector(30, height - 30) // Example move position
);

  
  spawnEnemies(5);
}

function draw() {
  background(backgroundImg);
  switch (gameState) {
      case 0: 
        gamePlay(60);
        break;
      case 1: 
        gamePlay(30);
        break;
      case 2: 
        gameOver(false);
        break;
      case 3: 
        gameOver(true);
        break;
      case 4: 
        startingScreen();
        frameRate(0);
        break;
      case 5: 
        pauseScreen();
        break;
      case 6: 
        gamePlay(30);
        break;
  }
  
  console.log(gameState);

  if (enemies.length <= 0 && gameState === 0 && !enemiesSpawned) {
    gameState = 1; // Transition to game state 1 after first wave is cleared
    waveTransitionTimer = frameCount + waveTransitionDelay;
  }
  
  if (enemies.length <= 0 && gameState === 1 && frameCount >= waveTransitionTimer) {
    gameState = 6; // Transition to game state 6 after first wave is cleared and transition timer elapsed
    waveTransitionTimer = frameCount + waveTransitionDelay;
    spawnEnemies(10); // Spawn second wave of enemies
}


  if (enemies.length <= 0 && gameState === 6 && enemiesSpawned && frameCount >= waveTransitionTimer) {
    gameState = 3; // Transition to game over state if all waves are cleared
  }

  if (player.health <= 0) {
    gameState = 2; // Transition to game over state if player health reaches 0
  }

  if (frameCount % healthPacketInterval === 0) {
    spawnHealthPacket();
  }

  if (gameState === 0 || gameState === 1 || gameState === 6) {
    if (frameCount >= 600) {
      timeAchievement1.update();
    } 
  }

  if (gameState === 0 || gameState === 1 || gameState === 6) {
    if (score >= 12) {
      scoreAchievement1.update();
    } 
  }
}


function gamePlay(bossShootTimer){
  bossShootSpeed = bossShootTimer;
  if(gameState === 1 && !enemiesSpawned){
    spawnEnemies(7);
    enemiesSpawned = true;
  }
  
  if(gameState === 6 && !enemiesSpawned){
    spawnEnemies(10);
    enemiesSpawned = true;
  }
  
  
  
  if(up){
    upAcc = createVector(0, -0.5);
    player.accelerate(upAcc);
  } else if (down){
    downAcc = createVector(0,0.5);
    player.accelerate(downAcc);
  } else if (left){
    leftAcc = createVector(-0.5,0);
    player.accelerate(leftAcc);
  } else if (right){
    rightAcc = createVector(0.5,0);
    player.accelerate(rightAcc);
  }
  
  for (let j = 0; j < healthPackets.length; j++){
    healthPackets[j].drawHealthPacket();
    healthPackets[j].detectPlayer(j);
  }
  
  textSize(12);
  fill('white');
  text('Health ' + player.health, 67, 20);
  rect(width-30,10, 8,18);
  rect(width-18,10, 8,18);
  textSize(40);
  fill('rgb(218,165,32)'); 
  text(score,width/2+10, 55);
  fill('white');
  rect(20,25, 100, 10);
  fill('rgb(142,34,34)');
  strokeWeight(3);
  stroke(0);
  rect(20,25, player.health, 10);
  fill('white');
  for (let i = 0; i < enemies.length; i++){
    enemies[i].drawCharacter();
    enemies[i].update();
    enemies[i].timer--;
    // console.log(enemies[i].timer);
    for(let j = i+1; j < enemies.length; j++){
      enemies[i].handleCollision(enemies[j], false);
    }
    player.handleCollision(enemies[i], true);
  }
  
  player.timer--;
  // console.log(player.timer);
  
  player.drawCharacter();

  player.update();
}

function gameOver(didWin){
  if(didWin){
    // logic for if player completed both waves and survived
    fill(0,0,0,200);
    rect(0,0,width,height);
    textAlign(CENTER);
    textSize(60);
    textFont(customFont);
    fill('white');
    text("YOU WIN" ,width/2, (height/2 - 100));
    textFont(customFont);
    textSize(40);
    fill('rgb(218,165,32)');
    text('Score: ' + score, width/2, height/2)
    fill(255,255,255,200);
    strokeWeight(3);
    stroke('rgb(218,165,32)');
    rect(width/2 - 100,height/2 + 200, 200, 40)
    noStroke();
    textSize(18);
    textFont(customFont2);
    fill('black')
    text('Play Again' , width/2, height/2 + 227)
  }else{
    // logic for if player dies. 
    fill(0,0,0,200);
    rect(0,0,width,height);
    textAlign(CENTER);
    textSize(60);
    textFont(customFont);
    fill('white');
    text("YOU LOST" ,width/2, (height/2 - 100));
    textFont(customFont);
    textSize(40);
    fill('rgb(218,165,32)');
    text('Score: ' + score, width/2, height/2)
    fill(255,255,255,200);
    strokeWeight(3);
    stroke('rgb(218,165,32)');
    rect(width/2 - 100,height/2 + 200, 200, 40)
    noStroke();
    textSize(18);
    textFont(customFont2);
    fill('black')
    text('Play Again' , width/2, height/2 + 227)
  }
  
  
}

function startingScreen(){

  textFont(customFont);
    fill(0,0,0,200);
    rect(0,0,width, height);
    
    textAlign(CENTER)
    textSize(50);
    fill('white')
    text('MARIO SHOOTER', width/2, 70);
    
    textFont(customFont2);
    
    textSize(25)
    text('CONTROLS', width/2, 120);
    textSize(15);
    text('Use WASD keys to move your\n character (MARIO) around the screen', width/2, 150);
    text('Use the space bar to shoot', width/2, 200)
    
    textSize(25)
    text('OBJECTIVE', width/2, 250);
    textSize(15);
    text('Kill spike enemies and ghost enemy before you die', width/2, 280);
  text('Gain 5hp from med packs (white circles with green cross)', width/2, 305);
    
    textSize(25)
    text('RULES', width/2, 350);
    textSize(15);
    text('Kill spikes with 3 hits and ghost with 8 hits', width/2, 390);
    text('Touching the spikes do 1hp of damage and the ghost\n does 3hp to your character \n(Ghost shoots 1hp damaging bullets)', width/2, 430)
    fill(255,255,255,200);
    strokeWeight(3);
    stroke('rgb(218,165,32)');
    rect(width/2 - 100,height/2 + 200, 200, 40)
    noStroke();
    textSize(18);
    textFont(customFont2);
    fill('black')
    text('Play' , width/2, height/2 + 227)
  fill('white')
}

function spawnEnemies(numOfEnemies){
  let enemySpeed = 3;
  if(gameState === 1){
    enemySpeed = 5
  }else if (gameState === 6){
    enemySpeed = 8
  }
  
  for (let i = 0; i < numOfEnemies; i++){
    if(i === 0){
      let newEnemy = new BossEnemy(createVector((random(50, width-50)), random(50,height-50)), createVector(random(-3,3),random(-3,3)), 8, 80, 80)
      enemies.push(newEnemy);
    } else{
      let newEnemy = new BasicEnemy(createVector((random(30, width-30)), random(30,height-30)), createVector(enemySpeed,enemySpeed), 3, 30, 30);
      enemies.push(newEnemy);
    }
  }
}


function spawnHealthPacket() {
  let newHealthPacket = new HealthPacket(
    createVector(random(50, width - 50), random(50, height - 50)),
    40,
    40,
    5
  );
  healthPackets.push(newHealthPacket);
}

function preload(){
  backgroundImg = loadImage('gameBg.webp');
  customFont = loadFont('customfont.ttf');
  customFont2 = loadFont('customfont2.ttf');
  playerImg = loadImage('marioFace2.webp')
  basicEnemyImg = loadImage('basicEnemy.webp')
  bossEnemyImg = loadImage('bossEnemy.webp')
  trophyIcon2 = loadImage('trophyIcon3.webp');
  clockIconImg = loadImage('clockIcon2.webp');
  timeIcon = loadImage('timeIcon.webp')
    scoreIcon = loadImage('scoreIcon.webp')

}



function mousePressed() {
  if (
    mouseX > width / 2 - 100 &&
    mouseX < width / 2 + 100 &&
    mouseY > height / 2 + 200 &&
    mouseY < height / 2 + 240
  ) {
    if (gameState === 5) {
      backToGame();
    } else {
      resetGame();
    }
  } else if (
    mouseX > width - 30 &&
    mouseX < width - 22 &&
    mouseY > 10 &&
    mouseY < 28
  ) {
    if (gameState !== 5) {
      pauseMenu();
    } else {
      backToGame();
    }
  }
}

function pauseScreen() {
  fill(0,0,0,200);
  rect(0,0,width,height);
  textAlign(CENTER);
  textSize(60);
  textFont(customFont);
  fill('white');
  text("PAUSED" ,width/2, (height/2 - 100));
  fill(255,255,255,200);
  strokeWeight(3);
  stroke('rgb(218,165,32)');
  rect(width/2 - 100,height/2 + 200, 200, 40)
  noStroke();
  textSize(18);
  textFont(customFont2);
  fill('black')
  text('Resume' , width/2, height/2 + 227)
}

function pauseMenu(){
  prevGameState = gameState;
  gameState = 5;
}

function backToGame(){
  gameState = prevGameState;
}

function resetGame() {
  score = 0;
  gameState = 0;
  enemies = [];
  player.health = 100;
  spawnEnemies(5);
  frameTimer = 180;
  frameRate(60);
  frameCount = 0;
}
