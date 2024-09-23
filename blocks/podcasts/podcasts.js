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

  const allButtons = div({ class: 'grid grid-cols-2 gap-6 lg:w-7/12 w-full' });

  const iconContainer = div(
    { class: 'flex flex-col lg:flex-row mt-2 lg:gap-4 justify-between' },
    div('Also Available on'),
    div({ class: 'icon-container flex gap-2' }),
  );
  contentDiv.querySelectorAll('p > a').forEach((link) => {
    link.parentElement.remove();
    const icon = span({ class: `icon icon-${link.textContent.toLowerCase()}` }, link);
    link.textContent = '';
    iconContainer.querySelector('.icon-container')?.append(icon);
  });
  decorateIcons(iconContainer);

  const button = podcast.querySelector('div.button-container');
  applyClasses(button, 'h-10 mt-2');
  applyClasses(button.querySelector('p'), '!my-0');
  allButtons.append(button, iconContainer);
  contentDiv.append(allButtons);

  const h2El = contentDiv.querySelector('h2');
  const audioDiv = podcast.querySelector('div:nth-child(3)');
  applyClasses(audioDiv, 'right-[-7rem] lg:right-0 top-[-1rem] lg:top-0 relative lg:absolute');
  const headContainer = div({ class: 'grid grid-cols-2' }, h2El, audioDiv);
  contentDiv.prepend(headContainer);

  const audioPlayIconContainers = podcast.querySelector('.audio-play-icon');
  audioPlayIconContainers.addEventListener('click', () => {
    const h3El = contentDiv.querySelector('h3');
    const audioPlayer = audioPlayIconContainers.parentElement.querySelector('.audio-player');
    h3El.after(audioPlayer);
  });
}

export default function decorate(block) {
  [...block.children].forEach((podcast) => {
    decoratePodcast(podcast);
  });
}
