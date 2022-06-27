import { useEffect, useState } from 'react'

import { LoadSurveyResult } from '@/domain/usecases'
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'

import * as S from './styles'
import { useHistory } from 'react-router-dom'

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
  const { goBack } = useHistory()

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
          <>
            <S.SurveyTitleContainer>
              <Calendar date={state.surveyResult.date} className="calendar" />
              <S.SurveyResultTitle data-testid="question">
                {state.surveyResult.question}
              </S.SurveyResultTitle>
            </S.SurveyTitleContainer>
            <S.SurveyResultList data-testid="answers">
              {state.surveyResult.answers.map((answer) => (
                <S.SurveyResultLi
                  data-testid="answer-wrapper"
                  key={answer.answer}
                  className={answer.isCurrentAccountAnswer ? 'active' : ''}
                >
                  {answer.image && (
                    <S.SurveyResultImg
                      data-testid="image"
                      className="active"
                      src={answer.image}
                      alt={answer.answer}
                    />
                  )}
                  <S.SurveyResultAnswer data-testid="answer">
                    {answer.answer}
                  </S.SurveyResultAnswer>
                  <S.SurveyResultPercent data-testid="percent">
                    {answer.percent}%
                  </S.SurveyResultPercent>
                </S.SurveyResultLi>
              ))}
            </S.SurveyResultList>
            <S.SurveyResultButton data-testid="back-button" onClick={goBack}>
              Voltar
            </S.SurveyResultButton>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </S.SurveyResultContent>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyResult
