import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import fragmentTypes from './fragment-types.generated.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentTypes,
})

const cache = new InMemoryCache({
  fragmentMatcher,
})

export default cache
