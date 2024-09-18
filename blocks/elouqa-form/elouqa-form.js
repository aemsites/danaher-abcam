import {
  form, input, label, div,
  select, option, span,
} from '../../scripts/dom-builder.js';
import { loadScript } from '../../scripts/aem.js';

async function loadForm(block) {
  console.log('Load Form', block);
  await loadScript('https://img06.en25.com/i/livevalidation_standalone.compressed.js');
}

export default function decorate(block) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadForm(block);
    }
  });
  observer.observe(block);
  console.log(block);
}
