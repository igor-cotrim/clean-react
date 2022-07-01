import { createMemoryHistory, MemoryHistory } from 'history'

import { mockAccountModel } from '@/domain/mocks'
import { PrivateRoute } from '@/main/proxies'
import { renderWithHistory } from '@/presentation/mocks'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  renderWithHistory({ history, Page: PrivateRoute, account })

  return {
    history
  }
}

describe('#PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if token is not empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/')
  })
})
