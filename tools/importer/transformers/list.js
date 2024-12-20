const list = (main, document) => {
    const urlMyAbcam = new URL(document.querySelector('[property="og:url"]')?.content);
    if(urlMyAbcam.host === 'go.myabcam.com') return;
    const url = document.querySelector('[hrefLang="x-default"]')?.href;
    const productDivEl = document.getElementById('main-content')?.nextElementSibling?.nextElementSibling;
    let allContent = productDivEl?.firstElementChild;
    if(url && url.includes('/technical-resources/')) allContent?.remove();
    else allContent = productDivEl?.firstElementChild?.firstElementChild;
    
    if(url && url.includes('/products/')) {
        [...allContent.children].forEach((el, index) => {
            if (index !== 0) {
                el.remove();
            }
        });
        const block = WebImporter.DOMUtils.createTable([['product-list']], document);
        productDivEl.append(block);
    } else if (url && url.includes('/technical-resources/')){
        const block = WebImporter.DOMUtils.createTable([['page-list']], document);
        productDivEl.append(block);
    }
}
export default list;