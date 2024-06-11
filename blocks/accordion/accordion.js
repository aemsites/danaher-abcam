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
  { prefixedIconClass, openCloseIconClass },
  uuid,
  index,
  customUUID,
  isLink,
) {
  const divEl = div({ id: `accordion-item-${index}`, class: `accordion-item group relative ${isLink ? 'bg-gray-400/20' : ''} border rounded-2xl box-border text-black-0 max-w-screen-lg [&:has(:focus-visible)]:shadow-interactiveElement cursor-pointer` });
  const summaryInput = input({
    type: 'checkbox',
    class: 'peer hidden absolute',
    name: 'accordions',
    value: uuid,
    id: `accordion-${uuid}-${index}`,
    'aria-labelledby': title,
  });
  const prefixedIcon = prefixedIconClass ? span({ class: `icon ${prefixedIconClass} flex size-7 absolute left-8 fill-current text-gray-400` }) : '';
  const openCloseIcon = openCloseIconClass ? span({ class: `icon ${openCloseIconClass} block size-6 -rotate-90 text-gray-400 fill-current ${isLink ? 'group-hover:translate-x-0.5' : 'group-hover:rotate-0'} transform transition-all` }) : '';
  const summaryContent = isLink ? a(
    {
      title,
      href: isLink,
      'aria-controls': `accordion-${uuid}-${index}`,
      class: 'flex items-center justify-between w-full text-left font-semibold px-8 py-10',
    },
    prefixedIcon,
    div(
      { class: `space-y-2 ${prefixedIconClass ? 'ms-16' : ''} ${openCloseIconClass ? 'me-20' : ''}` },
      (title ? h3({ class: 'text-2xl leading-5 group-hover:underline text-teal-800 font-bold tracking-wider', title }, title) : ''),
      (subTitle ? h6({ class: 'text-black font-normal tracking-wide', title: subTitle }, subTitle) : ''),
    ),
    div({ class: 'p-3 rounded-full absolute right-12' }, openCloseIcon),
  ) : label(
    {
      for: `accordion-${uuid}-${index}`,
      title,
      'aria-controls': `accordion-${uuid}-${index}`,
      class: 'flex items-center justify-between w-full text-left font-semibold px-8 py-10 cursor-pointer',
    },
    prefixedIcon,
    div(
      { class: `space-y-2 ${prefixedIconClass ? 'ms-16' : ''} ${openCloseIconClass ? 'me-16' : ''}` },
      (title ? h3({ class: 'text-2xl leading-5 font-semibold', title }, title) : ''),
      (subTitle ? h6({ class: 'text-gray-300', title: subTitle }, subTitle) : ''),
    ),
    openCloseIcon,
  );

  const panel = div(
    { class: 'grid overflow-hidden transition-all duration-300 ease-in-out grid-rows-[0fr] opacity-0 peer-checked:py-2 pl-16 peer-checked:grid-rows-[1fr] peer-checked:opacity-100' },
    div({ class: 'accordion-content text-base leading-7 overflow-hidden space-y-4' }),
  );

  content.forEach((element) => {
    panel.querySelector('.accordion-content')?.append(element);
  });

  summaryContent.addEventListener('click', () => {
    toggleAccordion(customUUID, divEl);
  });
  divEl.append((!isLink ? summaryInput : ''), summaryContent, (!isLink ? panel : ''));
  return divEl;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const customUUID = generateUUID();
  const accordionItems = [...block.children].map((el, elIndex) => {
    let isLink;
    let title;
    let subTitle;
    let openCloseIcon;
    let prefixedIcon;
    const contents = [];
    el.classList.add(...'p-4 mt-1 border rounded-2xl box-border text-black-0 max-w-screen-lg'.split(' '));
    // LOOP the first children of accordion to extract elements
    // like title, subtitle, prefixed-svgs, open-close-svgs
    [...el.children[0].children].forEach((elChildren) => {
      if (elChildren.querySelector('strong > u') || elChildren.querySelector('strong > a')) {
        title = elChildren.querySelector('strong > u')?.innerHTML ?? elChildren.querySelector('strong > a')?.innerHTML;
        isLink = elChildren.querySelector('strong > a')?.href;
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
    return createAccordionBlock(
      { title, subTitle },
      contents,
      { prefixedIconClass: prefixedIcon, openCloseIconClass: openCloseIcon },
      generateUUID(),
      elIndex,
      customUUID,
      isLink,
    );
  });
  block.innerHTML = '';
  block.classList.add(...'space-y-6'.split(' '));
  block.append(...accordionItems);
  decorateIcons(block);
}
