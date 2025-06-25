class Cloud extends MovableObject {
    height = 300;
    width = 500;
    x = 200;
    y = 50;

    constructor(xNew) {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.xCalc = 250 + xNew; 
        this.x = Math.random() * this.xCalc;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.x > -490) {
                this.x -= 0.1;
            } else {
                try {
                this.x += level1.levelEndX + 1500;
                } catch {

                }
            }
        }, 20);
    }
}



