const clickBox = document.getElementById('click-box');
const bigText = document.getElementById('main-header');
const instructions = document.querySelector('.instructions');
const icon = document.querySelector('.blinking-icon');
const endgameText = document.getElementById('endgame-text');
let startTime;
let timeout;
let gameStarted = false;

function updateGameBox(bgColor, text, iconDisplay, instructionsDisplay, endgameDisplay) {
  clickBox.className = `container-fluid ${bgColor} text-light`;
  bigText.textContent = text;
  icon.style.display = iconDisplay;
  instructions.style.display = instructionsDisplay;
  endgameText.style.display = endgameDisplay;
}

function startGame() {
  updateGameBox('bg-red', 'Wait for green...', 'none', 'none', 'none');

  timeout = setTimeout(() => {
    updateGameBox('bg-green', 'Click now!', 'none', 'none', 'none');
    startTime = new Date().getTime();
  }, Math.random() * 4000 + 1000); // Случайное время от 1 до 5 секунд
}

function endGame() {
  const endTime = new Date().getTime();
  const reactionTimeInMs = endTime - startTime;
  bigText.textContent = `${reactionTimeInMs} ms`;
  endgameText.textContent = 'Click to keep going';
  clearTimeout(timeout);
  updateGameBox('bg-primary', bigText.textContent, 'none', 'none', 'block');
  gameStarted = false;
}

clickBox.addEventListener('click', () => {
  const backgroundColor = getComputedStyle(clickBox).backgroundColor;

  if (!gameStarted) {
    gameStarted = true;
    startGame();
  } else if (backgroundColor === 'rgb(0, 128, 0)') {
    // Проверка на зеленый цвет
    endGame();
  }
});
