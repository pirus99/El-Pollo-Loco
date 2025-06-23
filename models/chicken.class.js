class Chicken extends MovableObject {
    factor = getRandomNumber(90, 110);
    chickenFactor = getRandomNumber(75, 150);
    height = 99 * this.factor / 100;
    width = 77 * this.factor / 100;
    y = getRandomNumber(338, 345);
    stop;

    imagesWalk = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;

    constructor(x, speed) {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.x = x * (Math.random() / 2 + 0.5 * 2);
        this-this.loadImages(this.imagesWalk)
        this.animate(speed);
    }

    moveLeft(speed) {
        setInterval(() => {
            if (!this.stop) {
            if (this.x > -490) {
                this.x -= speed * this.chickenFactor / 100;
            } else {
                this.x += level1.levelEndX + 1500;
            }
        }
        }, 20);
    }

    animate(speed) {
        this.moveLeft(speed);
        setInterval(() => {
        if (!this.stop) {
        this.playAnimation(this.imagesWalk);
        }
    }, 100)
    }
}