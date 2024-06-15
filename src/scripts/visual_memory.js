let cubeMatrixState = {
    pressedCorrect: [],
    isWin: false,
    pressedMistakes: [],
    mistakesCount: 0,
    isDie: false,
    correctIds: [],
    resolution: 3,
    isPreview: true,    
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
    cubeMatrix.classList.add('d-flex','justify-content-center','flex-column','h-100');
    const cubeMatrixSize = 450;
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
        if (!pressedCorrect.includes(cubeId) || !pressedMistakes.includes(cubeId)) {
            if (correctIds.includes(cubeId)) {
                pressedCorrect.push(cubeId)
                cubeEl.style.backgroundColor = 'green';
                if (JSON.stringify(correctIds.sort()) == JSON.stringify(pressedCorrect.sort())) {
                    cubeMatrixState.isWin = true
                    fillAllCubes('green')
                    setTimeout(()=> {
                        document.getElementById('cubeMatrix').remove()
                    },3000)
                }
            } else {
                pressedMistakes.push(cubeId)
                cubeEl.style.backgroundColor = 'red';
                cubeMatrixState.mistakesCount++;
                if (cubeMatrixState.pressedMistakes.length > 2) {
                    fillAllCubes('red');
                    cubeMatrixState.isPreview = true;
                    cubeMatrixState.isDie = true;
                }
            }


        }
        console.log(cubeMatrixState)
    }
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
        cube.style.backgroundColor = 'green';
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

    window.addEventListener('DOMContentLoaded', () => {
        cubeMatrixState.correctIds = randomCubesId(countOfCorrectCubes().basic)
        createCubeMatrix()
        previewCorrectCubes(cubeMatrixState.correctIds)
        setTimeout(() => {
            fillAllCubes('blue');
            cubeMatrixState.isPreview = false;
        } , 3000)  

    })
}



async function mainGame () {
    await gameIteration(cubeMatrixState.resolution, countOfCorrectCubes().basic);
    await gameIteration(cubeMatrixState.resolution, countOfCorrectCubes().hard);
}