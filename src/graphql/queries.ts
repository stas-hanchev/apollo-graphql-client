import { gql, type TypedDocumentNode } from '@apollo/client'
import { LINK_FIELDS } from './fragments'
import type { FeedData, FeedVars } from './types'

export const FEED_QUERY: TypedDocumentNode<FeedData, FeedVars> = gql`
  query Feed($filter: String, $skip: Int, $take: Int, $orderBy: LinkOrderByInput) {
    feed(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
      count
      links {
        ...LinkFields
      }
    }
  }
  ${LINK_FIELDS}
`

export const FEED_PAGE_SIZE = 10

export const FEED_VARIABLES: FeedVars = { orderBy: { createdAt: 'desc' } }

export function feedPageVariables(page: number): FeedVars {
  return { ...FEED_VARIABLES, skip: (page - 1) * FEED_PAGE_SIZE, take: FEED_PAGE_SIZE }
}
