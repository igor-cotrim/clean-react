import styled, { css } from 'styled-components'

import { shimmer } from '@/presentation/styles'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    background: ${theme.colors.mainBg};
  `}
`

export const SurveyResultContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-self: center;
    max-width: 800px;
    width: 100%;
    flex-grow: 1;
    padding: 40px;

    &:empty {
      position: relative;
      overflow-x: hidden;
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
      background-position: 40px 40px, 136px 50px, 136px 80px, 136px 110px,
        40px 172px, 40px 270px, 40px 372px;
      background-size: 80px 100px, calc(70% - 176px) 20px,
        calc(100% - 176px) 20px, calc(80% - 176px) 20px, calc(100% - 80px) 82px,
        calc(100% - 80px) 82px, calc(100% - 80px) 82px;

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
        animation: ${shimmer} 1.2s infinite;
      }
    }

    ${media.lessThan('medium')`
      &:empty {
        position: relative;
        overflow-x: hidden;
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
        background-position: 40px 40px, 116px 50px, 116px 80px, 116px 110px,
          40px 172px, 40px 260px, 40px 352px;
        background-size: 60px 100px, calc(70% - 176px) 20px,
          calc(100% - 176px) 20px, calc(80% - 176px) 20px, calc(100% - 80px) 72px,
          calc(100% - 80px) 72px, calc(100% - 80px) 72px;
      }
    `}
  `}
`

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
      border: 2px solid ${theme.colors.primaryLight};
    }
  `}
`

export const SurveyResultImg = styled.img`
  width: 50px;
  height: 50px;

  ${media.lessThan('medium')`
    width: 40px;
    height: 40px;
  `}
`

export const SurveyResultAnswer = styled.span`
  ${({ theme }) => css`
    flex-grow: 1;
    margin: 0 16px;
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
