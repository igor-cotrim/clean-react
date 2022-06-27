import { useHistory } from 'react-router-dom'

import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'
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
          <SurveyResultAnswer key={answer.answer} answer={answer} />
        ))}
      </S.SurveyResultList>
      <S.SurveyResultButton data-testid="back-button" onClick={goBack}>
        Voltar
      </S.SurveyResultButton>
    </>
  )
}

export default SurveyResultData
