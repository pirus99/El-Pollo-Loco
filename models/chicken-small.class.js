class ChickenSmall extends Chicken {
    energy = 50;

   imagesWalk = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

   constructor(x, speed) {
       super(x, speed);
       this.loadImages(this.imagesWalk);
       this.preloadSounds(['./../sound/chicken-cluking-3.mp3'])
   }
} 