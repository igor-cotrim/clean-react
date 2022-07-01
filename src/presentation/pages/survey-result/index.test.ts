import { createMemoryHistory, MemoryHistory } from 'history'
import { screen, waitFor } from '@/presentation/utils/test-utils'

import { LoadSurveyResultSpy, SaveSurveyResultSpy } from '@/domain/mocks'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'
import { renderWithHistory } from '@/presentation/mocks'
import { surveyResultState } from '@/presentation/pages/survey-result/components'
import { SurveyResult } from '@/presentation/pages'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
  initialState?: {
    isLoading: boolean
    error: string
    surveyResult: LoadSurveyResult.Model
    reload: boolean
  }
}

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
  initialState = null
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1
  })
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () =>
      SurveyResult({
        loadSurveyResult: loadSurveyResultSpy,
        saveSurveyResult: saveSurveyResultSpy
      }),
    states: initialState
      ? [{ atom: surveyResultState, value: initialState }]
      : []
  })
  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
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

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = makeSut({ loadSurveyResultSpy })

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
