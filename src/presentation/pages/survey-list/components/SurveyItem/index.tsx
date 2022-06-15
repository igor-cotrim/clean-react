import { SurveyModel } from '@/domain/models'
import { Icon, IconName } from '@/presentation/components'

import * as S from './styles'

type SurveyItemProps = {
  survey: SurveyModel
}

const SurveyItem = ({ survey }: SurveyItemProps) => {
  return (
    <S.SurveyItemWrapper>
      <S.SurveyListContent>
        <Icon className="icon-wrapper" iconName={IconName.thumbUp} />
        <S.SurveyListTime>
          <S.SurveyListTimeDay data-testid="day">
            {survey.date.getDate()}
          </S.SurveyListTimeDay>
          <S.SurveyListTimeMonth data-testid="month">
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .replace('.', '')}
          </S.SurveyListTimeMonth>
          <S.SurveyListTimeYear data-testid="year">
            {survey.date.getFullYear()}
          </S.SurveyListTimeYear>
        </S.SurveyListTime>
        <S.SurveyListText data-testid="question">
          {survey.question}
        </S.SurveyListText>
      </S.SurveyListContent>
      <S.SurveyListFooter>Ver Resultado</S.SurveyListFooter>
    </S.SurveyItemWrapper>
  )
}

export default SurveyItem
