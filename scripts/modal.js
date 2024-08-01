import { loadFragment } from '../blocks/fragment/fragment.js';
import {
  buildBlock, decorateIcons,
} from './aem.js';
import { span, button } from './dom-builder.js';

// This is not a traditional block, so there is no decorate function. Instead, links to
// a */modals/* path  are automatically transformed into a modal. Other blocks can also use
// the createModal() and openModal() functions.

export async function createModal(contentNodes) {
  const dialog = document.createElement('dialog');
  dialog.classList.add(...'p-0 border rounded transform flex flex-col-reverse'.split(' '));
  const dialogContent = document.createElement('div');
  dialogContent.classList.add(...'modal-content flex flex-col'.split(' '));
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);
  const closeButton = button(
    {
      class: 'close-btn float-right bg-white rounded-full p-3 ml-auto w-max inline-flex',
      'aria-label': 'Close',
      type: 'button',
      onclick: () => dialog.close(),
    },
    span({ class: 'icon icon-close invert' }),
  );
  dialog.append(closeButton);

  // close dialog on clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
  dialog.addEventListener('click', (event) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
      dialog.close();
    }
  });

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  // decorateBlock(block);
  // await loadBlock(block);
  decorateIcons(closeButton);

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    block.remove();
  });

  block.append(dialog);
  return {
    block,
    showModal: () => {
      dialog.showModal();
      // Google Chrome restores the scroll position when the dialog is reopened,
      // so we need to reset it.
      setTimeout(() => { dialogContent.scrollTop = 0; }, 0);

      document.body.classList.add('modal-open');
    },
  };
}

export async function openModal(fragmentUrl) {
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  const { showModal } = await createModal(fragment.childNodes);
  showModal();
}

export function decorateModals(element) {
  element.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');
    if (origin && origin.href && origin.href.includes('/modals/')) {
      e.preventDefault();
      openModal(origin.href);
    }
  });
}
