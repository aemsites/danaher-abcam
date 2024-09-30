import {
  div, h3, h6, input, label, span, a,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { generateUUID } from '../../scripts/scripts.js';

function toggleAccordion(blockUUID, activeAccordion) {
  const allAccordions = document.querySelectorAll(`div#accordion-${blockUUID} div.accordion-item`);
  allAccordions.forEach((accordion) => {
    if (accordion.id === activeAccordion.id) {
      if (activeAccordion.children[0].checked) {
        activeAccordion.children[1].setAttribute('aria-expanded', false);
      } else {
        activeAccordion.children[1].setAttribute('aria-expanded', true);
      }
    }
    if (accordion.id !== activeAccordion.id && accordion.children[0].checked) {
      accordion.children[0].click();
      accordion.children[1].setAttribute('aria-expanded', false);
    }
  });
}
function createAccordionBlock(
  { title, subTitle },
  content,
  { prefixedIcon, openCloseIcon },
  uuid,
  index,
  customUUID,
) {
  const divEl = div({ id: `accordion-item-${index}`, class: 'accordion-item relative p-4 border rounded-2xl box-border text-black-0 max-w-screen-lg [&:has(:focus-visible)]:shadow-interactiveElement' });
  const summaryInput = input({
    type: 'checkbox',
    class: 'peer hidden absolute',
    name: 'accordions',
    value: uuid,
    id: `accordion-${uuid}-${index}`,
    'aria-labelledby': title,
  });
  const summaryContent = label(
    {
      for: `accordion-${uuid}-${index}`,
      title,
      'aria-controls': `accordion-${uuid}-${index}`,
      class: 'flex items-center justify-between w-full text-left font-semibold py-2 cursor-pointer peer-[&_span.plus]:opacity-100 peer-checked:[&_span.plus]:opacity-0 peer-checked:[&_span.plus]:rotate-45 peer-checked:[&_span.open-close-icon]:rotate-0',
    },
    span({ class: `icon ${prefixedIcon} flex size-7 max-[374px]:size-5 absolute left-8 fill-current text-gray-400` }),
    div(
      { class: 'ms-16 max-[374px]:ms-12' },
      h3({ class: 'w-[90%] text-2xl leading-5 font-semibold max-[767px]:w-[75%]', title }, title),
      h6({ class: 'text-gray-300 max-[767px]:w-[75%] mt-4', title: subTitle }, subTitle),
    ),
    span({ class: `icon ${openCloseIcon} size-6 absolute right-12 max-[767px]:right-4 fill-current -rotate-90 group-hover:rotate-0 text-gray-400  transform transition-all` }),
  );
  const panel = div(
    { class: 'grid overflow-hidden transition-all duration-300 ease-in-out grid-rows-[0fr] opacity-0 peer-checked:py-2 pl-16 max-[767px]:pl-4 peer-checked:grid-rows-[1fr] peer-checked:opacity-100' },
    div({ class: 'accordion-content text-base leading-7 overflow-hidden space-y-4' }),
  );
  content.forEach((element) => {
    panel.querySelector('.accordion-content')?.append(element);
  });
  summaryContent.addEventListener('click', () => {
    toggleAccordion(customUUID, divEl);
  });
  divEl.append(summaryInput, summaryContent, panel);
  return divEl;
}
/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const customUUID = generateUUID();
  const blockChilds = [...block.children].map((el) => {
    let title;
    let subTitle;
    let openCloseIcon;
    let prefixedIcon;
    const contents = [];
    el.classList.add(...'p-4 mt-1 border rounded-2xl box-border text-black-0 max-w-screen-lg'.split(' '));
    // LOOP the first children of accordion to extract elements
    // like title, subtitle, prefixed-svgs, open-close-svgs
    [...el.children[0].children].forEach((elChildren) => {
      if (elChildren.querySelector('strong > u')) {
        title = elChildren.querySelector('strong > u')?.innerHTML;
      } else if (elChildren.querySelector('u')?.innerHTML) {
        subTitle = elChildren.querySelector('u')?.innerHTML;
      } else if (elChildren.innerHTML.includes('svg')) {
        let svgImage = elChildren.innerHTML.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
        svgImage = new DOMParser().parseFromString(svgImage, 'text/html');
        svgImage = svgImage.querySelector('svg');
        const svgClasses = svgImage.classList.value.split('|').join(' ');
        svgImage.classList.value = '';
        svgImage.classList.add(...svgClasses.split(' '));
        if (svgImage.classList.contains('prefixed-title-icon')) {
          prefixedIcon = svgImage.classList.value;
        } else if (svgImage.classList.contains('open-close-icon')) {
          openCloseIcon = svgImage.classList.value;
        }
      }
    });
    // LOOP the second children to get the accordion collapsed content
    [...el.children[1].children].forEach((elChildren) => {
      const isAlert = elChildren.querySelector('u');
      const contentContainer = div({ class: `${isAlert ? 'px-4 py-6 bg-gray-200/40' : ''} text-base` });
      [...elChildren.childNodes].forEach((elChildNodes, elChildNodesIndex) => {
        if (elChildNodes.nodeName === '#text') {
          contentContainer.append(elChildNodes.textContent);
        } else if (elChildNodes.nodeName === 'STRONG') {
          if (elChildNodesIndex !== 0) contentContainer.append(span({ class: 'font-bold tracking-wide' }, elChildNodes.textContent));
          else contentContainer.append(h3({ class: 'text-xl font-bold tracking-wide mb-2' }, elChildNodes.textContent));
        } else if (elChildNodes.nodeName === 'A') {
          contentContainer.append(a({ class: `${isAlert ? 'text-sm text-white bg-black px-6 py-3' : 'text-base underline text-teal-600'} block w-max cursor-pointer mt-2 rounded-full tracking-wide` }, elChildNodes.innerHTML));
        } else if (elChildNodes.nodeName === 'U') {
          contentContainer.append(elChildNodes.textContent);
        }
        contents.push(contentContainer);
      });
    });
    const packet = {
      title,
      subTitle,
      content: contents,
      prefixedIcon,
      openCloseIcon,
      uuid: generateUUID(),
    };
    return packet;
  });
  const accordionItems = blockChilds
    .map((question, index) => createAccordionBlock(
      { title: question.title, subTitle: question.subTitle },
      question.content,
      { prefixedIcon: question.prefixedIcon, openCloseIcon: question.openCloseIcon },
      question.uuid,
      index,
      customUUID,
    ));
  block.innerHTML = '';
  block.classList.add(...'space-y-6'.split(' '));
  block.append(...accordionItems);
  decorateIcons(block);
}
