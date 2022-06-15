import { render, screen } from '@/presentation/utils/test-utils'

import SurveyList from '.'

describe('#SurveyList', () => {
  it('should present 4 empty itemson  start', () => {
    render(<SurveyList />)

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
