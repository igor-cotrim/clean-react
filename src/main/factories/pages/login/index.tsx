import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

import { Login } from '@/presentation/pages'

export const makeLogin = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
