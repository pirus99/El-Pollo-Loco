class BottleStatusbar extends StatusBar {
    images = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    ]

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 10;
        this.y = 50;
        this.height = 60;
        this.width = 170;
        this.setPercentage(21);
    }
}