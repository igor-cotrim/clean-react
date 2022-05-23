import { faker } from '@faker-js/faker'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@/presentation/utils/test-utils'
import { ValidationStub } from '@/presentation/test'

import Login from '.'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('#Login', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrapper = sut.getByTestId('error-wrapper')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    validationStub.errorMessage = faker.random.words()

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    validationStub.errorMessage = faker.random.words()

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    validationStub.errorMessage = faker.random.words()

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    expect(submitButton.disabled).toBe(false)
  })
})
