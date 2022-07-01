import { ValidationComposite } from '@/main/composites'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'

import { makeLoginValidation } from './login-validation-factory'

describe('#LoginValidationFactory', () => {
  it('should make compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
      ])
    )
  })
})
