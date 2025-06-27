class Chicken extends MovableObject {
    /**
     * @property {number} factor - A random number between 90 and 110.
     */
    factor = getRandomNumber(90, 110);
    
    /**
     * @property {number} chickenFactor - A random number between 75 and 150.
     */
    chickenFactor = getRandomNumber(75, 150);

    /**
     * @property {number} height - The height of the chicken, calculated based on the factor.
     */
    height = 99 * this.factor / 100;

    /**
     * @property {number} width - The width of the chicken, calculated based on the factor.
     */
    width = 77 * this.factor / 100;

    /**
     * @property {number} y - The initial y-coordinate for the chicken's position.
     */
    y = getRandomNumber(338, 345);

    /**
     * @property {boolean} stop - A flag to control whether the chicken should stop moving.
     */
    stop;

    /**
     * @property {string[]} imagesWalk - An array of image paths for the chicken's walking animation.
     */
    imagesWalk = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * @property {number} currentImage - The index of the current image in the walking animation.
     */
    currentImage = 0;

    constructor(x, speed) {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.x = x * (Math.random() / 2 + 0.5 * 2);
        this.loadImages(this.imagesWalk);
        this.animate(speed);
        this.preloadSounds(['./../sound/chicken-cluking-1.mp3'])
    }

    /**
     * Moves the chicken to the left at a given speed.
     * @param {number} speed - The speed at which the chicken moves.
     */
    moveLeft(speed) {
        const aniInterval = setInterval(() => {
            if (!this.stop) {
                if (this.x > -490) {
                    this.x -= speed * this.chickenFactor / 100;
                } else {
                    try {
                        this.x += world.level.levelEndX + 1500;
                    } catch {
                        world.animate = false;
                    }
                }
            }
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
        }, 20);
    }

    /**
     * Animates the chicken by moving it to the left and playing its walking animation.
     * @param {number} speed - The speed at which the chicken moves.
     */
    animate(speed) {
        this.moveLeft(speed);
         const aniInterval = setInterval(() => {
            if (!this.stop) {
                this.playAnimation(this.imagesWalk);
                this.k++;
                if (this.k >= 250) {
                    this.playSound(0, 0.1, 10, 1)
                    this.k = 0;
                }
            }
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
        }, 100)
    }
}