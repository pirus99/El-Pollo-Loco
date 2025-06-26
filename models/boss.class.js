/**
 * Represents a boss enemy that extends the MovableObject class.
 * @extends MovableObject
 */
class Boss extends MovableObject {
    /**
     * Height of the boss.
     * @type {number}
     */
    height = 370;

    /**
     * Width of the boss.
     * @type {number}
     */
    width = 275;

    /**
     * Initial x position of the boss.
     * @type {number}
     */
    x = 2000;

    /**
     * Initial y position of the boss.
     * @type {number}
     */
    y = 105;

    /**
     * Energy level of the boss.
     * @type {number}
     */
    energy = 250;

    /**
     * Array of images for the boss's walking animation.
     * @type {string[]}
     */
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
        '../img/4_enemie_boss_chicken/1_walk/G3.png'
    ];

    imagesAttack = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    imagesHurt = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Current image index for the boss's walking animation.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Constructs a new Boss object with the specified x and y positions.
     * @param {number} x - Initial x position of the boss.
     * @param {number} y - Initial y position of the boss.
     */
    constructor(x, y) {
        super();
        this.loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = x;
        this.xVal = x;
        this.y = y;
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.animate();
        this.preloadSounds(['./../sound/chicken-screams.mp3'])
    }

    /**
     * Makes the boss jump. This method is currently empty and does nothing.
     */
    jump() {
    }

    /**
     * Moves the boss to the left, chasing the character or patrolling within a defined area.
     */
    moveLeft() {
        this.direction = -1;
        const aniInterval = setInterval(() => {
            const patrolLeft = this.xVal - 350;
            const patrolRight = this.xVal;
            this.updateFollowingState();
            if (this.following) {
                this.followCharacter();
            } else {
                this.patrolArea(patrolLeft, patrolRight);
            }
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
        }, 20);
    }

    /**
     * Updates the boss's following state based on the distance between itself and the character.
     */
    updateFollowingState() {
        const dist = Math.abs(this.x - world.character.x);
        if (dist <= 250) {
            this.following = true;
        } else if (dist > 500) {
            this.following = false;
        }
    }

    /**
     * Follows the character by moving left or right based on their positions.
     */
    followCharacter() {
        if (this.x < world.character.x) {
            this.x += 3;
            this.otherDirection = true;
        } else {
            this.x -= 3;
            this.otherDirection = false;
        }
    }

    /**
     * Patrols the area between two points by moving left or right.
     * @param {number} patrolLeft - The left boundary of the patrol area.
     * @param {number} patrolRight - The right boundary of the patrol area.
     */
    patrolArea(patrolLeft, patrolRight) {
        if (this.direction === 1) {
            this.x += 4;
            if (this.x >= patrolRight) {
                this.direction = -1;
                this.otherDirection = false;
            }
        } else {
            this.x -= 4;
            if (this.x <= patrolLeft) {
                this.direction = 1;
                this.otherDirection = true;
            }
        }
    }

    /**
     * Animates the boss by moving left and playing its walking animation.
     */
    animate() {
        this.moveLeft();
        const aniInterval = setInterval(() => {
            if (this.following) {
                this.playAnimation(this.imagesAttack)
                if (this.lastHit >= (new Date().getTime() - 1500)) {
                    this.playAnimation(this.imagesHurt);
                }
                this.k++;
                if (this.k >= 5) {
                    this.playSound(0, 0.2, 3)
                    this.k = 0;
                }
            } else if (this.lastHit >= (new Date().getTime() - 1500)) {
                this.playAnimation(this.imagesHurt);
            } else {
                this.playAnimation(this.imagesWalk);
            }
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
        }, 200)
    }

}