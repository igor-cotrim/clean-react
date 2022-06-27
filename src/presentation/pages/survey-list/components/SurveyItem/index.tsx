import { LoadSurveyList } from '@/domain/usecases'
import { Calendar, Icon, IconName } from '@/presentation/components'

import * as S from './styles'

type SurveyItemProps = {
  survey: LoadSurveyList.Model
}

const SurveyItem = ({ survey }: SurveyItemProps) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDowm

  return (
    <S.SurveyItemWrapper>
      <S.SurveyListContent>
        <Icon className="icon-wrapper" iconName={iconName} />
        <Calendar date={survey.date} className="calendar" />
        <S.SurveyListText data-testid="question">
          {survey.question}
        </S.SurveyListText>
      </S.SurveyListContent>
      <S.SurveyListFooter>Ver Resultado</S.SurveyListFooter>
    </S.SurveyItemWrapper>
  )
}

export default SurveyItem
