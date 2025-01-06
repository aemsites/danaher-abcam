import { applyClasses } from '../../scripts/scripts.js';
import { div, span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function createSlides(slideWrapperEl, contentDivs) {
  applyClasses(slideWrapperEl, 'slider-wrapper flex gap-4 transition-transform duration-300 ease-in-out');
  [...slideWrapperEl.children].forEach((slide) => {
    slide.addEventListener('click', () => {
      const slideId = slide.id;
      contentDivs.forEach(contentDiv => {
        const isMatch = contentDiv.id === slideId;
        contentDiv.classList.toggle('block', isMatch);
        contentDiv.classList.toggle('hidden', !isMatch);
      });
    });
    
    applyClasses(slide, 'slide-item h-full min-w-28 flex items-center justify-center border border-[#0711121a] rounded hover:bg-[#0000000d] cursor-pointer');
    slideWrapperEl.appendChild(slide);
  });
  return slideWrapperEl;
}

let currentIndex = 0;
const visibleSlides = 6;

function updateButtonState(block) {
  const prevButton = document.querySelector('.slider-button.prev');
  if (prevButton) prevButton.style.display = currentIndex === 0 ? 'none' : 'block';

  const nextButton = document.querySelector('.slider-button.next');
  const slideItems = block.querySelectorAll('.slide-item');
  if (nextButton) nextButton.style.display = currentIndex >= slideItems.length - visibleSlides ? 'none' : 'block';
}

// update slider position
function updateSliderPosition(block) {
  document.querySelector('.slider-wrapper').style.transform = `translateX(-${currentIndex * (document.querySelector('.slide-item').offsetWidth + 16)}px)`;
  updateButtonState(block);
}

function createSliderNavigation(block) {
  const prevButton = div(
    {
      class: 'slider-button bg-white h-16 left-0 px-4 py-6 -translate-y-1/2 transform absolute prev hidden top-[50%] z-10',
      onclick() {
        if (currentIndex > 0) {
          currentIndex -= 1;
          updateSliderPosition(block);
        }
      },
    },
    span({ class: 'icon icon-chevron-previous' }),
  );
  const nextButton = div(
    {
      class: 'slider-button bg-white h-16 px-4 py-6 absolute next top-0 right-0',
      onclick() {
        if (currentIndex < block.querySelectorAll('.slide-item').length - visibleSlides) {
          currentIndex += 1;
          updateSliderPosition(block);
        }
      },
    },
    span({ class: 'icon icon-chevron-next' }),
  );
  decorateIcons(prevButton, 8, 16);
  decorateIcons(nextButton, 8, 16);
  return { prevButton, nextButton };
}

export default async function decorate(block) {
  block.innerHTML = `<div><div>
          <div>
            <span>17 Images</span>
              <div id="0">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>IHC-P</div>
                  <h6>Immunohistochemistry (Formalin/PFA-fixed paraffin-embedded sections) - Anti-Ki67 antibody (AB15580)</h6>
                  <p>Confocal images of mouse trachea epithelium collected at steady state, 24 and 48&amp;thinsp;h after SO&lt;sub&gt;2&lt;/sub&gt; injury. Tissue sections were co-stained with UHRF1 and Ki67, a proliferation marker. 
      &lt;p&gt;ab15580 was used to stain Ki67 at a dilution of 1:1&amp;thinsp;000&lt;/p&gt;</p>
                </div>
              </div>
              <div  id="1">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>ICC/IF</div>
                  <h6>Immunocytochemistry/ Immunofluorescence - Anti-Ki67 antibody (AB15580)</h6>
                  <p>Fluorescent confocal microscopy (20x) of mouse (P0) olfactory bulb, outer glomeruli layer, showing Ki67 immunoreactivity (ab15580; 1/1000; overnight at RT, 0.25% TX-100 no blocking step) using a secondary goat anti-rabbit fluorescent antibody (Alexa Fluor 488;1/300 2h at RT.</p>
                </div>
              </div>
              <div id="2">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>ICC/IF</div>
                  <h6>Immunocytochemistry/ Immunofluorescence - Anti-Ki67 antibody (AB15580)</h6>
                  <p>Paraformaldehyde-fixed Rabbit cell (Retina) labeling Ki67 (Green) using ab15580 at 1/200 dilution followed by a Donkey anti-rabbit Alexa Fluor® 568 secondary antibody in ICC analysis. Normal Donkey serum was used as the blocking agent for 15 hours at 4°C. 
      &lt;p&gt;Tissue was immersion fixed in 4% paraformaldehyde overnight at 4 degrees Celsius. Tissue was then embedded in 10% agarose and section at 100 microns. Sections were placed in 2N HCL for 1 hour before commencing immunocytochemistry. Ki-67 (dividing cells red).&lt;/p&gt;</p>
                </div>
              </div>
              <div id="3">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>WB</div>
                  <h6>Western blot - Anti-Ki67 antibody (AB15580)</h6>
                  <p>&lt;strong&gt;Observed band sizes :&lt;/strong&gt; 345kDa, 395kDa</p>
                </div>
              </div>
              <div id="4">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>ICC/IF</div>
                  <h6>Immunocytochemistry/ Immunofluorescence - Anti-Ki67 antibody (AB15580)</h6>
                  <p>ab15580 staining Ki67 in Mef1 cells. The cells were fixed with 100% methanol (5 min), permeabilized with 0.1% PBS-Triton X-100 for 5 minutes and then blocked with 1% BSA/10% normal goat serum/0.3M glycine in 0.1%PBS-Tween for 1h. The cells were then incubated overnight at 4°C with ab15580 at 0.5 μg/ml and ab7291, Mouse monoclonal [DM1A] to alpha Tubulin - Loading Control. Cells were then incubated with ab150081, Goat polyclonal Secondary Antibody to Rabbit IgG - H&amp;L (Alexa Fluor&lt;sup&gt;®&lt;/sup&gt; 488), pre-adsorbed at 1/1000 dilution (shown in green) and ab150120, Goat polyclonal Secondary Antibody to Mouse IgG - H&amp;L (Alexa Fluor&lt;sup&gt;®&lt;/sup&gt; 594), pre-adsorbed at 1/1000 dilution (shown in pseudocolour red). Nuclear DNA was labelled with DAPI (shown in blue).
      &lt;p&gt;Also suitable in cells fixed with 4% paraformaldehyde (10 min).&lt;/p&gt;
      &lt;p&gt;Image was acquired with a high-content analyser (Operetta CLS, Perkin Elmer) and a single confocal section is shown.&lt;/p&gt;</p>
                </div>
              </div>
              <div id="5">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>ICC/IF</div>
                  <h6>Immunocytochemistry/ Immunofluorescence - Anti-Ki67 antibody (AB15580)</h6>
                  <p>ab15580 staining Ki67 in HeLa cells. The cells were fixed with 100% methanol (5 min), permeabilized with 0.1% PBS-Triton X-100 for 5 minutes and then blocked with 1% BSA/10% normal goat serum/0.3M glycine in 0.1%PBS-Tween for 1h. The cells were then incubated overnight at 4°C with ab15580 at 0.5 μg/ml and ab7291, Mouse monoclonal [DM1A] to alpha Tubulin - Loading Control. Cells were then incubated with ab150081, Goat polyclonal Secondary Antibody to Rabbit IgG - H&amp;L (Alexa Fluor&lt;sup&gt;®&lt;/sup&gt; 488), pre-adsorbed at 1/1000 dilution (shown in green) and ab150120, Goat polyclonal Secondary Antibody to Mouse IgG - H&amp;L (Alexa Fluor&lt;sup&gt;®&lt;/sup&gt; 594), pre-adsorbed at 1/1000 dilution (shown in pseudocolour red). Nuclear DNA was labelled with DAPI (shown in blue).
      &lt;p&gt;Also suitable in cells fixed with 4% paraformaldehyde (10 min).&lt;/p&gt;
      &lt;p&gt;Image was acquired with a high-content analyser (Operetta CLS, Perkin Elmer) and a maximum intensity projection of confocal sections is shown.&lt;/p&gt;</p>
                </div>
              </div>
              <div id="6">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>IHC-P</div>
                  <h6>Immunohistochemistry (Formalin/PFA-fixed paraffin-embedded sections) - Anti-Ki67 antibody (AB15580)</h6>
                  <p>IHC image of ab15580 staining in mouse spleen formalin fixed paraffin embedded tissue section, performed on a Leica Bond&lt;sup&gt;TM&lt;/sup&gt; system using the standard protocol B. The section was pre-treated using heat mediated antigen retrieval with sodium citrate buffer (pH6) for 20 mins. The section was then incubated with ab15580, 5μg/ml, for 15 mins at room temperature. A goat anti-rabbit biotinylated secondary antibody was used to detect the primary, and visualized using an HRP conjugated ABC system. DAB was used as the chromogen. The section was then counterstained with haematoxylin and mounted with DPX.</p>
                </div>
              </div>
              <div id="7">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>IHC-P</div>
                  <h6>Immunohistochemistry (Formalin/PFA-fixed paraffin-embedded sections) - Anti-Ki67 antibody (AB15580)</h6>
                  <p>IHC image of Ki67 staining in human spleen formalin fixed paraffin embedded tissue section, performed on a Leica Bond&lt;sup&gt;TM&lt;/sup&gt; system using the standard protocol F. The section was pre-treated using heat mediated antigen retrieval with sodium citrate buffer (pH6) for 20 mins. The section was then incubated with ab15580, 1μg/ml, for 15 mins at room temperature and detected using an HRP conjugated compact polymer system. DAB was used as the chromogen. The section was then counterstained with haematoxylin and mounted with DPX.
      &lt;p&gt;For other IHC staining systems (automated and non-automated) customers should optimize variable parameters such as antigen retrieval conditions, primary antibody concentration and antibody incubation times.&lt;/p&gt;</p>
                </div>
              </div>
              <div id="8">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>ICC/IF</div>
                  <h6>Immunocytochemistry/ Immunofluorescence - Anti-Ki67 antibody (AB15580)</h6>
                  <p>ab15580 staining Ki67 in wild-type HAP1 cells (top panel) and Ki67 knockout HAP1 cells (bottom panel). The cells were fixed with 100% methanol (5min), permeabilized with 0.1% Triton X-100 for 5 minutes and then blocked with 1% BSA/10% normal goat serum/0.3M glycine in 0.1% PBS-Tween for 1h. The cells were then incubated with ab15580 at 1μg/ml concentration and ab195889 at 1/250 dilution (shown in pseudo colour red) overnight at +4°C, followed by a further incubation at room temperature for 1h with a goat anti-rabbit IgG Alexa Fluor&lt;sup&gt;®&lt;/sup&gt; 488 (ab150081) at 2 μg/ml (shown in green). Nuclear DNA was labelled in blue with DAPI.</p>
                </div>
              </div>
              <div id="9">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>IHC-P</div>
                  <h6>Immunohistochemistry (Formalin/PFA-fixed paraffin-embedded sections) - Anti-Ki67 antibody (AB15580)</h6>
                  <p>ab15580 staining Ki67 - Proliferation Marker in Human skin tissue sections by Immunohistochemistry (IHC-P - paraformaldehyde-fixed, paraffin-embedded sections). Tissue was fixed with paraformaldehyde and blocked with 4% serum for 30 minutes at 25°C; antigen retrieval was by heat mediation in a citrate buffer (pH 6.0). Samples were incubated with primary antibody (5 µg/ml in blocking buffer) for 16 hours at 4°C. A Texas Red ® Goat anti-rabbit IgG polyclonal (1/100) was used as the secondary antibody.</p>
                </div>
              </div>
              <div id="10">
                <div>
                  <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                </div>
                <div>
                  <div>ICC/IF</div>
                  <h6>Immunocytochemistry/ Immunofluorescence - Anti-Ki67 antibody (AB15580)</h6>
                  <p>SK-N-SH cells were permitted to grow to confluency, then serum starved for 48 hours and predominantly driven into G0. The cells were then paraformaldehyde fixed and immunofluorescently labelled with anti-Ki67 (ab15580) at a dilution of 1/1000. The majority of the cells show little or no Ki67 staining, indicating they are in G0 arrest (red cells). Two cells however show strong nucleolar Ki67 staining indicating they are still cycling (green cells). The DNA is stained with DAPI and is shown in red. The Ki67 staining is shown in green. x 63 magnification.&lt;p&gt;Similar results were seen with an asynchronous population of HeLa cells. The Ki67 staining was localised to the periphery of the nucleoli and throughout the nucleoplasm of proliferating cells. (This data is not shown but is available upon request).&lt;/p&gt;</p>
                </div>
              </div>
              </div>
              
            <div>
                <ul>
                  <li id="0">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="1">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="2">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="3">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="4">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="5">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="6">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="7">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="8">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="9">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                  <li id="10">
                    <img src=https://s7d9.scene7.com/is/image/danaherstage/no-image-availble?$danaher-mobile$>
                  </li>
                </ul>
            </div>
          </div>  
          <div>
            <div><h2>Key Facts</h2></div>
            <div>
              <h6>Isotype</h6>
              <p>IgG</p>
            </div>
            <div>
              <h6>Clonality</h6>
              <p>Polyclonal</p>
            </div>  
            <div>
              <h6>Purification technique</h6>
              <p>Affinity purification Immunogen</p>
            </div>
            <div>
              <h6>Form</h6>
              <p>Liquid</p>
            </div>
            <div>
              <h6>Immunogen</h6>
              <p>The exact immunogen used to generate this antibody is proprietary information.</p>
            </div>
            <div>
              <h6>Specificity</h6>
              <p>From Jan 2024, QC testing of replenishment batches of this polyclonal changed. All tested and expected application and reactive species combinations are still covered by our Abcam product promise. However, we no longer test all applications. For more information on a specific batch, please contact our Scientific Support who will be happy to help.</p>
            </div>
          </div>
        </div>`;

  const contentDivs = block.querySelectorAll(":scope > div > div:nth-child(1) > div:nth-child(1) > div");
  block.querySelector(":scope > div > div:nth-child(1) > div:nth-child(1)").classList.add('py-6');
  contentDivs.forEach((contentDiv, index) => {
    contentDiv?.classList.add('grid', 'grid-cols-3', 'gap-4', 'h-72');
    contentDiv?.firstElementChild?.classList.add('col-span-1');
    contentDiv?.lastElementChild?.classList.add('col-span-2', 'overflow-y-auto', 'scrollbar-hide');
    const pEl = contentDiv?.lastElementChild?.querySelector('p');
    pEl.innerHTML = pEl?.textContent;
    if (index === 0) contentDiv.classList.add('block');
    else contentDiv.classList.add('hidden');
  });
  const slideWrapperEl = block.querySelector('ul');
  createSlides(slideWrapperEl, contentDivs);
  const { prevButton = '', nextButton = '' } = slideWrapperEl.children.length > 4 ? createSliderNavigation(block) : '';
  slideWrapperEl.parentElement.className = 'relative overflow-hidden w-full h-16 px-12';
  slideWrapperEl.parentElement.append(
    prevButton,
    slideWrapperEl,
    nextButton,
  );

  // Initialize button states
  updateButtonState(block);
}
