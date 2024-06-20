// ======== Start Game =================

const startScreen = document.querySelector("#start_screen");
const startBtn = document.querySelector(".start");

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  startScreen.classList.add("up");
});

// ========== Set Options ================

const optionScreen = document.querySelector("#option_screen");
const timeList = document.querySelector(".time-list");

let gameTime = 0;

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    gameTime = parseInt(event.target.getAttribute("data-time"));
    optionScreen.classList.add("up");
    startGame();
  }
});

// =========== Play Game ===============
const timeBlock = document.getElementById("time");
const board = document.getElementById("board");

const colors = [
  "#be330d",
  "#d3da13",
  "#be330d",
  "#25be0d",
  "#0dafbe",
  "#0d3cbe",
  "#a60dbe",
  "#be0d0d",
];

let result = 0;

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    result++;
    // board.innerHTML = "";
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  gameTimer = setInterval(decreaseTime, 1000);
  setTimer(gameTime);
  createRandomCircle();
}

function decreaseTime(curTime) {
  if (gameTime === 0) {
    finishGame();
  } else {
    curTime = --gameTime;
    setTimer(curTime);
  }
}

function finishGame() {
  timeBlock.parentNode.remove();
  board.innerHTML = `<h1>Your Result: <span class="primary">${result}</span></h1>`;
  clearInterval(gameTimer);
}

function setTimer(t) {
  if (t < 10) {
    t = `0${t}`;
  }
  timeBlock.innerHTML = `00:${t}`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const d = getRandomNum(10, 60);

  const { width, height } = board.getBoundingClientRect();
  //   const boardHeght = board.getBoundingClientRect().height;

  const x = getRandomNum(d, width - d);
  const y = getRandomNum(d, height - d);

  const bgColor = colors[getRandomNum(0, colors.length - 1)];

  circle.style.width = `${d}px`;
  circle.style.height = `${d}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  circle.style.background = bgColor;

  board.append(circle);
}

function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
