class BasicEnemy extends Character{
  constructor(pos, vel, health, charW, charH){
    super(pos, vel, health, charW, charH);
    this.isRotating = false;
    this.rotationStartTime = 0;
    this.rotationDuration = 1000; // 1 second
    this.subtract = 0.02;
    this.rotationAngle = 0;
    this.rotationSpeed = 0.1;
  }
  
  update(){
    this.moveCharacter();
    this.checkWalls();
  }
  
  accelerate(){
    
  }
  
  drawCharacter(){
    push();
    translate(this.pos.x, this.pos.y);

    if(this.health > 0){
      strokeWeight(1);
      rect(-this.charW/2, -this.charH/1.2, this.health * 10, 5);
    }

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


  
  
  killed(i){
    enemies.splice(i, 1);
    score += 1; 
  }
  
  hitCharacter(character) {
    this.decreaseHealth(1);
    if (this.health <= 0) {
      this.rotateAndKill(character);
    }
  }

  decreaseHealth(n) {
    this.health -= n;
  }

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
      this.vel.x *= -1;
    }
    if (this.pos.x > width - this.charW / 2) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.charH / 2) {
      this.vel.y *= -1;
    }
    if (this.pos.y > height - this.charH / 2) {
      this.vel.y *= -1;
    }
  }
  
  
}