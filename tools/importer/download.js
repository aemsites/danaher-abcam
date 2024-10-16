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
            downloadLink.title = 'button';
            downloadLink.textContent = 'Download';
            const linkVariant = document.createElement('div');
            linkVariant.textContent = 'secondary-primary';
            const iconVariant = document.createElement('div');
            iconVariant.textContent = 'none';
            const pdfText = document.createElement('div');
            pdfText.textContent = 'PDF';
            cells.push([title], [downloadLink], [linkVariant], [iconVariant], [pdfText]);
        }
    });
    if (cells.length > 1) {
        parentDiv.innerHTML = '';
        const block = WebImporter.DOMUtils.createTable(cells, document);
        parentDiv.append(block, document.createElement('hr'));
    }
  };
  export default download;