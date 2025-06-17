const level1 = new Level (
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Boss(),
    ],
    [
        new Cloud(77),
        new Cloud(77 * 10),
        new Cloud(77 * 18),
        new Cloud(77 * 28)
    ],
    [
        new SuperBackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 0),
        new SuperBackgroundObject('../img/5_background/layers/air.png', 1123),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 1123),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 1123),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 1123),
        new SuperBackgroundObject('../img/5_background/layers/air.png', 1123 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 1123 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 1123 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 1123 * 2),
    ],
    [
        new ThrowableObject(200, 200)
    ],
    2200
)