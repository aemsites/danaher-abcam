import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add(...'podcast-list flex lg:flex-row border-[#D8D8D8] border-b-2 py-8 relative flex-col'.split(' '));
    [...row.children].forEach((div, index) => {
      const podcastClassName = `podcast-section-${index + 1}`;
      div.classList.add(podcastClassName);
    });

    const podcastSection2 = row.querySelector('.podcast-section-2');
    podcastSection2.classList.add(...'lg:ml-6 lg:w-2/3 xl:w-3/4 w-full ml-0'.split(' '));

    const podcastPictureTag = row.querySelector('.podcast-section-1 picture');
    const podcastImg = podcastPictureTag.querySelector('img');
    if (podcastImg) {
      podcastImg.classList.add(...'lg:w-48 lg:h-48 object-cover w-full h-32'.split(' '));
    }

    const podcastHeading = row.querySelector('h2');
    if (podcastHeading) {
      podcastHeading.classList.add(...'text-black lg:text-2xl lg:!m-0 font-bold leading-8 text-base mt-6 w-2/3'.split(' '));
    }

    const podcastSubHeading = row.querySelector('h3');
    if (podcastSubHeading) {
      podcastSubHeading.classList.add(...'text-black lg:!text-2xl lg:!m-0 !font-normal leading-8 text-base w-2/3'.split(' '));
    }

    const podcastDescription = row.querySelector('p');
    if (podcastDescription) {
      podcastDescription.classList.add(...'text-black text-sm font-normal mt-4 mb-6'.split(' '));
    }

    const podcastSection4 = row.querySelector('.podcast-section-4');
    if (podcastSection4 && podcastDescription) {
      podcastDescription.parentNode.insertBefore(podcastSection4, podcastDescription.nextSibling);
    }

    const linkParagraphs = [...podcastSection2.querySelectorAll('p')].slice(2, 6);
    linkParagraphs.forEach((paragraph, index) => {
      const streamIcons = `stream-icon-${index + 1}`;
      paragraph.classList.add(streamIcons);
    });

    const streamIcon1 = row.querySelector('.stream-icon-1 a');
    streamIcon1.textContent = '';
    streamIcon1.setAttribute('target', '_blank');
    streamIcon1.classList.add('mr-6');
    const spotifyIcon = document.createElement('span');
    spotifyIcon.classList.add(...'icon icon-spotify'.split(' '));
    streamIcon1.appendChild(spotifyIcon);
    decorateIcons(streamIcon1);

    const streamIcon2 = row.querySelector('.stream-icon-2 a');
    streamIcon2.textContent = '';
    streamIcon2.setAttribute('target', '_blank');
    streamIcon2.classList.add('mr-6');
    const appleIcon = document.createElement('span');
    appleIcon.classList.add(...'icon icon-apple'.split(' '));
    streamIcon2.appendChild(appleIcon);
    decorateIcons(streamIcon2);

    const streamIcon3 = row.querySelector('.stream-icon-3 a');
    streamIcon3.textContent = '';
    streamIcon3.setAttribute('target', '_blank');
    const youtubeIcon = document.createElement('span');
    youtubeIcon.classList.add(...'icon icon-youtube-red'.split(' '));
    streamIcon3.appendChild(youtubeIcon);
    decorateIcons(streamIcon3);

    const btnIconContainer = document.createElement('div');
    btnIconContainer.classList.add(...'flex lg:flex-row items-center lg:ml-12 ml-8 flex-col'.split(' '));
    const streamText = document.createElement('span');
    streamText.classList.add(...'text-sm text-[#8B8B8B] lg:mr-6 mr-0 w-full'.split(' '));
    streamText.textContent = 'Also Available on';
    btnIconContainer.appendChild(streamText);

    const iconContainer = document.createElement('div');
    iconContainer.classList.add(...'flex mt-2 w-full justify-between'.split(' '));
    iconContainer.append(streamIcon1, streamIcon2, streamIcon3);

    btnIconContainer.appendChild(iconContainer);
    podcastSection2.appendChild(btnIconContainer);

    const ctaIconContainer = document.createElement('div');
    ctaIconContainer.classList.add(...'flex items-center justify-between lg:justify-start'.split(' '));
    ctaIconContainer.append(podcastSection4, btnIconContainer);
    podcastSection2.appendChild(ctaIconContainer);
    const podcastSection3 = row.querySelector('.podcast-section-3');
    podcastSection3.classList.add(...'absolute right-0 lg:top-16 top-48'.split(' '));
    podcastSection2.appendChild(podcastSection3);

    const audioLabels = row.querySelectorAll('.podcast-section-3 .audio-label');
    audioLabels.forEach((label) => {
      label.style.display = 'none';
    });

    const audioPlayIcons = row.querySelectorAll('.audio-play-icon img');
    audioPlayIcons.forEach((audioPlayIcon) => {
      audioPlayIcon.classList.add(...'mb-0 lg:w-16 lg:h-16 w-10 h-10'.split(' '));
    });

    const audioPlayPauseIcons = row.querySelectorAll('.audio-play-pause-icon img');
    audioPlayPauseIcons.forEach((audioPlayPauseIcon) => {
      audioPlayPauseIcon.classList.add(...'mb-0 lg:w-16 lg:h-16 w-10 h-10'.split(' '));
    });

    const audioPlayIconContainers = row.querySelectorAll('.audio-play-icon');
    audioPlayIconContainers.forEach((playIconContainer) => {
      playIconContainer.addEventListener('click', () => {
        const audioPlayers = podcastSection3.querySelectorAll('.audio-player');
        if (podcastDescription) {
          audioPlayers.forEach((audioPlayer) => {
            podcastDescription.insertAdjacentElement('beforebegin', audioPlayer);
          });
        }
      });
    });
  });
}
