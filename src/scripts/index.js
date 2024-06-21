const lang = {
    mainPage: {
        en: {
            "title": "Human Benchmark",
            "subtitle": "Measure your abilities with brain games and cognitive tests.",
            "reaction-time": "Reaction Time",
            "reaction-time-desc": "Test your visual reflexes.",
            "sequence-memory": "Sequence Memory",
            "sequence-memory-desc": "Remember an increasingly long pattern of button presses.",
            "aim-trainer": "Aim Trainer",
            "aim-trainer-desc": "How quickly can you hit all the targets?",
            "chimp-test": "Chimp Test",
            "chimp-test-desc": "Are you smarter than a chimpanzee?"
        },
        ru: {
            "title": "Измеритель способностей человека",
            "subtitle": "Измерьте свои способности с помощью игр и когнитивных тестов.",
            "reaction-time": "Время реакции",
            "reaction-time-desc": "Узнайте свою скорость реакции",
            "sequence-memory": "Память последовательностей",
            "sequence-memory-desc": "Запомните всё более длинную последовательность нажатий кнопок.",
            "aim-trainer": "Тренировка точности",
            "aim-trainer-desc": "Как быстро вы можете поразить все цели?",
            "chimp-test": "Макако-тест",
            "chimp-test-desc": "Вы умнее макаки?"
        }
    },
    sequenceMemory: {
        en: {
            "game-over": "Game over, reached level is {0}",
        },
        ru: {
            "game-over": "Игра закончена, достигнутый уровень - {0}"
        }
    }
};
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('page-header').classList.toggle('dark-mode');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('dark-mode');
        card.classList.toggle('light-mode');
    });
    document.querySelectorAll('.container-with-theme').forEach(container => {
        container.classList.toggle('dark-mode');
        container.classList.toggle('light-mode');
    })
}

function setLanguage(pageName, langCode) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = lang[pageName][langCode][key];
    });
}
