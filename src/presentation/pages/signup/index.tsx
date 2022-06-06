import { useState } from 'react'
// import { Link } from 'react-router-dom'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'

import * as S from './styles'

const SignUp = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <S.Wrapper>
      <LoginHeader />
      <S.SignUpForm>
        <S.Subtitle>Criar Conta</S.Subtitle>
        <Input
          state={{}}
          setState={{}}
          error={state.nameError}
          type="text"
          name="name"
          placeholder="Digite seu nome"
        />
        <Input
          state={{}}
          setState={{}}
          error={state.emailError}
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          state={{}}
          setState={{}}
          error={state.passwordError}
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <Input
          state={{}}
          setState={{}}
          error={state.passwordConfirmationError}
          type="password"
          name="passwordConfirmation"
          placeholder="Repita sua senha"
        />
        <SubmitButton
          // disabled={!!state.emailError || !!state.passwordError}
          disabled
          type="submit"
          data-testid="submit"
        >
          Entrar
        </SubmitButton>
        <S.LinkToLogin>
          {/* <Link to="/login">Voltar Para Login</Link> */}
          <span>Voltar Para Login</span>
        </S.LinkToLogin>
        <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
      </S.SignUpForm>
      <Footer />
    </S.Wrapper>
  )
}

export default SignUp
