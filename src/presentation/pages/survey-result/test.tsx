import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, screen, waitFor } from '@/presentation/utils/test-utils'

import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError } from '@/domain/errors'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
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
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock
  }
}

describe('#SurveyResult', () => {
  it('should present correct initial state', async () => {
    makeSut()

    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()

    await waitFor(() => surveyResult)
  })

  it('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  // it('should present SurveyResult data on success', async () => {
  // const loadSurveyResultSpy = new LoadSurveyResultSpy()
  //   const surveyResult = Object.assign(mockSurveyResultModel(), {
  //     date: new Date('2022-06-15T00:00:00')
  //   })
  //   const answersWrapper = screen.queryAllByTestId('answer-wrapper')
  //   const images = screen.queryAllByTestId('image')
  //   const answers = screen.queryAllByTestId('answer')
  //   const percents = screen.queryAllByTestId('percent')

  // loadSurveyResultSpy.surveyResult = surveyResult

  //   makeSut(loadSurveyResultSpy)

  //   await waitFor(() => screen.getByTestId('survey-result'))

  //   expect(screen.getByTestId('day')).toHaveTextContent('15')
  //   expect(screen.getByTestId('month')).toHaveTextContent('jun')
  //   expect(screen.getByTestId('year')).toHaveTextContent('2022')
  //   expect(screen.getByTestId('question')).toHaveTextContent(
  //     surveyResult.question
  //   )
  //   expect(screen.getByTestId('answers').childElementCount).toBe(2)
  //   expect(answersWrapper[0]).toHaveClass('active')
  //   expect(answersWrapper[1]).not.toHaveClass('active')
  //   expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
  //   expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
  //   expect(images[1]).toBeFalsy()
  //   expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
  //   expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
  //   expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
  //   expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  // })

  // it('Should render error on UnexpectedError', async () => {
  //   const loadSurveyResultSpy = new LoadSurveyResultSpy()
  //   const error = new UnexpectedError()

  //   jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)

  //   makeSut(loadSurveyResultSpy)

  //   await waitFor(() => screen.getByTestId('survey-result'))

  //   expect(screen.queryByTestId('question')).not.toBeInTheDocument()
  //   expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  // })

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy)

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  // it('Should call LoadSurveyResult on reload', async () => {
  //   const loadSurveyResultSpy = new LoadSurveyResultSpy()

  //   jest
  //     .spyOn(loadSurveyResultSpy, 'load')
  //     .mockRejectedValueOnce(new UnexpectedError())

  //   makeSut(loadSurveyResultSpy)

  //   await waitFor(() => screen.getByTestId('survey-result'))

  //   fireEvent.click(screen.getByTestId('reload'))

  //   expect(loadSurveyResultSpy.callsCount).toBe(1)

  //   await waitFor(() => screen.getByTestId('survey-result'))
  // })
})
