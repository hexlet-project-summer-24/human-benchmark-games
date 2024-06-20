const clickBox = document.getElementById('click-box');
const bigText = document.getElementById('main-header');
const instructions = document.querySelector('.instructions');
const icon = document.getElementById('main-icon');
const endgameText = document.getElementById('endgame-text');
let startTime;
let timeout;
let gameStarted = false;

const updateGameBox = (bgColor, text, iconDisplay, instructionsDisplay, endgameDisplay) => {
  clickBox.className = `container-fluid ${bgColor} text-light`;
  bigText.textContent = text;
  icon.style.display = iconDisplay;
  instructions.style.display = instructionsDisplay;
  endgameText.style.display = endgameDisplay;
};

const startGame = () => {
  updateGameBox('bg-red', 'Wait for green...', 'none', 'none', 'none');

  timeout = setTimeout(() => {
    updateGameBox('bg-green', 'Click now!', 'none', 'none', 'none');
    startTime = new Date().getTime();
  }, Math.random() * 4000 + 1000); // Случайное время от 1 до 5 секунд
};

const abortGame = () => {
  clearTimeout(timeout);
  updateGameBox('bg-primary', 'Too soon!', 'block', 'none', 'block');
  icon.className = `fa-solid fa-triangle-exclamation static-icon`;
  endgameText.textContent = 'Click to try again.';
  gameStarted = false;
};

const endGame = () => {
  const endTime = new Date().getTime();
  const reactionTimeInMs = endTime - startTime;
  bigText.textContent = `${reactionTimeInMs} ms`;
  endgameText.textContent = 'Click to keep going';
  clearTimeout(timeout);
  updateGameBox('bg-primary', bigText.textContent, 'block', 'none', 'block');
  icon.className = `fa-solid fa-clock static-icon`;
  gameStarted = false;
};

clickBox.addEventListener('click', () => {
  const backgroundColor = getComputedStyle(clickBox).backgroundColor;

  if (!gameStarted) {
    gameStarted = true;
    startGame();
  } else if (backgroundColor === 'rgb(48, 156, 48)') { // 🟩 Проверка на ЗЕЛЕНЫЙ цвет
    endGame();
  } else if (backgroundColor === 'rgb(185, 43, 43)') { // 🟥 Проверка на КРАСНЫЙ цвет
    abortGame();
  }
});
