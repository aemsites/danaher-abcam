import { getProductResponse } from '../../scripts/search.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  block.textContent = 'Product Reactivity Placeholder';
  const responseData = JSON.parse(response[0].raw.reactivityjson);

  const applicationsMap = {
    'IHC-P': 'ihc_p',
    WB: 'wb',
    IP: 'ip',
  };

  const getReactivityStatus = (reactivityType) => {
    if (reactivityType === 'TESTED_AND_REACTS') {
      return 'Tested';
    } if (reactivityType === 'REACTS') {
      return 'Expected';
    }
    return 'Predicted';
  };

  const tableData = [];

  responseData.speciesReactivity.forEach((species) => {
    const speciesName = species.speciesDetail.name;
    const speciesReactivityStatus = getReactivityStatus(species.reactivityType);

    const existingEntry = tableData.find((entry) => entry.species === speciesName);
    if (!existingEntry) {
      const newEntry = {
        species: speciesName,
        ihc_p: speciesReactivityStatus,
        wb: speciesReactivityStatus,
        ip: speciesReactivityStatus,
      };
      tableData.push(newEntry);
    }

    responseData.applications.forEach((app) => {
      app.species.forEach((appSpecies) => {
        if (appSpecies.speciesDetail.name === speciesName) {
          const appKey = applicationsMap[app.name];
          const speciesEntry = tableData.find((entry) => entry.species === speciesName);
          const reactivityStatus = getReactivityStatus(appSpecies.suitability);
          speciesEntry[appKey] = reactivityStatus;
        }
      });
    });
  });

  console.log(tableData);
}
