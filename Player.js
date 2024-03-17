class Player extends Character{
  constructor(pos, vel, health, charW, charH){
    super(pos, vel, health, charW, charH);
    this.bullets = [];
    this.lastHitTime = 0;
    this.hitCooldown = 500;
  }
  
  update() {
    this.moveCharacter();
    this.checkWalls();
    this.checkProjectiles();
  }
  
  // check player bullets with enemies
  checkProjectiles(){
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update(i);
    }

    for (let j = 0; j < this.bullets.length; j++) {
      for (let i = 0; i < enemies.length; i++) {
        this.bullets[j].hit(enemies[i], i);
      }
    }
  }
  
  moveCharacter(){
    if(!up && !down && !left && !right){
      this.vel.mult(0.8);
    }
    this.pos.add(this.vel);
  }
  
  // method to fire bullets 
  fire() {
    
    // make the direction and speed of the bullet go towards the mouse and use the mouse as aiming
    let direction = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
    
    direction.normalize();
    
    let bulletSpeed = 10; 
    direction.mult(bulletSpeed);

    let newProjectile = new Projcetile(createVector(this.pos.x, this.pos.y), direction, false, true);
    this.bullets.push(newProjectile);
  }
  
  drawCharacter(){
    for(let i = 0; i < this.bullets.length; i++){
      this.bullets[i].drawProjectile();
      this.bullets[i].moveProjectile();
    }
    
    push();
    translate(this.pos.x, this.pos.y);
    image(playerImg, -this.charW/2,-this.charH/2,this.charW, this.charH);
    pop();
  }
  
  decreaseHealth(n) {
    const currentTime = millis(); 
    if (currentTime - this.lastHitTime >= this.hitCooldown) {
      this.lastHitTime = currentTime;
      this.health -= n;
    }
  }
}