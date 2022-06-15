import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const makeRemoteLoadSurveyList = (): LoadSurveyList =>
  new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
