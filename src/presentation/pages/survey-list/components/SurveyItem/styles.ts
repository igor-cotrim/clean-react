import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const SurveyItemWrapper = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 48%;
    height: 250px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px -1px ${theme.colors.black};
    border-radius: ${theme.border.radius};
    background: ${theme.colors.white};

    ${media.lessThan('medium')`
      flex-basis: 100%;
      min-height: 250px;
    `}
  `}
`

export const SurveyListContent = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #bc477b;
    flex-grow: 1;
    border-radius: ${theme.border.radius} ${theme.border.radius} 0 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        to right,
        rgba(188, 71, 123, 0.1),
        rgba(188, 71, 123, 0.1)
      ),
      linear-gradient(to right, #fff, #fff);
    background-position: 0 0, 54 0;
    background-size: 54px 100%, 100% 100%;

    .icon-wrapper {
      position: absolute;
      top: -10px;
      right: -10px;
    }
  `}
`

export const SurveyListFooter = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    line-height: 40px;
    text-transform: lowercase;
    text-align: center;
    cursor: pointer;
    border-radius: 0 0 ${theme.border.radius} ${theme.border.radius};
    transition: background ${theme.transition.default};

    &:hover {
      background: ${theme.colors.primaryDark};
    }
  `}
`

export const SurveyListTime = styled.time`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-self: center;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
    margin-left: 24px;
    width: 60px;
    height: 100px;
  `}
`

export const SurveyListText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    margin: 24px;
    align-self: center;
    flex-grow: 1;
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
