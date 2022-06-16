import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import * as S from './styles'

const Header = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault()

    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Logo />
        <S.UserInfoContainer>
          <S.UserInfo data-testid="username">
            {getCurrentAccount().name}
          </S.UserInfo>
          <S.Logout data-testid="logout" onClick={logout}>
            Sair
          </S.Logout>
        </S.UserInfoContainer>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}

export default memo(Header)
