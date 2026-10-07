import { useEffect, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router'
import { useQuery } from '@apollo/client/react'
import { Alert, CircularProgress, Pagination } from '@mui/material'
import { FEED_PAGE_SIZE, FEED_QUERY, feedPageVariables } from '../graphql/queries'
import LinkItem from './LinkItem'
import { PaginationBar, Status, StyledLinkList } from '../styled/LinkList.styled'

function parsePage(value: string | null): number {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

interface Props {
  filter?: string
  emptyText?: string
}

function LinkList({ filter, emptyText = 'No links yet.' }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))
  const variables = feedPageVariables(page, filter)

  const { data, previousData, loading, error } = useQuery(FEED_QUERY, { variables })

  const feed = (data ?? previousData)?.feed
  const pageCount = Math.ceil((feed?.count ?? 0) / FEED_PAGE_SIZE)

  const goToPage = (next: number, replace = false) => {
    setSearchParams(
      (params) => {
        if (next > 1) params.set('page', String(next))
        else params.delete('page')
        return params
      },
      { replace },
    )
  }

  const outOfRange = data != null && pageCount > 0 && page > pageCount
  useEffect(() => {
    if (outOfRange) goToPage(pageCount, true)
  })

  const handlePageChange = (_: ChangeEvent<unknown>, next: number) => {
    goToPage(next)
    window.scrollTo({ top: 0 })
  }

  if (!feed && loading) return <CircularProgress size={24} />
  if (error) return <Alert severity="error">Error: {error.message}</Alert>

  const links = feed?.links ?? []
  if (links.length === 0) return outOfRange ? null : <Status>{emptyText}</Status>

  return (
    <>
      <StyledLinkList>
        {links.map((link, i) => (
          <LinkItem key={link.id} link={link} index={(variables.skip ?? 0) + i + 1} />
        ))}
      </StyledLinkList>

      {pageCount > 1 && (
        <PaginationBar>
          <Pagination
            count={pageCount}
            page={Math.min(page, pageCount)}
            onChange={handlePageChange}
            disabled={loading}
            shape="rounded"
          />
        </PaginationBar>
      )}
    </>
  )
}

export default LinkList
