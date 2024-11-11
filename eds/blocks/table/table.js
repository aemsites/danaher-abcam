import { applyClasses, debounce, moveInstrumentation } from '../../scripts/scripts.js';
import {
  table, tbody, td, th, thead, tr, input, div, form, label, button,
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function handleSearch(event, tableEl) {
  event.preventDefault();
  const data = new FormData(event.target);
  let value = data.get('modification');
  value = value.trim();
  const bodyEl = tableEl.querySelector('tbody');
  const filter = value.toLowerCase();
  [...bodyEl.children].forEach((row) => {
    if (!row.textContent.toLowerCase().includes(filter) && value !== '') row.classList.add('hidden');
    else row.classList.remove('hidden');
  });
}

const handleClear = debounce((event) => event.target.parentElement.nextElementSibling.click(), 200);

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
    value: '',
    onkeyup: handleClear,
    onsearch: handleClear,
    class: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
  });
  const formEl = form(
    {
      class: 'flex items-center gap-x-3 mb-2',
      onsubmit: (event) => handleSearch(event, tableEl),
    },
    div(
      { class: 'space-y-1' },
      label({ for: 'modification', class: 'text-sm font-semibold leading-5 text-slate-400' }, 'Enter modification'),
      filterEl,
    ),
    button(
      {
        type: 'submit',
        class: 'inline-flex items-center gap-x-2 py-2 px-4 ms-2 mt-auto text-sm font-medium text-white tracking-wide bg-teal-700 rounded-full border border-teal-700 hover:bg-teal-800',
      },
      span({ class: 'icon icon-search invert' }),
      'Search',
    ),
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
