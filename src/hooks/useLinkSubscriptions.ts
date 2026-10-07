import { useSubscription } from '@apollo/client/react'
import { addLinkToFeed, removeLinkFromCache } from '../apollo/linkCache'
import {
  DELETED_LINK_SUBSCRIPTION,
  NEW_LINK_SUBSCRIPTION,
  UPDATED_LINK_SUBSCRIPTION,
} from '../graphql/subscriptions'

export function useLinkSubscriptions() {
  useSubscription(NEW_LINK_SUBSCRIPTION, {
    ignoreResults: true,
    onData: ({ client, data }) => {
      const link = data.data?.newLink
      if (link) addLinkToFeed(client.cache, link)
    },
  })

  useSubscription(UPDATED_LINK_SUBSCRIPTION, { ignoreResults: true })

  useSubscription(DELETED_LINK_SUBSCRIPTION, {
    ignoreResults: true,
    onData: ({ client, data }) => {
      const id = data.data?.deletedLink
      if (id) removeLinkFromCache(client.cache, id)
    },
  })
}
