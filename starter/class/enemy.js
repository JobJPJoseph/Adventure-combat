const {Character} = require('./character');


class Enemy extends Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in

    // this.act();

    const exitArr = this.currentRoom.getExits();
    const ranNum = Math.floor(Math.random() * exitArr.length);
    const char = exitArr[ranNum];
    this.currentRoom = this.currentRoom.getRoomInDirection(char);

    this.act();

    return true;
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      // this.act(); // maybe here
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    if (this.act()) this.applyDamage(this.strength);
    return true;
  }

  applyDamage(amount) {
    // Fill this in
    this.player.health -= amount;
    if (this.player.health <= 0) this.player.die();
    return true;
  }


  act() {
    if (this.health <= 0) {
      // Dead, do nothing;

      this.die();
      return false;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
    return true;
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
