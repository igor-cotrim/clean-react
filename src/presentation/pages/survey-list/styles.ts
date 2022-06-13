import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    background: ${theme.colors.grayLight};
  `}
`

export const SurveyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 800px;
  flex-grow: 1;
  padding: 40px;
`

export const SurveyListTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primaryDark};
    font-size: ${theme.font.sizes.xsmall};
    text-transform: uppercase;
    margin-bottom: 24px;
  `}
`

export const SurveyListList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin: 0;

  ${media.lessThan('medium')`
    flex-direction: column;
  `}
`

export const SurveyListListItem = styled.li`
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

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }

    &:empty {
      position: relative;
      overflow: hidden;
      background-repeat: no-repeat;
      background-image: linear-gradient(
          to right,
          ${theme.colors.grayLight},
          ${theme.colors.grayLight}
        ),
        linear-gradient(
          to right,
          ${theme.colors.grayLight},
          ${theme.colors.grayLight}
        ),
        linear-gradient(
          to right,
          ${theme.colors.grayLight},
          ${theme.colors.grayLight}
        ),
        linear-gradient(
          to right,
          ${theme.colors.grayLight},
          ${theme.colors.grayLight}
        ),
        linear-gradient(
          to right,
          ${theme.colors.grayLight},
          ${theme.colors.grayLight}
        );
      background-position: 24px 55px, left 0 bottom 0, 108px 77px, 108px 97px,
        108px 117px;
      background-size: 60px 100px, 100% 40px, 140px 16px, 120px 16px, 160px 16px;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          to right,
          transparent,
          rgba(255, 255, 255, 0.5),
          transparent
        );
        animation: shimmer 1.2s infinite;
      }
    }

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
