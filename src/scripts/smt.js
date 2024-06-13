function createSquares() {

    const main = document.querySelector('.top-container');
    main.style.display = 'none';

    const container = document.createElement('div');
    container.classList.add('container-fluid');

    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');

    const numBlocks = 9;

    for (let i = 1; i <= numBlocks; i++) {
        let col = document.createElement('div');
        col.classList.add('col-4', 'text-center', 'p-3', 'rounded', 'bg-primary', 'text-white');
        col.style.height = '100px';
        col.style.lineHeight = '100px';
        col.textContent = 'Block ' + i;

        row.appendChild(col);
    }

    container.appendChild(row);
    return container;
}


const app = () => {
    const btn = document.querySelector(".btn");

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const topBlock = document.querySelector('.top-block');
        topBlock.appendChild(createSquares());
    })
    
}

app();