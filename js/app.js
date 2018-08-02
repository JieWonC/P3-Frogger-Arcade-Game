/**
 * TODO:
 * - Add score
 * - Add player lives
 * - Add Gem class
 * - Add gameOver screen
 * - Media query
 */

// Enemies Class
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position on the canvas
    update(dt) {
        if (this.x < 505) {
            this.x += this.speed * dt;
        } else {
            this.x = -101;
        }
    }
    // Draw the enemy on the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Generate Enemies
const allEnemies = [];
let enemyLocation = [68, 68, 151, 151, 234];
var enemy;
enemyLocation.forEach(locationY => {
    enemy = new Enemy(-101, locationY, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
})

// Player Class
class Player {
    constructor() {
        // Set the player's position on the canvas
        this.x = 202;
        this.y = 400;
        // Set the player's image
        this.sprite = 'images/char-horn-girl.png';
    }
    // Draw the player on the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Set the player movement on the canvas
    handleInput(keyCode) {
        switch (keyCode) {
            case 'left':
                this.x -= (this.x > 0) ? 101 : 0;
                break;
            case 'right':
                this.x += (this.x < 400) ? 101 : 0;
                break;
            case 'up':
                this.y -= (this.y > 0) ? 83 : 0;
                break;
            case 'down':
                this.y += (this.y < 400) ? 83 : 0;
                break;
            default:
                break;
        }
    }
    // Udpdate player movement on the canvas
    update() {
        // Check Collisions
        for(let enemy of allEnemies) {
            if (this.y === enemy.y      &&
                this.x < enemy.x + 50   &&
                this.x + 50 > enemy.x) {
                    console.log('N-O--W-A-Y !!');
                    this.hitEffect();
                    this.reset();
                }
        }
        // Player reaches the water
        if (this.y < 0) {
            console.log('Y-O-U---W-O-N !!');
            this.reset();
            //this.score += 100;
        }
    }
    // Visual effect when the player collides with an enemy
    hitEffect() {
        $('#collision').show().fadeOut();
    }
    // Reset player position
    reset() {
        setTimeout(() => {
            this.x = 202;
            this.y = 400;
        }, 200);
        // this.lives -=;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let player = new Player();

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
