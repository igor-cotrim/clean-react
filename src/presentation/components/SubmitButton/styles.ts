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

    &:disabled {
      background: ${theme.colors.grayLight};
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &:hover {
        filter: none;
      }
    }

    &:hover {
      filter: brightness(0.9);
    }
  `}
`
