export default function decorate(block) {
  const pictureTag = block.querySelectorAll('picture');
  pictureTag.forEach((picture) => {
    const imgTag = picture.querySelector('img');
    if (imgTag) {
      imgTag.classList.add('max-[799px]:w-full');
    }
  });

  [...block.children].forEach((row) => {
    row.classList.add(...'bg-[#e5e7eb] pb-12'.split(' '));
    [...row.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body py-3 px-8 flex flex-col grow';
    });

    const cardHeading = row.querySelector('h3');
    cardHeading.classList.add(...'card-heading text-2xl pt-8 tracking-[-0.03em]'.split(' '));

    const cardDescription = row.querySelector('p');
    if (cardDescription) {
      cardDescription.classList.add(...'card-description h-24 text-base tracking-wide'.split(' '));
    }

    const cardLink = row.querySelector('p a');
    if (cardLink) {
      cardLink.classList.add(...'card-link pb-3 w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]'.split(' '));
    }
  });
}
