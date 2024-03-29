import { Champ } from "./champs/Champ.js";
import { Background } from "./ui/basic-ui.js";
import { Player } from "./champs/Player.js";

const background = new Background();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");

const jinx = new Champ("Jinx", 100, 10, 10, 3);
const caitlyn = new Champ("Caitlyn", 100, 15, 10, 1);
const ezreal = new Champ("Ezreal", 100, 20, 10, 2);
const vayne = new Champ("Vayne", 100, 25, 10, 4);

const player = new Player();


// GAME STARTS
startBtn.onclick = () => {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "black";
  startBtn.style.display = "none";
  canvas.style.display = "inline";
  player.hp = 100;
  clearInterval(gameLoop);
};

let canvasWidth = 1280;
let canvasHeight = 720;

const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

const gameLoop = () => {
  //resize canvas
  resizeCanvas();

  //remove canvas
  clearCanvas();

  //update
  update();

  //render
  render();

  //fps
  fps();

  window.requestAnimationFrame(gameLoop);
};

const resizeCanvas = () => {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
};

const clearCanvas = () => {
  background.draw(ctx);
};

const update = () => {
  jinx.update();
  Champ.detectHit(player.dart, jinx);
  Player.detectHit(jinx.dart, player);
  
  if(jinx.hp <= 0) {
      caitlyn.update();
      Champ.detectHit(player.dart, caitlyn);
      Player.detectHit(caitlyn.dart, player);
  }

  if(caitlyn.hp <= 0) {
      ezreal.update();
      Champ.detectHit(player.dart, ezreal);
      Player.detectHit(ezreal.dart, player);
  }

  if(ezreal.hp <= 0) {
      vayne.update();
      Champ.detectHit(player.dart, vayne);
      Player.detectHit(vayne.dart, player);
  }
  player.update(keys);
};

const render = () => {
  jinx.draw(ctx);
  jinx.dart.draw(ctx);

  // Načítání dalších postav + kontrola vítězství:
  if (jinx.hp <= 0) {
      caitlyn.draw(ctx);
      caitlyn.dart.draw(ctx);
  }

  if (caitlyn.hp <= 0) {
      ezreal.draw(ctx);
      ezreal.dart.draw(ctx);
  }

  if (ezreal.hp <= 0) {
      vayne.draw(ctx);
      vayne.dart.draw(ctx);
  }

  if (vayne.hp <= 0) {
    ctx.font = "70px Comic Sans MS";
    ctx.fillStyle = "lime";
    ctx.textAlign = "center";
    ctx.fillText("You won !", canvas.width / 2, canvas.height / 2);
  }

  if (player.hp <= 0) {
    ctx.font = "70px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You lost !", canvas.width / 2, canvas.height / 2);
  }

  player.draw(ctx);
  player.dart.draw(ctx);
};

const fps = () => {};

window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
