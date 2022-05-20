import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import Login from '@/presentation/pages/login'
import theme from '@/presentation/styles/theme'
import { GlobalStyle } from '@/presentation/styles/global'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Login />
  </ThemeProvider>,
  document.getElementById('main')
)
