import { render, screen, waitFor } from '@/presentation/utils/test-utils'

import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel
} from '@/domain/test'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()

  loadSurveyResultSpy.surveyResult = surveyResult

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy
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
  //   const surveyResult = Object.assign(mockSurveyResultModel(), {
  //     date: new Date('2022-06-15T00:00:00')
  //   })
  //   const answersWrapper = screen.queryAllByTestId('answer-wrapper')
  //   const images = screen.queryAllByTestId('image')
  //   const answers = screen.queryAllByTestId('answer')
  //   const percents = screen.queryAllByTestId('percent')

  //   makeSut(surveyResult)

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
})
