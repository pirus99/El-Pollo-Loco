class SplashObject extends DrawableObject {
    x;
    y;

    imagesSplash = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  currentImage = 0;

  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.animateSplash();
  }

animateSplash() {
    this.loadImages(this.imagesSplash);
    let repeatCount = 0;
    const maxRepeats = 6;
    const playOnce = () => {
        this.playAnimation(this.imagesSplash);
        repeatCount++;
        if (repeatCount < maxRepeats) {
            setTimeout(playOnce, this.imagesSplash.length * 10);
        } else {
                world.cleanup = true;
        }
    };
    playOnce();
}
}

