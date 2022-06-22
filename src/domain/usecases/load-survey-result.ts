export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = {
    id: string
    question: string
    answers: [
      {
        image?: string
        answer: string
        count: number
        percent: number
      }
    ]
    date: Date
  }
}
