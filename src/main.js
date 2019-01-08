let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');

const brickWidth = 30;
const brickHeight = 8;
const brickMargin = 7;
const brickTopMargin = 3;
const numberOfBricksPerRow = 8;
const numberOfBricksRow = 5;
let bricks = [];

const createBricks = function() {
  for (let row = 0; row < numberOfBricksRow; row++) {
    for (let column = 0; column < numberOfBricksPerRow; column++) {
      bricks.push({
        x: column * (brickWidth + brickMargin) + brickMargin,
        y: row * (brickHeight + brickTopMargin) + brickTopMargin,
        status: 1
      });
    }
  }
};

const drawBricks = function() {
  bricks.forEach(brick => {
    if (brick.status) {
      gameContext.beginPath();
      gameContext.rect(brick.x, brick.y, brickWidth, brickHeight);
      gameContext.fillStyle = 'black';
      gameContext.fill();
      gameContext.closePath();
    }
  });
};

createBricks();
drawBricks();