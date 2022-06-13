import { Footer, Logo } from '@/presentation/components'

import * as S from './styles'

const SurveyList = () => {
  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <S.HeaderContent>
          <Logo />
          <S.UserInfoContainer>
            <S.UserInfo>Igor Cotrim</S.UserInfo>
            <S.Logout>Sair</S.Logout>
          </S.UserInfoContainer>
        </S.HeaderContent>
      </S.HeaderContainer>

      <S.SurveyListWrapper>
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        <S.SurveyListList>
          <S.SurveyListListItem>
            <S.SurveyListContent>
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
          <S.SurveyListListItem>
            <S.SurveyListContent>
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
