import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';
import { div, span } from '../../scripts/dom-builder.js';

function decoratePodcast(podcast) {
  applyClasses(podcast, 'podcast-list flex lg:flex-row border-[#D8D8D8] border-b-2 py-8 relative flex-col');
  const pictureDiv = podcast.querySelector('div:nth-child(1)');
  const img = pictureDiv.querySelector('img');
  if (img) {
    applyClasses(img, 'lg:w-48 lg:h-48 object-cover w-full h-32');
  }

  const contentDiv = podcast.querySelector('div:nth-child(2)');
  applyClasses(contentDiv, 'lg:ml-6 lg:w-2/3 xl:w-3/4 w-full ml-0');

  const allButtons = div({class: 'flex flex-row gap-6'});

  const iconContainer = div({ class: 'flex flex-col lg:flex-row mt-2 lg:gap-4 justify-between' }, 
    div('Also Available on'), 
    div({class: 'icon-container flex gap-2'}));
  contentDiv.querySelectorAll('p > a').forEach((link) => {
    link.parentElement.remove();
    const icon = span({ class: `icon icon-${link.textContent.toLowerCase()}` }, link);
    link.textContent = '';
    iconContainer.querySelector('.icon-container')?.append(icon);
  });
  decorateIcons(iconContainer);

  const h3El = contentDiv.querySelector('h3');
  const button = podcast.querySelector('div.button-container');
  button.querySelector('p')?.classList.add('!my-0');
  allButtons.append(button, iconContainer);
  contentDiv.append(allButtons);

  const audioPlayIconContainers = podcast.querySelector('.audio-play-icon');
  audioPlayIconContainers.addEventListener('click', () => {
    const audioPlayer = audioPlayIconContainers.parentElement.querySelector('.audio-player');
    h3El.after(audioPlayer);
  });
}

export default function decorate(block) {
  [...block.children].forEach((podcast) => {
    decoratePodcast(podcast);
  });
}
