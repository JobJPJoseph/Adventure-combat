const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Enemy } = require('./enemy');

class World {

  static rooms = {};
  static enemies = [];

  static setPlayer(player) {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].setPlayer(player);
      }
    }
  }

  static startGame() {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].rest();
      }
    }
  }

  static getEnemiesInRoom(room) { // check this again!
    const { n: north , e: east , w: west, s: south } = room.exits;
    const directions = [north, east, west, south];
    const filteredEnemies = [];

    // console.log(World.enemies[0]);
    // console.log('===========================')
    // console.log(east);
    // console.log('===========================')

    // console.log(`World Enemies: ${World.enemies[0].name}`);
    // console.log('===========================')
    // console.log(room.exits.e);
    // console.log('===========================')
    // console.log(room);
    // console.log('===========================')
    /*
    We are trying to iterate through World.enemies and referencing that enemy's currentRoom
    We are testing and collecting if enemy's currentRoom ...
      Note: There is no such thing as room.currentRoom!!!

    We are going to use the goblin currentRoom as a reference in room.exits
    */
    // console.log(directions);
    // console.log('should all be different')
    for (let i = 0; i < World.enemies.length; i++) {
      const enemy = World.enemies[i];
      // console.log(enemy);

      for(let j = 0; j < directions.length; j++) {
        const direction = directions[j];
        // console.log('===========================')
        // console.log(direction);

        if (enemy.currentRoom === direction) filteredEnemies.push(enemy);
      }

    }


    // console.log(World.enemies[0].currentRoom === east)
    // console.log(filteredEnemies);
    return filteredEnemies;
    return World.enemies.filter(enemy => enemy.currentRoom === room.currentRoom); // room is a player instance that has a currentToom of room
  }

  static loadWorld(worldData) {

    const roomList = worldData.rooms;
    const itemList = worldData.items;
    const enemyList = worldData.enemies;

    // Instantiate new room objects
    // Get name, id and description from room data
    for (let i = 0 ; i < roomList.length ; i++) {

        let roomData = roomList[i];
        let newRoom = new Room(roomData.name, roomData.description);

        World.rooms[roomData.id] = newRoom;
    }

    // Connect rooms by ID
    // Note that all rooms must be created before they can be connected
    for (let i = 0 ; i < roomList.length ; i++) {

      let roomID = roomList[i].id;
      let roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        let connectedRoomID = roomConnections[direction];
        let roomToConnect = World.rooms[connectedRoomID];
        World.rooms[roomID].connectRooms(direction, roomToConnect);
      }

    }

    // Instantiate items
    for (let i = 0 ; i < itemList.length ; i++) {

      let itemData = itemList[i];
      let newItem;

      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      let itemRoom = World.rooms[itemData.room];
      itemRoom.items.push(newItem);
   }

    // Instantiate enemies
    for (let i = 0 ; i < enemyList.length ; i++) {

      let enemyData = enemyList[i];
      let enemyRoom = World.rooms[enemyData.room];
      let newEnemy = new Enemy(enemyData.name, enemyData.description, enemyRoom);
      World.enemies.push(newEnemy);
    }

    // We will back to this later
    // console.log(World.rooms);
    // console.log(World.enemies);
  }

}

module.exports = {
  World,
};
