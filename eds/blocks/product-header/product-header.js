import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.innerHTML = `<div class="product-header ">
            <div>
                <div>
                    <em>AB15580</em>
                </div>
                <div>
                    <h1>Anti-Ki67 antibody</h1>
                    <ul>
                    <li>KO Validated</li>
                    <li><a href="#">What is this?</a></li>
                    </ul>
                    <em>5</em>
                    <em>(225 Reviews)</em>
                    | <em>(4218 Publications)</em>
                    <p>Rabbit Polyclonal Ki67 antibody.Suitable for IHC-P, ICC/IF and reacts with Mouse, Human samples.Cited in 4218 publications.</p>
                </div>
                <div>
                    <p>View alternative names</p>
                    <ul>
                    <li>Proliferation marker protein Ki-67</li>
                    <li>Antigen identified by monoclonal antibody Ki-67</li>
                    <li>Antigen KI-67</li>
                    <li>Antigen Ki67</li>
                    <li>MKI67</li>
                    </ul>
                </div>
            </div>
        </div>`;
    const productHeader = block.querySelector('.product-header .product-header div');
    console.log(productHeader);
    applyClasses(productHeader.querySelector('div:nth-child(1)'),'font-sans text-base text-[#65797C] font-semibold !leading-7 lowercase');
    applyClasses(productHeader.querySelector('div:nth-child(1) > em'),'!not-italic');
    applyClasses(productHeader.querySelector('div:nth-child(2) > h1'),'lg:!text-3xl !font-semibold tracking-[1px]');
    applyClasses(productHeader.querySelector('div:nth-child(2) > ul'), 'flex felx-row gap-4 font-sans');
    applyClasses(productHeader.querySelector('div:nth-child(2) > ul > li'), 'px-2 py-1 rounded text-xs font-semibold tracking-wide break-keep bg-[#EDF6F7] text-[#378189] border-[#EDF6F7] border');
    applyClasses(productHeader.querySelector('div:nth-child(2) > ul > li> a'), '!text-[10px] !leading-3 font-medium underline')
}
