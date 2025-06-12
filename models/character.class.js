class Character extends MovableObject {
    height = 300;
    width = 175;
    x = 120;
    y = 140;
    speedX;
    speedY;

    constructor(){
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
    }

    jump() {
        
    }
}
