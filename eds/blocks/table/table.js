import { applyClasses, moveInstrumentation } from '../../scripts/scripts.js';
import {
  table, tbody, td, th, thead, tr,
} from '../../scripts/dom-builder.js';

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  const t = table();
  const tblHead = thead();
  const tblBody = tbody();
  const header = !block.classList.contains('no-header');

  [...block.children].forEach((row, i) => {
    const tblRow = tr();
    moveInstrumentation(row, tblRow);

    [...row.children].forEach((cell) => {
      const tblData = (i === 0 && header) ? th() : td();
      applyClasses(tblData, 'p-4');
      if (i === 0) tblData.setAttribute('scope', 'column');
      tblData.innerHTML = cell.innerHTML;
      if (tblData.hasChildNodes() || i === 0) {
        tblData.querySelectorAll('a').forEach((aEl) => {
          applyClasses(aEl, 'text-[#378189] underline');
        });
      }
      applyClasses(tblRow, 'border-t border-[#273F3F] border-opacity-25 text-left');
      tblRow.append(tblData);
    });
    if (i === 0 && header) tblHead.append(tblRow);
    else tblBody.append(tblRow);
  });
  t.append(tblHead, tblBody);
  block.replaceChildren(t);
}
