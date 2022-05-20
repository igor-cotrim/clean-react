import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from '@/presentation/components'
import { GlobalStyle, theme } from '@/presentation/styles'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router />
  </ThemeProvider>,
  document.getElementById('main')
)
