
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

let score = 0;
// "True" om man byter riktning
let changing_direction = false;
// Horisontell hastighet
let food_x;
let food_y;
let dx = 10;
// Vertikal hastighet
let dy = 0;


// Skaffar canvaselementet
const snakeboard = document.getElementById("snakeboard");
// Returnerar en tvådimensionell ritningskontext
const snakeboard_ctx = snakeboard.getContext("2d");

// Start game
main();
gen_food();
document.addEventListener("keydown", change_direction);


// huvudfunktionen anropas upprepade gånger för att hålla spelet igång
function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    // Upprepa
    main();
  }, 100)
}

// ritar en border runt canvas
function clear_board() {
  // färg för snakeboard
  snakeboard_ctx.fillStyle = board_background ;
  //  Välj färg för canvas border
  snakeboard_ctx.strokestyle = board_border;
  // Rita en "fylld" rektangel för att täcka hela canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Rita en border runt hela canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Ritar snake på canvas
function drawSnake() {
  // Ritar varge del
  snake.forEach(drawSnakePart)
}

function drawFood() {
  snakeboard_ctx.fillStyle = 'lightgreen';
  snakeboard_ctx.strokestyle = 'darkgreen';
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

// Ritar en snake del
function drawSnakePart(snakePart) {

  // Ställ in färgen på snake delen
  snakeboard_ctx.fillStyle = snake_col;
  // Ställ in border färg på snake delen
  snakeboard_ctx.strokestyle = snake_border;
  // Rita en "fylld" rektangel för att representera snake delen vid koordinaterna
  // delen är placerad
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Rita en border runt snake delen
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  // Generera ett slumpmässigt nummer matens x-koordinat
  food_x = random_food(0, snakeboard.width - 10);
  // Generera ett slumptal för matens y-koordinat
  food_y = random_food(0, snakeboard.height - 10);
  // om den nya matplatsen är där snake för närvarande är, skapa en ny matplats
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}









function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
// Förhindra att snake att backa

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
}
}

function move_snake() {
// Skapa det nya Snake's head
const head = {x: snake[0].x + dx, y: snake[0].y + dy};
// Lägg till det nya huvudet i början av snake body
snake.unshift(head);
const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
if (has_eaten_food) {
  // Öka poängen
  score += 10;
  // Visa poäng på skärmen
  document.getElementById('score').innerHTML = score;
  // Skapar ny matplats
  gen_food();
} else {
  // Ta bort den sista delen av snake body
  snake.pop();
}
}

document.addEventListener("DOMContentLoaded", function () {
    pTag = document.querySelector("div");
    newVal = document.createElement("p");
    newVal.innerHTML = '';
    pTag.appendChild(newVal);
  });

  var runGame = function(){
    document.getElementById("newGame").style.display = "none";
    document.getElementById("theHead").style.display = "none";
    document.getElementById("credits").style.display = "none";       
    document.getElementById("main").style.display = "block";
    document.getElementById("creditBtn").style.display = "none";
    document.getElementById("snakeboard").style.display = "block";
    
    };

    var showCredits = function(){
     document.getElementById("theHead").style.display = "none";
     document.getElementById("creditBtn").style.display = "none";
     document.getElementById("newGame").style.display = "none";
     document.getElementById("credits").style.display = "block";
     document.getElementById("backBtn").style.display = "block";
    };
    
    var goBack = function(){
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("credits").style.display = "none";
    document.getElementById("theHead").style.display = "block";
    document.getElementById("newGame").style.display = "block";
    document.getElementById("creditBtn").style.display = "block";
    };
