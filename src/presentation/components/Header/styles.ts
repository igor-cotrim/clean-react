import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    background: ${theme.colors.primary};
    border-top: 40px solid ${theme.colors.primaryDark};

    ${media.lessThan('medium')`
      border-top-width: 20px;
    `}
  `}
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 800px;
  flex-grow: 1;
  padding: 24px 40px;

  > img {
    width: 60px;
    align-self: center;
  }
`

export const UserInfoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: center;
    justify-content: center;
    color: ${theme.colors.white};
  `}
`

export const UserInfo = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    margin-bottom: 8px;
  `}
`

export const Logout = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `}
`
