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
        ) {
          filterCategory[num].push(topic[num]);
        }
      });
    }
    console.log(jsonName, response, filterCategory);
  }
}