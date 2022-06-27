import { LoadSurveyList } from '@/domain/usecases'
import {
  SurveyItem,
  SurveyItemEmpty
} from '@/presentation/pages/survey-list/components'

import * as S from './styles'

type SurveyItemListProps = {
  surveys: LoadSurveyList.Model[]
}

const SurveyItemList = ({ surveys }: SurveyItemListProps) => (
  <S.SurveyItemList data-testid="survey-list">
    {surveys.length ? (
      surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
    ) : (
      <SurveyItemEmpty />
    )}
  </S.SurveyItemList>
)

export default SurveyItemList
