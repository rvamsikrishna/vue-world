import algoliasearch from 'algoliasearch'

export default {
  install: (Vue, options) => {
    const client = algoliasearch(options.appId, options.searchApiKey)
    Vue.algoliaIndex = client.initIndex(options.indexName)
  }
}
