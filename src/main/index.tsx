import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from '@/presentation/components'
import { GlobalStyle, theme } from '@/presentation/styles'

import { makeLogin } from './factories/pages/login'
import { makeSignUp } from './factories/pages/signup'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />
  </ThemeProvider>,
  document.getElementById('main')
)
