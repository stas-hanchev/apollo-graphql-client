import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { removeLinkFromCache } from '../apollo/linkCache'
import { DELETE_LINK_MUTATION } from '../graphql/mutations'
import type { Link } from '../graphql/types'
import { paths } from '../routes/paths'
import { useAuthStore } from '../stores/auth'
import { timeAgo } from '../utils/timeAgo'
import {
  ActionButton,
  ActionError,
  ActionLink,
  Host,
  Index,
  Meta,
  StyledLinkItem,
  Title,
} from '../styled/LinkItem.styled'

interface Props {
  link: Link
  index: number
}

function getHost(url: string): string | null {
  try {
    return new URL(url).host
  } catch {
    return null
  }
}

function LinkItem({ link, index }: Props) {
  const host = getHost(link.url)
  const userId = useAuthStore((s) => s.user?.id)
  const isOwner = userId != null && link.postedBy?.id === userId

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteLink, { loading: deleting, error: deleteError }] = useMutation(DELETE_LINK_MUTATION, {
    variables: { id: link.id },
    update: (cache) => removeLinkFromCache(cache, link.id),
  })

  const handleDelete = async () => {
    setConfirmOpen(false)
    try {
      await deleteLink()
    } catch (error) {
      console.error('LinkItem.handleDelete error', error)
    }
  }

  return (
    <StyledLinkItem disableGutters>
      <Index>{index}.</Index>
      <div>
        <Title href={link.url} target="_blank" rel="noreferrer" underline="hover">
          {link.description}
        </Title>{' '}
        {host && <Host>({host})</Host>}
        <Meta>
          by {link.postedBy?.name ?? 'unknown'} ·{' '}
          <time dateTime={link.createdAt} title={new Date(link.createdAt).toLocaleString()}>
            {timeAgo(link.createdAt)}
          </time>
          {isOwner && (
            <>
              {' · '}
              <ActionLink to={paths.editLink(link.id)}>edit</ActionLink>
              {' · '}
              <ActionButton type="button" onClick={() => setConfirmOpen(true)} disabled={deleting}>
                {deleting ? 'deleting…' : 'delete'}
              </ActionButton>
            </>
          )}
          {deleteError && <ActionError> · {deleteError.message}</ActionError>}
        </Meta>
      </div>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete link?</DialogTitle>
        <DialogContent>
          <DialogContentText>“{link.description}” will be permanently deleted.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledLinkItem>
  )
}

export default LinkItem
