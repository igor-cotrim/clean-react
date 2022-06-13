import styled, { css } from 'styled-components'

type SurveyListIconContainerProps = {
  readedPolls: boolean
}

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    background: ${theme.colors.grayLight};
  `}
`

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    background: ${theme.colors.primary};
    border-top: 40px solid ${theme.colors.primaryDark};
  `}
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 800px;
  flex-grow: 1;
  padding: 24px 40px;

  > img {
    width: 60px;
    align-self: center;
  }
`

export const UserInfoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: center;
    justify-content: center;
    color: ${theme.colors.white};
  `}
`

export const UserInfo = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    margin-bottom: 8px;
  `}
`

export const Logout = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
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
  `}
`

export const SurveyListIconContainer = styled.div<SurveyListIconContainerProps>`
  ${({ theme, readedPolls }) => css`
    position: absolute;
    display: flex;
    top: -10px;
    right: -10px;
    background: ${readedPolls ? theme.colors.green : theme.colors.red};
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 1px 3px -1px ${theme.colors.black};
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
    font-size: ${theme.font.sizes.xsmall};
    margin: 24px;
    align-self: center;
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
