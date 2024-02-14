const { Enemy } = require('./enemy');

class Boss extends Enemy {

    constructor(name, description, goblin) {
        super(name, description);
        this.strength = ((goblin.strength * 1.30) + goblin.strength);
        this.health = ((goblin.health * 1.15) + goblin.health);
        this.isBoss = true;
    }
}

module.exports = {
    Boss
}
