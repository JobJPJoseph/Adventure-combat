const {Character} = require('./character');
// const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) { // fix this
    // Fill this in

    const instItem = this.currentRoom.getItemByName(itemName);

    if (instItem) {
      const index = this.currentRoom.items.indexOf(instItem);
      const item = this.currentRoom.items.splice(index, 1);
      this.items.push(...item);
    } else {
      return false;
    }

    return true;
  }

  dropItem(itemName) { // fix this
    // Fill this in
    const instItem = this.getItemByName(itemName);

    if(instItem) {
      const index = this.items.indexOf(instItem);
      const item = this.items.splice(index, 1);
      this.currentRoom.items.push(...item);
    } else {
      return false;
    }

    return true;
  }

  eatItem(itemName) { // fix this
    // Fill this in
    const instItem = this.getItemByName(itemName);
    if (!(instItem instanceof Food)) return false;
    const index = this.items.indexOf(instItem);
    const item = this.items.splice(index, 1);
    /*
    We did nothing with the item
    All we did was delete it
    No boost in health nor strength, keep that in mind
    */
    return true;
  }

  getItemByName(name) {
    // Fill this in
    // for (let i = 0; i < this.items.length; i++) {
    //   const item = this.items[i];

    //   if (item.name === name) return item;
    // }

    // return false;
    return super.getItemByName(name);
  }

  hit(name) {
    // Fill this in
    const instEnemy = this.getEnemyByName(name);

    if(Object.keys(instEnemy).length > 0) {
      this.applyDamage.call(instEnemy, this.strength); // attacking goblin
      instEnemy.attackTarget = this; // Goblin is now agro

      return instEnemy;
    } else {
      return false;
    }

  }

  die() { // needs to be called
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
