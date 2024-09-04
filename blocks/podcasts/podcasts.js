export default function decorate(block) {
    console.log("myBlk", block);

    const podcastSection = block.querySelector('.podcasts');
    podcastSection.classList.add('flex');
    const podcastPictureTag = block.querySelector('picture');
    podcastImg = podcastPictureTag.querySelector('img');
    podcastImg.classList.add('w-[200px] h-[200px]');
}