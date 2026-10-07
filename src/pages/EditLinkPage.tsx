import { useMutation, useQuery } from '@apollo/client/react'
import { useNavigate, useParams } from 'react-router'
import { Alert, CircularProgress } from '@mui/material'
import LinkForm from '../components/LinkForm'
import PagePlaceholder from '../components/PagePlaceholder'
import { UPDATE_LINK_MUTATION } from '../graphql/mutations'
import { FEED_QUERY, FEED_VARIABLES } from '../graphql/queries'
import type { LinkInput } from '../graphql/types'
import { paths } from '../routes/paths'
import { useAuthStore } from '../stores/auth'

function EditLinkPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?.id)

  const { data, loading: feedLoading, error: feedError } = useQuery(FEED_QUERY, {
    variables: FEED_VARIABLES,
  })
  const [updateLink, { loading, error }] = useMutation(UPDATE_LINK_MUTATION)

  if (feedLoading) return <CircularProgress size={24} />
  if (feedError) return <Alert severity="error">Error: {feedError.message}</Alert>

  const link = data?.feed.links.find((l) => l.id === id)
  if (!link) return <PagePlaceholder title="Link not found">This link does not exist or was deleted.</PagePlaceholder>
  if (link.postedBy?.id !== userId) {
    return <PagePlaceholder title="Not allowed">You can only edit your own links.</PagePlaceholder>
  }

  const handleSubmit = async (values: LinkInput) => {
    try {
      await updateLink({ variables: { id: link.id, ...values } })
      navigate(paths.home)
    } catch (error) {
      console.error('EditLinkPage.handleSubmit error', error)
    }
  }

  return (
    <LinkForm
      key={link.id}
      title="Edit link"
      submitLabel="Save"
      initialValues={{ description: link.description, url: link.url }}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}

export default EditLinkPage
