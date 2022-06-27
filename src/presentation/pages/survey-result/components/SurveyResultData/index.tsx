import { useHistory } from 'react-router-dom'

import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'

import * as S from './styles'

type SurveyResultDataProps = {
  surveyResult: LoadSurveyResult.Model
}

const SurveyResultData = ({ surveyResult }: SurveyResultDataProps) => {
  const { goBack } = useHistory()

  return (
    <>
      <S.SurveyTitleContainer>
        <Calendar date={surveyResult.date} className="calendar" />
        <S.SurveyResultTitle data-testid="question">
          {surveyResult.question}
        </S.SurveyResultTitle>
      </S.SurveyTitleContainer>
      <S.SurveyResultList data-testid="answers">
        {surveyResult.answers.map((answer) => (
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
  )
}

export default SurveyResultData
