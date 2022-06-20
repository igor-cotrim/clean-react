import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import Router from '@/main/routes'
import { GlobalStyle, theme } from '@/presentation/styles'

const container = document.getElementById('main')
const root = createRoot(container)

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router />
  </ThemeProvider>
)
