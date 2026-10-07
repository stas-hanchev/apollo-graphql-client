import type { ApolloCache } from '@apollo/client'
import { FEED_QUERY, FEED_VARIABLES } from '../graphql/queries'
import type { Link } from '../graphql/types'

const feedOptions = { query: FEED_QUERY, variables: FEED_VARIABLES }

export function addLinkToFeed(cache: ApolloCache, link: Link) {
  cache.updateQuery(feedOptions, (data) => {
    if (!data || data.feed.links.some((l) => l.id === link.id)) return
    return { feed: { ...data.feed, count: data.feed.count + 1, links: [link, ...data.feed.links] } }
  })
}

export function removeLinkFromCache(cache: ApolloCache, id: string) {
  cache.updateQuery(feedOptions, (data) => {
    if (!data || !data.feed.links.some((l) => l.id === id)) return
    return {
      feed: { ...data.feed, count: data.feed.count - 1, links: data.feed.links.filter((l) => l.id !== id) },
    }
  })
  cache.evict({ id: cache.identify({ __typename: 'Link', id }) })
  cache.gc()
}
