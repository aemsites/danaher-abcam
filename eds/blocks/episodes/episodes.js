import { div } from '../../../eds/scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'grid grid-cols-1 lg:grid-cols-3 w-[50%] items-center m-auto'.split(' '));
  const heading = div({ class: 'episode-heading' }, document.getElementById('more-episodes'));
  block.parentElement?.prepend(heading);

  [...block.children].forEach((divEl, index, arr) => {
    if (index === 0 || index === arr.length - 2) {
      divEl.classList.add('row-span-2');
    }

    divEl.classList.add(...'py-4 w-80'.split(' '));
    divEl.querySelector('div:first-child').classList.add('pb-8');

    const img = divEl.querySelector('img');
    img.width = '210';
    img.height = '210';
    img.classList.add(...'p-20 lg:p-0 m-auto max-[767px]:h-[400px] max-[767px]:w-auto object-cover h-full'.split(' '));

    const name = divEl.querySelector('h3');
    name.classList.add(...'text-center text-4xl font-semobold max-w-52 m-auto'.split(' '));

    const paragraph = divEl.querySelector('p');
    paragraph.classList.add(...'text-center pb-2 text-base font-light max-w-52 m-auto'.split(' '));

    divEl.querySelector('p.button-container')?.classList.add('m-auto', 'items-center', 'justify-center', 'flex', 'w-40');
    const button = divEl.querySelector('p.button-container > a');
    button.classList.add(...'p-2 border border-white rounded-2xl transform transition duration-500 hover:scale-105'.split(' '));
  });
}
