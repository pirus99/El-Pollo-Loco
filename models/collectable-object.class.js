class CollactableObject extends MovableObject {
        constructor(img, x, y){
        super();
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.loadImage(img)
    }
}