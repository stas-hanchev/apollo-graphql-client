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
