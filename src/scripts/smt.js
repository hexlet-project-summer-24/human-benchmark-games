const state = {
    squaresNums: [],
    rightAnswersCounter: 0,
    rightSquares: [],
    usersAnswers: [],
    rightSquaresElements: [],
};

function changeSquareColor(squareArray) {
    squareArray.forEach((square, index) => {
        setTimeout(() => {
            square.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
        }, (index + 1 )* 1500);
    })
}

function changeSquareColorToWhite(squareArray) {
    console.log(squareArray.length);
    squareArray.forEach((square, index) => {
        setTimeout(() => {
            square.style.backgroundColor = 'white';
        }, (index + 1) * 1000);
    });
};

function getRundomSquares() {
    const randomIndex = Math.floor(Math.random() * 9);
    const randomSquare = state.squaresNums[randomIndex];
    return randomSquare;
}

function createSquares() {

    const main = document.querySelector('.top-container');
    main.style.display = 'none';

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('grid-container');
    //gameContainer.style.backgroundColor = 'lightblue';
    gameContainer.style.padding = '20px';


    const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        gridContainer.classList.add('game-container');

        for (let i = 1; i <= 9; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = `grid-item`;
            gridItem.classList.add(`square-${i}`);
            gridItem.style.width = '100px';
            gridItem.style.height = '100px';
            gridItem.textContent = i;
            state.squaresNums.push(gridItem);
            gridContainer.appendChild(gridItem);
        }

    const gridContainerLeft = document.createElement('div');
    gridContainerLeft.className = 'col-1';

    const gridContainerRigth = document.createElement('div');
    gridContainerRigth.className = 'col-1';

    gameContainer.appendChild(gridContainerLeft);
    gameContainer.appendChild(gridContainer);
    gameContainer.appendChild(gridContainerRigth);

    const randomSquare = getRundomSquares();
    const nameOfCorrectSquare = randomSquare.classList[1];
    state.rightSquaresElements.push(randomSquare);
    state.rightSquares.push(nameOfCorrectSquare);

    changeSquareColorToWhite(state.rightSquaresElements);
    changeSquareColor(state.rightSquaresElements);

    return gameContainer;
};

function continueGame() {
    changeSquareColorToWhite(state.rightSquaresElements);
    changeSquareColor(state.rightSquaresElements);

};

function isRightAnswer(correctAnswers, userAnswers) {
    
    for (let i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i] !== userAnswers[i]) {
            return false;
        }
    }
    
    return true;
}

const app = () => {
    const btn = document.querySelector(".btn");

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const topBlock = document.querySelector('.top-block');
        topBlock.appendChild(createSquares());

        const gameContainer = document.querySelector('.game-container');

        gameContainer.addEventListener('click', (event) => {
            const clickedSquare = event.target.classList[1];
            
            if (clickedSquare.includes('square')) {
                state.usersAnswers.push(clickedSquare);
        
                if (isRightAnswer(state.usersAnswers, state.rightSquares)) {
                    console.log('Правильная последовательность!');
                    const nextRandomSquare = getRundomSquares();
                    state.rightSquaresElements.push(nextRandomSquare);
                    console.log(state.rightSquaresElements);
                    continueGame();
                    
                } else {
                    console.log('Неправильная последовательность');
                    state.usersAnswers = [];
                    state.rightSquares = [];
                }
            }
        
           
        });

    })
    
};

app();