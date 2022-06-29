import { useContext } from 'react'

import { SurveyResultAnswerModel } from '@/domain/models'
import { SurveyResultContext } from '@/presentation/pages/survey-result/components'

import * as S from './styles'

type SurveyResultAnswerProps = {
  answer: SurveyResultAnswerModel
}

const SurveyResultAnswer = ({ answer }: SurveyResultAnswerProps) => {
  const { onAnswer } = useContext(SurveyResultContext)

  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains('active')) return

    onAnswer(answer.answer)
  }

  return (
    <S.SurveyResultLi
      data-testid="answer-wrapper"
      className={answer.isCurrentAccountAnswer ? 'active' : ''}
      onClick={answerClick}
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
}

export default SurveyResultAnswer
