import styled from 'styled-components'
import { AppBar, Container } from '@mui/material'
import { Link, NavLink } from 'react-router'

export const Layout = styled(Container)`
  min-height: 100svh;
`

export const Header = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  .MuiToolbar-root {
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
  }
`

export const Logo = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
`

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  &.active {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 600;
  }
`

export const Account = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-left: auto;
  font-size: 14px;
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.palette.text.primary};
`

export const LogoutButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: ${({ theme }) => theme.palette.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(2)};
`
