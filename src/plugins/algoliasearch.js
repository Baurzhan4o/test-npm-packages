const algoliasearch = require('algoliasearch');

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e', { protocol: 'https:' });
const index = client.initIndex('npm-search');

module.exports.getPackagesByName = (name, page, hitsPerPage = 10) => {
  const options = {
    page,
    hitsPerPage,
    attributesToHighlight: [],
    attributesToRetrieve: ['description', 'created', 'name', 'owner', 'version'],
    analyticsTags: ['jsdelivr'],
  };
  return index.search(name, options).then((res) => res).catch(() => ({ hits: [] }));
};

module.exports.getByName = (name) => index.getObject(name).then((res) => res);
