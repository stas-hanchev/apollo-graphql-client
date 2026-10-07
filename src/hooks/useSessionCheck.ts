import { useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { ME_QUERY } from '../graphql/queries'
import { useAuthStore } from '../stores/auth'

export function useSessionCheck() {
  const token = useAuthStore((s) => s.token)
  const setAuth = useAuthStore((s) => s.setAuth)
  const logout = useAuthStore((s) => s.logout)

  const { data } = useQuery(ME_QUERY, {
    skip: !token,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!token || !data) return
    if (data.me) setAuth(token, data.me)
    else logout()
  }, [data, token, setAuth, logout])
}
