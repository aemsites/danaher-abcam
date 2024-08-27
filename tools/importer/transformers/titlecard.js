/* global WebImporter */
const titlecard = (main, document) => {
  const url = new URL(document.querySelector('[property="og:url"]')?.content);
  if(url.host === 'go.myabcam.com') return;
  const titleCardDivEl = document.createElement('div');
  const headDivEl = document.getElementById('main-content').nextElementSibling;
  const heading = headDivEl.querySelector('h1')?.textContent;
  const headingEl = document.createElement('h1');
  headingEl.textContent = heading;
  const description = headDivEl.querySelector('div[data-testid="content-head-description"]')?.firstElementChild?.textContent;
  const descriptionEl = document.createElement('p');
  descriptionEl.textContent = description;
  const cells = [['title-card']];
  titleCardDivEl.append(headingEl, descriptionEl);
  cells.push([titleCardDivEl]);
  if (cells.length > 0) {
    headDivEl.innerHTML = '';
    const block = WebImporter.DOMUtils.createTable(cells, document);
    headDivEl.append(block, document.createElement('hr'));
  }
};
export default titlecard;
