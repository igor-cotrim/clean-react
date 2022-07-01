/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  onSurveyAnswerState,
  SurveyResultData,
  surveyResultState
} from '@/presentation/pages/survey-result/components'

import * as S from './styles'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult = ({
  loadSurveyResult,
  saveSurveyResult
}: SurveyResultProps) => {
  const resetSurveyResultState = useResetRecoilState(surveyResultState)
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({
      ...prev,
      surveyResult: null,
      isLoading: false,
      error: error.message
    }))
  })

  const onAnswer = (answer: string): void => {
    if (!state.isLoading) {
      setState((prev) => ({ ...prev, isLoading: true }))

      saveSurveyResult
        .save({ answer })
        .then((surveyResult) =>
          setState((prev) => ({ ...prev, isLoading: false, surveyResult }))
        )
        .catch(handleError)
    }
  }

  const reload = (): void =>
    setState((prev) => ({ ...prev, error: '', reload: !prev.reload }))

  useEffect(() => {
    resetSurveyResultState()
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((prev) => ({ ...prev, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyResultContent data-testid="survey-result">
        {state.surveyResult && (
          <SurveyResultData surveyResult={state.surveyResult} />
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </S.SurveyResultContent>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyResult
