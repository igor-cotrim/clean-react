import styled from 'styled-components'
import media from 'styled-media-query'

export const SurveyItemList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  ${media.lessThan('medium')`
    flex-direction: column;
  `}
`
