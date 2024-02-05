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

  takeItem(itemName) {
    // Fill this in

    const instItem = this.currentRoom.getItemByName(itemName);
    const index = this.currentRoom.items.indexOf(instItem);
    const item = this.currentRoom.items.splice(index, 1);
    this.items.push(...item);
    return true;
  }

  dropItem(itemName) {
    // Fill this in
    const instItem = this.getItemByName(itemName);
    const index = this.items.indexOf(instItem);
    const item = this.items.splice(index, 1);
    this.currentRoom.items.push(...item);
    return true;
  }

  eatItem(itemName) {
    // Fill this in
    const instItem = this.getItemByName(itemName);
    if (!(instItem instanceof Food)) return false;
    const index = this.items.indexOf(instItem);
    const item = this.items.splice(index, 1);
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
    const instEnemy =  this.getEnemyByName(name);
    this.applyDamage.call(instEnemy, this.strength); // attacking goblin
    instEnemy.attackTarget = this; // Goblin is now agro

    return true;
  }



  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
