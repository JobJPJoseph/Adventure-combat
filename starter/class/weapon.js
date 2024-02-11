const { Item } = require('./item');

class Weapon extends Item {

    constructor(name, description) {
        super(name, description);
        this.additiveDmg = 25;
        this.isEquiped = [false, true];
    }

    equip() {
        return this.isEquiped[0];
    }

}

module.exports = {
    Weapon
}
