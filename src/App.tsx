import { useMemo } from 'react'
import { CssBaseline, Toolbar, useMediaQuery } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider } from 'styled-components'
import LinkList from './components/LinkList'
import { createAppTheme } from './theme/theme'
import { Header, Layout, Logo, Main } from './styled/App.styled'

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createAppTheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout maxWidth="md" disableGutters>
          <Header position="static" elevation={0}>
            <Toolbar variant="dense">
              <Logo>Hacker News</Logo>
            </Toolbar>
          </Header>
          <Main>
            <LinkList />
          </Main>
        </Layout>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
