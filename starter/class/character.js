const { Room } = require('./room');

class Character extends Room {

  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description);
    this.currentRoom = currentRoom;
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
      const value = this.items.splice(0, 1);
      this.currentRoom.items.push(...value);
    }

    this.currentRoom = null;
    return true;
  }

}

module.exports = {
  Character
};
