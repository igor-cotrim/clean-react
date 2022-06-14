import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { render } from '@/presentation/utils/test-utils'

import PrivateRoute from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  )

  return {
    history
  }
}

describe('#PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/login')
  })
})