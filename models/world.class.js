class World {
    actualLevel = createLevel1();
    level = this.actualLevel;
    character = new Character();
    statusbar = new StatusBar();
    statusbarBottle = new BottleStatusbar();
    statusbarCoin = new CoinStatusbar();
    enemies = this.level.enemies;
    clouds = this.level.clouds;
    backgroundObjects = this.level.backgroundObjects;
    grenadeObjects = this.level.collectableObjects;
    throwableObjects = this.level.throwableObjects;
    coinObjects = this.level.collectableCoinObjects;
    splashObjects = this.level.splashObjects;
    overlayObjects = this.level.overlayObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = - 100;
    grenadeTime = new Date().getTime();
    startscreen = true;
    cleanup = false;
    animate = true;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run()
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.grenade();
            this.CheckCollisions();
            this.cleanupSplash();
            this.gameEndWon();
        }, 10);
    }

    cleanupSplash() {
        if (this.cleanup) {
            this.splashObjects = [];
            this.cleanup = false;
        }
    }

    CheckCollisions() {
        this.checkJumpOnTopOfChicken();
        this.checkCollisionWithCollectable();
        this.checkCollisionWithThrowable();
    }

    checkCollisionWithThrowable() {
        this.level.throwableObjects.forEach((obj, index) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (enemy.isColliding(obj)) {
                    console.log('bottle Hit!');
                    enemy.bottleHit()
                    this.statusbarBottle.setPercentage(this.character.bottles);
                    let newObject = new SplashObject(this.level.throwableObjects[index].x, this.level.throwableObjects[index].y)
                    this.splashObjects.push(newObject)
                    this.level.throwableObjects.splice(index, 1)

                    // Optionally, handle enemy hit logic here
                }
            });
        });
    }

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
                    this.level.collectableCoinObjects.push(new CollactableObject('../img/8_coin/coin_1.png', enemy.x, enemy.y - 50))
                    // Optional: small bounce after stomping
                    this.character.speedY = 2;
                } else if (!isAboveEnemy) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);


        this.ctx.translate(- this.camera_x, 0)
        this.addObjectsToMap([this.statusbar]);
        this.addObjectsToMap([this.statusbarBottle]);
        this.addObjectsToMap([this.statusbarCoin]);
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.grenadeObjects)
        this.addObjectsToMap(this.coinObjects)
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.splashObjects);

        this.ctx.translate(- this.camera_x, 0)

        this.addObjectsToMap(this.overlayObjects);


        let self = this;
        if (this.animate) {
            requestAnimationFrame(() => self.draw());
        }
    }

    grenade() {
        if (keyboard.GRENADE && this.character.bottles >= 1 && this.timecheck(new Date().getTime())) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50);
            this.throwableObjects.push(bottle)
            this.character.bottles--;
            this.grenadeTime = new Date().getTime();
            this.statusbarBottle.setPercentage(this.character.bottles);
        } else if (this.keyboard.GRENADE && this.character.bottles < 1 && this.timecheck(new Date().getTime())) {
            console.log('no Bottles')
        }
    }

    timecheck(actualTime) {
        if (actualTime - this.grenadeTime > 200) {
            return true;
        } else {
            return false;
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0)
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.drawCTX(this.ctx)
        /* mo.drawFrame(this.ctx) */
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }

    gameEndWon() {
        // Check if there are no Boss instances left in the enemies array
        if (this.level.enemies.filter(enemy => enemy instanceof Boss).length === 0) {
            if (!this.gameOver) {
                this.gameOver = true;
                this.level.overlayObjects.push(new Overlay('../img/9_intro_outro_screens/game_over/game over.png', 0, 0, canvas.width, canvas.height, true));
                this.level.overlayObjects.push(new Overlay('../img/You won, you lost/You win B.png', 210, 10, 300, 80, false));
                this.clearWorld();
                const interval = setInterval(() => {
                    if (keyboard.CLICK) {
                        this.level.overlayObjects = [];
                        initWorld();
                        clearInterval(interval)
                    }
                }, 25);
            }
        }
    }

    clearWorld() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].applyGravity();
        }
        this.statusbar.x = -500;
        this.statusbarBottle.x = -500;
        this.statusbarCoin.x = -500;
        this.grenadeObjects = []
        this.throwableObjects = []
        this.coinObjects = []
        this.splashObjects = []
        this.character.applyGravity(true);
    }

}