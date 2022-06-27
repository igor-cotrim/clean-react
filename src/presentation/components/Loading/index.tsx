import { Spinner } from '@/presentation/components'

import * as S from './styles'

const Loading = () => (
  <S.LoadingWrapper>
    <S.Loading>
      <S.LoadingText>Aguarde...</S.LoadingText>
      <Spinner colors="#fff" />
    </S.Loading>
  </S.LoadingWrapper>
)

export default Loading
