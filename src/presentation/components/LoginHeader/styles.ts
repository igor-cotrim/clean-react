import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 40px solid ${theme.colors.primaryDark};
    background: ${theme.colors.primary};

    > img {
      margin-top: 40px;
    }

    ${media.lessThan('medium')`
      border-top-width: 20px;
    `}
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin: 16px 0 40px;
    font-size: ${theme.font.sizes.medium};
  `}
`
