export default function decorate(block) {
    [...block.children].forEach((row) => {
        row.classList.add(...'flex max-[799px]:block'.split(' '));
        [...row.children].forEach((div, index) => {
            const podcastClassName = `podcast-section-${index + 1}`;
            div.classList.add(podcastClassName);
        });
        const podcastSection2 = row.querySelector('.podcast-section-2');
        podcastSection2.classList.add(...'ml-6 w-[65%] max-[799px]:w-full max-[799px]:ml-0'.split(' '));

        const podcastPictureTag = row.querySelector('picture');
        const podcastImg = podcastPictureTag.querySelector('img');
        if (podcastImg) {
            podcastImg.classList.add(...'w-[200px] h-[200px] object-cover'.split(' '));
        }
        const podcastHeading = row.querySelector('h2');
        if (podcastHeading) {
            podcastHeading.classList.add(...'text-black text-2xl font-bold leading-8'.split(' '));
        }

        const podcastSubHeading = row.querySelector('h3');
        if (podcastSubHeading) {
            podcastSubHeading.classList.add(...'text-black text-2xl font-normal leading-8'.split(' '));
        }

        const podcastDescription = row.querySelector('p');
        if (podcastDescription) {
            podcastDescription.classList.add(...'text-black text-sm font-normal mt-4 mb-6'.split(' '));
        }
    });
}
