import { hr } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.innerHTML = `<div class="product-summarynotes-block supplementaryinfo">
          <div>
              <h3>Supplementary info</h3>
              <p>This supplementary information is collated from multiple sources and compiled automatically.</p>
          </div>
          <div>
              <h6>targetSummaryMechanical</h4>
              <p>Ki67 is a nuclear protein often referred to as MKI67 with a molecular weight of approximately 345 kDa. This protein is strongly associated with cell proliferation. Scientists commonly use Ki67 staining techniques to identify and quantify proliferating cells in tissues. Ki67 is expressed in the nucleus during active cell cycle phases—G1 S G2 and M—but not in resting cells in G0 phase. It is detectable through methods such as Ki67 immunofluorescence and Ki67 flow cytometry which are important for analyzing cell division.</p>
              <h6>targetSummaryBiological</h4>
              <p>The Ki67 protein plays an essential role in cellular proliferation processes. It does not form part of a stable complex but interacts transiently with other cell cycle-related proteins. Research indicates that Ki67 maintains the structure of the perichromosomal layer during mitosis impacting chromosome separation. It is particularly active in tissues with high cell turnover such as bone marrow and lymphoid organs.</p>
              <h6>pathway</h4>
              <p>Ki67 influences several key cellular pathways that control cell proliferation and differentiation. The protein acts within the regulation of the cell cycle and the PI3K/AKT signaling pathway important for cell growth and survival. Within these pathways Ki67 interacts with proteins like cyclin-dependent kinases (CDKs) which regulate transitions between different phases of the cell cycle.</p>
              <h6>disease</h4>
              <p>Ki67 has significant implications in oncology and can be used as a biomarker for cancer prognosis. Its expression levels help determine the aggressiveness of tumors especially in breast cancer and prostate cancer. High Ki67 levels correlate with poor prognosis as it indicates rapid cell division. In cancer Ki67 associates with p53 a protein that regulates the cell cycle and function as a tumor suppressor.</p>
          </div>
      </div>`;
  const h3El = document.querySelector('h3');
  if (h3El) {
    applyClasses(h3El, '!text-lg !mb-3 text-black-0');
  }
  const headingPEl = document.querySelector('p');
  if (headingPEl) {
    applyClasses(headingPEl, 'text-base font-normal leading-5 text-black');
  }
  [...block.children].forEach((element) => {
    const h6El = element.querySelectorAll('h6');
    h6El.forEach((heading) => {
      applyClasses(heading, '!text-xs !font-normal !leading-5 !text-[#65797C]');
    });
    const pEl = element.querySelector('p');
    if (pEl) {
      applyClasses(pEl, 'text-base font-normal leading-5 text-black');
    }
  });
  block.prepend(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
}
