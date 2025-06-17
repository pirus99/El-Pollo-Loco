class ThrowableObject extends MovableObject {

    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.loadImage('../img/6_salsa_bottle/salsa_bottle.png')
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval( () => {
            this.x += 20;
        }, 25)
    }
}