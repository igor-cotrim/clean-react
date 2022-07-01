/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { LoadSurveyList } from '@/domain/usecases'
import { Error, Footer, Header } from '@/presentation/components'
import {
  SurveyItemList,
  surveyListState
} from '@/presentation/pages/survey-list/components'
import { useErrorHandler } from '@/presentation/hooks'

import * as S from './styles'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const resetSurveyListState = useResetRecoilState(surveyListState)
  const [state, setState] = useRecoilState(surveyListState)

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, error: error.message }))
  })

  const reload = (): void => {
    setState((prev) => ({ surveys: [], error: '', reload: !prev.reload }))
  }

  useEffect(() => resetSurveyListState(), [])

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prev) => ({ ...prev, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper data-testid="survey-list-wrapper">
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        {state.error ? (
          <Error reload={reload} error={state.error} />
        ) : (
          <SurveyItemList surveys={state.surveys} />
        )}
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
