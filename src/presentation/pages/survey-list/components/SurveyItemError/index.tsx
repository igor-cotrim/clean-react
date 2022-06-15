import * as S from './styles'

type SurveyItemErrorProps = {
  error: string
  reload: () => void
}

const SurveyItemError = ({ error, reload }: SurveyItemErrorProps) => {
  return (
    <S.SurveyItemErrorWrapper>
      <S.ErrorMessage data-testid="error">{error}</S.ErrorMessage>
      <S.ErrorButton onClick={reload} data-testid="reload">
        Tentar novamente
      </S.ErrorButton>
    </S.SurveyItemErrorWrapper>
  )
}

export default SurveyItemError
