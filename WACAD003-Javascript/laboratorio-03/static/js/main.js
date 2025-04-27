const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const changeQuatityInput = document.querySelector("#changeBallsQuantityInput");
const changeQuatityButton = document.querySelector("#changeBallsQuantityButton");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let balls = [];
let squares = [];
let changeColorInput = document.querySelector("#changeBallsColorInput");

changeQuatityInput.value = 25;
initialColor = "#2b5bca";
changeColorInput.value = initialColor;
console.log('color_begin: ', changeColorInput.value);

// generate random number
function random(min, max) {
  console.log(Math.floor(Math.random() * (max - min + 1)) + min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// generate variantion of a color
function randomColor(hexColor) {
  variationRange = 50;
  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  const newR = Math.min(255, Math.max(0, r + random(-variationRange, variationRange)));
  const newG = Math.min(255, Math.max(0, g + random(-variationRange, variationRange)));
  const newB = Math.min(255, Math.max(0, b + random(-variationRange, variationRange)));

  const newHexColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

  return newHexColor;
}

// creating balls
function createBalls() {
  while (balls.length < changeQuatityInput.value) {
    let size = random(10, 20);
    let ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(changeColorInput.value),
      size,
    );
    balls.push(ball);
  }
}

// creating squares
function createSquares() {
  while (squares.length < changeQuatityInput.value) {
    let size = random(10, 20);
    let square = new Square(
      // random(0 + size, width - size),
      // random(0 + size, height - size),
      // random(0 + size, width - size),
      // random(0 + size, height - size),
      // random(0 + size, width - size),
      // random(0 + size, height - size),
      100,
      100,
      150,
      50,
      200,
      100,
      random(-7, 7),
      random(-7, 7),
      randomColor(changeColorInput.value),
      size,
    );
    squares.push(square);
  }
}

// loop square game
function loop2() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < squares.length; i++) {
    squares[i].draw();
    squares[i].update();
    // squares[i].collisionDetect();
  }

  requestAnimationFrame(loop2);
}

// loop ball game
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

// reset balls quantity
function resetBalls() {
  balls = [];
}

// square constructor
class Square {
  constructor(x1, y1, x2, y2, x3, y3, velX, velY, color, size) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    if (this.x1 + this.size >= width) {
      this.velX = -(this.velX);
    }

    if (this.x1 - this.size <= 0) {
      this.velX = -(this.velX);
    }

    if (this.y1 + this.size >= height) {
      this.velY = -(this.velY);
    }

    if (this.y1 - this.size <= 0) {
      this.velY = -(this.velY);
    }

    if (this.x2 + this.size >= width) {
      this.velX = -(this.velX);
    }

    if (this.x2 - this.size <= 0) {
      this.velX = -(this.velX);
    }

    if (this.y2 + this.size >= height) {
      this.velY = -(this.velY);
    }

    if (this.y2 - this.size <= 0) {
      this.velY = -(this.velY);
    }

    if (this.x3 + this.size >= width) {
      this.velX = -(this.velX);
    }

    if (this.x3 - this.size <= 0) {
      this.velX = -(this.velX);
    }

    if (this.y3 + this.size >= height) {
      this.velY = -(this.velY);
    }

    if (this.y3 - this.size <= 0) {
      this.velY = -(this.velY);
    }

    this.x1 += this.velX;
    this.y1 += this.velY;
    this.x2 += this.velX;
    this.y2 += this.velY;
    this.x3 += this.velX;
    this.y3 += this.velY;
  }
    
}

// ball constructor
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }  

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = -(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }
  
  collisionDetect() {
    // console.log('color_colision: ', changeColorInput.value);
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = randomColor(changeColorInput.value);
        }
      }
    }
  };
}

// createBalls();
// loop();

createSquares();
loop2();

changeColorInput.addEventListener("input", () => {
  console.log('color_changeColorInput: ', changeColorInput.value);
  resetBalls();
  createBalls();
});

changeQuatityButton.addEventListener("click", () => {
  console.log('color_changeQuatityButton: ', changeColorInput.value);
  resetBalls();
  createBalls();  
});