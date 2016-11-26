
  var level = 1;
  var numberOfLives = 3;
  var score = 0;
  var playerXposition;
  var playerYposition;

  var resetPlayerAndRoaches = function() {
    player.y = 386;
    player.x = 202;
    allEnemies.forEach(function(enemy) {
      enemy.resetXposition();
    });
  }

  // Enemies our player must avoid
  var Enemy = function() {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started
      // var bugYposition = [66,146,226];
      // var randomXnumber = Math.floor(Math.random() * -3 - 10);
      // var randomYnumber = Math.floor(Math.random() * 3);
      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.sprite = 'images/enemy-bug.png';
      this.resetXposition(); // random number either, -100, or -200
      // this.y = bugYposition[randomYnumber];
      this.createYposition();

  };
    //want the roaches at y position 66, 146, or 226 (one of the stone rows)
  Enemy.prototype.createYposition = function() {
  var bugYposition = [66,146,226];
  var randomYnumber = Math.floor(Math.random() * 3);
  this.y = bugYposition[randomYnumber];
  };

  Enemy.prototype.resetXposition = function() {
    this.x = Math.floor(Math.random() * 3 + 1) * -100;
  };

  // When a roach collides with the player, run the reset function and set level to 1
  // this.x + 35 == playerXposition - 35 || this.x - 35 == playerXposition + 35
  Enemy.prototype.handleCollision = function() {
    if ((playerXposition >= this.x - 70 && playerXposition <= this.x + 70) && this.y === playerYposition) {
      if (level > 0 || level < 0) {
        level = 1;
      };
        resetPlayerAndRoaches();
    } else {
      return;
    }
  };

  Enemy.prototype.handleSpeed = function(xSpeed) {
    if (this.x < 555) {
      this.x+=xSpeed;
    } else {
      this.createYposition();
      this.resetXposition();
      this.x+=xSpeed;
    }
  };


  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
    this.handleSpeed(level + 2);
    this.handleCollision();

  };


  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };


  // Create enemies of different speeds
  var FastEnemy = function() {
    Enemy.call(this);
  };

  FastEnemy.prototype = Object.create(Enemy.prototype);
  FastEnemy.prototype.constructor = FastEnemy;
  FastEnemy.prototype.update = function() {
    this.handleSpeed(level + 4);
    this.handleCollision();
  }

  var SlowEnemy = function() {
    Enemy.call(this);
  };

  SlowEnemy.prototype = Object.create(Enemy.prototype);
  SlowEnemy.prototype.constructor = SlowEnemy;
  SlowEnemy.prototype.update = function() {
    this.handleSpeed(level);
    this.handleCollision();
  };

  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 202;
    this.y = 386;
  };

  Player.prototype.update = function() {
    if (this.y <= -14) {
      level++;
      score+=1000;
      console.log('level: ' + level + '\n' + 'score: ' + score);
      resetPlayerAndRoaches();
    }
  };


  Player.prototype.handleInput = function(n) {
  switch (n) {
    case 'left': if (this.x >= 101) {
      this.x-=101;
      playerXposition = this.x;
      playerYposition = this.y;
    } else {
      return;
    }
      break;

    case 'right': if (this.x >= 404) {
      return;
    } else {
      this.x+= 101;
      playerXposition = this.x;
      playerYposition = this.y;
    }
    break;

    case 'up': if (this.y >= 66) {
      this.y-=80;
      playerXposition = this.x;
      playerYposition = this.y;
    } else {
      return;
    }
    break;

    case 'down': if (this.y < 386) {
      this.y+=80;
      playerXposition = this.x;
      playerYposition = this.y;
    } else {
      return;
    }
      break;
  }
  };

  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  };

// var Jewel = function() {
//   var gems = ['images/GemBlue.png', 'images/GemGreen.png', 'images/GemOrange.png'];
//   this.sprite = gems[Math.random() * 4];
//   this.x = 303;
//   this.y = 266;
// };
//
// Jewel.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
// };

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player

  var enemy1 = new Enemy();
  var enemy2 = new Enemy();
  var enemy3 = new Enemy();

  var fastEnemy1 = new FastEnemy();
  var fastEnemy2 = new FastEnemy();
  var fastEnemy3 = new FastEnemy();

  var slowEnemy1 = new SlowEnemy();
  var slowEnemy2 = new SlowEnemy();
  var slowEnemy3 = new SlowEnemy();

  var allEnemies = [slowEnemy1, slowEnemy2, slowEnemy3, enemy1, enemy2, enemy3, fastEnemy3];

  var player = new Player();

  // var gem = new Jewel();

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);
  });
