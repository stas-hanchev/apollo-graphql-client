import { useParams } from 'react-router'
import PagePlaceholder from '../components/PagePlaceholder'

function EditLinkPage() {
  const { id } = useParams()

  return <PagePlaceholder title={`Edit link #${id}`} />
}

export default EditLinkPage
