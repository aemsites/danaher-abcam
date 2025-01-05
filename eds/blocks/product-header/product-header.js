import { decorateIcons } from '../../scripts/aem.js';
import { div, span, a as anchorElement } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

// Function to create the stars based on the rating
function createStars(rating) {
  let starParent;
  // If no reviews (rating is 0)
  if (rating === 0) {
    starParent = div(
      span({ class: 'text-black' }, 'This product has no reviews yet! '),
      anchorElement({
        class: 'text-[#378089] underline', href: '#',
      }, ' Submit a review'),
    );
  } else {
    // If rating exists, create the stars
    starParent = div({ class: 'flex flex-row items-center gap-1' });
    for (let i = 1; i <= 5; i += 1) {
      const spanEl = span({ class: 'flex flex-row' });
      if (i <= rating) {
        spanEl.classList.add('icon', 'icon-star-rating');
      } else {
        spanEl.classList.add('icon', 'icon-star-rating-empty');
      }
      starParent.append(spanEl);
    }
    decorateIcons(starParent, 16, 14);
    const ratingNumber = span({ class: 'ml-2 text-sm font-medium' }, `${rating}.0`);
    starParent.prepend(ratingNumber);
  }
  return starParent;
}

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
  applyClasses(productHeader.querySelector('div:nth-child(1)'), 'font-sans text-base text-[#65797C] font-semibold !leading-7 lowercase');
  applyClasses(productHeader.querySelector('div:nth-child(1) > em'), '!not-italic');
  applyClasses(productHeader.querySelector('div:nth-child(2) > h1'), 'lg:!text-3xl !font-semibold tracking-[1px]');
  applyClasses(productHeader.querySelector('div:nth-child(2) > ul'), 'flex felx-row gap-4 font-sans py-2');
  applyClasses(productHeader.querySelector('div:nth-child(2) > ul > li'), 'px-2 py-1 rounded text-xs font-semibold tracking-wide break-keep bg-[#EDF6F7] text-[#378189] border-[#EDF6F7] border');
  applyClasses(productHeader.querySelector('div:nth-child(2) > ul > li> a'), '!text-[10px] !leading-3 font-medium underline');
  applyClasses(productHeader.querySelector('div:nth-child(2) > p'), 'font-sans text-sm tracking-wide font-normal pb-2');
  applyClasses(productHeader.querySelector('div:nth-child(3)'), 'flex flex-col gap-1');
  applyClasses(productHeader.querySelector('div:nth-child(3) > p'), 'font-sans text-sm tracking-wide font-normal text-[#378189]');
  applyClasses(productHeader.querySelector('div:nth-child(3) > ul'), 'font-sans text-sm tracking-wide font-normal');

  const viewAlternativeEl = productHeader.querySelector('div:nth-child(3)');
  const reviewDiv = div({ class: 'flex flex-row gap-2.5 font-sans text-sm tracking-wide font-normal py-2' });
  const emReview = productHeader.querySelectorAll('div:nth-child(2) > em');
  emReview.forEach((em) => em.classList.add('!not-italic'));
  const rating = parseInt(emReview[0].textContent, 10);
  const stars = createStars(rating);
  emReview[0].innerHTML = '';
  emReview[0].append(stars);
  reviewDiv.append(emReview[0]);
  emReview[1].classList.add('text-[#378089]');
  emReview[2].classList.add('text-[#378089]');
  reviewDiv.append(emReview[1]);

  const { childNodes } = productHeader.querySelector('div:nth-child(2)');
  let separatorNode;

  // Loop through childNodes to find the separator
  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '|') {
      separatorNode = node;
    }
  });
  const seperatorEl = span({ class: 'text-[#D8D8D8]' });
  seperatorEl.append(separatorNode);
  reviewDiv.append(seperatorEl);
  reviewDiv.append(emReview[2]);
  productHeader.querySelector('div:nth-child(2) > ul').insertAdjacentElement('afterend', reviewDiv);

  const alternativeDiv = div({ class: 'flex flex-row gap-1 items-center' });
  const alternativeIcon = span({ class: 'icon icon-chevron-down cursor-pointer transition-transform duration-300' });
  const alternativeList = viewAlternativeEl.querySelector('ul');
  alternativeList.style.display = 'none';

  alternativeIcon.addEventListener('click', () => {
    // Toggle the visibility of the list
    if (alternativeList.style.display === 'none') {
      alternativeList.style.display = 'block';
      alternativeIcon.classList.add('rotate-180');
    } else {
      alternativeList.style.display = 'none';
      alternativeIcon.classList.remove('rotate-180');
    }
  });
  alternativeDiv.append(viewAlternativeEl.querySelector('p'));
  alternativeDiv.append(alternativeIcon);
  decorateIcons(alternativeDiv, 20, 20);
  viewAlternativeEl.insertBefore(alternativeDiv, alternativeList);
}
