const { Enemy } = require('./enemy');

class Boss extends Enemy {

    constructor(name, description, currentRoom) {
        super(name, description, currentRoom);
        this.strength = 23;
        this.health = 215;
    }
}

module.exports = {
    Boss
}
