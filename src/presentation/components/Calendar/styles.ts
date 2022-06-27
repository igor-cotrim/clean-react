import styled, { css } from 'styled-components'

export const SurveyListTime = styled.time`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
    width: 60px;
    height: 100px;
  `}
`

export const SurveyListTimeDay = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
    font-weight: ${theme.font.weight.bold};
  `}
`

export const SurveyListTimeMonth = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxxsmall};
    text-transform: lowercase;
    margin: 0 0 5px;
  `}
`

export const SurveyListTimeYear = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
  `}
`
