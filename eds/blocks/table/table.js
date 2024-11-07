import { applyClasses, moveInstrumentation } from '../../scripts/scripts.js';
import {
  table, tbody, td, th, thead, tr, input, div, form, label, button,
} from '../../scripts/dom-builder.js';

// const tableEl = table({ class: 'table-auto' });
// let instance;

function handleFilter(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  // console.log(event, data.get('modification'));
  let value = data.get('modification');
  value = value.trim();
  const bodyEl = event.target.parentElement.querySelector('table').querySelector('tbody');
  if (value !== '') {
    let filter = value.toLowerCase();
    [...bodyEl.children].forEach((row) => {
      [...row.children].forEach((cell) => {
        if (cell.innerHTML.toLowerCase().includes(filter)) {
          applyClasses(row, 'match');
        }
      });
      if (!row.classList.contains('match')) {
        row.style.display = 'none';
      }
    });
  } else {
    [...bodyEl.children].forEach((row) => {
      row.classList.remove('match');
      row.style.display = '';
    });
  }
}

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  const filterEl = input({
    id: 'search-filter',
    type: 'text',
    name: 'modification',
    placeholder: 'Search here...',
    class: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
  });
  const formEl = form(
    {
      class: 'flex items-center gap-x-3 mb-2',
      onsubmit: handleFilter,
    },
    div(
      { class: 'space-y-1' },
      label({ for: 'modification', class: 'text-sm font-semibold leading-5 text-slate-400' }, 'Enter modification'),
      filterEl,
    ),
    button({ type: 'submit', class: 'inline-flex items-center py-2 px-5 ms-2 mt-auto text-sm font-medium text-white tracking-wide bg-teal-700 rounded-full border border-teal-700 hover:bg-teal-800' }, 'Search'),
  );
  const tableEl = table({ class: 'table-auto' });
  const tblHead = thead();
  const tblBody = tbody();
  const header = !block.classList.contains('no-header');
  const searchFlag = block.classList.contains('search-filter');
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
  // instance = tableEl;
  searchFlag = true;
  if (searchFlag) {
    block.replaceChildren(formEl, tableEl);
  } else {
    block.replaceChildren(tableEl);
  }
}
