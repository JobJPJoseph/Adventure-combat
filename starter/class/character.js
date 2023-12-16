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
    // The is a pointer problem
      // the room instance and currentRoom are the same.
      // If you make a change to currentRoom, room will be affected
      // as well.

    // console.log(this.items) // We are pushing this into currentRoom

    this.currentRoom.items.push(this.items[0]);
    this.currentRoom = null;
    return true;
  }

}

module.exports = {
  Character
};
