const gridItems = document.querySelectorAll('.grid-item');
let sequence = [];
let playerSequence = [];
let level = 0;
let isGameStarted = false;
let isSequenceShowing = false;

const startGame = () => {
    sequence = [];
    playerSequence = [];
    level = 0;
    document.getElementById('message').textContent = '';
    nextLevel();
    isGameStarted = true;
}

const nextLevel = () => {
    level++;
    playerSequence = [];
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * 9);
    } while (sequence.length > 0 && nextIndex === sequence[sequence.length - 1]);
    sequence.push(nextIndex);
    disableGridItems();
    playSequence();
}

const playSequence = () => {
    let delay = 500;
    sequence.forEach((index, i) => {
        setTimeout(() => {
            flash(gridItems[index]);
            if (i === sequence.length - 1) {
                setTimeout(() => {
                    enableGridItems();
                }, 500);
            }
        }, delay * (i + 1));
    });
}

const flash = (element) => {
    element.classList.add('active');
    setTimeout(() => {
        element.classList.remove('active');
    }, 500);
}

async function handleGridClick(event) {
    console.log(isSequenceShowing)
    if (!isGameStarted || isSequenceShowing) {
        return;
    }
    const index = parseInt(event.target.id);
    playerSequence.push(index);
    flash(event.target);

    if (!checkSequence()) {
        sendStatistics(level)
        document.getElementById('message').textContent = `Game Over! You reached level ${level}.`;
        document.getElementById('startButton').disabled = false;
        disableGridItems();
        isGameStarted = false;
        return;
    }

    if (playerSequence.length === sequence.length) {
        isSequenceShowing = true;
        setTimeout(() => {
            nextLevel();
        }, 1000);
        await wait(level + 1)
        isSequenceShowing = false;
    }
}

 checkSequence = () => {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

 const disableGridItems = () => {
    gridItems.forEach(item => item.classList.add('disabled'));
}

const enableGridItems = () => {
    gridItems.forEach(item => item.classList.remove('disabled'));
}

document.getElementById('startButton').addEventListener('click', () => {
    startGame();
    document.getElementById('startButton').disabled = true;
    enableGridItems();
});
gridItems.forEach(item => item.addEventListener('click', handleGridClick));

const wait = (seconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

function sendStatistics(level) {
    if (level !== undefined) {
      axios.post('http://83.166.237.173:3000/sequence-memory', { level: level })
        .then(response => {
          console.log(response.data);
          updateStatisticsChart();
        })
        .catch(error => console.error(error));
    } else {
      console.error('Error: level is not defined');
    }
  }
  
  function getStatistics() {
    return axios.get('http://83.166.237.173:3000/sequence-memory')
      .then(response => response.data)
      .catch(error => console.error(error));
  }


function updateStatisticsChart() {
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