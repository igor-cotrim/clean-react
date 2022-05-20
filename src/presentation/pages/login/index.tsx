import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'

import * as S from './styles'

const Login = () => {
  return (
    <S.Wrapper>
      <LoginHeader />
      <S.LoginForm>
        <S.Subtitle>Login</S.Subtitle>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton text="Entrar" />
        <S.LinkToSignup>Criar conta</S.LinkToSignup>
        <FormStatus />
      </S.LoginForm>
      <Footer />
    </S.Wrapper>
  )
}

export default Login
