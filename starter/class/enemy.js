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
    // We can use functions in classes. We have to use the arrow functions
    const resetCooldown = () => {
      this.cooldown = 0;
      // this.act(); // maybe here
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    /* Looking back at World.js and the spec, 'World.setPlayer(player);'. Every instance
    of enemy's 'this.player' is set. So we can reference 'this.player'

    We can reference health and strength from 'this.player'
    */
    this.act();
    // console.log(this.player);
    this.applyDamage(this.strength);
    return true;
  }

  applyDamage(amount) {
    // Fill this in
    this.player.health -= amount;
    return true;
  }


  act() {
    if (this.health <= 0) {
      // Dead, do nothing;

      // we may need to call this.die() since its dead
        // Note:Enemy is an instance of Character
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
