import styled from 'styled-components'
import { List, Typography } from '@mui/material'

export const StyledLinkList = styled(List<'ol'>).attrs({ component: 'ol' })`
  padding: 0;
`

export const Status = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`
