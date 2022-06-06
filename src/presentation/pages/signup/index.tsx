import { Link } from 'react-router-dom'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'

import * as S from './styles'

const SignUp = () => {
  return (
    <S.Wrapper>
      <LoginHeader />
      <S.SignUpForm>
        <S.Subtitle>Criar Conta</S.Subtitle>
        <Input
          state={{}}
          setState={{}}
          error={''}
          type="text"
          name="name"
          placeholder="Digite seu nome"
        />
        <Input
          state={{}}
          setState={{}}
          error={''}
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          state={{}}
          setState={{}}
          error={''}
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <Input
          state={{}}
          setState={{}}
          error={''}
          type="password"
          name="passwordConfirmation"
          placeholder="Repita sua senha"
        />
        <SubmitButton
          // disabled={!!state.emailError || !!state.passwordError}
          type="submit"
          data-testid="submit"
        >
          Entrar
        </SubmitButton>
        <S.LinkToLogin>
          <Link to="/login">Voltar Para Login</Link>
        </S.LinkToLogin>
        <FormStatus isLoading={false} mainError={''} />
      </S.SignUpForm>
      <Footer />
    </S.Wrapper>
  )
}

export default SignUp
