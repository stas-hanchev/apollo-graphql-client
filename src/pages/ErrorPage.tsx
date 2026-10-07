import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Alert } from '@mui/material'
import { paths } from '../routes/paths'
import { Main } from '../styled/App.styled'

function ErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error'

  return (
    <Main>
      <Alert severity="error">Something went wrong: {message}</Alert>
      <p>
        <Link to={paths.home}>Back to the feed</Link>
      </p>
    </Main>
  )
}

export default ErrorPage
