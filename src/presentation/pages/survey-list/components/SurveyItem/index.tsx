import { Icon, IconName } from '@/presentation/components'

import * as S from './styles'

const SurveyItem = () => {
  return (
    <S.SurveyItemWrapper>
      <S.SurveyListContent>
        <Icon className="icon-wrapper" iconName={IconName.thumbDowm} />
        <S.SurveyListTime>
          <S.SurveyListTimeDay>22</S.SurveyListTimeDay>
          <S.SurveyListTimeMonth>03</S.SurveyListTimeMonth>
          <S.SurveyListTimeYear>2022</S.SurveyListTimeYear>
        </S.SurveyListTime>
        <S.SurveyListText>
          Qual é seu framework web favorito?Qual é seu framework web
          favorito?Qual é seu framework web favorito?Qual é seu framework web
          favorito?Qual é seu framework web favorito?
        </S.SurveyListText>
      </S.SurveyListContent>
      <S.SurveyListFooter>Ver Resultado</S.SurveyListFooter>
    </S.SurveyItemWrapper>
  )
}

export default SurveyItem
