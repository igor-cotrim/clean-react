import { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { useLogout } from '@/presentation/hooks'
import { Logo, currentAccountState } from '@/presentation/components'

import * as S from './styles'

const Header = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
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
