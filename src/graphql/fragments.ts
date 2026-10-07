import { gql } from '@apollo/client'

// Shared by the feed query, the post mutation and the newLink subscription,
// so every Link in the cache has the same shape.
export const LINK_FIELDS = gql`
  fragment LinkFields on Link {
    id
    createdAt
    description
    url
    postedBy {
      id
      name
    }
  }
`
