import { memo } from 'react'

import Logo from '../Logo'

import * as S from './styles'

const LoginHeader = () => (
  <S.LoginHeader>
    <Logo />
    <S.Title>Enquetes para programadores</S.Title>
  </S.LoginHeader>
)

export default memo(LoginHeader)
