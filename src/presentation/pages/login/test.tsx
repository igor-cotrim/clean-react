import { faker } from '@faker-js/faker'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@/presentation/utils/test-utils'
import { ValidationStub } from '@/presentation/test'

import Login from '.'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )

  return {
    sut,
    validationStub,
    authenticationSpy
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

  it('should show spinner on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit')
    const spinner = sut.getByTestId('error-wrapper')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    fireEvent.click(submitButton)

    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    const submitButton = sut.getByTestId('submit')

    fireEvent.input(emailInput, {
      target: { value: email }
    })
    fireEvent.input(passwordInput, {
      target: { value: password }
    })
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
