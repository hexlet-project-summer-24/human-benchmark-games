const state = {
    squaresNums: [],
    rightAnswersCounter: 0,
    currentSequence: [],
    userSequence: [],
};

function showSequence() {
    console.log('showSequence called');
    state.currentSequence.forEach((square, index) => {
        setTimeout(() => {
            square.style.backgroundColor = 'white';
            setTimeout(() => {
                square.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
            }, 300); 
        }, (index + 1) * 800);
    });
}

function clickAnimation(target) {
    console.log('clickAnimation called');
    target.style.backgroundColor = '#85c1ff';
    setTimeout(() => {
        target.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
    }, 300);
}

function startGame() {
    const topContainer = document.createElement('div');
    topContainer.className = 'top-container';

    const img = document.createElement('img');
    img.src = '';
    img.alt = 'SVG Image';
    img.className = 'mb-3';

    const h1 = document.createElement('h1');
    h1.textContent = 'Sequence Memory Test';

    const h2 = document.createElement('h2');
    h2.textContent = 'Memorize the pattern.';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-warning btn-start-game';
    button.textContent = 'Start';

    topContainer.appendChild(img);
    topContainer.appendChild(h1);
    topContainer.appendChild(h2);
    topContainer.appendChild(button);

    const resetContainer = document.querySelector('.reset-container');
    if (resetContainer) {
        resetContainer.remove();
    }

    const topBlock = document.querySelector('.top-block');
    topBlock.appendChild(topContainer);

    button.addEventListener('click', function() {
        const gameContainer = createSquares();
        topBlock.appendChild(gameContainer);

        gameContainer.addEventListener('click', function(e) {
            const clickedSquare = e.target;
            if (clickedSquare.classList.contains('grid-item')) {
                clickAnimation(clickedSquare);
                state.userSequence.push(clickedSquare);

                if (!isRightAnswer(state.currentSequence, state.userSequence)) {
                    resetGame();
                }

                if (state.userSequence.length === state.currentSequence.length) {
                    const nextRandomSquare = getRandomSquare();
                    state.currentSequence.push(nextRandomSquare);
                    state.rightAnswersCounter += 1;
                    state.userSequence = [];
                    showSequence();
                }
            }
        });
    });
}

function getRandomSquare() {
    const randomIndex = Math.floor(Math.random() * 9);
    const randomSquare = state.squaresNums[randomIndex];
    return randomSquare;
}

function createSquares() {
    const main = document.querySelector('.top-container');
    main.remove();

    const gameContainer = document.createElement('div');
    gameContainer.className = 'grid-container game-block';

    for (let i = 1; i <= 9; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = `grid-item square-${i}`;
        gridItem.style.width = '100px';
        gridItem.style.height = '100px';
        gridItem.textContent = i;
        gridItem.dataset.id = i;
        state.squaresNums.push(gridItem);
        gameContainer.appendChild(gridItem);
    }

    const randomSquare = getRandomSquare();
    state.currentSequence.push(randomSquare);

    showSequence();
    return gameContainer;
}

function isRightAnswer(correctAnswers, userAnswers) {
    console.log('isRightAnswer called');
    console.log('correctAnswers:', correctAnswers.map(square => square.dataset.id));
    console.log('userAnswers:', userAnswers.map(square => square.dataset.id));
    for (let i = 0; i < userAnswers.length; i++) {
        if (correctAnswers[i].dataset.id !== userAnswers[i].dataset.id) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    const squaresBlock = document.querySelector('.game-block');
    squaresBlock.remove();

    const topBlock = document.querySelector('.top-block');

    const resetContainer = document.createElement('div');
    resetContainer.classList.add('container');
    resetContainer.classList.add('reset-container');

    const img = document.createElement('img');
    img.src = '';
    img.alt = 'SVG Image';
    img.className = 'mb-3';
    resetContainer.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = 'Visual Memory';
    resetContainer.appendChild(h2);

    const h1 = document.createElement('h1');
    h1.textContent = `Level ${state.rightAnswersCounter}`;
    resetContainer.appendChild(h1);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = 'Save your score to see how you compare.';
    messageDiv.appendChild(messageParagraph);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('reset-btn-block');

    const saveScoreButton = document.createElement('button');
    saveScoreButton.classList.add('btn', 'btn-warning', 'save-score');
    saveScoreButton.textContent = 'Save Score';
    buttonsDiv.appendChild(saveScoreButton);

    const tryAgainButton = document.createElement('button');
    tryAgainButton.classList.add('btn', 'btn-info', 'try-again');
    tryAgainButton.textContent = 'Try Again';
    buttonsDiv.appendChild(tryAgainButton);

    messageDiv.appendChild(buttonsDiv);
    resetContainer.appendChild(messageDiv);

    topBlock.appendChild(resetContainer);

    state.userSequence = [];
    state.currentSequence = [];
    state.rightAnswersCounter = 0;

    tryAgainButton.addEventListener('click', function() {
        startGame();
    });
}

const app = () => {
    document.addEventListener('DOMContentLoaded', startGame);
};

app();


