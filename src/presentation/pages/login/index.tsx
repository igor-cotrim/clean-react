import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Authentication, UpdateCurrentAccount } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'

import * as S from './styles'

type LoginProps = {
  validation: Validation
  authentication: Authentication
  updateCurrentAccount: UpdateCurrentAccount
}

const Login = ({
  validation,
  authentication,
  updateCurrentAccount
}: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const history = useHistory()

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation?.validate('email', formData)
    const passwordError = validation?.validate('password', formData)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email, state.password, state.isFormInvalid, validation])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState((prev) => ({ ...prev, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await updateCurrentAccount.save(account)

      history.replace('/')
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <S.Wrapper>
      <LoginHeader />
      <S.LoginForm data-testid="form" onSubmit={handleSubmit}>
        <S.Subtitle>Login</S.Subtitle>
        <Input
          state={state}
          setState={setState}
          error={state.emailError}
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          state={state}
          setState={setState}
          error={state.passwordError}
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <SubmitButton disabled={state.isFormInvalid} type="submit">
          Entrar
        </SubmitButton>
        <S.LinkToSignup>
          <Link data-testid="signup-link" to="/signup">
            Criar conta
          </Link>
        </S.LinkToSignup>
        <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
      </S.LoginForm>
      <Footer />
    </S.Wrapper>
  )
}

export default Login
