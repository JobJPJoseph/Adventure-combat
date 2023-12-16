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


  randomMove() { // this is mostly wrong. look at room.js
    // Fill this in
    // you will need to reference currentRoom to get room.exits['w']
    // this.currentRoom = this.currentRoom.exits['w'];
    this.act();
    // return true;

    // enemy is an instance of Character and Room
    // We could grab the keys from this.exits since its a hash
    // From there we can generate a random number using the length of the keys
      // thus returning a number to get a character from Object.keys(this.exits);
    // We now use this character to to call getRoomInDirection(direction)

    // console.log(this.currentRoom);

    // const exitArr = Object.keys(this.currentRoom.exits);
    const exitArr = this.currentRoom.getExits();
    // console.log(`exitArr: ${exitArr}`);
    const ranNum = Math.floor(Math.random() * exitArr.length);
    // console.log(`ranNum: ${ranNum}`);
    const char = exitArr[ranNum];
    // console.log(`character: ${char}`);
    this.currentRoom = this.currentRoom.getRoomInDirection(char);

    // console.log(this.currentRoom);

    // We are wrong.
      // this.exits has nested instances
    // console.log(this.currentRoom.exits); // The correct reference

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
      this.act();
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
