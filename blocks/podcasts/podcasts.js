import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add(...'podcast-list flex border-[#D8D8D8] border-b-2 py-8 relative max-[799px]:flex-col'.split(' '));
    [...row.children].forEach((div, index) => {
      const podcastClassName = `podcast-section-${index + 1}`;
      div.classList.add(podcastClassName);
    });

    const podcastSection2 = row.querySelector('.podcast-section-2');
    podcastSection2.classList.add(...'ml-6 w-[65%] max-[799px]:w-full max-[799px]:ml-0'.split(' '));

    const podcastPictureTag = row.querySelector('.podcast-section-1 picture');
    const podcastImg = podcastPictureTag.querySelector('img');
    if (podcastImg) {
      podcastImg.classList.add(...'w-[200px] h-[200px] object-cover max-[799px]:w-full max-[799px]:h-[200px]'.split(' '));
    }

    const podcastHeading = row.querySelector('h2');
    if (podcastHeading) {
      podcastHeading.classList.add(...'text-black text-2xl font-bold leading-8 max-[799px]:text-base max-[799px]:mt-6 max-[799px]:w-[65%]'.split(' '));
    }

    const podcastSubHeading = row.querySelector('h3');
    if (podcastSubHeading) {
      podcastSubHeading.classList.add(...'text-black text-2xl font-normal leading-8 max-[799px]:text-base max-[799px]:w-[65%]'.split(' '));
    }

    const podcastDescription = row.querySelector('p');
    if (podcastDescription) {
      podcastDescription.classList.add(...'text-black text-sm font-normal mt-4 mb-6'.split(' '));
    }

    const podcastSection4 = row.querySelector('.podcast-section-4');
    if (podcastSection4 && podcastDescription) {
      podcastDescription.parentNode.insertBefore(podcastSection4, podcastDescription.nextSibling);
    }

    const linkParagraphs = [...podcastSection2.querySelectorAll('p')].slice(2, 6); // Selecting the 3 <p> elements after podcastSection4
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
    btnIconContainer.classList.add(...'flex items-center ml-12 max-[799px]:ml-8 max-[799px]:flex-col'.split(' '));
    const streamText = document.createElement('span');
    streamText.classList.add(...'text-sm text-[#8B8B8B] mr-6 max-[799px]:mr-0'.split(' '));
    streamText.textContent = 'Also Available on';
    btnIconContainer.appendChild(streamText);
    
    const iconContainer = document.createElement('div');
    iconContainer.classList.add(...'flex max-[799px]:mt-2 max-[799px]:w-full max-[799px]:justify-between'.split(' '));
    iconContainer.append(streamIcon1, streamIcon2, streamIcon3);
    

    btnIconContainer.appendChild(iconContainer);
    podcastSection2.appendChild(btnIconContainer);

    const ctaIconContainer = document.createElement('div');
    ctaIconContainer.classList.add(...'flex items-center max-[799px]:justify-between'.split(' '));
    ctaIconContainer.append(
      podcastSection4, btnIconContainer
    )
    podcastSection2.appendChild(ctaIconContainer);
    const podcastSection3 = row.querySelector('.podcast-section-3');
    podcastSection3.classList.add(...'absolute right-0 top-16 max-[799px]:top-64'.split(' '));
    podcastSection2.appendChild(podcastSection3);

    const audioLabels = row.querySelectorAll('.podcast-section-3 .audio-label');
    audioLabels.forEach((label) => {
      label.style.display = 'none';
    });

    const audioPlayIcons = row.querySelectorAll('.audio-play-icon img');
    audioPlayIcons.forEach((audioPlayIcon) => {
      audioPlayIcon.classList.add(...'mb-0 w-16 h-16 max-[799px]:w-10 max-[799px]:h-10'.split(' '));
    });

    const audioPlayPauseIcons = row.querySelectorAll('.audio-play-pause-icon img');
    audioPlayPauseIcons.forEach((audioPlayPauseIcon) => {
      audioPlayPauseIcon.classList.add(...'mb-0 w-16 h-16 max-[799px]:w-10 max-[799px]:h-10'.split(' '));
    });
    

    // const buttonContainer = row.querySelector('.button-container');
    // buttonContainer.classList.add(...'text-black text-lg font-bold px-4 py-4 leading-[0rem] bg-white border border-[#000] rounded-[40px] max-[799px]:px-2 max-[799px]:py-2 max-[799px]:text-base'.split(' '));

    // const podcastSection4 = row.querySelector('.podcast-section-4');
    // podcastSection4.classList.add(...'ml-12 text-sm text-[#8B8B8B] max-[799px]:ml-8 max-[799px]:mb-1.5'.split(' '));

    // const podcastSection6 = row.querySelector('.podcast-section-6');
    // podcastSection6.classList.add('ml-4');
    // const podcastSection6Img = row.querySelector('.podcast-section-5 img');
    // const spotifyLink = podcastSection6.querySelector('a');
    // if (spotifyLink) {
    //   spotifyLink.textContent = '';
    //   spotifyLink.appendChild(podcastSection6Img);
    // }

    // const podcastSection8 = row.querySelector('.podcast-section-8');
    // podcastSection8.classList.add('ml-4');
    // const podcastSection7Img = row.querySelector('.podcast-section-7 img');
    // const appleLink = podcastSection8.querySelector('a');
    // if (appleLink) {
    //   appleLink.textContent = '';
    //   appleLink.appendChild(podcastSection7Img);
    // }

    // const podcastSection10 = row.querySelector('.podcast-section-10');
    // podcastSection10.classList.add('ml-4');
    // const podcastSection9Img = row.querySelector('.podcast-section-9 img');
    // const youtubeLink = podcastSection10.querySelector('a');
    // if (youtubeLink) {
    //   youtubeLink.textContent = '';
    //   youtubeLink.appendChild(podcastSection9Img);
    // }

    // const streamedIcons = document.createElement('div');
    // streamedIcons.classList.add(...'flex items-center max-[799px]:justify-between'.split(' '));

    // const streamedIcon = document.createElement('div');
    // streamedIcon.classList.add('flex');

    // const combineSection = document.createElement('div');
    // combineSection.classList.add(...'flex items-center max-[799px]:flex-col'.split(' '));
    // combineSection.append(
    //   podcastSection4,
    //   streamedIcon,
    // );

    // streamedIcon.append(
    //   podcastSection6,
    //   podcastSection8,
    //   podcastSection10,
    // );

    // streamedIcons.append(
    //   buttonContainer,
    //   combineSection,
    // );

    // row.appendChild(streamedIcons);
    // podcastSection2.appendChild(streamedIcons);

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
