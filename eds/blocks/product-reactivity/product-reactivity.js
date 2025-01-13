import { a, p, div, hr, img, input, span, table, thead, tbody, tr, th, td, label, button, } from "../../scripts/dom-builder.js";
import { decorateIcons } from '../../scripts/aem.js';
import { decorateModals } from '../../scripts/modal.js';

function handleClick(event, block) {
  let { value } = event.target;
  value = value.trim();
  console.log(value);
}

const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'TESTED_AND_REACTS') return 'tested'; 
  if (reactivityType === 'REACTS') return 'expected';
  if (reactivityType === 'NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT') return 'predicted';
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

function getDefaultTableData(applicationsList, tableDataEl){ 
  console.log('applicationsList:', applicationsList);
  // const tableDataEl = document.querySelectorAll('.species');
  const tableHeadingRow = tr(th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' },));
  applicationsList.forEach((name) => {
    tableHeadingRow.appendChild(th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }, name));
  });
  const tableColumn = thead();
  tableColumn.appendChild(tableHeadingRow);
  const tbodyContent = tbody();
  const tableHeading = table({ class: 'w-full table-auto md:table-fixed border-separate indent-2 text-left' }, tableColumn);
  console.log('tableDataEl:', tableDataEl);
  tableDataEl.forEach((row) => {
    const species = row.querySelectorAll('span');
    const tablerow = tr();
    species.forEach((item) => {
      tablerow.appendChild(th(
        { class: 'p-4 text-sm font-semibold break-words bg-white md:p-2' },
        item.textContent,
      ));
    });
    const applicationsEl = row.querySelectorAll('.applications');
    applicationsEl.forEach((item) => {
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
  return tableHeading;
}

function getApplicationData(event, tableData) {
  let value = event.target;
  value = value.href.split('#application=')[1];
  console.log('selected Application :',value);
  const tableColumn = thead();
  const tableHeadingRow = tr(
    th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }, 'Species'),
    th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }, 'Dilution info'),
    th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }, 'Notes')
  );
  tableColumn.appendChild(tableHeadingRow);
  const tbodyContent = tbody();
  const tableHeading = table({ class: 'w-full table-auto md:table-fixed border-separate indent-2 text-left border-1' }, tableColumn);
  // console.log('tableData:', tableData);
  tableData.forEach((row) => {
    const species = row.querySelectorAll('span');
    const tablerow = tr();
    species.forEach((item) => {
        tablerow.appendChild(th(
          { class: 'p-4 text-sm font-semibold break-words bg-white md:p-2' },
          item.textContent,
        ));
        const applicationsEl = row.querySelectorAll('.applications');
        applicationsEl.forEach((item) => {
          // console.log('applicationsEl:', item.querySelector('h6').textContent.toLowerCase());
          if(item.querySelector('h6').textContent.toLowerCase() === value) {
            // console.log('applicationsEl:', item);
            const reactivityList = item.querySelectorAll('.reactivitydata');
            reactivityList.forEach((data) => {
              const reactivityType = data.querySelector('h5')?.textContent;
              const note = data.querySelector('p')?.textContent;
              const dilutionInfo = data.querySelector('h4')?.textContent;
              console.log('reactivityType:', getReactivityStatus(reactivityType));
              const tableCell = td({ class: 'p-4 font-normal bg-white' },      
                dilutionInfo,
              );
              const tableCell1 = td({ class: 'p-4 font-normal bg-white' },      
                note,
              );
              tablerow.appendChild(tableCell);
              tablerow.appendChild(tableCell1);  
            });
          }
        });
        tbodyContent.appendChild(tablerow);
        tableHeading.appendChild(tbodyContent);
    });
  });
  return tableHeading;  
}

export default async function decorate(block) {

block.innerHTML = `<div class="product-reactivity-block reactivity">
            <div><h3>Reactivity Data</h3></div>
            <div class="applicationsfilter">
              <p>Select an application</p>
              <ul>
                <li>All applications</li>
                <li>IHC-P:Immunohistochemistry (Formalin/PFA-fixed paraffin-embedded sections)</li>
                <li>ChIP:ChIP</li>
                <li>ICC/IF:Immunocytochemistry/ Immunofluorescence</li>
                <li>IP:Immunoprecipitation</li>
                <li>WB:Western blot</li>
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
                    <h6>IHC-P</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.1</p> 
                      <h4>1/100.00000 - 1/400.00000</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ChIP</h6>
                    <div class="reactivitydata">
                      <h5>TESTED_AND_REACTS</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol1.</p>
                      <h4>2 µg for 10^6 Cells</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ICC/IF</h6>
                    <div class="reactivitydata">
                      <h5>TESTED_AND_REACTS</h5>
                      <p></p>
                      <h4>1 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>IP</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol2.</p>
                      <h4>5 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>WB</h6>
                    <div class="reactivitydata">
                      <h5>TESTED_AND_REACTS</h5>
                      <p>We recommend Goat Anti-Rabbit IgG H&amp;L (HRP) (ab6721) secondary antibody.</p>
                      <h4>1/1000.00000 - 1/5000.00000</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="species">
                <span>Mouse</span>        
                  <div class="applications">
                    <h6>IHC-P</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.2</p>
                      <h4>2/100.00000 - 2/400.00000</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ChIP</h6>
                    <div class="reactivitydata">
                      <h5>REACTS</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.3</p>
                      <h4></h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ICC/IF</h6>
                    <div class="reactivitydata">
                      <h5>REACTS</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.4</p>
                      <h4></h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>IP</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.5</p>
                      <h4>5 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>WB</h6>
                    <div class="reactivitydata">
                      <h5>TESTED_AND_REACTS</h5>
                      <p>We recommend Goat Anti-Rabbit IgG H&amp;L (HRP) (ab6721) secondary antibody.</p>
                      <h4>1/1000.00000 - 1/5000.00000</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="species">
                <span>Rat</span>        
                  <div class="applications">
                    <h6>IHC-P</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.3</p> 
                      <h4>3/100.00000 - 3/400.00000</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ChIP</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p></p>
                      <h4>2 µg for 10^6 Cells</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ICC/IF</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p></p>
                      <h4>1 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>IP</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p></p>
                      <h4>5 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>WB</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>We recommend Goat Anti-Rabbit IgG H&L (HRP) (ab6721) secondary antibody.</p>
                      <h4>1/1000 - 1/5000</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="species">
                <span>Arabidopsis thaliana</span>        
                  <div class="applications">
                    <h6>IHC-P</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>Perform heat-mediated antigen retrieval before commencing with IHC staining protocol.4</p> 
                      <h4>41/100.00000 - 41/400.00000</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ChIP</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p></p>
                      <h4>2 µg for 10^6 Cells</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>ICC/IF</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p></p>
                      <h4>1 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>IP</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p></p>
                      <h4>5 µg/mL</h4>
                    </div>
                  </div>
                  <div class="applications">
                    <h6>WB</h6>
                    <div class="reactivitydata">
                      <h5>NO_EXPERIMENTAL_DATA_EXPECTED_TO_REACT</h5>
                      <p>We recommend Goat Anti-Rabbit IgG H&amp;L (HRP) (ab6721) secondary antibody.</p>
                      <h4>1/1000.00000 - 1/5000.00000</h4>
                    </div>
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
  const fullNameDiv = label({
    for: 'fullName',
    class: 'inline-flex items-center mb-5 cursor-pointer',
    }, 
    input({ type: 'checkbox', class: 'peer hidden', id: 'fullName', name: 'fullName'}),
    span({ class: 'mr-1 text-sm font-semibold text-black' }, 'Show full name'), 
    div({ class: `relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#378189] dark:peer-focus:ring-[#378189] rounded-full peer dark:bg-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-black peer-checked:bg-[#378189]` },),       
  );
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
  const applications = [];
  filtersListEl.forEach((listItem) => {
    if(listItem.textContent !== 'All applications') {
      applications.push(listItem.textContent.split(':')[0]);
    }
  });
  const reactivityTableData = div({ class: 'individualdata overflow-scroll' });
  const tableDataEl = document.querySelectorAll('.species');
  reactivityTableData.innerHTML = '';
  reactivityTableData.append(getDefaultTableData(applications, tableDataEl));
  applnsFilterDiv.addEventListener('click', (event) => {
    // getApplicationData(event, tableDataEl);
    reactivityTableData.innerHTML = '';
    reactivityTableData.append(getApplicationData(event, tableDataEl));
    // decorateIcons(reactivityTableData);
  });
  block.innerHTML = '';
  block.prepend(
    hr({
      class: 'h-px my-2 bg-interactive-grey-active mb-4',
    }),
  );
  block.append(filterH3El, filterPEl, filtersDiv, prodPromiseDiv);
  block.append(reactivityTableData);
  decorateIcons(block);
}