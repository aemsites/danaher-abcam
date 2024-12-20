import { div, hr } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.innerHTML = `<div class="product-notes-block">
    <div><h2>Notes</h2></div>
    <div>
      <p>A recombinant rabbit monoclonal alternative is available to this target – ab176842</p>
      <p>Rabbit polyclonal IgG (ab171870) is suitable for use as an isotype control with this antibody.</p>
      <p>Abcam is leading the way to address reproducibility in scientific research with our highly validated recombinant monoclonal and recombinant multiclonal antibodies. Search & select one of Abcam's thousands of recombinant alternatives to eliminate batch-variability and unnecessary animal use.</p>
      <p>If you do not find a host species to meet your needs, our catalogue and custom Chimeric range provides scientists the specificity of Abcam's RabMAbs in the species backbone of your choice. Remember to also review our range of edited cell lines, proteins and biochemicals relevant to your target that may help you further your research goals.</p>
      <p>Abcam antibodies are extensively validated in a wide range of species and applications, so please check the reagent specifications meet your scientific needs before purchasing. If you have any questions or bespoke requirements, simply visit the Contact Us page to send us an inquiry or contact our Support Team ahead of purchase.</p>
    </div>    
  </div>`;
  const storageNotes = block.querySelector('h2');
  const storagePEl = div();
  block.prepend(
    hr({
      class: 'h-px my-2 bg-interactive-grey-active mb-4',
    }),
  );
  block.append(storageNotes);
  block.querySelectorAll('p').forEach((p) => {
    p.classList.add(...'mb-2 text-base font-normal'.split(' '));
    storagePEl.appendChild(p);
  });
  block.append(storagePEl);
}
