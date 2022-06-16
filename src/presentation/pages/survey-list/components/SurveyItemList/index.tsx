import { LoadSurveyList } from '@/domain/usecases'
import {
  SurveyItem,
  SurveyItemEmpty
} from '@/presentation/pages/survey-list/components'

import * as S from './styles'

type StateProps = {
  surveys: LoadSurveyList.Model[]
  error: string
}

type SurveyItemListProps = {
  state: StateProps
}

const SurveyItemList = ({ state }: SurveyItemListProps) => (
  <S.SurveyItemList data-testid="survey-list">
    {state.surveys.length ? (
      state.surveys.map((survey) => (
        <SurveyItem key={survey.id} survey={survey} />
      ))
    ) : (
      <SurveyItemEmpty />
    )}
  </S.SurveyItemList>
)

export default SurveyItemList
