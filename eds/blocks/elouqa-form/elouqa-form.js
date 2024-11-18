import { decorateIcons, loadScript } from '../../scripts/aem.js';
import { div, img, span } from '../../scripts/dom-builder.js';
import { getFragmentFromFile, postFormAction } from '../../scripts/scripts.js';

function postAction(formEl, loaderEl) {
  const formAction = formEl?.action;
  fetch(formAction, {
    method: 'POST',
    body: new FormData(formEl),
  }).then((response) => {
    if (response.status === 200) {
      postFormAction();
    } else {
      console.error('An error occurred while submitting the form');
    }
  }).catch((error) => {
    console.error('Error:', error);
  }).finally(() => {
    formEl.classList.add('opacity-25');
    loaderEl.remove();
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.classList.add('relative');
  try {
    const videoLink = block.querySelector('a');
    const fragment = await getFragmentFromFile('/eds/fragments/elouqa-form.html');
    const fragmentCSS = await getFragmentFromFile('/eds/styles/elouqa-form.css');
    const fragmentCustomScript = await getFragmentFromFile('/eds/scripts/elouqa-script.js');
    block.innerHTML = '';
    if (fragment) {
      await loadScript('https://img06.en25.com/i/livevalidation_standalone.compressed.js');
      const parser = new DOMParser();
      const fragmentHtml = parser.parseFromString(fragment, 'text/html');
      block.innerHTML = fragmentHtml.body.innerHTML;
    }
    if (fragmentCSS) {
      const fragmentStyle = document.createElement('style');
      fragmentStyle.type = 'text/css';
      fragmentStyle.append(fragmentCSS);
      document.head.append(fragmentStyle);
    }
    if (fragmentCustomScript) {
      const fragmentScript = document.createElement('script');
      fragmentScript.type = 'text/javascript';
      fragmentScript.append(fragmentCustomScript);
      document.body.append(fragmentScript);
    }
    const formEl = block.querySelector('form');
    const allFormInputFields = formEl?.querySelectorAll('input');
    const allFormSelectFields = formEl?.querySelectorAll('select');
    allFormInputFields.forEach((inputField) => {
      inputField.classList.add(...'block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500'.split(' '));
    });
    allFormSelectFields.forEach((selectField) => {
      selectField.classList.add(...'block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500'.split(' '));
    });
    formEl?.addEventListener('submit', (event) => {
      event.preventDefault();
      const loaderEl = div(
        { class: 'absolute inset-0 flex justify-center items-center z-10' },
        img({ class: 'size-10', src: 'https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/12-dots-scale-rotate-black-36.svg' }),
        span({ class: 'icon icon-close' }),
      );
      formEl.classList.add('opacity-25');
      formEl.parentElement.insertBefore(loaderEl, formEl);
      postAction();
      decorateIcons(block);
    });
  } catch (e) {
    block.textContent = '';
    // eslint-disable-next-line no-console
    console.warn(`cannot load snippet at ${e}`);
  }
}
