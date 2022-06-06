import { SignUp } from '@/presentation/pages'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
