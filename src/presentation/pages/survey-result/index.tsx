import { useEffect, useState } from 'react'

import { LoadSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
import { useErrorHandler } from '@/presentation/hooks'

import * as S from './styles'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult = ({ loadSurveyResult }: SurveyResultProps) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, surveyResult: null, error: error.message }))
  })

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
