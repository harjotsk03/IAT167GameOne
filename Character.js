class Character {
  constructor(pos, vel, health, charW, charH) {
    this.pos = pos;
    this.vel = vel;
    this.health = health;
    this.charW = charW;
    this.charH = charH;
    this.value = 1;
  }

  update() {
    this.moveCharacter();
    this.checkWalls();
  }

  moveCharacter() {
    if (!this.isRotating) {
      this.pos.add(this.vel);
    }
  }

  accelerate(acc) {
    this.vel.add(acc);
  }

  hitCharacter(character) {
    this.decreaseHealth(this.value);
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

  killed(i) {
    enemies.splice(i, 1);
    score += 1;
  }

  handleCollision(other, isPlayer) {
    if (this.pos.dist(other.pos) < this.charW / 2 + other.charW / 2) {
      let angle = atan2(this.pos.y - other.pos.y, this.pos.x - other.pos.x);
      let avgSpeed = (this.vel.mag() + other.vel.mag()) / 2;

      this.vel.set(avgSpeed * cos(angle), avgSpeed * sin(angle));
      other.vel.set(avgSpeed * cos(angle - PI), avgSpeed * sin(angle - PI));

      if (isPlayer) {
        player.decreaseHealth(1);
      }
    }
  }

  checkWalls() {
    if (this.pos.x < this.charW / 2) {
      this.pos.x = this.charW / 2;
    }
    if (this.pos.x > width - this.charW / 2) {
      this.pos.x = width - this.charW / 2;
    }
    if (this.pos.y < this.charH / 2) {
      this.pos.y = this.charH / 2;
    }
    if (this.pos.y > height - this.charH / 2) {
      this.pos.y = height - this.charH / 2;
    }
  }
}
