import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Authentication, SaveAccessToken } from '@/domain/usecases'
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
  saveAccessToken: SaveAccessToken
}

const Login = ({ validation, authentication, saveAccessToken }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const history = useHistory()

  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', state.email),
      passwordError: validation?.validate('password', state.password)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email, state.password, validation])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState((prev) => ({ ...prev, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)

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
        <SubmitButton
          disabled={!!state.emailError || !!state.passwordError}
          type="submit"
          data-testid="submit"
        >
          Entrar
        </SubmitButton>
        <S.LinkToSignup>
          <Link data-testid="signup" to="/signup">
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
