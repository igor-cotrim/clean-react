import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import { shimmer } from '@/presentation/styles'

export const SurveyItemEmpty = styled.li`
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
      animation: ${shimmer} 1.2s infinite;
    }

    ${media.lessThan('medium')`
      flex-basis: 100%;
      min-height: 250px;
    `}
  `}
`
