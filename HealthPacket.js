class HealthPacket{
  
  constructor(pos, charW, charH, value){
    this.pos = pos;
    this.charW = charW;
    this.charH = charH;
    this.value = value;
    this.timer = 180;
    this.healthPacketDuration = 180;
  }
  
   update() {
      this.timer--;

      // check if the health packet has exceeded its duration
      if (frameCount - this.spawnTime >= this.healthPacketDuration) {
        // if so, remove the health packet from the array
        let index = healthPackets.indexOf(this);
        if (index !== -1) {
          healthPackets.splice(index, 1);
        }
      }
    }
  
  // method to detect collision with player
  detectPlayer(i) {
    if (this.pos.dist(player.pos) < this.charW / 2 + player.charW / 2) {
      if (player.health <= 90) {
        player.health += this.value;
      } else if (player.health > 90) {
        this.value = 100 - player.health;
        player.health += this.value;
      }
      // Remove the health packet from the array
      healthPackets.splice(i, 1);
      collectAcheivmentSound.play();
      i--;
    }
  }

  drawHealthPacket(){
    push();
    translate(this.pos.x, this.pos.y);
    image(healthIcon, -this.charW/2,-this.charH/2,this.charW, this.charH);
    pop();
  }
}