import { a, p, div, hr, img, input, span, table, thead, tbody, tr, th, td, label, button, } from "../../scripts/dom-builder.js";
import { decorateIcons } from '../../scripts/aem.js';
import { decorateModals } from '../../scripts/modal.js';

export default async function decorate(block) {

function handleClick(event, block) {
  let { value } = event.target;
  value = value.trim();
  console.log(value);
}

const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'TESTED_AND_REACTS') return 'tested'; 
  if (reactivityType === 'REACTS') return 'expected';
  if (reactivityType === 'EXPECTED_TO_REACT') return 'predicted';
  return 'not-recommended';
};

function toggleFullName(activeFullName, toggleBtnEl) {
  let isChecked = false;
  if (activeFullName.children[0].checked) {
    isChecked = true;
  } else {
    isChecked = false;
  }
  const applnsList = toggleBtnEl.querySelectorAll('p');
  applnsList.forEach((element) => {
    if (isChecked) {
      if(element.classList.contains('shortname')) {
        element.classList.remove('block');
        element.classList.add('hidden');
      } else {
        element.classList.add('block');
        element.classList.remove('hidden');
      }
    } else {
      if(element.classList.contains('fullname')) {
        element.classList.add('hidden');
        element.classList.remove('block');
      } else {
        element.classList.add('block');
        element.classList.remove('hidden');
      }
    }    
  });
}

function getApplicationsDetails(filtersList) {
  const filtersDiv = div({ class: 'flex flex-row text-align-center items-center justify-between gap-4' });
  filtersList.forEach((listItem) => {
    let hrefText, href, fullText;
    if(listItem.textContent.indexOf(':') > -1){
      fullText = listItem.textContent.split(':')[1];
    }
    hrefText = listItem.textContent.split(':')[0];
    href = window.location.href.includes(hrefText) ? hrefText: '#application=' + hrefText;
    if(hrefText === 'All applications') {
      filtersDiv.append(
        p(a(
          { class: 'button w-fit bg-black hover:bg-[#3B3B3B] whitespace-nowrap rounded-[28px] py-2.5 px-5 text-white text-sm capitalize', href: href.replace(' ', '-').toLowerCase() },
          hrefText,
        )),
      );    
    } else {
      filtersDiv.append(
        p({ class: 'block shortname'}, a(
          { class: 'button-container button-tertiary-outline icon-none', href: href.replace(' ', '-').toLowerCase() },
          hrefText,
        )),
        p({ class: 'hidden fullname'}, a(
          { class: 'button-container button-tertiary-outline icon-none', href: href.replace(' ', '-').toLowerCase() },
          fullText,
        )),      
      );
    }
  });
  return filtersDiv;
}

function getProductPromiseDetails(promiseList) {
  const promiseUlEl = div({ class: 'flex flex-wrap gap-x-4 gap-y-2 text-xs md:ml-4 mr-80' });
  promiseList.forEach((item) => {
    if(item.textContent === 'All') {
      promiseUlEl.append(
        div({ class: 'gap-x-2 inline-flex items-center' },
          input({
            type: 'radio',
            class: 'block flex shrink-0 accent-[#378189] cursor-pointer mb-1 p-2 z-[1] border-0 radius-[4px] w-[16px] h-[16px]',
            name: 'productPromise',
            value: `${item.textContent.toLowerCase()}`,
            id: 'productPromise',
            checked: true,
          }),      
          item.textContent.replace('all', 'All'),
        )
      );
    } else {
      promiseUlEl.append(
        div({ class: 'gap-x-2 inline-flex items-center' },      
          input({
            type: 'radio',
            class: 'block flex shrink-0 accent-[#378189] cursor-pointer mb-1 p-2 z-[1] border-0 radius-[4px] w-[16px] h-[16px]',
            name: 'productPromise',
            value: `${item.textContent.replace(' ', '-').toLowerCase()}`,
            id: 'productPromise',          
          }),      
          item.textContent,
          span({ class: `icon icon-${item.textContent.replace(' ', '-').toLowerCase()} top-5 right-10 p-2 cursor-pointer ${item.textContent.toLowerCase() === 'tested' ? 'size-15' : 'size-7'}` }),
        )
      );
    }
  });
  return promiseUlEl;
}

block.innerHTML = `<div class="product-reactivity-block reactivity">
<div>
  <h3>Reactivity Data</h3>
</div>
<div class="applicationsfilter">
  <p>Select an application</p>
  <ul>
    <li>All applications</li>
    <li>IP:Immunoprecipitation</li>
    <li>WB:Western blot</li>
    <li>ICC/IF:Immunocytochemistry/ Immunofluorescence</li>
  </ul>
</div>
<div class="productpromise">
  <p>Product promise</p>
  <ul>
    <li>All</li>
    <li>Tested</li>
    <li>Expected</li>
    <li>Predicted</li>
    <li>Not recommended</li>
  </ul>
  <p><a href="/modals/product-promise">Learn more</a></p>
</div>
<div class="reactivitytable">
    <div class="species">
      <span>Human</span>      
      <div class="applications">
        <h6>IP</h6>
        <div class="reactivitydata">
          <h5>EXPECTED_TO_REACT</h5>
          <p>none here</p>
          <h4></h4>
        </div>
      </div>
      <div class="applications">
        <h6>WB</h6>
        <div class="reactivitydata">
          <h5>REACTS</h5>
          <p>Please note that expression of target protein may be very low without stimulation/treatment (e.g. DNA damaging agent).</p>
          <h4>1.00000-5.00000 µg/mL</h4>
        </div>
      </div>        
      <div class="applications">
        <h6>ICC/IF</h6>
        <div class="reactivitydata">
          <h5>TESTED_AND_REACTS</h5>
          <p>We recommend using 3% milk as the blocking agent for Western blot.</p>
          <h4>0.50000-1.00000 µg/mL</h4>
        </div>
      </div>
    </div>
    <div class="species">
      <span>Mouse</span>      
      <div class="applications">
        <h6>IP</h6>
        <div class="reactivitydata">
          <h5>REACTS</h5>
          <p>We recommend using 3% milk as the blocking agent for Western blot.</p>
          <h4></h4>
        </div>  
      </div>
      <div class="applications">
        <h6>WB</h6>
        <div class="reactivitydata">
          <h5>TESTED_AND_REACTS</h5>
          <p>Please note that expression of target protein may be very low without stimulation/treatment</p>
          <h4>1.00000-5.00000 µg/mL</h4>
        </div>
      </div>        
      <div class="applications">
        <h6>ICC/IF</h6>
        <div class="reactivitydata">
          <h5>EXPECTED_TO_REACT</h5>
          <p>none</p>
          <h4>0.50000-1.00000 µg/mL</h4>
        </div>
      </div>
    </div>    
</div>
</div>`;

const filterH3El = document.querySelector('h3');
const appsFilterEl = document.querySelector('.applicationsfilter');
const filterPEl = appsFilterEl.querySelector('p');
const filterUlEl = appsFilterEl.querySelector('ul');
const filtersListEl = filterUlEl.querySelectorAll('li');
const applnsFilterDiv = getApplicationsDetails(filtersListEl);
const fullNameDiv = div(
  input({ type: 'checkbox', class: 'peer hidden', id: 'fullName', name: 'fullName'}),
  label({
  for: 'fullName',
  class: 'w-full block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-2.5 cursor-pointer',
}, 'Show full name'));
const filtersDiv = div({ class: 'w-full flex flex-col md:flex-row md:items-center font-semibold text-sm p-0 bg-white justify-between tracking-wide' },  
  applnsFilterDiv,
  fullNameDiv,
);
filtersDiv.addEventListener('click', () => {
  toggleFullName(fullNameDiv, applnsFilterDiv);
});
const prodPromiseEl = document.querySelector('.productpromise');
const promisePEl = prodPromiseEl.querySelector('p');
const promiseUl = prodPromiseEl.querySelector('ul');
const promiseLi = promiseUl.querySelectorAll('li');
const promiseListEl = getProductPromiseDetails(promiseLi);
const prodPromiseDiv = div({ class: 'w-full flex flex-col md:flex-row md:items-center gap-1 font-semibold text-sm py-4 bg-white mb-4 justify-between tracking-wide' },
  span({ class: 'flex shrink-0' }, 
    promisePEl, 
    promiseListEl),
    decorateModals(a(
      {
        class: 'w-max inline-flex items-center shrink-0 gap-x-2 px-4 mt-2 md:mt-0 md:ml-auto text-xs',
        href: '/en-us/modals/product-promise',
      },
      'What is this?',
    )),
);
const promiseAll = promiseListEl.querySelectorAll('input#productPromise');
promiseAll.forEach((promise) => {
  promise.addEventListener('click', (event) => {
    handleClick(event, block);
  });
});
const application = [];
filtersListEl.forEach((listItem) => {
  if(listItem.textContent !== 'All applications') {
    application.push(listItem.textContent.split(':')[0]);
  }
});
const tableDataEl = document.querySelectorAll('.species');
const allTabData = div({ class: 'individualdata overflow-scroll' });
const tableColumn = thead();
const tableHeadingRow = tr(th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }));
application.forEach((name) => {
  tableHeadingRow.appendChild(th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }, name));
});
tableColumn.appendChild(tableHeadingRow);
const tbodyContent = tbody();
const tableHeading = table({ class: 'w-full table-auto md:table-fixed border-separate indent-2 text-left' }, tableColumn);
tableDataEl.forEach((row) => {
  const species = row.querySelectorAll('span');
  const tablerow = tr();
  species.forEach((item) => {
    tablerow.appendChild(th(
      { class: 'p-4 text-sm font-semibold break-words bg-white md:p-2' },
      item.textContent,
    ));
  });
  const applicationsList = row.querySelectorAll('.applications');
  applicationsList.forEach((item) => {
    const reactivityList = item.querySelectorAll('.reactivitydata');
    reactivityList.forEach((data) => {
      const reactivityName = data.querySelector('h5')?.textContent;
      const tableCell = td({ class: 'p-4 font-normal bg-white' },      
      span({ class: `icon icon-${getReactivityStatus(reactivityName)}` }),
    );
    tablerow.appendChild(tableCell);    
    });
  });
  tbodyContent.appendChild(tablerow);
  tableHeading.appendChild(tbodyContent);
});
allTabData.appendChild(tableHeading);

block.innerHTML = '';
block.prepend(
  hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }),
);
block.append(filterH3El, filterPEl, filtersDiv, prodPromiseDiv);
block.append(allTabData);
decorateIcons(block);
}