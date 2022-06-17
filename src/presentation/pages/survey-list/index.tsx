import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { Footer, Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import { SurveyItemError, SurveyItemList } from './components'

import * as S from './styles'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

type StateProps = {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState<StateProps>({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const reload = (): void =>
    setState((prev) => ({ surveys: [], error: '', reload: !prev.reload }))

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prev) => ({ ...prev, surveys })))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState((prev) => ({ ...prev, error: error.message }))
        }
      })
  }, [loadSurveyList, state.reload, history, setCurrentAccount])

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyListWrapper data-testid="survey-list-wrapper">
        <S.SurveyListTitle>Enquetes</S.SurveyListTitle>
        {state.error ? (
          <SurveyItemError reload={reload} error={state.error} />
        ) : (
          <SurveyItemList state={state} />
        )}
      </S.SurveyListWrapper>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyList
