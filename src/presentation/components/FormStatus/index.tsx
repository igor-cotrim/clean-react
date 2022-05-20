import Spinner from '../Spinner'

import * as S from './styles'

const FormStatus = () => (
  <S.ErrorWrapper>
    <Spinner />
    <S.Error>Erro</S.Error>
  </S.ErrorWrapper>
)

export default FormStatus
