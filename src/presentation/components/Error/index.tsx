import * as S from './styles'

type ErrorProps = {
  error: string
  reload: () => void
}

const Error = ({ error, reload }: ErrorProps) => {
  return (
    <S.ErrorWrapper>
      <S.ErrorMessage data-testid="error">{error}</S.ErrorMessage>
      <S.ErrorButton onClick={reload} data-testid="reload">
        Tentar novamente
      </S.ErrorButton>
    </S.ErrorWrapper>
  )
}

export default Error
