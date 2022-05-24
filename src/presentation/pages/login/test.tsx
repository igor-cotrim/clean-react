import { faker } from '@faker-js/faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@/presentation/utils/test-utils'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

import Login from '.'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

const history = createMemoryHistory()

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')

  fireEvent.input(emailInput, {
    target: { value: email }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')

  fireEvent.input(passwordInput, {
    target: { value: password }
  })
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  const submitButton = sut.getByTestId('submit')

  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  fireEvent.click(submitButton)
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationStub?: ValidationStub
): void => {
  const status = sut.getByTestId(`${fieldName}-status`)
  expect(status.title).toBe(
    validationStub?.errorMessage ? validationStub.errorMessage : 'Tudo certo!'
  )
  expect(status.textContent).toBe(validationStub?.errorMessage ? '🔴' : '🟢')
}

describe('#Login', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  it('should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrapper = sut.getByTestId('error-wrapper')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    validationStub.errorMessage = faker.random.words()
    populateEmailField(sut)
    populatePasswordField(sut)
    simulateStatusForField(sut, 'email', validationStub)
    simulateStatusForField(sut, 'password', validationStub)

    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
  })

  it('should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = faker.random.words()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationStub)
  })

  it('should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = faker.random.words()
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationStub)
  })

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    populateEmailField(sut)
    populatePasswordField(sut)

    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', () => {
    const { sut } = makeSut()
    const spinner = sut.getByTestId('error-wrapper')

    simulateValidSubmit(sut)

    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should call Authentication if form is invalid', () => {
    const { sut, validationStub, authenticationSpy } = makeSut()

    validationStub.errorMessage = faker.random.words()
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
