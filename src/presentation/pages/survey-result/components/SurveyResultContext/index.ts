import { createContext } from 'react'

type SurveyResultContextProps = {
  onAnswer: (answer: string) => void
}

export default createContext<SurveyResultContextProps>(null)
