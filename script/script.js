let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = 0;
let mute = false;

    muteAll();

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

function about() {
    document.getElementById('aboutWrap').style.display = 'flex';
}

function legal() {
    document.getElementById('legalWrap').style.display = 'flex';
}

function closeModal() {
    document.getElementById('aboutWrap').style.display = 'none';
    document.getElementById('legalWrap').style.display = 'none';
}

function muteAll() {
    if (mute) {
        mute = false;
        document.getElementById('muteBtn').innerHTML = '&#128264';
    } else {
        mute = true;
        document.getElementById('muteBtn').innerHTML = '&#128263';
    }
}

function fullscreenToggle() {
    if (fullscreen == 1) {
        exitFullscreen();
    } else {
        enterFullscreen(canvasWrap)
    }
}

function enterFullscreen(element) {
    fullscreen = 1;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    fullscreen = 0;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function reset() {
    if (world.animate) {
        world.animate = false;
        world.character.gameEndOver();
    }
}

document.addEventListener('click', function (event) {
    const modalContent = document.getElementById('modalContent');
    const panelTop = document.getElementById('panelTop');
    const decBtn = document.getElementById('decBtn');

    if (!modalContent.contains(event.target) && !panelTop.contains(event.target) && !decBtn.contains(event.target)) {
        closeModal();
    }
});



