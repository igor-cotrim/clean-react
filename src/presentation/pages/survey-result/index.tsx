import { useEffect, useState } from 'react'

import { LoadSurveyResult } from '@/domain/usecases'
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentation/components'

import * as S from './styles'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult = ({ loadSurveyResult }: SurveyResultProps) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((prev) => ({ ...prev, surveyResult })))
      .catch()
  }, [loadSurveyResult])

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
            <S.SurveyResultButton>Voltar</S.SurveyResultButton>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => ({})} />}
      </S.SurveyResultContent>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyResult
