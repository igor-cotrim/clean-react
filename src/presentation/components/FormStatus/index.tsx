import Spinner from '../Spinner'

import * as S from './styles'

type FormStatusProps = {
  isLoading: boolean
  mainError: string
}

const FormStatus = ({ isLoading, mainError }: FormStatusProps) => (
  <S.ErrorWrapper data-testid="error-wrapper">
    {isLoading && <Spinner />}
    {mainError && <S.Error>{mainError}</S.Error>}
  </S.ErrorWrapper>
)

export default FormStatus
