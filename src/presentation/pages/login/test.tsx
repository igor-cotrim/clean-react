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
import { Helper } from '@/presentation/test'
import {
  AuthenticationSpy,
  UpdateCurrentAccountMock,
  ValidationStub
} from '@/presentation/test'
import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    updateCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const form = sut.getByTestId('form')

  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)

  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('#Login', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')

    Helper.testChildCount(sut, 'error-wrapper', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
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
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

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
    const { sut, authenticationSpy, updateCurrentAccountMock } = makeSut()

    await simulateValidSubmit(sut)

    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    expect(screen.getByTestId('error-wrapper').children).toHaveLength(1)
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup-link')

    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
