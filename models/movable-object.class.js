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
        if(this instanceof ThrowableObject) {
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
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
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