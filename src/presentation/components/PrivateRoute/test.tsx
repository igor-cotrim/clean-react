import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { render } from '@/presentation/utils/test-utils'

import PrivateRoute from '.'

describe('#PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
