class Projcetile {
  constructor(pos, vel, isBoss, isAlive) {
    this.pos = pos;
    this.vel = vel;
    this.isBoss = isBoss;
    this.bulletW = 12;
    this.bulletH = 12;
    this.isAlive = isAlive;
  }
  
  update(index) {
    this.checkWalls(index);
    if(this.isAlive === false){
      player.bullets.splice(index, 1);
    }
  }
  
  moveProjectile() {
    this.pos.add(this.vel);
  }
  
  checkWalls(index) {
    if (this.pos.x > width + this.bulletW ||
        this.pos.x < 0 - this.bulletW ||
        this.pos.y < 0 - this.bulletH ||
        this.pos.y > height + this.bulletH) {
      player.bullets.splice(index, 1);
      this.isAlive = false;
    }
  }
  
  drawProjectile() {
    push();
    translate(this.pos.x, this.pos.y);
    if (this.isBoss) {
      fill('blue');
    } else {
      fill('gold');
    }
    ellipse(0, 0, this.bulletW, this.bulletH);
    pop();
  }
  
  hit(character, i) {
    if (this.isAlive) {
      if (abs(this.pos.x - character.pos.x) < this.bulletW / 2 + character.charW / 2 && 
          abs(this.pos.y - character.pos.y) < this.bulletH / 2 + character.charH / 2) {
        if (character instanceof BossEnemy) {
          character.hitCharacter(i, true); 
        } else {
          character.hitCharacter(i, false); 
        }
        this.isAlive = false;
      }
    } 
  }
}
