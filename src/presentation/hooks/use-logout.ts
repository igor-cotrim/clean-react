import { useRecoilValue } from 'recoil'
import { useHistory } from 'react-router-dom'

import { currentAccountState } from '@/presentation/components'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
