const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const changeQuatityInput = document.querySelector("#changeQuantityInput");
const changeQuatityButton = document.querySelector("#changeQuantityButton");
const changeForm = document.querySelector("#form");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let objects = [];
let changeColorInput = document.querySelector("#changeColorInput");

changeQuatityInput.value = 25;
initialColor = "#2b5bca";
changeColorInput.value = initialColor;
// console.log('color_begin: ', changeColorInput.value);

// generate random number
function random(min, max) {
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
  while (objects.length < changeQuatityInput.value) {
    let size = random(10, 20);
    let ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(changeColorInput.value),
      size,
    );
    objects.push(ball);
  }
}

// creating triangles
function createTriangles() {
  while (objects.length < changeQuatityInput.value) {
    let size = random(10, 50);
    let x1 = random(0 + size, width - size);
    let y1 = random(0 + size, height - size);

    let x2 = x1 + size;
    let y2 = y1;

    let x3 = x1 + size / 2;
    let y3 = y1 - Math.sqrt(size ** 2 - (size / 2) ** 2);

    let triangle = new Triangle(
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      random(-7, 7),
      random(-7, 7),
      randomColor(changeColorInput.value),
      size
    );
    objects.push(triangle);
  }
}

// creating squares
function createSquares() {
  while (objects.length < changeQuatityInput.value) {
    let size = random(10, 50);
    let x1 = random(0 + size, width - size);
    let y1 = random(0 + size, height - size);

    let x2 = x1 + size;
    let y2 = y1;
    let x3 = x1;
    let y3 = y1 + size;
    let x4 = x2;
    let y4 = y3;

    let square = new Square(
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      x4,
      y4,
      random(-7, 7),
      random(-7, 7),
      randomColor(changeColorInput.value),
      size
    );
    objects.push(square);
  }
}

// creating objects
function createObjects() {
  switch (changeForm.value) {
    case "ball":
      createBalls();
      break;
    case "triangle":
      createTriangles();
      break;
    case "square":
      createSquares();
      break;
    default:
      break;
  }
}

// game loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < objects.length; i++) {
    objects[i].draw();
    objects[i].update();
    objects[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

// reset objects quantity
function resetObjects() {
  objects = []
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
    for (let j = 0; j < objects.length; j++) {
      if (!(this === objects[j])) {
        const dx = this.x - objects[j].x;
        const dy = this.y - objects[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.size + objects[j].size) {
          objects[j].color = this.color = randomColor(changeColorInput.value);
        }
      }
    }
  };
}

// triangle constructor
class Triangle {
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
    this.x1 += this.velX;
    this.y1 += this.velY;
    this.x2 += this.velX;
    this.y2 += this.velY;
    this.x3 += this.velX;
    this.y3 += this.velY;

    // checking for collision with canvas edges
    if (this.x1 + this.size >= width || this.x1 - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y1 + this.size >= height || this.y1 - this.size <= 0) {
      this.velY = -this.velY;
    }
  }

  collisionDetect() {
    for (let j = 0; j < objects.length; j++) {
      if (!(this === objects[j])) {
        const dx1 = this.x1 - objects[j].x1;
        const dy1 = this.y1 - objects[j].y1;
        const distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        if (distance < this.size + objects[j].size) {
          objects[j].color = this.color = randomColor(changeColorInput.value);
        }
      }
    }
  }
}

// square constructor
class Square {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4, velX, velY, color, size) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
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
    ctx.lineTo(this.x4, this.y4);
    ctx.lineTo(this.x3, this.y3);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x1 += this.velX;
    this.y1 += this.velY;
    this.x2 += this.velX;
    this.y2 += this.velY;
    this.x3 += this.velX;
    this.y3 += this.velY;
    this.x4 += this.velX;
    this.y4 += this.velY;
    
    // checking for collision with canvas edges
    if (this.x1 <= 0 || this.x2 >= width) this.velX = -this.velX;
    if (this.y1 <= 0 || this.y3 >= height) this.velY = -this.velY;
  }

  collisionDetect() {
    for (let j = 0; j < objects.length; j++) {
      if (!(this === objects[j])) {
        const dx = this.x1 - objects[j].x1;
        const dy = this.y1 - objects[j].y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + objects[j].size) {
          objects[j].color = this.color = randomColor(changeColorInput.value);
        }
      }
    }
  }
}

createObjects();
loop();

changeColorInput.addEventListener("input", () => {
  // console.log('color_changeColorInput: ', changeColorInput.value);
  // console.log('form_changeColorInput: ', changeForm.value);
  resetObjects();
  createObjects();
});

changeQuatityButton.addEventListener("click", () => {
  // console.log('color_changeQuatityButton: ', changeColorInput.value);
  // console.log('form_changeQuantityButton: ', changeForm.value);
  resetObjects();
  createObjects();
});

changeForm.addEventListener("click", () => {
  // console.log('color_changeForm: ', changeColorInput.value);
  // console.log('form_changeForm: ', changeForm.value);
  resetObjects();
  createObjects();
});