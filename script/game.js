window.addEventListener('keydown', (e) => {
    /* console.log('Key pressed:', e); */
    if (e.key == 'D' || e.key == 'd' || e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
        keyboard.KEYPRESS = true;
    } else if (e.key == 'A' || e.key == 'a' || e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
        keyboard.KEYPRESS = true;
    } else if (e.key == 'W' || e.key == 'w' || e.key == 'ArrowUp') {
        keyboard.UP = true;
        keyboard.KEYPRESS = true;
    } else if (e.key == 'S' || e.key == 's' || e.key == 'ArrowDown') {
        keyboard.DOWN = true;
        keyboard.KEYPRESS = true;
    } else if (e.key == ' ' || e.key == 'Space') {
        if(keyboard.JUMP == false){
        keyboard.SPACE = true;
        keyboard.KEYPRESS = true;
        keyboard.JUMP = true;
        } else {
            keyboard.SPACE = false;
        }
    } else if (e.key == 'Shift') {
        keyboard.SHIFT = true;
        keyboard.KEYPRESS = true;
    } else if (e.key == 'G' || e.key == 'g' || e.key == '0') {
        keyboard.GRENADE = true;
        keyboard.KEYPRESS = true;
    } else if (e.key == 'Enter') {
        keyboard.ENTER = true;
        keyboard.KEYPRESS = true;
    } else if (e.key) {
        keyboard.KEYPRESS = true;
    }

    console.log(keyboard);
});

window.addEventListener('click', (e) => {
    if (e) {
        keyboard.CLICK = true;
        keyboard.KEYPRESS = true;
        const to = setTimeout(() => {
            keyboard.KEYPRESS = false;
            keyboard.CLICK = false;
            clearTimeout(to)
        }, 100);
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key == 'D' || e.key == 'd' || e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == 'A' || e.key == 'a' || e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == 'W' || e.key == 'w' || e.key == 'ArrowUp') {
        keyboard.UP = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == 'S' || e.key == 's' || e.key == 'ArrowDown') {
        keyboard.DOWN = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == ' ' || e.key == ' ' || e.key == 'Space') {
        keyboard.SPACE = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == 'Shift') {
        keyboard.SHIFT = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == 'G' || e.key == 'g' || e.key == '0') {
        keyboard.GRENADE = false;
        keyboard.KEYPRESS = false;
    } else if (e.key == 'Enter') {
        keyboard.ENTER = false;
        keyboard.KEYPRESS = false;
    } else if (e.key) {
        keyboard.KEYPRESS = false;
    }

});

function getRandomNumber(min, max) {
    // Ensure min is always less than or equal to max
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}






