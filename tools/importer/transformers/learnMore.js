/* global WebImporter */
const learnmore = (main, document) => {
  const mainEl = main.querySelector('div.section20');
  const h3Div = mainEl.querySelector('h3');
  const h3El = document.createElement('h3');
  const cells = [['learn-more']];
  if (h3Div) {
    h3El.textContent = h3Div.textContent;
    h3Div.textContent = '';
    h3Div.append(h3El);
    cells.push([h3Div]);
  }
  const linkEl = mainEl.querySelector('a');
  if (linkEl) {
    const anchorEl = document.createElement('a');
    anchorEl.href = linkEl?.href;
    const linkTitle = linkEl?.textContent;
    const pEl = document.createElement('p');
    pEl.textContent = linkTitle;
    anchorEl.append(pEl);
    cells.push([anchorEl]);
  }
  if (cells.length > 0) {
    mainEl.innerHTML = '';
    const block = WebImporter.DOMUtils.createTable(cells, document);
    mainEl.append(block);
  }
};
export default learnmore;
