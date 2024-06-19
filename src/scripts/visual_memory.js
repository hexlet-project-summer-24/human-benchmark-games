const cubeMatrixState = {
    pressedCorrect: [],
    winCount: 0,
    pressedMistakes: [],
    mistakesCount: 0,
    isDie: false,
    correctIds: [],
    resolution: 5,
    isPreview: true, 
    gameEndFunc: null   
}

function countOfCorrectCubes () {
    const resolution = cubeMatrixState.resolution
    return {
        basic: Math.round(resolution * resolution / 100 * 30),
        easy: Math.round(resolution * resolution / 100 * 40),
        medium: Math.round(resolution * resolution / 100 * 50),
        hard: Math.round(resolution * resolution / 100 * 70)
    }

}


function createCubeMatrix () {
    let resolution = cubeMatrixState.resolution
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
        if (!pressedCorrect.includes(cubeId) || !pressedMistakes.includes(cubeId)) {
            if (correctIds.includes(cubeId)) {
                pressedCorrect.push(cubeId)
                cubeEl.style.backgroundColor = '#1f1f1f';
                if (JSON.stringify(correctIds.sort()) == JSON.stringify(pressedCorrect.sort())) {
                    cubeMatrixState.isWin = true
                    fillAllCubes('#1f1f1f')
                    cubeMatrixState.isPreview = true
                    setTimeout(()=> {
                        document.getElementById('cubeMatrix').remove()
                        cubeMatrixState.gameEndFunc()
                    },1000)
                }
            } else {
                pressedMistakes.push(cubeId)
                cubeEl.style.backgroundColor = '#194264';
                cubeMatrixState.mistakesCount++;

                const miss = document.getElementById('miss')
                miss.style.display = 'block'
                setTimeout(() => miss.style.display = 'none', 200)


                if (cubeMatrixState.pressedMistakes.length > 2) {
                    cubeMatrixState.isDie = true;
                    fillAllCubes('#194264');
                    cubeMatrixState.isPreview = true;
                    setTimeout(()=> {
                        document.getElementById('cubeMatrix').remove()
                        cubeMatrixState.gameEndFunc()
                    },1000)
                    
                }
            }


        }
        console.log(cubeMatrixState)
    }
}


function createGameInfo () {
    const gameInfo = document.createElement('div');
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

function getRandomInt(max) {return Math.floor(Math.random() * max)}

function randomCubesId (idCounts) {
    let resolution = cubeMatrixState.resolution
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
        setTimeout(() => cube.classList.remove('click'), 500);
    }
}

function fillAllCubes (color) {
    let resolution = cubeMatrixState.resolution
    for (let i = 0; i < resolution * resolution; i++) {
        let cube = document.getElementById(i)
        cube.style.backgroundColor = color
    }
}

function gameIteration () {
    let resolution = cubeMatrixState.resolution
    return new Promise ((stopGame) => {
        cubeMatrixState.gameEndFunc = stopGame;
        cubeMatrixState.correctIds = randomCubesId(countOfCorrectCubes().basic)
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

function cubeMatrixStateEdit (resolution) {
    cubeMatrixState = {
        pressedCorrect: [],
        isWin: false,
        pressedMistakes: [],
        mistakesCount: 0,
        isDie: false,
        correctIds: [],
        resolution: resolution,
        isPreview: true, 
        gameEndFunc: null   
    }
}


async function mainGame () {
    console.log('игра 1')
    createGameInfo()
    await gameIteration(cubeMatrixState.resolution, countOfCorrectCubes().basic);
    console.log('игра 2')
    await gameIteration(cubeMatrixState.resolution, countOfCorrectCubes().hard);
}




window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('play-btn').addEventListener('click', () => {
    document.getElementById('play-screen').remove()
    mainGame();
})
})

/*
3)При 3 промахах - 1 жизн и уровень перезапускается
4)При запуске уровня проверяется не проиграли ли мы (всего 3 жизни)
5)Сохраняется номер уровня и кол-во жизней 


*/

