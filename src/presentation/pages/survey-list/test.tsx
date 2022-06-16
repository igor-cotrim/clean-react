import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { render, screen, waitFor } from '@/presentation/utils/test-utils'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyList } from '@/domain/usecases'
import { mockAccountModel, mockSurveyListModel } from '@/domain/test'

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
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyListSpy
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
