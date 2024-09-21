import ffetch from '../../scripts/ffetch.js';

export default async function decorate(block) {
  console.log(block);
  let jsonName = 'products-index';
  let articleType = '';
  let filterPath = '';
  let filterNames = '';
  if (block.children.length > 0) {
    [...block.children].forEach((child, childIndex) => {
      const firstElementChildren = child.children[0].children[0].innerText;
      if (childIndex === 0) jsonName = firstElementChildren;
      if (childIndex === 1) filterNames = firstElementChildren;
    });
    const articles = await ffetch(`https://stage.lifesciences.danaher.com/us/en/${jsonName}.json`)
      // .chunks(500)
      // .filter(({ type }) => type.toLowerCase() === articleType)
      // .filter((article) => !article.path.includes(`/${filterPath}`))
      .all();
    // const allFilters = 
    console.log(jsonName, articles);
  }
}