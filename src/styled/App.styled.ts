import styled from 'styled-components'
import { AppBar, Container, Typography } from '@mui/material'

export const Layout = styled(Container)`
  min-height: 100svh;
`

export const Header = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`

export const Logo = styled(Typography)`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(2)};
`
