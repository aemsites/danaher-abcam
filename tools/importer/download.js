/* global WebImporter */
const download = (main, document) => {
    const allSpanEl = main.querySelectorAll('span');
    let parentDiv;
    const cells = [['download']];
    allSpanEl.forEach((span) => {
        if (span.textContent === 'Download') {
            parentDiv = span.closest('div');
            const title = document.createElement('h6');
            title.textContent = parentDiv.firstElementChild.textContent;
            const aEl = parentDiv.querySelector('a');
            const downloadLink = document.createElement('a');
            downloadLink.href = aEl.href;
            downloadLink.textContent = 'Download';
            downloadLink.title = 'button';
            const linktext = document.createElement('div');
            linktext.textContent = 'Download';
            const linktitle = document.createElement('div');
            linktitle.textContent = 'button';
            const linkEl = document.createElement('div');
            linkEl.append(downloadLink, linktext, linktitle);
            const linkVariant = document.createElement('div');
            linkVariant.textContent = 'secondary-primary';
            const iconVariant = document.createElement('div');
            iconVariant.textContent = 'none';
            const pdfText = document.createElement('div');
            pdfText.textContent = 'PDF';
            const downloadEl = document.createElement('div');
            downloadEl.append(title, pdfText);
            cells.push([downloadEl], [linkEl], [linkVariant], [iconVariant]);
        }
    });
    if (cells.length > 1) {
        parentDiv.innerHTML = '';
        const block = WebImporter.DOMUtils.createTable(cells, document);
        parentDiv.append(block);
    }
  };
  export default download;