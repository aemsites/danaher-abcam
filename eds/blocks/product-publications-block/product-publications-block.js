import { decorateIcons } from '../../scripts/aem.js';
import { span } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.innerHTML = `<div class="product-publications-block ">
   <div>
      <h3>Publications</h3>
   </div>
   <div>
      <div> 0 Publications</div>
      <div>
         <div>
            <div>
               <div>
                  <span>The Journal of pharmacology and experimental therapeutics</span>
                  <span>12-22</span>
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/37699708?dopt=Abstract">PubMed37699708</a>
               </div>
               <div>
                  <span>2024</span>
               </div>
            </div>
            <div>
               <div>Blockade of Proteinase-Activated Receptor 2 (PAR2) Attenuates Neuroinflammation in Experimental Autoimmune Encephalomyelitis.</div>
            </div>
            <div>
                  <div>
                     <p>Applications</p>
                     <p>Unspecified application</p>
                  </div>
                  <div>
                     <p>Species</p>
                     <p>Unspecified reactive species</p>
                  </div>
            </div>
            <div>Rahil Eftekhari,Benjamin W Ewanchuk,Khalil S Rawji,Robin M Yates,Farshid Noorbakhsh,Hedwich F Kuipers,Morley D Hollenberg</div>
         </div>
         <div>
            <div>
               <div>
                  <span>Nature communications</span>
                  <span>7090</span>
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/37925436?dopt=Abstract">PubMed37925436</a>
               </div>
               <div>
                  <span>2023</span>
               </div>
            </div>
            <div>
               <div>Systemic and intrinsic functions of ATRX in glial cell fate and CNS myelination in male mice.</div>
            </div>
            <div>
                  <div>
                     <p>Applications</p>
                     <p>Unspecified application</p>
                  </div>
                  <div>
                     <p>Species</p>
                     <p>Unspecified reactive species</p>
                  </div>
            </div>
            <div>Megan E Rowland,Yan Jiang,Sarfraz Shafiq,Alireza Ghahramani,Miguel A Pena-Ortiz,Vanessa Dumeaux,Nathalie G Bérubé</div>
         </div>
         <div>
            <div>
               <div>
                  <span>Neural development</span>
                  <span>7</span>
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/37833718?dopt=Abstract">PubMed37833718</a>
               </div>
               <div>
                  <span>2023</span>
               </div>
            </div>
            <div>
               <div>Neocortex neurogenesis and maturation in the African greater cane rat.</div>
            </div>
            <div>
                  <div>
                     <p>Applications</p>
                     <p>Unspecified application</p>
                  </div>
                  <div>
                     <p>Species</p>
                     <p>Unspecified reactive species</p>
                  </div>
            </div>
            <div>Oluwaseun Mustapha,Thomas Grochow,James Olopade,Simone A Fietz</div>
         </div>
         <div>
            <div>
               <div>
                  <span>Journal of neuroinflammation</span>
                  <span>234</span>
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/37828609?dopt=Abstract">PubMed37828609</a>
               </div>
               <div>
                  <span>2023</span>
               </div>
            </div>
            <div>
               <div>Astrocyte interferon-gamma signaling dampens inflammation during chronic central nervous system autoimmunity via PD-L1.</div>
            </div>
            <div>
                  <div>
                     <p>Applications</p>
                     <p>Unspecified application</p>
                  </div>
                  <div>
                     <p>Species</p>
                     <p>Unspecified reactive species</p>
                  </div>
            </div>
            <div>Brandon C Smith,Rachel A Tinkey,Orion D Brock,Arshiya Mariam,Maria L Habean,Ranjan Dutta,Jessica L Williams</div>
         </div>
         <div>
            <div>
               <div>
                  <span>Heliyon</span>
                  <span>e20384</span>
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/37780758?dopt=Abstract">PubMed37780758</a>
               </div>
               <div>
                  <span>2023</span>
               </div>
            </div>
            <div>
               <div>RIT1 regulation of CNS lipids RIT1 deficiency Alters cerebral lipid metabolism and reduces white matter tract oligodendrocytes and conduction velocities.</div>
            </div>
            <div>
                  <div>
                     <p>Applications</p>
                     <p>Unspecified application</p>
                  </div>
                  <div>
                     <p>Species</p>
                     <p>Unspecified reactive species</p>
                  </div>
            </div>
            <div>Lei Wu,Fang Wang,Carole L Moncman,Mritunjay Pandey,Harrison A Clarke,Hilaree N Frazier,Lyndsay E A Young,Matthew S Gentry,Weikang Cai,Olivier Thibault,Ramon C Sun,Douglas A Andres</div>
         </div>
      </div>
   </div>
   <div id="https://asset.productmarketingcloud.com/api/assetstorage/6187_c0abac41-349b-486e-bf99-3cd35a1a91fc"></div>
</div>`;

  // console.log('Block: ', block);

  const primaryDiv = block.querySelector('.product-publications-block .product-publications-block');
  applyClasses(primaryDiv, 'relative flex flex-col border-b border-gray-300');
  // console.log("primaryDiv: ", primaryDiv);

  const primaryChildList = primaryDiv.querySelectorAll('.product-publications-block > div');
  // console.log("primaryChildList: ", primaryChildList);

  const accordionDiv = primaryChildList[0];
  applyClasses(accordionDiv, 'accordion flex flex-row justify-between items-center cursor-pointer p-0 pr-1 gap-6');
  const contentDiv = primaryChildList[1];
  applyClasses(contentDiv, 'content hidden');

  // console.log("contentDiv: ", contentDiv);

  const allPublications = primaryChildList[2];
  allPublications.textContent = 'View All Publications';
  applyClasses(allPublications, 'allpublications hidden cursor-pointer w-fit self-center p-2 px-4 bg-black text-white text-[12px] font-semibold leading-[16px] tracking-[0.2px] text-center my-4 rounded-[9999px]');
  // console.log("allPublications: ", allPublications);

  const upIcon = span({ class: 'icon icon-chevron-up hidden w-[18px] h-[18px] top-[3px] left-[3px]' });
  const downIcon = span({ class: 'icon icon-chevron-down w-[18px] h-[18px] top-[3px] left-[3px]' });
  accordionDiv.append(upIcon);
  accordionDiv.append(downIcon);

  applyClasses(accordionDiv.querySelector('h3'), 'text-base font-semibold leading-6 text-left tracking-[0.2px]');

  const publicationCount = contentDiv.querySelector('div:nth-child(1)');
  // console.log("publicationCount: ", publicationCount);

  applyClasses(publicationCount, 'font-noto text-base font-semibold leading-6 tracking-[0.2px] text-left');

  const publications = contentDiv.querySelector('div:nth-child(2)');
  applyClasses(publications, 'publications flex flex-col gap-y-4');

  [...publications.children].forEach((element, index) => {
    // console.log("Elemets: ", element);

    applyClasses(element, 'element flex flex-col gap-2 p-4 px-6 rounded-md border border-[#0711121A]');
    const subtitle = element.querySelector('div');
    applyClasses(subtitle, 'subtitle flex flex-row gap-x-1 justify-between items-center text-xs text-[#65797C] font-semibold leading-4 tracking-[0.2px] text-left');
    applyClasses(subtitle.querySelector('div'), 'inline font-noto text-[12px] font-semibold text-gray-600 leading-[16px] tracking-[0.2px] text-left');
    applyClasses(subtitle.querySelector('div:nth-child(2)'), 'inline');
    subtitle.querySelector('div > span:nth-child(2)').innerHTML = `${subtitle.querySelector('div > span:nth-child(2)').innerHTML} |`;

    const publicationAnchor = subtitle.querySelector('a');
    const publicationUrl = publicationAnchor.href;
    // console.log("publicationUrl: ", publicationUrl);

    const date = subtitle.querySelector('div:nth-child(2) > span');
    date.innerHTML = date.textContent.slice(0, 4);
    applyClasses(date, 'font-noto text-[14px] font-normal text-teal-800 leading-[21px] tracking-[0.3px] text-left');

    applyClasses(element.querySelector('.element > div:nth-child(2)'), 'description flex flex-row justify-between');
    applyClasses(element.querySelector('.element > div:nth-child(2) > div'), 'text-lg font-semibold leading-7 text-left basis-[95%]');
    const applications = element.querySelector('.element > div:nth-child(3)');
    applyClasses(applications, 'apps');
    applyClasses(element.querySelector('.element > div:nth-child(4)'), 'authors text-xs text-[#65797C] font-normal leading-4 tracking-[0.3px] text-left');

    const outIcon = span({ class: 'icon icon-out p-[1.67px]' });
    element.querySelector('.element > div:nth-child(2)').append(outIcon);
    outIcon.addEventListener('click', () => {
      window.open(publicationUrl);
    });

    [...applications.children].forEach((application) => {
      const app = application.querySelector('p');
      applyClasses(app, 'min-w-[88px] md:min-w-[200px] inline-block font-noto text-[13px] text-gray-600 font-normal leading-[21px] tracking-[0.3px] text-left m-0');
      applyClasses(application.querySelector('p:nth-child(2)'), 'inline font-noto text-[14px] font-semibold leading-[23px] tracking-[0.3px] text-left text-black m-0');
    });

    if (index >= 4) {
      element.classList.add('hidden'); // Hide elements beyond the first four
    }
  });

  // Add event listener for toggle functionality
  accordionDiv.addEventListener('click', () => {
    if (contentDiv.classList.contains('hidden') && allPublications.classList.contains('hidden')) {
      contentDiv.classList.remove('hidden');
      allPublications.classList.remove('hidden');
      upIcon.classList.remove('hidden');
      downIcon.classList.add('hidden');
    } else {
      contentDiv.classList.add('hidden');
      allPublications.classList.add('hidden');
      downIcon.classList.remove('hidden');
      upIcon.classList.add('hidden');
    }
  });

  allPublications.addEventListener('click', () => {
    const allPublicationsUrl = allPublications.getAttribute('id');
    const apiUrl = encodeURIComponent(allPublicationsUrl);
    const url = `/en-us/page-test/publications?apiUrl=${apiUrl}`;
    window.open(url, '_blank');
  });

  decorateIcons(block);
}
