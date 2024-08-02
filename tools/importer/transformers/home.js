const cards = (main, document) => {
    const mainDivEl = document.getElementById('main-content').nextElementSibling;
    const allH2 = mainDivEl.querySelectorAll('h2');
    allH2.forEach((h2) => {
        if(h2.textContent === 'Browse by products' || h2.textContent === 'Featured content') {
            const cells = [['cards']];
            const strongEl = document.createElement('strong');
            strongEl.textContent = h2.textContent;
            const h2El = document.createElement('h2');
            h2El.append(strongEl);
            const card = [h2El];
            cells.push(card);
            const cardsEl = h2.parentElement;
            cardsEl.querySelectorAll('div.flex.flex-col.h-full').forEach((cardEl) => {
                const leftEl = [];
                const imgEl = document.createElement('img');
                imgEl.src = '/images/placeholder.png';
                const divLeft = document.createElement('div');
                divLeft.append(imgEl);
                leftEl.push(divLeft);
                const rightEl = [];
                const title = cardEl.querySelector('span').textContent;
                const titleEl = document.createElement('h2');
                titleEl.textContent = title;
                const descriptions = cardEl.querySelector('p');
                const link = cardEl.querySelector('a').href;
                const linkText = cardEl.querySelector('a > div').textContent;
                const linkEl = document.createElement('a');
                linkEl.href = link;
                linkEl.textContent = linkText;
                rightEl.push(titleEl, descriptions, linkEl);
                card.push([...leftEl , ...rightEl]);
            });
            if (cells.length > 0) {
                const block = WebImporter.DOMUtils.createTable(cells, document);
                main.append(block);
            }
        }
    });
};

const miniTeaser = (main, document) => {
    const mainDivEl = document.getElementById('main-content').nextElementSibling;
    const teaserParent = mainDivEl.querySelector('div.bg-black-0');
    const cells = [['mini-teaser']];
    teaserParent.querySelector('div:nth-child(2)').querySelectorAll('div').forEach((teaserEl) => {
        const teaser = [];
        const imgEl = document.createElement('img');
        imgEl.src = teaserEl.querySelector('img').src;
        const title = teaserEl.querySelector('p').textContent;
        const titleEl = document.createElement('h2');
        titleEl.textContent = title;
        const descriptions = teaserEl.querySelector('p:last-child');
        teaser.push([imgEl, titleEl, descriptions]);
        cells.push(...teaser);
    });
    if (cells.length > 0) {
        const block = WebImporter.DOMUtils.createTable(cells, document);
        main.append(block);
    }
};

const home = (main, document) => {
    const mainEl = document.createElement('div');
    const mainDivEl = document.getElementById('main-content').nextElementSibling;
    cards(mainEl, document);
    miniTeaser(mainEl, document);
    mainDivEl.innerHTML = '';
    mainDivEl.append(mainEl);
}
export default home;