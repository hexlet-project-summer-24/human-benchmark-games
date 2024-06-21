import lang from "./i18n.js";

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
