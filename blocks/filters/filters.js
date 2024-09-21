import { decorateIcons } from '../../scripts/aem.js';
import { div, input, label, li, span, ul } from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

export default async function decorate(block) {
  console.log(block);
  let jsonName = 'products-index';
  let filterNames = '';
  if (block.children.length > 0) {
    [...block.children].forEach((child, childIndex) => {
      const firstElementChildren = child.children[0].children[0].innerText;
      if (childIndex === 0) jsonName = firstElementChildren;
      if (childIndex === 1) filterNames = firstElementChildren;
    });
    const response = await ffetch(`https://stage.lifesciences.danaher.com/us/en/${jsonName}.json`)
      .chunks(500)
      .all();
    let filterCategory = {};
    for (let topicIndex = 0; topicIndex < response.length; topicIndex += 1) {
      const topic = response[topicIndex];
      filterNames.split('|').map((num) => {
        if (
          Object.keys(filterCategory).length === 0
          || typeof filterCategory[num] === 'undefined'
        ) filterCategory[num] = [];
        if (
          topic[num] !== ''
          && !filterCategory[num].includes(topic[num])
        ) filterCategory[num].push(topic[num]);
      });
    }
    console.log(jsonName, filterNames, response, filterCategory);
    for (let categoryIndex = 0; categoryIndex < Object.keys(filterCategory).length; categoryIndex += 1) {
      const categoryKeyName = Object.keys(filterCategory)[categoryIndex];
      console.log(categoryKeyName);
      const lists = ul({ class: 'space-y-2' });
      [...filterCategory[categoryKeyName]].map((categories) => {
        lists.append(li(
          { class: 'flex items-center gap-3' },
          input({ class: 'accent-teal-800 hover:accent-teal-600', type: 'checkbox', name: [categoryKeyName], id: `${[categoryKeyName]}-${categories}` }),
          label({ class: 'text-sm font-medium capitalize', for: `${[categoryKeyName]}-${categories}` }, categories),
        ));
      });
      const accordionSection = div(
        { class: 'px-6 py-4 border border-gray-300 rounded-xl' },
        div(
          { class: 'flex items-center justify-between mb-2' },
          span({ class: 'text-base font-bold capitalize' }, categoryKeyName),
          span({ class: 'icon icon-chevron-down size-5' })
        ),
        lists,
      );
      block.append(accordionSection);
    }
    decorateIcons(block);
  }
}
