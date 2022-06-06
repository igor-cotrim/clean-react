import { cleanup, render, RenderResult } from '@/presentation/utils/test-utils'
import { Helper } from '@/presentation/test'

import SignUp from '.'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

describe('#SignUp', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrapper', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
