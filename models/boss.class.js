class Boss extends MovableObject {
    height = 370;
    width = 275;
    x = 2000;
    y = 105;
    energy = 250;

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

    constructor(x, y) {
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = x;
        this.xVal = x;
        this.y = y;
        this - this.loadImages(this.imagesWalk)
        this.animate();
    }

    jump() {

    }

    moveLeft() {
        this.direction = 1; // 1 for right, -1 for left
        setInterval(() => {
            if (this.x < world.character.x) {
                this.direction = 1;
            } else {
                this.direction = -1;
            }

            if (this.direction === 1) {
                this.x += 4;
                if (this.x >= this.xVal || this.x + this.width < world.character.x) {
                    this.direction = -1;
                    this.otherDirection = false;
                }
            } else {
                this.x -= 4;
                if (this.x <= this.xVal - 350 && !(this.x - 350 <= world.character.x)) {
                    this.direction = 1;
                    this.otherDirection = true;
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