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
  const forDb = Math.round(averageTime / 10) * 10
  sendStatistics(forDb)
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


function sendStatistics(accuracy) {
  if (accuracy !== undefined) {
    axios.post('http://83.166.237.173:3000/aim', { level: accuracy })
      .then(response => {
        console.log(response.data);
        updateStatisticsChart();
      })
      .catch(error => console.error(error));
  } else {
    console.error('Error: accuracy is not defined');
  }
}

function getStatistics() {
  return axios.get('http://83.166.237.173:3000/aim')
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