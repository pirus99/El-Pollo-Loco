class BackgroundObject extends MovableObject {

    height = 400;
    width = 820;
    x = -80;
    y = 80;
    
    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}

class SuperBackgroundObject extends MovableObject {

    height = canvas.height;
    width = canvas.width;
    x = 0;
    y = 0;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}




