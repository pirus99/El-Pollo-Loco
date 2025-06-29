/**
 * Represents the game world and handles game logic and rendering.
 */
class World { 
    actualLevel = createLevel1(); // Initial level creation
    level = this.actualLevel; // Assign level to world
    character = new Character(); // Player character instance
    statusbar = new StatusBar(); // Status bar for energy
    statusbarBottle = new BottleStatusbar(); // Status bar for bottle collection
    statusbarCoin = new CoinStatusbar(); // Status bar for coin collection
    enemies = this.level.enemies; // Enemies from current level
    clouds = this.level.clouds; // Clouds from current level
    backgroundObjects = this.level.backgroundObjects; // Background elements
    grenadeObjects = this.level.collectableObjects; // Collectable grenades
    throwableObjects = this.level.throwableObjects; // Throwable objects
    coinObjects = this.level.collectableCoinObjects; // Collectable coins
    splashObjects = this.level.splashObjects; // Splash effects (e.g., bottle hits)
    overlayObjects = this.level.overlayObjects; // Overlay elements (e.g., win/lose screens)
    canvas; // HTML canvas element
    ctx; // Canvas rendering context
    keyboard; // Keyboard input
    camera_x = -100; // Camera offset
    grenadeTime = new Date().getTime(); // Timestamp for grenade cooldown
    startscreen = true; // Indicates start screen status
    cleanup = false; // Whether to cleanup splash effects
    animate = true; // Toggle for game animation loop

    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     * @param {Object} keyboard - Object representing keyboard inputs.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * Links character to the current world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop for collision checks and grenade logic.
     */
    run() {
        const aniInterval = setInterval(() => {
            this.grenade();
            this.CheckCollisions();
            this.cleanupSplash();
            this.gameEndWon();
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
        }, 10);
    }

    /**
     * Clears splash effects if cleanup flag is set.
     */
    cleanupSplash() {
        if (this.cleanup) {
            this.splashObjects = [];
            this.cleanup = false;
        }
    }

    /**
     * Checks all types of collisions (with enemies, collectables, and throwable objects).
     */
    CheckCollisions() {
        this.checkJumpOnTopOfChicken();
        this.checkCollisionWithCollectable();
        this.checkCollisionWithThrowable();
    }

    /**
     * Handles collisions between throwable objects and enemies.
     */
    checkCollisionWithThrowable() {
        this.level.throwableObjects.forEach((obj, index) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (enemy.isColliding(obj)) {
                    enemy.bottleHit();
                    this.statusbarBottle.setPercentage(this.character.bottles);
                    let newObject = new SplashObject(this.level.throwableObjects[index].x, this.level.throwableObjects[index].y);
                    this.splashObjects.push(newObject);
                    this.level.throwableObjects.splice(index, 1);
                }
            });
        });
    }

    /**
     * Handles collisions with collectable items like bottles and coins.
     */
    checkCollisionWithCollectable() {
        this.level.collectableObjects.forEach((obj, index) => {
            if (this.character.isColliding(obj)) {
                this.character.collect('bottle');
                this.level.collectableObjects.splice(index, 1);
                this.statusbarBottle.setPercentage(this.character.bottles);
            }
        });

        this.level.collectableCoinObjects.forEach((obj, index) => {
            if (this.character.isColliding(obj)) {
                this.character.collect('coin');
                this.level.collectableCoinObjects.splice(index, 1);
                this.statusbarCoin.setPercentage(this.character.coins);
            }
        });
    }

    /**
     * Checks if the character jumps on top of an enemy (e.g., Chicken).
     */
    checkJumpOnTopOfChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                const characterBottom = this.character.y + this.character.height;
                const characterCenterX = this.character.x + this.character.width / 2;
                const isFalling = this.character.speedY < 0;
                const isAboveEnemy = characterBottom <= enemy.y + enemy.height * 0.9;
                const isWithinEnemyX =
                    characterCenterX >= enemy.x &&
                    characterCenterX <= enemy.x - 50 + enemy.width * 2;

                if (isFalling && isAboveEnemy && isWithinEnemyX && enemy instanceof Chicken) {
                    enemy.stop = true;
                    enemy.kill(enemy, index);
                    this.level.collectableCoinObjects.push(
                        new CollactableObject('./../img/8_coin/coin_1.png', enemy.x, enemy.y - 50)
                    );
                    this.character.speedY = 2; // Bounce effect
                } else if (!isAboveEnemy) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Draws all elements of the game onto the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap([this.statusbar]);
        this.addObjectsToMap([this.statusbarBottle]);
        this.addObjectsToMap([this.statusbarCoin]);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.grenadeObjects);
        this.addObjectsToMap(this.coinObjects);
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.splashObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.overlayObjects);

        let self = this;
        this.animationFrameId = requestAnimationFrame(() => self.draw());
    }

    /**
     * Throws a grenade if the key is pressed and cooldown has passed.
     */
    grenade() {
        if (keyboard.GRENADE && this.character.bottles >= 1 && this.timecheck(new Date().getTime())) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 30);
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.grenadeTime = new Date().getTime();
            this.statusbarBottle.setPercentage(this.character.bottles);
        } else if (this.keyboard.GRENADE && this.character.bottles < 1 && this.timecheck(new Date().getTime())) {
            /* Add Sound Here */
        }
    }

    /**
     * Checks if enough time has passed since the last grenade throw.
     * @param {number} actualTime - The current time in milliseconds.
     * @returns {boolean} True if cooldown has passed, false otherwise.
     */
    timecheck(actualTime) {
        if (actualTime - this.grenadeTime > 200) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Adds multiple objects to the canvas map.
     * @param {Array} objects - Array of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the canvas, with support for flipped rendering.
     * @param {Object} mo - A drawable object with optional direction flag.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.drawCTX(this.ctx);
        // mo.drawFrame(this.ctx) // Optional frame drawing
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }

    /**
     * Handles end-game logic when all bosses are defeated.
     */
    gameEndWon() {
        if (this.level.enemies.filter(enemy => enemy instanceof Boss).length === 0) {
            if (!this.gameOver) {
                this.gameOver = true;
                this.level.overlayObjects.push(
                    new Overlay('./../img/9_intro_outro_screens/game_over/game over.png', 0, 0, canvas.width, canvas.height, true)
                );
                this.level.overlayObjects.push(
                    new Overlay('./../img/You won, you lost/You win B.png', 210, 20, 300, 80, false)
                );
                this.clearWorld();
                const interval = setInterval(() => {
                    if (keyboard.CLICK) {
                        keyboard.KEYPRESS = false;
                        this.level.overlayObjects = [];
                        initStart();
                        clearInterval(interval);
                    }
                }, 25);
            }
        }
    }

    /**
     * Clears all game elements and prepares for game reset.
     */
    clearWorld() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].applyGravity();
        }
        this.statusbar.x = -500;
        this.statusbarBottle.x = -500;
        this.statusbarCoin.x = -500;
        this.grenadeObjects = [];
        this.throwableObjects = [];
        this.coinObjects = [];
        this.splashObjects = [];
        this.character.applyGravity(true);
        setTimeout(() => {
            this.animate = false;
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }
        }, 600);
        
    }
}
