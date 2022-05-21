import Spinner from '../Spinner'

import * as S from './styles'

type FormStatusProps = {
  isLoading: boolean
  errorMessage: string
}

const FormStatus = ({ isLoading, errorMessage }: FormStatusProps) => (
  <S.ErrorWrapper data-testid="error-wrapper">
    {isLoading && <Spinner />}
    {errorMessage && <S.Error>{errorMessage}</S.Error>}
  </S.ErrorWrapper>
)

export default FormStatus
