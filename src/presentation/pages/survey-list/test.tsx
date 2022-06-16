import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { render, screen, waitFor } from '@/presentation/utils/test-utils'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyList } from '@/domain/usecases'
import { mockAccountModel, mockSurveyListModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

import SurveyList from '.'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++

    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('#SurveyList', () => {
  it('should present 4 empty itemson  start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()

    await waitFor(() => surveyList)
  })

  it('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()

    expect(loadSurveyListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })

  it('should render SurveyItems on success', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  // it('Should logout on AccessDeniedError', async () => {
  //   const loadSurveyListSpy = new LoadSurveyListSpy()

  //   const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy)

  //   jest
  //     .spyOn(loadSurveyListSpy, 'loadAll')
  //     .mockRejectedValueOnce(new AccessDeniedError())

  //   await waitFor(() => screen.getByRole('heading'))

  //   expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  //   expect(history.location.pathname).toBe('/login')
  // })

  // it('Should render error on UnexpectedError', async () => {
  //   const loadSurveyListSpy = new LoadSurveyListSpy()
  //   const error = new UnexpectedError()
  //   makeSut(loadSurveyListSpy)

  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

  //   await waitFor(() => screen.getByRole('heading'))

  //   expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  // })

  // it('Should call LoadSurveyList on reload', async () => {
  //   const loadSurveyListSpy = new LoadSurveyListSpy()

  //   jest
  //     .spyOn(loadSurveyListSpy, 'loadAll')
  //     .mockRejectedValueOnce(new UnexpectedError())

  //   makeSut(loadSurveyListSpy)

  //   await waitFor(() => screen.getByRole('heading'))

  //   fireEvent.click(screen.getByTestId('reload'))

  //   expect(loadSurveyListSpy.callsCount).toBe(1)

  //   await waitFor(() => screen.getByRole('heading'))
  // })
})
