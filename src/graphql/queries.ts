import { gql, type TypedDocumentNode } from '@apollo/client'
import { LINK_FIELDS } from './fragments'
import type { FeedData, FeedVars, LinkData, LinkVars, MeData } from './types'

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

export const LINK_QUERY: TypedDocumentNode<LinkData, LinkVars> = gql`
  query Link($id: ID!) {
    link(id: $id) {
      ...LinkFields
    }
  }
  ${LINK_FIELDS}
`

export const ME_QUERY: TypedDocumentNode<MeData> = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`

export const FEED_PAGE_SIZE = 10

const FEED_VARIABLES: FeedVars = { orderBy: { createdAt: 'desc' } }

export function feedPageVariables(page: number, filter?: string): FeedVars {
  return {
    ...FEED_VARIABLES,
    ...(filter ? { filter } : {}),
    skip: (page - 1) * FEED_PAGE_SIZE,
    take: FEED_PAGE_SIZE,
  }
}
