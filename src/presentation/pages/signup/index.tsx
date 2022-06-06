import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
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
  saveAccessToken: SaveAccessToken
}

const SignUp = ({ validation, addAccount, saveAccessToken }: SignUpProps) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
  const history = useHistory()

  useEffect(() => {
    const nameError = validation?.validate('name', state.name)
    const emailError = validation?.validate('email', state.email)
    const passwordError = validation?.validate('password', state.password)
    const passwordConfirmationError = validation?.validate(
      'passwordConfirmation',
      state.passwordConfirmation
    )

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.name,
    state.email,
    state.password,
    state.passwordConfirmation,
    state.isFormInvalid,
    validation
  ])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState((prev) => ({ ...prev, isLoading: true }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
        <SubmitButton disabled={state.isFormInvalid} type="submit">
          Cadastrar
        </SubmitButton>
        <S.LinkToLogin>
          <Link data-testid="login-link" to="/login" replace>
            Voltar Para Login
          </Link>
        </S.LinkToLogin>
        <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
      </S.SignUpForm>
      <Footer />
    </S.Wrapper>
  )
}

export default SignUp
