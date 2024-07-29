import { hr } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'flex flex-col md:flex-row justify-between gap-4 max-w-[544px] m-2'.split(' '));
  [...block.children].forEach((row) => {
    let type = '';
    const h3Heading = row.querySelector('h3');
    h3Heading?.classList.add(...'text-xl font-bold mb-4'.split(' '));
    const pEl1 = row.querySelectorAll('p')[1];
    const pEl0 = row.querySelectorAll('p')[0];
    const img = document.createElement('img');
    if (pEl1 && pEl1.textContent) {
      type = pEl0.textContent;
      pEl0.remove();
      img.src = `/icons/${type}.svg`;
      img.alt = type;
      if (type === 'tested') img.classList.add(...'w-6 h-6'.split(' '));
      else img.classList.add(...'w-3 h-3'.split(' '));
      row.prepend(img);
    }
    row?.classList.add(...'flex'.split(' '));
    row.querySelectorAll('h4').forEach((el) => {
      el.classList.add(...'ml-8 mb-4'.split(' '));
    });
    row.querySelectorAll('p').forEach((el) => {
      el.classList.add(...'ml-8'.split(' '));
    });
  });

  block.append(
    hr({
      class: 'h-[1px] my-6 bg-interactive-grey-active mb-10',
    }),
  );
  const termsConditions = block?.parentElement?.parentElement?.parentElement?.querySelector('div.default-content-wrapper');
  const tnc = termsConditions?.querySelector('p > a');
  tnc.textContent.classList.add(...'w-fit inline-flex items-center underline text-[#378189]'.split(' '));
}
