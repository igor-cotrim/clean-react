import { useState } from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'

import * as S from './styles'

const Login = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <S.Wrapper>
      <LoginHeader />
      <S.LoginForm>
        <S.Subtitle>Login</S.Subtitle>
        <Input
          state={errorState.email}
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          state={errorState.password}
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <SubmitButton disabled type="submit" data-testid="submit">
          Entrar
        </SubmitButton>
        <S.LinkToSignup>Criar conta</S.LinkToSignup>
        <FormStatus
          isLoading={state.isLoading}
          errorMessage={errorState.main}
        />
      </S.LoginForm>
      <Footer />
    </S.Wrapper>
  )
}

export default Login
