class ChickenSmall extends Chicken {
    /**
     * @property {number} height - The height of the chicken, calculated based on the factor.
     */
    height = 88 * this.factor / 100;

    /**
     * @property {number} width - The width of the chicken, calculated based on the factor.
     */
    width = 66 * this.factor / 100;

    /**
     * @property {number} y - The initial y-coordinate for the chicken's position.
     */
    y = getRandomNumber(345, 355);

   imagesWalk = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

   constructor(x, speed) {
       super(x, speed);
       this.energy = 49;
       this.loadImages(this.imagesWalk);
       this.preloadSounds(['./../sound/chicken-cluking-3.mp3'])
   }
} 