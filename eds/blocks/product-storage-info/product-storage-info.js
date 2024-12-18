export default function decorate(block) {
  block.innerHTML = `<div class="product-storage-block ">
            <div><h2>Storage</h2></div>
            <div>
              <h6>Storage information</h6>
              <p>Avoid freeze / thaw cycle</p>
            </div>
            <div>
              <h6>Shipped at conditions</h6>
              <p>Blue Ice</p>
            </div>
            <div>
              <h6>Appropriate short-term storage duration</h6>
              <p>1-2 weeks</p>
            </div>
            <div>
              <h6>Appropriate short-term storage conditions</h6>
              <p>+4°C</p>
            </div>
            <div>
              <h6>Appropriate long-term storage conditions</h6>
              <p>-20°C</p>
            </div>
            <div>
              <h6>Aliquoting information</h6>
              <p>Upon delivery aliquot</p>
            </div>
		</div>`;
    const productStorage = document.querySelector('.product-storage-block');
    // productStorage.classList.add('product-storage');
    // productStorage.classList.add('grid');
    // productStorage.classList.add('grid-cols-1');
    // productStorage.classList.add('border-t-2');
    // productStorage.classList.add('border-eds-grey');
    // productStorage.classList.add('pt-10');
    // productStorage.classList.add('mt-10');
    // productStorage.classList.add('max-799px:grid-cols-1');
}
