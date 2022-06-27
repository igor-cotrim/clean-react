import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const SurveyResultLi = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${theme.colors.white};
    color: ${theme.colors.primaryDark};
    padding: 16px;
    border-radius: ${theme.border.radius};
    margin-top: 16px;

    &.active {
      box-shadow: 0 0 3px 2px ${theme.colors.primaryLight};
    }
  `}
`

export const SurveyResultImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 16px;

  ${media.lessThan('medium')`
    width: 40px;
    height: 40px;
  `}
`

export const SurveyResultAnswer = styled.span`
  ${({ theme }) => css`
    flex-grow: 1;
    margin-right: 16px;
    font-size: ${theme.font.sizes.small};

    ${media.lessThan('medium')`
      font-size: ${theme.font.sizes.xxsmall};
    `}
  `}
`

export const SurveyResultPercent = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};

    ${media.lessThan('medium')`
      font-size: ${theme.font.sizes.small};
    `}
  `}
`
