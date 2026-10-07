import { createTheme, type PaletteMode } from '@mui/material/styles'

export function createAppTheme(mode: PaletteMode) {
  const dark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? '#c084fc' : '#aa3bff' },
      error: { main: dark ? '#f87171' : '#d22c2c' },
      text: {
        primary: dark ? '#f3f4f6' : '#08060d',
        secondary: dark ? '#8b909b' : '#8a8492',
      },
      background: {
        default: dark ? '#16171d' : '#fff',
        paper: dark ? '#1f2028' : '#f6f5f8',
      },
      divider: dark ? '#2e303a' : '#e5e4e7',
    },
    typography: {
      fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    },
  })
}
