class BackgroundObject extends MovableObject {

    height = 400;
    width = 1124;
    x = 0;
    y = 80;
    
    constructor(imagePath, xNew) {
        super().loadImage(imagePath);
        this.x = xNew
    }
}

class SuperBackgroundObject extends MovableObject {

    height = canvas.height;
    width = 1124;
    x = 0;
    y = 0;

    constructor(imagePath, xNew) {
        super().loadImage(imagePath);
        this.x = xNew
    }
}




