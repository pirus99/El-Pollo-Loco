class Overlay extends DrawableObject {
    height = canvas.height;
    width = canvas.width;
    x = 0;
    y = 0;
            

    constructor(img, x, y, width, height, olBg) {
        super().loadImage(img)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.grxs = -400;
        this.grys = 50;
        this.grxe = 50;
        this.grye = 200;
        this.olBg = olBg;
        if(olBg) {
        this.changeGradient();
        }
    }

    changeGradient() {
        setInterval(() => {
            this.grxs = (this.grxs + 4) % canvas.width;
            this.grxe = (this.grxe + 4) % canvas.width;
        }, 20);
    }

    drawCTX(ctx) { 
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            if (this.olBg) {
                let gradient = ctx.createLinearGradient(this.grxs, this.grys, this.grxe, this.grye);
                    gradient.addColorStop(0, "#ffd60c");
                    gradient.addColorStop(1, "#ff8a00");
                    ctx.font = "40px Goblin";
                    ctx.fillStyle = gradient;
                    ctx.fillText("Click to Restart", 120, 390);
            }
    }

} 