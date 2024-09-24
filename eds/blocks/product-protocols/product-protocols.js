import {
  div,
  a,
  h2,
  ul,
  li,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  block.classList.add('border-t-4');
  const { origin } = window.location;
  const productProtocols = div(
    { class: 'product-protocols' },
    h2({ class: 'mt-6 mb-4 text-2xl font-semibold tracking-tighter text-[#2A3C3C]' }, 'Product protocols'),
    div(
      { class: 'max-w-md font-normal' },
      'For this product, it\'s our understanding that no specific protocols are required. You can:',
      ul(
        { class: 'pt-3 ml-3 list-disc list-inside text-[#071112] text-lg' },
        li(
          { class: 'general-protocols' },
          'Visit the ',
          a({ class: 'general-protocols text-[#378189] underline', href: origin.concat('/drafts/protocols') }, 'general protocols'),
        ),
        li(
          { class: 'general-protocols' },
          'Visit ',
          a({ class: 'text-[#378189] underline', href: origin.concat('/drafts/technical-resources') }, 'troubleshooting'),
        ),

      ),
    ),
  );
  block.append(productProtocols);
}
