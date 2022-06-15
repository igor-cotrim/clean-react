import { SurveyModel } from '@/domain/models'

import * as S from './styles'

type StateProps = {
  surveys: SurveyModel[]
  error: string
}

type SurveyItemErrorProps = {
  state: StateProps
}

const SurveyItemError = ({ state }: SurveyItemErrorProps) => (
  <S.SurveyItemErrorWrapper>
    <S.ErrorMessage data-testid="error">{state.error}</S.ErrorMessage>
    <S.ErrorButton>Recarregar</S.ErrorButton>
  </S.SurveyItemErrorWrapper>
)

export default SurveyItemError
