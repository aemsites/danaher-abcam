import { div, span, p, h3 } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.innerHTML = `<div>
        <div class="product-alternate-block ">
            <h3>Consider this alternative</h3>
            <ul>
               <li>
                  <a>
                     <p></p>
                     <p></p>
                     <p>Anti-Histone H3 antibody [EPR16987] - Nuclear Marker and ChIP Grade</p>
                  </a>
               </li>
            </ul>
        </div>
      </div> `;

      const alternateBlock = block.querySelector('.product-alternate-block .product-alternate-block');
      applyClasses(alternateBlock.parentElement, 'border-t-4 border-gradient');
      //alternateBlock.parentElement.style.background = 'linear-gradient(90.42deg, #4BA6B3 0.44%, #C9D3B7 35.08%, #FF8730 69.72%, #C54428 99.71%)';
      alternateBlock.classList.add(...'bg-[#f2f2f2] p-12'.split(' '));
      applyClasses(alternateBlock.querySelector('h3'), 'font-sans !text-xl !font-semibold');
      applyClasses(alternateBlock.querySelector('ul'), 'my-4 px-12 py-8 bg-white rounded border-[1px] border-[rgba(7,17,18,0.2)]');
      const staticBlock = div({ class:'flex flex-col gap-1 font-sans text-base tracking-wide font-normal' },
         div ({ class:'flex flex-row gap-1 items-center' },
         p({ class:'underline text-[#378189]' }, 'Why this works?'),
         span({ class:'icon icon-chevron-down text-[#378189] cursor-pointer transition-transform duration-300' }),
         ),
      );
      const expandedDiv = div( p({ class:'pb-6' }, 'We’re constantly upgrading our range to offer the highest quality products when you need them. This product will be one of the following alternatives:'),
         h3({ class:'pb-2.5 !text-base !font-semibold' }, 'A recombinant reagent'),
         p({ class:'pb-6' }, 'For increased specificity, reproducibility, and batch-to-batch consistency – and confidence in your results.'),
         h3({ class:'pb-2.5 !text-base !font-semibold' }, 'A premium bioactive protein'),
         p({ class:'pb-6' }, 'For optimal bioactivity, with stringent purity and endotoxin standards.'),
         h3({ class:'pb-2.5 !text-base !font-semibold' }, 'A SimpleStep ELISA® kit'),
         p({ class:'pb-6' }, 'To simplify and accelerate your workflow, delivering results in 90 minutes or less.'),
         h3({ class:'pb-2.5 !text-base !font-semibold' }, 'A faster alternative'),
         p('Superior quality management can sometimes delay our supply – here’s an alternative to keep your research moving.'),
      );

      const expandIcon = staticBlock.querySelector('span');
      console.log(expandIcon);
      expandedDiv.style.display = 'none';
      expandIcon.addEventListener('click', () => {
         // Toggle the visibility of the list
         if (expandedDiv.style.display === 'none') {
            expandedDiv.style.display = 'block';
            expandIcon.classList.add('rotate-180');
         } else {
            expandedDiv.style.display = 'none';
            expandIcon.classList.remove('rotate-180');
         }
      });

      staticBlock.append(expandedDiv);
      decorateIcons(staticBlock, 16, 16);
      alternateBlock.append(staticBlock);
}
