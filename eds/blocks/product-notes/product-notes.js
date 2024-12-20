import { hr } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.innerHTML = `<div class="product-notes-block">
    <div><h2>Notes</h2></div>
    <div>
      Our RabMAb® technology is a patented hybridoma-based technology for making rabbit monoclonal antibodies. 
      For details on our patents, please refer to <a href="/legal/rabmab-patents">RabMAb® patents</a>.
      This product is a recombinant monoclonal antibody, which offers several advantages including:
      <ul>
        <li>- High batch-to-batch consistency and reproducibility</li>
        <li>- Improved sensitivity and specificity</li>
        <li>- Long-term security of supply</li>
        <li>- Animal-free batch production</li>
      </ul>
      For more information, read more on <a href="/technical-resources/product-overview/recombinant-antibodies">recombinant antibodies</a>.
    </div>    
  </div>`;
  block.prepend(
    hr({
      class: 'h-px my-2 bg-interactive-grey-active mb-4',
    }),
  );
  const notesLinks = block.querySelectorAll('a');
  notesLinks.forEach((link) => {
    link.classList.add('hover:underline', 'mr-2', 'text-[#378189]');
  });
  const notesLists = block.querySelectorAll('ul');
  notesLists.forEach((list) => {
    list.classList.add('my-2', 'pl-5');
  });
}
