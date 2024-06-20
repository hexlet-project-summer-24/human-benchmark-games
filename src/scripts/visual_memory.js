let cubeMatrixState = {
    pressedCorrect: [],
    pressedMistakes: [],
    mistakesCount: 0,
    correctIds: [],
    resolution: 3,
    isPreview: true, 
    iswin: false,
    gameEndFunc: null,   
}

let gameState = {
    isDie: false,
    lives: 3,
    level: 1,
    difficulty: 1,
    resolution: 3
}

function createCubeMatrix () {
    console.log(gameState.resolution)
    let resolution = gameState.resolution
    const cubeMatrix = document.createElement('div');
    cubeMatrix.id = 'cubeMatrix'
    cubeMatrix.classList.add('d-flex','justify-content-center','flex-column');
    const cubeMatrixSize = 380;
    const cubeSize = cubeMatrixSize / resolution + 'px'
    let cubeId = 0;
    for (let h = 0; h < resolution; h++) {
        let line = document.createElement('div');
        line.classList.add('d-flex', 'justify-content-center');
        for (let w = 0; w < resolution; w++) {
            let cube = document.createElement('div');
            cube.classList.add('cube_deafult');
            cube.style.height = cubeSize;
            cube.style.width = cubeSize;
            cube.style.borderRadius = cubeMatrixSize / resolution / 8 + 'px'
            cube.style.borderWidth = cubeMatrixSize / resolution / 15 + 'px'
            cube.id = cubeId;
            cubeId++;
            cube.addEventListener('click', cubeClick)
            line.appendChild(cube);
        }
        cubeMatrix.appendChild(line);
    }

    document.getElementById("header").appendChild(cubeMatrix);

    const levelNum = document.getElementById('level-score')
    levelNum.textContent = gameState.level
}

function cubeClick () {
    if (cubeMatrixState.isPreview === false) {
        const cubeId = Number(this.id);
        const cubeEl = document.getElementById(cubeId);
        const correctIds = cubeMatrixState.correctIds;
        const pressedCorrect = cubeMatrixState.pressedCorrect;
        const pressedMistakes = cubeMatrixState.pressedMistakes
        cubeEl.classList.add('click')
        setTimeout(() => cubeEl.classList.remove('click'), 100);
        const indicator = document.getElementById('indicator')
        if (!pressedCorrect.includes(cubeId) && !pressedMistakes.includes(cubeId)) {
            if (correctIds.includes(cubeId)) {
                pressedCorrect.push(cubeId)
                cubeEl.style.backgroundColor = '#1f1f1f';
                if (JSON.stringify(correctIds.sort()) == JSON.stringify(pressedCorrect.sort())) {
                    cubeMatrixState.isWin = true
                    cubeMatrixState.isPreview = true
                    indicator.style.backgroundColor = 'green'
                    indicator.style.display = 'block'
                    setTimeout(() => indicator.style.display = 'none', 400)
                    setTimeout(()=> {
                        document.getElementById('cubeMatrix').remove()
                        cubeMatrixState.gameEndFunc()
                        cubeMatrixState = newCubeMatrixState()
                        gameState.level += 1
                        gameState.difficulty = changeDifficulty()
                        gameState.resolution = changeResolution()
                    },1000)
                }
            } else {
                pressedMistakes.push(cubeId)
                cubeEl.style.backgroundColor = '#194264';
                cubeMatrixState.mistakesCount++;
                indicator.style.backgroundColor = 'red'
                indicator.style.display = 'block'
                setTimeout(() => indicator.style.display = 'none', 200)

                if (cubeMatrixState.pressedMistakes.length > 2) {
                    cubeMatrixState.isDie = true;
                    gameState.lives -= 1
                    cubeMatrixState.isPreview = true;
                    showLives(gameState.lives)
                    setTimeout(()=> {
                        document.getElementById('cubeMatrix').remove()
                        cubeMatrixState.gameEndFunc()
                        cubeMatrixState = newCubeMatrixState()
                        if (gameState.lives === 0) {
                            gameState.isDie = true
                            document.getElementById('gameInfo').remove()
                            createGameOver(gameState.level)
                        }
                    },1000)
                    
                }
            }


        }
        console.log(cubeMatrixState)
        console.log(gameState)
    }
}

function createGameInfo () {
    const gameInfo = document.createElement('div');
    gameInfo.id = 'gameInfo'
    gameInfo.className = 'level-container';
    const levelSpan = document.createElement('span');
    const levelTextSpan = document.createElement('span');
    levelTextSpan.textContent = 'Level';
    levelTextSpan.className = 'level-text';
    const levelValueSpan = document.createElement('span');
    levelValueSpan.textContent = '1';
    levelValueSpan.id = 'level-score';
    levelSpan.appendChild(levelTextSpan);
    levelSpan.appendChild(levelValueSpan);
    const livesDiv = document.createElement('div');
    const livesTextSpan = document.createElement('span');
    livesTextSpan.textContent = 'Lives';
    livesTextSpan.className = 'lives-text';
    const live1 = document.createElement('i');
    live1.className = 'fa-solid fa-heart';
    live1.id = 'live-1';
    const live2 = document.createElement('i');
    live2.className = 'fa-solid fa-heart';
    live2.id = 'live-2';
    const live3 = document.createElement('i');
    live3.className = 'fa-solid fa-heart';
    live3.id = 'live-3';
    livesDiv.appendChild(livesTextSpan);
    livesDiv.appendChild(live1);
    livesDiv.appendChild(live2);
    livesDiv.appendChild(live3);

    gameInfo.appendChild(levelSpan);
    gameInfo.appendChild(livesDiv);

    document.getElementById("header").appendChild(gameInfo);
}

function createGameOver (level) {
    const header = document.getElementById("header");
    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'indicator';
    indicatorDiv.id = 'indicator';
    header.appendChild(indicatorDiv);  
    const playScreenDiv = document.createElement('div');
    playScreenDiv.className = 'd-flex flex-column justify-content-center align-items-center h-100';
    playScreenDiv.id = 'play-screen';
    header.appendChild(playScreenDiv);   
    const eyeIcon = document.createElement('i');
    eyeIcon.className = 'fa-regular fa-eye';
    eyeIcon.style.fontSize = '100px';
    playScreenDiv.appendChild(eyeIcon);   
    const h2Element = document.createElement('h2');
    h2Element.style.cssText = 'font-size: 30px; font-weight: 400; margin: 20px;';
    h2Element.textContent = 'Visual Memory';
    playScreenDiv.appendChild(h2Element);   
    const h1Element = document.createElement('h1');
    h1Element.style.cssText = 'font-size: 80px; font-weight: 400; margin-bottom: 20px;';
    h1Element.textContent = `Level ${level}`
    playScreenDiv.appendChild(h1Element);   
    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.id = 'replay-btn';
    buttonElement.className = 'btn btn-warning';
    buttonElement.style.fontSize = '14px';
    buttonElement.textContent = 'Try Again';
    playScreenDiv.appendChild(buttonElement);

    document.getElementById('replay-btn').addEventListener('click', () => {
        sendStatistics(gameState.level)
        gameState = newGameState()
        mainGame()
        document.getElementById('indicator').remove()
        document.getElementById('play-screen').remove()
    })
}

function countOfCorrectCubes (difficulty) {
    const resolution = gameState.resolution
    switch (difficulty) {
        case (1): return Math.round(resolution * resolution / 100 * 30)
        case (2): return Math.round(resolution * resolution / 100 * 40)
        case (3): return Math.round(resolution * resolution / 100 * 50)
        case (4): return Math.round(resolution * resolution / 100 * 70)
    }
}


function createGameInfo () {
    const gameInfo = document.createElement('div');
    gameInfo.id = 'gameInfo'
    gameInfo.className = 'level-container';
    const levelSpan = document.createElement('span');
    const levelTextSpan = document.createElement('span');
    levelTextSpan.textContent = 'Level';
    levelTextSpan.className = 'level-text';
    const levelValueSpan = document.createElement('span');
    levelValueSpan.textContent = '1';
    levelValueSpan.id = 'level-score';
    levelSpan.appendChild(levelTextSpan);
    levelSpan.appendChild(levelValueSpan);
    const livesDiv = document.createElement('div');
    const livesTextSpan = document.createElement('span');
    livesTextSpan.textContent = 'Lives';
    livesTextSpan.className = 'lives-text';
    const live1 = document.createElement('i');
    live1.className = 'fa-solid fa-heart';
    live1.id = 'live-1';
    const live2 = document.createElement('i');
    live2.className = 'fa-solid fa-heart';
    live2.id = 'live-2';
    const live3 = document.createElement('i');
    live3.className = 'fa-solid fa-heart';
    live3.id = 'live-3';
    livesDiv.appendChild(livesTextSpan);
    livesDiv.appendChild(live1);
    livesDiv.appendChild(live2);
    livesDiv.appendChild(live3);

    gameInfo.appendChild(levelSpan);
    gameInfo.appendChild(livesDiv);

    document.getElementById("header").appendChild(gameInfo);
}

function createGameOver (level) {
    const header = document.getElementById("header");
    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'indicator';
    indicatorDiv.id = 'indicator';
    header.appendChild(indicatorDiv);  
    const playScreenDiv = document.createElement('div');
    playScreenDiv.className = 'd-flex flex-column justify-content-center align-items-center h-100';
    playScreenDiv.id = 'play-screen';
    header.appendChild(playScreenDiv);   
    const eyeIcon = document.createElement('i');
    eyeIcon.className = 'fa-regular fa-eye';
    eyeIcon.style.fontSize = '100px';
    playScreenDiv.appendChild(eyeIcon);   
    const h2Element = document.createElement('h2');
    h2Element.style.cssText = 'font-size: 30px; font-weight: 400; margin: 20px;';
    h2Element.textContent = 'Visual Memory';
    playScreenDiv.appendChild(h2Element);   
    const h1Element = document.createElement('h1');
    h1Element.style.cssText = 'font-size: 80px; font-weight: 400; margin-bottom: 20px;';
    h1Element.textContent = `Level ${level}`
    playScreenDiv.appendChild(h1Element);   
    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.id = 'replay-btn';
    buttonElement.className = 'btn btn-warning';
    buttonElement.style.fontSize = '14px';
    buttonElement.textContent = 'Try Again';
    playScreenDiv.appendChild(buttonElement);

    document.getElementById('replay-btn').addEventListener('click', () => {
        gameState = newGameState()
        mainGame()
        document.getElementById('indicator').remove()
        document.getElementById('play-screen').remove()
    })
}

function countOfCorrectCubes (difficulty) {
    const resolution = gameState.resolution
    switch (difficulty) {
        case (1): return Math.round(resolution * resolution / 100 * 30)
        case (2): return Math.round(resolution * resolution / 100 * 40)
        case (3): return Math.round(resolution * resolution / 100 * 50)
        case (4): return Math.round(resolution * resolution / 100 * 70)
    }
}

function getRandomInt(max) {return Math.floor(Math.random() * max)}
function randomCubesId (idCounts) {
    let resolution = gameState.resolution
    const maxIdNumber = resolution * resolution;
    const result = []
    for (let i = 0; i < idCounts; i++) {
        let isRepeat = true;
        while (isRepeat === true) {
            let randomId = getRandomInt(maxIdNumber);
            if (!result.includes(randomId)) {
                isRepeat = false;
                result.push(randomId)
            }
        }
    }
    return result
}

function previewCorrectCubes (correctCubeIds) {
    for (let id of correctCubeIds) {
        let cube = document.getElementById(id);
        cube.style.backgroundColor = '#1f1f1f';
        cube.classList.add('click')
        setTimeout(() => cube.classList.remove('click'), 100);
    }
}

function fillAllCubes (color) {
    let resolution = gameState.resolution
    for (let i = 0; i < resolution * resolution; i++) {
        let cube = document.getElementById(i)
        cube.style.backgroundColor = color
    }
}

function showLives (livesCount) {
    const live1 = document.getElementById('live-1')
    const live2 = document.getElementById('live-2')
    const live3 = document.getElementById('live-3')
    switch (livesCount) {
        case (2):
            live3.style.opacity = '30%'
            break
        case (1):
            live2.style.opacity = '30%'
            break
        case (0):
            live1.style.opacity = '30%'
            break
    }
}

function newCubeMatrixState () {
    return {
        pressedCorrect: [],
        isWin: false,
        pressedMistakes: [],
        mistakesCount: 0,
        isDie: false,
        correctIds: [],
        isPreview: true, 
        iswin: false,
        gameEndFunc: null,
    }
}

function newGameState () {
    return {
        isDie: false,
        lives: 3,
        level: 1,
        difficulty: 1,
        resolution: 3
    }
}

function changeDifficulty () {
    let difficulty = gameState.difficulty
    if (difficulty < 4) {
        difficulty += 1
    } else {
        difficulty = 1
    }
    return difficulty
}

function changeResolution() {
    const resolution = gameState.resolution
    if (gameState.difficulty === 1) {
        return resolution + 1
    }
    return resolution
}

function gameIteration () {
    let resolution = gameState.resolution
    return new Promise ((stopGame) => {
        cubeMatrixState.gameEndFunc = stopGame;
        cubeMatrixState.correctIds = randomCubesId(countOfCorrectCubes(gameState.difficulty))
        createCubeMatrix()
        setTimeout(() => {
            previewCorrectCubes(cubeMatrixState.correctIds)
        },300)
        setTimeout(() => {
            fillAllCubes('#2e73b6');
            cubeMatrixState.isPreview = false;
        } , 2000)  
    })

}

async function mainGame () {
    createGameInfo()

    while (gameState.isDie === false) {
        await gameIteration();
    }

}

  
function sendStatistics(level) {
    if (level !== undefined) { 
      axios.post('http://localhost:3000/statistics', { level: level })
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
    return axios.get('http://localhost:3000/statistics')
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
    updateStatisticsChart();
    document.getElementById('play-btn').addEventListener('click', () => {
    document.getElementById('play-screen').remove()
    mainGame();
})
})