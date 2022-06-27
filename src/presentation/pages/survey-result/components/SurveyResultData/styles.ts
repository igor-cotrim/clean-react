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
