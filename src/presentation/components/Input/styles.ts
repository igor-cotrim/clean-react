import styled, { css } from 'styled-components'

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 40px;
    position: relative;
    border-bottom: 2px solid ${theme.colors.grayLight};

    &[data-status='valid'] {
      border-bottom-color: ${theme.colors.green};

      &::after {
        background: ${theme.colors.green};
      }
    }

    &[data-status='invalid'] {
      border-bottom-color: ${theme.colors.red};

      &::after {
        background: ${theme.colors.red};
      }
    }

    &::after {
      content: '';
      width: 100%;
      height: 2px;
      background: ${theme.colors.grayLight};
      position: absolute;
      bottom: -2px;
      left: 0;
      transform-origin: 0%;
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }

    &:focus-within {
      border-color: transparent;

      &::after {
        transform: scaleX(1);
      }

      > label {
        color: ${theme.colors.primaryLight};
        transform: scale(0.7) translateY(-28px);
        transition: transform 0.4s ease;
      }
    }
  `}
`

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  line-height: 24px;
  padding: 0 40px 0 8px;

  &:not(:placeholder-shown) + label {
    transform: scale(0.7) translateY(-28px);
  }
`

export const Label = styled.label`
  ${({ theme }) => css`
    position: absolute;
    left: 8px;
    color: ${theme.colors.gray};
    cursor: text;
    transform-origin: 0%;
    transform: translateY(0);
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
