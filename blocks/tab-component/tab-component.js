import {
  div, button,
} from '../../scripts/dom-builder.js';

function removeActiveClasses(content) {
  const contentElements = content.querySelectorAll('.tab-panel');
  [...contentElements].forEach((element) => {
    element.classList.remove('active');
    if(element.classList.contains('active')){
      element.classList.add('opacity-0');
    }
  });
  const listElements = content.querySelectorAll('button');
  [...listElements].forEach((element) => {
    element.classList.remove('active');
    if(element.classList.contains('active')){
      element.classList.add('opacity-0');
    }
  });
}

function activeFirstElements(content) {
  const contentElement = content.querySelector('.tab-panel');
  contentElement.classList.add('active');
  const listElement = content.querySelector('button');
  listElement.classList.add('active');
}

export default function decorate(block) {
  const tabComponent = div({ class: 'mmg-tabs' });
  const ul = div({ class: 'tablist flex mb-10' });
  const tabContent = div({ class: 'tab-panels overflow-hidden relative' });

  // Iterate through block's children and create tabs
  [...block.children].forEach((row) => {
    const itemContent = row.children[1];
    itemContent.classList.add(...'tab-panel'.split(' '));
    const li = button(
      {
        class: 'tab p-5',
        onclick: (event) => {
          removeActiveClasses(tabComponent);
          event.target.classList.add('active');
          itemContent.classList.add('active');
        }
      },
      row.children[0]
    );

    ul.appendChild(li);
    tabContent.appendChild(itemContent);
  });

  // Set the first tab as active by default
  block.textContent = '';
  tabComponent.appendChild(ul);
  tabComponent.appendChild(tabContent);
  block.appendChild(tabComponent);
  activeFirstElements(tabComponent);
}