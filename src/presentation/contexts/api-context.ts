import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

type ApiContextProps = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export default createContext<ApiContextProps>(null)
