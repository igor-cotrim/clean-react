import styled, { css } from 'styled-components'

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: wait;
`

export const Loading = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    width: 300px;
    height: 150px;
    border-radius: ${theme.border.radius};
  `}
`

export const LoadingText = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.xxsmall};
    margin-bottom: 8px;
    text-transform: lowercase;
  `}
`
