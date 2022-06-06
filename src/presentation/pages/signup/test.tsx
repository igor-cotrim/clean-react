import { cleanup, render, RenderResult } from '@/presentation/utils/test-utils'

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

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName)

  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('#SignUp', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()

    testChildCount(sut, 'error-wrapper', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
