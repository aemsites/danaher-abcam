import { getMetadata } from '../../scripts/aem.js';
import { div, h1 } from '../../scripts/dom-builder.js';

function setSidebarMaxHeight() {
  let height = 0;
  const sidebar = document.querySelector('#sidebar');
  if (sidebar) {
    [...sidebar.children].forEach((element) => {
      height += element.offsetHeight;
    });
    sidebar.style.maxHeight = `${height + 50}px`;
  }
}

function setSidebarHeight() {
  window.addEventListener('resize', setSidebarMaxHeight);
  window.addEventListener('click', setSidebarMaxHeight);
}

export default function buildAutoBlocks(block) {
  const contentBlocks = block.querySelectorAll('.section');

  // Creating the default template wrapper
  const defaultTemplate = div({ id: 'content-wrapper' });

  // Creating content wrapper
  const content = div({ id: 'main' });
  const title = getMetadata('og:title');
  const description = getMetadata('og:description');

  const headTitle = div(
    { class: 'border border-b-slate-400 mb-10' },
    div(
      { class: 'w-3/4 m-auto my-12 font-sans text-base flex flex-col justify-center' },
      h1({ class: 'my-5 text-black-0 text-6xl font-semibold tracking-normal' }, title),
      div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }),
      div({ class: 'text-xl tracking-normal' }, description),
    ),
  );

  content.append(headTitle);

  // Creating outer element
  const outerElement = div({ class: 'm-auto bg-white text-black-0 max-w-screen-7xl' });

  // Creating main and sidebar elements
  const main = div({ id: 'content', class: 'flex 2xl:mx-80 xl:mx-44 lg:mx-32 md:mx-24 mx-12' });

  const mainContainer = div({ class: 'mb-10' });
  const sidebarContainer = div({ class: 'relative lg:mr-[-8%]' });
  const sideNavWrapper = div({ class: 'flex flex-col h-full mx-[30.5%] lgd:hidden lgu:visible' });

  const sidebar = div({ id: 'sidebar', class: 'sticky top-32 mt-4' });

  // Iterate over each section
  contentBlocks.forEach((blocks) => {
    // Handling sidebars within each section
    const sidebars = blocks.querySelectorAll('[data-block-name^="sticky-right-navigation"]');
    if (sidebars.length > 0) {
      sidebars.forEach((sidebarItem) => {
        sidebar.appendChild(sidebarItem); // Clone to keep the original in place
      });
    }
    mainContainer.appendChild(blocks);
    // sidebar.appendChild(blocks);
    blocks.style.display = null;
  });

  sideNavWrapper.appendChild(sidebar);
  sidebarContainer.appendChild(sideNavWrapper);
  main.appendChild(mainContainer);
  main.appendChild(sidebarContainer);
  outerElement.appendChild(main);
  if (!sidebar.children.length > 0) {
    main.className = 'm-auto 2xl:mx-80 xl:mx-44 lg:mx-32 md:mx-24 mx-12 mb-16 bg-white text-black-0';
    mainContainer.className = 'w-full';
  }
  content.appendChild(outerElement);
  defaultTemplate.appendChild(content);
  block.appendChild(defaultTemplate);

  const observer = new MutationObserver(() => {
    setSidebarMaxHeight();
  });
  observer.observe(sidebar, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
  setTimeout(() => setSidebarMaxHeight(), 1000);
  setSidebarHeight();
}
