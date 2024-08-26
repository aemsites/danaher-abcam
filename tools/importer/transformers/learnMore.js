/* global WebImporter */
const learnmore = (main, document) => {
  const learnMoreDivEl = document.createElement('div');
  const mainEl = main.querySelector('div.section20');
  const h3Div = mainEl.querySelector('h3');
  const h3El = document.createElement('h3');
  const cells = [['learn-more']];
  if (h3Div) {
    h3El.textContent = h3Div.textContent;
    learnMoreDivEl.append(h3El);
  }
  const linkEl = mainEl.querySelector('a');
  if (linkEl) {
    const anchorEl = document.createElement('a');
    anchorEl.href = linkEl?.href;
    const pEl = document.createElement('p');
    pEl.textContent = linkEl?.textContent;
    anchorEl.append(pEl);
    learnMoreDivEl.append(anchorEl);
  }
  cells.push([learnMoreDivEl]);
  if (cells.length > 0) {
    mainEl.innerHTML = '';
    const block = WebImporter.DOMUtils.createTable(cells, document);
    mainEl.append(block);
  }
};
export default learnmore;
