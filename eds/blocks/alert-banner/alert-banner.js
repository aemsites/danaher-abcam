export default function decorate(block) {
  block.classList.add(...'bg-black text-white p-8 flex'.split(' '));
  const childDivs = block.querySelectorAll('div > div');
  childDivs.forEach((childDiv, index) => {
    if (!childDiv.innerHTML.trim()) {
      childDiv.remove();
    } else {
      childDiv.classList.add(`child-${index + 1}`);
      if (childDiv.classList.contains('child-2')) {
        const paragraphs = childDiv.querySelectorAll('p');
        paragraphs.forEach((p, i) => {
          p.classList.add(`paragraph-${i + 1}`);
        });
        const listItems = childDiv.querySelectorAll('li');
        listItems.forEach((li, i) => {
          li.classList.add(`list-item-${i + 1}`);
        });
        const listOfNewFeatures = childDiv.querySelector('ul'); 
        if (listOfNewFeatures) {
          listOfNewFeatures.classList.add('unordered-list');
        }
        const paragraph3 = childDiv.querySelector('.paragraph-3');
        const paragraph4 = childDiv.querySelector('.paragraph-4');
        if (paragraph3 && listOfNewFeatures && paragraph4) {
          const wrapperDiv = document.createElement('div');
          wrapperDiv.classList.add('wrapper-class'); 
          wrapperDiv.classList.add('hidden');
          wrapperDiv.appendChild(paragraph3);
          wrapperDiv.appendChild(listOfNewFeatures);
          wrapperDiv.appendChild(paragraph4);
          childDiv.appendChild(wrapperDiv);
        }
      }
    }
  });
  const showMoreButton = block.querySelector('.button-container .button');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      const wrapperDiv = block.querySelector('.child-2 .wrapper-class');
      if (wrapperDiv) {
        wrapperDiv.classList.toggle('hidden'); 
      }
      if (wrapperDiv && wrapperDiv.classList.contains('hidden')) {
        showMoreButton.textContent = 'Show more'; 
      } else {
        showMoreButton.textContent = 'Show less';
      }
    });
  }
  console.log(block);
}
