import { useMemo } from 'react'
import { CssBaseline, useMediaQuery } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'
import { createAppTheme } from './theme/theme'

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createAppTheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
