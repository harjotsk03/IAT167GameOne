class PlayerWeaponUpgrade{
  constructor(pos, value, charW, charH){
    this.pos = pos;
    this.value = value;
    this.charW = charW;
    this.charH = charH;
    this.timer = -1;
  }
  
  update() {
    this.timer--; 
    this.drawMe();
    this.detectCollision();
    // console.log(this.timer);
  }

  
  detectCollision(){
    if(dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < this.charW / 2 + player.charW/2){
      this.timer = 120;
      playerUpgradeArr.splice(0,1);
      gunUpgradeTimer = 180;
      collectAcheivmentSound.play();
    }
  }
  
  drawMe(){
    push();
    translate(this.pos);
    image(weaponBoostIcon, -this.charW/2,-this.charH/2,this.charW, this.charH);
    pop();
  }

  
}