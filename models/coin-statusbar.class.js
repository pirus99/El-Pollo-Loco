class CoinStatusbar extends StatusBar {
    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    ]

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 10;
        this.y = 100;
        this.height = 60;
        this.width = 170;
        this.setPercentage(0);
    }
}