import { getProductResponse } from '../../scripts/search.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  block.classList.add('border-b-4');
  const main = document.querySelector('main');
  main.querySelectorAll('div.section[data-tabname="Downloads"], div.section[data-tabname="Datasheet"]').forEach((section) => {
    section.classList.add('hide-section');
  });
}
