import { gql, type TypedDocumentNode } from '@apollo/client'
import { LINK_FIELDS } from './fragments'
import type { DeletedLinkData, NewLinkData, UpdatedLinkData } from './types'

export const NEW_LINK_SUBSCRIPTION: TypedDocumentNode<NewLinkData> = gql`
  subscription OnNewLink {
    newLink {
      ...LinkFields
    }
  }
  ${LINK_FIELDS}
`

export const UPDATED_LINK_SUBSCRIPTION: TypedDocumentNode<UpdatedLinkData> = gql`
  subscription OnUpdatedLink {
    updatedLink {
      ...LinkFields
    }
  }
  ${LINK_FIELDS}
`

export const DELETED_LINK_SUBSCRIPTION: TypedDocumentNode<DeletedLinkData> = gql`
  subscription OnDeletedLink {
    deletedLink
  }
`
