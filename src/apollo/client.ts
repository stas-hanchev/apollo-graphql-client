import { ApolloClient, ApolloLink, CombinedGraphQLErrors, HttpLink, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { OperationTypeNode } from 'graphql'
import { createClient } from 'graphql-ws'
import { useAuthStore } from '../stores/auth'

const HTTP_URL = import.meta.env.VITE_GRAPHQL_HTTP_URL ?? 'http://localhost:4000/graphql'
const WS_URL = import.meta.env.VITE_GRAPHQL_WS_URL ?? 'ws://localhost:4000/graphql'

const httpLink = new HttpLink({ uri: HTTP_URL })

const authLink = new SetContextLink(({ headers }) => {
  const { token } = useAuthStore.getState()
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  }
})

const errorLink = new ErrorLink(({ error }) => {
  const { token, logout } = useAuthStore.getState()
  if (
    token &&
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((e) => e.message === 'Not authenticated')
  ) {
    logout()
  }
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    lazy: true,
    connectionParams: () => {
      const { token } = useAuthStore.getState()
      return token ? { authToken: token } : {}
    },
  }),
)

const link = ApolloLink.split(
  ({ operationType }) => operationType === OperationTypeNode.SUBSCRIPTION,
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink]),
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
