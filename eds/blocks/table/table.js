import { applyClasses, debounce, moveInstrumentation } from '../../scripts/scripts.js';
import {
  table, tbody, td, th, thead, tr, input, div, form, label, button,
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function handleSearch(event, tableEl) {
  event.preventDefault();
  let { value } = event.target;
  value = value.trim();
  const bodyEl = tableEl.querySelector('tbody');
  const filter = value.toLowerCase();
  const regex = new RegExp(filter, 'gi');
  [...bodyEl.children].forEach((row) => {
    if (!row.textContent.toLowerCase().includes(filter) && value !== '') row.classList.add('hidden');
    else {
      row.classList.remove('hidden');
      [...row.children].forEach((cell) => {
        let text = cell.innerHTML;
        text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
        let newText = text;
        if (value !== '') {
        newText = text.replace(regex, '<mark class="highlight">$&</mark>');
        }
        cell.innerHTML = newText;
      });
    }
  });
}

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  const tableEl = table({ class: 'table-auto w-full' });
  const filterEl = input({
    id: 'search-filter',
    type: 'search',
    name: 'modification',
    placeholder: 'Search here...',
    value: '',
    onkeyup: (event) => handleSearch(event, tableEl),
    onsearch: (event) => handleSearch(event, tableEl),
    class: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
  });
  const formEl = div(
    { class: 'w-full md:w-1/4 space-y-1 mb-2' },
    label({ for: 'modification', class: 'text-sm font-semibold leading-5 text-slate-400' }, 'Enter modification'),
    filterEl,
  );
  const tblHead = thead();
  const tblBody = tbody();
  const header = !block.classList.contains('no-header');
  const searchFilter = block.classList.contains('search-filter');
  block.parentElement.classList.add(...'relative overflow-x-auto'.split(' '));

  [...block.children].forEach((row, i) => {
    const tblRow = tr();
    moveInstrumentation(row, tblRow);

    [...row.children].forEach((cell) => {
      const tblData = (i === 0 && header) ? th() : td();
      applyClasses(tblData, 'p-4');
      if (i === 0) tblData.setAttribute('scope', 'column');
      tblData.innerHTML = cell.innerHTML;
      applyClasses(tblData, 'border-t border-[#273F3F] border-opacity-25 text-left');
      tblData.querySelectorAll('a').forEach((aEl) => {
        applyClasses(aEl, 'text-[#378189] underline');
      });
      tblRow.append(tblData);
    });
    if (i === 0 && header) tblHead.append(tblRow);
    else tblBody.append(tblRow);
  });
  tableEl.append(tblHead, tblBody);
  if (searchFilter) {
    block.replaceChildren(formEl, tableEl);
  } else {
    block.replaceChildren(tableEl);
  }
  block.classList.add('w-full');
  decorateIcons(block, 20, 20);
}
