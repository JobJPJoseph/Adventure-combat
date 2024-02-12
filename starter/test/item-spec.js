const { expect } = require('chai');

const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Food} = require("../class/food.js");
const {Weapon} = require('../class/weapon.js');

describe ('Item', function () {

  it('should have name and description attributes', function () {
    let item = new Item("rock", "just a simple rock");

    expect(item.name).to.equal("rock");
    expect(item.description).to.equal("just a simple rock");

  });


  it('can be retrieved from player inventory by name', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);
    expect(player.items.length).to.equal(1);

    expect(player.getItemByName("rock")).to.equal(item);

  });

  it('can be retrieved from a room by name', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");

    room.items.push(item);
    expect(room.items.length).to.equal(1);

    expect(room.getItemByName("rock")).to.equal(item);

  });

  it('can be picked up from a room by a player', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    room.items.push(item);
    expect(room.items.length).to.equal(1);
    expect(player.items.length).to.equal(0);

    player.takeItem("rock");

    expect(room.items.length).to.equal(0);
    expect(player.items.length).to.equal(1);

    expect(player.getItemByName("rock")).to.equal(item);

  });


  it('can be dropped into a room by a player', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);
    expect(room.items.length).to.equal(0);
    expect(player.items.length).to.equal(1);

    player.dropItem("rock");

    expect(room.items.length).to.equal(1);
    expect(player.items.length).to.equal(0);

    expect(room.getItemByName("rock")).to.equal(item);

  });


});


describe ('Food', function () {


  it('should have name and description attributes', function () {
    let food = new Food("sandwich", "a delicious sandwich");

    expect(food.name).to.equal("sandwich");
    expect(food.description).to.equal("a delicious sandwich");

  });


  it('should be an instance of Item and Food', function () {
    let food = new Food("sandwich", "a delicious sandwich");
    let item = new Item("rock", "just a simple rock");

    expect(food instanceof Item).to.be.true;
    expect(food instanceof Food).to.be.true;

    expect(item instanceof Item).to.be.true;
    expect(item instanceof Food).to.be.false;
  });


  it('can be eaten by a player', function () {
    let food = new Food("sandwich", "a delicious sandwich");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(food);

    expect(player.items.length).to.equal(1);

    player.eatItem("sandwich");

    expect(player.items.length).to.equal(0);

  });


  it('cannot be eaten by a player if not food', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);

    expect(player.items.length).to.equal(1);

    player.eatItem("rock");

    expect(player.items.length).to.equal(1);
  });

  describe('calculateHealthBoost', function () {

    it('should increase the player health food is eaten', function () {
      const room = new Room("Test Room", "A test room");
      const player = new Player("player", room);
      const sandwich = new Food("sandwich", "a delicious looking sandwich");

      player.items.push(sandwich);
      expect(player.health).to.equal(100);
      player.eatItem('sandwich');
      expect(player.health).to.equal(140);

    });

  });

});

describe('Weapon', function () {

  let room;
  let weapon;
  let player;

  beforeEach(function () {
    room = new Room('Test Room', "A test room");
    player = new Player('player', room);
    weapon = new Weapon('excalibastard', 'For your death dealing needs');
  });

  describe('Constructor', function () {

    it('should initialize the Weapon class', function () {
      expect(weapon.constructor).to.exist;
    });

    it('Weapon should also be an instance of Item', function () {
      expect(weapon).to.be.instanceOf(Weapon);
      expect(weapon).to.be.instanceOf(Item);
      expect(weapon).to.not.be.instanceOf(Food);
    });

    it('should initialize the name, description, additiveDmg, and equip', function () {
      expect(weapon.name).to.equal('excalibastard');
      expect(weapon.description).to.equal('For your death dealing needs');
      expect(weapon.additiveDmg).to.equal(25);
      expect(weapon.isEquiped).to.deep.equal([false, true]);
    });

  });

  describe('takeItem', function () {

    it("should take the weapon from room's inventory and place it in the player's inventory.", function () {
      room.items.push(weapon);
      expect(room.items.length).to.equal(1);
      expect(player.items.length).to.equal(0);

      player.takeItem('excalibastard');

      expect(room.items.length).to.equal(0);
      expect(player.items.length).to.equal(1);
    });

  });

  describe('Equip', function () {

    it('should return the first index of isEquiped', function () {
      player.items.push(weapon);
      expect(player.items[0].equip()).to.equal(false);
    });

  });

  describe('EquipWeapon', function () {

    it('should rotate the isEquip property', function () {
      expect(weapon.equip()).to.equal(false);
      weapon.equipWeapon();
      expect(weapon.equip()).to.equal(true);
    });

  });

  // All we need to do is check if the player equiped the weapon or not
  // There is a disconnect btw the test and running the game

  describe('equipWeapon', function () {

    context('When weapon is equiped', function () {

      it('should have the player equip the weapon', function () {
        player.items.push(weapon);
        player.equipWeapon('excalibastard');
        expect(player.items[0].equip()).to.equal(true);
      });

      it('when weapon is equiped, should increase the player.strength', function () {
        player.items.push(weapon);
        player.equipWeapon('excalibastard');
        expect(player.strength).to.equal(35);
      });

    });

    context('When weapon is unequiped', function () {

      it('should have the player unequip the weapon', function () {
        weapon.equipWeapon();
        player.items.push(weapon);
        player.equipWeapon('excalibastard');
        expect(player.items[0].equip()).to.equal(false);
      });

      it('when weapon unequiped, should return the player.strength to its original state', function () {
        player.strength = 35;
        weapon.equipWeapon();
        player.items.push(weapon);
        player.equipWeapon('excalibastard');
        expect(player.strength).to.equal(10);
      });

    });

  });

  // describe('calculateStrengthBoost', function () {
  //   expect(player.strength).to.equal(10);
  //   expect(player.)
  // });

});
