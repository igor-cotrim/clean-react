import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    height: 48px;
  `}
`
