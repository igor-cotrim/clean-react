import { memo } from 'react'

import { Logo } from '@/presentation/components'

import * as S from './styles'

const LoginHeader = () => (
  <S.Wrapper>
    <Logo />
    <S.Title>Enquetes para programadores</S.Title>
  </S.Wrapper>
)

export default memo(LoginHeader)
