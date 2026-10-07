import { Toolbar } from '@mui/material'
import { useAuthStore } from '../stores/auth'
import { paths } from '../routes/paths'
import { Account, Header as StyledHeader, Logo, LogoutButton, Nav, NavItem, UserName } from '../styled/App.styled'

function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <StyledHeader position="static" elevation={0}>
      <Toolbar variant="dense">
        <Logo to={paths.home}>Hacker News</Logo>
        <Nav aria-label="Main">
          <NavItem to={paths.home} end>
            new
          </NavItem>
          <NavItem to={paths.search}>search</NavItem>
          {user && <NavItem to={paths.create}>submit</NavItem>}
        </Nav>
        <Account>
          {user ? (
            <>
              <UserName>{user.name}</UserName>
              <LogoutButton type="button" onClick={logout}>
                logout
              </LogoutButton>
            </>
          ) : (
            <NavItem to={paths.login}>login</NavItem>
          )}
        </Account>
      </Toolbar>
    </StyledHeader>
  )
}

export default Header
