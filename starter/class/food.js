const { Item } = require('./item');

class Food extends Item {

  constructor(name, description) {
    super(name, description);
    this.healthBoostPercentage = 0.40;
  }
}

module.exports = {
  Food,
};
