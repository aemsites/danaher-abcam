import {
  table, thead, tbody, th, tr, td,
} from '../../scripts/dom-builder.js';

function buildCell(rowIndex) {
  const cell = rowIndex ? td({ class: 'break-words content-baseline text-base text-black py-2 pr-2' }) : th({ class: 'text-left pt-2 pb-1 text-xs text-[#65797c]' });
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const mainTable = table({ class: 'table-fixed table-auto w-full' });
  const mainThead = thead({});
  const mainTbody = tbody({});

  const header = !block.classList.contains('no-header');
  if (header) {
    mainTable.append(mainThead);
  }
  mainTable.append(mainTbody);

  [...block.children].forEach((child, i) => {
    const tableRow = tr({ class: 'border-b-2 border-[#e5e7eb]' });
    if (header && i === 0) mainThead.append(tableRow);
    else mainTbody.append(tableRow);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      tableRow.append(cell);
      const anchorTd = col.querySelector('a');
      if (anchorTd) {
        anchorTd.classList.add(...'text-base text-[#378189] underline'.split(' '));
        cell.appendChild(anchorTd);
      } else {
        cell.innerHTML = col.innerHTML;
      }
    });
  });
  block.innerHTML = '';
  block.append(mainTable);
}
