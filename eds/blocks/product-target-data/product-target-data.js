import {
  a,
  div,
  hr,
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = `<div class="product-target-block ">
      <h3>Target Data</h3>
      <div>
          <a href="/en-us/target/mki67/27304" target="_blank">See full target information MKI67</a>
      </div>
      <div>
          <strong>Function</strong> 
          <div>Required to maintain individual mitotic chromosomes dispersed in the cytoplasm following nuclear envelope disassembly (PubMed:27362226). Associates with the surface of the mitotic chromosome, the perichromosomal layer, and covers a substantial fraction of the chromosome surface (PubMed:27362226). Prevents chromosomes from collapsing into a single chromatin mass by forming a steric and electrostatic charge barrier: the protein has a high net electrical charge and acts as a surfactant, dispersing chromosomes and enabling independent chromosome motility (PubMed:27362226). Binds DNA, with a preference for supercoiled DNA and AT-rich DNA (PubMed:10878551). Does not contribute to the internal structure of mitotic chromosomes (By similarity). May play a role in chromatin organization (PubMed:24867636). It is however unclear whether it plays a direct role in chromatin organization or whether it is an indirect consequence of its function in maintaining mitotic chromosomes dispersed (Probable).</div>
      </div>
  </div>`;
  const targetContainer = div({ class: 'py-2 flex flex-col' });
  const h3El = block.querySelector('h3');
  const protocolsPEl = block.querySelectorAll('div > div > div');
  const href = block.querySelector('div > div > a').getAttribute('href');
  const targetData = block.querySelector('div > div > a').textContent;
  block.querySelector('.product-target-block').remove();
  targetContainer.append(h3El);
  applyClasses(protocolsPEl[3], 'mr-0 mb-6 mt-2');
  targetContainer.append(protocolsPEl[3]);
  targetContainer.append(a(
    { class: 'w-fit inline-flex items-center underline text-[#378189]', href },
    `${targetData}`,
    span({ class: 'icon icon-arrow-right size-4 ml-2' }),
  ));
  decorateIcons(targetContainer);
  block.append(targetContainer);
  block.prepend(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
}
