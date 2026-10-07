import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const INFO_QUERY = gql`
  query Info {
    info
  }
`

function App() {
  const { data, loading, error } = useQuery<{ info: string }>(INFO_QUERY)

  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  return <h1>{data?.info}</h1>
}

export default App
