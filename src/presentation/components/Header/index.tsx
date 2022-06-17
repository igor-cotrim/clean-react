import React, { memo, useContext } from 'react'

import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'

import * as S from './styles'

const Header = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault()

    logout()
  }

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Logo />
        <S.UserInfoContainer>
          <S.UserInfo data-testid="username">
            {getCurrentAccount().name}
          </S.UserInfo>
          <S.Logout data-testid="logout" onClick={handleLogout}>
            Sair
          </S.Logout>
        </S.UserInfoContainer>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}

export default memo(Header)
