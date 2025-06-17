class MovableObject {
    img;
    height;
    width;
    imageCache = [];
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    applyGravity() {
        setInterval(() => {
            if(this.y < 145 || this.speedY >= 20){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 15)

    }

    jump() {
        this.speedY = 20;
    }

    isAboveGround() {
        return this.y < 145;
        }

    loadImages(array) {
        array.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
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

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Boss || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {

    }

}