import { useState } from 'react'

import {
  Footer,
  IconThumbDown,
  IconThumbUp,
  Header
} from '@/presentation/components'

import * as S from './styles'

const SurveyList = () => {
  const [readedPolls] = useState(false)

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper>
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        <S.SurveyListList>
          <S.SurveyListListItem>
            <S.SurveyListContent>
              <S.SurveyListIconContainer readedPolls={readedPolls}>
                {readedPolls ? <IconThumbUp /> : <IconThumbDown />}
              </S.SurveyListIconContainer>
              <S.SurveyListTime>
                <S.SurveyListTimeDay>22</S.SurveyListTimeDay>
                <S.SurveyListTimeMonth>03</S.SurveyListTimeMonth>
                <S.SurveyListTimeYear>2022</S.SurveyListTimeYear>
              </S.SurveyListTime>
              <S.SurveyListText>
                Qual é seu framework web favorito?
              </S.SurveyListText>
            </S.SurveyListContent>
            <S.SurveyListFooter>Ver Resultado</S.SurveyListFooter>
          </S.SurveyListListItem>
        </S.SurveyListList>
      </S.SurveyListWrapper>

      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
