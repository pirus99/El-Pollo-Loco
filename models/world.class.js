class World {
    level = level1
    character = new Character();
    statusbar = new StatusBar();
    statusbarBottle = new BottleStatusbar();
    statusbarCoin = new CoinStatusbar();
    enemies = this.level.enemies;
    clouds = this.level.clouds;
    backgroundObjects = this.level.backgroundObjects;
    throwableObjects = this.level.throwableObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = - 100;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run()
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.CheckCollisions();
            this.grenade();
            
        }, 100);
    }

    CheckCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
        }
    })
}


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);+

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds); 


        this.ctx.translate(- this.camera_x, 0)
        this.addObjectsToMap([this.statusbar]);
        this.addObjectsToMap([this.statusbarBottle]);
        this.addObjectsToMap([this.statusbarCoin]);
        this.ctx.translate( this.camera_x, 0)

        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(- this.camera_x, 0)

        let self = this; 
        requestAnimationFrame(() => self.draw());
    }

    grenade() {
        if(keyboard.GRENADE) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle)     
        } 
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0)
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.drawCTX(this.ctx)
        /* mo.drawFrame(this.ctx); */ //Rahmen um objekte einblenden
        if(mo.otherDirection) {
            this.ctx.restore();   
            mo.x = mo.x * -1; 
        }
    }

}