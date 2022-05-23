import { faker } from '@faker-js/faker'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@/presentation/utils/test-utils'
import { ValidationSpy } from '@/presentation/test'

import Login from '.'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  validationSpy.errorMessage = faker.random.words()

  return {
    sut,
    validationSpy
  }
}

describe('#Login', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut, validationSpy } = makeSut()

    const errorWrapper = sut.getByTestId('error-wrapper')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrapper.childElementCount).toBe(0)

    expect(submitButton.disabled).toBe(true)

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  it('should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  it('should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
