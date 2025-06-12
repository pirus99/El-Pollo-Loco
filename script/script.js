let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

}

function getRandomNumber(min, max) {
  // Ensure min is always less than or equal to max
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
