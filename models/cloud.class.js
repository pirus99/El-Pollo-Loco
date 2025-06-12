class Cloud extends MovableObject {
    height = 300;
    width = 500;
    x = 200;
    y = 50;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 450;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.x > -490) {
                this.x -= 0.1;
            } else {
                this.x += canvas.width + 490;
            }
        }, 20);
    }
}



