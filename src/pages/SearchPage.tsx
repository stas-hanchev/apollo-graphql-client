import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { Button, TextField, Typography } from '@mui/material'
import LinkList from '../components/LinkList'
import { SearchForm } from '../styled/SearchPage.styled'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    setSearchParams(value ? { q: value } : {})
  }

  return (
    <section>
      <Typography variant="h6" component="h1" gutterBottom>
        Search
      </Typography>

      <SearchForm key={query} role="search" onSubmit={handleSubmit}>
        <TextField
          name="q"
          defaultValue={query}
          placeholder="Search by description or URL"
          size="small"
          fullWidth
          autoFocus
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </SearchForm>

      {query && <LinkList filter={query} emptyText={`No links found for “${query}”.`} />}
    </section>
  )
}

export default SearchPage
