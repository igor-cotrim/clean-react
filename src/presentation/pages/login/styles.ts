import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

export const LoginForm = styled.form`
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

export const InputWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  position: relative;
`

export const Input = styled.input`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.primaryLight};
    line-height: 40px;
    border-radius: 4px;
    flex-grow: 1;
    padding: 0 40px 0 8px;

    &:focus {
      outline-color: ${theme.colors.primaryLight};
    }
  `}
`

export const InputStatus = styled.span`
  ${({ theme }) => css`
    position: absolute;
    right: 8px;
    font-size: ${theme.font.sizes.xxxsmall};
    cursor: help;
  `}
`

export const LinkToSignup = styled.span`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.primary};
    text-transform: lowercase;
    margin-top: 16px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `}
`

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin-top: 30px;
  }
`

export const Error = styled.span`
  ${({ theme }) => css`
    margin-top: 30px;
    color: ${theme.colors.primaryLight};
  `}
`
