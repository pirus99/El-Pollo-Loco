class ThrowableObject extends MovableObject {
  imagesSpinning = [
    "../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  currentImage = 0;
  spinning = true;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.animateThrow();
    this.throw();
  }

  throw() {
    this.speedY = 12;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  animateThrow() {
      this.loadImages(this.imagesSpinning);
      setInterval(() => {
        this.playAnimation(this.imagesSpinning);
      }, 50);
  }
}
