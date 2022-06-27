import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { render, screen } from '@/presentation/utils/test-utils'

import SurveyItem from '.'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('#SurveyItem', () => {
  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('should render with correct icon and day', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDowm)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
