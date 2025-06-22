class MovableObject extends DrawableObject {
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY >= 20){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 15)

    }

    jump() {
        this.speedY = 20;
    }

    isAboveGround() {
        if(this instanceof ThrowableObject || this instanceof Chicken) {
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
        if (mo instanceof CollactableObject){
        return  this.x - 80 + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        } else {
        return  this.x - 30 + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }
    }

    kill(mo) {
        mo.energy -= 101;
        console.log('hit! left: ' + mo.energy + 'HP');
        if(mo.energy < 0) {
            mo.energy = 0;
            this.flatenChicks(mo)
        } else {
            mo.lastHit = new Date().getTime();
            console.log('last Hit' + mo.lastHit)
        }
    }

    hit() {
        this.energy -= .1;
        console.log('hit! left: ' + this.energy + 'HP');
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    flatenChicks(mo) {
        mo.height = 20;
        mo.y += 80 


        setTimeout(() => {
           mo.applyGravity();
        }, 200);
    }

    collect(type) {
        if(type === 'bottle') {
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