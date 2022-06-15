import styled, { css } from 'styled-components'

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
