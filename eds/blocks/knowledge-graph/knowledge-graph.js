import { loadCSS, loadScript } from '../../scripts/aem.js';
import {
  div,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  await loadScript('/eds/scripts/cytoscape.js');
  await loadCSS('/eds/styles/knowledge-graph.css');
  const response = await fetch('/eds/fragments/knowledge-graph.html');
  if (response.ok) {
    const html = await response.text();
    const mainContainer = div({ class: 'flex flex-col mx-auto xl:max-w-7xl xl:px-0 px-6 lg:px-6 xl:max-w-[1120px]' });
    mainContainer.innerHTML = html;
    block.append(mainContainer);
  }
}
