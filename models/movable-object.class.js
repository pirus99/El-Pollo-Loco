class MovableObject extends DrawableObject {
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    deadRun = 0;

    applyGravity(force) {
        setInterval(() => {
            if(this instanceof Character){
            keyboard.JUMP = false;
            }
            if (this.isAboveGround() || this.speedY >= 20 || force) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if(this instanceof Character){
                keyboard.JUMP = true;
                }
            }
        }, 15)

    }

    jump() {
        this.speedY = 20;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof Chicken || this instanceof Boss) {
            return true;
        } else {
            return this.y < 145;
        }
    }

    moveLeft() {
        setInterval(() => {
            if (this.x > -490) {
                this.x -= 1;
            } else {
                this.x += canvas.width + 490;
            }
        }, 20);
    }

    isColliding(mo) {
        if (mo instanceof CollactableObject) {
            return this.x - 80 + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        } else if (mo instanceof ThrowableObject) {
            return this.x + this.width > mo.x &&
                this.y + this.height - 50 > mo.y &&
                this.x < mo.x &&
                this.y + 50 < mo.y + mo.height;
        } else {
            return this.x - 30 + this.width > mo.x  &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }
    }

    kill(mo) {
        mo.energy -= 101;
        console.log('hit! left: ' + mo.energy + 'HP');
        if (mo.energy < 0) {
            mo.energy = 0;
            this.flatenChicks(mo)
        } else {
            mo.lastHit = new Date().getTime();
            console.log('last Hit' + mo.lastHit)
        }
    }

    killBottle() {
        this.applyGravity();
        setTimeout(() => {
            if (Array.isArray(world.enemies)) {
                const index = world.enemies.indexOf(this);
                if (index > -1) {
                    world.enemies.splice(index, 1);
                }
            }
        }, 2000);
    }

    bottleHit() {
        this.energy -= 50;
        console.log('Bottle Hit!' + this.energy + 'HP')
        if (this.energy < 0) {
            this.killBottle();
        }
    }

    hit() {
        this.energy -= 1;
        console.log('hit! left: ' + this.energy + 'HP');
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    gameEndOver() {
        if (!this.gameOver) {
            this.gameOver = true;
            world.level.overlayObjects.push(new Overlay('../img/9_intro_outro_screens/game_over/you lost.png', 0, -10, canvas.width, canvas.height + 10, true));
            world.clearWorld();
            const interval = setInterval(() => {
                if (keyboard.CLICK) {
                    world.level.overlayObjects = [];
                    initWorld();
                    clearInterval(interval)
                }
            }, 25);
        }
    }

    flatenChicks(mo) {
        mo.height = 20;
        mo.y += 80
        setTimeout(() => {
            mo.applyGravity();
        }, 100);
    }

    collect(type) {
        if (type === 'bottle') {
            this.bottles += 2;
            console.log('collected! left: ' + this.bottles + 'Bottles');
        } else if (type === 'coin') {
            this.coins += 1;
            console.log('Collected Coin!' + this.coins + 'Coins')
        }
    }

    hurted() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.2
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {

    }

}