/* global WebImporter */
const embedScript = (main, document) => {
  const forms = [];
  const mktoForms = main.querySelectorAll('div.form');
  if (mktoForms.length > 0) {
    mktoForms.forEach((form, index) => {
      const formIdEl = document.createElement('div');
      const thankYouIdEl = document.createElement('div');
      if (index === 0) {
        formIdEl.textContent = form?.getAttribute('id');
        forms.push([
          ['marketo'], formIdEl,
        ]);
      } else {
        thankYouIdEl.textContent = form?.getAttribute('id');
        forms.push([
          ['thankyou'], thankYouIdEl,
        ]);
      }
    });
    const pEls = main?.querySelector('div.mktoForm > div#thankyou');
    const firstPEl = pEls?.firstElementChild;
    if (firstPEl) {
      const h2El = document.createElement('h2');
      h2El.textContent = firstPEl?.innerHTML;
      forms.push([h2El]);
    }
    const secondPEl = pEls?.firstElementChild?.nextElementSibling;
    if (secondPEl) {
      const strongEl = document.createElement('strong');
      strongEl.textContent = secondPEl?.innerHTML;
      forms.push([strongEl]);
    }
    const thirdPEl = pEls?.lastElementChild;
    if (thirdPEl) {
      const pEl = document.createElement('p');
      pEl.textContent = thirdPEl?.innerHTML;
      forms.push([pEl]);
    }
    const cells = [
      ['Marketo Form'], ...forms,
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    mktoForms.innerHTML = '';
    mktoForms.append(block);
  }
};
export default embedScript;
