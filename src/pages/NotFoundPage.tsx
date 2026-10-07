import { Link } from 'react-router'
import PagePlaceholder from '../components/PagePlaceholder'
import { paths } from '../routes/paths'

function NotFoundPage() {
  return (
    <PagePlaceholder title="Page not found">
      Nothing here. <Link to={paths.home}>Back to the feed</Link>
    </PagePlaceholder>
  )
}

export default NotFoundPage
