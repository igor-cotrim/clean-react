export type RemoteSurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}

export type RemoteSurveyResultModel = {
  question: string
  answers: RemoteSurveyResultAnswerModel[]
  date: string
}
