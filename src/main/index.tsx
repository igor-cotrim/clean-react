import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { makeLogin } from './factories/pages/login'
import { Router } from '@/presentation/components'
import { GlobalStyle, theme } from '@/presentation/styles'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router makeLogin={makeLogin} />
  </ThemeProvider>,
  document.getElementById('main')
)
