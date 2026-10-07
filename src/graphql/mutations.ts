import { gql, type TypedDocumentNode } from '@apollo/client'
import { LINK_FIELDS } from './fragments'
import type {
  DeleteLinkData,
  DeleteLinkVars,
  LoginData,
  LoginVars,
  PostData,
  PostVars,
  SignupData,
  SignupVars,
  UpdateLinkData,
  UpdateLinkVars,
} from './types'

export const LOGIN_MUTATION: TypedDocumentNode<LoginData, LoginVars> = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const SIGNUP_MUTATION: TypedDocumentNode<SignupData, SignupVars> = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const POST_MUTATION: TypedDocumentNode<PostData, PostVars> = gql`
  mutation Post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      ...LinkFields
    }
  }
  ${LINK_FIELDS}
`

export const UPDATE_LINK_MUTATION: TypedDocumentNode<UpdateLinkData, UpdateLinkVars> = gql`
  mutation UpdateLink($id: ID!, $url: String, $description: String) {
    updateLink(id: $id, url: $url, description: $description) {
      ...LinkFields
    }
  }
  ${LINK_FIELDS}
`

export const DELETE_LINK_MUTATION: TypedDocumentNode<DeleteLinkData, DeleteLinkVars> = gql`
  mutation DeleteLink($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`
