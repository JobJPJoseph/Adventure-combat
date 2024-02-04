const { Room } = require('./room');

class Character extends Room {

  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description);
    this.currentRoom = currentRoom; // A Room instance
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
    return true;
  }

  die() {
    // Fill this in

    while(this.items.length > 0) {
      /*
      We need to continuously remove from this.items and put those elements
      into the current room that the character is in.

      We are going to reference this.items.splice(0,1) index 0: delete 1: insert none
      and save bc we need the value
      We that value, we are going to push it into this.currentRoom.items.push(...value);
      */

      const value = this.items.splice(0, 1);
      this.currentRoom.items.push(...value);
    }

    // this.currentRoom.items.push(this.items[0]);
    this.currentRoom = null;
    return true;
  }

}

module.exports = {
  Character
};
