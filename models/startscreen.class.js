class Startscreen {
    ctx;
    keyboard;
    
    
    

    constructor(canvas, keyboard, img){
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.img = new Image();
        this.img.src = img;
        this.x = 0;
        this.y = 0;
        this.grxs = -540;
        this.grys = 50;
        this.grxe = 0;
        this.grye = 200;
        this.height = canvas.height;
        this.width = canvas.width;
        this.drawInterval;
        this.img.onload = () => {
            this.draw();
        };
        this.startGame();
        this.changeGradient();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawCTX();
    }

    changeGradient() {
        setInterval(() => {
            this.grxs = (this.grxs + 4) % canvas.width;
            this.grxe = (this.grxe + 4) % canvas.width;
        }, 20);
    }

    drawCTX() { 
        if (this.img.complete) {
            this.drawInterval = setInterval(() => {
                this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                let gradient = this.ctx.createLinearGradient(this.grxs, this.grys, this.grxe, this.grye);
                gradient.addColorStop(0, "#ffd60c");
                gradient.addColorStop(1, "#ff8a00");
                this.ctx.font = "50px Arial";
                this.ctx.fillStyle = gradient;
                this.ctx.fillText("Press any Key to Start", 100, 50);
            }, 20);
        }
    }

    startGame() {
        let intervalId = setInterval(() => {
            if(this.keyboard.KEYPRESS) {
                initWorld();
                clearInterval(this.drawInterval);
                clearInterval(intervalId); // End the interval
            }
        }, 25);
    }
    
}