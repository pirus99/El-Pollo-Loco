class Character extends MovableObject {
    height = 300;
    width = 175;
    x = 0;
    y = 130;

    imagesIdle = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    imagesWalk = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    imagesJump = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ];
    imagesHurt = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];
    imagesDead = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
    ];

    currentImage = 0;



    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.animateIdle();
        this.animateMovement();
        this.applyGravity();
    }

    animateMovement() {
        this.loadImages(this.imagesWalk)
        this.loadImages(this.imagesJump)
        this.loadImages(this.imagesDead)
        this.loadImages(this.imagesHurt)

        const cameraMarginLeft = 40;
        const cameraMarginRight = 300;

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
                this.deadRun++;
                if (this.deadRun > 80) {
                    this.gameEndOver();
                }
            } else {
                this.movementLeft();
                this.movementRight();
                this.movementLeftFast();
                this.movementRightFast();
                this.animateHurt();
                this.movementJump();
            }
            let charScreenX = this.x + this.world.camera_x;
            if (charScreenX < cameraMarginLeft) {
                this.world.camera_x = -this.x + cameraMarginLeft;
            } else if (charScreenX > cameraMarginRight) {
                this.world.camera_x = -this.x + cameraMarginRight;
            }
        }, 25)
    }

    movementJump() {
        if (keyboard.SPACE) {
            this.jump();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.imagesJump);
        }
    }


    movementLeft() {
        if (keyboard.RIGHT && !keyboard.SHIFT && this.x < world.level.levelEndX) {
            this.x += 10;
            this.playAnimation(this.imagesWalk);
            this.otherDirection = false;
        }
    }

    movementRight() {
        if (keyboard.LEFT && !keyboard.SHIFT && this.x > 0) {
            this.x -= 10;
            this.playAnimation(this.imagesWalk);
            this.otherDirection = true;
        }
    }

    movementLeftFast() {
        if (keyboard.RIGHT && keyboard.SHIFT && this.x < world.level.levelEndX) {
            this.x += 20;
            this.playAnimation(this.imagesWalk);
            this.otherDirection = false;
        }
    }

    movementRightFast() {
        if (keyboard.LEFT && keyboard.SHIFT && this.x > 10) {
            this.x -= 20;
            this.playAnimation(this.imagesWalk);
            this.otherDirection = true;
        }
    }

    animateHurt() {
        setInterval(() => {
            if (this.hurted()) {
                this.playAnimation(this.imagesHurt);
            }
        }, 200)
    }

    animateIdle() {
        this.loadImages(this.imagesIdle)
        setInterval(() => {
            if (!keyboard.KEYPRESS) {
                this.playAnimation(this.imagesIdle);
            }
        }, 200)
    }
}
