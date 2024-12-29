/* global WebImporter */
const titlecard = (main, document) => {
    const titleCardDivEl = document.createElement('div');
    const headDivEl = document.getElementById('main-content').nextElementSibling;
    const heading = headDivEl.querySelector('h1')?.textContent;
    const headingEl = document.createElement('h1');
    headingEl.textContent = heading;
    const description = headDivEl.querySelector('div[data-testid="content-head-description"]')?.firstElementChild?.textContent;
    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;
    const subTitleEl = document.createElement('p');
    subTitleEl.textContent = 'subtitle';
    const link = document.createElement('a');
    link.href = '#';
    link.title = '';
    link.textContent = '';
    const linkVariant = document.createElement('div');
    linkVariant.textContent = 'secondary-primary';
    const iconVariant = document.createElement('div');
    iconVariant.textContent = 'none';
    const cells = [['title-card']];
    titleCardDivEl.append(headingEl, descriptionEl);
    cells.push([titleCardDivEl],[headingEl], [subTitleEl], [descriptionEl],[link], [linkVariant], [iconVariant]);
    if (cells.length > 0) {
      headDivEl.innerHTML = '';
      const block = WebImporter.DOMUtils.createTable(cells, document);
      headDivEl.append(block, document.createElement('hr'));
    }
  };
  export default titlecard;