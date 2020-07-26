/**
 *
 * @param {*} congig_obj
 * {
 * height:200,
 * width:400,
 * backGroundColor:white,
 * tilesColor:#000000
 * ballColor:#00000
 * }
 */
let bo_canvas = null;
let ctx = null;
let timer = null;
let bo_default_config = {
  height: 300,
  width: 600,
  backGroundColor: "#add8e6",
  tileColor: "#38aad0f2",
  ballColor: "#38aad0f2",
  textFont: "20px serif",
  textColor: "#ffffff",
  ballSpeed: 1,
};
const bo_level = [10, 10, 10];
let tile_x_gap = 8;
let tile_y_gap = 8;
let tile_width = 50;
let tile_height = 25;
let ini_tile_x = 10;
let ini_tile_y = 40;
let score_x = 10;
let score_y = 20;
let level_x = 500;
let level_y = 20;
let tile_x = ini_tile_x;
let tile_y = ini_tile_y;
let platForm_config = {
  x: 260,
  y: 265,
  w: 90,
  h: 10,
};
let ball_x = 300;
let ball_y = 200;
let ball_x_increment = 1;
let ball_y_increment = 1;
let ball_x_direction = 1;
let ball_y_direction = 1;
const ball_radius = 10;
function set_game(congig_obj = bo_default_config) {
  bo_default_config = congig_obj;
  bo_canvas = document.getElementById("bo-main-scene");
  ctx = bo_canvas.getContext("2d");
  bo_canvas.height = congig_obj.height;
  bo_canvas.width = congig_obj.width;
  bo_canvas.style.backgroundColor = congig_obj.backGroundColor;
  AddTile(...Object.values(platForm_config));
  AddBall(ball_x, ball_y);
  renderText("Score:", score_x, score_y);
  renderText("Level:", level_x, level_y);
  renderLevel();
  movePlateForm();
  moveBall();
}
function movePlateForm() {
  document.addEventListener("mousemove", function (e) {
    const mouse_x = e.clientX;
    if (
      mouse_x >= ini_tile_x &&
      mouse_x <= bo_default_config.width - ini_tile_x - platForm_config.w
    ) {
      canvasClear(...Object.values(platForm_config));
      platForm_config.x = mouse_x;
      AddTile(...Object.values(platForm_config));
    }
  });
}
/**
 *
 * @description {*} AddTile
 * this function will add a tile to canvas
 * will take 40px spacing from wall
 * each tile will have 5px spacing
 */
function AddTile(x, y, w = tile_width, h = tile_height) {
  ctx.fillStyle = bo_default_config.tileColor;
  canvasFillRect(x, y, w, h);
}
function AddBall(x, y, r = ball_radius) {
  ctx.fillStyle = bo_default_config.ballColor;
  canvasArc(x, y, r);
}
function canvasFillRect(x, y, w = tile_width, h = tile_height) {
  ctx.beginPath();
  ctx.fillRect(x, y, w, h);
  ctx.fill();
}
function canvasArc(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}
function canvasClear(x, y, w, h) {
  ctx.clearRect(x, y, w, h);
}
function moveBall() {
  ctx.fillStyle = bo_default_config.backgroundColor;
  timer = setInterval(() => {
    detectCollision();
    canvasClear(
      ball_x - ball_radius,
      ball_y - ball_radius,
      2 * ball_radius,
      2 * ball_radius
    );
    switch (true) {
      case ball_y >= bo_default_config.height - ball_radius ||
        ball_y <= ball_radius:
        ball_y_direction = -ball_y_direction;
        break;
      case ball_x >= bo_default_config.width - ball_radius ||
        ball_x <= ball_radius:
        ball_x_direction = -ball_x_direction;
        break;
      default:
        break;
    }
    ball_x = ball_x + ball_x_direction * ball_x_increment;
    ball_y = ball_y + ball_y_direction * ball_y_increment;
    AddBall(ball_x, ball_y);
  }, bo_default_config.ballSpeed);
}
function detectCollision() {
  // detect platform collision
  /**
   * when ball hitting edges
   */
  if (ball_y == platForm_config.y - ball_radius) {
    if (
      ball_x >= platForm_config.x - ball_radius &&
      ball_x <= platForm_config.x + platForm_config.w + ball_radius
    ) {
      ball_y_direction = -ball_y_direction;
      return;
    }
  }
  /*end*/
  /*when ball is within the platform*/
  if (ball_y >= platForm_config.y - ball_radius) {
    if (
      ball_x >= platForm_config.x - ball_radius &&
      ball_x <= platForm_config.x + platForm_config.w + ball_radius
    ) {
      ball_y_direction = -ball_y_direction;
      ball_x_direction = -ball_x_direction;
    }
  }
  /*end*/
}
function renderLevel() {
  bo_level.forEach((element) => {
    for (i = 0; i < element; i++) {
      AddTile(tile_x, tile_y);
      tile_x = tile_x + tile_x_gap + tile_width;
    }
    tile_x = ini_tile_x;
    tile_y = tile_y + tile_height + tile_y_gap;
  });
}
function renderText(text, x, y) {
  ctx.fillStyle = bo_default_config.textColor;
  ctx.font = bo_default_config.textFont;
  ctx.fillText(text, x, y);
}
const bo_game = {
  init: set_game,
};
