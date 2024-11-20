import { decorateIcons, loadScript } from '../../scripts/aem.js';
import { div, img, span } from '../../scripts/dom-builder.js';
import { getFragmentFromFile, postFormAction } from '../../scripts/scripts.js';

function postAction(formEl, videoEl) {
  const formAction = formEl?.action;
  const loaderEl = div(
    { class: 'absolute inset-0 flex justify-center items-center z-10' },
    img({ class: 'size-10', src: 'https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/12-dots-scale-rotate-black-36.svg' }),
    span({ class: 'icon icon-close' }),
  );
  formEl.classList.add('opacity-25');
  formEl.parentElement.insertBefore(loaderEl, formEl);
  fetch(formAction, {
    method: 'POST',
    body: new FormData(formEl),
  }).then((response) => {
    if (response.status === 200) {
      videoEl.title = 'video';
      postFormAction(videoEl ? videoEl.href : '');
      formEl.nextElementSibling.classList.remove('hidden');
      formEl.classList.add('hidden');
    } else throw new Error({ name: 'Error', message: 'An error occurred while submitting the form' });
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }).finally(() => {
    formEl?.classList.remove('opacity-25');
    loaderEl.remove();
  });
}

function formStyle(formEl) {
  const allFormInputFields = formEl?.querySelectorAll('input:not([type="submit"])');
  const allFormSelectFields = formEl?.querySelectorAll('select');
  allFormInputFields.forEach((inputField) => {
    inputField.classList.add(...'block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500'.split(' '));
  });
  allFormSelectFields.forEach((selectField) => {
    selectField.classList.add(...'block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500'.split(' '));
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.classList.add('relative', 'bg-[#F2F2F2]');
   if (block.classList.contains('cols-2')) {
        block.classList.add('grid', 'grid-cols-2', 'p-5');
    }
  try {
    const videoLink = block.querySelector('a');
    if (localStorage.getItem('ELOUQA')) {
      videoLink.title = 'video';
      postFormAction(videoLink);
    } else {
      const fragment = await getFragmentFromFile('/eds/fragments/elouqa-form.html');
      const fragmentCSS = await getFragmentFromFile('/eds/styles/elouqa-form.css');
      const fragmentCustomScript = await getFragmentFromFile('/eds/scripts/elouqa-script.js');
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
      if (videoLink) block.append(div({ class: 'hidden' }, videoLink));
      const formEl = block.querySelector('form');
      formStyle(formEl);
      formEl?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!formEl.querySelector('.LV_invalid_field')) {
          postAction(formEl, videoLink);
          decorateIcons(block);
        }
      });
    }
  } catch (e) {
    // block.textContent = '';
    // eslint-disable-next-line no-console
    console.warn(`cannot load snippet at ${e}`);
  }
}
