class DrawableObject {
    img;
    height;
    width;
    x = 120;
    y = 280;
    imageCache = [];
    bottles = 10;
    coins = 0;
    plays = 0;
    playIndex = -1;
    audioFiles = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Boss || this instanceof Chicken || this instanceof ChickenSmall || this instanceof CollactableObject || this instanceof SplashObject || this instanceof Overlay) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + 25, this.y, this.width - 50, this.height)
        ctx.stroke();
        }
    }

    drawCTX(ctx) { 
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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
    playSound(index, volume = 0, duration = 1.0, times) {
        const audio = this.audioFiles[index];
        if (!audio) {
            console.log(`Audio at index ${index} not found.`);
            return;
        }

        // Clone the audio to allow overlapping playbacks
        if(!times) {
        const clone = audio.cloneNode();
        if (!mute) {
            clone.volume = 0;
        } else {
            clone.volume = volume;
        }
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
        if (!mute) {
            clone.volume = 0;
        } else {
            clone.volume = volume;
        }
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
}