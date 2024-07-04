export default async function buildAutoBlocks() {
    const main = document.querySelector('main');
    main.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-32 py-16'.split(' '));
    const productOverviewSection = main.querySelector(':scope > div:nth-child(2)');
    productOverviewSection.classList.add(...'grid grid-cols-12'.split(' '));
}
