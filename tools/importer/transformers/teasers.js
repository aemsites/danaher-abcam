const teasers = (main, document) => {
    const mainDivEl = document.getElementById('main-content').nextElementSibling.nextElementSibling;
    const ulElement = mainDivEl?.querySelector('ul');
    const liElements = ulElement?.querySelectorAll('li');
    const cells = [['teasers']];
    liElements?.forEach((item) => {
      const linkEl = item.querySelector('a');
      const pEl = item.querySelector('p');
      const teaserDivEl = document.createElement('div');
      const anchorEl = document.createElement('a');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      anchorEl.href = linkEl?.href;
      const linkTitle = linkEl?.textContent;
      h3.textContent = linkTitle;
      const linkDesc = pEl?.textContent;
      p.textContent = linkDesc;
      anchorEl.append(h3);
      teaserDivEl.append(anchorEl);
      teaserDivEl.append(p);
      cells.push([teaserDivEl]);
    });
    if (cells.length > 0) {
      mainDivEl.innerHTML = '';
      const block = WebImporter.DOMUtils.createTable(cells, document);
      mainDivEl.append(block);
    }
  };
  export default teasers;