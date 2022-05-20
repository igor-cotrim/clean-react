import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Spinner from '@/presentation/components/Spinner'
import SubmitButton from '@/presentation/components/SubmitButton'

import * as S from './styles'

const Login = () => {
  return (
    <S.Wrapper>
      <LoginHeader />

      <S.LoginForm>
        <S.Subtitle>Login</S.Subtitle>

        <S.InputWrapper>
          <S.Input type="email" name="email" placeholder="Digite seu e-mail" />
          <S.InputStatus>🔴</S.InputStatus>
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <S.InputStatus>🔴</S.InputStatus>
        </S.InputWrapper>

        <SubmitButton text="Entrar" />

        <S.LinkToSignup>Criar conta</S.LinkToSignup>

        <S.ErrorWrapper>
          <Spinner />
          <S.Error>Erro</S.Error>
        </S.ErrorWrapper>
      </S.LoginForm>

      <Footer />
    </S.Wrapper>
  )
}

export default Login
