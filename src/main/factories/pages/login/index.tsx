import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/validation'
import { Login } from '@/presentation/pages'

export const makeLogin = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
