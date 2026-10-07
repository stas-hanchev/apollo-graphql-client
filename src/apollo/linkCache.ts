import type { ApolloCache } from '@apollo/client'

export function invalidateFeed(cache: ApolloCache) {
  cache.evict({ id: 'ROOT_QUERY', fieldName: 'feed' })
  cache.gc()
}

export function removeLinkFromCache(cache: ApolloCache, id: string) {
  cache.evict({ id: cache.identify({ __typename: 'Link', id }) })
  invalidateFeed(cache)
}
