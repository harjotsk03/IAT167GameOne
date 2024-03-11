class ScoreAchievement {
  constructor(pos, movePos) {
    this.pos = pos;
    this.movePos = movePos;
    this.timer = 180; // Set timer to 60 frames (1 second at 60fps)
    this.displayed = false; // Track if the achievement is displayed
  }
  
  update(){
    this.drawMe();
    this.timer--;
  }
  
  drawMe() {
      // Draw achievement at pos
      fill(255, 0, 0);
      if(this.timer >= 0){
        push();
        translate(this.pos.x, this.pos.y);
        fill('gold');
        stroke('rgb(159,136,14)');
        strokeWeight(3);
        rect(-150, 30, 300,50, 50);
        textAlign(CENTER);
        fill(0);
        noStroke();
        textSize(16);
        text('Get a score of 12', 15, 62);
        image(trophyIcon2, -135, 40, 30, 30); // Draw the trophy icon
        pop();
      }else{
        push();
        translate(this.movePos.x, this.movePos.y);
        textSize(12)
        fill('gold');
        text('Acheivments', 40,-30);
        image(scoreIcon, 15, -27, 50, 50);
        pop();
        noStroke();
      }
    }
}
