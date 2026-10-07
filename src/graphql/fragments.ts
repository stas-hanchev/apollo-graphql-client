import { gql } from '@apollo/client'

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
