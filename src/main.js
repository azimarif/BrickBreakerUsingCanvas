let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');

const brickWidth = 30;
const brickHeight = 8;
const brickMargin = 7;
const brickTopMargin = 3;
const numberOfBricksPerRow = 8;
const numberOfBricksRow = 5;

let ballXPosition = gameCanvas.width / 2;
let ballYPosition = gameCanvas.height - 30;
let ballDx = 3;
let ballDy = -3;
const ballRadius = 5;
let bricks = [];

const peddleWidth = 60;
const peddleHeight = 15;
let peddleXPosition = (gameCanvas.width - peddleWidth) / 2;

const createBricks = function () {
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

const drawBricks = function () {
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

const drawBall = function () {
  gameContext.beginPath();
  gameContext.arc(ballXPosition, ballYPosition, ballRadius, 0, Math.PI * 2);
  gameContext.fillStyle = "green";
  gameContext.fill();
  gameContext.closePath();
}

const drawPeddle = function () {
  gameContext.beginPath();
  gameContext.rect(peddleXPosition, gameCanvas.height - peddleHeight, peddleWidth, peddleHeight);
  gameContext.fillStyle = "brown";
  gameContext.fill();
  gameContext.closePath();
}

const isHitSideWall = function () {
  return ballXPosition > gameCanvas.width || ballXPosition < ballRadius;
}

const isHitTopWall = function () {
  return ballYPosition < ballRadius;
}

const isHitBottom = function () {
  return ballYPosition > gameCanvas.height - ballRadius;
}

const draw = function () {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  createBricks();
  drawBricks();
  drawBall();
  drawPeddle();

  ballXPosition = ballXPosition + ballDx;
  ballYPosition = ballYPosition + ballDy;

  if (isHitSideWall()) {
    ballDx = -ballDx;
  }

  if (isHitTopWall() || isHitBottom()) {
    ballDy = -ballDy;
  }
}

setInterval(draw, 100);