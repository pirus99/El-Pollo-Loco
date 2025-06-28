class Keyboard {
    KEYPRESS;
    LEFT;
    RIGHT;
    UP;
    DOWN;
    SPACE;
    SHIFT;
    GRENADE;
    ENTER;
    CLICK;
    JUMP;

    constructor() {
        this.bindBtsPressEvents();
    }

    bindBtsPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
            this.KEYPRESS = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
            this.KEYPRESS = false;
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
            this.KEYPRESS = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
            this.KEYPRESS = false;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
            this.KEYPRESS = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
            this.KEYPRESS = false;
        });
        document.getElementById('btnBottle').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.GRENADE = true;
            this.KEYPRESS = true;
        });
        document.getElementById('btnBottle').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.GRENADE = false;
            this.KEYPRESS = false;
        });
        document.getElementById('btnSprint').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SHIFT = true;
            this.KEYPRESS = true;
        });
        document.getElementById('btnSprint').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SHIFT = false;
            this.KEYPRESS = false;
        });
    }
}
