class DrawableObject {
    img;
    height;
    width;
    x = 120;
    y = 280;
    imageCache = [];

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
        if (this instanceof Character || this instanceof Boss || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height)
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
}