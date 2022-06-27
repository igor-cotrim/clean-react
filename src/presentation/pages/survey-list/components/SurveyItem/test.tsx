import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen } from '@/presentation/utils/test-utils'

import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

import SurveyItem from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )

  return {
    history
  }
}

describe('#SurveyItem', () => {
  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-06-15T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('15')
    expect(screen.getByTestId('month')).toHaveTextContent('jun')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  it('should render with correct icon and day', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2021-05-03T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDowm)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  it('should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)

    fireEvent.click(screen.getByTestId('link'))

    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
