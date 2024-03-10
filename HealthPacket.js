class HealthPacket{
  constructor(pos, charW, charH, value){
    this.pos = pos;
    this.charW = charW;
    this.charH = charH;
    this.value = value;
  }
  
  detectPlayer(i){
    if (this.pos.dist(player.pos) < this.charW / 2 + player.charW / 2) {
      if(player.health <= 90){
       player.health += this.value; 
      }else if(player.health >90){
        this.value = 100 - player.health;
        player.health += this.value; 
      }
      healthPackets.splice(i, 1);
    }
  }
  
  drawHealthPacket(){
    push();
    translate(this.pos.x, this.pos.y);
    fill("white");
    stroke('green');
    strokeWeight(3);
    ellipse(0, 0, this.charW, this.charH);
    fill('green');
    rect(-1,-7.5,2,15);
    rect(-7.5,-1,15,2);
    pop();
  }
}