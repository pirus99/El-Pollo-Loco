let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    initStart();
}

function initStart() {
    world = new Startscreen(canvas, keyboard);
}

function initWorld() {
    world = 0;
    world = new World(canvas, keyboard);
}

