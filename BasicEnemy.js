class BasicEnemy extends Character{
  constructor(pos, vel, health, charW, charH){
    super(pos, vel, health, charW, charH);
    this.isRotating = false;
    this.rotationStartTime = 0;
    this.rotationDuration = 1000; 
    this.subtract = 0.02;
    this.rotationAngle = 0;
    this.rotationSpeed = 0.1;
  }
  
  update(){
    this.moveCharacter();
    this.checkWalls();
  }
  
  drawCharacter(){
    push();
    translate(this.pos.x, this.pos.y);

    // check to make sure enemy is still alive
    if(this.health > 0){
      strokeWeight(1);
      rect(-this.charW/2, -this.charH/1.2, this.health * width/53, 5);
    }

    // check to see if has been killed and is rotating
    if(this.isRotating){
      this.rotationAngle += this.rotationSpeed; // Increase rotation angle
      rotate(this.rotationAngle); // Rotate based on current rotation angle
    }

    image(basicEnemyImg,-this.charW/2, -this.charH/2, this.charW, this.charH);
    fill('black');
    ellipse(-3,-2,3,3);
    ellipse(3,-2,3,3);
    pop();
  }

  // method to remove enemy when killed and remove score
  killed(i){
    enemies.splice(i, 1);
    score += 1; 
    enemyKillSound.play();
  }
  
  // method to detect the hit and handle any logic that needs to happen
  hitCharacter(character) {
    if (gunUpgradeTimer > 0) {
      this.decreaseHealth(3);
    } else {
      this.decreaseHealth(1);
    }

    if (this.health <= 0) {
      this.rotateAndKill(character);
    }
  }
  
  

  // decrease the health of the enemy by the given number
  decreaseHealth(n) {
    this.health -= n;
  }

  // method for handling the rotation and then killing of enemy
  rotateAndKill(character) {
    if (!this.isRotating) {
      this.isRotating = true;
      this.rotationStartTime = millis();
      setTimeout(() => {
        this.isRotating = false;
        this.killed(character);
      }, this.rotationDuration);
    }
  }
  
  
  checkWalls() {
    if (this.pos.x < this.charW / 2) {
      this.pos.x = this.charW/2;
      this.vel.x *= -1;
    }
    if (this.pos.x > width - this.charW / 2) {
      this.pos.x = width - this.charW/2;
      this.vel.x *= -1;
    }
    if (this.pos.y < this.charH / 2) {
      this.pos.y = this.charH/2;
      this.vel.y *= -1;
    }
    if (this.pos.y > height - this.charH / 2) {
      this.pos.y = height - this.charH/2;
      this.vel.y *= -1;
    }
  }
  
}