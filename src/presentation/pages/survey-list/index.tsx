import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty } from './components'

import * as S from './styles'

const SurveyList = () => {
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
