class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ]
    backgroundObjects = [
        new SuperBackgroundObject('../img/5_background/layers/air.png'),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png'),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png'),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png'),
    ]

    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds); 
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);

        let self = this; 
        requestAnimationFrame(() => self.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}