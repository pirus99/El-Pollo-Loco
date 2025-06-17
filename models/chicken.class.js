class Chicken extends MovableObject {
    factor = getRandomNumber(90, 110);
    chickenFactor = getRandomNumber(75, 150);
    height = 99 * this.factor / 100;
    width = 77 * this.factor / 100;
    x = 460 * (Math.random() / 2 + 0.5 * 2);
    y = getRandomNumber(338, 345);
    speedX;
    speedY;

    imagesWalk = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this-this.loadImages(this.imagesWalk)
        this.animate();
    }

    moveLeft() {
        setInterval(() => {
            if (this.x > -490) {
                this.x -= 1 * this.chickenFactor / 100;
            } else {
                this.x += level1.levelEndX + 1500;
            }
        }, 20);
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
        this.playAnimation(this.imagesWalk);
    }, 100)
}
}