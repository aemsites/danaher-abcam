import { div, hr } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'flex flex-col justify-between gap-4 max-w-[600px] m-2 px-6 py-2'.split(' '));
  [...block.children].forEach((row) => {
    let type = '';
    const h3Heading = row.querySelector('h3');
    h3Heading?.classList.add(...'text-xl font-bold mb-2'.split(' '));
    const pEl0 = row.querySelectorAll('p')[0];
    const pEl1 = row.querySelectorAll('p')[1];
    const imgContainer = div({ class: 'min-w-8' });
    const img = document.createElement('img');
    if (pEl1 && pEl1.textContent) {
      type = pEl0.textContent;
      pEl0.remove();
      img.src = `/icons/${type}.svg`;
      img.alt = type;
      if (type === 'tested') {
        img.classList.add(...'w-6 h-6 mt-[2px]'.split(' '));
      } else {
        img.classList.add(...'w-3 h-3 mt-[8px]'.split(' '));
      }
      imgContainer.appendChild(img);
    }
    row.prepend(imgContainer);
    row?.classList.add(...'flex gap-2'.split(' '));
    row.querySelectorAll('h4').forEach((el) => {
      el.classList.add(...'font-semibold mb-1 mt-1'.split(' '));
    });
    row.querySelectorAll('p').forEach((el) => {
      el.classList.add(...'font-normal'.split(' '));
    });
  });
  const divs = block.querySelectorAll('div');
  divs.forEach((divEl) => {
    if (divEl.innerHTML.trim() === '') {
      divEl.remove();
    }
  });
  const tnc = block.querySelector('h5');
  const tncDiv = document.createElement('div');
  tnc.classList.add(...'text-sm font-normal mb-0'.split(' '));
  tnc.querySelector('a').classList.add(...'underline text-[#378189]'.split(' '));
  tncDiv.append(tnc);
  block.append(
    hr({
      class: 'h-[1px] my-2 bg-interactive-grey-active mb-4',
    }),
    tncDiv,
  );
}
