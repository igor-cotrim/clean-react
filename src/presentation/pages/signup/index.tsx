import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'

import * as S from './styles'

type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp = ({ validation, addAccount }: SignUpProps) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation?.validate('name', state.name),
      emailError: validation?.validate('email', state.email),
      passwordError: validation?.validate('password', state.password),
      passwordConfirmationError: validation?.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.name,
    state.email,
    state.password,
    state.passwordConfirmation,
    validation
  ])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (state.isLoading) {
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))

    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <S.Wrapper>
      <LoginHeader />
      <S.SignUpForm data-testid="form" onSubmit={handleSubmit}>
        <S.Subtitle>Criar Conta</S.Subtitle>
        <Input
          state={state}
          setState={setState}
          error={state.nameError}
          type="text"
          name="name"
          placeholder="Digite seu nome"
        />
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
        <Input
          state={state}
          setState={setState}
          error={state.passwordConfirmationError}
          type="password"
          name="passwordConfirmation"
          placeholder="Repita sua senha"
        />
        <SubmitButton
          disabled={
            !!state.nameError ||
            !!state.emailError ||
            !!state.passwordError ||
            !!state.passwordConfirmationError
          }
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
