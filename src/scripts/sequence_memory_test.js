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
