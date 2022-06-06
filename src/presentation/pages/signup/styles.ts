import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

export const SignUpForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 400px;
    background: ${theme.colors.white};
    padding: 40px;
    border-radius: 8px;
    align-self: center;
    box-shadow: 0px 1px 3px -1px ${theme.colors.black};

    > button {
      margin-top: 32px;
    }
  `}
`

export const Subtitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primaryDark};
    text-align: center;
    font-size: ${theme.font.sizes.small};
    text-transform: uppercase;
  `}
`

export const LinkToLogin = styled.span`
  ${({ theme }) => css`
    text-align: center;
    margin-top: 16px;

    > a {
      color: ${theme.colors.primary};
      text-transform: lowercase;
      cursor: pointer;
      text-decoration: none;
    }

    &:hover {
      text-decoration: underline;
    }
  `}
`
