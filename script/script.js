let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    initStart();
}

function initStart() {
    world = new Startscreen(canvas, keyboard, '../img/9_intro_outro_screens/start/startscreen_1.png');
}


function initWorld() {
    world = new World(canvas, keyboard);
}



