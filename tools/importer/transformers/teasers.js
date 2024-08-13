const teasers = (main, document) => {
    const mainDivEl = document.getElementById('main-content').nextElementSibling.nextElementSibling;
    const teasersDivEl = document.createElement('div');
    const ulEl = mainDivEl?.querySelector('ul');
    const liEl = ulEl?.querySelectorAll('li');
    liEl?.forEach((item) => {
      const linkEl = item.querySelector('a');
      const pEl = item.querySelector('p');
      const divEl = document.createElement('div');
      const aEl = document.createElement('a');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      aEl.href = linkEl?.href;
      const linkTitle = linkEl?.textContent;
      h3.textContent = linkTitle;
      const linkDesc = pEl?.textContent;
      p.textContent = linkDesc;
      aEl.append(h3, p);
      divEl.append(aEl);
      teasersDivEl.append(divEl);
    });
    const cells = [['teasers']];
    cells.push([teasersDivEl]);
    if (cells.length > 0) {
      mainDivEl.innerHTML = '';
      const block = WebImporter.DOMUtils.createTable(cells, document);
      mainDivEl.append(block, document.createElement('hr'));
    }
  };
  export default teasers;