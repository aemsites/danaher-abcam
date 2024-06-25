function removeActiveClasses(content) {
  const contentElements = content.querySelectorAll('.tabpanel');
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
  const contentElement = content.querySelector('.tabpanel');
  contentElement.classList.add('active');
  const listElement = content.querySelector('button');
  listElement.classList.add('active');
}

export default function decorate(block) {
  const tabComponent = document.createElement('div');
  tabComponent.className = 'mmg-tabs';
  // tabComponent.classList.add('p-5');
  const ul = document.createElement('div');
  ul.className = 'tablist flex mb-10';
  const tabContent = document.createElement('div');
  tabContent.className = 'tabpanels overflow-hidden relative';
  // tabComponent.classList.add('overflow-hidden relative');

  // Iterate through block's children and create tabs
  [...block.children].forEach((row) => {
    const itemContent = row.children[1];
    itemContent.className = 'tabpanel';
    const li = document.createElement('button');
    li.className = 'tab p-5';
    li.appendChild(row.children[0]);

    li.addEventListener('click', () => {
      removeActiveClasses(tabComponent);
      li.classList.add('active');
      itemContent.classList.add('active');
    });
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