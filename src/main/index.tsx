import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { Login } from '@/presentation/pages'
import { GlobalStyle, theme } from '@/presentation/styles'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Login />
  </ThemeProvider>,
  document.getElementById('main')
)
