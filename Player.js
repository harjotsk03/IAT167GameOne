class Player extends Character{
  constructor(pos, vel, health, charW, charH){
    super(pos, vel, health, charW, charH);
    this.bullets = [];
  }
  
  update() {
    this.moveCharacter();
    this.checkWalls();
    this.checkProjectiles();
  }
  
  checkProjectiles(){
    // Update bullets and remove dead ones
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update(i);
    }

    // Check for collisions with enemies
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
  
  fire(){
    let newProjectile = new Projcetile(createVector(this.pos.x,this.pos.y), createVector(0,-10), false, true);
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
  
  decreaseHealth(n){
    this.health -= n;
  }
  

}