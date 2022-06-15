import { render, screen } from '@/presentation/utils/test-utils'

import SurveyList from '.'

// type SutTypes = {}

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('#SurveyList', () => {
  it('should present 4 empty itemson  start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
