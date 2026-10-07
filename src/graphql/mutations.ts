import { gql, type TypedDocumentNode } from '@apollo/client'
import type { LoginData, LoginVars, SignupData, SignupVars } from './types'

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
