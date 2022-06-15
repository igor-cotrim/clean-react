import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases'

import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
