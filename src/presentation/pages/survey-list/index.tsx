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
  reload: boolean
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState<StateProps>({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
  })

  const reload = (): void =>
    setState((prev) => ({ surveys: [], error: '', reload: !prev.reload }))

  useEffect(() => {
    if (loadSurveyList) {
      loadSurveyList
        .loadAll()
        .then((surveys) => setState((prev) => ({ ...prev, surveys })))
        .catch((error) => {
          console.log(error)

          setState((prev) => ({ ...prev, error: error.message }))
        })
    }
  }, [loadSurveyList, state.reload])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper data-testid="survey-list-wrapper">
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        {state.error ? (
          <SurveyItemError reload={reload} error={state.error} />
        ) : (
          <SurveyItemList state={state} />
        )}
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
