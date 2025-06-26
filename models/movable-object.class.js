class MovableObject extends DrawableObject {
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    deadRun = 0;
    audio;
    audioFiles = [];
    k = 3000;
    lastHit;
    plays = 0;
    playIndex = -1;

    applyGravity(force) {
        const aniInterval = setInterval(() => {
            if (this instanceof Character && !this.isAboveGround()) {
                keyboard.JUMP = false;
            }
            if (this.isAboveGround() || this.speedY >= 20 || force) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this instanceof Character) {
                    keyboard.JUMP = true;
                }
            }
            if (world.animate == false) {
                clearInterval(aniInterval);
            }
        }, 15)

    }

    jump() {
        this.speedY = 20;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof Chicken || this instanceof Boss) {
            return true;
        } else {
            return this.y < 145;
        }
    }

    moveLeft() {
        setInterval(() => {
            if (this.x > -490) {
                this.x -= 1;
            } else {
                this.x += canvas.width + 490;
            }
        }, 20);
    }

    isColliding(mo) {
        if (mo instanceof CollactableObject) {
            return this.x - 80 + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        } else if (mo instanceof ThrowableObject) {
            return this.x + this.width > mo.x &&
                this.y + this.height - 50 > mo.y &&
                this.x < mo.x &&
                this.y + 50 < mo.y + mo.height;
        } else if (mo instanceof Boss) {
            return this.x + 5 + this.width > mo.x + 50 &&
                this.y + this.height > mo.y &&
                this.x + 5 < mo.x + 50 &&
                this.y < mo.y + mo.height;
        } else {
            return this.x - 30 + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }
    }

    kill(mo) {
        mo.energy -= 101;
        console.log('hit! left: ' + mo.energy + 'HP');
        if (mo.energy < 0) {
            mo.energy = 0;
            this.flatenChicks(mo)
        } else {
            mo.lastHit = new Date().getTime();
            console.log('last Hit' + mo.lastHit)
        }
    }

    killBottle() {
        this.applyGravity();
        setTimeout(() => {
            if (Array.isArray(world.enemies)) {
                const index = world.enemies.indexOf(this);
                if (index > -1) {
                    world.enemies.splice(index, 1);
                }
            }
        }, 2000);
    }

    bottleHit() {
        this.energy -= 50;
        console.log('Bottle Hit!' + this.energy + 'HP')
        this.lastHit = new Date().getTime();
        if (this.energy < 0) {
            this.killBottle();
        }
    }

    hit() {
        this.energy -= 1;
        console.log('hit! left: ' + this.energy + 'HP');
        this.lastHit = new Date().getTime();
        if (this.energy < 0) {
            this.energy = 0;
        } 
    }

    gameEndOver() {
        if (!this.gameOver) {
            this.gameOver = true;
            world.level.overlayObjects.push(new Overlay('../img/9_intro_outro_screens/game_over/you lost.png', 0, -10, canvas.width, canvas.height + 10, true));
            world.clearWorld();
            const interval = setInterval(() => {
                if (keyboard.CLICK) {
                    keyboard.KEYPRESS = false;
                    world.level.overlayObjects = [];
                    initStart();
                    clearInterval(interval)
                }
            }, 25);
        }
    }

    flatenChicks(mo) {
        mo.height = 20;
        mo.y += 80
        setTimeout(() => {
            mo.applyGravity();
        }, 100);
    }

    collect(type) {
        if (type === 'bottle') {
            this.bottles += 2;
            console.log('collected! left: ' + this.bottles + 'Bottles');
        } else if (type === 'coin') {
            this.coins += 1;
            console.log('Collected Coin!' + this.coins + 'Coins')
        }
    }

    hurted() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.2
    }

    isDead() {
        return this.energy == 0;
    }


    /**
     * Preload an array of audio file URLs.
     * @param {string[]} sounds - Array of audio file URLs to preload.
     */
    preloadSounds(sounds) {
        for (let i = 0; i < sounds.length; i++) {
            const audio = new Audio(sounds[i]);
            audio.preload = 'auto';
            this.audioFiles[i] = audio;
        }
    }

    /**
     * Play a preloaded sound by index.
     * @param {number} index - Index of the audio in the preloaded array.
     * @param {number} volume - Volume level (0.0 to 1.0).
     * @param {number} duration - Duration to play the sound in seconds.
     * @param {boolean} single - if sound should be played single (true), or infinite often or x times (false)
     * @param {number} plays - How many times the sound can play.
     */
    playSound(index, volume = 1.0, duration = 1.0, times) {
        const audio = this.audioFiles[index];
        if (!audio) {
            console.log(`Audio at index ${index} not found.`);
            return;
        }

        // Clone the audio to allow overlapping playbacks
        if(!times) {
        const clone = audio.cloneNode();
        clone.volume = volume;
        clone.currentTime = 0;
        if (world.animate) {
            clone.play();
        }
        setTimeout(() => {
            clone.pause();
            clone.currentTime = 0;
        }, duration * 1000);
    }

        if(times > this.plays || this.playIndex != index) {
        const clone = audio.cloneNode();
        clone.volume = volume;
        clone.currentTime = 0;
        if (world.animate) {
            clone.play();
            this.plays += 1;
            this.playIndex = index;
        }
        setTimeout(() => {
            clone.pause();
            this.plays -= 1;
            this.playIndex = -1;
            clone.currentTime = 0;
        }, duration * 1000);
    }
    }

    moveRight() {

    }

}