import { render, screen, waitFor } from '@/presentation/utils/test-utils'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { mockSurveyListModel } from '@/domain/test'

import SurveyList from '.'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++

    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

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
})
