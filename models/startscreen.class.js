class Startscreen {
    ctx;
    keyboard;
    

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.img = new Image();
        this.img.src = '../img/9_intro_outro_screens/start/startscreen_1.png';
        this.x = 0;
        this.y = 0;
        this.height = canvas.height;
        this.width = canvas.width;
        this.img.onload = () => {
            this.draw();
        };
        this.startGame();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawCTX();
    }

    drawCTX() { 
        if (this.img.complete) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    startGame() {
        let intervalId = setInterval(() => {
            if(this.keyboard.KEYPRESS) {
                initWorld();
                clearInterval(intervalId); // End the interval
            }
        }, 25);
    }
    
}