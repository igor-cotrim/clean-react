import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const SurveyTitleContainer = styled.hgroup`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;

  .calendar {
    width: 80px;
    margin-right: 16px;
  }

  ${media.lessThan('medium')`
    .calendar {
      width: 60px;
    }
  `}
`

export const SurveyResultTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primaryDark};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.weight.bold};

    ${media.lessThan('medium')`
      font-size: ${theme.font.sizes.xxsmall};
    `}
  `}
`

export const SurveyResultList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`

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

export const SurveyResultButton = styled.button`
  ${({ theme }) => css`
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.xxsmall};
    line-height: 50px;
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
    padding: 0 16px;
    margin-top: 24px;
    transition: filter ${theme.transition.fast};

    &:hover {
      filter: brightness(0.9);
    }
  `}
`
