import { decorateIcons } from '../../scripts/aem.js';
import {
  hr, h2, div, span,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const buttonsList = ['Datasheet', 'Safety Datasheet', 'COC'];
  const downloadButtons = div({ class: 'flex flex-row flex-wrap mb-11 gap-4' });
  buttonsList.forEach((item) => {
    const button = document.createElement('button');
    button.classList.add(...'flex flex-col justify-between w-32 h-32 p-2 text-[#2a3c3c] text-xs font-semibold border rounded-4px border-grey-0 hover:no-underline'.split(' '));
    button.appendChild(div({ class: 'pt-0 mb-2' }, span({ class: 'icon icon-download' })));
    button.appendChild(span({ class: 'pt-0' }, item));
    decorateIcons(button);
    downloadButtons.appendChild(button);
  });

  const downloadEl = div(
    { class: 'pt-0 mt-0' },
    hr({ class: 'h-px my-6 bg-interactive-grey-active mb-10' }),
    h2({ class: 'mt-6 mb-4 text-2xl font-semibold text-[#2a3c3c]' }, 'Downloads'),
    downloadButtons,
  );
  block.append(downloadEl);
}
