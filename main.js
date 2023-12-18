// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let walls = [];
let rect = {
  x: 100,
  y: 300,
  h: 25,
  w: 25,
  speed: 5,
  color: "blue",
};
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
walls.push({ x: 500, y: 100, w: 20, h: 150 });
walls.push({ x: 200, y: 100, w: 150, h: 20 });
walls.push({ x: 100, y: 400, w: 20, h: 100 });
walls.push({ x: 400, y: 300, w: 200, h: 20 });
walls.push({ x: 0, y: 0, w: cnv.width, h: 25 });
walls.push({ x: 0, y: 0, w: 25, h: cnv.height });
walls.push({ x: 25, y: 575, w: cnv.width, h: 25 });
walls.push({ x: 775, y: 25, w: 25, h: cnv.height });

// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  if (leftPressed) {
    rect.x += -rect.speed;
  } else if (rightPressed) {
    rect.x += rect.speed;
  } else if (upPressed) {
    rect.y += -rect.speed;
  } else if (downPressed) {
    rect.y += rect.speed;
  }
  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // draw rect
  ctx.fillStyle = rect.color;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

  // Draw Walls
  ctx.fillStyle = "grey";
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  }
  checkCollsion();

  // Animation Loop
  requestAnimationFrame(draw);
}
// check collision
function checkCollsion() {
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    if (
      rect.x + rect.w >= wall.x &&
      rect.x <= wall.x + wall.w &&
      rect.y + rect.h >= wall.y &&
      rect.y <= wall.y + wall.h
    ) {
      rect.x = 100;
      rect.y = 300;
      console.log("colliding");
    }
  }
}

// Event stuff
document.addEventListener("keydown", eventDownHandler);
document.addEventListener("keyup", eventUpHandler);
function eventDownHandler(event) {
  if (event.code === "ArrowLeft" || event.code === "KeyA") {
    leftPressed = true;
  } else if (event.code === "ArrowRight" || event.code === "KeyD") {
    rightPressed = true;
  } else if (event.code === "ArrowUp" || event.code === "KeyW") {
    upPressed = true;
  } else if (event.code === "ArrowDown" || event.code === "KeyS") {
    downPressed = true;
  }
}
function eventUpHandler(event) {
  if (event.code === "ArrowLeft" || event.code === "KeyA") {
    leftPressed = false;
  } else if (event.code === "ArrowRight" || event.code === "KeyD") {
    rightPressed = false;
  } else if (event.code === "ArrowUp" || event.code === "KeyW") {
    upPressed = false;
  } else if (event.code === "ArrowDown" || event.code === "KeyS") {
    downPressed = false;
  }
}
