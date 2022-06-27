import styled, { css } from 'styled-components'

export const ErrorWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.colors.white};
    padding: 40px;
    border-radius: ${theme.border.radius};
    box-shadow: 0px 1px 3px -1px ${theme.colors.black};
  `}
`

export const ErrorMessage = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    margin-bottom: 24px;
    text-align: center;
  `}
`

export const ErrorButton = styled.button`
  ${({ theme }) => css`
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.xxsmall};
    line-height: 50px;
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
    padding: 0 16px;
  `}
`
