let up = false;
let down = false;
let left = false;
let right = false;
let gameStarted = false;

function keyPressed(){
  if(key === 'W' || key === 'w'){
    up = true;
  }else if (key === 'S' || key === 's'){
    down = true;
  }else if (key === 'A' || key === 'a'){
    left = true;
  }else if (key === 'D' || key === 'd'){
    right = true;
  }
  
  if(key === ' '){
    player.fire();
  }
}

function keyReleased(){
  if(key === 'W' || key === 'w'){
    up = false;
  }else if (key === 'S' || key === 's'){
    down = false;
   }else if (key === 'A' || key === 'a'){
    left = false;
  }else if (key === 'D' || key === 'd'){
    right = false;
  }
}
