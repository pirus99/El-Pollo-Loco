class Chicken extends MovableObject {
    factor = getRandomNumber(90, 110);
    chickenFactor = getRandomNumber(75, 150);
    height = 99 * this.factor/100;
    width = 77 * this.factor/100;
    x = 460 * (Math.random()/2+0.5*2);
    y = getRandomNumber(338, 345);
    speedX;
    speedY;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.animate();
    }

    jump() {

    }

    animate() {
        setInterval(() => {
            if (this.x > -490) {
                this.x -= 1 * this.chickenFactor/100;
            } else {
                this.x += canvas.width + 490;
            }
        }, 20);
    }

}