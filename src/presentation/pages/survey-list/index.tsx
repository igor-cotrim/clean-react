import { useEffect, useState } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { Footer, Header } from '@/presentation/components'

import { SurveyItem, SurveyItemEmpty } from './components'

import * as S from './styles'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    if (loadSurveyList) {
      loadSurveyList.loadAll().then((surveys) => setState({ surveys }))
    }
  }, [loadSurveyList])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper>
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        <S.SurveyListList data-testid="survey-list">
          {state.surveys.length ? (
            state.surveys.map((survey) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </S.SurveyListList>
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
