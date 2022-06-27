import * as S from './styles'

type CalendarProps = {
  date: Date
  className?: string
}

const Calendar = ({ date, className }: CalendarProps) => (
  <S.SurveyListTime className={className}>
    <S.SurveyListTimeDay data-testid="day">
      {date.getDate().toString().padStart(2, '0')}
    </S.SurveyListTimeDay>
    <S.SurveyListTimeMonth data-testid="month">
      {date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
    </S.SurveyListTimeMonth>
    <S.SurveyListTimeYear data-testid="year">
      {date.getFullYear()}
    </S.SurveyListTimeYear>
  </S.SurveyListTime>
)

export default Calendar
