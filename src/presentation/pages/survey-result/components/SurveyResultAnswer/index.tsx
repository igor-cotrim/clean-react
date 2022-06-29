import { SurveyResultAnswerModel } from '@/domain/models'

import * as S from './styles'

type SurveyResultAnswerProps = {
  answer: SurveyResultAnswerModel
}

const SurveyResultAnswer = ({ answer }: SurveyResultAnswerProps) => (
  <S.SurveyResultLi
    data-testid="answer-wrapper"
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
)

export default SurveyResultAnswer