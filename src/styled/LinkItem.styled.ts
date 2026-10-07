import styled from 'styled-components'
import { Link, ListItem, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

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

export const ActionLink = styled(RouterLink)`
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const ActionButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.palette.error.main};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`

export const ActionError = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
`
