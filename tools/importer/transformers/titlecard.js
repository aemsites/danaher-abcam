const titlecard = (main, document) => {
    const headDivEl = document.getElementById('main-content').nextElementSibling;
    const heading = headDivEl.querySelector('h1')?.textContent;
    const headingEl = document.createElement('h1');
    headingEl.textContent = heading;
    const description = headDivEl.querySelector('div[data-testid="content-head-description"]')?.firstElementChild?.textContent;
    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;
    const cells = [['title-card']];
    cells.push([headingEl, descriptionEl]);
    if (cells.length > 0) {
        headDivEl.innerHTML = '';
        const block = WebImporter.DOMUtils.createTable(cells, document);
        headDivEl.append(block);
    }
}
export default titlecard;