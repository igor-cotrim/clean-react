import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

type ApiContextProps = {
  setCurrentAccount?: (account: AccountModel) => void
}

export default createContext<ApiContextProps>(null)
