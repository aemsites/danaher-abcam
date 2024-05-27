export default function decorate(block) {
  const rightNavLinks = document.querySelectorAll('h2');
  const navLinksUl = document.createElement('ul');
  navLinksUl.classList.add(...'sticky-ul max-[768px]:hidden'.split(' '));
  rightNavLinks.forEach((rightNavLink) => {
    const liElement = document.createElement('li');
    liElement.classList.add(...'w-72 rounded-3xl mb-2 pr-3.5 pl-3.5 py-2.5 hover:bg-[#f2f2f2]'.split(' '));

    const anchorElement = document.createElement('a');
    anchorElement.classList.add(...'text-base text-black font-bold'.split(' '));

    anchorElement.textContent = rightNavLink.textContent;
    anchorElement.href = `#${rightNavLink.id}`;

    liElement.appendChild(anchorElement);
    navLinksUl.appendChild(liElement);
  });
  block.appendChild(navLinksUl);
}
