import { useEffect, useState } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Error, Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'

import { SurveyItemList } from './components'

import * as S from './styles'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

type StateProps = {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState<StateProps>({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, error: error.message }))
  })

  const reload = (): void => {
    setState((prev) => ({ surveys: [], error: '', reload: !prev.reload }))
  }

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prev) => ({ ...prev, surveys })))
      .catch(handleError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reload])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper data-testid="survey-list-wrapper">
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        {state.error ? (
          <Error reload={reload} error={state.error} />
        ) : (
          <SurveyItemList state={state} />
        )}
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
