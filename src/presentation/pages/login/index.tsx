import { useEffect, useState } from 'react'

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
  validation?: Validation
}

const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    if (state.email) {
      validation?.validate('email', state.email)
    }

    if (state.password) {
      validation?.validate('password', state.password)
    }
  }, [state.email, state.password, validation])

  return (
    <S.Wrapper>
      <LoginHeader />
      <S.LoginForm>
        <S.Subtitle>Login</S.Subtitle>
        <Input
          state={state.emailError}
          setState={setState}
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          state={state.passwordError}
          setState={setState}
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <SubmitButton disabled type="submit" data-testid="submit">
          Entrar
        </SubmitButton>
        <S.LinkToSignup>Criar conta</S.LinkToSignup>
        <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
      </S.LoginForm>
      <Footer />
    </S.Wrapper>
  )
}

export default Login
