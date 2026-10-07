import { useMutation } from '@apollo/client/react'
import { useNavigate } from 'react-router'
import LinkForm from '../components/LinkForm'
import { POST_MUTATION } from '../graphql/mutations'
import type { LinkInput } from '../graphql/types'
import { paths } from '../routes/paths'

function CreateLinkPage() {
  const navigate = useNavigate()
  const [post, { loading, error }] = useMutation(POST_MUTATION, {
    update: (cache) => {
      cache.evict({ fieldName: 'feed' })
      cache.gc()
    },
  })

  const handleSubmit = async (values: LinkInput) => {
    try {
      await post({ variables: values })
      navigate(paths.home)
    } catch (error) {
      console.error('CreateLinkPage.handleSubmit error', error)
    }
  }

  return (
    <LinkForm
      title="Submit a link"
      submitLabel="Submit"
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}

export default CreateLinkPage
