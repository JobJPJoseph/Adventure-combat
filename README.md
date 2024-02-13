# App Academy Adventure Combat

Welcome to App Academy Adventure! For this project, you will be extending your
original adventure game with an enemy class and asynchronous combat.

## Running the code

Type `node game.js` to run the project.

Type `npm install` to install the test packages, then `mocha` to run tests.


## Tasks

1. Create a `Character` class which is the parent of `Player` and `Enemy`
   classes
2. Create an `Enemy` class which performs actions on a cooldown timer
3. Fill in the appropriate code gaps (look at the test specs) until you see
   the goblin scratching its nose every 3 seconds
4. Implement the ability for the goblin to move to a different room on a
   cooldown timer
5. Implement the ability for the player to hit the goblin for damage
6. Implement the ability for the goblin to attack the player back after being
   hit once
7. The goblin should attack the player on sight once hit
8. All enemy actions should increase the cooldown timer, and the enemy should
   not act unless cooldown is 0
9. The player and enemies should die once their health is at or below 0

## Tips

* Copy your `Item` code from the previous project. Do test specs still pass?
  Did the OOP principles make this process easy or difficult?
* Take a look at the `Enemy.rest()` setTimeout loop. There is a bug in this
  code. Can you find it?
* Use the tests to your advantage! They will give you many hints about how the
  code should work.

## Bonus tasks

1. Make the goblin pick up food when in the same room
2. Modify strength and health values for the player and goblin
3. Create a `Weapon` class that inherits from `Item` that can be wielded for
   more strength
4. Create an `Armor` class that can be worn to reduce damage
5. Increase health when `Food` is eaten
6. Create new combat abilities and scenarios
7. Grow the world and enemies for more complex scenarios
8. Create a friendly `Shopkeeper` character that cannot be attacked and will
   sell you items
9. Use your imagination! The sky is the limit.


## Things to do

1. You notice how items is printed out, we need to do that for goblin
   1. Now it not in the correct room
2. Always display the Enemy's health
3. Always display the player's health
4. We need to make the that after the Enemy is agro, the Enemy must attack back
5. Should fix the goblin respone to being defeated. Should not immedialty attack player once his health hit 0.
6. If no goblin is found, it should not throw an Error. Just ask again.
7. Once the player health hits 0, end game.

8. We need to make two more classes and have to be child classes
   1. Item: Weapon, Armor, Currency
   2. Character: Boss, Shopkeeper

9. Add more functionality to the food class.
   1. When a food is eaten it should increase the player's health.

10. implement a Boss class that extends from the Enemey class
