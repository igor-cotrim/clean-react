import styled, { css } from 'styled-components'

type SurveyListIconContainerProps = {
  handleIconType: string
}

export const SurveyListIconContainer = styled.div<SurveyListIconContainerProps>`
  ${({ theme, handleIconType }) => css`
    display: flex;
    background: ${handleIconType === 'thumbUp'
      ? theme.colors.green
      : theme.colors.red};
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 1px 3px -1px ${theme.colors.black};
  `}
`
