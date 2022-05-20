import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import FormStatus from '@/presentation/components/FormStatus'
import SubmitButton from '@/presentation/components/SubmitButton'
import Input from '@/presentation/components/Input'

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
