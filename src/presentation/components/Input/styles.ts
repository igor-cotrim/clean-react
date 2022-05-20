import styled, { css } from 'styled-components'

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
