import { faker } from '@faker-js/faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from '@/presentation/utils/test-utils'
import {
  AuthenticationSpy,
  SaveAccessTokenMock,
  ValidationStub
} from '@/presentation/test'
import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    sut,
    validationStub,
    authenticationSpy,
    saveAccessTokenMock
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

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const form = sut.getByTestId('form')

  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  fireEvent.submit(form)

  await waitFor(() => form)
}

const testStatusForField = (
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

const testErrorWrapperChildCount = (sut: RenderResult, count: number): void => {
  const errorWrapper = sut.getByTestId('error-wrapper')

  expect(errorWrapper.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('#Login', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = faker.random.words()
    populateEmailField(sut)
    populatePasswordField(sut)

    testStatusForField(sut, 'email', validationStub)
    testStatusForField(sut, 'password', validationStub)
    testButtonIsDisabled(sut, 'submit', true)
    testErrorWrapperChildCount(sut, 0)
  })

  it('should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = faker.random.words()
    populateEmailField(sut)
    testStatusForField(sut, 'email', validationStub)
  })

  it('should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = faker.random.words()
    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationStub)
  })

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    testStatusForField(sut, 'password')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    testElementExists(sut, 'spinner')
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should call Authentication if form is invalid', async () => {
    const { sut, validationStub, authenticationSpy } = makeSut()

    validationStub.errorMessage = faker.random.words()
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    expect(screen.getByTestId('error-wrapper').children).toHaveLength(1)
  })

  it('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    expect(screen.getByTestId('error-wrapper').children).toHaveLength(1)
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
