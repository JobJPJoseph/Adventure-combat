const {Character} = require('./character');
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

    if (instItem) {
      const index = this.currentRoom.items.indexOf(instItem);
      const item = this.currentRoom.items.splice(index, 1);
      this.items.push(...item);
    } else {
      return false;
    }

    return true;
  }

  dropItem(itemName) {
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

  eatItem(itemName) {
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
    this.calculateHealthBoost(...item);
    return true;
  }

  calculateHealthBoost(food) {
    const healthBoost = this.health * food.healthBoostPercentage;
    this.health += healthBoost
    return true;
  }

  equipWeapon(name) {
    const weapon = this.getItemByName(name);

    if (weapon.equip()) {
      this.strength -= weapon.additiveDmg;
      weapon.equipWeapon();
    } else {
      this.strength += weapon.additiveDmg;
      weapon.equipWeapon();
    }

  }

  getItemByName(name) {
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

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
