const productlist = (main, document) => {
    const productDivEl = document.getElementById('main-content')?.nextElementSibling?.nextElementSibling;
    const allContent = productDivEl?.firstElementChild?.firstElementChild;
    [...allContent.children].forEach((el, index) => {
        if (index !== 0) {
            el.remove();
        }
    });
    const block = WebImporter.DOMUtils.createTable([['product-list']], document);
    productDivEl.append(block);
}
export default productlist;