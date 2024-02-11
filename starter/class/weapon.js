const { Item } = require('./item');

class Weapon extends Item {

    constructor(name, description) {
        super(name, description);
        this.damageBoostPercentage = 0.15;
    }

}

module.exports = {
    Weapon
}
