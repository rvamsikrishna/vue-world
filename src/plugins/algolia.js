import algoliasearch from 'algoliasearch'

export default {
  install: (Vue, options) => {
    const client = algoliasearch(
      '6S0WGH5HMN',
      '3e5e832023da9a62d5d6dcfb6e37b237'
    )
    Vue.algoliaIndex = client.initIndex(options.indexName)
  }
}
