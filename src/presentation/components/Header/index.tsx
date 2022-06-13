import { memo } from 'react'

import { Logo } from '@/presentation/components'

import * as S from './styles'

const Header = () => (
  <S.HeaderContainer>
    <S.HeaderContent>
      <Logo />
      <S.UserInfoContainer>
        <S.UserInfo>Igor Cotrim</S.UserInfo>
        <S.Logout>Sair</S.Logout>
      </S.UserInfoContainer>
    </S.HeaderContent>
  </S.HeaderContainer>
)

export default memo(Header)
