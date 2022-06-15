import { useEffect } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'

import { SurveyItemEmpty } from './components'

import * as S from './styles'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  useEffect(() => {
    ;(async function () {
      loadSurveyList.loadAll()
    })()
  }, [loadSurveyList])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper>
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        <S.SurveyListList data-testid="survey-list">
          {/* <SurveyItem /> */}
          <SurveyItemEmpty />
        </S.SurveyListList>
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
