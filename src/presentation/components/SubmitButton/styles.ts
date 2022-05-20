import styled, { css } from 'styled-components'

export const SubmitButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-radius: 8px;
    font-size: ${theme.font.sizes.xxsmall};
    border: none;
    line-height: 60px;
    cursor: pointer;

    &:hover {
      filter: brightness(0.9);
    }
  `}
`
