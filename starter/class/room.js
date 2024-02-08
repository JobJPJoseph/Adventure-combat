class Room {

  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = [];
  }

  getEnemies() {
    const { World } = require('./world');

    return World.getEnemiesInRoom(this);
  }

  printRoom() {
    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");

    // if (this.getEnemies().length > 0) {
    //   console.log(`Enemies: ${this.getEnemies().map(enemy => enemy.name).join(", ")}`);
    // }

    if (this.getEnemies().length > 0) {
      console.log(`Enemies: ${this.getEnemies().map(enemy => [enemy.name, enemy.health].join(" ")).join(", ")}`)
    }

    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  getExits() {
    return Object.keys(this.exits);
  }

  getExitsString() {
    return `Exits: ${this.getExits().join(", ")}`
  }

  connectRooms(direction, connectingRoom) {

    // Check if the direction and connecting room are valid
    if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction) {
    return this.exits[direction];
  }

  getItemByName(name) {

    // Fill this in
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === name) return item;
    }

    return false;
  }

  getEnemyByName(name) {

    // Fill this in

    // const enemies = this.getEnemies();
    const enemies = this.getEnemies.call(this.currentRoom); // We added context

    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];

      if (enemy.name === name) return enemy;
    }

    return null;
  }
}

module.exports = {
  Room,
};
