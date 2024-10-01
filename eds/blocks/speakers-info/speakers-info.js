import {
    createOptimizedPicture, decorateIcons,
} from '../../scripts/aem.js';
import {
    div, span,
} from '../../scripts/dom-builder.js';
  
  export default function decorate(block) {  
    const parentEl = block?.parentElement?.parentElement;
    const divEl = div({ class: 'flex' });
    const socialLinks = parentEl.lastElementChild.querySelectorAll('p');
    parentEl.lastElementChild.remove();
    socialLinks.forEach((element) => {
      if(element.textContent.includes('@')) {
        divEl.append(span({ class: 'icon icon-twitter-black' }), element);
      } else {
        divEl.append(span({ class: 'icon icon-linkedin-blue' }), element);
      }
    });
  
    const pictureEl = block.querySelector('picture');
    pictureEl?.classList.add(...'shrink-0'.split(' '));
    const img = pictureEl?.querySelector('img');
    createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);
    img?.classList.add(...'w-16 h-16 rounded-full'.split(' '));
  
    const titleEl = block.querySelector('h5');
    titleEl?.classList.add(...'text-normal font-semibold text-[#071112] m-0'.split(' '));
    const subTitleEl = block.querySelector('h6');
    subTitleEl?.classList.add(...'text-sm font-normal leading-6 text-[#65797C] w-full m-0'.split(' '));
    const descriptionEl = block.querySelector('p');
    descriptionEl?.classList.add(...'text-lg font-normal text-[#071112] leading-7 tracking-normal'.split(' '));  
    
    const mainDiv = div({ class: 'flex flex-col' },
      div({ class: 'flex', }, pictureEl, 
      div({ class: 'my-auto'}, titleEl, subTitleEl)),
      div({ class: 'w-full' }, descriptionEl,), 
      divEl,
    );
  
    block.innerHTML = '';
    block.appendChild(mainDiv);
    decorateIcons(block);
  }