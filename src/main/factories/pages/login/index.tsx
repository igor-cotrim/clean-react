import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'

import { makeLoginValidation } from './login-validation-factory'

export const makeLogin = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
