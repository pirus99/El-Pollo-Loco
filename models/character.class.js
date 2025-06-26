/**
 * Represents a character class that extends the MovableObject class.
 */
class Character extends MovableObject {
    /**
     * Height of the character.
     * @type {number}
     */
    height = 300;

    /**
     * Width of the character.
     * @type {number}
     */
    width = 175;

    /**
     * X position of the character.
     * @type {number}
     */
    x = 0;

    /**
     * Y position of the character.
     * @type {number}
     */
    y = 130;

    idleTime;

    /**
     * Array of images for idle animations.
     * @type {string[]}
     */
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

    imagesLongIdle = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Array of images for walking animations.
     * @type {string[]}
     */
    imagesWalk = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of images for jumping animations.
     * @type {string[]}
     */
    imagesJump = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of images for hurt animations.
     * @type {string[]}
     */
    imagesHurt = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of images for dead animations.
     * @type {string[]}
     */
    imagesDead = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Current index of the animation image.
     * @type {number}
     */
    currentImage = 0;

    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.animateIdle();
        this.animateMovement();
        this.applyGravity();
        this.preloadSounds(['./../sound/jump-sound.mp3', './../sound/grrr.mp3', './../sound/ough.mp3', './../sound/life-lost.mp3'])
    }

    /**
     * Animates the character's movement.
     */
    animateMovement() {
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);

       const aniInterval = setInterval(() => {
            if (this.energy < 100 && this.energy > 2) {
                this.energy += 0.005;
            }
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
                this.deadRun++;
                this.playSound(3, 0.3, 2, 1)
                if (this.deadRun > 60) {
                    this.gameEndOver();
                    this.deadRun = 0;
                    clearInterval(aniInterval);
                }
            } else {
                this.movementLogic();
            }
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
            let charScreenX = this.x + this.world.camera_x;
            this.updateCameraPosition(charScreenX);
        }, 10);
    }

    /**
     * Handles movement logic.
     */
    movementLogic() {
        this.movementLeft();
        this.movementRight();
        this.movementLeftFast();
        this.movementRightFast();
        this.animateHurt();
        this.movementJump();
    }

    /**
     * Updates the camera position based on character's screen X position.
     * @param {number} charScreenX - The character's screen X position.
     */
    updateCameraPosition(charScreenX) {
        const cameraMarginLeft = 40;
        const cameraMarginRight = 240;

        if (charScreenX < cameraMarginLeft) {
            this.world.camera_x = -this.x + cameraMarginLeft;
        } else if (charScreenX > cameraMarginRight) {
            this.world.camera_x = -this.x + cameraMarginRight;
        }
    }

    /**
     * Moves the character to Sky.
     */
    movementJump() {
        if (keyboard.SPACE && !keyboard.JUMP) {
            this.playSound(0, 0.8, 2, 1)
            this.jump();
            this.idleTime = new Date().getTime();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.imagesJump);
            this.idleTime = new Date().getTime();
        }
    }

    /**
     * Moves the character left.
     */
    movementLeft() {
        if (keyboard.RIGHT && !keyboard.SHIFT && this.x < world.level.levelEndX) {
            this.x += 8;
            this.playAnimation(this.imagesWalk);
            this.idleTime = new Date().getTime();
            this.otherDirection = false;
        }
    }

    /**
     * Moves the character right.
     */
    movementRight() {
        if (keyboard.LEFT && !keyboard.SHIFT && this.x > 0) {
            this.x -= 8;
            this.playAnimation(this.imagesWalk);
            this.idleTime = new Date().getTime();
            this.otherDirection = true;
        }
    }

    /**
     * Moves the character left at a faster speed.
     */
    movementLeftFast() {
        if (keyboard.RIGHT && keyboard.SHIFT && this.x < world.level.levelEndX) {
            this.x += 16;
            this.playAnimation(this.imagesWalk);
            this.idleTime = new Date().getTime();
            this.otherDirection = false;
        }
    }

    /**
     * Moves the character right at a faster speed.
     */
    movementRightFast() {
        if (keyboard.LEFT && keyboard.SHIFT && this.x > 10) {
            this.x -= 16;
            this.playAnimation(this.imagesWalk);
            this.idleTime = new Date().getTime();
            this.otherDirection = true;
        }
    }

    /**
     * Animates the character's hurt state.
     */
    animateHurt() {
        const aniInterval = setInterval(() => {
            if (this.hurted()) {
                this.playAnimation(this.imagesHurt);
                this.idleTime = new Date().getTime();
                this.k++;
                    if (this.k >= 900) {
                    this.playSound(2, 0.3, 2, 3)
                    this.k = 0;
                    }
            }
            if(world.animate == false){
                clearInterval(aniInterval);
            }
        }, 200);
    }

    /**
     * Animates the character's idle state.
     */
    animateIdle() {
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        const aniInterval = setInterval(() => {
            if (!keyboard.KEYPRESS) {
                if (this.idleTime + 8500 <= new Date().getTime()){
                    this.playAnimation(this.imagesLongIdle);
                    this.k++;
                    if (this.k >= 15) {
                    this.playSound(1,0.08,3)
                    this.k = 0;
                    }
                } else {
                    this.playAnimation(this.imagesIdle);
                }
            }
            if (world.animate == false){
                clearInterval(aniInterval);
            }
        }, 200);
    }
}