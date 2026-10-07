import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Alert, Button, TextField, Typography } from '@mui/material'
import type { LinkInput } from '../graphql/types'
import { Actions, Card, Form } from '../styled/LinkForm.styled'

const MAX_DESCRIPTION_LENGTH = 500
const MAX_URL_LENGTH = 2048

interface Props {
  title: string
  submitLabel: string
  initialValues?: LinkInput
  loading?: boolean
  error?: Error
  onSubmit: (values: LinkInput) => void
}

function LinkForm({ title, submitLabel, initialValues, loading, error, onSubmit }: Props) {
  const navigate = useNavigate()
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [url, setUrl] = useState(initialValues?.url ?? '')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ description: description.trim(), url: url.trim() })
  }

  return (
    <Card elevation={0} variant="outlined">
      <Typography variant="h6" component="h1" gutterBottom>
        {title}
      </Typography>

      <Form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          slotProps={{ htmlInput: { maxLength: MAX_DESCRIPTION_LENGTH } }}
          helperText={`${description.length}/${MAX_DESCRIPTION_LENGTH}`}
          required
          autoFocus
        />
        <TextField
          label="URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          slotProps={{ htmlInput: { maxLength: MAX_URL_LENGTH } }}
          required
        />

        {error && <Alert severity="error">{error.message}</Alert>}

        <Actions>
          <Button type="button" onClick={() => navigate(-1)} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {submitLabel}
          </Button>
        </Actions>
      </Form>
    </Card>
  )
}

export default LinkForm
