function createLevel1() {
    return new Level(
    [
        /* new Chicken(500, 1),
        new Chicken(700, 1),
        new Chicken(900, 3), 
        new ChickenSmall(500, 1), */
        new Boss(2000, 105),
    ],
    [
        new Cloud(77),
        new Cloud(77 * 10),
        new Cloud(77 * 18),
        new Cloud(77 * 26)
    ],
    [
        new SuperBackgroundObject('../img/5_background/layers/air.png', -40),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', -40),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', -40),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', -40),
        new SuperBackgroundObject('../img/5_background/layers/air.png', 1083),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 1083),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 1083),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 1083),
        new SuperBackgroundObject('../img/5_background/layers/air.png', 1083 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 1083 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 1083 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 1083 * 2),
    ],
    [
        new CollactableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350 * getRandomNumber(85, 115)/100, 340),
        new CollactableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350 * 1.5 * getRandomNumber(85, 115)/100, 340),
        new CollactableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350 * 2 * getRandomNumber(85, 115)/100, 340),
        new CollactableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350 * 2.7 * getRandomNumber(85, 115)/100, 340),
        new CollactableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350 * 3.4 * getRandomNumber(85, 115)/100, 340),
        new CollactableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350 * 3.8 * getRandomNumber(85, 115)/100, 340), 
        new CollactableObject('../img/6_salsa_bottle/salsa_bottle.png', 350 * 4.2 * getRandomNumber(85, 115)/100, 340), 
        new CollactableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350 * 5.4 * getRandomNumber(85, 115)/100, 340), 
        new CollactableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350 * 6.2 * getRandomNumber(85, 115)/100, 340), 
    ],
    [
        new CollactableObject('../img/8_coin/coin_1.png', 320 * getRandomNumber(85, 115)/100, 280),
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 1.5 * getRandomNumber(85, 115)/100, 280),
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 2 * getRandomNumber(85, 115)/100, 280),
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 2.7 * getRandomNumber(85, 115)/100, 280),
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 3.4 * getRandomNumber(85, 115)/100, 280),
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 3.8 * getRandomNumber(85, 115)/100, 280), 
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 4.2 * getRandomNumber(85, 115)/100, 280), 
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 5.4 * getRandomNumber(85, 115)/100, 280), 
        new CollactableObject('../img/8_coin/coin_1.png', 320 * 6.2 * getRandomNumber(85, 115)/100, 280),
    ],
    2200 //LevelEndX
)
}