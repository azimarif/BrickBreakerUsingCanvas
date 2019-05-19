let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');

const brickWidth = 30;
const brickHeight = 5;
const brickHorizontalMargin = 7;
const brickVerticalMargin = 3;
const numberOfBricksPerRow = 8;
const numberOfBricksRow = 5;

let ballXPosition = gameCanvas.width / 2;
let ballYPosition = gameCanvas.height - 15;
let ballDx = 3;
let ballDy = -3;
const ballRadius = 5;
let bricks = [];

const peddleWidth = 60;
const peddleHeight = 10;
let peddleXPosition = (gameCanvas.width - peddleWidth) / 2;
let peddleDx = 0;
class Brick {
  constructor(x, y, status) {
    this.x = x;
    this.y = y;
    this.status = status;
  }
}

class Ball {
  constructor(ballRadius) {
    this.ballRadius = ballRadius;
  }
}

const createBricks = function () {
  for (let row = 0; row < numberOfBricksRow; row++) {
    for (let column = 0; column < numberOfBricksPerRow; column++) {
      let x = column * (brickWidth + brickHorizontalMargin) + brickHorizontalMargin;
      let y = row * (brickHeight + brickVerticalMargin) + brickVerticalMargin;
      bricks.push(new Brick(x, y, true));
    }
  }
};

const drawBricks = function () {
  bricks.forEach(brick => {
    if (brick.status) {
      gameContext.beginPath();
      gameContext.lineWidth = "2"
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
  return ballXPosition > gameCanvas.width - ballRadius || ballXPosition < ballRadius;
}

const isHitTopWall = function () {
  return ballYPosition < ballRadius;
}

const isHitBottom = function () {
  return ballYPosition > gameCanvas.height - ballRadius;
}

const isBallOverPeddle = function () {
  return ballXPosition > peddleXPosition && ballXPosition < peddleXPosition + peddleWidth;
}

const isHitPeddle = function () {
  return isBallOverPeddle() && isHitBottom();
}

const isGameOver = function () {
  return isHitBottom() && !isHitPeddle();
}

const validateBallPosition = function () {
  if (isHitSideWall()) {
    ballDx = -ballDx;
  }

  if (isHitTopWall() || isHitPeddle()) {
    ballDy = -ballDy;
  }

  if (isGameOver()) {
    window.location.reload();
  }
}
createBricks();

const breakBricks = function () {
  bricks.forEach((brick) => {
    if (brick.status) {
      let sameColumn = ballXPosition > brick.x && ballXPosition < brick.x + brickWidth;
      let sameRow = ballYPosition > brick.y && ballYPosition < brick.y + brickHeight;
      if (sameColumn && sameRow) {
        ballDy = -ballDy;
        brick.status = false;
      }
    }
  })
}

const draw = function () {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  drawBricks();
  drawBall();
  drawPeddle();
  breakBricks();
  ballXPosition = ballXPosition + ballDx;
  ballYPosition = ballYPosition + ballDy;

  validateBallPosition();
  function rightKeyPressed(e) {
    return e.keyCode == 39;
  }

  function leftKeyPressed(e) {
    return e.keyCode == 37;
  }
}

function keyDown(e) {
  if (e.keyCode == 37) {
    peddleXPosition = peddleXPosition - 7;
  }
  if (e.keyCode == 39) {
    peddleXPosition = peddleXPosition + 7;
  }
}
document.addEventListener('keydown', keyDown);


setInterval(draw, 50);