class Boss extends MovableObject {
    height = 370;
    width = 275;
    x = 2000;
    y = 105;

    imagesWalk = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this-this.loadImages(this.imagesWalk)
        this.animate();
    }

    jump() {

    }
    moveLeft() {
        this.direction = 1; // 1 for right, -1 for left
        setInterval(() => {
            if (this.direction === 1) {
                this.x += 4;
                if (this.x >= 2000) {
                    this.direction = -1;
                }
            } else {
                this.x -= 4;
                if (this.x <= 2000 - 350) {
                    this.direction = 1;
                }
            }
        }, 20);
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
        this.playAnimation(this.imagesWalk);
    }, 200)
}
}