const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Enemy } = require('./enemy');
const { Weapon } = require('./weapon');

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

  static getEnemiesInRoom(room) {
    // Note: The test spec for this is inconsistent.

    return World.enemies.filter(enemy => enemy.currentRoom === room); // original code
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

      // test if said item is a food or not
      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description);
      } else if (itemData.isWeapon) {
        newItem = new Weapon(itemData.name, itemData.description);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      // The items come with there designed room
      // It uses the returned value as an index for the World.rooms array that contain instances
      // The rooms instance all have a property @items array
      // pushes the new items into the specific room's items
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

  }

}

module.exports = {
  World,
};
