const gameContainer = document.getElementById('gameContainer');
const startButton = document.getElementById('startButton');
const message = document.getElementById('message');
let startTime;
let reactionTimes = [];
let target;
let targetCount = 0;
let maxTargets = 10;
let clicksMade = 0;

const startGame = () => {
  reactionTimes = [];
  targetCount = 0;
  message.textContent = '';
  startButton.disabled = true;
  clicksMade = 0;
  createTarget();
}

const createTarget = () => {
  if (targetCount >= maxTargets) {
    endGame();
    return;
  }
  targetCount++;
  const x = Math.random() * (gameContainer.clientWidth - 50);
  const y = Math.random() * (gameContainer.clientHeight - 50);

  target = document.createElement('div');
  target.classList.add('target');
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  target.addEventListener('click', hitTarget);
  gameContainer.appendChild(target);

  startTime = new Date().getTime();
}

const hitTarget = () => {
  const endTime = new Date().getTime();
  const reactionTime = endTime - startTime;
  reactionTimes.push(reactionTime);
  gameContainer.removeChild(target);
  clicksMade++;
  createTarget();
}

const endGame = () => {
  startButton.disabled = false;
  const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
  const accuracy = maxTargets / clicksMade * 100;
  message.textContent = `Game Over! Average Reaction Time: 
  ${averageTime.toFixed(2)} ms, accuracy is ${(accuracy).toFixed(0)
      .replace(/.$/,'') * 10}%`;
}

const missClickOnTarget = (event) => {
  if (!startButton.disabled || event.srcElement.className === 'target') {
    return;
  }
  clicksMade++;
}

startButton.addEventListener('click', startGame);
gameContainer.addEventListener('click', missClickOnTarget)

