import { loadScript } from '../../scripts/aem.js';
import { getFragmentFromFile } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  try {
    // get the content
    const fragment = await getFragmentFromFile('/fragments/elouqa-form.html');
    const fragmentCSS = await getFragmentFromFile('/styles/elouqa-form.css');
    const fragmentCustomScript = await getFragmentFromFile('/styles/elouqa-form.css');
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
      const fragmentScript = document.createElement('style');
      fragmentScript.type = 'text/javascript';
      fragmentScript.append(fragmentCustomScript);
      document.body.append(fragmentScript);
    }
  } catch (e) {
    block.textContent = '';
    // eslint-disable-next-line no-console
    console.warn(`cannot load snippet at ${e}`);
  }
}
