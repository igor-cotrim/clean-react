import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
