class Level {
    constructor(enemies, clouds, backgroundObjects, collectableObjects, collectableCoins, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;   
        this.collectableObjects = collectableObjects;
        this.collectableCoinObjects = collectableCoins;
        this.throwableObjects = [];
        this.splashObjects = [];
        this.overlayObjects = [];
        this.levelEndX = levelEndX;
    }
}