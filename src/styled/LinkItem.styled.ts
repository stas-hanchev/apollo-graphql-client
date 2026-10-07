import styled from 'styled-components'
import { Link, ListItem, Typography } from '@mui/material'

export const StyledLinkItem = styled(ListItem)`
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1, 0)};
`

export const Index = styled(Typography<'span'>).attrs({ component: 'span' })`
  color: ${({ theme }) => theme.palette.text.secondary};
  min-width: 2ch;
  text-align: right;
`

export const Title = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 500;
`

export const Host = styled(Typography<'span'>).attrs({ component: 'span' })`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 13px;
`

export const Meta = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 13px;
`
