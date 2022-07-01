import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, screen } from '@/presentation/utils/test-utils'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mocks'
import { renderWithHistory } from '@/presentation/mocks'
import { Header } from '@/presentation/components'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: Header,
    account
  })

  return {
    history,
    setCurrentAccountMock
  }
}

describe('#Header', () => {
  it('should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('should render username correctly', () => {
    const account = mockAccountModel()

    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
