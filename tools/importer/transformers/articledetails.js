/* global WebImporter */
const articledetails = (main, document) => {
  let cells = [];
  // const rightDiv;
  // const rightDiv;
  const mainDiv = document.createElement('div');
  // You may also be interested in
  const progressSecDiv = main.querySelector('div.progress_sec');
  const h2Div = progressSecDiv.querySelector('h2');
  const h2El = document.createElement('h2');
  cells = [['interested-in']];
  if (h2Div) {
    h2El.textContent = h2Div.textContent;
    mainDiv.append(h2El);
    cells.push([mainDiv]);
  }
  const divItems = progressSecDiv?.querySelectorAll('div.progress_item');
  divItems.forEach((item) => {
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const linkEl = item?.querySelector('a');
    const anch = document.createElement('a');
    if (!linkEl) return;
    anch.href = linkEl?.href;
    const imgEl = item?.querySelector('.bg_img');
    if (!imgEl) return;
    const img = document.createElement('img');
    img.setAttribute('src', imgEl?.style.backgroundImage.replace('url("', '').replace('")', ''));
    leftDiv.append(img);

    const h5El = item?.querySelector('h5');
    const h5 = document.createElement('h5');
    if (!h5El) return;
    h5.textContent = h5El?.textContent;
    anch.append(h5);
    const pEl = item?.querySelector('p');
    if (!pEl) return;
    const p = document.createElement('p');
    p.textContent = pEl?.textContent;
    anch.append(p);
    rightDiv.append(anch);

    mainDiv.append(rightDiv);
    cells.push([leftDiv, rightDiv]);
  });
  if (cells.length > 0) {
    progressSecDiv.innerHTML = '';
    const block = WebImporter.DOMUtils.createTable(cells, document);
    progressSecDiv.append(block);
  }

  // Learn More
  const learnMoreDiv = document.createElement('div');
  const mainEl = main.querySelector('div.section20');
  const h3Div = mainEl.querySelector('h3');
  const h3El = document.createElement('h3');
  cells = [['learn-more']];
  if (h3Div) {
    h3El.textContent = h3Div.textContent;
    learnMoreDiv.append(h3El);
  }
  const linkEl = mainEl.querySelector('a');
  if (linkEl) {
    const anch = document.createElement('a');
    anch.href = linkEl?.href;
    const pEl = document.createElement('p');
    pEl.textContent = linkEl?.textContent;
    anch.append(pEl);
    learnMoreDiv.append(anch);
  }
  cells.push([learnMoreDiv]);
  if (cells.length > 0) {
    mainEl.innerHTML = '';
    const block = WebImporter.DOMUtils.createTable(cells, document);
    mainEl.append(block);
  }
};
export default articledetails;
