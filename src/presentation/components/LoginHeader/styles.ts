import styled, { css } from 'styled-components'

export const LoginHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 40px solid ${theme.colors.primaryDark};
    background: ${theme.colors.primary};

    > img {
      margin-top: 40px;
    }
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin: 16px 0 40px;
    font-size: ${theme.font.sizes.medium};
  `}
`
