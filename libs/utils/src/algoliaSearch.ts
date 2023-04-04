/* eslint-disable @typescript-eslint/no-explicit-any */
import algoliasearch from 'algoliasearch/lite'

export const algoliaClient = algoliasearch(
  process.env.NODE_ENV === 'development'
    ? (process.env.NX_TEST_ALGOLIA_APP_ID as string)
    : (process.env.NX_ALGOLIA_APP_ID as string),
  process.env.NODE_ENV === 'development'
    ? (process.env.NX_TEST_ALGOLIA_SEARCH_API_KEY as string)
    : (process.env.NX_ALGOLIA_SEARCH_API_KEY as string)
)

export const alogliaSearch = {
  search(requests: any) {
    if (requests.every(({ params }: any) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

export default alogliaSearch
