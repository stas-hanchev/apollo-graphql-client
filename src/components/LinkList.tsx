import { useQuery } from '@apollo/client/react'
import { Alert, CircularProgress } from '@mui/material'
import { FEED_QUERY, FEED_VARIABLES } from '../graphql/queries'
import LinkItem from './LinkItem'
import { Status, StyledLinkList } from '../styled/LinkList.styled'

function LinkList() {
  const { data, loading, error } = useQuery(FEED_QUERY, {
    variables: FEED_VARIABLES,
  })

  if (loading) return <CircularProgress size={24} />
  if (error) return <Alert severity="error">Error: {error.message}</Alert>

  const links = data?.feed.links ?? []
  if (links.length === 0) return <Status>No links yet.</Status>

  return (
    <StyledLinkList>
      {links.map((link, i) => (
        <LinkItem key={link.id} link={link} index={i + 1} />
      ))}
    </StyledLinkList>
  )
}

export default LinkList
