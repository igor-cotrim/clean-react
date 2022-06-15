import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { render, screen } from '@/presentation/utils/test-utils'

import SurveyItem from '.'

describe('#SurveyItem', () => {
  it('should render with correct values', () => {
    const survey = mockSurveyModel()

    survey.didAnswer = true
    survey.date = new Date('2022-06-15T00:00:00')

    render(<SurveyItem survey={survey} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('15')
    expect(screen.getByTestId('month')).toHaveTextContent('jun')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })
})
