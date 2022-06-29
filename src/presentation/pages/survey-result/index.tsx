import { useEffect, useState } from 'react'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import {
  SurveyResultContext,
  SurveyResultData
} from '@/presentation/pages/survey-result/components'
import { useErrorHandler } from '@/presentation/hooks'

import * as S from './styles'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult = ({
  loadSurveyResult,
  saveSurveyResult
}: SurveyResultProps) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, surveyResult: null, error: error.message }))
  })

  const onAnswer = (answer: string): void => {
    setState((prev) => ({ ...prev, isLoading: true }))

    saveSurveyResult.save({ answer }).then().catch()
  }

  const reload = (): void => {
    setState((prev) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !prev.reload
    }))
  }

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((prev) => ({ ...prev, surveyResult })))
      .catch(handleError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reload])

  return (
    <S.Wrapper>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <S.SurveyResultContent data-testid="survey-result">
          {state.surveyResult && (
            <SurveyResultData surveyResult={state.surveyResult} />
          )}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </S.SurveyResultContent>
      </SurveyResultContext.Provider>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyResult
