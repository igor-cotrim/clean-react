import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { ApiContext } from '@/presentation/contexts'
import { fireEvent, render, screen } from '@/presentation/utils/test-utils'
import Header from '.'

describe('#Header', () => {
  it('should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
