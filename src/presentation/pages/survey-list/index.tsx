import { useEffect, useState } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { Footer, Header } from '@/presentation/components'

import { SurveyItemError, SurveyItemList } from './components'

import * as S from './styles'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

type StateProps = {
  surveys: SurveyModel[]
  error: string
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState<StateProps>({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prev) => ({ ...prev, surveys })))
      .catch((error) => setState((prev) => ({ ...prev, error: error.message })))
  }, [loadSurveyList])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper data-testid="survey-list-wrapper">
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        {state.error ? (
          <SurveyItemError state={state} />
        ) : (
          <SurveyItemList state={state} />
        )}
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
