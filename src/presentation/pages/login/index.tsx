/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Link, useHistory } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'
import {
  currentAccountState,
  Footer,
  LoginHeader
} from '@/presentation/components'

import { FormStatus, Input, loginState, SubmitButton } from './components'

import * as S from './styles'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login = ({ validation, authentication }: LoginProps) => {
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(loginState)
  const history = useHistory()

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }

    setState((prev) => ({
      ...prev,
      [`${field}Error`]: validation.validate(field, formData)
    }))

    setState((prev) => ({
      ...prev,
      isFormInvalid: !!prev.emailError || !!prev.passwordError
    }))
  }

  useEffect(() => resetLoginState(), [])

  useEffect(() => validate('email'), [state.email])

  useEffect(() => validate('password'), [state.password])

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

      setCurrentAccount(account)

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
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton disabled={state.isFormInvalid} type="submit">
          Entrar
        </SubmitButton>
        <S.LinkToSignup>
          <Link data-testid="signup-link" to="/signup">
            Criar conta
          </Link>
        </S.LinkToSignup>
        <FormStatus />
      </S.LoginForm>
      <Footer />
    </S.Wrapper>
  )
}

export default Login
