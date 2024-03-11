class BossEnemy extends Character {
  constructor(pos, vel, health, charW, charH) {
    super(pos, vel, health, charW, charH);
    this.isRotating = false;
    this.rotationStartTime = 0;
    this.rotationDuration = 1000; // 1 second
    this.rotationAngle = 0;
    this.rotationSpeed = 0.3;
    this.shooterTimer = 60;
    this.projectileEnemy = [];
  }

  update() {
    this.moveCharacter();
    this.checkWalls();
    this.shooterTimer--;
    this.checkProjectiles();
    
    if (this.shooterTimer <= 0) {
      this.fireEnemy();
      if(gameState === 1){
        this.shooterTimer = 30; // Reset shooter timer  
      }else if(gameState === 6){
        this.shooterTimer = 15;
      }else{
        this.shooterTimer = 60; // Reset shooter timer
      }
      
    }

    
  }
  
  checkProjectiles(){
    for (let i = this.projectileEnemy.length - 1; i >= 0; i--) {
      this.projectileEnemy[i].update(i);
      if (!this.projectileEnemy[i].isAlive) {
        this.projectileEnemy.splice(i, 1);
      } else {
        // Check collision with the player
        this.projectileEnemy[i].hit(player);
      }
    }
  }

  fireEnemy() {
    let playerPos = createVector(player.pos.x, player.pos.y);
    let direction = playerPos.copy().sub(this.pos).normalize();
    let newProjectile = new Projcetile(createVector(this.pos.x, this.pos.y), direction.mult(5), true, true);
    this.projectileEnemy.push(newProjectile);
}
  
  
  killed(i){
    enemies.splice(i, 1);
    score += 3; 
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
  
  drawCharacter(){
    push();
    for(let i = 0; i < this.projectileEnemy.length; i++){
      this.projectileEnemy[i].drawProjectile();
      this.projectileEnemy[i].moveProjectile();
    }
    translate(this.pos.x, this.pos.y);
    if(this.health > 0){
      strokeWeight(1);
       rect(-this.charW/2, -this.charH/1.5, this.health*10, 5) 
    }
  
    if(this.isRotating){
      this.rotationAngle += this.rotationSpeed; // Increase rotation angle
      rotate(this.rotationAngle); // Rotate based on current rotation angle
    }
    image(bossEnemyImg,-this.charW/2,-this.charH/2,this.charW, this.charH);
    ellipse(-5,-2,5,5);
    ellipse(5,-2,5,5);
    pop();
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