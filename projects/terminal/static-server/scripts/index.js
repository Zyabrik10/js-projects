let canvas, ctx;

const pi = Math.PI;
const pi2 = pi * 2;
const floor = Math.floor;
const random = Math.random;
const sqrt = Math.sqrt;
const pow = Math.pow;

const randInt = (min, max) => floor(random() * (max - min + 1) + min);
const randFloat = (min, max) => random() * (max - min + 1) + min;
const getDist = (a, b) => sqrt(pow(a.x - b.x, 2) + pow(a.y - b.y, 2));

let balls;
const radius = 200;

const mouse = {
  x: undefined,
  y: undefined,
};

class Ball {
  constructor({ coor, rad, vel }) {
    this.coor = coor;
    this.rad = rad;
    this.vel = vel;
    this.defaultSize = rad;
    this.maxSize = rad * 10;
    this.boostSize = 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.coor.x, this.coor.y, this.rad, 0, pi * 2);
    ctx.fillStyle = `hsl(${this.coor.x * (360 / canvas.width)}, 80%, 50%)`;
    ctx.fill();
  }

  move() {
    this.coor.x += this.vel.x;
    this.coor.y += this.vel.y;

    if (this.coor.x + this.rad < -this.rad * 2) {
      this.coor.x = canvas.width + this.rad;
    } else if (this.coor.x - this.rad > canvas.width + this.rad * 2) {
      this.coor.x = -this.rad;
    }

    if (this.coor.y + this.rad < -this.rad * 2) {
      this.coor.y = canvas.height + this.rad;
    } else if (this.coor.y - this.rad > canvas.height + this.rad * 2) {
      this.coor.y = -this.rad;
    }
  }

  update() {
    this.move();
    this.draw();
  }
}

function init() {
  balls = [];
  let ballsNumber = floor(canvas.width / 2.25);

  for (let i = 0; i < ballsNumber; i++) {
    const rad = randFloat(3, 15);

    const ballConfig = {
      rad,
      coor: {
        x: randFloat(rad, canvas.width - rad),
        y: randFloat(rad, canvas.height - rad),
      },
      vel: {
        x: randFloat(-2, 2),
        y: randFloat(-2, 2),
      },
    };

    balls.push(new Ball(ballConfig));
  }
}

function animate() {
  balls.forEach((ball) => {
    let inside = false;
    
    if (getDist(ball.coor, mouse) <= radius) {
      inside = true;
    }

    if (inside && ball.rad + ball.boostSize <= ball.maxSize) {
      ball.rad += ball.boostSize;
    } else if (!inside && ball.rad - ball.boostSize >= ball.defaultSize) {
      ball.rad -= ball.boostSize * 0.3;
    }

    ball.update();
  });
}

function update() {
  ctx.fillStyle = "rgb(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  animate();
  requestAnimationFrame(update);
}

window.addEventListener("load", () => {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
  update();

  canvas.addEventListener("mousemove", ({ offsetX: x, offsetY: y }) => {
    mouse.x = x;
    mouse.y = y;
  });
});

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});