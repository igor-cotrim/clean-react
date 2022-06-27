import { useParams } from 'react-router-dom'

import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'

type useParamsProps = {
  id: string
}

export const makeSurveyResult = () => {
  const { id } = useParams<useParamsProps>()

  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
}
