const clickBox = document.getElementById('click-box');
const bigText = document.getElementById('main-header');
const instructions = document.querySelector('.instructions');
const icon = document.getElementById('main-icon');
const endgameText = document.getElementById('endgame-text');
let startTime;
let timeout;
let gameStarted = false;
let tryCount;
let clickCount;
let reactionTime;
let successfulClickCount;

const updateGameBox = (
  bgColor,
  text,
  iconDisplay,
  instructionsDisplay,
  endgameDisplay
) => {
  clickBox.className = `container-fluid ${bgColor} text-light`;
  bigText.innerHTML = text;
  icon.style.display = iconDisplay;
  instructions.style.display = instructionsDisplay;
  endgameText.style.display = endgameDisplay;
};

window.addEventListener('load', (event) => {
  initVariables();
});

const startGame = () => {
  updateGameBox('bg-red', 'Wait for green...', 'none', 'none', 'none');

  timeout = setTimeout(() => {
    updateGameBox('bg-green', 'Click now!', 'none', 'none', 'none');
    startTime = new Date().getTime();
  }, Math.random() * 4000 + 1000); // Случайное время от 1 до 5 секунд
};

const abortGame = () => {
  clearTimeout(timeout);
  updateGameBox('bg-blue', 'Too soon!', 'block', 'none', 'block');
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
  updateGameBox('bg-blue', bigText.textContent, 'block', 'none', 'block');
  icon.className = `fa-solid fa-clock static-icon`;
  gameStarted = false;
  return reactionTimeInMs;
};

const initVariables = () => {
  tryCount = 3;
  clickCount = 0;
  reactionTime = 0;
  successfulClickCount = tryCount;
};

clickBox.addEventListener('click', () => {
  const backgroundColor = getComputedStyle(clickBox).backgroundColor;

  if (!gameStarted) {
    gameStarted = true;
    startGame();
  } else if (backgroundColor === 'rgb(48, 156, 48)') {
    // 🟩 Проверка на ЗЕЛЕНЫЙ цвет
    reactionTime += endGame();
    clickCount++;
  } else if (backgroundColor === 'rgb(185, 43, 43)') {
    // 🟥 Проверка на КРАСНЫЙ цвет
    abortGame();
    clickCount++;
    successfulClickCount -= 1;
  }
  if (tryCount === clickCount && successfulClickCount > 0) {
    const msForDb = Math.round(reactionTime / successfulClickCount / 10) * 10
    console.log(msForDb)
    sendStatistics(msForDb)
    updateGameBox(
      'bg-blue',
      `Your average reaction time is ${(
        reactionTime / successfulClickCount
      ).toFixed()} ms,</br> 
      your accuracy is ${((successfulClickCount / tryCount) * 100).toFixed()}%`,
      'none',
      'none',
      'block'
    );
    endgameText.textContent = 'Click to restart game.';
    initVariables();
  } else if (successfulClickCount <= 0) {
    updateGameBox(
      'bg-blue',
      `You never once hit the green block on time.`,
      'block',
      'none',
      'block'
    );
    icon.className = `fa-solid fa-face-frown static-icon`;
    endgameText.textContent = 'Click to restart game.';
    initVariables();
  }
});



function sendStatistics(time) {
  if (time !== undefined) {
    axios.post('http://83.166.237.173:3000/reaction-time', { level: time })
      .then(response => {
        console.log(response.data);
        updateStatisticsChart();
      })
      .catch(error => console.error(error));
  } else {
    console.error('Error: time is not defined');
  }
}

function getStatistics() {
  return axios.get('http://83.166.237.173:3000/reaction-time')
    .then(response => response.data)
    .catch(error => console.error(error));
}



function updateStatisticsChart() {
  console.log(getStatistics())
  getStatistics().then(statistics => {
    const labels = statistics.map(stat => stat.level);
    const data = statistics.map(stat => stat.count);

    const ctx = document.getElementById('statistics-chart').getContext('2d');
    if (window.statisticsChart) {
      window.statisticsChart.destroy();
    }
    window.statisticsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: '#3284c8',
          borderColor: '#3284c8',
          borderWidth: 3,
          fill: false,
          pointRadius: 0,
          pointHitRadius: 0,
          tension: 0.4
        }]
      },
      options: {
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Level',
              color: 'white'
            },
            ticks: {
              color: 'white'
            },
            grid: {
              color: '#080808',
              drawBorder: false,
              drawTicks: false,
              drawOnChartArea: true
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count',
              color: 'white'
            },
            ticks: {
              color: 'white'
            },
            display: false
          }
        }
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateStatisticsChart()
})