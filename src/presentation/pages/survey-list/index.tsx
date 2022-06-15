import { Footer, Header } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from './components'

import * as S from './styles'

const SurveyList = () => {
  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper>
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        <S.SurveyListList>
          <SurveyItem />
          <SurveyItemEmpty />
        </S.SurveyListList>
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
