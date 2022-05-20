import styled, { css } from 'styled-components'

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
