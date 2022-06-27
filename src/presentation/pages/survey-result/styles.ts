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

export const SurveyResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 800px;
  width: 100%;
  flex-grow: 1;
  padding: 40px;
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
`

export const SurveyResultTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primaryDark};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.weight.bold};
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
`

export const SurveyResultAnswer = styled.span`
  ${({ theme }) => css`
    flex-grow: 1;
    margin: 0 16px;
    font-size: ${theme.font.sizes.small};
  `}
`

export const SurveyResultPercent = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
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
